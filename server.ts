import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI } from "@google/genai";

const app = express();
const PORT = 3000;

app.use(express.json());

// Lazy-loaded Gemini client
let aiInstance: GoogleGenAI | null = null;

function getGemini(): GoogleGenAI {
  if (!aiInstance) {
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      throw new Error("GEMINI_API_KEY is not defined in the environment. Please add your key in Settings > Secrets.");
    }
    aiInstance = new GoogleGenAI({
      apiKey,
      httpOptions: {
        headers: {
          "User-Agent": "aistudio-build",
        },
      },
    });
  }
  return aiInstance;
}

const SYSTEM_INSTRUCTION = 
  "You are an AI Office Assistant. Help users create professional workplace communication and documents. " +
  "Always produce clear, polite, structured, and professional content. " +
  "Adapt the writing style according to the user's selected tone and purpose. " +
  "Ensure correct professional document layouts (e.g., standard business email formatting, official letter heads, " +
  "polite leave requests, or clean updates) depending on the user's request.";

// Health check endpoint
app.get("/api/health", (req, res) => {
  res.json({ status: "ok", time: new Date().toISOString() });
});

// 1. AI Smart Document Generator
app.post("/api/generate", async (req, res) => {
  try {
    const { documentType, details, tone, length, language } = req.body;
    if (!details || !documentType) {
      return res.status(400).json({ error: "Document type and details are required." });
    }

    const ai = getGemini();
    const prompt = `Generate a ${tone || "professional"} ${documentType} in ${language || "English"}.
The document length should be ${length || "medium"}.

Use the following details/context:
${details}

Please format the response nicely with clear sections, spacing, and appropriate placeholders (like [Your Name], [Date], [Company Name]) if applicable.`;

    const response = await ai.models.generateContent({
      model: "gemini-3.5-flash",
      contents: prompt,
      config: {
        systemInstruction: SYSTEM_INSTRUCTION,
        temperature: 0.7,
      },
    });

    res.json({ result: response.text });
  } catch (error: any) {
    console.error("Error in /api/generate:", error);
    res.status(500).json({ error: error.message || "Failed to generate document" });
  }
});

// 2. Professional Tone Converter
app.post("/api/convert-tone", async (req, res) => {
  try {
    const { text, targetTone, language } = req.body;
    if (!text || !targetTone) {
      return res.status(400).json({ error: "Text and target tone are required." });
    }

    const ai = getGemini();
    const prompt = `Rewrite the following text into a "${targetTone}" tone. 
Keep the language of the output as ${language || "English"} (or matching the original text's language if appropriate).
Make sure it maintains the core message but completely changes the delivery to be appropriate for a ${targetTone} context.

Original Text:
"${text}"

Rewritten Text:`;

    const response = await ai.models.generateContent({
      model: "gemini-3.5-flash",
      contents: prompt,
      config: {
        systemInstruction: SYSTEM_INSTRUCTION,
        temperature: 0.5,
      },
    });

    res.json({ result: response.text });
  } catch (error: any) {
    console.error("Error in /api/convert-tone:", error);
    res.status(500).json({ error: error.message || "Failed to convert tone" });
  }
});

// 3. AI Document Analyzer
app.post("/api/analyze", async (req, res) => {
  try {
    const { text } = req.body;
    if (!text) {
      return res.status(400).json({ error: "Text content is required for analysis." });
    }

    const ai = getGemini();
    const prompt = `Analyze the following workplace document/text and perform these tasks:
1. Provide a concise summary.
2. Extract the key action points or important information.
3. Identify any explicit or implicit deadlines and assigned tasks.
4. Suggest 2-3 alternative professional, polite ways to reply/respond.

Please format your response into clear Markdown sections:
- **Summary**: (brief overview)
- **Key Takeaways & Action Points**: (bullet points)
- **Deadlines & Tasks**: (bullet points)
- **Suggested Responses**: (options for response)

Document to analyze:
"""
${text}
"""`;

    const response = await ai.models.generateContent({
      model: "gemini-3.5-flash",
      contents: prompt,
      config: {
        systemInstruction: SYSTEM_INSTRUCTION,
        temperature: 0.4,
      },
    });

    res.json({ result: response.text });
  } catch (error: any) {
    console.error("Error in /api/analyze:", error);
    res.status(500).json({ error: error.message || "Failed to analyze document" });
  }
});

// 4. Multilingual Office Assistant
app.post("/api/translate", async (req, res) => {
  try {
    const { text, fromLanguage, toLanguage, documentType, tone } = req.body;
    if (!text || !toLanguage) {
      return res.status(400).json({ error: "Text and target language are required." });
    }

    const ai = getGemini();
    
    let docTypeInstruction = "";
    if (documentType && documentType !== "Any") {
      docTypeInstruction = `and format it as a professional ${documentType}`;
    }
    
    const toneInstruction = tone ? `Use a ${tone} tone.` : "Use a professional, polite, and official tone.";

    const prompt = `Translate and professionalize the following message from ${fromLanguage || "Auto-detect"} into polished, workplace-grade ${toLanguage} ${docTypeInstruction}.
${toneInstruction}

Input Message:
"${text}"

Polished Workplace Translation:`;

    const response = await ai.models.generateContent({
      model: "gemini-3.5-flash",
      contents: prompt,
      config: {
        systemInstruction: SYSTEM_INSTRUCTION,
        temperature: 0.6,
      },
    });

    res.json({ result: response.text });
  } catch (error: any) {
    console.error("Error in /api/translate:", error);
    res.status(500).json({ error: error.message || "Failed to process translation" });
  }
});

// Serve frontend assets
async function startServer() {
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
