import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Progress } from "../ui/progress";
import { Badge } from "../ui/badge";
import { Separator } from "../ui/separator";
import { Trophy, Star, Award, BookOpen, Clock, TrendingUp } from "lucide-react";
import { cn } from "../../lib/utils";

interface BadgeItem {
  id: string;
  name: string;
  icon: React.ReactNode;
  earned: boolean;
  date?: string;
}

interface ProgressSummaryProps {
  studentName?: string;
  completedLessons?: number;
  totalLessons?: number;
  completionPercentage?: number;
  streakDays?: number;
  badges?: BadgeItem[];
  minutesLearned?: number;
  problemsSolved?: number;
  topicsCompleted?: number;
}

const ProgressSummary = ({
  studentName = "Alex",
  completedLessons = 12,
  totalLessons = 20,
  completionPercentage = 60,
  streakDays = 7,
  badges = [
    {
      id: "1",
      name: "Math Wizard",
      icon: <Trophy className="h-6 w-6 text-yellow-500" />,
      earned: true,
      date: "2023-05-15",
    },
    {
      id: "2",
      name: "Problem Solver",
      icon: <Star className="h-6 w-6 text-purple-500" />,
      earned: true,
      date: "2023-06-02",
    },
    {
      id: "3",
      name: "Quick Thinker",
      icon: <Award className="h-6 w-6 text-blue-500" />,
      earned: false,
    },
    {
      id: "4",
      name: "Geometry Master",
      icon: <Award className="h-6 w-6 text-green-500" />,
      earned: true,
      date: "2023-06-10",
    },
    {
      id: "5",
      name: "Algebra Expert",
      icon: <Trophy className="h-6 w-6 text-orange-500" />,
      earned: false,
    },
  ],
  minutesLearned = 840,
  problemsSolved = 156,
  topicsCompleted = 8,
}: ProgressSummaryProps) => {
  const earnedBadges = badges.filter((badge) => badge.earned);

  return (
    <Card className="w-full bg-white shadow-md">
      <CardHeader className="pb-2">
        <CardTitle className="text-2xl font-bold text-primary">
          Progress Summary
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-2">
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-medium">Course Completion</h3>
            <span className="text-sm font-medium">
              {completedLessons}/{totalLessons} lessons
            </span>
          </div>
          <Progress value={completionPercentage} className="h-2" />
          <p className="text-sm text-muted-foreground">
            You're {completionPercentage}% through your current math curriculum
          </p>
        </div>

        <Separator />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="flex items-center space-x-3 bg-slate-50 p-3 rounded-lg">
            <div className="bg-blue-100 p-2 rounded-full">
              <BookOpen className="h-5 w-5 text-blue-600" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Lessons Completed</p>
              <p className="text-xl font-bold">{completedLessons}</p>
            </div>
          </div>

          <div className="flex items-center space-x-3 bg-slate-50 p-3 rounded-lg">
            <div className="bg-green-100 p-2 rounded-full">
              <Clock className="h-5 w-5 text-green-600" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Minutes Learned</p>
              <p className="text-xl font-bold">{minutesLearned}</p>
            </div>
          </div>

          <div className="flex items-center space-x-3 bg-slate-50 p-3 rounded-lg">
            <div className="bg-purple-100 p-2 rounded-full">
              <TrendingUp className="h-5 w-5 text-purple-600" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Current Streak</p>
              <p className="text-xl font-bold">{streakDays} days</p>
            </div>
          </div>
        </div>

        <Separator />

        <div>
          <h3 className="text-lg font-medium mb-3">Earned Badges</h3>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3">
            {badges.map((badge) => (
              <div
                key={badge.id}
                className={cn(
                  "flex flex-col items-center justify-center p-3 rounded-lg text-center transition-all",
                  badge.earned
                    ? "bg-white border border-primary/20 shadow-sm"
                    : "bg-gray-100 opacity-50",
                )}
              >
                <div
                  className={cn(
                    "p-2 rounded-full mb-2",
                    badge.earned ? "bg-primary/10" : "bg-gray-200",
                  )}
                >
                  {badge.icon}
                </div>
                <p className="text-sm font-medium">{badge.name}</p>
                {badge.earned && badge.date && (
                  <p className="text-xs text-muted-foreground mt-1">
                    Earned: {new Date(badge.date).toLocaleDateString()}
                  </p>
                )}
                {!badge.earned && (
                  <p className="text-xs text-muted-foreground mt-1">Locked</p>
                )}
              </div>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Card className="bg-slate-50 border-none">
            <CardContent className="pt-6">
              <div className="flex justify-between items-center mb-2">
                <h3 className="font-medium">Problems Solved</h3>
                <Badge variant="outline" className="bg-blue-50">
                  {problemsSolved}
                </Badge>
              </div>
              <p className="text-sm text-muted-foreground">
                Keep practicing to improve your skills!
              </p>
            </CardContent>
          </Card>

          <Card className="bg-slate-50 border-none">
            <CardContent className="pt-6">
              <div className="flex justify-between items-center mb-2">
                <h3 className="font-medium">Topics Completed</h3>
                <Badge variant="outline" className="bg-green-50">
                  {topicsCompleted}
                </Badge>
              </div>
              <p className="text-sm text-muted-foreground">
                You're making great progress!
              </p>
            </CardContent>
          </Card>
        </div>
      </CardContent>
    </Card>
  );
};

export default ProgressSummary;
