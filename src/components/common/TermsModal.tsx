import React from 'react';
import { Modal } from './Modal';
import { FileCheck } from 'lucide-react';

interface TermsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const TermsModal: React.FC<TermsModalProps> = ({ isOpen, onClose }) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose} title="서비스 이용약관 (Terms of Service)" maxWidth="xl">
      <div className="space-y-4 text-xs leading-relaxed text-slate-600 dark:text-slate-300">
        <div className="flex items-center gap-2 p-3 bg-blue-500/10 text-blue-700 dark:text-blue-300 rounded-xl border border-blue-500/20 font-medium">
          <FileCheck className="w-5 h-5 shrink-0" />
          <span>SyncDaily 서비스 이용약관 안내입니다. 서비스를 이용함으로써 본 약관에 동의하게 됩니다.</span>
        </div>

        <h3 className="font-bold text-sm text-slate-900 dark:text-slate-100">제 1 조 (목적)</h3>
        <p>
          본 약관은 SyncDaily(이하 '서비스')가 제공하는 일일 업무 기록 및 주간 보고서 자동 생성 서비스의 이용 조건 및 절차에 관한 사항을 규정함을 목적으로 합니다.
        </p>

        <h3 className="font-bold text-sm text-slate-900 dark:text-slate-100">제 2 조 (서비스의 제공 및 변경)</h3>
        <p>
          본 서비스는 100% 웹 브라우저 기반의 무상 생산성 도구로 제공되며, 필요 시 기능의 업데이트 또는 수정이 이루어질 수 있습니다.
        </p>

        <h3 className="font-bold text-sm text-slate-900 dark:text-slate-100">제 3 조 (면책 조항)</h3>
        <p>
          1. 서비스 제공자는 브라우저의 저장소(LocalStorage) 오작동, 사용자의 캐시 삭제, 기기 분실 등으로 인한 데이터 손실에 대해 책임을 지지 않습니다.
          <br />
          2. 사용자는 백업 기능을 사용하여 주요 기록을 스스로 보호해야 합니다.
        </p>

        <h3 className="font-bold text-sm text-slate-900 dark:text-slate-100">제 4 조 (광고 게재)</h3>
        <p>
          서비스 화면에는 구글 애드센스 등 광고가 배치될 수 있으며, 광고 클릭 및 광고주와의 거래는 사용자 본인의 판단에 따릅니다.
        </p>

        <p className="text-slate-400 dark:text-slate-500 text-[11px] pt-2">최종 수정일: 2026년 8월 5일</p>
      </div>
    </Modal>
  );
};
