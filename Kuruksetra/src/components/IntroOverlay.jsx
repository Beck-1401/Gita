export default function IntroOverlay({ onEnter }) {
  return (
    <div
      className="fixed inset-0 z-30 flex flex-col items-center justify-center text-center"
      style={{ background: 'linear-gradient(180deg, #1a0a00 0%, #0a0500 60%, #000000 100%)' }}
    >
      {/* Sanskrit title */}
      <div
        className="text-yellow-300/60 text-lg mb-2"
        style={{ fontFamily: '"Noto Sans Devanagari", sans-serif', letterSpacing: '0.1em' }}
      >
        धर्मक्षेत्रे कुरुक्षेत्रे
      </div>

      {/* IAST */}
      <div
        className="text-yellow-200/40 text-sm mb-8 italic"
        style={{ fontFamily: '"EB Garamond", serif' }}
      >
        dharmakṣetre kurukṣetre — BG 1.1
      </div>

      {/* Main title */}
      <h1
        className="text-yellow-100 mb-3"
        style={{
          fontFamily: '"EB Garamond", serif',
          fontSize: 'clamp(2.2rem, 6vw, 4rem)',
          fontWeight: 500,
          letterSpacing: '0.05em',
        }}
      >
        Kurukṣetra
      </h1>

      <p
        className="text-yellow-100/50 mb-2 max-w-sm"
        style={{ fontFamily: '"EB Garamond", serif', fontSize: '1.1rem' }}
      >
        An Interactive Visualization of Bhagavadgītā Chapter 1
      </p>

      <p
        className="text-yellow-100/30 mb-10 max-w-xs text-sm italic"
        style={{ fontFamily: '"EB Garamond", serif' }}
      >
        The pre-battle assembly at the field of dharma — Arjuna's chariot stands between two armies.
      </p>

      {/* Enter button */}
      <button
        onClick={onEnter}
        className="px-8 py-3 border border-yellow-700/50 text-yellow-200 hover:bg-yellow-900/30 hover:border-yellow-500 transition-all duration-300 rounded-sm"
        style={{ fontFamily: '"EB Garamond", serif', fontSize: '1.1rem', letterSpacing: '0.1em' }}
      >
        Enter the Field
      </button>

      {/* Instructions preview */}
      <div className="mt-8 text-yellow-100/25 text-xs space-y-1" style={{ fontFamily: '"EB Garamond", serif' }}>
        <div>Drag to rotate · Scroll to zoom · Click warriors to read verses</div>
      </div>

      {/* Course attribution */}
      <div className="absolute bottom-5 text-yellow-100/20 text-xs" style={{ fontFamily: '"EB Garamond", serif' }}>
        THEO 1432 · Boston College · bradbannon.com
      </div>
    </div>
  )
}
