import { createContext, useContext, useReducer, useEffect, useCallback } from 'react';
import storage from '../utils/storage';
import { getTodayString, TASK_STATUSES, calcPercentage } from '../utils/helpers';
import { generateStudyDay } from '../data/curriculum';

const StudyContext = createContext(null);

// Action types
const ACTIONS = {
  LOAD_DATA: 'LOAD_DATA',
  SET_CURRENT_DAY: 'SET_CURRENT_DAY',
  UPDATE_TASK: 'UPDATE_TASK',
  UPDATE_TASK_STATUS: 'UPDATE_TASK_STATUS',
  UPDATE_TASK_NOTES: 'UPDATE_TASK_NOTES',
  FLAG_FOR_REVISION: 'FLAG_FOR_REVISION',
  SAVE_ANSWER: 'SAVE_ANSWER',
  REVEAL_SOLUTION: 'REVEAL_SOLUTION',
  UPDATE_COURSE_TOPIC: 'UPDATE_COURSE_TOPIC',
  UPDATE_PROJECT: 'UPDATE_PROJECT',
  UPDATE_SETTINGS: 'UPDATE_SETTINGS',
  ADD_STUDY_TIME: 'ADD_STUDY_TIME',
  SAVE_REVISION_NOTES: 'SAVE_REVISION_NOTES',
  RESET_DATA: 'RESET_DATA',
  IMPORT_DATA: 'IMPORT_DATA',
};

const initialState = {
  settings: {
    theme: 'light',
    startDate: getTodayString(),
    currentStudyDay: 1,
  },
  studyDays: {},
  tasks: {},
  lessons: {},
  mathQuestions: {},
  pythonQuestions: {},
  answers: {},
  courseTracker: {},
  projects: {},
  revisionNotes: {},
  revisionFlags: [],
  studySessions: [],
};

function reducer(state, action) {
  switch (action.type) {
    case ACTIONS.LOAD_DATA:
      return { ...state, ...action.payload };

    case ACTIONS.SET_CURRENT_DAY:
      return {
        ...state,
        settings: { ...state.settings, currentStudyDay: action.payload },
      };

    case ACTIONS.UPDATE_TASK_STATUS: {
      const { taskId, status } = action.payload;
      const task = state.tasks[taskId];
      if (!task) return state;
      return {
        ...state,
        tasks: {
          ...state.tasks,
          [taskId]: {
            ...task,
            status,
            completedAt: status === TASK_STATUSES.COMPLETED ? new Date().toISOString() : null,
          },
        },
      };
    }

    case ACTIONS.UPDATE_TASK_NOTES: {
      const { taskId, notes } = action.payload;
      const task = state.tasks[taskId];
      if (!task) return state;
      return {
        ...state,
        tasks: {
          ...state.tasks,
          [taskId]: { ...task, notes },
        },
      };
    }

    case ACTIONS.FLAG_FOR_REVISION: {
      const { itemId, itemType, topic, dayNumber } = action.payload;
      const existing = state.revisionFlags.find(f => f.itemId === itemId);
      if (existing) return state;
      return {
        ...state,
        revisionFlags: [
          ...state.revisionFlags,
          { itemId, itemType, topic, dayNumber, flaggedAt: new Date().toISOString(), resolved: false },
        ],
      };
    }

    case ACTIONS.SAVE_ANSWER: {
      const { questionId, answer, isCorrect, attemptNumber } = action.payload;
      return {
        ...state,
        answers: {
          ...state.answers,
          [questionId]: {
            ...(state.answers[questionId] || {}),
            questionId,
            answer,
            isCorrect,
            attemptNumber: attemptNumber || 1,
            savedAt: new Date().toISOString(),
            attempts: [
              ...((state.answers[questionId]?.attempts) || []),
              { answer, isCorrect, savedAt: new Date().toISOString() },
            ],
          },
        },
      };
    }

    case ACTIONS.UPDATE_COURSE_TOPIC: {
      const { topicId, updates } = action.payload;
      return {
        ...state,
        courseTracker: {
          ...state.courseTracker,
          [topicId]: {
            ...(state.courseTracker[topicId] || {}),
            ...updates,
            updatedAt: new Date().toISOString(),
          },
        },
      };
    }

    case ACTIONS.UPDATE_PROJECT: {
      const { projectId, updates } = action.payload;
      return {
        ...state,
        projects: {
          ...state.projects,
          [projectId]: {
            ...(state.projects[projectId] || {}),
            ...updates,
            updatedAt: new Date().toISOString(),
          },
        },
      };
    }

    case ACTIONS.UPDATE_SETTINGS:
      return {
        ...state,
        settings: { ...state.settings, ...action.payload },
      };

    case ACTIONS.ADD_STUDY_TIME: {
      const { dayNumber, block, minutes } = action.payload;
      return {
        ...state,
        studySessions: [
          ...state.studySessions,
          { dayNumber, block, minutes, recordedAt: new Date().toISOString() },
        ],
      };
    }

    case ACTIONS.SAVE_REVISION_NOTES: {
      const { dayNumber, notes } = action.payload;
      return {
        ...state,
        revisionNotes: {
          ...state.revisionNotes,
          [dayNumber]: {
            ...(state.revisionNotes[dayNumber] || {}),
            ...notes,
            updatedAt: new Date().toISOString(),
          },
        },
      };
    }

    case ACTIONS.RESET_DATA:
      return { ...initialState, settings: { ...initialState.settings } };

    case ACTIONS.IMPORT_DATA:
      return { ...state, ...action.payload };

    default:
      return state;
  }
}

export function StudyProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState);

  // Load data on mount
  useEffect(() => {
    const saved = storage.get('app_state');
    if (saved) {
      dispatch({ type: ACTIONS.LOAD_DATA, payload: saved });
    } else {
      // Initialize with day 1 data
      initializeDay(1, initialState);
    }
  }, []);

  // Save to storage on state change
  useEffect(() => {
    storage.set('app_state', state);
  }, [state]);

  function initializeDay(dayNumber, currentState) {
    const stateToUse = currentState || state;
    const dayKey = `day_${dayNumber}`;
    if (stateToUse.studyDays[dayKey]) return; // already initialized

    const dayData = generateStudyDay(dayNumber);
    if (!dayData) return;

    const newTasks = {};
    const newMathQuestions = {};
    const newPythonQuestions = {};

    dayData.tasks.forEach(task => {
      newTasks[task.id] = task;
    });

    dayData.mathQuestions.forEach(q => {
      newMathQuestions[q.id] = q;
    });

    dayData.pythonQuestions.forEach(q => {
      newPythonQuestions[q.id] = q;
    });

    const newState = {
      studyDays: {
        ...stateToUse.studyDays,
        [dayKey]: {
          dayNumber,
          date: getTodayString(),
          week: Math.ceil(dayNumber / 5),
          mathLesson: dayData.mathLesson,
          pythonLesson: dayData.pythonLesson,
          aimlActivity: dayData.aimlActivity,
          revision: dayData.revision,
          taskIds: dayData.tasks.map(t => t.id),
          mathQuestionIds: dayData.mathQuestions.map(q => q.id),
          pythonQuestionIds: dayData.pythonQuestions.map(q => q.id),
        },
      },
      tasks: { ...stateToUse.tasks, ...newTasks },
      mathQuestions: { ...stateToUse.mathQuestions, ...newMathQuestions },
      pythonQuestions: { ...stateToUse.pythonQuestions, ...newPythonQuestions },
    };

    dispatch({ type: ACTIONS.LOAD_DATA, payload: newState });
  }

  const updateTaskStatus = useCallback((taskId, status) => {
    dispatch({ type: ACTIONS.UPDATE_TASK_STATUS, payload: { taskId, status } });
  }, []);

  const updateTaskNotes = useCallback((taskId, notes) => {
    dispatch({ type: ACTIONS.UPDATE_TASK_NOTES, payload: { taskId, notes } });
  }, []);

  const flagForRevision = useCallback((itemId, itemType, topic, dayNumber) => {
    dispatch({ type: ACTIONS.FLAG_FOR_REVISION, payload: { itemId, itemType, topic, dayNumber } });
  }, []);

  const saveAnswer = useCallback((questionId, answer, isCorrect, attemptNumber) => {
    dispatch({ type: ACTIONS.SAVE_ANSWER, payload: { questionId, answer, isCorrect, attemptNumber } });
  }, []);

  const updateCourseTopic = useCallback((topicId, updates) => {
    dispatch({ type: ACTIONS.UPDATE_COURSE_TOPIC, payload: { topicId, updates } });
  }, []);

  const updateProject = useCallback((projectId, updates) => {
    dispatch({ type: ACTIONS.UPDATE_PROJECT, payload: { projectId, updates } });
  }, []);

  const updateSettings = useCallback((updates) => {
    dispatch({ type: ACTIONS.UPDATE_SETTINGS, payload: updates });
  }, []);

  const addStudyTime = useCallback((dayNumber, block, minutes) => {
    dispatch({ type: ACTIONS.ADD_STUDY_TIME, payload: { dayNumber, block, minutes } });
  }, []);

  const saveRevisionNotes = useCallback((dayNumber, notes) => {
    dispatch({ type: ACTIONS.SAVE_REVISION_NOTES, payload: { dayNumber, notes } });
  }, []);

  const goToDay = useCallback((dayNumber) => {
    initializeDay(dayNumber, state);
    dispatch({ type: ACTIONS.SET_CURRENT_DAY, payload: dayNumber });
  }, [state]);

  const resetData = useCallback(() => {
    dispatch({ type: ACTIONS.RESET_DATA });
    storage.clear();
  }, []);

  const exportData = useCallback(() => {
    return JSON.stringify(state, null, 2);
  }, [state]);

  const importData = useCallback((jsonString) => {
    try {
      const data = JSON.parse(jsonString);
      dispatch({ type: ACTIONS.IMPORT_DATA, payload: data });
      return true;
    } catch (e) {
      console.error('Import failed:', e);
      return false;
    }
  }, []);

  // Computed values
  const currentDayNumber = state.settings.currentStudyDay;
  const currentDayKey = `day_${currentDayNumber}`;
  const currentDay = state.studyDays[currentDayKey] || null;

  const getDayTasks = useCallback((dayNumber) => {
    const dayKey = `day_${dayNumber}`;
    const day = state.studyDays[dayKey];
    if (!day) return [];
    return (day.taskIds || []).map(id => state.tasks[id]).filter(Boolean);
  }, [state.studyDays, state.tasks]);

  const getDayMathQuestions = useCallback((dayNumber) => {
    const dayKey = `day_${dayNumber}`;
    const day = state.studyDays[dayKey];
    if (!day) return [];
    return (day.mathQuestionIds || []).map(id => state.mathQuestions[id]).filter(Boolean);
  }, [state.studyDays, state.mathQuestions]);

  const getDayPythonQuestions = useCallback((dayNumber) => {
    const dayKey = `day_${dayNumber}`;
    const day = state.studyDays[dayKey];
    if (!day) return [];
    return (day.pythonQuestionIds || []).map(id => state.pythonQuestions[id]).filter(Boolean);
  }, [state.studyDays, state.pythonQuestions]);

  // Statistics
  const getStats = useCallback(() => {
    const allTasks = Object.values(state.tasks);
    const completedTasks = allTasks.filter(t => t.status === TASK_STATUSES.COMPLETED);
    const dayTasks = getDayTasks(currentDayNumber);
    const dayCompletedTasks = dayTasks.filter(t => t.status === TASK_STATUSES.COMPLETED);

    const mathTasks = allTasks.filter(t => t.block === 'mathematics');
    const pythonTasks = allTasks.filter(t => t.block === 'python');
    const aimlTasks = allTasks.filter(t => t.block === 'aiml');
    const revisionTasks = allTasks.filter(t => t.block === 'revision');

    const totalStudyTime = state.studySessions.reduce((sum, s) => sum + s.minutes, 0);

    const allAnswers = Object.values(state.answers);
    const correctAnswers = allAnswers.filter(a => a.isCorrect);

    return {
      totalTasks: allTasks.length,
      completedTasks: completedTasks.length,
      overallCompletion: calcPercentage(completedTasks.length, allTasks.length),
      
      todayTotalTasks: dayTasks.length,
      todayCompletedTasks: dayCompletedTasks.length,
      todayCompletion: calcPercentage(dayCompletedTasks.length, dayTasks.length),

      mathCompletion: calcPercentage(
        mathTasks.filter(t => t.status === TASK_STATUSES.COMPLETED).length,
        mathTasks.length
      ),
      pythonCompletion: calcPercentage(
        pythonTasks.filter(t => t.status === TASK_STATUSES.COMPLETED).length,
        pythonTasks.length
      ),
      aimlCompletion: calcPercentage(
        aimlTasks.filter(t => t.status === TASK_STATUSES.COMPLETED).length,
        aimlTasks.length
      ),
      revisionCompletion: calcPercentage(
        revisionTasks.filter(t => t.status === TASK_STATUSES.COMPLETED).length,
        revisionTasks.length
      ),

      totalStudyTime,
      plannedStudyTime: Object.keys(state.studyDays).length * 240,

      totalAnswers: allAnswers.length,
      correctAnswers: correctAnswers.length,
      assessmentScore: calcPercentage(correctAnswers.length, allAnswers.length),

      revisionFlags: state.revisionFlags.filter(f => !f.resolved).length,
      
      currentDay: currentDayNumber,
      currentWeek: Math.ceil(currentDayNumber / 5),
      totalDays: Object.keys(state.studyDays).length,
    };
  }, [state, currentDayNumber, getDayTasks]);

  const getMissedTasks = useCallback(() => {
    return Object.values(state.tasks).filter(
      t => t.dayNumber < currentDayNumber && 
           t.status !== TASK_STATUSES.COMPLETED && 
           t.status !== TASK_STATUSES.SKIPPED
    );
  }, [state.tasks, currentDayNumber]);

  const value = {
    state,
    currentDayNumber,
    currentDay,
    updateTaskStatus,
    updateTaskNotes,
    flagForRevision,
    saveAnswer,
    updateCourseTopic,
    updateProject,
    updateSettings,
    addStudyTime,
    saveRevisionNotes,
    goToDay,
    resetData,
    exportData,
    importData,
    getDayTasks,
    getDayMathQuestions,
    getDayPythonQuestions,
    getStats,
    getMissedTasks,
    initializeDay,
  };

  return (
    <StudyContext.Provider value={value}>
      {children}
    </StudyContext.Provider>
  );
}

export function useStudy() {
  const context = useContext(StudyContext);
  if (!context) {
    throw new Error('useStudy must be used within a StudyProvider');
  }
  return context;
}

export default StudyContext;

