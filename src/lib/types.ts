export type TranslatorKey =
  | 'adidevananda'
  | 'gambhirananda'
  | 'zaehner'
  | 'sivananda'
  | 'bhaktivedanta'
  | 'gemini'
  | 'radhakrishnan'
  | 'stoller_miller';

export type CommentaryKey =
  | 'sankara_sanskrit'
  | 'ramanuja_sanskrit'
  | 'madhva_sanskrit'
  | 'madhusudana_sanskrit'
  | 'sankara_english'
  | 'ramanuja_english';

export interface VerseTranslations {
  adidevananda: string | null;
  gambhirananda: string | null;
  zaehner: string | null;
  sivananda: string | null;
  bhaktivedanta: string | null;
  gemini: string | null;
  radhakrishnan: string | null;
  stoller_miller: string | null;
}

export interface VerseCommentaries {
  sankara_sanskrit: string | null;
  ramanuja_sanskrit: string | null;
  madhva_sanskrit: string | null;
  madhusudana_sanskrit: string | null;
  sankara_english: string | null;
  ramanuja_english: string | null;
}

export interface Verse {
  reference: string;
  chapterNum: number;
  verseNum: number;
  devanagari: string | null;
  transliteration: string | null;
  translations: VerseTranslations;
  commentaries: VerseCommentaries;
}

export interface ChapterData {
  chapter: number;
  title: string;
  verseCount: number;
  verses: Verse[];
}

export interface ChapterIndex {
  num: number;
  title: string;
  verseCount: number;
}

export interface SiteIndex {
  chapters: ChapterIndex[];
}

export interface ChatMessage {
  role: 'user' | 'assistant';
  content: string;
}
