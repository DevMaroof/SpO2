import { useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { useStudy } from '../context/StudyContext';
import {
  STUDY_BLOCKS,
  BLOCK_LABELS,
  BLOCK_COLORS,
  TASK_STATUSES,
  formatTime,
  calcPercentage,
} from '../utils/helpers';
import {
  PieChart, Pie, Cell,
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend,
  ResponsiveContainer,
  LineChart, Line,
  AreaChart, Area,
} from 'recharts';
import {
  LayoutDashboard,
  CheckCircle2,
  Clock,
  Award,
  Flag,
  Flame,
  ChevronRight,
  BookOpen,
  AlertTriangle,
  TrendingUp,
  Calendar,
  Target,
} from 'lucide-react';

const CHART_COLORS = ['#3b82f6', '#22c55e', '#a855f7', '#f59e0b'];

export default function Dashboard() {
  const navigate = useNavigate();
  const {
    state,
    currentDayNumber,
    getStats,
    getDayTasks,
    getMissedTasks,
  } = useStudy();

  const stats = useMemo(() => getStats(), [getStats]);
  const todayTasks = useMemo(() => getDayTasks(currentDayNumber), [getDayTasks, currentDayNumber]);
  const missedTasks = useMemo(() => getMissedTasks(), [getMissedTasks]);
  const unresolvedFlags = useMemo(
    () => (state.revisionFlags || []).filter(f => !f.resolved),
    [state.revisionFlags]
  );

  // Streak calculation
  const streak = useMemo(() => {
    let count = 0;
    for (let d = currentDayNumber; d >= 1; d--) {
      const tasks = getDayTasks(d);
      if (tasks.length === 0) break;
      const completed = tasks.filter(t => t.status === TASK_STATUSES.COMPLETED).length;
      if (calcPercentage(completed, tasks.length) >= 50) {
        count++;
      } else if (d < currentDayNumber) {
        break;
      }
    }
    return count;
  }, [currentDayNumber, getDayTasks]);

  // Chart data: Today's completion by block (Pie)
  const pieData = useMemo(() => {
    const blocks = Object.values(STUDY_BLOCKS);
    return blocks.map((block, i) => {
      const blockTasks = todayTasks.filter(t => t.block === block);
      const completed = blockTasks.filter(t => t.status === TASK_STATUSES.COMPLETED).length;
      return {
        name: BLOCK_LABELS[block],
        value: completed,
        total: blockTasks.length,
        color: CHART_COLORS[i],
      };
    }).filter(d => d.total > 0);
  }, [todayTasks]);

  // Chart data: Subject progress (Bar)
  const barData = useMemo(() => [
    { name: 'Math', completion: stats.mathCompletion },
    { name: 'Python', completion: stats.pythonCompletion },
    { name: 'AI/ML', completion: stats.aimlCompletion },
    { name: 'Revision', completion: stats.revisionCompletion },
  ], [stats]);

  // Chart data: Weekly study time (Area)
  const areaData = useMemo(() => {
    const weeks = {};
    const totalWeeks = Math.max(stats.currentWeek, 1);
    for (let w = 1; w <= totalWeeks; w++) {
      weeks[w] = { week: `W${w}`, planned: 0, actual: 0 };
    }
    // Planned: 240 min per study day, 5 days per week
    for (let w = 1; w <= totalWeeks; w++) {
      const daysInWeek = Object.keys(state.studyDays).filter(k => {
        const day = state.studyDays[k];
        return day && day.week === w;
      }).length;
      weeks[w].planned = daysInWeek * 240;
    }
    // Actual from sessions
    (state.studySessions || []).forEach(s => {
      const w = Math.ceil(s.dayNumber / 5);
      if (weeks[w]) weeks[w].actual += s.minutes;
    });
    return Object.values(weeks);
  }, [state.studyDays, state.studySessions, stats.currentWeek]);

  // Chart data: Assessment scores trend (Line)
  const lineData = useMemo(() => {
    const dayScores = {};
    Object.values(state.answers || {}).forEach(a => {
      // Try to extract day from questionId pattern
      const match = a.questionId?.match(/day_(\d+)/);
      if (match) {
        const day = parseInt(match[1]);
        if (!dayScores[day]) dayScores[day] = { correct: 0, total: 0 };
        dayScores[day].total++;
        if (a.isCorrect) dayScores[day].correct++;
      }
    });
    return Object.entries(dayScores)
      .sort(([a], [b]) => a - b)
      .map(([day, s]) => ({
        day: `Day ${day}`,
        score: calcPercentage(s.correct, s.total),
      }));
  }, [state.answers]);

  // Upcoming topics
  const upcomingTopics = useMemo(() => {
    const topics = [];
    for (let d = currentDayNumber; d <= currentDayNumber + 3; d++) {
      const dayKey = `day_${d}`;
      const day = state.studyDays[dayKey];
      if (day) {
        if (day.mathLesson) topics.push({ day: d, subject: 'Math', topic: day.mathLesson.title || day.mathLesson.topic || `Day ${d} Math` });
        if (day.pythonLesson) topics.push({ day: d, subject: 'Python', topic: day.pythonLesson.title || day.pythonLesson.topic || `Day ${d} Python` });
      }
    }
    return topics.slice(0, 6);
  }, [state.studyDays, currentDayNumber]);

  // Block progress for today
  const blockProgress = useMemo(() => {
    return Object.values(STUDY_BLOCKS).map((block, i) => {
      const blockTasks = todayTasks.filter(t => t.block === block);
      const completed = blockTasks.filter(t => t.status === TASK_STATUSES.COMPLETED).length;
      return {
        block,
        label: BLOCK_LABELS[block],
        completed,
        total: blockTasks.length,
        percent: calcPercentage(completed, blockTasks.length),
        color: BLOCK_COLORS[block],
        chartColor: CHART_COLORS[i],
      };
    });
  }, [todayTasks]);

  const hasData = stats.totalTasks > 0;

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 p-4 md:p-6 lg:p-8">
      {/* Welcome Section */}
      <div className="mb-6">
        <div className="flex items-center justify-between flex-wrap gap-3">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
              <LayoutDashboard className="w-7 h-7 text-blue-500" />
              Study Dashboard
            </h1>
            <p className="text-gray-500 dark:text-gray-400 mt-1">
              Day {currentDayNumber} · Week {stats.currentWeek}
            </p>
          </div>
          <div className="flex items-center gap-2 bg-orange-100 dark:bg-orange-900/30 text-orange-700 dark:text-orange-400 px-4 py-2 rounded-xl font-semibold">
            <Flame className="w-5 h-5" />
            <span>{streak} day streak</span>
          </div>
        </div>
      </div>

      {/* Quick Stats Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <button
          onClick={() => navigate('/today')}
          className="bg-white dark:bg-gray-800 rounded-xl p-4 shadow-sm border border-gray-200 dark:border-gray-700 hover:shadow-md transition-shadow text-left"
        >
          <div className="flex items-center justify-between mb-2">
            <CheckCircle2 className="w-5 h-5 text-green-500" />
            <span className="text-xs font-medium text-gray-400">{stats.overallCompletion}%</span>
          </div>
          <p className="text-2xl font-bold text-gray-900 dark:text-white">
            {stats.completedTasks}/{stats.totalTasks}
          </p>
          <p className="text-sm text-gray-500 dark:text-gray-400">Tasks Completed</p>
        </button>

        <button
          onClick={() => navigate('/progress')}
          className="bg-white dark:bg-gray-800 rounded-xl p-4 shadow-sm border border-gray-200 dark:border-gray-700 hover:shadow-md transition-shadow text-left"
        >
          <div className="flex items-center justify-between mb-2">
            <Clock className="w-5 h-5 text-blue-500" />
            <span className="text-xs font-medium text-gray-400">total</span>
          </div>
          <p className="text-2xl font-bold text-gray-900 dark:text-white">
            {formatTime(stats.totalStudyTime)}
          </p>
          <p className="text-sm text-gray-500 dark:text-gray-400">Study Time</p>
        </button>

        <button
          onClick={() => navigate('/math-assessment')}
          className="bg-white dark:bg-gray-800 rounded-xl p-4 shadow-sm border border-gray-200 dark:border-gray-700 hover:shadow-md transition-shadow text-left"
        >
          <div className="flex items-center justify-between mb-2">
            <Award className="w-5 h-5 text-purple-500" />
            <span className="text-xs font-medium text-gray-400">{stats.totalAnswers} answered</span>
          </div>
          <p className="text-2xl font-bold text-gray-900 dark:text-white">
            {stats.assessmentScore}%
          </p>
          <p className="text-sm text-gray-500 dark:text-gray-400">Assessment Score</p>
        </button>

        <button
          onClick={() => navigate('/revision')}
          className="bg-white dark:bg-gray-800 rounded-xl p-4 shadow-sm border border-gray-200 dark:border-gray-700 hover:shadow-md transition-shadow text-left"
        >
          <div className="flex items-center justify-between mb-2">
            <Flag className="w-5 h-5 text-amber-500" />
            <span className="text-xs font-medium text-gray-400">pending</span>
          </div>
          <p className="text-2xl font-bold text-gray-900 dark:text-white">
            {stats.revisionFlags}
          </p>
          <p className="text-sm text-gray-500 dark:text-gray-400">Revision Items</p>
        </button>
      </div>

      {/* Today's Plan Summary */}
      {hasData && (
        <div className="bg-white dark:bg-gray-800 rounded-xl p-5 shadow-sm border border-gray-200 dark:border-gray-700 mb-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white flex items-center gap-2">
              <Calendar className="w-5 h-5 text-blue-500" />
              Today&apos;s Progress
            </h2>
            <button
              onClick={() => navigate('/today')}
              className="text-sm text-blue-600 dark:text-blue-400 hover:underline flex items-center gap-1"
            >
              View Plan <ChevronRight className="w-4 h-4" />
            </button>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
            {blockProgress.map(bp => (
              <div key={bp.block} className="flex items-center gap-3">
                <div className={`w-1 h-10 rounded-full ${bp.color.bg}`} />
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <p className="text-sm font-medium text-gray-700 dark:text-gray-300 truncate">{bp.label}</p>
                    <span className="text-xs text-gray-500 dark:text-gray-400 ml-2">
                      {bp.completed}/{bp.total}
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2 mt-1">
                    <div
                      className={`h-2 rounded-full transition-all ${bp.color.bg}`}
                      style={{ width: `${bp.percent}%` }}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        {/* Pie Chart: Today's completion by block */}
        <div className="bg-white dark:bg-gray-800 rounded-xl p-5 shadow-sm border border-gray-200 dark:border-gray-700">
          <h3 className="text-base font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
            <Target className="w-4 h-4 text-blue-500" />
            Today&apos;s Completion
          </h3>
          {pieData.length > 0 ? (
            <ResponsiveContainer width="100%" height={250}>
              <PieChart>
                <Pie
                  data={pieData}
                  cx="50%"
                  cy="50%"
                  innerRadius={50}
                  outerRadius={80}
                  paddingAngle={4}
                  dataKey="value"
                  label={({ name, value, total }) => `${name}: ${value}/${total}`}
                >
                  {pieData.map((entry, index) => (
                    <Cell key={entry.name} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{
                    backgroundColor: 'var(--tooltip-bg, #fff)',
                    border: '1px solid #e5e7eb',
                    borderRadius: '8px',
                  }}
                />
              </PieChart>
            </ResponsiveContainer>
          ) : (
            <div className="h-[250px] flex items-center justify-center text-gray-400 dark:text-gray-500">
              <div className="text-center">
                <Target className="w-10 h-10 mx-auto mb-2 opacity-50" />
                <p className="text-sm">No tasks for today yet</p>
              </div>
            </div>
          )}
        </div>

        {/* Bar Chart: Subject progress */}
        <div className="bg-white dark:bg-gray-800 rounded-xl p-5 shadow-sm border border-gray-200 dark:border-gray-700">
          <h3 className="text-base font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
            <TrendingUp className="w-4 h-4 text-green-500" />
            Subject Progress
          </h3>
          {hasData ? (
            <ResponsiveContainer width="100%" height={250}>
              <BarChart data={barData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                <XAxis dataKey="name" tick={{ fontSize: 12 }} />
                <YAxis domain={[0, 100]} tick={{ fontSize: 12 }} />
                <Tooltip
                  formatter={(value) => [`${value}%`, 'Completion']}
                  contentStyle={{
                    backgroundColor: '#fff',
                    border: '1px solid #e5e7eb',
                    borderRadius: '8px',
                  }}
                />
                <Bar dataKey="completion" radius={[6, 6, 0, 0]}>
                  {barData.map((entry, index) => (
                    <Cell key={entry.name} fill={CHART_COLORS[index]} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          ) : (
            <div className="h-[250px] flex items-center justify-center text-gray-400 dark:text-gray-500">
              <div className="text-center">
                <TrendingUp className="w-10 h-10 mx-auto mb-2 opacity-50" />
                <p className="text-sm">Complete tasks to see progress</p>
              </div>
            </div>
          )}
        </div>

        {/* Area Chart: Weekly study time */}
        <div className="bg-white dark:bg-gray-800 rounded-xl p-5 shadow-sm border border-gray-200 dark:border-gray-700">
          <h3 className="text-base font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
            <Clock className="w-4 h-4 text-purple-500" />
            Weekly Study Time
          </h3>
          {areaData.length > 0 && areaData.some(d => d.planned > 0 || d.actual > 0) ? (
            <ResponsiveContainer width="100%" height={250}>
              <AreaChart data={areaData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                <XAxis dataKey="week" tick={{ fontSize: 12 }} />
                <YAxis tick={{ fontSize: 12 }} />
                <Tooltip
                  formatter={(value) => [formatTime(value), '']}
                  contentStyle={{
                    backgroundColor: '#fff',
                    border: '1px solid #e5e7eb',
                    borderRadius: '8px',
                  }}
                />
                <Legend />
                <Area type="monotone" dataKey="planned" stroke="#a855f7" fill="#a855f740" name="Planned" />
                <Area type="monotone" dataKey="actual" stroke="#3b82f6" fill="#3b82f640" name="Actual" />
              </AreaChart>
            </ResponsiveContainer>
          ) : (
            <div className="h-[250px] flex items-center justify-center text-gray-400 dark:text-gray-500">
              <div className="text-center">
                <Clock className="w-10 h-10 mx-auto mb-2 opacity-50" />
                <p className="text-sm">Study time data will appear here</p>
              </div>
            </div>
          )}
        </div>

        {/* Line Chart: Assessment scores trend */}
        <div className="bg-white dark:bg-gray-800 rounded-xl p-5 shadow-sm border border-gray-200 dark:border-gray-700">
          <h3 className="text-base font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
            <Award className="w-4 h-4 text-amber-500" />
            Assessment Scores
          </h3>
          {lineData.length > 0 ? (
            <ResponsiveContainer width="100%" height={250}>
              <LineChart data={lineData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                <XAxis dataKey="day" tick={{ fontSize: 12 }} />
                <YAxis domain={[0, 100]} tick={{ fontSize: 12 }} />
                <Tooltip
                  formatter={(value) => [`${value}%`, 'Score']}
                  contentStyle={{
                    backgroundColor: '#fff',
                    border: '1px solid #e5e7eb',
                    borderRadius: '8px',
                  }}
                />
                <Line
                  type="monotone"
                  dataKey="score"
                  stroke="#f59e0b"
                  strokeWidth={2}
                  dot={{ r: 4, fill: '#f59e0b' }}
                  activeDot={{ r: 6 }}
                />
              </LineChart>
            </ResponsiveContainer>
          ) : (
            <div className="h-[250px] flex items-center justify-center text-gray-400 dark:text-gray-500">
              <div className="text-center">
                <Award className="w-10 h-10 mx-auto mb-2 opacity-50" />
                <p className="text-sm">Complete assessments to see scores</p>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Bottom Sections */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Upcoming Topics */}
        <div className="bg-white dark:bg-gray-800 rounded-xl p-5 shadow-sm border border-gray-200 dark:border-gray-700">
          <h3 className="text-base font-semibold text-gray-900 dark:text-white mb-3 flex items-center gap-2">
            <BookOpen className="w-4 h-4 text-blue-500" />
            Upcoming Topics
          </h3>
          {upcomingTopics.length > 0 ? (
            <ul className="space-y-2">
              {upcomingTopics.map((t, i) => (
                <li
                  key={i}
                  className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors"
                >
                  <span
                    className={`text-xs font-medium px-2 py-0.5 rounded-full ${
                      t.subject === 'Math'
                        ? 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400'
                        : 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400'
                    }`}
                  >
                    {t.subject}
                  </span>
                  <span className="text-sm text-gray-700 dark:text-gray-300 truncate flex-1">{t.topic}</span>
                  <span className="text-xs text-gray-400">Day {t.day}</span>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-sm text-gray-400 dark:text-gray-500 text-center py-6">
              No upcoming topics
            </p>
          )}
        </div>

        {/* Incomplete Tasks from Previous Days */}
        <div className="bg-white dark:bg-gray-800 rounded-xl p-5 shadow-sm border border-gray-200 dark:border-gray-700">
          <h3 className="text-base font-semibold text-gray-900 dark:text-white mb-3 flex items-center gap-2">
            <AlertTriangle className="w-4 h-4 text-amber-500" />
            Missed Tasks
            {missedTasks.length > 0 && (
              <span className="ml-auto text-xs bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-400 px-2 py-0.5 rounded-full">
                {missedTasks.length}
              </span>
            )}
          </h3>
          {missedTasks.length > 0 ? (
            <>
              <ul className="space-y-2 max-h-48 overflow-y-auto">
                {missedTasks.slice(0, 8).map(task => (
                  <li
                    key={task.id}
                    className="flex items-center gap-2 p-2 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700/50 text-sm"
                  >
                    <div className={`w-2 h-2 rounded-full ${BLOCK_COLORS[task.block]?.bg || 'bg-gray-400'}`} />
                    <span className="text-gray-700 dark:text-gray-300 truncate flex-1">{task.title}</span>
                    <span className="text-xs text-gray-400">D{task.dayNumber}</span>
                  </li>
                ))}
              </ul>
              {missedTasks.length > 8 && (
                <button
                  onClick={() => navigate('/today')}
                  className="mt-2 text-xs text-blue-600 dark:text-blue-400 hover:underline"
                >
                  +{missedTasks.length - 8} more
                </button>
              )}
            </>
          ) : (
            <p className="text-sm text-gray-400 dark:text-gray-500 text-center py-6">
              All caught up! 🎉
            </p>
          )}
        </div>

        {/* Revision Flags */}
        <div className="bg-white dark:bg-gray-800 rounded-xl p-5 shadow-sm border border-gray-200 dark:border-gray-700">
          <h3 className="text-base font-semibold text-gray-900 dark:text-white mb-3 flex items-center gap-2">
            <Flag className="w-4 h-4 text-red-500" />
            Flagged for Revision
            {unresolvedFlags.length > 0 && (
              <span className="ml-auto text-xs bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400 px-2 py-0.5 rounded-full">
                {unresolvedFlags.length}
              </span>
            )}
          </h3>
          {unresolvedFlags.length > 0 ? (
            <>
              <ul className="space-y-2 max-h-48 overflow-y-auto">
                {unresolvedFlags.slice(0, 8).map((flag, i) => (
                  <li
                    key={flag.itemId || i}
                    className="flex items-center gap-2 p-2 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700/50 text-sm"
                  >
                    <Flag className="w-3 h-3 text-red-400 flex-shrink-0" />
                    <span className="text-gray-700 dark:text-gray-300 truncate flex-1">
                      {flag.topic || flag.itemType || 'Flagged item'}
                    </span>
                    <span className="text-xs text-gray-400">D{flag.dayNumber}</span>
                  </li>
                ))}
              </ul>
              <button
                onClick={() => navigate('/revision')}
                className="mt-3 w-full text-sm text-center text-blue-600 dark:text-blue-400 hover:underline"
              >
                View all revision items
              </button>
            </>
          ) : (
            <p className="text-sm text-gray-400 dark:text-gray-500 text-center py-6">
              No items flagged for revision
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
