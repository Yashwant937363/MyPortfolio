// components/About.tsx
import { Separator } from "@/components/ui/separator";
import cv from "@/assets/cv.svg";
import { Button } from "@/components/ui/button";

const CVURL = import.meta.env.VITE_CV_URL;

const AboutSection = () => {
  return (
    <div className="p-5 md:p-10">
      <h3 className="scroll-m-20 text-2xl font-semibold tracking-tight mb-5">
        About me
      </h3>
      <div className="flex flex-col-reverse xs:flex-row">
        <div className="my-3 xs:my-10 mx-4 flex flex-col items-center justify-center space-y-4">
          <img
            src={cv}
            className="text-white w-[510px] h-[210px] opacity-80 object-contain "
          />
          <Button
            onClick={() => window.open(CVURL, "_blank", "noopener, noreferrer")}
          >
            Download CV
          </Button>
        </div>

        <section className="max-w-3xl mx-auto my-10 px-4">
          <h4 className="scroll-m-20 text-xl font-semibold tracking-tight my-4">
            👋 Meet Yashwant Poyrekar
          </h4>
          <p>
            A passionate developer who loves turning ideas into real, working
            solutions. From building clean web interfaces to exploring the world
            of AI, Yashwant is always experimenting, learning, and creating.
          </p>
          <Separator className="my-3" />
          <p>
            This portfolio is a glimpse into his world of code, creativity, and
            curiosity. Take a look around — you might just find someone you'd
            love to work with! 🚀
          </p>
          <p className="text-right text-sm text-muted-foreground mt-6">
            — Chatgpt
          </p>
        </section>
      </div>
    </div>
  );
};

export default AboutSection;
