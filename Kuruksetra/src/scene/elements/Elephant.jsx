/**
 * Elephant — Procedural war elephant for the battlefield.
 *
 * Built from ~30 primitives: body, head, trunk, tusks, ears, legs.
 * Can be used standalone or wrapped by WarElephant for howdah + rider.
 */
import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

export default function Elephant({ position = [0, 0, 0], rotation = [0, 0, 0], scale = 1, color = '#5a5a5a' }) {
  const trunkRef = useRef()
  const tailRef = useRef()
  const earLeftRef = useRef()
  const earRightRef = useRef()

  useFrame((state) => {
    const t = state.clock.elapsedTime
    // Trunk sway
    if (trunkRef.current) {
      trunkRef.current.rotation.x = -0.4 + Math.sin(t * 0.8 + position[0]) * 0.15
    }
    // Tail swish
    if (tailRef.current) {
      tailRef.current.rotation.x = 0.3 + Math.sin(t * 1.2 + position[0]) * 0.1
    }
    // Ear flap
    if (earLeftRef.current) {
      earLeftRef.current.rotation.y = 0.2 + Math.sin(t * 0.6) * 0.08
    }
    if (earRightRef.current) {
      earRightRef.current.rotation.y = -0.2 - Math.sin(t * 0.6) * 0.08
    }
  })

  const s = scale
  const darkColor = '#3a3a3a'
  const lightColor = '#7a7a7a'

  return (
    <group position={position} rotation={rotation} scale={[s, s, s]}>
      {/* ── Body — large elongated ellipsoid ── */}
      <mesh position={[0, 1.8, 0]}>
        <sphereGeometry args={[1.0, 12, 10]} />
        <meshStandardMaterial color={color} roughness={0.85} />
      </mesh>
      {/* Extended body rear */}
      <mesh position={[0, 1.7, -0.6]}>
        <sphereGeometry args={[0.85, 10, 8]} />
        <meshStandardMaterial color={color} roughness={0.85} />
      </mesh>

      {/* ── Head ── */}
      <mesh position={[0, 2.1, 1.0]}>
        <sphereGeometry args={[0.65, 10, 8]} />
        <meshStandardMaterial color={color} roughness={0.8} />
      </mesh>
      {/* Forehead bump */}
      <mesh position={[0, 2.5, 1.1]}>
        <sphereGeometry args={[0.35, 8, 6]} />
        <meshStandardMaterial color={color} roughness={0.8} />
      </mesh>

      {/* ── Eyes ── */}
      {[-1, 1].map(side => (
        <mesh key={side} position={[side * 0.45, 2.2, 1.35]}>
          <sphereGeometry args={[0.06, 6, 6]} />
          <meshStandardMaterial color="#1a0a00" roughness={0.5} />
        </mesh>
      ))}

      {/* ── Trunk — series of segments ── */}
      <group ref={trunkRef} position={[0, 1.7, 1.4]}>
        {[0, 1, 2, 3, 4, 5, 6].map(i => {
          const radius = 0.2 - i * 0.02
          const y = -i * 0.22
          const z = i * 0.06
          return (
            <mesh key={i} position={[0, y, z]}>
              <cylinderGeometry args={[radius, radius + 0.01, 0.22, 8]} />
              <meshStandardMaterial color={i > 4 ? lightColor : color} roughness={0.8} />
            </mesh>
          )
        })}
        {/* Trunk tip — curled slightly */}
        <mesh position={[0, -1.55, 0.5]} rotation={[0.8, 0, 0]}>
          <cylinderGeometry args={[0.05, 0.08, 0.15, 6]} />
          <meshStandardMaterial color={lightColor} roughness={0.8} />
        </mesh>
      </group>

      {/* ── Tusks ── */}
      {[-1, 1].map(side => (
        <mesh key={side} position={[side * 0.28, 1.7, 1.4]} rotation={[0.5, side * 0.15, side * 0.2]}>
          <coneGeometry args={[0.06, 0.8, 6]} />
          <meshStandardMaterial color="#f5f0dc" roughness={0.3} metalness={0.1} />
        </mesh>
      ))}

      {/* ── Ears — large flat shapes ── */}
      <group ref={earLeftRef} position={[-0.6, 2.2, 0.8]}>
        <mesh rotation={[0, 0.4, 0]}>
          <sphereGeometry args={[0.5, 8, 6]} />
          <meshStandardMaterial color={color} roughness={0.9} side={THREE.DoubleSide} />
        </mesh>
        {/* Inner ear — lighter */}
        <mesh position={[0, 0, 0.05]} rotation={[0, 0.4, 0]}>
          <sphereGeometry args={[0.35, 6, 5]} />
          <meshStandardMaterial color="#8a7060" roughness={0.9} />
        </mesh>
      </group>
      <group ref={earRightRef} position={[0.6, 2.2, 0.8]}>
        <mesh rotation={[0, -0.4, 0]}>
          <sphereGeometry args={[0.5, 8, 6]} />
          <meshStandardMaterial color={color} roughness={0.9} side={THREE.DoubleSide} />
        </mesh>
        <mesh position={[0, 0, 0.05]} rotation={[0, -0.4, 0]}>
          <sphereGeometry args={[0.35, 6, 5]} />
          <meshStandardMaterial color="#8a7060" roughness={0.9} />
        </mesh>
      </group>

      {/* ── Legs — 4 thick pillars ── */}
      {[
        [-0.5, 0, 0.5],   // front-left
        [0.5, 0, 0.5],    // front-right
        [-0.45, 0, -0.7], // back-left
        [0.45, 0, -0.7],  // back-right
      ].map(([x, _, z], i) => (
        <group key={i} position={[x, 0.45, z]}>
          {/* Upper leg */}
          <mesh>
            <cylinderGeometry args={[0.22, 0.25, 0.9, 8]} />
            <meshStandardMaterial color={color} roughness={0.85} />
          </mesh>
          {/* Lower leg */}
          <mesh position={[0, -0.5, 0]}>
            <cylinderGeometry args={[0.2, 0.22, 0.5, 8]} />
            <meshStandardMaterial color={darkColor} roughness={0.9} />
          </mesh>
          {/* Foot pad */}
          <mesh position={[0, -0.78, 0]}>
            <cylinderGeometry args={[0.24, 0.26, 0.08, 10]} />
            <meshStandardMaterial color={darkColor} roughness={0.95} />
          </mesh>
          {/* Toenails */}
          {[-0.08, 0, 0.08].map((tx, j) => (
            <mesh key={j} position={[tx, -0.8, 0.18]}>
              <sphereGeometry args={[0.03, 4, 4]} />
              <meshStandardMaterial color="#e8e0c8" roughness={0.5} />
            </mesh>
          ))}
        </group>
      ))}

      {/* ── Tail ── */}
      <group ref={tailRef} position={[0, 1.8, -1.3]}>
        <mesh rotation={[0.3, 0, 0]}>
          <cylinderGeometry args={[0.04, 0.06, 0.6, 6]} />
          <meshStandardMaterial color={darkColor} roughness={0.9} />
        </mesh>
        {/* Tail tuft */}
        <mesh position={[0, -0.35, 0.08]}>
          <sphereGeometry args={[0.06, 5, 5]} />
          <meshStandardMaterial color="#2a2a2a" roughness={1} />
        </mesh>
      </group>
    </group>
  )
}
