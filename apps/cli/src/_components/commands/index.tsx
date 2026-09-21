import { TextAttributes } from "@opentui/core";
import { Commands } from "./commands";
import getCommandsFiltered from "./filter";
import type { CommandMenuProps } from "./types";

const MAX_VISIBLE_ITEMS = 8;

// Align all description in equal horizontal position
const COMMAND_COL_WIDTH = Math.max(...Commands.map((cmd) => cmd.name.length)) + 4;

// Command Menu
function CommandMenu({ query, selectedIndex, scrollRef, onSelect, onExecute }: CommandMenuProps) {
  const filteredCommands = getCommandsFiltered(query);

  const visibleHeight = Math.min(filteredCommands.length, MAX_VISIBLE_ITEMS);

  if (filteredCommands.length === 0) {
    return (
      <box paddingX={1}>
        <text attributes={TextAttributes.DIM}>no matching commands</text>
      </box>
    );
  }

  return (
    <scrollbox ref={scrollRef} height={visibleHeight} verticalScrollbarOptions={{ visible: false }}>
      {filteredCommands.map((cmd, i) => {
        const isSelected = i === selectedIndex;

        return (
          <box
            key={cmd.value}
            flexDirection="row"
            paddingX={1}
            height={1}
            overflow="hidden"
            backgroundColor={isSelected ? "#7daea3" : undefined}
            onMouseMove={() => onSelect(i)}
            onMouseDown={() => onExecute(i)}
          >
            {/* Name */}
            <box width={COMMAND_COL_WIDTH} flexShrink={0}>
              <text selectable={false} fg={isSelected ? "black" : "white"}>
                /{cmd.name}
              </text>
            </box>
            {/* Description */}
            <box flexShrink={1} flexGrow={1} overflow="hidden">
              <text selectable={false} fg={isSelected ? "black" : "gray"}>
                {cmd.description}
              </text>
            </box>
          </box>
        );
      })}
    </scrollbox>
  );
}

export default CommandMenu;
