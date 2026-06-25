# DSA GURU

> **All-in-One Computer Science Placement Preparation Arena & Interactive Job Tracking Portal.**

DSA Guru is a premium, high-fidelity Single Page Application (SPA) designed to streamline the tech recruitment cycle. Built entirely from scratch using vanilla web technologies, the platform unifies coding sheets, algorithm visualizers, core CS quizzes, mock behavioral interviews, and job tracking into a single glassmorphic dashboard.

---

## Key Features

### 1. Dashboard Overview
* **Real-time Analytics**: Displays overall progress indicators aggregated from localStorage (applied positions count, sheet checklist percentage, and quiz accuracy ratings).
* **Actionable Roadmap**: Suggests subsequent milestones (e.g., target DSA problems, mock interview sessions).
* **Recent Activities Log**: Chronological logging of student performance metrics and ticks.

### 2. Topic-wise DSA Sheet & Playground
* **Checklist Progress Tracker**: Interactive topics grid (Arrays, Strings, Linked Lists, DP) with progress indicators and checklists.
* **Coding Playground**: In-browser code editor featuring JavaScript, Python, C++, and Java boilerplates.
* **Compiler Simulation**: Test cases runner compiling execution outputs and calculating spatial/temporal complexity.
* **Algorithm Visualizer**: Real-time canvas rendering sorting loops (Bubble, Selection, Insertion Sort) with adjustable delay speed and array bounds.

### 3. Prep Arena (Aptitude, Core CS & HR)
* **CS Revision guides**: Curated notes covering Aptitude, Operating Systems, DBMS, and Computer Networks.
* **Timed Quizzes**: 2-minute countdown assessments with correction scoreboards and detailed logic explanations.
* **3D Flashcards**: Flip-to-reveal review cards matching essential terminology.
* **HR Chatbot Simulator**: Mock behavioral rounds analyzing candidate reply lengths, checking structure, and verifying the STAR method (Situation, Task, Action, Result) with scores out of 10.

### 4. Job Portal & Resume Builder
* **Explore Positions**: Real-time list filterable by roles, keywords, or company.
* **Kanban Tracker Board**: Manage applications status columns (Applied, Interviewing, Offer, Rejected).
* **Print-ready Resume Builder**: Real-time form compilation updating template dimensions. Supports print styling formatting ready to save directly as a PDF.

### 5. Company Guides
* Comprehensive recruitment syllabus guides for tech organizations (Google, Amazon, TCS Ninja/Digital).
* Deep-dive details regarding exam patterns, eligibility requirements, selection rounds, and tips.

---

## Technology Stack & Architecture

* **Frontend Structure**: HTML5 (Semantic Structure)
* **Styling & Theme Engine**: Modern HSL CSS variables, glassmorphic filters, and keyframe micro-animations (responsive Dark/Light mode overrides).
* **Logic Controllers**: Component-based ES6 JavaScript.
* **Persistence**: Synchronous state saving using the browser's storage API.

---

## Repository Structure

```text
dsa-guru/
├── index.html          # SPA Master layout container and Lock Screen Form
├── css/
│   ├── styles.css      # CSS theme variables, global templates, login layouts
│   ├── portal.css      # Styling configurations for Job listings and Resume elements
│   ├── prep.css        # Quiz boards, 3D Flashcards, and Chat bubble bubbles
│   ├── dsa.css         # Coding workspaces, consoles, and visualizer array bars
│   └── company.css     # Company guide selectors, cards, and timelines
└── js/
    ├── data.js         # Shared mock database (Jobs, Quizzes, C++/Java/JS/Py code boilerplates)
    ├── app.js          # Router, session controllers, theme handlers, logger
    ├── portal.js       # Applied history, Kanban movements, resume inputs
    ├── prep.js         # Countdown timers, question sets, HR evaluator replies
    ├── dsa.js          # Table toggles, template loaders, visualizer loops
    └── company.js      # List filter rules and detailed guide loaders
