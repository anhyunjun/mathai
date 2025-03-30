import React from "react";

interface ColorToken {
  token: string;
  description?: string;
  lightMode: {
    color: string;
    name: string;
  };
  darkMode?: {
    color: string;
    name: string;
  };
}

const ScaleColorTable: React.FC = () => {
  const colorTokens: ColorToken[] = [
    // Violet scale
    {
      token: "color/scale/violet.0",
      lightMode: {
        color: "#f3effd",
        name: "violet50",
      },
    },
    {
      token: "color/scale/violet.1",
      lightMode: {
        color: "#e8e1fb",
        name: "violet100",
      },
    },
    {
      token: "color/scale/violet.2",
      lightMode: {
        color: "#d9cdf9",
        name: "violet200",
      },
    },
    {
      token: "color/scale/violet.3",
      lightMode: {
        color: "#c6b5f6",
        name: "violet300",
      },
    },
    {
      token: "color/scale/violet.4",
      lightMode: {
        color: "#9c7eef",
        name: "violet400",
      },
    },
    {
      token: "color/scale/violet.5",
      lightMode: {
        color: "#835eeb",
        name: "violet500",
      },
    },
    {
      token: "color/scale/violet.6",
      lightMode: {
        color: "#7756d6",
        name: "violet600",
      },
    },
    {
      token: "color/scale/violet.7",
      lightMode: {
        color: "#5d43a7",
        name: "violet700",
      },
    },
    {
      token: "color/scale/violet.8",
      lightMode: {
        color: "#483481",
        name: "violet800",
      },
    },
    {
      token: "color/scale/violet.9",
      lightMode: {
        color: "#372763",
        name: "violet900",
      },
    },
    // Gray scale
    {
      token: "color/scale/gray.0",
      lightMode: {
        color: "#f9fafb",
        name: "gray50",
      },
    },
    {
      token: "color/scale/gray.1",
      lightMode: {
        color: "#f3f4f6",
        name: "gray100",
      },
    },
    {
      token: "color/scale/gray.2",
      lightMode: {
        color: "#e5e7eb",
        name: "gray200",
      },
    },
    {
      token: "color/scale/gray.3",
      lightMode: {
        color: "#d1d5db",
        name: "gray300",
      },
    },
    {
      token: "color/scale/gray.4",
      lightMode: {
        color: "#8d94a0",
        name: "gray400",
      },
    },
    {
      token: "color/scale/gray.5",
      lightMode: {
        color: "#7a828d",
        name: "gray500",
      },
    },
    {
      token: "color/scale/gray.6",
      lightMode: {
        color: "#6f7680",
        name: "gray600",
      },
    },
    {
      token: "color/scale/gray.7",
      lightMode: {
        color: "#575c64",
        name: "gray700",
      },
    },
    {
      token: "color/scale/gray.8",
      lightMode: {
        color: "#43484e",
        name: "gray800",
      },
    },
    {
      token: "color/scale/gray.9",
      lightMode: {
        color: "#33373b",
        name: "gray900",
      },
    },
    // Blue scale
    {
      token: "color/scale/blue.0",
      lightMode: {
        color: "#edf2fd",
        name: "blue50",
      },
    },
    {
      token: "color/scale/blue.1",
      lightMode: {
        color: "#c6d8fa",
        name: "blue100",
      },
    },
    {
      token: "color/scale/blue.2",
      lightMode: {
        color: "#abc5f7",
        name: "blue200",
      },
    },
    {
      token: "color/scale/blue.3",
      lightMode: {
        color: "#84aaf4",
        name: "blue300",
      },
    },
    {
      token: "color/scale/blue.4",
      lightMode: {
        color: "#6d99f1",
        name: "blue400",
      },
    },
    {
      token: "color/scale/blue.5",
      lightMode: {
        color: "#4880ee",
        name: "blue500",
      },
    },
    {
      token: "color/scale/blue.6",
      lightMode: {
        color: "#4274d9",
        name: "blue600",
      },
    },
    {
      token: "color/scale/blue.7",
      lightMode: {
        color: "#335ba9",
        name: "blue700",
      },
    },
    {
      token: "color/scale/blue.8",
      lightMode: {
        color: "#284683",
        name: "blue800",
      },
    },
    {
      token: "color/scale/blue.9",
      lightMode: {
        color: "#1e3664",
        name: "gray900",
      },
    },
    // Green scale
    {
      token: "color/scale/green.0",
      lightMode: {
        color: "#e9faf6",
        name: "green50",
      },
    },
    {
      token: "color/scale/green.1",
      lightMode: {
        color: "#baefe2",
        name: "green100",
      },
    },
    {
      token: "color/scale/green.2",
      lightMode: {
        color: "#98e8d4",
        name: "green200",
      },
    },
    {
      token: "color/scale/green.3",
      lightMode: {
        color: "#69ddc0",
        name: "green300",
      },
    },
    {
      token: "color/scale/green.4",
      lightMode: {
        color: "#4cd6b4",
        name: "green400",
      },
    },
    {
      token: "color/scale/green.5",
      lightMode: {
        color: "#1fcca1",
        name: "green500",
      },
    },
    {
      token: "color/scale/green.6",
      lightMode: {
        color: "#1cba93",
        name: "green600",
      },
    },
    {
      token: "color/scale/green.7",
      lightMode: {
        color: "#169172",
        name: "green700",
      },
    },
    {
      token: "color/scale/green.8",
      lightMode: {
        color: "#117059",
        name: "green800",
      },
    },
    {
      token: "color/scale/green.9",
      lightMode: {
        color: "#0d5644",
        name: "green900",
      },
    },
    // Pink scale
    {
      token: "color/scale/pink.0",
      lightMode: {
        color: "#fcf2fd",
        name: "fuchsiapink50",
      },
    },
    {
      token: "color/scale/pink.1",
      lightMode: {
        color: "#f5d6f8",
        name: "fuchsiapink100",
      },
    },
    {
      token: "color/scale/pink.2",
      lightMode: {
        color: "#f0c2f4",
        name: "fuchsiapink200",
      },
    },
    {
      token: "color/scale/pink.3",
      lightMode: {
        color: "#e9a7ef",
        name: "fuchsiapink300",
      },
    },
    {
      token: "color/scale/pink.4",
      lightMode: {
        color: "#e595ec",
        name: "fuchsiapink400",
      },
    },
    {
      token: "color/scale/pink.5",
      lightMode: {
        color: "#de7be7",
        name: "fuchsiapink500",
      },
    },
    {
      token: "color/scale/pink.6",
      lightMode: {
        color: "#ca70d2",
        name: "fuchsiapink600",
      },
    },
    {
      token: "color/scale/pink.7",
      lightMode: {
        color: "#9e57a4",
        name: "fuchsiapink700",
      },
    },
    {
      token: "color/scale/pink.8",
      lightMode: {
        color: "#7a447f",
        name: "fuchsiapink800",
      },
    },
    {
      token: "color/scale/pink.9",
      lightMode: {
        color: "#5d3461",
        name: "fuchsiapink900",
      },
    },
    // Skyblue scale
    {
      token: "color/scale/skyblue.0",
      lightMode: {
        color: "#eff9fd",
        name: "skyblue50",
      },
    },
    {
      token: "color/scale/skyblue.1",
      lightMode: {
        color: "#cfedf8",
        name: "skyblue100",
      },
    },
    {
      token: "color/scale/skyblue.2",
      lightMode: {
        color: "#b7e4f5",
        name: "skyblue200",
      },
    },
    {
      token: "color/scale/skyblue.3",
      lightMode: {
        color: "#96d8f1",
        name: "skyblue300",
      },
    },
    {
      token: "color/scale/skyblue.4",
      lightMode: {
        color: "#82d1ee",
        name: "skyblue400",
      },
    },
    {
      token: "color/scale/skyblue.5",
      lightMode: {
        color: "#63c5ea",
        name: "skyblue500",
      },
    },
    {
      token: "color/scale/skyblue.6",
      lightMode: {
        color: "#5ab3d5",
        name: "skyblue600",
      },
    },
    {
      token: "color/scale/skyblue.7",
      lightMode: {
        color: "#468ca6",
        name: "skyblue700",
      },
    },
    {
      token: "color/scale/skyblue.8",
      lightMode: {
        color: "#366c81",
        name: "skyblue800",
      },
    },
    {
      token: "color/scale/skyblue.9",
      lightMode: {
        color: "#2a5362",
        name: "skyblue900",
      },
    },
    // Red scale
    {
      token: "color/scale/red.0",
      lightMode: {
        color: "#fdf0f0",
        name: "fuchsiapink50",
      },
    },
    {
      token: "color/scale/red.1",
      lightMode: {
        color: "#f9cfcf",
        name: "indianred100",
      },
    },
    {
      token: "color/scale/red.2",
      lightMode: {
        color: "#f6b8b8",
        name: "indianred200",
      },
    },
    {
      token: "color/scale/red.3",
      lightMode: {
        color: "#f29898",
        name: "indianred300",
      },
    },
    {
      token: "color/scale/red.4",
      lightMode: {
        color: "#f08484",
        name: "indianred400",
      },
    },
    {
      token: "color/scale/red.5",
      lightMode: {
        color: "#ec6565",
        name: "indianred500",
      },
    },
    {
      token: "color/scale/red.6",
      lightMode: {
        color: "#d75c5c",
        name: "indianred600",
      },
    },
    {
      token: "color/scale/red.7",
      lightMode: {
        color: "#a84848",
        name: "indianred700",
      },
    },
    {
      token: "color/scale/red.8",
      lightMode: {
        color: "#823838",
        name: "indianred800",
      },
    },
    {
      token: "color/scale/red.9",
      lightMode: {
        color: "#632a2a",
        name: "indianred900",
      },
    },
    // Yellow scale
    {
      token: "color/scale/yellow.0",
      lightMode: {
        color: "#fef9ee",
        name: "mustardyellow50",
      },
    },
    {
      token: "color/scale/yellow.1",
      lightMode: {
        color: "#fcebcc",
        name: "mustardyellow100",
      },
    },
    {
      token: "color/scale/yellow.2",
      lightMode: {
        color: "#fae2b3",
        name: "mustardyellow200",
      },
    },
    {
      token: "color/scale/yellow.3",
      lightMode: {
        color: "#f8d490",
        name: "mustardyellow300",
      },
    },
    {
      token: "color/scale/yellow.4",
      lightMode: {
        color: "#f7cc7a",
        name: "mustardyellow400",
      },
    },
    {
      token: "color/scale/yellow.5",
      lightMode: {
        color: "#f5bf59",
        name: "mustardyellow500",
      },
    },
    {
      token: "color/scale/yellow.6",
      lightMode: {
        color: "#dfae51",
        name: "mustardyellow600",
      },
    },
    {
      token: "color/scale/yellow.7",
      lightMode: {
        color: "#ae883f",
        name: "mustardyellow700",
      },
    },
    {
      token: "color/scale/yellow.8",
      lightMode: {
        color: "#876931",
        name: "mustardyellow800",
      },
    },
    {
      token: "color/scale/yellow.9",
      lightMode: {
        color: "#675025",
        name: "mustardyellow900",
      },
    },
  ];

  return (
    <div className="w-full bg-white">
      <div className="text-[#33373b] text-[28px] font-bold leading-[42px] mb-8">
        Scale
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
              {token.description && (
                <div className="text-[#7a828d] text-base font-normal leading-normal mt-2">
                  {token.description}
                </div>
              )}
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

export default ScaleColorTable;
