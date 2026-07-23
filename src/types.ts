export interface SavedDocument {
  id: string;
  title: string;
  category: "generator" | "converter" | "analyzer" | "translator";
  documentType?: string;
  originalText?: string;
  result: string;
  tone?: string;
  language?: string;
  date: string;
}

export interface Template {
  id: string;
  category: string;
  name: string;
  description: string;
  text: string;
  placeholders: { key: string; label: string; placeholder: string }[];
}

export interface ToneOption {
  key: string;
  label: string;
  description: string;
  iconName: string;
}

export interface LanguageOption {
  code: string;
  name: string;
  nativeName: string;
  flag: string;
}
