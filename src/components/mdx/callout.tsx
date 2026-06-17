import type { ReactNode } from "react";
import { Info, TriangleAlert, CircleCheck, OctagonAlert } from "lucide-react";
import { cn } from "@/lib/utils";

type CalloutType = "info" | "warning" | "success" | "danger";

const STYLES: Record<CalloutType, { icon: typeof Info; className: string }> = {
  info: {
    icon: Info,
    className: "border-primary/40 bg-primary/5",
  },
  warning: {
    icon: TriangleAlert,
    className: "border-amber-500/40 bg-amber-500/10",
  },
  success: {
    icon: CircleCheck,
    className: "border-emerald-500/40 bg-emerald-500/10",
  },
  danger: {
    icon: OctagonAlert,
    className: "border-red-500/40 bg-red-500/10",
  },
};

export function Callout({
  type = "info",
  title,
  children,
}: {
  type?: CalloutType;
  title?: string;
  children: ReactNode;
}) {
  const { icon: Icon, className } = STYLES[type];
  return (
    <div
      className={cn(
        "my-6 flex gap-3 rounded-lg border p-4 [&>div>p]:my-0",
        className,
      )}
    >
      <Icon className="mt-0.5 h-5 w-5 shrink-0" aria-hidden />
      <div className="min-w-0">
        {title ? <p className="mb-1 font-semibold">{title}</p> : null}
        {children}
      </div>
    </div>
  );
}
