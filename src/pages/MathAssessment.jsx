import { useState, useMemo } from 'react';
import { useStudy } from '../context/StudyContext';
import { TOTAL_STUDY_DAYS } from '../data/curriculum';
import {
  Calculator,
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
  Sparkles,
  BookOpen,
} from 'lucide-react';

export default function MathAssessment() {
  const {
    state,
    currentDayNumber,
    goToDay,
    getDayMathQuestions,
    saveAnswer,
    flagForRevision,
  } = useStudy();

  const [activeDay, setActiveDay] = useState(currentDayNumber);
  const [userInputs, setUserInputs] = useState({});
  const [revealedHints, setRevealedHints] = useState({});
  const [revealedSolutions, setRevealedSolutions] = useState({});
  const [checkedState, setCheckedState] = useState({}); // { [qId]: { checked: bool, isCorrect: bool } }

  const questions = useMemo(() => {
    return getDayMathQuestions(activeDay);
  }, [getDayMathQuestions, activeDay]);

  // Load existing saved answers from state
  const answers = state.answers || {};

  const handleDayChange = (newDay) => {
    if (newDay < 1 || newDay > TOTAL_STUDY_DAYS) return;
    setActiveDay(newDay);
    goToDay(newDay);
    setUserInputs({});
    setRevealedHints({});
    setRevealedSolutions({});
    setCheckedState({});
  };

  const getDifficultyBadge = (difficulty) => {
    switch (difficulty) {
      case 'basic':
        return <span className="status-chip bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-400">Basic</span>;
      case 'standard':
        return <span className="status-chip bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400">Standard</span>;
      case 'multi-step':
        return <span className="status-chip bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-400">Multi-step</span>;
      case 'challenging':
        return <span className="status-chip bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-400">Challenging / AI</span>;
      default:
        return null;
    }
  };

  const handleCheckAnswer = (q) => {
    const input = (userInputs[q.id] || answers[q.id]?.answer || '').trim();
    if (!input) return;

    // Normalizing text for simple comparison (case-insensitive, remove spaces)
    const normInput = input.toLowerCase().replace(/\s+/g, '');
    const normCorrect = q.correctAnswer.toLowerCase().replace(/\s+/g, '');
    const isExactMatch = normInput === normCorrect;

    setCheckedState(prev => ({
      ...prev,
      [q.id]: { checked: true, isCorrect: isExactMatch },
    }));

    saveAnswer(q.id, input, isExactMatch, (answers[q.id]?.attemptNumber || 0) + 1);
  };

  const handleManualSelfAssess = (q, isCorrect) => {
    const input = (userInputs[q.id] || answers[q.id]?.answer || 'Self-assessed').trim();
    setCheckedState(prev => ({
      ...prev,
      [q.id]: { checked: true, isCorrect },
    }));
    saveAnswer(q.id, input, isCorrect, (answers[q.id]?.attemptNumber || 0) + 1);
  };

  const handleRetry = (qId) => {
    setUserInputs(prev => ({ ...prev, [qId]: '' }));
    setCheckedState(prev => {
      const copy = { ...prev };
      delete copy[qId];
      return copy;
    });
    setRevealedSolutions(prev => ({ ...prev, [qId]: false }));
  };

  // Score calculation for this day
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
            <Calculator className="h-8 w-8 text-blue-600 dark:text-blue-400" />
            Daily Mathematics Assessment
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mt-1">
            Attempt 10 calibrated questions every day (1-3 Basic, 4-6 Standard, 7-8 Multi-step, 9-10 Challenging/AI).
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
      <div className="card p-4 flex flex-col sm:flex-row items-center justify-between gap-4 bg-gradient-to-r from-blue-500/10 via-indigo-500/10 to-primary-500/10 border-blue-200 dark:border-blue-900">
        <div className="flex items-center gap-3">
          <Award className="h-8 w-8 text-blue-600 dark:text-blue-400" />
          <div>
            <h2 className="font-bold text-gray-900 dark:text-gray-100 text-base">
              Day {activeDay} Assessment Score
            </h2>
            <p className="text-xs text-gray-600 dark:text-gray-400">
              {dayScore.attempted} of {dayScore.total} questions attempted
            </p>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <div className="text-right">
            <span className="text-3xl font-black text-blue-600 dark:text-blue-400">
              {dayScore.correct}
            </span>
            <span className="text-lg text-gray-400 font-bold"> / {dayScore.total}</span>
          </div>
        </div>
      </div>

      {/* 10 Questions List */}
      <div className="space-y-4">
        {questions.map((q) => {
          const currentInput = userInputs[q.id] !== undefined ? userInputs[q.id] : (answers[q.id]?.answer || '');
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
                    Question {q.questionNumber}
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
                          <CheckCircle2 className="h-4 w-4" /> Correct
                        </>
                      ) : (
                        <>
                          <XCircle className="h-4 w-4" /> Incorrect
                        </>
                      )}
                    </span>
                  )}
                  <button
                    onClick={() => flagForRevision(q.id, 'math_question', `Math Q${q.questionNumber} (Day ${activeDay})`, activeDay)}
                    className="text-gray-400 hover:text-amber-500 p-1"
                    title="Flag for revision"
                  >
                    <Flag className="h-4 w-4" />
                  </button>
                </div>
              </div>

              {/* Problem Statement */}
              <p className="text-sm font-medium text-gray-800 dark:text-gray-200 leading-relaxed">
                {q.problem}
              </p>

              {/* Hint Box (if revealed) */}
              {isHintRevealed && (
                <div className="p-3 bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-900/40 rounded-lg text-xs text-amber-800 dark:text-amber-300 flex items-start gap-2">
                  <HelpCircle className="h-4 w-4 flex-shrink-0 mt-0.5 text-amber-600" />
                  <div>
                    <span className="font-bold">Hint: </span>
                    {q.hint}
                  </div>
                </div>
              )}

              {/* Answer Input Field & Controls */}
              <div className="space-y-3 pt-2">
                <div className="flex flex-col sm:flex-row gap-2">
                  <input
                    type="text"
                    disabled={isChecked && isCorrect}
                    placeholder="Enter your calculated answer (e.g. 5, 2/3, 0.75)..."
                    value={currentInput}
                    onChange={(e) => setUserInputs({ ...userInputs, [q.id]: e.target.value })}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') handleCheckAnswer(q);
                    }}
                    className="input-field text-sm font-mono flex-1"
                  />
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => handleCheckAnswer(q)}
                      disabled={!currentInput.trim() || (isChecked && isCorrect)}
                      className="btn-primary text-xs py-2 px-4 whitespace-nowrap"
                    >
                      Check Answer
                    </button>
                    {!isHintRevealed && (
                      <button
                        onClick={() => setRevealedHints({ ...revealedHints, [q.id]: true })}
                        className="btn-secondary text-xs py-2 px-3 whitespace-nowrap"
                      >
                        Hint
                      </button>
                    )}
                  </div>
                </div>

                {/* Feedback & Actions */}
                <div className="flex flex-wrap items-center justify-between gap-2 text-xs pt-1">
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => setRevealedSolutions(prev => ({ ...prev, [q.id]: !prev[q.id] }))}
                      className="text-primary-600 dark:text-primary-400 hover:underline flex items-center gap-1 font-medium"
                    >
                      {isSolutionRevealed ? (
                        <>
                          <EyeOff className="h-3.5 w-3.5" /> Hide Solution
                        </>
                      ) : (
                        <>
                          <Eye className="h-3.5 w-3.5" /> Reveal Solution & Steps
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

                  {/* Manual Self-Assessment buttons for multi-step reasoning */}
                  <div className="flex items-center gap-2">
                    <span className="text-gray-400">Self-assess:</span>
                    <button
                      onClick={() => handleManualSelfAssess(q, true)}
                      className="px-2 py-0.5 rounded bg-green-100 dark:bg-green-950/40 text-green-700 dark:text-green-300 hover:bg-green-200 text-[11px] font-medium"
                    >
                      Mark Correct
                    </button>
                    <button
                      onClick={() => handleManualSelfAssess(q, false)}
                      className="px-2 py-0.5 rounded bg-red-100 dark:bg-red-950/40 text-red-700 dark:text-red-300 hover:bg-red-200 text-[11px] font-medium"
                    >
                      Mark Incorrect
                    </button>
                  </div>
                </div>
              </div>

              {/* Revealed Solution & Step-by-Step Explanation */}
              {isSolutionRevealed && (
                <div className="p-4 bg-gray-50 dark:bg-gray-800/80 rounded-lg border border-gray-200 dark:border-gray-700 space-y-2 text-xs">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-gray-700 dark:text-gray-300">Reference Solution:</span>
                    <code className="px-2 py-0.5 bg-blue-100 dark:bg-blue-900/40 text-blue-800 dark:text-blue-300 font-mono font-bold rounded">
                      {q.correctAnswer}
                    </code>
                  </div>
                  <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                    <span className="font-semibold text-gray-800 dark:text-gray-200">Explanation: </span>
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
