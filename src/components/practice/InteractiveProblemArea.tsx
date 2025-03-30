import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Check,
  X,
  HelpCircle,
  ChevronRight,
  Lightbulb,
  Award,
  Star,
  Trophy,
  Sparkles,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

interface MathProblem {
  id: string;
  question: string;
  solution: string;
  hints: string[];
  difficulty: "easy" | "medium" | "hard";
  topic: string;
}

interface InteractiveProblemAreaProps {
  problems?: MathProblem[];
  onComplete?: (results: { correct: number; total: number }) => void;
  currentLesson?: string;
}

const defaultProblems: MathProblem[] = [
  {
    id: "p1",
    question: "Solve for x: 2x + 5 = 13",
    solution: "4",
    hints: ["Subtract 5 from both sides", "Divide both sides by 2"],
    difficulty: "easy",
    topic: "Algebra",
  },
  {
    id: "p2",
    question: "Find the area of a circle with radius 6 cm. Use π = 3.14.",
    solution: "113.04",
    hints: [
      "The formula for the area of a circle is A = πr²",
      "Substitute r = 6 and π = 3.14",
    ],
    difficulty: "medium",
    topic: "Geometry",
  },
  {
    id: "p3",
    question: "If f(x) = 3x² - 2x + 1, find f(2).",
    solution: "9",
    hints: ["Substitute x = 2 into the function", "Calculate 3(2)² - 2(2) + 1"],
    difficulty: "medium",
    topic: "Functions",
  },
];

const InteractiveProblemArea: React.FC<InteractiveProblemAreaProps> = ({
  problems = defaultProblems,
  onComplete = () => {},
  currentLesson = "Algebra Basics",
}) => {
  const [currentProblemIndex, setCurrentProblemIndex] = useState(0);
  const [userAnswer, setUserAnswer] = useState("");
  const [showHint, setShowHint] = useState(false);
  const [currentHintIndex, setCurrentHintIndex] = useState(0);
  const [feedback, setFeedback] = useState<"correct" | "incorrect" | null>(
    null,
  );
  const [workingArea, setWorkingArea] = useState("");
  const [results, setResults] = useState({ correct: 0, total: 0 });
  const [showReward, setShowReward] = useState(false);
  const [rewardType, setRewardType] = useState<
    "correct" | "streak" | "fast" | "milestone"
  >("correct");
  const [aiPrompt, setAiPrompt] = useState<string | null>(null);
  const [showAiPrompt, setShowAiPrompt] = useState(false);
  const [streakCount, setStreakCount] = useState(0);
  const [lastAnswerTime, setLastAnswerTime] = useState<number | null>(null);

  const currentProblem = problems[currentProblemIndex];

  // AI prompts that appear during problem solving
  const aiPrompts = {
    thinking: [
      "I see you're working on this problem. Need any help?",
      "Take your time with this one. I'm here if you need assistance.",
      "Remember the key concepts we discussed earlier.",
    ],
    encouragement: [
      "You're doing great! Keep going!",
      "I like your approach to this problem.",
      "You're making excellent progress!",
    ],
    hint: [
      "Have you considered using the formula we learned?",
      "Try breaking this down into smaller steps.",
      "Look for patterns in the problem that might help you.",
    ],
  };

  // Show random AI prompts during problem solving
  useEffect(() => {
    if (feedback === null && userAnswer.length === 0) {
      const promptTimer = setTimeout(() => {
        const category = Math.random() > 0.5 ? "thinking" : "encouragement";
        const randomIndex = Math.floor(
          Math.random() * aiPrompts[category].length,
        );
        setAiPrompt(aiPrompts[category][randomIndex]);
        setShowAiPrompt(true);

        // Hide the prompt after some time
        setTimeout(() => {
          setShowAiPrompt(false);
        }, 5000);
      }, 8000); // Show prompt after 8 seconds of inactivity

      return () => clearTimeout(promptTimer);
    }
  }, [currentProblemIndex, feedback, userAnswer]);

  const checkAnswer = () => {
    const currentTime = Date.now();
    const isCorrect = userAnswer.trim() === currentProblem.solution.trim();
    setFeedback(isCorrect ? "correct" : "incorrect");

    if (isCorrect) {
      // Update streak count
      setStreakCount((prev) => prev + 1);
      setResults((prev) => ({ ...prev, correct: prev.correct + 1 }));

      // Determine reward type
      let reward: "correct" | "streak" | "fast" | "milestone" = "correct";

      // Check for streak rewards (every 3 correct answers)
      if (streakCount > 0 && (streakCount + 1) % 3 === 0) {
        reward = "streak";
      }
      // Check for speed rewards (if answered within 20 seconds)
      else if (lastAnswerTime && currentTime - lastAnswerTime < 20000) {
        reward = "fast";
      }
      // Check for milestone rewards (25%, 50%, 75%, 100% completion)
      else {
        const completionPercentage =
          ((results.correct + 1) / problems.length) * 100;
        if (
          completionPercentage === 25 ||
          completionPercentage === 50 ||
          completionPercentage === 75 ||
          completionPercentage === 100
        ) {
          reward = "milestone";
        }
      }

      setRewardType(reward);
      setShowReward(true);

      // Hide reward after a delay
      setTimeout(() => {
        setShowReward(false);
      }, 2000);
    } else {
      // Reset streak on incorrect answer
      setStreakCount(0);
    }

    setLastAnswerTime(currentTime);

    // Automatically move to next problem after feedback
    setTimeout(() => {
      if (currentProblemIndex < problems.length - 1) {
        moveToNextProblem();
      } else {
        // Complete the session
        const finalResults = {
          correct: results.correct + (isCorrect ? 1 : 0),
          total: problems.length,
        };
        setResults(finalResults);
        onComplete(finalResults);
      }
    }, 2500);
  };

  const showNextHint = () => {
    if (!showHint) {
      setShowHint(true);
    } else if (currentHintIndex < currentProblem.hints.length - 1) {
      setCurrentHintIndex((prev) => prev + 1);
    }
  };

  const moveToNextProblem = () => {
    setCurrentProblemIndex((prev) => prev + 1);
    setUserAnswer("");
    setWorkingArea("");
    setFeedback(null);
    setShowHint(false);
    setCurrentHintIndex(0);
    setResults((prev) => ({ ...prev, total: prev.total + 1 }));
  };

  return (
    <div className="w-full h-full bg-white p-4 rounded-lg shadow-md flex flex-col relative">
      {/* AI Teacher Prompt Bubble */}
      <AnimatePresence>
        {showAiPrompt && aiPrompt && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.8 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8, y: 10 }}
            className="absolute top-4 right-4 bg-blue-100 border border-blue-200 p-3 rounded-lg max-w-xs z-10 shadow-md"
          >
            <div className="flex items-start gap-2">
              <div className="w-8 h-8 rounded-full overflow-hidden flex-shrink-0 border-2 border-blue-300">
                <img
                  src="https://api.dicebear.com/7.x/avataaars/svg?seed=mathkong&accessories=eyepatch"
                  alt="AI Teacher"
                  className="w-full h-full"
                />
              </div>
              <div>
                <p className="text-sm font-medium text-blue-800">Ms. Kong</p>
                <p className="text-sm text-blue-700">{aiPrompt}</p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Reward Animation */}
      <AnimatePresence>
        {showReward && (
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.5 }}
            className="fixed inset-0 flex items-center justify-center z-50 pointer-events-none"
          >
            <div className="bg-gradient-to-r from-yellow-400 via-yellow-500 to-yellow-600 p-6 rounded-xl shadow-lg text-center text-white relative overflow-hidden">
              <motion.div
                className="absolute inset-0 opacity-20"
                animate={{
                  background: [
                    "rgba(255,255,255,0.1)",
                    "rgba(255,255,255,0.3)",
                    "rgba(255,255,255,0.1)",
                  ],
                }}
                transition={{ repeat: Infinity, duration: 1.5 }}
              />
              <div className="relative z-10">
                {rewardType === "correct" && (
                  <>
                    <Check className="h-12 w-12 mx-auto mb-2 text-white" />
                    <h3 className="text-xl font-bold mb-1">Correct Answer!</h3>
                    <p>Great job solving this problem!</p>
                  </>
                )}
                {rewardType === "streak" && (
                  <>
                    <Sparkles className="h-12 w-12 mx-auto mb-2 text-white" />
                    <h3 className="text-xl font-bold mb-1">Awesome Streak!</h3>
                    <p>You've solved {streakCount + 1} problems in a row!</p>
                  </>
                )}
                {rewardType === "fast" && (
                  <>
                    <Star className="h-12 w-12 mx-auto mb-2 text-white" />
                    <h3 className="text-xl font-bold mb-1">Lightning Fast!</h3>
                    <p>Impressive speed solving this problem!</p>
                  </>
                )}
                {rewardType === "milestone" && (
                  <>
                    <Trophy className="h-12 w-12 mx-auto mb-2 text-white" />
                    <h3 className="text-xl font-bold mb-1">
                      Achievement Unlocked!
                    </h3>
                    <p>You've reached a new milestone!</p>
                  </>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="flex justify-between items-center mb-4">
        <div className="flex items-center">
          <div className="w-8 h-8 rounded-full overflow-hidden mr-3 border-2 border-blue-300">
            <img
              src="https://api.dicebear.com/7.x/avataaars/svg?seed=mathkong&accessories=eyepatch"
              alt="AI Teacher"
              className="w-full h-full"
            />
          </div>
          <h2 className="text-xl font-bold text-gray-800">
            {currentLesson} - Practice
          </h2>
        </div>
        <div className="text-sm text-gray-600 flex items-center">
          <div className="mr-3 bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-xs font-medium flex items-center">
            <Award className="h-3 w-3 mr-1" />
            Streak: {streakCount}
          </div>
          Problem {currentProblemIndex + 1} of {problems.length}
        </div>
      </div>

      <Card className="flex-grow mb-4">
        <CardHeader>
          <CardTitle className="flex items-center">
            <span
              className={`inline-flex items-center justify-center w-6 h-6 rounded-full mr-2 text-xs ${getDifficultyColor(currentProblem.difficulty)}`}
            >
              {currentProblemIndex + 1}
            </span>
            <span className="text-lg">{currentProblem.topic}</span>
            <span className="ml-auto text-sm bg-gray-100 px-2 py-1 rounded">
              {currentProblem.difficulty}
            </span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="p-4 bg-gray-50 rounded-md">
            <p className="text-lg font-medium">{currentProblem.question}</p>
          </div>

          <div className="space-y-2">
            <label
              htmlFor="answer"
              className="block text-sm font-medium text-gray-700"
            >
              Your Answer:
            </label>
            <Input
              id="answer"
              value={userAnswer}
              onChange={(e) => setUserAnswer(e.target.value)}
              placeholder="Enter your answer here"
              className="w-full"
              disabled={feedback !== null}
            />
          </div>

          <div className="space-y-2">
            <label
              htmlFor="workingArea"
              className="block text-sm font-medium text-gray-700 flex items-center"
            >
              Working Area{" "}
              <span className="text-xs text-gray-500 ml-2">(optional)</span>
            </label>
            <Textarea
              id="workingArea"
              value={workingArea}
              onChange={(e) => setWorkingArea(e.target.value)}
              placeholder="Show your work here..."
              className="w-full h-32"
            />
          </div>

          {showHint && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="p-3 bg-amber-50 border border-amber-200 rounded-md"
            >
              <div className="flex items-start">
                <Lightbulb className="h-5 w-5 text-amber-500 mr-2 mt-0.5" />
                <div>
                  <p className="font-medium text-amber-800 text-sm">
                    Hint {currentHintIndex + 1}:
                  </p>
                  <p className="text-amber-700">
                    {currentProblem.hints[currentHintIndex]}
                  </p>
                </div>
              </div>
            </motion.div>
          )}

          {feedback && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className={`p-3 rounded-md ${feedback === "correct" ? "bg-green-50 border border-green-200" : "bg-red-50 border border-red-200"}`}
            >
              <div className="flex items-center">
                {feedback === "correct" ? (
                  <Check className="h-5 w-5 text-green-500 mr-2" />
                ) : (
                  <X className="h-5 w-5 text-red-500 mr-2" />
                )}
                <p
                  className={
                    feedback === "correct" ? "text-green-700" : "text-red-700"
                  }
                >
                  {feedback === "correct"
                    ? "Correct! Great job!"
                    : `Incorrect. The correct answer is ${currentProblem.solution}.`}
                </p>
              </div>
            </motion.div>
          )}
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button
            variant="outline"
            onClick={showNextHint}
            disabled={
              showHint && currentHintIndex >= currentProblem.hints.length - 1
            }
            className="flex items-center"
          >
            <HelpCircle className="h-4 w-4 mr-2" />
            {!showHint ? "Show Hint" : "Next Hint"}
          </Button>

          <Button
            onClick={checkAnswer}
            disabled={!userAnswer.trim() || feedback !== null}
            className="flex items-center"
          >
            Check Answer
            <ChevronRight className="h-4 w-4 ml-2" />
          </Button>
        </CardFooter>
      </Card>

      <div className="flex justify-between items-center text-sm text-gray-600">
        <div>
          Score: {results.correct}/{results.total}
        </div>
        <div className="flex items-center">
          <span className="mr-2">Progress:</span>
          <div className="w-32 h-2 bg-gray-200 rounded-full overflow-hidden">
            <div
              className="h-full bg-blue-500 rounded-full"
              style={{
                width: `${(currentProblemIndex / problems.length) * 100}%`,
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

// Helper function to get color based on difficulty
const getDifficultyColor = (difficulty: string) => {
  switch (difficulty) {
    case "easy":
      return "bg-green-100 text-green-800";
    case "medium":
      return "bg-yellow-100 text-yellow-800";
    case "hard":
      return "bg-red-100 text-red-800";
    default:
      return "bg-gray-100 text-gray-800";
  }
};

export default InteractiveProblemArea;
