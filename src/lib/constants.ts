import type { TranslatorKey, CommentaryKey } from './types';

export const TRANSLATOR_LABELS: Record<TranslatorKey, string> = {
  adidevananda: 'Adidevananda',
  gambhirananda: 'Gambhirananda',
  zaehner: 'Zaehner',
  sivananda: 'Sivananda',
  bhaktivedanta: 'Bhaktivedanta',
  gemini: 'Brad',
  radhakrishnan: 'Radhakrishnan',
  stoller_miller: 'Stoller Miller',
};

export const TRANSLATOR_TRADITION: Record<TranslatorKey, string> = {
  adidevananda: 'Vishishtadvaita',
  gambhirananda: 'Advaita',
  zaehner: 'Jesuit',
  sivananda: 'Vedanta',
  bhaktivedanta: 'Vaishnava',
  gemini: 'Original Translation',
  radhakrishnan: 'Neo-Vedanta',
  stoller_miller: 'Literary',
};

export const ALL_TRANSLATORS: TranslatorKey[] = [
  'gemini',
  'stoller_miller',
  'zaehner',
  'gambhirananda',
  'adidevananda',
  'sivananda',
];

export const DEFAULT_TRANSLATORS: TranslatorKey[] = [
  'gemini',
  'stoller_miller',
  'zaehner',
  'gambhirananda',
  'adidevananda',
  'sivananda',
];

export const COMMENTARY_LABELS: Record<CommentaryKey, string> = {
  sankara_english: 'Śaṅkara (Gambhirananda)',
  ramanuja_english: 'Rāmānuja (Adidevananda)',
  sankara_sanskrit: 'Śaṅkara (Sanskrit)',
  ramanuja_sanskrit: 'Rāmānuja (Sanskrit)',
  madhva_sanskrit: 'Madhva (Sanskrit)',
  madhusudana_sanskrit: 'Madhusūdana Sarasvatī (Sanskrit)',
};

export const COMMENTARY_TRADITION: Record<CommentaryKey, string> = {
  sankara_english: 'Advaita Vedanta',
  ramanuja_english: 'Vishishtadvaita',
  sankara_sanskrit: 'Advaita Vedanta',
  ramanuja_sanskrit: 'Vishishtadvaita',
  madhva_sanskrit: 'Dvaita Vedanta',
  madhusudana_sanskrit: 'Advaita Vedanta',
};

export const ENGLISH_COMMENTARIES: CommentaryKey[] = [
  'sankara_english',
  'ramanuja_english',
];

export const SANSKRIT_COMMENTARIES: CommentaryKey[] = [
  'sankara_sanskrit',
  'ramanuja_sanskrit',
  'madhva_sanskrit',
  'madhusudana_sanskrit',
];

export const DEFAULT_COMMENTARIES: CommentaryKey[] = [
  'sankara_english',
  'ramanuja_english',
];

export const CHAPTER_TITLES: Record<number, string> = {
  1: 'Arjuna Vishada Yoga',
  2: 'Sankhya Yoga',
  3: 'Karma Yoga',
  4: 'Jnana Karma Sanyasa Yoga',
  5: 'Karma Sanyasa Yoga',
  6: 'Dhyana Yoga',
  7: 'Jnana Vijnana Yoga',
  8: 'Aksara Brahma Yoga',
  9: 'Raja Vidya Raja Guhya Yoga',
  10: 'Vibhuti Yoga',
  11: 'Visvarupa Darsana Yoga',
  12: 'Bhakti Yoga',
  13: 'Ksetra Ksetrajna Vibhaga Yoga',
  14: 'Gunatraya Vibhaga Yoga',
  15: 'Purusottama Yoga',
  16: 'Daivasura Sampad Vibhaga Yoga',
  17: 'Sraddhatraya Vibhaga Yoga',
  18: 'Moksha Sanyasa Yoga',
};

export const CHAPTER_SUBTITLES: Record<number, string> = {
  1: 'The Yoga of Arjuna\'s Despondency',
  2: 'The Yoga of Knowledge',
  3: 'The Yoga of Action',
  4: 'The Yoga of Renunciation of Action in Knowledge',
  5: 'The Yoga of Renunciation',
  6: 'The Yoga of Meditation',
  7: 'The Yoga of Knowledge and Wisdom',
  8: 'The Yoga of the Imperishable Brahman',
  9: 'The Yoga of Royal Knowledge and Royal Secret',
  10: 'The Yoga of Divine Manifestations',
  11: 'The Yoga of the Vision of the Universal Form',
  12: 'The Yoga of Devotion',
  13: 'The Yoga of the Field and its Knower',
  14: 'The Yoga of the Division of the Three Qualities',
  15: 'The Yoga of the Supreme Person',
  16: 'The Yoga of the Division between the Divine and Demoniacal',
  17: 'The Yoga of the Threefold Faith',
  18: 'The Yoga of Liberation through Renunciation',
};
