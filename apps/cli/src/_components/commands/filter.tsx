import { Commands } from "./commands";
import type { Command } from "./types";

function getCommandsFiltered(query: string): Command[] {
  if (query.length === 0) {
    return [...Commands];
  }
  const filteredCommands = Commands.filter((cmd) =>
    cmd.name.toLowerCase().startsWith(query.toLowerCase()),
  );
  return filteredCommands;
}

export default getCommandsFiltered;
