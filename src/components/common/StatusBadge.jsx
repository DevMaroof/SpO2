import { Check, AlertTriangle, X, Clock, Circle } from 'lucide-react';

const STATUS_CONFIG = {
  not_started: {
    label: 'Not Started',
    classes: 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400',
    icon: Circle,
  },
  in_progress: {
    label: 'In Progress',
    classes: 'bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400',
    icon: Clock,
    pulse: true,
  },
  completed: {
    label: 'Completed',
    classes: 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400',
    icon: Check,
  },
  needs_revision: {
    label: 'Needs Revision',
    classes: 'bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-400',
    icon: AlertTriangle,
  },
  skipped: {
    label: 'Skipped',
    classes: 'bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400',
    icon: X,
  },
};

export default function StatusBadge({ status, className = '' }) {
  const config = STATUS_CONFIG[status] || STATUS_CONFIG.not_started;
  const Icon = config.icon;

  return (
    <span
      className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-medium ${config.classes} ${className}`}
      role="status"
      aria-label={config.label}
    >
      {config.pulse ? (
        <span className="relative flex h-2 w-2">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75" />
          <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500" />
        </span>
      ) : (
        <Icon className="w-3 h-3" />
      )}
      {config.label}
    </span>
  );
}
