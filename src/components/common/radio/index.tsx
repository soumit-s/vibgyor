"use client";
import TickIcon from "@/components/svg/Tick1.svg";

type RadioState = "on" | "off" | "disabled";

interface Props {
  label?: string;
  state?: RadioState;
}

const Radio = (props: Props) => {
  return (
    <div className="flex items-center gap-4">
      <TickIcon className="w-4 h-4 stroke-foreground" />
      {props.label}
    </div>
  );
};

export default Radio;
