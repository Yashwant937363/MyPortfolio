import React from "react";
import { CONNECTIONS, DIAGRAM_NODES } from "../../data/diagramData";
import { getCurveInfo } from "../../utils/curveUtils";

interface DiagramConnectionsProps {
  activeNodeId: string;
}

export const DiagramConnections: React.FC<DiagramConnectionsProps> = ({
  activeNodeId,
}) => {
  return (
    <g className="connections">
      {CONNECTIONS.map((conn, idx) => {
        const fromNode = DIAGRAM_NODES.find((n) => n.id === conn.from);
        const toNode = DIAGRAM_NODES.find((n) => n.id === conn.to);
        if (!fromNode || !toNode) return null;

        const { pathD } = getCurveInfo(conn.from, conn.to, DIAGRAM_NODES);
        const isPrimaryActive =
          activeNodeId === conn.to || activeNodeId === conn.from;
        const isTLDBranch =
          conn.from === "root" &&
          (conn.to === "tld_com" || conn.to === "tld_org");

        return (
          <g key={idx}>
            {/* Glow backdrop path */}
            <path
              d={pathD}
              fill="none"
              stroke={
                isPrimaryActive
                  ? "#0284c7"
                  : isTLDBranch
                    ? "#334155"
                    : "#1e293b"
              }
              strokeWidth={isPrimaryActive ? "6" : "3"}
              strokeOpacity={isPrimaryActive ? "0.4" : "0.2"}
              filter="url(#glow)"
            />
            {/* Main Curved Path */}
            <path
              d={pathD}
              fill="none"
              stroke={
                isPrimaryActive
                  ? "#38bdf8"
                  : isTLDBranch
                    ? "#475569"
                    : "#334155"
              }
              strokeWidth={isPrimaryActive ? "3" : "2"}
              strokeDasharray={isTLDBranch ? "4 4" : "6 4"}
              markerEnd={
                isPrimaryActive ? "url(#arrow-active)" : "url(#arrow)"
              }
              className="transition-all duration-300"
            />
          </g>
        );
      })}
    </g>
  );
};

export default DiagramConnections;
