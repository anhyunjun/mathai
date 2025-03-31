/**
 * Common type definitions for the application
 */

// User types
export interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
}

// Lesson types
export interface Lesson {
  id: string;
  title: string;
  description: string;
  date: string;
  time: string;
  duration: string;
  topic: string;
  status: "upcoming" | "completed" | "missed";
}

// Topic types
export interface Topic {
  id: string;
  title: string;
  description: string;
  difficulty: "beginner" | "intermediate" | "advanced";
  completionPercentage: number;
  estimatedTime: string;
  badgeText?: string;
  isRecommended?: boolean;
  isNew?: boolean;
}

// Chat message types
export interface ChatMessage {
  role: "system" | "user" | "assistant";
  content: string;
}

// Lesson chat history
export interface LessonChatMessage {
  sender: string;
  message: string;
  timestamp: string;
  isProactive?: boolean;
}

// AI Teacher observation status
export type ObservationStatus =
  | "observing"
  | "thinking"
  | "helping"
  | "praising"
  | "idle";

// Student activity status
export type StudentActivity = "solving" | "stuck" | "reviewing" | "idle";
