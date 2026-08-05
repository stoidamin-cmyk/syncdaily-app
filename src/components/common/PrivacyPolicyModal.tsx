import React from 'react';
import { Modal } from './Modal';
import { ShieldCheck } from 'lucide-react';

interface PrivacyPolicyModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const PrivacyPolicyModal: React.FC<PrivacyPolicyModalProps> = ({ isOpen, onClose }) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose} title="개인정보 처리방침 (Privacy Policy)" maxWidth="xl">
      <div className="space-y-4 text-xs leading-relaxed text-slate-600 dark:text-slate-300">
        <div className="flex items-center gap-2 p-3 bg-emerald-500/10 text-emerald-700 dark:text-emerald-300 rounded-xl border border-emerald-500/20 font-medium">
          <ShieldCheck className="w-5 h-5 shrink-0" />
          <span>SyncDaily는 100% 브라우저 내 LocalStorage 기반으로 작동하며, 어떠한 개인 업무 데이터도 외부 서버로 전송하지 않습니다.</span>
        </div>

        <h3 className="font-bold text-sm text-slate-900 dark:text-slate-100">1. 개인정보의 수집 및 이용 목적</h3>
        <p>
          SyncDaily(이하 '서비스')는 별도의 회원가입 절차가 없으며, 사용자가 입력한 업무 기록, 주간 보고서 내용, 설정 정보는 전적으로 사용자의 웹 브라우저(LocalStorage) 내에만 저장됩니다.
        </p>

        <h3 className="font-bold text-sm text-slate-900 dark:text-slate-100">2. 쿠키(Cookie) 및 제3자 광고 제휴 (Google AdSense / Naver AdPost)</h3>
        <p>
          본 서비스는 구글 애드센스(Google AdSense) 및 제3자 광고 네트워크를 통한 광고 서비스를 포함할 수 있습니다.
        </p>
        <ul className="list-disc pl-5 space-y-1">
          <li>구글 등 제3자 제공업체는 사용자의 이전 방문 기록을 바탕으로 관련성 높은 광고를 게재하기 위해 쿠키(Cookie)를 사용할 수 있습니다.</li>
          <li>사용자는 구글 광고 설정(www.google.com/settings/ads)을 방문하여 맞춤형 광고를 해제할 수 있습니다.</li>
        </ul>

        <h3 className="font-bold text-sm text-slate-900 dark:text-slate-100">3. 데이터 백업 및 관리 책임</h3>
        <p>
          본 서비스의 모든 데이터는 사용자의 로컬 기기에 저장되므로, 브라우저 캐시 삭제 또는 기기 변경 시 데이터가 소실될 수 있습니다. 사용자는 서비스를 통해 제공되는 JSON/Markdown 내보내기 기능을 활용하여 주기적으로 데이터를 직접 백업해야 합니다.
        </p>

        <h3 className="font-bold text-sm text-slate-900 dark:text-slate-100">4. 문의사항</h3>
        <p>
          개인정보 보호 관련 문의 사항은 서비스 제공자 문의 창구(support@syncdaily.app)로 문의해주시기 바랍니다.
        </p>
        <p className="text-slate-400 dark:text-slate-500 text-[11px] pt-2">최종 수정일: 2026년 8월 5일</p>
      </div>
    </Modal>
  );
};
