import Button from "@/components/common/button";
import LogoMenu from "./LogoMenu";

interface Props {
  projectName: string;
}

const NavigationBar = (props: Props) => (
  <nav className="p-2 border border-outline rounded-lg flex items-center justify-between bg-primary">
    <LogoMenu />
    <span className="py-2 px-4 bg-outline rounded">{props.projectName}</span>
    <div>
      <Button variant="hollow" className="uppercase">sign in</Button>
    </div>
  </nav>
);

export default NavigationBar;
