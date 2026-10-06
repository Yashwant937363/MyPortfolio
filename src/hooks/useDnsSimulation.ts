import { useState, type MutableRefObject } from "react";
import gsap from "gsap";
import { DIAGRAM_NODES } from "../data/diagramData";
import { getCurveInfo, getCubicPoint } from "../utils/curveUtils";
import type { CameraPos } from "./useDiagramCamera";

interface UseDnsSimulationProps {
  cameraPos: MutableRefObject<CameraPos>;
  updateCameraView: (x: number, y: number, zoom: number) => void;
  setZoomLevelDisplay: React.Dispatch<React.SetStateAction<number>>;
  zoomToNode: (
    nodeId: string,
    zoom?: number,
    duration?: number,
    onNodeActivated?: (id: string) => void
  ) => void;
  handleResetView: () => void;
}

export const ALL_PORTFOLIO_ROUTES = new Set([
  "/about",
  "/experience",
  "/education",
  "/skills",
  "/projects",
  "/projects/queuecast",
  "/projects/tictactoe",
  "/projects/tic-tac-toe",
  "/projects/gossip",
  "/projects/gossip-app",
  "/projects/todo",
  "/projects/todo-list",
]);

export const useDnsSimulation = ({
  cameraPos,
  updateCameraView,
  setZoomLevelDisplay,
  zoomToNode,
  handleResetView,
}: UseDnsSimulationProps) => {
  const [inDiagramMode, setInDiagramMode] = useState<boolean>(false);
  const [activeNodeId, setActiveNodeId] = useState<string>("browser");
  const [activeProcessNode, setActiveProcessNode] = useState<string | null>(
    null
  );
  const [highlightRecordKey, setHighlightRecordKey] = useState<string | null>(
    null
  );
  const [scrollOffsets, setScrollOffsets] = useState<{
    [nodeId: string]: number;
  }>({});

  const [packetInfo, setPacketInfo] = useState<{
    visible: boolean;
    x: number;
    y: number;
    message: string;
  }>({
    visible: false,
    x: DIAGRAM_NODES[0].x,
    y: DIAGRAM_NODES[0].y,
    message: "",
  });

  const [isResolved, setIsResolved] = useState<boolean>(false);
  const [cacheHitMessage, setCacheHitMessage] = useState<string | null>(null);
  const [currentStepText, setCurrentStepText] = useState<string>("");
  const [loadedRoutes, setLoadedRoutes] = useState<Set<string>>(new Set());

  // Animate packet traveling along curved Bezier path with port anchors
  const travelPacket = (
    fromNodeId: string,
    toNodeId: string,
    message: string,
    duration = 1.4,
    onComplete?: () => void,
    skipCameraMove = false
  ) => {
    const toNode = DIAGRAM_NODES.find((n) => n.id === toNodeId)!;
    const { pStart, pEnd, cp1, cp2 } = getCurveInfo(
      fromNodeId,
      toNodeId,
      DIAGRAM_NODES
    );

    setActiveNodeId(toNodeId);
    setPacketInfo({
      visible: true,
      x: pStart.x,
      y: pStart.y,
      message: message,
    });

    const anim = { t: 0 };

    // Move camera & packet along curve smoothly
    if (!skipCameraMove) {
      gsap.to(cameraPos.current, {
        x: toNode.x,
        y: toNode.y,
        zoom: 1.5,
        duration: duration,
        ease: "power1.inOut",
        onUpdate: () => {
          setZoomLevelDisplay(Math.round(cameraPos.current.zoom * 100));
          updateCameraView(
            cameraPos.current.x,
            cameraPos.current.y,
            cameraPos.current.zoom
          );
        },
      });
    }

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
          message: message,
        });
      },
      onComplete: () => {
        setPacketInfo((prev) => ({ ...prev, visible: false }));
        if (onComplete) onComplete();
      },
    });
  };

  // Animate node data lookup / container scrolling process with node expansion
  const simulateNodeProcess = (
    nodeId: string,
    targetKey: string,
    duration = 2.0,
    onComplete?: () => void
  ) => {
    setActiveProcessNode(nodeId);
    setHighlightRecordKey(null);
    // Deep camera zoom-in directly into the expanded server node
    zoomToNode(nodeId, 2.6, 0.7, setActiveNodeId);

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
    const finalScrollY =
      targetIdx !== -1 ? Math.max(0, targetIdx * 30 - 30) : 0;
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
          duration: 0.4,
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
            }, 1000);
          },
        });
      },
    });
  };

  // Single comprehensive flow: hits the server only once to get everything in a single flow
  const fetchEverythingFromServer = (onComplete?: () => void) => {
    setInDiagramMode(true);
    const stepDuration = 1.0;

    // Focus camera on Browser to start
    zoomToNode("browser", 1.5, 0.6, setActiveNodeId);

    // Leg 1: Browser -> API Gateway
    setCurrentStepText(
      "1. Browser sending HTTP request to API Gateway: GET / (Fetch Complete Portfolio Bundle)"
    );
    travelPacket(
      "browser",
      "api_gateway",
      "GET / HTTP/1.1 (All Sections)",
      stepDuration,
      () => {
        // Step 2: API Gateway processes routes and verifies services
        setCurrentStepText(
          "2. API Gateway resolving all microservices (/about, /experience, /education, /skills, /projects)"
        );
        simulateNodeProcess("api_gateway", "STATUS", 1.0, () => {
          // Leg 3: API Gateway queries microservice backend cluster to aggregate all data
          setCurrentStepText(
            "3. API Gateway querying microservices cluster for all section records"
          );
          travelPacket(
            "api_gateway",
            "about_server",
            "Fetch Microservices Records",
            0.7,
            () => {
              // Return aggregated microservices data to API Gateway
              travelPacket(
                "about_server",
                "api_gateway",
                "200 OK (All Section Data Aggregated)",
                0.7,
                () => {
                  // Leg 4: API Gateway delivers complete portfolio payload back to Browser
                  setCurrentStepText(
                    "4. API Gateway delivering 200 OK response with Complete Portfolio Bundle to Browser"
                  );
                  travelPacket(
                    "api_gateway",
                    "browser",
                    "200 OK (Full Portfolio Delivered)",
                    stepDuration,
                    () => {
                      setCurrentStepText(
                        "HTTP 200 OK Received! Rendering Full Portfolio Flow"
                      );
                      setActiveProcessNode(null);
                      setHighlightRecordKey(null);
                      setLoadedRoutes(ALL_PORTFOLIO_ROUTES);
                      setIsResolved(true);

                      setTimeout(() => {
                        setInDiagramMode(false);
                        if (onComplete) onComplete();
                      }, 500);
                    }
                  );
                }
              );
            }
          );
        });
      }
    );
  };

  const traversePageRequest = (_path?: string, onComplete?: () => void) => {
    fetchEverythingFromServer(onComplete);
  };

  // Main flow when user submits URL in browser
  const handleUrlNavigate = (inputUrl?: string) => {
    let targetPath = "/about";
    if (inputUrl) {
      const match = inputUrl.match(/yashwantpoyrekar\.dev(\/[a-zA-Z0-9\-_/]*)/);
      targetPath = match ? match[1] : inputUrl.startsWith("/") ? inputUrl : "/about";
    }

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
        updateCameraView(
          cameraPos.current.x,
          cameraPos.current.y,
          cameraPos.current.zoom
        );
      },
      onComplete: () => {
        // Step 1: Check Browser Cache
        setCurrentStepText("Step 1: Checking Local Browser Cache...");
        travelPacket(
          "browser",
          "cache",
          'Checking cache for "yashwantpoyrekar.dev"',
          1.4,
          () => {
            if (cachedIp) {
              // CACHE HIT!
              setCacheHitMessage(
                `CACHE HIT! IP ${cachedIp} found in LocalStorage.`
              );
              simulateNodeProcess("cache", "yashwantpoyrekar.dev", 1.0, () => {
                // Return cached IP back to browser
                travelPacket(
                  "cache",
                  "browser",
                  `Return Cached IP: ${cachedIp}`,
                  1.0,
                  () => {
                    // DNS resolved via cache -> Hit server for requested page data
                    traversePageRequest(targetPath, () => {
                      setIsResolved(true);
                    });
                  }
                );
              });
            } else {
              // CACHE MISS -> Complete full DNS traversal
              setCacheHitMessage(
                "CACHE MISS! IP not found in local storage. Starting DNS lookup chain..."
              );
              simulateNodeProcess("cache", "none", 1.2, () => {
                // Step 2: Query Recursive Resolver
                setCurrentStepText("Step 2: Querying Recursive DNS Resolver");
                travelPacket(
                  "browser",
                  "resolver",
                  'Query: "Where is yashwantpoyrekar.dev?"',
                  1.4,
                  () => {
                    // Step 3: Query Root Server
                    setCurrentStepText("Step 3: Querying Root DNS Server (.)");
                    travelPacket(
                      "resolver",
                      "root",
                      'Query Root: "Who handles .dev TLD?"',
                      1.5,
                      () => {
                        simulateNodeProcess("root", ".dev", 1.4, () => {
                          // Step 4: Refer to .dev TLD Server
                          setCurrentStepText(
                            "Step 4: Contacting .dev TLD Server"
                          );
                          travelPacket(
                            "root",
                            "tld_dev",
                            'Referral: "Ask .dev TLD Server at 200.7.8.99"',
                            1.5,
                            () => {
                              simulateNodeProcess(
                                "tld_dev",
                                "yashwantpoyrekar.dev",
                                1.4,
                                () => {
                                  // Step 5: Contact Authoritative DNS
                                  setCurrentStepText(
                                    "Step 5: Querying Authoritative DNS Server"
                                  );
                                  travelPacket(
                                    "tld_dev",
                                    "auth_dns",
                                    'Query Auth DNS: "Give A Record for yashwantpoyrekar.dev"',
                                    1.6,
                                    () => {
                                      simulateNodeProcess(
                                        "auth_dns",
                                        "yashwantpoyrekar.dev A",
                                        1.6,
                                        () => {
                                          // Step 6: Return IP to Resolver
                                          setCurrentStepText(
                                            "Step 6: Authoritative DNS returns IP 93.184.216.34"
                                          );
                                          travelPacket(
                                            "auth_dns",
                                            "resolver",
                                            "Response: yashwantpoyrekar.dev = 93.184.216.34",
                                            1.8,
                                            () => {
                                              // Step 7: Return IP to Browser & Store in Cache
                                              setCurrentStepText(
                                                "Step 7: Resolver returns IP to Browser & caches result"
                                              );
                                              travelPacket(
                                                "resolver",
                                                "browser",
                                                "IP 93.184.216.34 resolved!",
                                                1.4,
                                                () => {
                                                  // Save in localStorage
                                                  localStorage.setItem(
                                                    "dns_cache_yashwantpoyrekar.dev",
                                                    "93.184.216.34"
                                                  );

                                                  // Step 8: Hit Server for Page Data via API Gateway IP
                                                  traversePageRequest(
                                                    targetPath,
                                                    () => {
                                                      setIsResolved(true);
                                                    }
                                                  );
                                                }
                                              );
                                            }
                                          );
                                        }
                                      );
                                    }
                                  );
                                }
                              );
                            }
                          );
                        });
                      }
                    );
                  }
                );
              });
            }
          }
        );
      },
    });
  };

  const clearLocalCache = () => {
    localStorage.removeItem("dns_cache_yashwantpoyrekar.dev");
    setCacheHitMessage("LocalStorage cache cleared!");
    setTimeout(() => setCacheHitMessage(null), 3000);
  };

  const handleInspectDiagram = () => {
    setInDiagramMode(true);
    setCurrentStepText("Inspecting ONE LARGE WORLD Architecture Diagram");
    handleResetView();
  };

  return {
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
  };
};

export default useDnsSimulation;
