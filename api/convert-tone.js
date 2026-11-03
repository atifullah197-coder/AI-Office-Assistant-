const { handler } = require('./_gemini');

module.exports = handler((b) => {
  const text = (b.text || '').trim();
  if (!text) throw new Error('No text was provided.');
  const tone = (b.targetTone || 'Formal').trim();
  const language = (b.language || 'English').trim();
  return {
    system:
      'You are a professional writing assistant inside an AI office assistant. Rewrite the user\'s text so it is in a ' + tone + ' tone, written in ' + language + '. Preserve every fact, name, date and number exactly. Keep roughly the same length unless the tone requires a small change. Output ONLY the rewritten text — no explanations, no preamble, no quotation marks around it.',
    user: text,
  };
});
