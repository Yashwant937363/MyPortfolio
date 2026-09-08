import React from "react";
import { Code2 } from "lucide-react";
import { SKILLS_DATA } from "../../data/portfolioData";

export const SkillsSection: React.FC = () => {
  return (
    <section id="skills" className="space-y-4 pt-4 scroll-mt-24">
      <h2 className="text-xs sm:text-sm font-bold text-slate-200 uppercase tracking-wider flex items-center gap-2">
        <Code2 className="w-4 h-4 text-sky-400" /> Technical Skills & Stack
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        {SKILLS_DATA.map((cat, idx) => (
          <div
            key={idx}
            className="p-4 bg-slate-900/60 border border-slate-800/80 rounded-2xl space-y-3 hover:border-slate-700 transition-colors"
          >
            <h3 className="text-xs font-bold text-slate-300 uppercase tracking-wider border-b border-slate-800 pb-1.5 flex items-center justify-between">
              <span>{cat.category}</span>
              <span className="text-[10px] text-slate-500 font-mono font-normal">
                {cat.skills.length} items
              </span>
            </h3>

            <div className="flex flex-wrap gap-1.5">
              {cat.skills.map((skill, sIdx) => {
                const isIntermediate = skill.level === "intermediate";
                return (
                  <span
                    key={sIdx}
                    className={`text-xs px-2.5 py-1 rounded-xl font-mono flex items-center gap-1.5 border transition-all ${
                      isIntermediate
                        ? "bg-sky-500/10 text-sky-300 border-sky-500/30 font-semibold"
                        : "bg-slate-800/60 text-slate-300 border-slate-700/60"
                    }`}
                  >
                    <span>{skill.name}</span>
                    <span
                      className={`text-[9px] px-1 rounded uppercase tracking-wider ${
                        isIntermediate
                          ? "bg-sky-500/20 text-sky-400"
                          : "bg-slate-700 text-slate-400"
                      }`}
                    >
                      {skill.level}
                    </span>
                  </span>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default SkillsSection;
