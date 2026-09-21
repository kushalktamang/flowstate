import type { Command } from "./types";

const Commands: Command[] = [
  {
    name: "new",
    description: "start a new conversation",
    value: "/new",
  },
  {
    name: "agents",
    description: "switch agents",
    value: "/agents",
  },
  {
    name: "models",
    description: "select the AI model for generation",
    value: "/models",
  },
  {
    name: "sessions",
    description: "browse your past sessions",
    value: "/sessions",
  },
  {
    name: "theme",
    description: "change color theme",
    value: "/theme",
  },
  {
    name: "login",
    description: "sign in with your browser",
    value: "/login",
  },
  {
    name: "logout",
    description: "sign out of your account",
    value: "/logout",
  },
  {
    name: "upgrade",
    description: "buy more credits",
    value: "/upgrade",
  },
  {
    name: "usage",
    description: "open billing portal in your browser",
    value: "/usage",
  },
  {
    name: "exit",
    description: "quit the application",
    value: "/exit",
    action: (ctx) => {
      ctx.exit();
    },
  },
];

export { Commands };
