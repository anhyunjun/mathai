import React, { useState, useEffect, useRef } from "react";
import { motion as m } from "framer-motion";
import AITeacherVideo from "./AITeacherVideo";
import LessonContent from "./LessonContent";
import LessonControls from "./LessonControls";
import InteractiveProblemArea from "../practice/InteractiveProblemArea";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
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
import { BookOpen, MessageSquare, Award, X, Mic } from "lucide-react";

interface LessonContainerProps {
  teacherName?: string;
  lessonTitle?: string;
  lessonDescription?: string;
  onEndLesson?: () => void;
  lessonType?: "algebra" | "geometry" | "calculus" | "statistics";
  currentSlide?: number;
  totalSlides?: number;
}

const LessonContainer: React.FC<LessonContainerProps> = ({
  teacherName = "Ms. Kong",
  lessonTitle = "Introduction to Quadratic Equations",
  lessonDescription = "Learn how to solve quadratic equations using different methods",
  onEndLesson = () => {},
  lessonType = "algebra",
  currentSlide = 1,
  totalSlides = 10,
}) => {
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
  const [showEndLessonDialog, setShowEndLessonDialog] = useState(false);
  const [showChatDialog, setShowChatDialog] = useState(false);
  const [showHelpDialog, setShowHelpDialog] = useState(false);
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

          setChatHistory([...chatHistory, newMessage]);

          // Simulate AI response after a short delay
          setTimeout(() => {
            const aiResponse = {
              sender: "AI",
              message: `I understand your question about "${userInput}". Let me explain...`,
              timestamp: new Date().toLocaleTimeString(),
            };
            setChatHistory((prev) => [...prev, aiResponse]);
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
  }, [chatHistory]);

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

  // Track time spent on current problem and update teacher observation status
  useEffect(() => {
    const timer = setInterval(() => {
      if (activeTab === "practice" && studentActivity === "solving") {
        setTimeSpentOnCurrentProblem((prev) => prev + 1);

        // Update teacher observation status based on time spent
        if (timeSpentOnCurrentProblem > 45) {
          setTeacherObservationStatus("helping");
        } else if (timeSpentOnCurrentProblem > 30) {
          setTeacherObservationStatus("thinking");
        } else {
          setTeacherObservationStatus("observing");
        }
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [activeTab, studentActivity, timeSpentOnCurrentProblem]);

  // Reset timer when changing tabs
  useEffect(() => {
    setTimeSpentOnCurrentProblem(0);
    if (activeTab === "lesson") {
      setTeacherObservationStatus("observing");
      setStudentActivity("reviewing");
    } else if (activeTab === "practice") {
      setTeacherObservationStatus("observing");
      setStudentActivity("solving");
    } else if (activeTab === "chat") {
      setTeacherObservationStatus("idle");
      setStudentActivity("idle");
    }
  }, [activeTab]);

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
  };

  const handleNextSlide = () => {
    if (currentLessonSlide < totalSlides) {
      setCurrentLessonSlide(currentLessonSlide + 1);

      // Add proactive AI message when moving to a new slide
      if (
        currentLessonSlide === 2 ||
        currentLessonSlide === 5 ||
        currentLessonSlide === 8
      ) {
        const promptCategory =
          currentLessonSlide < 4
            ? "introduction"
            : currentLessonSlide < 7
              ? "midLesson"
              : "practice";
        const randomIndex = Math.floor(
          Math.random() * proactivePrompts[promptCategory].length,
        );
        const proactiveMessage = {
          sender: "AI",
          message: proactivePrompts[promptCategory][randomIndex],
          timestamp: new Date().toLocaleTimeString(),
          isProactive: true,
        };

        // Add the message after a short delay to seem more natural
        setTimeout(() => {
          setChatHistory((prev) => [...prev, proactiveMessage]);
          // If chat tab is not active, show a notification
          if (activeTab !== "chat") {
            setShowChatDialog(true);
          }
        }, 3000);
      }
    }
  };

  const handlePrevSlide = () => {
    if (currentLessonSlide > 1) {
      setCurrentLessonSlide(currentLessonSlide - 1);
    }
  };

  const handleSendMessage = () => {
    if (chatMessage.trim()) {
      const newMessage = {
        sender: "You",
        message: chatMessage,
        timestamp: new Date().toLocaleTimeString(),
      };

      setChatHistory([...chatHistory, newMessage]);
      setChatMessage("");

      // Simulate AI response after a short delay
      setTimeout(() => {
        // Determine if we should give an encouraging response
        const shouldEncourage =
          chatMessage.toLowerCase().includes("i understand") ||
          chatMessage.toLowerCase().includes("got it") ||
          chatMessage.toLowerCase().includes("makes sense");

        let responseMessage =
          "That's a great question about quadratic equations! Let me explain further...";

        if (shouldEncourage) {
          const randomIndex = Math.floor(
            Math.random() * proactivePrompts.encouragement.length,
          );
          responseMessage = proactivePrompts.encouragement[randomIndex];
        } else if (
          chatMessage.toLowerCase().includes("help") ||
          chatMessage.toLowerCase().includes("confused") ||
          chatMessage.toLowerCase().includes("don't understand")
        ) {
          responseMessage =
            "I can see this might be challenging. Let's break it down step by step...";
        }

        const aiResponse = {
          sender: "AI",
          message: responseMessage,
          timestamp: new Date().toLocaleTimeString(),
        };
        setChatHistory((prev) => [...prev, aiResponse]);

        // If the user seems to understand, offer to move forward after a moment
        if (shouldEncourage && currentLessonSlide < totalSlides) {
          setTimeout(() => {
            const followUpMessage = {
              sender: "AI",
              message:
                "Since you're understanding this well, shall we move to the next concept?",
              timestamp: new Date().toLocaleTimeString(),
              isProactive: true,
            };
            setChatHistory((prev) => [...prev, followUpMessage]);
          }, 2000);
        }
      }, 1000);
    }
  };

  return (
    <m.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="w-full h-full bg-background flex flex-col overflow-hidden"
    >
      {/* Main content area with tabs */}
      <div className="flex-grow flex flex-col overflow-hidden">
        <Tabs
          value={activeTab}
          onValueChange={setActiveTab}
          className="flex-grow flex flex-col"
        >
          <div className="bg-primary-50 border-b border-primary-100 px-4 py-3 flex items-center justify-between shadow-soft">
            <TabsList className="bg-white shadow-soft">
              <TabsTrigger
                value="lesson"
                className="flex items-center data-[state=active]:bg-primary data-[state=active]:text-primary-foreground transition-all"
              >
                <BookOpen className="h-4 w-4 mr-2" />
                Lesson
              </TabsTrigger>
              <TabsTrigger
                value="practice"
                className="flex items-center data-[state=active]:bg-primary data-[state=active]:text-primary-foreground transition-all"
              >
                <Award className="h-4 w-4 mr-2" />
                Practice
              </TabsTrigger>
              <TabsTrigger
                value="chat"
                className="flex items-center data-[state=active]:bg-primary data-[state=active]:text-primary-foreground transition-all"
              >
                <MessageSquare className="h-4 w-4 mr-2" />
                Chat
              </TabsTrigger>
            </TabsList>

            {/* Teacher video when minimized */}
            {isVideoMinimized && (
              <div className="ml-auto">
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

          <div className="flex-grow overflow-hidden">
            <TabsContent value="lesson" className="h-full flex">
              <div className="flex-grow overflow-hidden">
                <LessonContent
                  title={lessonTitle}
                  description={lessonDescription}
                  currentSlide={currentLessonSlide}
                  totalSlides={totalSlides}
                  onNextSlide={handleNextSlide}
                  onPrevSlide={handlePrevSlide}
                  lessonType={lessonType}
                  chatHistory={chatHistory}
                />
              </div>

              {!isVideoMinimized && (
                <div className="w-[300px] min-w-[300px] h-full border-l border-primary-100 flex flex-col bg-primary-50 teacher-sidebar">
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
                    />
                  </div>

                  {/* Question Interface */}
                  <div className="p-4 border-t border-primary-100">
                    <h3 className="text-sm font-medium mb-2">Ask a Question</h3>
                    <div className="flex mb-2">
                      <input
                        type="text"
                        placeholder="Type your question here..."
                        className="flex-grow p-2 text-sm rounded-l-md border border-r-0 border-gray-300 focus:outline-none focus:ring-1 focus:ring-primary"
                        value={chatMessage}
                        onChange={(e) => setChatMessage(e.target.value)}
                        onKeyDown={(e) =>
                          e.key === "Enter" && handleSendMessage()
                        }
                      />
                      <button
                        className="bg-primary text-white p-2 rounded-r-md hover:bg-primary-600"
                        onClick={handleSendMessage}
                      >
                        <MessageSquare size={16} />
                      </button>
                    </div>
                    <button
                      className="w-full flex items-center justify-center gap-2 bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600"
                      onClick={startListening}
                      disabled={isListening}
                    >
                      <Mic size={16} />
                      {isListening ? "Listening..." : "Ask with Voice"}
                    </button>
                  </div>
                </div>
              )}
            </TabsContent>

            <TabsContent value="practice" className="h-full">
              <InteractiveProblemArea lessonType={lessonType} />
            </TabsContent>

            <TabsContent value="chat" className="h-full p-4 overflow-y-auto">
              <div className="flex flex-col h-full">
                <div className="flex-grow overflow-y-auto mb-4 space-y-4">
                  {chatHistory.map((chat, index) => (
                    <div
                      key={index}
                      className={`flex ${chat.sender === "You" ? "justify-end" : "justify-start"}`}
                    >
                      <div
                        className={`max-w-[80%] p-3 rounded-lg ${chat.sender === "You" ? "bg-primary text-primary-foreground" : "bg-muted"} ${chat.isProactive ? "border-l-4 border-primary" : ""}`}
                      >
                        <div className="font-semibold text-sm mb-1">
                          {chat.sender}{" "}
                          <span className="text-xs font-normal opacity-70">
                            {chat.timestamp}
                          </span>
                        </div>
                        <div>{chat.message}</div>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="flex items-center space-x-2">
                  <input
                    type="text"
                    value={chatMessage}
                    onChange={(e) => setChatMessage(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && handleSendMessage()}
                    placeholder="Ask a question about the lesson..."
                    className="flex-grow p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                  <Button onClick={handleSendMessage}>Send</Button>
                </div>
              </div>
            </TabsContent>
          </div>
        </Tabs>
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
          currentSlide={currentLessonSlide}
          totalSlides={totalSlides}
          onNextSlide={handleNextSlide}
          onPrevSlide={handlePrevSlide}
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

      {/* Chat Notification Dialog */}
      <Dialog open={showChatDialog} onOpenChange={setShowChatDialog}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>New message from {teacherName}</DialogTitle>
            <DialogDescription>
              Your AI teacher has a question or suggestion for you.
            </DialogDescription>
          </DialogHeader>
          <div className="p-4 bg-muted rounded-md">
            {chatHistory.length > 0 &&
              chatHistory[chatHistory.length - 1].isProactive && (
                <p>{chatHistory[chatHistory.length - 1].message}</p>
              )}
          </div>
          <DialogFooter className="flex justify-between">
            <Button variant="outline" onClick={() => setShowChatDialog(false)}>
              Dismiss
            </Button>
            <Button
              onClick={() => {
                setActiveTab("chat");
                setShowChatDialog(false);
              }}
            >
              Reply
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </m.div>
  );
};

export default LessonContainer;
