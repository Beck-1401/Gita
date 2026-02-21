/**
 * Build-time script: Converts GitaDatabase.xlsx to JSON files in public/data/
 * Run with: node scripts/convert-excel.mjs
 */

import { readFile, mkdir, writeFile } from 'fs/promises';
import { existsSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, '..');
const EXCEL_PATH = 'G:\\My Drive\\Mitra\\Gita\\GitaDatabase.xlsx';
// Output to the project's public/data directory (resolve relative to this script's location)
const OUTPUT_DIR = join(ROOT, 'public', 'data');

// Placeholder strings that mean "no data yet"
const PLACEHOLDERS = new Set([
  'to come', 'supersite', 'ocr', 'have pdf', 'have book', 'tbd', 'n/a', 'na',
]);

function sanitize(value) {
  if (value === null || value === undefined) return null;
  const str = String(value).trim();
  if (str === '') return null;
  const lower = str.toLowerCase();
  if (PLACEHOLDERS.has(lower)) return null;
  if (lower.startsWith('have pdf') || lower.startsWith('have book')) return null;
  if (lower.startsWith('ocr')) return null;
  return str;
}

// Reference pattern: digits.digits (e.g. "1.01", "18.78")
const REF_PATTERN = /^\d+\.\d+$/;

const CHAPTER_TITLES = [
  '', // 1-indexed
  'Arjuna Vishada Yoga',
  'Sankhya Yoga',
  'Karma Yoga',
  'Jnana Karma Sanyasa Yoga',
  'Karma Sanyasa Yoga',
  'Dhyana Yoga',
  'Jnana Vijnana Yoga',
  'Aksara Brahma Yoga',
  'Raja Vidya Raja Guhya Yoga',
  'Vibhuti Yoga',
  'Visvarupa Darsana Yoga',
  'Bhakti Yoga',
  'Ksetra Ksetrajna Vibhaga Yoga',
  'Gunatraya Vibhaga Yoga',
  'Purusottama Yoga',
  'Daivasura Sampad Vibhaga Yoga',
  'Sraddhatraya Vibhaga Yoga',
  'Moksha Sanyasa Yoga',
];

async function main() {
  // Dynamically import xlsx (ESM-compatible)
  let XLSX;
  try {
    XLSX = (await import('xlsx')).default;
  } catch {
    console.error('ERROR: xlsx package not found. Run: npm install xlsx');
    process.exit(1);
  }

  console.log('Reading Excel file...');
  const workbook = XLSX.readFile(EXCEL_PATH, { dense: true });
  const sheetName = workbook.SheetNames[0];
  const sheet = workbook.Sheets[sheetName];

  // Convert to array of arrays (AOA)
  const aoa = XLSX.utils.sheet_to_json(sheet, { header: 1, defval: null });

  console.log(`Total rows in sheet: ${aoa.length}`);

  // Skip rows 0 and 1 (header rows). Data starts at row index 2.
  const dataRows = aoa.slice(2);

  // Column indices (0-based):
  // 0: chapterNum, 1: verseNum, 2: reference
  // 3: devanagari, 4: transliteration
  // 5: adidevananda, 6: gambhirananda, 7: zaehner, 8: sivananda, 9: bhaktivedanta, 10: gemini, 11: radhakrishnan
  // 12: sankara_sanskrit, 13: ramanuja_sanskrit, 14: madhva_sanskrit, 15: madhusudana_sanskrit
  // 18: sankara_english, 19: ramanuja_english

  const chapters = {};

  let verseCount = 0;
  for (const row of dataRows) {
    if (!row || row.length < 3) continue;
    const ref = sanitize(row[2]);
    if (!ref || !REF_PATTERN.test(ref)) continue;

    const chapterNum = parseInt(String(row[0]).trim(), 10);
    const verseNum = parseInt(String(row[1]).trim(), 10);
    if (isNaN(chapterNum) || isNaN(verseNum)) continue;

    // Build reference from chapter/verse numbers so trailing zeros are never lost
    // (Excel stores "2.10" as the float 2.1, stripping the trailing zero)
    const reference = `${chapterNum}.${String(verseNum).padStart(2, '0')}`;

    const verse = {
      reference,
      chapterNum,
      verseNum,
      devanagari: sanitize(row[3]),
      transliteration: sanitize(row[4]),
      translations: {
        adidevananda: sanitize(row[5]),
        gambhirananda: sanitize(row[6]),
        zaehner: sanitize(row[7]),
        sivananda: sanitize(row[8]),
        bhaktivedanta: sanitize(row[9]),
        gemini: sanitize(row[10]),
        radhakrishnan: sanitize(row[11]),
      },
      commentaries: {
        sankara_sanskrit: sanitize(row[12]),
        ramanuja_sanskrit: sanitize(row[13]),
        madhva_sanskrit: sanitize(row[14]),
        madhusudana_sanskrit: sanitize(row[15]),
        sankara_english: sanitize(row[18]),
        ramanuja_english: sanitize(row[19]),
      },
    };

    if (!chapters[chapterNum]) {
      chapters[chapterNum] = [];
    }
    chapters[chapterNum].push(verse);
    verseCount++;
  }

  console.log(`Parsed ${verseCount} verses across ${Object.keys(chapters).length} chapters`);

  // Ensure output directory exists
  await mkdir(OUTPUT_DIR, { recursive: true });

  // Write per-chapter files
  const indexChapters = [];
  for (const [chNum, verses] of Object.entries(chapters)) {
    const num = parseInt(chNum, 10);
    const chapterData = {
      chapter: num,
      title: CHAPTER_TITLES[num] || `Chapter ${num}`,
      verseCount: verses.length,
      verses,
    };
    const filename = `chapter-${String(num).padStart(2, '0')}.json`;
    await writeFile(join(OUTPUT_DIR, filename), JSON.stringify(chapterData, null, 2), 'utf-8');
    console.log(`  Wrote ${filename} (${verses.length} verses)`);

    indexChapters.push({
      num,
      title: CHAPTER_TITLES[num] || `Chapter ${num}`,
      verseCount: verses.length,
    });
  }

  // Sort index by chapter number
  indexChapters.sort((a, b) => a.num - b.num);

  // Write index
  await writeFile(
    join(OUTPUT_DIR, 'index.json'),
    JSON.stringify({ chapters: indexChapters }, null, 2),
    'utf-8'
  );
  console.log(`  Wrote index.json`);
  console.log(`Done! ${verseCount} verses written to ${OUTPUT_DIR}`);
}

main().catch((err) => {
  console.error('Conversion failed:', err);
  process.exit(1);
});
