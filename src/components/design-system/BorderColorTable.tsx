import React from "react";

interface BorderToken {
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

const BorderColorTable: React.FC = () => {
  const borderTokens: BorderToken[] = [
    {
      token: "color/border/neutral.subtle",
      description: "e.g. card",
      lightMode: {
        color: "#f3f4f6",
        name: "Gray100",
      },
    },
    {
      token: "color/border/neutral",
      description:
        "e.g. tag, tab, radio, separate UI elements, such as flat cards or side panel dividers.",
      lightMode: {
        color: "#e5e7eb",
        name: "Gray200",
      },
    },
    {
      token: "color/border/neutral.bolder",
      description: "e.g. btn, chip etc",
      lightMode: {
        color: "#d1d5db",
        name: "Gray300",
      },
    },
    {
      token: "color/border/input",
      description: "e.g. input field",
      lightMode: {
        color: "#e5e7eb",
        name: "Gray200",
      },
    },
    {
      token: "color/border/inverse",
      description: "Use for borders on bold backgrounds.",
      lightMode: {
        color: "rgba(255, 255, 255, 0.1)",
        name: "White - 10%",
      },
    },
    {
      token: "color/border/selected",
      description:
        "e.g. tag, tab, radio, separate UI elements, such as flat cards or side panel dividers.",
      lightMode: {
        color: "#33373b",
        name: "Gray900",
      },
    },
    {
      token: "color/border/disabled",
      description: "Use for borders of elements in a disabled state.",
      lightMode: {
        color: "#f3f4f6",
        name: "Gray100",
      },
    },
    {
      token: "color/border/primary",
      description: "e.g. btn, chip etc",
      lightMode: {
        color: "#835eeb",
        name: "Violet500",
      },
    },
    {
      token: "color/border/hovered",
      description: "Use for focus rings of elements in a focus state.",
      lightMode: {
        color: "#84aaf4",
        name: "Blue300",
      },
    },
    {
      token: "color/border/focused",
      description:
        "Used when an element is selected with tab key, e.g. input field",
      lightMode: {
        color: "#4880ee",
        name: "Blue500",
      },
    },
    {
      token: "color/border/danger",
      description:
        "Use for borders communicating critical information, such as the borders on invalid text fields.",
      lightMode: {
        color: "#f22735",
        name: "Red500",
      },
    },
    {
      token: "color/border/success",
      description:
        "Use for borders communicating a favorable outcome, such as the borders on validated text fields.",
      lightMode: {
        color: "#1fcca1",
        name: "Green500",
      },
    },
    {
      token: "color/border/accent.blue",
      description: "e.g. chip",
      lightMode: {
        color: "#4880ee",
        name: "Blue500",
      },
    },
  ];

  return (
    <div className="w-full bg-white">
      <div className="text-[#33373b] text-[28px] font-bold leading-[42px] mb-8">
        Border
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
        {borderTokens.map((token, index) => (
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

export default BorderColorTable;
