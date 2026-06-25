import React from "react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";

import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

import { motion } from "motion/react";

import type { ProjectData } from "@/types/ProjectData";
import ProjectDialog from "./ProjectDialog";

const IconUrls = {
  javascript: {
    name: "JavaScript",
    iconUrl:
      "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg",
  },
  typescript: {
    name: "TypeScript",
    iconUrl:
      "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg",
  },
  python: {
    name: "Python",
    iconUrl:
      "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg",
  },
  java: {
    name: "Java",
    iconUrl:
      "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/java/java-original.svg",
  },
  reactjs: {
    name: "React JS",
    iconUrl:
      "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg",
  },
  redux: {
    name: "Redux",
    iconUrl:
      "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/redux/redux-original.svg",
  },
  tailwindcss: {
    name: "Tailwind CSS",
    iconUrl:
      "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tailwindcss/tailwindcss-original.svg",
  },
  bootstrap: {
    name: "Bootstrap",
    iconUrl:
      "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/bootstrap/bootstrap-original.svg",
  },
  mui: {
    name: "MUI",
    iconUrl:
      "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/materialui/materialui-original.svg",
  },
  nodejs: {
    name: "Node JS",
    iconUrl:
      "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg",
  },
  expressjs: {
    name: "Express JS",
    iconUrl:
      "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/express/express-original.svg",
  },
  fastapi: {
    name: "FastAPI",
    iconUrl:
      "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/fastapi/fastapi-original.svg",
  },
  socketio: {
    name: "Socket.io",
    iconUrl:
      "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/socketio/socketio-original.svg",
  },
  mongodb: {
    name: "MongoDB",
    iconUrl:
      "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg",
  },
  mysql: {
    name: "MySQL",
    iconUrl:
      "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/mysql/mysql-original-wordmark.svg",
  },
  firebase: {
    name: "Firebase",
    iconUrl:
      "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/firebase/firebase-original.svg",
  },
  supabase: {
    name: "Supabase",
    iconUrl:
      "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/supabase/supabase-original.svg",
  },
  redis: {
    name: "Redis",
    iconUrl:
      "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/redis/redis-original.svg",
  },
  go: {
    name: "Go",
    iconUrl:
      "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/go/go-original.svg",
  },

  postgresql: {
    name: "PostgreSQL",
    iconUrl:
      "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg",
  },

  docker: {
    name: "Docker",
    iconUrl:
      "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg",
  },

  git: {
    name: "Git",
    iconUrl:
      "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg",
  },

  github: {
    name: "GitHub",
    iconUrl:
      "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/github/github-original.svg",
  },

  linux: {
    name: "Linux",
    iconUrl:
      "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/linux/linux-original.svg",
  },
};

const projectData: ProjectData[] = [
  {
    name: "Todo List",
    description:
      "A minimalist and intuitive web application to efficiently manage daily tasks. Users can add, track, and delete todos with ease, helping improve productivity and task organization.",
    images: [
      "https://res.cloudinary.com/dppvlsjq1/image/upload/v1782397397/1_m5khrh.png",
      "https://res.cloudinary.com/dppvlsjq1/image/upload/v1782397401/2_pldx5e.png",
      "https://res.cloudinary.com/dppvlsjq1/image/upload/v1782397395/3_xiiuqf.png",
      "https://res.cloudinary.com/dppvlsjq1/image/upload/v1782397396/4_hl9yg4.png",
    ],
    techstack: [
      IconUrls.reactjs,
      IconUrls.expressjs,
      IconUrls.nodejs,
      IconUrls.mongodb,
      IconUrls.tailwindcss,
      IconUrls.typescript,
    ],
    projectUrl: "https://todo-list-by-yashwant.netlify.app/",
    projectCodeUrl: [
      {
        title: "Frontend",
        url: "https://github.com/Yashwant937363/To-Do_List",
      },
      {
        title: "Backend",
        url: "https://github.com/Yashwant937363/To-Do_List_Backend",
      },
    ],
  },
  {
    name: "Tic Tac Toe",
    description:
      "A classic Tic Tac Toe game featuring multiplayer (online/offline) and AI single-player modes. Utilizes the Minimax algorithm to deliver a challenging experience by making optimal moves, simulating real competitive play.",
    images: [
      "https://res.cloudinary.com/dppvlsjq1/image/upload/v1782397402/1_eqzpnq.png",
      "https://res.cloudinary.com/dppvlsjq1/image/upload/v1782397400/2_f3lpjs.png",
      "https://res.cloudinary.com/dppvlsjq1/image/upload/v1782397400/3_fxagim.png",
      "https://res.cloudinary.com/dppvlsjq1/image/upload/v1782397401/4_dgstqz.png",
    ],
    techstack: [
      IconUrls.reactjs,
      IconUrls.expressjs,
      IconUrls.nodejs,
      IconUrls.mongodb,
      IconUrls.socketio,
    ],
    projectUrl: "https://tictactoe-by-yashwant.netlify.app/",
    projectCodeUrl: [
      {
        title: "Frontend",
        url: "https://github.com/Yashwant937363/TicTacToe",
      },
      {
        title: "Backend",
        url: "https://github.com/Yashwant937363/TicTacToe_Backend",
      },
    ],
  },
  {
    name: "Gossip App - AI-Powered Chat Application",
    description:
      "An intelligent chat platform integrating real-time translation, text summarization, and image description features. Enhances user communication by breaking language barriers and providing contextual insights, all powered by AI.",
    images: [
      "https://res.cloudinary.com/dppvlsjq1/image/upload/v1782397396/1_e2lyti.png",
      "https://res.cloudinary.com/dppvlsjq1/image/upload/v1782397395/2_k0nrna.png",
      "https://res.cloudinary.com/dppvlsjq1/image/upload/v1782397396/3_ub23ab.png",
    ],
    techstack: [
      IconUrls.reactjs,
      IconUrls.expressjs,
      IconUrls.nodejs,
      IconUrls.mongodb,
      IconUrls.socketio,
      IconUrls.firebase,
    ],
    projectUrl: "https://gossip-app-dz7b.onrender.com/",
    projectCodeUrl: [
      {
        title: "Frontend",
        url: "https://github.com/Yashwant937363/Gossip_App",
      },
      {
        title: "Backend",
        url: "https://github.com/Yashwant937363/Gossip_Backend",
      },
      {
        title: "AI Backend",
        url: "https://github.com/Yashwant937363/Gossip_AI_Backend",
      },
    ],
  },
  {
    name: "QueueCast - Collaborative Music Listening Platform",
    description:
      "A real-time collaborative music platform where users can create or join rooms, queue songs from YouTube, vote on tracks, and listen together in sync. Features WebSocket-powered live updates, Redis Pub/Sub for event broadcasting, Google OAuth authentication, anonymous room joining, synchronized playback between host and listeners, and a dynamic song queue system.",
    images: [
      "https://res.cloudinary.com/dppvlsjq1/image/upload/v1782399614/1_mlxjni.png",
      "https://res.cloudinary.com/dppvlsjq1/image/upload/v1782399614/2_g1dn0l.png",
      "https://res.cloudinary.com/dppvlsjq1/image/upload/v1782399616/3_lfxko7.png",
    ],
    techstack: [
      IconUrls.reactjs,
      IconUrls.typescript,
      IconUrls.tailwindcss,
      IconUrls.redux,
      IconUrls.go,
      IconUrls.postgresql,
      IconUrls.redis,
      IconUrls.docker,
    ],
    projectUrl: "https://YOUR_QUEUECAST_URL",
    projectCodeUrl: [
      {
        title: "Repository",
        url: "https://github.com/Yashwant937363/QueueCast",
      },
    ],
  },
];

const ProjectsSection: React.FC = () => {
  return (
    <div className="p-5 md:p-10">
      <h3 className="scroll-m-20 text-2xl font-semibold tracking-tight mb-5">
        Projects
      </h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 ">
        {projectData.map((project, index) => (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.1 * index }}
            key={index}
          >
            <Card className="h-full">
              <CardHeader className="px-4 xs:px-6">
                <h4 className="scroll-m-20 text-xl font-semibold tracking-tight">
                  {project.name}
                </h4>
              </CardHeader>
              <CardContent className="px-4 xs:px-6">
                <img src={project.images[0]} className="rounded-sm" />
                <p className="font-extralight mt-4">{project.description}</p>
              </CardContent>
              <CardFooter className="items-start flex-col space-y-3 px-4 xs:px-6">
                <div className="flex space-x-2">
                  {project.techstack.map((icon, iconIndex) => (
                    <Tooltip key={iconIndex}>
                      <TooltipTrigger asChild>
                        <div className="border-muted border rounded-full p-1 hover:bg-accent hover:ring hover:ring-accent/30">
                          <img
                            src={icon.iconUrl}
                            style={{
                              filter: [
                                "GitHub",
                                "Express JS",
                                "Socket.io",
                              ].includes(icon.name)
                                ? "invert(1)"
                                : "none",
                            }}
                            className="size-7  rounded-full"
                          />
                        </div>
                      </TooltipTrigger>
                      <TooltipContent>{icon.name}</TooltipContent>
                    </Tooltip>
                  ))}
                </div>
                <ProjectDialog project={project} />
              </CardFooter>
            </Card>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default ProjectsSection;
