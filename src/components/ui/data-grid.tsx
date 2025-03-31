import React from "react";
import { cn } from "@/lib/utils";
import { Clock, Calendar, Check } from "lucide-react";

export interface DataGridProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * The title of the data grid
   */
  title?: string;
  /**
   * The items to display in the data grid
   */
  items?: DataGridItem[];
}

export interface DataGridItem {
  /**
   * The title of the item
   */
  title: string;
  /**
   * The subtitle of the item
   */
  subtitle?: string;
  /**
   * The duration of the item in minutes
   */
  duration?: number;
  /**
   * The date of the item
   */
  date?: Date;
  /**
   * Whether the item is completed
   */
  isCompleted?: boolean;
  /**
   * The tag for the item
   */
  tag?: string;
}

/**
 * DataGrid component for displaying a list of items with consistent styling
 */
export const DataGrid = React.forwardRef<HTMLDivElement, DataGridProps>(
  ({ className, title = "Leading Visual", items = [], ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          "w-full bg-white rounded-xl border border-gray-200 overflow-hidden",
          className,
        )}
        {...props}
      >
        {/* Header */}
        <div className="px-4 py-1 bg-gray-100 flex justify-between items-center">
          <div className="text-[#575c64] text-sm font-medium font-pretendard">
            {title}
          </div>
        </div>

        {/* Items */}
        {items.map((item, index) => (
          <div
            key={index}
            className="px-5 py-4 border-b border-gray-200 flex items-start gap-2"
          >
            {/* Icon and Title */}
            <div className="flex items-center gap-3 h-[41px]">
              <div className="p-2 bg-[#f3effd] rounded-full">
                <div className="w-6 h-6 flex items-center justify-center">
                  <div className="w-[18.56px] h-[20.87px] relative">
                    <div className="w-[18.56px] h-[20.87px] absolute top-0 left-0 bg-[#d9cdf9] rounded-sm"></div>
                    <div className="w-[2.71px] h-[20.87px] absolute top-0 left-0 bg-[#9c7eef] rounded-tl-sm rounded-bl-sm"></div>
                    <div className="w-[9.28px] h-[2.32px] absolute top-[3.41px] left-[5.75px] bg-[#9c7eef] rounded-[926.85px]"></div>
                  </div>
                </div>
              </div>
              <div className="flex flex-col gap-0.5 flex-grow">
                <div className="text-[#575c64] text-sm font-bold font-pretendard">
                  {item.title}
                </div>
                {item.subtitle && (
                  <div className="text-[#7a828d] text-xs font-medium font-pretendard">
                    {item.subtitle}
                  </div>
                )}
              </div>
            </div>

            {/* Tag */}
            {item.tag && (
              <div className="px-2 py-0.5 bg-[#4880ee] rounded-full flex items-center justify-center">
                <span className="text-white text-xs"></span>
              </div>
            )}

            {/* Metadata */}
            <div className="flex flex-col gap-1 w-[193px]">
              {item.duration !== undefined && (
                <div className="flex items-center gap-1">
                  <Clock className="w-6 h-6 text-[#7a828d]" />
                  <div className="text-[#7a828d] text-xs font-medium font-pretendard">
                    {item.duration}분
                  </div>
                </div>
              )}
              {item.date && (
                <div className="flex items-center gap-1">
                  <Calendar className="w-6 h-6 text-[#7a828d]" />
                  <div className="text-[#7a828d] text-xs font-medium font-pretendard">
                    {formatDate(item.date)}
                  </div>
                </div>
              )}
            </div>

            {/* Status */}
            <div className="flex-grow h-[18px] flex items-start justify-end gap-2">
              {item.isCompleted && <Check className="w-6 h-6 text-[#7a828d]" />}
            </div>
          </div>
        ))}
      </div>
    );
  },
);

DataGrid.displayName = "DataGrid";

/**
 * Format a date to the format "YYYY. M. D"
 */
function formatDate(date: Date): string {
  return `${date.getFullYear()}. ${date.getMonth() + 1}. ${date.getDate()}`;
}

/**
 * DataGridDemo component to showcase the DataGrid component
 */
export const DataGridDemo = () => {
  const demoItems: DataGridItem[] = [
    {
      title: "Unit D",
      subtitle: "Unit A · Unit B · Unit C",
      duration: 3,
      date: new Date(2023, 8, 10), // September 10, 2023
      isCompleted: true,
      tag: "Tag",
    },
    {
      title: "Unit D",
      subtitle: "Unit A · Unit B · Unit C",
      duration: 3,
      date: new Date(2023, 8, 10),
      isCompleted: true,
      tag: "Tag",
    },
    {
      title: "Unit D",
      subtitle: "Unit A · Unit B · Unit C",
      duration: 3,
      date: new Date(2023, 8, 10),
      isCompleted: true,
      tag: "Tag",
    },
  ];

  return (
    <div className="w-full bg-white p-6">
      <h2 className="text-3xl font-bold font-mulish text-[#5c5c5c] mb-6">
        Data Grid
      </h2>

      <div className="space-y-8">
        {/* Basic Example */}
        <div>
          <h3 className="text-xl font-bold font-pretendard text-[#33373b] mb-4">
            Basic Example
          </h3>
          <DataGrid items={demoItems} />
        </div>

        {/* Wrapper */}
        <div>
          <h3 className="text-xl font-bold font-pretendard text-[#33373b] mb-4">
            Wrapper
          </h3>
          <div className="text-[#656d76] text-sm mb-4">
            Stroke: 1px, color_border_neutral
            <br />
            Bg: Elevation/surface
            <br />
            Radius: S
          </div>
          <DataGrid items={demoItems.slice(0, 1)} />
        </div>

        {/* Header */}
        <div>
          <h3 className="text-xl font-bold font-pretendard text-[#33373b] mb-4">
            Header
          </h3>
          <div className="text-[#656d76] text-sm mb-4">
            Leading Visual
            <br />
            Trailing Action
            <br />
            Height: 40px 고정
          </div>
          <div className="w-full bg-white rounded-xl border border-gray-200 overflow-hidden">
            <div className="px-4 py-1 bg-gray-100 flex justify-between items-center">
              <div className="text-[#575c64] text-sm font-medium font-pretendard">
                Leading Visual
              </div>
            </div>
          </div>
        </div>

        {/* Sub header */}
        <div>
          <h3 className="text-xl font-bold font-pretendard text-[#33373b] mb-4">
            Sub header
          </h3>
          <div className="text-[#656d76] text-sm mb-4">
            Border: border/neutral
            <br />
            BG: elevation/surface (Default)
            <br />
            Padding X: 16px
            <br />
            Padding Y: 8px
            <br />
            위치: Header 아래
            <br />
            개수: Max 1
          </div>
          <div className="w-full bg-white rounded-xl border border-gray-200 overflow-hidden">
            <div className="px-4 py-1 bg-gray-100 flex justify-between items-center">
              <div className="text-[#575c64] text-sm font-medium font-pretendard">
                Leading Visual
              </div>
            </div>
            <div className="px-4 py-2 bg-white border-b border-gray-200 flex items-center gap-2">
              <div className="text-[#575c64] text-sm font-medium font-pretendard">
                정답 200문제
              </div>
              <div className="text-[#575c64] text-sm font-medium font-pretendard">
                |
              </div>
              <div className="text-[#575c64] text-sm font-medium font-pretendard">
                소요 시간 3시간 39분
              </div>
            </div>
          </div>
        </div>

        {/* Row */}
        <div>
          <h3 className="text-xl font-bold font-pretendard text-[#33373b] mb-4">
            Row
          </h3>
          <div className="text-[#656d76] text-sm mb-4">
            Gutter: 8px
            <br />
            12 Columns
            <br />
            Height: hug
            <br />
            Padding Y: 16px
          </div>
          <DataGrid items={[demoItems[0]]} />
        </div>

        {/* Underline */}
        <div>
          <h3 className="text-xl font-bold font-pretendard text-[#33373b] mb-4">
            Underline
          </h3>
          <div className="text-[#656d76] text-sm mb-4">
            Stroke: 1px
            <br />
            Color: Border/neutral
          </div>
          <DataGrid items={demoItems.slice(0, 2)} />
        </div>
      </div>
    </div>
  );
};

export default DataGridDemo;
