import React from "react";
import { cn } from "@/lib/utils";

interface ColorToken {
  name: string;
  description: string;
  lightValue: string;
  darkValue: string;
  variable: string;
}

const backgroundColorTokens: ColorToken[] = [
  {
    name: "background",
    description: "기본 배경색",
    lightValue: "hsl(0 0% 100%)",
    darkValue: "hsl(222 47% 11%)",
    variable: "--background",
  },
  {
    name: "card",
    description: "카드 배경색",
    lightValue: "hsl(0 0% 100%)",
    darkValue: "hsl(222 47% 11%)",
    variable: "--card",
  },
  {
    name: "popover",
    description: "팝오버 배경색",
    lightValue: "hsl(0 0% 100%)",
    darkValue: "hsl(222 47% 11%)",
    variable: "--popover",
  },
  {
    name: "muted",
    description: "약한 강조 배경색",
    lightValue: "hsl(210 40% 96%)",
    darkValue: "hsl(217 33% 18%)",
    variable: "--muted",
  },
];

export default function BackgroundColorTable() {
  return (
    <div className="w-full bg-background p-6 rounded-lg">
      <h2 className="text-2xl font-semibold mb-6">배경 색상 토큰</h2>
      <div className="overflow-hidden border border-border rounded-md">
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-muted">
              <th className="py-3 px-4 text-left font-medium text-sm">토큰</th>
              <th className="py-3 px-4 text-left font-medium text-sm">
                라이트 모드
              </th>
              <th className="py-3 px-4 text-left font-medium text-sm">
                다크 모드
              </th>
            </tr>
          </thead>
          <tbody>
            {backgroundColorTokens.map((token, index) => (
              <tr
                key={token.name}
                className={cn(
                  "border-t border-border",
                  index % 2 === 0 ? "bg-background" : "bg-muted/30",
                )}
              >
                <td className="py-4 px-4">
                  <div className="flex flex-col gap-1">
                    <span className="font-mono text-sm font-medium">
                      {token.name}
                    </span>
                    <span className="text-sm text-muted-foreground">
                      {token.description}
                    </span>
                  </div>
                </td>
                <td className="py-4 px-4">
                  <div className="flex items-center gap-3">
                    <div
                      className="w-10 h-10 rounded-md border border-border"
                      style={{ backgroundColor: token.lightValue }}
                    />
                    <div className="flex flex-col">
                      <span className="font-mono text-xs">
                        {token.lightValue}
                      </span>
                      <span className="font-mono text-xs text-muted-foreground">
                        var({token.variable})
                      </span>
                    </div>
                  </div>
                </td>
                <td className="py-4 px-4">
                  <div className="flex items-center gap-3">
                    <div
                      className="w-10 h-10 rounded-md border border-border"
                      style={{ backgroundColor: token.darkValue }}
                    />
                    <div className="flex flex-col">
                      <span className="font-mono text-xs">
                        {token.darkValue}
                      </span>
                      <span className="font-mono text-xs text-muted-foreground">
                        var({token.variable})
                      </span>
                    </div>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
