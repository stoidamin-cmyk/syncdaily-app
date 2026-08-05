/**
 * Utility functions for dates and weekly calculations
 */

// Get YYYY-MM-DD string for a given Date
export const formatDateKey = (date: Date): string => {
  const yyyy = date.getFullYear();
  const mm = String(date.getMonth() + 1).padStart(2, '0');
  const dd = String(date.getDate()).padStart(2, '0');
  return `${yyyy}-${mm}-${dd}`;
};

// Formats YYYY-MM-DD into Korean date string "2026년 8월 5일 (수)"
export const formatKoreanDate = (dateStr: string): string => {
  if (!dateStr) return '';
  const date = new Date(dateStr + 'T00:00:00');
  const dayNames = ['일', '월', '화', '수', '목', '금', '토'];
  const yyyy = date.getFullYear();
  const mm = date.getMonth() + 1;
  const dd = date.getDate();
  const dayName = dayNames[date.getDay()];
  return `${yyyy}년 ${mm}월 ${dd}일 (${dayName})`;
};

// Get start of week (Monday) and end of week (Sunday) for a reference date
export const getWeekRange = (refDate: Date = new Date()): { start: Date; end: Date; startStr: string; endStr: string } => {
  const date = new Date(refDate);
  const day = date.getDay();
  // Monday is 1, Sunday is 0. Calculate distance to Monday
  const diffToMonday = date.getDate() - day + (day === 0 ? -6 : 1);
  
  const monday = new Date(date);
  monday.setDate(diffToMonday);
  monday.setHours(0, 0, 0, 0);

  const sunday = new Date(monday);
  sunday.setDate(monday.getDate() + 6);
  sunday.setHours(23, 59, 59, 999);

  return {
    start: monday,
    end: sunday,
    startStr: formatDateKey(monday),
    endStr: formatDateKey(sunday),
  };
};

// Get week number of the year
export const getWeekOfYearNumber = (d: Date): number => {
  const date = new Date(Date.UTC(d.getFullYear(), d.getMonth(), d.getDate()));
  const dayNum = date.getUTCDay() || 7;
  date.setUTCDate(date.getUTCDate() + 4 - dayNum);
  const yearStart = new Date(Date.UTC(date.getUTCFullYear(), 0, 1));
  return Math.ceil((((date.getTime() - yearStart.getTime()) / 86400000) + 1) / 7);
};

// Format minutes into human readable text e.g. 90 -> "1시간 30분", 45 -> "45분"
export const formatMinutesToText = (minutes?: number): string => {
  if (!minutes || minutes <= 0) return '';
  const hrs = Math.floor(minutes / 60);
  const mins = minutes % 60;
  if (hrs > 0 && mins > 0) {
    return `${hrs}시간 ${mins}분`;
  } else if (hrs > 0) {
    return `${hrs}시간`;
  } else {
    return `${mins}분`;
  }
};
