import React from "react";
import { useNavigate } from "react-router-dom";
import DashboardHeader from "@/components/dashboard/DashboardHeader";
import AchievementsList from "@/components/achievements/AchievementsList";

const Achievements = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <DashboardHeader studentName="Alex Johnson" notificationCount={3} />

      {/* Main Content */}
      <main className="container mx-auto px-4 py-6">
        <AchievementsList studentName="Alex" />
      </main>
    </div>
  );
};

export default Achievements;
