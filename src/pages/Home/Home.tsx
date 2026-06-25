import React from "react";
import HeroSection from "@/components/mycomponents/HomeComponents/HeroSection";
import SkillsSection from "@/components/mycomponents/HomeComponents/SkillsSection";
import ProjectsSection from "@/components/mycomponents/HomeComponents/ProjectsSection";
import ContactMeSection from "@/components/mycomponents/HomeComponents/ContectMeForm";
import AboutSection from "@/components/mycomponents/HomeComponents/AboutSection";
import ExperienceSection from "@/components/mycomponents/HomeComponents/ExperienceSection";
import EducationSection from "@/components/mycomponents/HomeComponents/EducationSection";

const Home: React.FC = () => {
  return (
    <div id="hero" className="lg:w-4/5 mx-auto">
      <HeroSection />
      <div id="about" className="h-10.25"></div>
      <AboutSection />
      <div id="experience" className="h-10.25" />
      <ExperienceSection />
      <div id="education" className="h-10.25" />
      <EducationSection />
      <div id="skills" className="h-5"></div>
      <SkillsSection />
      <div id="projects" className="h-10.25"></div>
      <ProjectsSection />
      <div id="contact"></div>
      <ContactMeSection />
    </div>
  );
};

export default Home;
