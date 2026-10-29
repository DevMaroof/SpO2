import { Routes, Route } from 'react-router-dom';
import { StudyProvider } from './context/StudyContext';
import Layout from './components/Layout';
import Dashboard from './pages/Dashboard';
import TodaysPlan from './pages/TodaysPlan';
import Mathematics from './pages/Mathematics';
import Python from './pages/Python';
import AIMLCourse from './pages/AIMLCourse';
import Revision from './pages/Revision';
import MathAssessment from './pages/MathAssessment';
import PythonAssessment from './pages/PythonAssessment';
import Projects from './pages/Projects';
import Progress from './pages/Progress';

function App() {
  return (
    <StudyProvider>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Dashboard />} />
          <Route path="today" element={<TodaysPlan />} />
          <Route path="mathematics" element={<Mathematics />} />
          <Route path="python" element={<Python />} />
          <Route path="aiml" element={<AIMLCourse />} />
          <Route path="revision" element={<Revision />} />
          <Route path="math-assessment" element={<MathAssessment />} />
          <Route path="python-assessment" element={<PythonAssessment />} />
          <Route path="projects" element={<Projects />} />
          <Route path="progress" element={<Progress />} />
        </Route>
      </Routes>
    </StudyProvider>
  );
}

export default App;

