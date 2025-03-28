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

  // FaceTime-style container classes with fixed dimensions and aspect ratio
  const containerClasses = isMinimized
    ? "fixed bottom-4 right-4 w-[300px] h-[500px] bg-[#111827] rounded-2xl shadow-xl z-50 overflow-hidden"
    : "w-[300px] h-[500px] bg-[#111827] rounded-2xl shadow-xl overflow-hidden";

  return (
    <div className={containerClasses}>
      {/* Video Container - FaceTime Style */}
      <div className="relative w-full h-full bg-[#111827] flex flex-col">
        {/* Top status bar */}
        <div className="bg-[#111827] text-white p-3 flex justify-between items-center">
          <span className="text-sm font-medium">{teacherName}</span>
          <span className="text-xs bg-green-500 px-2 py-0.5 rounded-full">
            Active
          </span>
        </div>

        {/* Main video area - with pirate emoji style avatar like in the image */}
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
              <div className="w-64 h-64 rounded-full bg-yellow-400 border-4 border-pink-500 relative flex items-center justify-center">
                {/* Pirate eye patch */}
                <div className="absolute w-32 h-10 bg-gray-900 rotate-[30deg] top-16 left-4"></div>
                <div className="absolute w-10 h-10 rounded-full bg-gray-900 top-12 left-12"></div>
                {/* Eye */}
                <div className="absolute w-8 h-8 rounded-full bg-gray-900 top-20 right-20"></div>
                {/* Mouth */}
                <div className="absolute w-20 h-10 rounded-t-full bg-gray-900 bottom-16 left-1/2 transform -translate-x-1/2 rotate-180"></div>
              </div>
            </div>
          )}
        </div>

        {/* Bottom control bar */}
        <div className="bg-[#111827] p-4 flex justify-center space-x-4">
          <Button
            variant="ghost"
            size="icon"
            className={`rounded-full h-12 w-12 ${micEnabled ? "bg-blue-600 text-white" : "bg-gray-700 text-white"}`}
            onClick={() => setMicEnabled(!micEnabled)}
          >
            {micEnabled ? <Mic size={20} /> : <MicOff size={20} />}
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
            className="rounded-full h-12 w-12 bg-red-600 text-white hover:bg-red-700"
            onClick={onToggleMinimize}
          >
            {isMinimized ? <Maximize2 size={20} /> : <Minimize2 size={20} />}
          </Button>
        </div>

        {/* Bottom pill */}
        <div className="absolute bottom-20 left-1/2 transform -translate-x-1/2 bg-black/30 backdrop-blur-sm px-4 py-1 rounded-full flex items-center space-x-2">
          <div className="w-2 h-2 rounded-full bg-blue-500"></div>
          <span className="text-xs text-white font-medium">AI Teacher</span>
        </div>
      </div>
    </div>
  );
};

export default AITeacherVideo;
