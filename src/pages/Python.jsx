import { useState, useMemo, useCallback } from 'react';
import { useStudy } from '../context/StudyContext';
import { TASK_STATUSES, calcPercentage } from '../utils/helpers';
import {
  ChevronDown,
  ChevronUp,
  ChevronLeft,
  ChevronRight,
  CheckCircle2,
  Flag,
  BookOpen,
  Code2,
  Terminal,
  AlertTriangle,
  Eye,
  EyeOff,
  Copy,
  Check,
  Lightbulb,
  Play,
  FileCode,
} from 'lucide-react';

const PYTHON_STAGES = [
  { id: 1, title: 'Stage 1: Python Basics', weeks: '1-3', description: 'Variables, data types, control flow' },
  { id: 2, title: 'Stage 2: Data Structures', weeks: '4-6', description: 'Lists, dicts, OOP, modules' },
  { id: 3, title: 'Stage 3: NumPy & Data', weeks: '7-9', description: 'NumPy, Pandas, data processing' },
  { id: 4, title: 'Stage 4: Visualization & ML', weeks: '10-12', description: 'Matplotlib, Scikit-learn, ML basics' },
  { id: 5, title: 'Stage 5: Deep Learning', weeks: '13-16', description: 'TensorFlow, PyTorch, neural networks' },
];

function CodeBlock({ code, language = 'python', title }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Fallback
      const textarea = document.createElement('textarea');
      textarea.value = code;
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand('copy');
      document.body.removeChild(textarea);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="rounded-lg overflow-hidden border border-gray-700 dark:border-gray-600 min-w-0">
      <div className="flex items-center justify-between px-3 py-1.5 bg-gray-800 dark:bg-gray-900">
        <span className="text-xs text-gray-400 font-mono truncate mr-2">{title || language}</span>
        <button
          onClick={handleCopy}
          className="flex items-center gap-1 text-xs text-gray-400 hover:text-white transition-colors px-2 py-0.5 rounded shrink-0"
        >
          {copied ? <Check className="w-3 h-3 text-green-400" /> : <Copy className="w-3 h-3" />}
          {copied ? 'Copied!' : 'Copy'}
        </button>
      </div>
      <pre className="p-3 bg-gray-900 dark:bg-gray-950 overflow-x-auto text-xs sm:text-sm">
        <code className="font-mono text-green-400 dark:text-green-300 whitespace-pre">{code}</code>
      </pre>
    </div>
  );
}

function CollapsibleSection({ title, icon: Icon, children, defaultOpen = false }) {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <div className="border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-800/50 hover:bg-gray-100 dark:hover:bg-gray-700/50 transition-colors"
      >
        <span className="flex items-center gap-2 text-sm font-medium text-gray-700 dark:text-gray-300">
          {Icon && <Icon className="w-4 h-4 text-green-500" />}
          {title}
        </span>
        {open ? <ChevronUp className="w-4 h-4 text-gray-400" /> : <ChevronDown className="w-4 h-4 text-gray-400" />}
      </button>
      {open && <div className="p-4 bg-white dark:bg-gray-800">{children}</div>}
    </div>
  );
}

function PythonLessonView({ lesson, dayNumber, onComplete, onFlag, onBack }) {
  const [practiceCode, setPracticeCode] = useState('');

  if (!lesson) {
    return (
      <div className="text-center py-16">
        <Code2 className="w-16 h-16 text-gray-300 dark:text-gray-600 mx-auto mb-4" />
        <h3 className="text-lg font-semibold text-gray-600 dark:text-gray-400">No lesson data available</h3>
      </div>
    );
  }

  const title = lesson.title || lesson.topic || 'Python Lesson';
  const explanation = lesson.explanation || lesson.content || '';
  const syntaxExamples = lesson.syntaxExamples || lesson.syntax || [];
  const codeExamples = lesson.codeExamples || lesson.examples || [];
  const expectedOutput = lesson.expectedOutput || '';
  const commonErrors = lesson.commonErrors || lesson.commonMistakes || [];
  const practiceProblems = lesson.practiceProblems || lesson.exercises || [];

  return (
    <div>
      {/* Back and title */}
      <div className="flex items-center gap-3 mb-6">
        <button onClick={onBack} className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-500">
          <ChevronLeft className="w-5 h-5" />
        </button>
        <div>
          <h2 className="text-xl md:text-2xl font-bold text-gray-900 dark:text-white">{title}</h2>
          <p className="text-sm text-gray-500 dark:text-gray-400">Day {dayNumber}</p>
        </div>
      </div>

      <div className="space-y-4">
        {/* Explanation */}
        {explanation && (
          <CollapsibleSection title="Explanation" icon={BookOpen} defaultOpen>
            <div className="prose prose-sm dark:prose-invert max-w-none">
              {typeof explanation === 'string' ? (
                explanation.split('\n').map((para, i) => (
                  <p key={i} className="text-sm text-gray-700 dark:text-gray-300 mb-2">{para}</p>
                ))
              ) : (
                <p className="text-sm text-gray-700 dark:text-gray-300">{JSON.stringify(explanation)}</p>
              )}
            </div>
          </CollapsibleSection>
        )}

        {/* Syntax Examples */}
        {syntaxExamples.length > 0 && (
          <CollapsibleSection title="Syntax Examples" icon={FileCode} defaultOpen>
            <div className="space-y-3">
              {syntaxExamples.map((ex, i) => (
                <div key={i}>
                  {typeof ex === 'string' ? (
                    <CodeBlock code={ex} title={`Syntax ${i + 1}`} />
                  ) : (
                    <>
                      {ex.description && (
                        <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">{ex.description}</p>
                      )}
                      <CodeBlock code={ex.code || ex.syntax || JSON.stringify(ex)} title={ex.title || `Syntax ${i + 1}`} />
                    </>
                  )}
                </div>
              ))}
            </div>
          </CollapsibleSection>
        )}

        {/* Code Examples */}
        {codeExamples.length > 0 && (
          <CollapsibleSection title={`Code Examples (${codeExamples.length})`} icon={Code2} defaultOpen>
            <div className="space-y-4">
              {codeExamples.map((ex, i) => (
                <div key={i} className="space-y-2">
                  {typeof ex === 'string' ? (
                    <CodeBlock code={ex} title={`Example ${i + 1}`} />
                  ) : (
                    <>
                      {(ex.title || ex.description) && (
                        <p className="text-sm font-medium text-gray-700 dark:text-gray-300">
                          {ex.title || ex.description}
                        </p>
                      )}
                      <CodeBlock code={ex.code || JSON.stringify(ex)} title={ex.title || `Example ${i + 1}`} />
                      {ex.explanation && (
                        <div className="p-2 bg-gray-50 dark:bg-gray-700/50 rounded text-sm text-gray-600 dark:text-gray-400">
                          {typeof ex.explanation === 'string' ? ex.explanation : (
                            Array.isArray(ex.explanation) ? (
                              <ul className="list-disc list-inside space-y-1">
                                {ex.explanation.map((line, li) => <li key={li}>{line}</li>)}
                              </ul>
                            ) : JSON.stringify(ex.explanation)
                          )}
                        </div>
                      )}
                      {ex.output && (
                        <div className="rounded-lg border border-gray-300 dark:border-gray-600 overflow-hidden">
                          <div className="px-3 py-1.5 bg-gray-100 dark:bg-gray-700 text-xs text-gray-500 dark:text-gray-400">
                            Output
                          </div>
                          <pre className="p-3 bg-white dark:bg-gray-800 text-sm font-mono text-gray-700 dark:text-gray-300">
                            {ex.output}
                          </pre>
                        </div>
                      )}
                    </>
                  )}
                </div>
              ))}
            </div>
          </CollapsibleSection>
        )}

        {/* Expected Output */}
        {expectedOutput && (
          <CollapsibleSection title="Expected Output" icon={Terminal}>
            <div className="rounded-lg border border-gray-300 dark:border-gray-600 overflow-hidden">
              <pre className="p-3 bg-gray-100 dark:bg-gray-800 text-sm font-mono text-gray-700 dark:text-gray-300">
                {typeof expectedOutput === 'string' ? expectedOutput : JSON.stringify(expectedOutput, null, 2)}
              </pre>
            </div>
          </CollapsibleSection>
        )}

        {/* Common Errors */}
        {commonErrors.length > 0 && (
          <CollapsibleSection title="Common Errors" icon={AlertTriangle}>
            <div className="space-y-2">
              {commonErrors.map((err, i) => (
                <div key={i} className="p-3 bg-red-50 dark:bg-red-900/10 rounded-lg border border-red-200 dark:border-red-800">
                  {typeof err === 'string' ? (
                    <p className="text-sm text-red-700 dark:text-red-400 flex items-start gap-2">
                      <AlertTriangle className="w-4 h-4 mt-0.5 flex-shrink-0" />
                      {err}
                    </p>
                  ) : (
                    <>
                      <p className="text-sm font-medium text-red-700 dark:text-red-400">{err.error || err.title}</p>
                      {err.fix && <p className="text-sm text-red-600 dark:text-red-300 mt-1">Fix: {err.fix}</p>}
                      {err.code && <CodeBlock code={err.code} title="Error Example" />}
                    </>
                  )}
                </div>
              ))}
            </div>
          </CollapsibleSection>
        )}

        {/* Practice Problems */}
        {practiceProblems.length > 0 && (
          <CollapsibleSection title={`Practice Problems (${practiceProblems.length})`} icon={Play}>
            <div className="space-y-4">
              {practiceProblems.map((prob, i) => (
                <PracticeProblem key={i} problem={prob} index={i} />
              ))}
            </div>
          </CollapsibleSection>
        )}

        {/* Editable Code Textarea for Practice */}
        <CollapsibleSection title="Practice Area" icon={Terminal}>
          <div>
            <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">
              Write and experiment with Python code here:
            </p>
            <textarea
              value={practiceCode}
              onChange={(e) => setPracticeCode(e.target.value)}
              placeholder="# Write your Python code here..."
              className="w-full h-48 p-3 font-mono text-sm bg-gray-900 text-green-400 rounded-lg border border-gray-700 focus:outline-none focus:ring-1 focus:ring-green-500 resize-y"
              spellCheck="false"
            />
          </div>
        </CollapsibleSection>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-wrap gap-3 mt-6 pt-4 border-t border-gray-200 dark:border-gray-700">
        <button
          onClick={onComplete}
          className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors text-sm font-medium"
        >
          <CheckCircle2 className="w-4 h-4" />
          Mark Complete
        </button>
        <button
          onClick={onFlag}
          className="flex items-center gap-2 px-4 py-2 bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-400 rounded-lg hover:bg-amber-200 dark:hover:bg-amber-900/50 transition-colors text-sm font-medium"
        >
          <Flag className="w-4 h-4" />
          Flag for Revision
        </button>
      </div>
    </div>
  );
}

function PracticeProblem({ problem, index }) {
  const [showHint, setShowHint] = useState(false);
  const [showSolution, setShowSolution] = useState(false);

  const title = typeof problem === 'string' ? problem : (problem.problem || problem.question || problem.title || '');
  const hint = typeof problem !== 'string' ? problem.hint : null;
  const solution = typeof problem !== 'string' ? (problem.solution || problem.answer || problem.code) : null;

  return (
    <div className="p-3 border border-gray-200 dark:border-gray-700 rounded-lg">
      <p className="text-sm text-gray-800 dark:text-gray-200 mb-2">
        <span className="font-medium">Problem {index + 1}:</span> {title}
      </p>
      <div className="flex flex-wrap gap-2">
        {hint && (
          <button
            onClick={() => setShowHint(!showHint)}
            className="text-xs text-blue-600 dark:text-blue-400 hover:underline flex items-center gap-1"
          >
            <Lightbulb className="w-3 h-3" />
            {showHint ? 'Hide Hint' : 'Show Hint'}
          </button>
        )}
        {solution && (
          <button
            onClick={() => setShowSolution(!showSolution)}
            className="text-xs text-green-600 dark:text-green-400 hover:underline flex items-center gap-1"
          >
            <Eye className="w-3 h-3" />
            {showSolution ? 'Hide Solution' : 'Show Solution'}
          </button>
        )}
      </div>
      {showHint && hint && (
        <div className="mt-2 p-2 bg-blue-50 dark:bg-blue-900/10 rounded text-sm text-blue-700 dark:text-blue-400">
          💡 {typeof hint === 'string' ? hint : JSON.stringify(hint)}
        </div>
      )}
      {showSolution && solution && (
        <div className="mt-2">
          {typeof solution === 'string' && (solution.includes('\n') || solution.includes('def ') || solution.includes('import ')) ? (
            <CodeBlock code={solution} title="Solution" />
          ) : (
            <div className="p-2 bg-green-50 dark:bg-green-900/10 rounded text-sm text-green-700 dark:text-green-400">
              {typeof solution === 'string' ? solution : JSON.stringify(solution)}
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default function Python() {
  const { state, currentDayNumber, updateTaskStatus, flagForRevision } = useStudy();
  const [activeStage, setActiveStage] = useState(1);
  const [selectedLesson, setSelectedLesson] = useState(null);
  const [selectedDayNumber, setSelectedDayNumber] = useState(null);

  const stageData = useMemo(() => {
    const stages = {};
    PYTHON_STAGES.forEach(s => { stages[s.id] = { ...s, lessons: [] }; });

    Object.entries(state.studyDays || {}).forEach(([key, day]) => {
      if (day.pythonLesson) {
        const weekNum = day.week || Math.ceil(day.dayNumber / 5);
        let stageId = 1;
        if (weekNum <= 3) stageId = 1;
        else if (weekNum <= 6) stageId = 2;
        else if (weekNum <= 9) stageId = 3;
        else if (weekNum <= 12) stageId = 4;
        else stageId = 5;

        const pythonTasks = (day.taskIds || [])
          .map(id => state.tasks[id])
          .filter(t => t && t.block === 'python');
        const allCompleted = pythonTasks.length > 0 && pythonTasks.every(t => t.status === TASK_STATUSES.COMPLETED);

        stages[stageId].lessons.push({
          ...day.pythonLesson,
          dayNumber: day.dayNumber,
          dayKey: key,
          completed: allCompleted,
          taskIds: pythonTasks.map(t => t.id),
        });
      }
    });

    return stages;
  }, [state.studyDays, state.tasks]);

  const currentStage = stageData[activeStage];

  const stageProgress = useMemo(() => {
    const result = {};
    Object.entries(stageData).forEach(([id, stage]) => {
      const total = stage.lessons.length;
      const completed = stage.lessons.filter(l => l.completed).length;
      result[id] = { total, completed, percent: calcPercentage(completed, total) };
    });
    return result;
  }, [stageData]);

  const handleSelectLesson = (lesson) => {
    setSelectedLesson(lesson);
    setSelectedDayNumber(lesson.dayNumber);
  };

  const handleComplete = () => {
    if (selectedLesson?.taskIds) {
      selectedLesson.taskIds.forEach(tid => {
        updateTaskStatus(tid, TASK_STATUSES.COMPLETED);
      });
    }
    setSelectedLesson(null);
  };

  const handleFlag = () => {
    const title = selectedLesson?.title || selectedLesson?.topic || 'Python lesson';
    flagForRevision(`python_day_${selectedDayNumber}`, 'python_lesson', title, selectedDayNumber);
  };

  const lessonNav = useMemo(() => {
    if (!selectedLesson || !currentStage) return { prev: null, next: null };
    const idx = currentStage.lessons.findIndex(l => l.dayNumber === selectedLesson.dayNumber);
    return {
      prev: idx > 0 ? currentStage.lessons[idx - 1] : null,
      next: idx < currentStage.lessons.length - 1 ? currentStage.lessons[idx + 1] : null,
    };
  }, [selectedLesson, currentStage]);

  if (selectedLesson) {
    return (
      <div className="max-w-5xl mx-auto space-y-6 pb-12 min-w-0">
        <PythonLessonView
          lesson={selectedLesson}
          dayNumber={selectedDayNumber}
          onComplete={handleComplete}
          onFlag={handleFlag}
          onBack={() => setSelectedLesson(null)}
        />
        <div className="flex justify-between items-center gap-2 mt-6">
          {lessonNav.prev ? (
            <button
              onClick={() => handleSelectLesson(lessonNav.prev)}
              className="flex items-center gap-1 text-xs sm:text-sm text-green-600 dark:text-green-400 hover:underline"
            >
              <ChevronLeft className="w-4 h-4" /> Previous Lesson
            </button>
          ) : <div />}
          {lessonNav.next ? (
            <button
              onClick={() => handleSelectLesson(lessonNav.next)}
              className="flex items-center gap-1 text-xs sm:text-sm text-green-600 dark:text-green-400 hover:underline"
            >
              Next Lesson <ChevronRight className="w-4 h-4" />
            </button>
          ) : <div />}
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto space-y-6 pb-12 min-w-0">
      <div className="mb-6">
        <h1 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
          <Code2 className="w-7 h-7 text-green-500" />
          Python Programming
        </h1>
        <p className="text-gray-500 dark:text-gray-400 mt-1 text-sm sm:text-base">Learn Python for AI/ML development</p>
      </div>

      {/* Stage Tabs */}
      <div className="flex gap-2 mb-6 overflow-x-auto pb-2 no-scrollbar">
        {PYTHON_STAGES.map(stage => {
          const prog = stageProgress[stage.id] || { total: 0, completed: 0, percent: 0 };
          return (
            <button
              key={stage.id}
              onClick={() => setActiveStage(stage.id)}
              className={`px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-colors ${
                activeStage === stage.id
                  ? 'bg-green-600 text-white'
                  : 'bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-400 border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700'
              }`}
            >
              Stage {stage.id}
              {prog.total > 0 && (
                <span className={`ml-2 text-xs ${activeStage === stage.id ? 'text-green-200' : 'text-gray-400'}`}>
                  {prog.completed}/{prog.total}
                </span>
              )}
            </button>
          );
        })}
      </div>

      {/* Stage Info */}
      {currentStage && (
        <div className="bg-white dark:bg-gray-800 rounded-xl p-5 shadow-sm border border-gray-200 dark:border-gray-700 mb-6">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white">{currentStage.title}</h2>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
            Weeks {currentStage.weeks} · {currentStage.description}
          </p>
          {stageProgress[activeStage]?.total > 0 && (
            <div className="mt-3 flex items-center gap-3">
              <div className="flex-1 bg-gray-200 dark:bg-gray-700 rounded-full h-2.5">
                <div
                  className="h-2.5 rounded-full bg-green-600 transition-all"
                  style={{ width: `${stageProgress[activeStage].percent}%` }}
                />
              </div>
              <span className="text-sm font-medium text-gray-600 dark:text-gray-400">
                {stageProgress[activeStage].percent}%
              </span>
            </div>
          )}
        </div>
      )}

      {/* Lesson List */}
      {currentStage?.lessons.length > 0 ? (
        <div className="space-y-2">
          {currentStage.lessons.map((lesson, i) => (
            <button
              key={lesson.dayNumber || i}
              onClick={() => handleSelectLesson(lesson)}
              className="w-full flex items-center gap-3 p-4 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 hover:shadow-md hover:border-green-300 dark:hover:border-green-700 transition-all text-left"
            >
              <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                lesson.completed
                  ? 'bg-green-100 dark:bg-green-900/30'
                  : 'bg-gray-100 dark:bg-gray-700'
              }`}>
                {lesson.completed ? (
                  <CheckCircle2 className="w-5 h-5 text-green-600 dark:text-green-400" />
                ) : (
                  <span className="text-sm font-medium text-gray-500 dark:text-gray-400">{i + 1}</span>
                )}
              </div>
              <div className="flex-1 min-w-0">
                <p className={`text-sm font-medium ${
                  lesson.completed ? 'text-gray-500 dark:text-gray-400' : 'text-gray-900 dark:text-white'
                }`}>
                  {lesson.title || lesson.topic || `Day ${lesson.dayNumber} Lesson`}
                </p>
              </div>
              <span className="text-xs text-gray-400">Day {lesson.dayNumber}</span>
              <ChevronRight className="w-4 h-4 text-gray-400" />
            </button>
          ))}
        </div>
      ) : (
        <div className="text-center py-16">
          <Code2 className="w-16 h-16 text-gray-300 dark:text-gray-600 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-gray-600 dark:text-gray-400">No lessons in this stage yet</h3>
          <p className="text-sm text-gray-400 dark:text-gray-500 mt-1">
            Progress through your study plan to unlock Python lessons.
          </p>
        </div>
      )}
    </div>
  );
}
