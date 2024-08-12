import EditorIcon from "@/components/svg/Markup1.svg";
import ExportIcon from "@/components/svg/Export1.svg";
import { twMerge } from "tailwind-merge";

interface Action {
  name: string;
  icon: React.ReactNode;
  shortcut?: string;
  onClick?: () => any;
}

const actions: Action[] = [
  {
    name: "Editor",
    shortcut: "Ctrl+E",
    icon: <EditorIcon className="w-6 h-6 stroke-foreground" />,
  },
  { name: "Export", icon: <ExportIcon className="w-6 h-6 fill-foreground" /> },
];

const GroundActionPanel = () => {
  return (
    <div
      className={twMerge(
        "border border-outline rounded-lg bg-primary flex gap-4 px-4"
      )}
    >
      {actions.map((a, idx) => (
        <button
          key={idx}
          onClick={a.onClick}
          className="group relative hover:bg-outline flex items-center justify-center"
        >
          {a.icon}
          <div className="absolute left-[110%] top-[110%] border border-outline bg-outline rounded px-2 py-2 opacity-0 hidden tracking-wider text-sm font-extralight group-hover:inline-block group-hover:opacity-100 transition-opacity w-max black-shadow">
            {a.name}
            {a.shortcut && (
              <span className="text-foreground-dimmed font-normal inline-block ml-2">
                {a.shortcut}
              </span>
            )}
          </div>
        </button>
      ))}
    </div>
  );
};

export default GroundActionPanel;
