import React from "react";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ChevronRight,
  ChevronLeft,
  BookOpen,
  FileText,
  Calculator,
  Play,
  Pause,
  Download,
  MessageSquare,
  Lightbulb,
  Check,
  X,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";

interface LessonContentProps {
  title?: string;
  description?: string;
  currentSlide?: number;
  totalSlides?: number;
  content?: React.ReactNode;
  onNextSlide?: () => void;
  onPrevSlide?: () => void;
  lessonType?: "algebra" | "geometry" | "calculus" | "statistics";
  chatHistory?: {
    sender: string;
    message: string;
    timestamp: string;
    isProactive?: boolean;
  }[];
  isPracticeMode?: boolean;
}

// Helper function to track cursor position and student focus
const useCursorTracking = () => {
  const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 });
  const [focusArea, setFocusArea] = useState<string | null>(null);
  const [timeOnSection, setTimeOnSection] = useState<Record<string, number>>(
    {},
  );

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setCursorPosition({ x: e.clientX, y: e.clientY });

      // Determine what section the cursor is hovering over
      const element = document.elementFromPoint(e.clientX, e.clientY);
      if (element) {
        // Find closest parent with a data-section attribute or heading
        let section = element.closest("[data-section]");
        if (!section) {
          const heading = element.closest("h1, h2, h3, h4, h5, h6");
          if (heading) section = heading;
        }

        if (section && section.textContent) {
          const sectionName =
            section.getAttribute("data-section") ||
            section.textContent.trim().substring(0, 20);
          if (sectionName !== focusArea) {
            setFocusArea(sectionName);
          }
        }
      }
    };

    // Track time spent on each section
    const trackingInterval = setInterval(() => {
      if (focusArea) {
        setTimeOnSection((prev) => ({
          ...prev,
          [focusArea]: (prev[focusArea] || 0) + 1,
        }));
      }
    }, 1000);

    document.addEventListener("mousemove", handleMouseMove);
    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      clearInterval(trackingInterval);
    };
  }, [focusArea]);

  return { cursorPosition, focusArea, timeOnSection };
};

const LessonContent: React.FC<LessonContentProps> = ({
  title = "Introduction to Quadratic Equations",
  description = "Learn how to solve quadratic equations using different methods",
  currentSlide = 1,
  totalSlides = 10,
  content,
  onNextSlide = () => {},
  onPrevSlide = () => {},
  lessonType = "algebra",
  chatHistory = [],
  isPracticeMode = false,
}) => {
  // Track cursor position and focus areas
  const { focusArea, timeOnSection } = useCursorTracking();
  const [showContextualHelp, setShowContextualHelp] = useState(false);
  const [contextualHelpText, setContextualHelpText] = useState("");

  // Practice mode states
  const [userAnswer, setUserAnswer] = useState("");
  const [showHint, setShowHint] = useState(false);
  const [feedback, setFeedback] = useState<"correct" | "incorrect" | null>(
    null,
  );

  // Practice questions based on slide number
  const practiceQuestions = [
    {
      question: "Solve for x: x² - 5x + 6 = 0",
      solution: "2,3",
      hint: "Try factoring the equation into (x-a)(x-b) form.",
    },
    {
      question: "Find the values of x for which: 2x² + 5x - 3 = 0",
      solution: "-3,0.5",
      hint: "Use the quadratic formula with a=2, b=5, c=-3.",
    },
    {
      question: "Solve the quadratic equation: x² - 6x + 9 = 0",
      solution: "3",
      hint: "This is a perfect square trinomial. Try factoring it as (x-k)².",
    },
    {
      question:
        "If a ball is thrown upward with an initial velocity of 64 feet per second from a height of 80 feet, when will it hit the ground? Use the formula h = -16t² + 64t + 80",
      solution: "5",
      hint: "Set h=0 and solve for t. You'll get -16t² + 64t + 80 = 0.",
    },
    {
      question: "Solve for x: 3x² - 12 = 0",
      solution: "2,-2",
      hint: "Isolate the x² term first, then take the square root of both sides.",
    },
  ];

  // Get current practice question based on slide number
  const currentQuestion =
    practiceQuestions[
      Math.min(Math.floor((currentSlide - 1) / 2), practiceQuestions.length - 1)
    ];

  // Check the user's answer
  const checkAnswer = () => {
    const solutions = currentQuestion.solution.split(",");
    const isCorrect = solutions.includes(userAnswer.trim());
    setFeedback(isCorrect ? "correct" : "incorrect");

    // Auto-advance after feedback
    if (isCorrect) {
      setTimeout(() => {
        setFeedback(null);
        setUserAnswer("");
        setShowHint(false);
        onNextSlide();
      }, 2000);
    }
  };

  // Reset practice states when slide changes
  useEffect(() => {
    setUserAnswer("");
    setShowHint(false);
    setFeedback(null);
  }, [currentSlide]);

  // Provide contextual help based on where student is focusing
  useEffect(() => {
    if (focusArea) {
      // If student spends more than 10 seconds on a section, offer contextual help
      const timeSpent = timeOnSection[focusArea] || 0;
      if (timeSpent > 10 && !showContextualHelp) {
        // Different help text based on the section they're focusing on
        let helpText = "";
        if (focusArea.includes("Quadratic Formula")) {
          helpText =
            "The quadratic formula helps us solve any quadratic equation. Remember that a, b, and c come from the standard form ax² + bx + c = 0.";
        } else if (focusArea.includes("Example")) {
          helpText =
            "When working through examples, try to solve them yourself before looking at the solution steps.";
        } else if (focusArea.includes("Problem")) {
          helpText =
            "Take your time with this problem. Remember to identify what the question is asking for.";
        } else {
          helpText =
            "I notice you're spending time on this section. Do you have any questions about it?";
        }

        setContextualHelpText(helpText);
        setShowContextualHelp(true);

        // Hide the help after some time
        const timer = setTimeout(() => {
          setShowContextualHelp(false);
        }, 8000);

        return () => clearTimeout(timer);
      }
    }
  }, [focusArea, timeOnSection, showContextualHelp]);

  // Filter chat history to only show AI responses that are relevant to questions
  const questionResponses = chatHistory.filter(
    (chat) => chat.sender === "AI" && !chat.isProactive,
  );

  // Lecture content for different slides
  const getLectureContent = (slideNumber: number) => {
    // Determine which lecture to show based on the actual slide number
    // For odd-numbered slides, show lecture content
    const lectureIndex = Math.floor((slideNumber - 1) / 2);

    const lectureContents = [
      // Lecture 1: Introduction to Quadratic Equations
      <div className="space-y-4" key="lecture-1">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-6"
          data-section="Quadratic Formula Introduction"
        >
          <h3 className="text-xl font-semibold mb-2">Quadratic Formula</h3>
          <p className="text-gray-700 dark:text-gray-300">
            For any quadratic equation in the form ax² + bx + c = 0, the
            solutions can be found using:
          </p>
          <div className="bg-blue-50 dark:bg-blue-900/30 p-4 rounded-lg my-4 text-center">
            <span className="text-xl font-medium">
              x = (-b ± √(b² - 4ac)) / 2a
            </span>
          </div>
          <p className="mt-4">
            This formula gives us the two possible values of x that make the
            equation true. Let's look at an example:
          </p>
          <div
            className="mt-4 p-4 bg-gray-50 dark:bg-gray-800/50 rounded-lg"
            data-section="Example Problem"
          >
            <p className="font-medium">Example: Solve 2x² - 5x - 3 = 0</p>
            <ul className="list-disc list-inside mt-2 space-y-2">
              <li>Here, a = 2, b = -5, c = -3</li>
              <li>x = (-(-5) ± √((-5)² - 4(2)(-3))) / 2(2)</li>
              <li>x = (5 ± √(25 + 24)) / 4</li>
              <li>x = (5 ± √49) / 4</li>
              <li>x = (5 ± 7) / 4</li>
              <li>x = 3 or x = -0.5</li>
            </ul>
          </div>
        </motion.div>
      </div>,

      // Lecture 2: Factoring Quadratic Equations
      <div className="space-y-4" key="lecture-2">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-6"
          data-section="Factoring Method"
        >
          <h3 className="text-xl font-semibold mb-2">Factoring Method</h3>
          <p className="text-gray-700 dark:text-gray-300">
            Another way to solve quadratic equations is by factoring. If we can
            rewrite ax² + bx + c = 0 as (px + q)(rx + s) = 0, then we can use
            the zero product property.
          </p>
          <div className="bg-blue-50 dark:bg-blue-900/30 p-4 rounded-lg my-4">
            <p className="font-medium">Zero Product Property:</p>
            <p className="mt-1">
              If a × b = 0, then either a = 0 or b = 0 (or both).
            </p>
          </div>
          <p className="mt-4">
            This means that if (px + q)(rx + s) = 0, then either (px + q) = 0 or
            (rx + s) = 0, which gives us our solutions.
          </p>
          <div
            className="mt-4 p-4 bg-gray-50 dark:bg-gray-800/50 rounded-lg"
            data-section="Factoring Example"
          >
            <p className="font-medium">Example: Solve x² - 5x + 6 = 0</p>
            <ul className="list-disc list-inside mt-2 space-y-2">
              <li>We need to find factors of 6 that add up to -5</li>
              <li>
                The factors are -2 and -3 (since -2 × -3 = 6 and -2 + -3 = -5)
              </li>
              <li>So we can rewrite as: (x - 2)(x - 3) = 0</li>
              <li>Therefore, x - 2 = 0 or x - 3 = 0</li>
              <li>x = 2 or x = 3</li>
            </ul>
          </div>
        </motion.div>
      </div>,

      // Lecture 3: Completing the Square
      <div className="space-y-4" key="lecture-3">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-6"
          data-section="Completing the Square"
        >
          <h3 className="text-xl font-semibold mb-2">Completing the Square</h3>
          <p className="text-gray-700 dark:text-gray-300">
            Completing the square is a technique that transforms a quadratic
            equation into the form (x + p)² = q, which is easier to solve.
          </p>
          <div className="bg-blue-50 dark:bg-blue-900/30 p-4 rounded-lg my-4">
            <p className="font-medium">Steps for Completing the Square:</p>
            <ol className="list-decimal list-inside mt-1 space-y-1">
              <li>Rearrange the equation to standard form: ax² + bx + c = 0</li>
              <li>If a ≠ 1, divide all terms by a</li>
              <li>Move the constant term to the right side</li>
              <li>
                Take half the coefficient of x, square it, and add to both sides
              </li>
              <li>Rewrite the left side as a perfect square trinomial</li>
              <li>Solve for x</li>
            </ol>
          </div>
          <div
            className="mt-4 p-4 bg-gray-50 dark:bg-gray-800/50 rounded-lg"
            data-section="Completing the Square Example"
          >
            <p className="font-medium">Example: Solve x² - 6x + 9 = 0</p>
            <ul className="list-disc list-inside mt-2 space-y-2">
              <li>Move the constant: x² - 6x = -9</li>
              <li>Half the coefficient of x is -3, and (-3)² = 9</li>
              <li>Add 9 to both sides: x² - 6x + 9 = -9 + 9</li>
              <li>Rewrite as perfect square: (x - 3)² = 0</li>
              <li>Take square root of both sides: x - 3 = 0</li>
              <li>Therefore, x = 3</li>
            </ul>
          </div>
        </motion.div>
      </div>,
    ];

    return lectureContents[Math.min(lectureIndex, lectureContents.length - 1)];
  };

  // Practice content
  const getPracticeContent = () => {
    return (
      <div className="space-y-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-6"
        >
          <Card className="mb-4 hover:shadow-md transition-shadow">
            <CardHeader>
              <CardTitle className="text-md">Practice Question</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="p-4 bg-blue-50 rounded-md border border-blue-200 mb-6">
                <p className="text-lg font-medium">
                  {currentQuestion.question}
                </p>
              </div>

              <div className="space-y-4">
                <div>
                  <label
                    htmlFor="answer"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Your Answer:
                  </label>
                  <div className="flex gap-2">
                    <Input
                      id="answer"
                      value={userAnswer}
                      onChange={(e) => setUserAnswer(e.target.value)}
                      placeholder="Enter your answer here"
                      className="flex-grow"
                      disabled={feedback !== null}
                    />
                    <Button
                      onClick={checkAnswer}
                      disabled={!userAnswer.trim() || feedback !== null}
                    >
                      Check
                    </Button>
                  </div>
                </div>

                <div className="flex justify-between items-center">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setShowHint(!showHint)}
                    className="flex items-center"
                  >
                    <Lightbulb className="h-4 w-4 mr-1" />
                    {showHint ? "Hide Hint" : "Show Hint"}
                  </Button>
                </div>

                <AnimatePresence>
                  {showHint && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      className="overflow-hidden"
                    >
                      <div className="p-3 bg-yellow-50 border border-yellow-200 rounded-md">
                        <div className="flex">
                          <Lightbulb className="h-5 w-5 text-yellow-500 mr-2 flex-shrink-0" />
                          <p className="text-yellow-800">
                            {currentQuestion.hint}
                          </p>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

                <AnimatePresence>
                  {feedback && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ duration: 0.3 }}
                    >
                      <div
                        className={`p-4 rounded-md ${feedback === "correct" ? "bg-green-50 border border-green-200" : "bg-red-50 border border-red-200"}`}
                      >
                        <div className="flex items-start">
                          {feedback === "correct" ? (
                            <div className="h-6 w-6 rounded-full bg-green-100 flex items-center justify-center mr-3 flex-shrink-0">
                              <Check className="h-4 w-4 text-green-600" />
                            </div>
                          ) : (
                            <div className="h-6 w-6 rounded-full bg-red-100 flex items-center justify-center mr-3 flex-shrink-0">
                              <X className="h-4 w-4 text-red-600" />
                            </div>
                          )}
                          <div>
                            <h4
                              className={
                                feedback === "correct"
                                  ? "font-bold text-green-700"
                                  : "font-bold text-red-700"
                              }
                            >
                              {feedback === "correct"
                                ? "Correct!"
                                : "Incorrect"}
                            </h4>
                            <p
                              className={
                                feedback === "correct"
                                  ? "text-green-700 mt-1"
                                  : "text-red-700 mt-1"
                              }
                            >
                              {feedback === "correct"
                                ? "Great job! You can now continue to the next section."
                                : `The correct answer is ${currentQuestion.solution.replace(",", " or ")}.`}
                            </p>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    );
  };

  // Determine content based on slide number (odd = lecture, even = practice)
  const lessonContent =
    isPracticeMode || currentSlide % 2 === 0
      ? getPracticeContent()
      : getLectureContent(currentSlide);

  const practiceContent = (
    <div className="space-y-6">
      <h3 className="text-xl font-semibold">Practice Problems</h3>
      <Card className="mb-4 hover:shadow-md transition-shadow">
        <CardHeader>
          <CardTitle className="text-md">Problem 1</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="mb-4">Solve the quadratic equation: 3x² + 8x - 3 = 0</p>
          <div className="flex space-x-2 mt-4">
            <Button
              variant="outline"
              size="sm"
              onClick={() =>
                alert(
                  "Hint: Factor the equation or use the quadratic formula where a=3, b=8, c=-3",
                )
              }
            >
              Show Hint
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => alert("Correct answers: x = -3 or x = 1/3")}
            >
              Check Answer
            </Button>
          </div>
        </CardContent>
      </Card>
      <Card className="mb-4 hover:shadow-md transition-shadow">
        <CardHeader>
          <CardTitle className="text-md">Problem 2</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="mb-4">
            Find the values of x for which: x² - 6x + 9 = 0
          </p>
          <div className="flex space-x-2 mt-4">
            <Button
              variant="outline"
              size="sm"
              onClick={() =>
                alert(
                  "Hint: This is a perfect square trinomial. Try factoring it as (x-k)²",
                )
              }
            >
              Show Hint
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => alert("Correct answer: x = 3 (repeated root)")}
            >
              Check Answer
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );

  const resourcesContent = (
    <div className="space-y-4">
      <h3 className="text-xl font-semibold mb-4">Additional Resources</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card
          className="flex items-center p-4 hover:bg-gray-50 dark:hover:bg-gray-800/70 cursor-pointer transition-colors"
          onClick={() =>
            window.open(
              "https://images.unsplash.com/photo-1621416953561-7f98b6606449?w=800&q=80",
              "_blank",
            )
          }
        >
          <FileText className="h-5 w-5 mr-3 text-blue-500" />
          <div>
            <h4 className="font-medium">Quadratic Equations Cheat Sheet</h4>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              PDF, 2 pages
            </p>
          </div>
          <Download className="h-4 w-4 ml-auto text-gray-400" />
        </Card>
        <Card
          className="flex items-center p-4 hover:bg-gray-50 dark:hover:bg-gray-800/70 cursor-pointer transition-colors"
          onClick={() => alert("Interactive Calculator would open here")}
        >
          <Calculator className="h-5 w-5 mr-3 text-green-500" />
          <div>
            <h4 className="font-medium">Interactive Quadratic Calculator</h4>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Online tool
            </p>
          </div>
        </Card>
        <Card
          className="flex items-center p-4 hover:bg-gray-50 dark:hover:bg-gray-800/70 cursor-pointer transition-colors"
          onClick={() => alert("Real-world applications would display here")}
        >
          <BookOpen className="h-5 w-5 mr-3 text-purple-500" />
          <div>
            <h4 className="font-medium">Quadratic Applications</h4>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Real-world examples
            </p>
          </div>
        </Card>
        <Card
          className="flex items-center p-4 hover:bg-gray-50 dark:hover:bg-gray-800/70 cursor-pointer transition-colors"
          onClick={() =>
            window.open("https://www.youtube.com/watch?v=2ZzuZvz9Lmw", "_blank")
          }
        >
          <Play className="h-5 w-5 mr-3 text-red-500" />
          <div>
            <h4 className="font-medium">
              Video Tutorial: Completing the Square
            </h4>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              15 minutes
            </p>
          </div>
        </Card>
      </div>
    </div>
  );

  return (
    <div className="w-full h-full bg-white dark:bg-gray-900 rounded-xl shadow-lg overflow-hidden flex flex-col relative">
      {/* Contextual help tooltip */}
      {showContextualHelp && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          className="absolute top-20 right-4 bg-blue-50 border-l-4 border-blue-500 p-3 rounded-md shadow-md max-w-xs z-10"
        >
          <div className="flex items-start">
            <div className="flex-shrink-0 mr-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="text-blue-500"
              >
                <circle cx="12" cy="12" r="10"></circle>
                <path d="M12 16v-4"></path>
                <path d="M12 8h.01"></path>
              </svg>
            </div>
            <div>
              <p className="text-sm text-blue-800">{contextualHelpText}</p>
            </div>
          </div>
        </motion.div>
      )}
      {/* Header with title and navigation */}
      <div className="bg-blue-600 dark:bg-blue-700 p-4 text-white">
        <div className="flex justify-between items-center">
          <div>
            <h2 className="text-2xl font-bold">{title}</h2>
            <p className="text-blue-100 mt-1">{description}</p>
          </div>
          <div className="flex items-center space-x-2">
            <Button
              variant="outline"
              size="sm"
              className="bg-white/10 hover:bg-white/20 border-white/20 text-white"
              onClick={onPrevSlide}
              disabled={currentSlide <= 1}
            >
              <ChevronLeft className="h-4 w-4 mr-1" /> Previous
            </Button>
            <span className="text-sm font-medium">
              {currentSlide} of {totalSlides}
            </span>
            <Button
              variant="outline"
              size="sm"
              className="bg-white/10 hover:bg-white/20 border-white/20 text-white"
              onClick={onNextSlide}
              disabled={currentSlide >= totalSlides}
            >
              Next <ChevronRight className="h-4 w-4 ml-1" />
            </Button>
          </div>
        </div>
      </div>

      {/* Main content area */}
      <div className="flex-grow p-6 overflow-auto">
        <div className="w-full">
          {/* Only show lesson content, no tabs */}
          <div className="w-full">{content || lessonContent}</div>

          {/* Interactive Dialogue Section */}
          <div className="mt-8 border-t pt-4 border-gray-200">
            <div className="flex items-center gap-2 mb-3">
              <MessageSquare className="h-5 w-5 text-primary" />
              <h3 className="text-lg font-semibold">
                Conversation with Teacher
              </h3>
              <span className="ml-auto text-xs bg-primary-100 text-primary-700 px-2 py-0.5 rounded-full">
                {questionResponses.length}{" "}
                {questionResponses.length === 1 ? "exchange" : "exchanges"}
              </span>
            </div>
            {questionResponses.length > 0 ? (
              <div className="space-y-3 max-h-[300px] overflow-y-auto pr-2">
                {questionResponses.map((response, index) => {
                  // Find the corresponding student question
                  const studentQuestion = chatHistory.find(
                    (msg, i) =>
                      msg.sender === "You" &&
                      chatHistory[i + 1] &&
                      chatHistory[i + 1].sender === "AI" &&
                      chatHistory[i + 1].message === response.message,
                  );

                  return (
                    <div
                      key={index}
                      className="bg-primary-50 p-3 rounded-md border-l-4 border-primary mb-4"
                    >
                      {studentQuestion && (
                        <div className="mb-3 bg-white p-2 rounded-md border border-gray-200">
                          <div className="flex justify-between items-center mb-1">
                            <p className="text-sm font-medium text-gray-700">
                              <span className="inline-block bg-gray-100 rounded-full w-6 h-6 text-center mr-1">
                                👤
                              </span>{" "}
                              You
                            </p>
                            <p className="text-xs text-gray-500">
                              {studentQuestion.timestamp}
                            </p>
                          </div>
                          <p className="text-sm pl-7">
                            {studentQuestion.message}
                          </p>
                        </div>
                      )}
                      <div>
                        <div className="flex justify-between items-center mb-1">
                          <p className="text-sm font-medium text-primary-700">
                            <span className="inline-block bg-primary-100 rounded-full w-6 h-6 text-center mr-1">
                              👩‍🏫
                            </span>{" "}
                            Teacher
                          </p>
                          <p className="text-xs text-gray-500">
                            {response.timestamp}
                          </p>
                        </div>
                        <p className="text-sm pl-7">{response.message}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            ) : (
              <div className="bg-gray-50 p-4 rounded-md text-center">
                <p className="text-gray-500 text-sm">
                  No conversations yet. Ask your teacher a question using the
                  chat interface!
                </p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Footer with controls - simplified */}
      <div className="border-t border-gray-200 dark:border-gray-700 p-3 flex justify-end items-center bg-gray-50 dark:bg-gray-800">
        <Button
          variant="primary"
          size="sm"
          onClick={onNextSlide}
          disabled={currentSlide >= totalSlides}
        >
          Continue Learning
        </Button>
      </div>
    </div>
  );
};

export default LessonContent;
