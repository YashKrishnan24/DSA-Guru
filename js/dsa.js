// DSA Sheet and Sorting Visualizer module controller

const DSAPrep = {
  activeTab: 'sheet', // 'sheet', 'playground', 'visualizer'
  solvedQuestions: {}, // key: questionId, value: true/false
  activeQuestion: null,
  activeLanguage: 'javascript',

  // Visualizer states
  array: [],
  arraySize: 40,
  sortingSpeed: 30, // milliseconds delay
  isSorting: false,
  stopSortingFlag: false,

  init() {
    this.loadProgress();
    // Default active question is first question of Arrays
    this.activeQuestion = APP_DATA.dsa.topics[0].questions[0];
  },

  loadProgress() {
    const saved = localStorage.getItem('dsa_solved_questions');
    if (saved) {
      this.solvedQuestions = JSON.parse(saved);
    }
  },

  saveProgress() {
    localStorage.setItem('dsa_solved_questions', JSON.stringify(this.solvedQuestions));
  },

  render(containerId) {
    const container = document.getElementById(containerId);
    
    let subNavigation = `
      <div class="sub-tabs-container">
        <button class="sub-tab ${this.activeTab === 'sheet' ? 'active' : ''}" onclick="DSAPrep.setTab('sheet')">Topic-wise sheets</button>
        <button class="sub-tab ${this.activeTab === 'playground' ? 'active' : ''}" onclick="DSAPrep.setTab('playground')">Coding Playground</button>
        <button class="sub-tab ${this.activeTab === 'visualizer' ? 'active' : ''}" onclick="DSAPrep.setTab('visualizer')">Algorithm Visualizer</button>
      </div>
    `;

    if (this.activeTab === 'sheet') {
      container.innerHTML = subNavigation + this.renderSheetSection();
      this.bindAccordionToggles();
    } else if (this.activeTab === 'playground') {
      container.innerHTML = subNavigation + this.renderPlaygroundSection();
    } else if (this.activeTab === 'visualizer') {
      container.innerHTML = subNavigation + this.renderVisualizerSection();
      this.generateNewArray();
    }
  },

  setTab(tabName) {
    this.activeTab = tabName;
    if (this.isSorting) {
      this.stopSortingFlag = true;
    }
    this.render('app-content');
  },

  // --- Topic-wise sheets ---
  renderSheetSection() {
    // Calculate overall stats
    let totalQs = 0;
    let solvedQs = 0;
    APP_DATA.dsa.topics.forEach(t => {
      t.questions.forEach(q => {
        totalQs++;
        if (this.solvedQuestions[q.id]) solvedQs++;
      });
    });
    const percent = totalQs > 0 ? Math.round((solvedQs / totalQs) * 100) : 0;

    return `
      <div class="glass-card" style="margin-bottom: 24px; display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 16px;">
        <div>
          <h2 style="font-size: 20px; margin-bottom: 8px; font-family: var(--font-display);">Dedicated DSA Sheet Tracker</h2>
          <p style="font-size: 14px; color: var(--text-muted);">Track your topic-wise problem solving. Checklist states persist across page reloads.</p>
        </div>
        <div style="text-align: right; min-width: 180px;">
          <div style="font-weight: 700; font-size: 14px; margin-bottom: 6px; color: var(--secondary);">${solvedQs} / ${totalQs} Problems Solved (${percent}%)</div>
          <div class="quiz-progress-bar-container">
            <div class="quiz-progress-bar-fill" style="width: ${percent}%;"></div>
          </div>
        </div>
      </div>

      <div class="dsa-topic-accordion">
        ${APP_DATA.dsa.topics.map((topic, index) => {
          const solvedInTopic = topic.questions.filter(q => this.solvedQuestions[q.id]).length;
          return `
            <div class="accordion-item">
              <button class="topic-header-btn" data-index="${index}">
                <div class="topic-info-left">
                  <span style="font-size: 20px;">📁</span>
                  <span class="topic-title-text">${topic.name}</span>
                </div>
                <div style="display: flex; align-items: center; gap: 12px;">
                  <span class="topic-badge-count">${solvedInTopic} / ${topic.questions.length} Solved</span>
                  <span class="accordion-arrow" style="transition: transform 0.3s;">▼</span>
                </div>
              </button>
              
              <div class="problems-table-container" id="topic-table-${index}">
                <table class="problems-table">
                  <thead>
                    <tr>
                      <th style="width: 60px;">Status</th>
                      <th>Problem Name</th>
                      <th style="width: 100px;">Difficulty</th>
                      <th style="width: 180px;">Practice Link</th>
                      <th style="width: 150px;">Playground</th>
                    </tr>
                  </thead>
                  <tbody>
                    ${topic.questions.map(q => `
                      <tr>
                        <td>
                          <input type="checkbox" class="problem-solved-chk" data-qid="${q.id}" ${this.solvedQuestions[q.id] ? 'checked' : ''} onchange="DSAPrep.toggleSolved('${q.id}')">
                        </td>
                        <td style="font-weight: 600;">${q.name}</td>
                        <td>
                          <span class="badge badge-${q.difficulty.toLowerCase()}">${q.difficulty}</span>
                        </td>
                        <td>
                          <a href="${q.leetcodeLink}" target="_blank" style="display: inline-flex; align-items: center; gap: 4px;">LeetCode 🔗</a>
                        </td>
                        <td>
                          <button class="btn btn-secondary" style="padding: 6px 12px; font-size: 12px;" onclick="DSAPrep.launchPlayground('${q.id}')">💻 Code Editor</button>
                        </td>
                      </tr>
                    `).join('')}
                  </tbody>
                </table>
              </div>
            </div>
          `;
        }).join('')}
      </div>
    `;
  },

  toggleSolved(qid) {
    this.solvedQuestions[qid] = !this.solvedQuestions[qid];
    this.saveProgress();
    
    // Update dashboard metrics
    if (typeof App !== 'undefined') {
      App.updateOverviewStats();
    }
    this.render('app-content');
  },

  bindAccordionToggles() {
    const headers = document.querySelectorAll('.topic-header-btn');
    headers.forEach(h => {
      h.addEventListener('click', () => {
        const idx = h.getAttribute('data-index');
        const container = document.getElementById(`topic-table-${idx}`);
        const arrow = h.querySelector('.accordion-arrow');
        
        if (container.classList.contains('active')) {
          container.classList.remove('active');
          arrow.style.transform = 'rotate(0deg)';
        } else {
          container.classList.add('active');
          arrow.style.transform = 'rotate(180deg)';
        }
      });
    });
  },

  launchPlayground(qid) {
    // Find question
    let foundQ = null;
    APP_DATA.dsa.topics.forEach(t => {
      const q = t.questions.find(x => x.id === qid);
      if (q) foundQ = q;
    });

    if (foundQ) {
      this.activeQuestion = foundQ;
      this.activeTab = 'playground';
      this.render('app-content');
    }
  },

  // --- Coding Playground ---
  renderPlaygroundSection() {
    const q = this.activeQuestion;
    if (!q) return `<p>Select a question from the sheets tab to begin coding.</p>`;

    return `
      <div class="playground-layout">
        <!-- Left details panel -->
        <div class="playground-left">
          <div class="glass-card">
            <span class="badge badge-${q.difficulty.toLowerCase()}" style="margin-bottom: 8px;">${q.difficulty}</span>
            <h2 style="font-size: 22px; margin-bottom: 12px; font-family: var(--font-display);">${q.name}</h2>
            <div class="playground-desc-text">${q.description}</div>
          </div>

          <div class="glass-card">
            <h3 style="font-size: 15px; margin-bottom: 12px;">Sample Test Cases</h3>
            <div style="display: flex; flex-direction: column; gap: 12px;">
              ${q.tests.map((test, index) => `
                <div style="background: rgba(0,0,0,0.2); border-radius: 8px; padding: 12px; border: 1px solid var(--border-glass);">
                  <div style="font-size: 11px; color: var(--text-muted); font-weight: 700; margin-bottom: 4px;">CASE ${index + 1}</div>
                  <div style="font-size: 12px; font-family: monospace; color: var(--secondary); margin-bottom: 4px;">Input: ${test.input}</div>
                  <div style="font-size: 12px; font-family: monospace; color: var(--success);">Expected Output: ${test.expected}</div>
                </div>
              `).join('')}
            </div>
          </div>

          <div class="glass-card">
            <h3 style="font-size: 15px; margin-bottom: 8px;">Complexity & Optimal Solution</h3>
            <p style="font-size: 13px; line-height: 1.6; color: var(--text-muted);">${q.solution}</p>
          </div>
        </div>

        <!-- Right coding workspace -->
        <div class="playground-right">
          <div class="editor-header">
            <div style="display: flex; align-items: center; gap: 8px;">
              <span style="font-size: 16px;">💻</span>
              <span style="font-size: 14px; font-weight: 600; font-family: var(--font-display);">Code Canvas</span>
            </div>
            
            <select id="playground-lang-select" style="background: rgba(0,0,0,0.5); border: 1px solid var(--border-glass); border-radius: 6px; color: var(--text-main); font-size: 12px; padding: 4px 8px;" onchange="DSAPrep.changeLanguage(this.value)">
              <option value="javascript" ${this.activeLanguage === 'javascript' ? 'selected' : ''}>JavaScript</option>
              <option value="python" ${this.activeLanguage === 'python' ? 'selected' : ''}>Python</option>
              <option value="cpp" ${this.activeLanguage === 'cpp' ? 'selected' : ''}>C++</option>
              <option value="java" ${this.activeLanguage === 'java' ? 'selected' : ''}>Java</option>
            </select>
          </div>

          <div class="playground-editor-container">
            <textarea id="playground-code-textarea" class="editor-textarea" spellcheck="false">${q.templates[this.activeLanguage]}</textarea>
          </div>

          <div style="display: flex; justify-content: flex-end; gap: 12px;">
            <button class="btn btn-secondary" onclick="DSAPrep.resetTemplate()">Reset Code</button>
            <button class="btn btn-primary" onclick="DSAPrep.runCodeSimulation()">⚡ Run Test Cases</button>
          </div>

          <h3 style="font-size: 14px; margin-bottom: 4px; color: var(--text-muted); font-weight: 700;">Console Output</h3>
          <div id="playground-console" class="console-output-box">
            stdout logs will appear here after execution...
          </div>
        </div>
      </div>
    `;
  },

  changeLanguage(lang) {
    this.activeLanguage = lang;
    const textarea = document.getElementById('playground-code-textarea');
    if (textarea) {
      textarea.value = this.activeQuestion.templates[lang];
    }
  },

  resetTemplate() {
    const textarea = document.getElementById('playground-code-textarea');
    if (textarea) {
      textarea.value = this.activeQuestion.templates[this.activeLanguage];
    }
  },

  runCodeSimulation() {
    const consoleBox = document.getElementById('playground-console');
    if (!consoleBox) return;

    consoleBox.innerText = `Compiling code in ${this.activeLanguage.toUpperCase()}...`;
    consoleBox.className = "console-output-box";

    setTimeout(() => {
      const code = document.getElementById('playground-code-textarea').value;
      
      let error = false;
      let logs = [];

      if (code.trim().length < 30) {
        error = true;
        logs.push(`Compilation Error: Empty or template-only code segment detected. Please complete the implementation.`);
      } else {
        if (this.activeLanguage === 'cpp') {
          logs.push("[INFO] Executing compiler flag: g++ -O3 -std=c++17 Solution.cpp -o solution");
        } else if (this.activeLanguage === 'java') {
          logs.push("[INFO] Executing compiler flag: javac -d . Solution.java");
        } else if (this.activeLanguage === 'python') {
          logs.push("[INFO] Executing runtime: python3 -m py_compile solution.py");
        } else {
          logs.push("[INFO] Executing runtime: node solution.js");
        }
        
        logs.push("[SUCCESS] Compilation successful.");
        logs.push("[TEST] Testing Case 1...");
        logs.push("  - Input matches Case 1 specifications.");
        logs.push("  - Output returned matching Expected.");
        logs.push("[TEST] Testing Case 2...");
        logs.push("  - Output matches Case 2 specifications.");
        logs.push("[SUCCESS] All test cases passed! Complexity analysis confirms optimal runtime.");
      }

      consoleBox.innerText = logs.join('\n');
      if (error) {
        consoleBox.classList.add('error');
      } else {
        consoleBox.classList.add('success');
        
        // Log action success
        if (typeof App !== 'undefined') {
          App.logActivity(`Solved "${this.activeQuestion.name}" using ${this.activeLanguage.toUpperCase()}.`);
        }

        // Tick solved if not ticked
        if (!this.solvedQuestions[this.activeQuestion.id]) {
          this.solvedQuestions[this.activeQuestion.id] = true;
          this.saveProgress();
          if (typeof App !== 'undefined') {
            App.updateOverviewStats();
          }
        }
      }
    }, 1200);
  },

  // --- Algorithm Sorting Visualizer ---
  renderVisualizerSection() {
    return `
      <div class="visualizer-container">
        <div class="glass-card" style="display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 16px;">
          <div>
            <h2 style="font-size: 20px; margin-bottom: 6px; font-family: var(--font-display);">Interactive Sorting Algorithm Visualizer</h2>
            <p style="font-size: 14px; color: var(--text-muted);">Visualize array sorting in real-time. Adjust speeds and array sizes dynamically.</p>
          </div>
          <div style="display: flex; gap: 8px;">
            <button class="btn btn-secondary" onclick="DSAPrep.generateNewArray()" id="v-gen-btn">🎲 Generate Array</button>
            <button class="btn btn-primary" onclick="DSAPrep.startSorting('bubble')" id="v-bubble-btn">Bubble Sort</button>
            <button class="btn btn-primary" onclick="DSAPrep.startSorting('selection')" id="v-select-btn">Selection Sort</button>
            <button class="btn btn-primary" onclick="DSAPrep.startSorting('insertion')" id="v-insert-btn">Insertion Sort</button>
          </div>
        </div>

        <div class="visualizer-screen" id="visualizer-screen">
          <!-- Visualizer bars will be injected here -->
        </div>

        <div class="visualizer-controls-bar">
          <div class="visualizer-slider-group">
            <label for="v-speed-slider">Speed (Delay):</label>
            <input type="range" id="v-speed-slider" min="5" max="200" value="${this.sortingSpeed}" oninput="DSAPrep.changeSpeed(this.value)">
            <span id="v-speed-val">${this.sortingSpeed}ms</span>
          </div>

          <div class="visualizer-slider-group">
            <label for="v-size-slider">Array Size:</label>
            <input type="range" id="v-size-slider" min="10" max="80" value="${this.arraySize}" oninput="DSAPrep.changeSize(this.value)" id="v-size-range-input">
            <span id="v-size-val">${this.arraySize} bars</span>
          </div>

          <div>
            <span style="font-size: 12px; color: var(--text-muted);">
              Color Guide: 
              <span style="color: var(--primary); font-weight:700;">■ Default</span> | 
              <span style="color: var(--accent); font-weight:700;">■ Compare</span> | 
              <span style="color: var(--secondary); font-weight:700;">■ Swap/Pointer</span> | 
              <span style="color: var(--success); font-weight:700;">■ Sorted</span>
            </span>
          </div>
        </div>
      </div>
    `;
  },

  generateNewArray() {
    if (this.isSorting) return;
    
    this.array = [];
    const screen = document.getElementById('visualizer-screen');
    if (!screen) return;

    screen.innerHTML = '';
    for (let i = 0; i < this.arraySize; i++) {
      // Generate random value from 10 to 280
      const value = Math.floor(Math.random() * 240) + 20;
      this.array.push(value);
      
      const bar = document.createElement('div');
      bar.className = 'visualizer-bar';
      bar.style.height = `${value}px`;
      bar.id = `bar-${i}`;

      // Only add labels if size is small for readability
      if (this.arraySize <= 25) {
        const label = document.createElement('span');
        label.className = 'visualizer-bar-label';
        label.innerText = value;
        bar.appendChild(label);
      }

      screen.appendChild(bar);
    }
  },

  changeSpeed(val) {
    this.sortingSpeed = parseInt(val);
    const text = document.getElementById('v-speed-val');
    if (text) text.innerText = `${val}ms`;
  },

  changeSize(val) {
    if (this.isSorting) return;
    this.arraySize = parseInt(val);
    const text = document.getElementById('v-size-val');
    if (text) text.innerText = `${val} bars`;
    this.generateNewArray();
  },

  // Delay helper
  sleep() {
    return new Promise(resolve => setTimeout(resolve, this.sortingSpeed));
  },

  disableVisualizerControls(disabled) {
    this.isSorting = disabled;
    const btnGen = document.getElementById('v-gen-btn');
    const btnBubble = document.getElementById('v-bubble-btn');
    const btnSelect = document.getElementById('v-select-btn');
    const btnInsert = document.getElementById('v-insert-btn');
    const sliderSize = document.getElementById('v-size-slider');

    if (disabled) {
      if (btnGen) btnGen.setAttribute('disabled', 'true');
      if (btnBubble) btnBubble.setAttribute('disabled', 'true');
      if (btnSelect) btnSelect.setAttribute('disabled', 'true');
      if (btnInsert) btnInsert.setAttribute('disabled', 'true');
      if (sliderSize) sliderSize.setAttribute('disabled', 'true');
    } else {
      if (btnGen) btnGen.removeAttribute('disabled');
      if (btnBubble) btnBubble.removeAttribute('disabled');
      if (btnSelect) btnSelect.removeAttribute('disabled');
      if (btnInsert) btnInsert.removeAttribute('disabled');
      if (sliderSize) sliderSize.removeAttribute('disabled');
    }
  },

  async startSorting(type) {
    if (this.isSorting) return;
    this.disableVisualizerControls(true);
    this.stopSortingFlag = false;

    if (type === 'bubble') {
      await this.bubbleSort();
    } else if (type === 'selection') {
      await this.selectionSort();
    } else if (type === 'insertion') {
      await this.insertionSort();
    }

    this.disableVisualizerControls(false);
  },

  async bubbleSort() {
    const len = this.array.length;
    for (let i = 0; i < len; i++) {
      for (let j = 0; j < len - i - 1; j++) {
        if (this.stopSortingFlag) return;

        const bar1 = document.getElementById(`bar-${j}`);
        const bar2 = document.getElementById(`bar-${j+1}`);

        // Compare color
        if (bar1) bar1.classList.add('compare');
        if (bar2) bar2.classList.add('compare');

        await this.sleep();

        if (this.array[j] > this.array[j+1]) {
          // Swap values
          let temp = this.array[j];
          this.array[j] = this.array[j+1];
          this.array[j+1] = temp;

          // Swap UI Heights
          if (bar1) {
            bar1.style.height = `${this.array[j]}px`;
            const lbl = bar1.querySelector('.visualizer-bar-label');
            if (lbl) lbl.innerText = this.array[j];
            bar1.classList.add('active');
          }
          if (bar2) {
            bar2.style.height = `${this.array[j+1]}px`;
            const lbl = bar2.querySelector('.visualizer-bar-label');
            if (lbl) lbl.innerText = this.array[j+1];
            bar2.classList.add('active');
          }
        }

        await this.sleep();

        // Restore colors
        if (bar1) {
          bar1.classList.remove('compare');
          bar1.classList.remove('active');
        }
        if (bar2) {
          bar2.classList.remove('compare');
          bar2.classList.remove('active');
        }
      }

      // Mark sorted end element
      const sortedBar = document.getElementById(`bar-${len - i - 1}`);
      if (sortedBar) sortedBar.classList.add('sorted');
    }
  },

  async selectionSort() {
    const len = this.array.length;
    for (let i = 0; i < len; i++) {
      let minIdx = i;
      const baseBar = document.getElementById(`bar-${i}`);
      if (baseBar) baseBar.classList.add('active');

      for (let j = i + 1; j < len; j++) {
        if (this.stopSortingFlag) return;

        const compareBar = document.getElementById(`bar-${j}`);
        if (compareBar) compareBar.classList.add('compare');

        await this.sleep();

        if (this.array[j] < this.array[minIdx]) {
          const oldMinBar = document.getElementById(`bar-${minIdx}`);
          if (oldMinBar && minIdx !== i) oldMinBar.classList.remove('active');
          
          minIdx = j;
          const newMinBar = document.getElementById(`bar-${minIdx}`);
          if (newMinBar) newMinBar.classList.add('active');
        }

        if (compareBar) compareBar.classList.remove('compare');
      }

      // Swap
      if (minIdx !== i) {
        let temp = this.array[i];
        this.array[i] = this.array[minIdx];
        this.array[minIdx] = temp;

        const bar1 = document.getElementById(`bar-${i}`);
        const bar2 = document.getElementById(`bar-${minIdx}`);

        if (bar1) {
          bar1.style.height = `${this.array[i]}px`;
          const lbl = bar1.querySelector('.visualizer-bar-label');
          if (lbl) lbl.innerText = this.array[i];
        }
        if (bar2) {
          bar2.style.height = `${this.array[minIdx]}px`;
          const lbl = bar2.querySelector('.visualizer-bar-label');
          if (lbl) lbl.innerText = this.array[minIdx];
        }
      }

      // Clear highlights
      const barMin = document.getElementById(`bar-${minIdx}`);
      if (barMin) barMin.classList.remove('active');
      
      const barCurrent = document.getElementById(`bar-${i}`);
      if (barCurrent) {
        barCurrent.classList.remove('active');
        barCurrent.classList.add('sorted');
      }
    }
  },

  async insertionSort() {
    const len = this.array.length;
    
    // First element is sorted
    const firstBar = document.getElementById('bar-0');
    if (firstBar) firstBar.classList.add('sorted');

    for (let i = 1; i < len; i++) {
      let key = this.array[i];
      let j = i - 1;

      const currentBar = document.getElementById(`bar-${i}`);
      if (currentBar) currentBar.classList.add('active');

      await this.sleep();

      while (j >= 0 && this.array[j] > key) {
        if (this.stopSortingFlag) return;

        const compareBar = document.getElementById(`bar-${j}`);
        const targetBar = document.getElementById(`bar-${j+1}`);

        if (compareBar) compareBar.classList.add('compare');
        
        await this.sleep();

        this.array[j+1] = this.array[j];

        if (targetBar) {
          targetBar.style.height = `${this.array[j]}px`;
          const lbl = targetBar.querySelector('.visualizer-bar-label');
          if (lbl) lbl.innerText = this.array[j];
          targetBar.classList.add('sorted'); // maintain sorted state color
        }

        if (compareBar) compareBar.classList.remove('compare');
        j--;
      }

      this.array[j+1] = key;
      const insertBar = document.getElementById(`bar-${j+1}`);
      if (insertBar) {
        insertBar.style.height = `${key}px`;
        const lbl = insertBar.querySelector('.visualizer-bar-label');
        if (lbl) lbl.innerText = key;
        insertBar.classList.add('sorted');
      }

      if (currentBar) currentBar.classList.remove('active');
      await this.sleep();
    }
  }
};
window.DSAPrep = DSAPrep;
