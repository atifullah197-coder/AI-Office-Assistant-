import React from "react";
import { SavedDocument } from "../types";
import FormattedOutput from "./FormattedOutput";
import { 
  Search, 
  Sparkles, 
  Loader2, 
  Upload, 
  FileText, 
  Save, 
  CheckCircle2, 
  AlertCircle,
  HelpCircle
} from "lucide-react";

interface DocumentAnalyzerProps {
  onSaveDoc: (doc: Omit<SavedDocument, "id" | "date">) => void;
}

export default function DocumentAnalyzer({ onSaveDoc }: DocumentAnalyzerProps) {
  const [text, setText] = React.useState("");
  const [loading, setLoading] = React.useState(false);
  const [result, setResult] = React.useState("");
  const [error, setError] = React.useState("");
  const [saved, setSaved] = React.useState(false);
  const [dragActive, setDragActive] = React.useState(false);

  const handleAnalyze = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!text.trim()) {
      setError("Please paste or upload document text content to analyze.");
      return;
    }

    setLoading(true);
    setError("");
    setResult("");
    setSaved(false);

    try {
      const response = await fetch("/api/analyze", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text }),
      });

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.error || "Failed to analyze document");
      }

      setResult(data.result);
    } catch (err: any) {
      setError(err.message || "An error occurred during analysis.");
    } finally {
      setLoading(false);
    }
  };

  const handleSaveResult = () => {
    if (!result) return;
    onSaveDoc({
      title: "Document Analytical Breakdown",
      category: "analyzer",
      originalText: text.substring(0, 200),
      result
    });
    setSaved(true);
  };

  // Drag and drop handlers
  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const file = e.dataTransfer.files[0];
      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target?.result) {
          setText(event.target.result as string);
        }
      };
      reader.readAsText(file);
    }
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target?.result) {
          setText(event.target.result as string);
        }
      };
      reader.readAsText(file);
    }
  };

  const loadExample = () => {
    setText(
      `Date: July 20, 2026\nTo: Product Development Team\nFrom: Operations Directorate\nSubject: Launch timeline for Apollo UI Redesign\n\nFollowing our review meeting on Monday, we are finalizing the sprint dates for the UI redesign. \n\nAll designers must complete high-fidelity mockups for core account dashboards by Friday, July 24, at 4:00 PM EST. These should be loaded into the central Figma boards. \n\nThe technical lead, Sarah, needs to review assets and provide bundle size estimations before July 28. If the bundle exceeds 500kb, we must schedule a performance optimization sync. \n\nOur first alpha preview with key business stakeholders is locked for August 5. Please ensure all code commits for the alpha build are completed and pushed to staging by August 3 so testing can complete in time.`
    );
  };

  return (
    <div className="space-y-8 text-left">
      {/* Title */}
      <div>
        <h2 className="text-2xl font-bold text-slate-900 dark:text-white flex items-center gap-2 tracking-tight">
          <Search className="text-amber-600 w-6 h-6" />
          <span>AI Document Analyzer</span>
        </h2>
        <p className="text-slate-500 dark:text-slate-400 text-sm mt-1">Paste corporate text or drag in plain text files. AI will summarize, extract actions, highlight deadlines, and suggest response drafts.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Document upload / input (Left 5 Columns) */}
        <div className="lg:col-span-5 space-y-6">
          <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-gray-150 dark:border-slate-800 space-y-6">
            
            {/* File Drag Zone */}
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-2">Upload or Drag File</label>
              <div
                onDragEnter={handleDrag}
                onDragOver={handleDrag}
                onDragLeave={handleDrag}
                onDrop={handleDrop}
                className={`border-2 border-dashed rounded-xl p-6 text-center transition-all relative ${
                  dragActive ? "border-amber-500 bg-amber-50/20 dark:border-amber-450 dark:bg-amber-950/20" : "border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700"
                }`}
              >
                <Upload className="w-8 h-8 text-slate-400 dark:text-slate-500 mx-auto mb-2" />
                <p className="text-xs text-slate-600 dark:text-slate-300 font-medium">Drag and drop a plain text file here, or</p>
                <label className="mt-2 inline-block px-3 py-1.5 bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 text-xs font-bold rounded-lg hover:bg-slate-200 dark:hover:bg-slate-700 cursor-pointer transition-colors border border-slate-200 dark:border-slate-700">
                  <span>Browse files</span>
                  <input
                    type="file"
                    accept=".txt,.md,.json,.csv"
                    onChange={handleFileSelect}
                    className="hidden"
                  />
                </label>
                <p className="text-[10px] text-slate-400 dark:text-slate-500 mt-1.5">Supports text (.txt), Markdown (.md), or log files</p>
              </div>
            </div>

            <div className="relative flex items-center">
              <div className="flex-grow border-t border-slate-100 dark:border-slate-800" />
              <span className="flex-shrink mx-3 text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest">Or Paste Directly</span>
              <div className="flex-grow border-t border-slate-100 dark:border-slate-800" />
            </div>

            {/* Paste Input Area */}
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <label className="block text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">Document Content</label>
                <button 
                  type="button" 
                  onClick={loadExample} 
                  className="text-xs text-amber-600 dark:text-amber-450 font-semibold hover:underline"
                >
                  Try an Example Memo
                </button>
              </div>

              <textarea
                placeholder="Paste corporate emails, project update memos, PDF contents, or reports..."
                value={text}
                onChange={(e) => setText(e.target.value)}
                rows={8}
                className="w-full px-3.5 py-3 text-sm bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-800 dark:text-white rounded-xl focus:outline-hidden focus:ring-2 focus:ring-amber-500 focus:bg-white dark:focus:bg-slate-950 transition-all leading-relaxed"
              />
            </div>

            {/* Analyze Button */}
            <button
              id="btn-trigger-analyze"
              onClick={() => handleAnalyze()}
              disabled={loading}
              className="w-full py-3.5 bg-slate-900 hover:bg-amber-600 text-white rounded-xl font-semibold text-sm transition-all shadow-md hover:shadow-lg disabled:opacity-50 flex items-center justify-center gap-2 cursor-pointer"
            >
              {loading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>Scanning files & timelines...</span>
                </>
              ) : (
                <>
                  <Sparkles className="w-4 h-4 text-amber-400" />
                  <span>Analyze Content</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* Results / Audit summary (Right 7 Columns) */}
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
                  <FileText className="w-4 h-4 text-amber-500" />
                  <span>Analysis Report</span>
                </h3>

                <button
                  id="btn-save-analysis"
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
                      <span>Save Analysis Report</span>
                    </>
                  )}
                </button>
              </div>

              {/* Styled markdown output */}
              <FormattedOutput content={result} title="document-analysis-report" />

              <div className="bg-amber-50/55 dark:bg-slate-850 border border-amber-100 dark:border-slate-750 rounded-xl p-4 flex items-start gap-3">
                <AlertCircle className="w-4 h-4 text-amber-600 dark:text-amber-400 shrink-0 mt-0.5" />
                <p className="text-xs text-amber-800 dark:text-amber-200 leading-relaxed">
                  <strong>Deadlines Extracted:</strong> Gemini highlights clear dates and deliverables. Make sure to cross-verify the specific calendar days inside your workspace planner.
                </p>
              </div>
            </div>
          ) : (
            <div className="border border-dashed border-gray-200 dark:border-slate-800 rounded-2xl p-16 flex flex-col items-center justify-center bg-white dark:bg-slate-900 min-h-[450px]">
              {loading ? (
                <div className="text-center space-y-4">
                  <Loader2 className="w-12 h-12 text-amber-600 dark:text-amber-400 animate-spin mx-auto" />
                  <div>
                    <h4 className="text-slate-800 dark:text-white font-semibold text-base">Gemini is analyzing...</h4>
                    <p className="text-slate-500 dark:text-slate-400 text-xs mt-1">Extracting action deliverables, identifying targets, and drafting response structures</p>
                  </div>
                </div>
              ) : (
                <div className="text-center space-y-4 max-w-sm">
                  <div className="bg-slate-50 dark:bg-slate-950 p-4 rounded-full text-slate-400 w-fit mx-auto border border-slate-100 dark:border-slate-850">
                    <Search className="w-8 h-8 text-amber-500" />
                  </div>
                  <div>
                    <h4 className="text-slate-800 dark:text-white font-bold text-base">No Analytical Report Ready</h4>
                    <p className="text-slate-500 dark:text-slate-400 text-xs mt-2 leading-relaxed">
                      Upload a plain text file or paste an email update in the input area, then click "Analyze Content" to generate key insights.
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
