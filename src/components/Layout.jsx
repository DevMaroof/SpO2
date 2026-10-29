import { useState, useEffect } from 'react';
import { Outlet, NavLink, useLocation, Link } from 'react-router-dom';
import {
  LayoutDashboard,
  Calendar,
  Calculator,
  Code,
  Brain,
  BookOpen,
  FileQuestion,
  Terminal,
  FolderKanban,
  BarChart3,
  Sun,
  Moon,
  Timer,
  Pause,
  Play,
  Square,
  ChevronLeft,
  ChevronRight,
  Menu,
  X,
} from 'lucide-react';
import { useStudy } from '../context/StudyContext';

const NAV_ITEMS = [
  { label: 'Dashboard', icon: LayoutDashboard, route: '/' },
  { label: "Today's Plan", icon: Calendar, route: '/today' },
  { label: 'Mathematics', icon: Calculator, route: '/mathematics' },
  { label: 'Python', icon: Code, route: '/python' },
  { label: 'AI/ML Course', icon: Brain, route: '/aiml' },
  { label: 'Daily Revision', icon: BookOpen, route: '/revision' },
  { label: 'Math Assessment', icon: FileQuestion, route: '/math-assessment' },
  { label: 'Python Assessment', icon: Terminal, route: '/python-assessment' },
  { label: 'Projects', icon: FolderKanban, route: '/projects' },
  { label: 'Progress', icon: BarChart3, route: '/progress' },
];

export default function Layout() {
  const {
    state,
    currentDayNumber,
    updateSettings,
    activeTimer,
    getTimerForBlock,
    pauseTimer,
    resumeTimer,
    stopTimer,
  } = useStudy();
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  const isDark = state.settings.theme === 'dark';

  // Apply dark mode class to html element
  useEffect(() => {
    const root = document.documentElement;
    if (isDark) {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
  }, [isDark]);

  // Close mobile menu on route change
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location.pathname]);

  const toggleTheme = () => {
    const nextTheme = isDark ? 'light' : 'dark';
    updateSettings({ theme: nextTheme });
    try {
      localStorage.setItem('theme', nextTheme);
    } catch (e) {}
    const root = document.documentElement;
    if (nextTheme === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
  };

  const toggleSidebar = () => {
    setSidebarCollapsed((prev) => !prev);
  };

  return (
    <div className="flex h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100">
      {/* Desktop Sidebar (Laptop and Desktop view) */}
      <aside
        className={`hidden lg:flex flex-col fixed inset-y-0 left-0 z-30 bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 transition-all duration-300 ease-in-out ${sidebarCollapsed ? 'w-16' : 'w-[280px]'
          }`}
      >
        {/* Sidebar Header */}
        <div
          className={`flex items-center h-16 border-b border-gray-200 dark:border-gray-700 transition-all ${
            sidebarCollapsed ? 'px-2 justify-between' : 'px-4 justify-between'
          }`}
        >
          {sidebarCollapsed ? (
            <div className="flex items-center justify-between w-full">
              <Link
                to="/"
                title="StudyPlanner"
                className="text-primary-600 dark:text-primary-400 hover:opacity-80 transition-opacity flex items-center justify-center"
              >
                <Brain className="w-5 h-5" />
              </Link>
              <button
                onClick={toggleSidebar}
                className="w-6 h-6 flex items-center justify-center rounded-md hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-200 transition-colors"
                aria-label="Expand sidebar"
                title="Expand sidebar"
              >
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>
          ) : (
            <>
              <div className="flex items-center gap-2 min-w-0">
                <Brain className="w-7 h-7 text-primary-600 dark:text-primary-400 shrink-0" />
                <span className="font-bold text-lg truncate">StudyPlanner</span>
              </div>
              <button
                onClick={toggleSidebar}
                className="p-1.5 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-500 dark:text-gray-400 transition-colors"
                aria-label="Collapse sidebar"
                title="Collapse sidebar"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
            </>
          )}
        </div>

        {/* Nav Items */}
        <nav className="flex-1 overflow-y-auto py-4 px-2 space-y-1" aria-label="Main navigation">
          {NAV_ITEMS.map((item) => {
            const Icon = item.icon;
            return (
              <NavLink
                key={item.route}
                to={item.route}
                end={item.route === '/'}
                className={({ isActive }) =>
                  `flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors duration-200 group ${isActive
                    ? 'bg-primary-50 dark:bg-primary-900/20 text-primary-700 dark:text-primary-400'
                    : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700/50 hover:text-gray-900 dark:hover:text-gray-200'
                  }`
                }
                title={sidebarCollapsed ? item.label : undefined}
              >
                <Icon className="w-5 h-5 shrink-0" />
                {!sidebarCollapsed && (
                  <span className="truncate">{item.label}</span>
                )}
              </NavLink>
            );
          })}
        </nav>

        {/* Sidebar Footer */}
        {!sidebarCollapsed && (
          <div className="p-4 border-t border-gray-200 dark:border-gray-700">
            <div className="text-xs text-gray-500 dark:text-gray-400">
              Week {Math.ceil(currentDayNumber / 5)} · Day {currentDayNumber}
            </div>
          </div>
        )}
      </aside>

      {/* Main Content Area */}
      <div
        className={`flex-1 flex flex-col min-w-0 h-full overflow-hidden transition-all duration-300 ease-in-out ${sidebarCollapsed ? 'lg:ml-16' : 'lg:ml-[280px]'
          }`}
      >
        {/* Header */}
        <header className="sticky top-0 z-20 h-16 shrink-0 flex items-center justify-between px-3 sm:px-4 md:px-6 bg-white/80 dark:bg-gray-800/80 backdrop-blur-md border-b border-gray-200 dark:border-gray-700">
          <div className="flex items-center gap-2 sm:gap-3 min-w-0">
            {/* Mobile/Tablet menu toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-600 dark:text-gray-400 transition-colors shrink-0"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>

            {/* StudyPlanner Logo & Brain Icon - visible on mobile and tablet only */}
            <Link
              to="/"
              className="flex lg:hidden items-center gap-2 min-w-0 hover:opacity-85 transition-opacity"
              aria-label="StudyPlanner Home"
            >
              <Brain className="w-6 h-6 sm:w-7 sm:h-7 text-primary-600 dark:text-primary-400 shrink-0" />
              <span className="font-bold text-base sm:text-lg text-gray-900 dark:text-gray-100 tracking-tight truncate">
                StudyPlanner
              </span>
            </Link>
          </div>

          <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
            {/* Active Study Timer Pill */}
            {activeTimer && (
              <div className="flex items-center gap-1 sm:gap-1.5 px-2 sm:px-2.5 py-1 rounded-full bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800/60 text-xs text-emerald-800 dark:text-emerald-300 font-medium shadow-sm">
                <Timer className={`w-3.5 h-3.5 ${activeTimer.isRunning ? 'animate-pulse text-emerald-600 dark:text-emerald-400' : 'text-gray-400'}`} />
                <span className="capitalize hidden md:inline">{activeTimer.block}:</span>
                <span className="font-mono font-bold tabular-nums">
                  {(() => {
                    const sec = getTimerForBlock(activeTimer.block).seconds;
                    const mins = Math.floor(sec / 60);
                    const secs = sec % 60;
                    return `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
                  })()}
                </span>
                <button
                  onClick={() => activeTimer.isRunning ? pauseTimer() : resumeTimer()}
                  className="p-1 hover:bg-emerald-200 dark:hover:bg-emerald-800/60 rounded transition-colors text-emerald-700 dark:text-emerald-300"
                  title={activeTimer.isRunning ? "Pause Timer" : "Resume Timer"}
                >
                  {activeTimer.isRunning ? <Pause className="w-3 h-3" /> : <Play className="w-3 h-3" />}
                </button>
                <button
                  onClick={stopTimer}
                  className="p-1 hover:bg-red-100 dark:hover:bg-red-900/40 rounded text-red-600 dark:text-red-400 transition-colors"
                  title="Stop & Save Recorded Time"
                >
                  <Square className="w-3 h-3 fill-current" />
                </button>
              </div>
            )}

            {/* Dark Mode Toggle */}
            <button
              onClick={toggleTheme}
              className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-600 dark:text-gray-400 transition-colors"
              aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
            >
              {isDark ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            </button>
          </div>
        </header>

        {/* Mobile & Tablet Slide-out Menu */}
        {mobileMenuOpen && (
          <>
            {/* Backdrop */}
            <div
              className="lg:hidden fixed inset-0 z-40 bg-black/50 backdrop-blur-xs transition-opacity"
              onClick={() => setMobileMenuOpen(false)}
              aria-hidden="true"
            />
            {/* Menu Panel */}
            <div className="lg:hidden fixed inset-y-0 left-0 z-50 w-72 max-w-[85vw] bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 shadow-2xl flex flex-col">
              <div className="flex items-center justify-between h-16 px-4 border-b border-gray-200 dark:border-gray-700 shrink-0">
                <span className="font-semibold text-base text-gray-900 dark:text-gray-100">
                  Menu
                </span>
                <button
                  onClick={() => setMobileMenuOpen(false)}
                  className="p-1.5 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-500 dark:text-gray-400 transition-colors"
                  aria-label="Close menu"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
              <nav className="flex-1 overflow-y-auto py-4 px-2 space-y-1" aria-label="Mobile navigation">
                {NAV_ITEMS.map((item) => {
                  const Icon = item.icon;
                  return (
                    <NavLink
                      key={item.route}
                      to={item.route}
                      end={item.route === '/'}
                      className={({ isActive }) =>
                        `flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors duration-200 ${isActive
                          ? 'bg-primary-50 dark:bg-primary-900/20 text-primary-700 dark:text-primary-400 font-semibold'
                          : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700/50 hover:text-gray-900 dark:hover:text-gray-200'
                        }`
                      }
                    >
                      <Icon className="w-5 h-5 shrink-0" />
                      <span>{item.label}</span>
                    </NavLink>
                  );
                })}
              </nav>
            </div>
          </>
        )}

        {/* Page Content */}
        <main className="flex-1 overflow-y-auto min-w-0 p-3 sm:p-4 md:p-6 pb-24 md:pb-8">
          <Outlet />
        </main>
      </div>

      {/* Mobile Bottom Navigation */}
      <nav
        className="md:hidden fixed bottom-0 inset-x-0 z-30 bg-white/95 dark:bg-gray-800/95 backdrop-blur border-t border-gray-200 dark:border-gray-700 safe-bottom"
        aria-label="Bottom navigation"
      >
        <div className="flex items-center justify-around h-16 overflow-x-auto px-1">
          {NAV_ITEMS.slice(0, 5).map((item) => {
            const Icon = item.icon;
            return (
              <NavLink
                key={item.route}
                to={item.route}
                end={item.route === '/'}
                className={({ isActive }) =>
                  `flex flex-col items-center justify-center gap-0.5 px-2 py-1 min-w-0 rounded-lg transition-colors ${isActive
                    ? 'text-primary-600 dark:text-primary-400'
                    : 'text-gray-500 dark:text-gray-400'
                  }`
                }
              >
                <Icon className="w-5 h-5" />
                <span className="text-[10px] font-medium truncate max-w-[56px]">
                  {item.label}
                </span>
              </NavLink>
            );
          })}
          {/* More button for remaining items – opens mobile menu */}
          <button
            onClick={() => setMobileMenuOpen(true)}
            className="flex flex-col items-center justify-center gap-0.5 px-2 py-1 text-gray-500 dark:text-gray-400"
            aria-label="More navigation options"
          >
            <Menu className="w-5 h-5" />
            <span className="text-[10px] font-medium">More</span>
          </button>
        </div>
      </nav>
    </div>
  );
}
