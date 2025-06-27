import React from "react";
import HeroSection from "@/components/mycomponents/HomeComponents/HeroSection";
import SkillsSection from "@/components/mycomponents/HomeComponents/SkillsSection";
import ProjectsSection from "@/components/mycomponents/HomeComponents/ProjectsSection";
import ContactMeSection from "@/components/mycomponents/HomeComponents/ContectMeForm";
import AboutSection from "@/components/mycomponents/HomeComponents/AboutSection";

const Home: React.FC = () => {
  return (
    <div id="hero" className="lg:w-4/5 mx-auto">
      <HeroSection />
      <div id="about" className="h-[41px]"></div>
      <AboutSection />
      <div id="skills" className="h-[20px]"></div>
      <SkillsSection />
      <div id="projects" className="h-[41px]"></div>
      <ProjectsSection />
      <div id="contact"></div>
      <ContactMeSection />
    </div>
  );
};

export default Home;
