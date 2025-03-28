import React from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import { Calendar, Clock, BookOpen } from "lucide-react";
import { cn } from "../../lib/utils";

interface LessonType {
  id: string;
  title: string;
  date: string;
  time: string;
  duration: string;
  topic: string;
  status: "upcoming" | "completed" | "missed";
}

interface UpcomingLessonsProps {
  lessons?: LessonType[];
  onSelectLesson?: (lesson: LessonType) => void;
}

const UpcomingLessons = ({
  lessons = [
    {
      id: "1",
      title: "Algebra Fundamentals",
      date: "2023-09-15",
      time: "3:30 PM",
      duration: "45 min",
      topic: "Equations",
      status: "upcoming",
    },
    {
      id: "2",
      title: "Geometry Basics",
      date: "2023-09-17",
      time: "4:00 PM",
      duration: "45 min",
      topic: "Triangles",
      status: "upcoming",
    },
    {
      id: "3",
      title: "Fractions & Decimals",
      date: "2023-09-20",
      time: "3:00 PM",
      duration: "45 min",
      topic: "Conversions",
      status: "upcoming",
    },
  ],
  onSelectLesson = () => {},
}: UpcomingLessonsProps) => {
  const navigate = useNavigate();

  // Format date to display in a more readable format
  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = {
      weekday: "long",
      month: "short",
      day: "numeric",
    };
    return new Date(dateString).toLocaleDateString("en-US", options);
  };

  const handleViewAllLessons = () => {
    navigate("/lesson");
  };

  return (
    <Card className="w-full h-full bg-white shadow-md">
      <CardHeader className="pb-2">
        <CardTitle className="text-xl font-bold flex items-center">
          <Calendar className="mr-2 h-5 w-5 text-blue-500" />
          Upcoming Lessons
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {lessons.length === 0 ? (
            <div className="text-center py-8 text-gray-500">
              <p>No upcoming lessons scheduled</p>
              <Button variant="outline" className="mt-4">
                Schedule a Lesson
              </Button>
            </div>
          ) : (
            lessons.map((lesson) => (
              <div
                key={lesson.id}
                className="p-4 border rounded-lg hover:bg-gray-50 transition-colors cursor-pointer"
                onClick={() => onSelectLesson(lesson)}
              >
                <div className="flex justify-between items-start mb-2">
                  <h3 className="font-semibold text-lg">{lesson.title}</h3>
                  <Badge
                    className={cn(
                      "text-xs",
                      lesson.status === "upcoming"
                        ? "bg-blue-100 text-blue-800"
                        : lesson.status === "completed"
                          ? "bg-green-100 text-green-800"
                          : "bg-red-100 text-red-800",
                    )}
                  >
                    {lesson.status.charAt(0).toUpperCase() +
                      lesson.status.slice(1)}
                  </Badge>
                </div>

                <div className="grid grid-cols-2 gap-2 text-sm text-gray-600">
                  <div className="flex items-center">
                    <Calendar className="mr-2 h-4 w-4" />
                    {formatDate(lesson.date)}
                  </div>
                  <div className="flex items-center">
                    <Clock className="mr-2 h-4 w-4" />
                    {lesson.time} ({lesson.duration})
                  </div>
                  <div className="flex items-center col-span-2">
                    <BookOpen className="mr-2 h-4 w-4" />
                    Topic: {lesson.topic}
                  </div>
                </div>
              </div>
            ))
          )}

          {lessons.length > 0 && (
            <Button
              variant="outline"
              className="w-full mt-2"
              onClick={handleViewAllLessons}
            >
              View All Lessons
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default UpcomingLessons;
