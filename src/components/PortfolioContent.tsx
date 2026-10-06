import React, { useState, useRef, useEffect } from "react";
import PortfolioHeader from "./portfolio/PortfolioHeader";
import AboutSection from "./portfolio/AboutSection";
import ExperienceSection from "./portfolio/ExperienceSection";
import EducationSection from "./portfolio/EducationSection";
import SkillsSection from "./portfolio/SkillsSection";
import ProjectsSection from "./portfolio/ProjectsSection";

interface PortfolioContentProps {
  currentUrl?: string;
  onUrlChange?: (newUrl: string) => void;
  loadedRoutes?: Set<string>;
  onRequestRoute?: (path: string) => void;
}

export const PortfolioContent: React.FC<PortfolioContentProps> = ({
  currentUrl = "yashwantpoyrekar.dev/about",
  onUrlChange,
}) => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const isScrollingToTargetRef = useRef<boolean>(false);
  const isUserScrollingRef = useRef<boolean>(false);
  const scrollTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const currentActiveSectionRef = useRef<string | null>(null);
  const [selectedProjectSlug, setSelectedProjectSlug] = useState<string | null>(
    null
  );

  const handleScroll = () => {
    isUserScrollingRef.current = true;
    if (scrollTimeoutRef.current) {
      clearTimeout(scrollTimeoutRef.current);
    }
    scrollTimeoutRef.current = setTimeout(() => {
      isUserScrollingRef.current = false;
    }, 200);
  };

  // Programmatic scroll to target section ONLY when currentUrl is changed externally (e.g. via address bar)
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

    // If the section update came from the user scrolling, NEVER trigger scrollIntoView!
    if (isUserScrollingRef.current || currentActiveSectionRef.current === sectionId) {
      return;
    }

    currentActiveSectionRef.current = sectionId;
    isScrollingToTargetRef.current = true;
    const timer = setTimeout(() => {
      const el = document.getElementById(sectionId);
      if (el) {
        el.scrollIntoView({ behavior: "smooth" });
      }
      setTimeout(() => {
        isScrollingToTargetRef.current = false;
      }, 400);
    }, 60);

    return () => clearTimeout(timer);
  }, [currentUrl]);

  // IntersectionObserver: update active section URL bar cleanly as user scrolls without fighting scroll
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const sections = ["about", "experience", "education", "skills", "projects"];
    const observer = new IntersectionObserver(
      (entries) => {
        if (isScrollingToTargetRef.current) return;

        for (const entry of entries) {
          if (entry.isIntersecting) {
            const sectionId = entry.target.id;
            const path = `/${sectionId}`;
            currentActiveSectionRef.current = sectionId;
            if (onUrlChange && !selectedProjectSlug) {
              onUrlChange(`yashwantpoyrekar.dev${path}`);
            }
          }
        }
      },
      {
        root: container,
        threshold: 0.25,
      }
    );

    sections.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [onUrlChange, selectedProjectSlug]);

  const handleSelectProject = (slug: string | null) => {
    setSelectedProjectSlug(slug);
    if (slug) {
      const path = `/projects/${slug}`;
      if (onUrlChange) {
        onUrlChange(`yashwantpoyrekar.dev${path}`);
      }
    } else {
      if (onUrlChange) {
        onUrlChange("yashwantpoyrekar.dev/projects");
      }
    }
  };

  return (
    <div className="w-full h-full flex flex-col overflow-hidden bg-slate-950 text-slate-100 relative">
      {/* Scrollable Container with Continuous Flow (No Snapping, No Default Scrollbar) */}
      <div
        ref={containerRef}
        onScroll={handleScroll}
        className="w-full flex-1 overflow-y-auto no-scrollbar p-3 sm:p-6 max-w-4xl mx-auto space-y-12 sm:space-y-16"
      >
        {/* Profile Header */}
        <PortfolioHeader />

        {/* Section 1: About Me */}
        <AboutSection />

        {/* Section 2: Experience */}
        <ExperienceSection />

        {/* Section 3: Education */}
        <EducationSection />

        {/* Section 4: Skills */}
        <SkillsSection />

        {/* Section 5: Projects */}
        <div className="pb-8">
          <ProjectsSection
            selectedProjectSlug={selectedProjectSlug}
            onSelectProject={handleSelectProject}
          />
        </div>
      </div>
    </div>
  );
};

export default PortfolioContent;
