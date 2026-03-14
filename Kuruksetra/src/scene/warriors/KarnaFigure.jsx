/**
 * Karṇa — The Sun's Son
 *
 * Born with divine golden armor (kavaca) and earrings (kuṇḍala)
 * that make him nearly invincible. Radiant, sun-like presence.
 * Rival archer to Arjuna, fighting for Duryodhana out of loyalty.
 * Gold emissive glow to suggest his solar origin.
 */
import BaseFigure from './BaseFigure'
import { Bow } from '../../utils/bodyParts'

function SunCrown() {
  return (
    <group>
      {/* Golden helmet — radiant */}
      <mesh>
        <cylinderGeometry args={[0.2, 0.23, 0.25, 10]} />
        <meshStandardMaterial color="#d4a020" metalness={0.95} roughness={0.1} emissive="#886600" emissiveIntensity={0.15} />
      </mesh>
      {/* Sun-ray spikes */}
      {[0, 1, 2, 3, 4, 5, 6, 7].map(i => {
        const angle = (i / 8) * Math.PI * 2
        return (
          <mesh
            key={i}
            position={[Math.cos(angle) * 0.2, 0.15, Math.sin(angle) * 0.2]}
            rotation={[Math.sin(angle) * 0.3, 0, -Math.cos(angle) * 0.3]}
          >
            <coneGeometry args={[0.02, 0.12, 4]} />
            <meshStandardMaterial color="#d4a020" metalness={0.9} roughness={0.15} emissive="#886600" emissiveIntensity={0.2} />
          </mesh>
        )
      })}
    </group>
  )
}

export default function KarnaFigure({ character }) {
  const totalH = character.height || 2.5

  return (
    <group>
      <BaseFigure
        bodyScale={1.05}
        totalHeight={totalH}
        muscleIntensity={0.5}
        skinColor="#7a5a30"
        armorColor="#c8a030"           // Golden kavaca — divine armor
        dhotiColor="#d4a040"           // Gold-toned dhoti
        rightArmPose="holding_bow"
        rightArmArmorColor="#c8a030"
        leftArmPose="at_side"
        leftArmArmorColor="#c8a030"
        faceOptions={{
          skinColor: '#7a5a30',
          age: 'young',
          expression: 'stern',          // Determined, loyal
          eyeSize: 'normal',
          mustache: 'thin',
        }}
        headgear={<SunCrown />}
        weapon={
          <group position={[0.5, totalH * 0.3, 0.05]} rotation={[0.1, 0, 0.2]}>
            <Bow radius={0.55} color="#c8a030" scale={1.05} />
          </group>
        }
      >
        {/* Divine earrings — kuṇḍala (large, golden, radiant) */}
        {[-1, 1].map(side => (
          <group key={side} position={[side * 0.22, totalH * 0.63, 0]}>
            <mesh>
              <torusGeometry args={[0.04, 0.012, 6, 10]} />
              <meshStandardMaterial color="#d4a020" metalness={0.95} roughness={0.1} emissive="#886600" emissiveIntensity={0.2} />
            </mesh>
            {/* Pendant */}
            <mesh position={[0, -0.04, 0]}>
              <sphereGeometry args={[0.02, 6, 6]} />
              <meshStandardMaterial color="#d4a020" metalness={0.95} roughness={0.1} emissive="#886600" emissiveIntensity={0.3} />
            </mesh>
          </group>
        ))}

        {/* Full golden chest plate — kavaca */}
        <mesh position={[0, totalH * 0.44, 0.19]}>
          <sphereGeometry args={[0.12, 10, 8, 0, Math.PI * 2, 0, Math.PI * 0.45]} />
          <meshStandardMaterial color="#d4a020" metalness={0.9} roughness={0.1} emissive="#664400" emissiveIntensity={0.1} />
        </mesh>

        {/* Sun emblem on chest */}
        <mesh position={[0, totalH * 0.45, 0.23]}>
          <torusGeometry args={[0.04, 0.008, 4, 12]} />
          <meshStandardMaterial color="#ffcc44" metalness={0.9} roughness={0.1} emissive="#aa8800" emissiveIntensity={0.4} />
        </mesh>

        {/* Gold armlets */}
        {[-1, 1].map(side => (
          <mesh key={`a${side}`} position={[side * 0.3, totalH * 0.47, 0]}>
            <torusGeometry args={[0.1, 0.02, 6, 12]} />
            <meshStandardMaterial color="#d4a020" metalness={0.9} roughness={0.1} emissive="#664400" emissiveIntensity={0.15} />
          </mesh>
        ))}

        {/* Solar glow — warm golden light */}
        <pointLight position={[0, totalH * 0.45, 0.2]} intensity={0.5} color="#ffaa44" distance={4} />
      </BaseFigure>
    </group>
  )
}
