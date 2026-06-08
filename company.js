// Main App Controller & Router

const App = {
  currentScreen: 'dashboard',
  isLightTheme: false,
  activities: [],
  currentUser: null,

  init() {
    // Initialize child modules
    JobPortal.init();
    PrepArena.init();
    DSAPrep.init();
    CompanyGuides.init();

    this.loadActivities();
    
    // Add default initial activities if empty
    if (this.activities.length === 0) {
      this.logActivity("Welcome to DSA Guru! Start exploring coding sheets and prep guides.");
      this.logActivity("Profile initialization complete.");
    }

    // Check user session
    const session = localStorage.getItem('dsa_guru_session');
    if (session) {
      this.currentUser = JSON.parse(session);
      this.hideLoginOverlay();
      this.updateUserUI();
    } else {
      this.showLoginOverlay();
    }

    // Load initial screen
    this.navigate('dashboard');
  },

  // --- Session Authentication ---
  showLoginOverlay() {
    const overlay = document.getElementById('login-overlay');
    if (overlay) overlay.classList.add('active');
  },

  hideLoginOverlay() {
    const overlay = document.getElementById('login-overlay');
    if (overlay) overlay.classList.remove('active');
  },

  handleLoginSubmit(event) {
    event.preventDefault();
    const nameInput = document.getElementById('login-username');
    const name = nameInput ? nameInput.value.trim() : 'Alex Johnson';
    this.loginUser(name, 'Premium Student');
  },

  handleMockLogin() {
    this.loginUser('Alex Johnson', 'Premium Student');
  },

  loginUser(name, role) {
    const user = { name, role };
    localStorage.setItem('dsa_guru_session', JSON.stringify(user));
    this.currentUser = user;
    this.hideLoginOverlay();
    this.updateUserUI();
    this.logActivity(`Logged in as ${name}.`);
    
    // Refresh dashboard stats
    this.navigate('dashboard');
  },

  updateUserUI() {
    const usernameEl = document.getElementById('sidebar-username');
    const userroleEl = document.getElementById('sidebar-userrole');
    const avatarEl = document.getElementById('sidebar-user-avatar');
    
    if (this.currentUser) {
      if (usernameEl) usernameEl.innerText = this.currentUser.name;
      if (userroleEl) userroleEl.innerText = this.currentUser.role;
      if (avatarEl) {
        avatarEl.innerText = this.currentUser.name
          .split(' ')
          .map(word => word[0])
          .join('')
          .toUpperCase()
          .slice(0, 2);
      }
    }
  },

  logout() {
    if (confirm("Are you sure you want to log out from DSA Guru?")) {
      // Clean active intervals
      if (window.DSAPrep) {
        window.DSAPrep.stopSortingFlag = true;
      }
      if (window.PrepArena && window.PrepArena.quizTimerInterval) {
        clearInterval(window.PrepArena.quizTimerInterval);
        window.PrepArena.quizTimerInterval = null;
      }

      localStorage.removeItem('dsa_guru_session');
      this.currentUser = null;
      
      // Clear activities/stats display locally
      this.showLoginOverlay();
    }
  },

  logActivity(message) {
    this.activities.unshift({
      id: "act-" + Date.now(),
      text: message,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    });
    // Keep max 5 activities
    if (this.activities.length > 5) {
      this.activities.pop();
    }
    this.saveActivities();
  },

  loadActivities() {
    const saved = localStorage.getItem('app_activities');
    if (saved) {
      this.activities = JSON.parse(saved);
    }
  },

  saveActivities() {
    localStorage.setItem('app_activities', JSON.stringify(this.activities));
  },

  // --- Router ---
  navigate(screenName) {
    // If not authenticated, ignore navigation triggers
    if (!this.currentUser) {
      this.showLoginOverlay();
      return;
    }

    // Stop any running animations/timers
    if (window.DSAPrep) {
      window.DSAPrep.stopSortingFlag = true;
    }
    if (window.PrepArena && window.PrepArena.quizTimerInterval) {
      clearInterval(window.PrepArena.quizTimerInterval);
      window.PrepArena.quizTimerInterval = null;
    }

    this.currentScreen = screenName;
    
    // Update active class in sidebar
    const navItems = document.querySelectorAll('.nav-item');
    navItems.forEach(item => item.classList.remove('active'));
    
    const targetNav = document.getElementById(`nav-${screenName}`);
    if (targetNav) targetNav.classList.add('active');

    // Update Top Header Page Info
    const title = document.getElementById('header-page-title');
    const subtitle = document.getElementById('header-page-subtitle');
    
    if (title && subtitle) {
      if (screenName === 'dashboard') {
        title.innerText = "Dashboard Overview";
        subtitle.innerText = "Forge your career pathway with structured sheets, prep quizzes, and jobs.";
      } else if (screenName === 'jobs') {
        title.innerText = "Job Portal & Board";
        subtitle.innerText = "Discover jobs matching your skills and build premium resumes.";
      } else if (screenName === 'prep') {
        title.innerText = "Preparation Arena";
        subtitle.innerText = "Review study materials and challenge yourself with mock tests.";
      } else if (screenName === 'company') {
        title.innerText = "Company Profiles";
        subtitle.innerText = "Exam patterns, eligibility criteria, and hiring pipelines.";
      } else if (screenName === 'dsa') {
        title.innerText = "DSA Sheets & Playground";
        subtitle.innerText = "Topic-wise coding sheets, compilers, and visualizers.";
      }
    }

    // Render screen
    if (screenName === 'dashboard') {
      this.renderDashboard();
    } else if (screenName === 'jobs') {
      JobPortal.render('app-content');
    } else if (screenName === 'prep') {
      PrepArena.render('app-content');
    } else if (screenName === 'company') {
      CompanyGuides.render('app-content');
    } else if (screenName === 'dsa') {
      DSAPrep.render('app-content');
    }

    // Collapse sidebar on mobile screens when navigating
    const sidebar = document.getElementById('sidebar');
    if (sidebar) sidebar.classList.remove('active');
  },

  // --- Toggle Sidebar on Mobile ---
  toggleSidebar() {
    const sidebar = document.getElementById('sidebar');
    if (sidebar) sidebar.classList.toggle('active');
  },

  // --- Theme Toggler ---
  toggleTheme() {
    this.isLightTheme = !this.isLightTheme;
    const body = document.body;
    const themeIcon = document.getElementById('theme-btn-icon');

    if (this.isLightTheme) {
      body.classList.add('light-theme');
      if (themeIcon) themeIcon.innerText = "☀️";
    } else {
      body.classList.remove('light-theme');
      if (themeIcon) themeIcon.innerText = "🌙";
    }
  },

  // --- Render Dashboard Screen ---
  renderDashboard() {
    const container = document.getElementById('app-content');
    if (!container) return;

    // Load dynamic statistics
    const stats = this.getStats();

    container.innerHTML = `
      <!-- Statistics Row -->
      <section class="dashboard-stats-row">
        <div class="glass-card stat-card">
          <div class="stat-icon">💼</div>
          <div>
            <div class="stat-number">${stats.jobsApplied}</div>
            <div class="stat-label">Jobs Applied</div>
          </div>
        </div>
        <div class="glass-card stat-card">
          <div class="stat-icon">⚡</div>
          <div>
            <div class="stat-number">${stats.dsaProgress}%</div>
            <div class="stat-label">DSA Checklist</div>
          </div>
        </div>
        <div class="glass-card stat-card">
          <div class="stat-icon">🎯</div>
          <div>
            <div class="stat-number">${stats.quizAverage}%</div>
            <div class="stat-label">Quiz Accuracy</div>
          </div>
        </div>
      </section>

      <!-- Main Layout -->
      <div class="dashboard-grid">
        
        <!-- Left Panel: Quick Activities / Goals -->
        <div class="dashboard-left-panel">
          <div class="glass-card">
            <h2 style="font-size: 18px; margin-bottom: 20px; font-family: var(--font-display);">Your Preparation Roadmap</h2>
            
            <div class="quick-activities">
              <div class="activity-item">
                <div class="activity-info">
                  <span class="activity-badge" style="background: var(--primary);"></span>
                  <div>
                    <h3 style="font-size: 14px; font-weight: 700;">Leetcode Practice Tracker</h3>
                    <p style="font-size: 12px; color: var(--text-muted);">Current: ${stats.dsaSolved} / ${stats.dsaTotal} problems completed.</p>
                  </div>
                </div>
                <button class="btn btn-secondary" style="padding: 6px 12px; font-size: 12px;" onclick="App.navigate('dsa')">Practice</button>
              </div>

              <div class="activity-item">
                <div class="activity-info">
                  <span class="activity-badge" style="background: var(--secondary);"></span>
                  <div>
                    <h3 style="font-size: 14px; font-weight: 700;">Complete Aptitude & CS Core Quizzes</h3>
                    <p style="font-size: 12px; color: var(--text-muted);">Test logical efficiency and get performance analytics.</p>
                  </div>
                </div>
                <button class="btn btn-secondary" style="padding: 6px 12px; font-size: 12px;" onclick="App.navigate('prep')">Take Quiz</button>
              </div>

              <div class="activity-item">
                <div class="activity-info">
                  <span class="activity-badge" style="background: var(--accent);"></span>
                  <div>
                    <h3 style="font-size: 14px; font-weight: 700;">Recruitment Guides</h3>
                    <p style="font-size: 12px; color: var(--text-muted);">Google, Amazon, TCS patterns syllabus databases.</p>
                  </div>
                </div>
                <button class="btn btn-secondary" style="padding: 6px 12px; font-size: 12px;" onclick="App.navigate('company')">Browse Guides</button>
              </div>
            </div>
          </div>
          
          <!-- Quick Tips Panel -->
          <div class="glass-card" style="background: linear-gradient(135deg, rgba(99, 102, 241, 0.05) 0%, rgba(6, 182, 212, 0.05) 100%);">
            <h2 style="font-size: 16px; margin-bottom: 8px; font-family: var(--font-display); color: var(--secondary);">💡 Quick Resume Checklist Tip</h2>
            <p style="font-size: 13px; line-height: 1.6; color: var(--text-muted);">Make sure your resume contains quantitative bullet points (e.g. 'Improved efficiency by 20%'). Employers prefer achievements with concrete data metrics. Use our built-in print-ready builder to format your draft!</p>
          </div>
        </div>

        <!-- Right Panel: Activity Feed -->
        <aside class="glass-card" style="align-self: start;">
          <h2 style="font-size: 18px; margin-bottom: 20px; font-family: var(--font-display);">Recent Activities</h2>
          
          <div style="display: flex; flex-direction: column; gap: 16px;">
            ${this.activities.map(act => `
              <div style="padding-bottom: 12px; border-bottom: 1px solid var(--border-glass); display: flex; justify-content: space-between; align-items: start;">
                <div style="font-size: 13px; color: var(--text-main); line-height: 1.4; padding-right: 12px;">${act.text}</div>
                <div style="font-size: 11px; color: var(--text-muted); white-space: nowrap;">${act.time}</div>
              </div>
            `).join('')}
          </div>
        </aside>

      </div>
    `;
  },

  getStats() {
    // Calculate jobs applied
    const jobsApplied = JobPortal.appliedJobs.length;

    // Calculate DSA progress
    let dsaTotal = 0;
    let dsaSolved = 0;
    APP_DATA.dsa.topics.forEach(topic => {
      topic.questions.forEach(q => {
        dsaTotal++;
        if (DSAPrep.solvedQuestions[q.id]) dsaSolved++;
      });
    });
    const dsaProgress = dsaTotal > 0 ? Math.round((dsaSolved / dsaTotal) * 100) : 0;

    // Calculate Quiz Average
    const quizHistory = JSON.parse(localStorage.getItem('quiz_history') || '[]');
    let quizAverage = 0;
    if (quizHistory.length > 0) {
      const totalCorrect = quizHistory.reduce((sum, item) => sum + item.score, 0);
      const totalQuestions = quizHistory.reduce((sum, item) => sum + item.total, 0);
      quizAverage = totalQuestions > 0 ? Math.round((totalCorrect / totalQuestions) * 100) : 0;
    } else {
      quizAverage = 0; // Default if no quiz taken
    }

    return {
      jobsApplied,
      dsaSolved,
      dsaTotal,
      dsaProgress,
      quizAverage
    };
  },

  updateOverviewStats() {
    // If current page is dashboard, re-render
    if (this.currentScreen === 'dashboard') {
      this.renderDashboard();
    }
  }
};

// Start app on DOM load
window.addEventListener('DOMContentLoaded', () => {
  App.init();
});

window.App = App;
