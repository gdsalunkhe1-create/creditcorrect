import * as pdfjsLib from "pdfjs-dist";
import pdfjsWorker from "pdfjs-dist/build/pdf.worker.min.mjs?url";

pdfjsLib.GlobalWorkerOptions.workerSrc = pdfjsWorker;

// Groups pdf.js text items into visual rows using their actual (x, y) page
// coordinates, rather than trusting content-stream emission order (which
// doesn't reliably match reading order on grid-based bureau reports).
function reconstructPageText(textContent, viewportHeight) {
  const items = textContent.items
    .filter((it) => it.str !== undefined)
    .map((it) => ({
      str: it.str,
      x: it.transform[4],
      y: viewportHeight - it.transform[5], // flip to top-down
    }));

  if (items.length === 0) return "";

  items.sort((a, b) => a.y - b.y || a.x - b.x);

  const rows = [];
  const rowTolerance = 3; // px
  let currentRow = [];
  let currentY = items[0].y;

  for (const item of items) {
    if (Math.abs(item.y - currentY) > rowTolerance) {
      rows.push(currentRow);
      currentRow = [];
      currentY = item.y;
    }
    currentRow.push(item);
  }
  if (currentRow.length) rows.push(currentRow);

  return rows
    .map((row) => row.sort((a, b) => a.x - b.x).map((i) => i.str).join(" "))
    .join("\n");
}

/**
 * Extracts text from a PDF File/Blob, page by page, preserving visual
 * row order. Returns { text, pageCount, emptyPages }.
 */
export async function extractTextFromPDF(file) {
  const arrayBuffer = await file.arrayBuffer();
  const pdf = await pdfjsLib.getDocument({ data: arrayBuffer }).promise;

  let fullText = "";
  const emptyPages = [];

  for (let pageNum = 1; pageNum <= pdf.numPages; pageNum++) {
    const page = await pdf.getPage(pageNum);
    const viewport = page.getViewport({ scale: 1 });
    const textContent = await page.getTextContent();
    const pageText = reconstructPageText(textContent, viewport.height);

    if (pageText.trim().length < 20) {
      emptyPages.push(pageNum);
    }

    fullText += pageText + "\n";
  }

  return { text: fullText, pageCount: pdf.numPages, emptyPages };
}
