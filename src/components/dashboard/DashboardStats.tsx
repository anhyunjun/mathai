import React from "react";
import { Card, CardContent } from "../ui/card";
import { BookOpen, Clock, Sparkles } from "lucide-react";

interface DashboardStatsProps {
  completedLessons: number;
  totalLessons: number;
  minutesLearned: number;
  problemsSolved: number;
}

const DashboardStats: React.FC<DashboardStatsProps> = ({
  completedLessons,
  totalLessons,
  minutesLearned,
  problemsSolved,
}) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      <Card className="bg-white shadow-sm">
        <CardContent className="p-4 flex items-center">
          <div className="bg-purple-100 p-3 rounded-full mr-4">
            <BookOpen className="h-6 w-6 text-purple-600" />
          </div>
          <div>
            <p className="text-sm text-gray-500">Lessons Completed</p>
            <div className="flex items-baseline">
              <span className="text-2xl font-bold mr-2">
                {completedLessons}
              </span>
              <span className="text-sm text-gray-500">of {totalLessons}</span>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="bg-white shadow-sm">
        <CardContent className="p-4 flex items-center">
          <div className="bg-green-100 p-3 rounded-full mr-4">
            <Clock className="h-6 w-6 text-green-600" />
          </div>
          <div>
            <p className="text-sm text-gray-500">Minutes Learned</p>
            <div className="flex items-baseline">
              <span className="text-2xl font-bold">{minutesLearned}</span>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="bg-white shadow-sm">
        <CardContent className="p-4 flex items-center">
          <div className="bg-amber-100 p-3 rounded-full mr-4">
            <Sparkles className="h-6 w-6 text-amber-600" />
          </div>
          <div>
            <p className="text-sm text-gray-500">Problems Solved</p>
            <div className="flex items-baseline">
              <span className="text-2xl font-bold">{problemsSolved}</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default DashboardStats;
