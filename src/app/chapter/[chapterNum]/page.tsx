import { notFound } from 'next/navigation';
import Link from 'next/link';
import type { Metadata } from 'next';
import { getSiteIndex, getChapterData } from '@/lib/data';
import { VerseList } from '@/components/chapter/VerseList';
import { CHAPTER_SUBTITLES } from '@/lib/constants';

interface PageProps {
  params: Promise<{ chapterNum: string }>;
}

export async function generateStaticParams() {
  const index = await getSiteIndex();
  return index.chapters.map((ch) => ({ chapterNum: String(ch.num) }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { chapterNum } = await params;
  const num = parseInt(chapterNum, 10);
  const chapter = await getChapterData(num);
  return {
    title: `Chapter ${num}: ${chapter.title} — Bhagavad Gita`,
    description: CHAPTER_SUBTITLES[num],
  };
}

export default async function ChapterPage({ params }: PageProps) {
  const { chapterNum } = await params;
  const num = parseInt(chapterNum, 10);
  if (isNaN(num) || num < 1 || num > 18) notFound();

  const chapter = await getChapterData(num);

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-10">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-2 font-sans text-sm text-earth-500 mb-8">
        <Link href="/" className="hover:text-saffron-600 transition-colors">
          Chapters
        </Link>
        <span>/</span>
        <span className="text-ink">Chapter {num}</span>
      </nav>

      {/* Chapter header */}
      <div className="mb-8">
        <div className="font-devanagari text-saffron-500 text-xl sm:text-2xl mb-2">अध्याय {num}</div>
        <h1 className="font-serif text-3xl sm:text-4xl font-semibold text-ink mb-2">{chapter.title}</h1>
        <p className="font-serif text-lg sm:text-xl text-earth-600 mb-4">{CHAPTER_SUBTITLES[num]}</p>
        <span className="font-sans text-sm text-earth-500 bg-earth-100 rounded-full px-3 py-1">
          {chapter.verseCount} verses
        </span>
      </div>

      {/* Chapter navigation */}
      <div className="flex items-center justify-between mb-6">
        {num > 1 ? (
          <Link
            href={`/chapter/${num - 1}`}
            className="font-sans text-sm text-earth-600 hover:text-saffron-600 flex items-center gap-1 transition-colors"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            <span className="hidden sm:inline">Chapter </span>{num - 1}
          </Link>
        ) : (
          <div />
        )}
        {num < 18 ? (
          <Link
            href={`/chapter/${num + 1}`}
            className="font-sans text-sm text-earth-600 hover:text-saffron-600 flex items-center gap-1 transition-colors"
          >
            <span className="hidden sm:inline">Chapter </span>{num + 1}
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        ) : (
          <div />
        )}
      </div>

      {/* Verse list */}
      <div className="border border-earth-200 rounded-xl overflow-hidden bg-white/50">
        <VerseList chapterNum={num} verses={chapter.verses} />
      </div>
    </div>
  );
}
