
import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'

export default function Elephant({ position = [0, 0, 0], rotation = [0, 0, 0], scale = 1, color = '#5a5a5a' }) {
  const trunkRef = useRef()
  const s = scale
  const darkColor = '#3a3a3a'

  useFrame((state) => {
    const t = state.clock.elapsedTime
    if (trunkRef.current) {
      trunkRef.current.rotation.x = -0.2 + Math.sin(t * 0.8 + position[0]) * 0.1
    }
  })

  return (
    <group position={position} rotation={rotation} scale={[s, s, s]}>
      {/* ── Body — blocky ── */}
      <mesh position={[0, 1.8, 0]}>
        <boxGeometry args={[1.6, 1.4, 1.8]} />
        <meshStandardMaterial color={color} roughness={0.9} />
      </mesh>
      {/* Shoulder/Chest block */}
      <mesh position={[0, 1.9, 0.8]}>
        <boxGeometry args={[1.4, 1.2, 0.6]} />
        <meshStandardMaterial color={color} roughness={0.9} />
      </mesh>

      {/* ── Head Block ── */}
      <mesh position={[0, 2.2, 1.5]}>
        <boxGeometry args={[0.9, 0.9, 0.8]} />
        <meshStandardMaterial color={color} roughness={0.8} />
      </mesh>
      {/* Forehead block */}
      <mesh position={[0, 2.6, 1.6]}>
        <boxGeometry args={[0.5, 0.3, 0.4]} />
        <meshStandardMaterial color={color} roughness={0.8} />
      </mesh>

      {/* ── Trunk (Stack of blocks) ── */}
      <group ref={trunkRef} position={[0, 1.8, 1.9]}>
        {[0, 1, 2, 3, 4].map(i => (
          <mesh key={i} position={[0, -i * 0.35, i * 0.1]}>
            <boxGeometry args={[0.3 - i * 0.03, 0.38, 0.3 - i * 0.03]} />
            <meshStandardMaterial color={color} />
          </mesh>
        ))}
      </group>

      {/* ── Tusks ── */}
      {[-1, 1].map(side => (
        <mesh key={side} position={[side * 0.35, 1.8, 1.9]} rotation={[0.4, 0, 0]}>
          <boxGeometry args={[0.1, 0.6, 0.1]} />
          <meshStandardMaterial color="#f5f0dc" />
        </mesh>
      ))}

      {/* ── Ears (Large flat blocks) ── */}
      {[-1, 1].map(side => (
        <mesh key={side} position={[side * 0.6, 2.3, 1.3]} rotation={[0, side * 0.2, 0]}>
          <boxGeometry args={[0.7, 0.8, 0.05]} />
          <meshStandardMaterial color={color} />
        </mesh>
      ))}

      {/* ── Legs (4 pillar blocks) ── */}
      {[
        [-0.5, 0.6, 0.6],
        [0.5, 0.6, 0.6],
        [-0.5, 0.6, -0.6],
        [0.5, 0.6, -0.6],
      ].map((pos, i) => (
        <mesh key={i} position={pos}>
          <boxGeometry args={[0.4, 1.3, 0.4]} />
          <meshStandardMaterial color={darkColor} />
        </mesh>
      ))}
    </group>
  )
}
