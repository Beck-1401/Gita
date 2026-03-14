import { useMemo, useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

// Instanced generic soldiers — hundreds implied
export default function ArmyMass({ side, count = 300 }) {
  const meshRef = useRef()
  const color = side === 'kaurava' ? '#6b1010' : '#0f2a50'
  const zDir = side === 'kaurava' ? -1 : 1

  const { positions, rotations } = useMemo(() => {
    const pos = []
    const rot = []
    for (let i = 0; i < count; i++) {
      const row = Math.floor(i / 25)
      const col = i % 25
      const spread = 60
      const depth = 8 + row * 3.5
      const x = (col / 25 - 0.5) * spread + (Math.random() - 0.5) * 2.5
      const z = zDir * (depth + Math.random() * 1.5)
      const y = 0
      pos.push(x, y, z)
      rot.push(Math.random() * 0.3 - 0.15)
    }
    return { positions: pos, rotations: rot }
  }, [count, zDir])

  const dummy = useMemo(() => new THREE.Object3D(), [])

  // Build instance matrices
  const tempMesh = useRef()
  useMemo(() => {
    // Will be set on mount via ref callback
  }, [])

  return (
    <group>
      {/* Simple instanced soldier bodies */}
      <instancedMesh ref={meshRef} args={[null, null, count]} castShadow raycast={() => null}>
        <cylinderGeometry args={[0.18, 0.2, 1.6, 6]} />
        <meshStandardMaterial color={color} roughness={0.9} />
      </instancedMesh>
      <SoldierInstances
        meshRef={meshRef}
        positions={positions}
        rotations={rotations}
        count={count}
        dummy={dummy}
      />
    </group>
  )
}

// Separated to allow imperative matrix setting after mesh is created
function SoldierInstances({ meshRef, positions, rotations, count, dummy }) {
  useFrame(() => {
    if (!meshRef.current) return
    for (let i = 0; i < count; i++) {
      dummy.position.set(positions[i * 3], positions[i * 3 + 1] + 0.8, positions[i * 3 + 2])
      dummy.rotation.y = rotations[i]
      dummy.scale.set(1, 1, 1)
      dummy.updateMatrix()
      meshRef.current.setMatrixAt(i, dummy.matrix)
    }
    meshRef.current.instanceMatrix.needsUpdate = true
  })
  return null
}
