/**
 * Bhīṣma — The Grand Patriarch
 *
 * Aged commander, white-haired and white-bearded, silver armor,
 * tall and imposing despite his years. The "grandsire" (pitāmaha)
 * of both armies. Commander of the Kaurava forces.
 * His lion-roar signals the start of battle (1.12).
 */
import BaseFigure from './BaseFigure'
import { Bow, Shield, Conch } from '../../utils/bodyParts'

// Bhīṣma's tall silver commander helm
function PatriarchHelm() {
  return (
    <group>
      {/* Wide base — commander's authority */}
      <mesh>
        <cylinderGeometry args={[0.24, 0.28, 0.3, 10]} />
        <meshStandardMaterial color="#c0c8d0" metalness={0.85} roughness={0.2} />
      </mesh>
      {/* Decorative band */}
      <mesh position={[0, -0.12, 0]}>
        <torusGeometry args={[0.26, 0.025, 6, 16]} />
        <meshStandardMaterial color="#c8a84b" metalness={0.9} roughness={0.15} />
      </mesh>
      {/* Upper tier — tapered */}
      <mesh position={[0, 0.22, 0]}>
        <cylinderGeometry args={[0.14, 0.2, 0.2, 10]} />
        <meshStandardMaterial color="#c0c8d0" metalness={0.85} roughness={0.2} />
      </mesh>
      {/* Peak ornament */}
      <mesh position={[0, 0.38, 0]}>
        <sphereGeometry args={[0.06, 8, 8]} />
        <meshStandardMaterial color="#c8a84b" metalness={0.9} roughness={0.15} />
      </mesh>
      {/* White hair wisps visible beneath helm */}
      {[-0.2, -0.15, 0.15, 0.2].map((x, i) => (
        <mesh key={i} position={[x, -0.2, -0.08]} rotation={[0.2, 0, x * 0.3]}>
          <cylinderGeometry args={[0.008, 0.004, 0.2, 4]} />
          <meshStandardMaterial color="#e0e0e0" roughness={0.9} transparent opacity={0.7} />
        </mesh>
      ))}
    </group>
  )
}

export default function BhismaFigure({ character }) {
  const totalH = character.height || 2.8  // Tall, imposing

  return (
    <group>
      <BaseFigure
        bodyScale={1.15}              // Larger than most — commander stature
        totalHeight={totalH}
        muscleIntensity={0.3}          // Still strong despite age
        skinColor="#7a5a3a"            // Weathered, aged skin
        armorColor="#909aa8"           // Silver-grey armor
        dhotiColor="#d8d0c0"           // White/cream — purity, vows
        rightArmPose="at_side"
        rightArmArmorColor="#909aa8"
        leftArmPose="at_side"
        leftArmArmorColor="#909aa8"
        faceOptions={{
          skinColor: '#7a5a3a',
          age: 'elderly',               // Deep wrinkles, sunken features
          beard: 'white_long',          // Long flowing white beard
          mustache: 'white',            // Full white mustache
          expression: 'stern',          // Resolute duty despite inner conflict
          eyeSize: 'normal',
        }}
        headgear={<PatriarchHelm />}
        weapon={
          <group position={[0.55, totalH * 0.25, 0.1]} rotation={[0.1, 0, 0.15]}>
            <Bow radius={0.65} color="#6b5030" scale={1.15} />
          </group>
        }
      >
        {/* Silver shoulder guards — prominent pauldrons */}
        {[-1, 1].map(side => (
          <group key={side} position={[side * 0.35, totalH * 0.52, 0]}>
            {/* Pauldron plate */}
            <mesh rotation={[0, 0, side * 0.3]}>
              <sphereGeometry args={[0.12, 8, 6, 0, Math.PI * 2, 0, Math.PI * 0.5]} />
              <meshStandardMaterial color="#a0aab4" metalness={0.8} roughness={0.2} />
            </mesh>
            {/* Gold trim on pauldron */}
            <mesh position={[0, -0.02, 0]} rotation={[0, 0, side * 0.3]}>
              <torusGeometry args={[0.1, 0.012, 6, 12, Math.PI]} />
              <meshStandardMaterial color="#c8a84b" metalness={0.9} roughness={0.15} />
            </mesh>
          </group>
        ))}

        {/* Chest armor plate with gold sun emblem */}
        <mesh position={[0, totalH * 0.44, 0.2]}>
          <sphereGeometry args={[0.07, 8, 6, 0, Math.PI * 2, 0, Math.PI * 0.4]} />
          <meshStandardMaterial color="#c8a84b" metalness={0.85} roughness={0.2} />
        </mesh>

        {/* Belt / waist armor */}
        <mesh position={[0, totalH * 0.3, 0]}>
          <torusGeometry args={[0.25, 0.025, 6, 16]} />
          <meshStandardMaterial color="#909aa8" metalness={0.7} roughness={0.3} />
        </mesh>
        {/* Belt buckle */}
        <mesh position={[0, totalH * 0.3, 0.22]}>
          <boxGeometry args={[0.08, 0.06, 0.02]} />
          <meshStandardMaterial color="#c8a84b" metalness={0.9} roughness={0.15} />
        </mesh>

        {/* Arm guards */}
        {[-1, 1].map(side => (
          <mesh key={`ag${side}`} position={[side * 0.3, totalH * 0.42, 0]}>
            <cylinderGeometry args={[0.09, 0.095, 0.1, 8]} />
            <meshStandardMaterial color="#a0aab4" metalness={0.75} roughness={0.25} />
          </mesh>
        ))}

        {/* White cape / uttarīya draped over one shoulder */}
        <mesh position={[-0.15, totalH * 0.45, -0.1]} rotation={[0.1, 0.3, -0.15]}>
          <boxGeometry args={[0.35, 0.4, 0.02]} />
          <meshStandardMaterial color="#e8e4dc" roughness={0.95} transparent opacity={0.7} side={2} />
        </mesh>
      </BaseFigure>

      {/* Conch note — Bhīṣma doesn't have a named conch but roars like a lion */}
      {character.conch && (
        <group position={[-0.5, totalH * 0.3, 0]}>
          <Conch scale={1.15} />
        </group>
      )}
    </group>
  )
}
