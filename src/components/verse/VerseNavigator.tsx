'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

interface VerseNavigatorProps {
  chapterNum: number;
  verseNum: number;
  totalVerses: number;
  prevChapter?: number;
  prevChapterVerseCount?: number;
  nextChapter?: number;
}

export function VerseNavigator({
  chapterNum,
  verseNum,
  totalVerses,
  prevChapter,
  prevChapterVerseCount,
  nextChapter,
}: VerseNavigatorProps) {
  const router = useRouter();

  const prevHref =
    verseNum > 1
      ? `/chapter/${chapterNum}/verse/${verseNum - 1}`
      : prevChapter && prevChapterVerseCount
      ? `/chapter/${prevChapter}/verse/${prevChapterVerseCount}`
      : null;

  const nextHref =
    verseNum < totalVerses
      ? `/chapter/${chapterNum}/verse/${verseNum + 1}`
      : nextChapter
      ? `/chapter/${nextChapter}/verse/1`
      : null;

  // Keyboard navigation
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      const tag = (e.target as HTMLElement).tagName;
      if (tag === 'INPUT' || tag === 'TEXTAREA') return;
      if (e.key === 'ArrowLeft' && prevHref) router.push(prevHref);
      if (e.key === 'ArrowRight' && nextHref) router.push(nextHref);
    };
    document.addEventListener('keydown', handleKey);
    return () => document.removeEventListener('keydown', handleKey);
  }, [prevHref, nextHref, router]);

  return (
    <div className="flex items-center justify-between py-4 border-t border-earth-200 mt-4 mb-8">
      {/* Previous */}
      {prevHref ? (
        <Link
          href={prevHref}
          className="flex items-center gap-2 font-sans text-sm text-earth-600 hover:text-saffron-600 transition-colors group"
        >
          <svg
            className="w-5 h-5 group-hover:-translate-x-0.5 transition-transform"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          <span>
            {verseNum > 1 ? `Verse ${verseNum - 1}` : `Ch. ${prevChapter} · Last Verse`}
          </span>
        </Link>
      ) : (
        <div />
      )}

      {/* Position indicator */}
      <div className="text-center">
        <div className="font-sans text-xs text-earth-400 uppercase tracking-wide">
          Chapter {chapterNum}
        </div>
        <div className="font-serif text-sm text-earth-600">
          Verse {verseNum} of {totalVerses}
        </div>
      </div>

      {/* Next */}
      {nextHref ? (
        <Link
          href={nextHref}
          className="flex items-center gap-2 font-sans text-sm text-earth-600 hover:text-saffron-600 transition-colors group"
        >
          <span>
            {verseNum < totalVerses ? `Verse ${verseNum + 1}` : `Ch. ${nextChapter} · Verse 1`}
          </span>
          <svg
            className="w-5 h-5 group-hover:translate-x-0.5 transition-transform"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </Link>
      ) : (
        <div />
      )}
    </div>
  );
}
