export type TaskPriority = 'low' | 'medium' | 'high';

export interface TaskItem {
  id: string;
  date: string; // YYYY-MM-DD
  title: string;
  description?: string;
  category: string; // Free-form tag e.g. "개발", "기획", "미팅"
  timeSpentMinutes?: number;
  completed: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface WeeklyGroupedTasks {
  [date: string]: TaskItem[];
}

export type CopyFormat = 'markdown' | 'text';

export interface AppSettings {
  theme: 'system' | 'dark' | 'light';
  showAds: boolean;
  adSenseClientId: string;
  weeklyCopyFormat: CopyFormat;
  recentTags: string[];
}
