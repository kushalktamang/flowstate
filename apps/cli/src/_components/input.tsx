import { t, type KeyBinding } from "@opentui/core";
import { EmptyBorder } from "./border";
import Status from "./status";

type Props = {
  onSubmit: (text: string) => void;
  disabled?: boolean;
}

const TEXTAREA_KEY_BINDINGS: KeyBinding[] = [
  { name: "return", action: "submit" },
  {name: "enter", action: "submit"},
  {name: "return",shift: true, action: "newline"},
  {name: "enter",shift: true,  action: "newline"},
]

function Input({onSubmit, disabled = false}: Props) {
  return (
    <box width="100%" alignItems="center">
      <box
        width="100%"
        border={["left"]}
        borderColor="#7daea3"
        customBorderChars={{
          ...EmptyBorder,
          vertical: "┃",
          bottomLeft: "╹"
        }}
      >
        <box position="relative" justifyContent="center" paddingX={2} paddingY={1} width="100%" gap={1} backgroundColor="#1A1A24">
          <textarea
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
  )
}

export default Input;
