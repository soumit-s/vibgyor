import Button from "@/components/common/button";
import LogoMenu from "./LogoMenu";
import DashboardIcon from "@/components/svg/Dashboard1.svg";
import DiagramNameChanger from "./DiagramNameChanger";
import GroundActionPanel from "../action-panel";

interface Props {
  diagramId: string;
}

const NavigationBar = (props: Props) => (
  <nav className="rounded-lg flex items-center justify-between relative pt-4 px-8">
    <div className="flex gap-8">
      <LogoMenu />
      <GroundActionPanel />
    </div>
    <div className="absolute top-0 left-0 right-0 h-2 flex justify-center items-start bg-secondary">
      <span className="py-2 px-4 rounded-b outline-2 outline outline-secondary font-handwriting black-shadow bg-secondary relative z-[99999]">
        <DiagramNameChanger id={props.diagramId} />
      </span>
    </div>
    <div className="flex items-center gap-8 font-handwriting">
      <a className="flex items-center gap-4 hover:cursor-pointer hover:bg-outline p-2 rounded-md" href="/dashboard">
        <DashboardIcon className="w-6 h-6 fill-foreground" /> Dashboard
      </a>
      <Button
        variant="filled"
        className="uppercase font-handwriting black-shadow"
      >
        sign in
      </Button>
    </div>
  </nav>
);

export default NavigationBar;
