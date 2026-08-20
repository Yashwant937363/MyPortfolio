import React from "react";
import { Mail } from "lucide-react";

interface TravelingPacketProps {
  x: number;
  y: number;
  message: string;
}

export const TravelingPacket: React.FC<TravelingPacketProps> = ({ x, y, message }) => {
  return (
    <g transform={`translate(${x}, ${y})`}>
      {/* Outer Pulse Halo */}
      <circle r="22" fill="#0284c7" className="opacity-40 animate-ping" />
      <circle r="18" fill="#0369a1" className="shadow-lg" />
      
      {/* Envelope Mail Icon */}
      <g transform="translate(-10, -10)">
        <Mail className="w-5 h-5 text-white stroke-[2.5]" />
      </g>
      
      {/* Message Tooltip */}
      <foreignObject x="-90" y="-55" width="180" height="35">
        <div className="bg-slate-900/95 border border-sky-500/80 text-sky-300 text-[10px] font-mono font-bold px-2 py-1 rounded-lg text-center shadow-xl truncate">
          {message}
        </div>
      </foreignObject>
    </g>
  );
};

export default TravelingPacket;
