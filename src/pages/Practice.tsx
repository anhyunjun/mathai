import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import PracticeWorkspace from "@/components/practice/PracticeWorkspace";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Trophy, Star, TrendingUp } from "lucide-react";

interface TopicData {
  id: string;
  title: string;
  description: string;
  difficulty: "beginner" | "intermediate" | "advanced";
}

const Practice = () => {
  const { topicId } = useParams<{ topicId: string }>();
  const navigate = useNavigate();
  const [showCompletionDialog, setShowCompletionDialog] = useState(false);

  // Mock topic data
  const topics: Record<string, TopicData> = {
    algebra: {
      id: "algebra",
      title: "Algebra Basics",
      description:
        "Practice solving basic algebraic equations and expressions.",
      difficulty: "beginner",
    },
    geometry: {
      id: "geometry",
      title: "Geometry Fundamentals",
      description:
        "Explore shapes, angles, and spatial relationships in this interactive geometry module.",
      difficulty: "intermediate",
    },
    precalculus: {
      id: "precalculus",
      title: "Pre-Calculus",
      description:
        "Prepare for calculus with functions, limits, and analytical geometry concepts.",
      difficulty: "advanced",
    },
    statistics: {
      id: "statistics",
      title: "Statistics Essentials",
      description:
        "Master data analysis, probability, and statistical inference techniques.",
      difficulty: "intermediate",
    },
  };

  const currentTopic = topicId ? topics[topicId] : topics["algebra"];

  const handlePracticeComplete = () => {
    setShowCompletionDialog(true);
  };

  const handleReturnToDashboard = () => {
    navigate("/");
  };

  const handleTryMoreProblems = () => {
    setShowCompletionDialog(false);
    // Reset practice or load new problems
  };

  if (!currentTopic) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Topic Not Found</h1>
          <p className="mb-6">
            The practice topic you're looking for doesn't exist.
          </p>
          <Button onClick={() => navigate("/")}>Return to Dashboard</Button>
        </div>
      </div>
    );
  }

  return (
    <>
      <PracticeWorkspace
        topicTitle={currentTopic.title}
        topicDescription={currentTopic.description}
        onComplete={handlePracticeComplete}
        onExit={handleReturnToDashboard}
      />

      {/* Practice Completion Dialog */}
      <Dialog
        open={showCompletionDialog}
        onOpenChange={setShowCompletionDialog}
      >
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold text-center">
              Practice Completed!
            </DialogTitle>
            <DialogDescription className="text-center">
              Great job completing your practice session on {currentTopic.title}
              .
            </DialogDescription>
          </DialogHeader>

          <div className="py-6">
            <div className="flex justify-center mb-6">
              <div className="bg-purple-100 p-4 rounded-full">
                <Trophy className="h-12 w-12 text-purple-500" />
              </div>
            </div>

            <div className="space-y-4">
              <div className="grid grid-cols-3 gap-4 text-center">
                <div className="bg-blue-50 p-3 rounded-lg">
                  <p className="text-3xl font-bold text-blue-600">3</p>
                  <p className="text-sm text-gray-600">Problems Solved</p>
                </div>
                <div className="bg-green-50 p-3 rounded-lg">
                  <p className="text-3xl font-bold text-green-600">2</p>
                  <p className="text-sm text-gray-600">Correct Answers</p>
                </div>
                <div className="bg-yellow-50 p-3 rounded-lg">
                  <p className="text-3xl font-bold text-yellow-600">8</p>
                  <p className="text-sm text-gray-600">Day Streak</p>
                </div>
              </div>

              <div className="bg-purple-50 p-4 rounded-lg flex items-center gap-3">
                <Star className="h-6 w-6 text-purple-500" />
                <div>
                  <h3 className="font-medium">New Badge Earned</h3>
                  <p className="text-sm text-gray-600">Problem Solver</p>
                </div>
              </div>

              <div className="bg-blue-50 p-4 rounded-lg flex items-center gap-3">
                <TrendingUp className="h-6 w-6 text-blue-500" />
                <div>
                  <h3 className="font-medium">Topic Mastery</h3>
                  <p className="text-sm text-gray-600">
                    You've completed 67% of {currentTopic.title}
                  </p>
                  <div className="w-full bg-gray-200 rounded-full h-2.5 mt-1">
                    <div
                      className="bg-blue-600 h-2.5 rounded-full"
                      style={{ width: "67%" }}
                    ></div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <DialogFooter className="flex flex-col sm:flex-row gap-2">
            <Button
              variant="outline"
              onClick={handleReturnToDashboard}
              className="sm:flex-1"
            >
              Return to Dashboard
            </Button>
            <Button onClick={handleTryMoreProblems} className="sm:flex-1">
              Try More Problems
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default Practice;
