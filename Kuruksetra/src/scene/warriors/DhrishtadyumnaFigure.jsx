/**
 * Dhṛṣṭadyumna — The Pāṇḍava Field Marshal
 *
 * Young, born from fire, destined to kill Droṇa.
 * Field commander (vyūha organizer) of the Pāṇḍava army.
 * Military bearing, battle-ready, armored.
 * Mentioned prominently at 1.17.
 */
import BaseFigure from './BaseFigure'
import { Sword, Shield } from '../../utils/bodyParts'

function CommanderCrest() {
  return (
    <group>
      {/* Battle helm */}
      <mesh>
        <sphereGeometry args={[0.22, 10, 8, 0, Math.PI * 2, 0, Math.PI * 0.55]} />
        <meshStandardMaterial color="#2a4a7a" metalness={0.75} roughness={0.25} />
      </mesh>
      {/* Tall plume crest — field marshal insignia */}
      <mesh position={[0, 0.22, -0.04]} rotation={[-0.15, 0, 0]}>
        <boxGeometry args={[0.025, 0.3, 0.1]} />
        <meshStandardMaterial color="#cc3333" roughness={0.7} />
      </mesh>
      {/* Gold band */}
      <mesh position={[0, -0.04, 0]}>
        <torusGeometry args={[0.21, 0.015, 6, 16]} />
        <meshStandardMaterial color="#c8a84b" metalness={0.9} roughness={0.15} />
      </mesh>
      {/* Cheek guards */}
      {[-1, 1].map(side => (
        <mesh key={side} position={[side * 0.18, -0.12, 0.06]}>
          <boxGeometry args={[0.04, 0.12, 0.02]} />
          <meshStandardMaterial color="#2a4a7a" metalness={0.7} roughness={0.3} />
        </mesh>
      ))}
    </group>
  )
}

export default function DhrishtadyumnaFigure({ character }) {
  const totalH = character.height || 2.4

  return (
    <BaseFigure
      bodyScale={1.05}
      totalHeight={totalH}
      muscleIntensity={0.5}
      skinColor="#5a3a1a"
      armorColor="#1a3a6b"
      dhotiColor="#c0b080"
      rightArmPose="holding_weapon"
      rightArmArmorColor="#1a3a6b"
      leftArmPose="holding_weapon"
      leftArmArmorColor="#1a3a6b"
      faceOptions={{
        skinColor: '#5a3a1a',
        age: 'young',
        expression: 'fierce',
        eyeSize: 'normal',
      }}
      headgear={<CommanderCrest />}
      weapon={
        <group position={[0.4, totalH * 0.2, 0.05]} rotation={[0, 0, 0.15]}>
          <Sword length={0.85} scale={1.05} />
        </group>
      }
    >
      {/* Shield on left arm */}
      <group position={[-0.4, totalH * 0.38, 0.15]} rotation={[0, 0.3, 0]}>
        <Shield radius={0.22} color="#1a3a6b" scale={1.0} />
      </group>

      {/* Commander's sash across chest */}
      <mesh position={[-0.05, totalH * 0.43, 0.15]} rotation={[0, 0, 0.4]}>
        <boxGeometry args={[0.06, 0.55, 0.01]} />
        <meshStandardMaterial color="#cc3333" roughness={0.9} />
      </mesh>

      {/* Armlets */}
      {[-1, 1].map(side => (
        <mesh key={side} position={[side * 0.3, totalH * 0.47, 0]}>
          <torusGeometry args={[0.09, 0.015, 6, 12]} />
          <meshStandardMaterial color="#c8a84b" metalness={0.85} roughness={0.2} />
        </mesh>
      ))}
    </BaseFigure>
  )
}
