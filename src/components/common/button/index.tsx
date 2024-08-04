import { twMerge } from "tailwind-merge";

type ButtonVariant = "filled" | "hollow";

interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant: ButtonVariant;
}

const Button = ({
  className,
  variant,
  children,
  ...props
}: React.PropsWithChildren<Props>) => {
  return (
    <button
      className={twMerge(getStyleFromVariant(variant), className)}
      {...props}
    >
      {children}
    </button>
  );
};

function getStyleFromVariant(variant: ButtonVariant): string {
  const common = "py-2 px-4 rounded-md transition grid items-center";
  switch (variant) {
    case "filled":
      return twMerge(
        common,
        "border border-secondary bg-secondary hover:border-foreground"
      );
    default:
    case "hollow":
      return twMerge(common, "bg-primary border border-outline hover:bg-outline");
  }
}

export default Button;
