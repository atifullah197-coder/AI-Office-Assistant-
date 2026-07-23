import React from "react";
import { User, Mail, Briefcase, FileSignature, CheckCircle, Sparkles } from "lucide-react";

interface UserProfileProps {
  userSettings: {
    name: string;
    email: string;
    role: string;
    department: string;
    signature: string;
    customInstructions: string;
  };
  onSaveSettings: (settings: any) => void;
}

export default function UserProfile({ userSettings, onSaveSettings }: UserProfileProps) {
  const [name, setName] = React.useState(userSettings.name);
  const [email, setEmail] = React.useState(userSettings.email);
  const [role, setRole] = React.useState(userSettings.role);
  const [department, setDepartment] = React.useState(userSettings.department);
  const [signature, setSignature] = React.useState(userSettings.signature);
  const [customInstructions, setCustomInstructions] = React.useState(userSettings.customInstructions);
  const [saved, setSaved] = React.useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSaveSettings({
      name,
      email,
      role,
      department,
      signature,
      customInstructions
    });
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  const autofillSignature = () => {
    if (name) {
      setSignature(`Best regards,\n${name}\n${role ? `${role}` : ""}${department ? ` | ${department}` : ""}\n${email ? `${email}` : ""}`);
    }
  };

  return (
    <div className="max-w-4xl mx-auto text-left space-y-8">
      {/* Title */}
      <div>
        <h2 className="text-2xl font-bold text-slate-900 flex items-center gap-2 tracking-tight">
          <User className="text-blue-600 w-6 h-6" />
          <span>User Profile & Workspace Settings</span>
        </h2>
        <p className="text-slate-500 text-sm mt-1">Configure your personal workspace context. These settings are referenced by the AI models to automatically populate signatures and personalize generated documents.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        
        {/* Left column info */}
        <div className="md:col-span-1 space-y-4">
          <div className="bg-slate-900 text-white p-6 rounded-2xl space-y-4 border border-slate-800 shadow-lg">
            <div className="w-16 h-16 rounded-full bg-blue-100 flex items-center justify-center text-blue-700 font-bold text-2xl border-4 border-slate-800">
              {name ? name.charAt(0).toUpperCase() : "U"}
            </div>
            <div>
              <h3 className="text-lg font-bold truncate">{name || "Workspace User"}</h3>
              <p className="text-xs text-slate-400 truncate">{role || "No role specified"}</p>
            </div>
            <div className="text-xs text-slate-400 space-y-2 border-t border-slate-800 pt-4">
              <p className="flex items-center gap-2 truncate">
                <Mail className="w-3.5 h-3.5 text-blue-400" />
                <span>{email || "No email linked"}</span>
              </p>
              <p className="flex items-center gap-2 truncate">
                <Briefcase className="w-3.5 h-3.5 text-blue-400" />
                <span>{department || "General Office"}</span>
              </p>
            </div>
          </div>

          <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 text-xs text-slate-600 space-y-2">
            <h4 className="font-semibold text-slate-800 flex items-center gap-1">
              <Sparkles className="w-3.5 h-3.5 text-blue-600" />
              <span>Workspace Context Benefit</span>
            </h4>
            <p className="leading-relaxed">
              When you generate letters or translate casual notes, the system automatically checks your profile to inject correct names, signatures, and titles as standard templates context.
            </p>
          </div>
        </div>

        {/* Right column settings form */}
        <div className="md:col-span-2">
          <form onSubmit={handleSubmit} className="bg-white p-6 rounded-2xl border border-gray-150 space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-slate-500 mb-1.5">Full Name</label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. John Doe"
                  className="w-full px-3 py-2 text-sm bg-slate-50 border border-slate-200 rounded-lg focus:outline-hidden focus:ring-1 focus:ring-blue-500 focus:bg-white"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-slate-500 mb-1.5">Work Email</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="john.doe@company.com"
                  className="w-full px-3 py-2 text-sm bg-slate-50 border border-slate-200 rounded-lg focus:outline-hidden focus:ring-1 focus:ring-blue-500 focus:bg-white"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-slate-500 mb-1.5">Job Title / Role</label>
                <input
                  type="text"
                  value={role}
                  onChange={(e) => setRole(e.target.value)}
                  placeholder="e.g. Senior Project Coordinator"
                  className="w-full px-3 py-2 text-sm bg-slate-50 border border-slate-200 rounded-lg focus:outline-hidden focus:ring-1 focus:ring-blue-500 focus:bg-white"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-slate-500 mb-1.5">Department</label>
                <input
                  type="text"
                  value={department}
                  onChange={(e) => setDepartment(e.target.value)}
                  placeholder="e.g. Human Resources"
                  className="w-full px-3 py-2 text-sm bg-slate-50 border border-slate-200 rounded-lg focus:outline-hidden focus:ring-1 focus:ring-blue-500 focus:bg-white"
                />
              </div>
            </div>

            {/* Custom Signature */}
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <label className="block text-xs font-semibold uppercase tracking-wider text-slate-500">Default Signature Block</label>
                <button
                  type="button"
                  onClick={autofillSignature}
                  className="text-xs text-blue-600 hover:underline font-semibold flex items-center gap-1 cursor-pointer"
                >
                  <FileSignature className="w-3.5 h-3.5" />
                  <span>Auto-generate Signature</span>
                </button>
              </div>
              <textarea
                value={signature}
                onChange={(e) => setSignature(e.target.value)}
                placeholder={`Best regards,\nJohn Doe\nSenior Coordinator | HR\njohn.doe@company.com`}
                rows={4}
                className="w-full px-3.5 py-2.5 text-sm font-mono bg-slate-50 border border-slate-200 rounded-xl focus:outline-hidden focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all leading-relaxed"
              />
              <span className="text-[10px] text-slate-400 block">This signature block is automatically appended to generated emails and letters.</span>
            </div>

            {/* Custom System Instructions */}
            <div className="space-y-2">
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-500">Custom Writing Constraints (AI System Prompts)</label>
              <textarea
                value={customInstructions}
                onChange={(e) => setCustomInstructions(e.target.value)}
                placeholder="Example: My office strictly uses British English spelling (e.g. colour, categorise). Keep emails very short, avoiding flowery words."
                rows={3}
                className="w-full px-3.5 py-2.5 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:outline-hidden focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all leading-relaxed"
              />
              <span className="text-[10px] text-slate-400 block">Personalize the AI rules. Enter specific industry guidelines, formatting choices, or spelling modes you expect.</span>
            </div>

            {/* Save Buttons */}
            <div className="flex items-center justify-between pt-4 border-t border-slate-100">
              <div className="flex items-center gap-2">
                {saved && (
                  <span className="flex items-center gap-1.5 text-xs font-semibold text-emerald-600 bg-emerald-50 px-2.5 py-1.5 rounded-lg border border-emerald-100">
                    <CheckCircle className="w-4 h-4" />
                    <span>Settings Saved Successfully!</span>
                  </span>
                )}
              </div>
              <button
                id="btn-save-profile-settings"
                type="submit"
                className="px-6 py-2.5 bg-slate-900 hover:bg-blue-600 text-white text-xs font-bold rounded-lg transition-colors cursor-pointer"
              >
                Save Profile Settings
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
