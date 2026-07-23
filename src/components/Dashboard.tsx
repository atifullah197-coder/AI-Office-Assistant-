import React from "react";
import { SavedDocument, Template } from "../types";
import { templates } from "../data/templates";
import { 
  FileText, 
  RefreshCw, 
  Search, 
  Globe, 
  Trash2, 
  Copy, 
  Check, 
  Clock, 
  Sparkles, 
  ChevronRight, 
  Filter, 
  FileCode,
  CheckCircle,
  Eye
} from "lucide-react";

interface DashboardProps {
  savedDocs: SavedDocument[];
  onDeleteDoc: (id: string) => void;
  onSelectTab: (tab: string) => void;
  onSelectTemplate: (template: Template) => void;
}

export default function Dashboard({ savedDocs, onDeleteDoc, onSelectTab, onSelectTemplate }: DashboardProps) {
  const [searchTerm, setSearchTerm] = React.useState("");
  const [categoryFilter, setCategoryFilter] = React.useState<string>("all");
  const [selectedDoc, setSelectedDoc] = React.useState<SavedDocument | null>(null);
  const [copiedId, setCopiedId] = React.useState<string | null>(null);

  const handleCopy = (id: string, text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 1500);
  };

  const filteredDocs = savedDocs.filter((doc) => {
    const matchesSearch = 
      doc.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      doc.result.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (doc.documentType && doc.documentType.toLowerCase().includes(searchTerm.toLowerCase()));
    
    const matchesCategory = categoryFilter === "all" || doc.category === categoryFilter;
    
    return matchesSearch && matchesCategory;
  });

  const getCategoryBadge = (category: string) => {
    switch (category) {
      case "generator":
        return <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-blue-50 text-blue-700 border border-blue-100 dark:bg-blue-950/40 dark:text-blue-300 dark:border-blue-900/50">Generator</span>;
      case "converter":
        return <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-700 border border-emerald-100 dark:bg-emerald-950/40 dark:text-emerald-300 dark:border-emerald-900/50">Tone Tuner</span>;
      case "analyzer":
        return <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-amber-50 text-amber-700 border border-amber-100 dark:bg-amber-950/40 dark:text-amber-300 dark:border-amber-900/50">Analyzer</span>;
      case "translator":
        return <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-purple-50 text-purple-700 border border-purple-100 dark:bg-purple-950/40 dark:text-purple-300 dark:border-purple-900/50">Translator</span>;
      default:
        return null;
    }
  };

  return (
    <div className="space-y-8 text-left">
      {/* Header and Welcome */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 bg-white dark:bg-slate-900 p-6 rounded-2xl border border-gray-100 dark:border-slate-800">
        <div>
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white tracking-tight">Your Workplace Workspace</h2>
          <p className="text-slate-500 dark:text-slate-400 text-sm mt-1">Select a quick tool below to start drafting or managing professional communications.</p>
        </div>
        <div className="flex items-center gap-6 px-4 py-2.5 bg-blue-50/50 border border-blue-100 rounded-xl dark:bg-slate-800/40 dark:border-slate-750">
          <div className="text-center">
            <span className="block text-2xl font-bold text-blue-700 dark:text-blue-400">{savedDocs.length}</span>
            <span className="text-[10px] font-semibold text-blue-600 dark:text-blue-300 uppercase tracking-wider">Saved Documents</span>
          </div>
          <div className="h-8 w-px bg-blue-200 dark:bg-slate-700" />
          <div className="text-center">
            <span className="block text-2xl font-bold text-emerald-700 dark:text-emerald-400">{templates.length}</span>
            <span className="text-[10px] font-semibold text-emerald-600 dark:text-emerald-300 uppercase tracking-wider">Ready Templates</span>
          </div>
        </div>
      </div>

      {/* Grid of Core Tools */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* Tool 1 */}
        <button
          id="card-tool-generator"
          onClick={() => onSelectTab("generator")}
          className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-gray-150 dark:border-slate-800 hover:border-blue-500 dark:hover:border-blue-400 hover:shadow-lg hover:shadow-blue-50/50 dark:hover:shadow-none transition-all text-left cursor-pointer group"
        >
          <div className="bg-blue-50 dark:bg-blue-950/50 text-blue-600 dark:text-blue-400 p-3 rounded-xl w-fit group-hover:scale-105 transition-transform">
            <FileText className="w-5 h-5" />
          </div>
          <h3 className="text-base font-bold text-slate-900 dark:text-white mt-4">Document Generator</h3>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1.5 leading-relaxed">Create letters, leave applications, or workplace emails with guided parameters.</p>
          <div className="mt-4 flex items-center gap-1.5 text-xs font-semibold text-blue-600 dark:text-blue-400">
            <span>Create Document</span>
            <ChevronRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
          </div>
        </button>

        {/* Tool 2 */}
        <button
          id="card-tool-converter"
          onClick={() => onSelectTab("converter")}
          className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-gray-150 dark:border-slate-800 hover:border-emerald-500 dark:hover:border-emerald-400 hover:shadow-lg hover:shadow-emerald-50/50 dark:hover:shadow-none transition-all text-left cursor-pointer group"
        >
          <div className="bg-emerald-50 dark:bg-emerald-950/50 text-emerald-600 dark:text-emerald-400 p-3 rounded-xl w-fit group-hover:scale-105 transition-transform">
            <RefreshCw className="w-5 h-5" />
          </div>
          <h3 className="text-base font-bold text-slate-900 dark:text-white mt-4">Tone Converter</h3>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1.5 leading-relaxed">Rewrite existing drafts, messages, or lists to sound polite, formal, or executive.</p>
          <div className="mt-4 flex items-center gap-1.5 text-xs font-semibold text-emerald-600 dark:text-emerald-400">
            <span>Tune Tone</span>
            <ChevronRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
          </div>
        </button>

        {/* Tool 3 */}
        <button
          id="card-tool-analyzer"
          onClick={() => onSelectTab("analyzer")}
          className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-gray-150 dark:border-slate-800 hover:border-amber-500 dark:hover:border-amber-400 hover:shadow-lg hover:shadow-amber-50/50 dark:hover:shadow-none transition-all text-left cursor-pointer group"
        >
          <div className="bg-amber-50 dark:bg-amber-950/50 text-amber-600 dark:text-amber-400 p-3 rounded-xl w-fit group-hover:scale-105 transition-transform">
            <Search className="w-5 h-5" />
          </div>
          <h3 className="text-base font-bold text-slate-900 dark:text-white mt-4">Document Analyzer</h3>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1.5 leading-relaxed">Summarize emails or proposals, extract deadlines, and discover response suggestions.</p>
          <div className="mt-4 flex items-center gap-1.5 text-xs font-semibold text-amber-600 dark:text-amber-400">
            <span>Analyze File</span>
            <ChevronRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
          </div>
        </button>

        {/* Tool 4 */}
        <button
          id="card-tool-translator"
          onClick={() => onSelectTab("translator")}
          className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-gray-150 dark:border-slate-800 hover:border-purple-500 dark:hover:border-purple-400 hover:shadow-lg hover:shadow-purple-50/50 dark:hover:shadow-none transition-all text-left cursor-pointer group"
        >
          <div className="bg-purple-50 dark:bg-purple-950/50 text-purple-600 dark:text-purple-400 p-3 rounded-xl w-fit group-hover:scale-105 transition-transform">
            <Globe className="w-5 h-5" />
          </div>
          <h3 className="text-base font-bold text-slate-900 dark:text-white mt-4">Multilingual Helper</h3>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1.5 leading-relaxed">Translate English, Urdu, or Arabic messages instantly into polished workplace content.</p>
          <div className="mt-4 flex items-center gap-1.5 text-xs font-semibold text-purple-600 dark:text-purple-400">
            <span>Translate & Polish</span>
            <ChevronRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
          </div>
        </button>
      </div>

      {/* Main Content Split: Templates Library and Saved Documents History */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Template Library Previews (Left Column) */}
        <div className="lg:col-span-5 bg-white dark:bg-slate-900 p-6 rounded-2xl border border-gray-150 dark:border-slate-800 flex flex-col h-fit">
          <div className="flex justify-between items-center mb-4">
            <div>
              <h3 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
                <FileCode className="w-4 h-4 text-rose-500" />
                <span>Template Library</span>
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">Pick any template to fill in fields immediately.</p>
            </div>
            <button 
              onClick={() => onSelectTab("generator")}
              className="text-xs text-blue-600 dark:text-blue-400 font-semibold hover:underline"
            >
              See All
            </button>
          </div>

          <div className="space-y-3 max-h-[460px] overflow-y-auto pr-1">
            {templates.slice(0, 5).map((temp) => (
              <div 
                key={temp.id} 
                className="p-3.5 rounded-xl border border-gray-100 dark:border-slate-800 hover:border-blue-300 hover:bg-blue-50/5 dark:hover:bg-blue-950/10 transition-all text-left"
              >
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <h4 className="text-sm font-semibold text-slate-900 dark:text-white line-clamp-1">{temp.name}</h4>
                    <span className="text-[10px] font-medium bg-rose-50 dark:bg-rose-950/40 text-rose-600 dark:text-rose-400 px-1.5 py-0.5 rounded border border-rose-100 dark:border-rose-900/40 mt-1 inline-block">
                      {temp.category}
                    </span>
                  </div>
                  <button
                    onClick={() => onSelectTemplate(temp)}
                    className="px-2.5 py-1 text-[11px] font-semibold bg-slate-900 dark:bg-slate-800 text-white dark:text-slate-200 rounded-md hover:bg-blue-600 dark:hover:bg-blue-700 transition-colors cursor-pointer"
                  >
                    Use
                  </button>
                </div>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-2 line-clamp-2 leading-relaxed">{temp.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* History Log Panel (Right Column) */}
        <div className="lg:col-span-7 bg-white dark:bg-slate-900 p-6 rounded-2xl border border-gray-150 dark:border-slate-800 flex flex-col">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
            <div>
              <h3 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
                <Clock className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                <span>Document History Logs</span>
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">Search and review documents you previously saved.</p>
            </div>

            {/* Filter controls */}
            <div className="flex items-center gap-2 w-full sm:w-auto">
              <div className="relative flex-1 sm:flex-none">
                <Search className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="Search logs..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full sm:w-44 pl-8 pr-3 py-1.5 text-xs bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-800 dark:text-white rounded-lg focus:outline-hidden focus:ring-1 focus:ring-blue-500 focus:bg-white dark:focus:bg-slate-950 transition-all"
                />
              </div>

              <select
                value={categoryFilter}
                onChange={(e) => setCategoryFilter(e.target.value)}
                className="px-2.5 py-1.5 text-xs bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-850 dark:text-slate-200 rounded-lg focus:outline-hidden focus:ring-1 focus:ring-blue-500 focus:bg-white dark:focus:bg-slate-950 cursor-pointer"
              >
                <option value="all">All Modules</option>
                <option value="generator">Generator</option>
                <option value="converter">Tone Tuner</option>
                <option value="analyzer">Analyzer</option>
                <option value="translator">Translator</option>
              </select>
            </div>
          </div>

          {/* History Records */}
          <div className="space-y-3 min-h-[300px] max-h-[460px] overflow-y-auto pr-1">
            {filteredDocs.length === 0 ? (
              <div className="h-full min-h-[250px] flex flex-col items-center justify-center border border-dashed border-gray-200 dark:border-slate-800 rounded-xl p-8 bg-slate-50/50 dark:bg-slate-950/40">
                <div className="bg-slate-100 dark:bg-slate-850 p-3 rounded-full text-slate-400 dark:text-slate-600">
                  <Clock className="w-6 h-6" />
                </div>
                <h4 className="text-slate-700 dark:text-slate-300 font-semibold mt-3 text-sm">No documents found</h4>
                <p className="text-slate-400 dark:text-slate-500 text-xs mt-1 text-center max-w-xs leading-relaxed">
                  {searchTerm || categoryFilter !== "all" 
                    ? "Try adjusting your search query or module filters."
                    : "Your saved documents will appear here. Try generating a letter first!"}
                </p>
              </div>
            ) : (
              filteredDocs.map((doc) => (
                <div 
                  key={doc.id}
                  className="p-4 rounded-xl border border-slate-100 dark:border-slate-800/65 hover:border-slate-200 dark:hover:border-slate-700 hover:bg-slate-50/30 dark:hover:bg-slate-800/20 transition-all text-left flex justify-between items-start gap-4"
                >
                  <div className="space-y-1.5 flex-1 min-w-0">
                    <div className="flex flex-wrap items-center gap-2">
                      <h4 className="text-sm font-semibold text-slate-950 dark:text-white truncate max-w-[220px] sm:max-w-xs">{doc.title}</h4>
                      {getCategoryBadge(doc.category)}
                    </div>
                    
                    <p className="text-xs text-slate-500 dark:text-slate-400 line-clamp-1 italic">
                      {doc.documentType ? `${doc.documentType} • ` : ""}{doc.tone ? `Tone: ${doc.tone} • ` : ""} {doc.date}
                    </p>
                    
                    <p className="text-xs text-slate-600 dark:text-slate-300 line-clamp-2 leading-relaxed bg-slate-50 dark:bg-slate-950 p-2.5 rounded-lg border border-slate-100 dark:border-slate-800/80 font-mono text-[11px] whitespace-pre-line mt-1">
                      {doc.result}
                    </p>
                  </div>

                  {/* Actions */}
                  <div className="flex items-center gap-1.5 shrink-0">
                    <button
                      onClick={() => setSelectedDoc(doc)}
                      className="p-1.5 text-slate-500 hover:text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-950/40 rounded-lg transition-colors cursor-pointer"
                      title="Quick View"
                    >
                      <Eye className="w-3.5 h-3.5" />
                    </button>
                    <button
                      onClick={() => handleCopy(doc.id, doc.result)}
                      className="p-1.5 text-slate-500 hover:text-emerald-600 hover:bg-emerald-50 dark:hover:bg-emerald-950/40 rounded-lg transition-colors cursor-pointer"
                      title="Copy Output"
                    >
                      {copiedId === doc.id ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                    </button>
                    <button
                      onClick={() => onDeleteDoc(doc.id)}
                      className="p-1.5 text-slate-500 hover:text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-950/40 rounded-lg transition-colors cursor-pointer"
                      title="Delete Record"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>

      {/* Quick View Doc Detail Dialog */}
      {selectedDoc && (
        <div className="fixed inset-0 bg-slate-900/60 dark:bg-slate-950/80 backdrop-blur-xs flex items-center justify-center p-4 z-50">
          <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 max-w-2xl w-full p-6 shadow-2xl flex flex-col max-h-[90vh]">
            <div className="flex justify-between items-start border-b border-gray-150 dark:border-slate-800 pb-4 mb-4">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <h3 className="text-lg font-bold text-slate-900 dark:text-white">{selectedDoc.title}</h3>
                  {getCategoryBadge(selectedDoc.category)}
                </div>
                <p className="text-xs text-slate-500 dark:text-slate-400">Saved on {selectedDoc.date}</p>
              </div>
              <button 
                onClick={() => setSelectedDoc(null)}
                className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 text-lg font-semibold px-2 py-1 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-md transition-colors"
              >
                ✕
              </button>
            </div>

            <div className="flex-1 overflow-y-auto pr-1 text-left">
              {selectedDoc.originalText && (
                <div className="mb-4">
                  <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">Input Text / Context:</h4>
                  <div className="bg-slate-50 dark:bg-slate-950 p-3 rounded-lg text-xs text-slate-700 dark:text-slate-300 max-h-32 overflow-y-auto border border-slate-100 dark:border-slate-850 whitespace-pre-line">
                    {selectedDoc.originalText}
                  </div>
                </div>
              )}

              <div>
                <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Generated Output:</h4>
                <div className="bg-slate-50 dark:bg-slate-950 p-4 rounded-xl border border-slate-100 dark:border-slate-800 font-mono text-xs text-slate-800 dark:text-slate-200 leading-relaxed whitespace-pre-wrap max-h-96 overflow-y-auto">
                  {selectedDoc.result}
                </div>
              </div>
            </div>

            <div className="flex justify-end gap-2 border-t border-gray-150 dark:border-slate-800 pt-4 mt-4">
              <button
                onClick={() => handleCopy(selectedDoc.id, selectedDoc.result)}
                className="flex items-center gap-1.5 px-4 py-2 bg-slate-900 dark:bg-slate-800 text-white rounded-lg hover:bg-blue-600 dark:hover:bg-blue-700 transition-colors text-xs font-semibold cursor-pointer"
              >
                {copiedId === selectedDoc.id ? (
                  <>
                    <Check className="w-3.5 h-3.5" />
                    <span>Copied!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5" />
                    <span>Copy Text</span>
                  </>
                )}
              </button>
              <button
                onClick={() => setSelectedDoc(null)}
                className="px-4 py-2 bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 rounded-lg hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors text-xs font-semibold"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
