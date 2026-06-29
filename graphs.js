/**
 * graphs.js
 * Graph placeholder and future chart rendering module.
 *
 * Currently renders placeholder UI.
 * When a chart library is added, implement the render functions below
 * and call them from calculator.js after computeDescriptive() returns results.
 *
 * Suggested libraries for future implementation:
 *   - Chart.js (https://www.chartjs.org/) — simple, well-documented
 *   - Plotly.js (https://plotly.com/javascript/) — more advanced
 *   Both can be loaded via CDN with a <script> tag in index.html.
 */

'use strict';

const Graphs = (() => {

  /** Container element id in the DOM */
  const CONTAINER_ID = 'graph-placeholder-area';

  /**
   * Render the initial placeholder UI inside #graph-placeholder-area.
   * Called once on page load by calculator.js.
   */
  function renderPlaceholder() {
    const el = document.getElementById(CONTAINER_ID);
    if (!el) return;

    el.innerHTML = `
      <div class="graph-placeholder">
        <div class="graph-placeholder-icons" aria-hidden="true">
          <span class="graph-icon graph-icon--histogram">▐█▌</span>
          <span class="graph-icon graph-icon--box">┤ ○ ├</span>
          <span class="graph-icon graph-icon--bell">∩</span>
        </div>
        <p class="graph-placeholder-msg">
          Graphs will appear here after calculations.
        </p>
        <p class="graph-placeholder-sub">
          Histogram · Box Plot · Normal Distribution · Scatter Plot · Bar Chart
        </p>
      </div>
    `;
  }

  /**
   * Show a "coming soon" overlay inside the graph area.
   * Called when a non-descriptive calculator is activated.
   */
  function showComingSoon(calcTitle) {
    const el = document.getElementById(CONTAINER_ID);
    if (!el) return;
    el.innerHTML = `
      <div class="graph-placeholder">
        <p class="graph-placeholder-msg">Graph support for <strong>${calcTitle}</strong> is coming soon.</p>
      </div>
    `;
  }

  /* -----------------------------------------------------------------
     FUTURE IMPLEMENTATION STUBS
     Uncomment and implement these when adding Chart.js or Plotly.
     ----------------------------------------------------------------- */

  /**
   * Render a histogram from an array of values.
   * @param {number[]} values
   * @param {number} binCount
   */
  // function renderHistogram(values, binCount = 10) { ... }

  /**
   * Render a box plot from computed stats.
   * @param {{ min, q1, median, q3, max }} stats
   */
  // function renderBoxPlot(stats) { ... }

  /**
   * Render a normal distribution bell curve overlaid on histogram.
   * @param {number} mean
   * @param {number} stdDev
   */
  // function renderNormalCurve(mean, stdDev) { ... }

  /**
   * Render a scatter plot from two paired arrays.
   * @param {number[]} x
   * @param {number[]} y
   */
  // function renderScatterPlot(x, y) { ... }

  /**
   * Clear all charts from the graph area and reset to placeholder.
   */
  function clear() {
    renderPlaceholder();
  }

  return { renderPlaceholder, showComingSoon, clear };
})();