import React from "react";
import { ExternalLink, Github } from "lucide-react";
import type { Project } from "../../data/projectsData";

interface ProjectCardProps {
  project: Project;
}

export const ProjectCard: React.FC<ProjectCardProps> = ({ project }) => {
  return (
    <div className="p-3.5 bg-slate-900/60 border border-slate-800/80 rounded-xl space-y-2 flex flex-col justify-between hover:border-sky-500/40 transition-colors">
      <div>
        <div className="flex items-center justify-between">
          <h3 className="text-xs sm:text-sm font-bold text-slate-100">
            {project.title}
          </h3>
          <div className="flex items-center space-x-2">
            {project.github && (
              <a
                href={project.github}
                target="_blank"
                rel="noreferrer"
                aria-label={`GitHub repository for ${project.title}`}
                className="text-slate-400 hover:text-white transition-colors"
              >
                <Github className="w-3.5 h-3.5" />
              </a>
            )}
            {project.live && project.live !== "#" && (
              <a
                href={project.live}
                target="_blank"
                rel="noreferrer"
                aria-label={`Live site for ${project.title}`}
                className="text-sky-400 hover:text-sky-300 transition-colors"
              >
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            )}
          </div>
        </div>
        <p className="text-[11px] sm:text-xs text-slate-400 mt-1 leading-relaxed">
          {project.description}
        </p>
      </div>

      <div className="flex flex-wrap gap-1 pt-1">
        {project.tech.map((t, tIdx) => (
          <span
            key={tIdx}
            className="text-[9px] font-mono px-1.5 py-0.5 rounded bg-slate-800 text-slate-300 border border-slate-700/60"
          >
            {t}
          </span>
        ))}
      </div>
    </div>
  );
};

export default ProjectCard;
