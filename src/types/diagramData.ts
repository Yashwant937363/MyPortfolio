import React from "react";
export { DIAGRAM_NODES, CONNECTIONS } from "../data/diagramData";

export interface DiagramNode {
  id: string;
  title: string;
  subtitle: string;
  category: "browser" | "cache" | "resolver" | "root" | "tld" | "auth" | "app" | "gateway";
  x: number;
  y: number;
  color: string;
  icon: React.ComponentType<{ className?: string }>;
  records?: { key: string; value: string }[];
  description?: string;
}

export interface Connection {
  from: string;
  to: string;
  label: string;
}
