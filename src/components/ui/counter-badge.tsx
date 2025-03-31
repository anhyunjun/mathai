import React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const counterBadgeVariants = cva(
  "inline-flex items-center justify-center rounded-full text-white text-xs",
  {
    variants: {
      variant: {
        default: "bg-[#f22735]",
        primary: "bg-primary",
        secondary: "bg-secondary",
        success: "bg-success",
        warning: "bg-warning",
        info: "bg-info",
      },
      size: {
        default: "h-5 min-w-5 px-1 py-px",
        sm: "h-4 min-w-4 px-1 py-px",
        lg: "h-6 min-w-6 px-1.5 py-0.5",
      },
      position: {
        default: "",
        topRight: "-translate-y-[10%] translate-x-[10%]",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
      position: "default",
    },
  },
);

export interface CounterBadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof counterBadgeVariants> {
  /**
   * The count to display in the badge
   */
  count: number;
  /**
   * The maximum count to display before showing a '+' suffix
   * @default 99
   */
  maxCount?: number;
}

/**
 * CounterBadge component for displaying numeric indicators
 */
export const CounterBadge = React.forwardRef<HTMLDivElement, CounterBadgeProps>(
  (
    { className, variant, size, position, count, maxCount = 99, ...props },
    ref,
  ) => {
    // Format the count display based on maxCount
    const displayCount = count > maxCount ? `${maxCount}+` : count.toString();

    return (
      <div
        ref={ref}
        className={cn(
          counterBadgeVariants({ variant, size, position, className }),
        )}
        {...props}
      >
        {displayCount}
      </div>
    );
  },
);

CounterBadge.displayName = "CounterBadge";

/**
 * CounterBadgeDemo component to showcase different counter badge variants
 */
export const CounterBadgeDemo = () => {
  return (
    <div className="w-full bg-white p-6">
      <h2 className="text-3xl font-bold font-mulish text-[#5c5c5c] mb-6">
        Counter Badge
      </h2>

      <div className="space-y-8">
        {/* Basic Examples */}
        <div>
          <h3 className="text-xl font-bold font-pretendard text-[#33373b] mb-4">
            Basic Examples
          </h3>
          <div className="flex flex-wrap gap-4">
            <CounterBadge count={1} />
            <CounterBadge count={10} />
            <CounterBadge count={99} />
            <CounterBadge count={100} />
          </div>
        </div>

        {/* Variants */}
        <div>
          <h3 className="text-xl font-bold font-pretendard text-[#33373b] mb-4">
            Variants
          </h3>
          <div className="flex flex-wrap gap-4">
            <CounterBadge variant="default" count={5} />
            <CounterBadge variant="primary" count={5} />
            <CounterBadge variant="secondary" count={5} />
            <CounterBadge variant="success" count={5} />
            <CounterBadge variant="warning" count={5} />
            <CounterBadge variant="info" count={5} />
          </div>
        </div>

        {/* Sizes */}
        <div>
          <h3 className="text-xl font-bold font-pretendard text-[#33373b] mb-4">
            Sizes
          </h3>
          <div className="flex flex-wrap gap-4 items-center">
            <CounterBadge size="sm" count={5} />
            <CounterBadge size="default" count={5} />
            <CounterBadge size="lg" count={5} />
          </div>
        </div>

        {/* Max Count */}
        <div>
          <h3 className="text-xl font-bold font-pretendard text-[#33373b] mb-4">
            Max Count
          </h3>
          <div className="flex flex-wrap gap-4">
            <div className="flex flex-col items-center gap-2">
              <CounterBadge count={5} />
              <span className="text-xs text-[#656d76]">한 자리수 일때</span>
            </div>
            <div className="flex flex-col items-center gap-2">
              <CounterBadge count={100} />
              <span className="text-xs text-[#656d76]">100이상일 때</span>
            </div>
          </div>
        </div>

        {/* Positioning */}
        <div>
          <h3 className="text-xl font-bold font-pretendard text-[#33373b] mb-4">
            Positioning
          </h3>
          <div className="flex flex-wrap gap-12">
            <div className="relative">
              <div className="w-12 h-12 bg-[#835eeb] rounded-full flex items-center justify-center">
                <span className="text-white">Icon</span>
              </div>
              <CounterBadge
                count={5}
                position="topRight"
                className="absolute top-0 right-0"
              />
            </div>
            <div className="relative">
              <div className="w-10 h-10 bg-[#835eeb] rounded-full flex items-center justify-center">
                <span className="text-white">Icon</span>
              </div>
              <CounterBadge
                count={5}
                position="topRight"
                className="absolute top-0 right-0"
              />
            </div>
          </div>
          <div className="flex flex-wrap gap-12 mt-8">
            <div className="relative">
              <div className="w-12 h-12 bg-[#835eeb] rounded-full flex items-center justify-center">
                <span className="text-white">Icon</span>
              </div>
              <CounterBadge
                count={100}
                position="topRight"
                className="absolute top-0 right-0"
              />
            </div>
            <div className="relative">
              <div className="w-10 h-10 bg-[#835eeb] rounded-full flex items-center justify-center">
                <span className="text-white">Icon</span>
              </div>
              <CounterBadge
                count={100}
                position="topRight"
                className="absolute top-0 right-0"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CounterBadgeDemo;
