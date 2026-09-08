import React from "react";
import { FolderGit2, ExternalLink, Github, ArrowLeft, Layers, Code2 } from "lucide-react";
import { PROJECTS_DATA } from "../../data/portfolioData";

interface ProjectsSectionProps {
  selectedProjectSlug: string | null;
  onSelectProject: (slug: string | null) => void;
}

export const ProjectsSection: React.FC<ProjectsSectionProps> = ({
  selectedProjectSlug,
  onSelectProject,
}) => {
  const activeProject = PROJECTS_DATA.find(
    (p) => p.slug === selectedProjectSlug
  );

  // If a specific project route is selected e.g. /projects/todo-list
  if (activeProject) {
    return (
      <section id="projects" className="space-y-4 pt-4 scroll-mt-24">
        {/* Back control header */}
        <div className="flex items-center justify-between border-b border-slate-800 pb-3">
          <button
            onClick={() => onSelectProject(null)}
            aria-label="Back to all projects"
            className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold rounded-xl border border-slate-700 flex items-center gap-1.5 transition-all cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" /> All Projects
          </button>

          <span className="text-xs font-mono text-sky-400 bg-sky-500/10 px-2.5 py-1 rounded-lg border border-sky-500/20">
            Route: /projects/{activeProject.slug}
          </span>
        </div>

        {/* Project Detail Card */}
        <div className="p-4 sm:p-6 bg-slate-900/60 border border-slate-800/80 rounded-2xl space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800/60 pb-3">
            <div>
              <h2 className="text-lg sm:text-xl font-extrabold text-white">
                {activeProject.title}
              </h2>
              <p className="text-xs text-slate-400 mt-1">
                {activeProject.shortDescription}
              </p>
            </div>

            {activeProject.liveUrl && activeProject.liveUrl !== "#" && (
              <a
                href={activeProject.liveUrl}
                target="_blank"
                rel="noreferrer"
                aria-label={`Open live site for ${activeProject.title}`}
                className="px-3.5 py-1.5 bg-sky-600 hover:bg-sky-500 text-white font-semibold rounded-xl text-xs flex items-center gap-1.5 transition-all shadow-lg shadow-sky-600/20 shrink-0"
              >
                <ExternalLink className="w-3.5 h-3.5" /> Live Demo
              </a>
            )}
          </div>

          {/* Project Images Gallery */}
          {activeProject.images && activeProject.images.length > 0 && (
            <div className="space-y-2">
              <h3 className="text-xs font-bold text-slate-300 uppercase tracking-wider flex items-center gap-1.5">
                <Layers className="w-3.5 h-3.5 text-sky-400" /> Screenshots & Previews
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {activeProject.images.map((imgUrl, iIdx) => (
                  <div
                    key={iIdx}
                    className="relative rounded-xl overflow-hidden border border-slate-800/80 bg-slate-950/60 group aspect-video"
                  >
                    <img
                      src={imgUrl}
                      alt={`${activeProject.title} screenshot ${iIdx + 1}`}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Full Description */}
          <div className="space-y-1.5 pt-2">
            <h3 className="text-xs font-bold text-slate-300 uppercase tracking-wider">
              About the Project
            </h3>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              {activeProject.fullDescription}
            </p>
          </div>

          {/* Tech Stack */}
          <div className="space-y-2 pt-2 border-t border-slate-800/60">
            <h3 className="text-xs font-bold text-slate-300 uppercase tracking-wider flex items-center gap-1.5">
              <Code2 className="w-3.5 h-3.5 text-sky-400" /> Technologies Used
            </h3>
            <div className="flex flex-wrap gap-1.5">
              {activeProject.techStack.map((tech, tIdx) => (
                <span
                  key={tIdx}
                  className="text-xs font-mono px-2.5 py-1 rounded-xl bg-slate-800 text-slate-200 border border-slate-700/60"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>

          {/* Code Repositories */}
          {activeProject.codeRepos && activeProject.codeRepos.length > 0 && (
            <div className="space-y-2 pt-2 border-t border-slate-800/60">
              <h3 className="text-xs font-bold text-slate-300 uppercase tracking-wider flex items-center gap-1.5">
                <Github className="w-3.5 h-3.5 text-slate-300" /> Source Code Repositories
              </h3>
              <div className="flex flex-wrap gap-2">
                {activeProject.codeRepos.map((repo, rIdx) => (
                  <a
                    key={rIdx}
                    href={repo.url}
                    target="_blank"
                    rel="noreferrer"
                    aria-label={`Open repository ${repo.label}`}
                    className="px-3 py-1.5 bg-slate-800/80 hover:bg-slate-700 text-slate-200 text-xs rounded-xl border border-slate-700 flex items-center gap-1.5 transition-all"
                  >
                    <Github className="w-3.5 h-3.5 text-sky-400" />
                    <span>{repo.label}</span>
                  </a>
                ))}
              </div>
            </div>
          )}
        </div>
      </section>
    );
  }

  // General /projects list view
  return (
    <section id="projects" className="space-y-4 pt-4 scroll-mt-24">
      <div className="flex items-center justify-between">
        <h2 className="text-xs sm:text-sm font-bold text-slate-200 uppercase tracking-wider flex items-center gap-2">
          <FolderGit2 className="w-4 h-4 text-sky-400" /> Featured Projects
        </h2>
        <span className="text-[11px] font-mono text-slate-400">
          Route: /projects
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        {PROJECTS_DATA.map((proj) => (
          <div
            key={proj.slug}
            className="p-4 bg-slate-900/60 border border-slate-800/80 rounded-2xl space-y-3 flex flex-col justify-between hover:border-sky-500/40 transition-colors"
          >
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-bold text-slate-100">
                  {proj.title}
                </h3>
                <span className="text-[10px] font-mono text-sky-400 bg-sky-500/10 px-2 py-0.5 rounded border border-sky-500/20">
                  /projects/{proj.slug}
                </span>
              </div>
              <p className="text-xs text-slate-400 leading-relaxed">
                {proj.shortDescription}
              </p>
            </div>

            <div className="space-y-2 pt-2 border-t border-slate-800/60">
              <div className="flex flex-wrap gap-1">
                {proj.techStack.map((t, tIdx) => (
                  <span
                    key={tIdx}
                    className="text-[9px] font-mono px-1.5 py-0.5 rounded bg-slate-800 text-slate-300 border border-slate-700/60"
                  >
                    {t}
                  </span>
                ))}
              </div>

              <div className="flex items-center justify-between pt-1">
                <button
                  onClick={() => onSelectProject(proj.slug)}
                  aria-label={`View details for ${proj.title}`}
                  className="px-3 py-1 bg-sky-600/20 hover:bg-sky-600/40 text-sky-300 text-xs font-semibold rounded-lg border border-sky-500/30 transition-all cursor-pointer flex items-center gap-1"
                >
                  View Route Details →
                </button>

                <div className="flex items-center space-x-2">
                  {proj.codeRepos && proj.codeRepos[0] && (
                    <a
                      href={proj.codeRepos[0].url}
                      target="_blank"
                      rel="noreferrer"
                      aria-label={`GitHub repo for ${proj.title}`}
                      className="text-slate-400 hover:text-white transition-colors"
                    >
                      <Github className="w-4 h-4" />
                    </a>
                  )}
                  {proj.liveUrl && proj.liveUrl !== "#" && (
                    <a
                      href={proj.liveUrl}
                      target="_blank"
                      rel="noreferrer"
                      aria-label={`Live site for ${proj.title}`}
                      className="text-sky-400 hover:text-sky-300 transition-colors"
                    >
                      <ExternalLink className="w-4 h-4" />
                    </a>
                  )}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default ProjectsSection;
