import React from "react";

interface ColorToken {
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

const ColorTextTable: React.FC = () => {
  const colorTokens: ColorToken[] = [
    {
      token: "color/text/primary",
      description: "Primary text color for headings and important content",
      lightMode: {
        color: "#835eeb",
        name: "Violet500",
      },
    },
    {
      token: "color/text/accent.blue",
      description:
        "These colors are used as supporting secondary colors in backgrounds, text colors, seperators, models, etc.",
      lightMode: {
        color: "#4880ee",
        name: "Blue500",
      },
    },
    {
      token: "color/text/accent.green",
      description: "Used for correct answer feedback and improved rankings",
      lightMode: {
        color: "#1fcca1",
        name: "Green500",
      },
    },
    {
      token: "color/text/accent.yellow",
      description: "Used for warnings and decreased rankings",
      lightMode: {
        color: "#ffc107",
        name: "Yellow500",
      },
    },
    {
      token: "color/text/accent.red",
      description: "Used for incorrect answer feedback and errors",
      lightMode: {
        color: "#f22735",
        name: "Red500",
      },
    },
    {
      token: "color/text/weak",
      description: "Used for less important text elements",
      lightMode: {
        color: "#d1d5db",
        name: "Gray300",
      },
    },
    {
      token: "color/text/neutral.subtlest",
      description:
        "Use for tertiary text, input field placeholder and helper text.",
      lightMode: {
        color: "#8d94a0",
        name: "Gray400",
      },
    },
    {
      token: "color/text/neutral.subtler",
      description:
        "Use for secondary text, such as navigation, subtle button links, input field labels, and all caps subheadings.",
      lightMode: {
        color: "#7a828d",
        name: "Gray500",
      },
    },
    {
      token: "color/text/neutral.subtle",
      description: "e.g. button",
      lightMode: {
        color: "#575c64",
        name: "Gray700",
      },
    },
    {
      token: "color/text/neutral",
      description:
        "These colors are used as supporting secondary colors in backgrounds, text colors, seperators, models, etc.",
      lightMode: {
        color: "#33373b",
        name: "Gray900",
      },
    },
    {
      token: "color/text/inverse",
      description: "Use for text on bold backgrounds",
      lightMode: {
        color: "#ffffff",
        name: "White",
      },
    },
    {
      token: "color/text/inverse.subtle",
      description: "Use for text on bold backgrounds",
      lightMode: {
        color: "#e5e7eb",
        name: "Gray200",
      },
    },
    {
      token: "color/text/inverse.subtler",
      description: "Use for text on bold backgrounds",
      lightMode: {
        color: "#d1d5db",
        name: "Gray300",
      },
    },
    {
      token: "color/text/disabled",
      description: "Use for text on bold backgrounds",
      lightMode: {
        color: "#8d94a0",
        name: "Gray400",
      },
    },
    {
      token: "color/text/success",
      description:
        "Use for text to communicate a favorable outcome, such as input field success messaging.",
      lightMode: {
        color: "#1fcca1",
        name: "Green500",
      },
    },
    {
      token: "color/text/warning",
      description:
        "Use for text to emphasize caution, such as in moved lozenges.",
      lightMode: {
        color: "#ffc107",
        name: "Yellow500",
      },
    },
    {
      token: "color/text/danger",
      description:
        "Use for text to emphasize caution, such as in moved lozenges.",
      lightMode: {
        color: "#f22735",
        name: "Red500",
      },
    },
    {
      token: "color/text/selected",
      description: "Used for selected tab states and active elements",
      lightMode: {
        color: "#33373b",
        name: "Gray900",
      },
    },
  ];

  return (
    <div className="w-full bg-white">
      <div className="text-[#33373b] text-[28px] font-bold leading-[42px] mb-8">
        Text
      </div>
      <div className="w-full shadow-[inset_0px_0px_0px_1px_rgba(224,224,224,1.00)] overflow-hidden">
        {/* Table Header */}
        <div className="flex border-b border-gray-200">
          <div className="flex-1 p-4 bg-white border-r border-gray-200">
            <div className="text-[#161616] text-base font-semibold leading-snug">
              Token
            </div>
          </div>
          <div className="flex-1 p-4 bg-white border-r border-gray-200">
            <div className="text-[#161616] text-base font-semibold leading-snug">
              Light Mode
            </div>
          </div>
          <div className="flex-1 p-4 bg-white border-r border-gray-200">
            <div className="text-[#161616] text-base font-semibold leading-snug">
              Dark Mode
            </div>
          </div>
        </div>

        {/* Table Rows */}
        {colorTokens.map((token, index) => (
          <div key={index} className="flex border-b border-gray-200">
            {/* Token Column */}
            <div className="flex-1 p-4 bg-white border-r border-gray-200">
              <div className="p-1 bg-gray-100 rounded inline-block">
                <div className="text-[#161616] text-sm font-normal leading-[18px] tracking-tight">
                  {token.token}
                </div>
              </div>
              <div className="text-[#7a828d] text-base font-normal leading-normal mt-2">
                {token.description}
              </div>
            </div>

            {/* Light Mode Column */}
            <div className="flex-1 p-4 bg-white border-r border-gray-200 flex flex-col justify-center items-start">
              <div
                className="w-[100px] h-[45px] rounded"
                style={{ backgroundColor: token.lightMode.color }}
              ></div>
              <div className="text-[#161616] text-sm font-normal leading-[18px] tracking-tight mt-2">
                {token.lightMode.name}
              </div>
            </div>

            {/* Dark Mode Column */}
            <div className="flex-1 p-4 bg-white border-r border-gray-200">
              {token.darkMode && (
                <>
                  <div
                    className="w-[100px] h-[45px] rounded"
                    style={{ backgroundColor: token.darkMode.color }}
                  ></div>
                  <div className="text-[#161616] text-sm font-normal leading-[18px] tracking-tight mt-2">
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

export default ColorTextTable;
