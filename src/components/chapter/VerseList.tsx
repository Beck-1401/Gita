import Link from 'next/link';
import type { Verse } from '@/lib/types';

interface VerseListProps {
  chapterNum: number;
  verses: Verse[];
}

export function VerseList({ chapterNum, verses }: VerseListProps) {
  return (
    <div className="divide-y divide-earth-100">
      {verses.map((verse) => (
        <div key={verse.reference} className="py-4 px-4 sm:px-8">
          {/* Verse number + translation on same row, Go deeper at the end */}
          <div className="flex items-start gap-3">
            {/* Verse number — compact, stays at top-left */}
            <span className="font-sans text-xs font-semibold text-saffron-600 bg-saffron-50 rounded px-2 py-0.5 mt-1 flex-shrink-0 min-w-[3rem] text-center">
              {verse.reference}
            </span>

            {/* Translation text */}
            <div className="flex-1 min-w-0">
              {verse.translations.gemini && (
                <p className="font-serif text-base sm:text-lg text-ink leading-relaxed whitespace-pre-line">
                  {verse.translations.gemini}
                </p>
              )}
            </div>

            {/* Go deeper button — top-right, doesn't push text down */}
            <Link
              href={`/chapter/${chapterNum}/verse/${verse.verseNum}`}
              className="font-sans text-xs font-medium text-saffron-700 bg-saffron-50 border border-saffron-200 hover:bg-saffron-100 hover:border-saffron-300 transition-colors rounded-lg px-3 py-1 flex items-center gap-1 flex-shrink-0 mt-0.5"
            >
              <span className="hidden sm:inline">Go deeper</span>
              <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          </div>
        </div>
      ))}
    </div>
  );
}
