import React, { useState, useEffect, useRef } from "react";
import {
  Lock,
  ArrowLeft,
  ArrowRight,
  RotateCw,
  Search,
  Globe,
  Shield,
  RotateCcw,
  Zap,
  User,
  Briefcase,
  GraduationCap,
  Code2,
  FolderGit2,
  CornerDownLeft,
} from "lucide-react";

interface BrowserMockupProps {
  initialUrl?: string;
  currentUrl?: string;
  onNavigate?: (url: string) => void;
  onClearCache?: () => void;
  onInspectDiagram?: () => void;
  children?: React.ReactNode;
}

const DOMAIN = "yashwantpoyrekar.dev";

interface SearchSuggestion {
  path: string;
  title: string;
  description: string;
  category: "Section" | "Project";
  tags: string[];
}

const SEARCH_SUGGESTIONS: SearchSuggestion[] = [
  {
    path: "/about",
    title: "About Me",
    description: "Biography, personal background, CV resume & contact links",
    category: "Section",
    tags: [
      "bio",
      "about",
      "contact",
      "email",
      "social",
      "resume",
      "cv",
      "yashwant",
    ],
  },
  {
    path: "/experience",
    title: "Work Experience",
    description:
      "Full Stack Developer history, freelance & open-source projects",
    category: "Section",
    tags: ["experience", "jobs", "work", "history", "career", "freelance"],
  },
  {
    path: "/education",
    title: "Education",
    description: "B.Tech Computer Science degree from UIT University",
    category: "Section",
    tags: [
      "education",
      "college",
      "university",
      "degree",
      "academic",
      "btech",
      "uit",
    ],
  },
  {
    path: "/skills",
    title: "Technical Skills",
    description:
      "React, Node, Go, TypeScript, Redis, MongoDB, Docker, Tailwind",
    category: "Section",
    tags: [
      "skills",
      "tech",
      "languages",
      "tools",
      "stack",
      "go",
      "react",
      "typescript",
      "node",
      "docker",
    ],
  },
  {
    path: "/projects",
    title: "Featured Projects",
    description: "Browse all featured software applications & architecture",
    category: "Section",
    tags: ["projects", "apps", "code", "portfolio", "software"],
  },
  {
    path: "/projects/queuecast",
    title: "QueueCast",
    description: "Real-time podcast platform built with Go, Redis & WebSockets",
    category: "Project",
    tags: [
      "queuecast",
      "go",
      "golang",
      "redis",
      "websockets",
      "podcast",
      "streaming",
      "audio",
    ],
  },
  {
    path: "/projects/tic-tac-toe",
    title: "Tic Tac Toe AI",
    description: "Interactive multiplayer game with unbeatable Minimax AI",
    category: "Project",
    tags: ["tictactoe", "tic-tac-toe", "ai", "minimax", "game", "sockets"],
  },
  {
    path: "/projects/gossip-app",
    title: "Gossip App",
    description:
      "AI-powered real-time chat with instant multi-language translation",
    category: "Project",
    tags: [
      "gossip",
      "gossip-app",
      "chat",
      "ai",
      "translation",
      "socketio",
      "messaging",
    ],
  },
  {
    path: "/projects/todo-list",
    title: "Todo List Web App",
    description:
      "Full stack task management application built with MERN & TypeScript",
    category: "Project",
    tags: [
      "todo",
      "todo-list",
      "mern",
      "tasks",
      "react",
      "typescript",
      "express",
    ],
  },
];

export const BrowserMockup: React.FC<BrowserMockupProps> = ({
  initialUrl = "yashwantpoyrekar.dev/about",
  currentUrl,
  onNavigate,
  onClearCache,
  onInspectDiagram,
  children,
}) => {
  // Extract path from input string (e.g., "yashwantpoyrekar.dev/about" -> "/about")
  const extractPath = (fullUrl?: string) => {
    if (!fullUrl) return "/about";
    if (fullUrl.includes(DOMAIN)) {
      const idx = fullUrl.indexOf(DOMAIN);
      const afterDomain = fullUrl.substring(idx + DOMAIN.length);
      return afterDomain.startsWith("/") ? afterDomain : `/${afterDomain}`;
    }
    return fullUrl.startsWith("/") ? fullUrl : `/${fullUrl}`;
  };

  const [path, setPath] = useState<string>(
    extractPath(currentUrl || initialUrl),
  );
  const [showSuggestions, setShowSuggestions] = useState<boolean>(false);
  const [highlightedIndex, setHighlightedIndex] = useState<number>(-1);
  const searchContainerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (currentUrl) {
      setPath(extractPath(currentUrl));
    }
  }, [currentUrl]);

  // Click outside to dismiss suggestions dropdown
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        searchContainerRef.current &&
        !searchContainerRef.current.contains(event.target as Node)
      ) {
        setShowSuggestions(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const navigateTo = (targetPath: string) => {
    let formattedPath = targetPath.trim();
    if (!formattedPath.startsWith("/")) {
      formattedPath = `/${formattedPath}`;
    }
    setPath(formattedPath);
    setShowSuggestions(false);
    setHighlightedIndex(-1);

    const fullUrl = `${DOMAIN}${formattedPath}`;
    if (onNavigate) {
      onNavigate(fullUrl);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (highlightedIndex >= 0 && filteredSuggestions[highlightedIndex]) {
      navigateTo(filteredSuggestions[highlightedIndex].path);
    } else {
      navigateTo(path);
    }
  };

  // Filter suggestions based on query input
  const query = path.trim().toLowerCase().replace(/^\/+/, "");
  const filteredSuggestions = query
    ? SEARCH_SUGGESTIONS.filter((s) => {
        const cleanPath = s.path.toLowerCase().replace(/^\/+/, "");
        return (
          cleanPath.includes(query) ||
          s.title.toLowerCase().includes(query) ||
          s.description.toLowerCase().includes(query) ||
          s.tags.some((t) => t.toLowerCase().includes(query))
        );
      })
    : SEARCH_SUGGESTIONS;

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (!showSuggestions && (e.key === "ArrowDown" || e.key === "ArrowUp")) {
      setShowSuggestions(true);
      return;
    }

    if (e.key === "ArrowDown") {
      e.preventDefault();
      setHighlightedIndex((prev) =>
        prev < filteredSuggestions.length - 1 ? prev + 1 : 0,
      );
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setHighlightedIndex((prev) =>
        prev > 0 ? prev - 1 : filteredSuggestions.length - 1,
      );
    } else if (e.key === "Escape") {
      setShowSuggestions(false);
      setHighlightedIndex(-1);
    }
  };

  const getSuggestionIcon = (category: string, itemPath: string) => {
    if (category === "Project") {
      return <FolderGit2 className="w-3.5 h-3.5 text-amber-400" />;
    }
    if (itemPath === "/about")
      return <User className="w-3.5 h-3.5 text-sky-400" />;
    if (itemPath === "/experience")
      return <Briefcase className="w-3.5 h-3.5 text-blue-400" />;
    if (itemPath === "/education")
      return <GraduationCap className="w-3.5 h-3.5 text-emerald-400" />;
    if (itemPath === "/skills")
      return <Code2 className="w-3.5 h-3.5 text-purple-400" />;
    return <FolderGit2 className="w-3.5 h-3.5 text-sky-400" />;
  };

  return (
    <div className="w-full h-full bg-slate-950 text-slate-100 flex flex-col font-sans overflow-hidden">
      {/* Top Browser Navigation Toolbar */}
      <div className="flex flex-col md:flex-row items-center gap-2 sm:gap-3 px-3 sm:px-4 py-2 bg-slate-900 border-b border-slate-800/80">
        <div className="flex items-center justify-between w-full md:w-auto gap-2">
          {/* Back / Forward / Refresh controls */}
          <div className="flex items-center space-x-1 text-slate-400">
            <button className="p-1.5 hover:bg-slate-800 rounded-lg transition-colors text-slate-500 cursor-not-allowed">
              <ArrowLeft className="w-4 h-4" />
            </button>
            <button className="p-1.5 hover:bg-slate-800 rounded-lg transition-colors text-slate-500 cursor-not-allowed">
              <ArrowRight className="w-4 h-4" />
            </button>
            <button className="p-1.5 hover:bg-slate-800 rounded-lg text-slate-400 hover:text-white transition-colors">
              <RotateCw className="w-4 h-4" />
            </button>
          </div>

          {/* Mobile Security badge */}
          <div className="flex md:hidden items-center space-x-1 px-2 py-0.5 bg-emerald-500/10 border border-emerald-500/20 rounded-md text-emerald-400 text-[10px]">
            <Shield className="w-3 h-3" />
            <span className="font-mono">Secure</span>
          </div>
        </div>

        {/* Center Locked Domain + Editable Path Input Form + Suggestions Dropdown */}
        <div
          ref={searchContainerRef}
          className="relative w-full flex-1 max-w-2xl flex items-center justify-center"
        >
          <form onSubmit={handleSubmit} className="w-full flex items-center">
            <div className="relative w-full flex items-center bg-slate-950/90 border border-slate-800 focus-within:border-sky-500/80 rounded-xl px-2.5 sm:px-3 py-1 sm:py-1.5 shadow-inner transition-all font-mono">
              <Lock className="w-3.5 h-3.5 text-emerald-400 mr-1.5 sm:mr-2 shrink-0" />
              <span className="text-[11px] sm:text-xs text-emerald-400 select-none mr-1 hidden xs:inline shrink-0">
                https://
              </span>

              {/* Read-only locked domain label */}
              <span className="text-[11px] sm:text-xs text-slate-200 font-bold select-none shrink-0 bg-slate-900/80 px-1.5 py-0.5 rounded border border-slate-800 mr-1">
                {DOMAIN}
              </span>

              {/* Editable path input */}
              <input
                type="text"
                value={path}
                onChange={(e) => {
                  setPath(e.target.value);
                  setShowSuggestions(true);
                  setHighlightedIndex(-1);
                }}
                onFocus={() => setShowSuggestions(true)}
                onKeyDown={handleKeyDown}
                className="flex-1 min-w-0 bg-transparent text-[11px] sm:text-xs font-mono text-sky-400 font-semibold focus:outline-none tracking-wide"
                placeholder="/about, /skills, /projects..."
              />

              <button
                type="submit"
                aria-label="Navigate Path"
                className="ml-1.5 sm:ml-2 px-2.5 sm:px-3 py-1 bg-sky-600 hover:bg-sky-500 text-white rounded-lg text-xs font-medium flex items-center gap-1 transition-colors cursor-pointer shrink-0"
              >
                <Search className="w-3.5 h-3.5" />
                <span className="hidden xs:inline">Go</span>
              </button>
            </div>
          </form>

          {/* Autocomplete / Search Suggestions Dropdown */}
          {showSuggestions && (
            <div className="absolute top-full left-0 right-0 mt-1.5 max-h-80 overflow-y-auto no-scrollbar bg-slate-900/95 backdrop-blur-xl border border-slate-800 rounded-xl shadow-2xl z-50 divide-y divide-slate-800/60 animate-in fade-in slide-in-from-top-1 duration-150">
              <div className="px-3 py-1.5 text-[10px] uppercase tracking-wider font-semibold text-slate-500 bg-slate-950/70 flex items-center justify-between sticky top-0 backdrop-blur-md z-10 border-b border-slate-800/60">
                <span>Suggested Routes & Searches</span>
                <span className="text-[9px] text-slate-500 font-mono hidden sm:inline items-center gap-1">
                  <span>Use ↑↓ to navigate</span>
                  <span className="px-1 py-0.2 rounded bg-slate-800 border border-slate-700">
                    ↵ Enter
                  </span>
                </span>
              </div>

              {filteredSuggestions.length > 0 ? (
                filteredSuggestions.map((item, index) => {
                  const isSelected = index === highlightedIndex;
                  return (
                    <button
                      key={item.path}
                      type="button"
                      onMouseEnter={() => setHighlightedIndex(index)}
                      onClick={() => navigateTo(item.path)}
                      className={`w-full text-left px-3 py-2 flex items-center gap-2.5 transition-colors cursor-pointer ${
                        isSelected
                          ? "bg-sky-500/15 text-white border-l-2 border-sky-400 pl-2.5"
                          : "text-slate-300 hover:bg-slate-800/70"
                      }`}
                    >
                      <div className="shrink-0 p-1.5 rounded-lg bg-slate-800/80 border border-slate-700/60">
                        {getSuggestionIcon(item.category, item.path)}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2">
                          <span className="text-xs font-semibold text-slate-100 truncate">
                            {item.title}
                          </span>
                          <span className="text-[10px] font-mono px-1.5 py-0.2 rounded bg-sky-500/10 text-sky-400 border border-sky-500/20 shrink-0">
                            {item.path}
                          </span>
                          <span className="ml-auto text-[9px] uppercase font-bold text-slate-400 bg-slate-800 px-1.5 py-0.5 rounded border border-slate-700 shrink-0">
                            {item.category}
                          </span>
                        </div>
                        <p className="text-[11px] text-slate-400 truncate mt-0.5 font-sans">
                          {item.description}
                        </p>
                      </div>
                      <CornerDownLeft
                        className={`w-3.5 h-3.5 shrink-0 transition-opacity ${isSelected ? "opacity-100 text-sky-400" : "opacity-0"}`}
                      />
                    </button>
                  );
                })
              ) : (
                <div className="p-4 text-center">
                  <p className="text-xs text-slate-400">
                    No route matches{" "}
                    <span className="text-sky-400 font-mono font-semibold">
                      "{path}"
                    </span>
                  </p>
                  <p className="text-[11px] text-slate-400 mt-1">
                    Try searching for{" "}
                    <span className="text-slate-300 font-mono">about</span>,{" "}
                    <span className="text-slate-300 font-mono">skills</span>,{" "}
                    <span className="text-slate-300 font-mono">projects</span>,
                    or{" "}
                    <span className="text-slate-300 font-mono">queuecast</span>
                  </p>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Action Controls Beside URL Bar: Clear DNS Cache & Inspect Diagram */}
        <div className="flex items-center gap-2 w-full md:w-auto justify-end shrink-0">
          {onClearCache && (
            <button
              onClick={onClearCache}
              aria-label="Clear DNS Local Storage Cache"
              className="px-2.5 py-1 bg-slate-800 hover:bg-slate-700 text-[11px] sm:text-xs text-slate-300 rounded-lg border border-slate-700 flex items-center gap-1.5 transition-all cursor-pointer whitespace-nowrap"
              title="Clear Local DNS Cache"
            >
              <RotateCcw className="w-3.5 h-3.5 text-slate-400" />
              <span className="hidden sm:inline">Clear DNS Cache</span>
            </button>
          )}

          {onInspectDiagram && (
            <button
              onClick={onInspectDiagram}
              aria-label="Inspect ONE LARGE WORLD Architecture Diagram"
              className="px-2.5 py-1 bg-sky-600/30 hover:bg-sky-600/50 text-[11px] sm:text-xs text-sky-300 rounded-lg border border-sky-500/40 flex items-center gap-1.5 transition-all cursor-pointer whitespace-nowrap"
              title="Inspect Diagram Architecture"
            >
              <Zap className="w-3.5 h-3.5 text-sky-400" />
              <span className="hidden sm:inline">Inspect Diagram</span>
            </button>
          )}

          {/* Desktop Security badge */}
          <div className="hidden lg:flex items-center space-x-1 px-2 py-1 bg-emerald-500/10 border border-emerald-500/20 rounded-lg text-emerald-400 text-xs shrink-0">
            <Shield className="w-3.5 h-3.5" />
            <span className="font-mono text-[11px]">Secure</span>
          </div>
        </div>
      </div>

      {/* Main Viewport Window */}
      <div className="flex-1 w-full bg-slate-950 flex flex-col items-center justify-center relative overflow-hidden">
        {children || (
          <div className="text-center space-y-3 p-4">
            <div className="p-3 bg-sky-500/10 text-sky-400 rounded-2xl border border-sky-500/20 w-fit mx-auto animate-pulse">
              <Globe className="w-8 h-8" />
            </div>
            <h2 className="text-lg sm:text-xl font-bold text-white tracking-wide">
              Welcome to{" "}
              <span className="text-sky-400 font-mono">
                yashwantpoyrekar.dev
              </span>
            </h2>
            <p className="text-xs text-slate-400 max-w-sm">
              Browser frame ready for ONE LARGE WORLD architecture traversal.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default BrowserMockup;
