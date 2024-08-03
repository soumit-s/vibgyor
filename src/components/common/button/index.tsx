import { twMerge } from "tailwind-merge";

type ButtonVariant = "filled" | "hollow";

interface Props {
  variant: ButtonVariant;
}

const Button = ({
  className,
  variant,
  children,
  ...props
}: React.PropsWithChildren<Props> &
  React.HTMLAttributes<HTMLButtonElement>) => (
  <button
    className={twMerge(getStyleFromVariant(variant), className)}
    {...props}
  >
    {children}
  </button>
);

function getStyleFromVariant(variant: ButtonVariant): string {
  const common = "py-2 px-4 rounded-md"
  switch (variant) {
    case "filled":
      throw new Error("Unimplemented");
    default:
    case "hollow":
      return twMerge(common, "border border-outline hover:bg-outline transition");
  }
}

export default Button;
