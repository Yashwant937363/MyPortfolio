import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "motion/react";
import myimage from "@/assets/myimage.png";
import gmailsvg from "@/assets/gmail.svg";
import { useUIState } from "@/context/UiState";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface socialUrl {
  name: string;
  url: string;
  iconUrl: string;
}
const socialUrls: socialUrl[] = [
  {
    name: "Email",
    url: "mailto:yashwantpoyrekar@gmail.com",
    iconUrl: gmailsvg,
  },
  {
    name: "LinkedIn",
    iconUrl:
      "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/linkedin/linkedin-original.svg",
    url: "https://www.linkedin.com/in/yashwant-poyrekar-436538253/",
  },
  {
    name: "GitHub",
    url: "https://github.com/Yashwant937363/",
    iconUrl:
      "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/github/github-original.svg",
  },
  {
    name: "Facebook",
    url: "https://www.facebook.com/yashwant.poyrekar.71",
    iconUrl:
      "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/facebook/facebook-original.svg",
  },
  {
    name: "Twitter",
    url: "https://x.com/Yash_chieftain",
    iconUrl:
      "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/twitter/twitter-original.svg",
  },
];

const HeroSection: React.FC = () => {
  const [string, setString] = useState("");
  const [isHover, setHover] = useState(false);
  const ref = useRef(null);
  const isInView = useInView(ref, { amount: 0.1 });
  const { setHeroInView } = useUIState();
  useEffect(() => {
    setHeroInView(isInView);
  }, [isInView]);
  useEffect(() => {
    let showString = "a Fullstack Developer";
    showString
      .split("")
      .forEach((char, index) =>
        setTimeout(() => setString((prev) => prev + char), 100 * index)
      );
  }, []);

  return (
    <div ref={ref} className="grid grid-cols-1 gap-2 xs:grid-cols-2 py-10 ">
      <div className="text-2xl p-5 md:p-10 flex justify-center flex-col  ">
        <h2 className="scroll-m-20 pb-2 text-3xl font-semibold tracking-tight first:mt-0">
          Hello, I am Yashwant.
        </h2>
        <h2 className="scroll-m-20 pb-2 text-3xl font-semibold tracking-tight first:mt-0 text-blue-300 dark:text-blue-400">
          {string}
        </h2>
        <div className="flex space-x-2">
          {socialUrls.map((socialUrl, index) => (
            <Tooltip key={index}>
              <TooltipTrigger asChild>
                <div
                  onClick={() =>
                    window.open(socialUrl.url, "_blank", "noopener, noreferrer")
                  }
                  className="border-muted border-1 rounded-full p-2 hover:bg-accent hover:ring hover:ring-accent/30"
                >
                  <img
                    src={socialUrl.iconUrl}
                    style={{
                      filter: ["GitHub", "Twitter"].includes(socialUrl.name)
                        ? "invert(1)"
                        : "none",
                    }}
                    className="size-7 p-1"
                  />
                </div>
              </TooltipTrigger>
              <TooltipContent>{socialUrl.name}</TooltipContent>
            </Tooltip>
          ))}
        </div>
      </div>
      <div
        className="relative z-0 p-10 "
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
      >
        {isInView && (
          <motion.img
            layoutId="hero-image"
            src={myimage}
            className="absolute top-0 left-0 z-10 size-full p-10 "
          />
        )}
        <motion.svg
          className="size-full z-0 text-blue-400 "
          viewBox="0 0 100 100"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          stroke="currentColor"
          strokeWidth={2}
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <defs>
            <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
              <feGaussianBlur
                in="SourceGraphic"
                stdDeviation="3"
                result="blur"
              />
              <feMerge>
                <feMergeNode in="blur" />
                {isHover && <feMergeNode in="blur" />}
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>

          <motion.circle
            cx="50"
            cy="60"
            r="40"
            filter="url(#glow)"
            transform="rotate(45, 50, 60)"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 1 }}
          />
        </motion.svg>
      </div>
    </div>
  );
};

export default HeroSection;
