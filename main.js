/**
 * PEEHU SOLANKI - PORTFOLIO ENGINE (main.js)
 * High-performance vanilla JavaScript controller:
 * - Dynamic data injection from data.js
 * - Interactive Neural Network Canvas (Hero)
 * - Slide navigation, scroll-snapping & keyboard shortcuts
 * - Typewriter text cycler
 * - Animated SVG circular progress rings & skill bars
 * - Project filtering & detail modal
 * - Dark / Light theme toggle with local persistence
 * - Working contact form handling & clipboard copy
 */

(function () {
  'use strict';

  // Fallback check for PORTFOLIO_DATA
  const DATA = window.PORTFOLIO_DATA;
  if (!DATA) {
    console.error("PORTFOLIO_DATA is not loaded. Please verify data.js is included before main.js.");
    return;
  }

  /* ==========================================================================
     DOM ELEMENTS REFS
     ========================================================================== */
  const slidesContainer = document.querySelector('.slides-container');
  const slides = document.querySelectorAll('.slide');
  const dotNavItems = document.querySelectorAll('.dot-nav-item');
  const progressBar = document.getElementById('scroll-progress');
  const themeToggleBtn = document.getElementById('theme-toggle-btn');
  const typewriterElement = document.getElementById('typewriter-text');
  const heroCanvas = document.getElementById('hero-canvas');
  const projectModal = document.getElementById('project-modal');
  const modalBody = document.getElementById('modal-body-content');
  const toastContainer = document.getElementById('toast-container');
  const jaipurClockEl = document.getElementById('jaipur-clock');

  let currentSlideIndex = 0;
  let isAnimatingSlide = false;
  let hasAnimatedSlide2 = false;
  let hasAnimatedSlide3 = false;

  /* ==========================================================================
     THEME CONTROLLER (Dark / Light)
     ========================================================================== */
  function initTheme() {
    const savedTheme = localStorage.getItem('peehu_portfolio_theme');
    const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const initialTheme = savedTheme || (systemPrefersDark ? 'dark' : 'dark'); // default dark as requested

    setTheme(initialTheme);

    if (themeToggleBtn) {
      themeToggleBtn.addEventListener('click', () => {
        const activeTheme = document.documentElement.getAttribute('data-theme') || 'dark';
        const nextTheme = activeTheme === 'dark' ? 'light' : 'dark';
        setTheme(nextTheme);
        showToast(nextTheme === 'dark' ? "🌙 Switched to Dark Theme" : "☀️ Switched to Light Theme");
      });
    }
  }

  function setTheme(theme) {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('peehu_portfolio_theme', theme);
    updateThemeIcon(theme);
  }

  function updateThemeIcon(theme) {
    if (!themeToggleBtn) return;
    if (theme === 'light') {
      themeToggleBtn.innerHTML = `
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
        </svg>`;
      themeToggleBtn.setAttribute('title', 'Switch to Dark Mode');
      themeToggleBtn.setAttribute('aria-label', 'Switch to Dark Mode');
    } else {
      themeToggleBtn.innerHTML = `
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <circle cx="12" cy="12" r="5"></circle>
          <line x1="12" y1="1" x2="12" y2="3"></line>
          <line x1="12" y1="21" x2="12" y2="23"></line>
          <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line>
          <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line>
          <line x1="1" y1="12" x2="3" y2="12"></line>
          <line x1="21" y1="12" x2="23" y2="12"></line>
          <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line>
          <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line>
        </svg>`;
      themeToggleBtn.setAttribute('title', 'Switch to Light Mode');
      themeToggleBtn.setAttribute('aria-label', 'Switch to Light Mode');
    }
  }

  /* ==========================================================================
     INTERACTIVE NEURAL NETWORK CANVAS (Slide 1 Hero)
     ========================================================================== */
  let canvasAnimationId = null;
  function initHeroCanvas() {
    if (!heroCanvas) return;
    const ctx = heroCanvas.getContext('2d');
    let width = (heroCanvas.width = heroCanvas.parentElement.offsetWidth);
    let height = (heroCanvas.height = heroCanvas.parentElement.offsetHeight);

    const particles = [];
    const particleCount = Math.min(Math.floor((width * height) / 12000), 75);
    const connectionDistance = 140;
    const mouse = { x: null, y: null, radius: 150 };

    window.addEventListener('resize', () => {
      if (!heroCanvas || !heroCanvas.parentElement) return;
      width = heroCanvas.width = heroCanvas.parentElement.offsetWidth;
      height = heroCanvas.height = heroCanvas.parentElement.offsetHeight;
    });

    window.addEventListener('mousemove', (e) => {
      const rect = heroCanvas.getBoundingClientRect();
      if (e.clientY <= rect.bottom && e.clientY >= rect.top) {
        mouse.x = e.clientX - rect.left;
        mouse.y = e.clientY - rect.top;
      } else {
        mouse.x = null;
        mouse.y = null;
      }
    });

    window.addEventListener('mouseleave', () => {
      mouse.x = null;
      mouse.y = null;
    });

    class Particle {
      constructor() {
        this.x = Math.random() * width;
        this.y = Math.random() * height;
        this.vx = (Math.random() - 0.5) * 0.7;
        this.vy = (Math.random() - 0.5) * 0.7;
        this.radius = Math.random() * 2.2 + 1.2;
        this.baseColor = Math.random() > 0.4 ? '99, 102, 241' : '6, 182, 212';
      }

      update() {
        this.x += this.vx;
        this.y += this.vy;

        if (this.x < 0 || this.x > width) this.vx *= -1;
        if (this.y < 0 || this.y > height) this.vy *= -1;

        // Mouse attraction/repulsion
        if (mouse.x !== null && mouse.y !== null) {
          const dx = mouse.x - this.x;
          const dy = mouse.y - this.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < mouse.radius) {
            const force = (mouse.radius - dist) / mouse.radius;
            this.x -= (dx / dist) * force * 2.5;
            this.y -= (dy / dist) * force * 2.5;
          }
        }
      }

      draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${this.baseColor}, 0.85)`;
        ctx.shadowBlur = 8;
        ctx.shadowColor = `rgba(${this.baseColor}, 0.6)`;
        ctx.fill();
        ctx.shadowBlur = 0;
      }
    }

    for (let i = 0; i < particleCount; i++) {
      particles.push(new Particle());
    }

    function animate() {
      // Pause drawing if not on slide 1 to preserve CPU/battery
      if (currentSlideIndex === 0) {
        ctx.clearRect(0, 0, width, height);

        // Connect particles
        for (let i = 0; i < particles.length; i++) {
          particles[i].update();
          particles[i].draw();

          for (let j = i + 1; j < particles.length; j++) {
            const dx = particles[i].x - particles[j].x;
            const dy = particles[i].y - particles[j].y;
            const dist = Math.sqrt(dx * dx + dy * dy);

            if (dist < connectionDistance) {
              const alpha = (1 - dist / connectionDistance) * 0.35;
              ctx.beginPath();
              ctx.moveTo(particles[i].x, particles[i].y);
              ctx.lineTo(particles[j].x, particles[j].y);
              ctx.strokeStyle = `rgba(99, 102, 241, ${alpha})`;
              ctx.lineWidth = 1;
              ctx.stroke();
            }
          }
        }
      }
      canvasAnimationId = requestAnimationFrame(animate);
    }

    animate();
  }

  /* ==========================================================================
     TYPEWRITER ANIMATION (Slide 1 Hero)
     ========================================================================== */
  function initTypewriter() {
    if (!typewriterElement) return;
    const words = DATA.personal.typewriterWords || [
      "Machine Learning Engineer",
      "Deep Learning Explorer",
      "Problem Solver"
    ];

    let wordIdx = 0;
    let charIdx = 0;
    let isDeleting = false;
    const typingSpeed = 90;
    const deletingSpeed = 45;
    const holdDelay = 1800;

    function typeLoop() {
      const currentWord = words[wordIdx];

      if (isDeleting) {
        typewriterElement.textContent = currentWord.substring(0, charIdx - 1);
        charIdx--;
      } else {
        typewriterElement.textContent = currentWord.substring(0, charIdx + 1);
        charIdx++;
      }

      let timeout = isDeleting ? deletingSpeed : typingSpeed;

      if (!isDeleting && charIdx === currentWord.length) {
        timeout = holdDelay;
        isDeleting = true;
      } else if (isDeleting && charIdx === 0) {
        isDeleting = false;
        wordIdx = (wordIdx + 1) % words.length;
        timeout = 400;
      }

      setTimeout(typeLoop, timeout);
    }

    typeLoop();
  }

  /* ==========================================================================
     SLIDE NAVIGATION & SCROLL CONTROLLER
     ========================================================================== */
  function initSlideNavigation() {
    if (!slidesContainer) return;

    // Dot navigation clicks
    dotNavItems.forEach((dot, index) => {
      dot.addEventListener('click', (e) => {
        e.preventDefault();
        scrollToSlide(index);
      });
    });

    // Keyboard arrow navigation
    window.addEventListener('keydown', (e) => {
      // Don't intercept if user is typing in contact form
      if (['INPUT', 'TEXTAREA'].includes(document.activeElement.tagName)) {
        return;
      }

      if (e.key === 'ArrowDown' || e.key === 'PageDown' || (e.key === ' ' && !e.shiftKey)) {
        e.preventDefault();
        navigateSlide(1);
      } else if (e.key === 'ArrowUp' || e.key === 'PageUp' || (e.key === ' ' && e.shiftKey)) {
        e.preventDefault();
        navigateSlide(-1);
      } else if (e.key === 'Home') {
        e.preventDefault();
        scrollToSlide(0);
      } else if (e.key === 'End') {
        e.preventDefault();
        scrollToSlide(slides.length - 1);
      }
    });

    // Track scroll events to sync active slide, progress bar, and triggers
    let scrollTimeout;
    slidesContainer.addEventListener('scroll', () => {
      updateProgressBar();

      clearTimeout(scrollTimeout);
      scrollTimeout = setTimeout(() => {
        detectActiveSlide();
      }, 50);
    });

    // IntersectionObserver for reliable slide activations
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && entry.intersectionRatio >= 0.5) {
            const slideId = entry.target.id;
            const index = Array.from(slides).findIndex((s) => s.id === slideId);
            if (index !== -1) {
              setActiveSlideUI(index);
            }
          }
        });
      },
      { root: slidesContainer, threshold: 0.5 }
    );

    slides.forEach((slide) => observer.observe(slide));
  }

  function scrollToSlide(index) {
    if (index < 0 || index >= slides.length) return;
    const targetSlide = slides[index];
    if (targetSlide) {
      targetSlide.scrollIntoView({ behavior: 'smooth' });
      setActiveSlideUI(index);
    }
  }

  function navigateSlide(direction) {
    const nextIndex = Math.max(0, Math.min(slides.length - 1, currentSlideIndex + direction));
    if (nextIndex !== currentSlideIndex) {
      scrollToSlide(nextIndex);
    }
  }

  function detectActiveSlide() {
    const scrollTop = slidesContainer.scrollTop;
    const windowHeight = window.innerHeight;
    const index = Math.round(scrollTop / windowHeight);
    if (index >= 0 && index < slides.length && index !== currentSlideIndex) {
      setActiveSlideUI(index);
    }
  }

  function setActiveSlideUI(index) {
    currentSlideIndex = index;

    // Update Side Dots
    dotNavItems.forEach((dot, i) => {
      dot.classList.toggle('active', i === index);
      const btn = dot.querySelector('.dot-nav-btn');
      if (btn) {
        btn.setAttribute('aria-current', i === index ? 'true' : 'false');
      }
    });

    // Update Top Nav active links
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach((link) => {
      const targetId = link.getAttribute('href');
      const targetIndex = Array.from(slides).findIndex((s) => '#' + s.id === targetId);
      link.classList.toggle('active', targetIndex === index);
    });

    // Slide 2 Trigger (About & Education)
    if (index === 1 && !hasAnimatedSlide2) {
      hasAnimatedSlide2 = true;
      animateSlide2RingsAndStats();
    }

    // Slide 3 Trigger (Skills)
    if (index === 2 && !hasAnimatedSlide3) {
      hasAnimatedSlide3 = true;
      animateSlide3SkillBars();
    }
  }

  function updateProgressBar() {
    if (!progressBar || !slidesContainer) return;
    const scrollHeight = slidesContainer.scrollHeight - slidesContainer.clientHeight;
    if (scrollHeight <= 0) {
      progressBar.style.width = '0%';
      return;
    }
    const percent = Math.min(100, Math.max(0, (slidesContainer.scrollTop / scrollHeight) * 100));
    progressBar.style.width = percent + '%';
  }

  /* ==========================================================================
     SLIDE 2: CIRCULAR PROGRESS RINGS & COUNTER ANIMATION
     ========================================================================== */
  function animateSlide2RingsAndStats() {
    // 1. CGPA Ring (9.2 / 10 -> 92%)
    // Circumference = 2 * Math.PI * r = 2 * 3.14159 * 42 = 263.89
    const circleRadius = 42;
    const circumference = 2 * Math.PI * circleRadius;

    const cgpaRing = document.getElementById('ring-cgpa-path');
    const percentRing = document.getElementById('ring-percent-path');

    if (cgpaRing) {
      cgpaRing.style.strokeDasharray = `${circumference} ${circumference}`;
      const cgpaOffset = circumference - (9.2 / 10) * circumference;
      cgpaRing.style.strokeDashoffset = cgpaOffset;
    }

    if (percentRing) {
      percentRing.style.strokeDasharray = `${circumference} ${circumference}`;
      const percentOffset = circumference - (92 / 100) * circumference;
      percentRing.style.strokeDashoffset = percentOffset;
    }

    // 2. Animate Numbers
    animateNumberCounter('counter-cgpa', 0, 9.2, 1, 1500);
    animateNumberCounter('counter-percent', 0, 92, 0, 1500);
    animateNumberCounter('stat-cgpa', 0, 9.2, 1, 1500);
    animateNumberCounter('stat-projects', 0, 6, 0, 1200);
    animateNumberCounter('stat-certs', 0, 3, 0, 1000);
    animateNumberCounter('stat-internships', 0, 1, 0, 800);
  }

  function animateNumberCounter(elementId, start, end, decimals, duration) {
    const el = document.getElementById(elementId);
    if (!el) return;

    const startTime = performance.now();
    function step(currentTime) {
      const progress = Math.min((currentTime - startTime) / duration, 1);
      const easeProgress = 1 - Math.pow(1 - progress, 3); // ease-out cubic
      const currentVal = start + (end - start) * easeProgress;
      el.textContent = currentVal.toFixed(decimals);

      if (progress < 1) {
        requestAnimationFrame(step);
      } else {
        el.textContent = end.toFixed(decimals);
      }
    }
    requestAnimationFrame(step);
  }

  /* ==========================================================================
     SLIDE 3: ANIMATED SKILL BARS
     ========================================================================== */
  function animateSlide3SkillBars() {
    const fills = document.querySelectorAll('.skill-bar-fill');
    fills.forEach((fill) => {
      const targetWidth = fill.getAttribute('data-target-width') || '85%';
      fill.style.width = targetWidth;
    });
  }

  /* ==========================================================================
     DYNAMIC DATA POPULATION
     ========================================================================== */
  function renderAllContent() {
    renderHero();
    renderSlide2About();
    renderSlide3Skills();
    renderSlide4Projects();
    renderSlide5InternshipAndCerts();
    renderContactAndFooter();
    startJaipurClock();
  }

  function renderHero() {
    // Buttons & Links
    const viewProjectsBtn = document.getElementById('hero-btn-projects');
    const contactBtn = document.getElementById('hero-btn-contact');
    const resumeBtn = document.getElementById('hero-btn-resume');

    if (viewProjectsBtn) {
      viewProjectsBtn.addEventListener('click', (e) => {
        e.preventDefault();
        scrollToSlide(3); // Slide 4
      });
    }

    if (contactBtn) {
      contactBtn.addEventListener('click', (e) => {
        e.preventDefault();
        scrollToSlide(4); // Slide 5
      });
    }

    if (resumeBtn) {
      resumeBtn.addEventListener('click', (e) => {
        if (DATA.personal.resumeUrl === '#') {
          e.preventDefault();
          showToast('📄 Resume template preview: Add your hosted PDF link to data.js');
        }
      });
    }

    // Social Links
    const githubLink = document.getElementById('hero-github');
    const linkedinLink = document.getElementById('hero-linkedin');
    const emailLink = document.getElementById('hero-email');

    if (githubLink) githubLink.href = DATA.personal.socials.github;
    if (linkedinLink) linkedinLink.href = DATA.personal.socials.linkedin;
    if (emailLink) emailLink.href = DATA.personal.socials.email;
  }

  function renderSlide2About() {
    const bioContainer = document.getElementById('bio-container');
    if (bioContainer && DATA.personal.bio) {
      bioContainer.innerHTML = DATA.personal.bio
        .map((paragraph) => `<p class="bio-paragraph">${paragraph}</p>`)
        .join('');
    }

    // Vertical Timeline rendering
    const timelineContainer = document.getElementById('timeline-container');
    if (timelineContainer && DATA.education) {
      timelineContainer.innerHTML = DATA.education
        .map(
          (edu) => `
        <div class="timeline-item">
          <div class="timeline-marker"></div>
          <div class="timeline-header">
            <h4 class="timeline-title">${edu.degree}</h4>
            <span class="timeline-period">${edu.period}</span>
          </div>
          <div class="timeline-institution">${edu.institution} • <strong style="color:var(--text-primary)">${edu.score}</strong></div>
          <ul class="timeline-highlights">
            ${edu.highlights.map((h) => `<li class="timeline-highlight-item">${h}</li>`).join('')}
          </ul>
        </div>
      `
        )
        .join('');
    }
  }

  function renderSlide3Skills() {
    renderSkillCategory('skills-languages-list', DATA.skills.languages);
    renderSkillCategory('skills-aiml-list', DATA.skills.aiml);
    renderSkillCategory('skills-web-list', DATA.skills.web);
    renderSkillCategory('skills-tools-list', DATA.skills.tools);

    // Currently Learning
    const learningContainer = document.getElementById('currently-learning-badges');
    if (learningContainer && DATA.skills.currentlyLearning) {
      learningContainer.innerHTML = DATA.skills.currentlyLearning
        .map(
          (item) => `
        <div class="learning-badge">
          <span>${item.name}</span>
          <span class="learning-badge-tag">${item.tag}</span>
        </div>
      `
        )
        .join('');
    }
  }

  function renderSkillCategory(containerId, skillList) {
    const container = document.getElementById(containerId);
    if (!container || !skillList) return;

    container.innerHTML = skillList
      .map(
        (skill) => `
      <div class="skill-row">
        <div class="skill-info">
          <span class="skill-name">${skill.name}</span>
          <span class="skill-percentage">${skill.level}%</span>
        </div>
        <div class="skill-bar-track">
          <div class="skill-bar-fill" data-target-width="${skill.level}%"></div>
        </div>
      </div>
    `
      )
      .join('');
  }

  /* ==========================================================================
     SLIDE 4: PROJECTS RENDERING & FILTERING
     ========================================================================== */
  function renderSlide4Projects(filterCategory = 'All') {
    const grid = document.getElementById('projects-grid');
    if (!grid || !DATA.projects) return;

    const filtered =
      filterCategory === 'All'
        ? DATA.projects
        : DATA.projects.filter(
            (p) =>
              p.category.toLowerCase().includes(filterCategory.toLowerCase()) ||
              p.tech.some((t) => t.toLowerCase().includes(filterCategory.toLowerCase()))
          );

    grid.innerHTML = filtered
      .map((proj) => {
        const svgArtwork = getProjectSvgArtwork(proj.id);
        return `
        <article class="project-card" data-project-id="${proj.id}">
          <div class="project-banner">
            ${svgArtwork}
            <div class="project-badge-pill">${proj.badge}</div>
            <div class="project-category-pill">${proj.category}</div>
          </div>
          <div class="project-body">
            <h3 class="project-title">${proj.title}</h3>
            <p class="project-description">${proj.description}</p>
            <div class="project-metrics">⚡ ${proj.metrics}</div>
            <div class="project-tech-chips">
              ${proj.tech.map((t) => `<span class="tech-chip">${t}</span>`).join('')}
            </div>
            <div class="project-footer-actions">
              <div style="display:flex;gap:12px;">
                <a href="${proj.github}" class="project-btn-link" target="_blank" rel="noopener noreferrer" title="View Source on GitHub">
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/>
                  </svg>
                  GitHub
                </a>
                <a href="${proj.demo}" class="project-btn-link" target="_blank" rel="noopener noreferrer" title="Live Preview">
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
                    <polyline points="15 3 21 3 21 9"></polyline>
                    <line x1="10" y1="14" x2="21" y2="3"></line>
                  </svg>
                  Demo
                </a>
              </div>
              <button class="btn-details" onclick="window.openProjectModal('${proj.id}')">
                Details ↗
              </button>
            </div>
          </div>
        </article>
      `;
      })
      .join('');
  }

  // Generate unique realistic SVG visual arts for project banners
  function getProjectSvgArtwork(id) {
    switch (id) {
      case 'resume-analyzer':
        return `
          <svg class="project-banner-svg" viewBox="0 0 400 160" fill="none">
            <rect width="400" height="160" fill="#0f172a"/>
            <path d="M120 40h160v80H120z" rx="8" fill="#1e293b" stroke="#6366f1" stroke-width="1.5"/>
            <line x1="140" y1="60" x2="240" y2="60" stroke="#818cf8" stroke-width="3" stroke-linecap="round"/>
            <line x1="140" y1="75" x2="210" y2="75" stroke="#94a3b8" stroke-width="2" stroke-linecap="round"/>
            <line x1="140" y1="90" x2="230" y2="90" stroke="#94a3b8" stroke-width="2" stroke-linecap="round"/>
            <circle cx="250" cy="85" r="14" fill="#6366f1" fill-opacity="0.2" stroke="#6366f1" stroke-width="2"/>
            <path d="M245 85l3 3 7-7" stroke="#38bdf8" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>`;
      case 'crop-disease':
        return `
          <svg class="project-banner-svg" viewBox="0 0 400 160" fill="none">
            <rect width="400" height="160" fill="#062e24"/>
            <circle cx="200" cy="80" r="50" fill="#047857" fill-opacity="0.2" stroke="#10b981" stroke-width="1.5" stroke-dasharray="4 4"/>
            <path d="M200 45c-25 20-30 45-20 70 15-5 35-25 40-50 2-10-8-18-20-20z" fill="#10b981" fill-opacity="0.7"/>
            <circle cx="210" cy="75" r="4" fill="#fbbf24"/>
            <line x1="150" y1="80" x2="250" y2="80" stroke="#10b981" stroke-width="1" stroke-opacity="0.4"/>
            <line x1="200" y1="30" x2="200" y2="130" stroke="#10b981" stroke-width="1" stroke-opacity="0.4"/>
          </svg>`;
      case 'ai-study-buddy':
        return `
          <svg class="project-banner-svg" viewBox="0 0 400 160" fill="none">
            <rect width="400" height="160" fill="#082f49"/>
            <rect x="130" y="45" width="60" height="70" rx="4" fill="#0369a1" fill-opacity="0.4" stroke="#0ea5e9" stroke-width="1.5"/>
            <circle cx="240" cy="80" r="28" fill="#38bdf8" fill-opacity="0.15" stroke="#38bdf8" stroke-width="2"/>
            <path d="M230 78h20M240 68v20" stroke="#38bdf8" stroke-width="2" stroke-linecap="round"/>
            <path d="M190 70c15-10 25-5 30 5" stroke="#0ea5e9" stroke-width="2" stroke-dasharray="3 3"/>
          </svg>`;
      case 'stock-predictor':
        return `
          <svg class="project-banner-svg" viewBox="0 0 400 160" fill="none">
            <rect width="400" height="160" fill="#0f172a"/>
            <path d="M60 120 L120 95 L180 110 L240 60 L300 85 L340 40" stroke="#3b82f6" stroke-width="3" fill="none" stroke-linecap="round"/>
            <path d="M60 120 L120 95 L180 110 L240 60 L300 85 L340 40 L340 160 L60 160 Z" fill="url(#stockGrad)" opacity="0.3"/>
            <defs>
              <linearGradient id="stockGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stop-color="#3b82f6"/>
                <stop offset="100%" stop-color="#3b82f6" stop-opacity="0"/>
              </linearGradient>
            </defs>
            <circle cx="340" cy="40" r="4" fill="#60a5fa"/>
          </svg>`;
      case 'face-attendance':
        return `
          <svg class="project-banner-svg" viewBox="0 0 400 160" fill="none">
            <rect width="400" height="160" fill="#1e1b4b"/>
            <rect x="150" y="35" width="100" height="90" rx="10" stroke="#818cf8" stroke-width="2" fill="none"/>
            <circle cx="185" cy="70" r="4" fill="#c084fc"/>
            <circle cx="215" cy="70" r="4" fill="#c084fc"/>
            <path d="M190 92c5 4 15 4 20 0" stroke="#c084fc" stroke-width="2" stroke-linecap="round"/>
            <path d="M140 25v15h-15M260 25v15h15M140 135v-15h-15M260 135v-15h15" stroke="#6366f1" stroke-width="3"/>
          </svg>`;
      case 'movie-recommender':
      default:
        return `
          <svg class="project-banner-svg" viewBox="0 0 400 160" fill="none">
            <rect width="400" height="160" fill="#2a1215"/>
            <rect x="130" y="40" width="140" height="80" rx="8" fill="#4c0519" stroke="#f43f5e" stroke-width="1.5"/>
            <polygon points="190,65 215,80 190,95" fill="#f43f5e"/>
            <circle cx="250" cy="55" r="4" fill="#fb7185"/>
            <circle cx="260" cy="70" r="3" fill="#fb7185"/>
            <circle cx="255" cy="85" r="3" fill="#fb7185"/>
          </svg>`;
    }
  }

  function initProjectFilters() {
    const filterButtons = document.querySelectorAll('.filter-tab');
    filterButtons.forEach((btn) => {
      btn.addEventListener('click', () => {
        filterButtons.forEach((b) => b.classList.remove('active'));
        btn.classList.add('active');
        const category = btn.getAttribute('data-filter') || 'All';
        renderSlide4Projects(category);
      });
    });
  }

  // Project Modal Logic
  window.openProjectModal = function (projectId) {
    const proj = DATA.projects.find((p) => p.id === projectId);
    if (!proj || !projectModal || !modalBody) return;

    modalBody.innerHTML = `
      <div style="display:flex;align-items:center;gap:10px;margin-bottom:12px;">
        <span class="project-badge-pill" style="position:static">${proj.badge}</span>
        <span class="project-category-pill" style="position:static">${proj.category}</span>
      </div>
      <h2 style="font-family:var(--font-display);font-size:1.8rem;font-weight:800;color:var(--text-primary);margin-bottom:8px;">
        ${proj.title}
      </h2>
      <p style="font-size:1rem;color:var(--accent-primary);font-weight:600;margin-bottom:16px;">
        ${proj.tagline}
      </p>
      
      <div style="background:var(--bg-tertiary);padding:14px 18px;border-radius:var(--radius-md);margin-bottom:20px;border:1px solid var(--border-subtle);">
        <strong style="color:var(--text-primary);font-size:0.88rem;">Key Performance Metrics:</strong>
        <div style="font-family:var(--font-mono);color:var(--accent-tertiary);font-size:0.95rem;margin-top:4px;">
          ⚡ ${proj.metrics}
        </div>
      </div>

      <h4 style="font-size:0.95rem;font-weight:700;color:var(--text-primary);margin-bottom:8px;">Technical Architecture & Scope</h4>
      <p style="color:var(--text-secondary);font-size:0.92rem;line-height:1.7;margin-bottom:20px;">
        ${proj.longDescription}
      </p>

      <h4 style="font-size:0.95rem;font-weight:700;color:var(--text-primary);margin-bottom:10px;">Technologies Utilized</h4>
      <div style="display:flex;flex-wrap:wrap;gap:8px;margin-bottom:28px;">
        ${proj.tech.map((t) => `<span class="tech-chip" style="font-size:0.8rem;padding:5px 12px;">${t}</span>`).join('')}
      </div>

      <div style="display:flex;gap:14px;border-top:1px solid var(--border-subtle);padding-top:20px;">
        <a href="${proj.github}" target="_blank" rel="noopener noreferrer" class="btn btn-primary" style="flex:1;">
          View Repository on GitHub
        </a>
        <a href="${proj.demo}" target="_blank" rel="noopener noreferrer" class="btn btn-secondary" style="flex:1;">
          Launch Live Demo
        </a>
      </div>
    `;

    projectModal.classList.add('active');
    document.body.style.overflow = 'hidden';
  };

  function initModalListeners() {
    if (!projectModal) return;
    const closeBtn = document.getElementById('modal-close-btn');

    if (closeBtn) {
      closeBtn.addEventListener('click', closeProjectModal);
    }

    projectModal.addEventListener('click', (e) => {
      if (e.target === projectModal) {
        closeProjectModal();
      }
    });

    window.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && projectModal.classList.contains('active')) {
        closeProjectModal();
      }
    });
  }

  function closeProjectModal() {
    if (!projectModal) return;
    projectModal.classList.remove('active');
    document.body.style.overflow = '';
  }

  /* ==========================================================================
     SLIDE 5: INTERNSHIP, CERTIFICATIONS & CONTACT
     ========================================================================== */
  function renderSlide5InternshipAndCerts() {
    // 1. Internship Card
    const internshipContainer = document.getElementById('internship-card-container');
    if (internshipContainer && DATA.internship) {
      const intern = DATA.internship;
      internshipContainer.innerHTML = `
        <div class="internship-header">
          <div>
            <h4 class="internship-role">${intern.role}</h4>
            <div class="internship-company">${intern.company} • ${intern.duration} (${intern.period})</div>
          </div>
          <span class="internship-tag">${intern.type}</span>
        </div>
        <p class="internship-summary">${intern.summary}</p>
        <ul class="internship-points">
          ${intern.responsibilities.map((r) => `<li class="internship-point-item">${r}</li>`).join('')}
        </ul>
        <div style="display:flex;flex-wrap:wrap;gap:6px;">
          ${intern.tech.map((t) => `<span class="tech-chip">${t}</span>`).join('')}
        </div>
      `;
    }

    // 2. Certifications
    const certsContainer = document.getElementById('certifications-container');
    if (certsContainer && DATA.certifications) {
      certsContainer.innerHTML = DATA.certifications
        .map(
          (cert) => `
        <div class="cert-card">
          <div class="cert-issuer-badge">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
            </svg>
          </div>
          <div class="cert-title">${cert.title}</div>
          <div class="cert-issuer">${cert.issuer} • ${cert.date}</div>
          <a href="${cert.verifyUrl}" class="cert-link" target="_blank" rel="noopener noreferrer" onclick="${cert.verifyUrl === '#' ? "event.preventDefault(); window.showToast('📜 Credential verification link placeholder (#)');" : ''}">
            View Certificate ↗
          </a>
        </div>
      `
        )
        .join('');
    }
  }

  function renderContactAndFooter() {
    // Copy email button
    const copyBtn = document.getElementById('copy-email-btn');
    if (copyBtn) {
      copyBtn.addEventListener('click', () => {
        navigator.clipboard.writeText(DATA.contact.directEmail).then(() => {
          showToast('📋 Email copied to clipboard: ' + DATA.contact.directEmail);
        });
      });
    }

    // Back to top button
    const backToTopBtn = document.getElementById('back-to-top-btn');
    if (backToTopBtn) {
      backToTopBtn.addEventListener('click', () => {
        scrollToSlide(0);
      });
    }

    // Contact Form handling
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
      contactForm.addEventListener('submit', (e) => {
        e.preventDefault();

        const submitBtn = contactForm.querySelector('button[type="submit"]');
        const nameVal = document.getElementById('contact-name').value.trim();
        const emailVal = document.getElementById('contact-email').value.trim();
        const messageVal = document.getElementById('contact-message').value.trim();

        if (!nameVal || !emailVal || !messageVal) {
          showToast('⚠️ Please fill in all required fields.');
          return;
        }

        const originalText = submitBtn.innerHTML;
        submitBtn.innerHTML = `
          <svg style="animation:spin 1s linear infinite;width:16px;height:16px;" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <line x1="12" y1="2" x2="12" y2="6"></line>
            <line x1="12" y1="18" x2="12" y2="22"></line>
            <line x1="4.93" y1="4.93" x2="7.76" y2="7.76"></line>
            <line x1="16.24" y1="16.24" x2="19.07" y2="19.07"></line>
            <line x1="2" y1="12" x2="6" y2="12"></line>
            <line x1="18" y1="12" x2="22" y2="12"></line>
            <line x1="4.93" y1="19.07" x2="7.76" y2="16.24"></line>
            <line x1="16.24" y1="7.76" x2="19.07" y2="4.93"></line>
          </svg>
          Sending Message...
        `;
        submitBtn.disabled = true;

        // If user configured Formspree endpoint in data.js:
        if (DATA.contact.formspreeEndpoint) {
          fetch(DATA.contact.formspreeEndpoint, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
            body: JSON.stringify({ name: nameVal, email: emailVal, message: messageVal })
          })
            .then((res) => {
              if (res.ok) {
                showToast('🚀 Thank you ' + nameVal + '! Your message has been sent successfully.');
                contactForm.reset();
              } else {
                showToast('⚠️ Submission error. Please reach out directly via email.');
              }
            })
            .catch(() => {
              showToast('⚠️ Network error. Please email directly.');
            })
            .finally(() => {
              submitBtn.innerHTML = originalText;
              submitBtn.disabled = false;
            });
        } else {
          // Simulated instant submission
          setTimeout(() => {
            showToast('🚀 Thank you ' + nameVal + '! Your message was recorded. (Formspree hook ready)');
            contactForm.reset();
            submitBtn.innerHTML = originalText;
            submitBtn.disabled = false;
          }, 800);
        }
      });
    }
  }

  function startJaipurClock() {
    if (!jaipurClockEl) return;
    function updateClock() {
      try {
        const options = {
          timeZone: 'Asia/Kolkata',
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit',
          hour12: true
        };
        const formatter = new Intl.DateTimeFormat([], options);
        jaipurClockEl.textContent = formatter.format(new Date()) + ' (IST)';
      } catch (err) {
        jaipurClockEl.textContent = 'Jaipur, India';
      }
    }
    updateClock();
    setInterval(updateClock, 1000);
  }

  /* ==========================================================================
     TOAST NOTIFICATIONS
     ========================================================================== */
  window.showToast = function (message) {
    if (!toastContainer) return;
    const toast = document.createElement('div');
    toast.className = 'toast';
    toast.innerHTML = `
      <span>${message}</span>
    `;
    toastContainer.appendChild(toast);

    setTimeout(() => {
      toast.style.transition = 'opacity 0.4s ease, transform 0.4s ease';
      toast.style.opacity = '0';
      toast.style.transform = 'translateY(10px)';
      setTimeout(() => toast.remove(), 400);
    }, 3500);
  };

  /* ==========================================================================
     INIT ON DOM CONTENT LOADED
     ========================================================================== */
  document.addEventListener('DOMContentLoaded', () => {
    initTheme();
    renderAllContent();
    initHeroCanvas();
    initTypewriter();
    initSlideNavigation();
    initProjectFilters();
    initModalListeners();
  });
})();
