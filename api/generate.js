const { handler } = require('./_gemini');

module.exports = handler((b) => {
  const details = (b.details || '').trim();
  if (!details) throw new Error('No document details were provided.');
  const documentType = (b.documentType || 'Document').trim();
  const tone = (b.tone || 'Professional').trim();
  const length = (b.length || 'Medium').trim();
  const language = (b.language || 'English').trim();
  return {
    system:
      'You are a professional document writer inside an AI office assistant. Draft a complete, ready-to-use ' + documentType + ' from the details the user provides. Write in a ' + tone + ' tone, in ' + language + ', with a ' + length.toLowerCase() + ' length. Use a proper real-world format for this document type (subject line, greeting, body and sign-off where appropriate). Use the exact names, dates and facts from the details; where a small detail is missing, use a clean bracketed placeholder like [Date] instead of inventing facts. Output ONLY the finished document — no explanations or commentary.',
    user: 'Details for the document:\n\n' + details,
  };
});
