import React, { useRef, useState } from 'react';
import { Modal } from '../common/Modal';
import { useTaskStore } from '../../store/useTaskStore';
import {
  exportTasksAsJSON,
  exportTasksAsMarkdown,
  exportTasksAsTXT,
} from '../../utils/exportImportUtils';
import type { TaskItem } from '../../types';
import { Download, Upload, FileJson, FileText, CheckCircle2, AlertCircle } from 'lucide-react';

interface ImportExportModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ImportExportModal: React.FC<ImportExportModalProps> = ({
  isOpen,
  onClose,
}) => {
  const { tasks, importTasks } = useTaskStore();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [importStatus, setImportStatus] = useState<{ type: 'success' | 'error'; message: string } | null>(null);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const content = event.target?.result as string;
        const parsed = JSON.parse(content);

        if (!Array.isArray(parsed)) {
          throw new Error('유효한 JSON 배열 형식이 아닙니다.');
        }

        // Validate basic properties
        const isValid = parsed.every(
          (item: any) => typeof item.title === 'string' && typeof item.date === 'string'
        );

        if (!isValid) {
          throw new Error('데이터 항목에 필수 필드(title, date)가 누락되었습니다.');
        }

        importTasks(parsed as TaskItem[], false);
        setImportStatus({
          type: 'success',
          message: `성공적으로 ${parsed.length}개의 업무 항목을 불러왔습니다!`,
        });
      } catch (err: any) {
        setImportStatus({
          type: 'error',
          message: `파일 불러오기 실패: ${err.message}`,
        });
      }
    };
    reader.readAsText(file);
    e.target.value = ''; // Reset input
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="데이터 내보내기 및 백업 불러오기" maxWidth="lg">
      <div className="space-y-6">
        {/* Export Section */}
        <div>
          <h3 className="text-xs font-bold text-slate-900 dark:text-slate-200 mb-2 flex items-center gap-1.5">
            <Download className="w-4 h-4 text-blue-500" />
            <span>1. 데이터 내보내기 (Export)</span>
          </h3>
          <p className="text-xs text-slate-500 dark:text-slate-400 mb-3">
            작성한 일일 업무 기록({tasks.length}개)을 원하는 파일 포맷으로 저장하세요.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <button
              onClick={() => exportTasksAsJSON(tasks)}
              className="flex flex-col items-center justify-center p-3.5 rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/50 hover:border-blue-500 dark:hover:border-blue-500 transition-all text-center group"
            >
              <FileJson className="w-6 h-6 text-amber-500 mb-1.5 group-hover:scale-110 transition-transform" />
              <span className="text-xs font-bold text-slate-800 dark:text-slate-200">JSON 백업</span>
              <span className="text-[10px] text-slate-400">복원 가능한 원본 데이터</span>
            </button>

            <button
              onClick={() => exportTasksAsMarkdown(tasks)}
              className="flex flex-col items-center justify-center p-3.5 rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/50 hover:border-emerald-500 dark:hover:border-emerald-500 transition-all text-center group"
            >
              <FileText className="w-6 h-6 text-emerald-500 mb-1.5 group-hover:scale-110 transition-transform" />
              <span className="text-xs font-bold text-slate-800 dark:text-slate-200">Markdown (.md)</span>
              <span className="text-[10px] text-slate-400">노션/GitHub 보고용</span>
            </button>

            <button
              onClick={() => exportTasksAsTXT(tasks)}
              className="flex flex-col items-center justify-center p-3.5 rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/50 hover:border-indigo-500 dark:hover:border-indigo-500 transition-all text-center group"
            >
              <FileText className="w-6 h-6 text-blue-500 mb-1.5 group-hover:scale-110 transition-transform" />
              <span className="text-xs font-bold text-slate-800 dark:text-slate-200">Plain Text (.txt)</span>
              <span className="text-[10px] text-slate-400">일반 문서 보관용</span>
            </button>
          </div>
        </div>

        {/* Import Section */}
        <div className="pt-4 border-t border-slate-200 dark:border-slate-800">
          <h3 className="text-xs font-bold text-slate-900 dark:text-slate-200 mb-2 flex items-center gap-1.5">
            <Upload className="w-4 h-4 text-emerald-500" />
            <span>2. JSON 백업 파일 불러오기 (Import)</span>
          </h3>
          <p className="text-xs text-slate-500 dark:text-slate-400 mb-3">
            기존에 백업한 `SyncDaily_Backup_*.json` 파일을 선택하여 백업 데이터를 병합합니다.
          </p>

          <input
            type="file"
            accept=".json"
            ref={fileInputRef}
            onChange={handleFileUpload}
            className="hidden"
          />

          <button
            onClick={() => fileInputRef.current?.click()}
            className="w-full flex items-center justify-center gap-2 p-4 rounded-2xl border-2 border-dashed border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 hover:bg-slate-100 dark:hover:bg-slate-800/60 text-slate-700 dark:text-slate-300 transition-all text-xs font-semibold"
          >
            <Upload className="w-4 h-4 text-blue-500" />
            <span>JSON 백업 파일 선택하여 업로드</span>
          </button>

          {importStatus && (
            <div
              className={`mt-3 flex items-center gap-2 p-3 rounded-xl border text-xs ${
                importStatus.type === 'success'
                  ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-600 dark:text-emerald-400'
                  : 'bg-red-500/10 border-red-500/30 text-red-600 dark:text-red-400'
              }`}
            >
              {importStatus.type === 'success' ? (
                <CheckCircle2 className="w-4 h-4 shrink-0" />
              ) : (
                <AlertCircle className="w-4 h-4 shrink-0" />
              )}
              <span>{importStatus.message}</span>
            </div>
          )}
        </div>
      </div>
    </Modal>
  );
};
