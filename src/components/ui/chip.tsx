import React from "react";
import { ChevronRight, X } from "lucide-react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const chipVariants = cva(
  "inline-flex items-center justify-center gap-0.5 rounded-full",
  {
    variants: {
      variant: {
        primary: "bg-primary text-primary-foreground",
        secondary: "bg-secondary text-secondary-foreground",
        outlined_primary: "border border-primary text-primary",
        outlined_neutral: "border border-gray-200 text-gray-700",
        neutral: "bg-gray-100 text-gray-700",
        red: "bg-error text-error-foreground",
        red_accent: "bg-error-600 text-error-foreground",
        yellow: "bg-warning text-warning-foreground",
        green: "bg-success text-success-foreground",
        dim: "bg-gray-700 text-white",
        outlined_blue: "border border-blue-500 text-blue-500",
        blue: "bg-blue-500 text-white",
      },
      size: {
        s: "px-2 py-0.5 text-xs",
        m: "px-2 py-1 text-sm",
        l: "px-2 py-1 text-base",
      },
      hasLeftIcon: {
        true: "pl-2 pr-3",
        false: "",
      },
      hasRightIcon: {
        true: "pl-3 pr-2",
        false: "",
      },
      hasBothIcons: {
        true: "px-2",
        false: "",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "m",
    },
    compoundVariants: [
      {
        hasLeftIcon: false,
        hasRightIcon: false,
        hasBothIcons: false,
        className: "px-3",
      },
    ],
  },
);

export interface ChipProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof chipVariants> {
  /**
   * The label text to display in the chip
   */
  label: string;
  /**
   * Optional icon to display on the left side of the chip
   */
  leftIcon?: React.ReactNode;
  /**
   * Optional icon to display on the right side of the chip
   */
  rightIcon?: React.ReactNode;
  /**
   * Whether the chip is disabled
   */
  disabled?: boolean;
}

/**
 * Chip component for displaying compact elements like tags, filters, or options
 */
export const Chip = React.forwardRef<HTMLDivElement, ChipProps>(
  (
    {
      className,
      variant,
      size,
      label,
      leftIcon,
      rightIcon,
      disabled = false,
      ...props
    },
    ref,
  ) => {
    // Determine if the chip has left and/or right icons
    const hasLeftIcon = !!leftIcon;
    const hasRightIcon = !!rightIcon;
    const hasBothIcons = hasLeftIcon && hasRightIcon;

    return (
      <div
        ref={ref}
        className={cn(
          chipVariants({
            variant,
            size,
            hasLeftIcon,
            hasRightIcon,
            hasBothIcons,
            className,
          }),
          disabled && "opacity-50 cursor-not-allowed",
        )}
        {...props}
      >
        {leftIcon && (
          <span className="flex items-center justify-center w-6 h-6">
            {leftIcon}
          </span>
        )}
        <span className="text-center">{label}</span>
        {rightIcon && (
          <span className="flex items-center justify-center w-6 h-6">
            {rightIcon}
          </span>
        )}
      </div>
    );
  },
);

Chip.displayName = "Chip";

/**
 * ChipDemo component to showcase different chip variants and sizes
 */
export const ChipDemo = () => {
  return (
    <div className="w-full bg-white p-6">
      <h2 className="text-3xl font-bold font-mulish text-[#5c5c5c] mb-6">
        Chip
      </h2>

      <div className="space-y-8">
        {/* Size L */}
        <div>
          <h3 className="text-xl font-bold font-pretendard text-[#33373b] mb-4">
            L
          </h3>
          <div className="flex flex-wrap gap-4">
            <Chip
              variant="primary"
              size="l"
              label="Label"
              leftIcon={<ChevronRight className="h-3.5 w-3.5" />}
              rightIcon={<X className="h-3.5 w-3.5" />}
            />
            <Chip
              variant="secondary"
              size="l"
              label="Label"
              leftIcon={<ChevronRight className="h-3.5 w-3.5" />}
              rightIcon={<X className="h-3.5 w-3.5" />}
            />
            <Chip
              variant="outlined_primary"
              size="l"
              label="Label"
              leftIcon={<ChevronRight className="h-3.5 w-3.5" />}
              rightIcon={<X className="h-3.5 w-3.5" />}
            />
            <Chip
              variant="outlined_neutral"
              size="l"
              label="Label"
              leftIcon={<ChevronRight className="h-3.5 w-3.5" />}
              rightIcon={<X className="h-3.5 w-3.5" />}
            />
            <Chip
              variant="neutral"
              size="l"
              label="Label"
              leftIcon={<ChevronRight className="h-3.5 w-3.5" />}
              rightIcon={<X className="h-3.5 w-3.5" />}
            />
            <Chip
              variant="red"
              size="l"
              label="Label"
              leftIcon={<ChevronRight className="h-3.5 w-3.5" />}
              rightIcon={<X className="h-3.5 w-3.5" />}
            />
            <Chip
              variant="red_accent"
              size="l"
              label="Label"
              leftIcon={<ChevronRight className="h-3.5 w-3.5" />}
              rightIcon={<X className="h-3.5 w-3.5" />}
            />
            <Chip
              variant="yellow"
              size="l"
              label="Label"
              leftIcon={<ChevronRight className="h-3.5 w-3.5" />}
              rightIcon={<X className="h-3.5 w-3.5" />}
            />
            <Chip
              variant="green"
              size="l"
              label="Label"
              leftIcon={<ChevronRight className="h-3.5 w-3.5" />}
              rightIcon={<X className="h-3.5 w-3.5" />}
            />
            <Chip
              variant="dim"
              size="l"
              label="Label"
              leftIcon={<ChevronRight className="h-3.5 w-3.5" />}
              rightIcon={<X className="h-3.5 w-3.5" />}
            />
            <Chip
              variant="outlined_blue"
              size="l"
              label="Label"
              leftIcon={<ChevronRight className="h-3.5 w-3.5" />}
              rightIcon={<X className="h-3.5 w-3.5" />}
            />
            <Chip
              variant="blue"
              size="l"
              label="Label"
              leftIcon={<ChevronRight className="h-3.5 w-3.5" />}
              rightIcon={<X className="h-3.5 w-3.5" />}
            />
          </div>

          <div className="flex flex-wrap gap-4 mt-4">
            <Chip variant="primary" size="l" label="Label" />
            <Chip variant="secondary" size="l" label="Label" />
            <Chip variant="outlined_primary" size="l" label="Label" />
            <Chip variant="outlined_neutral" size="l" label="Label" />
            <Chip variant="neutral" size="l" label="Label" />
            <Chip variant="red" size="l" label="Label" />
            <Chip variant="red_accent" size="l" label="Label" />
            <Chip variant="yellow" size="l" label="Label" />
            <Chip variant="green" size="l" label="Label" />
            <Chip variant="dim" size="l" label="Label" />
            <Chip variant="outlined_blue" size="l" label="Label" />
            <Chip variant="blue" size="l" label="Label" />
          </div>

          <div className="flex flex-wrap gap-4 mt-4">
            <Chip
              variant="primary"
              size="l"
              label="Label"
              leftIcon={<ChevronRight className="h-3.5 w-3.5" />}
            />
            <Chip
              variant="secondary"
              size="l"
              label="Label"
              leftIcon={<ChevronRight className="h-3.5 w-3.5" />}
            />
            <Chip
              variant="outlined_primary"
              size="l"
              label="Label"
              leftIcon={<ChevronRight className="h-3.5 w-3.5" />}
            />
            <Chip
              variant="outlined_neutral"
              size="l"
              label="Label"
              leftIcon={<ChevronRight className="h-3.5 w-3.5" />}
            />
            <Chip
              variant="neutral"
              size="l"
              label="Label"
              leftIcon={<ChevronRight className="h-3.5 w-3.5" />}
            />
            <Chip
              variant="red"
              size="l"
              label="Label"
              leftIcon={<ChevronRight className="h-3.5 w-3.5" />}
            />
            <Chip
              variant="red_accent"
              size="l"
              label="Label"
              leftIcon={<ChevronRight className="h-3.5 w-3.5" />}
            />
            <Chip
              variant="yellow"
              size="l"
              label="Label"
              leftIcon={<ChevronRight className="h-3.5 w-3.5" />}
            />
            <Chip
              variant="green"
              size="l"
              label="Label"
              leftIcon={<ChevronRight className="h-3.5 w-3.5" />}
            />
            <Chip
              variant="dim"
              size="l"
              label="Label"
              leftIcon={<ChevronRight className="h-3.5 w-3.5" />}
            />
            <Chip
              variant="outlined_blue"
              size="l"
              label="Label"
              leftIcon={<ChevronRight className="h-3.5 w-3.5" />}
            />
            <Chip
              variant="blue"
              size="l"
              label="Label"
              leftIcon={<ChevronRight className="h-3.5 w-3.5" />}
            />
          </div>

          <div className="flex flex-wrap gap-4 mt-4">
            <Chip
              variant="primary"
              size="l"
              label="Label"
              rightIcon={<X className="h-3.5 w-3.5" />}
            />
            <Chip
              variant="secondary"
              size="l"
              label="Label"
              rightIcon={<X className="h-3.5 w-3.5" />}
            />
            <Chip
              variant="outlined_primary"
              size="l"
              label="Label"
              rightIcon={<X className="h-3.5 w-3.5" />}
            />
            <Chip
              variant="outlined_neutral"
              size="l"
              label="Label"
              rightIcon={<X className="h-3.5 w-3.5" />}
            />
            <Chip
              variant="neutral"
              size="l"
              label="Label"
              rightIcon={<X className="h-3.5 w-3.5" />}
            />
            <Chip
              variant="red"
              size="l"
              label="Label"
              rightIcon={<X className="h-3.5 w-3.5" />}
            />
            <Chip
              variant="red_accent"
              size="l"
              label="Label"
              rightIcon={<X className="h-3.5 w-3.5" />}
            />
            <Chip
              variant="yellow"
              size="l"
              label="Label"
              rightIcon={<X className="h-3.5 w-3.5" />}
            />
            <Chip
              variant="green"
              size="l"
              label="Label"
              rightIcon={<X className="h-3.5 w-3.5" />}
            />
            <Chip
              variant="dim"
              size="l"
              label="Label"
              rightIcon={<X className="h-3.5 w-3.5" />}
            />
            <Chip
              variant="outlined_blue"
              size="l"
              label="Label"
              rightIcon={<X className="h-3.5 w-3.5" />}
            />
            <Chip
              variant="blue"
              size="l"
              label="Label"
              rightIcon={<X className="h-3.5 w-3.5" />}
            />
          </div>
        </div>

        {/* Size M */}
        <div>
          <h3 className="text-xl font-bold font-pretendard text-[#33373b] mb-4">
            M
          </h3>
          <div className="flex flex-wrap gap-4">
            <Chip
              variant="primary"
              size="m"
              label="Label"
              leftIcon={<ChevronRight className="h-3.5 w-3.5" />}
              rightIcon={<X className="h-3.5 w-3.5" />}
            />
            <Chip
              variant="secondary"
              size="m"
              label="Label"
              leftIcon={<ChevronRight className="h-3.5 w-3.5" />}
              rightIcon={<X className="h-3.5 w-3.5" />}
            />
            <Chip
              variant="outlined_primary"
              size="m"
              label="Label"
              leftIcon={<ChevronRight className="h-3.5 w-3.5" />}
              rightIcon={<X className="h-3.5 w-3.5" />}
            />
            <Chip
              variant="outlined_neutral"
              size="m"
              label="Label"
              leftIcon={<ChevronRight className="h-3.5 w-3.5" />}
              rightIcon={<X className="h-3.5 w-3.5" />}
            />
            <Chip
              variant="neutral"
              size="m"
              label="Label"
              leftIcon={<ChevronRight className="h-3.5 w-3.5" />}
              rightIcon={<X className="h-3.5 w-3.5" />}
            />
            <Chip
              variant="red"
              size="m"
              label="Label"
              leftIcon={<ChevronRight className="h-3.5 w-3.5" />}
              rightIcon={<X className="h-3.5 w-3.5" />}
            />
            <Chip
              variant="red_accent"
              size="m"
              label="Label"
              leftIcon={<ChevronRight className="h-3.5 w-3.5" />}
              rightIcon={<X className="h-3.5 w-3.5" />}
            />
            <Chip
              variant="yellow"
              size="m"
              label="Label"
              leftIcon={<ChevronRight className="h-3.5 w-3.5" />}
              rightIcon={<X className="h-3.5 w-3.5" />}
            />
            <Chip
              variant="green"
              size="m"
              label="Label"
              leftIcon={<ChevronRight className="h-3.5 w-3.5" />}
              rightIcon={<X className="h-3.5 w-3.5" />}
            />
            <Chip
              variant="dim"
              size="m"
              label="Label"
              leftIcon={<ChevronRight className="h-3.5 w-3.5" />}
              rightIcon={<X className="h-3.5 w-3.5" />}
            />
            <Chip
              variant="outlined_blue"
              size="m"
              label="Label"
              leftIcon={<ChevronRight className="h-3.5 w-3.5" />}
              rightIcon={<X className="h-3.5 w-3.5" />}
            />
            <Chip
              variant="blue"
              size="m"
              label="Label"
              leftIcon={<ChevronRight className="h-3.5 w-3.5" />}
              rightIcon={<X className="h-3.5 w-3.5" />}
            />
          </div>

          <div className="flex flex-wrap gap-4 mt-4">
            <Chip variant="primary" size="m" label="Label" />
            <Chip variant="secondary" size="m" label="Label" />
            <Chip variant="outlined_primary" size="m" label="Label" />
            <Chip variant="outlined_neutral" size="m" label="Label" />
            <Chip variant="neutral" size="m" label="Label" />
            <Chip variant="red" size="m" label="Label" />
            <Chip variant="red_accent" size="m" label="Label" />
            <Chip variant="yellow" size="m" label="Label" />
            <Chip variant="green" size="m" label="Label" />
            <Chip variant="dim" size="m" label="Label" />
            <Chip variant="outlined_blue" size="m" label="Label" />
            <Chip variant="blue" size="m" label="Label" />
          </div>

          <div className="flex flex-wrap gap-4 mt-4">
            <Chip
              variant="primary"
              size="m"
              label="Label"
              leftIcon={<ChevronRight className="h-3.5 w-3.5" />}
            />
            <Chip
              variant="secondary"
              size="m"
              label="Label"
              leftIcon={<ChevronRight className="h-3.5 w-3.5" />}
            />
            <Chip
              variant="outlined_primary"
              size="m"
              label="Label"
              leftIcon={<ChevronRight className="h-3.5 w-3.5" />}
            />
            <Chip
              variant="outlined_neutral"
              size="m"
              label="Label"
              leftIcon={<ChevronRight className="h-3.5 w-3.5" />}
            />
            <Chip
              variant="neutral"
              size="m"
              label="Label"
              leftIcon={<ChevronRight className="h-3.5 w-3.5" />}
            />
            <Chip
              variant="red"
              size="m"
              label="Label"
              leftIcon={<ChevronRight className="h-3.5 w-3.5" />}
            />
            <Chip
              variant="red_accent"
              size="m"
              label="Label"
              leftIcon={<ChevronRight className="h-3.5 w-3.5" />}
            />
            <Chip
              variant="yellow"
              size="m"
              label="Label"
              leftIcon={<ChevronRight className="h-3.5 w-3.5" />}
            />
            <Chip
              variant="green"
              size="m"
              label="Label"
              leftIcon={<ChevronRight className="h-3.5 w-3.5" />}
            />
            <Chip
              variant="dim"
              size="m"
              label="Label"
              leftIcon={<ChevronRight className="h-3.5 w-3.5" />}
            />
            <Chip
              variant="outlined_blue"
              size="m"
              label="Label"
              leftIcon={<ChevronRight className="h-3.5 w-3.5" />}
            />
            <Chip
              variant="blue"
              size="m"
              label="Label"
              leftIcon={<ChevronRight className="h-3.5 w-3.5" />}
            />
          </div>

          <div className="flex flex-wrap gap-4 mt-4">
            <Chip
              variant="primary"
              size="m"
              label="Label"
              rightIcon={<X className="h-3.5 w-3.5" />}
            />
            <Chip
              variant="secondary"
              size="m"
              label="Label"
              rightIcon={<X className="h-3.5 w-3.5" />}
            />
            <Chip
              variant="outlined_primary"
              size="m"
              label="Label"
              rightIcon={<X className="h-3.5 w-3.5" />}
            />
            <Chip
              variant="outlined_neutral"
              size="m"
              label="Label"
              rightIcon={<X className="h-3.5 w-3.5" />}
            />
            <Chip
              variant="neutral"
              size="m"
              label="Label"
              rightIcon={<X className="h-3.5 w-3.5" />}
            />
            <Chip
              variant="red"
              size="m"
              label="Label"
              rightIcon={<X className="h-3.5 w-3.5" />}
            />
            <Chip
              variant="red_accent"
              size="m"
              label="Label"
              rightIcon={<X className="h-3.5 w-3.5" />}
            />
            <Chip
              variant="yellow"
              size="m"
              label="Label"
              rightIcon={<X className="h-3.5 w-3.5" />}
            />
            <Chip
              variant="green"
              size="m"
              label="Label"
              rightIcon={<X className="h-3.5 w-3.5" />}
            />
            <Chip
              variant="dim"
              size="m"
              label="Label"
              rightIcon={<X className="h-3.5 w-3.5" />}
            />
            <Chip
              variant="outlined_blue"
              size="m"
              label="Label"
              rightIcon={<X className="h-3.5 w-3.5" />}
            />
            <Chip
              variant="blue"
              size="m"
              label="Label"
              rightIcon={<X className="h-3.5 w-3.5" />}
            />
          </div>
        </div>

        {/* Size S */}
        <div>
          <h3 className="text-xl font-bold font-pretendard text-[#33373b] mb-4">
            S
          </h3>
          <div className="flex flex-wrap gap-4">
            <Chip
              variant="primary"
              size="s"
              label="Label"
              leftIcon={<ChevronRight className="h-3.5 w-3.5" />}
              rightIcon={<X className="h-3.5 w-3.5" />}
            />
            <Chip
              variant="secondary"
              size="s"
              label="Label"
              leftIcon={<ChevronRight className="h-3.5 w-3.5" />}
              rightIcon={<X className="h-3.5 w-3.5" />}
            />
            <Chip
              variant="outlined_primary"
              size="s"
              label="Label"
              leftIcon={<ChevronRight className="h-3.5 w-3.5" />}
              rightIcon={<X className="h-3.5 w-3.5" />}
            />
            <Chip
              variant="outlined_neutral"
              size="s"
              label="Label"
              leftIcon={<ChevronRight className="h-3.5 w-3.5" />}
              rightIcon={<X className="h-3.5 w-3.5" />}
            />
            <Chip
              variant="neutral"
              size="s"
              label="Label"
              leftIcon={<ChevronRight className="h-3.5 w-3.5" />}
              rightIcon={<X className="h-3.5 w-3.5" />}
            />
            <Chip
              variant="red"
              size="s"
              label="Label"
              leftIcon={<ChevronRight className="h-3.5 w-3.5" />}
              rightIcon={<X className="h-3.5 w-3.5" />}
            />
            <Chip
              variant="red_accent"
              size="s"
              label="Label"
              leftIcon={<ChevronRight className="h-3.5 w-3.5" />}
              rightIcon={<X className="h-3.5 w-3.5" />}
            />
            <Chip
              variant="yellow"
              size="s"
              label="Label"
              leftIcon={<ChevronRight className="h-3.5 w-3.5" />}
              rightIcon={<X className="h-3.5 w-3.5" />}
            />
            <Chip
              variant="green"
              size="s"
              label="Label"
              leftIcon={<ChevronRight className="h-3.5 w-3.5" />}
              rightIcon={<X className="h-3.5 w-3.5" />}
            />
            <Chip
              variant="dim"
              size="s"
              label="Label"
              leftIcon={<ChevronRight className="h-3.5 w-3.5" />}
              rightIcon={<X className="h-3.5 w-3.5" />}
            />
            <Chip
              variant="outlined_blue"
              size="s"
              label="Label"
              leftIcon={<ChevronRight className="h-3.5 w-3.5" />}
              rightIcon={<X className="h-3.5 w-3.5" />}
            />
            <Chip
              variant="blue"
              size="s"
              label="Label"
              leftIcon={<ChevronRight className="h-3.5 w-3.5" />}
              rightIcon={<X className="h-3.5 w-3.5" />}
            />
          </div>

          <div className="flex flex-wrap gap-4 mt-4">
            <Chip variant="primary" size="s" label="Label" />
            <Chip variant="secondary" size="s" label="Label" />
            <Chip variant="outlined_primary" size="s" label="Label" />
            <Chip variant="outlined_neutral" size="s" label="Label" />
            <Chip variant="neutral" size="s" label="Label" />
            <Chip variant="red" size="s" label="Label" />
            <Chip variant="red_accent" size="s" label="Label" />
            <Chip variant="yellow" size="s" label="Label" />
            <Chip variant="green" size="s" label="Label" />
            <Chip variant="dim" size="s" label="Label" />
            <Chip variant="outlined_blue" size="s" label="Label" />
            <Chip variant="blue" size="s" label="Label" />
          </div>

          <div className="flex flex-wrap gap-4 mt-4">
            <Chip
              variant="primary"
              size="s"
              label="Label"
              leftIcon={<ChevronRight className="h-3.5 w-3.5" />}
            />
            <Chip
              variant="secondary"
              size="s"
              label="Label"
              leftIcon={<ChevronRight className="h-3.5 w-3.5" />}
            />
            <Chip
              variant="outlined_primary"
              size="s"
              label="Label"
              leftIcon={<ChevronRight className="h-3.5 w-3.5" />}
            />
            <Chip
              variant="outlined_neutral"
              size="s"
              label="Label"
              leftIcon={<ChevronRight className="h-3.5 w-3.5" />}
            />
            <Chip
              variant="neutral"
              size="s"
              label="Label"
              leftIcon={<ChevronRight className="h-3.5 w-3.5" />}
            />
            <Chip
              variant="red"
              size="s"
              label="Label"
              leftIcon={<ChevronRight className="h-3.5 w-3.5" />}
            />
            <Chip
              variant="red_accent"
              size="s"
              label="Label"
              leftIcon={<ChevronRight className="h-3.5 w-3.5" />}
            />
            <Chip
              variant="yellow"
              size="s"
              label="Label"
              leftIcon={<ChevronRight className="h-3.5 w-3.5" />}
            />
            <Chip
              variant="green"
              size="s"
              label="Label"
              leftIcon={<ChevronRight className="h-3.5 w-3.5" />}
            />
            <Chip
              variant="dim"
              size="s"
              label="Label"
              leftIcon={<ChevronRight className="h-3.5 w-3.5" />}
            />
            <Chip
              variant="outlined_blue"
              size="s"
              label="Label"
              leftIcon={<ChevronRight className="h-3.5 w-3.5" />}
            />
            <Chip
              variant="blue"
              size="s"
              label="Label"
              leftIcon={<ChevronRight className="h-3.5 w-3.5" />}
            />
          </div>

          <div className="flex flex-wrap gap-4 mt-4">
            <Chip
              variant="primary"
              size="s"
              label="Label"
              rightIcon={<X className="h-3.5 w-3.5" />}
            />
            <Chip
              variant="secondary"
              size="s"
              label="Label"
              rightIcon={<X className="h-3.5 w-3.5" />}
            />
            <Chip
              variant="outlined_primary"
              size="s"
              label="Label"
              rightIcon={<X className="h-3.5 w-3.5" />}
            />
            <Chip
              variant="outlined_neutral"
              size="s"
              label="Label"
              rightIcon={<X className="h-3.5 w-3.5" />}
            />
            <Chip
              variant="neutral"
              size="s"
              label="Label"
              rightIcon={<X className="h-3.5 w-3.5" />}
            />
            <Chip
              variant="red"
              size="s"
              label="Label"
              rightIcon={<X className="h-3.5 w-3.5" />}
            />
            <Chip
              variant="red_accent"
              size="s"
              label="Label"
              rightIcon={<X className="h-3.5 w-3.5" />}
            />
            <Chip
              variant="yellow"
              size="s"
              label="Label"
              rightIcon={<X className="h-3.5 w-3.5" />}
            />
            <Chip
              variant="green"
              size="s"
              label="Label"
              rightIcon={<X className="h-3.5 w-3.5" />}
            />
            <Chip
              variant="dim"
              size="s"
              label="Label"
              rightIcon={<X className="h-3.5 w-3.5" />}
            />
            <Chip
              variant="outlined_blue"
              size="s"
              label="Label"
              rightIcon={<X className="h-3.5 w-3.5" />}
            />
            <Chip
              variant="blue"
              size="s"
              label="Label"
              rightIcon={<X className="h-3.5 w-3.5" />}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChipDemo;
