import { useState } from 'react';
import { Helmet, HelmetProvider } from 'react-helmet-async';
import { Header } from './components/common/Header';
import { Footer } from './components/common/Footer';
import { DailyTaskLogger } from './components/daily/DailyTaskLogger';
import { WeeklySummaryGenerator } from './components/weekly/WeeklySummaryGenerator';
import { SettingsModal } from './components/settings/SettingsModal';
import { ImportExportModal } from './components/daily/ImportExportModal';
import { AdBanner } from './components/ads/AdBanner';

export function AppContent() {
  const [activeTab, setActiveTab] = useState<'daily' | 'weekly' | 'backup'>('daily');
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [isBackupModalOpen, setIsBackupModalOpen] = useState(false);

  const handleOpenBackupModal = () => {
    setIsBackupModalOpen(true);
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 dark:bg-[#090d16] text-slate-900 dark:text-slate-100 font-sans antialiased selection:bg-blue-500 selection:text-white transition-colors duration-200">
      {/* SEO Meta Tags */}
      <Helmet>
        <title>SyncDaily - 스마트 일일 업무 기록 및 주간 업무 보고서 오토 생성기</title>
        <meta
          name="description"
          content="서버 전송 없는 100% 로컬 보안 오프라인 오토 저장! 매일 업무를 쉽게 기록하고 원클릭으로 주간 보고서(Markdown, 이메일 서식)를 생성하세요."
        />
        <meta
          name="keywords"
          content="일일업무, 주간보고서, 업무일지, 생산성도구, 로컬스토리지, 오프라인노트, 마크다운변환기, 업무보고서자동생성"
        />
        <meta property="og:title" content="SyncDaily - 스마트 일일 업무 작성 & 주간 보고서 생성" />
        <meta
          property="og:description"
          content="서버 연동 없이 안전한 100% 브라우저 로컬 저장 생산성 앱"
        />
        <meta property="og:type" content="website" />
      </Helmet>

      {/* Header */}
      <Header
        activeTab={activeTab}
        setActiveTab={(tab) => {
          if (tab === 'backup') {
            setIsBackupModalOpen(true);
          } else {
            setActiveTab(tab);
          }
        }}
        onOpenSettings={() => setIsSettingsOpen(true)}
        onOpenBackupModal={handleOpenBackupModal}
      />

      {/* Main Container */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {activeTab === 'daily' && <DailyTaskLogger />}
        {activeTab === 'weekly' && <WeeklySummaryGenerator />}

        {/* Bottom Ad Banner */}
        <AdBanner slotPosition="bottom" className="mt-8" />
      </main>

      {/* Footer */}
      <Footer />

      {/* Settings & Backup Modals */}
      <SettingsModal isOpen={isSettingsOpen} onClose={() => setIsSettingsOpen(false)} />
      <ImportExportModal
        isOpen={isBackupModalOpen}
        onClose={() => setIsBackupModalOpen(false)}
      />
    </div>
  );
}

export default function App() {
  return (
    <HelmetProvider>
      <AppContent />
    </HelmetProvider>
  );
}
