import React from "react";
import renderIcon from "@/assets/render.svg";
import { motion } from "motion/react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";

type Level = "beginner" | "intermediate" | "advanced";

interface SkillsType {
  title: string;
  svgUrl: string;
  level: Level;
}

const programmingLanguages: SkillsType[] = [
  {
    title: "JavaScript",
    svgUrl:
      "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg",
    level: "intermediate",
  },
  {
    title: "TypeScript",
    svgUrl:
      "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg",
    level: "beginner",
  },
  {
    title: "Python",
    svgUrl:
      "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg",
    level: "beginner",
  },
  {
    title: "Java",
    svgUrl:
      "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/java/java-original.svg",
    level: "beginner",
  },
];
const frontendSkills: SkillsType[] = [
  {
    title: "React JS",
    svgUrl:
      "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg",
    level: "intermediate",
  },
  {
    title: "Redux",
    svgUrl:
      "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/redux/redux-original.svg",
    level: "intermediate",
  },
  {
    title: "Tailwind CSS",
    svgUrl:
      "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tailwindcss/tailwindcss-original.svg",

    level: "beginner",
  },
  {
    title: "Bootstrap",
    svgUrl:
      "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/bootstrap/bootstrap-original.svg",
    level: "beginner",
  },
  {
    title: "MUI",
    svgUrl:
      "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/materialui/materialui-original.svg",
    level: "beginner",
  },
];

const backendSkills: SkillsType[] = [
  {
    title: "Node JS",
    svgUrl:
      "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg",
    level: "intermediate",
  },
  {
    title: "Express JS",
    svgUrl:
      "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/express/express-original.svg",
    level: "intermediate",
  },
  {
    title: "FastAPI",
    svgUrl:
      "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/fastapi/fastapi-original.svg",
    level: "beginner",
  },
  {
    title: "Socket.io",
    svgUrl:
      "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/socketio/socketio-original.svg",
    level: "intermediate",
  },
];

const databaseSkills: SkillsType[] = [
  {
    title: "MongoDB",
    svgUrl:
      "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg",
    level: "intermediate",
  },
  {
    title: "MySQL",
    svgUrl:
      "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/mysql/mysql-original-wordmark.svg",
    level: "beginner",
  },
  {
    title: "Firebase",
    svgUrl:
      "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/firebase/firebase-original.svg",
    level: "beginner",
  },
  {
    title: "Supabase",
    svgUrl:
      "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/supabase/supabase-original.svg",
    level: "beginner",
  },
  {
    title: "Redis",
    svgUrl:
      "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/redis/redis-original.svg",
    level: "beginner",
  },
];

const tools: SkillsType[] = [
  {
    title: "Git",
    svgUrl:
      "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg",
    level: "intermediate",
  },
  {
    title: "GitHub",
    svgUrl:
      "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/github/github-original.svg",
    level: "beginner",
  },
  {
    title: "Docker",
    svgUrl:
      "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg",
    level: "beginner",
  },
  {
    title: "Render",
    svgUrl: renderIcon,
    level: "beginner",
  },
  {
    title: "Linux Shell",
    svgUrl:
      "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/linux/linux-original.svg",
    level: "beginner",
  },
];

interface skill {
  title: string;
  tech: SkillsType[];
}

const myskills: skill[] = [
  { title: "Programming Languages", tech: programmingLanguages },
  { title: "Frontend", tech: frontendSkills },
  { title: "Backend", tech: backendSkills },
  { title: "Databases", tech: databaseSkills },
  { title: "Tools", tech: tools },
];

const SkillsSection: React.FC = () => {
  return (
    <div className="p-5 md:p-10">
      <h3 className="scroll-m-20 text-2xl my-5 font-semibold tracking-tight">
        Skills
      </h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {myskills.map((skill, index) => (
          <SkillGrid key={index} title={skill.title} skills={skill.tech} />
        ))}
      </div>
    </div>
  );
};

export default SkillsSection;

interface SkillGridProps {
  skills: SkillsType[];
  title: string;
}
export const SkillGrid: React.FC<SkillGridProps> = ({ skills, title }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <Card className="bg-background shadow-md h-full">
        <CardHeader>
          <h4 className="text-xl font-semibold text-center">{title}</h4>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
            {skills.map((skill, idx) => (
              <div
                key={idx}
                className="flex flex-col items-center text-center group p-2 rounded-md transition duration-300 hover:bg-accent hover:ring hover:ring-accent/30"
              >
                <img
                  src={skill.svgUrl}
                  alt={skill.title}
                  style={{
                    filter: ["GitHub", "Express JS", "Socket.io"].includes(
                      skill.title
                    )
                      ? "invert(1)"
                      : "none",
                  }}
                  className="w-10 h-10 transition duration-300 group-hover:scale-105 group-hover:opacity-80"
                />
                <div className="mt-1">
                  <p className="text-sm font-medium text-foreground">
                    {skill.title}
                  </p>
                  {skill.level && (
                    <p className="text-xs text-muted-foreground">
                      {skill.level}
                    </p>
                  )}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};
