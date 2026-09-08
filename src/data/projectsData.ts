export interface Project {
  title: string;
  description: string;
  tech: string[];
  live: string;
  github: string;
}

export const PROJECTS: Project[] = [
  {
    title: "Todo List",
    description:
      "Minimalist task management web app to add, track, and manage daily todos.",
    tech: ["React", "Express", "Node", "MongoDB", "TypeScript"],
    live: "https://todo-list-by-yashwant.netlify.app/",
    github: "https://github.com/Yashwant937363/To-Do_List",
  },
  {
    title: "Tic Tac Toe (AI / Minimax)",
    description:
      "Classic game with Minimax AI for single-player and Socket.io online multiplayer.",
    tech: ["React", "Node", "Socket.io", "Minimax AI"],
    live: "https://tictactoe-by-yashwant.netlify.app/",
    github: "https://github.com/Yashwant937363/TicTacToe",
  },
  {
    title: "Gossip App (AI Chat)",
    description:
      "Real-time chat platform with live translation, text summarization, and image description.",
    tech: ["React", "Node", "Socket.io", "Firebase", "AI API"],
    live: "https://gossip-app-dz7b.onrender.com/",
    github: "https://github.com/Yashwant937363/Gossip_App",
  },
  {
    title: "QueueCast",
    description:
      "Real-time collaborative music platform with YouTube queueing and room voting.",
    tech: ["Go", "React", "TypeScript", "Redis", "Docker"],
    live: "#",
    github: "https://github.com/Yashwant937363/QueueCast",
  },
];
