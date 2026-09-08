import React from "react";
import { Globe } from "lucide-react";

interface DiagramHeaderProps {
  currentStepText: string;
  cacheHitMessage: string | null;
  onBackToBrowser: () => void;
}

export const DiagramHeader: React.FC<DiagramHeaderProps> = ({
  currentStepText,
  cacheHitMessage,
  onBackToBrowser,
}) => {
  return (
    <header className="relative z-10 w-full max-w-6xl flex flex-col sm:flex-row items-center justify-between py-2 px-3 sm:px-5 bg-slate-900/90 backdrop-blur-md rounded-2xl border border-slate-800 shadow-xl gap-2 sm:gap-0">
      <div className="flex items-center space-x-3 w-full sm:w-auto">
        <div className="p-1.5 sm:p-2 bg-sky-500/20 text-sky-400 rounded-xl border border-sky-500/30 shrink-0">
          <Globe className="w-4 h-4 sm:w-5 sm:h-5 animate-spin" />
        </div>
        <div className="min-w-0 flex-1">
          <h1 className="text-xs sm:text-sm font-bold text-white flex items-center gap-2 truncate">
            ONE LARGE WORLD{" "}
            <span className="text-[9px] sm:text-[10px] uppercase px-2 py-0.5 rounded-full bg-sky-500/20 text-sky-400 border border-sky-500/30 font-mono shrink-0">
              Interactive Diagram
            </span>
          </h1>
          <p className="text-[10px] sm:text-[11px] text-slate-400 truncate">
            {currentStepText}
          </p>
        </div>
      </div>

      <div className="flex items-center justify-between sm:justify-end gap-2 w-full sm:w-auto">
        {cacheHitMessage && (
          <div className="text-[10px] sm:text-xs px-2.5 py-1 bg-amber-500/20 border border-amber-500/40 text-amber-300 rounded-xl font-mono animate-pulse truncate max-w-50 sm:max-w-none">
            {cacheHitMessage}
          </div>
        )}
        <button
          onClick={onBackToBrowser}
          aria-label="Back to Browser View"
          className="px-2.5 sm:px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-[11px] sm:text-xs text-slate-300 rounded-xl border border-slate-700 transition-all cursor-pointer shrink-0"
        >
          Back to Browser
        </button>
      </div>
    </header>
  );
};

export default DiagramHeader;
