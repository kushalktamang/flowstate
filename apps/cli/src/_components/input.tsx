import type { TextareaRenderable, KeyBinding } from "@opentui/core";
import { EmptyBorder } from "./border";
import Status from "./status";
import { useCallback, useEffect, useRef } from "react";
import { useRenderer } from "@opentui/react";
import useCommand from "./commands/useCommand";
import type { Command } from "./commands/types";
import CommandMenu from "./commands";

type Props = {
  onSubmit: (text: string) => void;
  disabled?: boolean;
};

const TEXTAREA_KEY_BINDINGS: KeyBinding[] = [
  { name: "return", action: "submit" },
  { name: "enter", action: "submit" },
  { name: "return", shift: true, action: "newline" },
  { name: "enter", shift: true, action: "newline" },
];

function Input({ onSubmit, disabled = false }: Props) {
  const textareaRef = useRef<TextareaRenderable>(null);
  const onSubmitRef = useRef<() => void>(() => {});
  const renderer = useRenderer();
  const {
    showCommand,
    commandQuery,
    selectedIndex,
    scrollRef,
    handleContentChange,
    resolveCommand,
    setSelectedIndex,
  } = useCommand();

  // Tracking value of the textarea
  const handleTextareaContentChange = useCallback(() => {
    const textarea = textareaRef.current;
    if (!textarea) return;
    handleContentChange(textarea.plainText);
  }, []);

  const handleOnSubmit = useCallback(() => {
    if (disabled) return;

    const textarea = textareaRef.current;
    if (!textarea) return;

    const text = textarea.plainText.trim();
    if (text.length === 0) return;

    onSubmit(text);
    textarea.setText("");
  }, [disabled, onSubmit]);

  const handleCommand = useCallback(
    (command: Command | undefined) => {
      const textarea = textareaRef.current;
      if (!textarea || !command) return;

      textarea.setText("");

      if (command.action) {
        command.action({
          exit: () => renderer.destroy(),
        });
      } else {
        textarea.insertText(command.value + " ");
      }
    },
    [renderer],
  );

  const handleCommandExecute = useCallback(
    (index: number) => {
      const command = resolveCommand(index);
      handleCommand(command);
    },
    [resolveCommand, handleCommand],
  );

  // Wire up the textarea  submit handler once so it always reads the latest state.
  useEffect(() => {
    const textarea = textareaRef.current;
    if (!textarea) return;
    textarea.onSubmit = () => {
      onSubmitRef.current();
    };
  }, []);

  onSubmitRef.current = () => {
    if (disabled) return;

    if (showCommand) {
      const command = resolveCommand(selectedIndex);
      handleCommand(command);
      return;
    }

    handleOnSubmit();
  };

  return (
    <box width="100%" alignItems="center">
      <box
        width="100%"
        border={["left"]}
        borderColor="#7daea3"
        customBorderChars={{
          ...EmptyBorder,
          vertical: "┃",
          bottomLeft: "╹",
        }}
      >
        <box
          position="relative"
          justifyContent="center"
          paddingX={2}
          paddingY={1}
          width="100%"
          gap={1}
          backgroundColor="#1A1A24"
        >
          {showCommand && (
            <box
              position="absolute"
              bottom="100%"
              left={0}
              width="100%"
              backgroundColor="#1a1a24"
              zIndex={10}
            >
              <CommandMenu
                query={commandQuery}
                selectedIndex={selectedIndex}
                scrollRef={scrollRef}
                onSelect={setSelectedIndex}
                onExecute={handleCommandExecute}
              />
            </box>
          )}
          <textarea
            ref={textareaRef}
            onContentChange={handleTextareaContentChange}
            cursorColor="#7daea3"
            cursorStyle={{ style: "line", blinking: true }}
            focused={!disabled}
            keyBindings={TEXTAREA_KEY_BINDINGS}
            placeholder={`...fix a bug in the database`}
          />
          <Status />
        </box>
      </box>
    </box>
  );
}

export default Input;
