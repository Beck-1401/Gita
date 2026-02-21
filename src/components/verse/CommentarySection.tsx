'use client';

import { useState } from 'react';
import { usePreferences } from '@/store/preferences';
import {
  COMMENTARY_LABELS,
  COMMENTARY_TRADITION,
  ENGLISH_COMMENTARIES,
  SANSKRIT_COMMENTARIES,
} from '@/lib/constants';
import type { VerseCommentaries, CommentaryKey } from '@/lib/types';

interface AccordionItemProps {
  title: string;
  subtitle: string;
  content: string | null;
  isSelected: boolean;
  onToggle: () => void;
}

function AccordionItem({ title, subtitle, content, isSelected, onToggle }: AccordionItemProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div
      className={`border rounded-xl overflow-hidden transition-colors ${
        isSelected ? 'border-earth-300' : 'border-earth-100 opacity-60'
      }`}
    >
      <div className="flex items-center">
        {/* Commentary select toggle */}
        <button
          onClick={onToggle}
          className={`px-3 py-4 flex-shrink-0 transition-colors ${
            isSelected ? 'text-saffron-500' : 'text-earth-300'
          }`}
          title={isSelected ? 'Hide this commentary' : 'Show this commentary'}
          aria-label={isSelected ? 'Hide this commentary' : 'Show this commentary'}
        >
          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
            {isSelected ? (
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 14.5v-9l6 4.5-6 4.5z" />
            ) : (
              <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" fill="none" />
            )}
          </svg>
        </button>

        {/* Expand/collapse */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="flex-1 flex items-center justify-between px-4 py-4 text-left hover:bg-earth-50 transition-colors"
        >
          <div>
            <span className="font-sans text-sm font-semibold text-earth-800">{title}</span>
            <span className="font-sans text-xs text-earth-400 ml-2">{subtitle}</span>
          </div>
          <div className="flex items-center gap-2">
            {!content && (
              <span className="font-sans text-xs text-earth-400 italic">Not available</span>
            )}
            <svg
              className={`w-4 h-4 text-earth-400 transition-transform ${isOpen ? 'rotate-180' : ''}`}
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </div>
        </button>
      </div>

      {isOpen && (
        <div className="px-5 pb-5 border-t border-earth-100 bg-white/40">
          {content ? (
            <p className="font-serif text-base text-ink leading-relaxed mt-4 commentary-text">
              {content}
            </p>
          ) : (
            <p className="font-serif text-sm text-earth-400 italic mt-4">
              Commentary for this verse is not yet available in the database.
            </p>
          )}
        </div>
      )}
    </div>
  );
}

interface CommentarySectionProps {
  commentaries: VerseCommentaries;
}

export function CommentarySection({ commentaries }: CommentarySectionProps) {
  const { selectedCommentaries, toggleCommentary } = usePreferences();

  return (
    <div className="mb-8">
      <h2 className="font-sans text-sm font-semibold text-earth-600 uppercase tracking-wide mb-4">
        Commentaries
      </h2>

      {/* English commentaries */}
      <div className="mb-4">
        <div className="font-sans text-xs text-earth-400 uppercase tracking-widest mb-2 px-1">
          English
        </div>
        <div className="space-y-2">
          {ENGLISH_COMMENTARIES.map((key: CommentaryKey) => (
            <AccordionItem
              key={key}
              title={COMMENTARY_LABELS[key]}
              subtitle={COMMENTARY_TRADITION[key]}
              content={commentaries[key]}
              isSelected={selectedCommentaries.includes(key)}
              onToggle={() => toggleCommentary(key)}
            />
          ))}
        </div>
      </div>

      {/* Sanskrit commentaries */}
      <div>
        <div className="font-sans text-xs text-earth-400 uppercase tracking-widest mb-2 px-1">
          Sanskrit Original
        </div>
        <div className="space-y-2">
          {SANSKRIT_COMMENTARIES.map((key: CommentaryKey) => (
            <AccordionItem
              key={key}
              title={COMMENTARY_LABELS[key]}
              subtitle={COMMENTARY_TRADITION[key]}
              content={commentaries[key]}
              isSelected={selectedCommentaries.includes(key)}
              onToggle={() => toggleCommentary(key)}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
