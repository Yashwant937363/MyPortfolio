import React from "react";
import { Briefcase, MapPin, Calendar, CheckCircle2 } from "lucide-react";
import { EXPERIENCE_DATA } from "../../data/portfolioData";

export const ExperienceSection: React.FC = () => {
  return (
    <section id="experience" className="space-y-4 pt-4 scroll-mt-24">
      <h2 className="text-xs sm:text-sm font-bold text-slate-200 uppercase tracking-wider flex items-center gap-2">
        <Briefcase className="w-4 h-4 text-sky-400" /> Work Experience
      </h2>

      <div className="space-y-3">
        {EXPERIENCE_DATA.map((item) => (
          <div
            key={item.id}
            className="p-4 sm:p-5 bg-slate-900/60 border border-slate-800/80 rounded-2xl space-y-3 hover:border-slate-700 transition-colors"
          >
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 border-b border-slate-800/60 pb-2">
              <div>
                <h3 className="text-sm sm:text-base font-bold text-slate-100">
                  {item.role}
                </h3>
                <div className="text-xs text-sky-400 font-mono">
                  {item.company}
                </div>
              </div>
              <div className="flex items-center gap-3 text-[11px] text-slate-400 font-mono">
                <span className="flex items-center gap-1">
                  <MapPin className="w-3 h-3 text-slate-500" /> {item.location}
                </span>
                <span className="flex items-center gap-1 bg-slate-800 px-2 py-0.5 rounded border border-slate-700/60">
                  <Calendar className="w-3 h-3 text-sky-400" /> {item.period}
                </span>
              </div>
            </div>

            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              {item.description}
            </p>

            {item.achievements && item.achievements.length > 0 && (
              <ul className="space-y-1.5 pt-1">
                {item.achievements.map((ach, idx) => (
                  <li
                    key={idx}
                    className="text-xs text-slate-300 flex items-start gap-2"
                  >
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                    <span>{ach}</span>
                  </li>
                ))}
              </ul>
            )}

            <div className="flex flex-wrap gap-1.5 pt-2">
              {item.skillsUsed.map((skill, sIdx) => (
                <span
                  key={sIdx}
                  className="text-[10px] font-mono px-2 py-0.5 rounded-md bg-slate-800 text-slate-300 border border-slate-700/60"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default ExperienceSection;
