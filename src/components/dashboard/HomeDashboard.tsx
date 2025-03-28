import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import ProgressSummary from "./ProgressSummary";
import UpcomingLessons from "./UpcomingLessons";
import PracticeTopics from "./PracticeTopics";
import { Button } from "../ui/button";
import { Card, CardContent } from "../ui/card";
import {
  Bell,
  BookOpen,
  Calendar,
  ChevronRight,
  Clock,
  Sparkles,
} from "lucide-react";
import { Badge } from "../ui/badge";

interface LessonType {
  id: string;
  title: string;
  date: string;
  time: string;
  duration: string;
  topic: string;
  status: "upcoming" | "completed" | "missed";
}

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

interface HomeDashboardProps {
  studentName?: string;
  completedLessons?: number;
  totalLessons?: number;
  completionPercentage?: number;
  streakDays?: number;
  minutesLearned?: number;
  problemsSolved?: number;
  topicsCompleted?: number;
  upcomingLessons?: LessonType[];
  recommendedTopics?: TopicProps[];
  hasScheduledCall?: boolean;
  nextCallTime?: string;
}

const HomeDashboard = ({
  studentName = "Alex",
  completedLessons = 12,
  totalLessons = 20,
  completionPercentage = 60,
  streakDays = 7,
  minutesLearned = 840,
  problemsSolved = 156,
  topicsCompleted = 8,
  upcomingLessons = [
    {
      id: "1",
      title: "Algebra Fundamentals",
      date: "2023-09-15",
      time: "3:30 PM",
      duration: "45 min",
      topic: "Equations",
      status: "upcoming",
    },
    {
      id: "2",
      title: "Geometry Basics",
      date: "2023-09-17",
      time: "4:00 PM",
      duration: "45 min",
      topic: "Triangles",
      status: "upcoming",
    },
    {
      id: "3",
      title: "Fractions & Decimals",
      date: "2023-09-20",
      time: "3:00 PM",
      duration: "45 min",
      topic: "Conversions",
      status: "upcoming",
    },
  ],
  recommendedTopics = [
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
  hasScheduledCall = true,
  nextCallTime = "Today at 4:00 PM",
}: HomeDashboardProps) => {
  const navigate = useNavigate();
  const [selectedLesson, setSelectedLesson] = useState<LessonType | null>(null);

  const handleSelectLesson = (lesson: LessonType) => {
    setSelectedLesson(lesson);
    // In a real implementation, this might open a modal or navigate to a lesson detail page
    console.log("Selected lesson:", lesson);
  };

  const handleSelectTopic = (topicId: string) => {
    // Navigate to the practice page for the selected topic
    navigate(`/practice/${topicId}`);
  };

  return (
    <div className="w-full min-h-screen bg-gray-50 p-4 md:p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Welcome Section */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 bg-white p-6 rounded-xl shadow-sm">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-gray-900">
              Welcome back, {studentName}!
            </h1>
            <p className="text-gray-600 mt-1">
              You're on a {streakDays}-day learning streak. Keep it up!
            </p>
          </div>

          {hasScheduledCall && (
            <Card className="bg-blue-50 border-blue-200 w-full md:w-auto">
              <CardContent className="p-4 flex items-center justify-between">
                <div className="flex items-center">
                  <div className="bg-blue-100 p-2 rounded-full mr-3">
                    <Bell className="h-5 w-5 text-blue-600" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-blue-800">
                      Next AI Teacher Call
                    </p>
                    <p className="text-lg font-bold text-blue-900">
                      {nextCallTime}
                    </p>
                  </div>
                </div>
                <Button
                  size="sm"
                  className="bg-blue-600 hover:bg-blue-700"
                  onClick={() => navigate("/lesson")}
                >
                  View Details
                </Button>
              </CardContent>
            </Card>
          )}
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card className="bg-white shadow-sm">
            <CardContent className="p-4 flex items-center">
              <div className="bg-purple-100 p-3 rounded-full mr-4">
                <BookOpen className="h-6 w-6 text-purple-600" />
              </div>
              <div>
                <p className="text-sm text-gray-500">Lessons Completed</p>
                <div className="flex items-baseline">
                  <span className="text-2xl font-bold mr-2">
                    {completedLessons}
                  </span>
                  <span className="text-sm text-gray-500">
                    of {totalLessons}
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white shadow-sm">
            <CardContent className="p-4 flex items-center">
              <div className="bg-green-100 p-3 rounded-full mr-4">
                <Clock className="h-6 w-6 text-green-600" />
              </div>
              <div>
                <p className="text-sm text-gray-500">Minutes Learned</p>
                <div className="flex items-baseline">
                  <span className="text-2xl font-bold">{minutesLearned}</span>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white shadow-sm">
            <CardContent className="p-4 flex items-center">
              <div className="bg-amber-100 p-3 rounded-full mr-4">
                <Sparkles className="h-6 w-6 text-amber-600" />
              </div>
              <div>
                <p className="text-sm text-gray-500">Problems Solved</p>
                <div className="flex items-baseline">
                  <span className="text-2xl font-bold">{problemsSolved}</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Dashboard Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column - Progress Summary */}
          <div className="lg:col-span-2">
            <ProgressSummary
              studentName={studentName}
              completedLessons={completedLessons}
              totalLessons={totalLessons}
              completionPercentage={completionPercentage}
              streakDays={streakDays}
              minutesLearned={minutesLearned}
              problemsSolved={problemsSolved}
              topicsCompleted={topicsCompleted}
            />
          </div>

          {/* Right Column - Upcoming Lessons */}
          <div>
            <UpcomingLessons
              lessons={upcomingLessons}
              onSelectLesson={handleSelectLesson}
            />
          </div>
        </div>

        {/* Practice Topics Section */}
        <div className="mt-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-bold text-gray-800">
              Recommended Practice
            </h2>
            <Button
              variant="ghost"
              className="text-blue-600 hover:text-blue-800"
              onClick={() => navigate("/practice")}
            >
              View All Topics <ChevronRight className="h-4 w-4 ml-1" />
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {recommendedTopics.slice(0, 4).map((topic) => (
              <Card
                key={topic.id}
                className="cursor-pointer hover:shadow-md transition-all"
                onClick={() => handleSelectTopic(topic.id)}
              >
                <CardContent className="p-4">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="font-semibold">{topic.title}</h3>
                    {topic.isRecommended && (
                      <Badge className="bg-blue-100 text-blue-700 text-xs">
                        Recommended
                      </Badge>
                    )}
                    {topic.isNew && (
                      <Badge className="bg-green-100 text-green-700 text-xs">
                        {topic.badgeText || "New"}
                      </Badge>
                    )}
                  </div>
                  <p className="text-sm text-gray-600 line-clamp-2 mb-3">
                    {topic.description}
                  </p>
                  <div className="flex justify-between items-center text-xs text-gray-500">
                    <span>{topic.difficulty}</span>
                    <span>{topic.estimatedTime}</span>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Call to Action */}
        <div className="bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl p-6 text-white mt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div>
              <h2 className="text-2xl font-bold">
                Ready for your next lesson?
              </h2>
              <p className="mt-2 text-blue-100">
                Schedule a call with your AI math teacher to continue your
                learning journey.
              </p>
            </div>
            <div className="flex gap-3">
              <Button
                variant="outline"
                className="bg-transparent text-white border-white hover:bg-white/10"
                onClick={() => navigate("/dashboard")}
              >
                <Calendar className="h-4 w-4 mr-2" />
                Schedule Call
              </Button>
              <Button
                className="bg-white text-blue-600 hover:bg-blue-50"
                onClick={() => navigate("/lesson")}
              >
                Start Lesson Now
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomeDashboard;
