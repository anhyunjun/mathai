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

  // Simulate a scheduled call with a warm welcome instead of an abrupt call
  useEffect(() => {
    // For demo purposes, schedule a class session 10 seconds after page load
    const timer = setTimeout(() => {
      const callTime = new Date();
      setScheduledCallTime(callTime);

      // Show a gentle notification first
      const notification = document.createElement("div");
      notification.className =
        "fixed top-4 right-4 bg-blue-500 text-white p-4 rounded-lg shadow-lg z-50 animate-fade-in";
      notification.innerHTML = `
        <div class="flex items-center space-x-3">
          <div class="w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path></svg>
          </div>
          <div>
            <p class="font-medium">Your math lesson is about to begin!</p>
            <p class="text-sm text-blue-100">Ms. Kong will be with you shortly</p>
          </div>
        </div>
      `;
      document.body.appendChild(notification);

      // Remove notification and show incoming call after 3 seconds
      setTimeout(() => {
        notification.classList.add("animate-fade-out");
        setTimeout(() => {
          document.body.removeChild(notification);
          setShowIncomingCall(true);
        }, 500);
      }, 3000);
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
