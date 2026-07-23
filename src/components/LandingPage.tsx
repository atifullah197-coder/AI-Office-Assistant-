import { motion } from "motion/react";
import { 
  FileText, 
  Sparkles, 
  RefreshCw, 
  Search, 
  Globe, 
  CheckCircle2, 
  ArrowRight, 
  Briefcase, 
  GraduationCap, 
  Users, 
  Clock 
} from "lucide-react";

interface LandingPageProps {
  onStart: () => void;
}

export default function LandingPage({ onStart }: LandingPageProps) {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { duration: 0.5, ease: "easeOut" } },
  };

  return (
    <div className="bg-slate-50 dark:bg-slate-950 dark:text-slate-100 min-h-screen font-sans">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-white dark:bg-slate-900 border-b border-gray-100 dark:border-slate-800 py-16 sm:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Hero Left Content */}
            <motion.div 
              className="lg:col-span-7 space-y-6 text-left"
              initial={{ x: -30, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
            >
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-blue-50 dark:bg-blue-950/40 border border-blue-100 dark:border-blue-900/60 text-blue-700 dark:text-blue-400 text-xs font-semibold rounded-full uppercase tracking-wider">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Next-Gen Workplace AI</span>
              </div>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-slate-900 dark:text-white tracking-tight leading-none">
                Write perfect <span className="text-blue-600 dark:text-blue-400">office communication</span> in seconds.
              </h1>
              <p className="text-lg text-slate-600 dark:text-slate-300 max-w-2xl leading-relaxed">
                Empower your workplace writing. Draft flawless emails, request official leave, analyze incoming documents, and convert messages between languages and professional tones instantly.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 pt-2">
                <button
                  id="btn-hero-cta"
                  onClick={onStart}
                  className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-slate-900 dark:bg-blue-600 text-white font-medium rounded-xl hover:bg-blue-600 dark:hover:bg-blue-500 hover:shadow-lg hover:shadow-blue-100 dark:hover:shadow-none transition-all duration-200 shadow-md cursor-pointer group"
                >
                  <span>Launch Workspace</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </button>
                <a
                  href="#features"
                  className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200 font-medium rounded-xl hover:bg-slate-200 dark:hover:bg-slate-700 transition-all duration-200 cursor-pointer"
                >
                  Explore Features
                </a>
              </div>

              {/* Trust Indicators */}
              <div className="pt-6 border-t border-slate-100 dark:border-slate-800 grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                  <span className="text-xs font-medium text-slate-600 dark:text-slate-400">100% Professional Layouts</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                  <span className="text-xs font-medium text-slate-600 dark:text-slate-400">Multi-Language Translation</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                  <span className="text-xs font-medium text-slate-600 dark:text-slate-400">Powered by Gemini 3.5</span>
                </div>
              </div>
            </motion.div>

            {/* Hero Right Visual */}
            <motion.div 
              className="lg:col-span-5 relative"
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.1, ease: "easeOut" }}
            >
              <div className="bg-slate-900 text-slate-100 p-6 rounded-2xl shadow-2xl relative border border-slate-800">
                <div className="flex items-center gap-1.5 border-b border-slate-800 pb-4 mb-4">
                  <span className="w-2.5 h-2.5 rounded-full bg-rose-500" />
                  <span className="w-2.5 h-2.5 rounded-full bg-amber-500" />
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
                  <span className="text-xs font-mono text-slate-400 ml-2">ai-assistant-active.log</span>
                </div>
                
                <div className="space-y-4 text-left font-mono text-sm leading-relaxed text-slate-300">
                  <p className="text-slate-500">// Draft leave request proposal</p>
                  <p className="text-blue-400">&gt; Input details: "Sick leave for 2 days, handing over code to Alex"</p>
                  
                  <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 text-xs text-slate-400 space-y-2 mt-2">
                    <p className="font-semibold text-slate-200">Subject: Application for Leave - Senior Developer</p>
                    <p>Dear Manager,</p>
                    <p>I am writing to formally request leave due to medical reasons, starting from July 23 to July 24. I will resume my responsibilities on July 27.</p>
                    <p>I have aligned with Alex to oversee active pipelines in my absence...</p>
                  </div>
                  <div className="flex items-center justify-between text-xs text-slate-500 pt-2 border-t border-slate-800">
                    <span className="flex items-center gap-1 text-emerald-400">
                      <Sparkles className="w-3 h-3" /> Ready
                    </span>
                    <span>100ms response</span>
                  </div>
                </div>
              </div>
              
              {/* Floating accent elements */}
              <div className="absolute -top-6 -right-6 w-16 h-16 bg-blue-150/20 rounded-full mix-blend-multiply filter blur-md opacity-70 animate-pulse animate-duration-3000" />
              <div className="absolute -bottom-6 -left-6 w-20 h-20 bg-emerald-150/20 rounded-full mix-blend-multiply filter blur-md opacity-70 animate-pulse animate-duration-3000 delay-75" />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Target Users Banner */}
      <section className="bg-slate-100 dark:bg-slate-950 py-10 border-b border-slate-200 dark:border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-center text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-6">
            Tailored For Workplace Communication & Document Needs
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
            <div className="bg-white dark:bg-slate-900 p-4 rounded-xl shadow-xs border border-slate-200 dark:border-slate-800 flex items-center gap-3">
              <div className="bg-blue-50 dark:bg-blue-950/60 p-2.5 rounded-lg text-blue-600 dark:text-blue-400">
                <Briefcase className="w-5 h-5" />
              </div>
              <div className="text-left">
                <h4 className="text-sm font-semibold text-slate-900 dark:text-white">Employees</h4>
                <p className="text-xs text-slate-500 dark:text-slate-400">Fast official requests</p>
              </div>
            </div>

            <div className="bg-white dark:bg-slate-900 p-4 rounded-xl shadow-xs border border-slate-200 dark:border-slate-800 flex items-center gap-3">
              <div className="bg-emerald-50 dark:bg-emerald-950/60 p-2.5 rounded-lg text-emerald-600 dark:text-emerald-400">
                <Users className="w-5 h-5" />
              </div>
              <div className="text-left">
                <h4 className="text-sm font-semibold text-slate-900 dark:text-white">HR Departments</h4>
                <p className="text-xs text-slate-500 dark:text-slate-400">Perfect policy letters</p>
              </div>
            </div>

            <div className="bg-white dark:bg-slate-900 p-4 rounded-xl shadow-xs border border-slate-200 dark:border-slate-800 flex items-center gap-3">
              <div className="bg-amber-50 dark:bg-amber-950/60 p-2.5 rounded-lg text-amber-600 dark:text-amber-400">
                <GraduationCap className="w-5 h-5" />
              </div>
              <div className="text-left">
                <h4 className="text-sm font-semibold text-slate-900 dark:text-white">Students</h4>
                <p className="text-xs text-slate-500 dark:text-slate-400">Academic applications</p>
              </div>
            </div>

            <div className="bg-white dark:bg-slate-900 p-4 rounded-xl shadow-xs border border-slate-200 dark:border-slate-800 flex items-center gap-3">
              <div className="bg-violet-50 dark:bg-violet-950/60 p-2.5 rounded-lg text-violet-600 dark:text-violet-400">
                <Clock className="w-5 h-5" />
              </div>
              <div className="text-left">
                <h4 className="text-sm font-semibold text-slate-900 dark:text-white">Freelancers</h4>
                <p className="text-xs text-slate-500 dark:text-slate-400">Polite client updates</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Bento Grid */}
      <section id="features" className="py-20 bg-white dark:bg-slate-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight sm:text-4xl">
              Powering Professional Productivity
            </h2>
            <p className="mt-4 text-lg text-slate-600 dark:text-slate-300">
              Stop stressing over formatting and vocabulary. AI Office Assistant contains five core modules built explicitly for enterprise environments.
            </p>
          </div>

          <motion.div 
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
          >
            {/* Feature 1 */}
            <motion.div variants={itemVariants} className="bg-slate-50 dark:bg-slate-950 p-8 rounded-2xl border border-slate-100 dark:border-slate-800 flex flex-col justify-between text-left group hover:border-blue-200 hover:bg-blue-50/10 dark:hover:bg-slate-900/50 transition-all">
              <div>
                <div className="bg-blue-100 dark:bg-blue-900/40 text-blue-700 dark:text-blue-300 w-12 h-12 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <FileText className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">Smart Document Generator</h3>
                <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed">
                  Draft polished emails, medical/casual leave applications, complaint logs, HR messages, and weekly reports instantly with proper layout templates and accurate professional structure.
                </p>
              </div>
              <span className="text-blue-600 dark:text-blue-400 text-xs font-semibold flex items-center gap-1 mt-6">
                Generate in seconds <ArrowRight className="w-3 h-3" />
              </span>
            </motion.div>

            {/* Feature 2 */}
            <motion.div variants={itemVariants} className="bg-slate-50 dark:bg-slate-950 p-8 rounded-2xl border border-slate-100 dark:border-slate-800 flex flex-col justify-between text-left group hover:border-blue-200 hover:bg-blue-50/10 dark:hover:bg-slate-900/50 transition-all">
              <div>
                <div className="bg-emerald-100 dark:bg-emerald-900/40 text-emerald-700 dark:text-emerald-300 w-12 h-12 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <RefreshCw className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">Professional Tone Converter</h3>
                <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed">
                  Quickly convert a casual message, direct response, or rough notes into perfectly calibrated tones like Formal, Friendly, Polite, Executive, or Short & Clear.
                </p>
              </div>
              <span className="text-emerald-600 dark:text-emerald-400 text-xs font-semibold flex items-center gap-1 mt-6">
                Refine delivery <ArrowRight className="w-3 h-3" />
              </span>
            </motion.div>

            {/* Feature 3 */}
            <motion.div variants={itemVariants} className="bg-slate-50 dark:bg-slate-950 p-8 rounded-2xl border border-slate-100 dark:border-slate-800 flex flex-col justify-between text-left group hover:border-blue-200 hover:bg-blue-50/10 dark:hover:bg-slate-900/50 transition-all">
              <div>
                <div className="bg-amber-100 dark:bg-amber-900/40 text-amber-700 dark:text-amber-300 w-12 h-12 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <Search className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">AI Document Analyzer</h3>
                <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed">
                  Paste or upload reports, legal items, or meeting minutes. Gemini will extract key deliverables, list action items, find deadlines, and formulate professional response templates.
                </p>
              </div>
              <span className="text-amber-600 dark:text-amber-400 text-xs font-semibold flex items-center gap-1 mt-6">
                Analyze immediately <ArrowRight className="w-3 h-3" />
              </span>
            </motion.div>

            {/* Feature 4 */}
            <motion.div variants={itemVariants} className="bg-slate-50 dark:bg-slate-950 p-8 rounded-2xl border border-slate-100 dark:border-slate-800 flex flex-col justify-between text-left group hover:border-blue-200 hover:bg-blue-50/10 dark:hover:bg-slate-900/50 transition-all">
              <div>
                <div className="bg-purple-100 dark:bg-purple-900/40 text-purple-700 dark:text-purple-300 w-12 h-12 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <Globe className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">Multilingual Office Assistant</h3>
                <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed">
                  Bridge communication gaps flawlessly. Translate and polish incoming/outgoing letters between English, Urdu, and Arabic, transforming rough thoughts directly into professional prose.
                </p>
              </div>
              <span className="text-purple-600 dark:text-purple-400 text-xs font-semibold flex items-center gap-1 mt-6">
                Bridge language gaps <ArrowRight className="w-3 h-3" />
              </span>
            </motion.div>

            {/* Feature 5 */}
            <motion.div variants={itemVariants} className="bg-slate-50 dark:bg-slate-950 p-8 rounded-2xl border border-slate-100 dark:border-slate-800 flex flex-col justify-between text-left group hover:border-blue-200 hover:bg-blue-50/10 dark:hover:bg-slate-900/50 transition-all">
              <div>
                <div className="bg-rose-100 dark:bg-rose-900/40 text-rose-700 dark:text-rose-300 w-12 h-12 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <Sparkles className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">Template Library</h3>
                <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed">
                  Access a beautiful, rich library of ready-to-fill corporate application templates. Simply input dynamic placeholders to immediately get perfectly formatted copy.
                </p>
              </div>
              <span className="text-rose-600 dark:text-rose-400 text-xs font-semibold flex items-center gap-1 mt-6">
                Explore templates <ArrowRight className="w-3 h-3" />
              </span>
            </motion.div>

            {/* CTA Bento Block */}
            <motion.div variants={itemVariants} className="bg-slate-900 dark:bg-slate-950 p-8 rounded-2xl border border-slate-800 flex flex-col justify-between text-left text-white">
              <div>
                <h3 className="text-xl font-bold text-white mb-2">Ready to work smarter?</h3>
                <p className="text-slate-400 text-sm leading-relaxed">
                  Start using AI Office Assistant today to draft high-quality corporate applications, improve vocabulary, and analyze long project updates.
                </p>
              </div>
              <button
                id="btn-bento-start"
                onClick={onStart}
                className="mt-6 inline-flex items-center justify-center gap-2 px-5 py-3 bg-blue-600 text-white text-sm font-medium rounded-xl hover:bg-blue-500 transition-all cursor-pointer"
              >
                <span>Enter Workspace</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-900 text-slate-400 py-12 border-t border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4">
          <div className="flex justify-center items-center gap-2">
            <Sparkles className="w-5 h-5 text-blue-500" />
            <span className="text-lg font-bold text-white">AI Office Assistant</span>
          </div>
          <p className="text-sm">
            Designed for professional-grade document crafting, editing, and language translation.
          </p>
          <div className="text-xs text-slate-600 pt-4 border-t border-slate-800">
            &copy; 2026 AI Office Assistant. Powered by Gemini 3.5. Fully compliant with enterprise layout standards.
          </div>
        </div>
      </footer>
    </div>
  );
}
