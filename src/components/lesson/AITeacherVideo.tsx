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
} from "lucide-react";

interface AITeacherVideoProps {
  teacherName?: string;
  isMinimized?: boolean;
  onToggleMinimize?: () => void;
  videoSrc?: string;
  avatarSrc?: string;
  isMuted?: boolean;
}

const AITeacherVideo = ({
  teacherName = "Ms. Kong",
  isMinimized = false,
  onToggleMinimize = () => {},
  videoSrc = "",
  avatarSrc = "https://api.dicebear.com/7.x/avataaars/svg?seed=mathkong&backgroundColor=b6e3f4",
  isMuted = false,
}: AITeacherVideoProps) => {
  const [localMuted, setLocalMuted] = useState(isMuted);
  const [videoEnabled, setVideoEnabled] = useState(true);
  const [micEnabled, setMicEnabled] = useState(true);
  const videoRef = useRef<HTMLVideoElement>(null);

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
        requestAnimationFrame(animate);
      };

      animate();

      if (videoRef.current) {
        videoRef.current.srcObject = canvas.captureStream(30);
      }
    }
  }, [videoSrc]);

  const containerClasses = isMinimized
    ? "fixed bottom-4 right-4 w-64 h-48 bg-background rounded-lg shadow-lg z-50"
    : "w-full h-full max-w-[320px] max-h-[240px] bg-background rounded-lg shadow-lg";

  return (
    <div className={`${containerClasses} overflow-hidden`}>
      {/* Video Container */}
      <div className="relative w-full h-full bg-slate-800">
        {videoEnabled ? (
          <video
            ref={videoRef}
            className="w-full h-full object-cover"
            autoPlay
            muted={localMuted}
            loop
            src={videoSrc}
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-slate-800">
            <img
              src={avatarSrc}
              alt={teacherName}
              className="w-24 h-24 rounded-full"
            />
          </div>
        )}

        {/* Teacher Name */}
        <div className="absolute top-2 left-2 bg-black/50 text-white px-2 py-1 rounded text-sm">
          {teacherName}
        </div>

        {/* Controls Overlay */}
        <div className="absolute bottom-0 left-0 right-0 p-2 bg-gradient-to-t from-black/70 to-transparent flex justify-between items-center">
          <div className="flex space-x-1">
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-7 w-7 text-white hover:bg-white/20"
                    onClick={() => setMicEnabled(!micEnabled)}
                  >
                    {micEnabled ? <Mic size={16} /> : <MicOff size={16} />}
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>{micEnabled ? "Mute microphone" : "Unmute microphone"}</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>

            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-7 w-7 text-white hover:bg-white/20"
                    onClick={() => setVideoEnabled(!videoEnabled)}
                  >
                    {videoEnabled ? (
                      <Video size={16} />
                    ) : (
                      <VideoOff size={16} />
                    )}
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>{videoEnabled ? "Turn off video" : "Turn on video"}</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>

            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-7 w-7 text-white hover:bg-white/20"
                    onClick={() => setLocalMuted(!localMuted)}
                  >
                    {localMuted ? <VolumeX size={16} /> : <Volume2 size={16} />}
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>{localMuted ? "Unmute audio" : "Mute audio"}</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>

          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-7 w-7 text-white hover:bg-white/20"
                  onClick={onToggleMinimize}
                >
                  {isMinimized ? (
                    <Maximize2 size={16} />
                  ) : (
                    <Minimize2 size={16} />
                  )}
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>{isMinimized ? "Maximize" : "Minimize"}</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
      </div>
    </div>
  );
};

export default AITeacherVideo;
