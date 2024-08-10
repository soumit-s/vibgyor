"use client";

import { useState } from "react";
import { twMerge } from "tailwind-merge";
import DownArrowIcon from "@/components/svg/DownArrow2.svg";
import MenuItem, { Item } from "../menu-item";

interface Props {
  label: React.ReactNode;
  arrowed?: boolean;
  filled?: boolean;
  alignment?: "left" | "right";
  items?: Item[];
  onToggle?: (isOpen: boolean) => void;
}

const Menu = (props: React.PropsWithChildren<Props>) => {
  const [isOpen, setOpen] = useState(false);

  const handleToggle = () => {
    setOpen(!isOpen);
    props.onToggle && props.onToggle(!isOpen);
  };

  return (
    <div className="relative" onBlur={() => setOpen(false)}>
      <div
        className={twMerge(
          "hover:cursor-pointer h-full",
          props.arrowed && "flex items-center gap-2",
          props.filled && "bg-outline py-2 px-4 rounded-md"
        )}
        onClick={handleToggle}
      >
        {props.label}
        {props.arrowed && (
          <DownArrowIcon
            className={twMerge(
              "w-4 h-4 fill-foreground",
              isOpen && "rotate-180"
            )}
          />
        )}
      </div>

      {/** The body of the menu */}
      {isOpen && (
        <div
          className={twMerge(
            "bg-primary border border-outline rounded-lg absolute top-[calc(100%+1em)] shadow-md shadow-black/25 py-4",
            props.alignment === "left" ? "left-0" : "right-0"
          )}
        >
          {props.children}
          <table className="columns-2">
            <tbody>
              {props.items &&
                props.items.map((item) => <MenuItem item={item} />)}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default Menu;
