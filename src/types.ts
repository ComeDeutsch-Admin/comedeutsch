export interface CourseLevel {
  id: string;
  code: string;
  title: string;
  tagline: string;
  description: string;
  targetAudience: string;
  highlights: string[];
  hours: string;
  classSize: string;
  levelBadge: string;
}

export interface AdvantageTab {
  id: string;
  title: string;
  shortDesc: string;
  bulletPoints: string[];
  note?: string;
  iconName: string;
}

export interface StudentReview {
  id: string;
  author: string;
  authorSubtitle: string;
  stars: number;
  tags: string[];
  fullText: string;
  highlightQuotes: string;
  igLikes: string;
  postedDate: string;
}

export interface Teacher {
  name: string;
  title: string;
  group: string;           
  credentials: string[];
  teachingStyle: string[];
  avatarText: string;
  avatarUrl: string;
  accentColor: string;
}

export interface FaqItem {
  question: string;
  answer: string;
  category: 'course' | 'line' | 'refund' | 'device';
}
