import React from "react";

export const PortfolioHeader: React.FC = () => {
  return (
    <header className="flex items-center justify-between border-b border-slate-800 pb-4 gap-3">
      <div className="flex items-center space-x-3">
        <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-2xl bg-gradient-to-tr from-sky-500 to-blue-600 flex items-center justify-center text-white font-bold text-lg sm:text-xl shadow-lg shrink-0">
          YP
        </div>
        <div>
          <h1 className="text-xl sm:text-2xl font-extrabold text-white">
            Yashwant Poyrekar
          </h1>
          <p className="text-[11px] sm:text-xs text-sky-400 font-mono">
            Full Stack Developer & AI Enthusiast
          </p>
        </div>
      </div>
    </header>
  );
};

export default PortfolioHeader;
