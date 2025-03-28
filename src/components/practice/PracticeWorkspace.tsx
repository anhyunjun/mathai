import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
  CheckCircle,
  XCircle,
  HelpCircle,
  ArrowRight,
  ArrowLeft,
  Home,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface Problem {
  id: string;
  question: string;
  options?: string[];
  correctAnswer: string | number;
  explanation: string;
  difficulty: "easy" | "medium" | "hard";
  type: "multiple-choice" | "fill-in" | "equation";
}

interface PracticeWorkspaceProps {
  topicTitle?: string;
  topicDescription?: string;
  problems?: Problem[];
  onComplete?: () => void;
  onExit?: () => void;
}

const PracticeWorkspace = ({
  topicTitle = "Algebra Basics",
  topicDescription = "Practice solving basic algebraic equations and expressions.",
  problems = [
    {
      id: "1",
      question: "Solve for x: 2x + 3 = 7",
      options: ["x = 1", "x = 2", "x = 3", "x = 4"],
      correctAnswer: "x = 2",
      explanation:
        "To solve for x, subtract 3 from both sides: 2x = 4. Then divide both sides by 2: x = 2.",
      difficulty: "easy",
      type: "multiple-choice",
    },
    {
      id: "2",
      question: "Factor the expression: x² - 9",
      options: ["(x - 3)(x + 3)", "(x - 9)(x + 1)", "(x - 3)²", "(x + 3)²"],
      correctAnswer: "(x - 3)(x + 3)",
      explanation:
        "This is a difference of squares: a² - b² = (a - b)(a + b). With a = x and b = 3, we get (x - 3)(x + 3).",
      difficulty: "medium",
      type: "multiple-choice",
    },
    {
      id: "3",
      question: "Solve the equation: 3(x - 2) = 15",
      options: ["x = 5", "x = 7", "x = 9", "x = 11"],
      correctAnswer: "x = 7",
      explanation:
        "First, distribute: 3x - 6 = 15. Then, add 6 to both sides: 3x = 21. Finally, divide by 3: x = 7.",
      difficulty: "medium",
      type: "multiple-choice",
    },
  ],
  onComplete = () => console.log("Practice completed"),
  onExit = () => console.log("Exit practice"),
}: PracticeWorkspaceProps) => {
  const [currentProblemIndex, setCurrentProblemIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [showExplanation, setShowExplanation] = useState(false);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);

  const currentProblem = problems[currentProblemIndex];
  const progress = ((currentProblemIndex + 1) / problems.length) * 100;

  const handleAnswerSelect = (answer: string) => {
    setSelectedAnswer(answer);
  };

  const handleSubmit = () => {
    if (!selectedAnswer) return;

    const correct = selectedAnswer === currentProblem.correctAnswer;
    setIsCorrect(correct);
    setShowExplanation(true);
    setAnswers({
      ...answers,
      [currentProblem.id]: selectedAnswer,
    });
  };

  const handleNext = () => {
    if (currentProblemIndex < problems.length - 1) {
      setCurrentProblemIndex(currentProblemIndex + 1);
      setSelectedAnswer(null);
      setShowExplanation(false);
      setIsCorrect(null);
    } else {
      onComplete();
    }
  };

  const handlePrevious = () => {
    if (currentProblemIndex > 0) {
      setCurrentProblemIndex(currentProblemIndex - 1);
      setSelectedAnswer(answers[problems[currentProblemIndex - 1].id] || null);
      setShowExplanation(!!answers[problems[currentProblemIndex - 1].id]);
      setIsCorrect(
        answers[problems[currentProblemIndex - 1].id] ===
          problems[currentProblemIndex - 1].correctAnswer,
      );
    }
  };

  const getDifficultyColor = (difficulty: Problem["difficulty"]) => {
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

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <div>
            <Button variant="outline" size="sm" onClick={onExit}>
              <Home className="h-4 w-4 mr-2" />
              Back to Dashboard
            </Button>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-sm font-medium">
              Problem {currentProblemIndex + 1} of {problems.length}
            </span>
            <Progress value={progress} className="w-40 h-2" />
          </div>
        </div>

        {/* Topic Info */}
        <Card className="mb-6">
          <CardHeader className="pb-2">
            <CardTitle className="text-2xl">{topicTitle}</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-600">{topicDescription}</p>
          </CardContent>
        </Card>

        {/* Problem Card */}
        <Card className="mb-6">
          <CardHeader className="pb-2">
            <div className="flex justify-between items-center">
              <CardTitle className="text-xl">
                Problem {currentProblemIndex + 1}
              </CardTitle>
              <Badge
                className={cn(getDifficultyColor(currentProblem.difficulty))}
              >
                {currentProblem.difficulty.charAt(0).toUpperCase() +
                  currentProblem.difficulty.slice(1)}
              </Badge>
            </div>
          </CardHeader>
          <CardContent>
            <div className="mb-6">
              <h3 className="text-lg font-medium mb-4">
                {currentProblem.question}
              </h3>

              {currentProblem.type === "multiple-choice" && (
                <div className="space-y-3">
                  {currentProblem.options?.map((option) => (
                    <div
                      key={option}
                      className={cn(
                        "p-4 border rounded-lg cursor-pointer transition-all",
                        selectedAnswer === option &&
                          !showExplanation &&
                          "border-blue-500 bg-blue-50",
                        showExplanation &&
                          option === currentProblem.correctAnswer &&
                          "border-green-500 bg-green-50",
                        showExplanation &&
                          selectedAnswer === option &&
                          option !== currentProblem.correctAnswer &&
                          "border-red-500 bg-red-50",
                      )}
                      onClick={() =>
                        !showExplanation && handleAnswerSelect(option)
                      }
                    >
                      <div className="flex items-center justify-between">
                        <span>{option}</span>
                        {showExplanation &&
                          option === currentProblem.correctAnswer && (
                            <CheckCircle className="h-5 w-5 text-green-600" />
                          )}
                        {showExplanation &&
                          selectedAnswer === option &&
                          option !== currentProblem.correctAnswer && (
                            <XCircle className="h-5 w-5 text-red-600" />
                          )}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {showExplanation && (
              <div className="mt-6 p-4 bg-blue-50 rounded-lg">
                <h4 className="font-medium flex items-center gap-2 mb-2">
                  {isCorrect ? (
                    <>
                      <CheckCircle className="h-5 w-5 text-green-600" />
                      <span className="text-green-600">Correct!</span>
                    </>
                  ) : (
                    <>
                      <XCircle className="h-5 w-5 text-red-600" />
                      <span className="text-red-600">Incorrect</span>
                    </>
                  )}
                </h4>
                <Separator className="my-2" />
                <div className="mt-2">
                  <h4 className="font-medium mb-1">Explanation:</h4>
                  <p>{currentProblem.explanation}</p>
                </div>
              </div>
            )}
          </CardContent>
          <CardFooter className="flex justify-between">
            <Button
              variant="outline"
              onClick={handlePrevious}
              disabled={currentProblemIndex === 0}
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Previous
            </Button>
            <div>
              {!showExplanation ? (
                <Button onClick={handleSubmit} disabled={!selectedAnswer}>
                  Submit Answer
                </Button>
              ) : (
                <Button onClick={handleNext}>
                  {currentProblemIndex < problems.length - 1 ? (
                    <>
                      Next
                      <ArrowRight className="h-4 w-4 ml-2" />
                    </>
                  ) : (
                    "Complete Practice"
                  )}
                </Button>
              )}
            </div>
          </CardFooter>
        </Card>

        {/* Help Section */}
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg flex items-center gap-2">
              <HelpCircle className="h-5 w-5 text-blue-500" />
              Need Help?
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-gray-600">
              If you're stuck on this problem, try reviewing the lesson
              materials or click the hint button below.
            </p>
            <Button variant="outline" className="mt-2">
              Show Hint
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default PracticeWorkspace;
