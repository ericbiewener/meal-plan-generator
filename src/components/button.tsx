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

export const TextButton: FC<BgButtonProps> = ({
  color = "green",
  className,
  ...props
}) => (
  <button
    className={`text-stone-500 hover:underline hover:text-${color}-500 active:text-${color}-600 ${className}`}
    {...props}
  />
);

type ButtonProps = HTMLAttributes<HTMLButtonElement> & { type?: 1 | 2 };

export const Button: FC<ButtonProps> = ({ type = 2, className, ...props }) => {
  const colorClassNames = type === 1 ? "bg-green-500 hover:bg-green-400 active:bg-green-500" : "bg-gray-500 hover:bg-gray-400 active:bg-gray-500";

  return (
    <button
      className={`${colorClassNames} rounded-full px-3 py-2 shadow-xl text-white ${className}`}
      {...props}
    />
  );
};
