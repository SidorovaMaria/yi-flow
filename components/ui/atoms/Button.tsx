"use client";

import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";
const buttonVariants = cva(
  //base styles - hared for all variants
  "inline-flex items-center justify-center gap-2 whitespace-nowrap font-semibold tracking-[0.02em] rounded-lg cursor-pointer " +
    "transition-all duration-150 ease-in-out font-synonym " +
    "disabled:opacity-50 disabled:pointer-events-none",
  {
    variants: {
      variant: {
        primary: "bg-primary text-bg " + "hover:bg-primary-l ",
        secondary: "bg-secondary text-text hover:bg-secondary-l ",
        ghost: "bg-transparent text-text " + "hover:bg-bg-muted shadow-none! ",
        outline:
          "border border-[color-mix(in_srgb,var(--primary)_60%,transparent)] " +
          "bg-transparent text-primary shadow-none! " +
          "hover:bg-[color-mix(in_srgb,var(--primary)_6%,transparent)] ",
        destructive: "bg-error text-white" + " hover:bg-error/80 ",
      },
      shadow: {
        s: "card-shadow shadow-[0_4px_8px]",
        m: "card-shadow shadow-[0_8px_16px]",
      },
      size: {
        sm: "h-9 px-3 text-[14px] leading-[18px]",
        md: "h-11 px-5 text-[15px] leading-5",
        lg: "h-12 px-6 text-[16px] leading-[22px]",
      },
      fullWidth: {
        true: "w-full",
        false: "w-fit",
      },
    },
    defaultVariants: {
      variant: "primary",
      shadow: "s",
      size: "md",
      fullWidth: false,
    },
  }
);
export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, fullWidth, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";

    return (
      <Comp
        ref={ref}
        className={cn(buttonVariants({ variant, size, fullWidth }), className)}
        {...props}
      />
    );
  }
);
Button.displayName = "Button";
