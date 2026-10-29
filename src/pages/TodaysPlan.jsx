import { useState, useMemo, useRef, useCallback } from 'react';
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

function TaskItem({ task, onStatusChange, onNotesChange, onFlagRevision }) {
  const [showNotes, setShowNotes] = useState(false);
  const [notes, setNotes] = useState(task.notes || '');
  const [showStatus, setShowStatus] = useState(false);

  const statusOption = STATUS_OPTIONS.find(s => s.value === task.status) || STATUS_OPTIONS[0];
  const StatusIcon = statusOption.icon;

  return (
    <div
      id={`task-${task.id}`}
      className={`p-3 rounded-lg border transition-all ${
        task.status === TASK_STATUSES.COMPLETED
          ? 'bg-green-50 dark:bg-green-900/10 border-green-200 dark:border-green-800'
          : task.status === TASK_STATUSES.NEEDS_REVISION
          ? 'bg-amber-50 dark:bg-amber-900/10 border-amber-200 dark:border-amber-800'
          : 'bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700'
      }`}
    >
      <div className="flex items-start gap-3">
        <div className="relative mt-1">
          <button
            onClick={() => setShowStatus(!showStatus)}
            className={`${statusOption.color} hover:opacity-80`}
            title={statusOption.label}
          >
            <StatusIcon className="w-5 h-5" />
          </button>
          {showStatus && (
            <div className="absolute top-7 left-0 z-20 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-lg py-1 min-w-[160px]">
              {STATUS_OPTIONS.map(opt => {
                const Icon = opt.icon;
                return (
                  <button
                    key={opt.value}
                    onClick={() => {
                      onStatusChange(task.id, opt.value);
                      setShowStatus(false);
                    }}
                    className="flex items-center gap-2 px-3 py-2 hover:bg-gray-50 dark:hover:bg-gray-700 w-full text-left text-sm"
                  >
                    <Icon className={`w-4 h-4 ${opt.color}`} />
                    <span className="text-gray-700 dark:text-gray-300">{opt.label}</span>
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
        <div className="mt-2 pl-8">
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

  const [timerActive, setTimerActive] = useState(false);
  const [timerMinutes, setTimerMinutes] = useState(0);
  const [timerSeconds, setTimerSeconds] = useState(0);
  const timerRef = useRef(null);

  const startTimer = () => {
    if (timerActive) {
      clearInterval(timerRef.current);
      setTimerActive(false);
      if (timerMinutes > 0 || timerSeconds > 30) {
        const totalMin = timerMinutes + (timerSeconds >= 30 ? 1 : 0);
        if (onTimeRecorded && totalMin > 0) onTimeRecorded(block, totalMin);
      }
    } else {
      setTimerMinutes(0);
      setTimerSeconds(0);
      setTimerActive(true);
      timerRef.current = setInterval(() => {
        setTimerSeconds(prev => {
          if (prev >= 59) {
            setTimerMinutes(m => m + 1);
            return 0;
          }
          return prev + 1;
        });
      }, 1000);
    }
  };

  return (
    <div className={`bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 overflow-hidden`}>
      <div className={`border-l-4 ${colors.bg}`}>
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="w-full p-4 flex items-center justify-between hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors"
        >
          <div className="flex items-center gap-3">
            <div>
              <h3 className="text-base font-semibold text-gray-900 dark:text-white text-left">{label}</h3>
              <p className="text-xs text-gray-500 dark:text-gray-400 text-left">
                {duration} min · {completed}/{tasks.length} tasks
              </p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="hidden sm:flex items-center gap-2 min-w-[120px]">
              <div className="w-20 bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                <div
                  className={`h-2 rounded-full transition-all ${colors.bg}`}
                  style={{ width: `${percent}%` }}
                />
              </div>
              <span className="text-xs font-medium text-gray-500 dark:text-gray-400">{percent}%</span>
            </div>
            {collapsed ? <ChevronDown className="w-5 h-5 text-gray-400" /> : <ChevronUp className="w-5 h-5 text-gray-400" />}
          </div>
        </button>

        {!collapsed && (
          <div className="px-4 pb-4 space-y-2">
            {/* Timer */}
            <div className="flex items-center gap-2 mb-3">
              <button
                onClick={startTimer}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
                  timerActive
                    ? 'bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400'
                    : `${colors.light} ${colors.text}`
                }`}
              >
                {timerActive ? <RotateCcw className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
                {timerActive ? 'Stop' : 'Start Timer'}
              </button>
              {timerActive && (
                <span className="text-sm font-mono text-gray-600 dark:text-gray-400">
                  {String(timerMinutes).padStart(2, '0')}:{String(timerSeconds).padStart(2, '0')}
                </span>
              )}
            </div>

            {filteredTasks.length > 0 ? (
              filteredTasks.map(task => (
                <TaskItem
                  key={task.id}
                  task={task}
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
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 p-4 md:p-6 lg:p-8">
      {/* Header with Day Selector */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white">
            Today&apos;s Plan
          </h1>
          <p className="text-gray-500 dark:text-gray-400 text-sm mt-1">
            Week {Math.ceil(dayNumber / 5)} · {formatTime(240)} planned
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={handlePrevDay}
            disabled={dayNumber <= 1}
            className="p-2 rounded-lg border border-gray-200 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-700 disabled:opacity-40 disabled:cursor-not-allowed"
          >
            <ChevronLeft className="w-5 h-5 text-gray-600 dark:text-gray-400" />
          </button>
          <div className="px-4 py-2 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg min-w-[100px] text-center">
            <span className="text-lg font-bold text-gray-900 dark:text-white">Day {dayNumber}</span>
          </div>
          <button
            onClick={handleNextDay}
            className="p-2 rounded-lg border border-gray-200 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-700"
          >
            <ChevronRight className="w-5 h-5 text-gray-600 dark:text-gray-400" />
          </button>
          {dayNumber !== currentDayNumber && (
            <button
              onClick={() => {
                setDayNumber(currentDayNumber);
                goToDay(currentDayNumber);
              }}
              className="ml-2 text-sm text-blue-600 dark:text-blue-400 hover:underline"
            >
              Go to current
            </button>
          )}
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-wrap items-center gap-3 mb-4">
        <button
          onClick={scrollToNextIncomplete}
          className="flex items-center gap-1.5 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium"
        >
          <Play className="w-4 h-4" />
          Continue Learning
        </button>
        {missedTasks.length > 0 && (
          <button
            onClick={() => setShowMissed(!showMissed)}
            className="flex items-center gap-1.5 px-4 py-2 bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-400 rounded-lg hover:bg-amber-200 dark:hover:bg-amber-900/50 transition-colors text-sm font-medium"
          >
            <AlertTriangle className="w-4 h-4" />
            Review Missed ({missedTasks.length})
          </button>
        )}
      </div>

      {/* Filter Bar */}
      <div className="flex items-center gap-2 mb-5 overflow-x-auto pb-1">
        <Filter className="w-4 h-4 text-gray-400 flex-shrink-0" />
        {FILTERS.map(f => (
          <button
            key={f.key}
            onClick={() => setFilter(f.key)}
            className={`px-3 py-1.5 rounded-full text-sm font-medium whitespace-nowrap transition-colors ${
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
        <div className="bg-amber-50 dark:bg-amber-900/10 border border-amber-200 dark:border-amber-800 rounded-xl p-4 mb-5">
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

      {/* Summary Bar */}
      {tasks.length > 0 && (
        <div className="fixed bottom-0 left-0 right-0 bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 px-4 py-3 md:pl-72 z-10">
          <div className="max-w-6xl mx-auto flex items-center justify-between">
            <div className="flex items-center gap-3">
              <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                Day {dayNumber} Progress
              </span>
              <div className="w-32 bg-gray-200 dark:bg-gray-700 rounded-full h-2.5">
                <div
                  className="h-2.5 rounded-full bg-blue-600 transition-all"
                  style={{ width: `${totalPercent}%` }}
                />
              </div>
            </div>
            <span className="text-sm font-bold text-gray-900 dark:text-white">
              {totalCompleted}/{tasks.length} ({totalPercent}%)
            </span>
          </div>
        </div>
      )}
    </div>
  );
}
