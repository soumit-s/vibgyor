import { useState } from "react";
import { twMerge } from "tailwind-merge";

interface ButtonItem {
  type: "button";
  icon?: React.ReactNode;
  label?: React.ReactNode;
  onClick?: React.MouseEventHandler;
}

interface DividerItem {
  type: "divider";
}

export type Item = ButtonItem | DividerItem;

interface Props {
  item: Item;
}

const MenuItem = ({ item }: Props) => {
  if (item.type === "button") {
    return <ButtonMenuItem item={item} />
  } else if (item.type === "divider") {
    return (
      <tr>
        <td colSpan={4}>
          <hr className="border-outline my-2" />
        </td>
      </tr>
    );
  }
};

const ButtonMenuItem = ({ item }: { item: ButtonItem }) => {
  const [hover, setHover] = useState(false);
  return (
    <tr
      className="cursor-pointer group"
      onMouseOver={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      onClick={item.onClick}
    >
      <td className="p-2" />
      <td className={twMerge("p-2 pl-5 rounded-l-lg", hover && "bg-white/5")}>
        {item.icon}
      </td>
      <td className={twMerge("p-2 pr-5 rounded-r-lg", hover && "bg-white/5")}>
        {item.label}
      </td>
      <td className="p-2" />
    </tr>
  );
};

export default MenuItem;
