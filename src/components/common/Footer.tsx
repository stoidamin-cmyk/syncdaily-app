import React, { useState } from 'react';
import { PrivacyPolicyModal } from './PrivacyPolicyModal';
import { TermsModal } from './TermsModal';
import { ShieldCheck, Heart } from 'lucide-react';

export const Footer: React.FC = () => {
  const [isPrivacyOpen, setIsPrivacyOpen] = useState(false);
  const [isTermsOpen, setIsTermsOpen] = useState(false);

  return (
    <footer className="w-full border-t border-slate-200 dark:border-slate-800/80 bg-white/50 dark:bg-slate-950/50 py-6 mt-12 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-slate-500 dark:text-slate-400">
        <div className="flex items-center gap-2">
          <span className="font-semibold text-slate-700 dark:text-slate-300">SyncDaily</span>
          <span>© 2026 SyncDaily App. Offline-First Local Security.</span>
        </div>

        <div className="flex items-center gap-6">
          <button
            onClick={() => setIsPrivacyOpen(true)}
            className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors flex items-center gap-1 font-medium"
          >
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" />
            <span>개인정보 처리방침</span>
          </button>
          <button
            onClick={() => setIsTermsOpen(true)}
            className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors font-medium"
          >
            서비스 이용약관
          </button>
          <span className="text-slate-300 dark:text-slate-700">|</span>
          <span className="flex items-center gap-1">
            Built with <Heart className="w-3 h-3 text-red-500 fill-red-500" /> for Productivity
          </span>
        </div>
      </div>

      <PrivacyPolicyModal isOpen={isPrivacyOpen} onClose={() => setIsPrivacyOpen(false)} />
      <TermsModal isOpen={isTermsOpen} onClose={() => setIsTermsOpen(false)} />
    </footer>
  );
};
