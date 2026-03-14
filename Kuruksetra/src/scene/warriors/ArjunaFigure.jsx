/**
 * Arjuna — The Peerless Archer
 *
 * Muscular warrior build, the great Gāṇḍīva bow, golden kirīṭin diadem,
 * quiver on back, anguished expression (viṣāda — the despair of Ch. 1).
 * He is the emotional center of the entire text.
 */
import BaseFigure from './BaseFigure'
import { Bow, Conch } from '../../utils/bodyParts'

// Kirīṭin — Arjuna's iconic crowned diadem
function KiritiDiadem() {
  return (
    <group>
      {/* Base band */}
      <mesh>
        <cylinderGeometry args={[0.21, 0.24, 0.2, 10]} />
        <meshStandardMaterial color="#c8a84b" metalness={0.9} roughness={0.15} />
      </mesh>
      {/* Decorative rim */}
      <mesh position={[0, -0.08, 0]}>
        <torusGeometry args={[0.22, 0.02, 6, 16]} />
        <meshStandardMaterial color="#c8a84b" metalness={0.9} roughness={0.15} />
      </mesh>
      {/* Central peak — the kirīṭa */}
      <mesh position={[0, 0.2, 0]}>
        <coneGeometry args={[0.1, 0.35, 8]} />
        <meshStandardMaterial color="#c8a84b" metalness={0.9} roughness={0.15} />
      </mesh>
      {/* Central jewel (gift of Indra) */}
      <mesh position={[0, 0.12, 0.2]}>
        <sphereGeometry args={[0.04, 8, 8]} />
        <meshStandardMaterial color="#44cc66" metalness={0.5} roughness={0.2} emissive="#22aa44" emissiveIntensity={0.3} />
      </mesh>
      {/* Side wings */}
      {[-1, 1].map(side => (
        <group key={side}>
          <mesh position={[side * 0.22, 0.08, -0.02]} rotation={[0, 0, side * -0.3]}>
            <boxGeometry args={[0.12, 0.08, 0.02]} />
            <meshStandardMaterial color="#c8a84b" metalness={0.85} roughness={0.2} />
          </mesh>
          {/* Small gems */}
          <mesh position={[side * 0.18, 0, 0.18]}>
            <sphereGeometry args={[0.025, 6, 6]} />
            <meshStandardMaterial color="#cc2222" roughness={0.3} metalness={0.4} />
          </mesh>
        </group>
      ))}
    </group>
  )
}

// Quiver on back
function Quiver({ scale = 1 }) {
  return (
    <group rotation={[0.15, 0, 0.1]}>
      {/* Quiver body */}
      <mesh>
        <cylinderGeometry args={[0.06 * scale, 0.08 * scale, 0.6 * scale, 8]} />
        <meshStandardMaterial color="#6b3a00" roughness={0.7} />
      </mesh>
      {/* Strap */}
      <mesh position={[0.05 * scale, 0.15 * scale, 0.05 * scale]} rotation={[0, 0, -0.8]}>
        <cylinderGeometry args={[0.012 * scale, 0.012 * scale, 0.5 * scale, 4]} />
        <meshStandardMaterial color="#8b5a00" roughness={0.8} />
      </mesh>
      {/* Arrow tips visible */}
      {[-0.02, 0, 0.02, 0.01, -0.01].map((x, i) => (
        <mesh key={i} position={[x * scale, 0.33 * scale, (i * 0.008 - 0.015) * scale]}>
          <coneGeometry args={[0.012 * scale, 0.06 * scale, 4]} />
          <meshStandardMaterial color="#b0b0b0" metalness={0.7} roughness={0.3} />
        </mesh>
      ))}
      {/* Arrow shafts visible */}
      {[-0.02, 0, 0.02, 0.01, -0.01].map((x, i) => (
        <mesh key={`s${i}`} position={[x * scale, 0.28 * scale, (i * 0.008 - 0.015) * scale]}>
          <cylinderGeometry args={[0.004 * scale, 0.004 * scale, 0.08 * scale, 4]} />
          <meshStandardMaterial color="#5a4320" roughness={0.8} />
        </mesh>
      ))}
      {/* Gold trim */}
      <mesh position={[0, 0.25 * scale, 0]}>
        <torusGeometry args={[0.07 * scale, 0.01 * scale, 4, 8]} />
        <meshStandardMaterial color="#c8a84b" metalness={0.8} roughness={0.2} />
      </mesh>
    </group>
  )
}

export default function ArjunaFigure({ character }) {
  const totalH = character.height || 2.4

  return (
    <group>
      <BaseFigure
        bodyScale={1.05}
        totalHeight={totalH}
        muscleIntensity={0.7}        // Strong warrior build
        skinColor="#6b4423"
        armorColor="#b89440"          // Golden armor (Indra's gift)
        dhotiColor="#e8d5a0"
        rightArmPose="holding_bow"
        rightArmArmorColor="#b89440"
        leftArmPose="at_side"
        leftArmArmorColor="#b89440"
        faceOptions={{
          skinColor: '#6b4423',
          age: 'young',
          expression: 'anguished',     // viṣāda — the core emotion of Ch. 1
          eyeSize: 'normal',
          mustache: 'thin',
        }}
        headgear={<KiritiDiadem />}
        weapon={
          <group position={[0.5, totalH * 0.35, 0]} rotation={[0, 0, 0.25]}>
            <Bow radius={0.6} color="#b89440" scale={1.1} />
          </group>
        }
        backAccessory={<Quiver scale={1.05} />}
      >
        {/* Gold armlets — Arjuna's divine ornaments */}
        {[-1, 1].map(side => (
          <group key={side}>
            {/* Upper armlet */}
            <mesh position={[side * 0.3, totalH * 0.47, 0]}>
              <torusGeometry args={[0.1, 0.018, 6, 12]} />
              <meshStandardMaterial color="#c8a84b" metalness={0.9} roughness={0.15} />
            </mesh>
            {/* Wrist guard */}
            <mesh position={[side * 0.32, totalH * 0.38, 0]}>
              <cylinderGeometry args={[0.075, 0.08, 0.08, 8]} />
              <meshStandardMaterial color="#c8a84b" metalness={0.85} roughness={0.2} />
            </mesh>
          </group>
        ))}

        {/* Chest plate with embossed design */}
        <mesh position={[0, totalH * 0.43, 0.18]}>
          <sphereGeometry args={[0.08, 8, 6, 0, Math.PI * 2, 0, Math.PI * 0.5]} />
          <meshStandardMaterial color="#c8a84b" metalness={0.8} roughness={0.2} />
        </mesh>
      </BaseFigure>

      {/* Conch — Devadatta */}
      {character.conch && (
        <group position={[-0.4, totalH * 0.3, 0]}>
          <Conch scale={1.05} />
        </group>
      )}
    </group>
  )
}
