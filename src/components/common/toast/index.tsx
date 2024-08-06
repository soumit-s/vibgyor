"use client";
import CrossIcon from "@/components/svg/Cross1.svg";
import { ToastContainer } from "react-toastify";
import TickIcon from "@/components/svg/Tick1.svg";
import { twMerge } from "tailwind-merge";
const Toast = () => (
  <ToastContainer
    position="top-center"
    autoClose={1000}
    pauseOnFocusLoss={false}
    hideProgressBar={true}
    className={(props) =>
      twMerge("flex justify-center font-handwriting", props?.defaultClassName ?? "")
    }
    icon={(props) => {
      switch(props.type) {
      case "error":
        return <CrossIcon className="w-6 h-6 stroke-red-600" />
      default:
        return <TickIcon className="w-6 h-6 stroke-green-600" />;
      }
    }}
    toastClassName={() =>
      "bg-primary black-shadow border border-outline rounded-lg py-2 px-2 w-fit flex items-center gap-2 tracking-widest"
    }
    closeButton={false}
  />
);

export default Toast;
