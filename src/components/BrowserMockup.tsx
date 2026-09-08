import React, { useState, useEffect } from "react";
import {
  Lock,
  ArrowLeft,
  ArrowRight,
  RotateCw,
  Search,
  Globe,
  Shield,
  RotateCcw,
  Zap,
} from "lucide-react";

interface BrowserMockupProps {
  initialUrl?: string;
  currentUrl?: string;
  onNavigate?: (url: string) => void;
  onClearCache?: () => void;
  onInspectDiagram?: () => void;
  children?: React.ReactNode;
}

const DOMAIN = "yashwantpoyrekar.dev";

export const BrowserMockup: React.FC<BrowserMockupProps> = ({
  initialUrl = "yashwantpoyrekar.dev/about",
  currentUrl,
  onNavigate,
  onClearCache,
  onInspectDiagram,
  children,
}) => {
  // Extract path from input string (e.g., "yashwantpoyrekar.dev/about" -> "/about")
  const extractPath = (fullUrl?: string) => {
    if (!fullUrl) return "/about";
    if (fullUrl.includes(DOMAIN)) {
      const idx = fullUrl.indexOf(DOMAIN);
      const afterDomain = fullUrl.substring(idx + DOMAIN.length);
      return afterDomain.startsWith("/") ? afterDomain : `/${afterDomain}`;
    }
    return fullUrl.startsWith("/") ? fullUrl : `/${fullUrl}`;
  };

  const [path, setPath] = useState<string>(extractPath(currentUrl || initialUrl));

  useEffect(() => {
    if (currentUrl) {
      setPath(extractPath(currentUrl));
    }
  }, [currentUrl]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    let formattedPath = path.trim();
    if (!formattedPath.startsWith("/")) {
      formattedPath = `/${formattedPath}`;
    }
    const fullUrl = `${DOMAIN}${formattedPath}`;
    if (onNavigate) {
      onNavigate(fullUrl);
    }
  };

  return (
    <div className="w-full h-full bg-slate-950 text-slate-100 flex flex-col font-sans overflow-hidden">
      {/* Top Browser Navigation Toolbar */}
      <div className="flex flex-col md:flex-row items-center gap-2 sm:gap-3 px-3 sm:px-4 py-2 bg-slate-900 border-b border-slate-800/80">
        <div className="flex items-center justify-between w-full md:w-auto gap-2">
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
          <div className="flex md:hidden items-center space-x-1 px-2 py-0.5 bg-emerald-500/10 border border-emerald-500/20 rounded-md text-emerald-400 text-[10px]">
            <Shield className="w-3 h-3" />
            <span className="font-mono">Secure</span>
          </div>
        </div>

        {/* Center Locked Domain + Editable Path Input Form */}
        <form
          onSubmit={handleSubmit}
          className="w-full flex-1 flex items-center justify-center"
        >
          <div className="relative w-full max-w-2xl flex items-center bg-slate-950/90 border border-slate-800 focus-within:border-sky-500/80 rounded-xl px-2.5 sm:px-3 py-1 sm:py-1.5 shadow-inner transition-all font-mono">
            <Lock className="w-3.5 h-3.5 text-emerald-400 mr-1.5 sm:mr-2 shrink-0" />
            <span className="text-[11px] sm:text-xs text-emerald-400 select-none mr-1 hidden xs:inline shrink-0">
              https://
            </span>

            {/* Read-only locked domain label */}
            <span className="text-[11px] sm:text-xs text-slate-200 font-bold select-none shrink-0 bg-slate-900/80 px-1.5 py-0.5 rounded border border-slate-800 mr-1">
              {DOMAIN}
            </span>

            {/* Editable path input */}
            <input
              type="text"
              value={path}
              onChange={(e) => setPath(e.target.value)}
              className="flex-1 min-w-0 bg-transparent text-[11px] sm:text-xs font-mono text-sky-400 font-semibold focus:outline-none tracking-wide"
              placeholder="/about"
            />

            <button
              type="submit"
              aria-label="Navigate Path"
              className="ml-1.5 sm:ml-2 px-2.5 sm:px-3 py-1 bg-sky-600 hover:bg-sky-500 text-white rounded-lg text-xs font-medium flex items-center gap-1 transition-colors cursor-pointer shrink-0"
            >
              <Search className="w-3.5 h-3.5" />
              <span className="hidden xs:inline">Go</span>
            </button>
          </div>
        </form>

        {/* Action Controls Beside URL Bar: Clear DNS Cache & Inspect Diagram */}
        <div className="flex items-center gap-2 w-full md:w-auto justify-end shrink-0">
          {onClearCache && (
            <button
              onClick={onClearCache}
              aria-label="Clear DNS Local Storage Cache"
              className="px-2.5 py-1 bg-slate-800 hover:bg-slate-700 text-[11px] sm:text-xs text-slate-300 rounded-lg border border-slate-700 flex items-center gap-1.5 transition-all cursor-pointer whitespace-nowrap"
              title="Clear Local DNS Cache"
            >
              <RotateCcw className="w-3.5 h-3.5 text-slate-400" />
              <span className="hidden sm:inline">Clear DNS Cache</span>
            </button>
          )}

          {onInspectDiagram && (
            <button
              onClick={onInspectDiagram}
              aria-label="Inspect ONE LARGE WORLD Architecture Diagram"
              className="px-2.5 py-1 bg-sky-600/30 hover:bg-sky-600/50 text-[11px] sm:text-xs text-sky-300 rounded-lg border border-sky-500/40 flex items-center gap-1.5 transition-all cursor-pointer whitespace-nowrap"
              title="Inspect Diagram Architecture"
            >
              <Zap className="w-3.5 h-3.5 text-sky-400" />
              <span className="hidden sm:inline">Inspect Diagram</span>
            </button>
          )}

          {/* Desktop Security badge */}
          <div className="hidden lg:flex items-center space-x-1 px-2 py-1 bg-emerald-500/10 border border-emerald-500/20 rounded-lg text-emerald-400 text-xs shrink-0">
            <Shield className="w-3.5 h-3.5" />
            <span className="font-mono text-[11px]">Secure</span>
          </div>
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
