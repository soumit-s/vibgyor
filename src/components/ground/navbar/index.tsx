import Button from "@/components/common/button";
import LogoMenu from "./LogoMenu";
import ButtonLink from "@/components/common/button-link";
import DashboardIcon from "@/components/svg/Dashboard1.svg";

interface Props {
  projectName: string;
}

const NavigationBar = (props: Props) => (
  <nav className="rounded-lg flex items-center justify-between relative pt-4 p-2">
    <LogoMenu />
    <div className="absolute top-0 left-0 right-0 bottom-0 flex justify-center items-start border-t-8 border-secondary -z-10">
      <span className="py-2 px-4 bg-outline rounded-b outline-2 outline outline-secondary font-handwriting black-shadow bg-secondary">
        {props.projectName}
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
