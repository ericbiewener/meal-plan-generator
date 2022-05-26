import { FC, ReactNode } from "react";

export const PillBox: FC<{ children: ReactNode }> = ({ children }) => (
  <div className="bg-white shadow-2xl border border-stone-200 rounded-lg">
    {children}
  </div>
);
