import Link from 'next/link';
import type { ChapterIndex } from '@/lib/types';
import { CHAPTER_SUBTITLES } from '@/lib/constants';

const CHAPTER_COLORS = [
  'from-saffron-50 to-saffron-100',
  'from-lotus-50 to-lotus-100',
  'from-earth-50 to-earth-100',
  'from-saffron-50 to-earth-100',
  'from-lotus-50 to-saffron-100',
  'from-earth-50 to-lotus-100',
];

interface ChapterGridProps {
  chapters: ChapterIndex[];
}

export function ChapterGrid({ chapters }: ChapterGridProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {chapters.map((ch) => (
        <Link
          key={ch.num}
          href={`/chapter/${ch.num}`}
          className={`group relative rounded-xl border border-earth-200 bg-gradient-to-br ${
            CHAPTER_COLORS[(ch.num - 1) % CHAPTER_COLORS.length]
          } p-6 hover:border-saffron-400 hover:shadow-md transition-all duration-200`}
        >
          <div className="flex items-start justify-between mb-3">
            <span className="font-devanagari text-saffron-500 text-lg font-medium">
              अध्याय {ch.num}
            </span>
            <span className="font-sans text-xs text-earth-500 bg-white/60 rounded-full px-2 py-0.5">
              {ch.verseCount} verses
            </span>
          </div>
          <h2 className="font-serif text-xl font-semibold text-ink group-hover:text-saffron-700 transition-colors mb-1">
            Chapter {ch.num}
          </h2>
          <p className="font-serif text-base font-semibold text-earth-700 mb-2">{ch.title}</p>
          <p className="font-sans text-sm text-earth-600 leading-relaxed">
            {CHAPTER_SUBTITLES[ch.num]}
          </p>
          <div className="mt-4 flex items-center gap-1 text-saffron-600 font-sans text-sm font-medium group-hover:gap-2 transition-all">
            Read chapter
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </div>
        </Link>
      ))}
    </div>
  );
}
