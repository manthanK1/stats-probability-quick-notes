/**
 * Statistics & Probability — Quick Revision Notes
 * script.js
 *
 * Responsibilities:
 *  1. Define topic data (sections + cards)
 *  2. Render section headers and card grids into #sections-container
 *  3. Drive the lightbox (open / close / keyboard / focus-trap)
 *  4. Wire download buttons
 *  5. Misc: year in footer, topic count in hero
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
        alt: 'Overview diagram showing descriptive vs inferential statistics'
      },
      {
        index: '01',
        title: 'Types of Data',
        file: '01_type_of_data_in_stats.jpeg',
        alt: 'Hierarchy of data types: nominal, ordinal, interval, ratio'
      },
      {
        index: '08',
        title: 'Measurement Scales',
        file: '08_understanding_measuringscale.jpeg',
        alt: 'Visual comparison of the four measurement scales'
      },
      {
        index: '16',
        title: 'Box Plot',
        file: '16_boxplot.jpeg',
        alt: 'Anatomy of a box-and-whisker plot with IQR labelled'
      }
    ]
  },

  {
    id: 'probability',
    label: 'Chapter 02',
    title: 'Probability',
    description: "From the Central Limit Theorem — the engine of inference — through Bayes' Theorem.",
    cards: [
      {
        index: '09',
        title: 'Central Limit Theorem (CLT)',
        file: '09_CLT.jpeg',
        alt: 'Diagram illustrating how sample means converge to a normal distribution'
      },
      {
        index: '15',
        title: "Bayes' Theorem",
        file: '15_Bayes_theorem.jpeg',
        alt: "Formula and visual walkthrough of Bayes' Theorem"
      }
    ]
  },

  {
    id: 'hypothesis',
    label: 'Chapter 03',
    title: 'Hypothesis Testing',
    description: 'Six-step workflow, one-tailed vs two-tailed logic, and the main parametric tests.',
    cards: [
      {
        index: '07',
        title: 'Hypothesis Testing — 6-Step Workflow',
        file: '07_hypothesis_testing_workflow_6steps.jpeg',
        alt: 'Flowchart of the standard six-step hypothesis testing procedure'
      },
      {
        index: '19',
        title: 'The p-Value',
        file: '19_the_p_value.jpeg',
        alt: 'Explanation of p-value: definition, interpretation, and relationship to significance level',
        isNew: true
      },
      {
        index: '06',
        title: 'One-Tailed vs Two-Tailed Tests',
        file: '06_one-tailed_vs_two_tailed_tests.jpeg',
        alt: 'Side-by-side comparison of one-tailed and two-tailed rejection regions'
      },
      {
        index: '02',
        title: 'One-Sample t-Test',
        file: '02_one_sample_t-Test.jpeg',
        alt: 'Formula, assumptions, and decision rule for the one-sample t-test'
      },
      {
        index: '03',
        title: 'Independent Samples t-Test',
        file: '03_independent_samples_t-Test.jpeg',
        alt: 'Formula and conditions for the two-sample independent t-test'
      },
      {
        index: '04',
        title: 'Paired Samples t-Test',
        file: '04_paired_test.jpeg',
        alt: 'Paired t-test formula and worked-example structure'
      },
      {
        index: '05',
        title: 'One-Sample Z-Test (Two-Tailed Example)',
        file: '05_one_sample_Z_test_two_tailed_eg.jpeg',
        alt: 'Worked example of a two-tailed one-sample Z-test'
      },
      {
        index: '12',
        title: 'One-Sample Z-Test (Formula Card)',
        file: '12_oneSample_ztest.jpeg',
        alt: 'One-sample Z-test formula reference card'
      },
      {
        index: '13',
        title: 'One-Sample Test — Practice Question',
        file: '13_onesample_test_question.jpeg',
        alt: 'Practice question for a one-sample hypothesis test'
      },
      {
        index: '14',
        title: 'One-Sample Test — Right-Tailed Example',
        file: '14_one_sample_question_right_tailed.jpeg',
        alt: 'Right-tailed one-sample test worked example'
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
        alt: 'One-way ANOVA assumptions, F-ratio, and decision table'
      },
      {
        index: '18',
        title: 'One-Way ANOVA — Worked Example',
        file: '18_one_way_anova_eg.jpeg',
        alt: 'One-way ANOVA solved numerical example with F-statistic calculation',
        isNew: true
      },
      {
        index: '10',
        title: 'Repeated Measures ANOVA',
        file: '10_repeated_measure_anova.jpeg',
        alt: 'Repeated measures ANOVA design and within-subjects F-ratio'
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
        isNew: true
      }
    ]
  }
];

/* =========================================================================
   REPOSITORY LINKS — shown in a "Resources" banner below the last section
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
 * @param {object} card  - card data object from SECTIONS
 * @param {number} sectionIdx - parent section index (for unique ids)
 * @param {number} cardIdx    - card index within section
 * @returns {HTMLElement}
 */
function buildCard(card, sectionIdx, cardIdx) {
  const imgPath = `images/${card.file}`;
  const uniqueId = `card-${sectionIdx}-${cardIdx}`;

  const article = document.createElement('article');
  article.className = 'card';
  article.setAttribute('aria-labelledby', `${uniqueId}-title`);
  if (card.isNew) article.setAttribute('data-new', 'true');

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
 * @param {object} section - section data from SECTIONS
 * @param {number} idx     - section index
 * @returns {HTMLElement}
 */
function buildSection(section, idx) {
  const sectionEl = document.createElement('section');
  sectionEl.id = section.id;
  sectionEl.className = 'topic-section constrain';
  sectionEl.setAttribute('aria-labelledby', `section-${idx}-heading`);

  // Section header
  const header = document.createElement('div');
  header.className = 'section-header';
  header.innerHTML = `
    <p class="section-eyebrow">${escapeHtml(section.label)}</p>
    <h2 class="section-title" id="section-${idx}-heading">${escapeHtml(section.title)}</h2>
    <p class="section-desc">${escapeHtml(section.description)}</p>
  `;

  // Card grid
  const grid = document.createElement('div');
  grid.className = 'card-grid';

  section.cards.forEach((card, cardIdx) => {
    grid.appendChild(buildCard(card, idx, cardIdx));
  });

  sectionEl.appendChild(header);
  sectionEl.appendChild(grid);

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
  let _lastFocused = null; // element to return focus to on close

  function init() {
    _overlay  = document.getElementById('lightbox');
    _img      = document.getElementById('lightbox-img');
    _caption  = document.getElementById('lightbox-caption');
    _closeBtn = document.getElementById('lightbox-close');
    _backdrop = document.getElementById('lightbox-backdrop');

    if (!_overlay) return;

    // Close on backdrop click
    _backdrop.addEventListener('click', close);

    // Close button
    _closeBtn.addEventListener('click', close);

    // Keyboard: Escape to close, Tab to trap focus
    _overlay.addEventListener('keydown', onKeydown);
  }

  function open(imgSrc, captionText) {
    _lastFocused = document.activeElement;

    _img.src     = imgSrc;
    _img.alt     = captionText;
    _caption.textContent = captionText;

    _overlay.setAttribute('aria-hidden', 'false');
    _overlay.classList.add('is-open');

    // Prevent body scroll
    document.body.style.overflow = 'hidden';

    // Move focus into the dialog
    _closeBtn.focus();
  }

  function close() {
    _overlay.setAttribute('aria-hidden', 'true');
    _overlay.classList.remove('is-open');
    document.body.style.overflow = '';

    // Clear src so previous image doesn't flash on next open
    setTimeout(() => {
      _img.src = '';
      _img.alt = '';
    }, 200);

    // Return focus
    if (_lastFocused) _lastFocused.focus();
  }

  function onKeydown(e) {
    if (e.key === 'Escape') {
      e.preventDefault();
      close();
    }

    // Basic focus trap: keep Tab inside the lightbox panel
    if (e.key === 'Tab') {
      const focusable = _overlay.querySelectorAll(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
      );
      const first = focusable[0];
      const last  = focusable[focusable.length - 1];

      if (e.shiftKey) {
        if (document.activeElement === first) {
          e.preventDefault();
          last.focus();
        }
      } else {
        if (document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    }
  }

  return { init, open, close };
})();

/* =========================================================================
   EVENT DELEGATION — view-notes buttons + thumbnail clicks
   ========================================================================= */

function wireCardEvents() {
  const container = document.getElementById('sections-container');
  if (!container) return;

  container.addEventListener('click', (e) => {
    // "View Notes" button
    const btn = e.target.closest('[data-img]');
    if (!btn) return;

    // Exclude download anchors (they have an href with download attr)
    if (btn.tagName === 'A' && btn.hasAttribute('download')) return;

    const imgSrc  = btn.getAttribute('data-img');
    const caption = btn.getAttribute('data-caption');
    Lightbox.open(imgSrc, caption);
  });

  // Allow keyboard activation of thumbnail (role="button")
  container.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      const thumb = e.target.closest('.card-thumb-wrap[role="button"]');
      if (!thumb) return;
      e.preventDefault();
      Lightbox.open(
        thumb.getAttribute('data-img'),
        thumb.getAttribute('data-caption')
      );
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

/**
 * Escape a string for safe insertion into HTML attribute values or text nodes.
 * Prevents XSS when any data value contains special characters.
 */
function escapeHtml(str) {
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

/* =========================================================================
   RESOURCES BANNER — GitHub links + Download All, rendered below all sections
   ========================================================================= */

/**
 * Build the GitHub-links + Download-All banner and append it to #sections-container.
 */
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

        <!-- Student repo card -->
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

        <!-- Mentor profile card -->
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

        <!-- Download All card -->
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
            <span class="repo-card-handle">20 JPEG images</span>
            <span class="repo-card-url">${escapeHtml(REPO.zipFile)}</span>
          </div>
        </a>

      </div>
    </div>
  `;

  container.appendChild(section);
}

document.addEventListener('DOMContentLoaded', () => {
  renderSections();         // inject section + card DOM
  renderResourcesBanner();  // GitHub links + Download All
  setTopicCount();          // update hero meta badge
  Lightbox.init();          // set up lightbox listeners
  wireCardEvents();         // delegate clicks on cards
  setYear();                // footer copyright year
});