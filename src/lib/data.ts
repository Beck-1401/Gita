import type { ChapterData, SiteIndex, Verse } from './types';

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || '';

export async function getSiteIndex(): Promise<SiteIndex> {
  // In SSG context, read from public/data directly
  if (typeof window === 'undefined') {
    const { readFile } = await import('fs/promises');
    const { join } = await import('path');
    const data = await readFile(join(process.cwd(), 'public', 'data', 'index.json'), 'utf-8');
    return JSON.parse(data);
  }
  const res = await fetch(`${BASE_URL}/data/index.json`);
  return res.json();
}

export async function getChapterData(chapterNum: number): Promise<ChapterData> {
  const filename = `chapter-${String(chapterNum).padStart(2, '0')}.json`;
  if (typeof window === 'undefined') {
    const { readFile } = await import('fs/promises');
    const { join } = await import('path');
    const data = await readFile(join(process.cwd(), 'public', 'data', filename), 'utf-8');
    return JSON.parse(data);
  }
  const res = await fetch(`${BASE_URL}/data/${filename}`);
  return res.json();
}

export async function getVerseData(chapterNum: number, verseNum: number): Promise<Verse | null> {
  const chapter = await getChapterData(chapterNum);
  return chapter.verses.find((v) => v.verseNum === verseNum) ?? null;
}

export function getVerseUrl(chapterNum: number, verseNum: number): string {
  return `/chapter/${chapterNum}/verse/${verseNum}`;
}

export function buildCommentaryContext(verse: Verse): string {
  const parts: string[] = [];

  if (verse.commentaries.sankara_english) {
    parts.push(`ŚAṄKARA (Gambhirananda translation):\n${verse.commentaries.sankara_english}`);
  }
  if (verse.commentaries.ramanuja_english) {
    parts.push(`RĀMĀNUJA (Adidevananda translation):\n${verse.commentaries.ramanuja_english}`);
  }
  if (verse.commentaries.sankara_sanskrit) {
    parts.push(`ŚAṄKARA (Sanskrit original):\n${verse.commentaries.sankara_sanskrit}`);
  }
  if (verse.commentaries.ramanuja_sanskrit) {
    parts.push(`RĀMĀNUJA (Sanskrit original):\n${verse.commentaries.ramanuja_sanskrit}`);
  }
  if (verse.commentaries.madhva_sanskrit) {
    parts.push(`MADHVA (Sanskrit):\n${verse.commentaries.madhva_sanskrit}`);
  }
  if (verse.commentaries.madhusudana_sanskrit) {
    parts.push(`MADHUSŪDANA SARASVATĪ (Sanskrit):\n${verse.commentaries.madhusudana_sanskrit}`);
  }

  return parts.length > 0
    ? parts.join('\n\n---\n\n')
    : 'No traditional commentaries are available in the database for this verse.';
}
