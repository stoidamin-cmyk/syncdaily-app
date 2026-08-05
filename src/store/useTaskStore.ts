import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { TaskItem } from '../types';

interface TaskState {
  tasks: TaskItem[];
  addTask: (task: Omit<TaskItem, 'id' | 'createdAt' | 'updatedAt'>) => void;
  updateTask: (id: string, updates: Partial<Omit<TaskItem, 'id' | 'createdAt'>>) => void;
  deleteTask: (id: string) => void;
  toggleTaskCompleted: (id: string) => void;
  importTasks: (newTasks: TaskItem[], overwrite?: boolean) => void;
  clearAllTasks: () => void;
}

const getInitialMockTasks = (): TaskItem[] => {
  const today = new Date().toISOString().slice(0, 10);
  
  // Calculate yesterday and two days ago for realistic initial dashboard data
  const d1 = new Date();
  d1.setDate(d1.getDate() - 1);
  const yesterday = d1.toISOString().slice(0, 10);

  const d2 = new Date();
  d2.setDate(d2.getDate() - 2);
  const twoDaysAgo = d2.toISOString().slice(0, 10);

  return [
    {
      id: 'mock-1',
      date: today,
      title: 'SyncDaily 앱 아키텍처 설계 및 초기 세팅',
      description: 'Zustand 로컬 스토리지 연동 및 Tailwind CSS v4 테마 구성 완료',
      category: '개발',
      timeSpentMinutes: 90,
      completed: true,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
    {
      id: 'mock-2',
      date: today,
      title: '주간 보고서 오토 생성 모듈 단위 테스트',
      description: '마크다운 및 이메일 서식 자동 변환 기능 점검',
      category: '개발',
      timeSpentMinutes: 60,
      completed: false,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
    {
      id: 'mock-3',
      date: yesterday,
      title: '팀 주간 대시보드 기획 회의',
      description: 'UX 모달 및 애드센스 슬롯 가이드라인 수립',
      category: '미팅',
      timeSpentMinutes: 45,
      completed: true,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
    {
      id: 'mock-4',
      date: twoDaysAgo,
      title: '2026년 하반기 생산성 도구 릴리스 로드맵 작성',
      description: '사용자 데이터 보안(오프라인 우선) 방침 수립',
      category: '기획',
      timeSpentMinutes: 120,
      completed: true,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
  ];
};

export const useTaskStore = create<TaskState>()(
  persist(
    (set) => ({
      tasks: getInitialMockTasks(),

      addTask: (taskData) => {
        const now = new Date().toISOString();
        const newTask: TaskItem = {
          ...taskData,
          id: `task-${Date.now()}-${Math.random().toString(36).substr(2, 4)}`,
          createdAt: now,
          updatedAt: now,
        };
        set((state) => ({
          tasks: [newTask, ...state.tasks],
        }));
      },

      updateTask: (id, updates) => {
        const now = new Date().toISOString();
        set((state) => ({
          tasks: state.tasks.map((task) =>
            task.id === id ? { ...task, ...updates, updatedAt: now } : task
          ),
        }));
      },

      deleteTask: (id) => {
        set((state) => ({
          tasks: state.tasks.filter((task) => task.id !== id),
        }));
      },

      toggleTaskCompleted: (id) => {
        const now = new Date().toISOString();
        set((state) => ({
          tasks: state.tasks.map((task) =>
            task.id === id
              ? { ...task, completed: !task.completed, updatedAt: now }
              : task
          ),
        }));
      },

      importTasks: (newTasks, overwrite = false) => {
        set((state) => ({
          tasks: overwrite ? newTasks : [...newTasks, ...state.tasks],
        }));
      },

      clearAllTasks: () => {
        set({ tasks: [] });
      },
    }),
    {
      name: 'syncdaily-tasks-v1',
    }
  )
);
