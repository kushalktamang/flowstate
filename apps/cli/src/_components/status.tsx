import { TextAttributes } from "@opentui/core";

 function Status() {
  return (
    <box flexDirection="row" gap={1}>
      <text fg="#7daea3">Build</text>
      <text attributes={TextAttributes.DIM} fg="gray">&#8250;</text>
      <text fg="#EB6F92">fabel-5.1</text>
    </box>
  )
}

export default Status;
