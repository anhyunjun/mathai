import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import HomeDashboard from "@/components/dashboard/HomeDashboard";
import IncomingCallScreen from "@/components/call/IncomingCallScreen";
import LessonContainer from "@/components/lesson/LessonContainer";
import LessonSummary from "@/components/lesson/LessonSummary";

const Home: React.FC = () => {
  const navigate = useNavigate();
  const [callState, setCallState] = useState<
    "none" | "incoming" | "active" | "completed"
  >("none");
  const [scheduledCallTime, setScheduledCallTime] = useState<Date | null>(null);
  const [showIncomingCall, setShowIncomingCall] = useState(false);

  // Simulate a scheduled call
  useEffect(() => {
    // For demo purposes, schedule a call 10 seconds after page load
    const timer = setTimeout(() => {
      const callTime = new Date();
      setScheduledCallTime(callTime);
      setShowIncomingCall(true);
    }, 10000);

    return () => clearTimeout(timer);
  }, []);

  // Handle call actions
  const handleAnswerCall = () => {
    setShowIncomingCall(false);
    setCallState("active");
  };

  const handleDeclineCall = () => {
    setShowIncomingCall(false);
    setCallState("none");
  };

  const handleEndLesson = () => {
    setCallState("completed");
  };

  const handleReturnToDashboard = () => {
    setCallState("none");
  };

  const handleScheduleNextLesson = () => {
    // In a real app, this would open a scheduling interface
    // For now, just return to dashboard
    setCallState("none");
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Dashboard View */}
      {callState === "none" && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
        >
          <HomeDashboard
            hasScheduledCall={true}
            nextCallTime={
              scheduledCallTime
                ? `Today at ${scheduledCallTime.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}`
                : "Today at 4:00 PM"
            }
          />
        </motion.div>
      )}

      {/* Incoming Call Modal */}
      <AnimatePresence>
        {showIncomingCall && (
          <IncomingCallScreen
            teacherName="Ms. Kong"
            teacherAvatar="https://api.dicebear.com/7.x/avataaars/svg?seed=mathkong"
            subject="Algebra"
            onAnswer={handleAnswerCall}
            onDecline={handleDeclineCall}
            isOpen={showIncomingCall}
          />
        )}
      </AnimatePresence>

      {/* Active Lesson View */}
      {callState === "active" && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-40 bg-background"
        >
          <LessonContainer
            teacherName="Ms. Kong"
            lessonTitle="Introduction to Quadratic Equations"
            lessonDescription="Learn how to solve quadratic equations using different methods"
            onEndLesson={handleEndLesson}
          />
        </motion.div>
      )}

      {/* Lesson Summary View */}
      {callState === "completed" && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-40 bg-background"
        >
          <LessonSummary
            lessonTitle="Algebra: Quadratic Equations"
            completionPercentage={92}
            score={85}
            nextLessonDate="Tomorrow, 4:00 PM"
            onScheduleNext={handleScheduleNextLesson}
            onReturnHome={handleReturnToDashboard}
          />
        </motion.div>
      )}
    </div>
  );
};

export default Home;
