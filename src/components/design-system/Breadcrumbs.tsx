import React from "react";
import { ChevronRight } from "lucide-react";

type BreadcrumbItem = {
  label: string;
  href?: string;
  isCurrent?: boolean;
};

type BreadcrumbsProps = {
  items: BreadcrumbItem[];
  maxVisible?: number;
  separator?: React.ReactNode;
  className?: string;
};

/**
 * Breadcrumbs component for navigation hierarchy
 *
 * @param items - Array of breadcrumb items to display
 * @param maxVisible - Maximum number of items to show before truncating
 * @param separator - Custom separator between items (defaults to '/')
 * @param className - Additional CSS classes
 */
const Breadcrumbs = ({
  items = [],
  maxVisible = 0, // 0 means show all
  separator = "/",
  className = "",
}: BreadcrumbsProps) => {
  // If no items, don't render anything
  if (!items.length) return null;

  // Handle truncation if maxVisible is set and items exceed that number
  const visibleItems = [...items];
  const shouldTruncate = maxVisible > 0 && items.length > maxVisible;

  if (shouldTruncate) {
    // Always keep first item, last item, and items around current
    const firstItem = visibleItems[0];
    const lastItems = visibleItems.slice(-Math.min(3, maxVisible - 1));

    visibleItems.length = 0;
    visibleItems.push(
      firstItem,
      { label: "...", isCurrent: false },
      ...lastItems,
    );
  }

  return (
    <nav aria-label="Breadcrumb" className={`flex items-center ${className}`}>
      <ol className="flex items-center">
        {visibleItems.map((item, index) => {
          const isLast = index === visibleItems.length - 1;

          return (
            <li key={`${item.label}-${index}`} className="flex items-center">
              <div className="flex items-center gap-2">
                {item.isCurrent || !item.href ? (
                  <span
                    className={`text-xs font-medium font-pretendard ${item.isCurrent ? "text-[#575c64]" : "text-[#8d94a0]"}`}
                    aria-current={item.isCurrent ? "page" : undefined}
                  >
                    {item.label}
                  </span>
                ) : (
                  <a
                    href={item.href}
                    className="text-xs font-medium font-pretendard text-[#8d94a0] hover:text-[#575c64] transition-colors"
                  >
                    {item.label}
                  </a>
                )}

                {!isLast && (
                  <span className="text-xs font-medium font-pretendard text-[#8d94a0]">
                    {separator}
                  </span>
                )}
              </div>
            </li>
          );
        })}
      </ol>
    </nav>
  );
};

export default Breadcrumbs;
