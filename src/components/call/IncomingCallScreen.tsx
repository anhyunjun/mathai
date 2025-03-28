import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Phone, PhoneOff, Volume2, VolumeX } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";

interface IncomingCallScreenProps {
  teacherName?: string;
  teacherAvatar?: string;
  subject?: string;
  onAnswer?: () => void;
  onDecline?: () => void;
  isOpen?: boolean;
}

const IncomingCallScreen: React.FC<IncomingCallScreenProps> = ({
  teacherName = "Ms. Johnson",
  teacherAvatar = "https://api.dicebear.com/7.x/avataaars/svg?seed=teacher",
  subject = "Algebra",
  onAnswer = () => console.log("Call answered"),
  onDecline = () => console.log("Call declined"),
  isOpen = true,
}) => {
  const [callTimer, setCallTimer] = useState<number>(0);
  const [isMuted, setIsMuted] = useState<boolean>(false);
  const [isRinging, setIsRinging] = useState<boolean>(true);

  useEffect(() => {
    let interval: NodeJS.Timeout;

    if (isOpen && isRinging) {
      interval = setInterval(() => {
        setCallTimer((prev) => prev + 1);
      }, 1000);
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isOpen, isRinging]);

  const formatTime = (seconds: number): string => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  };

  const toggleMute = () => {
    setIsMuted(!isMuted);
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.9 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50"
        >
          <motion.div
            className="bg-white dark:bg-gray-900 rounded-xl shadow-2xl overflow-hidden w-[400px] max-w-full"
            initial={{ y: 50 }}
            animate={{ y: 0 }}
            transition={{ type: "spring", damping: 15 }}
          >
            <div className="p-6 flex flex-col items-center">
              <div className="relative">
                <motion.div
                  animate={{ scale: isRinging ? [1, 1.1, 1] : 1 }}
                  transition={{ repeat: Infinity, duration: 1.5 }}
                  className="absolute -inset-4 rounded-full bg-primary/10 z-0"
                />
                <Avatar className="h-32 w-32 border-4 border-primary relative z-10">
                  <AvatarImage src={teacherAvatar} alt={teacherName} />
                  <AvatarFallback>{teacherName.charAt(0)}</AvatarFallback>
                </Avatar>
              </div>

              <h2 className="text-2xl font-bold mt-6 text-center">
                {teacherName}
              </h2>
              <p className="text-muted-foreground mb-2">AI Math Teacher</p>
              <p className="text-primary font-medium">{subject} Lesson</p>

              <div className="text-sm text-muted-foreground mt-2">
                {formatTime(callTimer)}
              </div>

              <div className="w-full mt-8 grid grid-cols-3 gap-4">
                <Button
                  variant="outline"
                  size="icon"
                  className="rounded-full h-12 w-12 mx-auto"
                  onClick={toggleMute}
                >
                  {isMuted ? <VolumeX size={20} /> : <Volume2 size={20} />}
                </Button>

                <Button
                  variant="destructive"
                  size="icon"
                  className="rounded-full h-12 w-12 mx-auto"
                  onClick={onDecline}
                >
                  <PhoneOff size={20} />
                </Button>

                <Button
                  variant="default"
                  size="icon"
                  className="rounded-full h-12 w-12 mx-auto bg-green-500 hover:bg-green-600"
                  onClick={onAnswer}
                >
                  <Phone size={20} />
                </Button>
              </div>

              <p className="text-xs text-center text-muted-foreground mt-6">
                Your AI teacher is calling for your scheduled lesson
              </p>
            </div>

            <div className="bg-muted p-4 flex justify-center">
              <Button variant="ghost" onClick={onDecline} className="text-sm">
                Reschedule for later
              </Button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default IncomingCallScreen;
