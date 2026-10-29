import { useState, useCallback } from 'react';
import {
  CheckCircle2,
  Circle,
  ChevronDown,
  ChevronUp,
  Clock,
  Flag,
  StickyNote,
  MoreVertical,
} from 'lucide-react';
import StatusBadge from './StatusBadge';
import { TASK_STATUSES, BLOCK_COLORS, formatTime } from '../../utils/helpers';

const STATUS_OPTIONS = [
  { value: TASK_STATUSES.NOT_STARTED, label: 'Not Started' },
  { value: TASK_STATUSES.IN_PROGRESS, label: 'In Progress' },
  { value: TASK_STATUSES.COMPLETED, label: 'Completed' },
  { value: TASK_STATUSES.NEEDS_REVISION, label: 'Needs Revision' },
  { value: TASK_STATUSES.SKIPPED, label: 'Skipped' },
];

export default function TaskCard({
  task,
  onStatusChange,
  onNotesChange,
  onFlagRevision,
  onClick,
}) {
  const [notesExpanded, setNotesExpanded] = useState(false);
  const [localNotes, setLocalNotes] = useState(task?.notes || '');
  const [showStatusDropdown, setShowStatusDropdown] = useState(false);

  const isCompleted = task?.status === TASK_STATUSES.COMPLETED;
  const isSkipped = task?.status === TASK_STATUSES.SKIPPED;
  const blockColor = task?.block ? BLOCK_COLORS[task.block] : null;

  const handleToggleComplete = useCallback(() => {
    if (!onStatusChange) return;
    const newStatus = isCompleted ? TASK_STATUSES.NOT_STARTED : TASK_STATUSES.COMPLETED;
    onStatusChange(task.id, newStatus);
  }, [isCompleted, onStatusChange, task?.id]);

  const handleStatusSelect = useCallback(
    (status) => {
      if (onStatusChange) {
        onStatusChange(task.id, status);
      }
      setShowStatusDropdown(false);
    },
    [onStatusChange, task?.id]
  );

  const handleNotesBlur = useCallback(() => {
    if (onNotesChange && localNotes !== (task?.notes || '')) {
      onNotesChange(task.id, localNotes);
    }
  }, [onNotesChange, localNotes, task?.id, task?.notes]);

  const handleFlagRevision = useCallback(() => {
    if (onFlagRevision) {
      onFlagRevision(task.id, task.block, task.title, task.dayNumber);
    }
  }, [onFlagRevision, task?.id, task?.block, task?.title, task?.dayNumber]);

  if (!task) return null;

  return (
    <div
      className={`card-hover relative group overflow-hidden transition-all duration-200 ${
        isCompleted ? 'opacity-75' : ''
      } ${isSkipped ? 'opacity-60' : ''}`}
      onClick={onClick}
      role={onClick ? 'button' : undefined}
      tabIndex={onClick ? 0 : undefined}
      onKeyDown={onClick ? (e) => e.key === 'Enter' && onClick() : undefined}
    >
      {/* Block color indicator strip */}
      {blockColor && (
        <div className={`absolute top-0 left-0 w-1 h-full ${blockColor.bg}`} />
      )}

      <div className="p-4 pl-5">
        {/* Top Row: Checkbox + Title + Status */}
        <div className="flex items-start gap-3">
          {/* Toggle completion button */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              handleToggleComplete();
            }}
            className={`mt-0.5 shrink-0 transition-colors ${
              isCompleted
                ? 'text-green-500 hover:text-green-600'
                : 'text-gray-400 dark:text-gray-500 hover:text-primary-500'
            }`}
            aria-label={isCompleted ? 'Mark as incomplete' : 'Mark as complete'}
          >
            {isCompleted ? (
              <CheckCircle2 className="w-5 h-5" />
            ) : (
              <Circle className="w-5 h-5" />
            )}
          </button>

          {/* Title + Description */}
          <div className="flex-1 min-w-0">
            <h3
              className={`text-sm font-semibold leading-snug ${
                isCompleted
                  ? 'line-through text-gray-400 dark:text-gray-500'
                  : 'text-gray-900 dark:text-gray-100'
              }`}
            >
              {task.title}
            </h3>
            {task.description && (
              <p className="mt-0.5 text-xs text-gray-500 dark:text-gray-400 line-clamp-2">
                {task.description}
              </p>
            )}

            {/* Meta row */}
            <div className="flex flex-wrap items-center gap-2 mt-2">
              <StatusBadge status={task.status} />

              {task.estimatedMinutes && (
                <span className="inline-flex items-center gap-1 text-xs text-gray-500 dark:text-gray-400">
                  <Clock className="w-3 h-3" />
                  {formatTime(task.estimatedMinutes)}
                </span>
              )}

              {blockColor && (
                <span
                  className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium ${blockColor.light} ${blockColor.text}`}
                >
                  {task.block}
                </span>
              )}
            </div>
          </div>

          {/* Actions */}
          <div className="flex items-center gap-1 shrink-0">
            {/* Flag for revision */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                handleFlagRevision();
              }}
              className="p-1.5 rounded-lg text-gray-400 dark:text-gray-500 hover:text-amber-500 hover:bg-amber-50 dark:hover:bg-amber-900/20 transition-colors opacity-0 group-hover:opacity-100 focus:opacity-100"
              aria-label="Flag for revision"
              title="Flag for revision"
            >
              <Flag className="w-4 h-4" />
            </button>

            {/* Status dropdown toggle */}
            <div className="relative">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setShowStatusDropdown(!showStatusDropdown);
                }}
                className="p-1.5 rounded-lg text-gray-400 dark:text-gray-500 hover:text-gray-600 dark:hover:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors opacity-0 group-hover:opacity-100 focus:opacity-100"
                aria-label="Change status"
                aria-expanded={showStatusDropdown}
              >
                <MoreVertical className="w-4 h-4" />
              </button>

              {showStatusDropdown && (
                <>
                  <div
                    className="fixed inset-0 z-10"
                    onClick={(e) => {
                      e.stopPropagation();
                      setShowStatusDropdown(false);
                    }}
                    aria-hidden="true"
                  />
                  <div className="absolute right-0 top-full mt-1 z-20 w-44 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-lg py-1">
                    {STATUS_OPTIONS.map((opt) => (
                      <button
                        key={opt.value}
                        onClick={(e) => {
                          e.stopPropagation();
                          handleStatusSelect(opt.value);
                        }}
                        className={`w-full text-left px-3 py-2 text-sm transition-colors ${
                          task.status === opt.value
                            ? 'bg-primary-50 dark:bg-primary-900/20 text-primary-700 dark:text-primary-400 font-medium'
                            : 'text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700'
                        }`}
                      >
                        {opt.label}
                      </button>
                    ))}
                  </div>
                </>
              )}
            </div>
          </div>
        </div>

        {/* Expandable Notes */}
        <div className="mt-3 pl-8">
          <button
            onClick={(e) => {
              e.stopPropagation();
              setNotesExpanded(!notesExpanded);
            }}
            className="flex items-center gap-1.5 text-xs text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 transition-colors"
            aria-expanded={notesExpanded}
            aria-label="Toggle notes"
          >
            <StickyNote className="w-3.5 h-3.5" />
            Notes
            {notesExpanded ? (
              <ChevronUp className="w-3 h-3" />
            ) : (
              <ChevronDown className="w-3 h-3" />
            )}
          </button>

          {notesExpanded && (
            <textarea
              value={localNotes}
              onChange={(e) => setLocalNotes(e.target.value)}
              onBlur={handleNotesBlur}
              onClick={(e) => e.stopPropagation()}
              placeholder="Add notes..."
              rows={3}
              className="mt-2 w-full input-field text-sm resize-y min-h-[64px]"
              aria-label="Task notes"
            />
          )}
        </div>
      </div>
    </div>
  );
}
