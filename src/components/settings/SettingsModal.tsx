import React, { useState } from 'react';
import { Modal } from '../common/Modal';
import { useSettingsStore } from '../../store/useSettingsStore';
import { useTaskStore } from '../../store/useTaskStore';
import { Moon, Sun, Laptop, DollarSign, FileText, Trash2, Check, AlertTriangle } from 'lucide-react';
import type { CopyFormat } from '../../types';

interface SettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const SettingsModal: React.FC<SettingsModalProps> = ({ isOpen, onClose }) => {
  const { settings, updateSettings } = useSettingsStore();
  const { clearAllTasks, tasks } = useTaskStore();
  const [confirmClear, setConfirmClear] = useState(false);
  const [saveToast, setSaveToast] = useState(false);

  const handleFormatChange = (format: CopyFormat) => {
    updateSettings({ weeklyCopyFormat: format });
    triggerToast();
  };

  const handleThemeChange = (theme: 'system' | 'dark' | 'light') => {
    updateSettings({ theme });
    triggerToast();
  };

  const triggerToast = () => {
    setSaveToast(true);
    setTimeout(() => setSaveToast(false), 2000);
  };

  const handleClearData = () => {
    if (confirmClear) {
      clearAllTasks();
      setConfirmClear(false);
      onClose();
    } else {
      setConfirmClear(true);
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="앱 설정 (Settings)" maxWidth="md">
      <div className="space-y-6">
        {saveToast && (
          <div className="flex items-center gap-2 px-3 py-2 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 text-xs rounded-xl border border-emerald-500/20 font-medium">
            <Check className="w-4 h-4" />
            <span>설정이 성공적으로 저장되었습니다.</span>
          </div>
        )}

        {/* Theme Settings */}
        <div>
          <label className="block text-xs font-bold text-slate-900 dark:text-slate-200 mb-2">
            🎨 테마 설정 (Theme)
          </label>
          <div className="grid grid-cols-3 gap-2">
            <button
              onClick={() => handleThemeChange('dark')}
              className={`flex items-center justify-center gap-2 p-2.5 rounded-xl border text-xs font-semibold transition-all ${
                settings.theme === 'dark'
                  ? 'border-blue-500 bg-blue-500/10 text-blue-600 dark:text-blue-400'
                  : 'border-slate-200 dark:border-slate-800 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300'
              }`}
            >
              <Moon className="w-4 h-4 text-blue-400" />
              <span>다크 모드</span>
            </button>
            <button
              onClick={() => handleThemeChange('light')}
              className={`flex items-center justify-center gap-2 p-2.5 rounded-xl border text-xs font-semibold transition-all ${
                settings.theme === 'light'
                  ? 'border-blue-500 bg-blue-500/10 text-blue-600 dark:text-blue-400'
                  : 'border-slate-200 dark:border-slate-800 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300'
              }`}
            >
              <Sun className="w-4 h-4 text-amber-500" />
              <span>라이트 모드</span>
            </button>
            <button
              onClick={() => handleThemeChange('system')}
              className={`flex items-center justify-center gap-2 p-2.5 rounded-xl border text-xs font-semibold transition-all ${
                settings.theme === 'system'
                  ? 'border-blue-500 bg-blue-500/10 text-blue-600 dark:text-blue-400'
                  : 'border-slate-200 dark:border-slate-800 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300'
              }`}
            >
              <Laptop className="w-4 h-4 text-emerald-500" />
              <span>시스템</span>
            </button>
          </div>
        </div>

        {/* Copy Format Settings */}
        <div>
          <label className="block text-xs font-bold text-slate-900 dark:text-slate-200 mb-2">
            📄 주간 보고서 기본 복사 포맷
          </label>
          <div className="grid grid-cols-2 gap-2">
            <button
              onClick={() => handleFormatChange('markdown')}
              className={`flex items-center justify-center gap-2 p-2.5 rounded-xl border text-xs font-semibold transition-all ${
                settings.weeklyCopyFormat === 'markdown'
                  ? 'border-emerald-500 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400'
                  : 'border-slate-200 dark:border-slate-800 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300'
              }`}
            >
              <FileText className="w-4 h-4 text-emerald-500" />
              <span>Markdown 포맷</span>
            </button>
            <button
              onClick={() => handleFormatChange('text')}
              className={`flex items-center justify-center gap-2 p-2.5 rounded-xl border text-xs font-semibold transition-all ${
                settings.weeklyCopyFormat === 'text'
                  ? 'border-emerald-500 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400'
                  : 'border-slate-200 dark:border-slate-800 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300'
              }`}
            >
              <FileText className="w-4 h-4 text-blue-500" />
              <span>Plain Text 포맷</span>
            </button>
          </div>
        </div>

        {/* Monetization / Ad Settings */}
        <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-800 space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <DollarSign className="w-4 h-4 text-amber-500" />
              <span className="text-xs font-bold text-slate-900 dark:text-slate-200">
                수익화 및 광고 슬롯 노출
              </span>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={settings.showAds}
                onChange={(e) => {
                  updateSettings({ showAds: e.target.checked });
                  triggerToast();
                }}
                className="sr-only peer"
              />
              <div className="w-9 h-5 bg-slate-300 peer-focus:outline-none rounded-full peer dark:bg-slate-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-blue-600"></div>
            </label>
          </div>

          <div>
            <label className="block text-[11px] font-medium text-slate-500 dark:text-slate-400 mb-1">
              Google AdSense Client ID (선택 사항)
            </label>
            <input
              type="text"
              placeholder="ca-pub-XXXXXXXXXXXXXXXX"
              value={settings.adSenseClientId}
              onChange={(e) => {
                updateSettings({ adSenseClientId: e.target.value });
              }}
              className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>

        {/* Data Reset Section */}
        <div className="pt-4 border-t border-slate-200 dark:border-slate-800">
          <div className="flex items-center justify-between">
            <div>
              <h4 className="text-xs font-bold text-red-600 dark:text-red-400">데이터 초기화</h4>
              <p className="text-[11px] text-slate-500 dark:text-slate-400">
                현재 로컬에 저장된 총 {tasks.length}개의 업무 기록을 삭제합니다.
              </p>
            </div>
            <button
              onClick={handleClearData}
              className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-xl border transition-all ${
                confirmClear
                  ? 'bg-red-600 text-white border-red-600 hover:bg-red-700 animate-pulse'
                  : 'border-red-200 dark:border-red-900/50 text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-950/50'
              }`}
            >
              {confirmClear ? (
                <>
                  <AlertTriangle className="w-4 h-4" />
                  <span>진짜 삭제하시겠습니까?</span>
                </>
              ) : (
                <>
                  <Trash2 className="w-4 h-4" />
                  <span>전체 데이터 삭제</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </Modal>
  );
};
