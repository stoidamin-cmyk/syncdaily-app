import React, { useState, useEffect } from 'react';
import { Modal } from '../common/Modal';
import { useTaskStore } from '../../store/useTaskStore';
import { useSettingsStore } from '../../store/useSettingsStore';
import { formatDateKey } from '../../utils/dateUtils';
import type { TaskItem } from '../../types';
import { Clock, Tag, FileText, CheckCircle2 } from 'lucide-react';

interface TaskFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialDate?: string;
  taskToEdit?: TaskItem | null;
}

export const TaskFormModal: React.FC<TaskFormModalProps> = ({
  isOpen,
  onClose,
  initialDate,
  taskToEdit,
}) => {
  const { addTask, updateTask } = useTaskStore();
  const { settings, addRecentTag } = useSettingsStore();

  const [date, setDate] = useState('');
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('개발');
  const [customTagInput, setCustomTagInput] = useState('');
  const [timeSpent, setTimeSpent] = useState<number | ''>(30);
  const [description, setDescription] = useState('');
  const [completed, setCompleted] = useState(false);

  useEffect(() => {
    if (taskToEdit) {
      setDate(taskToEdit.date);
      setTitle(taskToEdit.title);
      setCategory(taskToEdit.category || '개발');
      setTimeSpent(taskToEdit.timeSpentMinutes ?? '');
      setDescription(taskToEdit.description || '');
      setCompleted(taskToEdit.completed);
    } else {
      setDate(initialDate || formatDateKey(new Date()));
      setTitle('');
      setCategory('개발');
      setCustomTagInput('');
      setTimeSpent(30);
      setDescription('');
      setCompleted(false);
    }
  }, [taskToEdit, initialDate, isOpen]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !date) return;

    const finalTag = customTagInput.trim() ? customTagInput.trim() : category;

    if (customTagInput.trim()) {
      addRecentTag(customTagInput.trim());
    }

    if (taskToEdit) {
      updateTask(taskToEdit.id, {
        date,
        title: title.trim(),
        category: finalTag,
        timeSpentMinutes: typeof timeSpent === 'number' ? timeSpent : 0,
        description: description.trim(),
        completed,
      });
    } else {
      addTask({
        date,
        title: title.trim(),
        category: finalTag,
        timeSpentMinutes: typeof timeSpent === 'number' ? timeSpent : 0,
        description: description.trim(),
        completed,
      });
    }

    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={taskToEdit ? '일일 업무 수정' : '새 일일 업무 추가'}
      maxWidth="md"
    >
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Date Selector */}
        <div>
          <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
            📅 날짜 (Date)
          </label>
          <input
            type="date"
            required
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900 text-slate-800 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Title Input */}
        <div>
          <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
            ✏️ 업무 제목 (Title) <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            required
            placeholder="예: 신규 기능 API 엔드포인트 구현 및 테스트"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Category / Free-form Tag Selector */}
        <div>
          <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1 flex items-center gap-1">
            <Tag className="w-3.5 h-3.5 text-indigo-500" />
            <span>카테고리 / 태그 (자유 입력 지원)</span>
          </label>
          <div className="flex gap-2 mb-2">
            <input
              type="text"
              placeholder="직접 태그명 입력 (예: [디자인], [핫픽스])"
              value={customTagInput}
              onChange={(e) => {
                setCustomTagInput(e.target.value);
                setCategory(e.target.value);
              }}
              className="flex-1 px-3 py-2 text-xs rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          {/* Recent/Suggested Tags Chips */}
          <div className="flex flex-wrap gap-1.5 pt-1">
            <span className="text-[10px] text-slate-400 self-center mr-1">추천:</span>
            {settings.recentTags.map((tag) => (
              <button
                type="button"
                key={tag}
                onClick={() => {
                  setCategory(tag);
                  setCustomTagInput(tag);
                }}
                className={`px-2.5 py-1 rounded-full text-[11px] font-medium transition-all ${
                  category === tag || customTagInput === tag
                    ? 'bg-indigo-600 text-white shadow-xs'
                    : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-700'
                }`}
              >
                #{tag}
              </button>
            ))}
          </div>
        </div>

        {/* Time Spent Input */}
        <div>
          <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1 flex items-center gap-1">
            <Clock className="w-3.5 h-3.5 text-blue-500" />
            <span>소요 시간 (분 단위)</span>
          </label>
          <div className="flex items-center gap-2">
            <input
              type="number"
              min="0"
              placeholder="예: 45"
              value={timeSpent}
              onChange={(e) => setTimeSpent(e.target.value ? parseInt(e.target.value) : '')}
              className="w-32 px-3 py-2 text-xs rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <span className="text-xs text-slate-500">분</span>

            <div className="flex gap-1 ml-auto">
              {[15, 30, 60, 120].map((mins) => (
                <button
                  type="button"
                  key={mins}
                  onClick={() => setTimeSpent(mins)}
                  className={`px-2 py-1 rounded-lg text-[10px] font-semibold border transition-all ${
                    timeSpent === mins
                      ? 'border-blue-500 bg-blue-500/10 text-blue-600 dark:text-blue-400'
                      : 'border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400'
                  }`}
                >
                  +{mins}분
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Description / Memo */}
        <div>
          <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1 flex items-center gap-1">
            <FileText className="w-3.5 h-3.5 text-emerald-500" />
            <span>상세 메모 / 성과 내용 (선택)</span>
          </label>
          <textarea
            rows={3}
            placeholder="진행 내용, 이슈 사항, 성과 요약을 적어두면 주간 보고서 생성 시 상세히 요약됩니다."
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
          />
        </div>

        {/* Completion Checkbox */}
        <div className="flex items-center gap-2 pt-2">
          <input
            type="checkbox"
            id="taskCompletedCheck"
            checked={completed}
            onChange={(e) => setCompleted(e.target.checked)}
            className="w-4 h-4 text-emerald-600 rounded border-slate-300 focus:ring-emerald-500"
          />
          <label
            htmlFor="taskCompletedCheck"
            className="text-xs font-medium text-slate-700 dark:text-slate-300 cursor-pointer flex items-center gap-1"
          >
            <CheckCircle2 className={`w-4 h-4 ${completed ? 'text-emerald-500' : 'text-slate-400'}`} />
            <span>업무 완료 상태로 표시</span>
          </label>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center justify-end gap-2 pt-4 border-t border-slate-200 dark:border-slate-800">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 text-xs font-semibold text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl transition-colors"
          >
            취소
          </button>
          <button
            type="submit"
            className="px-5 py-2 text-xs font-bold text-white bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 rounded-xl shadow-md transition-all transform active:scale-95"
          >
            {taskToEdit ? '수정 완료' : '업무 저장'}
          </button>
        </div>
      </form>
    </Modal>
  );
};
