import { useState, useMemo } from 'react';
import { useStudy } from '../context/StudyContext';
import { PROJECTS } from '../data/courseAndProjects';
import {
  FolderKanban,
  CheckCircle2,
  Github,
  Save,
  Clock,
  Sparkles,
  ExternalLink,
  ChevronDown,
  ChevronUp,
  Award,
  Layers,
  CheckSquare,
  Square,
  FileCode,
} from 'lucide-react';
import ProgressBar from '../components/common/ProgressBar';

export default function Projects() {
  const { state, updateProject } = useStudy();
  const [expandedProjects, setExpandedProjects] = useState({ project_1: true });
  const [githubLinks, setGithubLinks] = useState({});
  const [reflections, setReflections] = useState({});
  const [savedStatus, setSavedStatus] = useState({});

  // Merge default project definitions with user state
  const projects = useMemo(() => {
    return PROJECTS.map((proj) => {
      const userProj = state.projects[proj.id] || {};
      const completedMilestones = userProj.milestones || {};
      const totalMilestones = proj.milestones.length;
      const completedCount = Object.values(completedMilestones).filter(Boolean).length;
      const percent = Math.round((completedCount / (totalMilestones || 1)) * 100);

      return {
        ...proj,
        githubRepo: userProj.githubRepo || '',
        notes: userProj.notes || '',
        completed: userProj.completed || (percent === 100 && totalMilestones > 0),
        completedMilestones,
        percent,
      };
    });
  }, [state.projects]);

  const toggleExpand = (id) => {
    setExpandedProjects(prev => ({ ...prev, [id]: !prev[id] }));
  };

  const toggleMilestone = (projectId, milestoneId, currentVal) => {
    const proj = state.projects[projectId] || {};
    const milestones = { ...(proj.milestones || {}) };
    milestones[milestoneId] = !currentVal;
    updateProject(projectId, { milestones });
  };

  const handleSaveProjectDetails = (projectId) => {
    const updates = {};
    if (githubLinks[projectId] !== undefined) {
      updates.githubRepo = githubLinks[projectId];
    }
    if (reflections[projectId] !== undefined) {
      updates.notes = reflections[projectId];
    }
    updateProject(projectId, updates);
    setSavedStatus(prev => ({ ...prev, [projectId]: true }));
    setTimeout(() => {
      setSavedStatus(prev => ({ ...prev, [projectId]: false }));
    }, 2000);
  };

  const overallStats = useMemo(() => {
    const total = projects.length;
    const completed = projects.filter(p => p.completed || p.percent === 100).length;
    const totalMilestones = projects.reduce((acc, p) => acc + p.milestones.length, 0);
    const completedMilestones = projects.reduce((acc, p) => {
      return acc + Object.values(p.completedMilestones).filter(Boolean).length;
    }, 0);

    return {
      total,
      completed,
      percent: Math.round((completed / (total || 1)) * 100),
      milestonePercent: Math.round((completedMilestones / (totalMilestones || 1)) * 100),
      totalMilestones,
      completedMilestones,
    };
  }, [projects]);

  return (
    <div className="max-w-7xl mx-auto space-y-6 pb-12">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-gray-200 dark:border-gray-800 pb-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-gray-100 flex items-center gap-3">
            <FolderKanban className="h-8 w-8 text-primary-600 dark:text-primary-400" />
            10 Progressive AI/ML Projects
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mt-1">
            Build a portfolio of real, tested applications spanning pure Python, numerical computation, regression, neural nets, and LLMs.
          </p>
        </div>
      </div>

      {/* Progress Overview Banner */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="card p-5 space-y-2">
          <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Completed Projects</p>
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-black text-primary-600">{overallStats.completed}</span>
            <span className="text-sm text-gray-500">/ {overallStats.total}</span>
          </div>
          <ProgressBar value={overallStats.percent} color="bg-primary-600" size="sm" />
        </div>

        <div className="card p-5 space-y-2">
          <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Total Milestones Met</p>
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-black text-emerald-600">{overallStats.completedMilestones}</span>
            <span className="text-sm text-gray-500">/ {overallStats.totalMilestones}</span>
          </div>
          <ProgressBar value={overallStats.milestonePercent} color="bg-emerald-600" size="sm" />
        </div>

        <div className="card p-5 flex items-center justify-between">
          <div>
            <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Portfolio Status</p>
            <p className="text-base font-bold text-gray-900 dark:text-gray-100 mt-1">
              {overallStats.completed >= 8 ? 'Industry Ready 🚀' : overallStats.completed >= 4 ? 'Intermediate Builder 🛠️' : 'Foundational Stage 🌱'}
            </p>
            <p className="text-xs text-gray-500 mt-1">Link repos for code review</p>
          </div>
          <Award className="h-10 w-10 text-amber-500 flex-shrink-0" />
        </div>
      </div>

      {/* Projects List */}
      <div className="space-y-4">
        {projects.map((proj) => {
          const isExpanded = expandedProjects[proj.id];
          const currentGithub = githubLinks[proj.id] !== undefined ? githubLinks[proj.id] : proj.githubRepo;
          const currentReflection = reflections[proj.id] !== undefined ? reflections[proj.id] : proj.notes;

          return (
            <div
              key={proj.id}
              className={`card overflow-hidden border transition-all duration-200 ${
                proj.completed || proj.percent === 100
                  ? 'border-green-300 dark:border-green-800'
                  : 'hover:border-gray-300 dark:hover:border-gray-600'
              }`}
            >
              {/* Card Header */}
              <div
                onClick={() => toggleExpand(proj.id)}
                className="p-5 flex items-center justify-between cursor-pointer select-none bg-gray-50/50 dark:bg-gray-800/40 hover:bg-gray-100/50 dark:hover:bg-gray-800 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <span className={`w-8 h-8 rounded-lg flex items-center justify-center font-bold text-sm ${
                    proj.completed || proj.percent === 100
                      ? 'bg-green-100 text-green-700 dark:bg-green-900/40 dark:text-green-300'
                      : 'bg-primary-100 text-primary-700 dark:bg-primary-900/40 dark:text-primary-300'
                  }`}>
                    {proj.number}
                  </span>
                  <div>
                    <div className="flex items-center gap-2">
                      <h2 className="text-base font-bold text-gray-900 dark:text-gray-100">
                        {proj.title}
                      </h2>
                      <span className="text-[11px] px-2 py-0.5 rounded bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 font-medium">
                        {proj.difficulty}
                      </span>
                    </div>
                    <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">
                      Est. {proj.estimatedHours} hours • {proj.percent}% milestone completion
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <div className="hidden sm:block w-32">
                    <ProgressBar value={proj.percent} color="bg-primary-600" size="sm" />
                  </div>
                  {isExpanded ? (
                    <ChevronUp className="h-5 w-5 text-gray-400" />
                  ) : (
                    <ChevronDown className="h-5 w-5 text-gray-400" />
                  )}
                </div>
              </div>

              {/* Card Body */}
              {isExpanded && (
                <div className="p-5 border-t border-gray-100 dark:border-gray-800 space-y-6">
                  {/* Objective & Prerequisites */}
                  <div className="space-y-2">
                    <p className="text-sm font-medium text-gray-800 dark:text-gray-200 leading-relaxed">
                      <span className="font-bold text-gray-900 dark:text-gray-100">Objective: </span>
                      {proj.objective}
                    </p>
                    <div className="flex flex-wrap items-center gap-1.5 pt-1">
                      <span className="text-xs font-semibold text-gray-500">Prerequisites:</span>
                      {proj.prerequisites.map((req, i) => (
                        <span key={i} className="text-xs bg-gray-100 dark:bg-gray-700/60 text-gray-700 dark:text-gray-300 px-2 py-0.5 rounded">
                          {req}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Requirements & Testing Criteria */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="p-3 bg-gray-50 dark:bg-gray-800/40 rounded-lg border border-gray-200 dark:border-gray-700/60 space-y-2">
                      <h4 className="text-xs font-bold text-gray-800 dark:text-gray-200 uppercase tracking-wider">
                        Core Requirements
                      </h4>
                      <ul className="text-xs text-gray-600 dark:text-gray-400 space-y-1 list-disc list-inside">
                        {proj.requirements.map((r, i) => (
                          <li key={i}>{r}</li>
                        ))}
                      </ul>
                    </div>

                    <div className="p-3 bg-gray-50 dark:bg-gray-800/40 rounded-lg border border-gray-200 dark:border-gray-700/60 space-y-2">
                      <h4 className="text-xs font-bold text-gray-800 dark:text-gray-200 uppercase tracking-wider">
                        Testing Criteria & Deliverables
                      </h4>
                      <ul className="text-xs text-gray-600 dark:text-gray-400 space-y-1 list-disc list-inside">
                        {proj.testingCriteria.map((tc, i) => (
                          <li key={i}>{tc}</li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  {/* Milestones Checklist */}
                  <div className="space-y-3">
                    <h4 className="text-xs font-bold text-gray-800 dark:text-gray-200 uppercase tracking-wider flex items-center justify-between">
                      <span>Implementation Milestones</span>
                      <span className="text-primary-600 dark:text-primary-400 font-mono text-xs">
                        {Object.values(proj.completedMilestones).filter(Boolean).length} / {proj.milestones.length} Done
                      </span>
                    </h4>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      {proj.milestones.map((m) => {
                        const isDone = proj.completedMilestones[m.id] || false;
                        return (
                          <button
                            key={m.id}
                            type="button"
                            onClick={() => toggleMilestone(proj.id, m.id, isDone)}
                            className="flex items-start gap-2.5 p-2.5 rounded-lg border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800/60 text-left transition-colors"
                          >
                            {isDone ? (
                              <CheckCircle2 className="h-4 w-4 text-emerald-500 flex-shrink-0 mt-0.5" />
                            ) : (
                              <Square className="h-4 w-4 text-gray-400 flex-shrink-0 mt-0.5" />
                            )}
                            <span className={`text-xs ${isDone ? 'line-through text-gray-400' : 'text-gray-700 dark:text-gray-300 font-medium'}`}>
                              {m.title}
                            </span>
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* GitHub Repo Link & Notes */}
                  <div className="space-y-4 pt-2 border-t border-gray-100 dark:border-gray-800">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="space-y-1">
                        <label className="text-xs font-medium text-gray-700 dark:text-gray-300 flex items-center gap-1.5">
                          <Github className="h-3.5 w-3.5" /> GitHub Repository URL:
                        </label>
                        <div className="flex gap-2">
                          <input
                            type="url"
                            placeholder="https://github.com/your-username/repo-name"
                            value={currentGithub}
                            onChange={(e) => setGithubLinks({ ...githubLinks, [proj.id]: e.target.value })}
                            className="input-field text-xs py-1.5 flex-1"
                          />
                          {currentGithub && (
                            <a
                              href={currentGithub}
                              target="_blank"
                              rel="noreferrer"
                              className="btn-secondary p-1.5 flex items-center justify-center text-gray-600 hover:text-primary-600"
                              title="Open Repository"
                            >
                              <ExternalLink className="h-4 w-4" />
                            </a>
                          )}
                        </div>
                      </div>

                      <div className="space-y-1">
                        <label className="text-xs font-medium text-gray-700 dark:text-gray-300">
                          Notes, Breakthroughs & Reflection:
                        </label>
                        <input
                          type="text"
                          placeholder="What did you learn? What would you improve next time?"
                          value={currentReflection}
                          onChange={(e) => setReflections({ ...reflections, [proj.id]: e.target.value })}
                          className="input-field text-xs py-1.5"
                        />
                      </div>
                    </div>

                    <div className="flex justify-end gap-2">
                      {savedStatus[proj.id] && (
                        <span className="text-xs text-green-600 font-semibold self-center animate-pulse">
                          Saved!
                        </span>
                      )}
                      <button
                        onClick={() => handleSaveProjectDetails(proj.id)}
                        className="btn-primary text-xs flex items-center gap-1.5 py-1.5 px-3"
                      >
                        <Save className="h-3.5 w-3.5" /> Save Project Details
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
