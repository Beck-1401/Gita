'use client';

import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { TranslatorKey, CommentaryKey } from '@/lib/types';
import { DEFAULT_TRANSLATORS, DEFAULT_COMMENTARIES } from '@/lib/constants';

interface PreferencesState {
  selectedTranslators: TranslatorKey[];
  selectedCommentaries: CommentaryKey[];
  toggleTranslator: (key: TranslatorKey) => void;
  toggleCommentary: (key: CommentaryKey) => void;
  setTranslators: (keys: TranslatorKey[]) => void;
  setCommentaries: (keys: CommentaryKey[]) => void;
}

export const usePreferences = create<PreferencesState>()(
  persist(
    (set) => ({
      selectedTranslators: DEFAULT_TRANSLATORS,
      selectedCommentaries: DEFAULT_COMMENTARIES,

      toggleTranslator: (key) =>
        set((state) => ({
          selectedTranslators: state.selectedTranslators.includes(key)
            ? state.selectedTranslators.filter((k) => k !== key)
            : [...state.selectedTranslators, key],
        })),

      toggleCommentary: (key) =>
        set((state) => ({
          selectedCommentaries: state.selectedCommentaries.includes(key)
            ? state.selectedCommentaries.filter((k) => k !== key)
            : [...state.selectedCommentaries, key],
        })),

      setTranslators: (keys) => set({ selectedTranslators: keys }),
      setCommentaries: (keys) => set({ selectedCommentaries: keys }),
    }),
    {
      name: 'gita-preferences',
    }
  )
);
