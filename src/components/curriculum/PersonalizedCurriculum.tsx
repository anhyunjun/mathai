import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
  CardFooter,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import {
  BookOpen,
  CheckCircle,
  Clock,
  Star,
  Target,
  BookMarked,
  Lightbulb,
  ArrowRight,
  Calendar,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface LearningGoal {
  id: string;
  title: string;
  description: string;
  progress: number;
  estimatedTimeToComplete: string;
}

interface LearningPath {
  id: string;
  title: string;
  description: string;
  modules: LearningModule[];
  progress: number;
  estimatedTimeToComplete: string;
}

interface LearningModule {
  id: string;
  title: string;
  description: string;
  lessons: Lesson[];
  progress: number;
  estimatedTimeToComplete: string;
  difficulty: "beginner" | "intermediate" | "advanced";
  isUnlocked: boolean;
}

interface Lesson {
  id: string;
  title: string;
  description: string;
  duration: string;
  isCompleted: boolean;
  type: "video" | "interactive" | "practice" | "quiz";
}

interface PersonalizedCurriculumProps {
  studentName?: string;
  learningGoals?: LearningGoal[];
  learningPaths?: LearningPath[];
}

const PersonalizedCurriculum = ({
  studentName = "Alex",
  learningGoals = [
    {
      id: "1",
      title: "Master Algebra Fundamentals",
      description:
        "Build a strong foundation in algebraic concepts and problem-solving",
      progress: 65,
      estimatedTimeToComplete: "4 weeks",
    },
    {
      id: "2",
      title: "Prepare for SAT Math Section",
      description:
        "Get ready for the math portion of the SAT with targeted practice",
      progress: 40,
      estimatedTimeToComplete: "8 weeks",
    },
    {
      id: "3",
      title: "Improve Geometry Skills",
      description:
        "Strengthen understanding of geometric principles and proofs",
      progress: 25,
      estimatedTimeToComplete: "6 weeks",
    },
  ],
  learningPaths = [
    {
      id: "algebra",
      title: "Algebra Mastery",
      description:
        "A comprehensive path to master algebraic concepts from basics to advanced topics",
      progress: 65,
      estimatedTimeToComplete: "12 weeks",
      modules: [
        {
          id: "algebra-1",
          title: "Algebra Basics",
          description: "Learn the fundamental concepts of algebra",
          progress: 100,
          estimatedTimeToComplete: "2 weeks",
          difficulty: "beginner",
          isUnlocked: true,
          lessons: [
            {
              id: "lesson-1-1",
              title: "Introduction to Variables",
              description: "Understanding variables and their role in algebra",
              duration: "20 min",
              isCompleted: true,
              type: "video",
            },
            {
              id: "lesson-1-2",
              title: "Basic Equations",
              description: "Solving simple linear equations",
              duration: "25 min",
              isCompleted: true,
              type: "interactive",
            },
            {
              id: "lesson-1-3",
              title: "Practice: Linear Equations",
              description: "Practice solving various linear equations",
              duration: "30 min",
              isCompleted: true,
              type: "practice",
            },
          ],
        },
        {
          id: "algebra-2",
          title: "Linear Equations & Inequalities",
          description: "Master linear equations and inequalities",
          progress: 75,
          estimatedTimeToComplete: "3 weeks",
          difficulty: "intermediate",
          isUnlocked: true,
          lessons: [
            {
              id: "lesson-2-1",
              title: "Systems of Equations",
              description: "Solving systems of linear equations",
              duration: "30 min",
              isCompleted: true,
              type: "video",
            },
            {
              id: "lesson-2-2",
              title: "Linear Inequalities",
              description: "Understanding and solving linear inequalities",
              duration: "25 min",
              isCompleted: true,
              type: "interactive",
            },
            {
              id: "lesson-2-3",
              title: "Graphing Linear Equations",
              description:
                "Learn to graph linear equations on a coordinate plane",
              duration: "35 min",
              isCompleted: false,
              type: "interactive",
            },
            {
              id: "lesson-2-4",
              title: "Quiz: Linear Equations & Inequalities",
              description:
                "Test your knowledge of linear equations and inequalities",
              duration: "20 min",
              isCompleted: false,
              type: "quiz",
            },
          ],
        },
        {
          id: "algebra-3",
          title: "Quadratic Equations",
          description: "Learn to solve and graph quadratic equations",
          progress: 20,
          estimatedTimeToComplete: "3 weeks",
          difficulty: "intermediate",
          isUnlocked: true,
          lessons: [
            {
              id: "lesson-3-1",
              title: "Introduction to Quadratics",
              description:
                "Understanding the quadratic formula and its components",
              duration: "25 min",
              isCompleted: true,
              type: "video",
            },
            {
              id: "lesson-3-2",
              title: "Factoring Quadratics",
              description:
                "Learn different methods for factoring quadratic expressions",
              duration: "30 min",
              isCompleted: false,
              type: "interactive",
            },
            {
              id: "lesson-3-3",
              title: "The Quadratic Formula",
              description: "Using the quadratic formula to solve equations",
              duration: "25 min",
              isCompleted: false,
              type: "video",
            },
            {
              id: "lesson-3-4",
              title: "Practice: Quadratic Equations",
              description: "Practice solving various quadratic equations",
              duration: "35 min",
              isCompleted: false,
              type: "practice",
            },
          ],
        },
        {
          id: "algebra-4",
          title: "Polynomials & Rational Expressions",
          description: "Working with polynomials and rational expressions",
          progress: 0,
          estimatedTimeToComplete: "4 weeks",
          difficulty: "advanced",
          isUnlocked: false,
          lessons: [
            {
              id: "lesson-4-1",
              title: "Introduction to Polynomials",
              description:
                "Understanding polynomial expressions and operations",
              duration: "30 min",
              isCompleted: false,
              type: "video",
            },
            {
              id: "lesson-4-2",
              title: "Polynomial Operations",
              description:
                "Adding, subtracting, multiplying, and dividing polynomials",
              duration: "35 min",
              isCompleted: false,
              type: "interactive",
            },
            {
              id: "lesson-4-3",
              title: "Rational Expressions",
              description: "Working with fractions containing variables",
              duration: "40 min",
              isCompleted: false,
              type: "video",
            },
          ],
        },
      ],
    },
    {
      id: "geometry",
      title: "Geometry Fundamentals",
      description:
        "Explore geometric concepts, shapes, and spatial relationships",
      progress: 25,
      estimatedTimeToComplete: "10 weeks",
      modules: [
        {
          id: "geometry-1",
          title: "Basic Geometric Concepts",
          description: "Learn about points, lines, planes, and angles",
          progress: 100,
          estimatedTimeToComplete: "2 weeks",
          difficulty: "beginner",
          isUnlocked: true,
          lessons: [
            {
              id: "geo-lesson-1-1",
              title: "Points, Lines, and Planes",
              description:
                "Understanding the basic building blocks of geometry",
              duration: "20 min",
              isCompleted: true,
              type: "video",
            },
            {
              id: "geo-lesson-1-2",
              title: "Angles and Their Measurement",
              description:
                "Learn about different types of angles and how to measure them",
              duration: "25 min",
              isCompleted: true,
              type: "interactive",
            },
          ],
        },
        {
          id: "geometry-2",
          title: "Triangles and Polygons",
          description: "Explore properties of triangles and other polygons",
          progress: 50,
          estimatedTimeToComplete: "3 weeks",
          difficulty: "intermediate",
          isUnlocked: true,
          lessons: [
            {
              id: "geo-lesson-2-1",
              title: "Triangle Properties",
              description:
                "Understanding the properties of different types of triangles",
              duration: "30 min",
              isCompleted: true,
              type: "video",
            },
            {
              id: "geo-lesson-2-2",
              title: "Congruent Triangles",
              description:
                "Learn about triangle congruence and how to prove it",
              duration: "35 min",
              isCompleted: false,
              type: "interactive",
            },
          ],
        },
      ],
    },
  ],
}: PersonalizedCurriculumProps) => {
  const [selectedPath, setSelectedPath] = useState(learningPaths[0].id);
  const currentPath = learningPaths.find((path) => path.id === selectedPath);

  const getLessonTypeIcon = (type: Lesson["type"]) => {
    switch (type) {
      case "video":
        return <BookOpen className="h-4 w-4" />;
      case "interactive":
        return <Lightbulb className="h-4 w-4" />;
      case "practice":
        return <BookMarked className="h-4 w-4" />;
      case "quiz":
        return <Star className="h-4 w-4" />;
      default:
        return <BookOpen className="h-4 w-4" />;
    }
  };

  const getDifficultyColor = (difficulty: LearningModule["difficulty"]) => {
    switch (difficulty) {
      case "beginner":
        return "bg-green-100 text-green-800";
      case "intermediate":
        return "bg-blue-100 text-blue-800";
      case "advanced":
        return "bg-purple-100 text-purple-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="container mx-auto p-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">
          Your Personalized Curriculum
        </h1>
        <p className="text-gray-600">
          Customized learning paths based on your goals and skill level
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {learningGoals.map((goal) => (
          <Card key={goal.id} className="flex flex-col h-full">
            <CardHeader className="pb-2">
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-2">
                  <Target className="h-5 w-5 text-blue-500" />
                  <CardTitle className="text-lg">{goal.title}</CardTitle>
                </div>
              </div>
              <CardDescription>{goal.description}</CardDescription>
            </CardHeader>
            <CardContent className="flex-grow">
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Progress</span>
                  <span>{goal.progress}%</span>
                </div>
                <Progress value={goal.progress} className="h-2" />
                <div className="flex items-center text-sm text-gray-500 mt-2">
                  <Clock className="h-4 w-4 mr-1" />
                  <span>
                    Est. time to complete: {goal.estimatedTimeToComplete}
                  </span>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button variant="outline" className="w-full">
                View Details
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>

      <div className="mb-6">
        <h2 className="text-2xl font-bold mb-4">Learning Paths</h2>
        <div className="flex space-x-4 overflow-x-auto pb-2">
          {learningPaths.map((path) => (
            <Button
              key={path.id}
              variant={selectedPath === path.id ? "default" : "outline"}
              className="flex items-center gap-2"
              onClick={() => setSelectedPath(path.id)}
            >
              {path.title}
              <Badge variant="outline">{path.progress}%</Badge>
            </Button>
          ))}
        </div>
      </div>

      {currentPath && (
        <Card className="mb-8">
          <CardHeader>
            <div className="flex justify-between items-start">
              <div>
                <CardTitle className="text-xl">{currentPath.title}</CardTitle>
                <CardDescription>{currentPath.description}</CardDescription>
              </div>
              <div className="text-right">
                <div className="text-sm text-gray-500 mb-1">
                  Overall Progress: {currentPath.progress}%
                </div>
                <Progress value={currentPath.progress} className="h-2 w-40" />
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              {currentPath.modules.map((module) => (
                <div key={module.id} className="border rounded-lg p-4">
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <h3 className="font-semibold text-lg">{module.title}</h3>
                      <p className="text-gray-600 text-sm">
                        {module.description}
                      </p>
                    </div>
                    <Badge className={getDifficultyColor(module.difficulty)}>
                      {module.difficulty.charAt(0).toUpperCase() +
                        module.difficulty.slice(1)}
                    </Badge>
                  </div>

                  <div className="flex justify-between items-center mb-4">
                    <div className="flex items-center text-sm text-gray-500">
                      <Clock className="h-4 w-4 mr-1" />
                      <span>{module.estimatedTimeToComplete}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-sm">{module.progress}%</span>
                      <Progress value={module.progress} className="h-2 w-24" />
                    </div>
                  </div>

                  {!module.isUnlocked ? (
                    <div className="bg-gray-50 p-4 rounded-md text-center">
                      <p className="text-gray-500">
                        Complete previous modules to unlock this content
                      </p>
                      <Button variant="outline" className="mt-2" disabled>
                        Locked
                      </Button>
                    </div>
                  ) : (
                    <div className="space-y-2">
                      {module.lessons.map((lesson) => (
                        <div
                          key={lesson.id}
                          className={cn(
                            "flex items-center justify-between p-3 rounded-md",
                            lesson.isCompleted
                              ? "bg-green-50"
                              : "bg-white border hover:bg-gray-50",
                          )}
                        >
                          <div className="flex items-center">
                            <div
                              className={cn(
                                "p-1.5 rounded-full mr-3",
                                lesson.isCompleted
                                  ? "bg-green-100"
                                  : "bg-gray-100",
                              )}
                            >
                              {lesson.isCompleted ? (
                                <CheckCircle className="h-4 w-4 text-green-600" />
                              ) : (
                                getLessonTypeIcon(lesson.type)
                              )}
                            </div>
                            <div>
                              <h4 className="font-medium">{lesson.title}</h4>
                              <p className="text-sm text-gray-500">
                                {lesson.description}
                              </p>
                            </div>
                          </div>
                          <div className="flex items-center gap-4">
                            <span className="text-sm text-gray-500">
                              {lesson.duration}
                            </span>
                            <Button
                              variant="ghost"
                              size="sm"
                              className="text-blue-600 hover:text-blue-800"
                            >
                              {lesson.isCompleted ? "Review" : "Start"}
                              <ArrowRight className="h-4 w-4 ml-1" />
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      <div className="mb-8">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calendar className="h-5 w-5 text-blue-500" />
              Recommended Schedule
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="border rounded-lg p-4">
                  <h3 className="font-semibold mb-2">Today</h3>
                  <ul className="space-y-3">
                    <li className="flex items-start">
                      <div className="bg-blue-100 p-1 rounded-full mr-2 mt-0.5">
                        <BookOpen className="h-4 w-4 text-blue-600" />
                      </div>
                      <div>
                        <p className="font-medium">Linear Inequalities</p>
                        <p className="text-sm text-gray-600">
                          Continue from where you left off
                        </p>
                        <Button variant="link" className="p-0 h-auto text-sm">
                          Resume Lesson
                        </Button>
                      </div>
                    </li>
                    <li className="flex items-start">
                      <div className="bg-green-100 p-1 rounded-full mr-2 mt-0.5">
                        <BookMarked className="h-4 w-4 text-green-600" />
                      </div>
                      <div>
                        <p className="font-medium">
                          Practice: Linear Equations
                        </p>
                        <p className="text-sm text-gray-600">
                          Reinforce your understanding
                        </p>
                        <Button variant="link" className="p-0 h-auto text-sm">
                          Start Practice
                        </Button>
                      </div>
                    </li>
                  </ul>
                </div>
                <div className="border rounded-lg p-4">
                  <h3 className="font-semibold mb-2">Tomorrow</h3>
                  <ul className="space-y-3">
                    <li className="flex items-start">
                      <div className="bg-purple-100 p-1 rounded-full mr-2 mt-0.5">
                        <Lightbulb className="h-4 w-4 text-purple-600" />
                      </div>
                      <div>
                        <p className="font-medium">Graphing Linear Equations</p>
                        <p className="text-sm text-gray-600">
                          Interactive lesson on coordinate planes
                        </p>
                        <Button variant="link" className="p-0 h-auto text-sm">
                          Preview
                        </Button>
                      </div>
                    </li>
                    <li className="flex items-start">
                      <div className="bg-yellow-100 p-1 rounded-full mr-2 mt-0.5">
                        <Star className="h-4 w-4 text-yellow-600" />
                      </div>
                      <div>
                        <p className="font-medium">
                          Quiz: Linear Equations & Inequalities
                        </p>
                        <p className="text-sm text-gray-600">
                          Test your knowledge
                        </p>
                        <Button variant="link" className="p-0 h-auto text-sm">
                          Preview
                        </Button>
                      </div>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default PersonalizedCurriculum;
