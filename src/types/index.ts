export interface User {
  id: string;
  email: string;
  name: string;
  avatar?: string;
  level: 'beginner' | 'intermediate' | 'advanced';
  totalPracticeHours: number;
  mudrasLearned: number;
  accuracyScore: number;
}

export interface Mudra {
  id: string;
  name: string;
  sanskritName: string;
  meaning: string;
  description: string;
  imageUrl: string;
  videoUrl?: string;
  difficulty: 'easy' | 'medium' | 'hard';
  category: 'asamyukta' | 'samyukta';
  usage: string[];
}

export interface PracticeSession {
  id: string;
  userId: string;
  mudraId: string;
  duration: number;
  accuracyScore: number;
  feedback: string[];
  createdAt: Date;
}

export interface CommunityPost {
  id: string;
  userId: string;
  author: string;
  title: string;
  content: string;
  videoUrl?: string;
  likes: number;
  comments: number;
  createdAt: Date;
}