/**
 * Droṇa — The Teacher (Ācārya)
 *
 * Elderly brahmin warrior-teacher. Tilaka on forehead,
 * sacred thread (yajñopavīta) across chest, dignified bearing.
 * Despite being Kaurava commander, he taught the Pāṇḍavas archery.
 * Addressed reverently by Duryodhana (1.2-3).
 */
import BaseFigure from './BaseFigure'
import { Bow } from '../../utils/bodyParts'

function TeacherHelm() {
  return (
    <group>
      {/* Simple but dignified turban-like helm */}
      <mesh>
        <sphereGeometry args={[0.22, 10, 8, 0, Math.PI * 2, 0, Math.PI * 0.6]} />
        <meshStandardMaterial color="#e0d0b0" roughness={0.8} />
      </mesh>
      {/* Gold band */}
      <mesh position={[0, -0.05, 0]}>
        <torusGeometry args={[0.21, 0.015, 6, 16]} />
        <meshStandardMaterial color="#c8a84b" metalness={0.85} roughness={0.2} />
      </mesh>
      {/* Small jewel at front */}
      <mesh position={[0, 0.05, 0.2]}>
        <sphereGeometry args={[0.025, 6, 6]} />
        <meshStandardMaterial color="#cc8844" metalness={0.6} roughness={0.3} />
      </mesh>
      {/* White hair visible at sides */}
      {[-0.18, 0.18].map((x, i) => (
        <mesh key={i} position={[x, -0.12, -0.05]}>
          <cylinderGeometry args={[0.015, 0.008, 0.15, 4]} />
          <meshStandardMaterial color="#d8d8d8" roughness={0.9} />
        </mesh>
      ))}
    </group>
  )
}

export default function DronaFigure({ character }) {
  const totalH = character.height || 2.5

  return (
    <BaseFigure
      bodyScale={1.05}
      totalHeight={totalH}
      muscleIntensity={0.15}          // Lean, not bulky
      skinColor="#7a5a3a"
      armorColor="#705030"            // Modest brown-bronze armor
      dhotiColor="#e0d8c0"            // White — brahmin purity
      rightArmPose="holding_bow"
      rightArmArmorColor={null}       // Bare arm — teacher's simplicity
      leftArmPose="at_side"
      leftArmArmorColor={null}
      faceOptions={{
        skinColor: '#7a5a3a',
        age: 'elderly',
        beard: 'white_short',
        mustache: 'white',
        tilaka: true,                  // Brahmin forehead mark
        expression: 'stern',
      }}
      headgear={<TeacherHelm />}
      weapon={
        <group position={[0.45, totalH * 0.3, 0.05]} rotation={[0.1, 0, 0.2]}>
          <Bow radius={0.55} color="#6b5030" scale={1.0} />
        </group>
      }
    >
      {/* Sacred thread (yajñopavīta) — thin cord from left shoulder to right hip */}
      <group>
        {[0, 0.04, 0.08, 0.12, 0.16, 0.2, 0.24, 0.28].map((t, i) => {
          const x = -0.15 + t * 1.1
          const y = totalH * 0.5 - t * 0.6
          const z = 0.12 + Math.sin(t * Math.PI) * 0.04
          return (
            <mesh key={i} position={[x, y, z]}>
              <sphereGeometry args={[0.008, 4, 4]} />
              <meshStandardMaterial color="#f0e8c8" roughness={0.9} />
            </mesh>
          )
        })}
      </group>

      {/* Simple gold earrings */}
      {[-1, 1].map(side => (
        <mesh key={side} position={[side * 0.2, totalH * 0.62, 0]}>
          <torusGeometry args={[0.025, 0.006, 4, 8]} />
          <meshStandardMaterial color="#c8a84b" metalness={0.85} roughness={0.2} />
        </mesh>
      ))}

      {/* Waist cord */}
      <mesh position={[0, totalH * 0.28, 0]}>
        <torusGeometry args={[0.22, 0.012, 4, 16]} />
        <meshStandardMaterial color="#c8a84b" metalness={0.7} roughness={0.3} />
      </mesh>
    </BaseFigure>
  )
}
