import { useState, useRef, useEffect } from "react";
import gsap from "gsap";
import { MotionPathPlugin } from "gsap/MotionPathPlugin";
import { DIAGRAM_NODES } from "../data/diagramData";

gsap.registerPlugin(MotionPathPlugin);

export interface CameraPos {
  x: number;
  y: number;
  zoom: number;
}

export const useDiagramCamera = (inDiagramMode: boolean) => {
  const worldRef = useRef<SVGSVGElement | null>(null);
  const canvasContainerRef = useRef<HTMLDivElement | null>(null);

  const [zoomLevelDisplay, setZoomLevelDisplay] = useState<number>(220);

  // Drag pan tracking refs
  const isDragging = useRef<boolean>(false);
  const dragStart = useRef<{ x: number; y: number }>({ x: 0, y: 0 });
  const initialCamPos = useRef<{ x: number; y: number }>({ x: 0, y: 0 });
  const dragDistance = useRef<number>(0);

  // Camera viewport position
  const cameraPos = useRef<CameraPos>({
    x: 100,
    y: 390,
    zoom: 2.2,
  });

  // Helper to adjust viewBox smoothly
  const updateCameraView = (x: number, y: number, zoom: number) => {
    if (!worldRef.current) return;
    const baseWidth = 2200;
    const baseHeight = 1000;
    const width = baseWidth / zoom;
    const height = baseHeight / zoom;
    const vx = x - width / 2;
    const vy = y - height / 2;
    worldRef.current.setAttribute("viewBox", `${vx} ${vy} ${width} ${height}`);
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
        updateCameraView(
          cameraPos.current.x,
          cameraPos.current.y,
          cameraPos.current.zoom
        );
      },
    });
  };

  const handleZoomOut = () => {
    const targetZoom = Math.max(cameraPos.current.zoom / 1.25, 0.4);
    gsap.to(cameraPos.current, {
      zoom: targetZoom,
      duration: 0.3,
      ease: "power2.out",
      onUpdate: () => {
        setZoomLevelDisplay(Math.round(cameraPos.current.zoom * 100));
        updateCameraView(
          cameraPos.current.x,
          cameraPos.current.y,
          cameraPos.current.zoom
        );
      },
    });
  };

  const handleResetView = () => {
    gsap.to(cameraPos.current, {
      x: 1050,
      y: 500,
      zoom: 0.65,
      duration: 0.6,
      ease: "power2.inOut",
      onUpdate: () => {
        setZoomLevelDisplay(Math.round(cameraPos.current.zoom * 100));
        updateCameraView(
          cameraPos.current.x,
          cameraPos.current.y,
          cameraPos.current.zoom
        );
      },
    });
  };

  // Animate camera to target node
  const zoomToNode = (
    nodeId: string,
    zoom = 2.0,
    duration = 1.0,
    onNodeActivated?: (id: string) => void
  ) => {
    const targetNode = DIAGRAM_NODES.find((n) => n.id === nodeId);
    if (!targetNode) return;
    if (onNodeActivated) onNodeActivated(nodeId);

    gsap.to(cameraPos.current, {
      x: targetNode.x,
      y: targetNode.y,
      zoom: zoom,
      duration: duration,
      ease: "power2.inOut",
      onUpdate: () => {
        setZoomLevelDisplay(Math.round(cameraPos.current.zoom * 100));
        updateCameraView(
          cameraPos.current.x,
          cameraPos.current.y,
          cameraPos.current.zoom
        );
      },
    });
  };

  // Mouse drag handlers
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
    const scaleX = 1400 / cameraPos.current.zoom / rect.width;
    const scaleY = 800 / cameraPos.current.zoom / rect.height;

    cameraPos.current.x = initialCamPos.current.x - dx * scaleX;
    cameraPos.current.y = initialCamPos.current.y - dy * scaleY;
    updateCameraView(
      cameraPos.current.x,
      cameraPos.current.y,
      cameraPos.current.zoom
    );
  };

  const handleMouseUp = () => {
    isDragging.current = false;
  };

  // Touchscreen drag handlers for mobile/tablet
  const handleTouchStart = (e: React.TouchEvent) => {
    if (e.touches.length !== 1 || (e.target as HTMLElement).closest("button"))
      return;
    const touch = e.touches[0];
    isDragging.current = true;
    dragStart.current = { x: touch.clientX, y: touch.clientY };
    initialCamPos.current = { x: cameraPos.current.x, y: cameraPos.current.y };
    dragDistance.current = 0;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isDragging.current || !worldRef.current || e.touches.length !== 1)
      return;
    const touch = e.touches[0];
    const dx = touch.clientX - dragStart.current.x;
    const dy = touch.clientY - dragStart.current.y;
    dragDistance.current = Math.sqrt(dx * dx + dy * dy);

    const rect = worldRef.current.getBoundingClientRect();
    const scaleX = 1400 / cameraPos.current.zoom / rect.width;
    const scaleY = 800 / cameraPos.current.zoom / rect.height;

    cameraPos.current.x = initialCamPos.current.x - dx * scaleX;
    cameraPos.current.y = initialCamPos.current.y - dy * scaleY;
    updateCameraView(
      cameraPos.current.x,
      cameraPos.current.y,
      cameraPos.current.zoom
    );
  };

  const handleTouchEnd = () => {
    isDragging.current = false;
  };

  // Non-passive wheel listener and GSAP context cleanup
  useEffect(() => {
    const ctx = gsap.context(() => {
      updateCameraView(
        cameraPos.current.x,
        cameraPos.current.y,
        cameraPos.current.zoom
      );
      setZoomLevelDisplay(Math.round(cameraPos.current.zoom * 100));
    });

    const el = canvasContainerRef.current;
    if (el) {
      const handleWheelContainer = (e: WheelEvent) => {
        e.preventDefault();
        const zoomFactor = e.deltaY < 0 ? 1.15 : 0.85;
        const targetZoom = Math.min(
          Math.max(cameraPos.current.zoom * zoomFactor, 0.5),
          4.0
        );
        cameraPos.current.zoom = targetZoom;
        setZoomLevelDisplay(Math.round(targetZoom * 100));
        updateCameraView(
          cameraPos.current.x,
          cameraPos.current.y,
          cameraPos.current.zoom
        );
      };
      el.addEventListener("wheel", handleWheelContainer, { passive: false });

      return () => {
        ctx.revert();
        el.removeEventListener("wheel", handleWheelContainer);
      };
    }

    return () => {
      ctx.revert();
    };
  }, [inDiagramMode]);

  return {
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
  };
};

export default useDiagramCamera;
