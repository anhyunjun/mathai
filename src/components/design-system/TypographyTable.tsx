import React from "react";

interface TypographyRowProps {
  token: string;
  size: string;
  weight: string;
  lineHeight: string;
}

/**
 * TypographyRow component displays a single row in the typography table
 */
const TypographyRow: React.FC<TypographyRowProps> = ({
  token,
  size,
  weight,
  lineHeight,
}) => {
  return (
    <tr className="border-t border-gray-200">
      <td className="py-3 px-4">
        <div className="p-1 bg-gray-100 rounded inline-flex">
          <span className="text-[#161616] text-sm font-normal font-sans leading-[18px] tracking-tight">
            {token}
          </span>
        </div>
      </td>
      <td className="py-3 px-4 shadow-[inset_1px_0px_0px_0px_rgba(224,224,224,1.00)]">
        <span className="text-[#161616] text-sm font-normal font-sans leading-[21px] tracking-tight">
          {size}
        </span>
      </td>
      <td className="py-3 px-4 shadow-[inset_1px_0px_0px_0px_rgba(224,224,224,1.00)]">
        <span className="text-[#161616] text-sm font-normal font-sans leading-[21px] tracking-tight">
          {weight}
        </span>
      </td>
      <td className="py-3 px-4 shadow-[inset_1px_0px_0px_0px_rgba(224,224,224,1.00)]">
        <span className="text-[#161616] text-sm font-normal font-sans leading-[21px] tracking-tight">
          {lineHeight}
        </span>
      </td>
    </tr>
  );
};

/**
 * TypographyTable component displays a table of typography tokens with their properties
 */
const TypographyTable: React.FC = () => {
  const typographyTokens = [
    {
      token: "typo/text/display1",
      size: "100px / 6.25rem",
      weight: "Bold",
      lineHeight: "140%",
    },
    {
      token: "typo/text/display2",
      size: "64px / 4rem",
      weight: "Bold",
      lineHeight: "140%",
    },
    {
      token: "typo/text/display3",
      size: "48px / 3rem",
      weight: "Bold",
      lineHeight: "140%",
    },
    {
      token: "typo/text/display4",
      size: "40px / 2.5rem",
      weight: "Bold",
      lineHeight: "150%",
    },
    {
      token: "typo/text/xxl.regular",
      size: "32px / 2rem",
      weight: "Regular",
      lineHeight: "150%",
    },
    {
      token: "typo/text/xxl",
      size: "32px / 2rem",
      weight: "Medium",
      lineHeight: "150%",
    },
    {
      token: "typo/text/xxl.bold",
      size: "32px / 2rem",
      weight: "Bold",
      lineHeight: "150%",
    },
    {
      token: "typo/text/xl.regular",
      size: "28px / 1.75rem",
      weight: "Regular",
      lineHeight: "150%",
    },
    {
      token: "typo/text/xl",
      size: "28px / 1.75rem",
      weight: "Medium",
      lineHeight: "150%",
    },
    {
      token: "typo/text/xl.bold",
      size: "28px / 1.75rem",
      weight: "Bold",
      lineHeight: "150%",
    },
    {
      token: "typo/text/l.regular",
      size: "24px / 1.5rem",
      weight: "Regular",
      lineHeight: "150%",
    },
    {
      token: "typo/text/l",
      size: "24px / 1.5rem",
      weight: "Medium",
      lineHeight: "150%",
    },
    {
      token: "typo/text/l.bold",
      size: "24px / 1.5rem",
      weight: "Bold",
      lineHeight: "150%",
    },
    {
      token: "typo/text/m.regular",
      size: "20px / 1.25rem",
      weight: "Regular",
      lineHeight: "150%",
    },
    {
      token: "typo/text/m",
      size: "20px / 1.25rem",
      weight: "Medium",
      lineHeight: "150%",
    },
    {
      token: "typo/text/m.bold",
      size: "20px / 1.25rem",
      weight: "Bold",
      lineHeight: "150%",
    },
    {
      token: "typo/text/s.regular",
      size: "16px / 1rem",
      weight: "Regular",
      lineHeight: "150%",
    },
    {
      token: "typo/text/s",
      size: "16px / 1rem",
      weight: "Medium",
      lineHeight: "150%",
    },
    {
      token: "typo/text/s.bold",
      size: "16px / 1rem",
      weight: "Bold",
      lineHeight: "150%",
    },
    {
      token: "typo/text/xs.regular",
      size: "14px / 0.875rem",
      weight: "Regular",
      lineHeight: "150%",
    },
    {
      token: "typo/text/xs",
      size: "14px / 0.875rem",
      weight: "Medium",
      lineHeight: "150%",
    },
    {
      token: "typo/text/xs.bold",
      size: "14px / 0.875rem",
      weight: "Bold",
      lineHeight: "150%",
    },
    {
      token: "typo/text/xxs.regular",
      size: "12px / 0.75rem",
      weight: "Regular",
      lineHeight: "150%",
    },
    {
      token: "typo/text/xxs",
      size: "12px / 0.75rem",
      weight: "Medium",
      lineHeight: "150%",
    },
    {
      token: "typo/text/xxs.bold",
      size: "12px / 0.75rem",
      weight: "Bold",
      lineHeight: "150%",
    },
  ];

  return (
    <div className="w-full bg-white">
      <table className="w-full border border-gray-200">
        <thead>
          <tr className="bg-white">
            <th className="text-left py-3 px-4 font-semibold text-base">
              Token
            </th>
            <th className="text-left py-3 px-4 font-semibold text-base shadow-[inset_1px_0px_0px_0px_rgba(224,224,224,1.00)]">
              Size / Rem
            </th>
            <th className="text-left py-3 px-4 font-semibold text-base shadow-[inset_1px_0px_0px_0px_rgba(224,224,224,1.00)]">
              Weight
            </th>
            <th className="text-left py-3 px-4 font-semibold text-base shadow-[inset_1px_0px_0px_0px_rgba(224,224,224,1.00)]">
              Line Height
            </th>
          </tr>
        </thead>
        <tbody>
          {typographyTokens.map((item, index) => (
            <TypographyRow
              key={index}
              token={item.token}
              size={item.size}
              weight={item.weight}
              lineHeight={item.lineHeight}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TypographyTable;
