import { useRef, Suspense } from 'react'
import { useFrame } from '@react-three/fiber'
import { useTexture } from '@react-three/drei'
import * as THREE from 'three'

function SkyboxBackground() {
  const texture = useTexture('assets/kuruksetra_background_1773505830449.png')
  // We apply the panoramic image to the inside of a large sphere.
  return (
    <mesh>
      <sphereGeometry args={[200, 60, 40]} />
      <meshBasicMaterial map={texture} side={THREE.BackSide} />
    </mesh>
  )
}

// Dust particle field
function DustParticles() {
  const ref = useRef()
  const count = 800
  const positions = new Float32Array(count * 3)
  for (let i = 0; i < count; i++) {
    positions[i * 3 + 0] = (Math.random() - 0.5) * 120
    positions[i * 3 + 1] = Math.random() * 8
    positions[i * 3 + 2] = (Math.random() - 0.5) * 120
  }

  useFrame((_, delta) => {
    if (ref.current) {
      ref.current.rotation.y += delta * 0.01
    }
  })

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.12}
        color="#c8a84b"
        transparent
        opacity={0.3}
        sizeAttenuation
      />
    </points>
  )
}

// Ground plane — cracked, dusty Kurukṣetra earth
function Ground() {
  return (
    <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.01, 0]} receiveShadow>
      <planeGeometry args={[300, 300, 40, 40]} />
      <meshStandardMaterial
        color="#8b6914"
        roughness={1}
        metalness={0}
      />
    </mesh>
  )
}

export default function Environment() {
  return (
    <>
      {/* Golden-hour directional light — low angle, warm */}
      <directionalLight
        position={[40, 20, -30]}
        intensity={2.5}
        color="#ffcc77"
        castShadow
        shadow-mapSize={[2048, 2048]}
        shadow-camera-far={200}
        shadow-camera-left={-80}
        shadow-camera-right={80}
        shadow-camera-top={80}
        shadow-camera-bottom={-80}
      />

      {/* Soft fill from opposite side */}
      <directionalLight position={[-20, 10, 20]} intensity={0.6} color="#aaccff" />

      {/* Ambient — dusty golden haze */}
      <ambientLight intensity={1.5} color="#ffdca8" />

      {/* Atmospheric fog blending into the lowest parts of the sky */}
      <fog attach="fog" args={['#c8843a', 80, 220]} />

      <Suspense fallback={null}>
        <SkyboxBackground />
      </Suspense>

      <Ground />
      <DustParticles />

      {/* Subtle ground haze plane */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.3, 0]}>
        <planeGeometry args={[200, 200]} />
        <meshStandardMaterial
          color="#c8843a"
          transparent
          opacity={0.1}
          depthWrite={false}
        />
      </mesh>
    </>
  )
}
