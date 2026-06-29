/**
 * Statistics & Probability — Quick Revision Notes
 * script.js  (updated)
 *
 * Responsibilities:
 *  1. Define topic data (sections + cards)
 *  2. Render section headers and card grids into #sections-container
 *  3. Drive the lightbox (open / close / keyboard / focus-trap)
 *  4. Wire download buttons
 *  5. Render search bar
 *  6. Render calculator section stub (full logic in calculator.js)
 *  7. Misc: year in footer, topic count in hero
 */

'use strict';

/* =========================================================================
   DATA — edit this array to add / remove / reorganise topics
   Image paths are relative to index.html (i.e. images/<filename>)
   ========================================================================= */

const SECTIONS = [
  {
    id: 'fundamentals',
    label: 'Chapter 01',
    title: 'Fundamentals',
    description: 'Core vocabulary and data classification — the scaffolding every statistical method builds on.',
    cards: [
      {
        index: '00',
        title: 'Types of Statistics',
        file: '00_type_of_a_stats.jpeg',
        alt: 'Overview diagram showing descriptive vs inferential statistics',
        keywords: ['descriptive', 'inferential', 'statistics', 'types']
      },
      {
        index: '01',
        title: 'Types of Data',
        file: '01_type_of_data_in_stats.jpeg',
        alt: 'Hierarchy of data types: nominal, ordinal, interval, ratio',
        keywords: ['nominal', 'ordinal', 'interval', 'ratio', 'data types', 'categorical', 'quantitative']
      },
      {
        index: '08',
        title: 'Measurement Scales',
        file: '08_understanding_measuringscale.jpeg',
        alt: 'Visual comparison of the four measurement scales',
        keywords: ['measurement', 'scales', 'nominal', 'ordinal', 'interval', 'ratio']
      },
      {
        index: '16',
        title: 'Box Plot',
        file: '16_boxplot.jpeg',
        alt: 'Anatomy of a box-and-whisker plot with IQR labelled',
        keywords: ['box plot', 'whisker', 'iqr', 'quartile', 'median', 'outlier']
      }
    ]
  },

  {
    id: 'probability',
    label: 'Chapter 02',
    title: 'Probability',
    description: "From the Central Limit Theorem — the engine of inference — through Bayes' Theorem and Conditional Probability.",
    cards: [
      {
        index: '09',
        title: 'Central Limit Theorem (CLT)',
        file: '09_CLT.jpeg',
        alt: 'Diagram illustrating how sample means converge to a normal distribution',
        keywords: ['central limit theorem', 'clt', 'normal distribution', 'sampling', 'mean']
      },
      {
        index: '15',
        title: "Bayes' Theorem",
        file: '15_Bayes_theorem.jpeg',
        alt: "Formula and visual walkthrough of Bayes' Theorem",
        keywords: ["bayes", "bayesian", "posterior", "prior", "likelihood", "conditional"]
      },
      {
        index: '22',
        title: 'Conditional Probability',
        file: '22_conditional_probability.jpeg',
        alt: 'Conditional probability formula, notation, and Venn diagram illustration',
        keywords: ['conditional', 'probability', 'p(a|b)', 'joint', 'event', 'dependent'],
        isNew: true
      }
    ]
  },

  {
    id: 'hypothesis',
    label: 'Chapter 03',
    title: 'Hypothesis Testing',
    description: 'Six-step workflow, one-tailed vs two-tailed logic, error types, and the main parametric tests.',
    cards: [
      {
        index: '07',
        title: 'Hypothesis Testing — 6-Step Workflow',
        file: '07_hypothesis_testing_workflow_6steps.jpeg',
        alt: 'Flowchart of the standard six-step hypothesis testing procedure',
        keywords: ['hypothesis', 'workflow', 'steps', 'null', 'alternative', 'reject']
      },
      {
        index: '19',
        title: 'The p-Value',
        file: '19_the_p_value.jpeg',
        alt: 'Explanation of p-value: definition, interpretation, and relationship to significance level',
        keywords: ['p-value', 'significance', 'alpha', 'reject', 'null hypothesis'],
        isNew: true
      },
      {
        index: '20',
        title: 'Type I & Type II Errors',
        file: '20_Type1andType2_error.jpeg',
        alt: 'Table and diagram distinguishing Type I (false positive) and Type II (false negative) errors',
        keywords: ['type 1', 'type 2', 'error', 'false positive', 'false negative', 'alpha', 'beta', 'power'],
        isNew: true
      },
      {
        index: '06',
        title: 'One-Tailed vs Two-Tailed Tests',
        file: '06_one-tailed_vs_two_tailed_tests.jpeg',
        alt: 'Side-by-side comparison of one-tailed and two-tailed rejection regions',
        keywords: ['one-tailed', 'two-tailed', 'rejection region', 'critical value']
      },
      {
        index: '02',
        title: 'One-Sample t-Test',
        file: '02_one_sample_t-Test.jpeg',
        alt: 'Formula, assumptions, and decision rule for the one-sample t-test',
        keywords: ['t-test', 'one sample', 'mean', 'parametric']
      },
      {
        index: '03',
        title: 'Independent Samples t-Test',
        file: '03_independent_samples_t-Test.jpeg',
        alt: 'Formula and conditions for the two-sample independent t-test',
        keywords: ['t-test', 'independent', 'two sample', 'groups']
      },
      {
        index: '04',
        title: 'Paired Samples t-Test',
        file: '04_paired_test.jpeg',
        alt: 'Paired t-test formula and worked-example structure',
        keywords: ['t-test', 'paired', 'before after', 'difference']
      },
      {
        index: '05',
        title: 'One-Sample Z-Test (Two-Tailed Example)',
        file: '05_one_sample_Z_test_two_tailed_eg.jpeg',
        alt: 'Worked example of a two-tailed one-sample Z-test',
        keywords: ['z-test', 'one sample', 'two-tailed', 'worked example']
      },
      {
        index: '12',
        title: 'One-Sample Z-Test (Formula Card)',
        file: '12_oneSample_ztest.jpeg',
        alt: 'One-sample Z-test formula reference card',
        keywords: ['z-test', 'formula', 'one sample', 'z score']
      },
      {
        index: '13',
        title: 'One-Sample Test — Practice Question',
        file: '13_onesample_test_question.jpeg',
        alt: 'Practice question for a one-sample hypothesis test',
        keywords: ['practice', 'question', 'one sample', 'hypothesis']
      },
      {
        index: '14',
        title: 'One-Sample Test — Right-Tailed Example',
        file: '14_one_sample_question_right_tailed.jpeg',
        alt: 'Right-tailed one-sample test worked example',
        keywords: ['right-tailed', 'one sample', 'worked example', 'critical region']
      }
    ]
  },

  {
    id: 'anova',
    label: 'Chapter 04',
    title: 'ANOVA',
    description: 'Analysis of Variance — comparing means across three or more groups.',
    cards: [
      {
        index: '11',
        title: 'One-Way ANOVA',
        file: '11_one_way_anova.jpeg',
        alt: 'One-way ANOVA assumptions, F-ratio, and decision table',
        keywords: ['anova', 'one way', 'f-ratio', 'variance', 'groups']
      },
      {
        index: '18',
        title: 'One-Way ANOVA — Worked Example',
        file: '18_one_way_anova_eg.jpeg',
        alt: 'One-way ANOVA solved numerical example with F-statistic calculation',
        keywords: ['anova', 'worked example', 'f-statistic', 'between groups', 'within groups'],
        isNew: true
      },
      {
        index: '21a',
        title: 'Analysis of Variance (ANOVA)',
        file: '21_Analysis_of_variance_anova.jpeg',
        alt: 'Comprehensive overview of Analysis of Variance concepts and formulas',
        keywords: ['anova', 'analysis of variance', 'f-test', 'sum of squares', 'degrees of freedom'],
        isNew: true
      },
      {
        index: '21b',
        title: 'F-Test ANOVA — Worked Example',
        file: '21_F_test_Anova_worked_eg.jpeg',
        alt: 'Step-by-step F-test ANOVA worked numerical example',
        keywords: ['f-test', 'anova', 'worked example', 'calculation', 'f-statistic'],
        isNew: true
      },
      {
        index: '10',
        title: 'Repeated Measures ANOVA',
        file: '10_repeated_measure_anova.jpeg',
        alt: 'Repeated measures ANOVA design and within-subjects F-ratio',
        keywords: ['repeated measures', 'anova', 'within subjects', 'longitudinal']
      }
    ]
  },

  {
    id: 'nonparametric',
    label: 'Chapter 05',
    title: 'Non-Parametric Tests',
    description: 'Tests for categorical data and goodness of fit — no normality assumption required.',
    cards: [
      {
        index: '17',
        title: 'Chi-Square (χ²) Test',
        file: '17_chi_square_test.jpeg',
        alt: 'Chi-square test: formula, assumptions, solved independence example, decision rule, and types',
        keywords: ['chi-square', 'chi squared', 'categorical', 'goodness of fit', 'independence', 'non-parametric'],
        isNew: true
      }
    ]
  }
];

/* =========================================================================
   REPOSITORY LINKS
   ========================================================================= */

const REPO = {
  student: {
    name: 'Manthan Kumar',
    handle: 'manthanK1',
    repoUrl: 'https://github.com/manthanK1/stats-probability-quick-notes',
    profileUrl: 'https://github.com/manthanK1',
    role: 'Repo Maintainer'
  },
  mentor: {
    name: 'Dr. Ronald Bbosa',
    handle: 'bonaldo112',
    repoUrl: 'https://github.com/bonaldo112',
    profileUrl: 'https://github.com/bonaldo112',
    role: 'Research Mentor'
  },
  zipFile: 'Statistics_Probability_Quick_Revision_Notes.zip'
};

/* =========================================================================
   RENDER — build DOM from SECTIONS data
   ========================================================================= */

/**
 * Build the HTML for a single topic card.
 */
function buildCard(card, sectionIdx, cardIdx) {
  const imgPath = `images/${card.file}`;
  const uniqueId = `card-${sectionIdx}-${cardIdx}`;

  const article = document.createElement('article');
  article.className = 'card';
  article.setAttribute('aria-labelledby', `${uniqueId}-title`);
  if (card.isNew) article.setAttribute('data-new', 'true');

  // Store searchable text as data attributes for filtering
  const searchText = [
    card.title,
    card.file,
    card.alt,
    ...(card.keywords || [])
  ].join(' ').toLowerCase();
  article.setAttribute('data-search', searchText);

  article.innerHTML = `
    <div
      class="card-thumb-wrap"
      role="button"
      tabindex="0"
      aria-label="View full image: ${escapeHtml(card.title)}"
      data-img="${imgPath}"
      data-caption="${escapeHtml(card.title)}"
    >
      <img
        class="card-thumb"
        src="${imgPath}"
        alt="${escapeHtml(card.alt)}"
        loading="lazy"
        decoding="async"
      />
      <div class="card-thumb-overlay" aria-hidden="true">&#x1F50D;</div>
    </div>

    <div class="card-body">
      <span class="card-index" aria-hidden="true">${escapeHtml(card.index)}</span>
      <h3 class="card-title" id="${uniqueId}-title">${escapeHtml(card.title)}</h3>

      <div class="card-actions">
        <button
          class="btn btn-primary"
          type="button"
          data-img="${imgPath}"
          data-caption="${escapeHtml(card.title)}"
          aria-label="View notes: ${escapeHtml(card.title)}"
        >
          View Notes
        </button>
        <a
          class="btn btn-secondary"
          href="${imgPath}"
          download="${card.file}"
          aria-label="Download ${escapeHtml(card.title)}"
        >
          ↓ Download
        </a>
      </div>
    </div>
  `;

  return article;
}

/**
 * Build a full section element (header + card grid).
 */
function buildSection(section, idx) {
  const sectionEl = document.createElement('section');
  sectionEl.id = section.id;
  sectionEl.className = 'topic-section constrain';
  sectionEl.setAttribute('aria-labelledby', `section-${idx}-heading`);

  // Store chapter label for search filtering
  sectionEl.setAttribute('data-chapter', section.title.toLowerCase());
  sectionEl.setAttribute('data-label', section.label.toLowerCase());

  const header = document.createElement('div');
  header.className = 'section-header';
  header.innerHTML = `
    <p class="section-eyebrow">${escapeHtml(section.label)}</p>
    <h2 class="section-title" id="section-${idx}-heading">${escapeHtml(section.title)}</h2>
    <p class="section-desc">${escapeHtml(section.description)}</p>
  `;

  const grid = document.createElement('div');
  grid.className = 'card-grid';
  grid.setAttribute('role', 'list');

  section.cards.forEach((card, cardIdx) => {
    const cardEl = buildCard(card, idx, cardIdx);
    cardEl.setAttribute('role', 'listitem');
    grid.appendChild(cardEl);
  });

  // Empty state (shown when search filters out all cards in this section)
  const empty = document.createElement('p');
  empty.className = 'section-empty-msg';
  empty.textContent = 'No matching notes in this chapter.';
  empty.setAttribute('aria-live', 'polite');

  sectionEl.appendChild(header);
  sectionEl.appendChild(grid);
  sectionEl.appendChild(empty);

  return sectionEl;
}

/**
 * Inject all sections into #sections-container.
 */
function renderSections() {
  const container = document.getElementById('sections-container');
  if (!container) return;

  const fragment = document.createDocumentFragment();

  SECTIONS.forEach((section, idx) => {
    fragment.appendChild(buildSection(section, idx));
  });

  container.appendChild(fragment);
}

/* =========================================================================
   SEARCH
   ========================================================================= */

function renderSearchBar() {
  const container = document.getElementById('sections-container');
  if (!container) return;

  const wrapper = document.createElement('div');
  wrapper.className = 'search-wrapper constrain';
  wrapper.setAttribute('role', 'search');
  wrapper.innerHTML = `
    <div class="search-inner">
      <label for="notes-search" class="search-label">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"
          stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false">
          <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
        </svg>
        <span class="sr-only">Search notes</span>
      </label>
      <input
        id="notes-search"
        class="search-input"
        type="search"
        placeholder="Search by topic, chapter, or keyword…"
        autocomplete="off"
        spellcheck="false"
        aria-label="Search revision notes"
      />
      <span class="search-count" id="search-count" aria-live="polite" aria-atomic="true"></span>
      <button class="search-clear" id="search-clear" type="button" aria-label="Clear search" hidden>
        &#x2715;
      </button>
    </div>
  `;

  // Insert before the first section
  container.parentNode.insertBefore(wrapper, container);

  // Wire events
  const input = document.getElementById('notes-search');
  const clearBtn = document.getElementById('search-clear');
  const countEl = document.getElementById('search-count');

  input.addEventListener('input', () => {
    const q = input.value.trim();
    clearBtn.hidden = q.length === 0;
    filterCards(q, countEl);
  });

  clearBtn.addEventListener('click', () => {
    input.value = '';
    clearBtn.hidden = true;
    filterCards('', countEl);
    input.focus();
  });
}

/**
 * Filter cards and sections based on query string.
 * Matches against: card title, keywords, filename, chapter label.
 */
function filterCards(query, countEl) {
  const q = query.toLowerCase().trim();
  const container = document.getElementById('sections-container');
  if (!container) return;

  const sections = container.querySelectorAll('.topic-section');
  let totalVisible = 0;

  sections.forEach(section => {
    const chapterText = (section.getAttribute('data-chapter') || '') + ' ' + (section.getAttribute('data-label') || '');
    const chapterMatch = q && chapterText.includes(q);
    const cards = section.querySelectorAll('.card');
    let visibleInSection = 0;

    cards.forEach(card => {
      const searchText = card.getAttribute('data-search') || '';
      const visible = !q || chapterMatch || searchText.includes(q);
      card.style.display = visible ? '' : 'none';
      if (visible) visibleInSection++;
    });

    totalVisible += visibleInSection;

    const emptyMsg = section.querySelector('.section-empty-msg');
    const grid = section.querySelector('.card-grid');

    if (q) {
      section.style.display = visibleInSection === 0 && !chapterMatch ? 'none' : '';
      if (emptyMsg) emptyMsg.hidden = visibleInSection > 0 || chapterMatch;
      if (chapterMatch) {
        // Show all cards if chapter matches
        cards.forEach(c => { c.style.display = ''; });
        visibleInSection = cards.length;
        totalVisible += visibleInSection;
        if (emptyMsg) emptyMsg.hidden = true;
      }
    } else {
      section.style.display = '';
      cards.forEach(c => { c.style.display = ''; });
      if (emptyMsg) emptyMsg.hidden = true;
    }
  });

  if (countEl) {
    if (q) {
      const total = container.querySelectorAll('.card').length;
      countEl.textContent = `${totalVisible} of ${total} notes`;
    } else {
      countEl.textContent = '';
    }
  }
}

/* =========================================================================
   HERO — topic count
   ========================================================================= */

function setTopicCount() {
  const countEl = document.getElementById('topic-count');
  if (!countEl) return;
  const total = SECTIONS.reduce((sum, s) => sum + s.cards.length, 0);
  countEl.textContent = `${total} topics`;
}

/* =========================================================================
   LIGHTBOX
   ========================================================================= */

const Lightbox = (() => {
  let _overlay, _img, _caption, _closeBtn, _backdrop;
  let _lastFocused = null;

  function init() {
    _overlay  = document.getElementById('lightbox');
    _img      = document.getElementById('lightbox-img');
    _caption  = document.getElementById('lightbox-caption');
    _closeBtn = document.getElementById('lightbox-close');
    _backdrop = document.getElementById('lightbox-backdrop');

    if (!_overlay) return;

    _backdrop.addEventListener('click', close);
    _closeBtn.addEventListener('click', close);
    _overlay.addEventListener('keydown', onKeydown);
  }

  function open(imgSrc, captionText) {
    _lastFocused = document.activeElement;
    _img.src     = imgSrc;
    _img.alt     = captionText;
    _caption.textContent = captionText;
    _overlay.setAttribute('aria-hidden', 'false');
    _overlay.classList.add('is-open');
    document.body.style.overflow = 'hidden';
    _closeBtn.focus();
  }

  function close() {
    _overlay.setAttribute('aria-hidden', 'true');
    _overlay.classList.remove('is-open');
    document.body.style.overflow = '';
    setTimeout(() => { _img.src = ''; _img.alt = ''; }, 200);
    if (_lastFocused) _lastFocused.focus();
  }

  function onKeydown(e) {
    if (e.key === 'Escape') { e.preventDefault(); close(); }
    if (e.key === 'Tab') {
      const focusable = _overlay.querySelectorAll(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
      );
      const first = focusable[0];
      const last  = focusable[focusable.length - 1];
      if (e.shiftKey) {
        if (document.activeElement === first) { e.preventDefault(); last.focus(); }
      } else {
        if (document.activeElement === last) { e.preventDefault(); first.focus(); }
      }
    }
  }

  return { init, open, close };
})();

/* =========================================================================
   EVENT DELEGATION — card clicks + keyboard
   ========================================================================= */

function wireCardEvents() {
  const container = document.getElementById('sections-container');
  if (!container) return;

  container.addEventListener('click', (e) => {
    const btn = e.target.closest('[data-img]');
    if (!btn) return;
    if (btn.tagName === 'A' && btn.hasAttribute('download')) return;
    Lightbox.open(btn.getAttribute('data-img'), btn.getAttribute('data-caption'));
  });

  container.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      const thumb = e.target.closest('.card-thumb-wrap[role="button"]');
      if (!thumb) return;
      e.preventDefault();
      Lightbox.open(thumb.getAttribute('data-img'), thumb.getAttribute('data-caption'));
    }
  });
}

/* =========================================================================
   FOOTER YEAR
   ========================================================================= */

function setYear() {
  const el = document.getElementById('year');
  if (el) el.textContent = new Date().getFullYear();
}

/* =========================================================================
   UTILITY
   ========================================================================= */

function escapeHtml(str) {
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

/* =========================================================================
   RESOURCES BANNER
   ========================================================================= */

function renderResourcesBanner() {
  const container = document.getElementById('sections-container');
  if (!container) return;

  const GH_ICON = `<svg width="18" height="18" viewBox="0 0 16 16" fill="currentColor" aria-hidden="true" focusable="false"><path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z"/></svg>`;

  const section = document.createElement('section');
  section.className = 'resources-banner constrain';
  section.setAttribute('aria-labelledby', 'resources-heading');

  section.innerHTML = `
    <div class="resources-inner">
      <div class="resources-text">
        <p class="section-eyebrow">Open Source</p>
        <h2 class="section-title" id="resources-heading">Resources &amp; Links</h2>
        <p class="section-desc">
          Source repository, mentor profile, and a single-file download of all revision images.
        </p>
      </div>

      <div class="resources-cards">
        <a
          class="repo-card"
          href="${REPO.student.repoUrl}"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Open ${escapeHtml(REPO.student.name)}'s repository on GitHub"
        >
          <div class="repo-card-icon">${GH_ICON}</div>
          <div class="repo-card-body">
            <span class="repo-card-role">${escapeHtml(REPO.student.role)}</span>
            <span class="repo-card-name">${escapeHtml(REPO.student.name)}</span>
            <span class="repo-card-handle">@${escapeHtml(REPO.student.handle)}</span>
            <span class="repo-card-url">stats-probability-quick-notes ↗</span>
          </div>
        </a>

        <a
          class="repo-card"
          href="${REPO.mentor.profileUrl}"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Open ${escapeHtml(REPO.mentor.name)}'s GitHub profile"
        >
          <div class="repo-card-icon">${GH_ICON}</div>
          <div class="repo-card-body">
            <span class="repo-card-role">${escapeHtml(REPO.mentor.role)}</span>
            <span class="repo-card-name">${escapeHtml(REPO.mentor.name)}</span>
            <span class="repo-card-handle">@${escapeHtml(REPO.mentor.handle)}</span>
            <span class="repo-card-url">View Profile ↗</span>
          </div>
        </a>

        <a
          class="repo-card repo-card--download"
          href="${escapeHtml(REPO.zipFile)}"
          download
          aria-label="Download all revision notes as a ZIP archive"
        >
          <div class="repo-card-icon" aria-hidden="true">⬇</div>
          <div class="repo-card-body">
            <span class="repo-card-role">Offline Study</span>
            <span class="repo-card-name">Download All Notes</span>
            <span class="repo-card-handle">JPEG images</span>
            <span class="repo-card-url">${escapeHtml(REPO.zipFile)}</span>
          </div>
        </a>

        <button
          class="repo-card repo-card--pdf"
          id="download-pdf-btn"
          type="button"
          aria-label="Generate and download a complete PDF of all revision notes"
        >
          <div class="repo-card-icon" aria-hidden="true">📄</div>
          <div class="repo-card-body">
            <span class="repo-card-role">Complete Reference</span>
            <span class="repo-card-name">Download PDF</span>
            <span class="repo-card-handle">All chapters · Cover · TOC</span>
            <span class="repo-card-url" id="pdf-btn-status">Generate PDF ↓</span>
          </div>
        </button>
      </div>
    </div>
  `;

  container.appendChild(section);

  // Wire PDF button — delegate to pdf-generator module
  const pdfBtn = document.getElementById('download-pdf-btn');
  if (pdfBtn) {
    pdfBtn.addEventListener('click', () => {
      if (typeof generatePDF === 'function') {
        generatePDF(SECTIONS, document.getElementById('pdf-btn-status'));
      } else {
        alert('PDF generator is loading — please try again in a moment.');
      }
    });
  }
}

/* =========================================================================
   BOOT
   ========================================================================= */

document.addEventListener('DOMContentLoaded', () => {
  renderSections();         // inject section + card DOM
  renderSearchBar();        // live search above notes
  renderResourcesBanner();  // GitHub links + Download All + PDF
  setTopicCount();          // update hero meta badge
  Lightbox.init();          // set up lightbox listeners
  wireCardEvents();         // delegate clicks on cards
  setYear();                // footer copyright year

  // Calculator section is rendered by calculator.js (loaded after this script)
});