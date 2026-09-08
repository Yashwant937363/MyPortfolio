import React, { useState } from "react";
import { Globe, Sparkles } from "lucide-react";
import BrowserMockup from "./BrowserMockup";
import DiagramNodeCard from "./DiagramNodeCard";
import TravelingPacket from "./TravelingPacket";
import PortfolioContent from "./PortfolioContent";
import NodeDetailModal from "./NodeDetailModal";
import DiagramHeader from "./diagram/DiagramHeader";
import DiagramControls from "./diagram/DiagramControls";
import DiagramConnections from "./diagram/DiagramConnections";
import DiagramFooter from "./diagram/DiagramFooter";
import { DIAGRAM_NODES, type DiagramNode } from "../types/diagramData";
import { useDiagramCamera } from "../hooks/useDiagramCamera";
import { useDnsSimulation } from "../hooks/useDnsSimulation";

export const FullWorldFlow: React.FC = () => {
  const [selectedModalNode, setSelectedModalNode] =
    useState<DiagramNode | null>(null);
  const [currentBrowserUrl, setCurrentBrowserUrl] =
    useState<string>("yashwantpoyrekar.dev/about");

  // Hook 1: Diagram Camera & Zoom / Pan Controls
  const {
    worldRef,
    canvasContainerRef,
    cameraPos,
    zoomLevelDisplay,
    dragDistance,
    updateCameraView,
    handleZoomIn,
    handleZoomOut,
    handleResetView,
    zoomToNode,
    handleMouseDown,
    handleMouseMove,
    handleMouseUp,
    handleTouchStart,
    handleTouchMove,
    handleTouchEnd,
  } = useDiagramCamera(false); // camera hook initialized

  // Hook 2: DNS Resolution Traversal & State Machine
  const {
    inDiagramMode,
    setInDiagramMode,
    activeNodeId,
    setActiveNodeId,
    activeProcessNode,
    highlightRecordKey,
    scrollOffsets,
    packetInfo,
    isResolved,
    cacheHitMessage,
    currentStepText,
    loadedRoutes,
    handleUrlNavigate,
    traversePageRequest,
    clearLocalCache,
    handleInspectDiagram,
  } = useDnsSimulation({
    cameraPos,
    updateCameraView,
    setZoomLevelDisplay: () => {}, // updated internally in useDiagramCamera
    zoomToNode,
    handleResetView,
  });

  const handleNodeClick = (node: DiagramNode) => {
    if (dragDistance.current > 6) return;
    setSelectedModalNode(node);
  };

  const handleBrowserSubmit = (inputUrl: string) => {
    let cleanUrl = inputUrl.trim();
    if (!cleanUrl.startsWith("yashwantpoyrekar.dev")) {
      if (cleanUrl.startsWith("/")) {
        cleanUrl = `yashwantpoyrekar.dev${cleanUrl}`;
      } else {
        cleanUrl = `yashwantpoyrekar.dev/${cleanUrl}`;
      }
    }
    setCurrentBrowserUrl(cleanUrl);

    const match = cleanUrl.match(/yashwantpoyrekar\.dev(\/[a-zA-Z0-9\-_/]*)/);
    const targetPath = match ? match[1] : "/about";

    if (!isResolved) {
      handleUrlNavigate(cleanUrl);
    } else {
      traversePageRequest(targetPath);
    }
  };

  return (
    <div className="w-screen h-screen bg-slate-950 text-slate-100 flex flex-col font-sans overflow-hidden">
      {/* Browser View Mode */}
      {!inDiagramMode ? (
        <BrowserMockup
          initialUrl="yashwantpoyrekar.dev"
          currentUrl={currentBrowserUrl}
          onNavigate={handleBrowserSubmit}
          onClearCache={clearLocalCache}
          onInspectDiagram={handleInspectDiagram}
        >
          {isResolved ? (
            /* ABOUT ME PORTFOLIO CONTENT WITH ROUTING & API GATEWAY */
            <PortfolioContent
              currentUrl={currentBrowserUrl}
              onUrlChange={setCurrentBrowserUrl}
              loadedRoutes={loadedRoutes}
              onRequestRoute={traversePageRequest}
            />
          ) : (
            /* DEFAULT BROWSER INTRO */
            <div className="text-center space-y-4 max-w-md">
              <div className="p-4 bg-sky-500/10 text-sky-400 rounded-3xl border border-sky-500/20 w-fit mx-auto animate-pulse">
                <Globe className="w-10 h-10" />
              </div>
              <h2 className="text-2xl font-extrabold text-white tracking-wide">
                Press <span className="text-sky-400 font-mono">Go</span> or{" "}
                <span className="text-sky-400 font-mono">Enter</span>
              </h2>
              <p className="text-xs text-slate-400 leading-relaxed">
                Enter{" "}
                <span className="text-slate-200 font-mono">
                  yashwantpoyrekar.dev
                </span>{" "}
                in the address bar above to launch the camera-guided DNS
                resolution traversal across all diagram servers!
              </p>
              <button
                onClick={() => handleBrowserSubmit("yashwantpoyrekar.dev")}
                aria-label="Start DNS Resolution Flow"
                className="px-6 py-2.5 bg-sky-600 hover:bg-sky-500 text-white font-semibold rounded-xl shadow-lg shadow-sky-600/30 transition-all cursor-pointer text-xs flex items-center gap-2 mx-auto"
              >
                <Sparkles className="w-4 h-4" /> Start DNS Resolution Flow
              </button>
            </div>
          )}
        </BrowserMockup>
      ) : (
        /* FULL DIAGRAM TRAVERSAL VIEW MODE */
        <div className="relative w-full h-full bg-slate-950 flex flex-col items-center justify-between p-2 sm:p-4 overflow-hidden">
          {/* Header Bar */}
          <DiagramHeader
            currentStepText={currentStepText}
            cacheHitMessage={cacheHitMessage}
            onBackToBrowser={() => setInDiagramMode(false)}
          />

          {/* SVG Diagram Canvas */}
          <div
            ref={canvasContainerRef}
            className="relative w-full flex-1 my-2 bg-slate-900/40 rounded-2xl border border-slate-800/80 shadow-2xl overflow-hidden backdrop-blur-sm cursor-grab active:cursor-grabbing select-none"
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            onMouseLeave={handleMouseUp}
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
          >
            {/* Floating Zoom & Canvas Controls */}
            <DiagramControls
              zoomLevelDisplay={zoomLevelDisplay}
              onZoomIn={handleZoomIn}
              onZoomOut={handleZoomOut}
              onResetView={handleResetView}
            />

            <svg
              ref={worldRef}
              className="w-full h-full"
              preserveAspectRatio="xMidYMid meet"
            >
              <defs>
                <filter id="glow" x="-30%" y="-30%" width="160%" height="160%">
                  <feGaussianBlur stdDeviation="6" result="blur" />
                  <feComposite in="SourceGraphic" in2="blur" operator="over" />
                </filter>

                <marker
                  id="arrow"
                  viewBox="0 0 10 10"
                  refX="6"
                  refY="5"
                  markerWidth="6"
                  markerHeight="6"
                  orient="auto-start-reverse"
                >
                  <path d="M 0 1 L 10 5 L 0 9 z" fill="#475569" />
                </marker>

                <marker
                  id="arrow-active"
                  viewBox="0 0 10 10"
                  refX="6"
                  refY="5"
                  markerWidth="6"
                  markerHeight="6"
                  orient="auto-start-reverse"
                >
                  <path d="M 0 1 L 10 5 L 0 9 z" fill="#38bdf8" />
                </marker>
              </defs>

              {/* CURVED CONNECTION LINES */}
              <DiagramConnections activeNodeId={activeNodeId} />

              {/* DIAGRAM NODES */}
              {DIAGRAM_NODES.map((node) => {
                const isActive = activeNodeId === node.id;
                const isProcessing = activeProcessNode === node.id;

                return (
                  <DiagramNodeCard
                    key={node.id}
                    node={node}
                    isActive={isActive}
                    isProcessing={isProcessing}
                    scrollOffset={scrollOffsets[node.id] || 0}
                    highlightRecordKey={highlightRecordKey}
                    onClick={() => handleNodeClick(node)}
                  />
                );
              })}

              {/* TRAVELING ENVELOPE PACKET (VISIBLE ONLY DURING TRAVERSAL) */}
              {packetInfo.visible && (
                <TravelingPacket
                  x={packetInfo.x}
                  y={packetInfo.y}
                  message={packetInfo.message}
                />
              )}
            </svg>
          </div>

          {/* Footer Info */}
          <DiagramFooter />
        </div>
      )}

      {/* Node Detail Modal */}
      <NodeDetailModal
        node={selectedModalNode}
        onClose={() => setSelectedModalNode(null)}
        onFocusNode={(nodeId) => {
          zoomToNode(nodeId, 2.2, 0.8, setActiveNodeId);
          setSelectedModalNode(null);
        }}
      />
    </div>
  );
};

export default FullWorldFlow;
