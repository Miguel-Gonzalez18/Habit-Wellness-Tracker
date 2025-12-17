import { LucideIcon } from 'lucide-react';

export interface Habit {
  id: string;
  name: string;
  icon: string;
  completed: boolean;
  streak: number;
  frequency: string;
  reminderTime: string;
}

export interface User {
  name: string;
  avatar: string; // URL or local path
  bio: string;
  joinDate: string;
  level: number;
  totalPoints: number;
}

export interface ActivityLog {
  id: string;
  action: string;
  date: string;
  habitName?: string;
}

export interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: LucideIcon;
  unlocked: boolean;
  progress: number;
  maxProgress: number;
  unlockedAt?: string;
}
