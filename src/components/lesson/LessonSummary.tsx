import React from "react";
import { motion } from "framer-motion";
import { Award, Calendar, ChevronRight, Star, Trophy } from "lucide-react";
import { Button } from "../ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Progress } from "../ui/progress";
import { Badge } from "../ui/badge";

interface LessonSummaryProps {
  lessonTitle?: string;
  completionPercentage?: number;
  score?: number;
  badges?: Array<{
    id: string;
    name: string;
    description: string;
    icon: "star" | "trophy" | "award";
  }>;
  nextLessonDate?: string;
  onScheduleNext?: () => void;
  onReturnHome?: () => void;
}

const LessonSummary = ({
  lessonTitle = "Algebra Fundamentals: Equations & Inequalities",
  completionPercentage = 92,
  score = 85,
  badges = [
    {
      id: "1",
      name: "Quick Solver",
      description: "Completed all problems in record time",
      icon: "star",
    },
    {
      id: "2",
      name: "Perfect Streak",
      description: "Solved 5 problems in a row correctly",
      icon: "trophy",
    },
    {
      id: "3",
      name: "Persistence",
      description: "Tried multiple approaches to solve difficult problems",
      icon: "award",
    },
  ],
  nextLessonDate = "Tomorrow, 4:00 PM",
  onScheduleNext = () => {},
  onReturnHome = () => {},
}: LessonSummaryProps) => {
  const renderBadgeIcon = (iconName: string) => {
    switch (iconName) {
      case "star":
        return <Star className="h-5 w-5 text-yellow-400" />;
      case "trophy":
        return <Trophy className="h-5 w-5 text-amber-500" />;
      case "award":
        return <Award className="h-5 w-5 text-blue-500" />;
      default:
        return <Star className="h-5 w-5 text-yellow-400" />;
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-6 bg-slate-50">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-2xl"
      >
        <Card className="w-full shadow-lg">
          <CardHeader className="text-center bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-t-xl">
            <CardTitle className="text-2xl font-bold">
              Lesson Complete!
            </CardTitle>
            <CardDescription className="text-white/90 text-lg mt-2">
              {lessonTitle}
            </CardDescription>
          </CardHeader>

          <CardContent className="p-6 space-y-6">
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <h3 className="text-sm font-medium">Lesson Completion</h3>
                <span className="text-sm font-bold">
                  {completionPercentage}%
                </span>
              </div>
              <Progress value={completionPercentage} className="h-2" />
            </div>

            <div className="flex items-center justify-center p-4 bg-blue-50 rounded-lg">
              <div className="text-center">
                <h3 className="text-lg font-semibold text-gray-700">
                  Your Score
                </h3>
                <div className="text-4xl font-bold text-blue-600 mt-2">
                  {score}%
                </div>
              </div>
            </div>

            <div className="space-y-3">
              <h3 className="text-lg font-semibold">Badges Earned</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                {badges.map((badge) => (
                  <motion.div
                    key={badge.id}
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ delay: 0.2 * parseInt(badge.id) }}
                  >
                    <div className="flex flex-col items-center p-3 bg-white border rounded-lg shadow-sm hover:shadow-md transition-shadow">
                      <div className="p-2 rounded-full bg-blue-100 mb-2">
                        {renderBadgeIcon(badge.icon)}
                      </div>
                      <Badge variant="secondary" className="mb-1">
                        {badge.name}
                      </Badge>
                      <p className="text-xs text-center text-gray-500">
                        {badge.description}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            <div className="flex items-center p-4 bg-green-50 rounded-lg">
              <Calendar className="h-5 w-5 text-green-600 mr-3" />
              <div>
                <h3 className="text-sm font-semibold text-gray-700">
                  Next Lesson
                </h3>
                <p className="text-sm text-gray-600">{nextLessonDate}</p>
              </div>
            </div>
          </CardContent>

          <CardFooter className="flex flex-col sm:flex-row gap-3 p-6 pt-0">
            <Button
              onClick={onScheduleNext}
              className="w-full sm:w-auto bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700"
            >
              Schedule Next Lesson
            </Button>
            <Button
              variant="outline"
              onClick={onReturnHome}
              className="w-full sm:w-auto"
            >
              Return to Dashboard <ChevronRight className="ml-2 h-4 w-4" />
            </Button>
          </CardFooter>
        </Card>
      </motion.div>
    </div>
  );
};

export default LessonSummary;
