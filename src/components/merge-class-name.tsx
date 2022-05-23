import cn from "classnames";
import { HTMLAttributes, FC, ComponentType, ComponentProps } from "react";

type MergeClass = {
  <P extends { className?: string }>(
    Cmp: ComponentType<P>,
    builtInClassName: string
  ): FC<P>;
  <El extends HTMLElement>(
    TagName: El["tagName"],
    builtInClassName?: string
  ): FC<HTMLAttributes<El>>;
};

export const mergeClassName: MergeClass =
  (Cmp, builtInClassName) =>
  ({ className, ...props }: { className?: string }) =>
    <Cmp className={cn(builtInClassName, className)} {...props} />;
