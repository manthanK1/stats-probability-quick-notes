/**
 * pdf-generator.js
 * Generates a complete PDF of all revision notes.
 *
 * Uses jsPDF (loaded from CDN in index.html).
 * Generates: Cover page, Table of Contents, all images in chapter order, page numbers.
 *
 * Called from script.js:
 *   generatePDF(SECTIONS, statusElement)
 */

'use strict';

/**
 * Main entry point.
 * @param {Array}       sections   — SECTIONS array from script.js
 * @param {HTMLElement} statusEl   — element to show progress text in
 */
async function generatePDF(sections, statusEl) {
  function setStatus(msg) {
    if (statusEl) statusEl.textContent = msg;
  }

  // Check jsPDF is loaded
  if (typeof window.jspdf === 'undefined' && typeof window.jsPDF === 'undefined') {
    setStatus('Loading PDF library…');
    try {
      await loadScript('https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.5.1/jspdf.umd.min.js');
    } catch {
      setStatus('Failed to load PDF library. Check your connection.');
      return;
    }
  }

  const { jsPDF } = window.jspdf || window;

  try {
    setStatus('Preparing PDF…');

    const doc = new jsPDF({
      orientation: 'portrait',
      unit: 'mm',
      format: 'a4'
    });

    const PAGE_W = 210;  // A4 mm
    const PAGE_H = 297;
    const MARGIN = 15;
    const CONTENT_W = PAGE_W - MARGIN * 2;
    const CONTENT_H = PAGE_H - MARGIN * 2;

    // Colour palette matching site
    const COL_BG      = [13,  27,  42];   // #0D1B2A
    const COL_SURFACE = [26,  47,  69];   // #1A2F45
    const COL_ACCENT  = [74, 144, 184];   // #4A90B8
    const COL_AMBER   = [212,160, 23];    // #D4A017
    const COL_TEXT    = [232,228,220];    // #E8E4DC
    const COL_MUTED   = [143,168,192];    // #8FA8C0
    const COL_WHITE   = [255,255,255];

    let pageNum = 1;

    /* ---------------------------------------------------------------
       HELPERS
    --------------------------------------------------------------- */

    function addPageNum(n) {
      doc.setFont('helvetica', 'normal');
      doc.setFontSize(8);
      doc.setTextColor(...COL_MUTED);
      doc.text(`${n}`, PAGE_W / 2, PAGE_H - 8, { align: 'center' });
    }

    function fillBg(color) {
      doc.setFillColor(...color);
      doc.rect(0, 0, PAGE_W, PAGE_H, 'F');
    }

    function drawGridLines() {
      doc.setDrawColor(74, 144, 184, 0.08);
      doc.setLineWidth(0.1);
      for (let x = 0; x < PAGE_W; x += 10) {
        doc.line(x, 0, x, PAGE_H);
      }
      for (let y = 0; y < PAGE_H; y += 10) {
        doc.line(0, y, PAGE_W, y);
      }
    }

    /* ---------------------------------------------------------------
       PAGE 1: COVER
    --------------------------------------------------------------- */

    fillBg(COL_BG);
    drawGridLines();

    // Accent strip
    doc.setFillColor(...COL_ACCENT);
    doc.rect(0, 0, 6, PAGE_H, 'F');

    // Sigma symbol box
    doc.setFillColor(...COL_ACCENT);
    doc.roundedRect(MARGIN + 6, MARGIN + 10, 20, 20, 3, 3, 'F');
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(16);
    doc.setTextColor(...COL_BG);
    doc.text('Σ', MARGIN + 16, MARGIN + 24, { align: 'center' });

    // Logo text
    doc.setFont('helvetica', 'italic');
    doc.setFontSize(13);
    doc.setTextColor(...COL_TEXT);
    doc.text('StatNotes', MARGIN + 30, MARGIN + 24);

    // Divider
    doc.setDrawColor(...COL_ACCENT);
    doc.setLineWidth(0.5);
    doc.line(MARGIN + 6, MARGIN + 36, PAGE_W - MARGIN, MARGIN + 36);

    // Eyebrow
    doc.setFont('courier', 'normal');
    doc.setFontSize(8);
    doc.setTextColor(...COL_AMBER);
    doc.text('OPEN EDUCATIONAL RESOURCE', MARGIN + 6, MARGIN + 50);

    // Main title
    doc.setFont('times', 'bold');
    doc.setFontSize(28);
    doc.setTextColor(...COL_TEXT);
    doc.text('Statistics &', MARGIN + 6, MARGIN + 65);
    doc.text('Probability', MARGIN + 6, MARGIN + 78);

    // Subtitle
    doc.setFont('times', 'italic');
    doc.setFontSize(18);
    doc.setTextColor(...COL_ACCENT);
    doc.text('Quick Revision Notes', MARGIN + 6, MARGIN + 92);

    // Description
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(9);
    doc.setTextColor(...COL_MUTED);
    const descLines = doc.splitTextToSize(
      'Visual reference cards covering core concepts from descriptive statistics through Bayesian reasoning. Designed for rapid review before exams or data-analysis work.',
      CONTENT_W - 6
    );
    doc.text(descLines, MARGIN + 6, MARGIN + 105);

    // Meta box
    const metaY = MARGIN + 125;
    doc.setFillColor(26, 47, 69);
    doc.roundedRect(MARGIN + 6, metaY, CONTENT_W - 6, 40, 3, 3, 'F');
    doc.setDrawColor(...COL_AMBER);
    doc.setLineWidth(0.8);
    doc.line(MARGIN + 6, metaY, MARGIN + 6, metaY + 40);

    const totalCards = sections.reduce((s, sec) => s + sec.cards.length, 0);
    const metaItems = [
      { label: 'RESEARCH MENTOR', value: 'Dr. Ronald Bbosa' },
      { label: 'MAINTAINED BY',   value: 'Manthan Kumar' },
      { label: 'CHAPTERS',        value: `${sections.length}` },
      { label: 'TOPICS',          value: `${totalCards}` }
    ];

    const colW = (CONTENT_W - 6) / 2;
    metaItems.forEach((item, i) => {
      const col = i % 2;
      const row = Math.floor(i / 2);
      const x = MARGIN + 12 + col * colW;
      const y = metaY + 10 + row * 18;

      doc.setFont('courier', 'normal');
      doc.setFontSize(6.5);
      doc.setTextColor(...COL_MUTED);
      doc.text(item.label, x, y);

      doc.setFont('helvetica', 'bold');
      doc.setFontSize(9);
      doc.setTextColor(...COL_TEXT);
      doc.text(item.value, x, y + 6);
    });

    // GitHub URL
    doc.setFont('courier', 'normal');
    doc.setFontSize(7.5);
    doc.setTextColor(...COL_ACCENT);
    doc.text('github.com/manthanK1/stats-probability-quick-notes', MARGIN + 6, PAGE_H - 20);

    // Disclaimer
    doc.setFontSize(6.5);
    doc.setTextColor(...COL_MUTED);
    doc.text(
      'Educational use only. Verify all formulas against your course material.',
      MARGIN + 6, PAGE_H - 14
    );

    addPageNum(pageNum++);

    /* ---------------------------------------------------------------
       PAGE 2: TABLE OF CONTENTS
    --------------------------------------------------------------- */

    doc.addPage();
    fillBg(COL_BG);

    // Left accent bar
    doc.setFillColor(...COL_ACCENT);
    doc.rect(0, 0, 6, PAGE_H, 'F');

    // TOC heading
    doc.setFont('times', 'bold');
    doc.setFontSize(22);
    doc.setTextColor(...COL_TEXT);
    doc.text('Table of Contents', MARGIN + 6, MARGIN + 18);

    doc.setDrawColor(...COL_ACCENT);
    doc.setLineWidth(0.4);
    doc.line(MARGIN + 6, MARGIN + 22, PAGE_W - MARGIN, MARGIN + 22);

    let tocY = MARGIN + 34;
    let imagePageNum = 3; // images start on page 3

    sections.forEach((section, sIdx) => {
      // Chapter heading row
      doc.setFillColor(...COL_SURFACE);
      doc.rect(MARGIN + 6, tocY - 5, CONTENT_W - 6, 10, 'F');

      doc.setFont('courier', 'normal');
      doc.setFontSize(7);
      doc.setTextColor(...COL_AMBER);
      doc.text(section.label.toUpperCase(), MARGIN + 10, tocY + 1);

      doc.setFont('times', 'bold');
      doc.setFontSize(10);
      doc.setTextColor(...COL_TEXT);
      doc.text(section.title, MARGIN + 36, tocY + 1);

      // Dots
      doc.setFont('courier', 'normal');
      doc.setFontSize(8);
      doc.setTextColor(...COL_MUTED);
      const dotStr = '· · · · · · · · · · · · · · · · · · · · · · · · · · · · · · · · · · · · ·';
      const dotX   = MARGIN + 80;
      const dotW   = PAGE_W - MARGIN - 20 - dotX;
      doc.text(dotStr.slice(0, Math.floor(dotW / 2)), dotX, tocY + 1);
      doc.text(`${imagePageNum}`, PAGE_W - MARGIN - 2, tocY + 1, { align: 'right' });

      tocY += 14;

      section.cards.forEach(card => {
        if (tocY > PAGE_H - MARGIN - 10) {
          doc.addPage();
          fillBg(COL_BG);
          doc.setFillColor(...COL_ACCENT);
          doc.rect(0, 0, 6, PAGE_H, 'F');
          tocY = MARGIN + 14;
        }

        doc.setFont('helvetica', 'normal');
        doc.setFontSize(8);
        doc.setTextColor(...COL_MUTED);
        doc.text('  ' + card.index + '  ', MARGIN + 10, tocY);

        doc.setFont('helvetica', 'normal');
        doc.setFontSize(8);
        doc.setTextColor(...COL_TEXT);
        doc.text(card.title, MARGIN + 22, tocY);

        doc.setFont('courier', 'normal');
        doc.setFontSize(7);
        doc.setTextColor(...COL_MUTED);
        doc.text(`${imagePageNum}`, PAGE_W - MARGIN - 2, tocY, { align: 'right' });

        imagePageNum++;
        tocY += 8;
      });

      tocY += 4;
    });

    addPageNum(pageNum++);

    /* ---------------------------------------------------------------
       IMAGE PAGES — one image per page
    --------------------------------------------------------------- */

    const totalImages = sections.reduce((acc, s) => acc + s.cards.length, 0);
    let imgIdx = 0;

    for (const section of sections) {
      for (const card of section.cards) {
        imgIdx++;
        setStatus(`Adding image ${imgIdx} of ${totalImages}…`);

        doc.addPage();
        fillBg(COL_BG);

        // Accent bar
        doc.setFillColor(...COL_ACCENT);
        doc.rect(0, 0, 6, PAGE_H, 'F');

        // Chapter label
        doc.setFont('courier', 'normal');
        doc.setFontSize(7);
        doc.setTextColor(...COL_AMBER);
        doc.text(section.label.toUpperCase() + '  ·  ' + section.title.toUpperCase(), MARGIN + 6, MARGIN + 8);

        // Card index badge
        doc.setFillColor(...COL_SURFACE);
        doc.roundedRect(MARGIN + 6, MARGIN + 11, 12, 7, 1.5, 1.5, 'F');
        doc.setFont('courier', 'bold');
        doc.setFontSize(7);
        doc.setTextColor(...COL_ACCENT);
        doc.text(card.index, MARGIN + 12, MARGIN + 16.5, { align: 'center' });

        // Title
        doc.setFont('times', 'bold');
        doc.setFontSize(13);
        doc.setTextColor(...COL_TEXT);
        doc.text(card.title, MARGIN + 22, MARGIN + 17);

        // Divider
        doc.setDrawColor(...COL_ACCENT);
        doc.setLineWidth(0.3);
        doc.line(MARGIN + 6, MARGIN + 21, PAGE_W - MARGIN, MARGIN + 21);

        // Load and embed image
        try {
          const imgData = await loadImageAsBase64(`images/${card.file}`);
          if (imgData) {
            const imgProps = doc.getImageProperties(imgData);
            const maxImgW = CONTENT_W - 6;
            const maxImgH = PAGE_H - MARGIN * 2 - 30;
            const ratio   = Math.min(maxImgW / imgProps.width, maxImgH / imgProps.height);
            const imgW    = imgProps.width  * ratio;
            const imgH    = imgProps.height * ratio;
            const imgX    = MARGIN + 6 + (maxImgW - imgW) / 2;
            const imgY    = MARGIN + 24;

            doc.addImage(imgData, 'JPEG', imgX, imgY, imgW, imgH);
          }
        } catch (err) {
          // Image failed to load — show placeholder
          const boxY = MARGIN + 24;
          doc.setFillColor(...COL_SURFACE);
          doc.rect(MARGIN + 6, boxY, CONTENT_W - 6, 80, 'F');
          doc.setFont('helvetica', 'normal');
          doc.setFontSize(8);
          doc.setTextColor(...COL_MUTED);
          doc.text('Image could not be loaded: ' + card.file, MARGIN + 6 + (CONTENT_W - 6) / 2, boxY + 42, { align: 'center' });
        }

        if (card.isNew) {
          doc.setFillColor(...COL_AMBER);
          doc.roundedRect(PAGE_W - MARGIN - 18, MARGIN + 6, 14, 6, 1, 1, 'F');
          doc.setFont('courier', 'bold');
          doc.setFontSize(6);
          doc.setTextColor(...COL_BG);
          doc.text('NEW', PAGE_W - MARGIN - 11, MARGIN + 10.5, { align: 'center' });
        }

        addPageNum(pageNum++);
      }
    }

    /* ---------------------------------------------------------------
       SAVE
    --------------------------------------------------------------- */

    setStatus('Saving PDF…');
    doc.save('Statistics_Probability_Quick_Revision_Notes.pdf');
    setStatus('PDF downloaded ✓');
    setTimeout(() => { if (statusEl) statusEl.textContent = 'Generate PDF ↓'; }, 3000);

  } catch (err) {
    console.error('PDF generation error:', err);
    if (statusEl) statusEl.textContent = 'Error — see console';
  }
}

/* =========================================================================
   HELPERS
   ========================================================================= */

/**
 * Load a script dynamically.
 */
function loadScript(src) {
  return new Promise((resolve, reject) => {
    if (document.querySelector(`script[src="${src}"]`)) { resolve(); return; }
    const s = document.createElement('script');
    s.src = src;
    s.onload  = resolve;
    s.onerror = reject;
    document.head.appendChild(s);
  });
}

/**
 * Fetch an image by relative path and return a base64 data URL.
 */
function loadImageAsBase64(src) {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.crossOrigin = 'anonymous';
    img.onload = () => {
      const canvas = document.createElement('canvas');
      canvas.width  = img.naturalWidth;
      canvas.height = img.naturalHeight;
      const ctx = canvas.getContext('2d');
      ctx.drawImage(img, 0, 0);
      try {
        resolve(canvas.toDataURL('image/jpeg', 0.92));
      } catch {
        reject(new Error('Canvas tainted'));
      }
    };
    img.onerror = () => reject(new Error(`Failed to load ${src}`));
    // Cache-bust to avoid CORS issues on some servers
    img.src = src + '?v=' + Date.now();
  });
}