import React from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import { Calendar, Clock, BookOpen, ArrowRight } from "lucide-react";
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

  // Get day of week (e.g., "Today", "Wednesday")
  const getDayLabel = (dateString: string) => {
    const today = new Date();
    const lessonDate = new Date(dateString);

    if (today.toDateString() === lessonDate.toDateString()) {
      return "Today";
    }

    return new Intl.DateTimeFormat("en-US", { weekday: "long" }).format(
      lessonDate,
    );
  };

  // Calculate minutes until lesson
  const getMinutesUntil = (dateString: string, timeString: string) => {
    const today = new Date();
    const lessonDate = new Date(dateString);
    const [timePart, ampm] = timeString.split(" ");
    const [hourStr, minuteStr] = timePart.split(":");

    let hour = parseInt(hourStr);
    const minute = parseInt(minuteStr);

    if (ampm === "PM" && hour < 12) {
      hour += 12;
    } else if (ampm === "AM" && hour === 12) {
      hour = 0;
    }

    lessonDate.setHours(hour, minute, 0, 0);

    const diffMs = lessonDate.getTime() - today.getTime();
    const diffMinutes = Math.round(diffMs / 60000);

    return diffMinutes > 0 ? diffMinutes : 0;
  };

  const handleViewAllLessons = () => {
    navigate("/lesson");
  };

  const isToday = (dateString: string) => {
    const today = new Date();
    const lessonDate = new Date(dateString);
    return today.toDateString() === lessonDate.toDateString();
  };

  return (
    <Card className="w-full h-full bg-white shadow-md overflow-hidden">
      <CardHeader className="pb-2 border-b bg-gradient-to-r from-blue-50 to-blue-100">
        <CardTitle className="text-2xl font-bold flex items-center text-blue-800">
          <Calendar className="mr-2 h-6 w-6 text-blue-600" />
          Upcoming Lessons
        </CardTitle>
      </CardHeader>
      <CardContent className="p-0">
        <div className="divide-y">
          {lessons.length === 0 ? (
            <div className="text-center py-8 text-gray-500">
              <p>No upcoming lessons scheduled</p>
              <Button variant="outline" className="mt-4">
                Schedule a Lesson
              </Button>
            </div>
          ) : (
            lessons.map((lesson, index) => {
              const minutesUntil = getMinutesUntil(lesson.date, lesson.time);
              const isUpcoming = isToday(lesson.date);

              return (
                <div
                  key={lesson.id}
                  className={cn(
                    "p-6 hover:bg-blue-50 transition-colors cursor-pointer relative",
                    isUpcoming ? "bg-blue-50" : "bg-white",
                  )}
                  onClick={() => onSelectLesson(lesson)}
                >
                  <div className="flex items-start gap-4">
                    <div
                      className={cn(
                        "rounded-full p-3 flex-shrink-0",
                        isUpcoming ? "bg-blue-100" : "bg-gray-100",
                      )}
                    >
                      <Calendar
                        className={cn(
                          "h-6 w-6",
                          isUpcoming ? "text-blue-600" : "text-gray-500",
                        )}
                      />
                    </div>

                    <div className="flex-grow">
                      <div className="flex justify-between items-start">
                        <div>
                          <div className="flex items-center gap-2">
                            <h3 className="font-bold text-lg text-gray-900">
                              {lesson.title}
                            </h3>
                            {isUpcoming && minutesUntil < 30 && (
                              <Badge className="bg-blue-500 text-white">
                                {minutesUntil <= 15
                                  ? `In ${minutesUntil} minutes`
                                  : "Soon"}
                              </Badge>
                            )}
                          </div>
                          <p className="text-sm text-gray-600 mt-1">
                            <span className="font-medium">
                              {getDayLabel(lesson.date)}, {lesson.time}
                            </span>{" "}
                            · Duration: {lesson.duration}
                          </p>
                        </div>

                        {isUpcoming && index === 0 && (
                          <Button
                            className="bg-blue-600 hover:bg-blue-700 text-white"
                            onClick={(e) => {
                              e.stopPropagation();
                              onSelectLesson(lesson);
                            }}
                          >
                            Join Now
                          </Button>
                        )}
                      </div>

                      <div className="mt-2 flex items-center text-sm text-gray-600">
                        <BookOpen className="mr-2 h-4 w-4" />
                        <span className="font-medium">Topic:</span>{" "}
                        {lesson.topic}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })
          )}

          {lessons.length > 0 && (
            <div className="p-4 bg-gray-50">
              <Button
                variant="outline"
                className="w-full border-blue-200 text-blue-700 hover:bg-blue-50 hover:text-blue-800 flex items-center justify-center"
                onClick={handleViewAllLessons}
              >
                View All Lessons
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default UpcomingLessons;
