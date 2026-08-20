import type React from "react";
import type { DiagramNode } from "../types/diagramData";

interface DiagramNodeCardProps {
  node: DiagramNode;
  isActive: boolean;
  isProcessing: boolean;
  scrollOffset: number;
  highlightRecordKey: string | null;
  onClick?: () => void;
}

export const DiagramNodeCard: React.FC<DiagramNodeCardProps> = ({
  node,
  isActive,
  isProcessing,
  scrollOffset,
  highlightRecordKey,
  onClick
}) => {
  const Icon = node.icon;

  return (
    <g
      transform={`translate(${node.x}, ${node.y})`}
      onClick={(e) => {
        e.stopPropagation();
        if (onClick) onClick();
      }}
      className="transition-all duration-300 cursor-pointer group select-none"
    >
      {/* Active Ping Ring */}
      {isActive && (
        <circle
          r={isProcessing ? "140" : "85"}
          fill="none"
          stroke={node.color}
          strokeWidth="2.5"
          className="animate-ping opacity-50 pointer-events-none"
        />
      )}

      {/* Node Container Card (Expands when processing) */}
      <rect
        x={isProcessing ? "-170" : "-110"}
        y={isProcessing ? "-130" : "-55"}
        width={isProcessing ? "340" : "220"}
        height={isProcessing ? "270" : "120"}
        rx={isProcessing ? "24" : "20"}
        fill={isActive ? "#0f172a" : "#1e293b"}
        stroke={isActive ? node.color : "#334155"}
        strokeWidth={isProcessing ? "4" : isActive ? "3.5" : "1.5"}
        filter={isActive ? "url(#glow)" : undefined}
        className="transition-all duration-300 ease-out group-hover:stroke-sky-400 group-hover:fill-slate-800/90"
      />

      {/* Info / Inspect badge hint on hover */}
      {!isProcessing && (
        <g transform="translate(85, -40)" className="opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none">
          <rect x="-24" y="-8" width="48" height="16" rx="8" fill={node.color} className="opacity-90" />
          <text x="0" y="3" textAnchor="middle" fill="#ffffff" fontSize="8" fontWeight="bold">
            Inspect
          </text>
        </g>
      )}

      {/* Header Icon */}
      <circle
        cx={isProcessing ? "-130" : "-75"}
        cy={isProcessing ? "-90" : "-25"}
        r={isProcessing ? "24" : "20"}
        fill={isActive ? node.color : "#334155"}
        className="transition-all duration-500"
      />
      <g
        transform={
          isProcessing
            ? "translate(-143, -103) scale(0.95)"
            : "translate(-86, -36) scale(0.8)"
        }
        className="transition-all duration-500"
      >
        <Icon className="w-6 h-6 text-white" />
      </g>

      {/* Titles */}
      <text
        x={isProcessing ? "-95" : "-45"}
        y={isProcessing ? "-95" : "-30"}
        fill="#f8fafc"
        fontSize={isProcessing ? "17" : "14"}
        fontWeight="bold"
        className="transition-all duration-500"
      >
        {node.title}
      </text>
      <text
        x={isProcessing ? "-95" : "-45"}
        y={isProcessing ? "-75" : "-12"}
        fill="#94a3b8"
        fontSize={isProcessing ? "11" : "9"}
        className="transition-all duration-500"
      >
        {node.subtitle}
      </text>

      {/* Processing Badge Indicator */}
      {isProcessing && (
        <g transform="translate(80, -100)">
          <rect x="-45" y="-12" width="90" height="24" rx="12" fill="#0284c7" className="animate-pulse" />
          <text x="0" y="4" textAnchor="middle" fill="#ffffff" fontSize="9" fontWeight="bold">
            SEARCHING...
          </text>
        </g>
      )}

      {/* NODE PROCESS CONTAINER (SHOWS VISIBLE LIST ITEMS & LIVE SELECTION) */}
      {node.records && (
        <foreignObject
          x={isProcessing ? "-155" : "-98"}
          y={isProcessing ? "-55" : "5"}
          width={isProcessing ? "310" : "196"}
          height={isProcessing ? "185" : "50"}
          className="transition-all duration-500"
        >
          <div
            className={`w-full h-full rounded-xl border font-mono transition-all duration-500 overflow-hidden relative shadow-inner ${
              isProcessing
                ? "bg-slate-950/95 border-sky-500/80 p-2 text-xs"
                : "bg-slate-950/90 border-slate-800 p-1.5 text-[10px]"
            }`}
          >
            <div
              className="space-y-1 transition-transform ease-out"
              style={{
                transform: `translateY(-${scrollOffset}px)`
              }}
            >
              {node.records.map((rec, rIdx) => {
                const isHighlighted = highlightRecordKey === rec.key;
                return (
                  <div
                    key={rIdx}
                    className={`flex items-center justify-between px-2.5 py-1 rounded-md transition-all ${
                      isHighlighted
                        ? "bg-sky-500/40 text-sky-200 font-bold border border-sky-400/90 shadow-lg scale-[1.02]"
                        : "text-slate-400 bg-slate-900/60"
                    }`}
                  >
                    <span className="truncate max-w-[150px]">{rec.key}</span>
                    <span className="opacity-90 truncate max-w-[120px] text-right font-semibold">
                      {rec.value}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        </foreignObject>
      )}
    </g>
  );
};

export default DiagramNodeCard;
