import React, { useState } from 'react';
import { useTaskStore } from '../../store/useTaskStore';
import { TaskItemCard } from './TaskItemCard';
import { TaskFormModal } from './TaskFormModal';
import { formatKoreanDate, formatMinutesToText, formatDateKey } from '../../utils/dateUtils';
import type { TaskItem } from '../../types';
import { AdBanner } from '../ads/AdBanner';
import {
  Plus,
  Calendar,
  ChevronLeft,
  ChevronRight,
  CheckCircle2,
  Clock,
  Filter,
  Search,
  ListTodo,
} from 'lucide-react';

export const DailyTaskLogger: React.FC = () => {
  const { tasks } = useTaskStore();
  const [selectedDate, setSelectedDate] = useState(() => formatDateKey(new Date()));
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTagFilter, setSelectedTagFilter] = useState<string | null>(null);

  const [isFormOpen, setIsFormOpen] = useState(false);
  const [taskToEdit, setTaskToEdit] = useState<TaskItem | null>(null);

  // Navigate dates (using formatDateKey to prevent timezone offsets)
  const handlePrevDay = () => {
    const d = new Date(selectedDate + 'T00:00:00');
    d.setDate(d.getDate() - 1);
    setSelectedDate(formatDateKey(d));
  };

  const handleNextDay = () => {
    const d = new Date(selectedDate + 'T00:00:00');
    d.setDate(d.getDate() + 1);
    setSelectedDate(formatDateKey(d));
  };

  const handleToday = () => {
    setSelectedDate(formatDateKey(new Date()));
  };

  // Filter tasks for selected date
  const dayTasks = tasks.filter((t) => t.date === selectedDate);

  // Filter by tag or search query
  const filteredTasks = dayTasks.filter((t) => {
    const matchesSearch =
      !searchQuery.trim() ||
      t.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (t.description && t.description.toLowerCase().includes(searchQuery.toLowerCase()));
    const matchesTag = !selectedTagFilter || t.category === selectedTagFilter;
    return matchesSearch && matchesTag;
  });

  // Calculate day stats
  const completedCount = dayTasks.filter((t) => t.completed).length;
  const totalMinutes = dayTasks.reduce((acc, t) => acc + (t.timeSpentMinutes || 0), 0);

  // Get unique tags present today
  const availableTags = Array.from(new Set(dayTasks.map((t) => t.category || '기타')));

  const handleOpenAddModal = () => {
    setTaskToEdit(null);
    setIsFormOpen(true);
  };

  const handleOpenEditModal = (task: TaskItem) => {
    setTaskToEdit(task);
    setIsFormOpen(true);
  };

  return (
    <div className="space-y-6">
      {/* Top Ad Banner */}
      <AdBanner slotPosition="top" />

      {/* Date Navigation & Actions Header */}
      <div className="glass-panel p-4 rounded-2xl flex flex-col sm:flex-row items-center justify-between gap-4">
        {/* Date Selector */}
        <div className="flex items-center gap-2 w-full sm:w-auto">
          <button
            onClick={handlePrevDay}
            className="p-2 rounded-xl border border-slate-200 dark:border-slate-800 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-300 transition-colors"
            title="이전 날짜"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>

          <div className="relative flex-1 sm:flex-none">
            <input
              type="date"
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
              className="px-3 py-1.5 text-xs font-bold rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500 cursor-pointer shadow-xs"
            />
          </div>

          <button
            onClick={handleNextDay}
            className="p-2 rounded-xl border border-slate-200 dark:border-slate-800 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-300 transition-colors"
            title="다음 날짜"
          >
            <ChevronRight className="w-4 h-4" />
          </button>

          <button
            onClick={handleToday}
            className="px-3 py-1.5 text-xs font-semibold rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors"
          >
            오늘
          </button>
        </div>

        {/* Date Display */}
        <div className="text-center sm:text-left">
          <h2 className="text-base font-extrabold text-slate-900 dark:text-slate-100 flex items-center gap-2">
            <Calendar className="w-4 h-4 text-blue-500" />
            <span>{formatKoreanDate(selectedDate)}</span>
          </h2>
        </div>

        {/* Add Task Button */}
        <button
          onClick={handleOpenAddModal}
          className="w-full sm:w-auto flex items-center justify-center gap-2 px-4 py-2 text-xs font-bold text-white bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 rounded-xl shadow-md transition-all transform active:scale-95"
        >
          <Plus className="w-4 h-4" />
          <span>새 업무 기록 추가</span>
        </button>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
        <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-blue-500/10 text-blue-600 dark:text-blue-400 flex items-center justify-center">
            <ListTodo className="w-5 h-5" />
          </div>
          <div>
            <p className="text-[10px] font-semibold text-slate-400">총 업무 수</p>
            <p className="text-lg font-bold text-slate-900 dark:text-slate-100">{dayTasks.length}건</p>
          </div>
        </div>

        <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 flex items-center justify-center">
            <CheckCircle2 className="w-5 h-5" />
          </div>
          <div>
            <p className="text-[10px] font-semibold text-slate-400">달성율</p>
            <p className="text-lg font-bold text-slate-900 dark:text-slate-100">
              {dayTasks.length > 0 ? Math.round((completedCount / dayTasks.length) * 100) : 0}%
              <span className="text-xs text-slate-400 font-normal ml-1">
                ({completedCount}/{dayTasks.length})
              </span>
            </p>
          </div>
        </div>

        <div className="col-span-2 sm:col-span-1 p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 flex items-center justify-center">
            <Clock className="w-5 h-5" />
          </div>
          <div>
            <p className="text-[10px] font-semibold text-slate-400">오늘 소요 시간</p>
            <p className="text-lg font-bold text-slate-900 dark:text-slate-100">
              {totalMinutes > 0 ? formatMinutesToText(totalMinutes) : '0분'}
            </p>
          </div>
        </div>
      </div>

      {/* Search and Tag Filters */}
      {dayTasks.length > 0 && (
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
          {/* Search Bar */}
          <div className="relative w-full sm:w-64">
            <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              placeholder="업무 검색..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-8 pr-3 py-1.5 text-xs rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Tag Filter Chips */}
          <div className="flex flex-wrap items-center gap-1.5 w-full sm:w-auto">
            <span className="text-[10px] text-slate-400 flex items-center gap-1">
              <Filter className="w-3 h-3" /> 태그 필터:
            </span>
            <button
              onClick={() => setSelectedTagFilter(null)}
              className={`px-2.5 py-1 rounded-full text-[11px] font-semibold transition-all ${
                selectedTagFilter === null
                  ? 'bg-slate-900 dark:bg-slate-100 text-white dark:text-slate-900'
                  : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-700'
              }`}
            >
              전체
            </button>
            {availableTags.map((tag) => (
              <button
                key={tag}
                onClick={() => setSelectedTagFilter(tag)}
                className={`px-2.5 py-1 rounded-full text-[11px] font-semibold transition-all ${
                  selectedTagFilter === tag
                    ? 'bg-blue-600 text-white shadow-xs'
                    : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-700'
                }`}
              >
                #{tag}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Task List */}
      {filteredTasks.length > 0 ? (
        <div className="space-y-3">
          {filteredTasks.map((task) => (
            <TaskItemCard key={task.id} task={task} onEdit={handleOpenEditModal} />
          ))}
        </div>
      ) : (
        <div className="text-center py-12 px-4 rounded-2xl border border-dashed border-slate-300 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/30">
          <ListTodo className="w-10 h-10 text-slate-400 mx-auto mb-3 stroke-[1.5]" />
          <h3 className="text-sm font-bold text-slate-700 dark:text-slate-300">
            {dayTasks.length === 0
              ? '등록된 일일 업무가 없습니다.'
              : '조건에 일치하는 업무가 없습니다.'}
          </h3>
          <p className="text-xs text-slate-400 mt-1 max-w-sm mx-auto">
            {dayTasks.length === 0
              ? '상단의 [+ 새 업무 기록 추가] 버튼을 눌러 첫 일일 업무를 기록해 보세요.'
              : '검색어나 태그 필터를 변경해 보세요.'}
          </p>
          {dayTasks.length === 0 && (
            <button
              onClick={handleOpenAddModal}
              className="mt-4 px-4 py-2 text-xs font-bold text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-950/50 hover:bg-blue-100 dark:hover:bg-blue-900/50 rounded-xl transition-colors"
            >
              + 업무 기록하기
            </button>
          )}
        </div>
      )}

      {/* Task Creation & Edit Modal */}
      <TaskFormModal
        isOpen={isFormOpen}
        onClose={() => setIsFormOpen(false)}
        initialDate={selectedDate}
        taskToEdit={taskToEdit}
      />
    </div>
  );
};
