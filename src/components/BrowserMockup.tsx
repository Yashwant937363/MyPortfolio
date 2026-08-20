import React, { useState } from "react";
import {
  Lock,
  ArrowLeft,
  ArrowRight,
  RotateCw,
  Search,
  Globe,
  Shield,
} from "lucide-react";

interface BrowserMockupProps {
  initialUrl?: string;
  onNavigate?: (url: string) => void;
  children?: React.ReactNode;
}

export const BrowserMockup: React.FC<BrowserMockupProps> = ({
  initialUrl = "yashwantpoyrekar.dev",
  onNavigate,
  children,
}) => {
  const [url, setUrl] = useState(initialUrl);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (onNavigate) {
      onNavigate(url);
    }
  };

  return (
    <div className="w-full h-full bg-slate-950 text-slate-100 flex flex-col font-sans overflow-hidden">
      {/* Navigation Toolbar */}
      <div className="flex flex-col sm:flex-row items-center gap-2 sm:gap-3 px-3 sm:px-4 py-2 bg-slate-900 border-b border-slate-800/80">
        <div className="flex items-center justify-between w-full sm:w-auto gap-2">
          {/* Back / Forward / Refresh controls */}
          <div className="flex items-center space-x-1 text-slate-400">
            <button className="p-1.5 hover:bg-slate-800 rounded-lg transition-colors text-slate-500 cursor-not-allowed">
              <ArrowLeft className="w-4 h-4" />
            </button>
            <button className="p-1.5 hover:bg-slate-800 rounded-lg transition-colors text-slate-500 cursor-not-allowed">
              <ArrowRight className="w-4 h-4" />
            </button>
            <button className="p-1.5 hover:bg-slate-800 rounded-lg text-slate-400 hover:text-white transition-colors">
              <RotateCw className="w-4 h-4" />
            </button>
          </div>

          {/* Mobile Security badge */}
          <div className="flex sm:hidden items-center space-x-1 px-2 py-0.5 bg-emerald-500/10 border border-emerald-500/20 rounded-md text-emerald-400 text-[10px]">
            <Shield className="w-3 h-3" />
            <span className="font-mono">Secure</span>
          </div>
        </div>

        {/* Center URL Input Form */}
        <form
          onSubmit={handleSubmit}
          className="w-full flex-1 flex items-center justify-center"
        >
          <div className="relative w-full max-w-2xl flex items-center bg-slate-950/90 border border-slate-800 focus-within:border-sky-500/80 rounded-xl px-2.5 sm:px-3 py-1 sm:py-1.5 shadow-inner transition-all">
            <Lock className="w-3.5 h-3.5 text-emerald-400 mr-1.5 sm:mr-2 shrink-0" />
            <span className="text-[11px] sm:text-xs text-emerald-400 font-mono select-none mr-1 hidden xs:inline">
              https://
            </span>
            <input
              type="text"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              autoFocus
              onFocus={(e) => {
                // Position cursor at the end of the input
                const val = e.target.value;
                e.target.value = "";
                e.target.value = val;
              }}
              className="flex-1 min-w-0 bg-transparent text-[11px] sm:text-xs font-mono text-slate-100 focus:outline-none tracking-wide"
              placeholder="Enter URL..."
            />
            <button
              type="submit"
              className="ml-1.5 sm:ml-2 px-2.5 sm:px-3 py-1 bg-sky-600 hover:bg-sky-500 text-white rounded-lg text-xs font-medium flex items-center gap-1 transition-colors cursor-pointer shrink-0"
            >
              <Search className="w-3.5 h-3.5" />
              <span className="hidden xs:inline">Go</span>
            </button>
          </div>
        </form>

        {/* Desktop Security badge */}
        <div className="hidden sm:flex items-center space-x-1 px-2.5 py-1 bg-emerald-500/10 border border-emerald-500/20 rounded-lg text-emerald-400 text-xs shrink-0">
          <Shield className="w-3.5 h-3.5" />
          <span className="font-mono text-[11px]">Secure</span>
        </div>
      </div>

      {/* Main Viewport Window */}
      <div className="flex-1 w-full p-3 sm:p-6 bg-slate-950 flex flex-col items-center justify-center relative overflow-y-auto overflow-x-hidden">
        {children || (
          <div className="text-center space-y-3 p-4">
            <div className="p-3 bg-sky-500/10 text-sky-400 rounded-2xl border border-sky-500/20 w-fit mx-auto animate-pulse">
              <Globe className="w-8 h-8" />
            </div>
            <h2 className="text-lg sm:text-xl font-bold text-white tracking-wide">
              Welcome to{" "}
              <span className="text-sky-400 font-mono">
                yashwantpoyrekar.dev
              </span>
            </h2>
            <p className="text-xs text-slate-400 max-w-sm">
              Browser frame ready for ONE LARGE WORLD architecture traversal.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default BrowserMockup;
