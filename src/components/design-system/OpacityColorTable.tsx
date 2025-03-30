import React from "react";

interface OpacityToken {
  token: string;
  description?: string;
  lightMode: {
    opacity: number;
    color?: string;
    name: string;
  };
  darkMode?: {
    opacity: number;
    color?: string;
    name: string;
  };
}

const OpacityColorTable: React.FC = () => {
  const opacityTokens: OpacityToken[] = [
    {
      token: "opacity/disabled",
      description: "e.g. 스토어 탭 미선택 상품",
      lightMode: {
        opacity: 0.5,
        name: "50%",
      },
    },
  ];

  const opacityColorTokens: OpacityToken[] = [
    {
      token: "BG/neutral/subtler_hovered-opacity_accent",
      description: "e.g. 테이블 리스트 호버 상태",
      lightMode: {
        opacity: 0.5,
        color: "#f3f4f6",
        name: "Gray100 - 50%",
      },
    },
  ];

  return (
    <div className="w-full bg-white">
      {/* Opacity Section */}
      <div className="text-[#33373b] text-[28px] font-bold leading-[42px] mb-8">
        Opacity
      </div>
      <div className="w-full shadow-[inset_0px_0px_0px_1px_rgba(224,224,224,1.00)] overflow-hidden mb-16">
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

        {/* Opacity Tokens Rows */}
        {opacityTokens.map((token, index) => (
          <div key={index} className="flex border-b border-[#e0e0e0]">
            {/* Token Column */}
            <div className="flex-1 p-4 bg-white border-r border-[#e0e0e0]">
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
            <div className="flex-1 p-4 bg-white border-r border-[#e0e0e0] flex flex-col justify-center items-start">
              <div className="flex flex-col gap-2">
                <div className="w-[100px] h-[45px] relative">
                  <div
                    className="w-[100px] h-[45px] absolute top-0 left-0 rounded"
                    style={{
                      backgroundColor: "#33373b",
                      opacity: token.lightMode.opacity,
                    }}
                  ></div>
                </div>
                <div
                  className="w-[100px] h-[45px] rounded"
                  style={{ opacity: token.lightMode.opacity }}
                ></div>
              </div>
              <div className="text-[#161616] text-sm font-normal leading-[18px] tracking-tight mt-2">
                {token.lightMode.name}
              </div>
            </div>

            {/* Dark Mode Column */}
            <div className="flex-1 p-4 bg-white border-r border-[#e0e0e0]">
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
                      style={{ opacity: token.darkMode.opacity }}
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

      {/* Opacity Color Section */}
      <div className="text-[#33373b] text-[28px] font-bold leading-[42px] mb-8">
        Opacity_color
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

        {/* Opacity Color Tokens Rows */}
        {opacityColorTokens.map((token, index) => (
          <div key={index} className="flex border-b border-[#e0e0e0]">
            {/* Token Column */}
            <div className="flex-1 p-4 bg-white border-r border-[#e0e0e0]">
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
            <div className="flex-1 p-4 bg-white border-r border-[#e0e0e0] flex flex-col justify-center items-start">
              <div className="flex flex-col gap-2">
                <div className="w-[100px] h-[45px] relative">
                  <div
                    className="w-[100px] h-[45px] absolute top-0 left-0 rounded"
                    style={{
                      backgroundColor: "#33373b",
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
            <div className="flex-1 p-4 bg-white border-r border-[#e0e0e0]">
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

export default OpacityColorTable;
