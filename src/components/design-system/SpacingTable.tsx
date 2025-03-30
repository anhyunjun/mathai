import React from "react";

interface SpacingRowProps {
  token: string;
  size: string;
  visualWidth?: number;
}

/**
 * SpacingRow component displays a single row in the spacing table
 */
const SpacingRow: React.FC<SpacingRowProps> = ({
  token,
  size,
  visualWidth = 0,
}) => {
  return (
    <tr className="border-t border-gray-200">
      <td className="py-3 px-4 font-mono text-sm">{token}</td>
      <td className="py-3 px-4 flex items-center gap-2">
        <span className="text-sm w-12">{size}</span>
        {visualWidth > 0 && (
          <div
            className="h-6 bg-primary-100"
            style={{ width: `${Math.min(visualWidth, 480)}px` }}
          />
        )}
      </td>
    </tr>
  );
};

/**
 * SpacingTable component displays a table of spacing tokens with visual representation
 */
const SpacingTable: React.FC = () => {
  const spacingTokens = [
    { token: "space0", size: "0px", visualWidth: 0 },
    { token: "space0.25", size: "1px", visualWidth: 0 },
    { token: "space0.5", size: "2px", visualWidth: 2 },
    { token: "space1", size: "4px", visualWidth: 4 },
    { token: "space2", size: "8px", visualWidth: 8 },
    { token: "space3", size: "12px", visualWidth: 12 },
    { token: "space4", size: "16px", visualWidth: 16 },
    { token: "space5", size: "20px", visualWidth: 20 },
    { token: "space6", size: "24px", visualWidth: 24 },
    { token: "space7", size: "28px", visualWidth: 28 },
    { token: "space8", size: "32px", visualWidth: 32 },
    { token: "space10", size: "40px", visualWidth: 40 },
    { token: "space12", size: "48px", visualWidth: 48 },
    { token: "space14", size: "56px", visualWidth: 56 },
    { token: "space16", size: "64px", visualWidth: 64 },
    { token: "space18", size: "72px", visualWidth: 72 },
    { token: "space20", size: "80px", visualWidth: 80 },
    { token: "space24", size: "96px", visualWidth: 96 },
    { token: "space28", size: "112px", visualWidth: 112 },
    { token: "space32", size: "128px", visualWidth: 128 },
    { token: "space40", size: "160px", visualWidth: 160 },
    { token: "space48", size: "192px", visualWidth: 192 },
    { token: "space50", size: "200px", visualWidth: 200 },
    { token: "space80", size: "320px", visualWidth: 320 },
  ];

  return (
    <div className="w-full bg-white">
      <table className="w-full border border-gray-200">
        <thead>
          <tr className="bg-white">
            <th className="text-left py-3 px-4 font-semibold text-base">
              Token
            </th>
            <th className="text-left py-3 px-4 font-semibold text-base">
              Size
            </th>
          </tr>
        </thead>
        <tbody>
          {spacingTokens.map((item, index) => (
            <SpacingRow
              key={index}
              token={item.token}
              size={item.size}
              visualWidth={item.visualWidth}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default SpacingTable;
