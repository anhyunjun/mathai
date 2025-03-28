import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
  CardFooter,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { CheckCircle, ChevronLeft, ChevronRight } from "lucide-react";

interface Question {
  id: string;
  text: string;
  options: string[];
  correctAnswer: string;
  difficulty: "easy" | "medium" | "hard";
  topic: string;
}

const questions: Question[] = [
  {
    id: "1",
    text: "What is the value of x in the equation 2x + 5 = 13?",
    options: ["x = 3", "x = 4", "x = 5", "x = 6"],
    correctAnswer: "x = 4",
    difficulty: "easy",
    topic: "algebra",
  },
  {
    id: "2",
    text: "Simplify the expression: 3(2x - 4) + 5",
    options: ["6x - 12 + 5", "6x - 7", "6x - 12", "6x - 7 + 5"],
    correctAnswer: "6x - 7",
    difficulty: "medium",
    topic: "algebra",
  },
  {
    id: "3",
    text: "What is the area of a circle with radius 5 units? (Use π = 3.14)",
    options: [
      "15.7 square units",
      "31.4 square units",
      "78.5 square units",
      "25 square units",
    ],
    correctAnswer: "78.5 square units",
    difficulty: "medium",
    topic: "geometry",
  },
  {
    id: "4",
    text: "Solve for x: log₂(x) = 3",
    options: ["x = 6", "x = 8", "x = 9", "x = 16"],
    correctAnswer: "x = 8",
    difficulty: "hard",
    topic: "algebra",
  },
  {
    id: "5",
    text: "What is the derivative of f(x) = x² + 3x?",
    options: ["f'(x) = 2x", "f'(x) = 2x + 3", "f'(x) = x² + 3", "f'(x) = 2x²"],
    correctAnswer: "f'(x) = 2x + 3",
    difficulty: "hard",
    topic: "calculus",
  },
];

const SkillAssessment = () => {
  const navigate = useNavigate();
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [showResults, setShowResults] = useState(false);

  const currentQuestion = questions[currentQuestionIndex];
  const progress = ((currentQuestionIndex + 1) / questions.length) * 100;

  const handleAnswerSelect = (answer: string) => {
    setAnswers({
      ...answers,
      [currentQuestion.id]: answer,
    });
  };

  const handleNext = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      setShowResults(true);
    }
  };

  const handlePrevious = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    }
  };

  const handleComplete = () => {
    // In a real app, you would send the assessment results to your backend
    // For now, we'll just navigate to the curriculum page
    navigate("/curriculum");
  };

  const calculateScore = () => {
    let correctCount = 0;
    questions.forEach((question) => {
      if (answers[question.id] === question.correctAnswer) {
        correctCount++;
      }
    });
    return (correctCount / questions.length) * 100;
  };

  if (showResults) {
    const score = calculateScore();
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <Card className="w-full max-w-2xl">
          <CardHeader>
            <CardTitle className="text-2xl font-bold text-center">
              Assessment Complete!
            </CardTitle>
            <CardDescription className="text-center">
              Thank you for completing the math skills assessment
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex flex-col items-center justify-center py-6">
              <div className="relative h-40 w-40 mb-4">
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-3xl font-bold">
                    {Math.round(score)}%
                  </span>
                </div>
                <svg className="h-full w-full" viewBox="0 0 100 100">
                  <circle
                    className="text-gray-200"
                    strokeWidth="8"
                    stroke="currentColor"
                    fill="transparent"
                    r="40"
                    cx="50"
                    cy="50"
                  />
                  <circle
                    className="text-primary"
                    strokeWidth="8"
                    strokeDasharray={`${score * 2.51} 251.2`}
                    strokeLinecap="round"
                    stroke="currentColor"
                    fill="transparent"
                    r="40"
                    cx="50"
                    cy="50"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">Your Score</h3>
              <p className="text-gray-600 text-center max-w-md">
                Based on your assessment, we'll create a personalized learning
                plan to help you improve your math skills.
              </p>
            </div>

            <div className="space-y-4">
              <h3 className="font-semibold">Strengths:</h3>
              <div className="bg-green-50 p-4 rounded-lg">
                <ul className="space-y-2">
                  {score >= 60 && (
                    <li className="flex items-center">
                      <CheckCircle className="h-5 w-5 text-green-500 mr-2" />{" "}
                      Basic Algebra
                    </li>
                  )}
                  {score >= 80 && (
                    <li className="flex items-center">
                      <CheckCircle className="h-5 w-5 text-green-500 mr-2" />{" "}
                      Equation Solving
                    </li>
                  )}
                  {score >= 40 && (
                    <li className="flex items-center">
                      <CheckCircle className="h-5 w-5 text-green-500 mr-2" />{" "}
                      Arithmetic Operations
                    </li>
                  )}
                </ul>
              </div>

              <h3 className="font-semibold">Areas for Improvement:</h3>
              <div className="bg-blue-50 p-4 rounded-lg">
                <ul className="space-y-2">
                  {score < 80 && <li>Advanced Algebra Concepts</li>}
                  {score < 60 && <li>Geometry and Spatial Reasoning</li>}
                  {score < 90 && <li>Calculus Fundamentals</li>}
                </ul>
              </div>
            </div>
          </CardContent>
          <CardFooter>
            <Button onClick={handleComplete} className="w-full">
              View Your Personalized Curriculum
            </Button>
          </CardFooter>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-2xl">
        <CardHeader>
          <div className="flex justify-between items-center mb-2">
            <CardTitle>Math Skills Assessment</CardTitle>
            <span className="text-sm text-gray-500">
              Question {currentQuestionIndex + 1} of {questions.length}
            </span>
          </div>
          <Progress value={progress} className="h-2" />
          <CardDescription className="mt-2">
            This assessment will help us understand your current math skills and
            create a personalized learning plan.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-medium mb-4">
                {currentQuestion.text}
              </h3>
              <RadioGroup
                value={answers[currentQuestion.id] || ""}
                onValueChange={handleAnswerSelect}
              >
                <div className="space-y-3">
                  {currentQuestion.options.map((option) => (
                    <div
                      key={option}
                      className="flex items-center space-x-2 border p-3 rounded-md hover:bg-gray-50"
                    >
                      <RadioGroupItem value={option} id={option} />
                      <Label
                        htmlFor={option}
                        className="flex-grow cursor-pointer"
                      >
                        {option}
                      </Label>
                    </div>
                  ))}
                </div>
              </RadioGroup>
            </div>
          </div>
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button
            variant="outline"
            onClick={handlePrevious}
            disabled={currentQuestionIndex === 0}
          >
            <ChevronLeft className="h-4 w-4 mr-2" />
            Previous
          </Button>
          <Button onClick={handleNext} disabled={!answers[currentQuestion.id]}>
            {currentQuestionIndex < questions.length - 1 ? (
              <>
                Next
                <ChevronRight className="h-4 w-4 ml-2" />
              </>
            ) : (
              "Complete Assessment"
            )}
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default SkillAssessment;
