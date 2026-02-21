'use client';

import { usePreferences } from '@/store/preferences';
import { TRANSLATOR_LABELS, TRANSLATOR_TRADITION } from '@/lib/constants';
import type { VerseTranslations, TranslatorKey } from '@/lib/types';

interface TranslationPanelProps {
  translations: VerseTranslations;
}

export function TranslationPanel({ translations }: TranslationPanelProps) {
  const { selectedTranslators } = usePreferences();

  const visibleTranslations = selectedTranslators.filter(
    (key) => translations[key] !== null
  );

  if (selectedTranslators.length === 0) {
    return (
      <div className="text-center py-12 text-earth-500 font-serif italic">
        Select at least one translation above to display.
      </div>
    );
  }

  if (visibleTranslations.length === 0) {
    return (
      <div className="text-center py-12 text-earth-500 font-serif italic">
        No translations available for the selected translators.
      </div>
    );
  }

  return (
    <div className="space-y-3 mb-5">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-3">
        {visibleTranslations.map((key: TranslatorKey) => {
          const text = translations[key];
          if (!text) return null;
          const isPrimary = key === 'gemini';
          return (
            <div
              key={key}
              className={`rounded-lg border p-4 ${
                isPrimary
                  ? 'border-saffron-300 bg-saffron-50/40'
                  : 'border-earth-200 bg-white/60'
              }`}
            >
              <div className="flex items-baseline justify-between mb-2 gap-2">
                <span className={`font-sans text-xs font-semibold ${isPrimary ? 'text-saffron-800' : 'text-earth-700'}`}>
                  {TRANSLATOR_LABELS[key]}
                </span>
                <span className="font-sans text-[10px] text-earth-400 flex-shrink-0">{TRANSLATOR_TRADITION[key]}</span>
              </div>
              <p className="font-serif text-sm sm:text-base text-ink leading-relaxed whitespace-pre-line">{text}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
}
