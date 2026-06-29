/**
 * calculator.js
 * Interactive Statistics Calculator section.
 *
 * Depends on:
 *   - statistics.js  (parseInput, computeDescriptive, fmt)
 *   - formulaData.js (FORMULA_DATA)
 *   - graphs.js      (Graphs)
 *
 * Architecture:
 *   CALCULATORS array defines all calculator cards.
 *   Adding a new calculator = adding one entry to CALCULATORS.
 *   Fully implemented calculators set status: 'active' and provide a renderUI() function.
 *   Coming soon calculators set status: 'soon'.
 */

'use strict';

/* =========================================================================
   CALCULATOR REGISTRY
   To add a new calculator:
   1. Add an entry to CALCULATORS with a unique id, title, description, icon
   2. Set status: 'active'
   3. Implement renderUI(containerEl) to build its input/output DOM
   4. Add formula data to formulaData.js under the same id key
   ========================================================================= */

const CALCULATORS = [
  {
    id: 'descriptive',
    title: 'Descriptive Statistics',
    description: 'Mean, median, mode, variance, std dev, quartiles, IQR, CV and more.',
    icon: 'Σ',
    status: 'active',
    renderUI: renderDescriptiveUI
  },
  {
    id: 'probability',
    title: 'Probability',
    description: 'Basic probability, conditional probability, and Bayes\' Theorem.',
    icon: 'P',
    status: 'soon'
  },
  {
    id: 'z_test',
    title: 'One-Sample Z-Test',
    description: 'Test a population mean when σ is known.',
    icon: 'Z',
    status: 'soon'
  },
  {
    id: 't_test_one',
    title: 'One-Sample t-Test',
    description: 'Test a population mean when σ is unknown.',
    icon: 't₁',
    status: 'soon'
  },
  {
    id: 't_test_ind',
    title: 'Independent t-Test',
    description: 'Compare means of two independent groups.',
    icon: 't₂',
    status: 'soon'
  },
  {
    id: 't_test_paired',
    title: 'Paired t-Test',
    description: 'Compare paired before/after measurements.',
    icon: 't₃',
    status: 'soon'
  },
  {
    id: 'chi_square',
    title: 'Chi-Square Test',
    description: 'Test independence between categorical variables.',
    icon: 'χ²',
    status: 'soon'
  },
  {
    id: 'anova',
    title: 'ANOVA',
    description: 'Compare means across three or more groups.',
    icon: 'F',
    status: 'soon'
  },
  {
    id: 'confidence_interval',
    title: 'Confidence Interval',
    description: 'Estimate a population parameter with stated confidence.',
    icon: 'CI',
    status: 'soon'
  },
  {
    id: 'correlation',
    title: 'Correlation',
    description: "Pearson's r — measure linear association strength.",
    icon: 'r',
    status: 'soon'
  },
  {
    id: 'regression',
    title: 'Regression',
    description: 'Simple linear regression: slope, intercept, R².',
    icon: 'β',
    status: 'soon'
  }
];

/* =========================================================================
   STATE
   ========================================================================= */

let activeCalcId = 'descriptive';

/* =========================================================================
   SECTION RENDER — called from DOMContentLoaded
   ========================================================================= */

function renderCalculatorSection() {
  // Insert before the resources banner
  const sectionsContainer = document.getElementById('sections-container');
  if (!sectionsContainer) return;

  const section = document.createElement('section');
  section.id = 'calculator';
  section.className = 'calc-section constrain';
  section.setAttribute('aria-labelledby', 'calc-section-heading');

  section.innerHTML = `
    <div class="section-header">
      <p class="section-eyebrow">Interactive Tools</p>
      <h2 class="section-title" id="calc-section-heading">Statistics Calculator</h2>
      <p class="section-desc">
        Select a calculator below. Enter your data and get instant results alongside formula references.
      </p>
    </div>

    <!-- Calculator card picker -->
    <div class="calc-picker" role="tablist" aria-label="Select a calculator" id="calc-picker"></div>

    <!-- Main calculator workspace -->
    <div class="calc-workspace" id="calc-workspace">
      <!-- Left: input + results -->
      <div class="calc-panel calc-panel--main" id="calc-panel-main"></div>

      <!-- Right: formula reference -->
      <div class="calc-panel calc-panel--formula" id="calc-panel-formula"></div>
    </div>

    <!-- Graph area -->
    <div class="calc-graph-area" id="graph-placeholder-area"></div>
  `;

  // Insert before resources banner (last child of sectionsContainer)
  const resourcesBanner = sectionsContainer.querySelector('.resources-banner');
  if (resourcesBanner) {
    sectionsContainer.insertBefore(section, resourcesBanner);
  } else {
    sectionsContainer.appendChild(section);
  }

  buildPicker();
  activateCalculator('descriptive');

  if (typeof Graphs !== 'undefined') {
    Graphs.renderPlaceholder();
  }
}

/* =========================================================================
   PICKER
   ========================================================================= */

function buildPicker() {
  const picker = document.getElementById('calc-picker');
  if (!picker) return;

  CALCULATORS.forEach(calc => {
    const btn = document.createElement('button');
    btn.className = 'calc-pick-btn' + (calc.status === 'soon' ? ' calc-pick-btn--soon' : '');
    btn.setAttribute('role', 'tab');
    btn.setAttribute('aria-selected', calc.id === activeCalcId ? 'true' : 'false');
    btn.setAttribute('aria-controls', 'calc-panel-main');
    btn.setAttribute('data-calc-id', calc.id);
    btn.setAttribute('type', 'button');
    if (calc.status === 'soon') {
      btn.setAttribute('aria-label', `${calc.title} — coming soon`);
    }

    btn.innerHTML = `
      <span class="calc-pick-icon" aria-hidden="true">${escapeCalc(calc.icon)}</span>
      <span class="calc-pick-title">${escapeCalc(calc.title)}</span>
      ${calc.status === 'soon' ? '<span class="calc-pick-badge">Soon</span>' : ''}
    `;

    btn.addEventListener('click', () => {
      if (calc.status === 'soon') {
        showComingSoonPanel(calc);
        setActivePicker(calc.id);
        return;
      }
      activateCalculator(calc.id);
    });

    picker.appendChild(btn);
  });
}

function setActivePicker(id) {
  const picker = document.getElementById('calc-picker');
  if (!picker) return;
  picker.querySelectorAll('.calc-pick-btn').forEach(btn => {
    const isActive = btn.getAttribute('data-calc-id') === id;
    btn.setAttribute('aria-selected', isActive ? 'true' : 'false');
    btn.classList.toggle('calc-pick-btn--active', isActive);
  });
  activeCalcId = id;
}

/* =========================================================================
   ACTIVATE CALCULATOR
   ========================================================================= */

function activateCalculator(id) {
  const calc = CALCULATORS.find(c => c.id === id);
  if (!calc) return;

  setActivePicker(id);

  const mainPanel = document.getElementById('calc-panel-main');
  const formulaPanel = document.getElementById('calc-panel-formula');

  // Clear panels
  if (mainPanel) mainPanel.innerHTML = '';
  if (formulaPanel) formulaPanel.innerHTML = '';

  // Render calculator UI
  if (calc.status === 'active' && typeof calc.renderUI === 'function') {
    calc.renderUI(mainPanel);
  } else {
    showComingSoonPanel(calc);
    return;
  }

  // Render formula panel
  renderFormulaPanel(id, formulaPanel);

  // Graph area
  if (typeof Graphs !== 'undefined') {
    Graphs.renderPlaceholder();
  }
}

/* =========================================================================
   COMING SOON PANEL
   ========================================================================= */

function showComingSoonPanel(calc) {
  const mainPanel = document.getElementById('calc-panel-main');
  const formulaPanel = document.getElementById('calc-panel-formula');

  if (mainPanel) {
    mainPanel.innerHTML = `
      <div class="calc-coming-soon">
        <span class="calc-coming-icon" aria-hidden="true">${escapeCalc(calc.icon)}</span>
        <h3 class="calc-coming-title">${escapeCalc(calc.title)}</h3>
        <p class="calc-coming-desc">${escapeCalc(calc.description)}</p>
        <span class="calc-coming-tag">Coming Soon</span>
      </div>
    `;
  }

  if (formulaPanel) {
    renderFormulaPanel(calc.id, formulaPanel);
  }

  if (typeof Graphs !== 'undefined') {
    Graphs.showComingSoon(calc.title);
  }
}

/* =========================================================================
   FORMULA PANEL
   ========================================================================= */

function renderFormulaPanel(calcId, container) {
  if (!container) return;

  const data = (typeof FORMULA_DATA !== 'undefined') ? FORMULA_DATA[calcId] : null;

  if (!data) {
    container.innerHTML = `
      <div class="formula-panel">
        <h3 class="formula-panel-title">Formula Reference</h3>
        <p class="formula-panel-empty">Formula reference for this calculator is coming soon.</p>
      </div>
    `;
    return;
  }

  const items = data.formulas.map(f => `
    <div class="formula-item">
      <h4 class="formula-item-name">${escapeCalc(f.name)}</h4>
      <div class="formula-item-formula" aria-label="Formula: ${escapeCalc(f.formula)}">${escapeCalc(f.formula)}</div>
      <dl class="formula-item-details">
        <dt>Variables</dt>
        <dd>${escapeCalc(f.variables)}</dd>
        <dt>Explanation</dt>
        <dd>${escapeCalc(f.explanation)}</dd>
        <dt>When to use</dt>
        <dd>${escapeCalc(f.use)}</dd>
      </dl>
    </div>
  `).join('');

  container.innerHTML = `
    <div class="formula-panel">
      <h3 class="formula-panel-title">${escapeCalc(data.title)}</h3>
      <div class="formula-panel-body">
        ${items}
      </div>
    </div>
  `;
}

/* =========================================================================
   DESCRIPTIVE STATISTICS CALCULATOR UI
   ========================================================================= */

function renderDescriptiveUI(container) {
  if (!container) return;

  container.innerHTML = `
    <div class="desc-calc">
      <h3 class="calc-panel-title">Descriptive Statistics</h3>
      <p class="calc-panel-subtitle">Enter numbers separated by commas or new lines.</p>

      <div class="desc-input-group">
        <label class="desc-label" for="desc-input">Data Values</label>
        <textarea
          id="desc-input"
          class="desc-textarea"
          rows="5"
          placeholder="e.g.  4, 7, 13, 2, 1&#10;or one per line"
          aria-describedby="desc-input-hint"
          spellcheck="false"
        ></textarea>
        <p class="desc-hint" id="desc-input-hint">
          Accepts integers and decimals. Negatives are supported.
        </p>
        <p class="desc-error" id="desc-error" aria-live="polite" hidden></p>
      </div>

      <div class="desc-btn-group">
        <button class="btn btn-primary desc-btn-calc" id="desc-btn-calc" type="button">
          Calculate
        </button>
        <button class="btn btn-secondary desc-btn-clear" id="desc-btn-clear" type="button">
          Clear
        </button>
        <button class="btn btn-secondary desc-btn-copy" id="desc-btn-copy" type="button" hidden>
          Copy Results
        </button>
      </div>

      <div class="desc-results" id="desc-results" aria-live="polite" hidden>
        <!-- Populated by JS -->
      </div>
    </div>
  `;

  // Wire events
  document.getElementById('desc-btn-calc').addEventListener('click', runDescriptive);
  document.getElementById('desc-btn-clear').addEventListener('click', clearDescriptive);
  document.getElementById('desc-btn-copy').addEventListener('click', copyDescriptiveResults);

  // Allow Enter in textarea to not submit (textarea already handles newlines)
  document.getElementById('desc-input').addEventListener('keydown', e => {
    if (e.key === 'Enter' && (e.ctrlKey || e.metaKey)) {
      e.preventDefault();
      runDescriptive();
    }
  });
}

/* =========================================================================
   DESCRIPTIVE CALCULATOR LOGIC
   ========================================================================= */

let _lastDescResults = null; // for copy

function runDescriptive() {
  const input = document.getElementById('desc-input');
  const errorEl = document.getElementById('desc-error');
  const resultsEl = document.getElementById('desc-results');
  const copyBtn = document.getElementById('desc-btn-copy');

  if (!input || !errorEl || !resultsEl) return;

  // Hide previous
  errorEl.hidden = true;
  resultsEl.hidden = true;
  if (copyBtn) copyBtn.hidden = true;

  const raw = input.value;

  if (!raw.trim()) {
    showDescError('Please enter at least one number.');
    return;
  }

  const { values, errors } = parseInput(raw);

  if (errors.length > 0) {
    showDescError(`Could not parse: ${errors.slice(0, 5).map(e => `"${e}"`).join(', ')}. Please enter numbers only.`);
    return;
  }

  if (values.length === 0) {
    showDescError('No valid numbers found. Please enter at least one number.');
    return;
  }

  if (values.length < 2) {
    showDescError('Please enter at least 2 values to calculate meaningful statistics.');
    return;
  }

  const stats = computeDescriptive(values);
  if (!stats) {
    showDescError('Calculation failed. Please check your input.');
    return;
  }

  _lastDescResults = stats;
  renderDescriptiveResults(stats, resultsEl);
  resultsEl.hidden = false;
  if (copyBtn) copyBtn.hidden = false;
}

function showDescError(msg) {
  const errorEl = document.getElementById('desc-error');
  if (!errorEl) return;
  errorEl.textContent = msg;
  errorEl.hidden = false;
}

function clearDescriptive() {
  const input = document.getElementById('desc-input');
  const errorEl = document.getElementById('desc-error');
  const resultsEl = document.getElementById('desc-results');
  const copyBtn = document.getElementById('desc-btn-copy');

  if (input) { input.value = ''; input.focus(); }
  if (errorEl) errorEl.hidden = true;
  if (resultsEl) resultsEl.hidden = true;
  if (copyBtn) copyBtn.hidden = true;
  _lastDescResults = null;

  if (typeof Graphs !== 'undefined') Graphs.renderPlaceholder();
}

function renderDescriptiveResults(s, container) {
  const modeStr = s.modes[0] === 'No mode'
    ? 'No mode'
    : s.modes.map(m => fmt(m)).join(', ');

  const rows = [
    { label: 'Sample Size (n)',        value: s.n,          icon: '#' },
    { label: 'Sum',                    value: fmt(s.sum),   icon: 'Σ' },
    { label: 'Mean (x̄)',              value: fmt(s.mean),  icon: 'μ' },
    { label: 'Median',                 value: fmt(s.median),icon: 'M' },
    { label: 'Mode',                   value: modeStr,      icon: '▒' },
    { label: 'Minimum',                value: fmt(s.min),   icon: '↓' },
    { label: 'Maximum',                value: fmt(s.max),   icon: '↑' },
    { label: 'Range',                  value: fmt(s.range), icon: '↕' },
    { label: 'Sample Variance (s²)',   value: fmt(s.variance), icon: 's²' },
    { label: 'Std Deviation (s)',      value: fmt(s.stdDev),   icon: 'σ' },
    { label: 'Q1 (25th percentile)',   value: fmt(s.q1),    icon: 'Q1' },
    { label: 'Q2 / Median',           value: fmt(s.q2),    icon: 'Q2' },
    { label: 'Q3 (75th percentile)',   value: fmt(s.q3),    icon: 'Q3' },
    { label: 'IQR',                    value: fmt(s.iqr),   icon: '⊡' },
    {
      label: 'Coeff. of Variation',
      value: s.cv !== null ? fmt(s.cv) + '%' : 'N/A (mean = 0)',
      icon: 'CV'
    }
  ];

  const rowsHTML = rows.map((r, i) => `
    <tr class="${i % 2 === 0 ? 'desc-row-even' : ''}">
      <td class="desc-result-icon" aria-hidden="true">${r.icon}</td>
      <td class="desc-result-label">${r.label}</td>
      <td class="desc-result-value">${r.value}</td>
    </tr>
  `).join('');

  container.innerHTML = `
    <div class="desc-results-header">
      <h4 class="desc-results-title">Results — ${s.n} value${s.n !== 1 ? 's' : ''}</h4>
    </div>
    <div class="desc-table-wrap">
      <table class="desc-table" aria-label="Descriptive statistics results">
        <thead>
          <tr>
            <th scope="col" aria-hidden="true"></th>
            <th scope="col">Statistic</th>
            <th scope="col">Value</th>
          </tr>
        </thead>
        <tbody>${rowsHTML}</tbody>
      </table>
    </div>
  `;
}

function copyDescriptiveResults() {
  if (!_lastDescResults) return;
  const s = _lastDescResults;

  const modeStr = s.modes[0] === 'No mode' ? 'No mode' : s.modes.map(m => fmt(m)).join(', ');

  const lines = [
    'Descriptive Statistics Results',
    '================================',
    `Sample Size (n)        : ${s.n}`,
    `Sum                    : ${fmt(s.sum)}`,
    `Mean (x̄)              : ${fmt(s.mean)}`,
    `Median                 : ${fmt(s.median)}`,
    `Mode                   : ${modeStr}`,
    `Minimum                : ${fmt(s.min)}`,
    `Maximum                : ${fmt(s.max)}`,
    `Range                  : ${fmt(s.range)}`,
    `Sample Variance (s²)   : ${fmt(s.variance)}`,
    `Std Deviation (s)      : ${fmt(s.stdDev)}`,
    `Q1 (25th percentile)   : ${fmt(s.q1)}`,
    `Q2 / Median            : ${fmt(s.q2)}`,
    `Q3 (75th percentile)   : ${fmt(s.q3)}`,
    `IQR                    : ${fmt(s.iqr)}`,
    `Coeff. of Variation    : ${s.cv !== null ? fmt(s.cv) + '%' : 'N/A'}`,
    '',
    'Generated by StatNotes — stats-probability-quick-notes'
  ];

  const copyBtn = document.getElementById('desc-btn-copy');

  navigator.clipboard.writeText(lines.join('\n')).then(() => {
    if (copyBtn) {
      const orig = copyBtn.textContent;
      copyBtn.textContent = 'Copied!';
      setTimeout(() => { copyBtn.textContent = orig; }, 1800);
    }
  }).catch(() => {
    // Fallback for browsers without clipboard API
    const ta = document.createElement('textarea');
    ta.value = lines.join('\n');
    ta.style.position = 'fixed';
    ta.style.opacity = '0';
    document.body.appendChild(ta);
    ta.select();
    document.execCommand('copy');
    document.body.removeChild(ta);
    if (copyBtn) {
      const orig = copyBtn.textContent;
      copyBtn.textContent = 'Copied!';
      setTimeout(() => { copyBtn.textContent = orig; }, 1800);
    }
  });
}

/* =========================================================================
   UTILITY (local to this module — avoids dependency on script.js escapeHtml)
   ========================================================================= */

function escapeCalc(str) {
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

/* =========================================================================
   BOOT — called after DOM ready
   ========================================================================= */

document.addEventListener('DOMContentLoaded', () => {
  renderCalculatorSection();
});