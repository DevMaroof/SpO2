<<<<<<< HEAD
# AI/ML Daily Study Planner

An interactive web application that transforms your AI/ML study journey into a structured, trackable learning experience. Built with React, Vite, and Tailwind CSS.

## 🎯 What This App Does

- **Daily Study Plans**: Follow a structured 4-hour daily study schedule covering Mathematics, Python, AI/ML, and Revision
- **Interactive Learning**: Complete lessons with real explanations, worked examples, and exercises
- **Progress Tracking**: Visual dashboard with charts showing your learning progress
- **Assessments**: Daily math and Python quizzes with hidden solutions and scoring
- **Project Tracker**: 10 progressive projects from calculator to LLM application
- **Revision System**: Flag topics for review, track what needs attention

## 🏗️ Tech Stack

- **Frontend**: React 18, Vite, Tailwind CSS
- **Routing**: React Router v6
- **Charts**: Recharts
- **Icons**: Lucide React
- **Persistence**: localStorage (with export/import capability)

## 📁 Project Structure

```
src/
├── main.jsx                # Entry point
├── App.jsx                 # Router setup
├── index.css               # Global styles + Tailwind
├── components/
│   ├── Layout.jsx          # App shell with sidebar
│   └── common/             # Reusable UI components
│       ├── StatusBadge.jsx
│       ├── ProgressBar.jsx
│       ├── TaskCard.jsx
│       ├── Modal.jsx
│       ├── EmptyState.jsx
│       ├── ConfirmDialog.jsx
│       └── StudyTimer.jsx
├── pages/
│   ├── Dashboard.jsx       # Overview & charts
│   ├── TodaysPlan.jsx      # Daily to-do interface
│   ├── Mathematics.jsx     # Math lessons by stage
│   ├── Python.jsx          # Python lessons by stage
│   ├── AIMLCourse.jsx      # Course tracker
│   ├── Revision.jsx        # Daily revision workspace
│   ├── MathAssessment.jsx  # Math quiz (10 questions)
│   ├── PythonAssessment.jsx# Python quiz (10 questions)
│   ├── Projects.jsx        # Project tracker
│   └── Progress.jsx        # History & analytics
├── context/
│   └── StudyContext.jsx    # Global state management
├── data/
│   ├── curriculum.js       # Study content & schedule
│   └── courseAndProjects.js# Course topics & projects
└── utils/
    ├── storage.js          # Persistence layer
    └── helpers.js          # Constants & utilities
```

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ 
- npm 8+

### Installation

```bash
# Clone the repository
git clone <your-repo-url>
cd Todo-ai

# Install dependencies
npm install

# Start development server
npm run dev
```

The app will open at `http://localhost:5173`

### Build for Production

```bash
npm run build
npm run preview
```

## 📅 Study Schedule

Each study day follows this fixed 4-hour structure:

| Block | Duration | Focus |
|-------|----------|-------|
| Mathematics | 60 min | Concepts, examples, exercises |
| Python | 90 min | Code examples, practice, debugging |
| AI/ML Course | 60 min | Course material, implementation |
| Revision | 30 min | Review + 10 math & 10 Python questions |

## 📚 Curriculum (24 Weeks)

### Mathematics Stages
1. **Arithmetic & Algebra** (Weeks 1-4)
2. **Functions & Graphs** (Weeks 5-8)
3. **Probability & Statistics** (Weeks 9-12)
4. **Linear Algebra** (Weeks 13-16)
5. **Calculus & Optimization** (Weeks 17-20)
6. **Math for AI/ML** (Weeks 21-24)

### Python Stages
1. **Fundamentals** (Weeks 1-4)
2. **Data Structures** (Weeks 5-8)
3. **Functions & Program Structure** (Weeks 9-12)
4. **Data Handling (NumPy/pandas)** (Weeks 13-16)
5. **Python for ML** (Weeks 17-20)

## 💾 Data Persistence

- All data is stored in your browser's localStorage
- Data survives page refreshes and browser restarts
- **Export**: Settings → Export Data (saves as JSON)
- **Import**: Settings → Import Data (restore from JSON backup)
- **Important**: Data is local to this browser. Use export/import to transfer between devices.

## ✅ Implemented Features

- [x] 10-tab navigation with sidebar
- [x] Interactive dashboard with live charts
- [x] Daily study planner with task management
- [x] Mathematics lessons (6 stages, complete Week 1)
- [x] Python lessons (5 stages, complete Week 1)
- [x] AI/ML course tracker
- [x] Daily revision workspace
- [x] Math assessment (10 questions/day)
- [x] Python assessment (10 questions/day)
- [x] Project tracker (10 projects)
- [x] Progress history & analytics
- [x] Task completion with status tracking
- [x] Study timer per block
- [x] Dark mode
- [x] Responsive design
- [x] Data export/import
- [x] Revision flagging system

## ⚠️ Known Limitations

- **Content Depth**: Week 1 (Days 1-5) has fully detailed lessons. Weeks 2-24 have structured content with shorter explanations. More content can be progressively added.
- **Code Execution**: Python code examples are display-only. Copy code to run in your local Python environment.
- **Storage**: Uses browser localStorage (~5-10MB limit). For larger datasets, a backend with PostgreSQL is recommended.
- **No Backend**: This version is frontend-only. A Node.js/Express backend can be added for multi-device sync.
- **Assessment Checking**: Uses text comparison for answers. Complex mathematical expressions use self-assessment.

## 🔮 Future Enhancements

- PostgreSQL backend with Express API
- Real Python code execution (sandboxed)
- Spaced repetition for revision
- PDF export of notes and assessments
- Collaborative features
- Mobile app (React Native)

## 📄 License

MIT

=======
# SpO2
Studdy Planner
>>>>>>> 1b10d5c7a351f179a8a707880c7e110a54d0f5be
