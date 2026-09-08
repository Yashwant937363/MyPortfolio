import React, { useState, useRef, useEffect, useCallback } from "react";
import PortfolioHeader from "./portfolio/PortfolioHeader";
import AboutSection from "./portfolio/AboutSection";
import ExperienceSection from "./portfolio/ExperienceSection";
import EducationSection from "./portfolio/EducationSection";
import SkillsSection from "./portfolio/SkillsSection";
import ProjectsSection from "./portfolio/ProjectsSection";
import {
  Zap,
  User,
  Briefcase,
  GraduationCap,
  Code2,
  FolderGit2,
} from "lucide-react";

interface PortfolioContentProps {
  currentUrl?: string;
  onUrlChange?: (newUrl: string) => void;
  loadedRoutes?: Set<string>;
  onRequestRoute?: (path: string) => void;
}

interface UnloadedRouteCardProps {
  route: string;
  title: string;
  icon: React.ReactNode;
}

const UnloadedRouteCard: React.FC<UnloadedRouteCardProps> = ({
  route,
  title,
  icon,
}) => {
  return (
    <div className="p-6 sm:p-8 bg-slate-900/80 border border-slate-800/90 rounded-2xl space-y-4 text-center backdrop-blur-md max-w-lg mx-auto shadow-2xl">
      <div className="flex items-center justify-center gap-2 text-slate-300">
        {icon}
        <h3 className="text-base sm:text-lg font-bold text-slate-100 uppercase tracking-wider">
          {title}
        </h3>
      </div>

      <div className="inline-flex items-center gap-2 px-3 py-1 bg-sky-500/10 border border-sky-500/30 rounded-xl text-sky-400 text-xs font-mono">
        <span className="w-2 h-2 rounded-full bg-sky-400 animate-ping" />
        <span>HTTP GET {route} — Requesting Microservice...</span>
      </div>

      <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
        Auto-triggering HTTP query for <code className="text-sky-300 font-mono">{route}</code> on the architecture diagram.
      </p>

      <div className="pt-1 flex items-center justify-center gap-2 text-xs font-bold text-sky-400 font-mono">
        <Zap className="w-4 h-4 text-amber-300 animate-bounce" />
        <span>Fetching {route} Payload</span>
      </div>
    </div>
  );
};

export const PortfolioContent: React.FC<PortfolioContentProps> = ({
  currentUrl = "yashwantpoyrekar.dev/about",
  onUrlChange,
  loadedRoutes = new Set(["/about"]),
  onRequestRoute,
}) => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const pendingRouteRef = useRef<string | null>(null);
  const isScrollingToTargetRef = useRef<boolean>(false);
  const [selectedProjectSlug, setSelectedProjectSlug] = useState<string | null>(
    null
  );

  const triggerRouteRequest = useCallback(
    (path: string) => {
      if (onRequestRoute) {
        onRequestRoute(path);
      }
    },
    [onRequestRoute]
  );

  // Programmatic scroll to target section when currentUrl changes or returning from diagram mode
  useEffect(() => {
    if (!currentUrl) return;

    const match = currentUrl.match(/yashwantpoyrekar\.dev(\/[a-zA-Z0-9\-_/]*)/);
    const targetPath = match ? match[1] : currentUrl.startsWith("/") ? currentUrl : "/about";

    let sectionId = "about";
    if (targetPath.startsWith("/projects/")) {
      const slug = targetPath.replace("/projects/", "");
      setSelectedProjectSlug(slug);
      sectionId = "projects";
    } else if (targetPath.startsWith("/projects")) {
      setSelectedProjectSlug(null);
      sectionId = "projects";
    } else {
      setSelectedProjectSlug(null);
      sectionId = targetPath.replace("/", "") || "about";
    }

    isScrollingToTargetRef.current = true;
    const timer = setTimeout(() => {
      const el = document.getElementById(sectionId);
      if (el) {
        el.scrollIntoView({ behavior: "auto" });
      }
      setTimeout(() => {
        isScrollingToTargetRef.current = false;
      }, 300);
    }, 60);

    return () => clearTimeout(timer);
  }, [currentUrl]);

  // IntersectionObserver: auto-trigger backend request when user scrolls into an un-fetched section
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const sections = ["about", "experience", "education", "skills", "projects"];
    const observer = new IntersectionObserver(
      (entries) => {
        // Skip updating URL while programmatic scroll to target section is in progress
        if (isScrollingToTargetRef.current) return;

        for (const entry of entries) {
          if (entry.isIntersecting) {
            const sectionId = entry.target.id;
            const path = `/${sectionId}`;
            if (onUrlChange && !selectedProjectSlug) {
              onUrlChange(`yashwantpoyrekar.dev${path}`);
            }

            // AUTO-HIT BACKEND ROUTE ON SCROLL IF NOT LOADED YET
            if (!loadedRoutes.has(path) && pendingRouteRef.current !== path) {
              pendingRouteRef.current = path;
              triggerRouteRequest(path);
            }
          }
        }
      },
      {
        root: container,
        threshold: 0.5,
      }
    );

    sections.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [onUrlChange, selectedProjectSlug, loadedRoutes, triggerRouteRequest]);

  // Clear pending ref when loadedRoutes updates
  useEffect(() => {
    if (pendingRouteRef.current && loadedRoutes.has(pendingRouteRef.current)) {
      pendingRouteRef.current = null;
    }
  }, [loadedRoutes]);

  const handleSelectProject = (slug: string | null) => {
    setSelectedProjectSlug(slug);
    if (slug) {
      const path = `/projects/${slug}`;
      if (!loadedRoutes.has(path)) {
        triggerRouteRequest(path);
      }
      if (onUrlChange) {
        onUrlChange(`yashwantpoyrekar.dev${path}`);
      }
    } else {
      if (!loadedRoutes.has("/projects")) {
        triggerRouteRequest("/projects");
      }
      if (onUrlChange) {
        onUrlChange("yashwantpoyrekar.dev/projects");
      }
    }
  };

  return (
    <div className="w-full h-full flex flex-col overflow-hidden bg-slate-950 text-slate-100 relative">
      {/* Scrollable Container with Full-Height Section Scroll Snapping */}
      <div
        ref={containerRef}
        className="w-full flex-1 overflow-y-auto snap-y snap-mandatory scroll-smooth p-3 sm:p-6 max-w-4xl mx-auto space-y-4"
      >
        {/* Profile Header */}
        <PortfolioHeader />

        {/* Section 1: About Me */}
        <div
          id="about"
          className="snap-start snap-always w-full min-h-full flex flex-col justify-center py-4 scroll-mt-6"
        >
          {loadedRoutes.has("/about") ? (
            <AboutSection />
          ) : (
            <UnloadedRouteCard
              route="/about"
              title="About Me"
              icon={<User className="w-6 h-6 text-sky-400" />}
            />
          )}
        </div>

        {/* Section 2: Experience */}
        <div
          id="experience"
          className="snap-start snap-always w-full min-h-full flex flex-col justify-center py-4 scroll-mt-6"
        >
          {loadedRoutes.has("/experience") ? (
            <ExperienceSection />
          ) : (
            <UnloadedRouteCard
              route="/experience"
              title="Work Experience"
              icon={<Briefcase className="w-6 h-6 text-sky-400" />}
            />
          )}
        </div>

        {/* Section 3: Education */}
        <div
          id="education"
          className="snap-start snap-always w-full min-h-full flex flex-col justify-center py-4 scroll-mt-6"
        >
          {loadedRoutes.has("/education") ? (
            <EducationSection />
          ) : (
            <UnloadedRouteCard
              route="/education"
              title="Education"
              icon={<GraduationCap className="w-6 h-6 text-sky-400" />}
            />
          )}
        </div>

        {/* Section 4: Skills */}
        <div
          id="skills"
          className="snap-start snap-always w-full min-h-full flex flex-col justify-center py-4 scroll-mt-6"
        >
          {loadedRoutes.has("/skills") ? (
            <SkillsSection />
          ) : (
            <UnloadedRouteCard
              route="/skills"
              title="Technical Skills"
              icon={<Code2 className="w-6 h-6 text-sky-400" />}
            />
          )}
        </div>

        {/* Section 5: Projects */}
        <div
          id="projects"
          className="snap-start snap-always w-full min-h-full flex flex-col justify-center py-4 scroll-mt-6"
        >
          {loadedRoutes.has("/projects") ? (
            <ProjectsSection
              selectedProjectSlug={selectedProjectSlug}
              onSelectProject={handleSelectProject}
            />
          ) : (
            <UnloadedRouteCard
              route="/projects"
              title="Featured Projects"
              icon={<FolderGit2 className="w-6 h-6 text-sky-400" />}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default PortfolioContent;
