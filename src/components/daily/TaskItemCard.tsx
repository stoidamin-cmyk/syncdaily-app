import React from 'react';
import type { TaskItem } from '../../types';
import { useTaskStore } from '../../store/useTaskStore';
import { formatMinutesToText } from '../../utils/dateUtils';
import { Check, Clock, Edit2, Trash2 } from 'lucide-react';

interface TaskItemCardProps {
  task: TaskItem;
  onEdit: (task: TaskItem) => void;
}

export const TaskItemCard: React.FC<TaskItemCardProps> = ({ task, onEdit }) => {
  const { toggleTaskCompleted, deleteTask } = useTaskStore();

  return (
    <div
      className={`group relative p-4 rounded-2xl border transition-all duration-200 ${
        task.completed
          ? 'bg-slate-50/60 dark:bg-slate-900/40 border-slate-200/80 dark:border-slate-800/60 opacity-80'
          : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 shadow-xs hover:shadow-md hover:border-slate-300 dark:hover:border-slate-700'
      }`}
    >
      <div className="flex items-start gap-3">
        {/* Completion Checkbox */}
        <button
          onClick={() => toggleTaskCompleted(task.id)}
          className={`mt-0.5 w-5 h-5 rounded-lg border flex items-center justify-center transition-all ${
            task.completed
              ? 'bg-emerald-500 border-emerald-500 text-white shadow-xs'
              : 'border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 hover:border-emerald-500'
          }`}
          title={task.completed ? '미완료로 변경' : '완료 처리'}
        >
          {task.completed && <Check className="w-3.5 h-3.5 stroke-[3]" />}
        </button>

        {/* Content Body */}
        <div className="flex-1 min-w-0">
          <div className="flex flex-wrap items-center gap-2 mb-1">
            {/* Category Tag Badge */}
            <span className="px-2 py-0.5 text-[10px] font-bold rounded-full bg-blue-500/10 text-blue-600 dark:text-blue-400 border border-blue-500/20">
              #{task.category || '기타'}
            </span>

            {/* Time Spent */}
            {task.timeSpentMinutes ? (
              <span className="flex items-center gap-1 text-[10px] font-medium text-slate-500 dark:text-slate-400">
                <Clock className="w-3 h-3 text-slate-400" />
                {formatMinutesToText(task.timeSpentMinutes)}
              </span>
            ) : null}
          </div>

          {/* Title */}
          <h4
            className={`text-sm font-semibold leading-snug break-words ${
              task.completed
                ? 'line-through text-slate-400 dark:text-slate-500'
                : 'text-slate-900 dark:text-slate-100'
            }`}
          >
            {task.title}
          </h4>

          {/* Optional Description / Memo */}
          {task.description && (
            <p className="mt-1.5 text-xs text-slate-600 dark:text-slate-400 line-clamp-2 leading-relaxed bg-slate-50 dark:bg-slate-800/50 p-2 rounded-xl border border-slate-100 dark:border-slate-800/80">
              {task.description}
            </p>
          )}
        </div>

        {/* Action Buttons (Edit / Delete) */}
        <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 focus-within:opacity-100 transition-opacity">
          <button
            onClick={() => onEdit(task)}
            className="p-1.5 rounded-lg text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
            title="수정"
          >
            <Edit2 className="w-3.5 h-3.5" />
          </button>
          <button
            onClick={() => deleteTask(task.id)}
            className="p-1.5 rounded-lg text-slate-400 hover:text-red-600 dark:hover:text-red-400 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
            title="삭제"
          >
            <Trash2 className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
};
