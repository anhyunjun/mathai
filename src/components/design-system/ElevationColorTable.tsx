import React from "react";

interface SurfaceToken {
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

interface ShadowToken {
  token: string;
  description: string;
  lightMode: {
    shadowValues: string[];
  };
  darkMode?: {
    shadowValues: string[];
  };
}

const ElevationColorTable: React.FC = () => {
  const surfaceTokens: SurfaceToken[] = [
    {
      token: "elevation/surface",
      description: "Use as the primary background for the UI.",
      lightMode: {
        color: "#ffffff",
        name: "White",
      },
    },
    {
      token: "elevation/surface.overlay",
      description:
        "Use for the background of elements that sit on top of they UI\ne.g. header, dialog, dropdown",
      lightMode: {
        color: "#ffffff",
        name: "White",
      },
    },
  ];

  const shadowTokens: ShadowToken[] = [
    {
      token: "elevation/shadow/overlay",
      description:
        "Use for the box shadow of elements that sit on top of the UI, such as modals, dropdown menus, flags, and inline dialogs.",
      lightMode: {
        shadowValues: [
          "0px 8px 24px (0, 0, 0, 0.12)",
          "0px 0px 1px (0, 0, 0, 0.06)",
        ],
      },
    },
  ];

  return (
    <div className="w-full bg-white">
      {/* Surface Section */}
      <div className="flex-col justify-start items-start gap-8 flex mb-16">
        <div className="text-[#33373b] text-[28px] font-bold leading-[42px] mb-8">
          Surface
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

          {/* Surface Tokens Rows */}
          {surfaceTokens.map((token, index) => (
            <div key={index} className="flex border-b border-gray-200">
              {/* Token Column */}
              <div className="flex-1 p-4 bg-white border-r border-gray-200">
                <div className="p-1 bg-gray-100 rounded inline-block">
                  <div className="text-[#161616] text-sm font-normal font-['IBM_Plex_Sans'] leading-[18px] tracking-tight">
                    {token.token}
                  </div>
                </div>
                <div className="text-[#7a828d] text-base font-normal leading-normal mt-2">
                  {token.description.split("\n").map((line, i) => (
                    <React.Fragment key={i}>
                      {line}
                      {i < token.description.split("\n").length - 1 && <br />}
                    </React.Fragment>
                  ))}
                </div>
              </div>

              {/* Light Mode Column */}
              <div className="flex-1 p-4 bg-white border-r border-gray-200 flex flex-col justify-center items-start">
                <div
                  className="w-[100px] h-[45px] rounded border border-gray-200"
                  style={{ backgroundColor: token.lightMode.color }}
                ></div>
                <div className="text-[#161616] text-sm font-normal font-['IBM_Plex_Sans'] leading-[18px] tracking-tight mt-2">
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

      {/* Shadow Section */}
      <div className="flex-col justify-start items-start gap-8 flex">
        <div className="text-[#33373b] text-[28px] font-bold leading-[42px] mb-8">
          Shadow
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

          {/* Shadow Tokens Rows */}
          {shadowTokens.map((token, index) => (
            <div key={index} className="flex border-b border-gray-200">
              {/* Token Column */}
              <div className="flex-1 p-4 bg-white border-r border-gray-200">
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
              <div className="flex-1 p-4 bg-white border-r border-gray-200 flex flex-col justify-center items-start">
                <div className="w-[100px] h-[45px] bg-white rounded border border-gray-200 shadow-[0px_8px_24px_0px_rgba(0,0,0,0.12),0px_0px_1px_0px_rgba(0,0,0,0.06)]"></div>
                <div className="flex flex-col mt-2">
                  {token.lightMode.shadowValues.map((value, i) => (
                    <div
                      key={i}
                      className="text-[#161616] text-sm font-normal font-['IBM_Plex_Sans'] leading-[18px] tracking-tight"
                    >
                      {value}
                    </div>
                  ))}
                </div>
              </div>

              {/* Dark Mode Column */}
              <div className="flex-1 p-4 bg-white border-r border-gray-200">
                {token.darkMode && (
                  <>
                    <div className="w-[100px] h-[45px] rounded shadow-lg"></div>
                    <div className="flex flex-col mt-2">
                      {token.darkMode.shadowValues.map((value, i) => (
                        <div
                          key={i}
                          className="text-[#161616] text-sm font-normal font-['IBM_Plex_Sans'] leading-[18px] tracking-tight"
                        >
                          {value}
                        </div>
                      ))}
                    </div>
                  </>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ElevationColorTable;
