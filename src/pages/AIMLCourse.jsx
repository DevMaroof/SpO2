import { useState, useMemo } from 'react';
import { useStudy } from '../context/StudyContext';
import { COURSE_TOPICS } from '../data/courseAndProjects';
import {
  GraduationCap,
  CheckCircle2,
  BookOpen,
  Code2,
  Star,
  AlertCircle,
  Plus,
  Search,
  Filter,
  HelpCircle,
  Clock,
  Sparkles,
} from 'lucide-react';
import ProgressBar from '../components/common/ProgressBar';
import Modal from '../components/common/Modal';

export default function AIMLCourse() {
  const { state, updateCourseTopic } = useStudy();
  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [newTopic, setNewTopic] = useState({ name: '', category: 'ML', description: '' });

  // Merge default topics with user state topics
  const topics = useMemo(() => {
    return COURSE_TOPICS.map((topic) => {
      const saved = state.courseTracker[topic.id] || {};
      return {
        ...topic,
        lectureAttended: saved.lectureAttended || false,
        notesCompleted: saved.notesCompleted || false,
        practicalCompleted: saved.practicalCompleted || false,
        confidenceRating: saved.confidenceRating || 0,
        questionsAndDifficulties: saved.questionsAndDifficulties || '',
        revisionRequired: saved.revisionRequired || false,
        completed: saved.completed || false,
      };
    });
  }, [state.courseTracker]);

  // Categories
  const categories = useMemo(() => {
    const cats = new Set(COURSE_TOPICS.map(t => t.category));
    return ['all', ...Array.from(cats)];
  }, []);

  // Filtered topics
  const filteredTopics = useMemo(() => {
    return topics.filter((t) => {
      const matchesSearch = t.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        t.description.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory = categoryFilter === 'all' || t.category === categoryFilter;
      return matchesSearch && matchesCategory;
    });
  }, [topics, searchQuery, categoryFilter]);

  // Overall statistics
  const stats = useMemo(() => {
    const total = topics.length;
    const lectures = topics.filter(t => t.lectureAttended).length;
    const notes = topics.filter(t => t.notesCompleted).length;
    const practicals = topics.filter(t => t.practicalCompleted).length;
    const fullyCompleted = topics.filter(t => t.completed).length;
    const needsRevision = topics.filter(t => t.revisionRequired).length;
    const rated = topics.filter(t => t.confidenceRating > 0);
    const avgConfidence = rated.length > 0
      ? (rated.reduce((sum, t) => sum + t.confidenceRating, 0) / rated.length).toFixed(1)
      : 'N/A';

    return {
      total,
      lectures,
      notes,
      practicals,
      fullyCompleted,
      needsRevision,
      avgConfidence,
      percentComplete: Math.round((fullyCompleted / (total || 1)) * 100),
    };
  }, [topics]);

  const handleToggle = (topicId, field, currentValue) => {
    updateCourseTopic(topicId, { [field]: !currentValue });
  };

  const handleRating = (topicId, rating) => {
    updateCourseTopic(topicId, { confidenceRating: rating });
  };

  const handleNotesChange = (topicId, text) => {
    updateCourseTopic(topicId, { questionsAndDifficulties: text });
  };

  const handleAddTopic = (e) => {
    e.preventDefault();
    if (!newTopic.name.trim()) return;
    const newId = `custom_topic_${Date.now()}`;
    updateCourseTopic(newId, {
      ...newTopic,
      lectureAttended: false,
      notesCompleted: false,
      practicalCompleted: false,
      confidenceRating: 0,
      questionsAndDifficulties: '',
      revisionRequired: false,
      completed: false,
    });
    setNewTopic({ name: '', category: 'ML', description: '' });
    setIsAddModalOpen(false);
  };

  return (
    <div className="max-w-7xl mx-auto space-y-6 pb-12">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-gray-200 dark:border-gray-800 pb-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-gray-100 flex items-center gap-3">
            <GraduationCap className="h-8 w-8 text-primary-600 dark:text-primary-400" />
            AI/ML Course Tracker
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mt-1">
            Track lecture attendance, notes, practical assignments, confidence ratings, and revision needs across your course modules.
          </p>
        </div>
        <button
          onClick={() => setIsAddModalOpen(true)}
          className="btn-primary flex items-center gap-2 text-sm"
        >
          <Plus className="h-4 w-4" />
          Add Custom Topic
        </button>
      </div>

      {/* Progress Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-6 gap-3">
        <div className="card p-4 text-center">
          <p className="text-xs font-medium text-gray-500 dark:text-gray-400">Total Modules</p>
          <p className="text-2xl font-bold text-gray-900 dark:text-gray-100 mt-1">{stats.total}</p>
        </div>
        <div className="card p-4 text-center">
          <p className="text-xs font-medium text-gray-500 dark:text-gray-400">Lectures Attended</p>
          <p className="text-2xl font-bold text-blue-600 dark:text-blue-400 mt-1">{stats.lectures}/{stats.total}</p>
        </div>
        <div className="card p-4 text-center">
          <p className="text-xs font-medium text-gray-500 dark:text-gray-400">Notes Taken</p>
          <p className="text-2xl font-bold text-indigo-600 dark:text-indigo-400 mt-1">{stats.notes}/{stats.total}</p>
        </div>
        <div className="card p-4 text-center">
          <p className="text-xs font-medium text-gray-500 dark:text-gray-400">Practicals Done</p>
          <p className="text-2xl font-bold text-emerald-600 dark:text-emerald-400 mt-1">{stats.practicals}/{stats.total}</p>
        </div>
        <div className="card p-4 text-center">
          <p className="text-xs font-medium text-gray-500 dark:text-gray-400">Average Confidence</p>
          <p className="text-2xl font-bold text-amber-500 mt-1 flex items-center justify-center gap-1">
            <Star className="h-5 w-5 fill-amber-400 text-amber-400" />
            {stats.avgConfidence}
          </p>
        </div>
        <div className="card p-4 text-center">
          <p className="text-xs font-medium text-gray-500 dark:text-gray-400">Needs Revision</p>
          <p className="text-2xl font-bold text-red-500 mt-1">{stats.needsRevision}</p>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="card p-4 space-y-2">
        <div className="flex justify-between items-center text-sm font-medium">
          <span className="text-gray-700 dark:text-gray-300">Overall Course Mastery</span>
          <span className="text-primary-600 dark:text-primary-400 font-bold">{stats.percentComplete}%</span>
        </div>
        <ProgressBar value={stats.percentComplete} color="bg-primary-600" size="md" />
        <p className="text-xs text-gray-500 dark:text-gray-400">
          Note: In accordance with our study principles, lecture attendance alone does not mark a topic as mastered. Completing notes, hands-on practicals, and confidence evaluation are key.
        </p>
      </div>

      {/* Filter and Search Bar */}
      <div className="card p-4 flex flex-col sm:flex-row gap-3 items-center justify-between">
        <div className="relative w-full sm:w-72">
          <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
          <input
            type="text"
            placeholder="Search topics..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="input-field pl-9 py-1.5 text-sm"
          />
        </div>
        <div className="flex items-center gap-2 w-full sm:w-auto overflow-x-auto pb-1 sm:pb-0">
          <Filter className="h-4 w-4 text-gray-400 flex-shrink-0" />
          <span className="text-xs text-gray-500 flex-shrink-0">Category:</span>
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setCategoryFilter(cat)}
              className={`px-3 py-1 rounded-full text-xs font-medium whitespace-nowrap transition-colors ${
                categoryFilter === cat
                  ? 'bg-primary-600 text-white'
                  : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
              }`}
            >
              {cat.charAt(0).toUpperCase() + cat.slice(1)}
            </button>
          ))}
        </div>
      </div>

      {/* Topics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filteredTopics.map((topic) => (
          <div
            key={topic.id}
            className={`card p-5 space-y-4 border-l-4 transition-all duration-200 ${
              topic.completed
                ? 'border-l-green-500 bg-green-50/20 dark:bg-green-950/10'
                : topic.revisionRequired
                ? 'border-l-amber-500'
                : 'border-l-primary-500'
            }`}
          >
            {/* Title & Category */}
            <div className="flex items-start justify-between gap-2">
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="font-semibold text-lg text-gray-900 dark:text-gray-100">
                    {topic.name}
                  </h3>
                  <span className="text-xs px-2 py-0.5 rounded bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400 font-mono">
                    {topic.category}
                  </span>
                </div>
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">{topic.description}</p>
              </div>
              <button
                onClick={() => handleToggle(topic.id, 'completed', topic.completed)}
                className={`p-1.5 rounded-lg border transition-colors ${
                  topic.completed
                    ? 'bg-green-100 border-green-500 text-green-700 dark:bg-green-900/30 dark:text-green-400'
                    : 'border-gray-300 dark:border-gray-600 text-gray-400 hover:text-green-600'
                }`}
                title={topic.completed ? 'Mark incomplete' : 'Mark module mastered'}
              >
                <CheckCircle2 className="h-5 w-5" />
              </button>
            </div>

            {/* Checklists */}
            <div className="grid grid-cols-3 gap-2 pt-1 border-t border-gray-100 dark:border-gray-800">
              <button
                onClick={() => handleToggle(topic.id, 'lectureAttended', topic.lectureAttended)}
                className={`flex items-center gap-1.5 p-2 rounded-lg text-xs font-medium border transition-all ${
                  topic.lectureAttended
                    ? 'bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-800 text-blue-700 dark:text-blue-300'
                    : 'border-gray-200 dark:border-gray-700 text-gray-500 hover:bg-gray-50 dark:hover:bg-gray-800'
                }`}
              >
                <Clock className="h-3.5 w-3.5" />
                <span>Lecture</span>
                {topic.lectureAttended && '✓'}
              </button>

              <button
                onClick={() => handleToggle(topic.id, 'notesCompleted', topic.notesCompleted)}
                className={`flex items-center gap-1.5 p-2 rounded-lg text-xs font-medium border transition-all ${
                  topic.notesCompleted
                    ? 'bg-indigo-50 dark:bg-indigo-900/20 border-indigo-200 dark:border-indigo-800 text-indigo-700 dark:text-indigo-300'
                    : 'border-gray-200 dark:border-gray-700 text-gray-500 hover:bg-gray-50 dark:hover:bg-gray-800'
                }`}
              >
                <BookOpen className="h-3.5 w-3.5" />
                <span>Notes</span>
                {topic.notesCompleted && '✓'}
              </button>

              <button
                onClick={() => handleToggle(topic.id, 'practicalCompleted', topic.practicalCompleted)}
                className={`flex items-center gap-1.5 p-2 rounded-lg text-xs font-medium border transition-all ${
                  topic.practicalCompleted
                    ? 'bg-emerald-50 dark:bg-emerald-900/20 border-emerald-200 dark:border-emerald-800 text-emerald-700 dark:text-emerald-300'
                    : 'border-gray-200 dark:border-gray-700 text-gray-500 hover:bg-gray-50 dark:hover:bg-gray-800'
                }`}
              >
                <Code2 className="h-3.5 w-3.5" />
                <span>Practical</span>
                {topic.practicalCompleted && '✓'}
              </button>
            </div>

            {/* Confidence Rating */}
            <div className="flex items-center justify-between text-xs pt-1">
              <span className="text-gray-500 dark:text-gray-400">Confidence Rating:</span>
              <div className="flex items-center gap-1">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    type="button"
                    onClick={() => handleRating(topic.id, star)}
                    className="p-0.5 hover:scale-110 transition-transform"
                    title={`Rate ${star} / 5`}
                  >
                    <Star
                      className={`h-4 w-4 ${
                        star <= topic.confidenceRating
                          ? 'fill-amber-400 text-amber-400'
                          : 'text-gray-300 dark:text-gray-600'
                      }`}
                    />
                  </button>
                ))}
              </div>
            </div>

            {/* Questions & Difficulties Notes Field */}
            <div className="space-y-1">
              <label className="text-xs font-medium text-gray-600 dark:text-gray-400 flex items-center justify-between">
                <span>Questions & Doubts:</span>
                <button
                  type="button"
                  onClick={() => handleToggle(topic.id, 'revisionRequired', topic.revisionRequired)}
                  className={`text-[11px] flex items-center gap-1 px-1.5 py-0.5 rounded transition-colors ${
                    topic.revisionRequired
                      ? 'bg-amber-100 text-amber-800 dark:bg-amber-900/40 dark:text-amber-300 font-semibold'
                      : 'text-gray-400 hover:text-amber-600'
                  }`}
                >
                  <AlertCircle className="h-3 w-3" />
                  {topic.revisionRequired ? 'Needs Revision' : 'Flag Revision'}
                </button>
              </label>
              <textarea
                rows={2}
                placeholder="Record questions, sticking points, or topics to ask your instructor..."
                value={topic.questionsAndDifficulties}
                onChange={(e) => handleNotesChange(topic.id, e.target.value)}
                className="input-field text-xs py-1.5 resize-none"
              />
            </div>
          </div>
        ))}
      </div>

      {/* Add Topic Modal */}
      <Modal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        title="Add Custom Course Topic"
        size="md"
      >
        <form onSubmit={handleAddTopic} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Topic Name *
            </label>
            <input
              type="text"
              required
              placeholder="e.g. Graph Neural Networks, LoRA Fine-Tuning"
              value={newTopic.name}
              onChange={(e) => setNewTopic({ ...newTopic, name: e.target.value })}
              className="input-field text-sm"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Category
            </label>
            <select
              value={newTopic.category}
              onChange={(e) => setNewTopic({ ...newTopic, category: e.target.value })}
              className="input-field text-sm"
            >
              <option value="Programming">Programming</option>
              <option value="Data">Data</option>
              <option value="Mathematics">Mathematics</option>
              <option value="ML">Machine Learning</option>
              <option value="AI">Generative AI</option>
              <option value="Deployment">Deployment</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Description
            </label>
            <textarea
              rows={3}
              placeholder="Brief outline of concepts covered in this module..."
              value={newTopic.description}
              onChange={(e) => setNewTopic({ ...newTopic, description: e.target.value })}
              className="input-field text-sm"
            />
          </div>
          <div className="flex justify-end gap-2 pt-2">
            <button
              type="button"
              onClick={() => setIsAddModalOpen(false)}
              className="btn-secondary text-sm"
            >
              Cancel
            </button>
            <button type="submit" className="btn-primary text-sm">
              Add Topic
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
}

