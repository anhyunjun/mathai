import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Phone, PhoneOff, Video } from "lucide-react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";

interface IncomingCallModalProps {
  isOpen?: boolean;
  onAnswer?: () => void;
  onDecline?: () => void;
  teacherName?: string;
  lessonTopic?: string;
  teacherAvatar?: string;
}

const IncomingCallModal: React.FC<IncomingCallModalProps> = ({
  isOpen = true,
  onAnswer = () => console.log("Call answered"),
  onDecline = () => console.log("Call declined"),
  teacherName = "Ms. Kong",
  lessonTopic = "Algebra: Quadratic Equations",
  teacherAvatar = "https://api.dicebear.com/7.x/avataaars/svg?seed=mathkong&backgroundColor=b6e3f4",
}) => {
  const [callRinging, setCallRinging] = useState(true);
  const [ringCount, setRingCount] = useState(0);

  // Simulate ringing sound effect
  useEffect(() => {
    if (!isOpen) return;

    const ringInterval = setInterval(() => {
      if (ringCount < 10) {
        // Play ring sound here if we had audio
        setRingCount((prev) => prev + 1);
      } else {
        clearInterval(ringInterval);
        setCallRinging(false);
      }
    }, 2000);

    return () => clearInterval(ringInterval);
  }, [isOpen, ringCount]);

  const handleAnswer = () => {
    setCallRinging(false);
    onAnswer();
  };

  const handleDecline = () => {
    setCallRinging(false);
    onDecline();
  };

  return (
    <Dialog open={isOpen}>
      <DialogContent className="bg-white sm:max-w-md p-0 overflow-hidden rounded-xl">
        <div className="bg-gradient-to-br from-blue-400 to-purple-500 p-6 flex flex-col items-center">
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="mb-4"
          >
            <Avatar className="h-32 w-32 border-4 border-white shadow-lg">
              <AvatarImage src={teacherAvatar} alt={teacherName} />
              <AvatarFallback className="text-3xl bg-blue-200 text-blue-700">
                {teacherName
                  .split(" ")
                  .map((n) => n[0])
                  .join("")}
              </AvatarFallback>
            </Avatar>
          </motion.div>

          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.4 }}
            className="text-center"
          >
            <h2 className="text-2xl font-bold text-white mb-1">
              {teacherName}
            </h2>
            <div className="flex items-center justify-center gap-2 mb-2">
              <Video className="h-4 w-4 text-white opacity-80" />
              <p className="text-white text-sm font-medium">Video Call</p>
            </div>
            <p className="text-white/90 text-sm bg-white/20 px-3 py-1 rounded-full">
              {lessonTopic}
            </p>
          </motion.div>

          {callRinging && (
            <motion.div
              initial={{ scale: 1 }}
              animate={{ scale: [1, 1.05, 1] }}
              transition={{ repeat: Infinity, duration: 1.5 }}
              className="text-white/80 mt-3 text-sm"
            >
              Ringing...
            </motion.div>
          )}
        </div>

        <div className="p-6 flex justify-center gap-6">
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Button
              onClick={handleDecline}
              variant="destructive"
              size="lg"
              className="rounded-full h-16 w-16 flex items-center justify-center"
            >
              <PhoneOff className="h-6 w-6" />
            </Button>
            <p className="text-center mt-2 text-sm text-gray-600">Decline</p>
          </motion.div>

          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Button
              onClick={handleAnswer}
              variant="default"
              size="lg"
              className="rounded-full h-16 w-16 bg-green-500 hover:bg-green-600 flex items-center justify-center"
            >
              <Phone className="h-6 w-6" />
            </Button>
            <p className="text-center mt-2 text-sm text-gray-600">Answer</p>
          </motion.div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default IncomingCallModal;
