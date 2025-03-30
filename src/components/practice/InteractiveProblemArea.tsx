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
  BookOpen,
  FileText,
  Video,
  Link,
  Mic,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";

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
  lessonType?: "algebra" | "geometry" | "calculus" | "statistics";
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
  const [studentState, setStudentState] = useState<
    "idle" | "typing" | "thinking" | "stuck"
  >("idle");
  const [lastActivityTime, setLastActivityTime] = useState<number>(Date.now());
  const [streakCount, setStreakCount] = useState(0);
  const [lastAnswerTime, setLastAnswerTime] = useState<number | null>(null);
  const [questionInput, setQuestionInput] = useState("");

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
    stuck: [
      "I notice you've been on this step for a while. The key insight here is to factor the expression first.",
      "You seem to be stuck. Remember that we can use the quadratic formula when we can't easily factor.",
      "Let me give you a hint: try substituting the values into the equation first.",
    ],
    specific: [
      "I see you're using the wrong formula for this type of problem. Let's review the correct approach.",
      "Great job setting up the equation! Now remember to isolate the variable on one side.",
      "You're on the right track, but don't forget to check both possible solutions for this quadratic.",
    ],
    personalized: [
      "Last time we worked on a similar problem, you found success by drawing a diagram first. That might help here too!",
      "You've been making excellent progress with factoring. Let's apply that strength to this problem.",
      "I remember you mentioned finding word problems challenging. Let's break this down step by step together.",
    ],
  };

  // Track student state based on activity
  useEffect(() => {
    const activityTimer = setInterval(() => {
      const currentTime = Date.now();
      const timeSinceLastActivity = currentTime - lastActivityTime;

      // If no activity for 15 seconds, consider student might be stuck
      if (
        timeSinceLastActivity > 15000 &&
        feedback === null &&
        studentState !== "stuck"
      ) {
        setStudentState("stuck");
      }
      // If no activity for 5 seconds but less than 15, they might be thinking
      else if (
        timeSinceLastActivity > 5000 &&
        timeSinceLastActivity <= 15000 &&
        studentState !== "thinking"
      ) {
        setStudentState("thinking");
      }
    }, 1000);

    return () => clearInterval(activityTimer);
  }, [lastActivityTime, feedback, studentState]);

  // Show contextual AI prompts based on student state
  useEffect(() => {
    if (feedback === null) {
      let promptCategory: keyof typeof aiPrompts;
      let promptDelay = 0;

      if (studentState === "stuck") {
        promptCategory = "stuck";
        promptDelay = 1000; // Show stuck prompts quickly
      } else if (studentState === "thinking") {
        promptCategory = "hint";
        promptDelay = 3000; // Give them a bit more time if just thinking
      } else if (workingArea.length > 0 && userAnswer.length === 0) {
        // They're working but haven't submitted an answer
        promptCategory = "specific";
        promptDelay = 5000;
      } else {
        // Default encouragement
        promptCategory = "encouragement";
        promptDelay = 8000;
      }

      // Occasionally show personalized prompts
      if (Math.random() < 0.3) {
        promptCategory = "personalized";
      }

      const promptTimer = setTimeout(() => {
        const randomIndex = Math.floor(
          Math.random() * aiPrompts[promptCategory].length,
        );
        setAiPrompt(aiPrompts[promptCategory][randomIndex]);
        setShowAiPrompt(true);

        // Hide the prompt after some time
        setTimeout(() => {
          setShowAiPrompt(false);
        }, 6000);
      }, promptDelay);

      return () => clearTimeout(promptTimer);
    }
  }, [currentProblemIndex, feedback, userAnswer, studentState, workingArea]);

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
    setStudentState("idle");
    setLastActivityTime(Date.now());
    setShowAiPrompt(false);
    setAiPrompt(null);
    setQuestionInput("");
  };

  const handleAskQuestion = () => {
    if (questionInput.trim()) {
      // Generate a response based on the question
      let response = "";

      if (
        questionInput.toLowerCase().includes("hint") ||
        questionInput.toLowerCase().includes("help")
      ) {
        response = `Here's a hint: ${currentProblem.hints[Math.min(currentHintIndex, currentProblem.hints.length - 1)]}`;
      } else if (
        questionInput.toLowerCase().includes("solution") ||
        questionInput.toLowerCase().includes("answer")
      ) {
        response =
          "Try working through the problem step by step. Use the hint button if you need guidance.";
      } else if (questionInput.toLowerCase().includes("formula")) {
        response = currentProblem.topic.toLowerCase().includes("circle")
          ? "For circles, remember that area = πr² and circumference = 2πr."
          : "For quadratic equations, you can use the quadratic formula: x = (-b ± √(b² - 4ac)) / 2a";
      } else {
        response = `I understand your question about "${questionInput.substring(0, 30)}${questionInput.length > 30 ? "..." : ""}".
          Let me help you with this ${currentProblem.topic} problem. ${currentProblem.hints[0]}`;
      }

      // Show the response as an AI prompt
      setAiPrompt(response);
      setShowAiPrompt(true);
      setQuestionInput("");

      // Hide the prompt after some time
      setTimeout(() => {
        setShowAiPrompt(false);
      }, 8000);
    }
  };

  return (
    <div className="w-full h-full bg-white rounded-lg shadow-md flex flex-col relative overflow-hidden">
      {/* Reward Animation */}
      <AnimatePresence>
        {showReward && (
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.5 }}
            className="fixed inset-0 flex items-center justify-center z-50 pointer-events-none"
          >
            <div className="bg-gradient-to-r from-warning-400 via-warning-500 to-warning-600 p-6 rounded-xl shadow-hard text-center text-white relative overflow-hidden">
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

      <div className="w-full h-full flex flex-col">
        <div className="bg-white border-b px-4 py-2 flex items-center justify-between">
          <div className="flex items-center">
            <div className="w-8 h-8 rounded-full overflow-hidden mr-3 border-2 border-blue-300 flex-shrink-0">
              <img
                src="https://api.dicebear.com/7.x/avataaars/svg?seed=mathkong&accessories=eyepatch"
                alt="AI Teacher"
                className="w-full h-full"
              />
            </div>
            <h2 className="text-xl font-bold text-gray-800 truncate">
              {currentLesson}
            </h2>
          </div>
          <div className="text-sm text-gray-600 flex items-center ml-2">
            <div className="bg-secondary-100 text-secondary-800 px-2 py-1 rounded-full text-xs font-medium flex items-center">
              <Award className="h-3 w-3 mr-1 flex-shrink-0" />
              <span className="whitespace-nowrap">Streak: {streakCount}</span>
            </div>
          </div>
        </div>

        <div className="flex-grow overflow-auto p-4 md:p-6 md:pr-[280px] lg:pr-[320px] pb-16">
          <Card className="mb-4">
            <CardHeader>
              <CardTitle className="flex items-center flex-wrap gap-y-2">
                <span
                  className={`inline-flex items-center justify-center w-6 h-6 rounded-full mr-2 text-xs flex-shrink-0 ${getDifficultyColor(currentProblem.difficulty)}`}
                >
                  {currentProblemIndex + 1}
                </span>
                <span className="text-lg truncate mr-2">
                  {currentProblem.topic}
                </span>
                <span className="ml-auto text-sm bg-gray-100 px-2 py-1 rounded whitespace-nowrap">
                  {currentProblem.difficulty}
                </span>
              </CardTitle>
              <CardDescription>
                Problem {currentProblemIndex + 1} of {problems.length}
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="p-4 bg-gray-50 rounded-md border border-gray-200 shadow-sm">
                <div className="flex items-start">
                  <div className="mr-3 flex-shrink-0">
                    <div
                      className={`w-8 h-8 rounded-full flex items-center justify-center ${getDifficultyColor(currentProblem.difficulty)}`}
                    >
                      <span className="text-sm font-medium">
                        {currentProblemIndex + 1}
                      </span>
                    </div>
                  </div>
                  <div className="flex-1 overflow-hidden">
                    <div className="flex items-center flex-wrap mb-1">
                      <span className="text-xs font-medium text-gray-500 bg-gray-200 px-2 py-0.5 rounded-full mr-2 mb-1">
                        {currentProblem.topic}
                      </span>
                      <span className="text-xs font-medium text-gray-500 mb-1">
                        {currentProblem.difficulty}
                      </span>
                    </div>
                    <p className="text-lg font-medium text-gray-800 break-words">
                      {currentProblem.question}
                    </p>
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <label
                  htmlFor="answer"
                  className="block text-sm font-medium text-gray-700 flex items-center justify-between"
                >
                  <span>Your Answer:</span>
                  {feedback === null && (
                    <span className="text-xs text-gray-500 flex items-center">
                      <HelpCircle className="h-3 w-3 mr-1" />
                      Enter your solution to the problem
                    </span>
                  )}
                </label>
                <div className="relative">
                  <Input
                    id="answer"
                    value={userAnswer}
                    onChange={(e) => {
                      setUserAnswer(e.target.value);
                      setLastActivityTime(Date.now());
                      setStudentState("typing");
                    }}
                    onFocus={() => {
                      setLastActivityTime(Date.now());
                      setStudentState("typing");
                    }}
                    placeholder="Enter your answer here"
                    className={`w-full ${feedback !== null ? "border-gray-200 bg-gray-50" : ""}`}
                    disabled={feedback !== null}
                  />
                  {feedback === "correct" && (
                    <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                      <Check className="h-5 w-5 text-success-500" />
                    </div>
                  )}
                </div>
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
                  onChange={(e) => {
                    setWorkingArea(e.target.value);
                    setLastActivityTime(Date.now());
                    setStudentState("typing");
                  }}
                  onFocus={() => {
                    setLastActivityTime(Date.now());
                    setStudentState("typing");
                  }}
                  placeholder="Show your work here..."
                  className="w-full h-32"
                />
              </div>

              {/* Inline Hints Section */}
              <div className="mt-4 space-y-3">
                <div className="flex items-center justify-between flex-wrap gap-y-2">
                  <h4 className="text-sm font-medium text-gray-700">Hints</h4>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={showNextHint}
                    disabled={
                      showHint &&
                      currentHintIndex >= currentProblem.hints.length - 1
                    }
                    className="flex items-center text-secondary-600 hover:text-secondary-700"
                  >
                    <Lightbulb className="h-3.5 w-3.5 mr-1 flex-shrink-0" />
                    <span className="whitespace-nowrap">
                      {!showHint ? "Show Hint" : "Next Hint"}
                    </span>
                  </Button>
                </div>

                <AnimatePresence>
                  {showHint && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.2 }}
                      className="overflow-hidden"
                    >
                      <div className="p-3 bg-warning-50 border border-warning-200 rounded-md">
                        <div className="flex items-start">
                          <Lightbulb className="h-5 w-5 text-warning-500 mr-2 mt-0.5 flex-shrink-0" />
                          <div className="flex-1 overflow-hidden">
                            <p className="font-medium text-warning-800 text-sm">
                              Hint {currentHintIndex + 1} of{" "}
                              {currentProblem.hints.length}:
                            </p>
                            <p className="text-warning-700 break-words">
                              {currentProblem.hints[currentHintIndex]}
                            </p>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Inline Feedback Section */}
              <AnimatePresence>
                {feedback && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.3 }}
                    className="mt-4"
                  >
                    <div
                      className={`p-4 rounded-md shadow-sm ${feedback === "correct" ? "bg-success-50 border border-success-200" : "bg-error-50 border border-error-200"}`}
                    >
                      <div className="flex items-start">
                        {feedback === "correct" ? (
                          <div className="h-8 w-8 rounded-full bg-success-100 flex items-center justify-center mr-3 flex-shrink-0">
                            <Check className="h-5 w-5 text-success-600" />
                          </div>
                        ) : (
                          <div className="h-8 w-8 rounded-full bg-error-100 flex items-center justify-center mr-3 flex-shrink-0">
                            <X className="h-5 w-5 text-error-600" />
                          </div>
                        )}
                        <div className="flex-1">
                          <h4
                            className={
                              feedback === "correct"
                                ? "font-bold text-success-700 text-lg"
                                : "font-bold text-error-700 text-lg"
                            }
                          >
                            {feedback === "correct" ? "Correct!" : "Incorrect"}
                          </h4>
                          <p
                            className={
                              feedback === "correct"
                                ? "text-success-700 mt-1"
                                : "text-error-700 mt-1"
                            }
                          >
                            {feedback === "correct"
                              ? "Great job solving this problem!"
                              : `The correct answer is ${currentProblem.solution}.`}
                          </p>

                          {feedback === "incorrect" && (
                            <motion.div
                              initial={{ opacity: 0, height: 0 }}
                              animate={{ opacity: 1, height: "auto" }}
                              transition={{ delay: 0.2, duration: 0.3 }}
                              className="mt-3"
                            >
                              <div className="p-3 bg-white rounded-md border border-gray-200 shadow-sm">
                                <div className="flex items-center mb-2">
                                  <BookOpen className="h-4 w-4 text-primary-500 mr-2 flex-shrink-0" />
                                  <h5 className="font-medium text-gray-800 truncate">
                                    Solution Approach
                                  </h5>
                                </div>
                                <ol className="text-sm list-decimal pl-5 space-y-2">
                                  {currentProblem.hints.map((hint, index) => (
                                    <li key={index} className="text-gray-700">
                                      {hint}
                                    </li>
                                  ))}
                                </ol>
                              </div>
                            </motion.div>
                          )}
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </CardContent>
            <CardFooter className="flex flex-wrap justify-between gap-y-2">
              <div className="flex flex-wrap items-center text-sm text-gray-600 gap-y-2">
                <span className="mr-4">
                  Score: {results.correct}/{results.total}
                </span>
                <div className="flex items-center flex-wrap gap-y-1">
                  <span className="mr-2">Progress:</span>
                  <div className="w-24 h-2 bg-gray-200 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-secondary-500 rounded-full"
                      style={{
                        width: `${(currentProblemIndex / problems.length) * 100}%`,
                      }}
                    />
                  </div>
                </div>
              </div>

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
        </div>
      </div>

      {/* Teacher sidebar - fixed position */}
      <div className="teacher-sidebar-container hidden md:block fixed right-0 top-0 bottom-0 z-10 w-[260px] lg:w-[300px] bg-white border-l border-gray-200 p-4 overflow-y-auto">
        <div className="flex flex-col h-full">
          <div className="flex-shrink-0">
            <div className="aspect-video bg-gray-100 rounded-lg overflow-hidden mb-4 relative shadow-sm">
              <img
                src="https://api.dicebear.com/7.x/avataaars/svg?seed=mathkong&accessories=eyeglasses"
                alt="AI Teacher"
                className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-32"
              />
              <div className="absolute bottom-2 right-2 bg-red-500 text-white text-xs px-1.5 py-0.5 rounded-full">
                LIVE
              </div>
            </div>
            <h3 className="font-medium text-center mb-1">Ms. Kong</h3>
            <p className="text-xs text-gray-500 text-center mb-4">
              Math Teacher
            </p>
          </div>

          {/* AI Prompt - always visible in sidebar */}
          <AnimatePresence>
            {showAiPrompt && aiPrompt && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="mb-4"
              >
                <div className="p-3 bg-secondary-50 border-l-4 border-secondary-300 rounded-md shadow-sm">
                  <p className="text-sm">{aiPrompt}</p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Question Interface */}
          <div className="mt-auto border-t border-gray-200 pt-4">
            <h3 className="text-sm font-medium mb-2 flex items-center">
              <HelpCircle className="h-4 w-4 mr-2 text-primary-500 flex-shrink-0" />
              <span className="truncate">Ask a Question</span>
            </h3>
            <div className="flex mb-2 w-full">
              <Input
                placeholder="Type your question here..."
                className="flex-grow rounded-r-none border-r-0 text-sm min-w-0"
                value={questionInput}
                onChange={(e) => setQuestionInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleAskQuestion()}
              />
              <Button
                variant="default"
                size="icon"
                className="rounded-l-none rounded-r-md flex-shrink-0 h-10 w-10"
                onClick={handleAskQuestion}
              >
                <ChevronRight size={16} />
              </Button>
            </div>
            <Button
              variant="secondary"
              className="w-full"
              onClick={() => {
                setAiPrompt(
                  "I'm listening to your question. Please speak clearly...",
                );
                setShowAiPrompt(true);
                setTimeout(() => {
                  setAiPrompt(
                    "I heard you asking about the problem. Let me help: " +
                      currentProblem.hints[0],
                  );
                  setTimeout(() => setShowAiPrompt(false), 6000);
                }, 2000);
              }}
            >
              <Mic className="h-4 w-4 mr-2" />
              Ask with Voice
            </Button>
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
      return "bg-success-100 text-success-800";
    case "medium":
      return "bg-warning-100 text-warning-800";
    case "hard":
      return "bg-error-100 text-error-800";
    default:
      return "bg-gray-100 text-gray-800";
  }
};

export default InteractiveProblemArea;
