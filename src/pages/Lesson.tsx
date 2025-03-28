import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import LessonViewport from "@/components/lesson/LessonViewport";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Star, Award } from "lucide-react";

const Lesson = () => {
  const navigate = useNavigate();
  const [lessonProgress, setLessonProgress] = useState(35);
  const [showCompletionDialog, setShowCompletionDialog] = useState(false);

  // Simulate progress increase
  useEffect(() => {
    const timer = setInterval(() => {
      setLessonProgress((prev) => {
        if (prev < 100) {
          return prev + 1;
        } else {
          clearInterval(timer);
          return prev;
        }
      });
    }, 3000);

    return () => clearInterval(timer);
  }, []);

  // Show completion dialog when progress reaches 100%
  useEffect(() => {
    if (lessonProgress >= 100) {
      setShowCompletionDialog(true);
    }
  }, [lessonProgress]);

  const handleEndLesson = () => {
    setShowCompletionDialog(true);
  };

  const handleReturnToDashboard = () => {
    navigate("/");
  };

  const handleStartPractice = () => {
    navigate("/practice/algebra");
  };

  return (
    <>
      <LessonViewport
        lessonTitle="Algebra: Quadratic Equations"
        lessonProgress={lessonProgress}
        onEndLesson={handleEndLesson}
      />

      {/* Lesson Completion Dialog */}
      <Dialog
        open={showCompletionDialog}
        onOpenChange={setShowCompletionDialog}
      >
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold text-center">
              Lesson Completed!
            </DialogTitle>
            <DialogDescription className="text-center">
              Great job completing your lesson on Quadratic Equations.
            </DialogDescription>
          </DialogHeader>

          <div className="py-6">
            <div className="flex justify-center mb-6">
              <div className="bg-yellow-100 p-4 rounded-full">
                <Star className="h-12 w-12 text-yellow-500" />
              </div>
            </div>

            <div className="space-y-4">
              <div className="bg-blue-50 p-4 rounded-lg flex items-center gap-3">
                <Award className="h-6 w-6 text-blue-500" />
                <div>
                  <h3 className="font-medium">New Badge Earned</h3>
                  <p className="text-sm text-gray-600">Algebra Explorer</p>
                </div>
              </div>

              <div className="bg-green-50 p-4 rounded-lg">
                <h3 className="font-medium mb-1">Your Progress</h3>
                <p className="text-sm text-gray-600 mb-2">
                  You've completed 3/5 lessons in Algebra Fundamentals
                </p>
                <div className="w-full bg-gray-200 rounded-full h-2.5">
                  <div
                    className="bg-green-600 h-2.5 rounded-full"
                    style={{ width: "60%" }}
                  ></div>
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
            <Button onClick={handleStartPractice} className="sm:flex-1">
              Start Practice
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default Lesson;
