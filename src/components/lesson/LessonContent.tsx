import React from "react";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
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
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";

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
}) => {
  // Track cursor position and focus areas
  const { focusArea, timeOnSection } = useCursorTracking();
  const [showContextualHelp, setShowContextualHelp] = useState(false);
  const [contextualHelpText, setContextualHelpText] = useState("");

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

  // Placeholder content for different tabs
  const lessonContent = (
    <div className="space-y-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mb-6"
        data-section="Quadratic Formula Introduction"
      >
        <h3 className="text-xl font-semibold mb-2">Quadratic Formula</h3>
        <p className="text-gray-700 dark:text-gray-300">
          For any quadratic equation in the form ax² + bx + c = 0, the solutions
          can be found using:
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
    </div>
  );

  const practiceContent = (
    <div className="space-y-6">
      <h3 className="text-xl font-semibold">Practice Problems</h3>
      <Card className="mb-4">
        <CardHeader>
          <CardTitle className="text-md">Problem 1</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="mb-4">Solve the quadratic equation: 3x² + 8x - 3 = 0</p>
          <div className="flex space-x-2 mt-4">
            <Button variant="outline" size="sm">
              Show Hint
            </Button>
            <Button variant="outline" size="sm">
              Check Answer
            </Button>
          </div>
        </CardContent>
      </Card>
      <Card className="mb-4">
        <CardHeader>
          <CardTitle className="text-md">Problem 2</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="mb-4">
            Find the values of x for which: x² - 6x + 9 = 0
          </p>
          <div className="flex space-x-2 mt-4">
            <Button variant="outline" size="sm">
              Show Hint
            </Button>
            <Button variant="outline" size="sm">
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
        <Card className="flex items-center p-4 hover:bg-gray-50 dark:hover:bg-gray-800/70 cursor-pointer transition-colors">
          <FileText className="h-5 w-5 mr-3 text-blue-500" />
          <div>
            <h4 className="font-medium">Quadratic Equations Cheat Sheet</h4>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              PDF, 2 pages
            </p>
          </div>
          <Download className="h-4 w-4 ml-auto text-gray-400" />
        </Card>
        <Card className="flex items-center p-4 hover:bg-gray-50 dark:hover:bg-gray-800/70 cursor-pointer transition-colors">
          <Calculator className="h-5 w-5 mr-3 text-green-500" />
          <div>
            <h4 className="font-medium">Interactive Quadratic Calculator</h4>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Online tool
            </p>
          </div>
        </Card>
        <Card className="flex items-center p-4 hover:bg-gray-50 dark:hover:bg-gray-800/70 cursor-pointer transition-colors">
          <BookOpen className="h-5 w-5 mr-3 text-purple-500" />
          <div>
            <h4 className="font-medium">Quadratic Applications</h4>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Real-world examples
            </p>
          </div>
        </Card>
        <Card className="flex items-center p-4 hover:bg-gray-50 dark:hover:bg-gray-800/70 cursor-pointer transition-colors">
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
        <Tabs defaultValue="lesson" className="w-full">
          <TabsList className="mb-6">
            <TabsTrigger value="lesson">Lesson</TabsTrigger>
            <TabsTrigger value="practice">Practice</TabsTrigger>
            <TabsTrigger value="resources">Resources</TabsTrigger>
          </TabsList>

          <TabsContent value="lesson" className="focus:outline-none">
            {content || lessonContent}

            {/* Enhanced Question Summary Section */}
            <div className="mt-8 border-t pt-4 border-gray-200">
              <div className="flex items-center gap-2 mb-3">
                <MessageSquare className="h-5 w-5 text-primary" />
                <h3 className="text-lg font-semibold">Questions & Answers</h3>
                <span className="ml-auto text-xs bg-primary-100 text-primary-700 px-2 py-0.5 rounded-full">
                  {questionResponses.length}{" "}
                  {questionResponses.length === 1 ? "question" : "questions"}
                </span>
              </div>
              {questionResponses.length > 0 ? (
                <div className="space-y-3 max-h-[300px] overflow-y-auto pr-2">
                  {questionResponses.map((response, index) => (
                    <div
                      key={index}
                      className="bg-primary-50 p-3 rounded-md border-l-4 border-primary"
                    >
                      <div className="flex justify-between items-center mb-1">
                        <p className="text-sm font-medium text-primary-700">
                          Question #{index + 1}
                        </p>
                        <p className="text-xs text-gray-500">
                          {response.timestamp}
                        </p>
                      </div>
                      <p className="text-sm">{response.message}</p>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="bg-gray-50 p-4 rounded-md text-center">
                  <p className="text-gray-500 text-sm">
                    No questions asked yet. Use the question interface to ask
                    your teacher something!
                  </p>
                </div>
              )}
            </div>
          </TabsContent>

          <TabsContent value="practice" className="focus:outline-none">
            {practiceContent}
          </TabsContent>

          <TabsContent value="resources" className="focus:outline-none">
            {resourcesContent}
          </TabsContent>
        </Tabs>
      </div>

      {/* Footer with controls */}
      <div className="border-t border-gray-200 dark:border-gray-700 p-4 flex justify-between items-center bg-gray-50 dark:bg-gray-800">
        <div className="flex items-center space-x-4">
          <Button variant="outline" size="sm" className="flex items-center">
            <Play className="h-4 w-4 mr-2" /> Play Narration
          </Button>
          <Button variant="ghost" size="sm">
            <Pause className="h-4 w-4 mr-2" /> Pause
          </Button>
        </div>
        <div>
          <Button variant="secondary" size="sm">
            Mark as Complete
          </Button>
        </div>
      </div>
    </div>
  );
};

export default LessonContent;
