import { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { useStudy } from '../context/StudyContext';
import {
  TASK_STATUSES,
  STUDY_BLOCKS,
  BLOCK_LABELS,
  formatTime,
  calcPercentage,
  formatDate,
} from '../utils/helpers';
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend,
  ResponsiveContainer,
  LineChart, Line,
  PieChart, Pie, Cell,
} from 'recharts';
import {
  BarChart3,
  Calendar,
  Clock,
  Award,
  AlertTriangle,
  Download,
  Upload,
  RotateCcw,
  CheckCircle2,
  Filter,
  ArrowRight,
  FileText,
  ShieldAlert,
  ChevronRight,
} from 'lucide-react';
import ConfirmDialog from '../components/common/ConfirmDialog';
import Modal from '../components/common/Modal';

export default function Progress() {
  const navigate = useNavigate();
  const {
    state,
    currentDayNumber,
    getStats,
    getMissedTasks,
    exportData,
    importData,
    resetData,
    updateTaskStatus,
  } = useStudy();

  const [activeTab, setActiveTab] = useState('overview'); // 'overview' | 'missed' | 'history' | 'settings'
  const [selectedBlockFilter, setSelectedBlockFilter] = useState('all');
  const [isResetConfirmOpen, setIsResetConfirmOpen] = useState(false);
  const [isImportModalOpen, setIsImportModalOpen] = useState(false);
  const [importJsonText, setImportJsonText] = useState('');
  const [importError, setImportError] = useState('');

  const stats = useMemo(() => getStats(), [getStats]);
  const missedTasks = useMemo(() => getMissedTasks(), [getMissedTasks]);

  const filteredMissedTasks = useMemo(() => {
    if (selectedBlockFilter === 'all') return missedTasks;
    return missedTasks.filter(t => t.block === selectedBlockFilter);
  }, [missedTasks, selectedBlockFilter]);

  // Assessment score trends data
  const scoreTrendData = useMemo(() => {
    const data = [];
    Object.keys(state.studyDays).forEach(dayKey => {
      const day = state.studyDays[dayKey];
      const qIds = [...(day.mathQuestionIds || []), ...(day.pythonQuestionIds || [])];
      let correct = 0;
      let total = qIds.length;
      qIds.forEach(id => {
        if (state.answers[id]?.isCorrect) correct++;
      });
      if (total > 0) {
        data.push({
          day: `Day ${day.dayNumber}`,
          score: Math.round((correct / total) * 100),
          correct,
          total,
        });
      }
    });
    return data.sort((a, b) => {
      const dA = parseInt(a.day.replace('Day ', ''), 10);
      const dB = parseInt(b.day.replace('Day ', ''), 10);
      return dA - dB;
    });
  }, [state.studyDays, state.answers]);

  // Study time by block data
  const timeByBlockData = useMemo(() => {
    const totals = {
      [STUDY_BLOCKS.MATHEMATICS]: 0,
      [STUDY_BLOCKS.PYTHON]: 0,
      [STUDY_BLOCKS.AIML]: 0,
      [STUDY_BLOCKS.REVISION]: 0,
    };
    (state.studySessions || []).forEach(s => {
      if (totals[s.block] !== undefined) {
        totals[s.block] += s.minutes;
      }
    });
    return [
      { name: 'Mathematics', minutes: totals[STUDY_BLOCKS.MATHEMATICS], color: '#3b82f6' },
      { name: 'Python', minutes: totals[STUDY_BLOCKS.PYTHON], color: '#22c55e' },
      { name: 'AI/ML Course', minutes: totals[STUDY_BLOCKS.AIML], color: '#a855f7' },
      { name: 'Revision', minutes: totals[STUDY_BLOCKS.REVISION], color: '#f59e0b' },
    ];
  }, [state.studySessions]);

  const handleExport = () => {
    const dataStr = exportData();
    const blob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `aiml_study_planner_backup_${new Date().toISOString().split('T')[0]}.json`;
    link.click();
    URL.revokeObjectURL(url);
  };

  const handleImportSubmit = (e) => {
    e.preventDefault();
    setImportError('');
    const success = importData(importJsonText);
    if (success) {
      setIsImportModalOpen(false);
      setImportJsonText('');
      window.location.reload();
    } else {
      setImportError('Invalid JSON data format. Please check the export file structure.');
    }
  };

  return (
    <div className="max-w-7xl mx-auto space-y-6 pb-12">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-gray-200 dark:border-gray-800 pb-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-gray-100 flex items-center gap-3">
            <BarChart3 className="h-8 w-8 text-primary-600 dark:text-primary-400" />
            Progress & Historical Analytics
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mt-1">
            Review your cumulative study milestones, manage missed work, inspect assessment performance trends, and manage backups.
          </p>
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-2">
          <button
            onClick={handleExport}
            className="btn-secondary text-xs flex items-center gap-1.5 py-1.5 px-3"
            title="Export JSON backup"
          >
            <Download className="h-4 w-4" /> Export Backup
          </button>
          <button
            onClick={() => setIsImportModalOpen(true)}
            className="btn-secondary text-xs flex items-center gap-1.5 py-1.5 px-3"
            title="Import JSON backup"
          >
            <Upload className="h-4 w-4" /> Restore
          </button>
          <button
            onClick={() => setIsResetConfirmOpen(true)}
            className="btn-danger text-xs flex items-center gap-1.5 py-1.5 px-3"
            title="Reset progress"
          >
            <RotateCcw className="h-4 w-4" /> Reset
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-gray-200 dark:border-gray-800 space-x-6 text-sm">
        <button
          onClick={() => setActiveTab('overview')}
          className={`pb-3 font-medium transition-colors border-b-2 ${
            activeTab === 'overview'
              ? 'border-primary-600 text-primary-600 dark:text-primary-400'
              : 'border-transparent text-gray-500 hover:text-gray-700 dark:hover:text-gray-300'
          }`}
        >
          Analytics Overview
        </button>
        <button
          onClick={() => setActiveTab('missed')}
          className={`pb-3 font-medium transition-colors border-b-2 flex items-center gap-2 ${
            activeTab === 'missed'
              ? 'border-primary-600 text-primary-600 dark:text-primary-400'
              : 'border-transparent text-gray-500 hover:text-gray-700 dark:hover:text-gray-300'
          }`}
        >
          Missed Tasks Queue
          {missedTasks.length > 0 && (
            <span className="px-1.5 py-0.5 rounded-full text-[10px] bg-red-100 text-red-700 dark:bg-red-900/50 dark:text-red-300 font-bold">
              {missedTasks.length}
            </span>
          )}
        </button>
        <button
          onClick={() => setActiveTab('history')}
          className={`pb-3 font-medium transition-colors border-b-2 ${
            activeTab === 'history'
              ? 'border-primary-600 text-primary-600 dark:text-primary-400'
              : 'border-transparent text-gray-500 hover:text-gray-700 dark:hover:text-gray-300'
          }`}
        >
          Daily Study Logs
        </button>
      </div>

      {/* TAB 1: OVERVIEW */}
      {activeTab === 'overview' && (
        <div className="space-y-6">
          {/* Key Metrics */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            <div className="card p-4 space-y-1">
              <span className="text-xs text-gray-500 font-medium">Overall Completion</span>
              <p className="text-2xl font-black text-primary-600">{stats.overallCompletion}%</p>
              <p className="text-[11px] text-gray-400">{stats.completedTasks} / {stats.totalTasks} tasks done</p>
            </div>
            <div className="card p-4 space-y-1">
              <span className="text-xs text-gray-500 font-medium">Recorded Study Time</span>
              <p className="text-2xl font-black text-emerald-600">{formatTime(stats.totalStudyTime)}</p>
              <p className="text-[11px] text-gray-400">Target: 4h / day</p>
            </div>
            <div className="card p-4 space-y-1">
              <span className="text-xs text-gray-500 font-medium">Assessment Accuracy</span>
              <p className="text-2xl font-black text-indigo-600">{stats.assessmentScore}%</p>
              <p className="text-[11px] text-gray-400">{stats.correctAnswers} / {stats.totalAnswers} questions</p>
            </div>
            <div className="card p-4 space-y-1">
              <span className="text-xs text-gray-500 font-medium">Active Missed Tasks</span>
              <p className="text-2xl font-black text-amber-500">{missedTasks.length}</p>
              <p className="text-[11px] text-gray-400">Preserved for review</p>
            </div>
          </div>

          {/* Charts Row */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Assessment Score History Chart */}
            <div className="card p-5 space-y-4">
              <h3 className="text-sm font-bold text-gray-900 dark:text-gray-100 flex items-center gap-2">
                <Award className="h-4 w-4 text-primary-500" />
                Assessment Score Trends Over Time
              </h3>
              {scoreTrendData.length === 0 ? (
                <div className="h-64 flex flex-col items-center justify-center text-gray-400 text-xs">
                  <FileText className="h-8 w-8 mb-2 opacity-50" />
                  No assessment attempts recorded yet.
                </div>
              ) : (
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={scoreTrendData}>
                      <CartesianGrid strokeDasharray="3 3" opacity={0.2} />
                      <XAxis dataKey="day" tick={{ fontSize: 11 }} />
                      <YAxis domain={[0, 100]} tick={{ fontSize: 11 }} unit="%" />
                      <Tooltip />
                      <Line type="monotone" dataKey="score" stroke="#3b82f6" strokeWidth={2.5} dot={{ r: 4 }} name="Score %" />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              )}
            </div>

            {/* Time Distribution By Block */}
            <div className="card p-5 space-y-4">
              <h3 className="text-sm font-bold text-gray-900 dark:text-gray-100 flex items-center gap-2">
                <Clock className="h-4 w-4 text-emerald-500" />
                Recorded Study Time Distribution (Minutes)
              </h3>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={timeByBlockData}>
                    <CartesianGrid strokeDasharray="3 3" opacity={0.2} />
                    <XAxis dataKey="name" tick={{ fontSize: 10 }} />
                    <YAxis tick={{ fontSize: 11 }} />
                    <Tooltip formatter={(val) => `${val} mins`} />
                    <Bar dataKey="minutes" fill="#10b981" radius={[4, 4, 0, 0]} name="Minutes Studied" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: MISSED TASKS */}
      {activeTab === 'missed' && (
        <div className="space-y-4">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 bg-amber-50 dark:bg-amber-950/20 p-4 rounded-lg border border-amber-200 dark:border-amber-900/40">
            <div>
              <h3 className="text-sm font-bold text-amber-800 dark:text-amber-300 flex items-center gap-2">
                <AlertTriangle className="h-4 w-4" />
                Missed Work Preservation System
              </h3>
              <p className="text-xs text-amber-700 dark:text-amber-400 mt-0.5">
                In strict accordance with our curriculum design principles, missed tasks are never silently deleted or rolled into the 4-hour daily schedule.
              </p>
            </div>
            {/* Filter buttons */}
            <div className="flex items-center gap-1.5">
              <span className="text-xs text-gray-500">Block:</span>
              {['all', 'mathematics', 'python', 'aiml', 'revision'].map(b => (
                <button
                  key={b}
                  onClick={() => setSelectedBlockFilter(b)}
                  className={`px-2 py-0.5 rounded text-[11px] font-medium transition-colors ${
                    selectedBlockFilter === b
                      ? 'bg-amber-600 text-white'
                      : 'bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-400 border border-gray-200 dark:border-gray-700'
                  }`}
                >
                  {b.charAt(0).toUpperCase() + b.slice(1)}
                </button>
              ))}
            </div>
          </div>

          {filteredMissedTasks.length === 0 ? (
            <div className="card p-12 text-center space-y-3">
              <CheckCircle2 className="h-12 w-12 text-green-500 mx-auto" />
              <h3 className="text-base font-bold text-gray-900 dark:text-gray-100">All Caught Up!</h3>
              <p className="text-xs text-gray-500 max-w-sm mx-auto">
                You have no outstanding incomplete tasks from previous study days. Excellent discipline!
              </p>
            </div>
          ) : (
            <div className="space-y-3">
              {filteredMissedTasks.map(task => (
                <div
                  key={task.id}
                  className="card p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 border-l-4 border-l-amber-500"
                >
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-bold px-2 py-0.5 rounded bg-amber-100 dark:bg-amber-900/40 text-amber-800 dark:text-amber-300">
                        Day {task.dayNumber}
                      </span>
                      <h4 className="font-semibold text-sm text-gray-900 dark:text-gray-100">
                        {task.title}
                      </h4>
                    </div>
                    <p className="text-xs text-gray-600 dark:text-gray-400">{task.description}</p>
                  </div>

                  <div className="flex items-center gap-2 flex-shrink-0">
                    <button
                      onClick={() => updateTaskStatus(task.id, TASK_STATUSES.COMPLETED)}
                      className="btn-success text-xs py-1.5 px-3 flex items-center gap-1"
                    >
                      <CheckCircle2 className="h-3.5 w-3.5" /> Complete Now
                    </button>
                    <button
                      onClick={() => navigate('/today')}
                      className="btn-secondary text-xs py-1.5 px-2.5"
                    >
                      View Day
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* TAB 3: DAILY STUDY LOGS */}
      {activeTab === 'history' && (
        <div className="space-y-4">
          <div className="card overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-gray-50 dark:bg-gray-800 text-gray-500 border-b border-gray-200 dark:border-gray-700">
                  <tr>
                    <th className="p-3">Day</th>
                    <th className="p-3">Math Topic</th>
                    <th className="p-3">Python Topic</th>
                    <th className="p-3">Tasks</th>
                    <th className="p-3">Status</th>
                    <th className="p-3 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 dark:divide-gray-800">
                  {Object.keys(state.studyDays).map(dayKey => {
                    const day = state.studyDays[dayKey];
                    const dayTasks = (day.taskIds || []).map(id => state.tasks[id]).filter(Boolean);
                    const completed = dayTasks.filter(t => t.status === TASK_STATUSES.COMPLETED).length;
                    const percent = dayTasks.length > 0 ? Math.round((completed / dayTasks.length) * 100) : 0;

                    return (
                      <tr key={dayKey} className="hover:bg-gray-50/50 dark:hover:bg-gray-800/50">
                        <td className="p-3 font-bold text-gray-900 dark:text-gray-100">
                          Day {day.dayNumber}
                        </td>
                        <td className="p-3 text-gray-700 dark:text-gray-300">
                          {day.mathLesson?.topic || 'Arithmetic'}
                        </td>
                        <td className="p-3 text-gray-700 dark:text-gray-300">
                          {day.pythonLesson?.topic || 'Fundamentals'}
                        </td>
                        <td className="p-3">
                          {completed} / {dayTasks.length} ({percent}%)
                        </td>
                        <td className="p-3">
                          {percent === 100 ? (
                            <span className="status-chip bg-green-100 text-green-700 dark:bg-green-950/40 dark:text-green-300">
                              Completed
                            </span>
                          ) : (
                            <span className="status-chip bg-amber-100 text-amber-700 dark:bg-amber-950/40 dark:text-amber-300">
                              In Progress
                            </span>
                          )}
                        </td>
                        <td className="p-3 text-right">
                          <button
                            onClick={() => navigate('/today')}
                            className="text-primary-600 dark:text-primary-400 font-medium hover:underline inline-flex items-center gap-1"
                          >
                            Open Day <ChevronRight className="h-3 w-3" />
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* Confirm Reset Dialog */}
      <ConfirmDialog
        isOpen={isResetConfirmOpen}
        onConfirm={() => {
          resetData();
          setIsResetConfirmOpen(false);
          window.location.reload();
        }}
        onCancel={() => setIsResetConfirmOpen(false)}
        title="Reset All Progress?"
        message="This will completely clear your local study records, question answers, notes, and task progress. Export a backup first if you wish to preserve your data."
        confirmLabel="Yes, Reset Everything"
        danger={true}
      />

      {/* Import Backup Modal */}
      <Modal
        isOpen={isImportModalOpen}
        onClose={() => setIsImportModalOpen(false)}
        title="Restore Data from Backup"
        size="md"
      >
        <form onSubmit={handleImportSubmit} className="space-y-4">
          <p className="text-xs text-gray-600 dark:text-gray-400">
            Paste the raw JSON from a previous backup file to restore all tasks, study sessions, question answers, and notes.
          </p>
          <textarea
            rows={8}
            required
            value={importJsonText}
            onChange={(e) => setImportJsonText(e.target.value)}
            placeholder="Paste exported JSON here..."
            className="input-field text-xs font-mono resize-none"
          />
          {importError && (
            <p className="text-xs text-red-600 font-medium">{importError}</p>
          )}
          <div className="flex justify-end gap-2 pt-2">
            <button
              type="button"
              onClick={() => setIsImportModalOpen(false)}
              className="btn-secondary text-xs"
            >
              Cancel
            </button>
            <button type="submit" className="btn-primary text-xs">
              Restore Data
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
}

