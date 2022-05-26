import { FC, ReactNode } from "react";

export const PillBox: FC<{ children: ReactNode; className?: string }> = ({
  children,
  className = "",
}) => (
  <div className="flex">
    <div
      className={`
      text-sm
      bg-white
      children:px-2
      children:py-1
      shadow-sm
      border
      border-stone-200
      rounded-lg
      not-last:children:border-r
      children:border-stone-200
      children:text-stone-500
      hover:children:text-stone-700
      hover:children:bg-stone-100
      active:children:bg-stone-200
      active:children:text-stone-900
      ${className}
      `}
    >
      {children}
    </div>
  </div>
);
