// Unique ID generator
let counter = 0;

export function generateId(prefix = '') {
  counter++;
  const timestamp = Date.now().toString(36);
  const random = Math.random().toString(36).substring(2, 8);
  return prefix ? `${prefix}_${timestamp}_${random}_${counter}` : `${timestamp}_${random}_${counter}`;
}

// Date helpers
export function getTodayString() {
  return new Date().toISOString().split('T')[0];
}

export function formatDate(dateStr) {
  const date = new Date(dateStr);
  return date.toLocaleDateString('en-US', { 
    weekday: 'short', 
    year: 'numeric', 
    month: 'short', 
    day: 'numeric' 
  });
}

export function formatTime(minutes) {
  const hrs = Math.floor(minutes / 60);
  const mins = minutes % 60;
  if (hrs === 0) return `${mins}m`;
  if (mins === 0) return `${hrs}h`;
  return `${hrs}h ${mins}m`;
}

export function getWeekNumber(dateStr) {
  const date = new Date(dateStr);
  const startDate = new Date(date.getFullYear(), 0, 1);
  const days = Math.floor((date - startDate) / (24 * 60 * 60 * 1000));
  return Math.ceil((days + startDate.getDay() + 1) / 7);
}

export function getDaysBetween(date1, date2) {
  const d1 = new Date(date1);
  const d2 = new Date(date2);
  return Math.floor((d2 - d1) / (24 * 60 * 60 * 1000));
}

// Status helpers
export const TASK_STATUSES = {
  NOT_STARTED: 'not_started',
  IN_PROGRESS: 'in_progress',
  COMPLETED: 'completed',
  NEEDS_REVISION: 'needs_revision',
  SKIPPED: 'skipped',
};

export const STUDY_BLOCKS = {
  MATHEMATICS: 'mathematics',
  PYTHON: 'python',
  AIML: 'aiml',
  REVISION: 'revision',
};

export const BLOCK_DURATIONS = {
  [STUDY_BLOCKS.MATHEMATICS]: 60,
  [STUDY_BLOCKS.PYTHON]: 90,
  [STUDY_BLOCKS.AIML]: 60,
  [STUDY_BLOCKS.REVISION]: 30,
};

export const BLOCK_LABELS = {
  [STUDY_BLOCKS.MATHEMATICS]: 'Mathematics',
  [STUDY_BLOCKS.PYTHON]: 'Python Programming',
  [STUDY_BLOCKS.AIML]: 'AI/ML Course',
  [STUDY_BLOCKS.REVISION]: 'Revision & Assessment',
};

export const BLOCK_COLORS = {
  [STUDY_BLOCKS.MATHEMATICS]: { bg: 'bg-blue-500', border: 'border-l-blue-500', light: 'bg-blue-100 dark:bg-blue-950/50', text: 'text-blue-700 dark:text-blue-300', hex: '#3b82f6' },
  [STUDY_BLOCKS.PYTHON]: { bg: 'bg-green-500', border: 'border-l-green-500', light: 'bg-green-100 dark:bg-green-950/50', text: 'text-green-700 dark:text-green-300', hex: '#22c55e' },
  [STUDY_BLOCKS.AIML]: { bg: 'bg-purple-500', border: 'border-l-purple-500', light: 'bg-purple-100 dark:bg-purple-950/50', text: 'text-purple-700 dark:text-purple-300', hex: '#a855f7' },
  [STUDY_BLOCKS.REVISION]: { bg: 'bg-amber-500', border: 'border-l-amber-500', light: 'bg-amber-100 dark:bg-amber-950/50', text: 'text-amber-700 dark:text-amber-300', hex: '#f59e0b' },
};

export function getStatusLabel(status) {
  const labels = {
    [TASK_STATUSES.NOT_STARTED]: 'Not Started',
    [TASK_STATUSES.IN_PROGRESS]: 'In Progress',
    [TASK_STATUSES.COMPLETED]: 'Completed',
    [TASK_STATUSES.NEEDS_REVISION]: 'Needs Revision',
    [TASK_STATUSES.SKIPPED]: 'Skipped',
  };
  return labels[status] || status;
}

export function getStatusClass(status) {
  const classes = {
    [TASK_STATUSES.NOT_STARTED]: 'status-not-started',
    [TASK_STATUSES.IN_PROGRESS]: 'status-in-progress',
    [TASK_STATUSES.COMPLETED]: 'status-completed',
    [TASK_STATUSES.NEEDS_REVISION]: 'status-needs-revision',
    [TASK_STATUSES.SKIPPED]: 'status-skipped',
  };
  return classes[status] || 'status-not-started';
}

// Calculate percentage safely
export function calcPercentage(completed, total) {
  if (!total || total === 0) return 0;
  return Math.round((completed / total) * 100);
}

// Clamp value
export function clamp(value, min, max) {
  return Math.min(Math.max(value, min), max);
}

