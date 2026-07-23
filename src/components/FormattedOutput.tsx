import React from "react";
import { Check, Copy, Download } from "lucide-react";

interface FormattedOutputProps {
  content: string;
  onCopy?: () => void;
  title?: string;
}

export default function FormattedOutput({ content, onCopy, title }: FormattedOutputProps) {
  const [copied, setCopied] = React.useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(content);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
    if (onCopy) onCopy();
  };

  const handleDownload = () => {
    const blob = new Blob([content], { type: "text/plain;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    
    // Clean and normalize filename
    const sanitizedTitle = title 
      ? title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "")
      : "generated-document";
      
    link.download = `${sanitizedTitle}.txt`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  // Safe and clean simple Markdown renderer for the AI output
  const renderLine = (line: string, index: number) => {
    const trimmed = line.trim();

    // Check for Headers (e.g., ### Title or ## Title)
    if (trimmed.startsWith("### ")) {
      return (
        <h4 key={index} className="text-sm font-semibold text-gray-900 dark:text-white mt-4 mb-2 tracking-tight">
          {parseInline(trimmed.substring(4))}
        </h4>
      );
    }
    if (trimmed.startsWith("## ") || trimmed.startsWith("# ")) {
      const text = trimmed.startsWith("## ") ? trimmed.substring(3) : trimmed.substring(2);
      return (
        <h3 key={index} className="text-base font-bold text-gray-950 dark:text-white mt-5 mb-2 border-b border-gray-100 dark:border-slate-800 pb-1 tracking-tight">
          {parseInline(text)}
        </h3>
      );
    }

    // Check for List Items (starts with * or - or •)
    if (trimmed.startsWith("* ") || trimmed.startsWith("- ") || trimmed.startsWith("• ")) {
      return (
        <li key={index} className="ml-5 list-disc text-gray-700 dark:text-slate-300 my-1 leading-relaxed text-sm">
          {parseInline(trimmed.substring(2))}
        </li>
      );
    }

    // Check for numbered list
    const numMatch = trimmed.match(/^(\d+)\.\s(.*)/);
    if (numMatch) {
      return (
        <li key={index} className="ml-5 list-decimal text-gray-700 dark:text-slate-300 my-1 leading-relaxed text-sm">
          {parseInline(numMatch[2])}
        </li>
      );
    }

    // Check for empty line
    if (trimmed === "") {
      return <div key={index} className="h-2" />;
    }

    // Default Paragraph
    return (
      <p key={index} className="text-gray-700 dark:text-slate-300 my-2 leading-relaxed text-sm whitespace-pre-wrap">
        {parseInline(line)}
      </p>
    );
  };

  // Simple parser to handle bold text (**text**) and italic (*text*)
  const parseInline = (text: string) => {
    const parts = [];
    let currentIdx = 0;
    
    // Simple bold regex matching **text**
    const boldRegex = /\*\*(.*?)\*\*/g;
    let match;

    while ((match = boldRegex.exec(text)) !== null) {
      const matchIdx = match.index;
      // Add plain text before match
      if (matchIdx > currentIdx) {
        parts.push(text.substring(currentIdx, matchIdx));
      }
      // Add bold text
      parts.push(
        <strong key={matchIdx} className="font-semibold text-gray-950 dark:text-white">
          {match[1]}
        </strong>
      );
      currentIdx = boldRegex.lastIndex;
    }

    if (currentIdx < text.length) {
      parts.push(text.substring(currentIdx));
    }

    return parts.length > 0 ? parts : text;
  };

  const lines = content.split("\n");

  return (
    <div className="relative border border-gray-200 rounded-xl bg-gray-50/50 p-6 shadow-xs hover:border-gray-300 transition-colors duration-200 dark:border-slate-800 dark:bg-slate-900/50 dark:hover:border-slate-700">
      <div className="absolute top-4 right-4 z-10 flex items-center gap-2">
        <button
          id="btn-download-output"
          onClick={handleDownload}
          className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium bg-white border border-gray-200 text-gray-600 rounded-lg hover:bg-gray-50 hover:text-gray-900 transition-colors shadow-xs cursor-pointer dark:bg-slate-800 dark:border-slate-700 dark:text-slate-300 dark:hover:bg-slate-700 dark:hover:text-white"
          title="Download as Text File (.txt)"
        >
          <Download className="w-3.5 h-3.5 text-blue-500 dark:text-blue-400" />
          <span>Download</span>
        </button>

        <button
          id="btn-copy-output"
          onClick={handleCopy}
          className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium bg-white border border-gray-200 text-gray-600 rounded-lg hover:bg-gray-50 hover:text-gray-900 transition-colors shadow-xs cursor-pointer dark:bg-slate-800 dark:border-slate-700 dark:text-slate-300 dark:hover:bg-slate-700 dark:hover:text-white"
          title="Copy to clipboard"
        >
          {copied ? (
            <>
              <Check className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
              <span className="text-emerald-700 dark:text-emerald-400 font-medium">Copied!</span>
            </>
          ) : (
            <>
              <Copy className="w-3.5 h-3.5" />
              <span>Copy</span>
            </>
          )}
        </button>
      </div>

      <div className="prose prose-sm max-w-none text-left dark:prose-invert">
        {lines.map((line, idx) => renderLine(line, idx))}
      </div>
    </div>
  );
}
