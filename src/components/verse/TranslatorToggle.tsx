'use client';

import { usePreferences } from '@/store/preferences';
import { ALL_TRANSLATORS, TRANSLATOR_LABELS, TRANSLATOR_TRADITION } from '@/lib/constants';
import type { TranslatorKey } from '@/lib/types';

export function TranslatorToggle() {
  const { selectedTranslators, toggleTranslator, setTranslators } = usePreferences();

  const selectAll = () => setTranslators([...ALL_TRANSLATORS]);
  const selectNone = () => setTranslators([]);

  return (
    <div className="bg-white/60 border border-earth-200 rounded-xl px-4 py-3 mb-5">
      <div className="flex items-center gap-4 flex-wrap">
        <span className="font-sans text-xs font-semibold text-earth-500 uppercase tracking-wide flex-shrink-0">
          Translations
        </span>

        {ALL_TRANSLATORS.map((key: TranslatorKey) => {
          const isSelected = selectedTranslators.includes(key);
          return (
            <label
              key={key}
              className="flex items-center gap-1.5 cursor-pointer group"
            >
              <input
                type="checkbox"
                checked={isSelected}
                onChange={() => toggleTranslator(key)}
                className="w-3.5 h-3.5 accent-saffron-500 cursor-pointer"
              />
              <span className={`font-sans text-sm leading-none ${isSelected ? 'text-ink' : 'text-earth-400'}`}>
                {TRANSLATOR_LABELS[key]}
              </span>
            </label>
          );
        })}

        <div className="flex items-center gap-2 ml-auto flex-shrink-0">
          <button onClick={selectAll} className="font-sans text-xs text-saffron-600 hover:text-saffron-700 transition-colors">
            All
          </button>
          <span className="text-earth-300 text-xs">|</span>
          <button onClick={selectNone} className="font-sans text-xs text-earth-400 hover:text-earth-600 transition-colors">
            None
          </button>
        </div>
      </div>
    </div>
  );
}
