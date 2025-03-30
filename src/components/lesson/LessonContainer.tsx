import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
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
import { BookOpen, MessageSquare, Award, X } from "lucide-react";

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
  const [isPlaying, setIsPlaying] = useState(true);
  const [volume, setVolume] = useState(75);
  const [isMuted, setIsMuted] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [showEndLessonDialog, setShowEndLessonDialog] = useState(false);
  const [showChatDialog, setShowChatDialog] = useState(false);
  const [showHelpDialog, setShowHelpDialog] = useState(false);
  const [currentLessonSlide, setCurrentLessonSlide] = useState(currentSlide);
  const [chatMessage, setChatMessage] = useState("");
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
    <motion.div
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
          <div className="bg-muted/30 border-b px-4 py-2 flex items-center justify-between">
            <TabsList>
              <TabsTrigger value="lesson" className="flex items-center">
                <BookOpen className="h-4 w-4 mr-2" />
                Lesson
              </TabsTrigger>
              <TabsTrigger value="practice" className="flex items-center">
                <Award className="h-4 w-4 mr-2" />
                Practice
              </TabsTrigger>
              <TabsTrigger value="chat" className="flex items-center">
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
                />
              </div>

              {!isVideoMinimized && (
                <div className="w-[300px] min-w-[300px] h-full border-l flex items-center justify-center">
                  <div className="flex items-center justify-center">
                    <AITeacherVideo
                      teacherName={teacherName}
                      isMinimized={false}
                      onToggleMinimize={() => setIsVideoMinimized(true)}
                      isMuted={isMuted}
                      avatarSrc="https://api.dicebear.com/7.x/avataaars/svg?seed=mathkong&accessories=eyepatch"
                    />
                  </div>
                </div>
              )}
            </TabsContent>

            <TabsContent value="practice" className="h-full p-4 overflow-auto">
              <InteractiveProblemArea currentLesson={lessonTitle} />
            </TabsContent>

            <TabsContent value="chat" className="h-full flex flex-col p-4">
              <div className="flex-grow overflow-y-auto mb-4 space-y-4 p-2">
                {chatHistory.map((msg, index) => (
                  <div
                    key={index}
                    className={`flex ${msg.sender === "You" ? "justify-end" : "justify-start"}`}
                  >
                    <div
                      className={`max-w-[80%] rounded-lg p-3 ${msg.sender === "You" ? "bg-primary text-primary-foreground" : "bg-muted"}`}
                    >
                      <div className="font-semibold text-sm">{msg.sender}</div>
                      <div>{msg.message}</div>
                      <div className="text-xs opacity-70 mt-1 text-right">
                        {msg.timestamp}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={chatMessage}
                  onChange={(e) => setChatMessage(e.target.value)}
                  placeholder="Ask a question about the lesson..."
                  className="flex-grow px-4 py-2 rounded-md border focus:outline-none focus:ring-2 focus:ring-primary"
                  onKeyDown={(e) => e.key === "Enter" && handleSendMessage()}
                />
                <Button onClick={handleSendMessage}>Send</Button>
              </div>
            </TabsContent>
          </div>
        </Tabs>
      </div>

      {/* Lesson controls */}
      <LessonControls
        isPlaying={isPlaying}
        onPlayPause={handlePlayPause}
        onEndLesson={handleEndLesson}
        volume={volume}
        onVolumeChange={handleVolumeChange}
        isMuted={isMuted}
        onMuteToggle={handleMuteToggle}
        isFullscreen={isFullscreen}
        onFullscreenToggle={toggleFullscreen}
        onOpenChat={() => setShowChatDialog(true)}
        onOpenHelp={() => setShowHelpDialog(true)}
      />

      {/* End Lesson Confirmation Dialog */}
      <AlertDialog
        open={showEndLessonDialog}
        onOpenChange={setShowEndLessonDialog}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>End Current Lesson?</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to end this lesson? Your progress will be
              saved, but you'll exit the current session.
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

      {/* Help Dialog */}
      <Dialog open={showHelpDialog} onOpenChange={setShowHelpDialog}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Lesson Help</DialogTitle>
            <DialogDescription>
              Here's how to navigate your interactive math lesson.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="flex items-start space-x-3">
              <div className="bg-primary/10 p-2 rounded-full">
                <BookOpen className="h-5 w-5 text-primary" />
              </div>
              <div>
                <h4 className="font-medium">Lesson Tab</h4>
                <p className="text-sm text-muted-foreground">
                  View lesson content and follow along with your AI teacher.
                </p>
              </div>
            </div>
            <div className="flex items-start space-x-3">
              <div className="bg-primary/10 p-2 rounded-full">
                <Award className="h-5 w-5 text-primary" />
              </div>
              <div>
                <h4 className="font-medium">Practice Tab</h4>
                <p className="text-sm text-muted-foreground">
                  Solve interactive problems related to the lesson.
                </p>
              </div>
            </div>
            <div className="flex items-start space-x-3">
              <div className="bg-primary/10 p-2 rounded-full">
                <MessageSquare className="h-5 w-5 text-primary" />
              </div>
              <div>
                <h4 className="font-medium">Chat Tab</h4>
                <p className="text-sm text-muted-foreground">
                  Ask questions and get real-time answers from your AI teacher.
                </p>
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button onClick={() => setShowHelpDialog(false)}>Got it</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Chat Dialog (for when in minimized view) */}
      <Dialog open={showChatDialog} onOpenChange={setShowChatDialog}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <div className="flex items-center justify-between">
              <DialogTitle>Chat with {teacherName}</DialogTitle>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setShowChatDialog(false)}
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          </DialogHeader>
          <div className="flex flex-col h-[400px]">
            <div className="flex-grow overflow-y-auto mb-4 space-y-4 p-2">
              {chatHistory.map((msg, index) => (
                <div
                  key={index}
                  className={`flex ${msg.sender === "You" ? "justify-end" : "justify-start"}`}
                >
                  <div
                    className={`max-w-[80%] rounded-lg p-3 ${
                      msg.sender === "You"
                        ? "bg-primary text-primary-foreground"
                        : msg.isProactive
                          ? "bg-blue-100 border border-blue-200"
                          : "bg-muted"
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      {msg.sender === "AI" && (
                        <div className="w-6 h-6 rounded-full overflow-hidden bg-blue-100">
                          <img
                            src="https://api.dicebear.com/7.x/avataaars/svg?seed=mathkong&accessories=eyepatch"
                            alt="AI Teacher"
                            className="w-full h-full object-cover"
                          />
                        </div>
                      )}
                      <div className="font-semibold text-sm">{msg.sender}</div>
                      {msg.isProactive && (
                        <span className="text-xs bg-blue-200 text-blue-800 px-2 py-0.5 rounded-full">
                          Proactive
                        </span>
                      )}
                    </div>
                    <div className="mt-1">{msg.message}</div>
                    <div className="text-xs opacity-70 mt-1 text-right">
                      {msg.timestamp}
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className="flex gap-2">
              <input
                type="text"
                value={chatMessage}
                onChange={(e) => setChatMessage(e.target.value)}
                placeholder="Ask a question..."
                className="flex-grow px-4 py-2 rounded-md border focus:outline-none focus:ring-2 focus:ring-primary"
                onKeyDown={(e) => e.key === "Enter" && handleSendMessage()}
              />
              <Button onClick={handleSendMessage}>Send</Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </motion.div>
  );
};

export default LessonContainer;
