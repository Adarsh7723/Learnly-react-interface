export interface Course {
  id: string;
  title: string;
  category: string;
  progress: number;
  totalLessons: number;
  completedLessons: number;
  image: string;
  author: string;
  authorAvatar: string;
}

export interface Mentor {
  id: string;
  name: string;
  role: string;
  avatar: string;
  isOnline: boolean;
}

export interface ChartData {
  name: string;
  value: number;
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'model';
  text: string;
  timestamp: Date;
  isThinking?: boolean;
}

export interface Lesson {
  id: string;
  title: string;
  date: string;
  category: 'UI/UX Design' | 'Branding' | 'Front End' | 'Back End';
  mentorName: string;
  mentorAvatar: string;
}