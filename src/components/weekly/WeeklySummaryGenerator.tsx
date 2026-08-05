import React, { useState, useMemo } from 'react';
import { useTaskStore } from '../../store/useTaskStore';
import { useSettingsStore } from '../../store/useSettingsStore';
import {
  getWeekRange,
  getWeekOfYearNumber,
  formatKoreanDate,
  formatMinutesToText,
} from '../../utils/dateUtils';
import {
  generateWeeklySummaryMarkdown,
  generateWeeklySummaryText,
  downloadFile,
} from '../../utils/exportImportUtils';
import { AdBanner } from '../ads/AdBanner';
import type { CopyFormat } from '../../types';
import {
  Calendar,
  ChevronLeft,
  ChevronRight,
  Copy,
  Check,
  Download,
  Sparkles,
  FileText,
  Clock,
  CheckCircle2,
  Share2,
} from 'lucide-react';

export const WeeklySummaryGenerator: React.FC = () => {
  const { tasks } = useTaskStore();
  const { settings, updateSettings } = useSettingsStore();

  const [refDate, setRefDate] = useState(() => new Date());
  const [copyFormat, setCopyFormat] = useState<CopyFormat>(settings.weeklyCopyFormat || 'markdown');
  const [copiedToast, setCopiedToast] = useState(false);

  // Calculate current week range
  const { startStr, endStr } = useMemo(() => getWeekRange(refDate), [refDate]);
  const weekNum = useMemo(() => getWeekOfYearNumber(refDate), [refDate]);

  // Navigate weeks
  const handlePrevWeek = () => {
    const prev = new Date(refDate);
    prev.setDate(prev.getDate() - 7);
    setRefDate(prev);
  };

  const handleNextWeek = () => {
    const next = new Date(refDate);
    next.setDate(next.getDate() + 7);
    setRefDate(next);
  };

  const handleThisWeek = () => {
    setRefDate(new Date());
  };

  // Filter tasks in current week range
  const weekTasks = useMemo(
    () => tasks.filter((t) => t.date >= startStr && t.date <= endStr),
    [tasks, startStr, endStr]
  );

  // Statistics
  const totalTasks = weekTasks.length;
  const completedTasks = weekTasks.filter((t) => t.completed).length;
  const totalMinutes = weekTasks.reduce((acc, t) => acc + (t.timeSpentMinutes || 0), 0);

  // Category grouping
  const categories = useMemo(
    () => Array.from(new Set(weekTasks.map((t) => t.category || '기타'))),
    [weekTasks]
  );

  // Generated Text based on selected copy format
  const summaryReportText = useMemo(() => {
    if (copyFormat === 'markdown') {
      return generateWeeklySummaryMarkdown(tasks, startStr, endStr);
    } else {
      return generateWeeklySummaryText(tasks, startStr, endStr);
    }
  }, [tasks, startStr, endStr, copyFormat]);

  // Copy to clipboard handler
  const handleCopyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(summaryReportText);
      setCopiedToast(true);
      setTimeout(() => setCopiedToast(false), 2500);
    } catch (err) {
      console.error('Failed to copy', err);
    }
  };

  // Download handler
  const handleDownload = () => {
    const filename = `Weekly_Report_${startStr}_to_${endStr}.${copyFormat === 'markdown' ? 'md' : 'txt'}`;
    const mimeType = copyFormat === 'markdown' ? 'text/markdown' : 'text/plain';
    downloadFile(filename, summaryReportText, mimeType);
  };

  const handleFormatSelect = (fmt: CopyFormat) => {
    setCopyFormat(fmt);
    updateSettings({ weeklyCopyFormat: fmt });
  };

  return (
    <div className="space-y-6">
      {/* Top Ad Banner */}
      <AdBanner slotPosition="top" />

      {/* Week Navigator Header */}
      <div className="glass-panel p-4 rounded-2xl grid grid-cols-1 md:grid-cols-3 items-center gap-4">
        {/* Left: Week Buttons */}
        <div className="flex items-center gap-2 justify-center md:justify-start w-full">
          <button
            onClick={handlePrevWeek}
            className="p-2 rounded-xl border border-slate-200 dark:border-slate-800 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-300 transition-colors"
            title="지난주"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>

          <button
            onClick={handleThisWeek}
            className="px-3 py-1.5 text-xs font-semibold rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors"
          >
            이번 주
          </button>

          <button
            onClick={handleNextWeek}
            className="p-2 rounded-xl border border-slate-200 dark:border-slate-800 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-300 transition-colors"
            title="다음주"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>

        {/* Center: Range Display (Perfectly centered) */}
        <div className="flex items-center justify-center text-center">
          <h2 className="text-base font-extrabold text-slate-900 dark:text-slate-100 flex items-center justify-center gap-2">
            <Calendar className="w-4 h-4 text-emerald-500 shrink-0" />
            <span>
              {refDate.getFullYear()}년 W{weekNum}주차 ({formatKoreanDate(startStr)} ~ {formatKoreanDate(endStr)})
            </span>
          </h2>
        </div>

        {/* Right: Copy Format Selector */}
        <div className="flex items-center gap-1.5 p-1 bg-slate-100 dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 justify-center md:justify-end w-full">
          <button
            onClick={() => handleFormatSelect('markdown')}
            className={`px-3 py-1 text-xs font-bold rounded-lg transition-all ${
              copyFormat === 'markdown'
                ? 'bg-emerald-600 text-white shadow-xs'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200'
            }`}
          >
            Markdown 포맷
          </button>
          <button
            onClick={() => handleFormatSelect('text')}
            className={`px-3 py-1 text-xs font-bold rounded-lg transition-all ${
              copyFormat === 'text'
                ? 'bg-blue-600 text-white shadow-xs'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200'
            }`}
          >
            Plain Text 포맷
          </button>
        </div>
      </div>

      {/* Weekly Stats Bar */}
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
        <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 flex items-center justify-center">
            <FileText className="w-5 h-5" />
          </div>
          <div>
            <p className="text-[10px] font-semibold text-slate-400">주간 총 업무</p>
            <p className="text-lg font-bold text-slate-900 dark:text-slate-100">{totalTasks}건</p>
          </div>
        </div>

        <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-blue-500/10 text-blue-600 dark:text-blue-400 flex items-center justify-center">
            <CheckCircle2 className="w-5 h-5" />
          </div>
          <div>
            <p className="text-[10px] font-semibold text-slate-400">완료 업무</p>
            <p className="text-lg font-bold text-slate-900 dark:text-slate-100">
              {completedTasks}건
              <span className="text-xs text-slate-400 font-normal ml-1">
                ({totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0}%)
              </span>
            </p>
          </div>
        </div>

        <div className="col-span-2 sm:col-span-1 p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 flex items-center justify-center">
            <Clock className="w-5 h-5" />
          </div>
          <div>
            <p className="text-[10px] font-semibold text-slate-400">주간 총 투입시간</p>
            <p className="text-lg font-bold text-slate-900 dark:text-slate-100">
              {formatMinutesToText(totalMinutes) || '0분'}
            </p>
          </div>
        </div>
      </div>

      {/* Main Weekly Report Preview Box */}
      <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-md overflow-hidden">
        {/* Box Top Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-950/50">
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-emerald-500" />
            <h3 className="text-sm font-bold text-slate-900 dark:text-slate-100">
              생성된 주간 업무 보고서
            </h3>
            <span className="px-2 py-0.5 text-[10px] font-semibold rounded-full bg-slate-200 dark:bg-slate-800 text-slate-600 dark:text-slate-400">
              {copyFormat.toUpperCase()} 서식
            </span>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center gap-2">
            <button
              onClick={handleDownload}
              className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 transition-colors"
              title="파일로 다운로드"
            >
              <Download className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">다운로드</span>
            </button>

            <button
              onClick={handleCopyToClipboard}
              className={`flex items-center gap-1.5 px-4 py-1.5 text-xs font-bold text-white rounded-xl shadow-md transition-all transform active:scale-95 ${
                copiedToast
                  ? 'bg-emerald-600 hover:bg-emerald-600'
                  : 'bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500'
              }`}
            >
              {copiedToast ? (
                <>
                  <Check className="w-4 h-4" />
                  <span>클립보드 복사 완료!</span>
                </>
              ) : (
                <>
                  <Copy className="w-4 h-4" />
                  <span>원클릭 클립보드 복사</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* Textarea Code Block Preview */}
        <div className="p-6">
          <textarea
            readOnly
            value={summaryReportText}
            rows={14}
            className="w-full p-4 text-xs font-mono rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 text-slate-800 dark:text-slate-200 focus:outline-none resize-none leading-relaxed selection:bg-emerald-500 selection:text-white"
          />
        </div>
      </div>

      {/* Visual Category Breakdown Cards */}
      {weekTasks.length > 0 && (
        <div className="space-y-4 pt-2">
          <h3 className="text-sm font-bold text-slate-900 dark:text-slate-100 flex items-center gap-2">
            <Share2 className="w-4 h-4 text-blue-500" />
            <span>카테고리별 업무 실적 미리보기</span>
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {categories.map((cat) => {
              const catTasks = weekTasks.filter((t) => (t.category || '기타') === cat);
              return (
                <div
                  key={cat}
                  className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs space-y-3"
                >
                  <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800/80 pb-2">
                    <span className="px-2.5 py-1 text-xs font-bold rounded-lg bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 border border-indigo-500/20">
                      🏷️ [{cat}]
                    </span>
                    <span className="text-xs text-slate-400 font-medium">
                      총 {catTasks.length}개 업무
                    </span>
                  </div>

                  <ul className="space-y-2">
                    {catTasks.map((t) => (
                      <li key={t.id} className="flex items-start justify-between gap-2 text-xs">
                        <div className="flex items-start gap-1.5 min-w-0">
                          <span
                            className={`mt-0.5 w-2 h-2 rounded-full shrink-0 ${
                              t.completed ? 'bg-emerald-500' : 'bg-amber-500'
                            }`}
                          />
                          <span className="font-medium text-slate-800 dark:text-slate-200 truncate">
                            {t.title}
                          </span>
                        </div>
                        <span className="text-[10px] text-slate-400 font-mono shrink-0">
                          {t.date}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};
