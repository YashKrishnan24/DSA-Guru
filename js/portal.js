// Job Portal module controller

const JobPortal = {
  activeTab: 'jobs', // 'jobs', 'tracking', 'resume'
  appliedJobs: [],
  filters: {
    search: '',
    types: [],
    companies: []
  },

  init() {
    this.loadAppliedJobs();
    this.loadResumeData();
  },

  loadAppliedJobs() {
    const saved = localStorage.getItem('portal_applied_jobs');
    if (saved) {
      this.appliedJobs = JSON.parse(saved);
    } else {
      // Seed initial mock tracking data
      this.appliedJobs = [
        {
          id: "seed-1",
          jobTitle: "Software Engineer Intern",
          companyName: "Amazon",
          appliedDate: new Date().toLocaleDateString(),
          status: "interviewing"
        },
        {
          id: "seed-2",
          jobTitle: "Systems Engineer",
          companyName: "TCS",
          appliedDate: new Date().toLocaleDateString(),
          status: "applied"
        }
      ];
      this.saveAppliedJobs();
    }
  },

  saveAppliedJobs() {
    localStorage.setItem('portal_applied_jobs', JSON.stringify(this.appliedJobs));
  },

  render(containerId) {
    const container = document.getElementById(containerId);
    
    let subNavigation = `
      <div class="sub-tabs-container">
        <button class="sub-tab ${this.activeTab === 'jobs' ? 'active' : ''}" onclick="JobPortal.setTab('jobs')">Explore Jobs</button>
        <button class="sub-tab ${this.activeTab === 'tracking' ? 'active' : ''}" onclick="JobPortal.setTab('tracking')">Applied Jobs Tracker</button>
        <button class="sub-tab ${this.activeTab === 'resume' ? 'active' : ''}" onclick="JobPortal.setTab('resume')">Sleek Resume Builder</button>
      </div>
    `;

    if (this.activeTab === 'jobs') {
      container.innerHTML = subNavigation + this.renderJobsSection();
      this.bindJobFilters();
    } else if (this.activeTab === 'tracking') {
      container.innerHTML = subNavigation + this.renderTrackingSection();
    } else if (this.activeTab === 'resume') {
      container.innerHTML = subNavigation + this.renderResumeBuilderSection();
      this.bindResumeInputs();
    }
  },

  setTab(tabName) {
    this.activeTab = tabName;
    this.render('app-content');
  },

  // --- Explore Jobs Section ---
  renderJobsSection() {
    // Collect unique companies for filters
    const companies = [...new Set(APP_DATA.jobs.map(j => j.company))];
    
    return `
      <div class="job-portal-layout">
        <!-- Sidebar filters -->
        <aside class="job-filters-sidebar glass-card">
          <div class="filter-section">
            <h3 class="filter-title">Search Jobs</h3>
            <input type="text" id="job-search-input" class="form-control" placeholder="Search title or company..." value="${this.filters.search}">
          </div>
          
          <div class="filter-section">
            <h3 class="filter-title">Job Type</h3>
            <div class="filter-options">
              <label class="checkbox-label">
                <input type="checkbox" class="job-type-filter" value="Full-time" ${this.filters.types.includes('Full-time') ? 'checked' : ''}> Full-time
              </label>
              <label class="checkbox-label">
                <input type="checkbox" class="job-type-filter" value="Internship" ${this.filters.types.includes('Internship') ? 'checked' : ''}> Internship
              </label>
            </div>
          </div>

          <div class="filter-section">
            <h3 class="filter-title">Company</h3>
            <div class="filter-options" id="company-filter-options">
              ${companies.map(c => `
                <label class="checkbox-label">
                  <input type="checkbox" class="job-company-filter" value="${c}" ${this.filters.companies.includes(c) ? 'checked' : ''}> ${c}
                </label>
              `).join('')}
            </div>
          </div>
        </aside>

        <!-- Job List -->
        <section class="job-list-container">
          <div class="job-list-header">
            <h2 id="jobs-count-title">Available Positions</h2>
          </div>
          <div id="jobs-cards-list" class="job-list-inner" style="display: flex; flex-direction: column; gap: 20px;">
            ${this.renderJobCards()}
          </div>
        </section>
      </div>
    `;
  },

  renderJobCards() {
    const filtered = APP_DATA.jobs.filter(job => {
      const matchSearch = job.title.toLowerCase().includes(this.filters.search.toLowerCase()) || 
                          job.company.toLowerCase().includes(this.filters.search.toLowerCase());
      const matchType = this.filters.types.length === 0 || this.filters.types.includes(job.type);
      const matchCompany = this.filters.companies.length === 0 || this.filters.companies.includes(job.company);
      return matchSearch && matchType && matchCompany;
    });

    if (filtered.length === 0) {
      return `
        <div class="glass-card" style="text-align: center; padding: 40px; color: var(--text-muted);">
          <p style="font-size: 16px; margin-bottom: 8px;">No matching positions found.</p>
          <p style="font-size: 13px;">Try clearing filters or search query.</p>
        </div>
      `;
    }

    return filtered.map(job => `
      <div class="glass-card job-card">
        <div class="job-card-left">
          <div class="company-logo-badge" style="background: ${job.logoColor}">
            ${job.company[0]}
          </div>
          <div class="job-card-details">
            <h3 class="job-card-title">${job.title}</h3>
            <div class="job-card-meta">
              <span style="font-weight: 600; color: var(--text-main);">${job.company}</span>
              <span>📍 ${job.location}</span>
              <span>💼 ${job.type}</span>
              <span>🎓 Exp: ${job.experience}</span>
            </div>
            <div class="job-tags">
              <span class="badge" style="background: rgba(99,102,241,0.1); color: var(--primary);">Developer</span>
              <span class="badge" style="background: rgba(6,182,212,0.1); color: var(--secondary);">Tech</span>
            </div>
          </div>
        </div>
        <div class="job-card-right">
          <div class="job-salary-range">${job.salary}</div>
          <div class="job-posted-time">${job.posted}</div>
          <button class="btn btn-primary" onclick="JobPortal.openApplyModal('${job.id}')">Apply Now</button>
        </div>
      </div>
    `).join('');
  },

  bindJobFilters() {
    const searchInput = document.getElementById('job-search-input');
    if (searchInput) {
      searchInput.addEventListener('input', (e) => {
        this.filters.search = e.target.value;
        document.getElementById('jobs-cards-list').innerHTML = this.renderJobCards();
      });
    }

    const typeCheckboxes = document.querySelectorAll('.job-type-filter');
    typeCheckboxes.forEach(cb => {
      cb.addEventListener('change', () => {
        const checked = Array.from(document.querySelectorAll('.job-type-filter:checked')).map(c => c.value);
        this.filters.types = checked;
        document.getElementById('jobs-cards-list').innerHTML = this.renderJobCards();
      });
    });

    const companyCheckboxes = document.querySelectorAll('.job-company-filter');
    companyCheckboxes.forEach(cb => {
      cb.addEventListener('change', () => {
        const checked = Array.from(document.querySelectorAll('.job-company-filter:checked')).map(c => c.value);
        this.filters.companies = checked;
        document.getElementById('jobs-cards-list').innerHTML = this.renderJobCards();
      });
    });
  },

  openApplyModal(jobId) {
    const job = APP_DATA.jobs.find(j => j.id === jobId);
    if (!job) return;

    const overlay = document.getElementById('app-modal-overlay');
    overlay.innerHTML = `
      <div class="modal-content glass-card" style="background: var(--bg-surface);">
        <button class="modal-close-btn" onclick="JobPortal.closeModal()">&times;</button>
        <h2 style="font-size: 22px; margin-bottom: 12px; font-family: var(--font-display);">${job.title}</h2>
        <h3 style="font-size: 14px; color: var(--secondary); margin-bottom: 24px; font-weight: 600;">at ${job.company}</h3>
        
        <div style="margin-bottom: 24px; border-bottom: 1px solid var(--border-glass); padding-bottom: 20px;">
          <h4 style="font-size: 14px; font-weight: 700; margin-bottom: 8px;">Job Description:</h4>
          <p style="font-size: 13px; line-height: 1.6; color: var(--text-muted); margin-bottom: 16px;">${job.description}</p>
          <h4 style="font-size: 14px; font-weight: 700; margin-bottom: 8px;">Key Requirements:</h4>
          <ul style="font-size: 13px; line-height: 1.6; color: var(--text-muted); padding-left: 20px;">
            ${job.requirements.map(req => `<li>${req}</li>`).join('')}
          </ul>
        </div>

        <form id="job-apply-form" onsubmit="JobPortal.handleApplySubmit(event, '${job.id}', '${job.title}', '${job.company}')">
          <div class="form-group">
            <label for="apply-name">Full Name</label>
            <input type="text" id="apply-name" class="form-control" required placeholder="John Doe">
          </div>
          <div class="form-group">
            <label for="apply-email">Email Address</label>
            <input type="email" id="apply-email" class="form-control" required placeholder="john@example.com">
          </div>
          <div class="form-group">
            <label for="apply-resume">Upload Resume (Mock File)</label>
            <div id="drag-drop-zone" style="border: 2px dashed var(--border-glass); border-radius: 10px; padding: 24px; text-align: center; cursor: pointer; transition: all 0.3s;" onclick="document.getElementById('apply-resume-file').click()">
              <span style="font-size: 24px; display: block; margin-bottom: 8px;">📄</span>
              <span id="upload-status" style="font-size: 13px; color: var(--text-muted);">Click to browse files or drag here</span>
              <input type="file" id="apply-resume-file" style="display: none;" onchange="JobPortal.handleFileSelect(event)">
            </div>
          </div>
          <div class="form-group">
            <label for="apply-cover">Short Pitch / Cover Letter (Optional)</label>
            <textarea id="apply-cover" class="form-control" rows="4" placeholder="Why are you a good fit for this role?"></textarea>
          </div>
          <div style="display: flex; justify-content: flex-end; gap: 12px; margin-top: 28px;">
            <button type="button" class="btn btn-secondary" onclick="JobPortal.closeModal()">Cancel</button>
            <button type="submit" class="btn btn-primary">Submit Application</button>
          </div>
        </form>
      </div>
    `;
    overlay.classList.add('active');
  },

  handleFileSelect(e) {
    const file = e.target.files[0];
    const status = document.getElementById('upload-status');
    const zone = document.getElementById('drag-drop-zone');
    if (file && status) {
      status.innerText = `Selected: ${file.name} (${(file.size / 1024).toFixed(1)} KB)`;
      status.style.color = 'var(--success)';
      zone.style.borderColor = 'var(--success)';
    }
  },

  handleApplySubmit(event, jobId, jobTitle, companyName) {
    event.preventDefault();
    
    // Create new application
    const newApp = {
      id: "app-" + Date.now(),
      jobId,
      jobTitle,
      companyName,
      appliedDate: new Date().toLocaleDateString(),
      status: "applied"
    };

    this.appliedJobs.push(newApp);
    this.saveAppliedJobs();
    
    this.closeModal();
    
    // Trigger notification
    alert(`Success! You have applied for ${jobTitle} at ${companyName}. Track your application status in the "Applied Jobs Tracker" tab.`);
    
    // Update dashboard metrics
    if (typeof App !== 'undefined') {
      App.updateOverviewStats();
    }
    this.render('app-content');
  },

  closeModal() {
    const overlay = document.getElementById('app-modal-overlay');
    overlay.classList.remove('active');
  },

  // --- Applied Jobs Tracker (Kanban Board) ---
  renderTrackingSection() {
    const getCardsByStatus = (status) => {
      const cards = this.appliedJobs.filter(a => a.status === status);
      if (cards.length === 0) {
        return `<div style="text-align: center; font-size: 12px; color: var(--text-muted); padding: 20px 0;">No items</div>`;
      }
      return cards.map(app => `
        <div class="kanban-card">
          <div class="kanban-card-title">${app.jobTitle}</div>
          <div class="kanban-card-company">🏢 ${app.companyName}</div>
          <div class="kanban-card-actions">
            <span style="color: var(--text-muted); font-size: 10px;">Applied: ${app.appliedDate}</span>
            <div style="display: flex; gap: 8px;">
              <select style="background: rgba(0,0,0,0.3); border: 1px solid var(--border-glass); border-radius: 4px; color: var(--text-main); font-size: 10px; padding: 2px;" onchange="JobPortal.moveApplication('${app.id}', this.value)">
                <option value="" disabled selected>Move</option>
                <option value="applied">Applied</option>
                <option value="interviewing">Interviewing</option>
                <option value="offer">Offer</option>
                <option value="rejected">Rejected</option>
                <option value="delete">Remove</option>
              </select>
            </div>
          </div>
        </div>
      `).join('');
    };

    const countStatus = (status) => this.appliedJobs.filter(a => a.status === status).length;

    return `
      <div class="glass-card" style="margin-bottom: 24px;">
        <h2 style="font-size: 20px; margin-bottom: 8px; font-family: var(--font-display);">Application Status Tracker</h2>
        <p style="font-size: 14px; color: var(--text-muted);">Manage your submitted applications and track interviews. Use the dropdown inside each card to shift statuses.</p>
      </div>

      <div class="kanban-board">
        <!-- Column Applied -->
        <div class="kanban-column">
          <div class="kanban-column-header">
            <div class="column-title"><span class="column-title-dot applied"></span> Applied</div>
            <span class="column-count">${countStatus('applied')}</span>
          </div>
          <div class="kanban-cards-container">
            ${getCardsByStatus('applied')}
          </div>
        </div>

        <!-- Column Interviewing -->
        <div class="kanban-column">
          <div class="kanban-column-header">
            <div class="column-title"><span class="column-title-dot interviewing"></span> Interviewing</div>
            <span class="column-count">${countStatus('interviewing')}</span>
          </div>
          <div class="kanban-cards-container">
            ${getCardsByStatus('interviewing')}
          </div>
        </div>

        <!-- Column Offer -->
        <div class="kanban-column">
          <div class="kanban-column-header">
            <div class="column-title"><span class="column-title-dot offer"></span> Offer</div>
            <span class="column-count">${countStatus('offer')}</span>
          </div>
          <div class="kanban-cards-container">
            ${getCardsByStatus('offer')}
          </div>
        </div>

        <!-- Column Rejected -->
        <div class="kanban-column">
          <div class="kanban-column-header">
            <div class="column-title"><span class="column-title-dot rejected"></span> Rejected</div>
            <span class="column-count">${countStatus('rejected')}</span>
          </div>
          <div class="kanban-cards-container">
            ${getCardsByStatus('rejected')}
          </div>
        </div>
      </div>
    `;
  },

  moveApplication(appId, newStatus) {
    if (newStatus === 'delete') {
      this.appliedJobs = this.appliedJobs.filter(a => a.id !== appId);
    } else {
      const app = this.appliedJobs.find(a => a.id === appId);
      if (app) app.status = newStatus;
    }
    this.saveAppliedJobs();
    
    // Update dashboard metrics
    if (typeof App !== 'undefined') {
      App.updateOverviewStats();
    }
    
    this.render('app-content');
  },

  // --- Resume Builder Section ---
  resumeData: {
    name: 'Alex Johnson',
    role: 'Full Stack Engineer',
    email: 'alex.j@example.com',
    phone: '+1 (555) 019-2834',
    linkedin: 'linkedin.com/in/alexj',
    github: 'github.com/alexj-dev',
    education: 'B.S. Computer Science - Stanford University (2022-2026)',
    skills: 'JavaScript, Python, React, Node.js, Express, SQL, Git, AWS',
    experience: 'Software Engineer Intern - AWS (Summer 2025)\n- Developed microservices in Python serving 5M+ API requests daily.\n- Optimized DB indexes resulting in a 25% query latency improvement.\n\nFreelance Web Developer (2024 - Present)\n- Built 10+ custom client sites using React and TailwindCSS.',
    projects: 'DevConnect Social Platform\n- Fullstack MERN application connecting developers.\n- Scaled using WebSockets for real-time messaging.'
  },

  loadResumeData() {
    const saved = localStorage.getItem('portal_resume_data');
    if (saved) {
      this.resumeData = JSON.parse(saved);
    }
  },

  saveResumeData() {
    localStorage.setItem('portal_resume_data', JSON.stringify(this.resumeData));
  },

  renderResumeBuilderSection() {
    return `
      <div class="glass-card" style="margin-bottom: 24px; display: flex; justify-content: space-between; align-items: center;">
        <div>
          <h2 style="font-size: 20px; margin-bottom: 8px; font-family: var(--font-display);">Resume Builder</h2>
          <p style="font-size: 14px; color: var(--text-muted);">Fill in the details on the left, and watch your formatted resume update in real-time. Print to save as PDF.</p>
        </div>
        <button class="btn btn-accent" onclick="JobPortal.printResume()">🖨️ Print / Save PDF</button>
      </div>

      <div class="resume-builder-layout">
        <!-- Input Form -->
        <div class="glass-card" style="overflow-y: auto; max-height: 800px;">
          <h3 style="font-size: 16px; margin-bottom: 20px; border-bottom: 1px solid var(--border-glass); padding-bottom: 8px;">Personal Details</h3>
          <div class="form-group">
            <label for="res-name">Full Name</label>
            <input type="text" id="res-name" class="form-control resume-in" data-key="name" value="${this.resumeData.name}">
          </div>
          <div class="form-group">
            <label for="res-role">Target Role</label>
            <input type="text" id="res-role" class="form-control resume-in" data-key="role" value="${this.resumeData.role}">
          </div>
          
          <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 16px;">
            <div class="form-group">
              <label for="res-email">Email</label>
              <input type="email" id="res-email" class="form-control resume-in" data-key="email" value="${this.resumeData.email}">
            </div>
            <div class="form-group">
              <label for="res-phone">Phone Number</label>
              <input type="text" id="res-phone" class="form-control resume-in" data-key="phone" value="${this.resumeData.phone}">
            </div>
          </div>

          <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 16px;">
            <div class="form-group">
              <label for="res-linkedin">LinkedIn (Handle/URL)</label>
              <input type="text" id="res-linkedin" class="form-control resume-in" data-key="linkedin" value="${this.resumeData.linkedin}">
            </div>
            <div class="form-group">
              <label for="res-github">GitHub Profile</label>
              <input type="text" id="res-github" class="form-control resume-in" data-key="github" value="${this.resumeData.github}">
            </div>
          </div>

          <h3 style="font-size: 16px; margin-top: 28px; margin-bottom: 20px; border-bottom: 1px solid var(--border-glass); padding-bottom: 8px;">Education</h3>
          <div class="form-group">
            <label for="res-education">Degree & University</label>
            <input type="text" id="res-education" class="form-control resume-in" data-key="education" placeholder="B.S. Computer Science - Stanford (2022-2026)" value="${this.resumeData.education}">
          </div>

          <h3 style="font-size: 16px; margin-top: 28px; margin-bottom: 20px; border-bottom: 1px solid var(--border-glass); padding-bottom: 8px;">Skills</h3>
          <div class="form-group">
            <label for="res-skills">Skills (Comma separated)</label>
            <input type="text" id="res-skills" class="form-control resume-in" data-key="skills" placeholder="JavaScript, React, Node.js" value="${this.resumeData.skills}">
          </div>

          <h3 style="font-size: 16px; margin-top: 28px; margin-bottom: 20px; border-bottom: 1px solid var(--border-glass); padding-bottom: 8px;">Experience</h3>
          <div class="form-group">
            <label for="res-experience">Work History (Markdown/Plaintext)</label>
            <textarea id="res-experience" class="form-control resume-in" data-key="experience" rows="6" placeholder="Position - Company (Date)&#10;- Bullet points...">${this.resumeData.experience}</textarea>
          </div>

          <h3 style="font-size: 16px; margin-top: 28px; margin-bottom: 20px; border-bottom: 1px solid var(--border-glass); padding-bottom: 8px;">Key Projects</h3>
          <div class="form-group">
            <label for="res-projects">Projects & Accomplishments</label>
            <textarea id="res-projects" class="form-control resume-in" data-key="projects" rows="4" placeholder="Project Name&#10;- Accomplishment details...">${this.resumeData.projects}</textarea>
          </div>
        </div>

        <!-- Live Preview Pane -->
        <div id="resume-preview-pane" class="resume-preview-panel">
          ${this.generateResumePreviewHTML()}
        </div>
      </div>
    `;
  },

  generateResumePreviewHTML() {
    return `
      <div class="resume-preview-header">
        <h1 class="resume-p-name" id="p-name-val">${this.resumeData.name}</h1>
        <div style="font-size: 14px; font-weight: 600; color: #475569; margin-bottom: 8px; text-transform: uppercase; letter-spacing: 0.05em;" id="p-role-val">${this.resumeData.role}</div>
        <div class="resume-p-contact">
          <span id="p-email-val">✉️ ${this.resumeData.email}</span>
          <span id="p-phone-val">📞 ${this.resumeData.phone}</span>
          <span id="p-linkedin-val">🔗 ${this.resumeData.linkedin}</span>
          <span id="p-github-val">💻 ${this.resumeData.github}</span>
        </div>
      </div>

      <div class="resume-preview-section">
        <h2 class="resume-preview-section-title">Education</h2>
        <div class="resume-preview-item">
          <div class="resume-preview-item-desc" id="p-edu-val" style="font-weight: 600; font-size: 13px;">${this.resumeData.education}</div>
        </div>
      </div>

      <div class="resume-preview-section">
        <h2 class="resume-preview-section-title">Technical Skills</h2>
        <div class="resume-preview-item">
          <div class="resume-preview-item-desc" id="p-skills-val" style="line-height: 1.5;">${this.resumeData.skills}</div>
        </div>
      </div>

      <div class="resume-preview-section">
        <h2 class="resume-preview-section-title">Professional Experience</h2>
        <div class="resume-preview-item">
          <div class="resume-preview-item-desc" id="p-exp-val" style="white-space: pre-line; line-height: 1.6;">${this.resumeData.experience}</div>
        </div>
      </div>

      <div class="resume-preview-section">
        <h2 class="resume-preview-section-title">Projects</h2>
        <div class="resume-preview-item">
          <div class="resume-preview-item-desc" id="p-proj-val" style="white-space: pre-line; line-height: 1.6;">${this.resumeData.projects}</div>
        </div>
      </div>
    `;
  },

  bindResumeInputs() {
    const inputs = document.querySelectorAll('.resume-in');
    inputs.forEach(input => {
      input.addEventListener('input', (e) => {
        const key = e.target.getAttribute('data-key');
        const val = e.target.value;
        this.resumeData[key] = val;
        this.saveResumeData();
        
        // Update specific preview nodes for smooth fast updates
        if (key === 'name') document.getElementById('p-name-val').innerText = val;
        else if (key === 'role') document.getElementById('p-role-val').innerText = val;
        else if (key === 'email') document.getElementById('p-email-val').innerText = '✉️ ' + val;
        else if (key === 'phone') document.getElementById('p-phone-val').innerText = '📞 ' + val;
        else if (key === 'linkedin') document.getElementById('p-linkedin-val').innerText = '🔗 ' + val;
        else if (key === 'github') document.getElementById('p-github-val').innerText = '💻 ' + val;
        else if (key === 'education') document.getElementById('p-edu-val').innerText = val;
        else if (key === 'skills') document.getElementById('p-skills-val').innerText = val;
        else if (key === 'experience') document.getElementById('p-exp-val').innerText = val;
        else if (key === 'projects') document.getElementById('p-proj-val').innerText = val;
      });
    });
  },

  printResume() {
    // Open a clean print layout
    const printWindow = window.open('', '_blank');
    printWindow.document.write(`
      <html>
        <head>
          <title>Resume - ${this.resumeData.name}</title>
          <style>
            body {
              font-family: Arial, sans-serif;
              padding: 40px;
              color: #1a1a1a;
              line-height: 1.5;
            }
            .resume-preview-header {
              text-align: center;
              border-bottom: 2px solid #333;
              padding-bottom: 15px;
              margin-bottom: 20px;
            }
            .resume-p-name {
              font-size: 28px;
              margin: 0 0 5px 0;
            }
            .resume-p-contact {
              font-size: 12px;
              color: #666;
            }
            .resume-preview-section {
              margin-bottom: 20px;
            }
            .resume-preview-section-title {
              font-size: 14px;
              font-weight: bold;
              text-transform: uppercase;
              border-bottom: 1px solid #ccc;
              padding-bottom: 4px;
              margin-bottom: 8px;
              letter-spacing: 0.05em;
            }
            .resume-preview-item-desc {
              font-size: 12px;
              white-space: pre-line;
            }
          </style>
        </head>
        <body>
          ${this.generateResumePreviewHTML()}
          <script>
            window.onload = function() {
              window.print();
              window.close();
            }
          </script>
        </body>
      </html>
    `);
    printWindow.document.close();
  }
};
window.JobPortal = JobPortal;
