interface VerseDisplayProps {
  reference: string;
  devanagari: string | null;
  transliteration: string | null;
}

export function VerseDisplay({ reference, devanagari, transliteration }: VerseDisplayProps) {
  return (
    <div className="bg-gradient-to-br from-saffron-50 to-earth-50 border border-earth-200 rounded-xl p-4 sm:p-6 mb-5">
      {/* Reference badge */}
      <div className="flex items-center justify-between mb-3">
        <span className="font-sans text-xs font-semibold text-saffron-700 bg-saffron-100 rounded-full px-3 py-1">
          Verse {reference}
        </span>
        <span className="text-earth-300 text-lg select-none">ॐ</span>
      </div>

      {/* Devanagari */}
      {devanagari && (
        <div className="font-devanagari text-lg sm:text-xl text-earth-900 leading-loose whitespace-pre-line mb-3">
          {devanagari}
        </div>
      )}

      {/* Divider */}
      {devanagari && transliteration && (
        <div className="flex items-center gap-3 mb-3">
          <div className="h-px flex-1 bg-earth-200" />
          <span className="text-saffron-300 text-xs">✦</span>
          <div className="h-px flex-1 bg-earth-200" />
        </div>
      )}

      {/* Transliteration */}
      {transliteration && (
        <div className="font-serif text-sm sm:text-base text-earth-700 leading-relaxed italic whitespace-pre-line">
          {transliteration}
        </div>
      )}
    </div>
  );
}
