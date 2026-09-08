import React from "react";

export const TechStackGrid: React.FC = () => {
  return (
    <section className="grid grid-cols-1 xs:grid-cols-2 md:grid-cols-4 gap-2.5 sm:gap-3">
      <div className="p-3 bg-slate-900/40 border border-slate-800/80 rounded-xl text-center">
        <div className="text-[11px] sm:text-xs text-slate-400 font-mono">
          Frontend
        </div>
        <div className="text-xs sm:text-sm font-bold text-sky-400 mt-1">
          React / TypeScript
        </div>
      </div>
      <div className="p-3 bg-slate-900/40 border border-slate-800/80 rounded-xl text-center">
        <div className="text-[11px] sm:text-xs text-slate-400 font-mono">
          Backend
        </div>
        <div className="text-xs sm:text-sm font-bold text-purple-400 mt-1">
          Node / Express / Go
        </div>
      </div>
      <div className="p-3 bg-slate-900/40 border border-slate-800/80 rounded-xl text-center">
        <div className="text-[11px] sm:text-xs text-slate-400 font-mono">
          Databases
        </div>
        <div className="text-xs sm:text-sm font-bold text-emerald-400 mt-1">
          MongoDB / Redis
        </div>
      </div>
      <div className="p-3 bg-slate-900/40 border border-slate-800/80 rounded-xl text-center">
        <div className="text-[11px] sm:text-xs text-slate-400 font-mono">
          DNS & Host IP
        </div>
        <div className="text-xs sm:text-sm font-bold text-amber-400 font-mono mt-1">
          93.184.216.34
        </div>
      </div>
    </section>
  );
};

export default TechStackGrid;
