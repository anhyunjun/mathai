import React from "react";

interface RoundingItemProps {
  token: string;
  value: string;
  roundingClass: string;
}

/**
 * Individual row in the rounding table
 */
const RoundingItem: React.FC<RoundingItemProps> = ({
  token,
  value,
  roundingClass,
}) => {
  return (
    <div className="w-full shadow-[inset_0px_1px_0px_0px_rgba(224,224,224,1.00)] justify-start items-start inline-flex">
      <div className="w-[275px] self-stretch p-4 bg-white shadow-[inset_1px_0px_0px_0px_rgba(224,224,224,1.00)] flex-col justify-start items-start gap-2 inline-flex">
        <div className="p-1 bg-gray-100 rounded justify-start items-start gap-2.5 inline-flex">
          <div className="text-[#161616] text-sm font-normal font-mono leading-[18px] tracking-tight">
            {token}
          </div>
        </div>
      </div>
      <div className="grow shrink basis-0 self-stretch p-4 bg-white shadow-[inset_1px_0px_0px_0px_rgba(224,224,224,1.00)] justify-start items-center gap-4 flex">
        <div className="w-32 text-[#161616] text-sm font-normal font-pretendard leading-[21px]">
          {value}
        </div>
        <div className={`w-[105px] h-12 bg-[#f3effd] ${roundingClass}`}></div>
      </div>
    </div>
  );
};

/**
 * RoundingTable component displays border radius tokens and their visual representation
 */
const RoundingTable: React.FC = () => {
  // Array of rounding values to display in the table
  const roundingItems: RoundingItemProps[] = [
    { token: "radius/none", value: "0px", roundingClass: "" },
    { token: "radius/xxs", value: "4px", roundingClass: "rounded" },
    { token: "radius/xs", value: "8px", roundingClass: "rounded-lg" },
    { token: "radius/s", value: "12px", roundingClass: "rounded-xl" },
    { token: "radius/m", value: "16px", roundingClass: "rounded-2xl" },
    { token: "radius/l", value: "20px", roundingClass: "rounded-[20px]" },
    { token: "radius/xl", value: "24px", roundingClass: "rounded-3xl" },
    { token: "radius/xxl", value: "32px", roundingClass: "rounded-[32px]" },
    { token: "radius/full", value: "9999px", roundingClass: "rounded-full" },
  ];

  return (
    <div className="w-full bg-white flex-col justify-start items-center inline-flex">
      <div className="self-stretch flex-col justify-start items-start gap-8 inline-flex">
        <div className="border-r border-b border-[#e0e0e0] flex-col justify-start items-start flex">
          {/* Table Header */}
          <div className="self-stretch shadow-[inset_0px_1px_0px_0px_rgba(224,224,224,1.00)] justify-start items-start inline-flex">
            <div className="w-[275px] self-stretch p-4 bg-white shadow-[inset_1px_0px_0px_0px_rgba(224,224,224,1.00)] flex-col justify-start items-start gap-2 inline-flex">
              <div className="self-stretch text-[#161616] text-base font-semibold font-pretendard leading-snug">
                Token
              </div>
            </div>
            <div className="grow shrink basis-0 self-stretch p-4 bg-white shadow-[inset_1px_0px_0px_0px_rgba(224,224,224,1.00)] flex-col justify-start items-start gap-2 inline-flex">
              <div className="self-stretch text-[#161616] text-base font-semibold font-pretendard leading-snug">
                Rounding
              </div>
            </div>
          </div>

          {/* Table Rows */}
          {roundingItems.map((item, index) => (
            <RoundingItem
              key={index}
              token={item.token}
              value={item.value}
              roundingClass={item.roundingClass}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default RoundingTable;
