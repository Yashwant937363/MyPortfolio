export interface SocialLink {
  name: string;
  url: string;
  icon: string;
}

export interface AboutData {
  name: string;
  title: string;
  bio: string;
  cvUrl: string;
  socials: {
    email: string;
    linkedIn: string;
    gitHub: string;
    facebook: string;
    twitter: string;
  };
}

export interface ExperienceItem {
  id: string;
  role: string;
  company: string;
  location: string;
  period: string;
  description: string;
  achievements: string[];
  skillsUsed: string[];
}

export interface EducationItem {
  id: string;
  degree: string;
  institution: string;
  location: string;
  period: string;
  score?: string;
  details: string;
}

export interface SkillCategory {
  category: string;
  skills: { name: string; level: "beginner" | "intermediate" | "advanced" }[];
}

export interface ProjectDetail {
  slug: string;
  title: string;
  shortDescription: string;
  fullDescription: string;
  images: string[];
  techStack: string[];
  liveUrl: string;
  codeRepos: { label: string; url: string }[];
}

export const ABOUT_DATA: AboutData = {
  name: "Yashwant Poyrekar",
  title: "Full Stack Developer & AI Enthusiast",
  bio: "👋 Meet Yashwant Poyrekar — A passionate developer who loves turning ideas into real, working solutions. From building clean web interfaces to exploring the world of AI and distributed systems, Yashwant is always experimenting, learning, and creating. This portfolio is a glimpse into his world of code, creativity, and curiosity. Take a look around — you might just find someone you'd love to work with! 🚀",
  cvUrl:
    "https://drive.google.com/file/d/1WBCeK7zyFv100XUHBcULX-KNyz1fFv_y/view?usp=drive_link",
  socials: {
    email: "mailto:yashwantpoyrekar@gmail.com",
    linkedIn: "https://www.linkedin.com/in/yashwant-poyrekar-436538253/",
    gitHub: "https://github.com/Yashwant937363/",
    facebook: "https://www.facebook.com/yashwant.poyrekar.71",
    twitter: "https://x.com/Yash_chieftain",
  },
};

export const EXPERIENCE_DATA: ExperienceItem[] = [
  {
    id: "exp-1",
    role: "Full Stack Developer",
    company: "Freelance & Independent Projects",
    location: "Remote / India",
    period: "2023 - Present",
    description:
      "Engineered real-time web applications, AI-assisted chat software, microservices, and distributed collaborative platforms.",
    achievements: [
      "Built Gossip App featuring AI image captioning, translation, and real-time Socket.io chat.",
      "Developed QueueCast, a collaborative YouTube queueing platform powered by Go, Redis, and WebSockets.",
      "Designed and deployed responsive full-stack applications with React, Express, MongoDB, and Tailwind CSS.",
    ],
    skillsUsed: [
      "React",
      "Node.js",
      "Express",
      "Go",
      "Socket.io",
      "MongoDB",
      "Redis",
      "TypeScript",
    ],
  },
];

export const EDUCATION_DATA: EducationItem[] = [
  {
    id: "edu-1",
    degree: "Bachelor of Technology / Science in Computer Engineering",
    institution: "University Institute of Technology",
    location: "India",
    period: "2021 - 2025",
    details:
      "Focused on Data Structures, Algorithms, Computer Networks, Distributed Systems, Database Management, and Web Development.",
  },
];

export const SKILLS_DATA: SkillCategory[] = [
  {
    category: "Programming Languages",
    skills: [
      { name: "JavaScript", level: "intermediate" },
      { name: "Go", level: "intermediate" },
      { name: "TypeScript", level: "beginner" },
      { name: "Python", level: "beginner" },
      { name: "Java", level: "beginner" },
    ],
  },
  {
    category: "Frontend Development",
    skills: [
      { name: "React JS", level: "intermediate" },
      { name: "Redux", level: "intermediate" },
      { name: "Vite", level: "intermediate" },
      { name: "Tailwind CSS", level: "beginner" },
      { name: "Bootstrap", level: "beginner" },
      { name: "MUI", level: "beginner" },
    ],
  },
  {
    category: "Backend & Systems",
    skills: [
      { name: "Node JS", level: "intermediate" },
      { name: "Express JS", level: "intermediate" },
      { name: "Socket.io", level: "intermediate" },
      { name: "Go / Gin", level: "intermediate" },
      { name: "WebSocket", level: "intermediate" },
      { name: "JWT", level: "intermediate" },
      { name: "REST APIs", level: "intermediate" },
      { name: "FastAPI", level: "beginner" },
    ],
  },
  {
    category: "Databases & Storage",
    skills: [
      { name: "MongoDB", level: "intermediate" },
      { name: "MySQL", level: "beginner" },
      { name: "PostgreSQL", level: "beginner" },
      { name: "Redis", level: "beginner" },
      { name: "Firebase", level: "beginner" },
      { name: "Supabase", level: "beginner" },
    ],
  },
  {
    category: "Tools & Infrastructure",
    skills: [
      { name: "Git & GitHub", level: "intermediate" },
      { name: "Postman", level: "intermediate" },
      { name: "Docker", level: "beginner" },
      { name: "Linux Shell", level: "beginner" },
      { name: "Render", level: "beginner" },
      { name: "Nginx", level: "beginner" },
      { name: "Google OAuth", level: "beginner" },
      { name: "YouTube API", level: "beginner" },
    ],
  },
];

export const PROJECTS_DATA: ProjectDetail[] = [
  {
    slug: "todo-list",
    title: "Todo List",
    shortDescription:
      "Minimalist task management web app to add, track, and manage daily todos.",
    fullDescription:
      "A minimalist and intuitive web application to efficiently manage daily tasks. Users can add, track, and delete todos with ease, helping improve productivity and task organization with persistent database storage.",
    images: [
      "https://res.cloudinary.com/dppvlsjq1/image/upload/v1782397397/1_m5khrh.png",
      "https://res.cloudinary.com/dppvlsjq1/image/upload/v1782397401/2_pldx5e.png",
      "https://res.cloudinary.com/dppvlsjq1/image/upload/v1782397395/3_xiiuqf.png",
      "https://res.cloudinary.com/dppvlsjq1/image/upload/v1782397396/4_hl9yg4.png",
    ],
    techStack: [
      "React JS",
      "Express JS",
      "Node JS",
      "MongoDB",
      "Tailwind CSS",
      "TypeScript",
    ],
    liveUrl: "https://todo-list-by-yashwant.netlify.app/",
    codeRepos: [
      {
        label: "Frontend Repo",
        url: "https://github.com/Yashwant937363/To-Do_List",
      },
      {
        label: "Backend Repo",
        url: "https://github.com/Yashwant937363/To-Do_List_Backend",
      },
    ],
  },
  {
    slug: "tic-tac-toe",
    title: "Tic Tac Toe (AI / Minimax)",
    shortDescription:
      "Classic game with Minimax AI for single-player and Socket.io online multiplayer.",
    fullDescription:
      "A classic Tic Tac Toe game featuring multiplayer (online/offline) and AI single-player modes. Utilizes the Minimax algorithm to deliver an unbeatable single-player experience and Socket.io web sockets for real-time online matches.",
    images: [
      "https://res.cloudinary.com/dppvlsjq1/image/upload/v1782397402/1_eqzpnq.png",
      "https://res.cloudinary.com/dppvlsjq1/image/upload/v1782397400/2_f3lpjs.png",
      "https://res.cloudinary.com/dppvlsjq1/image/upload/v1782397400/3_fxagim.png",
      "https://res.cloudinary.com/dppvlsjq1/image/upload/v1782397401/4_dgstqz.png",
    ],
    techStack: [
      "React JS",
      "Express JS",
      "Node JS",
      "MongoDB",
      "Socket.io",
      "Minimax AI",
    ],
    liveUrl: "https://tictactoe-by-yashwant.netlify.app/",
    codeRepos: [
      {
        label: "Frontend Repo",
        url: "https://github.com/Yashwant937363/TicTacToe",
      },
      {
        label: "Backend Repo",
        url: "https://github.com/Yashwant937363/TicTacToe_Backend",
      },
    ],
  },
  {
    slug: "gossip-app",
    title: "Gossip App (AI Chat)",
    shortDescription:
      "Real-time chat platform with live translation, text summarization, and image description.",
    fullDescription:
      "An intelligent chat platform integrating real-time translation, text summarization, and image description features. Enhances user communication by breaking language barriers and providing intelligent assistant features in chat rooms.",
    images: [
      "https://res.cloudinary.com/dppvlsjq1/image/upload/v1782397396/1_e2lyti.png",
      "https://res.cloudinary.com/dppvlsjq1/image/upload/v1782397395/2_k0nrna.png",
      "https://res.cloudinary.com/dppvlsjq1/image/upload/v1782397396/3_ub23ab.png",
    ],
    techStack: [
      "React JS",
      "Express JS",
      "Node JS",
      "MongoDB",
      "Socket.io",
      "Firebase",
      "AI API",
    ],
    liveUrl: "https://gossip-app-dz7b.onrender.com/",
    codeRepos: [
      {
        label: "Frontend Repo",
        url: "https://github.com/Yashwant937363/Gossip_App",
      },
      {
        label: "Backend Repo",
        url: "https://github.com/Yashwant937363/Gossip_Backend",
      },
      {
        label: "AI Backend",
        url: "https://github.com/Yashwant937363/Gossip_AI_Backend",
      },
    ],
  },
  {
    slug: "queuecast",
    title: "QueueCast",
    shortDescription:
      "Real-time collaborative music platform with YouTube queueing and room voting.",
    fullDescription:
      "A real-time collaborative music platform where users can create or join rooms, queue songs from YouTube, vote on tracks, and listen together in sync. Features WebSocket-powered live updates and Go backend concurrency.",
    images: [
      "https://res.cloudinary.com/dppvlsjq1/image/upload/v1782399614/1_mlxjni.png",
      "https://res.cloudinary.com/dppvlsjq1/image/upload/v1782399614/2_g1dn0l.png",
      "https://res.cloudinary.com/dppvlsjq1/image/upload/v1782399616/3_lfxko7.png",
    ],
    techStack: [
      "Go",
      "React JS",
      "TypeScript",
      "Tailwind CSS",
      "Redux",
      "PostgreSQL",
      "Redis",
      "Docker",
    ],
    liveUrl: "https://queuecast-ani5.onrender.com/",
    codeRepos: [
      {
        label: "Repository",
        url: "https://github.com/Yashwant937363/QueueCast",
      },
    ],
  },
];
