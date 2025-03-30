import React from "react";
import { Rainbow } from "lucide-react";

interface GradientColorTableProps {
  className?: string;
}

const GradientColorTable: React.FC<GradientColorTableProps> = ({
  className = "",
}) => {
  return (
    <div className={`w-full bg-white ${className}`}>
      <div className="flex items-center gap-2 mb-6">
        <Rainbow className="w-6 h-6 text-primary" />
        <h1 className="text-[28px] font-bold font-pretendard text-[#33373b]">
          Gradient
        </h1>
      </div>

      {/* Text Section */}
      <div className="mb-20">
        <h2 className="text-[28px] font-bold font-pretendard text-[#33373b] mb-[21px]">
          Text
        </h2>
        <div className="border-r border-b border-[#e0e0e0]">
          {/* Header Row */}
          <div className="flex shadow-[inset_0px_1px_0px_0px_rgba(224,224,224,1.00)]">
            <div className="flex-1 p-4 bg-white shadow-[inset_1px_0px_0px_0px_rgba(224,224,224,1.00)]">
              <div className="text-[#161616] text-base font-semibold font-pretendard leading-snug">
                Token
              </div>
            </div>
            <div className="flex-1 p-4 bg-white shadow-[inset_1px_0px_0px_0px_rgba(224,224,224,1.00)]">
              <div className="text-[#161616] text-base font-semibold font-pretendard leading-snug">
                Light Mode
              </div>
            </div>
            <div className="flex-1 p-4 bg-white shadow-[inset_1px_0px_0px_0px_rgba(224,224,224,1.00)]">
              <div className="text-[#161616] text-base font-semibold font-pretendard leading-snug">
                Dark Mode
              </div>
            </div>
          </div>

          {/* Text Row */}
          <div className="flex shadow-[inset_0px_1px_0px_0px_rgba(224,224,224,1.00)]">
            <div className="flex-1 p-4 bg-white shadow-[inset_1px_0px_0px_0px_rgba(224,224,224,1.00)]">
              <div className="p-1 bg-gray-100 rounded inline-block">
                <div className="text-[#161616] text-sm font-normal font-sans leading-[18px] tracking-tight">
                  gradient/text/accent
                </div>
              </div>
              <div className="text-[#7a828d] text-base font-normal font-pretendard leading-normal mt-2">
                Direction: To Right Bottom
                <br />
                Usage:
              </div>
            </div>
            <div className="flex-1 p-4 bg-white shadow-[inset_1px_0px_0px_0px_rgba(224,224,224,1.00)] flex flex-col justify-center items-start">
              <div className="w-[100px] h-[45px] bg-gradient-to-br from-[#8e6cf0] to-[#cf75f3] rounded"></div>
              <div className="text-[#161616] text-sm font-normal font-sans leading-[18px] tracking-tight mt-2">
                Violet_pink
              </div>
            </div>
            <div className="flex-1 p-4 bg-white shadow-[inset_1px_0px_0px_0px_rgba(224,224,224,1.00)]"></div>
          </div>
        </div>
      </div>

      {/* Background Section */}
      <div className="mb-20">
        <h2 className="text-[28px] font-bold font-pretendard text-[#33373b] mb-[21px]">
          Background
        </h2>
        <div className="border-r border-b border-[#e0e0e0]">
          {/* Header Row */}
          <div className="flex shadow-[inset_0px_1px_0px_0px_rgba(224,224,224,1.00)]">
            <div className="flex-1 p-4 bg-white shadow-[inset_1px_0px_0px_0px_rgba(224,224,224,1.00)]">
              <div className="text-[#161616] text-base font-semibold font-pretendard leading-snug">
                Token
              </div>
            </div>
            <div className="flex-1 p-4 bg-white shadow-[inset_1px_0px_0px_0px_rgba(224,224,224,1.00)]">
              <div className="text-[#161616] text-base font-semibold font-pretendard leading-snug">
                Light Mode
              </div>
            </div>
            <div className="flex-1 p-4 bg-white shadow-[inset_1px_0px_0px_0px_rgba(224,224,224,1.00)]">
              <div className="text-[#161616] text-base font-semibold font-pretendard leading-snug">
                Dark Mode
              </div>
            </div>
          </div>

          {/* Background Row 1 */}
          <div className="flex shadow-[inset_0px_1px_0px_0px_rgba(224,224,224,1.00)]">
            <div className="flex-1 p-4 bg-white shadow-[inset_1px_0px_0px_0px_rgba(224,224,224,1.00)]">
              <div className="p-1 bg-gray-100 rounded inline-block">
                <div className="text-[#161616] text-sm font-normal font-sans leading-[18px] tracking-tight">
                  gradient/bg/accent.violet
                </div>
              </div>
              <div className="text-[#7a828d] text-base font-normal font-pretendard leading-normal mt-2">
                Direction: To Right Bottom
              </div>
            </div>
            <div className="flex-1 p-4 bg-white shadow-[inset_1px_0px_0px_0px_rgba(224,224,224,1.00)] flex flex-col justify-center items-start">
              <div className="w-[100px] h-[45px] bg-gradient-to-br from-[#8e6cf0] to-[#cf75f3] rounded"></div>
              <div className="text-[#161616] text-sm font-normal font-sans leading-[18px] tracking-tight mt-2">
                Violet_pink
              </div>
            </div>
            <div className="flex-1 p-4 bg-white shadow-[inset_1px_0px_0px_0px_rgba(224,224,224,1.00)]"></div>
          </div>

          {/* Background Row 2 */}
          <div className="flex shadow-[inset_0px_1px_0px_0px_rgba(224,224,224,1.00)]">
            <div className="flex-1 p-4 bg-white shadow-[inset_1px_0px_0px_0px_rgba(224,224,224,1.00)]">
              <div className="p-1 bg-gray-100 rounded inline-block">
                <div className="text-[#161616] text-sm font-normal font-sans leading-[18px] tracking-tight">
                  gradient/bg/accent.neutral
                </div>
              </div>
              <div className="text-[#7a828d] text-base font-normal font-pretendard leading-normal mt-2">
                Direction: To Right Bottom
                <br />
                e.g. 카드 백그라운드 (특허, 문제 자랑, 메달 배경)
              </div>
            </div>
            <div className="flex-1 p-4 bg-white shadow-[inset_1px_0px_0px_0px_rgba(224,224,224,1.00)] flex flex-col justify-center items-start">
              <div className="w-[100px] h-[45px] bg-gradient-to-br from-[#0e0e0f] to-[#595959] rounded"></div>
              <div className="text-[#161616] text-sm font-normal font-sans leading-[18px] tracking-tight mt-2">
                Black_gray
              </div>
            </div>
            <div className="flex-1 p-4 bg-white shadow-[inset_1px_0px_0px_0px_rgba(224,224,224,1.00)]"></div>
          </div>
        </div>
      </div>

      {/* Border Section */}
      <div className="mb-20">
        <h2 className="text-[28px] font-bold font-pretendard text-[#33373b] mb-[21px]">
          Border
        </h2>
        <div className="border-r border-b border-[#e0e0e0]">
          {/* Header Row */}
          <div className="flex shadow-[inset_0px_1px_0px_0px_rgba(224,224,224,1.00)]">
            <div className="flex-1 p-4 bg-white shadow-[inset_1px_0px_0px_0px_rgba(224,224,224,1.00)]">
              <div className="text-[#161616] text-base font-semibold font-pretendard leading-snug">
                Token
              </div>
            </div>
            <div className="flex-1 p-4 bg-white shadow-[inset_1px_0px_0px_0px_rgba(224,224,224,1.00)]">
              <div className="text-[#161616] text-base font-semibold font-pretendard leading-snug">
                Light Mode
              </div>
            </div>
            <div className="flex-1 p-4 bg-white shadow-[inset_1px_0px_0px_0px_rgba(224,224,224,1.00)]">
              <div className="text-[#161616] text-base font-semibold font-pretendard leading-snug">
                Dark Mode
              </div>
            </div>
          </div>

          {/* Border Row */}
          <div className="flex shadow-[inset_0px_1px_0px_0px_rgba(224,224,224,1.00)]">
            <div className="flex-1 p-4 bg-white shadow-[inset_1px_0px_0px_0px_rgba(224,224,224,1.00)]">
              <div className="p-1 bg-gray-100 rounded inline-block">
                <div className="text-[#161616] text-sm font-normal font-sans leading-[18px] tracking-tight">
                  gradient/border/accent.violet
                </div>
              </div>
              <div className="text-[#7a828d] text-base font-normal font-pretendard leading-normal mt-2">
                Direction: To Right Bottom
              </div>
            </div>
            <div className="flex-1 p-4 bg-white shadow-[inset_1px_0px_0px_0px_rgba(224,224,224,1.00)] flex flex-col justify-center items-start">
              <div className="w-[100px] h-[45px] bg-gradient-to-br from-[#8e6cf0] to-[#cf75f3] rounded"></div>
              <div className="text-[#161616] text-sm font-normal font-sans leading-[18px] tracking-tight mt-2">
                Violet_pink
              </div>
            </div>
            <div className="flex-1 p-4 bg-white shadow-[inset_1px_0px_0px_0px_rgba(224,224,224,1.00)]"></div>
          </div>
        </div>
      </div>

      {/* Overlay Section */}
      <div className="mb-20">
        <h2 className="text-[28px] font-bold font-pretendard text-[#33373b] mb-[21px]">
          Overlay
        </h2>
        <div className="border-r border-b border-[#e0e0e0]">
          {/* Header Row */}
          <div className="flex shadow-[inset_0px_1px_0px_0px_rgba(224,224,224,1.00)]">
            <div className="flex-1 p-4 bg-white shadow-[inset_1px_0px_0px_0px_rgba(224,224,224,1.00)]">
              <div className="text-[#161616] text-base font-semibold font-pretendard leading-snug">
                Token
              </div>
            </div>
            <div className="flex-1 p-4 bg-white shadow-[inset_1px_0px_0px_0px_rgba(224,224,224,1.00)]">
              <div className="text-[#161616] text-base font-semibold font-pretendard leading-snug">
                Light Mode
              </div>
            </div>
            <div className="flex-1 p-4 bg-white shadow-[inset_1px_0px_0px_0px_rgba(224,224,224,1.00)]">
              <div className="text-[#161616] text-base font-semibold font-pretendard leading-snug">
                Dark Mode
              </div>
            </div>
          </div>

          {/* Overlay Row 1 - Subtlest To Right */}
          <div className="flex shadow-[inset_0px_1px_0px_0px_rgba(224,224,224,1.00)]">
            <div className="flex-1 p-4 bg-white shadow-[inset_1px_0px_0px_0px_rgba(224,224,224,1.00)]">
              <div className="p-1 bg-gray-100 rounded inline-block">
                <div className="text-[#161616] text-sm font-normal font-sans leading-[18px] tracking-tight">
                  gradient/overlay/subtlest.toright
                </div>
              </div>
              <div className="text-[#7a828d] text-base font-normal font-pretendard leading-normal mt-2">
                이미지, 카드 등 백그라운드 위에 사용
              </div>
            </div>
            <div className="flex-1 p-4 bg-white shadow-[inset_1px_0px_0px_0px_rgba(224,224,224,1.00)] flex flex-col justify-center items-start">
              <div className="flex flex-col gap-2">
                <div className="w-[100px] h-[45px] relative">
                  <div className="w-[100px] h-[45px] absolute opacity-50 bg-[#33373b] rounded"></div>
                </div>
                <div className="w-[100px] h-[45px] bg-gradient-to-r from-white to-white rounded border border-gray-200"></div>
              </div>
              <div className="text-[#161616] text-sm font-normal font-sans leading-[18px] tracking-tight mt-2">
                White
              </div>
            </div>
            <div className="flex-1 p-4 bg-white shadow-[inset_1px_0px_0px_0px_rgba(224,224,224,1.00)]"></div>
          </div>

          {/* Overlay Row 2 - Subtlest To Left */}
          <div className="flex shadow-[inset_0px_1px_0px_0px_rgba(224,224,224,1.00)]">
            <div className="flex-1 p-4 bg-white shadow-[inset_1px_0px_0px_0px_rgba(224,224,224,1.00)]">
              <div className="p-1 bg-gray-100 rounded inline-block">
                <div className="text-[#161616] text-sm font-normal font-sans leading-[18px] tracking-tight">
                  gradient/overlay/subtlest.toleft
                </div>
              </div>
              <div className="text-[#7a828d] text-base font-normal font-pretendard leading-normal mt-2">
                To Left
              </div>
            </div>
            <div className="flex-1 p-4 bg-white shadow-[inset_1px_0px_0px_0px_rgba(224,224,224,1.00)] flex flex-col justify-center items-start">
              <div className="flex flex-col gap-2">
                <div className="w-[100px] h-[45px] relative">
                  <div className="w-[100px] h-[45px] absolute opacity-50 bg-[#33373b] rounded"></div>
                </div>
                <div className="w-[100px] h-[45px] bg-gradient-to-r from-white to-white rounded border border-gray-200"></div>
              </div>
              <div className="text-[#161616] text-sm font-normal font-sans leading-[18px] tracking-tight mt-2">
                White
              </div>
            </div>
            <div className="flex-1 p-4 bg-white shadow-[inset_1px_0px_0px_0px_rgba(224,224,224,1.00)]"></div>
          </div>

          {/* Overlay Row 3 - Subtlest To Top */}
          <div className="flex shadow-[inset_0px_1px_0px_0px_rgba(224,224,224,1.00)]">
            <div className="flex-1 p-4 bg-white shadow-[inset_1px_0px_0px_0px_rgba(224,224,224,1.00)]">
              <div className="p-1 bg-gray-100 rounded inline-block">
                <div className="text-[#161616] text-sm font-normal font-sans leading-[18px] tracking-tight">
                  gradient/overlay/subtlest.totop
                </div>
              </div>
              <div className="text-[#7a828d] text-base font-normal font-pretendard leading-normal mt-2">
                To Top
              </div>
            </div>
            <div className="flex-1 p-4 bg-white shadow-[inset_1px_0px_0px_0px_rgba(224,224,224,1.00)] flex flex-col justify-center items-start">
              <div className="flex flex-col gap-2">
                <div className="w-[100px] h-[45px] relative">
                  <div className="w-[100px] h-[45px] absolute opacity-50 bg-[#33373b] rounded"></div>
                </div>
                <div className="w-[100px] h-[45px] bg-gradient-to-b from-white to-white rounded border border-gray-200"></div>
              </div>
              <div className="text-[#161616] text-sm font-normal font-sans leading-[18px] tracking-tight mt-2">
                White
              </div>
            </div>
            <div className="flex-1 p-4 bg-white shadow-[inset_1px_0px_0px_0px_rgba(224,224,224,1.00)]"></div>
          </div>

          {/* Overlay Row 4 - Floating To Right */}
          <div className="flex shadow-[inset_0px_1px_0px_0px_rgba(224,224,224,1.00)]">
            <div className="flex-1 p-4 bg-white shadow-[inset_1px_0px_0px_0px_rgba(224,224,224,1.00)]">
              <div className="p-1 bg-gray-100 rounded inline-block">
                <div className="text-[#161616] text-sm font-normal font-sans leading-[18px] tracking-tight">
                  gradient/overlay/floating.toright
                </div>
              </div>
              <div className="text-[#7a828d] text-base font-normal font-pretendard leading-normal mt-2">
                To Right
                <br />
                White 70%, Transparent 30%
              </div>
            </div>
            <div className="flex-1 p-4 bg-white shadow-[inset_1px_0px_0px_0px_rgba(224,224,224,1.00)] flex flex-col justify-center items-start">
              <div className="flex flex-col gap-2">
                <div className="w-[100px] h-[45px] relative">
                  <div className="w-[100px] h-[45px] absolute opacity-50 bg-[#33373b] rounded"></div>
                </div>
                <div className="w-[100px] h-[45px] bg-gradient-to-r from-white via-white to-white rounded border border-gray-200"></div>
              </div>
              <div className="text-[#161616] text-sm font-normal font-sans leading-[18px] tracking-tight mt-2">
                White
              </div>
            </div>
            <div className="flex-1 p-4 bg-white shadow-[inset_1px_0px_0px_0px_rgba(224,224,224,1.00)]"></div>
          </div>

          {/* Overlay Row 5 - Floating To Left */}
          <div className="flex shadow-[inset_0px_1px_0px_0px_rgba(224,224,224,1.00)]">
            <div className="flex-1 p-4 bg-white shadow-[inset_1px_0px_0px_0px_rgba(224,224,224,1.00)]">
              <div className="p-1 bg-gray-100 rounded inline-block">
                <div className="text-[#161616] text-sm font-normal font-sans leading-[18px] tracking-tight">
                  gradient/overlay/floating.toleft
                </div>
              </div>
              <div className="text-[#7a828d] text-base font-normal font-pretendard leading-normal mt-2">
                To Left
                <br />
                Transparent 30%, White 70%
              </div>
            </div>
            <div className="flex-1 p-4 bg-white shadow-[inset_1px_0px_0px_0px_rgba(224,224,224,1.00)] flex flex-col justify-center items-start">
              <div className="flex flex-col gap-2">
                <div className="w-[100px] h-[45px] relative">
                  <div className="w-[100px] h-[45px] absolute opacity-50 bg-[#33373b] rounded"></div>
                </div>
                <div className="w-[100px] h-[45px] bg-gradient-to-r from-white via-white to-white rounded border border-gray-200"></div>
              </div>
              <div className="text-[#161616] text-sm font-normal font-sans leading-[18px] tracking-tight mt-2">
                White
              </div>
            </div>
            <div className="flex-1 p-4 bg-white shadow-[inset_1px_0px_0px_0px_rgba(224,224,224,1.00)]"></div>
          </div>

          {/* Overlay Row 6 - Floating To Top */}
          <div className="flex shadow-[inset_0px_1px_0px_0px_rgba(224,224,224,1.00)]">
            <div className="flex-1 p-4 bg-white shadow-[inset_1px_0px_0px_0px_rgba(224,224,224,1.00)]">
              <div className="p-1 bg-gray-100 rounded inline-block">
                <div className="text-[#161616] text-sm font-normal font-sans leading-[18px] tracking-tight">
                  gradient/overlay/floating.totop
                </div>
              </div>
              <div className="text-[#7a828d] text-base font-normal font-pretendard leading-normal mt-2">
                To Top
                <br />
                White 70%, Transparent 30%
              </div>
            </div>
            <div className="flex-1 p-4 bg-white shadow-[inset_1px_0px_0px_0px_rgba(224,224,224,1.00)] flex flex-col justify-center items-start">
              <div className="flex flex-col gap-2">
                <div className="w-[100px] h-[45px] relative">
                  <div className="w-[100px] h-[45px] absolute opacity-50 bg-[#33373b] rounded"></div>
                </div>
                <div className="w-[100px] h-[45px] bg-gradient-to-t from-white via-white to-white rounded border border-gray-200"></div>
              </div>
              <div className="text-[#161616] text-sm font-normal font-sans leading-[18px] tracking-tight mt-2">
                White
              </div>
            </div>
            <div className="flex-1 p-4 bg-white shadow-[inset_1px_0px_0px_0px_rgba(224,224,224,1.00)]"></div>
          </div>

          {/* Overlay Row 7 - Bold To Right */}
          <div className="flex shadow-[inset_0px_1px_0px_0px_rgba(224,224,224,1.00)]">
            <div className="flex-1 p-4 bg-white shadow-[inset_1px_0px_0px_0px_rgba(224,224,224,1.00)]">
              <div className="p-1 bg-gray-100 rounded inline-block">
                <div className="text-[#161616] text-sm font-normal font-sans leading-[18px] tracking-tight">
                  gradient/overlay/bold.toright
                </div>
              </div>
              <div className="text-[#7a828d] text-base font-normal font-pretendard leading-normal mt-2">
                이미지, 카드 등 백그라운드 위에 사용
              </div>
            </div>
            <div className="flex-1 p-4 bg-white shadow-[inset_1px_0px_0px_0px_rgba(224,224,224,1.00)] flex flex-col justify-center items-start">
              <div className="flex flex-col gap-2">
                <div className="w-[100px] h-[45px] relative">
                  <div className="w-[100px] h-[45px] absolute opacity-50 bg-[#33373b] rounded"></div>
                </div>
                <div className="w-[100px] h-[45px] bg-gradient-to-r from-black to-black rounded"></div>
              </div>
              <div className="text-[#161616] text-sm font-normal font-sans leading-[18px] tracking-tight mt-2">
                Black
              </div>
            </div>
            <div className="flex-1 p-4 bg-white shadow-[inset_1px_0px_0px_0px_rgba(224,224,224,1.00)]"></div>
          </div>

          {/* Overlay Row 8 - Bold To Left */}
          <div className="flex shadow-[inset_0px_1px_0px_0px_rgba(224,224,224,1.00)]">
            <div className="flex-1 p-4 bg-white shadow-[inset_1px_0px_0px_0px_rgba(224,224,224,1.00)]">
              <div className="p-1 bg-gray-100 rounded inline-block">
                <div className="text-[#161616] text-sm font-normal font-sans leading-[18px] tracking-tight">
                  gradient/overlay/bold.toleft
                </div>
              </div>
              <div className="text-[#7a828d] text-base font-normal font-pretendard leading-normal mt-2">
                To Left
              </div>
            </div>
            <div className="flex-1 p-4 bg-white shadow-[inset_1px_0px_0px_0px_rgba(224,224,224,1.00)] flex flex-col justify-center items-start">
              <div className="flex flex-col gap-2">
                <div className="w-[100px] h-[45px] relative">
                  <div className="w-[100px] h-[45px] absolute opacity-50 bg-[#33373b] rounded"></div>
                </div>
                <div className="w-[100px] h-[45px] bg-gradient-to-r from-black to-black rounded border border-gray-200"></div>
              </div>
              <div className="text-[#161616] text-sm font-normal font-sans leading-[18px] tracking-tight mt-2">
                Black
              </div>
            </div>
            <div className="flex-1 p-4 bg-white shadow-[inset_1px_0px_0px_0px_rgba(224,224,224,1.00)]"></div>
          </div>

          {/* Overlay Row 9 - Bold To Top */}
          <div className="flex shadow-[inset_0px_1px_0px_0px_rgba(224,224,224,1.00)]">
            <div className="flex-1 p-4 bg-white shadow-[inset_1px_0px_0px_0px_rgba(224,224,224,1.00)]">
              <div className="p-1 bg-gray-100 rounded inline-block">
                <div className="text-[#161616] text-sm font-normal font-sans leading-[18px] tracking-tight">
                  gradient/overlay/bold.totop
                </div>
              </div>
              <div className="text-[#7a828d] text-base font-normal font-pretendard leading-normal mt-2">
                To Top
              </div>
            </div>
            <div className="flex-1 p-4 bg-white shadow-[inset_1px_0px_0px_0px_rgba(224,224,224,1.00)] flex flex-col justify-center items-start">
              <div className="flex flex-col gap-2">
                <div className="w-[100px] h-[45px] relative">
                  <div className="w-[100px] h-[45px] absolute opacity-50 bg-[#33373b] rounded"></div>
                </div>
                <div className="w-[100px] h-[45px] bg-gradient-to-b from-black to-black rounded border border-gray-200"></div>
              </div>
              <div className="text-[#161616] text-sm font-normal font-sans leading-[18px] tracking-tight mt-2">
                Black
              </div>
            </div>
            <div className="flex-1 p-4 bg-white shadow-[inset_1px_0px_0px_0px_rgba(224,224,224,1.00)]"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GradientColorTable;
