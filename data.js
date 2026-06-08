// Company guides module controller

const CompanyGuides = {
  selectedCompanyId: null,
  searchQuery: '',

  init() {
    this.selectedCompanyId = null;
    this.searchQuery = '';
  },

  render(containerId) {
    const container = document.getElementById(containerId);
    
    if (this.selectedCompanyId) {
      container.innerHTML = this.renderCompanyDetailHTML();
    } else {
      container.innerHTML = this.renderCompanyListHTML();
      this.bindSearchInput();
    }
  },

  renderCompanyListHTML() {
    const filtered = APP_DATA.companies.filter(c => 
      c.name.toLowerCase().includes(this.searchQuery.toLowerCase())
    );

    return `
      <div class="glass-card" style="margin-bottom: 28px; display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 16px;">
        <div>
          <h2 style="font-size: 20px; margin-bottom: 6px; font-family: var(--font-display);">Recruitment Paths & Company Profiles</h2>
          <p style="font-size: 14px; color: var(--text-muted);">Explore hiring patterns, detailed syllabus breakdowns, and selection criteria for top recruiters.</p>
        </div>
        <div style="width: 100%; max-width: 350px;">
          <input type="text" id="company-search-input" class="form-control" placeholder="Search company (e.g. Google, Amazon)..." value="${this.searchQuery}">
        </div>
      </div>

      <div class="company-grid" id="company-grid-cards">
        ${this.renderCompanyCards(filtered)}
      </div>
    `;
  },

  renderCompanyCards(list) {
    if (list.length === 0) {
      return `
        <div class="glass-card" style="grid-column: 1 / -1; text-align: center; padding: 40px; color: var(--text-muted);">
          <p style="font-size: 16px; margin-bottom: 8px;">No company guides match your search.</p>
          <p style="font-size: 13px;">Try typing a different name.</p>
        </div>
      `;
    }

    return list.map(comp => `
      <div class="glass-card company-card" onclick="CompanyGuides.selectCompany('${comp.id}')">
        <div class="company-card-header">
          <h3 class="company-card-name">${comp.name}</h3>
          <div class="company-logo-circle" style="background: ${comp.logoColor};">
            ${comp.name[0]}
          </div>
        </div>
        <div class="company-card-footer">
          <span class="company-salary-label">Average CTC</span>
          <span class="company-salary-val">${comp.avgSalary}</span>
          <span style="font-size: 12px; color: var(--text-muted); margin-top: 8px;">Rounds: ${comp.rounds.length} selection stages &rarr;</span>
        </div>
      </div>
    `).join('');
  },

  bindSearchInput() {
    const input = document.getElementById('company-search-input');
    if (input) {
      input.addEventListener('input', (e) => {
        this.searchQuery = e.target.value;
        const filtered = APP_DATA.companies.filter(c => 
          c.name.toLowerCase().includes(this.searchQuery.toLowerCase())
        );
        document.getElementById('company-grid-cards').innerHTML = this.renderCompanyCards(filtered);
      });
    }
  },

  selectCompany(compId) {
    this.selectedCompanyId = compId;
    this.render('app-content');
  },

  renderCompanyDetailHTML() {
    const comp = APP_DATA.companies.find(c => c.id === this.selectedCompanyId);
    if (!comp) return '<p>Company profile not found.</p>';

    return `
      <div class="glass-card" style="margin-bottom: 28px; display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 16px;">
        <div style="display: flex; align-items: center; gap: 18px;">
          <button class="btn btn-secondary" onclick="CompanyGuides.backToList()" style="padding: 8px 12px; font-size: 13px;">&larr; Back</button>
          <div class="company-logo-circle" style="background: ${comp.logoColor}; width: 50px; height: 50px; font-size: 20px;">
            ${comp.name[0]}
          </div>
          <div>
            <h2 style="font-size: 24px; font-family: var(--font-display);">${comp.name} Hiring Process</h2>
            <span style="font-size: 13px; color: var(--secondary); font-weight:600;">Average Compensation: ${comp.avgSalary}</span>
          </div>
        </div>
      </div>

      <div class="company-details-layout">
        <!-- Timeline Left Panel -->
        <div class="glass-card" style="align-self: start;">
          <h3 style="font-size: 16px; font-family: var(--font-display); border-bottom: 1px solid var(--border-glass); padding-bottom: 12px; margin-bottom: 20px;">Selection Rounds</h3>
          <div class="recruitment-timeline">
            ${comp.rounds.map((round, idx) => `
              <div class="timeline-node ${idx === 0 ? 'active' : ''}">
                <div class="timeline-node-title">${round.name}</div>
                <div class="timeline-node-desc">${round.detail}</div>
              </div>
            `).join('')}
          </div>
        </div>

        <!-- Details Right Panel -->
        <div class="guide-details-pane">
          <!-- Eligibility -->
          <div class="glass-card">
            <h3 class="detail-section-title">Eligibility Criteria</h3>
            <div class="eligibility-info">${comp.eligibility}</div>
          </div>

          <!-- Syllabus -->
          <div class="glass-card">
            <h3 class="detail-section-title">Important Interview Syllabus</h3>
            <ul class="syllabus-list">
              ${comp.syllabus.map(topic => `
                <li class="syllabus-item">${topic}</li>
              `).join('')}
            </ul>
          </div>

          <!-- Tips -->
          <div class="glass-card">
            <h3 class="detail-section-title">Inside Tips & Preparation Strategy</h3>
            <div class="tips-block">
              <strong>💡 Pro Tip:</strong> ${comp.tips}
            </div>
          </div>
        </div>
      </div>
    `;
  },

  backToList() {
    this.selectedCompanyId = null;
    this.render('app-content');
  }
};
window.CompanyGuides = CompanyGuides;
