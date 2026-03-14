export default function HUD({ hasSelection }) {
  return (
    <>
      {/* Top-left title bar */}
      <div className="fixed top-4 left-4 z-10 pointer-events-none">
        <div
          className="text-yellow-100/70 text-sm"
          style={{ fontFamily: '"EB Garamond", serif', letterSpacing: '0.05em' }}
        >
          Kurukṣetra — BG Chapter 1
        </div>
        <div
          className="text-yellow-100/30 text-xs mt-0.5"
          style={{ fontFamily: '"EB Garamond", serif' }}
        >
          The pre-battle assembly
        </div>
      </div>

      {/* Bottom instruction bar */}
      {!hasSelection && (
        <div className="fixed bottom-5 left-1/2 -translate-x-1/2 z-10 pointer-events-none">
          <div
            className="px-5 py-2 rounded-full text-xs text-yellow-100/40 border border-yellow-900/30"
            style={{
              background: 'rgba(0,0,0,0.4)',
              fontFamily: '"EB Garamond", serif',
              letterSpacing: '0.05em',
            }}
          >
            Drag to rotate · Scroll to zoom · Click a warrior to read their verse
          </div>
        </div>
      )}

      {/* Legend */}
      <div className="fixed bottom-5 right-4 z-10 pointer-events-none space-y-1.5">
        <LegendItem color="#c0392b" label="Kaurava Army" />
        <LegendItem color="#1a5276" label="Pāṇḍava Army" />
        <LegendItem color="#c8a84b" label="Arjuna's Chariot" />
      </div>
    </>
  )
}

function LegendItem({ color, label }) {
  return (
    <div className="flex items-center gap-2 justify-end">
      <span
        className="text-yellow-100/30 text-xs"
        style={{ fontFamily: '"EB Garamond", serif' }}
      >
        {label}
      </span>
      <div className="w-2.5 h-2.5 rounded-full" style={{ background: color, opacity: 0.8 }} />
    </div>
  )
}
