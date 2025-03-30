import React from "react";

interface ColorToken {
  token: string;
  description?: string;
  lightMode: {
    color: string;
    opacity: number;
    name: string;
  };
  darkMode?: {
    color: string;
    opacity: number;
    name: string;
  };
}

const DimColorTable: React.FC = () => {
  const colorTokens: ColorToken[] = [
    {
      token: "color/dim",
      description: "e.g. 모달 배경, 강의 플레이어 배경 등",
      lightMode: {
        color: "#33373b",
        opacity: 0.6,
        name: "Black - 60%",
      },
    },
  ];

  return (
    <div className="w-full bg-white">
      <div className="text-[#33373b] text-[28px] font-bold leading-[42px] mb-8">
        Dim
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
              <div className="flex flex-col gap-2">
                <div className="relative w-[100px] h-[45px]">
                  <div
                    className="w-[100px] h-[45px] absolute top-0 left-0 rounded"
                    style={{
                      backgroundColor: token.lightMode.color,
                      opacity: token.lightMode.opacity,
                    }}
                  ></div>
                </div>
                <div
                  className="w-[100px] h-[45px] rounded"
                  style={{
                    backgroundColor: token.lightMode.color,
                    opacity: token.lightMode.opacity,
                  }}
                ></div>
              </div>
              <div className="text-[#161616] text-sm font-normal leading-[18px] tracking-tight mt-2">
                {token.lightMode.name}
              </div>
            </div>

            {/* Dark Mode Column */}
            <div className="flex-1 p-4 bg-white border-r border-gray-200">
              {token.darkMode && (
                <>
                  <div className="flex flex-col gap-2">
                    <div
                      className="w-[100px] h-[45px] rounded"
                      style={{
                        backgroundColor: token.darkMode.color,
                        opacity: token.darkMode.opacity,
                      }}
                    ></div>
                    <div
                      className="w-[100px] h-[45px] rounded"
                      style={{
                        backgroundColor: token.darkMode.color,
                        opacity: token.darkMode.opacity,
                      }}
                    ></div>
                  </div>
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

export default DimColorTable;
