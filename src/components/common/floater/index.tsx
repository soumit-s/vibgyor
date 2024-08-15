"use client";
import { useEffect, useState } from "react";
import CrossIcon from "@/components/svg/Cross1.svg";

interface Props {
  title?: string;
  trigger: React.ReactNode;
  floater: React.ReactNode;
}

const Floater = ({ title, trigger, floater }: Props) => {
  const [active, setActive] = useState(false);
  return (
    <div className="relative z-10">
      <div onClick={() => setActive(true)}>{trigger}</div>
      {active && (
        <div className="bg-primary border border-outline rounded-lg absolute top-[calc(100%+1em)] black-shadow">
          <nav className="p-1 border-b border-outline flex items-center">
            <span className="grow pl-2 font-common font-light text-sm tracking-wide">{title}</span>
            <button
              onClick={() => setActive(false)}
              className="hover:bg-outline rounded p-2"
            >
              <CrossIcon className="w-4 h-4 stroke-foreground" />
            </button>
          </nav>
          {floater}
        </div>
      )}
    </div>
  );
};

export default Floater;
