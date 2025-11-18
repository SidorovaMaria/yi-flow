"use client";

import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";
// Button sizes: lg, md, sm,xs
// States: default, hover, focus, disabled
// Style: primary, secondary, tertiary, outline, ghost, destructive
// Show Left Icon: true/false
// Left Icon: Lucide icon name
// Show Right Icon: true/false
// Right Icon: Lucide icon name
const buttonVariants = cva(
  "rounded-lg inline-flex items-center justify-center transition-all duration-150 ease-in-out disabled:opacity-40 disabled:pointer-events-none font-synonym font-semibold tracking-[0.02em] cursor-pointer focus:ring-4 focus:ring-offset-0 focus:ring-accent outline-none",
  {
    variants: {
      variant: {
        primary:
          "bg-primary text-bg hover:bg-primary-d focus:bg-primary-d dark:hover:bg-primary-l dark:focus:bg-primary-l ",
        secondary:
          "bg-accent text-bg hover:bg-accent-d focus:bg-accent-d dark:hover:bg-accent-l dark:focus:bg-accent-l ",
        ghost:
          "bg-transparent text-text hover:bg-bg-muted shadow-none! focus:bg-bg-muted ",
        outline:
          "border border-[color-mix(in_srgb,var(--primary)_60%,transparent)] bg-transparent text-primary shadow-none! hover:bg-[color-mix(in_srgb,var(--primary)_6%,transparent)] focus:bg-[color-mix(in_srgb,var(--primary)_6%,transparent)] ",
        destructive: "bg-error text-white hover:bg-error/80 focus:bg-error/80 ",
      },
      size: {
        lg: "gap-2.5 px-4 py-2.5  text-[16px] leading-[22px] h-12 [&>svg]:size-5.5",
        md: "px-4 py-2.5 gap-2.5 text-[15px] leading-5 h-11 [&>svg]:size-5",
        sm: "px-3.5 gap-2 py-2 text-sm leading-4.5 h-10 [&>svg]:size-4.5",
        xs: "px-3 py-2 gap-1.5 text-xs leading-4 h-9 [&>svg]:size-4",
      },
      fullWidth: {
        true: "w-full",
        false: "w-fit",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "lg",
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
  ({ className, variant, fullWidth, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";

    return (
      <Comp
        ref={ref}
        className={cn(buttonVariants({ variant, fullWidth, size }), className)}
        {...props}
      />
    );
  }
);
Button.displayName = "Button";
