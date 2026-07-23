import React, { useEffect } from "react";
import { Template, SavedDocument } from "../types";
import { templates } from "../data/templates";
import FormattedOutput from "./FormattedOutput";
import { 
  FileText, 
  Sparkles, 
  Loader2, 
  CheckCircle2, 
  RefreshCw, 
  ChevronRight, 
  Save, 
  ArrowLeft,
  BookOpen,
  Info
} from "lucide-react";

interface AIGeneratorProps {
  onSaveDoc: (doc: Omit<SavedDocument, "id" | "date">) => void;
  activeTemplate: Template | null;
  onClearTemplate: () => void;
}

const DOCUMENT_TYPES = [
  "Professional Email",
  "Leave Application",
  "Complaint Letter",
  "Meeting Request",
  "HR Letter",
  "Project Update",
  "Official Message / Memo",
  "Custom Document"
];

const TONE_OPTIONS = [
  { key: "Formal", label: "Formal", desc: "Corporate, standard, and business-focused." },
  { key: "Polite", label: "Polite", desc: "Respectful, kind, and warm delivery." },
  { key: "Executive", label: "Executive/Business", desc: "Assertive, outcome-driven, and brief." },
  { key: "Friendly", label: "Friendly", desc: "Collaborative, warm, and approachable." },
  { key: "Short & Clear", label: "Short & Clear", desc: "Direct, concise, and simple." }
];

export default function AIGenerator({ onSaveDoc, activeTemplate, onClearTemplate }: AIGeneratorProps) {
  const [selectedType, setSelectedType] = React.useState("Professional Email");
  const [details, setDetails] = React.useState("");
  const [selectedTone, setSelectedTone] = React.useState("Formal");
  const [docLength, setDocLength] = React.useState("medium");
  const [language, setLanguage] = React.useState("English");
  
  // Template states
  const [selectedTemplate, setSelectedTemplate] = React.useState<Template | null>(null);
  const [templateValues, setTemplateValues] = React.useState<Record<string, string>>({});

  // Result and loading states
  const [loading, setLoading] = React.useState(false);
  const [result, setResult] = React.useState("");
  const [error, setError] = React.useState("");
  const [saved, setSaved] = React.useState(false);

  // Sync if dashboard pre-loaded a template
  useEffect(() => {
    if (activeTemplate) {
      handleSelectTemplate(activeTemplate);
      onClearTemplate(); // Reset prop trigger
    }
  }, [activeTemplate]);

  const handleSelectTemplate = (template: Template) => {
    setSelectedTemplate(template);
    // Auto-align document type category
    if (template.category.toLowerCase().includes("leave")) {
      setSelectedType("Leave Application");
    } else if (template.category.toLowerCase().includes("meeting")) {
      setSelectedType("Meeting Request");
    } else if (template.category.toLowerCase().includes("complaint")) {
      setSelectedType("Complaint Letter");
    } else {
      setSelectedType("Professional Email");
    }

    // Initialize fields
    const initialVals: Record<string, string> = {};
    template.placeholders.forEach((p) => {
      initialVals[p.key] = "";
    });
    setTemplateValues(initialVals);
    setDetails(""); // Clear blank details
  };

  const handleTemplateValueChange = (key: string, val: string) => {
    setTemplateValues((prev) => ({ ...prev, [key]: val }));
  };

  const handleClearTemplate = () => {
    setSelectedTemplate(null);
    setTemplateValues({});
  };

  const generateDocument = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setResult("");
    setSaved(false);

    let contextText = details;
    
    // If template is selected, compute context with placeholder details
    if (selectedTemplate) {
      const unfilled = selectedTemplate.placeholders.filter(p => !templateValues[p.key]?.trim());
      if (unfilled.length > 0) {
        // We will allow generation, but let's notify or merge values
      }

      // Compile filled template text or instruct the model with filled parameters
      const filledDetails = Object.entries(templateValues)
        .map(([key, value]) => `• ${key}: "${value || `[unfilled ${key}]`}"`)
        .join("\n");

      contextText = `Based on the following custom filled template "${selectedTemplate.name}":\n\nTemplate Body:\n${selectedTemplate.text}\n\nFilled Values:\n${filledDetails}`;
    }

    if (!contextText.trim()) {
      setError("Please provide details or fill in the template parameters.");
      setLoading(false);
      return;
    }

    try {
      const response = await fetch("/api/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          documentType: selectedType,
          details: contextText,
          tone: selectedTone,
          length: docLength,
          language
        }),
      });

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.error || "Failed to generate document");
      }

      setResult(data.result);
    } catch (err: any) {
      setError(err.message || "An error occurred during generation.");
    } finally {
      setLoading(false);
    }
  };

  const handleSaveResult = () => {
    if (!result) return;
    onSaveDoc({
      title: `${selectedType} (${selectedTone})`,
      category: "generator",
      documentType: selectedType,
      originalText: selectedTemplate 
        ? `Filled template: ${selectedTemplate.name}` 
        : details.substring(0, 200),
      result,
      tone: selectedTone,
      language
    });
    setSaved(true);
  };

  return (
    <div className="space-y-8 text-left">
      {/* Page Title */}
      <div>
        <h2 className="text-2xl font-bold text-slate-900 dark:text-white flex items-center gap-2 tracking-tight">
          <FileText className="text-blue-600 w-6 h-6" />
          <span>AI Smart Document Generator</span>
        </h2>
        <p className="text-slate-500 dark:text-slate-400 text-sm mt-1">Select an official workplace format, specify details or choose a ready-to-use template, and let Gemini craft proper professional documents.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Form Settings (Left 5 Columns) */}
        <form onSubmit={generateDocument} className="lg:col-span-5 bg-white dark:bg-slate-900 p-6 rounded-2xl border border-gray-150 dark:border-slate-800 space-y-6">
          
          {/* Document Type Selector */}
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-2">Document Layout / Type</label>
            <select
              value={selectedType}
              onChange={(e) => setSelectedType(e.target.value)}
              className="w-full px-3.5 py-2.5 text-sm bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-800 dark:text-white rounded-xl focus:outline-hidden focus:ring-2 focus:ring-blue-500 focus:bg-white dark:focus:bg-slate-950 transition-all cursor-pointer font-medium"
            >
              {DOCUMENT_TYPES.map((type) => (
                <option key={type} value={type}>{type}</option>
              ))}
            </select>
          </div>

          {/* Template Switcher info */}
          <div className="bg-slate-50 dark:bg-slate-950 border border-slate-100 dark:border-slate-850 rounded-xl p-3.5 flex items-start gap-3">
            <BookOpen className="w-4 h-4 text-blue-600 dark:text-blue-450 shrink-0 mt-0.5" />
            <div className="text-xs">
              <span className="font-semibold text-slate-900 dark:text-white block">Template Helper:</span>
              {selectedTemplate ? (
                <div className="mt-1">
                  <span className="text-blue-700 dark:text-blue-400 font-medium">{selectedTemplate.name}</span> active.
                  <button 
                    type="button"
                    onClick={handleClearTemplate}
                    className="text-rose-600 dark:text-rose-450 font-semibold ml-2 hover:underline inline-block"
                  >
                    Clear & use blank
                  </button>
                </div>
              ) : (
                <p className="text-slate-500 dark:text-slate-400 mt-0.5">
                  Select a template from the library or start typing blank.
                </p>
              )}
            </div>
          </div>

          {/* Details input or Placeholder inputs */}
          {selectedTemplate ? (
            <div className="space-y-4 border-l-2 border-blue-100 dark:border-slate-800 pl-4 mt-2">
              <h4 className="text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider">Fill Template Fields:</h4>
              <div className="space-y-3 max-h-[300px] overflow-y-auto pr-1">
                {selectedTemplate.placeholders.map((p) => (
                  <div key={p.key}>
                    <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">{p.label}</label>
                    <input
                      type="text"
                      placeholder={p.placeholder}
                      value={templateValues[p.key] || ""}
                      onChange={(e) => handleTemplateValueChange(p.key, e.target.value)}
                      className="w-full px-3 py-1.5 text-xs bg-slate-50/50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-800 dark:text-white rounded-lg focus:outline-hidden focus:ring-1 focus:ring-blue-500 focus:bg-white dark:focus:bg-slate-950"
                    />
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-2">
                What do you want to write about?
              </label>
              <textarea
                placeholder="Example: Medical leave for 3 days starting Monday due to flu. Transferring urgent deployment pipelines to Alex."
                value={details}
                onChange={(e) => setDetails(e.target.value)}
                rows={6}
                className="w-full px-3.5 py-3 text-sm bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-800 dark:text-white rounded-xl focus:outline-hidden focus:ring-2 focus:ring-blue-500 focus:bg-white dark:focus:bg-slate-950 transition-all leading-relaxed"
                required={!selectedTemplate}
              />
              <span className="text-[10px] text-slate-400 dark:text-slate-500 mt-1 block">Specify important dates, names, reasons, or objectives to get highly precise results.</span>
            </div>
          )}

          {/* Tone Selector */}
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-2.5">Communication Tone</label>
            <div className="grid grid-cols-2 gap-2.5">
              {TONE_OPTIONS.map((t) => (
                <button
                  key={t.key}
                  type="button"
                  onClick={() => setSelectedTone(t.key)}
                  className={`p-2.5 border rounded-xl text-left transition-all cursor-pointer ${
                    selectedTone === t.key
                      ? "border-blue-600 dark:border-blue-500 bg-blue-50/50 dark:bg-blue-950/20 ring-1 ring-blue-600 dark:ring-blue-500"
                      : "border-gray-200 dark:border-slate-800 hover:border-gray-300 dark:hover:border-slate-700"
                  }`}
                >
                  <span className="block text-xs font-bold text-slate-900 dark:text-white">{t.label}</span>
                  <span className="block text-[10px] text-slate-500 dark:text-slate-400 mt-0.5 line-clamp-1">{t.desc}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Advanced options: Length and language */}
          <div className="grid grid-cols-2 gap-4 pt-2 border-t border-slate-100 dark:border-slate-800">
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-1.5">Length</label>
              <div className="flex gap-1.5 bg-slate-100 dark:bg-slate-950 p-1 rounded-lg">
                {["short", "medium", "long"].map((l) => (
                  <button
                    key={l}
                    type="button"
                    onClick={() => setDocLength(l)}
                    className={`flex-1 py-1 text-xs font-medium rounded-md capitalize transition-colors cursor-pointer ${
                      docLength === l ? "bg-white dark:bg-slate-800 text-slate-900 dark:text-white shadow-xs" : "text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-250"
                    }`}
                  >
                    {l}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-1.5">Language</label>
              <select
                value={language}
                onChange={(e) => setLanguage(e.target.value)}
                className="w-full px-2.5 py-1.5 text-xs bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-800 dark:text-white rounded-lg focus:outline-hidden focus:ring-1 focus:ring-blue-500 focus:bg-white dark:focus:bg-slate-950 cursor-pointer"
              >
                <option value="English">English</option>
                <option value="Urdu">Urdu</option>
                <option value="Arabic">Arabic</option>
              </select>
            </div>
          </div>

          {/* Generate Button */}
          <button
            id="btn-trigger-generate"
            type="submit"
            disabled={loading}
            className="w-full py-3.5 bg-slate-900 hover:bg-blue-600 text-white rounded-xl font-semibold text-sm transition-all shadow-md hover:shadow-lg disabled:opacity-50 flex items-center justify-center gap-2 cursor-pointer"
          >
            {loading ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                <span>AI is drafting...</span>
              </>
            ) : (
              <>
                <Sparkles className="w-4 h-4 text-amber-400" />
                <span>Generate Professional Copy</span>
              </>
            )}
          </button>
        </form>

        {/* Output View (Right 7 Columns) */}
        <div className="lg:col-span-7 space-y-6">
          {error && (
            <div className="p-4 bg-rose-50 dark:bg-rose-950/20 border border-rose-100 dark:border-rose-900/50 text-rose-700 dark:text-rose-300 text-sm font-medium flex items-start gap-2.5">
              <span className="text-rose-500">⚠</span>
              <span>{error}</span>
            </div>
          )}

          {result ? (
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <h3 className="text-sm font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider">AI Generated Document</h3>
                
                <div className="flex items-center gap-2">
                  <button
                    id="btn-save-document"
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
              </div>

              {/* Styled markdown output */}
              <FormattedOutput content={result} title={selectedTemplate ? selectedTemplate.name : selectedType} />

              <div className="bg-blue-50/50 dark:bg-slate-850 border border-blue-100 dark:border-slate-750 rounded-xl p-4 flex items-start gap-3">
                <Info className="w-4 h-4 text-blue-600 dark:text-blue-400 shrink-0 mt-0.5" />
                <p className="text-xs text-blue-800 dark:text-blue-200 leading-relaxed">
                  <strong>Editing Tip:</strong> Double check dates, bracket placeholders (like [Your Name]), and email addresses before mailing or copying this template into Outlook or Gmail.
                </p>
              </div>
            </div>
          ) : (
            <div className="border border-dashed border-gray-200 dark:border-slate-800 rounded-2xl p-16 flex flex-col items-center justify-center bg-white dark:bg-slate-900 min-h-[450px]">
              {loading ? (
                <div className="text-center space-y-4">
                  <Loader2 className="w-12 h-12 text-blue-600 dark:text-blue-400 animate-spin mx-auto" />
                  <div>
                    <h4 className="text-slate-800 dark:text-white font-semibold text-base">Gemini is thinking...</h4>
                    <p className="text-slate-500 dark:text-slate-400 text-xs mt-1">Applying corporate document standards and vocabulary guidelines</p>
                  </div>
                </div>
              ) : (
                <div className="text-center space-y-4 max-w-sm">
                  <div className="bg-slate-50 dark:bg-slate-950 p-4 rounded-full text-slate-400 w-fit mx-auto border border-slate-100 dark:border-slate-850">
                    <FileText className="w-8 h-8 text-blue-500 dark:text-blue-450" />
                  </div>
                  <div>
                    <h4 className="text-slate-800 dark:text-white font-bold text-base">No Document Generated Yet</h4>
                    <p className="text-slate-500 dark:text-slate-400 text-xs mt-2 leading-relaxed">
                      Configure your document settings on the left panel, or click one of our preset template cards to fill in variables and trigger generation.
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
