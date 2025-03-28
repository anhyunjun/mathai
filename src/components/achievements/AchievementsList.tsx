import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Trophy,
  Star,
  Award,
  Medal,
  BookOpen,
  Clock,
  TrendingUp,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface Achievement {
  id: string;
  name: string;
  description: string;
  icon: React.ReactNode;
  earned: boolean;
  date?: string;
  progress?: number;
  category: "badges" | "milestones" | "streaks";
}

interface AchievementsListProps {
  achievements?: Achievement[];
  studentName?: string;
}

const AchievementsList = ({
  achievements = [
    {
      id: "1",
      name: "Math Wizard",
      description: "Complete 10 lessons with perfect scores",
      icon: <Trophy className="h-8 w-8 text-yellow-500" />,
      earned: true,
      date: "2023-05-15",
      progress: 100,
      category: "badges",
    },
    {
      id: "2",
      name: "Problem Solver",
      description: "Solve 50 practice problems correctly",
      icon: <Star className="h-8 w-8 text-purple-500" />,
      earned: true,
      date: "2023-06-02",
      progress: 100,
      category: "badges",
    },
    {
      id: "3",
      name: "Quick Thinker",
      description: "Solve 5 problems in under 30 seconds each",
      icon: <Clock className="h-8 w-8 text-blue-500" />,
      earned: false,
      progress: 60,
      category: "badges",
    },
    {
      id: "4",
      name: "Geometry Master",
      description: "Complete the Geometry module with at least 90% accuracy",
      icon: <Award className="h-8 w-8 text-green-500" />,
      earned: true,
      date: "2023-06-10",
      progress: 100,
      category: "badges",
    },
    {
      id: "5",
      name: "Algebra Expert",
      description: "Complete all Algebra lessons and practice sessions",
      icon: <Trophy className="h-8 w-8 text-orange-500" />,
      earned: false,
      progress: 75,
      category: "badges",
    },
    {
      id: "6",
      name: "7-Day Streak",
      description: "Practice math for 7 consecutive days",
      icon: <TrendingUp className="h-8 w-8 text-blue-500" />,
      earned: true,
      date: "2023-06-15",
      progress: 100,
      category: "streaks",
    },
    {
      id: "7",
      name: "30-Day Streak",
      description: "Practice math for 30 consecutive days",
      icon: <TrendingUp className="h-8 w-8 text-indigo-500" />,
      earned: false,
      progress: 23,
      category: "streaks",
    },
    {
      id: "8",
      name: "First Lesson",
      description: "Complete your first math lesson",
      icon: <BookOpen className="h-8 w-8 text-green-500" />,
      earned: true,
      date: "2023-05-10",
      progress: 100,
      category: "milestones",
    },
    {
      id: "9",
      name: "10 Hours of Learning",
      description: "Spend 10 hours learning math",
      icon: <Clock className="h-8 w-8 text-purple-500" />,
      earned: true,
      date: "2023-06-05",
      progress: 100,
      category: "milestones",
    },
    {
      id: "10",
      name: "100 Problems Solved",
      description: "Solve 100 math problems",
      icon: <Medal className="h-8 w-8 text-yellow-500" />,
      earned: false,
      progress: 56,
      category: "milestones",
    },
  ],
  studentName = "Alex",
}: AchievementsListProps) => {
  const earnedAchievements = achievements.filter(
    (achievement) => achievement.earned,
  );
  const inProgressAchievements = achievements.filter(
    (achievement) => !achievement.earned,
  );

  const badges = achievements.filter((a) => a.category === "badges");
  const milestones = achievements.filter((a) => a.category === "milestones");
  const streaks = achievements.filter((a) => a.category === "streaks");

  return (
    <div className="container mx-auto p-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Achievements</h1>
        <p className="text-gray-600">
          Track your progress and earn badges as you master math concepts.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <Card>
          <CardContent className="pt-6">
            <div className="flex flex-col items-center text-center">
              <div className="bg-purple-100 p-3 rounded-full mb-3">
                <Trophy className="h-8 w-8 text-purple-600" />
              </div>
              <h3 className="font-semibold text-lg mb-1">
                {earnedAchievements.length}
              </h3>
              <p className="text-sm text-gray-600">Achievements Earned</p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex flex-col items-center text-center">
              <div className="bg-blue-100 p-3 rounded-full mb-3">
                <Star className="h-8 w-8 text-blue-600" />
              </div>
              <h3 className="font-semibold text-lg mb-1">
                {badges.filter((b) => b.earned).length}/{badges.length}
              </h3>
              <p className="text-sm text-gray-600">Badges Collected</p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex flex-col items-center text-center">
              <div className="bg-green-100 p-3 rounded-full mb-3">
                <TrendingUp className="h-8 w-8 text-green-600" />
              </div>
              <h3 className="font-semibold text-lg mb-1">7 days</h3>
              <p className="text-sm text-gray-600">Current Streak</p>
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="all" className="w-full">
        <TabsList className="grid w-full grid-cols-4 mb-8">
          <TabsTrigger value="all">All</TabsTrigger>
          <TabsTrigger value="badges">Badges</TabsTrigger>
          <TabsTrigger value="milestones">Milestones</TabsTrigger>
          <TabsTrigger value="streaks">Streaks</TabsTrigger>
        </TabsList>

        <TabsContent value="all" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Earned Achievements</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {earnedAchievements.map((achievement) => (
                  <div
                    key={achievement.id}
                    className="border rounded-lg p-4 flex flex-col items-center text-center bg-white shadow-sm"
                  >
                    <div className="bg-primary/10 p-3 rounded-full mb-3">
                      {achievement.icon}
                    </div>
                    <h3 className="font-semibold mb-1">{achievement.name}</h3>
                    <p className="text-sm text-gray-600 mb-2">
                      {achievement.description}
                    </p>
                    <Badge
                      variant="outline"
                      className="bg-green-50 text-green-700"
                    >
                      Earned on{" "}
                      {new Date(achievement.date || "").toLocaleDateString()}
                    </Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>In Progress</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {inProgressAchievements.map((achievement) => (
                  <div
                    key={achievement.id}
                    className="border rounded-lg p-4 flex flex-col items-center text-center bg-gray-50"
                  >
                    <div className="bg-gray-200 p-3 rounded-full mb-3">
                      {achievement.icon}
                    </div>
                    <h3 className="font-semibold mb-1">{achievement.name}</h3>
                    <p className="text-sm text-gray-600 mb-2">
                      {achievement.description}
                    </p>
                    <div className="w-full mt-2">
                      <div className="flex justify-between text-xs text-gray-500 mb-1">
                        <span>Progress</span>
                        <span>{achievement.progress}%</span>
                      </div>
                      <Progress value={achievement.progress} className="h-2" />
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="badges" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {badges.map((badge) => (
              <div
                key={badge.id}
                className={cn(
                  "border rounded-lg p-4 flex flex-col items-center text-center",
                  badge.earned ? "bg-white shadow-sm" : "bg-gray-50",
                )}
              >
                <div
                  className={cn(
                    "p-3 rounded-full mb-3",
                    badge.earned ? "bg-primary/10" : "bg-gray-200",
                  )}
                >
                  {badge.icon}
                </div>
                <h3 className="font-semibold mb-1">{badge.name}</h3>
                <p className="text-sm text-gray-600 mb-2">
                  {badge.description}
                </p>
                {badge.earned ? (
                  <Badge
                    variant="outline"
                    className="bg-green-50 text-green-700"
                  >
                    Earned on {new Date(badge.date || "").toLocaleDateString()}
                  </Badge>
                ) : (
                  <div className="w-full mt-2">
                    <div className="flex justify-between text-xs text-gray-500 mb-1">
                      <span>Progress</span>
                      <span>{badge.progress}%</span>
                    </div>
                    <Progress value={badge.progress} className="h-2" />
                  </div>
                )}
              </div>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="milestones" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {milestones.map((milestone) => (
              <div
                key={milestone.id}
                className={cn(
                  "border rounded-lg p-4 flex flex-col items-center text-center",
                  milestone.earned ? "bg-white shadow-sm" : "bg-gray-50",
                )}
              >
                <div
                  className={cn(
                    "p-3 rounded-full mb-3",
                    milestone.earned ? "bg-primary/10" : "bg-gray-200",
                  )}
                >
                  {milestone.icon}
                </div>
                <h3 className="font-semibold mb-1">{milestone.name}</h3>
                <p className="text-sm text-gray-600 mb-2">
                  {milestone.description}
                </p>
                {milestone.earned ? (
                  <Badge
                    variant="outline"
                    className="bg-green-50 text-green-700"
                  >
                    Earned on{" "}
                    {new Date(milestone.date || "").toLocaleDateString()}
                  </Badge>
                ) : (
                  <div className="w-full mt-2">
                    <div className="flex justify-between text-xs text-gray-500 mb-1">
                      <span>Progress</span>
                      <span>{milestone.progress}%</span>
                    </div>
                    <Progress value={milestone.progress} className="h-2" />
                  </div>
                )}
              </div>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="streaks" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {streaks.map((streak) => (
              <div
                key={streak.id}
                className={cn(
                  "border rounded-lg p-4 flex flex-col items-center text-center",
                  streak.earned ? "bg-white shadow-sm" : "bg-gray-50",
                )}
              >
                <div
                  className={cn(
                    "p-3 rounded-full mb-3",
                    streak.earned ? "bg-primary/10" : "bg-gray-200",
                  )}
                >
                  {streak.icon}
                </div>
                <h3 className="font-semibold mb-1">{streak.name}</h3>
                <p className="text-sm text-gray-600 mb-2">
                  {streak.description}
                </p>
                {streak.earned ? (
                  <Badge
                    variant="outline"
                    className="bg-green-50 text-green-700"
                  >
                    Earned on {new Date(streak.date || "").toLocaleDateString()}
                  </Badge>
                ) : (
                  <div className="w-full mt-2">
                    <div className="flex justify-between text-xs text-gray-500 mb-1">
                      <span>Progress</span>
                      <span>{streak.progress}%</span>
                    </div>
                    <Progress value={streak.progress} className="h-2" />
                  </div>
                )}
              </div>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AchievementsList;
