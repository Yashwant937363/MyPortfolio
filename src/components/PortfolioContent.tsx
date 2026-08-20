import React from "react";
import { User, RotateCcw, Zap } from "lucide-react";

interface PortfolioContentProps {
  onClearCache: () => void;
  onInspectDiagram: () => void;
}

export const PortfolioContent: React.FC<PortfolioContentProps> = ({
  onClearCache,
  onInspectDiagram
}) => {
  return (
    <div className="w-full max-w-4xl p-3 sm:p-6 space-y-4 sm:space-y-6 text-left overflow-y-auto max-h-[calc(100vh-100px)]">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between border-b border-slate-800 pb-4 gap-3">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-2xl bg-gradient-to-tr from-sky-500 to-blue-600 flex items-center justify-center text-white font-bold text-lg sm:text-xl shadow-lg shrink-0">
            YP
          </div>
          <div>
            <h1 className="text-xl sm:text-2xl font-extrabold text-white">Yashwant Poyrekar</h1>
            <p className="text-[11px] sm:text-xs text-sky-400 font-mono">Full Stack Developer & AI Enthusiast</p>
          </div>
        </div>

        <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
          <button
            onClick={onClearCache}
            className="px-2.5 sm:px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-[11px] sm:text-xs text-slate-300 rounded-xl border border-slate-700 flex items-center gap-1.5 transition-all cursor-pointer"
          >
            <RotateCcw className="w-3.5 h-3.5" /> Clear DNS Cache
          </button>
          <button
            onClick={onInspectDiagram}
            className="px-2.5 sm:px-3 py-1.5 bg-sky-600/30 hover:bg-sky-600/50 text-[11px] sm:text-xs text-sky-300 rounded-xl border border-sky-500/40 flex items-center gap-1.5 transition-all cursor-pointer"
          >
            <Zap className="w-3.5 h-3.5" /> Inspect Diagram
          </button>
        </div>
      </div>

      {/* Bio Section */}
      <div className="bg-slate-900/60 rounded-2xl p-4 sm:p-5 border border-slate-800/80 space-y-2 sm:space-y-3">
        <h2 className="text-xs sm:text-sm font-bold text-slate-200 uppercase tracking-wider flex items-center gap-2">
          <User className="w-4 h-4 text-sky-400" /> About
        </h2>
        <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
          👋 Meet Yashwant Poyrekar — A passionate developer who loves turning ideas into real, working solutions. From building clean web interfaces to exploring the world of AI, Yashwant is always experimenting, learning, and creating.
        </p>
      </div>

      {/* Tech Stack Grid */}
      <div className="grid grid-cols-1 xs:grid-cols-2 md:grid-cols-4 gap-2.5 sm:gap-3">
        <div className="p-3 bg-slate-900/40 border border-slate-800/80 rounded-xl text-center">
          <div className="text-[11px] sm:text-xs text-slate-400 font-mono">Frontend</div>
          <div className="text-xs sm:text-sm font-bold text-sky-400 mt-1">React / TypeScript</div>
        </div>
        <div className="p-3 bg-slate-900/40 border border-slate-800/80 rounded-xl text-center">
          <div className="text-[11px] sm:text-xs text-slate-400 font-mono">Backend</div>
          <div className="text-xs sm:text-sm font-bold text-purple-400 mt-1">Node / Express / Go</div>
        </div>
        <div className="p-3 bg-slate-900/40 border border-slate-800/80 rounded-xl text-center">
          <div className="text-[11px] sm:text-xs text-slate-400 font-mono">Databases</div>
          <div className="text-xs sm:text-sm font-bold text-emerald-400 mt-1">MongoDB / Redis</div>
        </div>
        <div className="p-3 bg-slate-900/40 border border-slate-800/80 rounded-xl text-center">
          <div className="text-[11px] sm:text-xs text-slate-400 font-mono">DNS & IP</div>
          <div className="text-xs sm:text-sm font-bold text-amber-400 font-mono mt-1">93.184.216.34</div>
        </div>
      </div>
    </div>
  );
};

export default PortfolioContent;
