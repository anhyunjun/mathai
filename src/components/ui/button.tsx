import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 font-inter",
  {
    variants: {
      variant: {
        default:
          "bg-primary text-primary-foreground shadow hover:bg-primary-600 active:bg-primary-700 focus-visible:ring-primary-300",
        destructive:
          "bg-error text-error-foreground shadow-sm hover:bg-error-600 active:bg-error-700 focus-visible:ring-error-300",
        outline:
          "border border-gray-300 bg-white text-gray-700 shadow-sm hover:bg-gray-50 active:bg-gray-100 focus-visible:ring-primary-300",
        secondary:
          "bg-secondary text-secondary-foreground shadow-sm hover:bg-secondary-600 active:bg-secondary-700 focus-visible:ring-secondary-300",
        ghost:
          "text-gray-700 hover:bg-gray-100 active:bg-gray-200 focus-visible:ring-gray-300",
        link: "text-primary underline-offset-4 hover:underline focus-visible:ring-primary-300",
        neutral:
          "bg-gray-100 text-gray-700 hover:bg-gray-200 active:bg-gray-300 focus-visible:ring-gray-300",
        plain:
          "bg-white text-gray-700 border border-gray-300 hover:bg-gray-50 active:bg-gray-100 focus-visible:ring-gray-300",
      },
      size: {
        default: "h-10 px-4 py-2 text-sm",
        sm: "h-8 rounded-md px-3 py-1 text-xs",
        lg: "h-12 rounded-md px-6 py-3 text-base",
        icon: "h-10 w-10",
        xs: "h-7 rounded-md px-2.5 py-0.5 text-xs",
        xl: "h-14 rounded-md px-8 py-4 text-lg",
      },
      state: {
        default: "",
        loading: "opacity-80 cursor-wait",
        disabled: "opacity-50 cursor-not-allowed",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
      state: "default",
    },
  },
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
  isLoading?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant,
      size,
      state,
      asChild = false,
      isLoading = false,
      leftIcon,
      rightIcon,
      children,
      ...props
    },
    ref,
  ) => {
    const Comp = asChild ? Slot : "button";

    // Set state based on loading or disabled props
    const buttonState = isLoading
      ? "loading"
      : props.disabled
        ? "disabled"
        : state;

    return (
      <Comp
        className={cn(
          buttonVariants({ variant, size, state: buttonState, className }),
        )}
        ref={ref}
        disabled={isLoading || props.disabled}
        {...props}
      >
        {isLoading && (
          <svg
            className="mr-2 h-4 w-4 animate-spin"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            ></circle>
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            ></path>
          </svg>
        )}
        {!isLoading && leftIcon && <span className="mr-2">{leftIcon}</span>}
        {children}
        {!isLoading && rightIcon && <span className="ml-2">{rightIcon}</span>}
      </Comp>
    );
  },
);
Button.displayName = "Button";

export { Button, buttonVariants };
