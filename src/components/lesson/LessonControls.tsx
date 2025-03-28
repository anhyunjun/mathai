import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Slider } from "@/components/ui/slider";
import {
  Pause,
  Play,
  Volume2,
  VolumeX,
  Maximize2,
  Minimize2,
  PhoneOff,
  Settings,
  HelpCircle,
  MessageSquare,
  PenTool,
} from "lucide-react";

interface LessonControlsProps {
  isPlaying?: boolean;
  onPlayPause?: () => void;
  onEndLesson?: () => void;
  volume?: number;
  onVolumeChange?: (value: number[]) => void;
  isMuted?: boolean;
  onMuteToggle?: () => void;
  isFullscreen?: boolean;
  onFullscreenToggle?: () => void;
  onOpenSettings?: () => void;
  onOpenHelp?: () => void;
  onOpenChat?: () => void;
  onOpenDrawingTools?: () => void;
}

const LessonControls = ({
  isPlaying = true,
  onPlayPause = () => {},
  onEndLesson = () => {},
  volume = 75,
  onVolumeChange = () => {},
  isMuted = false,
  onMuteToggle = () => {},
  isFullscreen = false,
  onFullscreenToggle = () => {},
  onOpenSettings = () => {},
  onOpenHelp = () => {},
  onOpenChat = () => {},
  onOpenDrawingTools = () => {},
}: LessonControlsProps) => {
  const [localVolume, setLocalVolume] = useState<number>(volume);

  const handleVolumeChange = (values: number[]) => {
    setLocalVolume(values[0]);
    onVolumeChange(values);
  };

  return (
    <div className="w-full h-16 bg-background border-t border-border flex items-center justify-between px-4 py-2">
      <div className="flex items-center space-x-4">
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                onClick={onPlayPause}
                aria-label={isPlaying ? "Pause lesson" : "Play lesson"}
              >
                {isPlaying ? (
                  <Pause className="h-5 w-5" />
                ) : (
                  <Play className="h-5 w-5" />
                )}
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>{isPlaying ? "Pause lesson" : "Resume lesson"}</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>

        <div className="flex items-center space-x-2 w-48">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={onMuteToggle}
                  aria-label={isMuted ? "Unmute" : "Mute"}
                >
                  {isMuted || localVolume === 0 ? (
                    <VolumeX className="h-5 w-5" />
                  ) : (
                    <Volume2 className="h-5 w-5" />
                  )}
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>{isMuted ? "Unmute" : "Mute"}</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>

          <Slider
            defaultValue={[localVolume]}
            max={100}
            step={1}
            value={[isMuted ? 0 : localVolume]}
            onValueChange={handleVolumeChange}
            className="w-32"
            aria-label="Volume"
          />
        </div>
      </div>

      <div className="flex items-center space-x-2">
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                onClick={onOpenDrawingTools}
                aria-label="Drawing tools"
              >
                <PenTool className="h-5 w-5" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Drawing tools</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>

        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                onClick={onOpenChat}
                aria-label="Chat with teacher"
              >
                <MessageSquare className="h-5 w-5" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Chat with teacher</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>

        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                onClick={onOpenHelp}
                aria-label="Help"
              >
                <HelpCircle className="h-5 w-5" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Help</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>

        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                onClick={onOpenSettings}
                aria-label="Settings"
              >
                <Settings className="h-5 w-5" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Settings</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>

        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                onClick={onFullscreenToggle}
                aria-label={
                  isFullscreen ? "Exit fullscreen" : "Enter fullscreen"
                }
              >
                {isFullscreen ? (
                  <Minimize2 className="h-5 w-5" />
                ) : (
                  <Maximize2 className="h-5 w-5" />
                )}
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>{isFullscreen ? "Exit fullscreen" : "Enter fullscreen"}</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>

        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="destructive"
                size="sm"
                onClick={onEndLesson}
                className="ml-2"
                aria-label="End lesson"
              >
                <PhoneOff className="h-4 w-4 mr-2" />
                End Lesson
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>End current lesson</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>
    </div>
  );
};

export default LessonControls;
