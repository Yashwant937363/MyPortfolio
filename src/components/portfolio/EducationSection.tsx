import React from "react";
import { GraduationCap, MapPin, Calendar } from "lucide-react";
import { EDUCATION_DATA } from "../../data/portfolioData";

export const EducationSection: React.FC = () => {
  return (
    <section id="education" className="space-y-4 pt-4 scroll-mt-24">
      <h2 className="text-xs sm:text-sm font-bold text-slate-200 uppercase tracking-wider flex items-center gap-2">
        <GraduationCap className="w-4 h-4 text-sky-400" /> Education
      </h2>

      <div className="space-y-3">
        {EDUCATION_DATA.map((item) => (
          <div
            key={item.id}
            className="p-4 sm:p-5 bg-slate-900/60 border border-slate-800/80 rounded-2xl space-y-2 hover:border-slate-700 transition-colors"
          >
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 border-b border-slate-800/60 pb-2">
              <div>
                <h3 className="text-sm sm:text-base font-bold text-slate-100">
                  {item.degree}
                </h3>
                <div className="text-xs text-sky-400 font-mono">
                  {item.institution}
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

            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed pt-1">
              {item.details}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default EducationSection;
