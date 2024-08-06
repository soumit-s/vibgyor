import { twMerge } from "tailwind-merge";

type ButtonVariant = "filled" | "hollow";
type ButtonState = "enabled" | "disabled" | "processing";

interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  state?: ButtonState;
}

const Button = ({
  className,
  variant = "filled",
  state = "enabled",
  onClick,
  children,
  ...props
}: React.PropsWithChildren<Props>) => {
  return (
    <button
      className={twMerge(
        getStyleFromVariantAndState(variant, state),
        className
      )}
      onClick={(e) => state === "enabled" && onClick && onClick(e)}
      {...props}
    >
      {children}
    </button>
  );
};

function getStyleFromVariantAndState(
  variant: ButtonVariant,
  state: ButtonState
): string {
  const common = "py-2 px-4 rounded-md transition grid items-center";
  switch (variant) {
    case "filled":
      return twMerge(
        common,
        "border border-secondary bg-secondary",
        state === "enabled" && "hover:border-foreground",
        state === "disabled" && "brightness-50"
      );
    default:
    case "hollow":
      return twMerge(
        common,
        "bg-primary border border-outline",
        state === "enabled" && "hover:bg-outline",
        state === "disabled" && "brightness-50"
      );
  }
}

export default Button;
