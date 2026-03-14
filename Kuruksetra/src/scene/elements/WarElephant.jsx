/**
 * WarElephant — Elephant with howdah (battle platform), rider, and decorations.
 *
 * War elephants were a central feature of ancient Indian warfare.
 * Each carries a decorated howdah with a warrior, adorned
 * with cloth draping, forehead armor, and bells.
 */
import Elephant from './Elephant'

export default function WarElephant({
  position = [0, 0, 0],
  rotation = [0, 0, 0],
  scale = 1,
  side = 'kaurava',  // affects colors
}) {
  const sideColor = side === 'kaurava' ? '#8b1a1a' : '#1a3a6b'
  const clothColor = side === 'kaurava' ? '#a83030' : '#2a4a8b'
  const elephantColor = side === 'kaurava' ? '#555555' : '#606060'

  return (
    <group position={position} rotation={rotation}>
      {/* Base elephant */}
      <Elephant scale={scale} color={elephantColor} position={[0, 0, 0]} />

      <group scale={[scale, scale, scale]}>
        {/* ── Forehead armor plate ── */}
        <mesh position={[0, 2.6, 1.2]} rotation={[-0.3, 0, 0]}>
          <coneGeometry args={[0.25, 0.35, 8]} />
          <meshStandardMaterial color="#c8a84b" metalness={0.8} roughness={0.2} />
        </mesh>
        {/* Forehead jewel */}
        <mesh position={[0, 2.55, 1.35]}>
          <sphereGeometry args={[0.06, 6, 6]} />
          <meshStandardMaterial color={sideColor} metalness={0.5} roughness={0.3} />
        </mesh>

        {/* ── Decorative cloth draping ── */}
        {/* Back drape */}
        <mesh position={[0, 2.2, 0]} rotation={[0.1, 0, 0]}>
          <boxGeometry args={[1.8, 0.8, 0.04]} />
          <meshStandardMaterial color={clothColor} roughness={0.9} side={2} />
        </mesh>
        {/* Side drapes */}
        {[-1, 1].map(s => (
          <mesh key={s} position={[s * 0.85, 1.9, 0]} rotation={[0, 0, s * 0.2]}>
            <boxGeometry args={[0.04, 0.7, 1.2]} />
            <meshStandardMaterial color={clothColor} roughness={0.9} side={2} />
          </mesh>
        ))}
        {/* Gold trim on cloth */}
        <mesh position={[0, 1.82, 0]}>
          <boxGeometry args={[1.85, 0.06, 0.05]} />
          <meshStandardMaterial color="#c8a84b" metalness={0.8} roughness={0.2} />
        </mesh>

        {/* ── Howdah (battle platform) ── */}
        {/* Platform */}
        <mesh position={[0, 2.85, -0.1]}>
          <boxGeometry args={[0.9, 0.08, 1.0]} />
          <meshStandardMaterial color="#6b3a00" roughness={0.7} />
        </mesh>
        {/* Rails */}
        {[-1, 1].map(s => (
          <mesh key={`r${s}`} position={[s * 0.42, 3.1, -0.1]}>
            <boxGeometry args={[0.04, 0.5, 0.95]} />
            <meshStandardMaterial color="#8b5a00" roughness={0.7} metalness={0.1} />
          </mesh>
        ))}
        {/* Front rail */}
        <mesh position={[0, 3.1, 0.35]}>
          <boxGeometry args={[0.85, 0.45, 0.04]} />
          <meshStandardMaterial color="#8b5a00" roughness={0.7} metalness={0.1} />
        </mesh>
        {/* Gold trim */}
        <mesh position={[0, 2.88, -0.1]}>
          <boxGeometry args={[0.95, 0.03, 1.05]} />
          <meshStandardMaterial color="#c8a84b" metalness={0.85} roughness={0.2} />
        </mesh>

        {/* ── Warrior rider — simplified figure ── */}
        <group position={[0, 3.2, -0.1]}>
          {/* Body */}
          <mesh position={[0, 0.2, 0]}>
            <cylinderGeometry args={[0.12, 0.14, 0.4, 8]} />
            <meshStandardMaterial color={sideColor} roughness={0.6} metalness={0.2} />
          </mesh>
          {/* Head */}
          <mesh position={[0, 0.5, 0]}>
            <sphereGeometry args={[0.1, 8, 8]} />
            <meshStandardMaterial color="#5a3a1a" roughness={0.8} />
          </mesh>
          {/* Helmet */}
          <mesh position={[0, 0.6, 0]}>
            <coneGeometry args={[0.09, 0.12, 6]} />
            <meshStandardMaterial color="#c8a84b" metalness={0.8} roughness={0.2} />
          </mesh>
          {/* Spear */}
          <mesh position={[0.15, 0.5, 0]} rotation={[0.1, 0, 0.15]}>
            <cylinderGeometry args={[0.015, 0.015, 1.2, 4]} />
            <meshStandardMaterial color="#5a3a00" roughness={0.7} />
          </mesh>
          {/* Spear tip */}
          <mesh position={[0.22, 1.1, 0.05]}>
            <coneGeometry args={[0.03, 0.1, 4]} />
            <meshStandardMaterial color="#b0b0b0" metalness={0.7} roughness={0.3} />
          </mesh>
        </group>

        {/* ── Bells on neck ── */}
        {[-0.3, 0, 0.3].map((x, i) => (
          <group key={i} position={[x, 1.5, 1.1]}>
            <mesh>
              <sphereGeometry args={[0.05, 6, 6]} />
              <meshStandardMaterial color="#c8a84b" metalness={0.9} roughness={0.15} />
            </mesh>
            {/* Bell chain */}
            <mesh position={[0, 0.06, 0]}>
              <cylinderGeometry args={[0.008, 0.008, 0.12, 4]} />
              <meshStandardMaterial color="#c8a84b" metalness={0.8} roughness={0.2} />
            </mesh>
          </group>
        ))}

        {/* ── Ankle bracelets ── */}
        {[
          [-0.5, 0.15, 0.5],
          [0.5, 0.15, 0.5],
          [-0.45, 0.15, -0.7],
          [0.45, 0.15, -0.7],
        ].map(([x, y, z], i) => (
          <mesh key={`ab${i}`} position={[x, y, z]}>
            <torusGeometry args={[0.22, 0.015, 4, 10]} />
            <meshStandardMaterial color="#c8a84b" metalness={0.8} roughness={0.2} />
          </mesh>
        ))}
      </group>
    </group>
  )
}
