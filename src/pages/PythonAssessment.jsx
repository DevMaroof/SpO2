import { useState, useMemo } from 'react';
import { useStudy } from '../context/StudyContext';
import { TOTAL_STUDY_DAYS } from '../data/curriculum';
import {
  Terminal,
  ChevronLeft,
  ChevronRight,
  HelpCircle,
  Eye,
  EyeOff,
  CheckCircle2,
  XCircle,
  RotateCcw,
  Flag,
  Award,
  Copy,
  Check,
  Code2,
} from 'lucide-react';

export default function PythonAssessment() {
  const {
    state,
    currentDayNumber,
    goToDay,
    getDayPythonQuestions,
    saveAnswer,
    flagForRevision,
  } = useStudy();

  const [activeDay, setActiveDay] = useState(currentDayNumber);
  const [userCodes, setUserCodes] = useState({});
  const [revealedHints, setRevealedHints] = useState({});
  const [revealedSolutions, setRevealedSolutions] = useState({});
  const [copiedStates, setCopiedStates] = useState({});
  const [checkedState, setCheckedState] = useState({});

  const questions = useMemo(() => {
    return getDayPythonQuestions(activeDay);
  }, [getDayPythonQuestions, activeDay]);

  const answers = state.answers || {};

  const handleDayChange = (newDay) => {
    if (newDay < 1 || newDay > TOTAL_STUDY_DAYS) return;
    setActiveDay(newDay);
    goToDay(newDay);
    setUserCodes({});
    setRevealedHints({});
    setRevealedSolutions({});
    setCheckedState({});
  };

  const getDifficultyBadge = (difficulty) => {
    switch (difficulty) {
      case 'syntax':
        return <span className="status-chip bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-400">Syntax</span>;
      case 'practical':
        return <span className="status-chip bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400">Practical</span>;
      case 'debugging':
        return <span className="status-chip bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-400">Debugging</span>;
      case 'multi-concept':
        return <span className="status-chip bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-400">Multi-concept / AI</span>;
      default:
        return null;
    }
  };

  const handleCopyCode = async (qId, code) => {
    try {
      await navigator.clipboard.writeText(code);
      setCopiedStates(prev => ({ ...prev, [qId]: true }));
      setTimeout(() => {
        setCopiedStates(prev => ({ ...prev, [qId]: false }));
      }, 2000);
    } catch {
      // fallback
    }
  };

  const handleSelfAssess = (q, isCorrect) => {
    const code = (userCodes[q.id] || answers[q.id]?.answer || '').trim();
    setCheckedState(prev => ({
      ...prev,
      [q.id]: { checked: true, isCorrect },
    }));
    saveAnswer(q.id, code || 'Attempted', isCorrect, (answers[q.id]?.attemptNumber || 0) + 1);
  };

  const handleRetry = (qId) => {
    setUserCodes(prev => ({ ...prev, [qId]: '' }));
    setCheckedState(prev => {
      const copy = { ...prev };
      delete copy[qId];
      return copy;
    });
    setRevealedSolutions(prev => ({ ...prev, [qId]: false }));
  };

  const dayScore = useMemo(() => {
    let correct = 0;
    let attempted = 0;
    questions.forEach(q => {
      const saved = answers[q.id];
      const live = checkedState[q.id];
      if (live?.checked) {
        attempted++;
        if (live.isCorrect) correct++;
      } else if (saved) {
        attempted++;
        if (saved.isCorrect) correct++;
      }
    });
    return { correct, attempted, total: questions.length };
  }, [questions, answers, checkedState]);

  return (
    <div className="max-w-5xl mx-auto space-y-6 pb-12">
      {/* Header & Day Navigation */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-gray-200 dark:border-gray-800 pb-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-gray-100 flex items-center gap-3">
            <Terminal className="h-8 w-8 text-green-600 dark:text-green-400" />
            Daily Python Assessment
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mt-1">
            Write code, solve debugging challenges, test output, and verify against reference solutions.
          </p>
        </div>

        {/* Day Selector */}
        <div className="flex items-center gap-2 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-1.5 shadow-sm">
          <button
            onClick={() => handleDayChange(activeDay - 1)}
            disabled={activeDay <= 1}
            className="p-1 rounded hover:bg-gray-100 dark:hover:bg-gray-700 disabled:opacity-30 disabled:cursor-not-allowed"
          >
            <ChevronLeft className="h-5 w-5 text-gray-600 dark:text-gray-300" />
          </button>
          <div className="px-3 text-center">
            <span className="text-xs text-gray-500 dark:text-gray-400 block font-medium">Study Day</span>
            <span className="text-base font-bold text-gray-900 dark:text-gray-100">
              {activeDay} <span className="text-xs font-normal text-gray-500">/ {TOTAL_STUDY_DAYS}</span>
            </span>
          </div>
          <button
            onClick={() => handleDayChange(activeDay + 1)}
            disabled={activeDay >= TOTAL_STUDY_DAYS}
            className="p-1 rounded hover:bg-gray-100 dark:hover:bg-gray-700 disabled:opacity-30 disabled:cursor-not-allowed"
          >
            <ChevronRight className="h-5 w-5 text-gray-600 dark:text-gray-300" />
          </button>
        </div>
      </div>

      {/* Score Banner */}
      <div className="card p-4 flex flex-col sm:flex-row items-center justify-between gap-4 bg-gradient-to-r from-green-500/10 via-emerald-500/10 to-teal-500/10 border-green-200 dark:border-green-900">
        <div className="flex items-center gap-3">
          <Award className="h-8 w-8 text-green-600 dark:text-green-400" />
          <div>
            <h2 className="font-bold text-gray-900 dark:text-gray-100 text-base">
              Day {activeDay} Python Quiz Score
            </h2>
            <p className="text-xs text-gray-600 dark:text-gray-400">
              {dayScore.attempted} of {dayScore.total} problems attempted
            </p>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <div className="text-right">
            <span className="text-3xl font-black text-green-600 dark:text-green-400">
              {dayScore.correct}
            </span>
            <span className="text-lg text-gray-400 font-bold"> / {dayScore.total}</span>
          </div>
        </div>
      </div>

      {/* Questions List */}
      <div className="space-y-4">
        {questions.map((q) => {
          const currentCode = userCodes[q.id] !== undefined ? userCodes[q.id] : (answers[q.id]?.answer || '');
          const isChecked = checkedState[q.id]?.checked || answers[q.id] !== undefined;
          const isCorrect = checkedState[q.id] !== undefined ? checkedState[q.id].isCorrect : answers[q.id]?.isCorrect;
          const isHintRevealed = revealedHints[q.id];
          const isSolutionRevealed = revealedSolutions[q.id];

          return (
            <div
              key={q.id}
              className={`card p-5 space-y-4 border transition-all duration-200 ${
                isChecked
                  ? isCorrect
                    ? 'border-green-300 dark:border-green-800 bg-green-50/10'
                    : 'border-red-300 dark:border-red-800 bg-red-50/10'
                  : 'hover:border-gray-300 dark:hover:border-gray-600'
              }`}
            >
              {/* Question Header */}
              <div className="flex items-start justify-between gap-2">
                <div className="flex items-center gap-2">
                  <span className="font-bold text-gray-900 dark:text-gray-100 text-base">
                    Exercise {q.questionNumber}
                  </span>
                  {getDifficultyBadge(q.difficulty)}
                  <span className="text-xs text-gray-500 font-medium">({q.topic})</span>
                </div>

                <div className="flex items-center gap-2">
                  {isChecked && (
                    <span className={`flex items-center gap-1 text-xs font-bold ${
                      isCorrect ? 'text-green-600' : 'text-red-600'
                    }`}>
                      {isCorrect ? (
                        <>
                          <CheckCircle2 className="h-4 w-4" /> Passed
                        </>
                      ) : (
                        <>
                          <XCircle className="h-4 w-4" /> Failed / Review
                        </>
                      )}
                    </span>
                  )}
                  <button
                    onClick={() => flagForRevision(q.id, 'python_question', `Python Q${q.questionNumber} (Day ${activeDay})`, activeDay)}
                    className="text-gray-400 hover:text-amber-500 p-1"
                    title="Flag for revision"
                  >
                    <Flag className="h-4 w-4" />
                  </button>
                </div>
              </div>

              {/* Problem Description */}
              <p className="text-sm font-medium text-gray-800 dark:text-gray-200 leading-relaxed">
                {q.problem}
              </p>

              {/* Expected Output & Input specs */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs bg-gray-50 dark:bg-gray-800/40 p-2.5 rounded-lg border border-gray-200 dark:border-gray-700/60 font-mono">
                <div>
                  <span className="text-gray-500 dark:text-gray-400 block font-sans font-medium text-[11px]">Inputs:</span>
                  <span className="text-gray-800 dark:text-gray-200">{q.inputRequirements || 'None'}</span>
                </div>
                <div>
                  <span className="text-gray-500 dark:text-gray-400 block font-sans font-medium text-[11px]">Expected Output:</span>
                  <span className="text-green-600 dark:text-green-400 font-bold">{q.expectedOutput || 'Correct function execution'}</span>
                </div>
              </div>

              {/* Hint */}
              {isHintRevealed && (
                <div className="p-3 bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-900/40 rounded-lg text-xs text-amber-800 dark:text-amber-300 flex items-start gap-2">
                  <HelpCircle className="h-4 w-4 flex-shrink-0 mt-0.5 text-amber-600" />
                  <div>
                    <span className="font-bold">Hint: </span>
                    {q.hint}
                  </div>
                </div>
              )}

              {/* Code Workspace Textarea */}
              <div className="space-y-2">
                <div className="flex items-center justify-between text-xs text-gray-500">
                  <span className="flex items-center gap-1 font-mono">
                    <Code2 className="h-3.5 w-3.5" /> Python Code Editor:
                  </span>
                  <button
                    onClick={() => handleCopyCode(q.id, currentCode)}
                    className="hover:text-primary-600 flex items-center gap-1 text-[11px]"
                  >
                    {copiedStates[q.id] ? (
                      <>
                        <Check className="h-3 w-3 text-green-500" /> Copied!
                      </>
                    ) : (
                      <>
                        <Copy className="h-3 w-3" /> Copy Code
                      </>
                    )}
                  </button>
                </div>
                <textarea
                  rows={4}
                  placeholder="# Write your Python solution here..."
                  value={currentCode}
                  onChange={(e) => setUserCodes({ ...userCodes, [q.id]: e.target.value })}
                  className="input-field font-mono text-xs p-3 bg-gray-900 text-gray-100 dark:bg-black border-gray-700 resize-y"
                  spellCheck="false"
                />
              </div>

              {/* Control Actions & Self Evaluation */}
              <div className="flex flex-wrap items-center justify-between gap-3 text-xs pt-1 border-t border-gray-100 dark:border-gray-800">
                <div className="flex items-center gap-2">
                  {!isHintRevealed && (
                    <button
                      onClick={() => setRevealedHints({ ...revealedHints, [q.id]: true })}
                      className="btn-secondary text-xs py-1.5 px-2.5"
                    >
                      Hint
                    </button>
                  )}
                  <button
                    onClick={() => setRevealedSolutions(prev => ({ ...prev, [q.id]: !prev[q.id] }))}
                    className="text-primary-600 dark:text-primary-400 hover:underline flex items-center gap-1 font-medium"
                  >
                    {isSolutionRevealed ? (
                      <>
                        <EyeOff className="h-3.5 w-3.5" /> Hide Reference Solution
                      </>
                    ) : (
                      <>
                        <Eye className="h-3.5 w-3.5" /> Reveal Reference Solution
                      </>
                    )}
                  </button>
                  {isChecked && (
                    <button
                      onClick={() => handleRetry(q.id)}
                      className="text-gray-500 hover:text-gray-700 dark:hover:text-gray-300 flex items-center gap-1"
                    >
                      <RotateCcw className="h-3.5 w-3.5" /> Retry
                    </button>
                  )}
                </div>

                {/* Self-Assessment buttons */}
                <div className="flex items-center gap-2">
                  <span className="text-gray-400">Evaluate:</span>
                  <button
                    onClick={() => handleSelfAssess(q, true)}
                    className="px-2.5 py-1 rounded bg-green-100 dark:bg-green-950/40 text-green-700 dark:text-green-300 hover:bg-green-200 text-xs font-medium"
                  >
                    Passed
                  </button>
                  <button
                    onClick={() => handleSelfAssess(q, false)}
                    className="px-2.5 py-1 rounded bg-red-100 dark:bg-red-950/40 text-red-700 dark:text-red-300 hover:bg-red-200 text-xs font-medium"
                  >
                    Needs Fix
                  </button>
                </div>
              </div>

              {/* Revealed Reference Solution */}
              {isSolutionRevealed && (
                <div className="p-4 bg-gray-900 rounded-lg border border-gray-800 space-y-2 text-xs">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-gray-300">Reference Solution (Python):</span>
                    <button
                      onClick={() => handleCopyCode(`ref_${q.id}`, q.referenceSolution)}
                      className="text-gray-400 hover:text-white flex items-center gap-1 text-[11px]"
                    >
                      {copiedStates[`ref_${q.id}`] ? <Check className="h-3 w-3 text-green-400" /> : <Copy className="h-3 w-3" />}
                      Copy Reference
                    </button>
                  </div>
                  <pre className="font-mono text-green-400 p-2.5 bg-black/60 rounded overflow-x-auto text-xs">
                    {q.referenceSolution}
                  </pre>
                  <p className="text-gray-400 leading-relaxed text-xs">
                    <span className="font-semibold text-gray-300">Explanation: </span>
                    {q.explanation}
                  </p>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

