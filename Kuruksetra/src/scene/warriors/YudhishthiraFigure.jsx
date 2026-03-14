/**
 * Yudhiṣṭhira — The Dharma King
 *
 * Eldest Pāṇḍava, embodiment of righteousness.
 * Simple, dignified white robes. Modest but regal crown.
 * Serene, composed face — the just ruler who abhors violence.
 * His conch Anantavijaya (1.16).
 */
import BaseFigure from './BaseFigure'
import { Conch } from '../../utils/bodyParts'

function DharmaKingCrown() {
  return (
    <group>
      {/* Simple elegant crown — less ostentatious than Duryodhana's */}
      <mesh>
        <cylinderGeometry args={[0.2, 0.23, 0.22, 10]} />
        <meshStandardMaterial color="#c8a84b" metalness={0.85} roughness={0.2} />
      </mesh>
      {/* Single central jewel — symbol of dharma */}
      <mesh position={[0, 0.05, 0.2]}>
        <sphereGeometry args={[0.035, 8, 8]} />
        <meshStandardMaterial color="#ffffff" metalness={0.4} roughness={0.2} emissive="#aaaaff" emissiveIntensity={0.2} />
      </mesh>
      {/* Modest peak */}
      <mesh position={[0, 0.16, 0]}>
        <coneGeometry args={[0.08, 0.12, 8]} />
        <meshStandardMaterial color="#c8a84b" metalness={0.85} roughness={0.2} />
      </mesh>
    </group>
  )
}

export default function YudhishthiraFigure({ character }) {
  const totalH = character.height || 2.5

  return (
    <group>
      <BaseFigure
        bodyScale={1.0}
        totalHeight={totalH}
        muscleIntensity={0.15}         // Lean, not a fighter's build
        skinColor="#6b4423"
        armorColor={null}              // No visible armor — robes of a king
        dhotiColor="#f0ead0"           // White/cream — purity, dharma
        rightArmPose="at_side"
        leftArmPose="at_side"
        faceOptions={{
          skinColor: '#6b4423',
          age: 'middle',
          expression: 'serene',         // Composed, just
          eyeSize: 'normal',
          mustache: 'thin',
        }}
        headgear={<DharmaKingCrown />}
      >
        {/* White royal uttarīya (shawl) draped across torso */}
        <mesh position={[-0.08, totalH * 0.42, 0.1]} rotation={[0, 0.3, -0.1]}>
          <boxGeometry args={[0.45, 0.55, 0.015]} />
          <meshStandardMaterial color="#f5f0e0" roughness={0.95} transparent opacity={0.6} side={2} />
        </mesh>

        {/* Simple gold necklace */}
        <mesh position={[0, totalH * 0.53, 0.1]}>
          <torusGeometry args={[0.12, 0.012, 6, 16, Math.PI]} />
          <meshStandardMaterial color="#c8a84b" metalness={0.85} roughness={0.2} />
        </mesh>

        {/* Modest armlets */}
        {[-1, 1].map(side => (
          <mesh key={side} position={[side * 0.26, totalH * 0.46, 0]}>
            <torusGeometry args={[0.08, 0.01, 6, 12]} />
            <meshStandardMaterial color="#c8a84b" metalness={0.8} roughness={0.25} />
          </mesh>
        ))}
      </BaseFigure>

      {/* Conch — Anantavijaya */}
      {character.conch && (
        <group position={[-0.35, totalH * 0.32, 0]}>
          <Conch scale={1.0} />
        </group>
      )}
    </group>
  )
}
