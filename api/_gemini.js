// Shared Gemini caller for the AI Office Assistant API endpoints.
// The API key is read from the GEMINI_API_KEY environment variable
// (set in the Vercel project settings) and never leaves the server.
// Only current-generation models: this API key class permanently refuses
// gemini-2.5-flash / gemini-2.0-flash ("no longer available to new users"),
// so including them only wasted time and surfaced a confusing error.
const MODELS = process.env.GEMINI_MODEL
  ? [process.env.GEMINI_MODEL]
  : ['gemini-3.8-flash', 'gemini-3.5-flash'];

const ATTEMPT_TIMEOUT_MS = 15000;
const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

function generationConfigFor(model) {
  const cfg = { temperature: 0.7, maxOutputTokens: 2048 };
  // Keep latency low: these are short office tasks, not research problems.
  if (model.indexOf('gemini-3') === 0) cfg.thinkingConfig = { thinkingLevel: 'low' };
  else if (model.indexOf('gemini-2.5') === 0) cfg.thinkingConfig = { thinkingBudget: 0 };
  return cfg;
}

function isRetryable(msg, status) {
  return (
    status === 429 ||
    status === 503 ||
    /no longer available|not found|not supported|is not available|high demand|overloaded|try again later|timeout/i.test(msg || '')
  );
}

async function callGemini(system, user) {
  const key = process.env.GEMINI_API_KEY;
  if (!key) {
    throw new Error('The server is not configured yet (missing GEMINI_API_KEY).');
  }
  let lastError = null;
  let allQuota = true;
  const quotaModels = new Set();
  // Each model gets a second chance after a short pause: Gemini demand
  // spikes are usually brief. Daily-quota failures are the exception:
  // retrying that model today is pointless (its bucket is empty until
  // tomorrow), so it is skipped after the first quota error.
  const plan = MODELS.flatMap((model) => [model, model]);
  for (let attempt = 0; attempt < plan.length; attempt++) {
    const model = plan[attempt];
    if (quotaModels.has(model)) continue;
    if (attempt > 0) await sleep(attempt === 1 ? 2000 : 3000);
    const ctrl = new AbortController();
    const timer = setTimeout(() => ctrl.abort(), ATTEMPT_TIMEOUT_MS);
    try {
      const r = await fetch(
        'https://generativelanguage.googleapis.com/v1beta/models/' + model + ':generateContent',
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json', 'x-goog-api-key': key },
          body: JSON.stringify({
            systemInstruction: { parts: [{ text: system }] },
            contents: [{ role: 'user', parts: [{ text: user }] }],
            generationConfig: generationConfigFor(model),
          }),
          signal: ctrl.signal,
        }
      );
      const data = await r.json().catch(() => ({}));
      if (r.ok) {
        const parts =
          (data.candidates && data.candidates[0] && data.candidates[0].content && data.candidates[0].content.parts) || [];
        const text = parts.map((p) => p.text || '').join('').trim();
        if (!text) throw new Error('The AI returned an empty response. Please try again.');
        return text;
      }
      const msg = (data && data.error && data.error.message) || ('Gemini API error (' + r.status + ')');
      lastError = new Error(msg);
      if (r.status === 429 && /quota/i.test(msg)) {
        lastError.quota = true;
        quotaModels.add(model);
        continue;
      }
      allQuota = false;
      if (!isRetryable(msg, r.status)) throw lastError;
    } catch (e) {
      if (e && e.name === 'AbortError') {
        lastError = new Error('The AI took too long to respond. Please try again.');
        allQuota = false;
        continue;
      }
      throw e;
    } finally {
      clearTimeout(timer);
    }
  }
  if (allQuota && lastError && lastError.quota) {
    console.error('All Gemini models failed. Last error:', lastError.message);
    throw new Error("Today's free AI limit is used up — Google gives this key 20 free requests per day, and they reset tomorrow. (For a much higher limit, billing can be enabled on the key in Google AI Studio.)");
  }
  // Every model failed (almost always a temporary Gemini demand spike on
  // this key's tier). Show a clear, honest message instead of whichever
  // raw model error happened to come last.
  const raw = (lastError && lastError.message) || '';
  console.error('All Gemini models failed. Last error:', raw);
  throw new Error('The AI service is busy right now — Google Gemini is experiencing high demand. Please wait a few seconds and try again.');
}

function handler(build) {
  return async (req, res) => {
    if (req.method !== 'POST') {
      res.status(405).json({ error: 'Method not allowed' });
      return;
    }
    try {
      const body = typeof req.body === 'string' ? JSON.parse(req.body || '{}') : (req.body || {});
      const { system, user } = build(body);
      const result = await callGemini(system, user);
      res.status(200).json({ result });
    } catch (e) {
      res.status(500).json({ error: (e && e.message) || 'Something went wrong. Please try again.' });
    }
  };
}

module.exports = { callGemini, handler };
