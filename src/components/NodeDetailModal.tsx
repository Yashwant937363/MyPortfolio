import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "./ui/dialog";
import type { DiagramNode } from "../types/diagramData";
import { Search, MapPin, Eye, Copy, Check } from "lucide-react";

interface NodeDetailModalProps {
  node: DiagramNode | null;
  onClose: () => void;
  onFocusNode?: (nodeId: string) => void;
}

export const NodeDetailModal: React.FC<NodeDetailModalProps> = ({
  node,
  onClose,
  onFocusNode,
}) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  if (!node) return null;

  const Icon = node.icon;

  const filteredRecords = node.records?.filter(
    (r) =>
      r.key.toLowerCase().includes(searchTerm.toLowerCase()) ||
      r.value.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleCopy = (text: string, key: string) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 2000);
  };

  return (
    <Dialog open={!!node} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="max-w-xl bg-slate-900/95 border-slate-800 text-slate-100 backdrop-blur-xl p-6 rounded-2xl shadow-2xl overflow-hidden">
        <DialogHeader className="flex flex-row items-start justify-between gap-4 pb-2 border-b border-slate-800/80">
          <div className="flex items-center space-x-3.5">
            <div
              className="w-12 h-12 rounded-2xl flex items-center justify-center text-white shadow-lg shrink-0"
              style={{ backgroundColor: node.color }}
            >
              <Icon className="w-6 h-6 text-white" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span
                  className="text-[10px] font-mono font-bold uppercase tracking-wider px-2 py-0.5 rounded-md border"
                  style={{
                    backgroundColor: `${node.color}20`,
                    color: node.color,
                    borderColor: `${node.color}40`,
                  }}
                >
                  {node.category}
                </span>
                <span className="text-[11px] text-slate-500 font-mono">
                  ID: {node.id}
                </span>
              </div>
              <DialogTitle className="text-xl font-extrabold text-white mt-0.5">
                {node.title}
              </DialogTitle>
              <DialogDescription className="text-xs text-sky-400 font-mono">
                {node.subtitle}
              </DialogDescription>
            </div>
          </div>
        </DialogHeader>

        <div className="space-y-4 my-2 max-h-[65vh] overflow-y-auto pr-1">
          {/* Description Card */}
          {node.description && (
            <div className="bg-slate-950/60 border border-slate-800/80 p-3.5 rounded-xl text-xs text-slate-300 leading-relaxed">
              <span className="font-semibold text-slate-200 block mb-1">
                Overview & Role:
              </span>
              {node.description}
            </div>
          )}

          {/* Node Metadata Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 text-xs">
            <div className="bg-slate-800/40 border border-slate-800 p-2.5 rounded-xl">
              <div className="text-[10px] text-slate-400 font-mono">Category</div>
              <div className="font-bold text-slate-200 capitalize mt-0.5">
                {node.category}
              </div>
            </div>
            <div className="bg-slate-800/40 border border-slate-800 p-2.5 rounded-xl">
              <div className="text-[10px] text-slate-400 font-mono">Coordinates</div>
              <div className="font-mono text-slate-200 flex items-center gap-1 mt-0.5">
                <MapPin className="w-3 h-3 text-sky-400" /> X:{node.x}, Y:{node.y}
              </div>
            </div>
            <div className="bg-slate-800/40 border border-slate-800 p-2.5 rounded-xl col-span-2 sm:col-span-1">
              <div className="text-[10px] text-slate-400 font-mono">Total Records</div>
              <div className="font-bold text-slate-200 mt-0.5">
                {node.records ? node.records.length : 0} items
              </div>
            </div>
          </div>

          {/* Records & Data Contents */}
          {node.records && node.records.length > 0 && (
            <div className="space-y-2 pt-2 border-t border-slate-800/80">
              <div className="flex items-center justify-between gap-2">
                <h4 className="text-xs font-bold text-slate-200 uppercase tracking-wider flex items-center gap-1.5">
                  Node Contents / Records
                </h4>
                {node.records.length > 4 && (
                  <div className="relative w-48">
                    <Search className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-1/2 -translate-y-1/2" />
                    <input
                      type="text"
                      placeholder="Search records..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="w-full pl-8 pr-2.5 py-1 bg-slate-950 border border-slate-800 rounded-lg text-[11px] text-slate-200 placeholder:text-slate-500 focus:outline-none focus:border-sky-500/60 font-mono"
                    />
                  </div>
                )}
              </div>

              <div className="bg-slate-950/90 border border-slate-800/90 rounded-xl overflow-hidden font-mono text-xs max-h-56 overflow-y-auto">
                {filteredRecords && filteredRecords.length > 0 ? (
                  <div className="divide-y divide-slate-800/60">
                    {filteredRecords.map((rec, rIdx) => {
                      const isCopied = copiedKey === rec.key;
                      return (
                        <div
                          key={rIdx}
                          className="flex items-center justify-between px-3.5 py-2 hover:bg-slate-900/60 transition-colors group"
                        >
                          <div className="truncate max-w-[220px]">
                            <span className="text-sky-400 font-semibold">
                              {rec.key}
                            </span>
                          </div>
                          <div className="flex items-center gap-2 max-w-[260px] justify-end">
                            <span className="text-slate-300 font-bold bg-slate-900 px-2 py-0.5 rounded border border-slate-800 truncate">
                              {rec.value}
                            </span>
                            <button
                              onClick={() => handleCopy(`${rec.key}: ${rec.value}`, rec.key)}
                              className="text-slate-500 hover:text-slate-200 transition-colors p-1 rounded hover:bg-slate-800 shrink-0"
                              title="Copy to clipboard"
                            >
                              {isCopied ? (
                                <Check className="w-3.5 h-3.5 text-emerald-400" />
                              ) : (
                                <Copy className="w-3.5 h-3.5" />
                              )}
                            </button>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                ) : (
                  <div className="p-4 text-center text-slate-500 text-xs font-sans">
                    No matching records found.
                  </div>
                )}
              </div>
            </div>
          )}
        </div>

        {/* Modal Actions */}
        <div className="flex items-center justify-between pt-3 border-t border-slate-800/80 gap-3">
          {onFocusNode && (
            <button
              onClick={() => {
                onFocusNode(node.id);
                onClose();
              }}
              className="px-3 py-1.5 bg-sky-600/20 hover:bg-sky-600/30 text-sky-300 border border-sky-500/40 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-all cursor-pointer"
            >
              <Eye className="w-3.5 h-3.5" /> Focus Node on Canvas
            </button>
          )}
          <button
            onClick={onClose}
            className="px-4 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-xl text-xs font-semibold border border-slate-700 transition-all cursor-pointer ml-auto"
          >
            Close
          </button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default NodeDetailModal;
