import React from "react";
import { ZoomIn, ZoomOut, Maximize2 } from "lucide-react";

interface DiagramControlsProps {
  zoomLevelDisplay: number;
  onZoomIn: () => void;
  onZoomOut: () => void;
  onResetView: () => void;
}

export const DiagramControls: React.FC<DiagramControlsProps> = ({
  zoomLevelDisplay,
  onZoomIn,
  onZoomOut,
  onResetView,
}) => {
  return (
    <div className="absolute top-3 right-3 z-20 flex items-center gap-1.5 bg-slate-900/90 backdrop-blur-md p-1.5 rounded-2xl border border-slate-800 shadow-xl select-none">
      <button
        onClick={onZoomIn}
        aria-label="Zoom In (+)"
        className="p-1.5 sm:p-2 bg-slate-800 hover:bg-slate-700 text-slate-200 hover:text-white rounded-xl transition-all cursor-pointer"
        title="Zoom In (+)"
      >
        <ZoomIn className="w-4 h-4" />
      </button>
      <div className="px-2 sm:px-2.5 py-1 text-[11px] sm:text-xs font-mono font-bold text-sky-400 bg-slate-950/80 rounded-lg border border-slate-800/80 min-w-12.5 sm:min-w-13.5 text-center">
        {zoomLevelDisplay}%
      </div>
      <button
        onClick={onZoomOut}
        aria-label="Zoom Out (-)"
        className="p-1.5 sm:p-2 bg-slate-800 hover:bg-slate-700 text-slate-200 hover:text-white rounded-xl transition-all cursor-pointer"
        title="Zoom Out (-)"
      >
        <ZoomOut className="w-4 h-4" />
      </button>
      <div className="w-px h-4 sm:h-5 bg-slate-800 my-auto mx-0.5" />
      <button
        onClick={onResetView}
        aria-label="Fit View / Reset Diagram Camera"
        className="px-2.5 py-1.5 bg-slate-800 hover:bg-slate-700 text-[11px] sm:text-xs font-semibold text-slate-200 hover:text-white rounded-xl transition-all cursor-pointer flex items-center gap-1.5"
        title="Fit All Nodes"
      >
        <Maximize2 className="w-3.5 h-3.5 text-sky-400" />
        <span className="hidden xs:inline">Fit View</span>
      </button>
    </div>
  );
};

export default DiagramControls;
