"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  invalid?: boolean;
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, invalid, type = "text", ...props }, ref) => {
    return (
      <input
        ref={ref}
        type={type}
        data-invalid={invalid ? "true" : undefined}
        className={cn(
          "font-synonym w-full rounded-lg text-[15px] leading-5",
          "bg-bg text-text placeholder:text-text-muted",
          "border-border/60 border",
          "px-3 py-2.5",
          "shadow-(--shadow-card)",
          "transition-all duration-150 ease-in-out",
          "focus-visible:ring-2 focus-visible:outline-none",
          "focus-visible:ring-accent focus-visible:ring-offset-2",
          "focus-visible:ring-offset-bg",
          "disabled:cursor-not-allowed disabled:opacity-50",
          // invalid state
          "data-[invalid=true]:border-error data-[invalid=true]:focus-visible:ring-error",
          className
        )}
        {...props}
      />
    );
  }
);

Input.displayName = "Input";
