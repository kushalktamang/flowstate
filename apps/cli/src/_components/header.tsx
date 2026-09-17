import { TextAttributes } from "@opentui/core";

function Header() {
  return (
    <box alignItems="center" justifyContent="center">
      <box justifyContent="center" alignItems="center" gap={0.5} flexDirection="row">
        <ascii-font font="tiny" text="flow"  />
        <ascii-font font="tiny" text="state" color="gray"/>

      </box>
        <text attributes={TextAttributes.DIM} fg="gray">Deep, effortless, focused immersion.</text>
    </box>
  )
}

export default Header;
