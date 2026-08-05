import React, { useEffect } from 'react';
import { Sun, Moon, Laptop } from 'lucide-react';
import { useSettingsStore } from '../../store/useSettingsStore';

export const ThemeToggle: React.FC = () => {
  const { settings, updateSettings } = useSettingsStore();

  useEffect(() => {
    const root = document.documentElement;

    const applyTheme = () => {
      const systemTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
      const effectiveTheme = settings.theme === 'system' ? systemTheme : settings.theme;

      if (effectiveTheme === 'dark') {
        root.classList.add('dark');
      } else {
        root.classList.remove('dark');
      }
    };

    applyTheme();

    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const handleChange = () => {
      if (settings.theme === 'system') {
        applyTheme();
      }
    };

    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, [settings.theme]);

  const toggleTheme = () => {
    if (settings.theme === 'dark') {
      updateSettings({ theme: 'light' });
    } else if (settings.theme === 'light') {
      updateSettings({ theme: 'system' });
    } else {
      updateSettings({ theme: 'dark' });
    }
  };

  return (
    <button
      onClick={toggleTheme}
      className="flex items-center gap-2 px-3 py-1.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white/80 dark:bg-slate-900/80 text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-all text-xs font-medium shadow-xs"
      title={`현재 테마: ${settings.theme} (클릭하여 전환)`}
    >
      {settings.theme === 'dark' && (
        <>
          <Moon className="w-4 h-4 text-blue-400" />
          <span>다크</span>
        </>
      )}
      {settings.theme === 'light' && (
        <>
          <Sun className="w-4 h-4 text-amber-500" />
          <span>라이트</span>
        </>
      )}
      {settings.theme === 'system' && (
        <>
          <Laptop className="w-4 h-4 text-emerald-500" />
          <span>시스템</span>
        </>
      )}
    </button>
  );
};
