import { useState, useMemo, useRef, useCallback, useEffect } from 'react';
import { useStudy } from '../context/StudyContext';
import {
  STUDY_BLOCKS,
  BLOCK_LABELS,
  BLOCK_COLORS,
  BLOCK_DURATIONS,
  TASK_STATUSES,
  formatTime,
  calcPercentage,
  getStatusLabel,
} from '../utils/helpers';
import {
  ChevronLeft,
  ChevronRight,
  ChevronDown,
  ChevronUp,
  Play,
  Pause,
  AlertTriangle,
  CheckCircle2,
  Filter,
  Clock,
  StickyNote,
  Flag,
  SkipForward,
  RotateCcw,
  Circle,
  Loader2,
} from 'lucide-react';

const FILTERS = [
  { key: 'all', label: 'All' },
  { key: TASK_STATUSES.NOT_STARTED, label: 'Incomplete' },
  { key: TASK_STATUSES.COMPLETED, label: 'Completed' },
  { key: TASK_STATUSES.NEEDS_REVISION, label: 'Needs Revision' },
  { key: TASK_STATUSES.SKIPPED, label: 'Skipped' },
];

const STATUS_OPTIONS = [
  { value: TASK_STATUSES.NOT_STARTED, label: 'Not Started', icon: Circle, color: 'text-gray-400' },
  { value: TASK_STATUSES.IN_PROGRESS, label: 'In Progress', icon: Loader2, color: 'text-blue-500' },
  { value: TASK_STATUSES.COMPLETED, label: 'Completed', icon: CheckCircle2, color: 'text-green-500' },
  { value: TASK_STATUSES.NEEDS_REVISION, label: 'Needs Revision', icon: Flag, color: 'text-amber-500' },
  { value: TASK_STATUSES.SKIPPED, label: 'Skipped', icon: SkipForward, color: 'text-gray-500' },
];

function TaskItem({
  task,
  isStatusOpen: controlledIsStatusOpen,
  onToggleStatus: controlledOnToggleStatus,
  onStatusChange,
  onNotesChange,
  onFlagRevision,
}) {
  const [showNotes, setShowNotes] = useState(false);
  const [notes, setNotes] = useState(task.notes || '');
  const [localShowStatus, setLocalShowStatus] = useState(false);
  const [openUpward, setOpenUpward] = useState(false);
  const statusRef = useRef(null);

  const isStatusOpen = controlledIsStatusOpen !== undefined ? controlledIsStatusOpen : localShowStatus;
  const onToggleStatus = controlledOnToggleStatus || setLocalShowStatus;

  const statusOption = STATUS_OPTIONS.find(s => s.value === task.status) || STATUS_OPTIONS[0];
  const StatusIcon = statusOption.icon;

  useEffect(() => {
    if (!isStatusOpen) return;

    // Check if dropdown would collide with bottom of viewport
    if (statusRef.current) {
      const rect = statusRef.current.getBoundingClientRect();
      const spaceBelow = window.innerHeight - rect.bottom;
      setOpenUpward(spaceBelow < 220 && rect.top > 220);
    }

    const handleClickOutside = (e) => {
      if (statusRef.current && !statusRef.current.contains(e.target)) {
        onToggleStatus(false);
      }
    };

    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        onToggleStatus(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [isStatusOpen, onToggleStatus]);

  return (
    <div
      id={`task-${task.id}`}
      className={`p-3 rounded-lg border transition-all ${
        isStatusOpen ? 'relative z-30' : 'relative z-0'
      } ${
        task.status === TASK_STATUSES.COMPLETED
          ? 'bg-green-50 dark:bg-green-900/10 border-green-200 dark:border-green-800'
          : task.status === TASK_STATUSES.NEEDS_REVISION
          ? 'bg-amber-50 dark:bg-amber-900/10 border-amber-200 dark:border-amber-800'
          : 'bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700'
      }`}
    >
      <div className="flex items-start gap-3">
        <div ref={statusRef} className="relative mt-1">
          <button
            onClick={(e) => {
              e.stopPropagation();
              onToggleStatus(!isStatusOpen);
            }}
            className={`${statusOption.color} hover:opacity-80 transition-opacity p-0.5 rounded focus:outline-none focus:ring-2 focus:ring-blue-500`}
            title={statusOption.label}
            aria-expanded={isStatusOpen}
            aria-haspopup="true"
          >
            <StatusIcon className="w-5 h-5" />
          </button>
          {isStatusOpen && (
            <div
              className={`absolute ${
                openUpward ? 'bottom-8' : 'top-7'
              } left-0 z-50 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-xl py-1 min-w-[160px] animate-in fade-in duration-100`}
            >
              {STATUS_OPTIONS.map(opt => {
                const Icon = opt.icon;
                const isSelected = task.status === opt.value;
                return (
                  <button
                    key={opt.value}
                    onClick={(e) => {
                      e.stopPropagation();
                      onStatusChange(task.id, opt.value);
                      onToggleStatus(false);
                    }}
                    className={`flex items-center gap-2 px-3 py-2 w-full text-left text-sm transition-colors ${
                      isSelected
                        ? 'bg-blue-50 dark:bg-blue-900/20 font-medium'
                        : 'hover:bg-gray-50 dark:hover:bg-gray-700'
                    }`}
                  >
                    <Icon className={`w-4 h-4 ${opt.color}`} />
                    <span className={isSelected ? 'text-blue-700 dark:text-blue-300' : 'text-gray-700 dark:text-gray-300'}>
                      {opt.label}
                    </span>
                  </button>
                );
              })}
            </div>
          )}
        </div>
        <div className="flex-1 min-w-0">
          <p
            className={`text-sm font-medium ${
              task.status === TASK_STATUSES.COMPLETED
                ? 'text-gray-500 dark:text-gray-400 line-through'
                : 'text-gray-900 dark:text-white'
            }`}
          >
            {task.title}
          </p>
          {task.description && (
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">{task.description}</p>
          )}
          {task.duration && (
            <span className="text-xs text-gray-400 flex items-center gap-1 mt-1">
              <Clock className="w-3 h-3" />
              {task.duration} min
            </span>
          )}
        </div>
        <div className="flex items-center gap-1 flex-shrink-0">
          <button
            onClick={() => setShowNotes(!showNotes)}
            className="p-1.5 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
            title="Notes"
          >
            <StickyNote className="w-4 h-4" />
          </button>
          <button
            onClick={() => onFlagRevision(task.id, 'task', task.title, task.dayNumber)}
            className="p-1.5 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-400 hover:text-amber-500"
            title="Flag for revision"
          >
            <Flag className="w-4 h-4" />
          </button>
        </div>
      </div>
      {showNotes && (
        <div className="mt-2 pl-0 sm:pl-8">
          <textarea
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            onBlur={() => onNotesChange(task.id, notes)}
            placeholder="Add notes..."
            className="w-full text-sm p-2 border border-gray-200 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-300 placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-blue-500 resize-none"
            rows={2}
          />
        </div>
      )}
    </div>
  );
}

function StudyBlock({ block, tasks, filter, onStatusChange, onNotesChange, onFlagRevision, onTimeRecorded }) {
  const [collapsed, setCollapsed] = useState(false);
  const [openStatusTaskId, setOpenStatusTaskId] = useState(null);
  const label = BLOCK_LABELS[block];
  const colors = BLOCK_COLORS[block];
  const duration = BLOCK_DURATIONS[block];

  const filteredTasks = useMemo(() => {
    if (filter === 'all') return tasks;
    if (filter === TASK_STATUSES.NOT_STARTED) {
      return tasks.filter(t => t.status !== TASK_STATUSES.COMPLETED && t.status !== TASK_STATUSES.SKIPPED);
    }
    return tasks.filter(t => t.status === filter);
  }, [tasks, filter]);

  const completed = tasks.filter(t => t.status === TASK_STATUSES.COMPLETED).length;
  const percent = calcPercentage(completed, tasks.length);

  const {
    getTimerForBlock,
    startTimer,
    pauseTimer,
    resumeTimer,
    stopTimer,
  } = useStudy();

  const timer = getTimerForBlock(block);
  const isThisBlockActive = timer.isActive;
  const isThisBlockRunning = timer.isRunning;

  const handleTimerToggle = () => {
    if (!isThisBlockActive) {
      startTimer(block);
    } else {
      stopTimer();
    }
  };

  const handlePauseResume = (e) => {
    e.stopPropagation();
    if (isThisBlockRunning) {
      pauseTimer();
    } else {
      resumeTimer();
    }
  };

  const formatTimerSeconds = (totalSeconds) => {
    const hrs = Math.floor(totalSeconds / 3600);
    const mins = Math.floor((totalSeconds % 3600) / 60);
    const secs = totalSeconds % 60;
    if (hrs > 0) {
      return `${String(hrs).padStart(2, '0')}:${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
    }
    return `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
  };

  return (
    <div
      className={`bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 transition-all ${
        openStatusTaskId ? 'relative z-30' : 'relative z-10'
      }`}
    >
      <div className={`border-l-4 ${colors.bg} rounded-xl`}>
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="w-full p-3 sm:p-4 flex items-center justify-between hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors gap-2"
        >
          <div className="flex items-center gap-2 sm:gap-3 min-w-0">
            <div>
              <h3 className="text-sm sm:text-base font-semibold text-gray-900 dark:text-white text-left truncate">{label}</h3>
              <p className="text-xs text-gray-500 dark:text-gray-400 text-left">
                {duration} min · {completed}/{tasks.length} tasks
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2 sm:gap-3 shrink-0">
            <div className="flex items-center gap-1.5 sm:gap-2">
              <div className="w-14 sm:w-20 bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                <div
                  className={`h-2 rounded-full transition-all ${colors.bg}`}
                  style={{ width: `${percent}%` }}
                />
              </div>
              <span className="text-xs font-semibold text-gray-600 dark:text-gray-300 min-w-[28px] text-right">{percent}%</span>
            </div>
            {collapsed ? <ChevronDown className="w-5 h-5 text-gray-400 shrink-0" /> : <ChevronUp className="w-5 h-5 text-gray-400 shrink-0" />}
          </div>
        </button>

        {!collapsed && (
          <div className="px-3 sm:px-4 pb-4 space-y-2">
            {/* Timer */}
            <div className="flex flex-wrap items-center gap-2 mb-3">
              <button
                onClick={handleTimerToggle}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs sm:text-sm font-medium transition-colors ${
                  isThisBlockActive
                    ? 'bg-red-100 hover:bg-red-200 dark:bg-red-900/30 dark:hover:bg-red-900/50 text-red-700 dark:text-red-400'
                    : `${colors.light} ${colors.text} hover:opacity-85`
                }`}
              >
                {isThisBlockActive ? <RotateCcw className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
                {isThisBlockActive ? 'Stop & Record' : 'Start Timer'}
              </button>

              {isThisBlockActive && (
                <>
                  <button
                    onClick={handlePauseResume}
                    className="flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-xs font-medium bg-gray-100 hover:bg-gray-200 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-300 transition-colors"
                  >
                    {isThisBlockRunning ? <Pause className="w-3 h-3" /> : <Play className="w-3 h-3" />}
                    {isThisBlockRunning ? 'Pause' : 'Resume'}
                  </button>
                  <span className={`text-xs sm:text-sm font-mono font-bold tabular-nums ${isThisBlockRunning ? 'text-green-600 dark:text-green-400 animate-pulse' : 'text-gray-500'}`}>
                    {formatTimerSeconds(timer.seconds)}
                  </span>
                </>
              )}
            </div>

            {filteredTasks.length > 0 ? (
              filteredTasks.map(task => (
                <TaskItem
                  key={task.id}
                  task={task}
                  isStatusOpen={openStatusTaskId === task.id}
                  onToggleStatus={(isOpen) => setOpenStatusTaskId(isOpen ? task.id : null)}
                  onStatusChange={onStatusChange}
                  onNotesChange={onNotesChange}
                  onFlagRevision={onFlagRevision}
                />
              ))
            ) : (
              <p className="text-sm text-gray-400 dark:text-gray-500 text-center py-4">
                {filter !== 'all' ? 'No tasks match this filter' : 'No tasks for this block'}
              </p>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default function TodaysPlan() {
  const {
    currentDayNumber,
    goToDay,
    getDayTasks,
    updateTaskStatus,
    updateTaskNotes,
    flagForRevision,
    addStudyTime,
    getMissedTasks,
    state,
    initializeDay,
  } = useStudy();

  const [dayNumber, setDayNumber] = useState(currentDayNumber);
  const [filter, setFilter] = useState('all');
  const [showMissed, setShowMissed] = useState(false);

  // Initialize day data if needed
  useMemo(() => {
    if (initializeDay) initializeDay(dayNumber);
  }, [dayNumber, initializeDay]);

  const tasks = useMemo(() => getDayTasks(dayNumber), [getDayTasks, dayNumber]);
  const missedTasks = useMemo(() => getMissedTasks(), [getMissedTasks]);

  const blockTasks = useMemo(() => {
    const result = {};
    Object.values(STUDY_BLOCKS).forEach(block => {
      result[block] = tasks.filter(t => t.block === block);
    });
    return result;
  }, [tasks]);

  const totalCompleted = tasks.filter(t => t.status === TASK_STATUSES.COMPLETED).length;
  const totalPercent = calcPercentage(totalCompleted, tasks.length);

  const handlePrevDay = () => {
    if (dayNumber > 1) {
      setDayNumber(dayNumber - 1);
    }
  };

  const handleNextDay = () => {
    setDayNumber(dayNumber + 1);
    if (initializeDay) initializeDay(dayNumber + 1);
  };

  const handleTimeRecorded = useCallback((block, minutes) => {
    addStudyTime(dayNumber, block, minutes);
  }, [addStudyTime, dayNumber]);

  const scrollToNextIncomplete = () => {
    const nextTask = tasks.find(
      t => t.status !== TASK_STATUSES.COMPLETED && t.status !== TASK_STATUSES.SKIPPED
    );
    if (nextTask) {
      const el = document.getElementById(`task-${nextTask.id}`);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'center' });
        el.classList.add('ring-2', 'ring-blue-500');
        setTimeout(() => el.classList.remove('ring-2', 'ring-blue-500'), 2000);
      }
    }
  };

  return (
    <div className="max-w-5xl mx-auto space-y-5 pb-32 md:pb-20 min-w-0">
      {/* Header with Day Selector */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 sm:gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white">
            Today&apos;s Plan
          </h1>
          <p className="text-gray-500 dark:text-gray-400 text-xs sm:text-sm mt-0.5">
            Week {Math.ceil(dayNumber / 5)} · {formatTime(240)} planned
          </p>
        </div>

        <div className="flex items-center justify-between w-full sm:w-auto gap-2">
          <div className="flex items-center gap-1.5 sm:gap-2">
            <button
              onClick={handlePrevDay}
              disabled={dayNumber <= 1}
              className="p-2 rounded-lg border border-gray-200 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-700 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
              aria-label="Previous day"
            >
              <ChevronLeft className="w-5 h-5 text-gray-600 dark:text-gray-400" />
            </button>
            <div className="px-3 sm:px-4 py-1.5 sm:py-2 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg min-w-[90px] sm:min-w-[100px] text-center shadow-xs">
              <span className="text-base sm:text-lg font-bold text-gray-900 dark:text-white">Day {dayNumber}</span>
            </div>
            <button
              onClick={handleNextDay}
              className="p-2 rounded-lg border border-gray-200 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
              aria-label="Next day"
            >
              <ChevronRight className="w-5 h-5 text-gray-600 dark:text-gray-400" />
            </button>
          </div>
          {dayNumber !== currentDayNumber && (
            <button
              onClick={() => {
                setDayNumber(currentDayNumber);
                goToDay(currentDayNumber);
              }}
              className="text-xs sm:text-sm font-medium text-blue-600 dark:text-blue-400 hover:underline px-2 py-1 rounded"
            >
              Go to current
            </button>
          )}
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-wrap items-center gap-2 sm:gap-3">
        <button
          onClick={scrollToNextIncomplete}
          className="flex-1 sm:flex-initial flex items-center justify-center gap-1.5 px-3.5 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-xs sm:text-sm font-medium shadow-xs"
        >
          <Play className="w-4 h-4" />
          Continue Learning
        </button>
        {missedTasks.length > 0 && (
          <button
            onClick={() => setShowMissed(!showMissed)}
            className="flex-1 sm:flex-initial flex items-center justify-center gap-1.5 px-3.5 py-2 bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-400 rounded-lg hover:bg-amber-200 dark:hover:bg-amber-900/50 transition-colors text-xs sm:text-sm font-medium"
          >
            <AlertTriangle className="w-4 h-4" />
            Review Missed ({missedTasks.length})
          </button>
        )}
      </div>

      {/* Filter Bar */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1 no-scrollbar">
        <Filter className="w-4 h-4 text-gray-400 flex-shrink-0" />
        {FILTERS.map(f => (
          <button
            key={f.key}
            onClick={() => setFilter(f.key)}
            className={`px-3 py-1.5 rounded-full text-xs sm:text-sm font-medium whitespace-nowrap transition-colors ${
              filter === f.key
                ? 'bg-blue-600 text-white'
                : 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700'
            }`}
          >
            {f.label}
          </button>
        ))}
      </div>

      {/* Missed Tasks Panel */}
      {showMissed && missedTasks.length > 0 && (
        <div className="bg-amber-50 dark:bg-amber-900/10 border border-amber-200 dark:border-amber-800 rounded-xl p-4 mb-2">
          <h3 className="text-sm font-semibold text-amber-800 dark:text-amber-400 mb-3 flex items-center gap-2">
            <AlertTriangle className="w-4 h-4" />
            Missed Tasks from Previous Days
          </h3>
          <div className="space-y-2 max-h-60 overflow-y-auto">
            {missedTasks.map(task => (
              <div
                key={task.id}
                className="flex items-center justify-between p-2 bg-white dark:bg-gray-800 rounded-lg"
              >
                <div className="flex items-center gap-2 min-w-0">
                  <div className={`w-2 h-2 rounded-full ${BLOCK_COLORS[task.block]?.bg || 'bg-gray-400'}`} />
                  <span className="text-sm text-gray-700 dark:text-gray-300 truncate">{task.title}</span>
                  <span className="text-xs text-gray-400 flex-shrink-0">Day {task.dayNumber}</span>
                </div>
                <div className="flex gap-1 flex-shrink-0 ml-2">
                  <button
                    onClick={() => updateTaskStatus(task.id, TASK_STATUSES.COMPLETED)}
                    className="p-1 text-green-500 hover:bg-green-50 dark:hover:bg-green-900/20 rounded"
                    title="Mark complete"
                  >
                    <CheckCircle2 className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => updateTaskStatus(task.id, TASK_STATUSES.SKIPPED)}
                    className="p-1 text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 rounded"
                    title="Skip"
                  >
                    <SkipForward className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Study Blocks */}
      {tasks.length > 0 ? (
        <div className="space-y-4">
          {Object.values(STUDY_BLOCKS).map(block => (
            <StudyBlock
              key={block}
              block={block}
              tasks={blockTasks[block] || []}
              filter={filter}
              onStatusChange={updateTaskStatus}
              onNotesChange={updateTaskNotes}
              onFlagRevision={flagForRevision}
              onTimeRecorded={handleTimeRecorded}
            />
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center py-16 text-center">
          <CheckCircle2 className="w-16 h-16 text-gray-300 dark:text-gray-600 mb-4" />
          <h3 className="text-lg font-semibold text-gray-600 dark:text-gray-400">No tasks for Day {dayNumber}</h3>
          <p className="text-sm text-gray-400 dark:text-gray-500 mt-1">
            This day hasn&apos;t been initialized with study content yet.
          </p>
        </div>
      )}

      {/* Summary Bar - Placed above mobile bottom nav on mobile, docked at bottom on desktop */}
      {tasks.length > 0 && (
        <div className="fixed bottom-16 lg:bottom-0 left-0 right-0 bg-white/95 dark:bg-gray-800/95 backdrop-blur border-t border-gray-200 dark:border-gray-700 px-3 sm:px-4 py-2.5 sm:py-3 lg:pl-72 z-20 shadow-lg">
          <div className="max-w-6xl mx-auto flex items-center justify-between gap-3">
            <div className="flex items-center gap-2 sm:gap-3 min-w-0 flex-1">
              <span className="text-xs sm:text-sm font-medium text-gray-700 dark:text-gray-300 truncate">
                Day {dayNumber} Progress
              </span>
              <div className="flex-1 max-w-[130px] sm:max-w-xs bg-gray-200 dark:bg-gray-700 rounded-full h-2 sm:h-2.5">
                <div
                  className="h-2 sm:h-2.5 rounded-full bg-blue-600 transition-all duration-300"
                  style={{ width: `${totalPercent}%` }}
                />
              </div>
            </div>
            <span className="text-xs sm:text-sm font-bold text-gray-900 dark:text-white shrink-0">
              {totalCompleted}/{tasks.length} ({totalPercent}%)
            </span>
          </div>
        </div>
      )}
    </div>
  );
}
