import React from "react";
import { Card, CardContent } from "../ui/card";
import { Badge } from "../ui/badge";

interface TopicProps {
  id: string;
  title: string;
  description: string;
  difficulty: "beginner" | "intermediate" | "advanced";
  completionPercentage: number;
  estimatedTime: string;
  badgeText?: string;
  isRecommended?: boolean;
  isNew?: boolean;
  onClick: (id: string) => void;
}

const TopicCard: React.FC<TopicProps> = ({
  id,
  title,
  description,
  difficulty,
  estimatedTime,
  isRecommended,
  isNew,
  badgeText,
  onClick,
}) => {
  return (
    <Card
      className="cursor-pointer hover:shadow-md transition-all"
      onClick={() => onClick(id)}
    >
      <CardContent className="p-4">
        <div className="flex justify-between items-start mb-2">
          <h3 className="font-semibold">{title}</h3>
          {isRecommended && (
            <Badge className="bg-blue-100 text-blue-700 text-xs">
              Recommended
            </Badge>
          )}
          {isNew && (
            <Badge className="bg-green-100 text-green-700 text-xs">
              {badgeText || "New"}
            </Badge>
          )}
        </div>
        <p className="text-sm text-gray-600 line-clamp-2 mb-3">{description}</p>
        <div className="flex justify-between items-center text-xs text-gray-500">
          <span>{difficulty}</span>
          <span>{estimatedTime}</span>
        </div>
      </CardContent>
    </Card>
  );
};

export default TopicCard;
