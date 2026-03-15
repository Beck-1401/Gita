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
        <boxGeometry args={[1.0, 1.0, 0.15]} />
        <meshStandardMaterial color="#8b5a00" roughness={0.7} metalness={0.2} />
      </mesh>
      {/* Hub */}
      <mesh>
        <cylinderGeometry args={[0.15, 0.15, 0.2, 12]} />
        <meshStandardMaterial color="#c8a84b" metalness={0.8} roughness={0.3} />
      </mesh>
      {/* Spokes */}
      {Array.from({ length: 4 }).map((_, i) => {
        const angle = (i / 4) * Math.PI * 2
        return (
          <mesh
            key={i}
            position={[Math.cos(angle) * 0.25, Math.sin(angle) * 0.25, 0]}
            rotation={[0, 0, angle]}
          >
            <boxGeometry args={[0.06, 0.5, 0.08]} />
            <meshStandardMaterial color="#6b3a00" roughness={0.8} />
          </mesh>
        )
      })}
    </group>
  )
}

// Detailed Voxel Horse representing one of the five senses
// Senses: 'sight', 'hearing', 'smell', 'taste', 'touch'
function Horse({ position, rotation = [0, 0, 0], sense = 'sight' }) {
  const SENSE_COLORS = {
    sight: '#4488ff',   // Bright blue for vision
    hearing: '#ff44aa', // Pink/Magenta for sound
    smell: '#44ff88',   // Green for fragrance
    taste: '#ff8844',   // Orange for flavor
    touch: '#aa44ff',   // Purple for sensation
  }
  
  const accentColor = SENSE_COLORS[sense]

  return (
    <group position={position} rotation={rotation}>
      {/* ── Main Body (Voxel Blocks) ── */}
      <mesh position={[0, 0.7, 0]}>
        <boxGeometry args={[0.55, 0.55, 1.2]} />
        <meshStandardMaterial color="#ffffff" roughness={0.8} />
      </mesh>
      {/* Body Shade Detailing */}
      <mesh position={[0, 0.42, 0]}>
        <boxGeometry args={[0.56, 0.1, 1.0]} />
        <meshStandardMaterial color="#f0f0f0" roughness={0.8} />
      </mesh>

      {/* ── Neck (Layered cubes) ── */}
      <group position={[0, 1.05, 0.45]} rotation={[0.4, 0, 0]}>
        <mesh position={[0, -0.1, 0]}>
          <boxGeometry args={[0.3, 0.4, 0.3]} />
          <meshStandardMaterial color="#ffffff" />
        </mesh>
        <mesh position={[0, 0.2, 0]}>
          <boxGeometry args={[0.25, 0.3, 0.25]} />
          <meshStandardMaterial color="#ffffff" />
        </mesh>
      </group>

      {/* ── Head ── */}
      <group position={[0, 1.45, 0.7]}>
        {/* Skull */}
        <mesh>
          <boxGeometry args={[0.3, 0.4, 0.5]} />
          <meshStandardMaterial color="#ffffff" />
        </mesh>
        {/* Muzzle */}
        <mesh position={[0, -0.1, 0.3]}>
          <boxGeometry args={[0.22, 0.2, 0.2]} />
          <meshStandardMaterial color="#e8e8e8" />
        </mesh>
        
        {/* ── Sensory Highlights ── */}
        {/* Sight (Eyes) */}
        <mesh position={[0.16, 0.1, 0.15]}>
          <boxGeometry args={[0.05, 0.05, 0.05]} />
          <meshStandardMaterial color={sense === 'sight' ? accentColor : '#222'} emissive={sense === 'sight' ? accentColor : '#000'} emissiveIntensity={1} />
        </mesh>
        <mesh position={[-0.16, 0.1, 0.15]}>
          <boxGeometry args={[0.05, 0.05, 0.05]} />
          <meshStandardMaterial color={sense === 'sight' ? accentColor : '#222'} emissive={sense === 'sight' ? accentColor : '#000'} emissiveIntensity={1} />
        </mesh>

        {/* Hearing (Ears - slightly larger/colored if hearing sense) */}
        {[-1, 1].map(side => (
          <mesh key={side} position={[side * 0.12, 0.25, -0.1]}>
            <boxGeometry args={[0.06, 0.15, 0.06]} />
            <meshStandardMaterial color={sense === 'hearing' ? accentColor : '#ffffff'} />
          </mesh>
        ))}

        {/* Smell (Nose highlight) */}
        {sense === 'smell' && (
          <mesh position={[0, -0.1, 0.4]}>
            <boxGeometry args={[0.1, 0.05, 0.02]} />
            <meshStandardMaterial color={accentColor} emissive={accentColor} />
          </mesh>
        )}

        {/* Taste (Bit/Mouth highlight) */}
        {sense === 'taste' && (
          <mesh position={[0, -0.18, 0.3]}>
            <boxGeometry args={[0.25, 0.05, 0.05]} />
            <meshStandardMaterial color={accentColor} />
          </mesh>
        )}
      </group>

      {/* ── Legs (Blocks) ── */}
      {[[-0.18, -0.5], [0.18, -0.5], [-0.18, 0.4], [0.18, 0.4]].map(([x, z], i) => (
        <group key={i} position={[x, 0.3, z]}>
          <mesh>
            <boxGeometry args={[0.12, 0.6, 0.12]} />
            <meshStandardMaterial color="#ffffff" />
          </mesh>
          {/* Hoof */}
          <mesh position={[0, -0.3, 0]}>
            <boxGeometry args={[0.14, 0.1, 0.14]} />
            <meshStandardMaterial color="#666666" />
          </mesh>
        </group>
      ))}

      {/* ── Mane (Stacked Voxel cubes) ── */}
      <group position={[0, 1.3, 0.42]}>
        {[0, -0.15, -0.3, -0.45].map((z, i) => (
          <mesh key={i} position={[0, -i * 0.1, z]}>
            <boxGeometry args={[0.12, 0.3, 0.15]} />
            <meshStandardMaterial color="#d4d4d4" />
          </mesh>
        ))}
      </group>

      {/* ── Tail (Voxel chain) ── */}
      <group position={[0, 0.85, -0.6]} rotation={[-0.4, 0, 0]}>
        <mesh position={[0, -0.1, -0.1]}>
          <boxGeometry args={[0.1, 0.1, 0.3]} />
          <meshStandardMaterial color="#d4d4d4" />
        </mesh>
        <mesh position={[0, -0.25, -0.2]}>
          <boxGeometry args={[0.08, 0.25, 0.1]} />
          <meshStandardMaterial color="#d4d4d4" />
        </mesh>
      </group>

      {/* ── Harness (Golden voxel band) ── */}
      <group position={[0, 0.75, 0.1]}>
        <mesh>
          <boxGeometry args={[0.6, 0.6, 0.1]} />
          <meshStandardMaterial color="#c8a84b" metalness={0.8} />
        </mesh>
        {/* Sense Symbol on the Harness side */}
        {sense === 'touch' && (
          <mesh position={[0.31, 0, 0]}>
            <boxGeometry args={[0.02, 0.2, 0.2]} />
            <meshStandardMaterial color={accentColor} emissive={accentColor} />
          </mesh>
        )}
      </group>
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

// Hardcoded figures removed in favor of registry sprites

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
      <Wheel position={[-1.1, 0.5, 0]} />
      <Wheel position={[1.1, 0.5, 0]} />

      {/* Yoke bar connecting to horses */}
      <mesh position={[0, 0.85, -2.0]} rotation={[Math.PI / 2, 0, 0]}>
        <boxGeometry args={[0.1, 3.5, 0.1]} />
        <meshStandardMaterial color="#6b3a00" roughness={0.7} />
      </mesh>

      {/* Five white horses in V formation - each representing a sense */}
      <Horse position={[0, 0, -4.2]} rotation={[0, Math.PI, 0]} sense="sight" />
      <Horse position={[-0.9, 0, -3.9]} rotation={[0, Math.PI + 0.15, 0]} sense="hearing" />
      <Horse position={[0.9, 0, -3.9]} rotation={[0, Math.PI - 0.15, 0]} sense="smell" />
      <Horse position={[-1.7, 0, -3.5]} rotation={[0, Math.PI + 0.28, 0]} sense="taste" />
      <Horse position={[1.7, 0, -3.5]} rotation={[0, Math.PI - 0.28, 0]} sense="touch" />

      {/* Hanumān banner — moved to the very back */}
      <group position={[0, 0, 1.25]}>
        <HanumanBanner />
      </group>

      {/* Kṛṣṇa and Arjuna */}

    </group>
  )
}
