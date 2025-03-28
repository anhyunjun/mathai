import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import DashboardHeader from "@/components/dashboard/DashboardHeader";
import ProgressSummary from "@/components/dashboard/ProgressSummary";
import UpcomingLessons from "@/components/dashboard/UpcomingLessons";
import PracticeTopics from "@/components/dashboard/PracticeTopics";
import IncomingCallModal from "@/components/call/IncomingCallModal";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Bell,
  Calendar,
  BookOpen,
  Award,
  Rocket,
  TrendingUp,
} from "lucide-react";

interface LessonType {
  id: string;
  title: string;
  date: string;
  time: string;
  duration: string;
  topic: string;
  status: "upcoming" | "completed" | "missed";
}

interface TopicType {
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

const Dashboard = () => {
  const navigate = useNavigate();
  const [showCallModal, setShowCallModal] = useState(false);
  const [nextLesson, setNextLesson] = useState<LessonType | null>(null);

  // Mock data for upcoming lessons
  const upcomingLessons: LessonType[] = [
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
  ];

  // Mock data for practice topics
  const practiceTopics: TopicType[] = [
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
  ];

  // Simulate an incoming call after a short delay
  useEffect(() => {
    // Find the next upcoming lesson
    const nextUpcomingLesson = upcomingLessons.find(
      (lesson) => lesson.status === "upcoming",
    );
    if (nextUpcomingLesson) {
      setNextLesson(nextUpcomingLesson);
    }

    // Simulate an incoming call after 5 seconds
    const timer = setTimeout(() => {
      setShowCallModal(true);
    }, 5000);

    return () => clearTimeout(timer);
  }, []);

  const handleAnswerCall = () => {
    setShowCallModal(false);
    // Navigate to the lesson page
    navigate("/lesson");
  };

  const handleDeclineCall = () => {
    setShowCallModal(false);
    // Show a notification or update the lesson status
  };

  const handleSelectLesson = (lesson: LessonType) => {
    // Handle lesson selection
    console.log("Selected lesson:", lesson);
    navigate("/lesson");
  };

  const handleSelectTopic = (topicId: string) => {
    // Handle topic selection
    console.log("Selected topic:", topicId);
    navigate(`/practice/${topicId.toLowerCase()}`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100">
      {/* Header */}
      <DashboardHeader studentName="Alex Johnson" notificationCount={3} />

      {/* Main Content */}
      <main className="container mx-auto px-4 py-6 space-y-6">
        {/* Welcome Banner */}
        <Card className="overflow-hidden border-none shadow-lg">
          <div className="bg-gradient-to-r from-purple-600 to-blue-500 p-0">
            <CardContent className="p-6">
              <div className="flex flex-col md:flex-row justify-between items-center gap-6">
                <div className="text-white">
                  <h1 className="text-3xl font-bold mb-2">
                    Welcome back, Alex!
                  </h1>
                  <p className="text-white/90 max-w-md">
                    Continue your math journey with personalized lessons and
                    practice exercises.
                  </p>

                  <div className="flex gap-3 mt-4">
                    <Button
                      className="bg-white text-purple-600 hover:bg-white/90"
                      onClick={() => navigate("/lesson")}
                    >
                      <Rocket className="mr-2 h-4 w-4" />
                      Start Learning
                    </Button>

                    <Button
                      variant="outline"
                      className="bg-transparent border-white text-white hover:bg-white/10"
                      onClick={() => navigate("/practice/algebra")}
                    >
                      <TrendingUp className="mr-2 h-4 w-4" />
                      Practice Skills
                    </Button>
                  </div>
                </div>

                {nextLesson && (
                  <div className="bg-white/10 backdrop-blur-sm p-4 rounded-lg shadow-md border border-white/20 text-white">
                    <div className="flex items-center gap-2 font-medium">
                      <Calendar className="h-5 w-5" />
                      <span>Next Lesson: {nextLesson.title}</span>
                    </div>
                    <p className="text-white/90 mt-1">
                      {new Date(nextLesson.date).toLocaleDateString("en-US", {
                        weekday: "long",
                        month: "short",
                        day: "numeric",
                      })}{" "}
                      at {nextLesson.time}
                    </p>
                    <Button
                      className="mt-3 bg-white text-purple-600 hover:bg-white/90 w-full"
                      onClick={() => setShowCallModal(true)}
                    >
                      Join Lesson
                    </Button>
                  </div>
                )}
              </div>
            </CardContent>
          </div>
        </Card>

        {/* Key Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card className="bg-gradient-to-br from-blue-50 to-blue-100 border-none shadow-md hover:shadow-lg transition-all">
            <CardContent className="p-6 flex items-center gap-4">
              <div className="bg-blue-500 p-3 rounded-full">
                <BookOpen className="h-6 w-6 text-white" />
              </div>
              <div>
                <p className="text-sm text-blue-700 font-medium">
                  Lessons Completed
                </p>
                <p className="text-3xl font-bold text-blue-900">12</p>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-purple-50 to-purple-100 border-none shadow-md hover:shadow-lg transition-all">
            <CardContent className="p-6 flex items-center gap-4">
              <div className="bg-purple-500 p-3 rounded-full">
                <TrendingUp className="h-6 w-6 text-white" />
              </div>
              <div>
                <p className="text-sm text-purple-700 font-medium">
                  Current Streak
                </p>
                <p className="text-3xl font-bold text-purple-900">7 days</p>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-green-50 to-green-100 border-none shadow-md hover:shadow-lg transition-all">
            <CardContent className="p-6 flex items-center gap-4">
              <div className="bg-green-500 p-3 rounded-full">
                <Award className="h-6 w-6 text-white" />
              </div>
              <div>
                <p className="text-sm text-green-700 font-medium">
                  Badges Earned
                </p>
                <p className="text-3xl font-bold text-green-900">8</p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Two Column Layout for Lessons and Practice */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Upcoming Lessons */}
          <UpcomingLessons
            lessons={upcomingLessons}
            onSelectLesson={handleSelectLesson}
          />

          {/* Practice Topics */}
          <PracticeTopics
            topics={practiceTopics.slice(0, 4)}
            onSelectTopic={handleSelectTopic}
          />
        </div>

        {/* Progress Summary - Simplified */}
        <Card className="bg-white shadow-md overflow-hidden border-none">
          <CardContent className="p-6">
            <h2 className="text-xl font-bold mb-4 flex items-center">
              <TrendingUp className="mr-2 h-5 w-5 text-purple-500" />
              Your Learning Progress
            </h2>

            <div className="space-y-4">
              <div>
                <div className="flex justify-between items-center mb-1">
                  <h3 className="font-medium">Course Completion</h3>
                  <span className="text-sm font-medium">60%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2.5">
                  <div
                    className="bg-purple-600 h-2.5 rounded-full"
                    style={{ width: "60%" }}
                  ></div>
                </div>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4">
                <div className="bg-gray-50 p-3 rounded-lg text-center">
                  <p className="text-2xl font-bold text-purple-600">12/20</p>
                  <p className="text-xs text-gray-500">Lessons</p>
                </div>
                <div className="bg-gray-50 p-3 rounded-lg text-center">
                  <p className="text-2xl font-bold text-blue-600">156</p>
                  <p className="text-xs text-gray-500">Problems Solved</p>
                </div>
                <div className="bg-gray-50 p-3 rounded-lg text-center">
                  <p className="text-2xl font-bold text-green-600">8</p>
                  <p className="text-xs text-gray-500">Topics Completed</p>
                </div>
                <div className="bg-gray-50 p-3 rounded-lg text-center">
                  <p className="text-2xl font-bold text-orange-600">14h</p>
                  <p className="text-xs text-gray-500">Learning Time</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </main>

      {/* Incoming Call Modal */}
      <IncomingCallModal
        isOpen={showCallModal}
        onAnswer={handleAnswerCall}
        onDecline={handleDeclineCall}
        teacherName="Ms. Kong"
        lessonTopic={nextLesson?.title || "Algebra: Quadratic Equations"}
      />
    </div>
  );
};

export default Dashboard;
