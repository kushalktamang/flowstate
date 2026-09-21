import { useMemo, useRef, useState } from "react";
import type { Command, UseCommandReturn } from "./types";
import { ScrollBoxRenderable } from "@opentui/core";
import getCommandsFiltered from "./filter";
import { useKeyboard } from "@opentui/react";

function useCommand(): UseCommandReturn {
  const [textValue, setTextValue] = useState("");
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [showCommand, setShowCommand] = useState(false);
  const scrollRef = useRef<ScrollBoxRenderable>(null);

  const commandQuery = showCommand && textValue.startsWith("/") ? textValue.slice(1) : "";

  const filteredCommands = useMemo(() => getCommandsFiltered(commandQuery), [commandQuery]);

  const handleContentChange = (text: string) => {
    setTextValue(text);
    setSelectedIndex(0);

    // Jump back to the top of the list when the user types a new character
    const scrollBox = scrollRef.current;
    if (scrollBox) {
      scrollBox.scrollTo(0);
    }

    const prefix = text.startsWith("/") ? text.slice(1) : null;
    if (prefix !== null && !prefix.includes(" ")) {
      setShowCommand(true);
    } else {
      setShowCommand(false);
    }
  };

  // Resolve a command at a specific index (returns the command and caller handles execution)
  const resolveCommand = (index: number): Command | undefined => {
    const command = filteredCommands[index];
    if (command) {
      setShowCommand(false);
    }
    return command;
  };

  // Using Arrow keys to move command selection
  // The list follows along when the highlight goes off screen
  useKeyboard((key) => {
    if (!showCommand) return;

    if (key.name === "escape") {
      key.preventDefault();
      setShowCommand(false);
    } else if (key.name === "up") {
      key.preventDefault();
      setSelectedIndex((i: number) => {
        const newIndex = Math.max(0, i - 1);
        // keep the highlighted item visible when arrows past the edge
        const sb = scrollRef.current;
        if (sb && newIndex < sb.scrollTop) {
          sb.scrollTo(newIndex);
        }
        return newIndex;
      });
    } else if (key.name === "down") {
      key.preventDefault();
      setSelectedIndex((i: number) => {
        if (filteredCommands.length === 0) {
          return 0;
        }

        const newIndex = Math.min(filteredCommands.length - 1, i + 1);
        const sb = scrollRef.current;
        if (sb) {
          const viewportHeight = sb.viewport.height;
          const visibleEnd = sb.scrollTop + viewportHeight - 1;
          if (newIndex > visibleEnd) {
            sb.scrollTo(newIndex - viewportHeight + 1);
          }
        }
        return newIndex;
      });
    }
  });

  return {
    showCommand,
    commandQuery,
    selectedIndex,
    scrollRef,
    handleContentChange,
    resolveCommand,
    setSelectedIndex,
  };
}

export default useCommand;
