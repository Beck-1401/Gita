import { useEffect, useRef } from 'react'
import { verses } from '../data/verses'
export default function VersePanel({ character, onClose }) {
  const panelRef = useRef()

  useEffect(() => {
    const handler = (e) => { if (e.key === 'Escape') onClose() }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [onClose])

  if (!character) return null

  // Gather verse objects for this character
  const characterVerses = (character.verses || [])
    .map(id => verses.find(v => v.id === id))
    .filter(Boolean)

  const sideLabel = character.side === 'kaurava' ? 'Kaurava Army'
    : character.side === 'pandava' ? 'Pāṇḍava Army'
    : 'Center — Between Both Armies'

  const sideColor = character.side === 'kaurava' ? '#c0392b'
    : character.side === 'pandava' ? '#1a5276'
    : '#c8a84b'

  return (
    <div
      className="fixed right-0 top-0 h-full w-full max-w-md z-20 flex flex-col"
      style={{ background: 'linear-gradient(135deg, rgba(10,5,0,0.97) 0%, rgba(20,10,0,0.95) 100%)' }}
    >
      {/* Header */}
      <div className="flex items-start justify-between p-5 border-b border-yellow-900/40">
        <div>
          <div
            className="text-xs tracking-widest uppercase mb-1"
            style={{ color: sideColor, fontFamily: '"EB Garamond", serif' }}
          >
            {sideLabel}
          </div>
          <h2
            className="text-2xl font-medium text-yellow-100"
            style={{ fontFamily: '"EB Garamond", serif' }}
          >
            {character.name}
          </h2>
          <div
            className="text-lg text-yellow-300/70 mt-0.5"
            style={{ fontFamily: '"Noto Sans Devanagari", sans-serif' }}
          >
            {character.nameDevanagari}
          </div>
          <div
            className="text-sm text-yellow-100/50 mt-1 italic"
            style={{ fontFamily: '"EB Garamond", serif' }}
          >
            {character.role}
          </div>
        </div>
        <button
          onClick={onClose}
          className="text-yellow-100/40 hover:text-yellow-100 transition-colors text-2xl leading-none mt-1 ml-4"
          aria-label="Close"
        >
          ×
        </button>
      </div>

      {/* Scrollable content */}
      <div className="flex-1 overflow-y-auto p-5 space-y-5" ref={panelRef}>

        {/* Description */}
        <p
          className="text-yellow-100/80 text-sm leading-relaxed"
          style={{ fontFamily: '"EB Garamond", serif', fontSize: '1rem' }}
        >
          {character.description}
        </p>

        {/* Conch */}
        {character.conch && (
          <div className="rounded border border-yellow-700/30 p-3 bg-yellow-900/10">
            <div className="text-yellow-400 text-xs tracking-widest uppercase mb-1" style={{ fontFamily: '"EB Garamond", serif' }}>
              Named Conch (śaṅkha)
            </div>
            <div className="text-yellow-100 text-lg" style={{ fontFamily: '"EB Garamond", serif' }}>
              {character.conch}
            </div>
          </div>
        )}
        {character.conchNote && (
          <div className="rounded border border-yellow-700/20 p-3 bg-yellow-900/10">
            <div className="text-yellow-400 text-xs tracking-widest uppercase mb-1" style={{ fontFamily: '"EB Garamond", serif' }}>
              Conch Note
            </div>
            <div className="text-yellow-100/70 text-sm italic" style={{ fontFamily: '"EB Garamond", serif' }}>
              {character.conchNote}
            </div>
          </div>
        )}

        {/* Verses */}
        {characterVerses.length > 0 && (
          <div>
            <div className="text-yellow-400 text-xs tracking-widest uppercase mb-3" style={{ fontFamily: '"EB Garamond", serif' }}>
              Relevant Verses — BG Chapter 1
            </div>
            <div className="space-y-5">
              {characterVerses.map((v) => (
                <VerseEntry key={v.id} verse={v} />
              ))}
            </div>
          </div>
        )}

        {/* Kaṭha Upaniṣad intertext for chariot/Krishna/Arjuna */}
        {(character.id === 'krishna' || character.id === 'arjuna') && (
          <KathaIntertext />
        )}

        {/* Attribution */}
        <div className="text-yellow-100/25 text-xs pt-2 border-t border-yellow-900/20" style={{ fontFamily: '"EB Garamond", serif' }}>
          Sanskrit text per standard critical edition. English translations adapted from public domain sources (Ganguli, Telang). Transliteration in IAST.
        </div>
      </div>
    </div>
  )
}

function VerseEntry({ verse }) {
  return (
    <div className="border-l-2 border-yellow-700/40 pl-4 space-y-2">
      {/* Verse number */}
      <div className="text-yellow-500 text-xs tracking-wider" style={{ fontFamily: '"EB Garamond", serif' }}>
        BG {verse.verse}
      </div>

      {/* Devanāgarī */}
      <div
        className="text-yellow-100/90 leading-relaxed text-base"
        style={{ fontFamily: '"Noto Sans Devanagari", sans-serif', lineHeight: '1.8' }}
      >
        {verse.devanagari}
      </div>

      {/* IAST */}
      <div
        className="text-yellow-100/55 text-sm italic leading-relaxed"
        style={{ fontFamily: '"EB Garamond", serif' }}
      >
        {verse.iast}
      </div>

      {/* Translation */}
      <div
        className="text-yellow-100/80 text-sm leading-relaxed"
        style={{ fontFamily: '"EB Garamond", serif', fontSize: '0.95rem' }}
      >
        {verse.translation}
      </div>

      {/* Gloss */}
      {verse.gloss && (
        <div
          className="text-yellow-100/45 text-xs leading-relaxed italic"
          style={{ fontFamily: '"EB Garamond", serif' }}
        >
          {verse.gloss}
        </div>
      )}
    </div>
  )
}

function KathaIntertext() {
  return (
    <div className="rounded border border-blue-700/30 p-4 bg-blue-900/10 space-y-2">
      <div className="text-blue-300 text-xs tracking-widest uppercase" style={{ fontFamily: '"EB Garamond", serif' }}>
        Intertextual Note — Kaṭha Upaniṣad 1.3.3–4
      </div>
      <p className="text-blue-100/70 text-sm leading-relaxed" style={{ fontFamily: '"EB Garamond", serif' }}>
        The chariot with five horses carries a profound philosophical resonance. The Kaṭha Upaniṣad describes the Self (ātman) as the rider in a chariot (ratha), the body as the chariot itself, the intellect (buddhi) as the charioteer, the mind (manas) as the reins, and the five senses (indriya) as the five horses.
      </p>
      <p className="text-blue-100/70 text-sm leading-relaxed" style={{ fontFamily: '"EB Garamond", serif' }}>
        Kṛṣṇa-as-charioteer is the Gītā's embodiment of this metaphor: the divine intellect guiding the warrior-soul. The five white horses are the five senses that must be mastered. This is an intertextual allusion, not a claim from BG 1 itself.
      </p>
    </div>
  )
}
