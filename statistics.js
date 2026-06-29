/**
 * statistics.js
 * Pure statistical computation functions — no DOM dependencies.
 * Import or include before calculator.js.
 */

'use strict';

/**
 * Parse a comma-or-newline-separated string into a sorted numeric array.
 * Returns { values, errors } where errors is an array of invalid token strings.
 */
function parseInput(raw) {
  const tokens = raw
    .split(/[\n,]+/)
    .map(t => t.trim())
    .filter(t => t.length > 0);

  const values = [];
  const errors = [];

  tokens.forEach(t => {
    const n = Number(t);
    if (isNaN(n)) {
      errors.push(t);
    } else {
      values.push(n);
    }
  });

  return { values, errors };
}

/**
 * Compute all descriptive statistics from a numeric array.
 * The array need not be sorted — a sorted copy is made internally.
 * @param {number[]} values
 * @returns {object} stats object
 */
function computeDescriptive(values) {
  if (!values || values.length === 0) return null;

  const n = values.length;
  const sorted = [...values].sort((a, b) => a - b);

  // Sum & Mean
  const sum = values.reduce((acc, v) => acc + v, 0);
  const mean = sum / n;

  // Median
  const median = n % 2 === 0
    ? (sorted[n / 2 - 1] + sorted[n / 2]) / 2
    : sorted[Math.floor(n / 2)];

  // Mode (all values with highest frequency)
  const freq = {};
  values.forEach(v => { freq[v] = (freq[v] || 0) + 1; });
  const maxFreq = Math.max(...Object.values(freq));
  const modes = maxFreq === 1
    ? ['No mode']
    : Object.keys(freq).filter(k => freq[k] === maxFreq).map(Number).sort((a, b) => a - b);

  // Min, Max, Range
  const min = sorted[0];
  const max = sorted[n - 1];
  const range = max - min;

  // Variance (sample) and Standard Deviation
  const variance = values.reduce((acc, v) => acc + Math.pow(v - mean, 2), 0) / (n - 1);
  const stdDev = Math.sqrt(variance);

  // Quartiles (inclusive method)
  function quartile(sorted, p) {
    const pos = (sorted.length - 1) * p;
    const base = Math.floor(pos);
    const rest = pos - base;
    if (sorted[base + 1] !== undefined) {
      return sorted[base] + rest * (sorted[base + 1] - sorted[base]);
    }
    return sorted[base];
  }

  const q1 = quartile(sorted, 0.25);
  const q2 = median; // same as median
  const q3 = quartile(sorted, 0.75);
  const iqr = q3 - q1;

  // Coefficient of Variation
  const cv = mean !== 0 ? (stdDev / Math.abs(mean)) * 100 : null;

  return {
    n,
    sum,
    mean,
    median,
    modes,
    min,
    max,
    range,
    variance,
    stdDev,
    q1,
    q2,
    q3,
    iqr,
    cv
  };
}

/**
 * Format a number to a reasonable number of decimal places,
 * stripping trailing zeros.
 */
function fmt(n, places = 4) {
  if (n === null || n === undefined || isNaN(n)) return 'N/A';
  return parseFloat(n.toFixed(places)).toString();
}