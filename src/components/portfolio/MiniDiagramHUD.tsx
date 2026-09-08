import React, { useEffect, useState } from "react";
import { Globe, Server, ArrowRight, CheckCircle2, Zap } from "lucide-react";

interface MiniDiagramHUDProps {
  activePath: string;
  onRequestTrigger?: number; // timestamp to force animation restart on route change
}

export const MiniDiagramHUD: React.FC<MiniDiagramHUDProps> = ({
  activePath,
  onRequestTrigger,
}) => {
  const [animStage, setAnimStage] = useState<"idle" | "requesting" | "responding" | "done">("done");

  useEffect(() => {
    // Start page request animation cycle whenever route path changes
    setAnimStage("requesting");

    const t1 = setTimeout(() => {
      setAnimStage("responding");
    }, 450);

    const t2 = setTimeout(() => {
      setAnimStage("done");
    }, 950);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
    };
  }, [activePath, onRequestTrigger]);

  const isRequesting = animStage === "requesting";
  const isResponding = animStage === "responding";

  return (
    <div className="fixed bottom-4 right-4 z-40 w-72 sm:w-80 bg-slate-900/95 border border-sky-500/40 text-slate-100 p-3 rounded-2xl shadow-2xl backdrop-blur-xl transition-all duration-300 font-mono pointer-events-none select-none">
      {/* HUD Header */}
      <div className="flex items-center justify-between border-b border-slate-800 pb-2 mb-2">
        <div className="flex items-center space-x-2">
          <div className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
          <span className="text-[11px] font-bold text-sky-400 uppercase tracking-wider flex items-center gap-1">
            <Zap className="w-3 h-3 text-sky-400" /> Page Request Diagram
          </span>
        </div>
        <span className="text-[10px] text-slate-400 bg-slate-800 px-1.5 py-0.5 rounded border border-slate-700 font-bold">
          200 OK
        </span>
      </div>

      {/* Mini Schematic Node Connection Canvas */}
      <div className="relative w-full h-16 bg-slate-950/80 rounded-xl border border-slate-800/90 overflow-hidden my-1 flex items-center justify-between px-3">
        {/* SVG Mini Curved Path & Traveling Envelope Dot */}
        <svg className="absolute inset-0 w-full h-full pointer-events-none">
          <path
            d="M 35 32 C 90 60, 210 60, 265 32"
            fill="none"
            stroke={isRequesting || isResponding ? "#38bdf8" : "#334155"}
            strokeWidth="2"
            strokeDasharray="4 4"
            className="transition-colors duration-300"
          />
        </svg>

        {/* Node 1: User Browser */}
        <div
          className={`relative z-10 flex flex-col items-center gap-1 transition-transform duration-300 ${
            isResponding ? "scale-110" : ""
          }`}
        >
          <div className="w-8 h-8 rounded-xl bg-sky-500/20 border border-sky-500/40 flex items-center justify-center text-sky-400 shadow-md">
            <Globe className="w-4 h-4" />
          </div>
          <span className="text-[9px] text-slate-400 font-bold">Browser</span>
        </div>

        {/* Dynamic Flying Packet Tag */}
        <div className="relative z-10 flex flex-col items-center justify-center">
          {isRequesting && (
            <div className="px-2 py-0.5 bg-sky-500 text-slate-950 font-extrabold text-[9px] rounded-full shadow-lg shadow-sky-500/50 flex items-center gap-1 animate-pulse">
              <span>GET {activePath}</span>
              <ArrowRight className="w-2.5 h-2.5" />
            </div>
          )}
          {isResponding && (
            <div className="px-2 py-0.5 bg-emerald-500 text-slate-950 font-extrabold text-[9px] rounded-full shadow-lg shadow-emerald-500/50 flex items-center gap-1 animate-pulse">
              <CheckCircle2 className="w-2.5 h-2.5" />
              <span>200 OK Data</span>
            </div>
          )}
          {!isRequesting && !isResponding && (
            <span className="text-[9px] text-slate-500 font-mono">
              API Gateway Idle
            </span>
          )}
        </div>

        {/* Node 2: Web Server / API Host */}
        <div
          className={`relative z-10 flex flex-col items-center gap-1 transition-transform duration-300 ${
            isRequesting ? "scale-110" : ""
          }`}
        >
          <div className="w-8 h-8 rounded-xl bg-purple-500/20 border border-purple-500/40 flex items-center justify-center text-purple-400 shadow-md">
            <Server className="w-4 h-4" />
          </div>
          <span className="text-[9px] text-slate-400 font-bold">API Host</span>
        </div>
      </div>

      {/* Footer Info Status */}
      <div className="flex items-center justify-between text-[10px] text-slate-400 pt-1">
        <span className="truncate">
          Request: <span className="text-sky-300 font-semibold">{activePath}</span>
        </span>
        <span className="text-slate-500 font-mono">Host: 93.184.216.34</span>
      </div>
    </div>
  );
};

export default MiniDiagramHUD;
