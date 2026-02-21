import { getSiteIndex } from '@/lib/data';
import { ChapterGrid } from '@/components/chapter/ChapterGrid';

export default async function HomePage() {
  const index = await getSiteIndex();

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-12">
      {/* Hero */}
      <div className="text-center mb-12 sm:mb-16">
        <div className="font-devanagari text-saffron-500 text-3xl sm:text-4xl mb-4 leading-relaxed">
          श्रीमद्भगवद्गीता
        </div>
        <h1 className="font-serif text-3xl sm:text-5xl font-semibold text-ink mb-4">
          Bhagavad Gita
        </h1>
        <p className="font-serif text-base sm:text-xl text-earth-600 max-w-2xl mx-auto leading-relaxed">
          Explore the Song of God with multiple translations, classical commentaries from Śaṅkara,
          Rāmānuja, Madhva, and Madhusūdana — and ask your own questions with AI guidance.
        </p>
        <div className="flex items-center justify-center gap-3 mt-6 text-earth-400">
          <div className="h-px w-16 bg-earth-300" />
          <span className="text-saffron-400 text-lg">✦</span>
          <div className="h-px w-16 bg-earth-300" />
        </div>
      </div>

      {/* Stats */}
      <div className="flex flex-wrap justify-center gap-6 sm:gap-10 mb-10 sm:mb-12">
        <div className="text-center">
          <div className="font-serif text-2xl sm:text-3xl font-semibold text-saffron-600">18</div>
          <div className="font-sans text-xs sm:text-sm text-earth-600 uppercase tracking-wide">Chapters</div>
        </div>
        <div className="text-center">
          <div className="font-serif text-2xl sm:text-3xl font-semibold text-saffron-600">701</div>
          <div className="font-sans text-xs sm:text-sm text-earth-600 uppercase tracking-wide">Verses</div>
        </div>
        <div className="text-center">
          <div className="font-serif text-2xl sm:text-3xl font-semibold text-saffron-600">5</div>
          <div className="font-sans text-xs sm:text-sm text-earth-600 uppercase tracking-wide">Translations</div>
        </div>
        <div className="text-center">
          <div className="font-serif text-2xl sm:text-3xl font-semibold text-saffron-600">6</div>
          <div className="font-sans text-xs sm:text-sm text-earth-600 uppercase tracking-wide">Commentaries</div>
        </div>
      </div>

      {/* Chapter grid */}
      <ChapterGrid chapters={index.chapters} />
    </div>
  );
}
