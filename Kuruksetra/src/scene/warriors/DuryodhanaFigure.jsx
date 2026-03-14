/**
 * Duryodhana — The Antagonist Prince
 *
 * Proud, ornately dressed, red and gold armor.
 * Multi-tiered crown showing royal pretension.
 * Mace in hand (his weapon of choice). Stern, imperious bearing.
 * He is the one surveying the armies and speaking to Droṇa (1.2-11).
 */
import BaseFigure from './BaseFigure'
import { Mace } from '../../utils/bodyParts'

function ImperialCrown() {
  return (
    <group>
      {/* Base tier — wide, ornate */}
      <mesh>
        <cylinderGeometry args={[0.22, 0.26, 0.18, 10]} />
        <meshStandardMaterial color="#c8a84b" metalness={0.9} roughness={0.15} />
      </mesh>
      {/* Second tier */}
      <mesh position={[0, 0.14, 0]}>
        <cylinderGeometry args={[0.17, 0.2, 0.14, 10]} />
        <meshStandardMaterial color="#c8a84b" metalness={0.9} roughness={0.15} />
      </mesh>
      {/* Third tier */}
      <mesh position={[0, 0.25, 0]}>
        <cylinderGeometry args={[0.12, 0.15, 0.1, 10]} />
        <meshStandardMaterial color="#c8a84b" metalness={0.9} roughness={0.15} />
      </mesh>
      {/* Peak jewel */}
      <mesh position={[0, 0.35, 0]}>
        <sphereGeometry args={[0.05, 8, 8]} />
        <meshStandardMaterial color="#cc2222" metalness={0.5} roughness={0.2} emissive="#881111" emissiveIntensity={0.3} />
      </mesh>
      {/* Rim jewels */}
      {[0, 1, 2, 3, 4, 5].map(i => {
        const angle = (i / 6) * Math.PI * 2
        return (
          <mesh key={i} position={[Math.cos(angle) * 0.23, -0.05, Math.sin(angle) * 0.23]}>
            <sphereGeometry args={[0.02, 6, 6]} />
            <meshStandardMaterial color={i % 2 === 0 ? '#cc2222' : '#22aa44'} roughness={0.3} metalness={0.4} />
          </mesh>
        )
      })}
    </group>
  )
}

export default function DuryodhanaFigure({ character }) {
  const totalH = character.height || 2.4

  return (
    <BaseFigure
      bodyScale={1.05}
      totalHeight={totalH}
      muscleIntensity={0.4}
      skinColor="#6b4423"
      armorColor="#8b1a1a"           // Deep red — Kaurava
      dhotiColor="#c89040"           // Rich gold
      rightArmPose="holding_weapon"
      rightArmArmorColor="#8b1a1a"
      leftArmPose="akimbo"          // Proud, hand on hip
      leftArmArmorColor="#8b1a1a"
      faceOptions={{
        skinColor: '#6b4423',
        age: 'young',
        expression: 'stern',          // Imperious
        eyeSize: 'narrow',           // Calculating look
        mustache: 'thin',
      }}
      headgear={<ImperialCrown />}
      weapon={
        <group position={[0.45, totalH * 0.15, 0.05]} rotation={[0.1, 0, 0.15]}>
          <Mace length={1.3} headSize={0.16} color="#555" scale={1.05} />
        </group>
      }
    >
      {/* Ornate chest plate */}
      <mesh position={[0, totalH * 0.44, 0.18]}>
        <sphereGeometry args={[0.08, 8, 6, 0, Math.PI * 2, 0, Math.PI * 0.4]} />
        <meshStandardMaterial color="#c8a84b" metalness={0.85} roughness={0.2} />
      </mesh>

      {/* Heavy gold necklace */}
      <mesh position={[0, totalH * 0.52, 0.08]}>
        <torusGeometry args={[0.15, 0.02, 6, 16, Math.PI]} />
        <meshStandardMaterial color="#c8a84b" metalness={0.9} roughness={0.15} />
      </mesh>

      {/* Gold armlets */}
      {[-1, 1].map(side => (
        <mesh key={side} position={[side * 0.3, totalH * 0.47, 0]}>
          <torusGeometry args={[0.1, 0.018, 6, 12]} />
          <meshStandardMaterial color="#c8a84b" metalness={0.9} roughness={0.15} />
        </mesh>
      ))}

      {/* Red cape */}
      <mesh position={[0, totalH * 0.42, -0.15]} rotation={[0.1, 0, 0]}>
        <boxGeometry args={[0.5, 0.55, 0.02]} />
        <meshStandardMaterial color="#6b1010" roughness={0.9} transparent opacity={0.6} side={2} />
      </mesh>
    </BaseFigure>
  )
}
