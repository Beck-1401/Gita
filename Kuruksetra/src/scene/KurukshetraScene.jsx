
import { Suspense } from 'react'
import { Canvas } from '@react-three/fiber'
import { Preload } from '@react-three/drei'
import Environment from './Environment'
import Chariot from './Chariot'
import WarriorFigure from './WarriorFigure'
import ArmyMass from './ArmyMass'
import WarElephant from './elements/WarElephant'
import { characters } from '../data/characters'
import CameraController from './CameraController'
import PalaceScene from './PalaceScene'

// Chariot "character" for click handling
const CHARIOT_CHARACTER = {
  id: 'chariot',
  name: 'The Divine Chariot',
  nameDevanagari: 'महती रथ',
  side: 'center',
  role: 'Yoked to White Horses / Kapidhvaja',
  verses: ['v1.14', 'v1.20', 'v1.21-22'],
  description: 'The great chariot (mahati syandane) yoked to white horses (śvetair hayair) is the visual center of the entire scene. Positioned between both armies at Arjuna\'s request, it carries Kṛṣṇa as charioteer and Arjuna as warrior. The Hanumān banner (kapidhvaja) streams above.',
  conch: null,
}

export default function KurukshetraScene({ selectedCharacter, onSelect }) {
  return (
    <Canvas
      shadows
      camera={{ position: [0, 8, 20], fov: 55, near: 0.1, far: 500 }}
      style={{ width: '100%', height: '100%' }}
      onPointerMissed={(e) => e.type === 'click' && onSelect(null)}
    >
      <Suspense fallback={null}>
        <Environment />

        {/* Army masses — background soldiers */}
        <ArmyMass side="kaurava" count={200} />
        <ArmyMass side="pandava" count={200} />

        {/* War elephants */}
        <WarElephant position={[-12, 0, -16]} rotation={[0, 0.3, 0]} scale={0.9} side="kaurava" />
        <WarElephant position={[10, 0, -18]} rotation={[0, -0.2, 0]} scale={0.85} side="kaurava" />
        <WarElephant position={[-11, 0, 16]} rotation={[0, Math.PI - 0.3, 0]} scale={0.9} side="pandava" />
        <WarElephant position={[12, 0, 17]} rotation={[0, Math.PI + 0.2, 0]} scale={0.85} side="pandava" />

        {/* Central chariot */}
        <Chariot
          onClick={() => onSelect(CHARIOT_CHARACTER)}
          onPointerOver={() => { document.body.style.cursor = 'pointer' }}
          onPointerOut={() => { document.body.style.cursor = 'auto' }}
        />

        {/* Named warriors */}
        {characters.map((char) => (
          <WarriorFigure
            key={char.id}
            character={char}
            onClick={onSelect}
            isSelected={selectedCharacter?.id === char.id}
          />
        ))}

        {/* ── Hastināpura Palace Scene ── */}
        <PalaceScene position={[60, 0.1, 80]} />

        <CameraController selectedCharacter={selectedCharacter} />

        <Preload all />
      </Suspense>
    </Canvas>
  )
}
