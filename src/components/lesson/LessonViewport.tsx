import React, { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Progress } from "@/components/ui/progress";
import {
  ChevronLeft,
  ChevronRight,
  Mic,
  MicOff,
  Video,
  VideoOff,
} from "lucide-react";

interface LessonViewportProps {
  teacherName?: string;
  teacherAvatar?: string;
  lessonTitle?: string;
  lessonProgress?: number;
  onEndLesson?: () => void;
}

const LessonViewport = ({
  teacherName = "Ms. Kong",
  teacherAvatar = "https://api.dicebear.com/7.x/avataaars/svg?seed=mathkong&backgroundColor=b6e3f4",
  lessonTitle = "Algebra: Quadratic Equations",
  lessonProgress = 35,
  onEndLesson = () => console.log("End lesson"),
}: LessonViewportProps) => {
  const [micEnabled, setMicEnabled] = useState(true);
  const [videoEnabled, setVideoEnabled] = useState(true);

  return (
    <div className="flex flex-col h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 p-4 flex justify-between items-center">
        <div className="flex items-center gap-2">
          <Button variant="outline" size="icon">
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <h1 className="text-xl font-bold">{lessonTitle}</h1>
        </div>
        <div className="flex items-center gap-2">
          <Progress value={lessonProgress} className="w-40 h-2" />
          <span className="text-sm text-gray-500">{lessonProgress}%</span>
        </div>
        <Button variant="destructive" onClick={onEndLesson}>
          End Lesson
        </Button>
      </div>

      {/* Main Content Area */}
      <div className="flex flex-1 overflow-hidden">
        {/* Lesson Content */}
        <div className="flex-1 p-6 overflow-y-auto">
          <Card className="mb-6">
            <CardContent className="p-6">
              <h2 className="text-2xl font-bold mb-4">Quadratic Equations</h2>
              <p className="mb-4">
                A quadratic equation is a second-degree polynomial equation in a
                single variable x:
              </p>
              <div className="bg-gray-100 p-4 rounded-md text-center text-xl font-mono mb-4">
                ax² + bx + c = 0
              </div>
              <p className="mb-4">
                where a ≠ 0 and a, b, and c are constants. The solutions to this
                equation are called the roots of the equation.
              </p>
              <h3 className="text-xl font-semibold mt-6 mb-3">
                Solving by Factoring
              </h3>
              <p>
                If we can factor the quadratic expression, we can find the
                solutions by setting each factor equal to zero.
              </p>
            </CardContent>
          </Card>

          <Card className="mb-6">
            <CardContent className="p-6">
              <h3 className="text-xl font-semibold mb-4">Example Problem</h3>
              <p className="mb-4">
                Solve the quadratic equation: x² - 5x + 6 = 0
              </p>
              <div className="bg-gray-100 p-4 rounded-md mb-4">
                <p className="mb-2">
                  Step 1: Factor the expression x² - 5x + 6
                </p>
                <p className="mb-2">x² - 5x + 6 = (x - 2)(x - 3)</p>
                <p className="mb-2">Step 2: Set each factor equal to zero</p>
                <p className="mb-2">x - 2 = 0 or x - 3 = 0</p>
                <p className="mb-2">Step 3: Solve for x</p>
                <p>x = 2 or x = 3</p>
              </div>
              <p>
                Therefore, the solutions to x² - 5x + 6 = 0 are x = 2 and x = 3.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <h3 className="text-xl font-semibold mb-4">Your Turn</h3>
              <p className="mb-4">
                Solve the quadratic equation: x² - 7x + 12 = 0
              </p>
              <div className="border border-dashed border-gray-300 rounded-md p-6 min-h-32 mb-4">
                <p className="text-gray-400 italic">
                  Write your solution here...
                </p>
              </div>
              <div className="flex justify-end">
                <Button>Submit Answer</Button>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Teacher Video - Tall FaceTime Style */}
        <div className="fixed right-4 top-24 bottom-24 w-[300px] bg-gray-900 rounded-xl shadow-lg overflow-hidden z-10 flex flex-col">
          <div className="bg-gray-900 text-white p-3 flex justify-between items-center">
            <span className="text-sm font-medium">{teacherName}</span>
            <span className="text-xs bg-green-500 px-2 py-0.5 rounded-full">
              Active
            </span>
          </div>

          <div className="flex-grow bg-gray-800 flex items-center justify-center relative">
            {videoEnabled ? (
              <div className="w-full h-full overflow-hidden">
                <img
                  src={teacherAvatar}
                  alt={teacherName}
                  className="w-full h-full object-cover"
                />
              </div>
            ) : (
              <div className="text-white text-center">
                <Avatar className="h-32 w-32 mx-auto mb-2 border-4 border-pink-500">
                  <AvatarFallback className="bg-purple-700 text-3xl">
                    {teacherName
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </AvatarFallback>
                </Avatar>
                <p className="text-lg">{teacherName}</p>
                <p className="text-gray-400">Camera Off</p>
              </div>
            )}
          </div>

          <div className="bg-gray-900 p-4 flex justify-center space-x-4">
            <Button
              variant="outline"
              size="icon"
              className={`rounded-full h-12 w-12 ${micEnabled ? "bg-blue-600 text-white hover:bg-blue-700" : "bg-gray-700 text-gray-300 hover:bg-gray-600"}`}
              onClick={() => setMicEnabled(!micEnabled)}
            >
              {micEnabled ? (
                <Mic className="h-5 w-5" />
              ) : (
                <MicOff className="h-5 w-5" />
              )}
            </Button>
            <Button
              variant="outline"
              size="icon"
              className={`rounded-full h-12 w-12 ${videoEnabled ? "bg-blue-600 text-white hover:bg-blue-700" : "bg-gray-700 text-gray-300 hover:bg-gray-600"}`}
              onClick={() => setVideoEnabled(!videoEnabled)}
            >
              {videoEnabled ? (
                <Video className="h-5 w-5" />
              ) : (
                <VideoOff className="h-5 w-5" />
              )}
            </Button>
          </div>

          <div className="absolute bottom-20 left-1/2 transform -translate-x-1/2 bg-black/30 backdrop-blur-sm px-4 py-1 rounded-full flex items-center space-x-2">
            <div className="w-2 h-2 rounded-full bg-blue-500"></div>
            <span className="text-xs text-white font-medium">AI Teacher</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LessonViewport;
