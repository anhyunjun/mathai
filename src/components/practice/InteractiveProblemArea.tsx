import React, { useState } from "react";
import { motion } from "framer-motion";
import { Check, X, HelpCircle, ChevronRight, Lightbulb } from "lucide-react";

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

  const currentProblem = problems[currentProblemIndex];

  const checkAnswer = () => {
    const isCorrect = userAnswer.trim() === currentProblem.solution.trim();
    setFeedback(isCorrect ? "correct" : "incorrect");

    if (isCorrect) {
      setResults((prev) => ({ ...prev, correct: prev.correct + 1 }));
    }

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
    }, 1500);
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
    <div className="w-full h-full bg-white p-4 rounded-lg shadow-md flex flex-col">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold text-gray-800">
          {currentLesson} - Practice
        </h2>
        <div className="text-sm text-gray-600">
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
