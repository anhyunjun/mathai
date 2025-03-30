import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import LessonContainer from "@/components/lesson/LessonContainer";
import InteractiveProblemArea from "@/components/practice/InteractiveProblemArea";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Star, Award, ArrowRight, BookOpen } from "lucide-react";

const Lesson = () => {
  const navigate = useNavigate();
  const [currentSlide, setCurrentSlide] = useState(1);
  const [totalSlides] = useState(10);
  const [showCompletionDialog, setShowCompletionDialog] = useState(false);
  const [showPractice, setShowPractice] = useState(false);
  const [lessonTopic, setLessonTopic] = useState({
    title: "Algebra: Quadratic Equations",
    description:
      "Learn how to solve quadratic equations using different methods",
    type: "algebra",
  });

  // Simulate progress increase - but don't auto-advance slides
  // This allows the user to control the pace with the Next button
  useEffect(() => {
    // We're removing the auto-advance timer to fix the content update issue
    // Now slides will only change when the user clicks the Next button

    // Initialize lesson data based on the topic
    const initializeLesson = () => {
      if (lessonTopic.type === "algebra") {
        // Set up initial state for algebra lesson
        setCurrentSlide(1);
      }
    };

    initializeLesson();

    return () => {};
  }, [lessonTopic.type]);

  // Show completion dialog when progress reaches 100%
  useEffect(() => {
    if (currentSlide >= totalSlides) {
      setShowCompletionDialog(true);
    }
  }, [currentSlide, totalSlides]);

  // Automatically transition to practice when lesson completes
  useEffect(() => {
    if (showCompletionDialog && !showPractice) {
      const timer = setTimeout(() => {
        setShowCompletionDialog(false);
        setShowPractice(true);
        // Reset state for practice session
        setCurrentSlide(1);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [showCompletionDialog, showPractice]);

  // Determine if current slide should show practice mode
  const isPracticeSlide = currentSlide % 2 === 0;

  const handleEndLesson = () => {
    setShowCompletionDialog(true);
  };

  const handleReturnToDashboard = () => {
    navigate("/");
  };

  const handleStartPractice = () => {
    setShowCompletionDialog(false);
    setShowPractice(true);
  };

  // Generate practice problems based on lesson topic
  const getPracticeProblems = () => {
    // This would ideally come from an API or database based on the lesson topic
    if (lessonTopic.type === "algebra") {
      return [
        {
          id: "p1",
          question: "Solve for x: 2x² - 7x + 3 = 0",
          solution: "3,0.5",
          hints: [
            "Try factoring the equation",
            "Look for factors of 3 that add up to -7",
          ],
          difficulty: "medium",
          topic: "Quadratic Equations",
        },
        {
          id: "p2",
          question: "Find the values of x for which: x² - 6x + 9 = 0",
          solution: "3",
          hints: [
            "This is a perfect square trinomial",
            "Try factoring it as (x-k)²",
          ],
          difficulty: "easy",
          topic: "Quadratic Equations",
        },
        {
          id: "p3",
          question: "Solve the quadratic equation: 3x² + 8x - 3 = 0",
          solution: "-3,1/3",
          hints: ["Use the quadratic formula", "a=3, b=8, c=-3"],
          difficulty: "medium",
          topic: "Quadratic Equations",
        },
        {
          id: "p4",
          question:
            "If a ball is thrown upward with an initial velocity of 64 feet per second from a height of 80 feet, when will it hit the ground? Use the formula h = -16t² + vt + h₀",
          solution: "5",
          hints: [
            "Substitute v=64 and h₀=80",
            "Set h=0 and solve for t",
            "You'll get -16t² + 64t + 80 = 0",
          ],
          difficulty: "hard",
          topic: "Quadratic Applications",
        },
      ];
    }
    return [];
  };

  return (
    <>
      {!showPractice ? (
        <LessonContainer
          teacherName="Ms. Kong"
          lessonTitle={lessonTopic.title}
          lessonDescription={lessonTopic.description}
          lessonType={lessonTopic.type}
          currentSlide={currentSlide}
          totalSlides={totalSlides}
          onEndLesson={handleEndLesson}
          isPracticeMode={isPracticeSlide}
        />
      ) : (
        <div className="w-full h-full flex flex-col">
          <div className="bg-primary-50 border-b border-primary-100 px-4 py-3 flex items-center justify-between shadow-soft">
            <h2 className="text-lg font-medium flex items-center">
              <Award className="h-5 w-5 mr-2 text-primary flex-shrink-0" />
              <span className="truncate">Practice: {lessonTopic.title}</span>
            </h2>
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="sm"
                className="flex items-center"
                onClick={() => {
                  setShowPractice(false);
                  setCurrentSlide(1);
                }}
              >
                <BookOpen className="h-4 w-4 mr-2" />
                <span className="hidden sm:inline">Return to Lesson</span>
                <span className="sm:hidden">Lesson</span>
              </Button>
              <Button variant="outline" size="sm" onClick={() => navigate("/")}>
                <span className="hidden sm:inline">Return to Dashboard</span>
                <span className="sm:hidden">Dashboard</span>
              </Button>
            </div>
          </div>
          <div className="flex-grow p-4 overflow-auto">
            <InteractiveProblemArea
              problems={getPracticeProblems()}
              lessonType={lessonTopic.type}
              currentLesson={lessonTopic.title}
              onComplete={(results) => {
                // Could navigate to a summary page or show a completion dialog
                console.log("Practice completed with results:", results);
              }}
            />
          </div>
        </div>
      )}

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
              Great job completing your lesson on {lessonTopic.title}.
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
                <Award className="h-6 w-6 text-blue-500 flex-shrink-0" />
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
              <ArrowRight className="h-4 w-4 mr-2" />
              Continue to Practice
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default Lesson;
