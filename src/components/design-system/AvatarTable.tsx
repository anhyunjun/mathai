import React, { useState } from "react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../ui/tooltip";

interface AvatarRowProps {
  size: string;
  pixelSize: string;
  avatarSize: number;
}

/**
 * AvatarRow component displays a single row in the avatar size table
 */
const AvatarRow: React.FC<AvatarRowProps> = ({
  size,
  pixelSize,
  avatarSize,
}) => {
  return (
    <div className="flex items-center mb-4">
      <div className="w-16 text-[#33373b] text-sm font-normal font-pretendard leading-[21px]">
        {size}
      </div>
      <div className="w-24 flex justify-center items-center">
        <div
          className="rounded-full overflow-hidden flex justify-center items-center"
          style={{ width: avatarSize, height: avatarSize }}
        >
          <img
            src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${size}`}
            alt={`${size} avatar`}
            className="w-full h-full object-cover"
          />
        </div>
      </div>
      <div className="ml-4 text-[#33373b] text-sm font-medium font-pretendard leading-[21px]">
        {pixelSize}
      </div>
    </div>
  );
};

interface AvatarGroupProps {
  size?: "xxs" | "xs" | "s" | "m" | "l" | "xl" | "xxl" | "xxxl";
  avatars?: string[];
  maxDisplay?: number;
  showTooltip?: boolean;
  border?: string;
  lineBreak?: boolean;
}

/**
 * AvatarGroup component displays a group of avatars with configurable options
 */
export const AvatarGroup: React.FC<AvatarGroupProps> = ({
  size = "s",
  avatars = ["john", "sarah", "mike", "emma", "alex"],
  maxDisplay = 5,
  showTooltip = false,
  border = "neutral",
  lineBreak = false,
}) => {
  const sizeMap = {
    xxs: 16,
    xs: 20,
    s: 24,
    m: 28,
    l: 32,
    xl: 40,
    xxl: 48,
    xxxl: 64,
  };

  const avatarSize = sizeMap[size];
  const displayAvatars = avatars.slice(0, maxDisplay);
  const [hoveredAvatar, setHoveredAvatar] = useState<string | null>(null);

  return (
    <div className="flex items-center">
      <div
        className={`flex ${lineBreak ? "flex-wrap" : "flex-nowrap"} items-center`}
      >
        {displayAvatars.map((avatar, index) => (
          <div
            key={index}
            className="flex items-center"
            style={{ marginLeft: index > 0 ? -4 : 0 }}
          >
            {showTooltip ? (
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <div
                      className={`rounded-full overflow-hidden border-2 border-[#e5e5e5] bg-white`}
                      style={{ width: avatarSize, height: avatarSize }}
                      onMouseEnter={() => setHoveredAvatar(avatar)}
                      onMouseLeave={() => setHoveredAvatar(null)}
                    >
                      <img
                        src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${avatar}`}
                        alt={`${avatar}'s avatar`}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </TooltipTrigger>
                  <TooltipContent className="bg-[#33373b] text-white px-3 py-2 rounded-lg">
                    {avatar}
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            ) : (
              <div
                className={`rounded-full overflow-hidden border-2 border-[#e5e5e5] bg-white`}
                style={{ width: avatarSize, height: avatarSize }}
              >
                <img
                  src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${avatar}`}
                  alt={`${avatar}'s avatar`}
                  className="w-full h-full object-cover"
                />
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

/**
 * AvatarTable component displays a table of avatar sizes with their pixel values
 * and showcases different avatar group variants
 */
const AvatarTable: React.FC = () => {
  const avatarSizes = [
    { size: "xxs", pixelSize: "16px", avatarSize: 16 },
    { size: "xs", pixelSize: "20px", avatarSize: 20 },
    { size: "s", pixelSize: "24px", avatarSize: 24 },
    { size: "m", pixelSize: "28px", avatarSize: 28 },
    { size: "l", pixelSize: "32px", avatarSize: 32 },
    { size: "xl", pixelSize: "40px", avatarSize: 40 },
    { size: "xxl", pixelSize: "48px", avatarSize: 48 },
    { size: "xxxl", pixelSize: "64px", avatarSize: 64 },
  ];

  return (
    <div className="w-full bg-white">
      <div className="p-6">
        <h2 className="text-[#1f2328] text-7xl font-semibold font-pretendard leading-[80px] tracking-wide mb-16">
          Avatars Group
        </h2>

        <div className="border-t border-[#d0d7de] my-8"></div>

        <h3 className="text-[#1f2328] text-base font-semibold font-pretendard leading-normal mb-8">
          Avatar Group
        </h3>

        <div className="p-24 rounded-lg border border-[#d0d7de] flex justify-center items-center mb-8">
          <AvatarGroup />
        </div>

        <div className="flex items-start gap-12 mb-8">
          <div className="flex-col">
            <h4 className="text-[#1f2328] text-base font-semibold font-pretendard leading-normal mb-2">
              Size
            </h4>
            <p className="w-[260px] text-[#656d76] text-sm font-normal font-pretendard leading-tight">
              S (24px)
              <br />
              사이즈는 추가될 수 있음
            </p>
          </div>

          <div className="pt-20 pb-14 rounded-lg border border-gray-200 flex-col justify-end items-center gap-[46px] inline-flex">
            <AvatarGroup size="s" />
            <div className="text-center text-[#656d76] text-xs font-normal font-pretendard leading-[18px]">
              S
            </div>
          </div>
        </div>

        <div className="flex items-start gap-12 mb-8">
          <div className="flex-col">
            <h4 className="text-[#1f2328] text-base font-semibold font-pretendard leading-normal mb-2">
              Line Break
            </h4>
            <p className="w-[260px] text-[#656d76] text-sm font-normal font-pretendard leading-tight">
              화면 / 컨테이너 사이즈가 줄어도 라인 브레이크가 되지 않음
            </p>
          </div>

          <div className="pt-20 pb-14 rounded-lg border border-gray-200 flex-col justify-end items-center gap-[46px] inline-flex">
            <AvatarGroup lineBreak={false} />
            <div className="text-center text-[#656d76] text-xs font-normal font-pretendard leading-[18px]">
              Line Break X
            </div>
          </div>
        </div>

        <div className="flex items-start gap-12 mb-8">
          <div className="flex-col">
            <h4 className="text-[#1f2328] text-base font-semibold font-pretendard leading-normal mb-2">
              Tooltip
            </h4>
            <p className="w-[260px] text-[#656d76] text-sm font-normal font-pretendard leading-tight">
              아바타에 호버한 경우, 툴팁이 노출됨
            </p>
          </div>

          <div className="h-56 relative rounded-lg border border-gray-200 flex items-center justify-center">
            <AvatarGroup showTooltip={true} />
            <div className="absolute bottom-4 text-center text-[#656d76] text-xs font-normal font-pretendard leading-[18px]">
              Tooltip
            </div>
          </div>
        </div>

        <div className="flex items-start gap-12">
          <div className="flex-col">
            <h4 className="text-[#1f2328] text-base font-semibold font-pretendard leading-normal mb-2">
              Border
            </h4>
            <p className="w-[260px] text-[#656d76] text-sm font-normal font-pretendard leading-tight">
              Border 컬러는 Color/Border에 지정되어 있는 컬러를 사용할 수 있음{" "}
              <br />
              하나의 아바타 그룹은 하나의 보더 컬러를 갖음
              <br />
              Default: Color/border/neutral
            </p>
          </div>

          <div className="pt-20 pb-[51px] rounded-lg border border-gray-200 flex-col justify-end items-center gap-[51px] inline-flex">
            <AvatarGroup border="neutral" />
            <div className="text-center text-[#656d76] text-xs font-normal font-pretendard leading-[18px]">
              Border
            </div>
          </div>
        </div>

        <div className="w-full mt-8">
          <h3 className="text-[#33373b] text-base font-bold font-pretendard leading-normal mb-8">
            Size
          </h3>
          <div className="w-96 p-4 border border-[#9747ff] rounded-[5px]">
            {avatarSizes.map((item, index) => (
              <AvatarRow
                key={index}
                size={item.size}
                pixelSize={item.pixelSize}
                avatarSize={item.avatarSize}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AvatarTable;
