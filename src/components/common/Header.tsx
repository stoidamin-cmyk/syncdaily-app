import React from 'react';
import { Calendar, FileText, Download, Settings, Zap } from 'lucide-react';
import { ThemeToggle } from './ThemeToggle';

interface HeaderProps {
  activeTab: 'daily' | 'weekly' | 'backup';
  setActiveTab: (tab: 'daily' | 'weekly' | 'backup') => void;
  onOpenSettings: () => void;
  onOpenBackupModal: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  activeTab,
  setActiveTab,
  onOpenSettings,
  onOpenBackupModal,
}) => {
  return (
    <header className="sticky top-0 z-40 w-full glass-panel border-b border-slate-200 dark:border-slate-800/80 bg-white/75 dark:bg-slate-950/75 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo & Brand */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-blue-600 via-indigo-500 to-emerald-400 p-0.5 shadow-md flex items-center justify-center">
              <div className="w-full h-full bg-slate-900 rounded-[10px] flex items-center justify-center">
                <Zap className="w-5 h-5 text-emerald-400" />
              </div>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-extrabold text-xl tracking-tight bg-gradient-to-r from-blue-600 via-indigo-500 to-emerald-500 dark:from-blue-400 dark:via-indigo-400 dark:to-emerald-400 bg-clip-text text-transparent">
                  SyncDaily
                </span>
                <span className="px-2 py-0.5 text-[10px] font-semibold tracking-wide uppercase bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 rounded-full border border-emerald-500/20">
                  Local Security
                </span>
              </div>
              <p className="text-xs text-slate-500 dark:text-slate-400 hidden sm:block">
                스마트 일일 작성 & 주간 업무 보고서 오토 생성기
              </p>
            </div>
          </div>

          {/* Navigation Tabs */}
          <nav className="flex items-center gap-1 p-1 bg-slate-100 dark:bg-slate-900/90 rounded-xl border border-slate-200 dark:border-slate-800">
            <button
              onClick={() => setActiveTab('daily')}
              className={`flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                activeTab === 'daily'
                  ? 'bg-white dark:bg-slate-800 text-blue-600 dark:text-blue-400 shadow-xs'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-100'
              }`}
            >
              <Calendar className="w-4 h-4" />
              <span>일일 업무</span>
            </button>

            <button
              onClick={() => setActiveTab('weekly')}
              className={`flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                activeTab === 'weekly'
                  ? 'bg-white dark:bg-slate-800 text-emerald-600 dark:text-emerald-400 shadow-xs'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-100'
              }`}
            >
              <FileText className="w-4 h-4" />
              <span>주간 보고서</span>
            </button>
          </nav>

          {/* Right Action Icons */}
          <div className="flex items-center gap-2">
            <button
              onClick={onOpenBackupModal}
              className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 border border-slate-200 dark:border-slate-800 rounded-xl transition-all"
              title="백업 및 복원"
            >
              <Download className="w-4 h-4 text-slate-500" />
              <span>백업/복원</span>
            </button>

            <ThemeToggle />

            <button
              onClick={onOpenSettings}
              className="p-2 text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-800 transition-colors"
              title="앱 설정"
            >
              <Settings className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};
