import React from "react";
import { SavedDocument, Template } from "./types";
import LandingPage from "./components/LandingPage";
import Dashboard from "./components/Dashboard";
import AIGenerator from "./components/AIGenerator";
import ToneConverter from "./components/ToneConverter";
import DocumentAnalyzer from "./components/DocumentAnalyzer";
import MultilingualAssistant from "./components/MultilingualAssistant";
import UserProfile from "./components/UserProfile";
import {
  Sparkles,
  FileText,
  RefreshCw,
  Search,
  Globe,
  User,
  LayoutDashboard,
  Home,
  CheckCircle,
  Menu,
  X,
  Sun,
  Moon
} from "lucide-react";

export default function App() {
  const [view, setView] = React.useState<"landing" | "dashboard" | "generator" | "converter" | "analyzer" | "translator" | "profile">("landing");
  const [savedDocs, setSavedDocs] = React.useState<SavedDocument[]>([]);
  const [activeTemplate, setActiveTemplate] = React.useState<Template | null>(null);
  const [darkMode, setDarkMode] = React.useState(false);

  // Responsive sidebar/drawer for mobile
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);

  const [userSettings, setUserSettings] = React.useState({
    name: "Atif Ullah",
    email: "atifullah197@gmail.com",
    role: "Project Coordinator",
    department: "Operations",
    signature: "Best regards,\nAtif Ullah\nProject Coordinator | Operations\natifullah197@gmail.com",
    customInstructions: ""
  });

  // Load history, dark mode & profile settings on mount
  React.useEffect(() => {
    const localDocs = localStorage.getItem("ai_office_saved_docs");
    if (localDocs) {
      try {
        setSavedDocs(JSON.parse(localDocs));
      } catch (e) {
        console.error("Failed to parse saved docs");
      }
    }

    const localSettings = localStorage.getItem("ai_office_user_settings");
    if (localSettings) {
      try {
        setUserSettings(JSON.parse(localSettings));
      } catch (e) {
        console.error("Failed to parse settings");
      }
    }

    const savedTheme = localStorage.getItem("ai_office_dark_mode");
    if (savedTheme === "true") {
      setDarkMode(true);
      document.documentElement.classList.add("dark");
    } else if (savedTheme === "false") {
      setDarkMode(false);
      document.documentElement.classList.remove("dark");
    } else if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
      setDarkMode(true);
      document.documentElement.classList.add("dark");
    }
  }, []);

  const handleToggleDarkMode = () => {
    const newVal = !darkMode;
    setDarkMode(newVal);
    localStorage.setItem("ai_office_dark_mode", String(newVal));
    if (newVal) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  };

  const handleSaveDoc = (newDoc: Omit<SavedDocument, "id" | "date">) => {
    const docWithId: SavedDocument = {
      ...newDoc,
      id: Math.random().toString(36).substring(2, 9),
      date: new Date().toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit"
      })
    };

    const updatedDocs = [docWithId, ...savedDocs];
    setSavedDocs(updatedDocs);
    localStorage.setItem("ai_office_saved_docs", JSON.stringify(updatedDocs));
  };

  const handleDeleteDoc = (id: string) => {
    const updatedDocs = savedDocs.filter((doc) => doc.id !== id);
    setSavedDocs(updatedDocs);
    localStorage.setItem("ai_office_saved_docs", JSON.stringify(updatedDocs));
  };

  const handleSaveSettings = (updatedSettings: typeof userSettings) => {
    setUserSettings(updatedSettings);
    localStorage.setItem("ai_office_user_settings", JSON.stringify(updatedSettings));
  };

  const handleSelectTemplate = (template: Template) => {
    setActiveTemplate(template);
    setView("generator");
  };

  // Nav item component
  const NavItem = ({ tab, label, icon: Icon }: { tab: typeof view; label: string; icon: any }) => {
    const active = view === tab;
    return (
      <button
        id={`nav-tab-${tab}`}
        onClick={() => {
          setView(tab);
          setMobileMenuOpen(false);
        }}
        className={`flex items-center gap-2 px-4 py-2 text-xs font-semibold rounded-xl transition-all cursor-pointer ${active
            ? "bg-slate-900 text-white shadow-xs dark:bg-white dark:text-slate-950"
            : "text-slate-600 hover:text-slate-900 hover:bg-slate-100 dark:text-slate-300 dark:hover:text-white dark:hover:bg-slate-800"
          }`}
      >
        <Icon className="w-4 h-4 shrink-0" />
        <span>{label}</span>
      </button>
    );
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 dark:text-slate-100 flex flex-col font-sans transition-colors duration-200 selection:bg-blue-150">
      {/* Top Banner Navigation Header */}
      <header className="sticky top-0 bg-white border-b border-gray-100 shadow-xs z-40 dark:bg-slate-900 dark:border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">

            {/* Logo/Identity */}
            <button
              onClick={() => setView("landing")}
              className="flex items-center gap-2.5 text-slate-900 dark:text-white hover:opacity-85 transition-opacity cursor-pointer text-left"
            >
              <div className="bg-slate-900 dark:bg-slate-800 p-2 rounded-xl text-white">
                <Sparkles className="w-5 h-5 text-amber-400 shrink-0" />
              </div>
              <div>
                <span className="font-extrabold text-base tracking-tight block">AI Office Assistant</span>
                <span className="text-[10px] text-slate-400 dark:text-slate-500 font-semibold uppercase tracking-wider block">Enterprise Workspace</span>
              </div>
            </button>

            {/* Desktop Nav Items */}
            {view !== "landing" && (
              <nav className="hidden md:flex items-center gap-1">
                <NavItem tab="dashboard" label="Dashboard" icon={LayoutDashboard} />
                <NavItem tab="generator" label="Generator" icon={FileText} />
                <NavItem tab="converter" label="Tone Tuner" icon={RefreshCw} />
                <NavItem tab="analyzer" label="Analyzer" icon={Search} />
                <NavItem tab="translator" label="Translator" icon={Globe} />
                <NavItem tab="profile" label="Profile Settings" icon={User} />
              </nav>
            )}

            {/* Quick Actions / Return Landing */}
            <div className="flex items-center gap-2.5">
              {/* Dark Mode Switch Button */}
              <button
                onClick={handleToggleDarkMode}
                className="p-2 text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-xl transition-colors cursor-pointer dark:text-slate-300 dark:hover:text-white dark:hover:bg-slate-800"
                title={darkMode ? "Switch to Light Mode" : "Switch to Dark Mode"}
              >
                {darkMode ? <Sun className="w-4 h-4 text-amber-400 animate-pulse" /> : <Moon className="w-4 h-4 text-slate-600" />}
              </button>

              {view !== "landing" ? (
                <button
                  id="btn-nav-landing"
                  onClick={() => setView("landing")}
                  className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 border border-slate-200 text-slate-600 rounded-lg hover:bg-slate-50 text-xs font-semibold cursor-pointer dark:border-slate-700 dark:text-slate-300 dark:hover:bg-slate-800"
                >
                  <Home className="w-3.5 h-3.5" />
                  <span>Landing Page</span>
                </button>
              ) : (
                <button
                  id="btn-nav-dashboard"
                  onClick={() => setView("dashboard")}
                  className="inline-flex items-center gap-1.5 px-4 py-2 bg-slate-900 text-white rounded-xl hover:bg-blue-600 dark:bg-white dark:text-slate-950 dark:hover:bg-blue-600 dark:hover:text-white text-xs font-bold transition-all shadow-xs cursor-pointer"
                >
                  <span>Go to Workspace</span>
                </button>
              )}

              {/* Mobile Menu Toggle Button */}
              {view !== "landing" && (
                <button
                  onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                  className="md:hidden p-2 text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-lg dark:text-slate-300 dark:hover:text-white dark:hover:bg-slate-800"
                >
                  {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Mobile Dropdown Menu */}
        {mobileMenuOpen && view !== "landing" && (
          <div className="md:hidden border-t border-slate-100 bg-white p-4 space-y-2 shadow-inner dark:bg-slate-900 dark:border-slate-800">
            <NavItem tab="dashboard" label="Dashboard" icon={LayoutDashboard} />
            <NavItem tab="generator" label="Document Generator" icon={FileText} />
            <NavItem tab="converter" label="Tone Tuner" icon={RefreshCw} />
            <NavItem tab="analyzer" label="Document Analyzer" icon={Search} />
            <NavItem tab="translator" label="Multilingual Translator" icon={Globe} />
            <NavItem tab="profile" label="Profile Settings" icon={User} />
          </div>
        )}
      </header>

      {/* Main Workspace Frame */}
      <main className="flex-grow">
        {view === "landing" ? (
          <LandingPage onStart={() => setView("dashboard")} />
        ) : (
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
            {view === "dashboard" && (
              <Dashboard
                savedDocs={savedDocs}
                onDeleteDoc={handleDeleteDoc}
                onSelectTab={(tab) => setView(tab as any)}
                onSelectTemplate={handleSelectTemplate}
              />
            )}
            {view === "generator" && (
              <AIGenerator
                onSaveDoc={handleSaveDoc}
                activeTemplate={activeTemplate}
                onClearTemplate={() => setActiveTemplate(null)}
              />
            )}
            {view === "converter" && (
              <ToneConverter
                onSaveDoc={handleSaveDoc}
              />
            )}
            {view === "analyzer" && (
              <DocumentAnalyzer
                onSaveDoc={handleSaveDoc}
              />
            )}
            {view === "translator" && (
              <MultilingualAssistant
                onSaveDoc={handleSaveDoc}
              />
            )}
            {view === "profile" && (
              <UserProfile
                userSettings={userSettings}
                onSaveSettings={handleSaveSettings}
              />
            )}
          </div>
        )}
      </main>

      {/* Persistent Page Accent / Breadcrumbs when in Workspace */}
      {view !== "landing" && (
        <div className="bg-white border-t border-slate-100 py-3 text-left dark:bg-slate-900 dark:border-slate-800">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row justify-between items-center gap-2">
            <span className="text-[10px] font-semibold uppercase tracking-wider text-slate-400 dark:text-slate-500 flex items-center gap-1">
              <CheckCircle className="w-3.5 h-3.5 text-emerald-500" />
              <span>Workspace Session Active</span>
            </span>
            <span className="text-[10px] font-medium text-slate-400 dark:text-slate-500">
              User Context: {userSettings.name} ({userSettings.role})
            </span>
          </div>
        </div>
      )}
    </div>
  );
}
