(function () {
  'use strict';

  const OWNER = {
    name: 'Aashirya Srivastava',
    email: 'aashirya12007@gmail.com',
    whatsappDigits: '918009375166',
  };

  const MARQUEE_SKILLS = [
    'Frontend Development',
    'Data Cleaning',
    'Critical Thinking',
    'Design Thinking',
    'Leadership',
    'Teamwork',
  ];

  const CATEGORY_TABS = [
    { id: 'all', label: 'All Skills' },
    { id: 'engineering', label: 'Engineering & Data' },
    { id: 'thinking', label: 'Thinking & Design' },
    { id: 'collaboration', label: 'Collaboration' },
  ];

  const SKILLS = [
    {
      id: 'frontend-development',
      index: '01',
      title: 'Frontend Development',
      category: 'engineering',
      categoryLabel: 'Engineering & Data',
      summary:
        'Translating layout sketches and user flows into accessible, responsive web pages with clean semantic HTML, CSS systems, and interactive JavaScript.',
      practiceNote:
        'Focused on clarity of layout, keyboard navigation, form validation, and visual rhythm that feels natural on both laptop and phone screens.',
      focusAreas: [
        'Semantic HTML5 & Accessible Forms',
        'Responsive Grid & Flexbox Layouts',
        'Interactive Vanilla JS & Components',
        'Client-Side Validation & Error Handling',
      ],
      appliedExample:
        'Designed and structured multi-section personal web pages with real-time input checks and clear visual feedback.',
    },
    {
      id: 'data-cleaning',
      index: '02',
      title: 'Data Cleaning',
      category: 'engineering',
      categoryLabel: 'Engineering & Data',
      summary:
        'Inspecting raw, inconsistent datasets to handle missing entries, standardize formatting, spot anomalies, and prepare reliable tables for analysis.',
      practiceNote:
        'Good models start with trustworthy inputs. I treat data hygiene as careful editorial work before jumping into visualization or algorithms.',
      focusAreas: [
        'Missing Value Imputation & Filtering',
        'Duplicate & Outlier Detection',
        'Schema & Date/String Normalization',
        'Exploratory Sanity Checks',
      ],
      appliedExample:
        'Cleaned messy CSV student and survey logs during coursework labs so summary statistics reflected reality rather than entry typos.',
    },
    {
      id: 'critical-thinking',
      index: '03',
      title: 'Critical Thinking',
      category: 'thinking',
      categoryLabel: 'Thinking & Design',
      summary:
        'Questioning assumptions, breaking complex problems into verifiable steps, and evaluating edge cases before committing to an implementation.',
      practiceNote:
        'Helps me debug calmly when code or data behaves unexpectedly—tracing root causes rather than guessing quick patches.',
      focusAreas: [
        'Root-Cause Debugging',
        'Trade-Off Analysis',
        'Edge-Case Verification',
        'Evidence-Based Reasoning',
      ],
      appliedExample:
        'Auditing form inputs and dataset joins systematically to catch silent formatting mismatches early.',
    },
    {
      id: 'design-thinking',
      index: '04',
      title: 'Design Thinking',
      category: 'thinking',
      categoryLabel: 'Thinking & Design',
      summary:
        'Approaching technical problems from the perspective of the person using the tool—iterating through empathy, sketching, prototyping, and testing.',
      practiceNote:
        'Balances engineering structure with human warmth so interfaces remain calm, readable, and effortless to navigate.',
      focusAreas: [
        'User Journey Mapping',
        'Rapid Wireframing & Iteration',
        'Information Hierarchy',
        'Readable Visual Pacing',
      ],
      appliedExample:
        'Refining contact and portfolio layouts around how visitors actually scan credentials and reach out.',
    },
    {
      id: 'leadership',
      index: '05',
      title: 'Leadership',
      category: 'collaboration',
      categoryLabel: 'Collaboration',
      summary:
        'Coordinating timelines, clarifying deliverables across peers, and stepping up to unblock group lab assignments when deadlines tighten.',
      practiceNote:
        'I believe leadership in student teams means listening first, keeping expectations clear, and sharing credit generously.',
      focusAreas: [
        'Milestone Planning',
        'Clear Task Ownership',
        'Constructive Review',
        'Calm Under Deadlines',
      ],
      appliedExample:
        'Organizing Group 31 study sprints and review checklists ahead of practical assessments at SRMU.',
    },
    {
      id: 'teamwork',
      index: '06',
      title: 'Teamwork',
      category: 'collaboration',
      categoryLabel: 'Collaboration',
      summary:
        'Working smoothly alongside classmates across coding, data preparation, and presentation tasks while adapting to different working styles.',
      practiceNote:
        'Strong academic projects happen when everyone understands how their piece fits into the shared whole.',
      focusAreas: [
        'Active Listening',
        'Pair Debugging',
        'Shared Documentation',
        'Reliable Follow-Through',
      ],
      appliedExample:
        'Collaborating with Group 31 peers to combine cleaned datasets with front-end presentation slides and live demos.',
    },
  ];

  const WORKS = [
    {
      id: 'survey-data-hygiene',
      index: '01',
      title: 'Student Survey Data Hygiene Notebook',
      discipline: 'Data Cleaning · Critical Thinking',
      semester: 'B.Tech Year 2 Lab Exploration',
      summary:
        'A structured workflow for turning raw, inconsistently formatted campus survey spreadsheets into clean, analysis-ready tables.',
      problemSolved:
        'Survey exports often arrive with mixed capitalization, blank responses, duplicate rows, and inconsistent phone or email entries that skew counts.',
      approach: [
        'Profiled column distributions to isolate malformed records and trailing whitespace.',
        'Standardized categorical labels and validated email/contact patterns cleanly.',
        'Documented every cleaning rule so results stayed transparent and reproducible.',
      ],
      skillsApplied: ['Data Cleaning', 'Critical Thinking'],
    },
    {
      id: 'human-first-interface',
      index: '02',
      title: 'Tactile Editorial Web Interface System',
      discipline: 'Frontend Development · Design Thinking',
      semester: 'Personal Studio Project',
      summary:
        'A dark-paper portfolio and contact system built without generic gradients, focusing on quiet typography, accessible forms, and tactile feedback.',
      problemSolved:
        'Many student portfolios rely on copy-pasted templates that obscure the person behind the work and leave contact forms unvalidated.',
      approach: [
        'Sketched an asymmetric editorial layout centered on clarity and authentic academic identity.',
        'Implemented strict email format verification, accessible inline error states, and WhatsApp handoff.',
        'Tested keyboard navigation and mobile readability across narrow viewports.',
      ],
      skillsApplied: ['Frontend Development', 'Design Thinking'],
    },
    {
      id: 'group-31-study-sprint',
      index: '03',
      title: 'Group 31 Collaborative Lab Framework',
      discipline: 'Leadership · Teamwork',
      semester: 'SRMU Group 31 Initiative',
      summary:
        'A lightweight shared checklist and peer-review habit helping classmates organize lab submissions, debug together, and review concepts calmly.',
      problemSolved:
        'Last-minute lab submissions often suffer from fragmented files and unclear division of responsibilities across team members.',
      approach: [
        'Broke practical assignments into clear data, code, and presentation checkpoints.',
        'Paired teammates on debugging bottlenecks so nobody got stuck alone before viva reviews.',
        'Maintained concise notes summarizing key takeaways after each practical.',
      ],
      skillsApplied: ['Leadership', 'Teamwork'],
    },
  ];

  const SECTION_LABELS = {
    home: 'Home',
    about: '01. About Me',
    skills: '02. Skills Learned',
    work: '03. Selected Explorations',
    contact: '04. Contact Me',
  };

  /* -------------------- 1. PULL-CORD LAMP INTRO -------------------- */
  const heroSection = document.getElementById('home');
  const pullCordBtn = document.getElementById('lamp-pull-cord');
  const skipIntroBtn = document.getElementById('skip-intro-btn');
  const heroIlluminated = document.getElementById('hero-illuminated-content');
  const heroCredentials = document.getElementById('hero-credentials');
  const lampArm = document.getElementById('lamp-arm');
  const lampBase = document.getElementById('lamp-base');
  const lampBulb = document.getElementById('lamp-bulb');
  const lampShade = document.getElementById('lamp-shade');
  const lampShadeRim = document.getElementById('lamp-shade-rim');
  const lampCordLine = document.getElementById('lamp-cord-line');
  const lampCordTassel = document.getElementById('lamp-cord-tassel');
  const orbitRing = document.querySelector('.portrait-orbit-ring');

  const params = new URLSearchParams(window.location.search);
  let isLit = params.get('autostart') === '1';

  let pullValue = 0;
  let pullTarget = 0;
  let pullVelocity = 0;
  let rafId = null;

  function updateLampVisuals() {
    heroSection.setAttribute('data-lamp-lit', isLit ? 'true' : 'false');
    pullCordBtn.setAttribute('aria-pressed', isLit ? 'true' : 'false');
    pullCordBtn.setAttribute(
      'aria-label',
      isLit ? 'Pull cord to turn off lamp' : 'Pull the string to turn on the lamp'
    );

    heroIlluminated.setAttribute('aria-hidden', isLit ? 'false' : 'true');
    heroCredentials.setAttribute('aria-hidden', isLit ? 'false' : 'true');

    document.querySelectorAll('.hero-focusable').forEach((el) => {
      el.setAttribute('tabindex', isLit ? '0' : '-1');
    });

    if (orbitRing) {
      orbitRing.classList.toggle('is-spinning', isLit && revealState === 'hidden');
    }

    lampArm.setAttribute('stroke', isLit ? '#6C6458' : '#3C3833');
    lampBase.setAttribute('fill', isLit ? '#3A3630' : '#24221F');
    lampBase.setAttribute('stroke', isLit ? '#7B7265' : '#433E38');
    lampBulb.setAttribute('fill', isLit ? 'url(#bulbGlowGrad)' : '#252320');
    lampBulb.setAttribute('stroke', isLit ? '#ffdb66' : '#3F3B35');
    lampShade.setAttribute('fill', isLit ? '#26231F' : '#181715');
    lampShade.setAttribute('stroke', isLit ? '#E09F3E' : '#4E4840');
    lampShadeRim.setAttribute('stroke', isLit ? '#ffdb66' : '#2D2A26');
    lampShadeRim.setAttribute('stroke-width', isLit ? '2.5' : '1.2');
    lampCordLine.setAttribute('stroke', isLit ? '#E09F3E' : '#D5CBB8');
    lampCordTassel.setAttribute('fill', isLit ? '#ffbe0b' : '#E09F3E');
  }

  function applyCordPosition(offset) {
    lampCordLine.setAttribute('y2', String(124 + offset));
    lampCordTassel.setAttribute('cy', String(130 + offset));
  }

  function stepSpring() {
    const force = (pullTarget - pullValue) * 0.24;
    pullVelocity = (pullVelocity + force) * 0.68;
    pullValue += pullVelocity;
    applyCordPosition(pullValue);

    if (Math.abs(pullTarget - pullValue) < 0.15 && Math.abs(pullVelocity) < 0.15) {
      pullValue = pullTarget;
      pullVelocity = 0;
      applyCordPosition(pullValue);
      rafId = null;
      return;
    }
    rafId = window.requestAnimationFrame(stepSpring);
  }

  function animateCordTo(target) {
    pullTarget = target;
    if (!rafId) {
      rafId = window.requestAnimationFrame(stepSpring);
    }
  }

  function clampCordPull(deltaY) {
    if (!Number.isFinite(deltaY) || deltaY <= 0) return 0;
    return Math.min(deltaY, 54);
  }

  function toggleLamp() {
    isLit = !isLit;
    updateLampVisuals();
  }

  let pointerStartY = null;
  let activePointerId = null;
  let maxPullSeen = 0;

  pullCordBtn.addEventListener('pointerdown', (e) => {
    e.preventDefault();
    pullCordBtn.setPointerCapture(e.pointerId);
    activePointerId = e.pointerId;
    pointerStartY = e.clientY;
    maxPullSeen = 0;
    pullCordBtn.classList.add('is-dragging');
  });

  pullCordBtn.addEventListener('pointermove', (e) => {
    if (pointerStartY === null || activePointerId !== e.pointerId) return;
    const pull = clampCordPull(e.clientY - pointerStartY);
    if (pull > maxPullSeen) maxPullSeen = pull;
    pullValue = pull;
    pullTarget = pull;
    applyCordPosition(pull);
  });

  function finishCordPull(e) {
    if (pointerStartY === null || activePointerId !== e.pointerId) return;
    if (pullCordBtn.hasPointerCapture(e.pointerId)) {
      pullCordBtn.releasePointerCapture(e.pointerId);
    }
    const triggered = maxPullSeen >= 18 || maxPullSeen <= 6;
    pointerStartY = null;
    activePointerId = null;
    maxPullSeen = 0;
    pullCordBtn.classList.remove('is-dragging');
    animateCordTo(0);
    if (triggered) toggleLamp();
  }

  pullCordBtn.addEventListener('pointerup', finishCordPull);
  pullCordBtn.addEventListener('pointercancel', finishCordPull);

  pullCordBtn.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      animateCordTo(28);
      window.setTimeout(() => animateCordTo(0), 140);
      toggleLamp();
    }
  });

  skipIntroBtn.addEventListener('click', () => {
    isLit = true;
    updateLampVisuals();
  });

  /* -------------------- 2. CIRCULAR FRAGMENT PORTRAIT -------------------- */
  const portraitStage = document.getElementById('circular-portrait-stage');
  const portraitImg = document.getElementById('portrait-image');
  const portraitFallback = document.getElementById('portrait-fallback');
  const portraitOverlay = document.getElementById('portrait-overlay');
  const fragmentGrid = document.getElementById('fragment-grid');
  const revealBtn = document.getElementById('portrait-reveal-btn');
  const replayBtn = document.getElementById('replay-reveal-btn');

  let revealState = 'hidden';

  portraitImg.addEventListener('error', () => {
    portraitImg.classList.add('hidden');
    portraitFallback.classList.remove('hidden');
  });

  function buildFragmentShards(gridSize) {
    fragmentGrid.innerHTML = '';
    const cellSize = 100 / gridSize;
    const center = (gridSize - 1) / 2;

    for (let r = 0; r < gridSize; r += 1) {
      for (let c = 0; c < gridSize; c += 1) {
        const idx = r * gridSize + c;
        const dx = c - center;
        const dy = r - center;
        const dist = Math.hypot(dx, dy) || 0.45;
        const angle = Math.atan2(dy, dx) + ((idx % 5) - 2) * 0.14;
        const speed = 135 + dist * 46 + (idx % 3) * 28;
        const tx = Math.round(Math.cos(angle) * speed);
        const ty = Math.round(Math.sin(angle) * speed);
        const rotate = ((idx % 2 === 0 ? 1 : -1) * (45 + ((idx * 19) % 125)));
        const delay = Number((dist * 0.045).toFixed(3));

        const shard = document.createElement('div');
        shard.className = 'fragment-shard';
        shard.style.left = `${c * cellSize}%`;
        shard.style.top = `${r * cellSize}%`;
        shard.style.width = `${cellSize + 0.6}%`;
        shard.style.height = `${cellSize + 0.6}%`;
        shard.dataset.tx = String(tx);
        shard.dataset.ty = String(ty);
        shard.dataset.rotate = String(rotate);
        shard.dataset.delay = String(delay);
        fragmentGrid.appendChild(shard);
      }
    }
  }

  function resetPortraitOverlay() {
    revealState = 'hidden';
    portraitStage.setAttribute('data-reveal-state', 'hidden');
    portraitOverlay.classList.remove('hidden');
    revealBtn.classList.remove('hidden');
    replayBtn.classList.add('hidden');
    buildFragmentShards(7);
    updateLampVisuals();
  }

  revealBtn.addEventListener('click', () => {
    if (!isLit || revealState !== 'hidden') return;
    revealState = 'disintegrating';
    portraitStage.setAttribute('data-reveal-state', 'disintegrating');
    revealBtn.classList.add('hidden');
    if (orbitRing) orbitRing.classList.remove('is-spinning');

    fragmentGrid.querySelectorAll('.fragment-shard').forEach((shard) => {
      shard.style.transitionDelay = `${shard.dataset.delay}s`;
      shard.style.transform = `translate(${shard.dataset.tx}px, ${shard.dataset.ty}px) rotate(${shard.dataset.rotate}deg) scale(0.2)`;
      shard.style.opacity = '0';
    });

    window.setTimeout(() => {
      revealState = 'revealed';
      portraitStage.setAttribute('data-reveal-state', 'revealed');
      portraitOverlay.classList.add('hidden');
      replayBtn.classList.remove('hidden');
    }, 900);
  });

  replayBtn.addEventListener('click', resetPortraitOverlay);

  buildFragmentShards(7);
  updateLampVisuals();

  /* -------------------- 3. MARQUEE RIBBON -------------------- */
  const marqueeTrack = document.getElementById('marquee-track');
  const repeatedSkills = [...MARQUEE_SKILLS, ...MARQUEE_SKILLS, ...MARQUEE_SKILLS];
  marqueeTrack.innerHTML = repeatedSkills
    .map(
      (label) =>
        `<span class="marquee-item"><span>${label}</span><span class="marquee-dot">·</span></span>`
    )
    .join('');

  /* -------------------- 4. HEADER SCROLL & NAV TRANSITION -------------------- */
  const siteHeader = document.getElementById('site-header');
  const mobileMenuBtn = document.getElementById('mobile-menu-toggle');
  const mobileDrawer = document.getElementById('mobile-nav-drawer');
  const iconMenu = mobileMenuBtn.querySelector('.icon-menu');
  const iconClose = mobileMenuBtn.querySelector('.icon-close');
  const transitionOverlay = document.getElementById('section-transition-overlay');
  const transitionLabel = document.getElementById('transition-chapter-label');

  let activeSection = 'home';
  let navTimers = [];

  function setMobileMenu(open) {
    mobileDrawer.classList.toggle('hidden', !open);
    mobileMenuBtn.setAttribute('aria-expanded', open ? 'true' : 'false');
    mobileMenuBtn.setAttribute('aria-label', open ? 'Close navigation menu' : 'Open navigation menu');
    iconMenu.classList.toggle('hidden', open);
    iconClose.classList.toggle('hidden', !open);
  }

  mobileMenuBtn.addEventListener('click', () => {
    const isOpen = !mobileDrawer.classList.contains('hidden');
    setMobileMenu(!isOpen);
  });

  function updateActiveNavLinks(sectionId) {
    activeSection = sectionId;
    document.querySelectorAll('[data-nav]').forEach((el) => {
      if (el.tagName === 'A' && (el.classList.contains('nav-link') || el.classList.contains('mobile-nav-link'))) {
        const matches = el.getAttribute('data-nav') === sectionId;
        el.classList.toggle('is-active', matches);
        if (el.classList.contains('nav-link')) {
          if (matches) el.setAttribute('aria-current', 'page');
          else el.removeAttribute('aria-current');
        }
      }
    });
  }

  function jumpToSection(sectionId) {
    if (sectionId === 'home') {
      window.scrollTo({ top: 0, behavior: 'auto' });
      return;
    }
    const target = document.getElementById(sectionId);
    if (target) {
      const top = target.getBoundingClientRect().top + window.scrollY - 68;
      window.scrollTo({ top: Math.max(0, top), behavior: 'auto' });
    }
  }

  function navigateToSection(sectionId) {
    setMobileMenu(false);
    updateActiveNavLinks(sectionId);

    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reducedMotion) {
      jumpToSection(sectionId);
      return;
    }

    navTimers.forEach((id) => window.clearTimeout(id));
    navTimers = [];

    transitionOverlay.classList.remove('is-active');
    void transitionOverlay.offsetWidth;
    transitionLabel.textContent = SECTION_LABELS[sectionId] || sectionId;
    transitionOverlay.classList.add('is-active');

    const midTimer = window.setTimeout(() => {
      jumpToSection(sectionId);
      const secEl = document.getElementById(sectionId);
      if (secEl) {
        secEl.classList.remove('is-arriving');
        void secEl.offsetWidth;
        secEl.classList.add('is-arriving');
      }
    }, 240);

    const endTimer = window.setTimeout(() => {
      transitionOverlay.classList.remove('is-active');
    }, 640);

    navTimers.push(midTimer, endTimer);
  }

  document.querySelectorAll('[data-nav]').forEach((trigger) => {
    trigger.addEventListener('click', (e) => {
      e.preventDefault();
      const targetId = trigger.getAttribute('data-nav');
      if (targetId) navigateToSection(targetId);
    });
  });

  window.addEventListener(
    'scroll',
    () => {
      siteHeader.classList.toggle('is-scrolled', window.scrollY > 24);
    },
    { passive: true }
  );

  const sectionObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting && entry.target.id !== activeSection) {
          updateActiveNavLinks(entry.target.id);
        }
      });
    },
    { rootMargin: '-30% 0px -55% 0px', threshold: 0.05 }
  );

  document.querySelectorAll('[data-section]').forEach((sec) => sectionObserver.observe(sec));

  /* -------------------- 5. COPY EMAIL BUTTON -------------------- */
  const copyEmailBtn = document.getElementById('copy-email-btn');
  const copyIconDefault = document.getElementById('copy-icon-default');
  const copyIconDone = document.getElementById('copy-icon-done');

  copyEmailBtn.addEventListener('click', async () => {
    try {
      await navigator.clipboard.writeText(OWNER.email);
      copyIconDefault.classList.add('hidden');
      copyIconDone.classList.remove('hidden');
      window.setTimeout(() => {
        copyIconDefault.classList.remove('hidden');
        copyIconDone.classList.add('hidden');
      }, 2000);
    } catch {
      copyIconDefault.classList.remove('hidden');
      copyIconDone.classList.add('hidden');
    }
  });

  /* -------------------- 6. SKILLS FILTER & INSPECTOR -------------------- */
  const skillsTablist = document.getElementById('skills-tablist');
  const skillsGrid = document.getElementById('skills-grid');
  const skillWorkbench = document.getElementById('skill-workbench');

  let activeCategory = 'all';
  let selectedSkillId = SKILLS[0].id;

  function getFilteredSkills(cat) {
    return cat === 'all' ? SKILLS : SKILLS.filter((s) => s.category === cat);
  }

  function renderSkillsTabs() {
    skillsTablist.innerHTML = CATEGORY_TABS.map((tab) => {
      const count = getFilteredSkills(tab.id).length;
      const selected = activeCategory === tab.id;
      return `<button type="button" class="skill-tab" role="tab" aria-selected="${selected}" data-cat="${tab.id}">${tab.label} (${count})</button>`;
    }).join('');

    skillsTablist.querySelectorAll('.skill-tab').forEach((btn) => {
      btn.addEventListener('click', () => {
        activeCategory = btn.getAttribute('data-cat');
        const list = getFilteredSkills(activeCategory);
        if (list.length > 0 && !list.some((s) => s.id === selectedSkillId)) {
          selectedSkillId = list[0].id;
        }
        renderSkillsTabs();
        renderSkillsGrid();
        renderSkillWorkbench();
      });
    });
  }

  function renderSkillsGrid() {
    const visible = getFilteredSkills(activeCategory);
    skillsGrid.innerHTML = visible
      .map((skill) => {
        const active = skill.id === selectedSkillId;
        return `
          <button
            type="button"
            class="${active ? 'paper-card-elevated is-selected' : 'paper-card'} skill-card"
            data-skill-id="${skill.id}"
            aria-pressed="${active}"
          >
            <div>
              <div class="skill-card-meta">
                <span class="font-mono-tabular text-amber">${skill.index}</span>
                <span class="text-subtle">${skill.categoryLabel}</span>
              </div>
              <h3 class="skill-card-title">${skill.title}</h3>
              <p class="skill-card-summary">${skill.summary}</p>
            </div>
            <div class="skill-card-footer">
              <span class="${active ? 'text-amber' : 'text-subtle'}">
                ${active ? 'Inspecting practice notes' : 'Inspect practice notes'}
              </span>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
                <path d="m9 18 6-6-6-6" />
              </svg>
            </div>
          </button>
        `;
      })
      .join('');

    skillsGrid.querySelectorAll('.skill-card').forEach((card) => {
      card.addEventListener('click', () => {
        selectedSkillId = card.getAttribute('data-skill-id');
        renderSkillsGrid();
        renderSkillWorkbench();
      });
    });
  }

  function renderSkillWorkbench() {
    const visible = getFilteredSkills(activeCategory);
    const skill = visible.find((s) => s.id === selectedSkillId) || visible[0];
    if (!skill) return;

    skillWorkbench.innerHTML = `
      <div class="workbench-grid">
        <div class="workbench-left">
          <p class="workbench-kicker">Practice Focus · ${skill.categoryLabel}</p>
          <h3 class="workbench-title">${skill.title}</h3>
          <p class="workbench-note">${skill.practiceNote}</p>
          <div class="workbench-example">
            <p class="workbench-example-label">Classroom &amp; Studio Application</p>
            <p class="workbench-example-text">${skill.appliedExample}</p>
          </div>
        </div>
        <div class="workbench-right">
          <p class="workbench-habits-title">Key Habits &amp; Methods</p>
          <ul class="workbench-habits-list">
            ${skill.focusAreas
              .map(
                (area, idx) => `
              <li>
                <span>${area}</span>
                <span class="font-mono-tabular text-subtle" style="font-size: 0.75rem;">0${idx + 1}</span>
              </li>
            `
              )
              .join('')}
          </ul>
        </div>
      </div>
    `;
  }

  renderSkillsTabs();
  renderSkillsGrid();
  renderSkillWorkbench();

  /* -------------------- 7. WORK SECTION & DETAIL MODAL -------------------- */
  const workGrid = document.getElementById('work-grid');
  const modalBackdrop = document.getElementById('work-modal-backdrop');
  const modalDialog = document.getElementById('work-modal-dialog');

  function closeWorkModal() {
    modalBackdrop.classList.add('hidden');
  }

  function openWorkModal(work) {
    modalDialog.innerHTML = `
      <div class="modal-head">
        <div>
          <p class="modal-kicker">${work.index} · ${work.semester}</p>
          <h3 id="work-modal-title" class="modal-title">${work.title}</h3>
        </div>
        <button type="button" id="modal-x-close" class="modal-close-btn" aria-label="Close project note">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
            <path d="M18 6 6 18" />
            <path d="m6 6 12 12" />
          </svg>
        </button>
      </div>
      <div class="modal-body">
        <div>
          <p class="modal-label">Problem Addressed</p>
          <p>${work.problemSolved}</p>
        </div>
        <div>
          <p class="modal-label">Structured Approach</p>
          <ul class="modal-steps">
            ${work.approach
              .map(
                (step, i) => `
              <li>
                <span class="font-mono-tabular text-amber" style="font-size: 0.75rem;">0${i + 1}</span>
                <span>${step}</span>
              </li>
            `
              )
              .join('')}
          </ul>
        </div>
        <div class="modal-footer">
          <p class="text-sage" style="font-size: 0.75rem;">Skills Applied: ${work.skillsApplied.join(' · ')}</p>
          <button type="button" id="modal-done-close" class="btn-amber btn-sm">Close</button>
        </div>
      </div>
    `;

    modalBackdrop.classList.remove('hidden');
    document.getElementById('modal-x-close').addEventListener('click', closeWorkModal);
    document.getElementById('modal-done-close').addEventListener('click', closeWorkModal);
  }

  workGrid.innerHTML = WORKS.map(
    (work) => `
      <button type="button" class="paper-card work-card" data-work-id="${work.id}">
        <div>
          <div class="work-card-meta">
            <span class="font-mono-tabular text-amber">${work.index}</span>
            <span>${work.semester}</span>
          </div>
          <h3 class="work-card-title">${work.title}</h3>
          <p class="work-card-summary">${work.summary}</p>
        </div>
        <div class="work-card-footer">
          <span class="text-sage">${work.discipline}</span>
          <span class="work-read-note">
            <span>Read note</span>
            <svg class="inline-arrow" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
              <path d="M7 17 17 7" />
              <path d="M7 7h10v10" />
            </svg>
          </span>
        </div>
      </button>
    `
  ).join('');

  workGrid.querySelectorAll('.work-card').forEach((card) => {
    card.addEventListener('click', () => {
      const work = WORKS.find((w) => w.id === card.getAttribute('data-work-id'));
      if (work) openWorkModal(work);
    });
  });

  modalBackdrop.addEventListener('click', (e) => {
    if (e.target === modalBackdrop) closeWorkModal();
  });

  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && !modalBackdrop.classList.contains('hidden')) {
      closeWorkModal();
    }
  });

  /* -------------------- 8. VALIDATED CONTACT FORM + EMAIL + WHATSAPP -------------------- */
  const contactForm = document.getElementById('contact-form');
  const confirmationBox = document.getElementById('contact-confirmation');
  const nameInput = document.getElementById('contact-name');
  const emailInput = document.getElementById('contact-email');
  const phoneInput = document.getElementById('contact-phone');
  const messageInput = document.getElementById('contact-message');
  const charCountEl = document.getElementById('message-char-count');
  const submitBannerErr = document.getElementById('form-submit-error');
  const submitBtn = document.getElementById('contact-submit-btn');
  const submitLabel = document.getElementById('contact-submit-label');
  const whatsappLink = document.getElementById('whatsapp-direct-link');

  const EMAIL_REGEX =
    /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+$/;

  const touched = { name: false, email: false, phone: false, message: false };

  function isValidEmail(raw) {
    const email = raw.trim();
    if (!email || email.length > 254 || email.includes('..')) return false;
    const domain = email.split('@')[1] || '';
    const tld = domain.split('.').pop() || '';
    return tld.length >= 2 && EMAIL_REGEX.test(email);
  }

  function isValidOptionalPhone(raw) {
    const trimmed = raw.trim();
    if (!trimmed) return true;
    if (!/^[+\d\s()-]+$/.test(trimmed)) return false;
    const digits = trimmed.replace(/\D/g, '');
    return digits.length >= 10 && digits.length <= 15;
  }

  function validateFormValues() {
    const clean = {
      name: nameInput.value.trim().replace(/\s+/g, ' '),
      email: emailInput.value.trim(),
      phone: phoneInput.value.trim().replace(/\s+/g, ' '),
      message: messageInput.value.trim(),
    };
    const errors = {};

    if (!clean.name) errors.name = 'Please enter your full name.';
    else if (clean.name.length < 2) errors.name = 'Name must be at least 2 characters long.';
    else if (clean.name.length > 100) errors.name = 'Name must be 100 characters or fewer.';
    else if (!/[a-zA-Z]/.test(clean.name)) errors.name = 'Please enter a valid name using letters.';

    if (!clean.email) errors.email = 'Please enter your email address.';
    else if (!isValidEmail(clean.email)) {
      errors.email = 'Please enter a valid email address (for example, name@domain.com).';
    }

    if (clean.phone && !isValidOptionalPhone(clean.phone)) {
      errors.phone = 'Enter a valid 10–15 digit phone or WhatsApp number, or leave this blank.';
    }

    if (!clean.message) errors.message = 'Please write a short message before sending.';
    else if (clean.message.length < 10) {
      errors.message = 'Message should be at least 10 characters so I have enough context.';
    } else if (clean.message.length > 2000) {
      errors.message = 'Message must be 2000 characters or fewer.';
    }

    return { isValid: Object.keys(errors).length === 0, errors, clean };
  }

  function buildWhatsAppUrl(senderName, messageText) {
    const n = (senderName || '').trim();
    const m = (messageText || '').trim();
    let composed = 'Hi Aashirya, I visited your portfolio and would like to connect.';
    if (n && m) composed = `Hi Aashirya, I am ${n}. ${m}`;
    else if (m) composed = `Hi Aashirya, ${m}`;
    else if (n) composed = `Hi Aashirya, I am ${n}. I visited your portfolio and would like to connect.`;
    return `https://wa.me/${OWNER.whatsappDigits}?text=${encodeURIComponent(composed)}`;
  }

  function buildMailtoUrl(senderName, senderEmail, messageText) {
    const subject = senderName ? `Portfolio Inquiry from ${senderName}` : 'Portfolio Inquiry';
    const body = [
      senderName ? `Name: ${senderName}` : '',
      senderEmail ? `Reply Email: ${senderEmail}` : '',
      '',
      messageText || '',
    ].join('\n');
    return `mailto:${OWNER.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  }

  function renderFieldError(fieldId, inputEl, errorMsg) {
    const errEl = document.getElementById(`${fieldId}-error`);
    if (errorMsg) {
      inputEl.classList.add('is-invalid');
      inputEl.setAttribute('aria-invalid', 'true');
      inputEl.setAttribute('aria-describedby', `${fieldId}-error`);
      errEl.textContent = errorMsg;
      errEl.classList.remove('hidden');
    } else {
      inputEl.classList.remove('is-invalid');
      inputEl.setAttribute('aria-invalid', 'false');
      inputEl.removeAttribute('aria-describedby');
      errEl.textContent = '';
      errEl.classList.add('hidden');
    }
  }

  function syncLiveValidation(fieldKey) {
    const check = validateFormValues();
    const map = {
      name: ['contact-name', nameInput],
      email: ['contact-email', emailInput],
      phone: ['contact-phone', phoneInput],
      message: ['contact-message', messageInput],
    };
    if (fieldKey) {
      const [id, el] = map[fieldKey];
      renderFieldError(id, el, check.errors[fieldKey]);
    } else {
      Object.keys(map).forEach((k) => {
        const [id, el] = map[k];
        renderFieldError(id, el, check.errors[k]);
      });
    }
  }

  [
    ['name', nameInput],
    ['email', emailInput],
    ['phone', phoneInput],
    ['message', messageInput],
  ].forEach(([key, el]) => {
    el.addEventListener('input', () => {
      submitBannerErr.classList.add('hidden');
      charCountEl.textContent = `${messageInput.value.trim().length}/2000`;
      whatsappLink.href = buildWhatsAppUrl(nameInput.value, messageInput.value);
      if (touched[key]) syncLiveValidation(key);
    });

    el.addEventListener('blur', () => {
      touched[key] = true;
      syncLiveValidation(key);
    });
  });

  function showConfirmation(refId, deliveryText, clean) {
    contactForm.classList.add('hidden');
    confirmationBox.classList.remove('hidden');
    const waHref = buildWhatsAppUrl(clean.name, clean.message);
    const mailHref = buildMailtoUrl(clean.name, clean.email, clean.message);

    confirmationBox.innerHTML = `
      <div class="confirm-head">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
          <circle cx="12" cy="12" r="10" />
          <path d="m9 12 2 2 4-4" />
        </svg>
        <div>
          <h3 class="confirm-title">Thank you, ${clean.name}.</h3>
          <p class="confirm-sub">${deliveryText}</p>
        </div>
      </div>
      <div class="confirm-receipt">
        <div class="confirm-row"><span>Recipient</span><span class="text-ink-strong">${OWNER.email}</span></div>
        <div class="confirm-row"><span>Reply-To</span><span class="text-ink-strong">${clean.email}</span></div>
        <div class="confirm-row"><span>Reference</span><span class="font-mono-tabular text-amber">${refId}</span></div>
      </div>
      <div class="confirm-actions">
        <button type="button" id="send-another-btn" class="btn-amber">Send another message</button>
        <a href="${waHref}" target="_blank" rel="noopener noreferrer" class="btn-outline">Follow up on WhatsApp</a>
        <a href="${mailHref}" class="hero-text-link text-subtle" style="font-size: 0.75rem;">Open in Mail app</a>
      </div>
    `;

    document.getElementById('send-another-btn').addEventListener('click', () => {
      confirmationBox.classList.add('hidden');
      contactForm.classList.remove('hidden');
    });
  }

  contactForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    submitBannerErr.classList.add('hidden');
    touched.name = touched.email = touched.phone = touched.message = true;
    const check = validateFormValues();
    syncLiveValidation();

    if (!check.isValid) return;

    submitBtn.disabled = true;
    submitLabel.textContent = 'Sending Notification...';

    const refId = `INQ-${Date.now().toString(36).toUpperCase()}`;

    try {
      const response = await fetch(`https://formsubmit.co/ajax/${OWNER.email}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify({
          name: check.clean.name,
          email: check.clean.email,
          phone: check.clean.phone || 'Not provided',
          message: check.clean.message,
          _subject: `Portfolio Inquiry from ${check.clean.name}`,
          _replyto: check.clean.email,
        }),
      });

      if (!response.ok) {
        throw new Error('Relay unavailable');
      }

      contactForm.reset();
      charCountEl.textContent = '0/2000';
      Object.keys(touched).forEach((k) => {
        touched[k] = false;
      });
      showConfirmation(
        refId,
        `Your message was validated and emailed to ${OWNER.email}. (First-time FormSubmit setup sends a one-click activation link to your inbox.)`,
        check.clean
      );
    } catch {
      submitBannerErr.textContent =
        'Could not dispatch automatically (ensure you run this via VS Code Live Server or a live URL). You can still send directly via WhatsApp or Mail below.';
      submitBannerErr.classList.remove('hidden');
    } finally {
      submitBtn.disabled = false;
      submitLabel.textContent = 'Send Message';
    }
  });

  /* -------------------- 9. FOOTER YEAR -------------------- */
  document.getElementById('footer-year').textContent = String(new Date().getFullYear());
})();
