import React, { useState, useEffect, useRef } from "react";
import gsap from "gsap";
import {
  Globe,
  CheckCircle2,
  ArrowRight,
  Sparkles,
  ZoomIn,
  ZoomOut,
  Maximize2,
  Info
} from "lucide-react";
import BrowserMockup from "./BrowserMockup";
import DiagramNodeCard from "./DiagramNodeCard";
import TravelingPacket from "./TravelingPacket";
import PortfolioContent from "./PortfolioContent";
import NodeDetailModal from "./NodeDetailModal";
import { DIAGRAM_NODES, CONNECTIONS, type DiagramNode } from "../types/diagramData";

export const FullWorldFlow: React.FC = () => {
  const worldRef = useRef<SVGSVGElement | null>(null);

  // States
  const [inDiagramMode, setInDiagramMode] = useState<boolean>(false);
  const [activeNodeId, setActiveNodeId] = useState<string>("browser");
  const [activeProcessNode, setActiveProcessNode] = useState<string | null>(null);
  const [highlightRecordKey, setHighlightRecordKey] = useState<string | null>(null);
  const [scrollOffsets, setScrollOffsets] = useState<{ [nodeId: string]: number }>({});
  const [selectedModalNode, setSelectedModalNode] = useState<DiagramNode | null>(null);
  const [zoomLevelDisplay, setZoomLevelDisplay] = useState<number>(220);

  // Drag pan tracking refs
  const isDragging = useRef<boolean>(false);
  const dragStart = useRef<{ x: number; y: number }>({ x: 0, y: 0 });
  const initialCamPos = useRef<{ x: number; y: number }>({ x: 0, y: 0 });
  const dragDistance = useRef<number>(0);

  const [packetInfo, setPacketInfo] = useState<{
    visible: boolean;
    x: number;
    y: number;
    message: string;
  }>({
    visible: false,
    x: DIAGRAM_NODES[0].x,
    y: DIAGRAM_NODES[0].y,
    message: ""
  });
  
  const [isResolved, setIsResolved] = useState<boolean>(false);
  const [cacheHitMessage, setCacheHitMessage] = useState<string | null>(null);
  const [currentStepText, setCurrentStepText] = useState<string>("");

  // Camera viewport position
  const cameraPos = useRef<{ x: number; y: number; zoom: number }>({
    x: 100,
    y: 390,
    zoom: 2.2
  });

  // Helper to adjust viewBox smoothly
  const updateCameraView = (x: number, y: number, zoom: number) => {
    if (!worldRef.current) return;
    const baseWidth = 1400;
    const baseHeight = 800;
    const width = baseWidth / zoom;
    const height = baseHeight / zoom;
    const vx = x - width / 2;
    const vy = y - height / 2;
    worldRef.current.setAttribute("viewBox", `${vx} ${vy} ${width} ${height}`);
  };

  // Helper for generating custom Bezier curve control points and distinct port anchors per connection
  const getCurveInfo = (fromId: string, toId: string) => {
    const fromNode = DIAGRAM_NODES.find((n) => n.id === fromId) || DIAGRAM_NODES[0];
    const toNode = DIAGRAM_NODES.find((n) => n.id === toId) || DIAGRAM_NODES[0];

    // Default start/end points at node centers
    let pStart = { x: fromNode.x, y: fromNode.y };
    let pEnd = { x: toNode.x, y: toNode.y };
    let cp1 = { x: (fromNode.x + toNode.x) / 2, y: (fromNode.y + toNode.y) / 2 };
    let cp2 = { x: (fromNode.x + toNode.x) / 2, y: (fromNode.y + toNode.y) / 2 };

    if (fromId === "browser" && toId === "cache") {
      pStart = { x: 230, y: 360 }; // Right-top port of Browser
      pEnd = { x: 340, y: 120 };   // Left port of Cache (x: 450, y: 100)
      cp1 = { x: 285, y: 360 };
      cp2 = { x: 285, y: 120 };
    } else if (fromId === "cache" && toId === "browser") {
      pStart = { x: 340, y: 80 };  // Left-top port of Cache (x: 450, y: 100)
      pEnd = { x: 230, y: 375 };   // Right-top port of Browser
      cp1 = { x: 260, y: 80 };
      cp2 = { x: 260, y: 375 };
    } else if (fromId === "browser" && toId === "resolver") {
      pStart = { x: 230, y: 410 }; // Right-bottom port of Browser
      pEnd = { x: 370, y: 480 };   // Left-top port of Resolver (y: 500)
      cp1 = { x: 300, y: 410 };
      cp2 = { x: 300, y: 480 };
    } else if (fromId === "resolver" && toId === "browser") {
      pStart = { x: 370, y: 515 }; // Left-bottom port of Resolver (y: 500)
      pEnd = { x: 230, y: 425 };   // Right-bottom port of Browser
      cp1 = { x: 270, y: 515 };
      cp2 = { x: 270, y: 425 };
    } else if (fromId === "resolver" && toId === "root") {
      pStart = { x: 590, y: 480 }; // Right-top port of Resolver (y: 500)
      pEnd = { x: 730, y: 410 };   // Left-bottom port of Root
      cp1 = { x: 660, y: 480 };
      cp2 = { x: 660, y: 410 };
    } else if (fromId === "root" && toId === "tld_dev") {
      pStart = { x: 950, y: 360 }; // Top-Right port of Root
      pEnd = { x: 1090, y: 150 };  // Left port of .dev TLD
      cp1 = { x: 1020, y: 360 };
      cp2 = { x: 1020, y: 150 };
    } else if (fromId === "root" && toId === "tld_com") {
      pStart = { x: 950, y: 390 }; // Center-Right port of Root
      pEnd = { x: 1090, y: 390 };  // Left port of .com TLD
      cp1 = { x: 1020, y: 390 };
      cp2 = { x: 1020, y: 390 };
    } else if (fromId === "root" && toId === "tld_org") {
      pStart = { x: 950, y: 420 }; // Bottom-Right port of Root
      pEnd = { x: 1090, y: 630 };  // Left port of .org TLD
      cp1 = { x: 1020, y: 420 };
      cp2 = { x: 1020, y: 630 };
    } else if (fromId === "tld_dev" && toId === "auth_dns") {
      pStart = { x: 1310, y: 150 }; // Right port of .dev TLD
      pEnd = { x: 1450, y: 150 };   // Left port of Auth DNS
      cp1 = { x: 1380, y: 150 };
      cp2 = { x: 1380, y: 150 };
    } else if (fromId === "auth_dns" && toId === "resolver") {
      pStart = { x: 1560, y: 95 };  // Top port of Auth DNS
      pEnd = { x: 480, y: 445 };    // Top edge port of Resolver (y: 500)
      cp1 = { x: 1560, y: 30 };
      cp2 = { x: 240, y: 30 };
    } else if (fromId === "browser" && toId === "web_server") {
      pStart = { x: 120, y: 445 };  // Bottom port of Browser
      pEnd = { x: 1560, y: 685 };   // Bottom port of Web Server
      cp1 = { x: 120, y: 790 };
      cp2 = { x: 1560, y: 790 };
    } else if (fromId === "web_server" && toId === "browser") {
      pStart = { x: 1450, y: 650 }; // Bottom-Left of Web Server
      pEnd = { x: 230, y: 435 };    // Bottom-Right of Browser
      cp1 = { x: 1450, y: 810 };
      cp2 = { x: 230, y: 810 };
    }

    const pathD = `M ${pStart.x} ${pStart.y} C ${cp1.x} ${cp1.y}, ${cp2.x} ${cp2.y}, ${pEnd.x} ${pEnd.y}`;
    return { pathD, pStart, pEnd, cp1, cp2 };
  };

  // Compute point on cubic Bezier curve at progress t (0 to 1)
  const getCubicPoint = (
    p0: { x: number; y: number },
    p1: { x: number; y: number },
    p2: { x: number; y: number },
    p3: { x: number; y: number },
    t: number
  ) => {
    const oneMinusT = 1 - t;
    const x =
      Math.pow(oneMinusT, 3) * p0.x +
      3 * Math.pow(oneMinusT, 2) * t * p1.x +
      3 * oneMinusT * Math.pow(t, 2) * p2.x +
      Math.pow(t, 3) * p3.x;
    const y =
      Math.pow(oneMinusT, 3) * p0.y +
      3 * Math.pow(oneMinusT, 2) * t * p1.y +
      3 * oneMinusT * Math.pow(t, 2) * p2.y +
      Math.pow(t, 3) * p3.y;
    return { x, y };
  };

  // Zoom & Camera Controls
  const handleZoomIn = () => {
    const targetZoom = Math.min(cameraPos.current.zoom * 1.25, 4.0);
    gsap.to(cameraPos.current, {
      zoom: targetZoom,
      duration: 0.3,
      ease: "power2.out",
      onUpdate: () => {
        setZoomLevelDisplay(Math.round(cameraPos.current.zoom * 100));
        updateCameraView(cameraPos.current.x, cameraPos.current.y, cameraPos.current.zoom);
      }
    });
  };

  const handleZoomOut = () => {
    const targetZoom = Math.max(cameraPos.current.zoom / 1.25, 0.5);
    gsap.to(cameraPos.current, {
      zoom: targetZoom,
      duration: 0.3,
      ease: "power2.out",
      onUpdate: () => {
        setZoomLevelDisplay(Math.round(cameraPos.current.zoom * 100));
        updateCameraView(cameraPos.current.x, cameraPos.current.y, cameraPos.current.zoom);
      }
    });
  };

  const handleResetView = () => {
    gsap.to(cameraPos.current, {
      x: 840,
      y: 410,
      zoom: 0.85,
      duration: 0.6,
      ease: "power2.inOut",
      onUpdate: () => {
        setZoomLevelDisplay(Math.round(cameraPos.current.zoom * 100));
        updateCameraView(cameraPos.current.x, cameraPos.current.y, cameraPos.current.zoom);
      }
    });
  };

  const handleInspectDiagram = () => {
    setInDiagramMode(true);
    setCurrentStepText("Inspecting ONE LARGE WORLD Architecture Diagram");
    handleResetView();
  };

  const handleWheel = (e: React.WheelEvent) => {
    e.preventDefault();
    const zoomFactor = e.deltaY < 0 ? 1.15 : 0.85;
    const targetZoom = Math.min(Math.max(cameraPos.current.zoom * zoomFactor, 0.5), 4.0);
    cameraPos.current.zoom = targetZoom;
    setZoomLevelDisplay(Math.round(targetZoom * 100));
    updateCameraView(cameraPos.current.x, cameraPos.current.y, targetZoom);
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    if (e.button !== 0 || (e.target as HTMLElement).closest("button")) return;
    isDragging.current = true;
    dragStart.current = { x: e.clientX, y: e.clientY };
    initialCamPos.current = { x: cameraPos.current.x, y: cameraPos.current.y };
    dragDistance.current = 0;
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging.current || !worldRef.current) return;
    const dx = e.clientX - dragStart.current.x;
    const dy = e.clientY - dragStart.current.y;
    dragDistance.current = Math.sqrt(dx * dx + dy * dy);

    const rect = worldRef.current.getBoundingClientRect();
    const scaleX = (1400 / cameraPos.current.zoom) / rect.width;
    const scaleY = (800 / cameraPos.current.zoom) / rect.height;

    cameraPos.current.x = initialCamPos.current.x - dx * scaleX;
    cameraPos.current.y = initialCamPos.current.y - dy * scaleY;
    updateCameraView(cameraPos.current.x, cameraPos.current.y, cameraPos.current.zoom);
  };

  const handleMouseUp = () => {
    isDragging.current = false;
  };

  const handleNodeClick = (node: DiagramNode) => {
    if (dragDistance.current > 6) return;
    setSelectedModalNode(node);
  };

  // Animate camera to target node
  const zoomToNode = (nodeId: string, zoom = 2.0, duration = 1.0) => {
    const targetNode = DIAGRAM_NODES.find((n) => n.id === nodeId);
    if (!targetNode) return;
    setActiveNodeId(nodeId);

    gsap.to(cameraPos.current, {
      x: targetNode.x,
      y: targetNode.y,
      zoom: zoom,
      duration: duration,
      ease: "power2.inOut",
      onUpdate: () => {
        setZoomLevelDisplay(Math.round(cameraPos.current.zoom * 100));
        updateCameraView(cameraPos.current.x, cameraPos.current.y, cameraPos.current.zoom);
      }
    });
  };

  // Animate packet traveling along curved Bezier path with port anchors
  const travelPacket = (
    fromNodeId: string,
    toNodeId: string,
    message: string,
    duration = 1.6,
    onComplete?: () => void
  ) => {
    const toNode = DIAGRAM_NODES.find((n) => n.id === toNodeId)!;
    const { pStart, pEnd, cp1, cp2 } = getCurveInfo(fromNodeId, toNodeId);

    setActiveNodeId(toNodeId);
    setPacketInfo({
      visible: true,
      x: pStart.x,
      y: pStart.y,
      message: message
    });

    const anim = { t: 0 };

    // Move camera & packet along curve
    gsap.to(cameraPos.current, {
      x: toNode.x,
      y: toNode.y,
      zoom: 1.8,
      duration: duration,
      ease: "power1.inOut",
      onUpdate: () => {
        setZoomLevelDisplay(Math.round(cameraPos.current.zoom * 100));
        updateCameraView(cameraPos.current.x, cameraPos.current.y, cameraPos.current.zoom);
      }
    });

    gsap.to(anim, {
      t: 1,
      duration: duration,
      ease: "power1.inOut",
      onUpdate: () => {
        const pt = getCubicPoint(pStart, cp1, cp2, pEnd, anim.t);
        setPacketInfo({
          visible: true,
          x: pt.x,
          y: pt.y,
          message: message
        });
      },
      onComplete: () => {
        setPacketInfo((prev) => ({ ...prev, visible: false }));
        if (onComplete) onComplete();
      }
    });
  };

  // Animate node data lookup / container scrolling process with node expansion
  const simulateNodeProcess = (nodeId: string, targetKey: string, duration = 2.4, onComplete?: () => void) => {
    setActiveProcessNode(nodeId);
    setHighlightRecordKey(null);
    // Deep camera zoom-in directly into the expanded server node
    zoomToNode(nodeId, 2.8, 0.6);

    const node = DIAGRAM_NODES.find((n) => n.id === nodeId);
    if (!node || !node.records) {
      setTimeout(() => {
        setActiveProcessNode(null);
        if (onComplete) onComplete();
      }, duration * 1000);
      return;
    }

    const targetIdx = node.records.findIndex((r) => r.key === targetKey);
    // Row height = 30px when expanded
    const finalScrollY = targetIdx !== -1 ? Math.max(0, targetIdx * 30 - 30) : 0;
    const scrollObj = { y: 0 };

    // 1. Scroll through expanded records list
    gsap.to(scrollObj, {
      y: finalScrollY + (targetIdx !== -1 ? 16 : 48),
      duration: duration * 0.6,
      ease: "power1.inOut",
      onUpdate: () => {
        setScrollOffsets((prev) => ({ ...prev, [nodeId]: scrollObj.y }));
      },
      onComplete: () => {
        // 2. Lock onto target row and highlight
        gsap.to(scrollObj, {
          y: finalScrollY,
          duration: 0.35,
          ease: "power2.out",
          onUpdate: () => {
            setScrollOffsets((prev) => ({ ...prev, [nodeId]: scrollObj.y }));
          },
          onComplete: () => {
            setHighlightRecordKey(targetKey);
            setTimeout(() => {
              // Collapse node back to standard state
              setActiveProcessNode(null);
              if (onComplete) onComplete();
            }, 900);
          }
        });
      }
    });
  };

  // Main flow when user submits URL in browser
  const handleUrlNavigate = (_inputUrl: string) => {
    // 1. Switch to diagram view and zoom out from browser
    setInDiagramMode(true);
    setCurrentStepText("Initiating DNS Resolution for yashwantpoyrekar.dev");
    
    // Check local storage for cached IP
    const cachedIp = localStorage.getItem("dns_cache_yashwantpoyrekar.dev");

    // Phase 1: Zoom out to show full diagram & start moving camera
    gsap.to(cameraPos.current, {
      x: 350,
      y: 350,
      zoom: 1.1,
      duration: 1.2,
      ease: "power2.inOut",
      onUpdate: () => {
        setZoomLevelDisplay(Math.round(cameraPos.current.zoom * 100));
        updateCameraView(cameraPos.current.x, cameraPos.current.y, cameraPos.current.zoom);
      },
      onComplete: () => {
        // Step 1: Check Browser Cache
        setCurrentStepText("Step 1: Checking Local Browser Cache...");
        travelPacket("browser", "cache", 'Checking cache for "yashwantpoyrekar.dev"', 1.4, () => {
          if (cachedIp) {
            // CACHE HIT!
            setCacheHitMessage(`CACHE HIT! IP ${cachedIp} found in LocalStorage.`);
            simulateNodeProcess("cache", "yashwantpoyrekar.dev", 1.5, () => {
              // Return cached IP back to browser
              travelPacket("cache", "browser", `Return Cached IP: ${cachedIp}`, 1.2, () => {
                // Show About profile inside browser
                setIsResolved(true);
                setInDiagramMode(false);
              });
            });
          } else {
            // CACHE MISS -> Complete full DNS traversal
            setCacheHitMessage("CACHE MISS! IP not found in local storage. Starting DNS lookup chain...");
            simulateNodeProcess("cache", "none", 1.2, () => {
              
              // Step 2: Query Recursive Resolver
              setCurrentStepText("Step 2: Querying Recursive DNS Resolver");
              travelPacket("browser", "resolver", 'Query: "Where is yashwantpoyrekar.dev?"', 1.4, () => {
                
                // Step 3: Query Root Server
                setCurrentStepText("Step 3: Querying Root DNS Server (.)");
                travelPacket("resolver", "root", 'Query Root: "Who handles .dev TLD?"', 1.5, () => {
                  simulateNodeProcess("root", ".dev", 1.4, () => {
                    
                    // Step 4: Refer to .dev TLD Server
                    setCurrentStepText("Step 4: Contacting .dev TLD Server");
                    travelPacket("root", "tld_dev", 'Referral: "Ask .dev TLD Server at 200.7.8.99"', 1.5, () => {
                      simulateNodeProcess("tld_dev", "yashwantpoyrekar.dev", 1.4, () => {
                        
                        // Step 5: Contact Authoritative DNS
                        setCurrentStepText("Step 5: Querying Authoritative DNS Server");
                        travelPacket("tld_dev", "auth_dns", 'Query Auth DNS: "Give A Record for yashwantpoyrekar.dev"', 1.6, () => {
                          simulateNodeProcess("auth_dns", "yashwantpoyrekar.dev A", 1.6, () => {
                            
                            // Step 6: Return IP to Resolver
                            setCurrentStepText("Step 6: Authoritative DNS returns IP 93.184.216.34");
                            travelPacket("auth_dns", "resolver", "Response: yashwantpoyrekar.dev = 93.184.216.34", 1.8, () => {
                              
                              // Step 7: Return IP to Browser & Store in Cache
                              setCurrentStepText("Step 7: Resolver returns IP to Browser & caches result");
                              travelPacket("resolver", "browser", "IP 93.184.216.34 resolved!", 1.4, () => {
                                // Save in localStorage
                                localStorage.setItem("dns_cache_yashwantpoyrekar.dev", "93.184.216.34");
                                
                                // Step 8: Send HTTP Request to Web Server
                                setCurrentStepText("Step 8: Browser fetching webpage from Web Server (93.184.216.34)");
                                travelPacket("browser", "web_server", "GET /about HTTP/1.1", 1.8, () => {
                                  simulateNodeProcess("web_server", "CONTENT", 1.2, () => {
                                    // Return web page & render browser about page!
                                    travelPacket("web_server", "browser", "200 OK (HTML/Bio Data)", 1.5, () => {
                                      setIsResolved(true);
                                      setInDiagramMode(false);
                                    });
                                  });
                                });
                              });
                            });
                          });
                        });
                      });
                    });
                  });
                });
              });
            });
          }
        });
      }
    });
  };

  const clearLocalCache = () => {
    localStorage.removeItem("dns_cache_yashwantpoyrekar.dev");
    setCacheHitMessage("LocalStorage cache cleared!");
    setTimeout(() => setCacheHitMessage(null), 3000);
  };

  useEffect(() => {
    updateCameraView(cameraPos.current.x, cameraPos.current.y, cameraPos.current.zoom);
    setZoomLevelDisplay(Math.round(cameraPos.current.zoom * 100));
  }, []);

  return (
    <div className="w-screen h-screen bg-slate-950 text-slate-100 flex flex-col font-sans overflow-hidden">
      {/* Browser View Mode */}
      {!inDiagramMode ? (
        <BrowserMockup initialUrl="yashwantpoyrekar.dev" onNavigate={handleUrlNavigate}>
          {isResolved ? (
            /* ABOUT ME PORTFOLIO CONTENT */
            <PortfolioContent
              onClearCache={clearLocalCache}
              onInspectDiagram={handleInspectDiagram}
            />
          ) : (
            /* DEFAULT BROWSER INTRO */
            <div className="text-center space-y-4 max-w-md">
              <div className="p-4 bg-sky-500/10 text-sky-400 rounded-3xl border border-sky-500/20 w-fit mx-auto animate-pulse">
                <Globe className="w-10 h-10" />
              </div>
              <h2 className="text-2xl font-extrabold text-white tracking-wide">
                Press <span className="text-sky-400 font-mono">Go</span> or <span className="text-sky-400 font-mono">Enter</span>
              </h2>
              <p className="text-xs text-slate-400 leading-relaxed">
                Enter <span className="text-slate-200 font-mono">yashwantpoyrekar.dev</span> in the address bar above to launch the camera-guided DNS resolution traversal across all diagram servers!
              </p>
              <button
                onClick={() => handleUrlNavigate("yashwantpoyrekar.dev")}
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
          <header className="relative z-10 w-full max-w-6xl flex flex-col sm:flex-row items-center justify-between py-2 px-3 sm:px-5 bg-slate-900/90 backdrop-blur-md rounded-2xl border border-slate-800 shadow-xl gap-2 sm:gap-0">
            <div className="flex items-center space-x-3 w-full sm:w-auto">
              <div className="p-1.5 sm:p-2 bg-sky-500/20 text-sky-400 rounded-xl border border-sky-500/30 shrink-0">
                <Globe className="w-4 h-4 sm:w-5 sm:h-5 animate-spin" />
              </div>
              <div className="min-w-0 flex-1">
                <h1 className="text-xs sm:text-sm font-bold text-white flex items-center gap-2 truncate">
                  ONE LARGE WORLD <span className="text-[9px] sm:text-[10px] uppercase px-2 py-0.5 rounded-full bg-sky-500/20 text-sky-400 border border-sky-500/30 font-mono shrink-0">Interactive Diagram</span>
                </h1>
                <p className="text-[10px] sm:text-[11px] text-slate-400 truncate">{currentStepText}</p>
              </div>
            </div>

            <div className="flex items-center justify-between sm:justify-end gap-2 w-full sm:w-auto">
              {cacheHitMessage && (
                <div className="text-[10px] sm:text-xs px-2.5 py-1 bg-amber-500/20 border border-amber-500/40 text-amber-300 rounded-xl font-mono animate-pulse truncate max-w-[200px] sm:max-w-none">
                  {cacheHitMessage}
                </div>
              )}
              <button
                onClick={() => setInDiagramMode(false)}
                className="px-2.5 sm:px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-[11px] sm:text-xs text-slate-300 rounded-xl border border-slate-700 transition-all cursor-pointer shrink-0"
              >
                Back to Browser
              </button>
            </div>
          </header>

          {/* SVG Diagram Canvas */}
          <div
            className="relative w-full flex-1 my-2 bg-slate-900/40 rounded-2xl border border-slate-800/80 shadow-2xl overflow-hidden backdrop-blur-sm cursor-grab active:cursor-grabbing select-none"
            onWheel={handleWheel}
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            onMouseLeave={handleMouseUp}
          >
            {/* Floating Zoom & Canvas Controls */}
            <div className="absolute top-3 right-3 z-20 flex items-center gap-1.5 bg-slate-900/90 backdrop-blur-md p-1.5 rounded-2xl border border-slate-800 shadow-xl select-none">
              <button
                onClick={handleZoomIn}
                className="p-1.5 sm:p-2 bg-slate-800 hover:bg-slate-700 text-slate-200 hover:text-white rounded-xl transition-all cursor-pointer"
                title="Zoom In (+)"
              >
                <ZoomIn className="w-4 h-4" />
              </button>
              <div className="px-2 sm:px-2.5 py-1 text-[11px] sm:text-xs font-mono font-bold text-sky-400 bg-slate-950/80 rounded-lg border border-slate-800/80 min-w-[50px] sm:min-w-[54px] text-center">
                {zoomLevelDisplay}%
              </div>
              <button
                onClick={handleZoomOut}
                className="p-1.5 sm:p-2 bg-slate-800 hover:bg-slate-700 text-slate-200 hover:text-white rounded-xl transition-all cursor-pointer"
                title="Zoom Out (-)"
              >
                <ZoomOut className="w-4 h-4" />
              </button>
              <div className="w-[1px] h-4 sm:h-5 bg-slate-800 my-auto mx-0.5" />
              <button
                onClick={handleResetView}
                className="px-2.5 py-1.5 bg-slate-800 hover:bg-slate-700 text-[11px] sm:text-xs font-semibold text-slate-200 hover:text-white rounded-xl transition-all cursor-pointer flex items-center gap-1.5"
                title="Fit All Nodes"
              >
                <Maximize2 className="w-3.5 h-3.5 text-sky-400" />
                <span className="hidden xs:inline">Fit View</span>
              </button>
            </div>

            {/* Info Helper Toast */}
            <div className="absolute bottom-3 left-3 z-20 hidden md:flex items-center gap-2 px-3 py-1.5 bg-slate-900/80 backdrop-blur-md border border-slate-800/80 rounded-xl text-[11px] text-slate-300 shadow-lg pointer-events-none">
              <Info className="w-3.5 h-3.5 text-sky-400 shrink-0" />
              <span>Click node to view records & details • Scroll to zoom • Drag to pan</span>
            </div>

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
              <g className="connections">
                {CONNECTIONS.map((conn, idx) => {
                  const fromNode = DIAGRAM_NODES.find((n) => n.id === conn.from)!;
                  const toNode = DIAGRAM_NODES.find((n) => n.id === conn.to)!;
                  if (!fromNode || !toNode) return null;

                  const { pathD } = getCurveInfo(conn.from, conn.to);
                  const isPrimaryActive = activeNodeId === conn.to || activeNodeId === conn.from;
                  const isTLDBranch = conn.from === "root" && (conn.to === "tld_com" || conn.to === "tld_org");

                  return (
                    <g key={idx}>
                      {/* Glow backdrop path */}
                      <path
                        d={pathD}
                        fill="none"
                        stroke={isPrimaryActive ? "#0284c7" : isTLDBranch ? "#334155" : "#1e293b"}
                        strokeWidth={isPrimaryActive ? "6" : "3"}
                        strokeOpacity={isPrimaryActive ? "0.4" : "0.2"}
                        filter="url(#glow)"
                      />
                      {/* Main Curved Path */}
                      <path
                        d={pathD}
                        fill="none"
                        stroke={isPrimaryActive ? "#38bdf8" : isTLDBranch ? "#475569" : "#334155"}
                        strokeWidth={isPrimaryActive ? "3" : "2"}
                        strokeDasharray={isTLDBranch ? "4 4" : "6 4"}
                        markerEnd={isPrimaryActive ? "url(#arrow-active)" : "url(#arrow)"}
                        className="transition-all duration-300"
                      />
                    </g>
                  );
                })}
              </g>

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
          <footer className="relative z-10 w-full max-w-6xl flex items-center justify-between text-[10px] sm:text-[11px] text-slate-400 px-2 py-1">
            <div className="flex items-center gap-2 sm:gap-4">
              <span className="flex items-center gap-1 truncate">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" /> DNS Cache Enabled
              </span>
              <span className="hidden xs:flex items-center gap-1 truncate">
                <ArrowRight className="w-3.5 h-3.5 text-sky-400 shrink-0" /> Interactive Zoom & Node Inspector
              </span>
            </div>
            <div className="truncate">ONE LARGE WORLD Architecture</div>
          </footer>
        </div>
      )}

      {/* Node Detail Modal */}
      <NodeDetailModal
        node={selectedModalNode}
        onClose={() => setSelectedModalNode(null)}
        onFocusNode={(nodeId) => {
          zoomToNode(nodeId, 2.2, 0.8);
          setSelectedModalNode(null);
        }}
      />
    </div>
  );
};

export default FullWorldFlow;

