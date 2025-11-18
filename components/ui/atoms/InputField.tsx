"use client";

import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";
import { InfoIcon } from "lucide-react";
const inputField = cva(
  "flex flex-col items-start w-full [&>label]:font-synonym [&>label]:font-medium has-disabled:[&>label]:text-text-muted has-disabled:pointer-events-none ",
  {
    variants: {
      size: {
        lg: "gap-1.5 [&>label]:text-sm ",
        sm: "gap-1.5 [&>label]:text-sm ",
        xs: "gap-1 [&>label]:text-xs",
      },
    },
    defaultVariants: {
      size: "lg",
    },
  }
);

const inputFieldContainer = cva(
  "rounded-lg border border-primary-l/30 flex items-center w-full max-w-[400px] gap-2.5 hover:border-primary focus-within:border-primary transition-colors duration-150 ease-in-out has-invalid:border-error placeholder:text-text-muted has-disabled:cursor-not-allowed has-disabled:border-border/30 has-disabled:bg-bg-alt/50 has-disabled:text-text-muted",
  {
    variants: {
      size: {
        lg: "px-4 py-2.5 h-11 ",
        sm: "px-3.5 py-2 h-10 ",
        xs: "px-3 py-2 h-9",
      },
    },
    defaultVariants: {
      size: "lg",
    },
  }
);
export interface InputFieldProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "size">,
    VariantProps<typeof inputField>,
    VariantProps<typeof inputFieldContainer> {
  label: string;
  asChild?: boolean;
  icon?: React.ReactNode;
  helperText?: string;
  error?: boolean;
}

export const InputField = React.forwardRef<HTMLInputElement, InputFieldProps>(
  (
    { className, label, size = "lg", asChild = false, icon, helperText, error, ...props },
    ref
  ) => {
    const Comp = asChild ? Slot : "input";

    return (
      <div className={cn(inputField({ size }), className)}>
        <label>{label}</label>
        <div className={cn(inputFieldContainer({ size }))}>
          {icon && <div>{icon}</div>}
          <Comp
            ref={ref}
            className="text-text placeholder:text-text-muted peer w-full bg-transparent text-[15px] leading-5 outline-none"
            {...props}
          />
        </div>
        {helperText && (
          <div
            className={cn(
              "text-accent-d dark:text-accent-l peer-invalid:text-error flex items-center justify-start gap-1",
              error && "text-error"
            )}
          >
            <InfoIcon
              size={15}
              className={cn("stroke-bg fill-accent", error && "fill-error")}
            />
            <p className={cn(size == "lg" ? "text-sm" : "text-xs")}>{helperText}</p>
          </div>
        )}
      </div>
    );
  }
);
InputField.displayName = "InputField";
