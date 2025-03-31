import React, { useState, useEffect, useRef } from "react";
import { motion as m } from "framer-motion";
import AITeacherVideo from "./AITeacherVideo";
import LessonContent from "./LessonContent";
import LessonControls from "./LessonControls";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { BookOpen, Award, X, PenTool, Eraser } from "lucide-react";

interface LessonContainerProps {
  teacherName?: string;
  lessonTitle?: string;
  lessonDescription?: string;
  onEndLesson?: () => void;
  lessonType?: "algebra" | "geometry" | "calculus" | "statistics";
  currentSlide?: number;
  totalSlides?: number;
  isPracticeMode?: boolean;
}

const LessonContainer: React.FC<LessonContainerProps> = ({
  teacherName = "Ms. Kong",
  lessonTitle = "Introduction to Quadratic Equations",
  lessonDescription = "Learn how to solve quadratic equations using different methods",
  onEndLesson = () => {},
  lessonType = "algebra",
  currentSlide = 1,
  totalSlides = 10,
  isPracticeMode = false,
}) => {
  // Add CSS for teacher sidebar container and video controls
  React.useEffect(() => {
    const style = document.createElement("style");
    style.innerHTML = `
      .teacher-sidebar-container {
        width: 280px;
        position: fixed;
        top: 0;
        right: 0;
        bottom: 0;
        background: white;
        border-left: 1px solid #e5e7eb;
        display: flex;
        flex-direction: column;
        padding: 1rem;
        overflow-y: auto;
        z-index: 50;
      }
      @media (min-width: 1024px) {
        .teacher-sidebar-container {
          width: 300px;
        }
      }
    `;
    document.head.appendChild(style);
    return () => {
      document.head.removeChild(style);
    };
  }, []);

  const [activeTab, setActiveTab] = useState("lesson");
  const [isVideoMinimized, setIsVideoMinimized] = useState(false);
  const [teacherObservationStatus, setTeacherObservationStatus] = useState<
    "observing" | "thinking" | "helping" | "praising" | "idle"
  >("observing");
  const [studentActivity, setStudentActivity] = useState<
    "solving" | "stuck" | "reviewing" | "idle"
  >("idle");
  const [timeSpentOnCurrentProblem, setTimeSpentOnCurrentProblem] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [volume, setVolume] = useState(75);
  const [isMuted, setIsMuted] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isDrawingMode, setIsDrawingMode] = useState(false);
  const [lastAudioSegment, setLastAudioSegment] = useState("");
  const [currentAudioText, setCurrentAudioText] = useState("");
  const [drawingColor, setDrawingColor] = useState("#000000");
  const [isEraser, setIsEraser] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const contextRef = useRef<CanvasRenderingContext2D | null>(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [lastX, setLastX] = useState(0);
  const [lastY, setLastY] = useState(0);
  const [showEndLessonDialog, setShowEndLessonDialog] = useState(false);
  const [currentLessonSlide, setCurrentLessonSlide] = useState(currentSlide);
  const [chatMessage, setChatMessage] = useState("");
  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState("");
  const speechRecognitionRef = useRef<SpeechRecognition | null>(null);
  const [chatHistory, setChatHistory] = useState<
    {
      sender: string;
      message: string;
      timestamp: string;
      isProactive?: boolean;
    }[]
  >([
    {
      sender: "AI",
      message:
        "Hi there! I'm excited to guide you through today's lesson on quadratic equations. Let me know if you have any questions along the way!",
      timestamp: new Date().toLocaleTimeString(),
      isProactive: true,
    },
  ]);

  // Proactive prompts for different stages of the lesson
  const proactivePrompts = {
    introduction: [
      "How are you feeling about quadratic equations so far?",
      "Would you like me to explain this concept in a different way?",
      "I notice you're making great progress! Do you want to try a slightly harder example?",
    ],
    midLesson: [
      "Are you finding this explanation clear? I can provide more examples if needed.",
      "You seem to be grasping this concept well! Shall we move to the next part?",
      "This is a tricky part - would a visual representation help you understand better?",
    ],
    practice: [
      "I see you're thinking about this problem. Would a hint help?",
      "Great approach! Have you considered trying the factoring method here?",
      "You're on the right track! Just remember to check both possible solutions.",
    ],
    encouragement: [
      "You're doing fantastic work today!",
      "I'm impressed by how quickly you're picking this up!",
      "That's exactly right! Your problem-solving skills are excellent.",
      "You've made incredible progress in understanding quadratic equations!",
    ],
  };

  // Initialize speech recognition
  useEffect(() => {
    if ("webkitSpeechRecognition" in window) {
      const SpeechRecognition =
        window.webkitSpeechRecognition || window.SpeechRecognition;
      speechRecognitionRef.current = new SpeechRecognition();
      speechRecognitionRef.current.continuous = false;
      speechRecognitionRef.current.interimResults = false;
      speechRecognitionRef.current.lang = "en-US";

      speechRecognitionRef.current.onresult = (event) => {
        const userInput = event.results[0][0].transcript;
        setTranscript(userInput);
        // Use the transcript as a chat message
        if (userInput.trim()) {
          const newMessage = {
            sender: "You",
            message: userInput,
            timestamp: new Date().toLocaleTimeString(),
          };

          // Use functional update to ensure we're working with the latest state
          setChatHistory((prevHistory) => [...prevHistory, newMessage]);

          // Simulate AI response after a short delay
          setTimeout(() => {
            // Generate a dynamic response based on the voice input
            let responseMessage = "";

            if (
              userInput.toLowerCase().includes("hint") ||
              userInput.toLowerCase().includes("help")
            ) {
              responseMessage = `Here's a hint: ${
                currentLessonSlide <= 5
                  ? "Try using the quadratic formula where a, b, and c are the coefficients."
                  : "Consider factoring the expression first before solving."
              }`;
            } else if (userInput.toLowerCase().includes("example")) {
              responseMessage = `Here's an example: If we have 2x² - 5x - 3 = 0, we can ${
                currentLessonSlide % 2 === 0
                  ? "use the quadratic formula with a=2, b=-5, and c=-3."
                  : "factor it as (2x+1)(x-3)=0."
              }`;
            } else {
              responseMessage = `I understand your question about "${userInput.substring(0, 30)}${userInput.length > 30 ? "..." : ""}". Let me explain...`;
            }

            const aiResponse = {
              sender: "AI",
              message: responseMessage,
              timestamp: new Date().toLocaleTimeString(),
            };
            setChatHistory((prevHistory) => [...prevHistory, aiResponse]);
          }, 1000);
        }
      };

      speechRecognitionRef.current.onerror = (event) => {
        console.error("Speech recognition error", event.error);
        setIsListening(false);
      };

      speechRecognitionRef.current.onend = () => {
        setIsListening(false);
      };
    }

    return () => {
      if (speechRecognitionRef.current) {
        speechRecognitionRef.current.abort();
      }
    };
  }, [currentLessonSlide]); // Add currentLessonSlide as dependency to update responses based on slide

  // Function to start listening for speech
  const startListening = () => {
    if (speechRecognitionRef.current && !isListening) {
      setTranscript("");
      setIsListening(true);
      speechRecognitionRef.current.start();
    }
  };

  // Handle fullscreen toggle
  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };

    document.addEventListener("fullscreenchange", handleFullscreenChange);
    return () => {
      document.removeEventListener("fullscreenchange", handleFullscreenChange);
    };
  }, []);

  // Initialize canvas for drawing
  useEffect(() => {
    if (isDrawingMode && canvasRef.current) {
      const canvas = canvasRef.current;
      const context = canvas.current?.getContext("2d");

      if (context) {
        // Set canvas to be the size of its parent container
        const resizeCanvas = () => {
          const parent = canvas.parentElement;
          if (parent) {
            canvas.width = parent.clientWidth;
            canvas.height = parent.clientHeight;
            context.lineCap = "round";
            context.lineJoin = "round";
            context.lineWidth = 5;
            context.strokeStyle = drawingColor;
          }
        };

        resizeCanvas();
        window.addEventListener("resize", resizeCanvas);

        contextRef.current = context;

        return () => {
          window.removeEventListener("resize", resizeCanvas);
        };
      }
    }
  }, [isDrawingMode, drawingColor]);

  const startDrawing = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!isDrawingMode || !contextRef.current) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    contextRef.current.beginPath();
    contextRef.current.moveTo(x, y);
    setIsDrawing(true);
    setLastX(x);
    setLastY(y);
  };

  const draw = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!isDrawing || !isDrawingMode || !contextRef.current) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    contextRef.current.lineTo(x, y);
    contextRef.current.stroke();
    setLastX(x);
    setLastY(y);
  };

  const stopDrawing = () => {
    if (!isDrawingMode || !contextRef.current) return;

    contextRef.current.closePath();
    setIsDrawing(false);
  };

  const clearCanvas = () => {
    if (!canvasRef.current || !contextRef.current) return;

    const canvas = canvasRef.current;
    contextRef.current.clearRect(0, 0, canvas.width, canvas.height);
  };

  const toggleEraser = () => {
    if (!contextRef.current) return;

    setIsEraser(!isEraser);
    if (!isEraser) {
      contextRef.current.globalCompositeOperation = "destination-out";
    } else {
      contextRef.current.globalCompositeOperation = "source-over";
      contextRef.current.strokeStyle = drawingColor;
    }
  };

  const handleColorChange = (color: string) => {
    setDrawingColor(color);
    if (contextRef.current) {
      contextRef.current.strokeStyle = color;
      setIsEraser(false);
      contextRef.current.globalCompositeOperation = "source-over";
    }
  };

  const toggleDrawingMode = () => {
    setIsDrawingMode(!isDrawingMode);
    if (!isDrawingMode) {
      // Reset drawing state when enabling drawing mode
      setIsEraser(false);
      if (contextRef.current) {
        contextRef.current.globalCompositeOperation = "source-over";
        contextRef.current.strokeStyle = drawingColor;
      }
    }
  };

  // Update current slide when it changes from parent
  useEffect(() => {
    setCurrentLessonSlide(currentSlide);

    // Update the title and description based on whether it's a practice slide
    if (isPracticeMode) {
      // Don't change the main title, but update the description
      const practiceDescription =
        "Practice what you've learned with interactive problems";
      // We don't update lessonTitle here as it's passed from parent
    }
  }, [currentSlide, isPracticeMode]);

  // Track time spent on current problem and update teacher observation status
  useEffect(() => {
    const timer = setInterval(() => {
      if (studentActivity === "solving") {
        setTimeSpentOnCurrentProblem((prev) => prev + 1);

        // Update teacher observation status based on time spent
        if (timeSpentOnCurrentProblem > 45) {
          setTeacherObservationStatus("helping");

          // Offer help after 45 seconds if no interaction
          if (timeSpentOnCurrentProblem === 46 && chatHistory.length < 2) {
            const helpMessage = {
              sender: "AI",
              message:
                "I notice you've been working on this problem for a while. Would you like some help?",
              timestamp: new Date().toLocaleTimeString(),
              isProactive: true,
            };
            setChatHistory((prev) => [...prev, helpMessage]);
          }
        } else if (timeSpentOnCurrentProblem > 30) {
          setTeacherObservationStatus("thinking");
        } else {
          setTeacherObservationStatus("observing");
        }
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [studentActivity, timeSpentOnCurrentProblem, chatHistory.length]);

  // Initialize lesson state
  useEffect(() => {
    setTimeSpentOnCurrentProblem(0);
    setTeacherObservationStatus("observing");
    setStudentActivity("reviewing");

    // Add welcome message if chat is empty
    if (chatHistory.length <= 1) {
      const welcomeMessage = {
        sender: "AI",
        message:
          "Welcome to the lesson! I'm here to help you understand quadratic equations. Feel free to ask questions anytime.",
        timestamp: new Date().toLocaleTimeString(),
        isProactive: true,
      };
      setChatHistory((prev) => [
        ...prev.filter(
          (msg) =>
            msg.sender !== "AI" ||
            !msg.isProactive ||
            msg.message !== welcomeMessage.message,
        ),
        welcomeMessage,
      ]);
    }
  }, [chatHistory.length]);

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().catch((err) => {
        console.error(`Error attempting to enable fullscreen: ${err.message}`);
      });
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen();
      }
    }
  };

  const handleEndLesson = () => {
    setShowEndLessonDialog(true);
  };

  const confirmEndLesson = () => {
    setShowEndLessonDialog(false);
    onEndLesson();
  };

  const handleVolumeChange = (values: number[]) => {
    setVolume(values[0]);
    if (values[0] === 0) {
      setIsMuted(true);
    } else if (isMuted) {
      setIsMuted(false);
    }
  };

  const handleMuteToggle = () => {
    setIsMuted(!isMuted);
  };

  const handlePlayPause = () => {
    setIsPlaying(!isPlaying);
    // Store the current segment when pausing
    if (isPlaying) {
      // Store the current text being spoken
      if (currentAudioText) {
        setLastAudioSegment(currentAudioText);
      } else {
        setLastAudioSegment("Current explanation segment");
      }

      // Pause speech synthesis
      if ("speechSynthesis" in window) {
        window.speechSynthesis.pause();
      }
    } else {
      // Resume speech synthesis
      if ("speechSynthesis" in window) {
        window.speechSynthesis.resume();
      }
    }
  };

  const handleReplayAudio = () => {
    // Logic to replay the last audio segment
    console.log("Replaying last segment:", lastAudioSegment);

    // If we have a stored audio segment, replay it
    if (lastAudioSegment && "speechSynthesis" in window) {
      // Cancel any ongoing speech
      window.speechSynthesis.cancel();

      // Create a new utterance with the last segment
      const utterance = new SpeechSynthesisUtterance(lastAudioSegment);

      // Try to find a female voice
      const voices = window.speechSynthesis.getVoices();
      const femaleVoice = voices.find(
        (voice) =>
          voice.name.includes("female") ||
          voice.name.includes("woman") ||
          voice.name.includes("girl"),
      );

      if (femaleVoice) {
        utterance.voice = femaleVoice;
      }

      // Speak the text
      window.speechSynthesis.speak(utterance);
      setIsPlaying(true);
    }
  };

  const handleNextSlide = () => {
    if (currentLessonSlide < totalSlides) {
      // Update the current slide
      setCurrentLessonSlide((prevSlide) => prevSlide + 1);

      // Reset student activity state for the new slide
      setStudentActivity("reviewing");
      setTimeSpentOnCurrentProblem(0);
      setTeacherObservationStatus("observing");

      // Clear chat message input
      setChatMessage("");

      // Update teacher observation based on whether we're moving to a practice slide
      const nextIsPractice = (currentLessonSlide + 1) % 2 === 0;
      if (nextIsPractice) {
        setTeacherObservationStatus("observing");
        setStudentActivity("solving");
      } else {
        setTeacherObservationStatus("observing");
        setStudentActivity("reviewing");
      }

      // Notify parent component about slide change
      if (onEndLesson && currentLessonSlide + 1 >= totalSlides) {
        // If this is the last slide, trigger the end lesson function
        setTimeout(() => {
          onEndLesson();
        }, 1000);
      }

      // Add proactive AI message when moving to a new slide
      // Use different messages for different slides to avoid repetition
      const newSlide = currentLessonSlide + 1;

      // Determine which category of prompts to use based on the slide number
      let promptCategory;
      if (newSlide < 4) {
        promptCategory = "introduction";
      } else if (newSlide < 7) {
        promptCategory = "midLesson";
      } else {
        promptCategory = "practice";
      }

      // Select a message that hasn't been used recently if possible
      const recentMessages = chatHistory.slice(-5).map((msg) => msg.message);
      const availablePrompts = proactivePrompts[promptCategory].filter(
        (prompt) => !recentMessages.includes(prompt),
      );

      // If all prompts have been used recently, just pick a random one
      const promptsToUse =
        availablePrompts.length > 0
          ? availablePrompts
          : proactivePrompts[promptCategory];
      const randomIndex = Math.floor(Math.random() * promptsToUse.length);

      const proactiveMessage = {
        sender: "AI",
        message: promptsToUse[randomIndex],
        timestamp: new Date().toLocaleTimeString(),
        isProactive: true,
      };

      // Add the message after a short delay to seem more natural
      setTimeout(() => {
        setChatHistory((prevHistory) => [...prevHistory, proactiveMessage]);
      }, 3000);
    }
  };

  const handlePrevSlide = () => {
    if (currentLessonSlide > 1) {
      setCurrentLessonSlide(currentLessonSlide - 1);
      // Reset student activity state for the previous slide
      setStudentActivity("reviewing");
      setTimeSpentOnCurrentProblem(0);
      setTeacherObservationStatus("observing");
      setChatMessage("");
    }
  };

  const handleSendMessage = () => {
    if (chatMessage.trim()) {
      const userMessage = chatMessage.trim();
      const newMessage = {
        sender: "You",
        message: userMessage,
        timestamp: new Date().toLocaleTimeString(),
      };

      // Use functional update to ensure we're working with the latest state
      setChatHistory((prevHistory) => [...prevHistory, newMessage]);
      setChatMessage("");

      // Simulate AI response after a short delay
      setTimeout(() => {
        // Generate different responses based on user input
        let responseMessage = "";

        // Check for specific keywords to provide relevant responses
        if (
          userMessage.toLowerCase().includes("hint") ||
          userMessage.toLowerCase().includes("help")
        ) {
          responseMessage = `Here's a hint for this problem: ${
            currentLessonSlide <= 5
              ? "Try using the quadratic formula where a, b, and c are the coefficients from the standard form."
              : "Consider factoring the expression first before solving for the variable."
          }`;
        } else if (
          userMessage.toLowerCase().includes("understand") ||
          userMessage.toLowerCase().includes("got it") ||
          userMessage.toLowerCase().includes("makes sense")
        ) {
          const randomIndex = Math.floor(
            Math.random() * proactivePrompts.encouragement.length,
          );
          responseMessage = proactivePrompts.encouragement[randomIndex];
        } else if (
          userMessage.toLowerCase().includes("confused") ||
          userMessage.toLowerCase().includes("don't understand") ||
          userMessage.toLowerCase().includes("difficult")
        ) {
          responseMessage = `I understand this concept can be challenging. Let me explain it differently: ${
            currentLessonSlide <= 5
              ? "The quadratic formula is a tool that helps us find the values of x that make the equation true. Think of it as a recipe that always works for any quadratic equation."
              : "When we factor a quadratic equation, we're breaking it down into simpler parts that are easier to solve. It's like finding the building blocks of the equation."
          }`;
        } else if (userMessage.toLowerCase().includes("example")) {
          responseMessage = `Here's an example: If we have 2x² - 5x - 3 = 0, we can ${
            currentLessonSlide % 2 === 0
              ? "use the quadratic formula with a=2, b=-5, and c=-3 to find that x = 3 or x = -0.5."
              : "factor it as (2x+1)(x-3)=0, which gives us x = -1/2 or x = 3."
          }`;
        } else {
          // Generate a response based on the current slide content
          const topics = [
            "quadratic formula",
            "factoring",
            "completing the square",
            "graphical solutions",
            "applications",
          ];
          const currentTopic =
            topics[
              Math.min(Math.floor(currentLessonSlide / 2), topics.length - 1)
            ];
          responseMessage = `That's a great question about ${currentTopic}! ${
            userMessage.endsWith("?")
              ? `To answer your question about "${userMessage.substring(0, 30)}${userMessage.length > 30 ? "..." : ""}", `
              : ""
          }Let me explain further: The key concept here is to ${
            currentLessonSlide % 3 === 0
              ? "identify the coefficients correctly before applying the formula."
              : currentLessonSlide % 3 === 1
                ? "recognize patterns that allow for easier factoring."
                : "understand how these algebraic techniques relate to the graph of the parabola."
          }`;
        }

        const aiResponse = {
          sender: "AI",
          message: responseMessage,
          timestamp: new Date().toLocaleTimeString(),
        };

        // Use functional update to ensure we're working with the latest state
        setChatHistory((prevHistory) => [...prevHistory, aiResponse]);

        // If the user seems to understand, offer to move forward after a moment
        if (
          (userMessage.toLowerCase().includes("understand") ||
            userMessage.toLowerCase().includes("got it") ||
            userMessage.toLowerCase().includes("makes sense")) &&
          currentLessonSlide < totalSlides
        ) {
          setTimeout(() => {
            const followUpMessage = {
              sender: "AI",
              message:
                "Since you're understanding this well, shall we move to the next concept?",
              timestamp: new Date().toLocaleTimeString(),
              isProactive: true,
            };
            setChatHistory((prevHistory) => [...prevHistory, followUpMessage]);
          }, 2000);
        }
      }, 1000);
    }
  };

  return (
    <m.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="w-full h-full bg-background flex flex-col overflow-hidden relative lesson-container"
    >
      {/* Main content area */}
      <div className="flex-grow flex flex-col overflow-hidden">
        <div className="bg-primary-50 border-b border-primary-100 px-4 py-3 flex items-center justify-between shadow-soft">
          <div className="flex items-center">
            <BookOpen className="h-5 w-5 mr-2 text-primary" />
            <h2 className="text-lg font-medium">{lessonTitle}</h2>
          </div>

          {/* Teacher video when minimized */}
          {isVideoMinimized && (
            <div className="ml-auto z-50">
              <AITeacherVideo
                teacherName={teacherName}
                isMinimized={true}
                onToggleMinimize={() => setIsVideoMinimized(false)}
                isMuted={isMuted}
                observationStatus={teacherObservationStatus}
                studentActivity={studentActivity}
                timeSpentOnProblem={timeSpentOnCurrentProblem}
              />
            </div>
          )}
        </div>

        <div className="flex-grow overflow-hidden flex">
          <div className="flex-grow overflow-hidden relative md:pr-[280px] lg:pr-[300px]">
            <LessonContent
              title={lessonTitle}
              description={lessonDescription}
              currentSlide={currentLessonSlide}
              totalSlides={totalSlides}
              onNextSlide={handleNextSlide}
              onPrevSlide={handlePrevSlide}
              lessonType={lessonType}
              chatHistory={chatHistory}
              isPracticeMode={isPracticeMode}
            />

            {isDrawingMode && (
              <div className="absolute inset-0 z-20 pointer-events-auto">
                <div className="absolute top-4 right-4 z-30 flex gap-2 bg-white p-2 rounded-md shadow-md">
                  <Button
                    variant={isEraser ? "default" : "outline"}
                    size="icon"
                    onClick={toggleEraser}
                    className="h-8 w-8"
                  >
                    <Eraser className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={clearCanvas}
                    className="h-8 w-8"
                  >
                    <X className="h-4 w-4" />
                  </Button>
                  <div className="flex gap-1">
                    {["#000000", "#FF0000", "#0000FF", "#00FF00"].map(
                      (color) => (
                        <button
                          key={color}
                          className={`h-8 w-8 rounded-full border ${drawingColor === color ? "ring-2 ring-primary" : ""}`}
                          style={{ backgroundColor: color }}
                          onClick={() => handleColorChange(color)}
                        />
                      ),
                    )}
                  </div>
                </div>
                <canvas
                  ref={canvasRef}
                  className="w-full h-full cursor-crosshair"
                  onMouseDown={startDrawing}
                  onMouseMove={draw}
                  onMouseUp={stopDrawing}
                  onMouseLeave={stopDrawing}
                />
              </div>
            )}
          </div>

          {!isVideoMinimized && (
            <div className="teacher-sidebar-container fixed right-0 top-0 bottom-0 z-10">
              <div className="flex-grow flex items-center justify-center">
                <AITeacherVideo
                  teacherName={teacherName}
                  isMinimized={false}
                  onToggleMinimize={() => setIsVideoMinimized(true)}
                  isMuted={isMuted}
                  avatarSrc="https://api.dicebear.com/7.x/avataaars/svg?seed=mathkong&accessories=eyeglasses"
                  observationStatus={teacherObservationStatus}
                  studentActivity={studentActivity}
                  timeSpentOnProblem={timeSpentOnCurrentProblem}
                  onMessage={(message) => {
                    // Store the current message for replay functionality
                    setCurrentAudioText(message);
                    setLastAudioSegment(message);
                  }}
                />
              </div>

              {/* Enhanced Question Interface */}
              <div className="mt-2 border-t border-primary-100 pt-3">
                <h3 className="text-sm font-medium mb-2 flex items-center">
                  <BookOpen size={14} className="mr-1 text-primary" />
                  Ask a Question
                </h3>
                <div className="flex mb-2">
                  <input
                    type="text"
                    placeholder="Type your question here..."
                    className="flex-grow p-2 text-sm rounded-l-md border border-r-0 border-gray-300 focus:outline-none focus:ring-1 focus:ring-primary w-full"
                    value={chatMessage}
                    onChange={(e) => setChatMessage(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && handleSendMessage()}
                  />
                  <Button
                    variant="primary"
                    size="icon"
                    className="rounded-l-none rounded-r-md flex-shrink-0"
                    onClick={handleSendMessage}
                  >
                    <BookOpen size={16} />
                  </Button>
                </div>
                {/* Voice input button removed as requested */}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Lesson controls */}
      <div className="border-t border-primary-100 bg-white">
        <LessonControls
          isPlaying={isPlaying}
          onPlayPause={handlePlayPause}
          volume={volume}
          onVolumeChange={handleVolumeChange}
          isMuted={isMuted}
          onMuteToggle={handleMuteToggle}
          isFullscreen={isFullscreen}
          onFullscreenToggle={toggleFullscreen}
          onEndLesson={handleEndLesson}
          onOpenDrawingTools={toggleDrawingMode}
          isDrawingMode={isDrawingMode}
          onReplayAudio={handleReplayAudio}
        />
      </div>

      {/* End Lesson Dialog */}
      <AlertDialog
        open={showEndLessonDialog}
        onOpenChange={setShowEndLessonDialog}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>End this lesson?</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to end this lesson? Your progress will be
              saved.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={confirmEndLesson}>
              End Lesson
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </m.div>
  );
};

export default LessonContainer;
