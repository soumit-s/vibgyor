import React from "react";
import { twMerge } from "tailwind-merge";

interface Props extends React.HTMLAttributes<HTMLInputElement> {
  label?: React.ReactNode;
  value: string;
  type?: "text" | "password";
  placeholder?: string;
  msg?: string;
  msgType?: "error" | "warning" | "ok";
}

const TextBox = ({
  label,
  msg,
  msgType,
  placeholder,
  className,
  type = "text",
  ...props
}: Props) => (
  <div>
    <div className="mb-2">{label}</div>
    <input
      type={type}
      placeholder={placeholder}
      className={twMerge(
        "py-3 px-4 border border-outline bg-primary rounded-md outline-none outline-offset-0",
        "placeholder:text-neutral-200/30 placeholder:font-extralight placeholder:tracking-wide",
        "focus:outline-outline focus:border-secondary transition-all",
        className
      )}
      {...props}
    />
    {msg && (
      <div
        className={twMerge(
          msgType === "error" && "text-red-800",
          msgType === "warning" && "text-yellow-500"
        )}
      >
        {msg}
      </div>
    )}
  </div>
);

export default TextBox;
