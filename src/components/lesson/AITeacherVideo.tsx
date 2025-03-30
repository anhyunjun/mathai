import React, { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  Mic,
  MicOff,
  Video,
  VideoOff,
  Maximize2,
  Minimize2,
  Volume2,
  VolumeX,
  AlertCircle,
  MessageSquare,
} from "lucide-react";
import { callGptApi, type ChatMessage } from "@/lib/utils";

interface AITeacherVideoProps {
  teacherName?: string;
  isMinimized?: boolean;
  onToggleMinimize?: () => void;
  videoSrc?: string;
  avatarSrc?: string;
  isMuted?: boolean;
  onMessage?: (message: string) => void;
  initialPrompt?: string;
  subject?: string;
  enableSpeech?: boolean;
  enableVoiceInput?: boolean;
  observationStatus?:
    | "observing"
    | "thinking"
    | "helping"
    | "praising"
    | "idle";
  studentActivity?: "solving" | "stuck" | "reviewing" | "idle";
  timeSpentOnProblem?: number;
}

const AITeacherVideo = ({
  teacherName = "Ms. Kong",
  isMinimized = false,
  onToggleMinimize = () => {},
  videoSrc = "",
  avatarSrc = "https://api.dicebear.com/7.x/avataaars/svg?seed=mathkong&backgroundColor=b6e3f4",
  isMuted = false,
  onMessage = () => {},
  initialPrompt = "You are Ms. Kong, a friendly and enthusiastic math teacher. Introduce yourself and ask what math topic the student would like to learn about today.",
  subject = "mathematics",
  enableSpeech = true,
  enableVoiceInput = true,
  observationStatus = "observing",
  studentActivity = "idle",
  timeSpentOnProblem = 0,
}: AITeacherVideoProps) => {
  const [localMuted, setLocalMuted] = useState(isMuted);
  const [videoEnabled, setVideoEnabled] = useState(true);
  const [micEnabled, setMicEnabled] = useState(true);
  const [isListening, setIsListening] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [observationText, setObservationText] = useState<string>("");
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      role: "system",
      content: `You are ${teacherName}, an AI math teacher specializing in ${subject} for K-12 students. You are enthusiastic, encouraging, and explain concepts in simple terms. Keep responses concise (under 100 words) and engaging for young students. Remember their progress and refer to past interactions when appropriate.`,
    },
  ]);

  // Observation status messages based on teacher's current state
  const observationMessages = {
    observing: [
      "I'm watching your progress...",
      "I see you're working on this...",
      "I'm here if you need help",
      "Take your time",
    ],
    thinking: [
      "Hmm, let me think about this...",
      "Considering your approach...",
      "Analyzing your solution...",
    ],
    helping: [
      "Let me guide you here...",
      "I think I can help with this",
      "Let's solve this together",
    ],
    praising: [
      "Great work!",
      "Excellent approach!",
      "You're doing wonderfully!",
      "I'm impressed by your thinking",
    ],
    idle: [
      "Ready when you are",
      "What would you like to learn?",
      "I'm here to help",
    ],
  };
  const [currentMessage, setCurrentMessage] = useState<string>("");
  const [transcript, setTranscript] = useState<string>("");
  const videoRef = useRef<HTMLVideoElement>(null);
  const speechRecognitionRef = useRef<SpeechRecognition | null>(null);
  const speechSynthesisRef = useRef<SpeechSynthesisUtterance | null>(null);

  // Initialize speech recognition
  useEffect(() => {
    if (enableVoiceInput && "webkitSpeechRecognition" in window) {
      const SpeechRecognition =
        window.webkitSpeechRecognition || window.SpeechRecognition;
      speechRecognitionRef.current = new SpeechRecognition();
      speechRecognitionRef.current.continuous = false;
      speechRecognitionRef.current.interimResults = false;
      speechRecognitionRef.current.lang = "en-US";

      speechRecognitionRef.current.onresult = (event) => {
        const userInput = event.results[0][0].transcript;
        setTranscript(userInput);
        handleSendMessage(userInput);
      };

      speechRecognitionRef.current.onerror = (event) => {
        console.error("Speech recognition error", event.error);
        setIsListening(false);
        setError(`Speech recognition error: ${event.error}`);
        setTimeout(() => setError(null), 5000);
      };

      speechRecognitionRef.current.onend = () => {
        setIsListening(false);
      };
    } else if (enableVoiceInput) {
      setError("Speech recognition is not supported in this browser");
      setTimeout(() => setError(null), 5000);
    }

    return () => {
      if (speechRecognitionRef.current) {
        speechRecognitionRef.current.abort();
      }
    };
  }, [enableVoiceInput]);

  // Function to start listening for speech
  const startListening = () => {
    if (speechRecognitionRef.current && !isListening) {
      setTranscript("");
      setIsListening(true);
      speechRecognitionRef.current.start();
    }
  };

  // Function to stop listening for speech
  const stopListening = () => {
    if (speechRecognitionRef.current && isListening) {
      speechRecognitionRef.current.stop();
      setIsListening(false);
    }
  };

  // Function to speak text using speech synthesis
  const speakText = (text: string) => {
    if (enableSpeech && "speechSynthesis" in window) {
      // Cancel any ongoing speech
      window.speechSynthesis.cancel();

      const utterance = new SpeechSynthesisUtterance(text);
      utterance.rate = 1.0;
      utterance.pitch = 1.0;
      utterance.volume = 1.0;

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

      utterance.onstart = () => {
        setIsSpeaking(true);
      };

      utterance.onend = () => {
        setIsSpeaking(false);
      };

      utterance.onerror = (event) => {
        console.error("Speech synthesis error", event);
        setIsSpeaking(false);
      };

      speechSynthesisRef.current = utterance;
      window.speechSynthesis.speak(utterance);
    }
  };

  // Function to handle sending a message to the GPT API
  const handleSendMessage = async (userMessage?: string) => {
    try {
      setIsLoading(true);
      setError(null);

      // If this is the first message, use the initial prompt
      const newMessages = [...messages];

      if (userMessage) {
        newMessages.push({
          role: "user",
          content: userMessage,
        });
      } else if (messages.length === 1) {
        // Only system message exists, add the initial prompt
        newMessages.push({
          role: "user",
          content: initialPrompt,
        });
      }

      setMessages(newMessages);

      const response = await callGptApi(newMessages, {
        onError: (err) => {
          setError(err.message);
          setTimeout(() => setError(null), 5000);
        },
      });

      if (response) {
        const assistantMessage = {
          role: "assistant" as const,
          content: response,
        };

        setMessages([...newMessages, assistantMessage]);
        setCurrentMessage(response);

        // Pass the message to the parent component if needed
        onMessage(response);

        // Speak the response if speech is enabled
        if (enableSpeech) {
          speakText(response);
        }

        // Clear the message after a delay (longer to accommodate speech)
        setTimeout(() => {
          setCurrentMessage("");
        }, 15000);
      }
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
        setTimeout(() => setError(null), 5000);
      }
    } finally {
      setIsLoading(false);
    }
  };

  // Initialize with the first message
  useEffect(() => {
    if (messages.length === 1) {
      handleSendMessage();
    }

    // Initialize speech synthesis voices
    if (enableSpeech && "speechSynthesis" in window) {
      // Load voices if they're not already loaded
      if (window.speechSynthesis.getVoices().length === 0) {
        window.speechSynthesis.onvoiceschanged = () => {
          // Voices are now loaded
        };
      }
    }
  }, []);

  // Update observation text based on status
  useEffect(() => {
    if (observationStatus) {
      const messages = observationMessages[observationStatus];
      const randomIndex = Math.floor(Math.random() * messages.length);
      setObservationText(messages[randomIndex]);
    }
  }, [observationStatus]);

  // Provide contextual help based on student activity and time spent
  useEffect(() => {
    if (studentActivity === "stuck" && timeSpentOnProblem > 30) {
      // If student is stuck for more than 30 seconds, offer help
      const helpMessage = "I notice you might be stuck. Would you like a hint?";
      setCurrentMessage(helpMessage);
      if (enableSpeech) {
        speakText(helpMessage);
      }
    } else if (studentActivity === "solving" && timeSpentOnProblem > 60) {
      // If student has been solving for a while, offer encouragement
      const encouragementMessage = "You're making good progress. Keep going!";
      setCurrentMessage(encouragementMessage);
      if (enableSpeech) {
        speakText(encouragementMessage);
      }
    }
  }, [studentActivity, timeSpentOnProblem]);

  // Cancel speech when component unmounts
  useEffect(() => {
    return () => {
      if ("speechSynthesis" in window) {
        window.speechSynthesis.cancel();
      }
    };
  }, []);

  // Simulate video stream with a placeholder if no source provided
  useEffect(() => {
    if (videoRef.current && !videoSrc) {
      // This creates a simple gradient animation as a placeholder
      const canvas = document.createElement("canvas");
      canvas.width = 320;
      canvas.height = 240;
      const ctx = canvas.getContext("2d");
      if (!ctx) return;

      const animate = () => {
        if (!ctx) return;
        const gradient = ctx.createLinearGradient(
          0,
          0,
          canvas.width,
          canvas.height,
        );
        gradient.addColorStop(0, `hsl(${Date.now() % 360}, 70%, 60%)`);
        gradient.addColorStop(1, `hsl(${(Date.now() + 180) % 360}, 70%, 60%)`);
        ctx.fillStyle = gradient;
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        // Add animation when speaking
        if (isSpeaking) {
          const time = Date.now() / 1000;
          const centerX = canvas.width / 2;
          const centerY = canvas.height / 2 + 50; // Position for mouth
          const radius = 20 + Math.sin(time * 10) * 5; // Pulsating radius

          // Draw animated mouth
          ctx.fillStyle = "rgba(0, 0, 0, 0.5)";
          ctx.beginPath();
          ctx.ellipse(
            centerX,
            centerY,
            radius,
            radius / 2,
            0,
            0,
            Math.PI,
            false,
          );
          ctx.fill();
        }
        requestAnimationFrame(animate);
      };

      animate();

      if (videoRef.current) {
        videoRef.current.srcObject = canvas.captureStream(30);
      }
    }
  }, [videoSrc]);

  // FaceTime-style container classes with responsive dimensions and fixed aspect ratio
  const containerClasses = isMinimized
    ? "fixed bottom-4 right-4 w-[220px] h-auto bg-[#111827] rounded-2xl shadow-xl z-50 overflow-hidden transition-all duration-300 ease-in-out hover:scale-105 aspect-[9/16]"
    : "bg-[#111827] rounded-2xl overflow-hidden transition-all duration-300 ease-in-out teacher-container";

  return (
    <div className={containerClasses}>
      {/* Video Container - FaceTime Style */}
      <div className="relative w-full h-full bg-[#111827] flex flex-col">
        {/* Top status bar */}
        <div className="bg-[#111827] text-white p-3 flex justify-between items-center">
          <span className="text-sm font-medium">{teacherName}</span>
          <div className="flex items-center space-x-2">
            <span className="text-xs bg-gradient-to-r from-blue-500 to-green-500 px-2 py-0.5 rounded-full flex items-center">
              <span
                className={`w-2 h-2 rounded-full mr-1 ${observationStatus === "observing" ? "bg-green-300 animate-pulse" : observationStatus === "thinking" ? "bg-yellow-300 animate-pulse" : observationStatus === "helping" ? "bg-blue-300 animate-pulse" : observationStatus === "praising" ? "bg-purple-300 animate-pulse" : "bg-gray-300"}`}
              ></span>
              {observationStatus.charAt(0).toUpperCase() +
                observationStatus.slice(1)}
            </span>
          </div>
        </div>

        {/* Main video area - with math teacher character */}
        <div className="flex-grow flex items-center justify-center bg-[#1F2937] relative">
          {videoEnabled ? (
            <video
              ref={videoRef}
              className="w-[300px] h-[400px] object-cover"
              autoPlay
              muted={localMuted}
              loop
              src={videoSrc}
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-[#1F2937]">
              <div className="w-64 h-64 rounded-full bg-blue-100 relative flex items-center justify-center">
                {/* Math Teacher Character - Duolingo-style */}
                <div className="absolute w-full h-full rounded-full bg-green-400 border-4 border-green-600 overflow-hidden flex items-center justify-center">
                  {/* Face */}
                  <div className="absolute w-56 h-56 rounded-full bg-green-300 top-4"></div>

                  {/* Eyes */}
                  <div className="absolute w-12 h-12 rounded-full bg-white top-16 left-14 flex items-center justify-center">
                    <div className="w-6 h-6 rounded-full bg-black"></div>
                  </div>
                  <div className="absolute w-12 h-12 rounded-full bg-white top-16 right-14 flex items-center justify-center">
                    <div className="w-6 h-6 rounded-full bg-black"></div>
                  </div>

                  {/* Eyebrows */}
                  <div className="absolute w-14 h-3 bg-green-700 rounded-full top-10 left-12 transform -rotate-12"></div>
                  <div className="absolute w-14 h-3 bg-green-700 rounded-full top-10 right-12 transform rotate-12"></div>

                  {/* Smile */}
                  <div className="absolute w-24 h-8 border-b-4 border-green-700 rounded-b-full bottom-24 left-1/2 transform -translate-x-1/2"></div>

                  {/* Math accessories */}
                  <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-20 h-10 bg-blue-500 rounded-b-lg flex items-center justify-center">
                    <span className="text-white font-bold">MATH</span>
                  </div>

                  {/* Math symbols floating around */}
                  <div className="absolute top-8 left-6 text-xl font-bold text-blue-700 animate-bounce-subtle">
                    +
                  </div>
                  <div className="absolute top-8 right-6 text-xl font-bold text-purple-700 animate-bounce-subtle">
                    ÷
                  </div>
                  <div className="absolute bottom-16 left-10 text-xl font-bold text-yellow-500 animate-bounce-subtle">
                    ×
                  </div>
                  <div className="absolute bottom-16 right-10 text-xl font-bold text-red-500 animate-bounce-subtle">
                    −
                  </div>
                  <div className="absolute bottom-28 left-1/2 transform -translate-x-1/2 text-xl font-bold text-blue-700 animate-bounce-subtle">
                    =
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Message bubble */}
          {currentMessage && (
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white/90 px-4 py-3 rounded-lg max-w-[250px] shadow-lg border-l-4 border-blue-500">
              <p className="text-sm text-gray-800">{currentMessage}</p>
            </div>
          )}

          {/* Observation status bubble - always visible */}
          {observationText && !currentMessage && !isListening && (
            <div className="absolute bottom-20 left-1/2 transform -translate-x-1/2 bg-blue-500/20 backdrop-blur-sm px-3 py-1.5 rounded-full max-w-[200px] text-center">
              <p className="text-xs text-white font-medium">
                {observationText}
              </p>
            </div>
          )}

          {/* Transcript bubble when listening */}
          {isListening && (
            <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-blue-500/90 px-4 py-2 rounded-lg max-w-[250px] shadow-lg">
              <p className="text-xs text-white">Listening...</p>
              {transcript && (
                <p className="text-sm text-white font-medium mt-1">
                  "{transcript}"
                </p>
              )}
            </div>
          )}
        </div>

        {/* Bottom control bar */}
        <div className="bg-[#111827] p-4 flex justify-center space-x-4">
          <Button
            variant="ghost"
            size="icon"
            className={`rounded-full h-12 w-12 ${isListening ? "bg-red-600 text-white animate-pulse" : micEnabled ? "bg-blue-600 text-white" : "bg-gray-700 text-white"}`}
            onClick={() => {
              if (enableVoiceInput) {
                if (isListening) {
                  stopListening();
                } else if (micEnabled) {
                  startListening();
                } else {
                  setMicEnabled(true);
                }
              } else {
                setMicEnabled(!micEnabled);
              }
            }}
          >
            {isListening ? (
              <Mic size={20} />
            ) : micEnabled ? (
              <Mic size={20} />
            ) : (
              <MicOff size={20} />
            )}
          </Button>

          <Button
            variant="ghost"
            size="icon"
            className={`rounded-full h-12 w-12 ${videoEnabled ? "bg-blue-600 text-white" : "bg-gray-700 text-white"}`}
            onClick={() => setVideoEnabled(!videoEnabled)}
          >
            {videoEnabled ? <Video size={20} /> : <VideoOff size={20} />}
          </Button>

          <Button
            variant="ghost"
            size="icon"
            className={`rounded-full h-12 w-12 ${isSpeaking ? "bg-green-600 text-white animate-pulse" : "bg-green-600 text-white hover:bg-green-700"}`}
            onClick={() => handleSendMessage()}
            disabled={isLoading || isListening}
          >
            <MessageSquare size={20} />
          </Button>

          <Button
            variant="ghost"
            size="icon"
            className="rounded-full h-12 w-12 bg-red-600 text-white hover:bg-red-700"
            onClick={onToggleMinimize}
          >
            {isMinimized ? <Maximize2 size={20} /> : <Minimize2 size={20} />}
          </Button>
        </div>

        {/* Bottom pill */}
        <div className="absolute bottom-20 left-1/2 transform -translate-x-1/2 bg-black/30 backdrop-blur-sm px-4 py-1 rounded-full flex items-center space-x-2">
          <div
            className={`w-2 h-2 rounded-full ${isLoading ? "bg-yellow-500 animate-pulse" : isSpeaking ? "bg-green-500 animate-pulse" : isListening ? "bg-red-500 animate-pulse" : "bg-blue-500"}`}
          ></div>
          <span className="text-xs text-white font-medium">
            {isLoading
              ? "Thinking..."
              : isSpeaking
                ? "Speaking..."
                : isListening
                  ? "Listening..."
                  : error
                    ? "Error"
                    : "AI Teacher"}
          </span>
        </div>

        {/* Error message */}
        {error && (
          <div className="absolute top-20 left-1/2 transform -translate-x-1/2 bg-red-500/90 px-4 py-2 rounded-md flex items-center space-x-2 max-w-[250px]">
            <AlertCircle size={16} className="text-white" />
            <span className="text-xs text-white">{error}</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default AITeacherVideo;
