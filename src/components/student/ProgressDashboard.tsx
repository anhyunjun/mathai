import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
  BarChart,
  Calendar,
  Clock,
  TrendingUp,
  Award,
  BookOpen,
  Brain,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface SkillLevel {
  name: string;
  level: number;
  description: string;
}

interface TopicProgress {
  id: string;
  name: string;
  progress: number;
  totalProblems: number;
  solvedProblems: number;
  lastPracticed: string;
}

interface ProgressDashboardProps {
  studentName?: string;
  totalLessons?: number;
  completedLessons?: number;
  totalHours?: number;
  currentStreak?: number;
  skillLevels?: SkillLevel[];
  topicProgress?: TopicProgress[];
}

const ProgressDashboard = ({
  studentName = "Alex",
  totalLessons = 45,
  completedLessons = 27,
  totalHours = 42.5,
  currentStreak = 7,
  skillLevels = [
    {
      name: "Algebra",
      level: 75,
      description:
        "Strong understanding of algebraic concepts and equation solving",
    },
    {
      name: "Geometry",
      level: 60,
      description: "Good grasp of basic geometric principles and shapes",
    },
    {
      name: "Calculus",
      level: 30,
      description:
        "Beginning to understand derivatives and basic calculus concepts",
    },
    {
      name: "Statistics",
      level: 45,
      description: "Familiar with data analysis and basic probability",
    },
    {
      name: "Trigonometry",
      level: 55,
      description: "Comfortable with trigonometric functions and identities",
    },
  ],
  topicProgress = [
    {
      id: "1",
      name: "Linear Equations",
      progress: 90,
      totalProblems: 50,
      solvedProblems: 45,
      lastPracticed: "2023-06-15",
    },
    {
      id: "2",
      name: "Quadratic Equations",
      progress: 75,
      totalProblems: 40,
      solvedProblems: 30,
      lastPracticed: "2023-06-10",
    },
    {
      id: "3",
      name: "Geometric Shapes",
      progress: 60,
      totalProblems: 30,
      solvedProblems: 18,
      lastPracticed: "2023-06-05",
    },
    {
      id: "4",
      name: "Derivatives",
      progress: 30,
      totalProblems: 20,
      solvedProblems: 6,
      lastPracticed: "2023-05-28",
    },
    {
      id: "5",
      name: "Probability",
      progress: 45,
      totalProblems: 25,
      solvedProblems: 11,
      lastPracticed: "2023-06-01",
    },
  ],
}: ProgressDashboardProps) => {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  const getProgressColor = (progress: number) => {
    if (progress >= 80) return "bg-green-500";
    if (progress >= 60) return "bg-blue-500";
    if (progress >= 40) return "bg-yellow-500";
    return "bg-red-500";
  };

  const getLevelDescription = (level: number) => {
    if (level >= 80) return "Expert";
    if (level >= 60) return "Advanced";
    if (level >= 40) return "Intermediate";
    if (level >= 20) return "Basic";
    return "Beginner";
  };

  return (
    <div className="container mx-auto p-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Your Learning Progress</h1>
        <p className="text-gray-600">
          Track your math skills development and see how far you've come
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center">
              <div className="bg-blue-100 p-3 rounded-full mr-4">
                <BookOpen className="h-6 w-6 text-blue-600" />
              </div>
              <div>
                <p className="text-sm text-gray-500">Lessons Completed</p>
                <div className="flex items-baseline">
                  <h3 className="text-2xl font-bold">{completedLessons}</h3>
                  <span className="text-gray-500 ml-1">/ {totalLessons}</span>
                </div>
                <Progress
                  value={(completedLessons / totalLessons) * 100}
                  className="h-1 mt-1 w-24"
                />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center">
              <div className="bg-purple-100 p-3 rounded-full mr-4">
                <Clock className="h-6 w-6 text-purple-600" />
              </div>
              <div>
                <p className="text-sm text-gray-500">Total Learning Time</p>
                <div className="flex items-baseline">
                  <h3 className="text-2xl font-bold">{totalHours}</h3>
                  <span className="text-gray-500 ml-1">hours</span>
                </div>
                <p className="text-xs text-gray-500 mt-1">Great dedication!</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center">
              <div className="bg-green-100 p-3 rounded-full mr-4">
                <TrendingUp className="h-6 w-6 text-green-600" />
              </div>
              <div>
                <p className="text-sm text-gray-500">Current Streak</p>
                <div className="flex items-baseline">
                  <h3 className="text-2xl font-bold">{currentStreak}</h3>
                  <span className="text-gray-500 ml-1">days</span>
                </div>
                <p className="text-xs text-gray-500 mt-1">Keep it up!</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="skills" className="w-full">
        <TabsList className="grid w-full grid-cols-2 mb-8">
          <TabsTrigger value="skills">
            <Brain className="h-4 w-4 mr-2" />
            Skill Levels
          </TabsTrigger>
          <TabsTrigger value="topics">
            <BarChart className="h-4 w-4 mr-2" />
            Topic Progress
          </TabsTrigger>
        </TabsList>

        <TabsContent value="skills" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Award className="h-5 w-5 text-blue-500" />
                Your Math Skill Levels
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {skillLevels.map((skill) => (
                  <div key={skill.name} className="space-y-2">
                    <div className="flex justify-between items-center">
                      <div>
                        <h3 className="font-medium">{skill.name}</h3>
                        <p className="text-sm text-gray-500">
                          {skill.description}
                        </p>
                      </div>
                      <Badge
                        className={cn(
                          "px-3",
                          skill.level >= 80
                            ? "bg-green-100 text-green-800"
                            : skill.level >= 60
                              ? "bg-blue-100 text-blue-800"
                              : skill.level >= 40
                                ? "bg-yellow-100 text-yellow-800"
                                : "bg-red-100 text-red-800",
                        )}
                      >
                        {getLevelDescription(skill.level)}
                      </Badge>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2.5">
                      <div
                        className={cn(
                          "h-2.5 rounded-full",
                          getProgressColor(skill.level),
                        )}
                        style={{ width: `${skill.level}%` }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-8">
                <h3 className="font-semibold mb-4">
                  Recommendations to Improve
                </h3>
                <ul className="space-y-2">
                  {skillLevels
                    .filter((skill) => skill.level < 60)
                    .map((skill) => (
                      <li
                        key={`rec-${skill.name}`}
                        className="flex items-start"
                      >
                        <div className="bg-blue-100 p-1 rounded-full mr-2 mt-0.5">
                          <BookOpen className="h-4 w-4 text-blue-600" />
                        </div>
                        <div>
                          <p className="font-medium">
                            Focus on {skill.name} ({skill.level}%)
                          </p>
                          <p className="text-sm text-gray-600">
                            Complete the recommended lessons to improve your
                            skills
                          </p>
                        </div>
                      </li>
                    ))}
                </ul>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="topics" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BarChart className="h-5 w-5 text-blue-500" />
                Topic Progress
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {topicProgress.map((topic) => (
                  <div key={topic.id} className="space-y-2">
                    <div className="flex justify-between items-center">
                      <h3 className="font-medium">{topic.name}</h3>
                      <span className="text-sm text-gray-500">
                        Last practiced: {formatDate(topic.lastPracticed)}
                      </span>
                    </div>
                    <div className="flex justify-between text-sm text-gray-500 mb-1">
                      <span>
                        {topic.solvedProblems} of {topic.totalProblems} problems
                        solved
                      </span>
                      <span>{topic.progress}% complete</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2.5">
                      <div
                        className={cn(
                          "h-2.5 rounded-full",
                          getProgressColor(topic.progress),
                        )}
                        style={{ width: `${topic.progress}%` }}
                      ></div>
                    </div>
                    <div className="flex justify-end mt-2">
                      <Button variant="outline" size="sm">
                        Practice Now
                      </Button>
                    </div>
                    <Separator className="mt-4" />
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      <div className="mt-8">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calendar className="h-5 w-5 text-blue-500" />
              Learning History
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="grid grid-cols-7 gap-2">
                {Array.from({ length: 28 }, (_, i) => (
                  <div
                    key={i}
                    className={cn(
                      "h-8 rounded-md border",
                      i % 3 === 0 || i % 7 === 0
                        ? "bg-green-100 border-green-300"
                        : i % 5 === 0
                          ? "bg-green-200 border-green-400"
                          : "bg-gray-100 border-gray-200",
                    )}
                    title={`${i % 3 === 0 || i % 7 === 0 ? "Practiced" : i % 5 === 0 ? "Completed lesson" : "No activity"}`}
                  ></div>
                ))}
              </div>
              <div className="flex items-center justify-center space-x-4 text-sm">
                <div className="flex items-center">
                  <div className="w-3 h-3 bg-gray-100 border border-gray-200 rounded-sm mr-1"></div>
                  <span>No activity</span>
                </div>
                <div className="flex items-center">
                  <div className="w-3 h-3 bg-green-100 border border-green-300 rounded-sm mr-1"></div>
                  <span>Practice session</span>
                </div>
                <div className="flex items-center">
                  <div className="w-3 h-3 bg-green-200 border border-green-400 rounded-sm mr-1"></div>
                  <span>Completed lesson</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ProgressDashboard;
