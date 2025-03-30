import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import ProgressSummary from "./ProgressSummary";
import UpcomingLessons from "./UpcomingLessons";
import PracticeTopics from "./PracticeTopics";
import WelcomeSection from "./WelcomeSection";
import DashboardStats from "./DashboardStats";
import TopicCard from "./TopicCard";
import { Button } from "../ui/button";
import { Calendar, ChevronRight } from "lucide-react";

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
        <WelcomeSection
          studentName={studentName}
          streakDays={streakDays}
          hasScheduledCall={hasScheduledCall}
          nextCallTime={nextCallTime}
        />

        {/* Quick Stats */}
        <DashboardStats
          completedLessons={completedLessons}
          totalLessons={totalLessons}
          minutesLearned={minutesLearned}
          problemsSolved={problemsSolved}
        />

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
              <TopicCard
                key={topic.id}
                id={topic.id}
                title={topic.title}
                description={topic.description}
                difficulty={topic.difficulty}
                completionPercentage={topic.completionPercentage}
                estimatedTime={topic.estimatedTime}
                isRecommended={topic.isRecommended}
                isNew={topic.isNew}
                badgeText={topic.badgeText}
                onClick={handleSelectTopic}
              />
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
