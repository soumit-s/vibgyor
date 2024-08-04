"use client"
import { twMerge } from "tailwind-merge";

type ButtonVariant = "filled" | "hollow";

interface Props extends React.HTMLAttributes<HTMLAnchorElement> {
  variant: ButtonVariant;
  href?: string;
}

const ButtonLink = ({
  className,
  variant,
  children,
  href,
  ...props
}: React.PropsWithChildren<Props>) => {
  return (    
    <a
      className={twMerge(getStyleFromVariant(variant), className)}
      href={href}
      {...props}
    >
      {children}
    </a>
  );
};

function getStyleFromVariant(variant: ButtonVariant): string {
  const common = "py-2 px-4 rounded-md transition";
  switch (variant) {
    case "filled":
      return twMerge(
        common,
        "border border-secondary bg-secondary hover:border-foreground"
      );
    default:
    case "hollow":
      return twMerge(common, "border border-outline hover:bg-outline");
  }
}

export default ButtonLink;
