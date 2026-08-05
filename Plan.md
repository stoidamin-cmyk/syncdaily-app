# 🚀 Antigravity CLI 웹사이트 개발 프롬프트 - SyncDaily (Monetized Edition)

## 1. 프로젝트 개요 (Project Overview)

* **프로젝트명:** SyncDaily (싱크데일리)
* **추천 폴더명:** `syncdaily-app`
* **프로젝트 목적:**
  * 매일의 일일 업무를 쉽고 빠르게 기록하고, 주간 업무 보고서로 자동 요약·생성하는 순수 클라이언트 기반(LocalStorage) 생산성 웹 앱
  * 개인 데이터의 외부 유출 없이 로컬 보안을 극대화하면서, 향후 구글 애드센스 및 네이버 애드포스트 광고 수익화를 타깃으로 한 모듈형 웹 애플리케이션
* **타겟 사용자:** 일일/주간 업무 보고가 필요한 직장인, 개발자, 프리랜서 및 개인 기록자
* **핵심 목표:**
  * 로그인/회원가입 절차 없이 100% 브라우저 LocalStorage 활용 (데이터 완전 소유 및 로컬 보안, 백엔드 서버 불필요)
  * 작성한 데이터의 안전한 백업을 위한 내보내기/불러오기(Markdown, JSON, TXT) 지원
  * 광고 승인(AdSense/AdPost) 및 수익화를 고려한 사용자 친화적 웹 디자인, SEO 최적화 레이아웃, 필수 약관 제공
  * GitHub 저장소 연동 및 Vercel을 통한 자동 CI/CD 배포 구축

## 2. 주요 기능 및 요구사항 (Key Features & Requirements)

### 2.1 필수 기능 (MVP - Phase 1)
1. **일일 업무 작성 및 관리 (Daily Task Logger):**
   * 날짜별 업무 항목 추가, 수정, 삭제, 완료 처리 (Checklist)
   * 업무 카테고리 태그(`[기획]`, `[개발]`, `[미팅]`, `[기타]`) 및 소요 시간/메모 입력
   * 타임라인 View 및 일별 스케줄 카드 형태 제공
2. **주간 업무 자동 요약 및 리포트 (Weekly Summary Generator):**
   * 선택한 주차의 일일 업무 자동 그룹화
   * 카테고리별/일자별 정리 및 원클릭 '클립보드 복사' (이메일/보고서 서식 최적화)
3. **로컬 데이터 관리 및 내보내기/불러오기 (Security & Offline First):**
   * 브라우저 LocalStorage 자동 저장 (서버 전송 없이 로컬에서만 유지)
   * 작성한 기록을 Markdown(`.md`), JSON(`.json`), Plain Text(`.txt`) 파일로 내보내기/불러오기 기능
4. **수익화 및 애드 승인 준비 (Monetization & Ad Readiness):**
   * 상단/하단/사이드바에 구글 애드센스 및 네이버 광고를 쉽게 삽입할 수 있는 반응형 `AdBanner` 영역 구성
   * 광고 승인 요건을 충족하기 위한 서비스 소개, 개인정보처리방침(Privacy Policy), 이용약관 Modal 지원

## 3. 기술 스택 및 라이브러리 (Tech Stack)
* **Framework / Build Tool:** React (Vite) + TypeScript
* **Hosting & Deployment:** GitHub + Vercel (Static Site Deployment, 서버리스 오프라인 우선)
* **Styling:** Tailwind CSS, Lucide React (Icons)
* **State Management:** Zustand (`zustand/middleware`를 이용한 LocalStorage 자동 동기화)
* **Monetization & SEO:** AdSense/Naver AdPost Ready Component Slots, `react-helmet-async` (SEO Meta Tags)

## 4. UI/UX 및 디자인 가이드라인 (Design Guidelines)
* **디자인 콘셉트:** 깔끔하고 모던한 대시보드 UI (광고 배치 시에도 콘텐츠 몰입감을 해치지 않는 깔끔한 그리드 레이아웃)
* **주요 컬러 패키지:**
  * Primary: `#2563EB` (Bright Blue - 전문성과 신뢰감)
  * Accent/Success: `#10B981` (Emerald Green - 완료 및 성과 강조)
  * Background (Light): `#F8FAFC` / Surface: `#FFFFFF`
  * Background (Dark): `#0F172A` / Surface: `#1E293B`
* **반응형 디자인:** Mobile / Tablet / Desktop 완벽 대응, 광고 영역의 가변 사이즈 대응 (Responsive Ad Slots)

## 5. 프로젝트 디렉토리 구조 (Directory Structure)
syncdaily-app/
├── src/
│   ├── assets/          # 이미지 및 정적 자원
│   ├── components/      # 재사용 가능한 UI 컴포넌트
│   │   ├── common/      # Header, Sidebar, ThemeToggle, Modal, PrivacyPolicyModal, TermsModal
│   │   ├── ads/         # AdBanner.tsx (구글/네이버 광고 게재용 공통 컴포넌트)
│   │   ├── daily/       # 일일 업무 작성 폼, 타임라인, 태그 관리자
│   │   └── weekly/      # 주간 요약 뷰, 리포트 복사/다운로드 카드
│   ├── hooks/           # Custom Hooks (useLocalStorage, useExportImport 등)
│   ├── store/           # Zustand 상태 관리 (useTaskStore - LocalStorage persist)
│   ├── types/           # TypeScript 타입 정의 (Task, WeeklyReport 등)
│   ├── utils/           # 날짜 계산, 텍스트 포맷팅, Markdown/TXT 변환기
│   ├── App.tsx          # 메인 레이아웃 및 루트 컴포넌트
│   └── main.tsx

## 6. CLI 지시사항 및 수행 단계 (Execution Plan)
1. **[Step 1] 프로젝트 초기화 및 라이브러리 설치 (`syncdaily-app`)**
   * Vite + React + TypeScript 템플릿 구성
   * Tailwind CSS, `lucide-react`, `zustand`, `react-helmet-async` 설치 및 환경 설정
2. **[Step 2] Zustand LocalStorage Persist Store 설계**
   * Task 및 WeeklyReport 타입 정의
   * `zustand/middleware`의 `persist` 기능을 활용한 자동 로컬 저장소 구조 완성
3. **[Step 3] 공통 레이아웃 및 광고 배너(AdBanner) 슬롯 구축**
   * Header, Tab Navigation, SEO Meta 태그 적용
   * 개발 모드에서는 Placeholder로 동작하는 반응형 `AdBanner` 컴포넌트 작성
4. **[Step 4] 일일 업무(Daily Log) & 로컬 데이터 백업/복원 기능 구현**
   * 일별 업무 작성, 수정, 삭제, 타임라인 조회 UI 작성
   * Markdown(`.md`), JSON(`.json`), TXT(`.txt`) 파일 내보내기/불러오기(Import/Export) 기능 제작
5. **[Step 5] 주간 업무(Weekly Summary) 자동 그룹화 & 원클릭 복사**
   * 주 단위 데이터 자동 그룹화
   * 보고서 서식에 맞춘 클립보드 복사 기능 제작
6. **[Step 6] 약관/개인정보 처리방침 모달 및 SEO 점검**
   * 애드센스 심사에 필요한 개인정보 처리방침 및 이용약관 모달 구현
7. **[Step 7] Vercel 배포 준비 및 빌드 검증**
   * TypeScript Strict Mode 오류 및 Vercel 빌드 이슈 사전 검증

## 7. 제약 조건 및 특이사항 (Constraints)
* **서버리스/오프라인 우선:** 별도의 백엔드 서버나 DB(Supabase 등) 없이 100% 브라우저 로컬 저장으로 동작할 것.
* **광고 승인 친화적 구조:**
  * 구글 애드센스/네이버 애드포스트 심사를 고려해 푸터 영역에 '개인정보 처리방침', '이용약관' 모달 제공.
  * 광고 컴포넌트(`AdBanner`)는 개발 모드에서 UI 레이아웃만 유지되도록 Safe Placeholder 처리.
* **코드 완성도:** TypeScript Strict Mode 준수 및 Vercel 빌드 시 타입 에러가 발생하지 않도록 작성.
