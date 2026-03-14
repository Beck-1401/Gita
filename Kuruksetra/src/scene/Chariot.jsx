import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

// Spoked wheel
function Wheel({ position }) {
  const spokes = 8
  return (
    <group position={position}>
      {/* Rim */}
      <mesh>
        <torusGeometry args={[0.8, 0.08, 8, 24]} />
        <meshStandardMaterial color="#8b5a00" roughness={0.7} metalness={0.2} />
      </mesh>
      {/* Hub */}
      <mesh>
        <cylinderGeometry args={[0.15, 0.15, 0.2, 12]} />
        <meshStandardMaterial color="#c8a84b" metalness={0.8} roughness={0.3} />
      </mesh>
      {/* Spokes */}
      {Array.from({ length: spokes }).map((_, i) => {
        const angle = (i / spokes) * Math.PI * 2
        return (
          <mesh
            key={i}
            position={[Math.cos(angle) * 0.4, Math.sin(angle) * 0.4, 0]}
            rotation={[0, 0, angle]}
          >
            <cylinderGeometry args={[0.03, 0.03, 0.8, 6]} />
            <meshStandardMaterial color="#6b3a00" roughness={0.8} />
          </mesh>
        )
      })}
    </group>
  )
}

// Stylized horse
function Horse({ position, rotation = [0, 0, 0] }) {
  return (
    <group position={position} rotation={rotation}>
      {/* Body */}
      <mesh position={[0, 0.7, 0]}>
        <boxGeometry args={[0.5, 0.5, 1.2]} />
        <meshStandardMaterial color="#f0f0f0" roughness={0.8} />
      </mesh>
      {/* Neck */}
      <mesh position={[0, 1.1, 0.45]} rotation={[0.4, 0, 0]}>
        <cylinderGeometry args={[0.18, 0.22, 0.6, 8]} />
        <meshStandardMaterial color="#f0f0f0" roughness={0.8} />
      </mesh>
      {/* Head */}
      <mesh position={[0, 1.45, 0.7]}>
        <boxGeometry args={[0.22, 0.28, 0.45]} />
        <meshStandardMaterial color="#f0f0f0" roughness={0.8} />
      </mesh>
      {/* Legs */}
      {[[-0.15, -0.6], [0.15, -0.6], [-0.15, 0.4], [0.15, 0.4]].map(([x, z], i) => (
        <mesh key={i} position={[x, 0.2, z]}>
          <cylinderGeometry args={[0.07, 0.06, 0.8, 6]} />
          <meshStandardMaterial color="#e8e8e8" roughness={0.8} />
        </mesh>
      ))}
      {/* Mane */}
      <mesh position={[0, 1.3, 0.5]} rotation={[0.3, 0, 0]}>
        <boxGeometry args={[0.08, 0.4, 0.1]} />
        <meshStandardMaterial color="#d4d4d4" roughness={1} />
      </mesh>
      {/* Tail */}
      <mesh position={[0, 0.8, -0.65]} rotation={[-0.5, 0, 0]}>
        <cylinderGeometry args={[0.04, 0.02, 0.5, 6]} />
        <meshStandardMaterial color="#d4d4d4" roughness={1} />
      </mesh>
      {/* Gold harness accent */}
      <mesh position={[0, 0.75, 0]}>
        <torusGeometry args={[0.28, 0.02, 6, 12]} />
        <meshStandardMaterial color="#c8a84b" metalness={0.9} roughness={0.2} />
      </mesh>
    </group>
  )
}

// Hanumān banner — streaming in the wind
function HanumanBanner() {
  const bannerRef = useRef()
  useFrame((state) => {
    if (bannerRef.current) {
      bannerRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 1.2) * 0.15
    }
  })

  return (
    <group position={[0, 0, 0.5]}>
      {/* Pole */}
      <mesh position={[0, 3, 0]}>
        <cylinderGeometry args={[0.04, 0.05, 6, 8]} />
        <meshStandardMaterial color="#8b5a00" roughness={0.6} metalness={0.3} />
      </mesh>
      {/* Banner cloth */}
      <group ref={bannerRef} position={[0, 5.5, 0]}>
        <mesh>
          <boxGeometry args={[0.8, 1.2, 0.03]} />
          <meshStandardMaterial color="#d4a843" side={THREE.DoubleSide} roughness={0.9} />
        </mesh>
        {/* Ape silhouette on banner */}
        <mesh position={[0, 0, 0.025]}>
          <sphereGeometry args={[0.22, 8, 8]} />
          <meshStandardMaterial color="#4a2800" roughness={1} />
        </mesh>
        <mesh position={[0, -0.25, 0.025]}>
          <cylinderGeometry args={[0.14, 0.18, 0.35, 8]} />
          <meshStandardMaterial color="#4a2800" roughness={1} />
        </mesh>
        {/* Tail */}
        <mesh position={[0.3, -0.1, 0.025]} rotation={[0, 0, -0.8]}>
          <cylinderGeometry args={[0.03, 0.02, 0.4, 6]} />
          <meshStandardMaterial color="#4a2800" roughness={1} />
        </mesh>
      </group>
      {/* Tip ornament */}
      <mesh position={[0, 6.1, 0]}>
        <sphereGeometry args={[0.1, 8, 8]} />
        <meshStandardMaterial color="#c8a84b" metalness={0.9} roughness={0.2} />
      </mesh>
    </group>
  )
}

// Kṛṣṇa figure — charioteer position
function KrishnaFigure() {
  return (
    <group position={[-0.5, 0, 0.6]}>
      {/* Legs */}
      <mesh position={[0, 0.5, 0]}>
        <cylinderGeometry args={[0.18, 0.22, 1.0, 8]} />
        <meshStandardMaterial color="#1a3a5c" roughness={0.8} />
      </mesh>
      {/* Body */}
      <mesh position={[0, 1.25, 0]}>
        <cylinderGeometry args={[0.22, 0.24, 0.7, 8]} />
        <meshStandardMaterial color="#2244aa" roughness={0.7} />
      </mesh>
      {/* Shoulders/arms holding reins */}
      <mesh position={[0, 1.4, 0]} rotation={[0, 0, Math.PI / 2]}>
        <cylinderGeometry args={[0.1, 0.1, 0.9, 8]} />
        <meshStandardMaterial color="#2244aa" roughness={0.7} />
      </mesh>
      {/* Reins — left */}
      <mesh position={[-0.55, 1.35, -0.3]} rotation={[0.5, 0.2, 0.1]}>
        <cylinderGeometry args={[0.015, 0.015, 1.0, 4]} />
        <meshStandardMaterial color="#8b5a00" roughness={0.9} />
      </mesh>
      {/* Reins — right */}
      <mesh position={[0.55, 1.35, -0.3]} rotation={[0.5, -0.2, -0.1]}>
        <cylinderGeometry args={[0.015, 0.015, 1.0, 4]} />
        <meshStandardMaterial color="#8b5a00" roughness={0.9} />
      </mesh>
      {/* Head */}
      <mesh position={[0, 1.75, 0]}>
        <sphereGeometry args={[0.22, 12, 10]} />
        <meshStandardMaterial color="#3d1a00" roughness={0.8} />
      </mesh>
      {/* Crown/peacock feather */}
      <mesh position={[0, 2.1, 0]}>
        <cylinderGeometry args={[0.18, 0.02, 0.45, 8]} />
        <meshStandardMaterial color="#c8a84b" metalness={0.8} roughness={0.3} />
      </mesh>
      {/* Divine glow */}
      <pointLight position={[0, 1.5, 0]} intensity={0.8} color="#4488ff" distance={4} />
    </group>
  )
}

// Arjuna figure — warrior position
function ArjunaFigure() {
  return (
    <group position={[0.5, 0, -0.1]}>
      {/* Legs */}
      <mesh position={[0, 0.5, 0]}>
        <cylinderGeometry args={[0.18, 0.22, 1.0, 8]} />
        <meshStandardMaterial color="#8b6914" roughness={0.8} />
      </mesh>
      {/* Body */}
      <mesh position={[0, 1.25, 0]}>
        <cylinderGeometry args={[0.22, 0.24, 0.7, 8]} />
        <meshStandardMaterial color="#c8a84b" roughness={0.6} metalness={0.3} />
      </mesh>
      {/* Bow — Gāṇḍīva */}
      <group position={[0.45, 1.2, 0]} rotation={[0, 0, 0.3]}>
        <mesh>
          <torusGeometry args={[0.55, 0.025, 6, 20, Math.PI * 1.5]} />
          <meshStandardMaterial color="#c8a84b" metalness={0.7} roughness={0.3} />
        </mesh>
        {/* Bowstring */}
        <mesh position={[0, 0.3, 0]} rotation={[0, 0, Math.PI / 4]}>
          <cylinderGeometry args={[0.008, 0.008, 1.05, 4]} />
          <meshStandardMaterial color="#f0f0f0" roughness={0.5} />
        </mesh>
      </group>
      {/* Arm holding bow */}
      <mesh position={[0.3, 1.35, 0]} rotation={[0, 0, -0.6]}>
        <cylinderGeometry args={[0.09, 0.09, 0.6, 8]} />
        <meshStandardMaterial color="#c8a84b" roughness={0.6} metalness={0.3} />
      </mesh>
      {/* Head */}
      <mesh position={[0, 1.75, 0]}>
        <sphereGeometry args={[0.22, 12, 10]} />
        <meshStandardMaterial color="#3d1a00" roughness={0.8} />
      </mesh>
      {/* Diadem (kirīṭin) */}
      <mesh position={[0, 2.0, 0]}>
        <cylinderGeometry args={[0.20, 0.22, 0.25, 10]} />
        <meshStandardMaterial color="#c8a84b" metalness={0.9} roughness={0.2} />
      </mesh>
      {/* Point of diadem */}
      <mesh position={[0, 2.2, 0]}>
        <coneGeometry args={[0.12, 0.3, 8]} />
        <meshStandardMaterial color="#c8a84b" metalness={0.9} roughness={0.2} />
      </mesh>
    </group>
  )
}

export default function Chariot({ onClick, onPointerOver, onPointerOut }) {
  const glowRef = useRef()

  useFrame((state) => {
    if (glowRef.current) {
      glowRef.current.intensity = 1.2 + Math.sin(state.clock.elapsedTime * 1.5) * 0.3
    }
  })

  return (
    <group
      onPointerDown={(e) => { e.stopPropagation(); onClick() }}
      onPointerOver={(e) => { e.stopPropagation(); onPointerOver() }}
      onPointerOut={onPointerOut}
    >
      {/* Divine chariot glow */}
      <pointLight ref={glowRef} position={[0, 1, 0]} intensity={1.2} color="#ffdd88" distance={8} />

      {/* Chariot platform */}
      <mesh position={[0, 0.9, 0]} castShadow>
        <boxGeometry args={[2.0, 0.18, 2.8]} />
        <meshStandardMaterial color="#7a4800" roughness={0.6} metalness={0.2} />
      </mesh>

      {/* Front rail */}
      <mesh position={[0, 1.25, 1.3]}>
        <boxGeometry args={[1.8, 0.6, 0.1]} />
        <meshStandardMaterial color="#8b5a00" roughness={0.7} metalness={0.1} />
      </mesh>

      {/* Side rails */}
      <mesh position={[0.95, 1.25, 0.3]}>
        <boxGeometry args={[0.1, 0.5, 2.0]} />
        <meshStandardMaterial color="#8b5a00" roughness={0.7} />
      </mesh>
      <mesh position={[-0.95, 1.25, 0.3]}>
        <boxGeometry args={[0.1, 0.5, 2.0]} />
        <meshStandardMaterial color="#8b5a00" roughness={0.7} />
      </mesh>

      {/* Gold trim on chariot body */}
      <mesh position={[0, 0.98, 0]}>
        <boxGeometry args={[2.1, 0.06, 2.9]} />
        <meshStandardMaterial color="#c8a84b" metalness={0.9} roughness={0.2} />
      </mesh>

      {/* Axle */}
      <mesh position={[0, 0.7, -0.6]} rotation={[0, 0, Math.PI / 2]}>
        <cylinderGeometry args={[0.08, 0.08, 2.6, 10]} />
        <meshStandardMaterial color="#6b3a00" roughness={0.7} metalness={0.2} />
      </mesh>

      {/* Wheels */}
      <Wheel position={[-1.25, 0.7, -0.6]} />
      <Wheel position={[1.25, 0.7, -0.6]} />

      {/* Yoke bar connecting to horses */}
      <mesh position={[0, 0.85, 2.0]} rotation={[Math.PI / 2, 0, 0]}>
        <cylinderGeometry args={[0.05, 0.05, 3.5, 8]} />
        <meshStandardMaterial color="#6b3a00" roughness={0.7} />
      </mesh>

      {/* Five white horses in V formation */}
      <Horse position={[0, 0, 4.2]} rotation={[0, Math.PI, 0]} />
      <Horse position={[-0.9, 0, 3.9]} rotation={[0, Math.PI + 0.15, 0]} />
      <Horse position={[0.9, 0, 3.9]} rotation={[0, Math.PI - 0.15, 0]} />
      <Horse position={[-1.7, 0, 3.5]} rotation={[0, Math.PI + 0.28, 0]} />
      <Horse position={[1.7, 0, 3.5]} rotation={[0, Math.PI - 0.28, 0]} />

      {/* Hanumān banner */}
      <HanumanBanner />

      {/* Kṛṣṇa and Arjuna */}
      <KrishnaFigure />
      <ArjunaFigure />
    </group>
  )
}
