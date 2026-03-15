
import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'

export default function Svana({ character }) {
  const tailRef = useRef()
  const headRef = useRef()

  useFrame((state) => {
    const t = state.clock.elapsedTime
    if (tailRef.current) {
      tailRef.current.rotation.z = Math.sin(t * 8) * 0.4
    }
    if (headRef.current) {
      headRef.current.rotation.y = Math.sin(t * 1.5) * 0.1
    }
  })

  // Golden brown palette
  const furColor = '#c8a060'
  const snoutColor = '#3d1a00'

  return (
    <group position={[0, 0, 0]}>
      {/* Body */}
      <mesh position={[0, 0.35, 0]}>
        <boxGeometry args={[0.3, 0.35, 0.6]} />
        <meshStandardMaterial color={furColor} />
      </mesh>

      {/* Head */}
      <group ref={headRef} position={[0, 0.6, 0.3]}>
        <mesh>
          <boxGeometry args={[0.25, 0.25, 0.25]} />
          <meshStandardMaterial color={furColor} />
        </mesh>
        {/* Snout */}
        <mesh position={[0, -0.05, 0.15]}>
          <boxGeometry args={[0.15, 0.12, 0.15]} />
          <meshStandardMaterial color={snoutColor} />
        </mesh>
        {/* Ears */}
        {[-1, 1].map(side => (
          <mesh key={side} position={[side * 0.1, 0.15, -0.05]}>
            <boxGeometry args={[0.08, 0.15, 0.05]} />
            <meshStandardMaterial color={snoutColor} />
          </mesh>
        ))}
      </group>

      {/* Legs */}
      {[
        [-0.1, 0.12, 0.2], [0.1, 0.12, 0.2],
        [-0.1, 0.12, -0.2], [0.1, 0.12, -0.2]
      ].map((pos, i) => (
        <mesh key={i} position={pos}>
          <boxGeometry args={[0.08, 0.25, 0.08]} />
          <meshStandardMaterial color={furColor} />
        </mesh>
      ))}

      {/* Tail */}
      <group ref={tailRef} position={[0, 0.45, -0.3]}>
         <mesh position={[0, 0.1, -0.1]} rotation={[-0.5, 0, 0]}>
           <boxGeometry args={[0.05, 0.05, 0.25]} />
           <meshStandardMaterial color={furColor} />
         </mesh>
      </group>
    </group>
  )
}
