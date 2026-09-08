import React from "react";
import { User, Mail, Linkedin, Github, Facebook, Twitter, FileText } from "lucide-react";
import { ABOUT_DATA } from "../../data/portfolioData";

export const AboutSection: React.FC = () => {
  return (
    <section id="about" className="space-y-4 pt-2 scroll-mt-24">
      <div className="bg-slate-900/60 rounded-2xl p-4 sm:p-6 border border-slate-800/80 space-y-4">
        <h2 className="text-sm sm:text-base font-bold text-slate-200 uppercase tracking-wider flex items-center gap-2">
          <User className="w-4 h-4 text-sky-400" /> About Me
        </h2>
        <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-sans">
          {ABOUT_DATA.bio}
        </p>

        {/* Social Links Sub-block */}
        <div className="pt-3 border-t border-slate-800/80 space-y-3">
          <h3 className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
            Connect & Social Links
          </h3>
          <div className="flex flex-wrap items-center gap-2.5">
            <a
              href={ABOUT_DATA.socials.email}
              aria-label="Email Yashwant Poyrekar"
              className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-xl text-xs flex items-center gap-2 border border-slate-700/80 transition-all"
            >
              <Mail className="w-3.5 h-3.5 text-sky-400" />
              <span>Email</span>
            </a>
            <a
              href={ABOUT_DATA.socials.linkedIn}
              target="_blank"
              rel="noreferrer"
              aria-label="LinkedIn Profile"
              className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-xl text-xs flex items-center gap-2 border border-slate-700/80 transition-all"
            >
              <Linkedin className="w-3.5 h-3.5 text-blue-400" />
              <span>LinkedIn</span>
            </a>
            <a
              href={ABOUT_DATA.socials.gitHub}
              target="_blank"
              rel="noreferrer"
              aria-label="GitHub Profile"
              className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-xl text-xs flex items-center gap-2 border border-slate-700/80 transition-all"
            >
              <Github className="w-3.5 h-3.5 text-slate-300" />
              <span>GitHub</span>
            </a>
            <a
              href={ABOUT_DATA.socials.facebook}
              target="_blank"
              rel="noreferrer"
              aria-label="Facebook Profile"
              className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-xl text-xs flex items-center gap-2 border border-slate-700/80 transition-all"
            >
              <Facebook className="w-3.5 h-3.5 text-blue-500" />
              <span>Facebook</span>
            </a>
            <a
              href={ABOUT_DATA.socials.twitter}
              target="_blank"
              rel="noreferrer"
              aria-label="Twitter Profile"
              className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-xl text-xs flex items-center gap-2 border border-slate-700/80 transition-all"
            >
              <Twitter className="w-3.5 h-3.5 text-sky-400" />
              <span>Twitter</span>
            </a>
            <a
              href={ABOUT_DATA.cvUrl}
              target="_blank"
              rel="noreferrer"
              aria-label="View CV Resume Document"
              className="px-3 py-1.5 bg-sky-600/20 hover:bg-sky-600/40 text-sky-300 rounded-xl text-xs font-semibold flex items-center gap-2 border border-sky-500/40 transition-all ml-auto"
            >
              <FileText className="w-3.5 h-3.5 text-sky-400" />
              <span>View CV Resume</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
