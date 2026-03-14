/**
 * Kṛṣṇa — Divine Charioteer
 *
 * Blue skin, peacock-feather crown (mukuṭa), yellow silk dhoti,
 * flute tucked in waistband, serene half-smile, divine blue aura.
 * The most visually distinctive figure on the field.
 */
import BaseFigure from './BaseFigure'
import { Conch } from '../../utils/bodyParts'

// Peacock Crown — ornate golden mukuṭa with peacock feather
function PeacockCrown() {
  return (
    <group>
      {/* Base crown cylinder */}
      <mesh>
        <cylinderGeometry args={[0.2, 0.24, 0.35, 10]} />
        <meshStandardMaterial color="#c8a84b" metalness={0.9} roughness={0.15} />
      </mesh>
      {/* Crown rim — decorative band */}
      <mesh position={[0, -0.15, 0]}>
        <torusGeometry args={[0.22, 0.025, 6, 16]} />
        <meshStandardMaterial color="#c8a84b" metalness={0.9} roughness={0.15} />
      </mesh>
      {/* Upper rim */}
      <mesh position={[0, 0.12, 0]}>
        <torusGeometry args={[0.18, 0.02, 6, 16]} />
        <meshStandardMaterial color="#c8a84b" metalness={0.9} roughness={0.15} />
      </mesh>
      {/* Central jewel */}
      <mesh position={[0, 0, 0.2]}>
        <sphereGeometry args={[0.04, 8, 8]} />
        <meshStandardMaterial color="#2255cc" metalness={0.5} roughness={0.2} emissive="#1133aa" emissiveIntensity={0.3} />
      </mesh>

      {/* Peacock feather — tall plume */}
      <group position={[0, 0.25, -0.05]} rotation={[-0.15, 0, 0]}>
        {/* Feather shaft */}
        <mesh>
          <cylinderGeometry args={[0.008, 0.005, 0.7, 4]} />
          <meshStandardMaterial color="#2a5a20" roughness={0.8} />
        </mesh>
        {/* Feather eye — the iconic peacock "eye" */}
        <group position={[0, 0.28, 0.02]}>
          {/* Outer green */}
          <mesh>
            <sphereGeometry args={[0.07, 8, 6]} />
            <meshStandardMaterial color="#1a6b3a" roughness={0.6} />
          </mesh>
          {/* Inner blue */}
          <mesh position={[0, 0, 0.03]}>
            <sphereGeometry args={[0.045, 8, 6]} />
            <meshStandardMaterial color="#1a3aaa" roughness={0.5} emissive="#0a1a55" emissiveIntensity={0.2} />
          </mesh>
          {/* Central gold dot */}
          <mesh position={[0, 0, 0.05]}>
            <sphereGeometry args={[0.02, 6, 6]} />
            <meshStandardMaterial color="#c8a84b" metalness={0.8} roughness={0.2} />
          </mesh>
        </group>
        {/* Feather barbs — thin fins */}
        {[-0.12, -0.06, 0, 0.06, 0.12, 0.18, 0.24].map((y, i) => (
          <mesh key={i} position={[0, y, 0.01]} rotation={[0, 0, (i % 2 === 0 ? 0.2 : -0.2)]}>
            <boxGeometry args={[0.04 + i * 0.005, 0.005, 0.06]} />
            <meshStandardMaterial
              color={i > 3 ? '#1a6b3a' : '#2a7a4a'}
              roughness={0.7}
              transparent
              opacity={0.8}
            />
          </mesh>
        ))}
      </group>

      {/* Side ornaments */}
      {[-1, 1].map(side => (
        <mesh key={side} position={[side * 0.2, 0.05, 0]}>
          <sphereGeometry args={[0.025, 6, 6]} />
          <meshStandardMaterial color="#cc3333" roughness={0.3} metalness={0.4} />
        </mesh>
      ))}
    </group>
  )
}

// Flute (vaṃśī) — tucked in waistband
function Flute({ scale = 1 }) {
  return (
    <group rotation={[0.2, 0.5, 0.8]}>
      {/* Bamboo tube */}
      <mesh>
        <cylinderGeometry args={[0.018 * scale, 0.02 * scale, 0.5 * scale, 8]} />
        <meshStandardMaterial color="#8b7340" roughness={0.7} />
      </mesh>
      {/* Finger holes */}
      {[0.08, 0.03, -0.02, -0.07, -0.12, -0.17].map((y, i) => (
        <mesh key={i} position={[0.018 * scale, y * scale, 0]}>
          <sphereGeometry args={[0.006 * scale, 4, 4]} />
          <meshStandardMaterial color="#3a2800" roughness={0.9} />
        </mesh>
      ))}
      {/* Gold bands */}
      {[-0.2, 0, 0.15].map((y, i) => (
        <mesh key={i} position={[0, y * scale, 0]}>
          <torusGeometry args={[0.02 * scale, 0.004 * scale, 4, 8]} />
          <meshStandardMaterial color="#c8a84b" metalness={0.8} roughness={0.2} />
        </mesh>
      ))}
    </group>
  )
}

export default function KrishnaFigure({ character }) {
  const totalH = character.height || 2.5

  return (
    <group>
      <BaseFigure
        bodyScale={1.0}
        totalHeight={totalH}
        muscleIntensity={0.2}
        skinColor="#2a5a8b"       // Blue-toned skin — divine
        armorColor={null}          // No armor — he's a charioteer, wears silk
        dhotiColor="#e8c840"        // Bright yellow silk pītāmbara
        leftArmPose="at_side"
        rightArmPose="at_side"
        faceOptions={{
          skinTint: '#3366aa',      // Distinctly blue face
          age: 'young',
          expression: 'serene',
          eyeSize: 'large',         // Large lotus eyes (padma-nayana)
          eyeColor: '#1a0a00',
        }}
        headgear={<PeacockCrown />}
        accessory={
          <group position={[0.18, totalH * 0.25, 0.1]}>
            <Flute scale={1} />
          </group>
        }
      >
        {/* Vaijayantī garland — flower garland across chest */}
        <group position={[0, totalH * 0.4, 0.12]}>
          {[...Array(8)].map((_, i) => {
            const angle = (i / 8) * Math.PI * 0.6 - Math.PI * 0.3
            return (
              <mesh key={i} position={[Math.sin(angle) * 0.2, Math.cos(angle) * 0.15 - 0.1, 0]}>
                <sphereGeometry args={[0.025, 5, 5]} />
                <meshStandardMaterial
                  color={i % 3 === 0 ? '#ff6688' : i % 3 === 1 ? '#ffffff' : '#ffaa44'}
                  roughness={0.9}
                />
              </mesh>
            )
          })}
        </group>

        {/* Gold waistband / kaustubha jewel hint */}
        <mesh position={[0, totalH * 0.28, 0.15]}>
          <sphereGeometry args={[0.035, 6, 6]} />
          <meshStandardMaterial color="#2255cc" metalness={0.6} roughness={0.2} emissive="#1133aa" emissiveIntensity={0.4} />
        </mesh>

        {/* Gold armlets */}
        {[-1, 1].map(side => (
          <mesh key={side} position={[side * 0.28, totalH * 0.46, 0]}>
            <torusGeometry args={[0.09, 0.015, 6, 12]} />
            <meshStandardMaterial color="#c8a84b" metalness={0.9} roughness={0.15} />
          </mesh>
        ))}

        {/* Divine blue glow */}
        <pointLight position={[0, totalH * 0.45, 0]} intensity={0.6} color="#4488ff" distance={4} />
      </BaseFigure>

      {/* Conch — Pāñcajanya */}
      {character.conch && (
        <group position={[-0.4, totalH * 0.32, 0]}>
          <Conch scale={1} />
        </group>
      )}
    </group>
  )
}
