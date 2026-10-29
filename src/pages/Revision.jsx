import { useState, useMemo } from 'react';
import { useStudy } from '../context/StudyContext';
import { TOTAL_STUDY_DAYS } from '../data/curriculum';
import {
  BookOpen,
  ChevronLeft,
  ChevronRight,
  Calculator,
  Code2,
  AlertTriangle,
  Brain,
  CheckSquare,
  Square,
  Save,
  HelpCircle,
  Eye,
  EyeOff,
  Flag,
  CheckCircle2,
  Sparkles,
} from 'lucide-react';

export default function Revision() {
  const {
    state,
    currentDayNumber,
    goToDay,
    saveRevisionNotes,
    flagForRevision,
  } = useStudy();

  const [activeDay, setActiveDay] = useState(currentDayNumber);
  const [personalNotes, setPersonalNotes] = useState(
    state.revisionNotes[activeDay]?.notes || ''
  );
  const [savedSuccess, setSavedSuccess] = useState(false);
  const [revealedAnswers, setRevealedAnswers] = useState({});
  const [userAnswers, setUserAnswers] = useState({});
  const [checklistState, setChecklistState] = useState({});

  // Current day data from studyDays
  const dayKey = `day_${activeDay}`;
  const dayData = state.studyDays[dayKey];
  const revision = dayData?.revision;
  const mathLesson = dayData?.mathLesson;
  const pythonLesson = dayData?.pythonLesson;

  // Handle Day navigation
  const handleDayChange = (newDay) => {
    if (newDay < 1 || newDay > TOTAL_STUDY_DAYS) return;
    setActiveDay(newDay);
    goToDay(newDay);
    setPersonalNotes(state.revisionNotes[newDay]?.notes || '');
    setRevealedAnswers({});
    setUserAnswers({});
  };

  const handleSaveNotes = () => {
    saveRevisionNotes(activeDay, { notes: personalNotes });
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 2000);
  };

  const toggleChecklist = (index) => {
    setChecklistState(prev => ({
      ...prev,
      [`${activeDay}_${index}`]: !prev[`${activeDay}_${index}`],
    }));
  };

  const toggleRevealAnswer = (qIdx) => {
    setRevealedAnswers(prev => ({
      ...prev,
      [qIdx]: !prev[qIdx],
    }));
  };

  const activeFlags = useMemo(() => {
    return (state.revisionFlags || []).filter(f => !f.resolved);
  }, [state.revisionFlags]);

  return (
    <div className="max-w-7xl mx-auto space-y-6 pb-12">
      {/* Header and Day Selector */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-gray-200 dark:border-gray-800 pb-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-gray-100 flex items-center gap-3">
            <BookOpen className="h-8 w-8 text-amber-500" />
            Daily Revision & Recall
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mt-1">
            Consolidate your daily learning with active recall, formula sheets, syntax patterns, and self-assessment.
          </p>
        </div>

        {/* Day Selector */}
        <div className="flex items-center gap-2 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-1.5 shadow-sm">
          <button
            onClick={() => handleDayChange(activeDay - 1)}
            disabled={activeDay <= 1}
            className="p-1 rounded hover:bg-gray-100 dark:hover:bg-gray-700 disabled:opacity-30 disabled:cursor-not-allowed"
            title="Previous Day"
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
            title="Next Day"
          >
            <ChevronRight className="h-5 w-5 text-gray-600 dark:text-gray-300" />
          </button>
        </div>
      </div>

      {/* Main Revision Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column (2 Cols): Math, Python & AI/ML Connections */}
        <div className="lg:col-span-2 space-y-6">
          {/* Math Summary & Formulas */}
          <div className="card p-5 space-y-4 border-l-4 border-l-blue-500">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-bold text-gray-900 dark:text-gray-100 flex items-center gap-2">
                <Calculator className="h-5 w-5 text-blue-500" />
                Mathematics Summary & Key Formulas
              </h2>
              <button
                onClick={() => flagForRevision(`math_rev_${activeDay}`, 'concept', `Math Day ${activeDay}`, activeDay)}
                className="text-xs text-gray-500 hover:text-amber-500 flex items-center gap-1"
              >
                <Flag className="h-3.5 w-3.5" />
                Flag for Later
              </button>
            </div>
            <p className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed bg-blue-50/50 dark:bg-blue-950/20 p-3 rounded-lg border border-blue-100 dark:border-blue-900/30">
              {revision?.mathSummary || mathLesson?.explanation?.slice(0, 300) || 'Review key algebraic operations and principles.'}
            </p>

            {/* Formulas Table */}
            {revision?.formulas && revision.formulas.length > 0 && (
              <div className="space-y-2">
                <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Formulas to Memorize</p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {revision.formulas.map((f, i) => (
                    <div key={i} className="p-3 bg-gray-50 dark:bg-gray-900/50 rounded-lg border border-gray-200 dark:border-gray-800">
                      <span className="text-xs font-medium text-gray-500 block">{f.name}</span>
                      <code className="text-sm font-bold text-blue-600 dark:text-blue-400 block mt-1 font-mono">
                        {f.formula}
                      </code>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Python Syntax & Patterns */}
          <div className="card p-5 space-y-4 border-l-4 border-l-green-500">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-bold text-gray-900 dark:text-gray-100 flex items-center gap-2">
                <Code2 className="h-5 w-5 text-green-500" />
                Python Syntax & Coding Patterns
              </h2>
              <button
                onClick={() => flagForRevision(`py_rev_${activeDay}`, 'concept', `Python Day ${activeDay}`, activeDay)}
                className="text-xs text-gray-500 hover:text-amber-500 flex items-center gap-1"
              >
                <Flag className="h-3.5 w-3.5" />
                Flag for Later
              </button>
            </div>

            {revision?.pythonSyntax && revision.pythonSyntax.length > 0 && (
              <div className="space-y-2">
                {revision.pythonSyntax.map((item, i) => (
                  <div key={i} className="flex flex-col sm:flex-row sm:items-center justify-between p-2.5 bg-gray-50 dark:bg-gray-900/50 rounded-lg border border-gray-200 dark:border-gray-800 text-xs">
                    <span className="font-medium text-gray-700 dark:text-gray-300 mb-1 sm:mb-0">{item.label}</span>
                    <code className="bg-gray-200 dark:bg-gray-800 px-2 py-1 rounded font-mono text-green-600 dark:text-green-400 font-semibold">
                      {item.syntax}
                    </code>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Common Mistakes & AI Connection */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="card p-4 space-y-2 border-t-4 border-t-red-500">
              <h3 className="text-sm font-bold text-red-600 dark:text-red-400 flex items-center gap-1.5">
                <AlertTriangle className="h-4 w-4" />
                Common Traps & Mistakes
              </h3>
              <ul className="text-xs text-gray-600 dark:text-gray-400 space-y-1.5 list-disc list-inside">
                {revision?.commonMistakes?.map((m, i) => (
                  <li key={i}>{m}</li>
                )) || <li>Always double-check data types and off-by-one boundary cases.</li>}
              </ul>
            </div>

            <div className="card p-4 space-y-2 border-t-4 border-t-purple-500">
              <h3 className="text-sm font-bold text-purple-600 dark:text-purple-400 flex items-center gap-1.5">
                <Brain className="h-4 w-4" />
                AI/ML Practical Connection
              </h3>
              <p className="text-xs text-gray-600 dark:text-gray-400 leading-relaxed">
                {revision?.aimlConnections || 'Foundations taught here directly scale to neural network tensor manipulations.'}
              </p>
            </div>
          </div>

          {/* 5 Short Recall Questions */}
          <div className="card p-5 space-y-4">
            <div className="flex items-center justify-between border-b border-gray-200 dark:border-gray-800 pb-2">
              <h2 className="text-base font-bold text-gray-900 dark:text-gray-100 flex items-center gap-2">
                <HelpCircle className="h-5 w-5 text-amber-500" />
                Active Recall (5 Daily Questions)
              </h2>
              <span className="text-xs text-gray-500">Test mental retention</span>
            </div>

            <div className="space-y-3">
              {(revision?.recallQuestions || []).map((rq, idx) => (
                <div key={idx} className="p-3 bg-gray-50 dark:bg-gray-800/40 rounded-lg border border-gray-200 dark:border-gray-700/60 space-y-2">
                  <div className="flex items-start justify-between gap-2">
                    <p className="text-sm font-medium text-gray-900 dark:text-gray-100">
                      <span className="text-primary-600 font-bold mr-1">Q{idx + 1}.</span> {rq.question}
                    </p>
                    <button
                      onClick={() => toggleRevealAnswer(idx)}
                      className="text-xs flex items-center gap-1 text-primary-600 dark:text-primary-400 hover:underline flex-shrink-0"
                    >
                      {revealedAnswers[idx] ? (
                        <>
                          <EyeOff className="h-3.5 w-3.5" /> Hide Answer
                        </>
                      ) : (
                        <>
                          <Eye className="h-3.5 w-3.5" /> Reveal Answer
                        </>
                      )}
                    </button>
                  </div>

                  <input
                    type="text"
                    placeholder="Type your answer from memory..."
                    value={userAnswers[idx] || ''}
                    onChange={(e) => setUserAnswers({ ...userAnswers, [idx]: e.target.value })}
                    className="input-field text-xs py-1.5"
                  />

                  {revealedAnswers[idx] && (
                    <div className="p-2 bg-green-50 dark:bg-green-950/20 border border-green-200 dark:border-green-800/40 rounded text-xs text-green-800 dark:text-green-300">
                      <span className="font-bold">Correct Answer: </span>
                      {rq.answer}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column (1 Col): Checklist, Notes & Revision Queue */}
        <div className="space-y-6">
          {/* Self-Assessment Checklist */}
          <div className="card p-5 space-y-3">
            <h3 className="text-sm font-bold text-gray-900 dark:text-gray-100 flex items-center gap-2">
              <CheckSquare className="h-4 w-4 text-emerald-500" />
              Self-Assessment Checklist
            </h3>
            <div className="space-y-2">
              {(revision?.checklist || [
                'I understand the key theory presented today.',
                'I practiced writing the Python code examples.',
                'I attempted today\'s assessment questions.',
              ]).map((item, idx) => {
                const isChecked = checklistState[`${activeDay}_${idx}`] || false;
                return (
                  <button
                    key={idx}
                    onClick={() => toggleChecklist(idx)}
                    className="w-full text-left flex items-start gap-2.5 p-2 rounded hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors"
                  >
                    {isChecked ? (
                      <CheckCircle2 className="h-4 w-4 text-emerald-500 flex-shrink-0 mt-0.5" />
                    ) : (
                      <Square className="h-4 w-4 text-gray-400 flex-shrink-0 mt-0.5" />
                    )}
                    <span className={`text-xs ${isChecked ? 'line-through text-gray-400' : 'text-gray-700 dark:text-gray-300'}`}>
                      {item}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Personal Revision Notes */}
          <div className="card p-5 space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-bold text-gray-900 dark:text-gray-100">
                Personal Daily Notes
              </h3>
              {savedSuccess && (
                <span className="text-xs text-green-600 font-medium animate-pulse">Saved!</span>
              )}
            </div>
            <textarea
              rows={8}
              value={personalNotes}
              onChange={(e) => setPersonalNotes(e.target.value)}
              placeholder="Record your breakthroughs, custom explanations, mental models, or notes for Day..."
              className="input-field text-xs font-mono resize-none"
            />
            <button
              onClick={handleSaveNotes}
              className="btn-primary w-full text-xs flex items-center justify-center gap-1.5 py-2"
            >
              <Save className="h-3.5 w-3.5" />
              Save Day {activeDay} Notes
            </button>
          </div>

          {/* Active Revision Queue from Flags */}
          <div className="card p-5 space-y-3">
            <h3 className="text-sm font-bold text-gray-900 dark:text-gray-100 flex items-center gap-2">
              <Flag className="h-4 w-4 text-amber-500" />
              Flagged for Review ({activeFlags.length})
            </h3>
            {activeFlags.length === 0 ? (
              <p className="text-xs text-gray-500 italic">No topics flagged for revision yet.</p>
            ) : (
              <div className="space-y-2 max-h-60 overflow-y-auto pr-1">
                {activeFlags.map((flag, idx) => (
                  <div
                    key={idx}
                    className="p-2 bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-800/40 rounded flex items-center justify-between text-xs"
                  >
                    <div>
                      <span className="font-semibold text-gray-800 dark:text-gray-200 block">{flag.topic}</span>
                      <span className="text-[10px] text-gray-500">From Day {flag.dayNumber} ({flag.itemType})</span>
                    </div>
                    <button
                      onClick={() => handleDayChange(flag.dayNumber)}
                      className="text-xs text-amber-600 hover:underline"
                    >
                      Visit
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
