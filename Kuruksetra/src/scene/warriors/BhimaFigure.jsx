/**
 * Bhīma — The Mighty
 *
 * Massive, hulking warrior — the strongest of all.
 * Oversized body, huge mace (gadā), fierce expression.
 * His conch Pauṇḍra's blast is terrible (1.15).
 * Visually the most physically imposing figure on the field.
 */
import BaseFigure from './BaseFigure'
import { Mace, Conch } from '../../utils/bodyParts'

function WarriorHelm() {
  return (
    <group>
      {/* Broad, heavy helmet */}
      <mesh>
        <sphereGeometry args={[0.26, 10, 8, 0, Math.PI * 2, 0, Math.PI * 0.55]} />
        <meshStandardMaterial color="#3a5a8b" metalness={0.7} roughness={0.3} />
      </mesh>
      {/* Nose guard */}
      <mesh position={[0, -0.08, 0.22]} rotation={[0.3, 0, 0]}>
        <boxGeometry args={[0.03, 0.12, 0.02]} />
        <meshStandardMaterial color="#3a5a8b" metalness={0.7} roughness={0.3} />
      </mesh>
      {/* Crest — lion motif */}
      <mesh position={[0, 0.18, -0.04]} rotation={[-0.2, 0, 0]}>
        <boxGeometry args={[0.04, 0.18, 0.15]} />
        <meshStandardMaterial color="#cc3333" roughness={0.7} />
      </mesh>
      {/* Gold band */}
      <mesh position={[0, -0.06, 0]}>
        <torusGeometry args={[0.25, 0.02, 6, 16]} />
        <meshStandardMaterial color="#c8a84b" metalness={0.9} roughness={0.15} />
      </mesh>
    </group>
  )
}

export default function BhimaFigure({ character }) {
  const totalH = character.height || 3.0  // Tallest warrior

  return (
    <group>
      <BaseFigure
        bodyScale={1.4}               // MASSIVE — biggest figure on the field
        totalHeight={totalH}
        muscleIntensity={1.0}          // Maximum muscular build
        skinColor="#5a3a1a"
        armorColor="#1a3a6b"           // Dark blue — Pāṇḍava
        dhotiColor="#b8a070"           // Rough, battle-worn
        rightArmPose="holding_weapon"
        rightArmArmorColor="#1a3a6b"
        leftArmPose="akimbo"          // Confident stance
        leftArmArmorColor="#1a3a6b"
        faceOptions={{
          skinColor: '#5a3a1a',
          age: 'young',
          expression: 'fierce',         // Ferocious — Vṛkodara (wolf-belly)
          eyeSize: 'normal',
          mustache: 'full',
        }}
        headgear={<WarriorHelm />}
        weapon={
          <group position={[0.6, totalH * 0.12, 0.08]} rotation={[0.05, 0, 0.12]}>
            <Mace length={1.6} headSize={0.22} color="#444" scale={1.3} />
          </group>
        }
      >
        {/* Extra-wide chest plate */}
        <mesh position={[0, totalH * 0.44, 0.22]}>
          <boxGeometry args={[0.35, 0.2, 0.03]} />
          <meshStandardMaterial color="#1a4a7b" metalness={0.6} roughness={0.3} />
        </mesh>

        {/* Heavy shoulder guards */}
        {[-1, 1].map(side => (
          <group key={side} position={[side * 0.45, totalH * 0.52, 0]}>
            <mesh rotation={[0, 0, side * 0.2]}>
              <sphereGeometry args={[0.14, 8, 6, 0, Math.PI * 2, 0, Math.PI * 0.5]} />
              <meshStandardMaterial color="#1a3a6b" metalness={0.7} roughness={0.3} />
            </mesh>
            {/* Spike on pauldron */}
            <mesh position={[side * 0.06, 0.08, 0]} rotation={[0, 0, side * 0.4]}>
              <coneGeometry args={[0.03, 0.1, 6]} />
              <meshStandardMaterial color="#888" metalness={0.8} roughness={0.2} />
            </mesh>
          </group>
        ))}

        {/* Thick arm bands */}
        {[-1, 1].map(side => (
          <mesh key={`ab${side}`} position={[side * 0.38, totalH * 0.46, 0]}>
            <torusGeometry args={[0.13, 0.025, 6, 12]} />
            <meshStandardMaterial color="#c8a84b" metalness={0.85} roughness={0.2} />
          </mesh>
        ))}

        {/* Thick belt */}
        <mesh position={[0, totalH * 0.29, 0]}>
          <torusGeometry args={[0.33, 0.03, 6, 16]} />
          <meshStandardMaterial color="#8b5a00" roughness={0.6} metalness={0.3} />
        </mesh>
      </BaseFigure>

      {/* Conch — Pauṇḍra */}
      {character.conch && (
        <group position={[-0.55, totalH * 0.3, 0]}>
          <Conch scale={1.3} />
        </group>
      )}
    </group>
  )
}
