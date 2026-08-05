import React from 'react';
import { useSettingsStore } from '../../store/useSettingsStore';
import { Sparkles } from 'lucide-react';

interface AdBannerProps {
  slotPosition?: 'top' | 'bottom' | 'sidebar';
  className?: string;
}

export const AdBanner: React.FC<AdBannerProps> = ({
  slotPosition = 'top',
  className = '',
}) => {
  const { settings } = useSettingsStore();

  if (!settings.showAds) {
    return null; // Ad slots hidden by user preference
  }

  // Dimensions based on slot position
  const heightClasses = {
    top: 'h-24 sm:h-28 w-full',
    bottom: 'h-24 sm:h-28 w-full',
    sidebar: 'h-64 sm:h-80 w-full',
  }[slotPosition];

  return (
    <div className={`relative overflow-hidden my-4 ${className}`}>
      <div
        className={`flex flex-col items-center justify-center border border-dashed border-slate-300 dark:border-slate-800 rounded-2xl bg-slate-50/50 dark:bg-slate-900/40 p-4 transition-all ${heightClasses}`}
      >
        <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-slate-200/60 dark:bg-slate-800/80 text-[10px] font-semibold text-slate-500 dark:text-slate-400 mb-1">
          <Sparkles className="w-3 h-3 text-amber-500" />
          <span>광고 게재 영역 (Ad Banner Slot)</span>
        </div>
        
        {settings.adSenseClientId ? (
          <div className="text-xs text-slate-600 dark:text-slate-300 font-mono text-center">
            [Google AdSense / Naver AdPost Active]
            <div className="text-[10px] text-slate-400">Client ID: {settings.adSenseClientId}</div>
          </div>
        ) : (
          <div className="text-center px-4">
            <p className="text-xs font-medium text-slate-600 dark:text-slate-400">
              구글 애드센스 / 네이버 애드포스트 광고 영역
            </p>
            <p className="text-[10px] text-slate-400 dark:text-slate-500 mt-0.5">
              설정 메뉴에서 AdSense Client ID를 입력하거나 광고 슬롯을 숨길 수 있습니다.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};
