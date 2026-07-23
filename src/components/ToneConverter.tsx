import React from "react";
import { SavedDocument } from "../types";
import FormattedOutput from "./FormattedOutput";
import { 
  RefreshCw, 
  Sparkles, 
  Loader2, 
  ArrowLeftRight, 
  Save, 
  CheckCircle2, 
  Info,
  ChevronRight
} from "lucide-react";

interface ToneConverterProps {
  onSaveDoc: (doc: Omit<SavedDocument, "id" | "date">) => void;
}

const TONAL_MODES = [
  { key: "Formal", label: "Formal Style", desc: "For management, corporate board updates, or client interactions." },
  { key: "Polite", label: "Polite & Warm", desc: "Express gratitude, requests with extreme respect, and soft reminders." },
  { key: "Executive", label: "Executive/Direct", desc: "Outcome-driven, high-level, clear bullet points for busy stakeholders." },
  { key: "Friendly", label: "Warm & Collaborative", desc: "For close coworkers, casual team channels, and social updates." },
  { key: "Short & Clear", label: "Short & Clear", desc: "Simplifies long wordy sentences to increase readability." }
];

export default function ToneConverter({ onSaveDoc }: ToneConverterProps) {
  const [inputText, setInputText] = React.useState("");
  const [selectedTone, setSelectedTone] = React.useState("Formal");
  const [language, setLanguage] = React.useState("English");
  const [loading, setLoading] = React.useState(false);
  const [convertedText, setConvertedText] = React.useState("");
  const [error, setError] = React.useState("");
  const [saved, setSaved] = React.useState(false);

  const handleConvert = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputText.trim()) {
      setError("Please paste or write your draft text first.");
      return;
    }

    setLoading(true);
    setError("");
    setConvertedText("");
    setSaved(false);

    try {
      const response = await fetch("/api/convert-tone", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          text: inputText,
          targetTone: selectedTone,
          language
        }),
      });

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.error || "Failed to convert tone");
      }

      setConvertedText(data.result);
    } catch (err: any) {
      setError(err.message || "An error occurred during conversion.");
    } finally {
      setLoading(false);
    }
  };

  const handleSaveResult = () => {
    if (!convertedText) return;
    onSaveDoc({
      title: `Tone Shift to ${selectedTone}`,
      category: "converter",
      originalText: inputText.substring(0, 200),
      result: convertedText,
      tone: selectedTone,
      language
    });
    setSaved(true);
  };

  const loadExample = () => {
    setInputText(
      "Hey guys, I cannot join the meeting today. I feel super bad and my stomach is turning. Will try to review the notes later when I wake up. Alex, please check the build pipelines if you have some minutes. Thanks."
    );
  };

  return (
    <div className="space-y-8 text-left">
      {/* Title */}
      <div>
        <h2 className="text-2xl font-bold text-slate-900 dark:text-white flex items-center gap-2 tracking-tight">
          <RefreshCw className="text-emerald-600 w-6 h-6" />
          <span>Professional Tone Converter</span>
        </h2>
        <p className="text-slate-500 dark:text-slate-400 text-sm mt-1">Transform any rough notes, direct messages, or casual drafts into a variety of appropriate corporate delivery formats.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Input Panel (Left 5 Columns) */}
        <form onSubmit={handleConvert} className="lg:col-span-5 bg-white dark:bg-slate-900 p-6 rounded-2xl border border-gray-150 dark:border-slate-800 space-y-6">
          
          {/* Text Input area */}
          <div>
            <div className="flex justify-between items-center mb-2">
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">Your Rough Draft</label>
              <button 
                type="button" 
                onClick={loadExample} 
                className="text-xs text-emerald-600 dark:text-emerald-450 font-semibold hover:underline"
              >
                Try an Example
              </button>
            </div>
            
            <textarea
              placeholder="Paste what you want to say, even if it's casual, disorganized, or blunt..."
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              rows={6}
              className="w-full px-3.5 py-3 text-sm bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-800 dark:text-white rounded-xl focus:outline-hidden focus:ring-2 focus:ring-emerald-500 focus:bg-white dark:focus:bg-slate-950 transition-all leading-relaxed"
              required
            />
          </div>

          {/* Tone Selector */}
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-3">Select Desired Tone</label>
            <div className="space-y-2.5">
              {TONAL_MODES.map((mode) => (
                <button
                  key={mode.key}
                  type="button"
                  onClick={() => setSelectedTone(mode.key)}
                  className={`w-full p-3 border rounded-xl text-left transition-all flex items-start gap-3 cursor-pointer ${
                    selectedTone === mode.key
                      ? "border-emerald-500 bg-emerald-50/40 dark:bg-emerald-950/20 ring-1 ring-emerald-500 dark:ring-emerald-500"
                      : "border-gray-200 dark:border-slate-800 hover:border-gray-300 dark:hover:border-slate-700 hover:bg-slate-50/50 dark:hover:bg-slate-950/20"
                  }`}
                >
                  <div className={`p-1.5 rounded-lg border text-xs shrink-0 mt-0.5 ${
                    selectedTone === mode.key 
                      ? "bg-emerald-100 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 border-emerald-200 dark:border-emerald-900/60" 
                      : "bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400 border-slate-200 dark:border-slate-700"
                  }`}>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </div>
                  <div>
                    <span className="block text-xs font-bold text-slate-900 dark:text-white">{mode.label}</span>
                    <span className="block text-[10px] text-slate-500 dark:text-slate-400 mt-0.5 leading-relaxed">{mode.desc}</span>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Language Selector */}
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-1.5">Output Language</label>
            <select
              value={language}
              onChange={(e) => setLanguage(e.target.value)}
              className="w-full px-3 py-2 text-xs bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-800 dark:text-white rounded-lg focus:outline-hidden focus:ring-1 focus:ring-emerald-500 dark:focus:ring-emerald-400 cursor-pointer"
            >
              <option value="English">English</option>
              <option value="Urdu">Urdu</option>
              <option value="Arabic">Arabic</option>
            </select>
          </div>

          {/* Convert Button */}
          <button
            id="btn-trigger-convert"
            type="submit"
            disabled={loading}
            className="w-full py-3.5 bg-slate-900 hover:bg-emerald-600 text-white rounded-xl font-semibold text-sm transition-all shadow-md hover:shadow-lg disabled:opacity-50 flex items-center justify-center gap-2 cursor-pointer"
          >
            {loading ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                <span>Modulating frequencies...</span>
              </>
            ) : (
              <>
                <Sparkles className="w-4 h-4 text-amber-400" />
                <span>Convert Tone Style</span>
              </>
            )}
          </button>
        </form>

        {/* Results / Comparative view (Right 7 Columns) */}
        <div className="lg:col-span-7 space-y-6">
          {error && (
            <div className="p-4 bg-rose-50 dark:bg-rose-950/20 border border-rose-100 dark:border-rose-900/50 text-rose-700 dark:text-rose-300 text-sm font-medium flex items-start gap-2.5">
              <span>⚠</span>
              <span>{error}</span>
            </div>
          )}

          {convertedText ? (
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <h3 className="text-sm font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider flex items-center gap-2">
                  <ArrowLeftRight className="w-4 h-4 text-emerald-500" />
                  <span>Comparative Output</span>
                </h3>

                <button
                  id="btn-save-converted"
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

              {/* Converted Output View */}
              <FormattedOutput content={convertedText} title={`tone-converter-${selectedTone}`} />

              <div className="bg-emerald-50/40 dark:bg-slate-850 border border-emerald-100 dark:border-slate-750 rounded-xl p-4 flex items-start gap-3">
                <Info className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
                <p className="text-xs text-emerald-800 dark:text-emerald-200 leading-relaxed">
                  <strong>Why this changed:</strong> The tool parsed your raw intent and automatically converted informal words like <em>"Hey guys"</em> or <em>"super bad"</em> into polite workplace alternatives to maintain optimal team dynamics.
                </p>
              </div>
            </div>
          ) : (
            <div className="border border-dashed border-gray-200 dark:border-slate-800 rounded-2xl p-16 flex flex-col items-center justify-center bg-white dark:bg-slate-900 min-h-[450px]">
              {loading ? (
                <div className="text-center space-y-4">
                  <Loader2 className="w-12 h-12 text-emerald-600 dark:text-emerald-400 animate-spin mx-auto" />
                  <div>
                    <h4 className="text-slate-800 dark:text-white font-semibold text-base">Gemini is rewriting...</h4>
                    <p className="text-slate-500 dark:text-slate-400 text-xs mt-1">Refining syntax and polishing appropriate word choices</p>
                  </div>
                </div>
              ) : (
                <div className="text-center space-y-4 max-w-sm">
                  <div className="bg-slate-50 dark:bg-slate-950 p-4 rounded-full text-slate-400 w-fit mx-auto border border-slate-100 dark:border-slate-850">
                    <RefreshCw className="w-8 h-8 text-emerald-500" />
                  </div>
                  <div>
                    <h4 className="text-slate-800 dark:text-white font-bold text-base">No Conversion Active</h4>
                    <p className="text-slate-500 dark:text-slate-400 text-xs mt-2 leading-relaxed">
                      Enter some rough notes or an informal email in the input area, select your goal tone, and click "Convert Tone Style" to see the comparison.
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
