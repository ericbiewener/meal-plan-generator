import { FC } from "react";
import { HTMLAttributes } from "react";
import { mergeClassName } from "./merge-class-name";
import { Color } from "./types";

export const OutlineButton = mergeClassName<HTMLButtonElement>(
  "button",
  "rounded-full border-2 text-stone-500 border-transparent px-2 py-1 hover:text-blue-300 hover:border-blue-300 active:text-blue-500 active:border-blue-500"
);

type BgButtonProps = HTMLAttributes<HTMLButtonElement> & { color?: Color };

export const BgButton: FC<BgButtonProps> = ({
  color = "green",
  className,
  ...props
}) => (
  <button
    className={`rounded-full px-2 py-1 text-stone-500 hover:bg-${color}-100 active:bg-${color}-200 ${className}`}
    {...props}
  />
);
