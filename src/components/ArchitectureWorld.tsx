import React, { useState, useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  Globe,
  Server,
  User,
  FolderGit2,
  Radio,
  Layers,
  CheckSquare,
  Eye,
  ArrowRight,
  ShieldCheck,
  Cpu,
  MousePointer,
  Mail,
} from "lucide-react";

// Register ScrollTrigger plugin with GSAP
gsap.registerPlugin(ScrollTrigger);

interface NodeData {
  id: string;
  label: string;
  sublabel: string;
  x: number;
  y: number;
  color: string;
  icon: React.ComponentType<{ className?: string }>;
  description: string;
}

const NODES: NodeData[] = [
  {
    id: "browser",
    label: "Browser",
    sublabel: "Users Browser",
    x: 400,
    y: 100,
    color: "#3b82f6", // blue
    icon: Globe,
    description: "User Browser",
  },
  {
    id: "gateway",
    label: "API GATEWAY",
    sublabel: "Reverse Proxy & Load Balancer",
    x: 400,
    y: 280,
    color: "#8b5cf6", // purple
    icon: Server,
    description:
      "Authenticates, rate-limits, and dispatches traffic to internal microservices.",
  },
  {
    id: "about",
    label: "ABOUT",
    sublabel: "Bio & Profile Service",
    x: 180,
    y: 460,
    color: "#ec4899", // pink
    icon: User,
    description: "Serves developer biography, background info, and skill sets.",
  },
  {
    id: "stack",
    label: "STACK",
    sublabel: "Tech Stack Registry",
    x: 400,
    y: 460,
    color: "#06b6d4", // cyan
    icon: Cpu,
    description: "Displays framework metrics, runtime environments, and tools.",
  },
  {
    id: "projects",
    label: "PROJECTS",
    sublabel: "Portfolio Hub",
    x: 620,
    y: 460,
    color: "#eab308", // yellow
    icon: FolderGit2,
    description:
      "Central repository routing for featured application showcases.",
  },
  {
    id: "queuecast",
    label: "QueueCast",
    sublabel: "Live Streaming & Queue System",
    x: 460,
    y: 650,
    color: "#ef4444", // red
    icon: Radio,
    description:
      "Real-time broadcasting, audience queue management, and media distribution.",
  },
  {
    id: "wardly",
    label: "Wardly",
    sublabel: "Spatial & Map Visualizer",
    x: 620,
    y: 650,
    color: "#10b981", // emerald
    icon: Layers,
    description:
      "Wardley mapping tool for strategic visual representation & analysis.",
  },
  {
    id: "todo",
    label: "Todo",
    sublabel: "Task Management App",
    x: 780,
    y: 650,
    color: "#3b82f6", // indigo/blue
    icon: CheckSquare,
    description:
      "Full-stack productivity tracker with real-time state synchronization.",
  },
];

// Traversal path step sequence
const TRAVERSAL_PATH = [
  "dns",
  "gateway",
  "about",
  "gateway",
  "stack",
  "gateway",
  "projects",
  "queuecast",
  "wardly",
  "todo",
];

export const ArchitectureWorld: React.FC = () => {
  const outerContainerRef = useRef<HTMLDivElement | null>(null);
  const worldRef = useRef<SVGSVGElement | null>(null);
  const userCameraRef = useRef<SVGGElement | null>(null);

  const [currentNodeIndex, setCurrentNodeIndex] = useState<number>(0);
  const [activeNodeId, setActiveNodeId] = useState<string>(TRAVERSAL_PATH[0]);
  const [scrollProgress, setScrollProgress] = useState<number>(0);

  const zoomLevel = 1.6;

  // Position state of user camera relative to world (viewBox centered on camera)
  const cameraPos = useRef<{ x: number; y: number }>({
    x: NODES[0].x,
    y: NODES[0].y,
  });

  const currentNode = NODES.find((n) => n.id === activeNodeId) || NODES[0];

  // Helper to update SVG viewBox to simulate camera movement
  const updateCameraView = (x: number, y: number, zoom: number) => {
    if (!worldRef.current) return;
    const baseWidth = 960;
    const baseHeight = 800;
    const width = baseWidth / zoom;
    const height = baseHeight / zoom;
    const vx = x - width / 2;
    const vy = y - height / 2;
    worldRef.current.setAttribute("viewBox", `${vx} ${vy} ${width} ${height}`);
  };

  useEffect(() => {
    // Set initial camera view
    updateCameraView(cameraPos.current.x, cameraPos.current.y, zoomLevel);

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: outerContainerRef.current,
          start: "top top",
          end: "+=5000",
          pin: true,
          scrub: 1,
          anticipatePin: 1,
          onUpdate: (self) => {
            setScrollProgress(Math.round(self.progress * 100));
          },
        },
      });

      const totalSegments = TRAVERSAL_PATH.length - 1;
      const segmentDuration = 1 / totalSegments;

      TRAVERSAL_PATH.forEach((nodeId, idx) => {
        if (idx === 0) return; // Start at first node

        const targetNode = NODES.find((n) => n.id === nodeId)!;

        tl.to(
          cameraPos.current,
          {
            x: targetNode.x,
            y: targetNode.y,
            duration: segmentDuration,
            ease: "power1.inOut",
            onStart: () => {
              setActiveNodeId(nodeId);
              setCurrentNodeIndex(idx);
            },
            onReverseComplete: () => {
              const prevNodeId = TRAVERSAL_PATH[idx - 1];
              setActiveNodeId(prevNodeId);
              setCurrentNodeIndex(idx - 1);
            },
            onUpdate: () => {
              updateCameraView(
                cameraPos.current.x,
                cameraPos.current.y,
                zoomLevel,
              );
            },
          },
          (idx - 1) * segmentDuration,
        );
      });
    }, outerContainerRef);

    return () => ctx.revert();
  }, []);

  // Jump to specific step by scrolling page window
  const scrollToStep = (index: number) => {
    if (!outerContainerRef.current) return;
    const totalSegments = TRAVERSAL_PATH.length - 1;
    const targetProgress = index / totalSegments;
    const trigger = ScrollTrigger.getAll()[0];
    if (trigger) {
      const scrollPos =
        trigger.start + targetProgress * (trigger.end - trigger.start);
      window.scrollTo({
        top: scrollPos,
        behavior: "smooth",
      });
    }
  };

  return (
    <div
      ref={outerContainerRef}
      className="relative w-full h-screen bg-slate-950 text-slate-100 flex flex-col items-center justify-between p-4 overflow-hidden font-sans select-none"
    >
      {/* Dynamic Background Mesh */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(30,41,59,0.5)_0%,rgba(2,6,23,1)_100%)] pointer-events-none" />

      {/* Header Bar */}
      <header className="relative z-10 w-full max-w-6xl flex items-center justify-between py-3 px-6 bg-slate-900/80 backdrop-blur-md rounded-2xl border border-slate-800 shadow-xl">
        <div className="flex items-center space-x-3">
          <div className="p-2 bg-blue-600/20 text-blue-400 rounded-xl border border-blue-500/30">
            <Globe className="w-5 h-5 animate-pulse" />
          </div>
          <div>
            <h1 className="text-lg font-bold tracking-wide text-white flex items-center gap-2">
              ONE LARGE WORLD{" "}
              <span className="text-xs uppercase px-2 py-0.5 rounded-full bg-blue-500/20 text-blue-400 border border-blue-500/30 font-medium">
                Scroll Traverser
              </span>
            </h1>
            <p className="text-xs text-slate-400">
              Scroll down / up to travel diagram from user perspective
            </p>
          </div>
        </div>

        {/* Scroll Progress Bar */}
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 bg-slate-800/80 border border-slate-700 px-3 py-1.5 rounded-xl">
            <MousePointer className="w-4 h-4 text-sky-400 animate-bounce" />
            <span className="text-xs text-slate-300 font-medium">
              Scroll Driven:
            </span>
            <span className="text-xs text-sky-400 font-bold w-10 text-right">
              {scrollProgress}%
            </span>
          </div>

          <div className="w-32 h-2 bg-slate-800 rounded-full overflow-hidden border border-slate-700">
            <div
              className="h-full bg-linear-to-r from-blue-500 to-sky-400 transition-all duration-75"
              style={{ width: `${scrollProgress}%` }}
            />
          </div>
        </div>
      </header>

      {/* Main Viewport Container */}
      <div className="relative z-10 w-full max-w-6xl h-[calc(100vh-180px)] my-2 bg-slate-900/40 rounded-2xl border border-slate-800 shadow-2xl overflow-hidden backdrop-blur-sm flex items-center justify-center">
        <svg
          ref={worldRef}
          className="w-full h-full"
          preserveAspectRatio="xMidYMid meet"
        >
          <defs>
            {/* Glow Filter */}
            <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="6" result="blur" />
              <feComposite in="SourceGraphic" in2="blur" operator="over" />
            </filter>

            {/* Arrow Marker */}
            <marker
              id="arrow"
              viewBox="0 0 10 10"
              refX="6"
              refY="5"
              markerWidth="6"
              markerHeight="6"
              orient="auto-start-reverse"
            >
              <path d="M 0 1 L 10 5 L 0 9 z" fill="#64748b" />
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

          {/* CONNECTIONS / PIPES */}
          <g className="connections">
            {/* DNS -> GATEWAY */}
            <line
              x1="400"
              y1="130"
              x2="400"
              y2="250"
              stroke={
                activeNodeId === "dns" || activeNodeId === "gateway"
                  ? "#38bdf8"
                  : "#334155"
              }
              strokeWidth={
                activeNodeId === "dns" || activeNodeId === "gateway" ? "4" : "2"
              }
              strokeDasharray="6 4"
              markerEnd={
                activeNodeId === "gateway"
                  ? "url(#arrow-active)"
                  : "url(#arrow)"
              }
            />

            {/* GATEWAY -> ABOUT */}
            <path
              d="M 400 310 L 180 430"
              stroke={activeNodeId === "about" ? "#ec4899" : "#334155"}
              strokeWidth={activeNodeId === "about" ? "4" : "2"}
              strokeDasharray="6 4"
              markerEnd={
                activeNodeId === "about" ? "url(#arrow-active)" : "url(#arrow)"
              }
            />

            {/* GATEWAY -> STACK */}
            <line
              x1="400"
              y1="310"
              x2="400"
              y2="430"
              stroke={activeNodeId === "stack" ? "#06b6d4" : "#334155"}
              strokeWidth={activeNodeId === "stack" ? "4" : "2"}
              strokeDasharray="6 4"
              markerEnd={
                activeNodeId === "stack" ? "url(#arrow-active)" : "url(#arrow)"
              }
            />

            {/* GATEWAY -> PROJECTS */}
            <path
              d="M 400 310 L 620 430"
              stroke={activeNodeId === "projects" ? "#eab308" : "#334155"}
              strokeWidth={activeNodeId === "projects" ? "4" : "2"}
              strokeDasharray="6 4"
              markerEnd={
                activeNodeId === "projects"
                  ? "url(#arrow-active)"
                  : "url(#arrow)"
              }
            />

            {/* PROJECTS Sub-tree connectors */}
            {/* PROJECTS -> QueueCast */}
            <path
              d="M 620 490 L 460 620"
              stroke={activeNodeId === "queuecast" ? "#ef4444" : "#334155"}
              strokeWidth={activeNodeId === "queuecast" ? "4" : "2"}
              strokeDasharray="6 4"
              markerEnd={
                activeNodeId === "queuecast"
                  ? "url(#arrow-active)"
                  : "url(#arrow)"
              }
            />

            {/* PROJECTS -> Wardly */}
            <line
              x1="620"
              y1="490"
              x2="620"
              y2="620"
              stroke={activeNodeId === "wardly" ? "#10b981" : "#334155"}
              strokeWidth={activeNodeId === "wardly" ? "4" : "2"}
              strokeDasharray="6 4"
              markerEnd={
                activeNodeId === "wardly" ? "url(#arrow-active)" : "url(#arrow)"
              }
            />

            {/* PROJECTS -> Todo */}
            <path
              d="M 620 490 L 780 620"
              stroke={activeNodeId === "todo" ? "#3b82f6" : "#334155"}
              strokeWidth={activeNodeId === "todo" ? "4" : "2"}
              strokeDasharray="6 4"
              markerEnd={
                activeNodeId === "todo" ? "url(#arrow-active)" : "url(#arrow)"
              }
            />
          </g>

          {/* DIAGRAM NODES */}
          {NODES.map((node) => {
            const Icon = node.icon;
            const isActive = activeNodeId === node.id;
            const nodeStepIndex = TRAVERSAL_PATH.indexOf(node.id);

            return (
              <g
                key={node.id}
                transform={`translate(${node.x}, ${node.y})`}
                onClick={() =>
                  nodeStepIndex !== -1 && scrollToStep(nodeStepIndex)
                }
                className="cursor-pointer group"
              >
                {/* Node Outer Ring Pulse when Active */}
                {isActive && (
                  <circle
                    r="46"
                    fill="none"
                    stroke={node.color}
                    strokeWidth="2"
                    className="animate-ping opacity-50"
                  />
                )}

                {/* Node Main Container */}
                <rect
                  x="-75"
                  y="-30"
                  width="150"
                  height="60"
                  rx="16"
                  fill={isActive ? "#0f172a" : "#1e293b"}
                  stroke={isActive ? node.color : "#475569"}
                  strokeWidth={isActive ? "3" : "1.5"}
                  filter={isActive ? "url(#glow)" : undefined}
                  className="transition-all duration-300"
                />

                {/* Node Icon Circle */}
                <circle
                  cx="-45"
                  cy="0"
                  r="18"
                  fill={isActive ? node.color : "#334155"}
                  className="transition-all duration-300"
                />

                {/* Icon Rendering */}
                <g
                  transform="translate(-53, -8) scale(0.7)"
                  fill="none"
                  stroke="#ffffff"
                  strokeWidth="2"
                >
                  <Icon className="w-6 h-6 text-white" />
                </g>

                {/* Node Label Text */}
                <text
                  x="-18"
                  y="-2"
                  fill="#f8fafc"
                  fontSize="13"
                  fontWeight="bold"
                  alignmentBaseline="middle"
                >
                  {node.label}
                </text>

                <text
                  x="-18"
                  y="14"
                  fill="#94a3b8"
                  fontSize="8"
                  alignmentBaseline="middle"
                >
                  {node.sublabel.length > 18
                    ? node.sublabel.slice(0, 16) + "..."
                    : node.sublabel}
                </text>

                {/* Active Indicator dot */}
                {isActive && (
                  <circle cx="60" cy="-20" r="5" fill={node.color} />
                )}
              </g>
            );
          })}

          {/* USER PERSPECTIVE CAMERA ICON / ENVELOPE RETICLE */}
          <g
            ref={userCameraRef}
            transform={`translate(${cameraPos.current.x - 12}, ${cameraPos.current.y})`}
            className="pointer-events-none"
          >
            <Mail />
          </g>
        </svg>

        {/* Current Camera View HUD Overlay */}
        <div className="absolute bottom-4 left-4 right-4 bg-slate-900/90 backdrop-blur-md rounded-xl p-4 border border-slate-800 flex items-center justify-between shadow-2xl">
          <div className="flex items-center space-x-3">
            <div
              className="w-10 h-10 rounded-xl flex items-center justify-center font-bold text-white shadow-md"
              style={{ backgroundColor: currentNode.color }}
            >
              <Eye className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-semibold uppercase tracking-wider text-sky-400">
                  User Camera Viewfinder
                </span>
                <span className="text-slate-500">•</span>
                <span className="text-xs text-slate-400">
                  Node [{currentNode.id.toUpperCase()}]
                </span>
              </div>
              <h3 className="text-base font-bold text-white">
                {currentNode.label}
              </h3>
              <p className="text-xs text-slate-300">
                {currentNode.description}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-xs text-slate-400 hidden sm:inline">
              Scroll Sequence:
            </span>
            <div className="flex items-center gap-1 overflow-x-auto max-w-70 p-1">
              {TRAVERSAL_PATH.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => scrollToStep(idx)}
                  className={`w-6 h-6 rounded-full text-xs font-bold flex items-center justify-center transition-all cursor-pointer ${
                    idx === currentNodeIndex
                      ? "bg-sky-500 text-white shadow-lg scale-110"
                      : "bg-slate-800 text-slate-400 hover:bg-slate-700"
                  }`}
                >
                  {idx + 1}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Footer / Instructions */}
      <footer className="relative z-10 w-full max-w-6xl flex items-center justify-between text-xs text-slate-400 px-2 py-1">
        <div className="flex items-center gap-4">
          <span className="flex items-center gap-1">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" /> GSAP
            ScrollTrigger Pinned Camera
          </span>
          <span className="flex items-center gap-1">
            <ArrowRight className="w-3.5 h-3.5 text-sky-400" /> Scroll down or
            up to traverse nodes
          </span>
        </div>
        <div>ONE LARGE WORLD Scroll Visualizer</div>
      </footer>
    </div>
  );
};

export default ArchitectureWorld;
