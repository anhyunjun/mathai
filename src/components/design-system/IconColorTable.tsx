import React from "react";

interface IconToken {
  token: string;
  description: string;
  lightMode: {
    color: string;
    name: string;
  };
  darkMode?: {
    color: string;
    name: string;
  };
}

const IconColorTable: React.FC = () => {
  const iconTokens: IconToken[] = [
    {
      token: "color/icon/neutral",
      description:
        "e.g. tag, tab, radio, separate UI elements, such as flat cards or side panel dividers.",
      lightMode: {
        color: "#d1d5db",
        name: "Gray300",
      },
    },
    {
      token: "color/icon/neutral.bold",
      description:
        "e.g. tag, tab, radio, separate UI elements, such as flat cards or side panel dividers.",
      lightMode: {
        color: "#8d94a0",
        name: "Gray400",
      },
    },
    {
      token: "color/icon/neutral.bolder",
      description: "e.g. button",
      lightMode: {
        color: "#575c64",
        name: "Gray700",
      },
    },
    {
      token: "color/icon/accent.gray",
      description: "e.g. 힌트 버튼, 문제 저장 버튼, 하단 탭",
      lightMode: {
        color: "#33373b",
        name: "Gray900",
      },
    },
    {
      token: "color/icon/accent.blue.subtle",
      description: "e.g. 클래스 진단평가 복제 아이콘",
      lightMode: {
        color: "#abc5f7",
        name: "Blue200",
      },
    },
    {
      token: "color/icon/accent.blue",
      description: "e.g. button",
      lightMode: {
        color: "#4880ee",
        name: "Blue500",
      },
    },
    {
      token: "color/icon/accent.blue.bold",
      description: "e.g. link ic hovered, pressed",
      lightMode: {
        color: "#335ba9",
        name: "Blue700",
      },
    },
    {
      token: "color/icon/accent.green",
      description: "e.g. 정답 피드백",
      lightMode: {
        color: "#1fcca1",
        name: "Green500",
      },
    },
    {
      token: "color/icon/accent.yellow",
      description:
        "These colors are used as supporting secondary colors in backgrounds, text colors, seperators, models, etc.",
      lightMode: {
        color: "#ffc107",
        name: "Yellow500",
      },
    },
    {
      token: "color/icon/accent.red",
      description:
        "These colors are used as supporting secondary colors in backgrounds, text colors, seperators, models, etc.",
      lightMode: {
        color: "#f22735",
        name: "Red500",
      },
    },
    {
      token: "color/icon/inverse",
      description: "Use for borders on bold backgrounds.",
      lightMode: {
        color: "#ffffff",
        name: "White",
      },
    },
    {
      token: "color/icon/disabled",
      description: "e.g. btn, chip etc",
      lightMode: {
        color: "#8d94a0",
        name: "Gray400",
      },
    },
    {
      token: "color/icon/disabled.subtler",
      description: "e.g. btn, chip etc",
      lightMode: {
        color: "#e5e7eb",
        name: "Gray200",
      },
    },
    {
      token: "color/icon/selected.violet",
      description: "Use for borders of elements in a disabled state.",
      lightMode: {
        color: "#835eeb",
        name: "Violet500",
      },
    },
    {
      token: "color/icon/selected",
      description: "tab selected 상태",
      lightMode: {
        color: "#33373b",
        name: "Gray900",
      },
    },
    {
      token: "color/icon/primary.subtle",
      description: "Use for borders of elements in a disabled state.",
      lightMode: {
        color: "#c6b5f6",
        name: "Violet300",
      },
    },
    {
      token: "color/icon/primary",
      description: "Use for borders of elements in a disabled state.",
      lightMode: {
        color: "#835eeb",
        name: "Violet500",
      },
    },
    {
      token: "color/icon/primary.bold",
      description: "Use for borders of elements in a disabled state.",
      lightMode: {
        color: "#5d43a7",
        name: "Violet700",
      },
    },
    {
      token: "color/icon/success",
      description:
        "Use for borders communicating a favorable outcome, such as the borders on validated text fields.",
      lightMode: {
        color: "#1fcca1",
        name: "Green500",
      },
    },
    {
      token: "color/icon/warning",
      description:
        "Use for borders communicating a favorable outcome, such as the borders on validated text fields.",
      lightMode: {
        color: "#ffc107",
        name: "Yellow500",
      },
    },
    {
      token: "color/icon/danger",
      description:
        "Use for borders communicating critical information, such as the borders on invalid text fields.",
      lightMode: {
        color: "#f22735",
        name: "Red500",
      },
    },
  ];

  return (
    <div className="w-full bg-white">
      <div className="text-[#33373b] text-[28px] font-bold leading-[42px] mb-8">
        Icon
      </div>
      <div className="w-full shadow-[inset_0px_0px_0px_1px_rgba(224,224,224,1.00)] overflow-hidden">
        {/* Table Header */}
        <div className="flex border-b border-[#e0e0e0]">
          <div className="flex-1 p-4 bg-white border-r border-[#e0e0e0]">
            <div className="text-[#161616] text-base font-semibold leading-snug">
              Token
            </div>
          </div>
          <div className="flex-1 p-4 bg-white border-r border-[#e0e0e0]">
            <div className="text-[#161616] text-base font-semibold leading-snug">
              Light Mode
            </div>
          </div>
          <div className="flex-1 p-4 bg-white border-r border-[#e0e0e0]">
            <div className="text-[#161616] text-base font-semibold leading-snug">
              Dark Mode
            </div>
          </div>
        </div>

        {/* Table Rows */}
        {iconTokens.map((token, index) => (
          <div key={index} className="flex border-b border-[#e0e0e0]">
            {/* Token Column */}
            <div className="flex-1 p-4 bg-white border-r border-[#e0e0e0]">
              <div className="p-1 bg-gray-100 rounded inline-block">
                <div className="text-[#161616] text-sm font-normal font-['IBM_Plex_Sans'] leading-[18px] tracking-tight">
                  {token.token}
                </div>
              </div>
              <div className="text-[#7a828d] text-base font-normal leading-normal mt-2">
                {token.description}
              </div>
            </div>

            {/* Light Mode Column */}
            <div className="flex-1 p-4 bg-white border-r border-[#e0e0e0] flex flex-col justify-center items-start">
              <div
                className="w-[100px] h-[45px] rounded"
                style={{ backgroundColor: token.lightMode.color }}
              ></div>
              <div className="text-[#161616] text-sm font-normal font-['IBM_Plex_Sans'] leading-[18px] tracking-tight mt-2">
                {token.lightMode.name}
              </div>
            </div>

            {/* Dark Mode Column */}
            <div className="flex-1 p-4 bg-white border-r border-[#e0e0e0]">
              {token.darkMode && (
                <>
                  <div
                    className="w-[100px] h-[45px] rounded"
                    style={{ backgroundColor: token.darkMode.color }}
                  ></div>
                  <div className="text-[#161616] text-sm font-normal font-['IBM_Plex_Sans'] leading-[18px] tracking-tight mt-2">
                    {token.darkMode.name}
                  </div>
                </>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default IconColorTable;
