// Preparation Arena module controller

const PrepArena = {
  activeSection: 'aptitude', // 'aptitude', 'technical', 'flashcards', 'hr'
  
  // Quiz states
  quizQuestions: [],
  currentQuestionIdx: 0,
  selectedOptionIdx: null,
  quizAnswers: [], // stores user selections
  quizScore: 0,
  quizTimerInterval: null,
  quizTimeRemaining: 120, // 2 minutes total
  quizStarted: false,

  // HR Simulator states
  hrQuestions: [],
  currentHrIdx: 0,
  hrChatLog: [],
  hrFinished: false,

  init() {
    this.resetQuizState();
    this.resetHrState();
  },

  resetQuizState() {
    this.quizStarted = false;
    this.currentQuestionIdx = 0;
    this.selectedOptionIdx = null;
    this.quizAnswers = [];
    this.quizScore = 0;
    if (this.quizTimerInterval) {
      clearInterval(this.quizTimerInterval);
      this.quizTimerInterval = null;
    }
    this.quizTimeRemaining = 120;
  },

  resetHrState() {
    this.currentHrIdx = 0;
    this.hrFinished = false;
    this.hrChatLog = [
      {
        sender: 'interviewer',
        name: 'HR Manager',
        text: 'Hello! Welcome to your mock behavioral interview. I am going to ask you a series of common questions. Take your time to write structured answers (we suggest the STAR framework). Let\'s start: Tell me about yourself and your background.'
      }
    ];
  },

  render(containerId) {
    const container = document.getElementById(containerId);
    
    let leftMenu = `
      <div class="prep-layout">
        <aside class="glass-card" style="align-self: start;">
          <h3 style="font-size: 14px; text-transform: uppercase; color: var(--text-muted); margin-bottom: 16px; letter-spacing: 0.05em;">Prep Sections</h3>
          <ul class="prep-menu-list">
            <li class="prep-menu-item ${this.activeSection === 'aptitude' ? 'active' : ''}" onclick="PrepArena.setSection('aptitude')">🔢 Aptitude Prep</li>
            <li class="prep-menu-item ${this.activeSection === 'technical' ? 'active' : ''}" onclick="PrepArena.setSection('technical')">💻 Technical Core CS</li>
            <li class="prep-menu-item ${this.activeSection === 'flashcards' ? 'active' : ''}" onclick="PrepArena.setSection('flashcards')">🃏 Concept Flashcards</li>
            <li class="prep-menu-item ${this.activeSection === 'hr' ? 'active' : ''}" onclick="PrepArena.setSection('hr')">🤝 HR Interview Simulator</li>
          </ul>
        </aside>
        
        <section class="prep-main-panel" id="prep-panel-content">
          ${this.renderSectionContent()}
        </section>
      </div>
    `;

    container.innerHTML = leftMenu;
  },

  setSection(sectionName) {
    this.activeSection = sectionName;
    this.resetQuizState();
    this.resetHrState();
    this.render('app-content');
  },

  renderSectionContent() {
    if (this.activeSection === 'aptitude' || this.activeSection === 'technical') {
      return this.renderLearningAndQuizSection();
    } else if (this.activeSection === 'flashcards') {
      return this.renderFlashcardsSection();
    } else if (this.activeSection === 'hr') {
      return this.renderHrSection();
    }
  },

  // --- Aptitude & Technical Core Layout ---
  renderLearningAndQuizSection() {
    const dataKey = this.activeSection;
    const sectionData = APP_DATA.prep[dataKey];
    
    if (this.quizStarted) {
      return this.renderQuizRunningHTML();
    }

    return `
      <div style="display: flex; flex-direction: column; gap: 28px;">
        <div class="glass-card" style="display: flex; justify-content: space-between; align-items: center;">
          <div>
            <h2 style="font-size: 20px; margin-bottom: 6px; font-family: var(--font-display); text-transform: capitalize;">${dataKey} Preparation</h2>
            <p style="font-size: 14px; color: var(--text-muted);">Review core syllabus notes below or test your understanding with a quick timed mock assessment.</p>
          </div>
          <button class="btn btn-primary" onclick="PrepArena.startQuiz('${dataKey}')">⚡ Start 2-Min Quiz</button>
        </div>

        <h3 style="font-size: 16px; font-family: var(--font-display); color: var(--secondary);">Topic Study Notes</h3>
        <div class="notes-container">
          ${sectionData.notes.map(note => `
            <div class="glass-card note-card">
              <h4 class="note-title">${note.title}</h4>
              <div class="note-body">${note.content}</div>
            </div>
          `).join('')}
        </div>
      </div>
    `;
  },

  // --- Quiz Engine ---
  startQuiz(dataKey) {
    this.quizQuestions = APP_DATA.prep[dataKey].questions;
    this.quizStarted = true;
    this.currentQuestionIdx = 0;
    this.selectedOptionIdx = null;
    this.quizAnswers = [];
    this.quizScore = 0;
    this.quizTimeRemaining = 120;
    
    this.render('app-content');
    
    this.quizTimerInterval = setInterval(() => {
      this.quizTimeRemaining--;
      const timerElement = document.getElementById('quiz-timer-display');
      if (timerElement) {
        timerElement.innerText = this.formatTime(this.quizTimeRemaining);
        if (this.quizTimeRemaining <= 30) {
          timerElement.parentElement.classList.add('warning');
        }
      }
      
      if (this.quizTimeRemaining <= 0) {
        this.submitQuiz();
      }
    }, 1000);
  },

  formatTime(seconds) {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  },

  renderQuizRunningHTML() {
    const question = this.quizQuestions[this.currentQuestionIdx];
    const progressPercent = ((this.currentQuestionIdx) / this.quizQuestions.length) * 100;
    
    return `
      <div class="glass-card quiz-container">
        <div class="quiz-header">
          <div>
            <h2 style="font-size: 18px; font-family: var(--font-display);">Question ${this.currentQuestionIdx + 1} of ${this.quizQuestions.length}</h2>
          </div>
          <div class="quiz-timer">
            ⏱️ <span id="quiz-timer-display">${this.formatTime(this.quizTimeRemaining)}</span>
          </div>
        </div>

        <div class="quiz-progress-bar-container">
          <div class="quiz-progress-bar-fill" style="width: ${progressPercent}%;"></div>
        </div>

        <div class="quiz-question-box">
          ${question.question}
        </div>

        <div class="quiz-options-list">
          ${question.options.map((opt, idx) => `
            <button class="quiz-option ${this.selectedOptionIdx === idx ? 'selected' : ''}" onclick="PrepArena.selectOption(${idx})">
              <span class="option-letter">${String.fromCharCode(65 + idx)}</span>
              <span>${opt}</span>
            </button>
          `).join('')}
        </div>

        <div style="display: flex; justify-content: space-between; align-items: center; margin-top: 24px;">
          <button class="btn btn-secondary" onclick="PrepArena.quitQuiz()">Quit Test</button>
          <button class="btn btn-primary" id="quiz-next-btn" ${this.selectedOptionIdx === null ? 'disabled' : ''} onclick="PrepArena.nextQuestion()">
            ${this.currentQuestionIdx === this.quizQuestions.length - 1 ? 'Finish Quiz' : 'Next Question &rarr;'}
          </button>
        </div>
      </div>
    `;
  },

  selectOption(idx) {
    this.selectedOptionIdx = idx;
    
    // Update UI highlights
    const options = document.querySelectorAll('.quiz-option');
    options.forEach((opt, index) => {
      if (index === idx) {
        opt.classList.add('selected');
      } else {
        opt.classList.remove('selected');
      }
    });

    const nextBtn = document.getElementById('quiz-next-btn');
    if (nextBtn) nextBtn.removeAttribute('disabled');
  },

  nextQuestion() {
    // Save current answer
    this.quizAnswers.push(this.selectedOptionIdx);
    
    if (this.selectedOptionIdx === this.quizQuestions[this.currentQuestionIdx].correct) {
      this.quizScore++;
    }

    if (this.currentQuestionIdx < this.quizQuestions.length - 1) {
      this.currentQuestionIdx++;
      this.selectedOptionIdx = null;
      this.render('app-content');
    } else {
      this.submitQuiz();
    }
  },

  submitQuiz() {
    if (this.quizTimerInterval) {
      clearInterval(this.quizTimerInterval);
      this.quizTimerInterval = null;
    }
    
    // Update local storage history
    const history = JSON.parse(localStorage.getItem('quiz_history') || '[]');
    history.push({
      date: new Date().toLocaleDateString(),
      section: this.activeSection,
      score: this.quizScore,
      total: this.quizQuestions.length
    });
    localStorage.setItem('quiz_history', JSON.stringify(history));

    if (typeof App !== 'undefined') {
      App.updateOverviewStats();
    }

    this.renderQuizResults();
  },

  quitQuiz() {
    if (confirm("Are you sure you want to quit? Your progress in this quiz will be lost.")) {
      this.resetQuizState();
      this.render('app-content');
    }
  },

  renderQuizResults() {
    const contentPanel = document.getElementById('prep-panel-content');
    const percent = Math.round((this.quizScore / this.quizQuestions.length) * 100);
    
    contentPanel.innerHTML = `
      <div class="glass-card quiz-results-card">
        <h2 style="font-size: 24px; margin-bottom: 8px; font-family: var(--font-display);">Quiz Completed!</h2>
        <p style="font-size: 14px; color: var(--text-muted); margin-bottom: 28px;">Here is how you performed on the assessment.</p>

        <div class="score-circle-container">
          <span class="score-value">${percent}%</span>
          <span class="score-total">${this.quizScore} / ${this.quizQuestions.length} Correct</span>
        </div>

        <h3 style="font-size: 16px; margin-bottom: 16px; text-align: left;">Detailed Review & Explanations:</h3>
        <div style="display: flex; flex-direction: column; gap: 16px; margin-bottom: 32px; text-align: left;">
          ${this.quizQuestions.map((q, idx) => {
            const userAns = this.quizAnswers[idx];
            const isCorrect = userAns === q.correct;
            return `
              <div class="glass-card" style="border-color: ${isCorrect ? 'var(--success)' : 'var(--danger)'}; background: rgba(255,255,255,0.01);">
                <div style="font-weight: 700; font-size: 14px; margin-bottom: 8px;">Q${idx + 1}: ${q.question}</div>
                <div style="font-size: 13px; color: var(--text-muted); margin-bottom: 4px;">
                  Your Answer: <span style="font-weight: 600; color: ${isCorrect ? 'var(--success)' : 'var(--danger)'};">${userAns !== undefined ? q.options[userAns] : 'Not Answered'}</span>
                </div>
                <div style="font-size: 13px; color: var(--text-muted); margin-bottom: 8px;">
                  Correct Answer: <span style="font-weight: 600; color: var(--success);">${q.options[q.correct]}</span>
                </div>
                <div style="font-size: 12px; font-style: italic; background: rgba(255,255,255,0.02); padding: 8px 12px; border-radius: 6px; border-left: 3px solid var(--secondary);">
                  <strong>Explanation:</strong> ${q.explanation}
                </div>
              </div>
            `;
          }).join('')}
        </div>

        <button class="btn btn-primary" onclick="PrepArena.setSection('${this.activeSection}')">Back to Study Room</button>
      </div>
    `;
  },

  // --- Concept Flashcards Section ---
  activeFlashcardIdx: 0,

  renderFlashcardsSection() {
    const card = APP_DATA.prep.flashcards[this.activeFlashcardIdx];
    return `
      <div class="flashcards-container">
        <div style="text-align: center;">
          <h2 style="font-size: 20px; margin-bottom: 6px; font-family: var(--font-display);">CS Core Concept Flashcards</h2>
          <p style="font-size: 14px; color: var(--text-muted);">Quickly review core engineering concepts. Click the card to flip it over.</p>
        </div>

        <div class="flashcard" onclick="this.classList.toggle('flipped')">
          <div class="flashcard-inner">
            <div class="flashcard-front">
              <span class="flashcard-title">Concept Q#${this.activeFlashcardIdx + 1}</span>
              <div class="flashcard-content">${card.front}</div>
              <span class="flashcard-hint">Click card to reveal definition</span>
            </div>
            <div class="flashcard-back">
              <span class="flashcard-title">Answer Definition</span>
              <div class="flashcard-content">${card.back}</div>
              <span class="flashcard-hint">Click card to see question</span>
            </div>
          </div>
        </div>

        <div style="display: flex; align-items: center; gap: 24px;">
          <button class="btn btn-secondary" onclick="PrepArena.prevFlashcard()" ${this.activeFlashcardIdx === 0 ? 'disabled' : ''}>&larr; Previous</button>
          <span style="font-size: 14px; color: var(--text-muted); font-weight: 600;">${this.activeFlashcardIdx + 1} / ${APP_DATA.prep.flashcards.length}</span>
          <button class="btn btn-secondary" onclick="PrepArena.nextFlashcard()" ${this.activeFlashcardIdx === APP_DATA.prep.flashcards.length - 1 ? 'disabled' : ''}>Next &rarr;</button>
        </div>
      </div>
    `;
  },

  prevFlashcard() {
    if (this.activeFlashcardIdx > 0) {
      this.activeFlashcardIdx--;
      this.render('app-content');
    }
  },

  nextFlashcard() {
    if (this.activeFlashcardIdx < APP_DATA.prep.flashcards.length - 1) {
      this.activeFlashcardIdx++;
      this.render('app-content');
    }
  },

  // --- HR Interview Simulator ---
  renderHrSection() {
    return `
      <div style="display: flex; flex-direction: column; gap: 20px;">
        <div class="glass-card">
          <h2 style="font-size: 20px; margin-bottom: 6px; font-family: var(--font-display);">HR Interview Simulator</h2>
          <p style="font-size: 14px; color: var(--text-muted);">Practice behavioral interview questions. Type out responses. The system will evaluate your response length, keywords, and structure using the STAR method.</p>
        </div>

        <div class="hr-chat-panel">
          <div class="hr-chat-history" id="hr-chat-history">
            ${this.hrChatLog.map(bubble => `
              <div class="chat-bubble ${bubble.sender}">
                <div class="chat-bubble-name">${bubble.name}</div>
                <div>${bubble.text}</div>
              </div>
            `).join('')}
          </div>
          
          ${!this.hrFinished ? `
            <form class="hr-input-bar" onsubmit="PrepArena.sendCandidateAnswer(event)">
              <input type="text" id="hr-candidate-input" class="form-control" placeholder="Type your response here..." autocomplete="off">
              <button type="submit" class="btn btn-primary">Send</button>
            </form>
          ` : `
            <div style="padding: 20px; background: var(--bg-surface); text-align: center; border-top: 1px solid var(--border-glass);">
              <button class="btn btn-primary" onclick="PrepArena.restartHrInterview()">Restart Simulation</button>
            </div>
          `}
        </div>
      </div>
    `;
  },

  sendCandidateAnswer(event) {
    event.preventDefault();
    const input = document.getElementById('hr-candidate-input');
    if (!input || !input.value.trim()) return;

    const answerText = input.value.trim();
    input.value = '';

    // Append candidate message
    this.hrChatLog.push({
      sender: 'candidate',
      name: 'You',
      text: answerText
    });

    this.render('app-content');
    this.scrollChatToBottom();

    // Trigger interviewer analysis and follow-up
    setTimeout(() => {
      this.processInterviewerFeedback(answerText);
    }, 1000);
  },

  processInterviewerFeedback(candidateAnswer) {
    // Simple mock NLP / keyword checks
    const questions = APP_DATA.prep.hr.questions;
    
    // Analyze response
    let feedbackScore = 6;
    let feedbackNotes = [];

    // Length check
    if (candidateAnswer.length < 50) {
      feedbackScore -= 2;
      feedbackNotes.push("❌ Response is quite short. Try expanding details to convey deeper context.");
    } else if (candidateAnswer.length > 180) {
      feedbackScore += 2;
      feedbackNotes.push("✅ Detailed response! Gives good depth to the interviewer.");
    } else {
      feedbackScore += 1;
      feedbackNotes.push("✅ Nice concise length.");
    }

    // Structure checks (STAR method indicators)
    const starKeywords = ['situation', 'task', 'action', 'result', 'because', 'managed', 'achieved', 'solved', 'improved', 'team'];
    const matches = starKeywords.filter(keyword => candidateAnswer.toLowerCase().includes(keyword));
    
    if (matches.length >= 3) {
      feedbackScore += 2;
      feedbackNotes.push("✅ Strong structural markers detected (hints of STAR framework / results-oriented words).");
    } else {
      feedbackNotes.push("⚠️ Try to structure your answer using STAR: Situation, Task, Action, Result. Highlight specific actions you took.");
    }

    // Cap score at 10, min at 3
    feedbackScore = Math.max(3, Math.min(10, feedbackScore));
    
    // Construct interviewer feedback text
    let feedbackHTML = `
      <div style="margin-bottom: 8px; font-weight: 700; color: var(--secondary);">Response Score: ${feedbackScore}/10</div>
      <div class="score-feedback-list">
        ${feedbackNotes.map(note => `<div class="feedback-item">${note}</div>`).join('')}
      </div>
    `;

    this.hrChatLog.push({
      sender: 'interviewer',
      name: 'HR Evaluator (System)',
      text: feedbackHTML
    });

    // Determine next question
    if (this.currentHrIdx < questions.length) {
      const nextQ = questions[this.currentHrIdx];
      this.currentHrIdx++;
      
      this.hrChatLog.push({
        sender: 'interviewer',
        name: 'HR Manager',
        text: `Good point. Let's move to the next question: <strong>${nextQ.question}</strong><br><small style="color: var(--text-muted);">Hint: ${nextQ.hint}</small>`
      });
    } else {
      this.hrFinished = true;
      this.hrChatLog.push({
        sender: 'interviewer',
        name: 'HR Manager',
        text: `Excellent. That wraps up our mock HR session! Practicing standard questions builds speaking confidence. You scored well overall. Feel free to restart the simulation to practice again.`
      });
    }

    this.render('app-content');
    this.scrollChatToBottom();
  },

  scrollChatToBottom() {
    const history = document.getElementById('hr-chat-history');
    if (history) {
      history.scrollTop = history.scrollHeight;
    }
  },

  restartHrInterview() {
    this.resetHrState();
    this.render('app-content');
  }
};
window.PrepArena = PrepArena;
