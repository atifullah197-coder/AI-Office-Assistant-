const { handler } = require('./_gemini');

module.exports = handler((b) => {
  const text = (b.text || '').trim();
  if (!text) throw new Error('No text was provided.');
  const from = (b.fromLanguage || 'Auto-detect').trim();
  const to = (b.toLanguage || 'English').trim();
  const documentType = (b.documentType || 'Professional Email').trim();
  const tone = (b.tone || 'Formal').trim();
  return {
    system:
      'You are an expert translator and editor inside an AI office assistant. Translate the user\'s text from ' + from + ' into ' + to + ', then polish it so it reads naturally as a ' + documentType + ' in a ' + tone + ' tone. Preserve every fact, name, date and number exactly. Output ONLY the final translated and polished text — no explanations, no original text, no quotation marks around it.',
    user: text,
  };
});
