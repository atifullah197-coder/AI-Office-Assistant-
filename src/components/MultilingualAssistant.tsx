import React from "react";
import { SavedDocument } from "../types";
import FormattedOutput from "./FormattedOutput";
import { 
  Globe, 
  Sparkles, 
  Loader2, 
  Save, 
  CheckCircle2, 
  Info,
  Languages,
  ChevronRight
} from "lucide-react";

interface MultilingualAssistantProps {
  onSaveDoc: (doc: Omit<SavedDocument, "id" | "date">) => void;
}

const LANGUAGES = [
  { code: "en", name: "English", flag: "🇬🇧" },
  { code: "ur", name: "Urdu (اردو)", flag: "🇵🇰" },
  { code: "ar", name: "Arabic (العربية)", flag: "🇸🇦" }
];

export default function MultilingualAssistant({ onSaveDoc }: MultilingualAssistantProps) {
  const [text, setText] = React.useState("");
  const [fromLang, setFromLang] = React.useState("Auto-detect");
  const [toLang, setToLang] = React.useState("English");
  const [docType, setDocType] = React.useState("Professional Email");
  const [tone, setTone] = React.useState("Formal");
  
  const [loading, setLoading] = React.useState(false);
  const [result, setResult] = React.useState("");
  const [error, setError] = React.useState("");
  const [saved, setSaved] = React.useState(false);

  const handleProcess = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!text.trim()) {
      setError("Please enter the message you want to translate and polish.");
      return;
    }

    setLoading(true);
    setError("");
    setResult("");
    setSaved(false);

    try {
      const response = await fetch("/api/translate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          text,
          fromLanguage: fromLang,
          toLanguage: toLang,
          documentType: docType,
          tone
        }),
      });

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.error || "Failed to process translation");
      }

      setResult(data.result);
    } catch (err: any) {
      setError(err.message || "An error occurred during translation.");
    } finally {
      setLoading(false);
    }
  };

  const handleSaveResult = () => {
    if (!result) return;
    onSaveDoc({
      title: `Translation to ${toLang}`,
      category: "translator",
      originalText: text.substring(0, 200),
      result,
      tone,
      language: toLang
    });
    setSaved(true);
  };

  const loadUrduExample = () => {
    setFromLang("Urdu (اردو)");
    setToLang("English");
    setDocType("Leave Application");
    setTone("Polite");
    setText(
      "بیماری کی وجہ سے میں آج دفتر نہیں آ سکتا۔ مجھے سخت بخار ہے اور ڈاکٹر نے آرام کا مشورہ دیا ہے۔ برائے مہربانی میری آج کی چھٹی منظور کریں۔"
    );
  };

  const loadArabicExample = () => {
    setFromLang("Arabic (العربية)");
    setToLang("English");
    setDocType("Professional Email");
    setTone("Formal");
    setText(
      "مرحباً فريق العمل، يرجى العلم أننا سنعقد اجتماعاً طارئاً غداً لمناقشة تحديات ميزانية المشروع الجديد. الحضور ضروري للجميع."
    );
  };

  return (
    <div className="space-y-8 text-left">
      {/* Title */}
      <div>
        <h2 className="text-2xl font-bold text-slate-900 dark:text-white flex items-center gap-2 tracking-tight">
          <Globe className="text-purple-600 w-6 h-6" />
          <span>Multilingual Office Assistant</span>
        </h2>
        <p className="text-slate-500 dark:text-slate-400 text-sm mt-1">Cross linguistic barriers instantly. Convert rough messages written in Urdu or Arabic into clean, executive-grade English documents, and vice versa.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Settings Form (Left 5 Columns) */}
        <form onSubmit={handleProcess} className="lg:col-span-5 bg-white dark:bg-slate-900 p-6 rounded-2xl border border-gray-150 dark:border-slate-800 space-y-6">
          
          {/* Languages selectors */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-1.5">From Language</label>
              <select
                value={fromLang}
                onChange={(e) => setFromLang(e.target.value)}
                className="w-full px-3 py-2 text-xs bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-800 dark:text-white rounded-lg focus:outline-hidden focus:ring-1 focus:ring-purple-500 dark:focus:ring-purple-400 cursor-pointer"
              >
                <option value="Auto-detect">✨ Auto-Detect</option>
                <option value="English">English</option>
                <option value="Urdu (اردو)">Urdu (اردو)</option>
                <option value="Arabic (العربية)">Arabic (العربية)</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-1.5">To Language</label>
              <select
                value={toLang}
                onChange={(e) => setToLang(e.target.value)}
                className="w-full px-3 py-2 text-xs bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-purple-700 dark:text-purple-400 rounded-lg focus:outline-hidden focus:ring-1 focus:ring-purple-500 dark:focus:ring-purple-400 cursor-pointer font-semibold"
              >
                <option value="English">English</option>
                <option value="Urdu">Urdu (اردو)</option>
                <option value="Arabic">Arabic (العربية)</option>
              </select>
            </div>
          </div>

          {/* Quick Preset Buttons */}
          <div className="flex gap-2">
            <button
              type="button"
              onClick={loadUrduExample}
              className="flex-1 py-1.5 px-2.5 bg-purple-50 dark:bg-purple-950/40 hover:bg-purple-100 dark:hover:bg-purple-900/30 text-purple-700 dark:text-purple-300 border border-purple-100 dark:border-purple-900/40 rounded-lg text-[10px] font-bold text-center transition-all cursor-pointer"
            >
              🇵🇰 Load Urdu Example
            </button>
            <button
              type="button"
              onClick={loadArabicExample}
              className="flex-1 py-1.5 px-2.5 bg-purple-50 dark:bg-purple-950/40 hover:bg-purple-100 dark:hover:bg-purple-900/30 text-purple-700 dark:text-purple-300 border border-purple-100 dark:border-purple-900/40 rounded-lg text-[10px] font-bold text-center transition-all cursor-pointer"
            >
              🇸🇦 Load Arabic Example
            </button>
          </div>

          {/* Source Text Area */}
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-2">Message to Translate</label>
            <textarea
              placeholder="Type or paste your message here..."
              value={text}
              onChange={(e) => setText(e.target.value)}
              rows={6}
              className="w-full px-3.5 py-3 text-sm bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-800 dark:text-white rounded-xl focus:outline-hidden focus:ring-2 focus:ring-purple-500 focus:bg-white dark:focus:bg-slate-950 transition-all leading-relaxed"
              required
            />
          </div>

          {/* Output Document Layout Preset */}
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-2">Structure Output As</label>
            <select
              value={docType}
              onChange={(e) => setDocType(e.target.value)}
              className="w-full px-3 py-2.5 text-sm bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-800 dark:text-white rounded-xl focus:outline-hidden focus:ring-1 focus:ring-purple-500 dark:focus:ring-purple-400 cursor-pointer"
            >
              <option value="Professional Email">Professional Email Layout</option>
              <option value="Leave Application">Leave Application Layout</option>
              <option value="Meeting Request">Meeting Request Agenda</option>
              <option value="Complaint Letter">Formal Complaint Letter</option>
              <option value="Any">Direct Polished Translation (No Template)</option>
            </select>
          </div>

          {/* Tone configuration */}
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-2">Polished Tone Style</label>
            <select
              value={tone}
              onChange={(e) => setTone(e.target.value)}
              className="w-full px-3 py-2.5 text-sm bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-800 dark:text-white rounded-xl focus:outline-hidden focus:ring-1 focus:ring-purple-500 dark:focus:ring-purple-400 cursor-pointer"
            >
              <option value="Formal">Formal & Business-like</option>
              <option value="Polite">Polite & Cordial</option>
              <option value="Executive">Executive & Direct</option>
              <option value="Friendly">Friendly & Supportive</option>
            </select>
          </div>

          {/* Process Button */}
          <button
            id="btn-trigger-translate"
            type="submit"
            disabled={loading}
            className="w-full py-3.5 bg-slate-900 hover:bg-purple-600 text-white rounded-xl font-semibold text-sm transition-all shadow-md hover:shadow-lg disabled:opacity-50 flex items-center justify-center gap-2 cursor-pointer"
          >
            {loading ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                <span>Translating & formatting...</span>
              </>
            ) : (
              <>
                <Languages className="w-4 h-4 text-amber-300" />
                <span>Translate & Polishing</span>
              </>
            )}
          </button>
        </form>

        {/* Output view (Right 7 Columns) */}
        <div className="lg:col-span-7 space-y-6">
          {error && (
            <div className="p-4 bg-rose-50 dark:bg-rose-950/20 border border-rose-100 dark:border-rose-900/50 text-rose-700 dark:text-rose-300 text-sm font-medium flex items-start gap-2.5">
              <span>⚠</span>
              <span>{error}</span>
            </div>
          )}

          {result ? (
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <h3 className="text-sm font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider flex items-center gap-2">
                  <Globe className="w-4 h-4 text-purple-500" />
                  <span>Polished Translation Result</span>
                </h3>

                <button
                  id="btn-save-translation"
                  onClick={handleSaveResult}
                  disabled={saved}
                  className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-colors cursor-pointer border ${
                    saved 
                      ? "bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-300 border-emerald-200 dark:border-emerald-900/50" 
                      : "bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800 hover:text-slate-900 dark:hover:text-white"
                  }`}
                >
                  {saved ? (
                    <>
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
                      <span>Saved to History</span>
                    </>
                  ) : (
                    <>
                      <Save className="w-3.5 h-3.5" />
                      <span>Save to Log History</span>
                    </>
                  )}
                </button>
              </div>

              {/* Styled markdown output */}
              <FormattedOutput content={result} title={`translation-to-${toLang}`} />

              <div className="bg-purple-50/40 dark:bg-slate-850 border border-purple-100 dark:border-slate-750 rounded-xl p-4 flex items-start gap-3">
                <Info className="w-4 h-4 text-purple-600 dark:text-purple-400 shrink-0 mt-0.5" />
                <p className="text-xs text-purple-800 dark:text-purple-200 leading-relaxed">
                  <strong>Corporate Translation Standards:</strong> This assistant does not just translate word-for-word. It analyzes the context and reconstructs sentences into natural, idiomatic corporate phrasings for the targeted workplace.
                </p>
              </div>
            </div>
          ) : (
            <div className="border border-dashed border-gray-200 dark:border-slate-800 rounded-2xl p-16 flex flex-col items-center justify-center bg-white dark:bg-slate-900 min-h-[450px]">
              {loading ? (
                <div className="text-center space-y-4">
                  <Loader2 className="w-12 h-12 text-purple-600 dark:text-purple-400 animate-spin mx-auto" />
                  <div>
                    <h4 className="text-slate-800 dark:text-white font-semibold text-base">Gemini is translating...</h4>
                    <p className="text-slate-500 dark:text-slate-400 text-xs mt-1">Cross-referencing syntax templates and applying targeted document frameworks</p>
                  </div>
                </div>
              ) : (
                <div className="text-center space-y-4 max-w-sm">
                  <div className="bg-slate-50 dark:bg-slate-950 p-4 rounded-full text-slate-400 w-fit mx-auto border border-slate-100 dark:border-slate-850">
                    <Globe className="w-8 h-8 text-purple-500" />
                  </div>
                  <div>
                    <h4 className="text-slate-800 dark:text-white font-bold text-base">No Multilingual Document Ready</h4>
                    <p className="text-slate-500 dark:text-slate-400 text-xs mt-2 leading-relaxed">
                      Choose your languages, paste the message, select your target document structure/tone, and click "Translate & Polishing" to preview the results.
                    </p>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
