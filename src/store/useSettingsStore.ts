import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { AppSettings } from '../types';

interface SettingsState {
  settings: AppSettings;
  updateSettings: (updates: Partial<AppSettings>) => void;
  addRecentTag: (tag: string) => void;
  resetSettings: () => void;
}

const defaultSettings: AppSettings = {
  theme: 'dark', // Defaults to dark mode as requested in grill-me
  showAds: true,
  adSenseClientId: '',
  weeklyCopyFormat: 'markdown',
  recentTags: ['개발', '기획', '미팅', '기타', '버그수정', '문서화'],
};

export const useSettingsStore = create<SettingsState>()(
  persist(
    (set) => ({
      settings: defaultSettings,

      updateSettings: (updates) => {
        set((state) => ({
          settings: { ...state.settings, ...updates },
        }));
      },

      addRecentTag: (tag) => {
        const trimmed = tag.trim();
        if (!trimmed) return;
        set((state) => {
          const filtered = state.settings.recentTags.filter((t) => t !== trimmed);
          return {
            settings: {
              ...state.settings,
              recentTags: [trimmed, ...filtered].slice(0, 15), // Keep top 15 recent tags
            },
          };
        });
      },

      resetSettings: () => {
        set({ settings: defaultSettings });
      },
    }),
    {
      name: 'syncdaily-settings-v1',
    }
  )
);
