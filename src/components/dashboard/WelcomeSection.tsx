import React from "react";
import { useNavigate } from "react-router-dom";
import { Bell } from "lucide-react";
import { Button } from "../ui/button";
import { Card, CardContent } from "../ui/card";

interface WelcomeSectionProps {
  studentName: string;
  streakDays: number;
  hasScheduledCall: boolean;
  nextCallTime?: string;
}

const WelcomeSection: React.FC<WelcomeSectionProps> = ({
  studentName,
  streakDays,
  hasScheduledCall,
  nextCallTime,
}) => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 bg-white p-6 rounded-xl shadow-sm">
      <div>
        <h1 className="text-2xl md:text-3xl font-bold text-gray-900">
          Welcome back, {studentName}!
        </h1>
        <p className="text-gray-600 mt-1">
          You're on a {streakDays}-day learning streak. Keep it up!
        </p>
      </div>

      {hasScheduledCall && nextCallTime && (
        <Card className="bg-blue-50 border-blue-200 w-full md:w-auto">
          <CardContent className="p-4 flex items-center justify-between">
            <div className="flex items-center">
              <div className="bg-blue-100 p-2 rounded-full mr-3">
                <Bell className="h-5 w-5 text-blue-600" />
              </div>
              <div>
                <p className="text-sm font-medium text-blue-800">
                  Next AI Teacher Call
                </p>
                <p className="text-lg font-bold text-blue-900">
                  {nextCallTime}
                </p>
              </div>
            </div>
            <Button
              size="sm"
              className="bg-blue-600 hover:bg-blue-700"
              onClick={() => navigate("/lesson")}
            >
              View Details
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default WelcomeSection;
