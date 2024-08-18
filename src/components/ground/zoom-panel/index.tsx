"use client";
import PlusIcon from "@/components/svg/Plus1.svg";
import MinusIcon from "@/components/svg/Minus1.svg";
import { twMerge } from "tailwind-merge";

interface ZoomPanelProps {
  onZoomIn(): void;
  onZoomOut(): void;
  className?: string;
}

const ZoomPanel = ({
  onZoomIn,
  onZoomOut,
  className,
}: ZoomPanelProps) => (
  <div
    className={twMerge("rounded-md border-outline border bg-primary flex items-center", className)}
  >
    <button className="border-r border-outline p-2 hover:bg-outline" onClick={onZoomIn}>
      <PlusIcon className="w-6 h-6 stroke-foreground" />
    </button>
    <button className="p-2 hover:bg-outline" onClick={onZoomOut}>
      <MinusIcon className="w-6 h-6 stroke-foreground" />
    </button>
  </div>
);

export default ZoomPanel;
