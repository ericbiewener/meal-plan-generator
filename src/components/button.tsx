import { mergeClassName } from "./merge-class-name";

export const OutlineButton = mergeClassName<HTMLButtonElement>(
  "button",
  "rounded-full border-2 text-stone-500 border-transparent px-2 py-1 hover:text-blue-300 hover:border-blue-300 active:text-blue-500 active:border-blue-500"
);
