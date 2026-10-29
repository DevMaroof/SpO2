import { useState, useMemo } from 'react';
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
  Lightbulb,
  AlertTriangle,
  Brain,
  Calculator,
  Eye,
  EyeOff,
  ArrowRight,
  PanelRightOpen,
  PanelRightClose,
  GraduationCap,
  ListChecks,
} from 'lucide-react';

const MATH_STAGES = [
  { id: 1, title: 'Stage 1: Foundations', weeks: '1-2', description: 'Basic mathematics fundamentals' },
  { id: 2, title: 'Stage 2: Linear Algebra', weeks: '3-5', description: 'Vectors, matrices, transformations' },
  { id: 3, title: 'Stage 3: Calculus', weeks: '6-8', description: 'Derivatives, integrals, optimization' },
  { id: 4, title: 'Stage 4: Probability & Statistics', weeks: '9-11', description: 'Distributions, inference, testing' },
  { id: 5, title: 'Stage 5: Optimization', weeks: '12-13', description: 'Gradient descent, convexity' },
  { id: 6, title: 'Stage 6: Advanced Topics', weeks: '14-16', description: 'Information theory, numerical methods' },
];

function CollapsibleSection({ title, icon: Icon, children, defaultOpen = false }) {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <div className="border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-800/50 hover:bg-gray-100 dark:hover:bg-gray-700/50 transition-colors"
      >
        <span className="flex items-center gap-2 text-sm font-medium text-gray-700 dark:text-gray-300">
          {Icon && <Icon className="w-4 h-4 text-blue-500" />}
          {title}
        </span>
        {open ? <ChevronUp className="w-4 h-4 text-gray-400" /> : <ChevronDown className="w-4 h-4 text-gray-400" />}
      </button>
      {open && <div className="p-4 bg-white dark:bg-gray-800">{children}</div>}
    </div>
  );
}

function LessonView({ lesson, dayNumber, onComplete, onFlag, onBack }) {
  const [showFormulas, setShowFormulas] = useState(false);

  if (!lesson) {
    return (
      <div className="text-center py-16">
        <BookOpen className="w-16 h-16 text-gray-300 dark:text-gray-600 mx-auto mb-4" />
        <h3 className="text-lg font-semibold text-gray-600 dark:text-gray-400">No lesson data available</h3>
        <p className="text-sm text-gray-400 dark:text-gray-500 mt-1">This lesson hasn&apos;t been loaded yet.</p>
      </div>
    );
  }

  const title = lesson.title || lesson.topic || 'Mathematics Lesson';
  const prerequisites = lesson.prerequisites || [];
  const explanation = lesson.explanation || lesson.content || '';
  const definitions = lesson.definitions || [];
  const formulas = lesson.formulas || [];
  const examples = lesson.examples || lesson.workedExamples || [];
  const exercises = lesson.exercises || [];
  const commonMistakes = lesson.commonMistakes || [];
  const aimlConnection = lesson.aimlConnection || lesson.aiConnection || '';

  return (
    <div className="relative">
      {/* Formula sidebar toggle */}
      {formulas.length > 0 && (
        <button
          onClick={() => setShowFormulas(!showFormulas)}
          className="fixed right-4 top-20 z-30 p-2 bg-blue-600 text-white rounded-lg shadow-lg hover:bg-blue-700 transition-colors"
          title="Toggle formula reference"
        >
          {showFormulas ? <PanelRightClose className="w-5 h-5" /> : <PanelRightOpen className="w-5 h-5" />}
        </button>
      )}

      {/* Formula Sidebar */}
      {showFormulas && formulas.length > 0 && (
        <div className="fixed right-0 top-16 bottom-0 w-80 bg-white dark:bg-gray-800 border-l border-gray-200 dark:border-gray-700 overflow-y-auto z-20 p-4 shadow-xl">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
            <Calculator className="w-5 h-5 text-blue-500" />
            Formula Reference
          </h3>
          <div className="space-y-3">
            {formulas.map((f, i) => (
              <div key={i} className="p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-800">
                {typeof f === 'string' ? (
                  <p className="text-sm font-mono text-blue-800 dark:text-blue-300">{f}</p>
                ) : (
                  <>
                    <p className="text-xs font-medium text-blue-600 dark:text-blue-400 mb-1">{f.name || f.label}</p>
                    <p className="text-sm font-mono text-blue-800 dark:text-blue-300">{f.formula || f.expression || f.value}</p>
                  </>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      <div className={`${showFormulas ? 'mr-80' : ''} transition-all`}>
        {/* Back button and title */}
        <div className="flex items-center gap-3 mb-6">
          <button
            onClick={onBack}
            className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-500"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <div>
            <h2 className="text-xl md:text-2xl font-bold text-gray-900 dark:text-white">{title}</h2>
            <p className="text-sm text-gray-500 dark:text-gray-400">Day {dayNumber}</p>
          </div>
        </div>

        <div className="space-y-4">
          {/* Prerequisites */}
          {prerequisites.length > 0 && (
            <CollapsibleSection title="Prerequisites" icon={ListChecks} defaultOpen>
              <ul className="space-y-1">
                {prerequisites.map((p, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm text-gray-600 dark:text-gray-400">
                    <ArrowRight className="w-4 h-4 text-blue-400 mt-0.5 flex-shrink-0" />
                    {typeof p === 'string' ? p : p.topic || p.title || JSON.stringify(p)}
                  </li>
                ))}
              </ul>
            </CollapsibleSection>
          )}

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

          {/* Definitions */}
          {definitions.length > 0 && (
            <CollapsibleSection title="Definitions" icon={GraduationCap}>
              <dl className="space-y-3">
                {definitions.map((d, i) => (
                  <div key={i} className="p-3 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
                    <dt className="text-sm font-semibold text-gray-800 dark:text-gray-200">
                      {typeof d === 'string' ? d : d.term || d.name}
                    </dt>
                    {typeof d !== 'string' && d.definition && (
                      <dd className="text-sm text-gray-600 dark:text-gray-400 mt-1">{d.definition}</dd>
                    )}
                  </div>
                ))}
              </dl>
            </CollapsibleSection>
          )}

          {/* Formulas Panel */}
          {formulas.length > 0 && (
            <CollapsibleSection title={`Formulas (${formulas.length})`} icon={Calculator}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {formulas.map((f, i) => (
                  <div key={i} className="p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-100 dark:border-blue-800">
                    {typeof f === 'string' ? (
                      <p className="text-sm font-mono text-blue-800 dark:text-blue-300">{f}</p>
                    ) : (
                      <>
                        <p className="text-xs font-medium text-blue-600 dark:text-blue-400 mb-1">{f.name || f.label || ''}</p>
                        <p className="text-sm font-mono text-blue-800 dark:text-blue-300">{f.formula || f.expression || f.value}</p>
                        {f.description && (
                          <p className="text-xs text-blue-600 dark:text-blue-400 mt-1">{f.description}</p>
                        )}
                      </>
                    )}
                  </div>
                ))}
              </div>
            </CollapsibleSection>
          )}

          {/* Worked Examples */}
          {examples.length > 0 && (
            <CollapsibleSection title={`Worked Examples (${examples.length})`} icon={Lightbulb}>
              <div className="space-y-4">
                {examples.map((ex, i) => (
                  <WorkedExample key={i} example={ex} index={i} />
                ))}
              </div>
            </CollapsibleSection>
          )}

          {/* Exercises */}
          {exercises.length > 0 && (
            <CollapsibleSection title={`Exercises (${exercises.length})`} icon={ListChecks}>
              <div className="space-y-4">
                {exercises.map((ex, i) => (
                  <ExerciseItem key={i} exercise={ex} index={i} />
                ))}
              </div>
            </CollapsibleSection>
          )}

          {/* Common Mistakes */}
          {commonMistakes.length > 0 && (
            <CollapsibleSection title="Common Mistakes" icon={AlertTriangle}>
              <ul className="space-y-2">
                {commonMistakes.map((m, i) => (
                  <li key={i} className="flex items-start gap-2 p-2 bg-red-50 dark:bg-red-900/10 rounded-lg">
                    <AlertTriangle className="w-4 h-4 text-red-500 mt-0.5 flex-shrink-0" />
                    <span className="text-sm text-red-700 dark:text-red-400">
                      {typeof m === 'string' ? m : m.mistake || m.description || JSON.stringify(m)}
                    </span>
                  </li>
                ))}
              </ul>
            </CollapsibleSection>
          )}

          {/* AI/ML Connection */}
          {aimlConnection && (
            <CollapsibleSection title="AI/ML Connection" icon={Brain}>
              <div className="p-3 bg-purple-50 dark:bg-purple-900/10 rounded-lg border border-purple-200 dark:border-purple-800">
                <p className="text-sm text-purple-800 dark:text-purple-300">
                  {typeof aimlConnection === 'string' ? aimlConnection : JSON.stringify(aimlConnection)}
                </p>
              </div>
            </CollapsibleSection>
          )}
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
    </div>
  );
}

function WorkedExample({ example, index }) {
  const [showSolution, setShowSolution] = useState(false);
  const problem = typeof example === 'string' ? example : example.problem || example.question || example.title || '';
  const solution = typeof example === 'string' ? null : example.solution || example.steps || example.answer || '';

  return (
    <div className="p-3 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
      <p className="text-sm font-medium text-gray-800 dark:text-gray-200 mb-2">
        Example {index + 1}: {problem}
      </p>
      {solution && (
        <>
          <button
            onClick={() => setShowSolution(!showSolution)}
            className="flex items-center gap-1 text-xs text-blue-600 dark:text-blue-400 hover:underline"
          >
            {showSolution ? <EyeOff className="w-3 h-3" /> : <Eye className="w-3 h-3" />}
            {showSolution ? 'Hide Solution' : 'Show Solution'}
          </button>
          {showSolution && (
            <div className="mt-2 p-3 bg-white dark:bg-gray-800 rounded border border-gray-200 dark:border-gray-600">
              {typeof solution === 'string' ? (
                <p className="text-sm text-gray-700 dark:text-gray-300 whitespace-pre-wrap">{solution}</p>
              ) : Array.isArray(solution) ? (
                <ol className="list-decimal list-inside space-y-1">
                  {solution.map((step, si) => (
                    <li key={si} className="text-sm text-gray-700 dark:text-gray-300">
                      {typeof step === 'string' ? step : step.description || step.step || JSON.stringify(step)}
                    </li>
                  ))}
                </ol>
              ) : (
                <p className="text-sm text-gray-700 dark:text-gray-300">{JSON.stringify(solution)}</p>
              )}
            </div>
          )}
        </>
      )}
    </div>
  );
}

function ExerciseItem({ exercise, index }) {
  const [showHint, setShowHint] = useState(false);
  const [showAnswer, setShowAnswer] = useState(false);
  const problem = typeof exercise === 'string' ? exercise : exercise.problem || exercise.question || '';
  const hint = typeof exercise !== 'string' ? exercise.hint : null;
  const answer = typeof exercise !== 'string' ? (exercise.answer || exercise.solution) : null;

  return (
    <div className="p-3 border border-gray-200 dark:border-gray-700 rounded-lg">
      <p className="text-sm text-gray-800 dark:text-gray-200 mb-2">
        <span className="font-medium">Q{index + 1}:</span> {problem}
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
        {answer && (
          <button
            onClick={() => setShowAnswer(!showAnswer)}
            className="text-xs text-green-600 dark:text-green-400 hover:underline flex items-center gap-1"
          >
            <Eye className="w-3 h-3" />
            {showAnswer ? 'Hide Answer' : 'Show Answer'}
          </button>
        )}
      </div>
      {showHint && hint && (
        <div className="mt-2 p-2 bg-blue-50 dark:bg-blue-900/10 rounded text-sm text-blue-700 dark:text-blue-400">
          💡 {typeof hint === 'string' ? hint : JSON.stringify(hint)}
        </div>
      )}
      {showAnswer && answer && (
        <div className="mt-2 p-2 bg-green-50 dark:bg-green-900/10 rounded text-sm text-green-700 dark:text-green-400">
          ✅ {typeof answer === 'string' ? answer : JSON.stringify(answer)}
        </div>
      )}
    </div>
  );
}

export default function Mathematics() {
  const { state, currentDayNumber, updateTaskStatus, flagForRevision } = useStudy();
  const [activeStage, setActiveStage] = useState(1);
  const [selectedLesson, setSelectedLesson] = useState(null);
  const [selectedDayNumber, setSelectedDayNumber] = useState(null);

  // Gather all math lessons from study days
  const stageData = useMemo(() => {
    const stages = {};
    MATH_STAGES.forEach(s => { stages[s.id] = { ...s, lessons: [] }; });

    Object.entries(state.studyDays || {}).forEach(([key, day]) => {
      if (day.mathLesson) {
        const weekNum = day.week || Math.ceil(day.dayNumber / 5);
        let stageId = 1;
        if (weekNum <= 2) stageId = 1;
        else if (weekNum <= 5) stageId = 2;
        else if (weekNum <= 8) stageId = 3;
        else if (weekNum <= 11) stageId = 4;
        else if (weekNum <= 13) stageId = 5;
        else stageId = 6;

        // Find task completion status
        const mathTasks = (day.taskIds || [])
          .map(id => state.tasks[id])
          .filter(t => t && t.block === 'mathematics');
        const allCompleted = mathTasks.length > 0 && mathTasks.every(t => t.status === TASK_STATUSES.COMPLETED);

        stages[stageId].lessons.push({
          ...day.mathLesson,
          dayNumber: day.dayNumber,
          dayKey: key,
          completed: allCompleted,
          taskIds: mathTasks.map(t => t.id),
        });
      }
    });

    return stages;
  }, [state.studyDays, state.tasks]);

  const currentStage = stageData[activeStage];

  // Calculate stage progress
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
    const title = selectedLesson?.title || selectedLesson?.topic || 'Math lesson';
    flagForRevision(
      `math_day_${selectedDayNumber}`,
      'math_lesson',
      title,
      selectedDayNumber
    );
  };

  // Navigation between lessons in current stage
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
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 p-4 md:p-6 lg:p-8">
        <LessonView
          lesson={selectedLesson}
          dayNumber={selectedDayNumber}
          onComplete={handleComplete}
          onFlag={handleFlag}
          onBack={() => setSelectedLesson(null)}
        />
        {/* Prev / Next navigation */}
        <div className="flex justify-between mt-6">
          {lessonNav.prev ? (
            <button
              onClick={() => handleSelectLesson(lessonNav.prev)}
              className="flex items-center gap-1 text-sm text-blue-600 dark:text-blue-400 hover:underline"
            >
              <ChevronLeft className="w-4 h-4" />
              Previous Lesson
            </button>
          ) : <div />}
          {lessonNav.next ? (
            <button
              onClick={() => handleSelectLesson(lessonNav.next)}
              className="flex items-center gap-1 text-sm text-blue-600 dark:text-blue-400 hover:underline"
            >
              Next Lesson
              <ChevronRight className="w-4 h-4" />
            </button>
          ) : <div />}
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 p-4 md:p-6 lg:p-8">
      <div className="mb-6">
        <h1 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
          <Calculator className="w-7 h-7 text-blue-500" />
          Mathematics
        </h1>
        <p className="text-gray-500 dark:text-gray-400 mt-1">Master the mathematical foundations of AI/ML</p>
      </div>

      {/* Stage Tabs */}
      <div className="flex flex-wrap gap-2 mb-6 overflow-x-auto pb-1">
        {MATH_STAGES.map(stage => {
          const prog = stageProgress[stage.id] || { total: 0, completed: 0, percent: 0 };
          return (
            <button
              key={stage.id}
              onClick={() => setActiveStage(stage.id)}
              className={`px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-colors ${
                activeStage === stage.id
                  ? 'bg-blue-600 text-white'
                  : 'bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-400 border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700'
              }`}
            >
              Stage {stage.id}
              {prog.total > 0 && (
                <span className={`ml-2 text-xs ${activeStage === stage.id ? 'text-blue-200' : 'text-gray-400'}`}>
                  {prog.completed}/{prog.total}
                </span>
              )}
            </button>
          );
        })}
      </div>

      {/* Stage Info & Progress */}
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
                  className="h-2.5 rounded-full bg-blue-600 transition-all"
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

      {/* Topic List */}
      {currentStage?.lessons.length > 0 ? (
        <div className="space-y-2">
          {currentStage.lessons.map((lesson, i) => (
            <button
              key={lesson.dayNumber || i}
              onClick={() => handleSelectLesson(lesson)}
              className="w-full flex items-center gap-3 p-4 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 hover:shadow-md hover:border-blue-300 dark:hover:border-blue-700 transition-all text-left"
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
                {lesson.stage && (
                  <p className="text-xs text-gray-400 dark:text-gray-500 mt-0.5">{lesson.stage}</p>
                )}
              </div>
              <span className="text-xs text-gray-400">Day {lesson.dayNumber}</span>
              <ChevronRight className="w-4 h-4 text-gray-400" />
            </button>
          ))}
        </div>
      ) : (
        <div className="text-center py-16">
          <BookOpen className="w-16 h-16 text-gray-300 dark:text-gray-600 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-gray-600 dark:text-gray-400">No lessons in this stage yet</h3>
          <p className="text-sm text-gray-400 dark:text-gray-500 mt-1">
            Progress through your study plan to unlock lessons in this stage.
          </p>
        </div>
      )}
    </div>
  );
}
