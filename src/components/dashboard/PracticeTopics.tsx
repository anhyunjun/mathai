import React from "react";
import { useNavigate } from "react-router-dom";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import { Progress } from "../ui/progress";
import { cn } from "@/lib/utils";
import { BookOpen, Star, TrendingUp, Clock, Award } from "lucide-react";

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
}

interface PracticeTopicsProps {
  topics?: TopicProps[];
  onSelectTopic?: (topicId: string) => void;
}

const PracticeTopics = ({
  topics = [
    {
      id: "1",
      title: "Algebra Basics",
      description:
        "Learn fundamental algebraic concepts including equations, inequalities, and functions.",
      difficulty: "beginner",
      completionPercentage: 75,
      estimatedTime: "30 min",
      isRecommended: true,
    },
    {
      id: "2",
      title: "Geometry Fundamentals",
      description:
        "Explore shapes, angles, and spatial relationships in this interactive geometry module.",
      difficulty: "intermediate",
      completionPercentage: 40,
      estimatedTime: "45 min",
    },
    {
      id: "3",
      title: "Pre-Calculus",
      description:
        "Prepare for calculus with functions, limits, and analytical geometry concepts.",
      difficulty: "advanced",
      completionPercentage: 10,
      estimatedTime: "60 min",
    },
    {
      id: "4",
      title: "Statistics Essentials",
      description:
        "Master data analysis, probability, and statistical inference techniques.",
      difficulty: "intermediate",
      completionPercentage: 0,
      estimatedTime: "40 min",
      isNew: true,
      badgeText: "New",
    },
  ],
  onSelectTopic = (id) => console.log(`Selected topic: ${id}`),
}: PracticeTopicsProps) => {
  const navigate = useNavigate();

  const getDifficultyColor = (difficulty: TopicProps["difficulty"]) => {
    switch (difficulty) {
      case "beginner":
        return "text-green-500";
      case "intermediate":
        return "text-yellow-500";
      case "advanced":
        return "text-red-500";
      default:
        return "text-gray-500";
    }
  };

  const handleViewAll = () => {
    navigate("/practice");
  };

  const handleTopicClick = (topicId: string) => {
    onSelectTopic(topicId);
  };

  return (
    <div className="w-full max-w-[600px] bg-white p-6 rounded-xl shadow-sm">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800">Practice Topics</h2>
        <Button variant="outline" size="sm" onClick={handleViewAll}>
          View All
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {topics.map((topic) => (
          <Card
            key={topic.id}
            className={cn(
              "cursor-pointer transition-all hover:shadow-md",
              topic.isRecommended && "border-2 border-blue-400",
            )}
            onClick={() => handleTopicClick(topic.id)}
          >
            <CardHeader className="pb-2">
              <div className="flex justify-between items-start">
                <CardTitle className="text-lg">{topic.title}</CardTitle>
                {topic.isRecommended && (
                  <Badge
                    variant="secondary"
                    className="bg-blue-100 text-blue-700"
                  >
                    <Star className="h-3 w-3 mr-1" /> Recommended
                  </Badge>
                )}
                {topic.isNew && (
                  <Badge
                    variant="secondary"
                    className="bg-green-100 text-green-700"
                  >
                    {topic.badgeText || "New"}
                  </Badge>
                )}
              </div>
              <CardDescription className="text-sm mt-1">
                {topic.description}
              </CardDescription>
            </CardHeader>
            <CardContent className="pb-2">
              <div className="flex items-center mb-2">
                <span
                  className={cn(
                    "text-xs font-medium mr-2",
                    getDifficultyColor(topic.difficulty),
                  )}
                >
                  {topic.difficulty.charAt(0).toUpperCase() +
                    topic.difficulty.slice(1)}
                </span>
                <Progress value={topic.completionPercentage} className="h-2" />
                <span className="text-xs text-gray-500 ml-2">
                  {topic.completionPercentage}%
                </span>
              </div>
            </CardContent>
            <CardFooter className="pt-0 flex justify-between">
              <div className="flex items-center text-xs text-gray-500">
                <Clock className="h-3 w-3 mr-1" />
                {topic.estimatedTime}
              </div>
              <Button
                size="sm"
                variant="ghost"
                className="text-xs"
                onClick={(e) => {
                  e.stopPropagation();
                  navigate(`/practice/${topic.id.toLowerCase()}`);
                }}
              >
                <BookOpen className="h-3 w-3 mr-1" />
                Start Practice
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default PracticeTopics;
