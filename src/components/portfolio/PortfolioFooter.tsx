import React from "react";
import { Github, Linkedin, Mail, FileText, Twitter } from "lucide-react";

export const PortfolioFooter: React.FC = () => {
  return (
    <footer className="pt-3 border-t border-slate-800/80 flex flex-wrap items-center justify-between gap-3 text-xs text-slate-400">
      <div className="flex items-center space-x-3">
        <a
          href="https://github.com/Yashwant937363/"
          target="_blank"
          rel="noreferrer"
          aria-label="GitHub Profile"
          className="flex items-center gap-1 hover:text-white transition-colors"
        >
          <Github className="w-3.5 h-3.5" /> GitHub
        </a>
        <a
          href="https://www.linkedin.com/in/yashwant-poyrekar-436538253/"
          target="_blank"
          rel="noreferrer"
          aria-label="LinkedIn Profile"
          className="flex items-center gap-1 hover:text-white transition-colors"
        >
          <Linkedin className="w-3.5 h-3.5" /> LinkedIn
        </a>
        <a
          href="mailto:yashwantpoyrekar@gmail.com"
          aria-label="Email Yashwant Poyrekar"
          className="flex items-center gap-1 hover:text-white transition-colors"
        >
          <Mail className="w-3.5 h-3.5" /> Email
        </a>
        <a
          href="https://x.com/Yash_chieftain"
          target="_blank"
          rel="noreferrer"
          aria-label="Twitter Profile"
          className="flex items-center gap-1 hover:text-white transition-colors"
        >
          <Twitter className="w-3.5 h-3.5" /> Twitter
        </a>
      </div>

      <a
        href="https://drive.google.com/file/d/1WBCeK7zyFv100XUHBcULX-KNyz1fFv_y/view?usp=drive_link"
        target="_blank"
        rel="noreferrer"
        aria-label="View CV Resume Document"
        className="px-2.5 py-1 bg-sky-600/20 hover:bg-sky-600/40 border border-sky-500/40 text-sky-300 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-all"
      >
        <FileText className="w-3.5 h-3.5" /> View CV
      </a>
    </footer>
  );
};

export default PortfolioFooter;
