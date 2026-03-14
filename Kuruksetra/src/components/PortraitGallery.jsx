import { useState } from 'react'

/**
 * PortraitGallery — Scrollable historical painting strip with lightbox.
 *
 * Displays miniature paintings from South Asian manuscript traditions
 * (Mughal Razmnama, Rajput, Pahari, Paithan Deccan schools) depicting
 * the Mahābhārata heroes. All images are public domain from open-access
 * museum collections.
 *
 * Usage: <PortraitGallery portraits={character.portraits} />
 * Returns null if portraits is empty or undefined.
 */
export default function PortraitGallery({ portraits }) {
  const [selected, setSelected] = useState(null)

  if (!portraits || portraits.length === 0) return null

  return (
    <>
      {/* ── Thumbnail strip ───────────────────────────────── */}
      <div>
        <div
          className="text-yellow-400 text-xs tracking-widest uppercase mb-3"
          style={{ fontFamily: '"EB Garamond", serif' }}
        >
          Historical Paintings
        </div>

        <div
          className="flex gap-2 overflow-x-auto pb-2"
          style={{ scrollbarWidth: 'thin', scrollbarColor: 'rgba(200,168,75,0.25) transparent' }}
        >
          {portraits.map((p, i) => (
            <button
              key={i}
              onClick={() => setSelected(p)}
              className="flex-shrink-0 rounded overflow-hidden border border-yellow-700/30 hover:border-yellow-500/60 transition-all duration-200 group relative focus:outline-none focus:ring-1 focus:ring-yellow-500/50"
              style={{ width: 100, height: 125 }}
              title={p.title}
              aria-label={`View painting: ${p.title}`}
            >
              <img
                src={p.url}
                alt={p.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                loading="lazy"
                onError={(e) => {
                  e.currentTarget.parentElement.style.display = 'none'
                }}
              />
              {/* Hover label */}
              <div
                className="absolute inset-0 bg-gradient-to-t from-black/75 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex items-end p-1.5"
              >
                <span
                  className="text-yellow-100 text-xs leading-tight"
                  style={{
                    fontFamily: '"EB Garamond", serif',
                    display: '-webkit-box',
                    WebkitLineClamp: 3,
                    WebkitBoxOrient: 'vertical',
                    overflow: 'hidden',
                  }}
                >
                  {p.title}
                </span>
              </div>
            </button>
          ))}
        </div>

        <p
          className="text-yellow-100/25 text-xs mt-2"
          style={{ fontFamily: '"EB Garamond", serif', fontStyle: 'italic' }}
        >
          Click any painting to view details and attribution · All works public domain
        </p>
      </div>

      {/* ── Lightbox ──────────────────────────────────────── */}
      {selected && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          style={{ background: 'rgba(0,0,0,0.93)' }}
          onClick={() => setSelected(null)}
          role="dialog"
          aria-modal="true"
          aria-label={selected.title}
        >
          <div
            className="relative max-w-xl w-full max-h-full overflow-y-auto rounded-lg"
            style={{
              background: 'linear-gradient(155deg, rgba(10,5,0,0.99) 0%, rgba(18,9,2,0.98) 100%)',
              border: '1px solid rgba(200,168,75,0.22)',
              boxShadow: '0 25px 80px rgba(0,0,0,0.8)',
            }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close button */}
            <button
              onClick={() => setSelected(null)}
              className="absolute top-3 right-3 z-10 w-8 h-8 flex items-center justify-center text-yellow-100/40 hover:text-yellow-100 text-2xl leading-none transition-colors"
              aria-label="Close"
            >
              ×
            </button>

            {/* Full image */}
            <div
              style={{
                background: '#060200',
                borderRadius: '0.5rem 0.5rem 0 0',
                overflow: 'hidden',
                lineHeight: 0,
              }}
            >
              <img
                src={selected.url}
                alt={selected.title}
                style={{
                  width: '100%',
                  maxHeight: '58vh',
                  objectFit: 'contain',
                  display: 'block',
                }}
              />
            </div>

            {/* Caption block */}
            <div className="p-5 space-y-4">
              <h3
                className="text-yellow-100 text-xl leading-snug pr-8"
                style={{ fontFamily: '"EB Garamond", serif' }}
              >
                {selected.title}
              </h3>

              {/* Metadata grid */}
              <dl
                className="gap-y-2.5 text-sm"
                style={{ display: 'grid', gridTemplateColumns: '7.5rem 1fr' }}
              >
                {selected.artist && (
                  <>
                    <dt className="text-yellow-500/55 text-xs uppercase tracking-wider self-start pt-0.5" style={{ fontFamily: '"EB Garamond", serif' }}>Artist</dt>
                    <dd className="text-yellow-100/85 m-0" style={{ fontFamily: '"EB Garamond", serif' }}>{selected.artist}</dd>
                  </>
                )}
                {selected.date && (
                  <>
                    <dt className="text-yellow-500/55 text-xs uppercase tracking-wider self-start pt-0.5" style={{ fontFamily: '"EB Garamond", serif' }}>Date</dt>
                    <dd className="text-yellow-100/85 m-0" style={{ fontFamily: '"EB Garamond", serif' }}>{selected.date}</dd>
                  </>
                )}
                {selected.school && (
                  <>
                    <dt className="text-yellow-500/55 text-xs uppercase tracking-wider self-start pt-0.5" style={{ fontFamily: '"EB Garamond", serif' }}>School / Style</dt>
                    <dd className="text-yellow-100/85 m-0" style={{ fontFamily: '"EB Garamond", serif' }}>{selected.school}</dd>
                  </>
                )}
                {selected.medium && (
                  <>
                    <dt className="text-yellow-500/55 text-xs uppercase tracking-wider self-start pt-0.5" style={{ fontFamily: '"EB Garamond", serif' }}>Medium</dt>
                    <dd className="text-yellow-100/85 m-0" style={{ fontFamily: '"EB Garamond", serif' }}>{selected.medium}</dd>
                  </>
                )}
                {selected.collection && (
                  <>
                    <dt className="text-yellow-500/55 text-xs uppercase tracking-wider self-start pt-0.5" style={{ fontFamily: '"EB Garamond", serif' }}>Collection</dt>
                    <dd className="text-yellow-100/85 m-0" style={{ fontFamily: '"EB Garamond", serif' }}>{selected.collection}</dd>
                  </>
                )}
              </dl>

              {/* Scholarly note */}
              {selected.note && (
                <p
                  className="text-yellow-100/60 text-sm leading-relaxed border-t border-yellow-900/30 pt-4"
                  style={{ fontFamily: '"EB Garamond", serif', fontStyle: 'italic' }}
                >
                  {selected.note}
                </p>
              )}

              <div
                className="text-yellow-100/18 text-xs"
                style={{ fontFamily: '"EB Garamond", serif' }}
              >
                Image courtesy open-access museum collection · Public domain
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
