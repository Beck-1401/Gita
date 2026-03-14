import { useState, useCallback } from 'react'
import KurukshetraScene from './scene/KurukshetraScene'
import VersePanel from './components/VersePanel'
import IntroOverlay from './components/IntroOverlay'
import HUD from './components/HUD'

export default function App() {
  const [entered, setEntered] = useState(false)
  const [selectedCharacter, setSelectedCharacter] = useState(null)

  const handleSelect = useCallback((character) => {
    setSelectedCharacter(character)
  }, [])

  const handleClose = useCallback(() => {
    setSelectedCharacter(null)
  }, [])

  return (
    <div style={{ width: '100vw', height: '100vh', position: 'relative', overflow: 'hidden' }}>
      {/* 3D Canvas — always mounted so it loads in background */}
      <div style={{ position: 'absolute', inset: 0 }}>
        <KurukshetraScene
          selectedCharacter={selectedCharacter}
          onSelect={handleSelect}
        />
      </div>

      {/* Intro overlay */}
      {!entered && <IntroOverlay onEnter={() => setEntered(true)} />}

      {/* HUD */}
      {entered && <HUD hasSelection={!!selectedCharacter} />}

      {/* Verse panel — slides in from right */}
      <div
        style={{
          position: 'fixed',
          right: 0,
          top: 0,
          height: '100%',
          width: '100%',
          maxWidth: '440px',
          transform: selectedCharacter ? 'translateX(0)' : 'translateX(100%)',
          transition: 'transform 0.35s cubic-bezier(0.4, 0, 0.2, 1)',
          zIndex: 50,
          pointerEvents: selectedCharacter ? 'auto' : 'none',
        }}
      >
        {selectedCharacter && (
          <VersePanel character={selectedCharacter} onClose={handleClose} />
        )}
      </div>
    </div>
  )
}
