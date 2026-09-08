import React from "react";
import { CheckCircle2, ArrowRight } from "lucide-react";

export const DiagramFooter: React.FC = () => {
  return (
    <footer className="relative z-10 w-full max-w-6xl flex items-center justify-between text-[10px] sm:text-[11px] text-slate-400 px-2 py-1">
      <div className="flex items-center gap-2 sm:gap-4">
        <span className="flex items-center gap-1 truncate">
          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />{" "}
          DNS Cache Enabled
        </span>
        <span className="hidden xs:flex items-center gap-1 truncate">
          <ArrowRight className="w-3.5 h-3.5 text-sky-400 shrink-0" />{" "}
          Interactive Zoom & Node Inspector
        </span>
      </div>
      <div className="truncate">ONE LARGE WORLD Architecture</div>
    </footer>
  );
};

export default DiagramFooter;
