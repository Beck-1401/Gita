import { notFound } from 'next/navigation';
import Link from 'next/link';
import type { Metadata } from 'next';
import { getSiteIndex, getChapterData, buildCommentaryContext } from '@/lib/data';
import { VerseDisplay } from '@/components/verse/VerseDisplay';
import { TranslatorToggle } from '@/components/verse/TranslatorToggle';
import { TranslationPanel } from '@/components/verse/TranslationPanel';
import { CommentarySection } from '@/components/verse/CommentarySection';
import { VerseNavigator } from '@/components/verse/VerseNavigator';
import { ChatWidget } from '@/components/chat/ChatWidget';

interface PageProps {
  params: Promise<{ chapterNum: string; verseNum: string }>;
}

export async function generateStaticParams() {
  const index = await getSiteIndex();
  const params: Array<{ chapterNum: string; verseNum: string }> = [];

  for (const ch of index.chapters) {
    const chapter = await getChapterData(ch.num);
    for (const verse of chapter.verses) {
      params.push({
        chapterNum: String(ch.num),
        verseNum: String(verse.verseNum),
      });
    }
  }

  return params;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { chapterNum, verseNum } = await params;
  const num = parseInt(chapterNum, 10);
  const vNum = parseInt(verseNum, 10);
  const chapter = await getChapterData(num);
  const verse = chapter.verses.find((v) => v.verseNum === vNum);
  if (!verse) return { title: 'Verse Not Found' };

  return {
    title: `Bhagavad Gita ${verse.reference} — ${chapter.title}`,
    description: verse.transliteration?.split('\n').slice(1).join(' ').slice(0, 160) ?? undefined,
  };
}

export default async function VersePage({ params }: PageProps) {
  const { chapterNum, verseNum } = await params;
  const chNum = parseInt(chapterNum, 10);
  const vNum = parseInt(verseNum, 10);

  if (isNaN(chNum) || isNaN(vNum)) notFound();

  const [siteIndex, chapter] = await Promise.all([
    getSiteIndex(),
    getChapterData(chNum),
  ]);

  const verse = chapter.verses.find((v) => v.verseNum === vNum);
  if (!verse) notFound();

  const commentaryContext = buildCommentaryContext(verse);

  // Navigation data
  const prevChapterInfo =
    chNum > 1 ? siteIndex.chapters.find((c) => c.num === chNum - 1) : undefined;
  const nextChapterInfo =
    chNum < 18 ? siteIndex.chapters.find((c) => c.num === chNum + 1) : undefined;

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 py-4 sm:py-6">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-1.5 font-sans text-xs text-earth-400 mb-3 flex-wrap">
        <Link href="/" className="hover:text-saffron-600 transition-colors">Chapters</Link>
        <span>/</span>
        <Link href={`/chapter/${chNum}`} className="hover:text-saffron-600 transition-colors truncate max-w-[140px] sm:max-w-none">
          {chapter.title}
        </Link>
        <span>/</span>
        <span className="text-ink">Verse {verse.reference}</span>
      </nav>

      {/* Verse navigator (top) */}
      <VerseNavigator
        chapterNum={chNum}
        verseNum={vNum}
        totalVerses={chapter.verseCount}
        prevChapter={prevChapterInfo?.num}
        prevChapterVerseCount={prevChapterInfo?.verseCount}
        nextChapter={nextChapterInfo?.num}
      />

      {/* Sanskrit text */}
      <VerseDisplay
        reference={verse.reference}
        devanagari={verse.devanagari}
        transliteration={verse.transliteration}
      />

      {/* Translator selection */}
      <TranslatorToggle />

      {/* Translations */}
      <TranslationPanel translations={verse.translations} />

      {/* Commentaries */}
      <CommentarySection commentaries={verse.commentaries} />

      {/* AI Chat */}
      <ChatWidget verseRef={verse.reference} commentaryContext={commentaryContext} />

      {/* Verse navigator (bottom) */}
      <VerseNavigator
        chapterNum={chNum}
        verseNum={vNum}
        totalVerses={chapter.verseCount}
        prevChapter={prevChapterInfo?.num}
        prevChapterVerseCount={prevChapterInfo?.verseCount}
        nextChapter={nextChapterInfo?.num}
      />
    </div>
  );
}
