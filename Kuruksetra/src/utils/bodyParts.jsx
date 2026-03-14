/**
 * Reusable body part components for warrior figures.
 * All warriors share these building blocks — individual character files
 * compose them with custom props, colors, and accessories.
 */
import * as THREE from 'three'

// ─── Shared geometry constants ────────────────────────────────────
// Pre-create geometries to avoid re-allocation per frame
const ARM_UPPER_GEO = new THREE.CylinderGeometry(0.08, 0.09, 0.4, 8)
const ARM_LOWER_GEO = new THREE.CylinderGeometry(0.07, 0.08, 0.35, 8)
const HAND_GEO = new THREE.SphereGeometry(0.06, 6, 6)
const LEG_UPPER_GEO = new THREE.CylinderGeometry(0.1, 0.12, 0.45, 8)
const LEG_LOWER_GEO = new THREE.CylinderGeometry(0.08, 0.1, 0.4, 8)
const FOOT_GEO = new THREE.BoxGeometry(0.1, 0.05, 0.16)

// ─── Arm component ───────────────────────────────────────────────
export function Arm({ side = 'right', skinColor = '#3d1a00', pose = 'at_side', armorColor = null, scale = 1 }) {
  const mirror = side === 'left' ? -1 : 1
  const xOff = mirror * 0.28 * scale

  // Pose angles
  let upperRot = [0, 0, mirror * 0.15]  // slight outward angle
  let lowerRot = [0, 0, 0]
  let lowerPos = [0, -0.35, 0]

  if (pose === 'holding_weapon') {
    upperRot = [-0.3, 0, mirror * 0.4]
    lowerRot = [-0.8, 0, 0]
    lowerPos = [0, -0.3, -0.1]
  } else if (pose === 'holding_bow') {
    upperRot = [0, 0, mirror * 0.8]
    lowerRot = [0, 0, mirror * 0.2]
    lowerPos = [0, -0.3, 0]
  } else if (pose === 'holding_reins') {
    upperRot = [-0.4, 0, mirror * 0.3]
    lowerRot = [-0.5, 0, 0]
    lowerPos = [0, -0.3, -0.15]
  } else if (pose === 'akimbo') {
    upperRot = [0, 0, mirror * 0.6]
    lowerRot = [0.3, 0, mirror * 0.3]
    lowerPos = [0, -0.3, 0.05]
  } else if (pose === 'crossed') {
    upperRot = [-0.3, mirror * -0.4, mirror * 0.4]
    lowerRot = [-0.6, 0, mirror * -0.3]
    lowerPos = [0, -0.28, -0.1]
  }

  const matColor = armorColor || skinColor

  return (
    <group position={[xOff, 0, 0]}>
      {/* Upper arm */}
      <group rotation={upperRot}>
        <mesh geometry={ARM_UPPER_GEO} scale={[scale, scale, scale]}>
          <meshStandardMaterial color={matColor} roughness={0.7} metalness={armorColor ? 0.3 : 0.1} />
        </mesh>
        {/* Lower arm + hand */}
        <group position={lowerPos.map((v, i) => v * scale)}>
          <group rotation={lowerRot}>
            <mesh geometry={ARM_LOWER_GEO} scale={[scale, scale, scale]}>
              <meshStandardMaterial color={skinColor} roughness={0.7} />
            </mesh>
            {/* Hand */}
            <mesh geometry={HAND_GEO} position={[0, -0.2 * scale, 0]} scale={[scale, scale, scale]}>
              <meshStandardMaterial color={skinColor} roughness={0.8} />
            </mesh>
          </group>
        </group>
      </group>
    </group>
  )
}

// ─── Leg component ───────────────────────────────────────────────
export function Leg({ side = 'right', skinColor = '#3d1a00', dhotiBound = false, scale = 1 }) {
  const mirror = side === 'left' ? -1 : 1
  const xOff = mirror * 0.1 * scale

  return (
    <group position={[xOff, 0, 0]}>
      {/* Upper leg (mostly hidden by dhoti) */}
      <mesh geometry={LEG_UPPER_GEO} scale={[scale, scale, scale]}>
        <meshStandardMaterial color={dhotiBound ? '#8b7340' : skinColor} roughness={0.8} />
      </mesh>
      {/* Lower leg */}
      <mesh geometry={LEG_LOWER_GEO} position={[0, -0.4 * scale, 0]} scale={[scale, scale, scale]}>
        <meshStandardMaterial color={skinColor} roughness={0.8} />
      </mesh>
      {/* Foot */}
      <mesh position={[0, -0.62 * scale, 0.03 * scale]}>
        <boxGeometry args={[0.1 * scale, 0.05 * scale, 0.16 * scale]} />
        <meshStandardMaterial color={skinColor} roughness={0.9} />
      </mesh>
    </group>
  )
}

// ─── Dhoti / lower garment ───────────────────────────────────────
export function Dhoti({ color = '#e8d5a0', width = 0.32, height = 0.55, scale = 1 }) {
  return (
    <mesh>
      <cylinderGeometry args={[width * 0.85 * scale, width * 1.1 * scale, height * scale, 12]} />
      <meshStandardMaterial color={color} roughness={0.9} side={THREE.DoubleSide} />
    </mesh>
  )
}

// ─── Torso ───────────────────────────────────────────────────────
export function Torso({
  skinColor = '#3d1a00',
  armorColor = null,
  upperWidth = 0.24,
  lowerWidth = 0.2,
  height = 0.5,
  scale = 1,
  muscleIntensity = 0,  // 0-1, controls visual bulk
  armorTexture = null,
}) {
  const w = (upperWidth + muscleIntensity * 0.06) * scale
  const lw = lowerWidth * scale
  const h = height * scale
  const mat = armorColor || skinColor
  const metalness = armorColor ? 0.35 : 0.1

  return (
    <group>
      {/* Upper chest — slightly wider */}
      <mesh position={[0, h * 0.25, 0]}>
        <cylinderGeometry args={[w, w * 0.95, h * 0.55, 10]} />
        <meshStandardMaterial
          color={mat}
          roughness={armorColor ? 0.5 : 0.7}
          metalness={metalness}
          map={armorTexture || null}
        />
      </mesh>
      {/* Lower abdomen */}
      <mesh position={[0, -h * 0.2, 0]}>
        <cylinderGeometry args={[lw, w * 0.9, h * 0.45, 10]} />
        <meshStandardMaterial color={mat} roughness={0.7} metalness={metalness * 0.5} />
      </mesh>
      {/* Shoulder definition */}
      <mesh position={[0, h * 0.45, 0]} rotation={[0, 0, Math.PI / 2]}>
        <cylinderGeometry args={[
          (0.08 + muscleIntensity * 0.04) * scale,
          (0.08 + muscleIntensity * 0.04) * scale,
          (upperWidth * 2.4 + muscleIntensity * 0.12) * scale,
          8
        ]} />
        <meshStandardMaterial color={mat} roughness={0.6} metalness={metalness} />
      </mesh>
    </group>
  )
}

// ─── Head with face ──────────────────────────────────────────────
export function HeadWithFace({
  skinColor = '#3d1a00',
  faceTexture = null,
  headRadius = 0.22,
  scale = 1,
}) {
  const r = headRadius * scale

  return (
    <group>
      {/* Back of head — plain skin */}
      <mesh>
        <sphereGeometry args={[r, 14, 12]} />
        <meshStandardMaterial color={skinColor} roughness={0.8} />
      </mesh>
      {/* Face plate — front hemisphere with texture */}
      {faceTexture && (
        <mesh position={[0, 0, r * 0.02]} rotation={[0, 0, 0]}>
          <sphereGeometry args={[r * 1.005, 14, 12, 0, Math.PI * 2, 0, Math.PI * 0.5]} />
          <meshStandardMaterial
            map={faceTexture}
            transparent
            roughness={0.75}
          />
        </mesh>
      )}
      {/* Neck */}
      <mesh position={[0, -r * 1.1, 0]}>
        <cylinderGeometry args={[r * 0.45, r * 0.55, r * 0.7, 8]} />
        <meshStandardMaterial color={skinColor} roughness={0.8} />
      </mesh>
    </group>
  )
}

// ─── Crown / Headgear variants ───────────────────────────────────
export function Crown({ type = 'warrior', color = '#c8a84b', scale = 1 }) {
  if (type === 'commander') {
    return (
      <group>
        <mesh>
          <cylinderGeometry args={[0.2 * scale, 0.24 * scale, 0.35 * scale, 8]} />
          <meshStandardMaterial color={color} metalness={0.9} roughness={0.2} />
        </mesh>
        {/* Crown rim detail */}
        <mesh position={[0, -0.15 * scale, 0]}>
          <torusGeometry args={[0.22 * scale, 0.02 * scale, 6, 16]} />
          <meshStandardMaterial color={color} metalness={0.9} roughness={0.15} />
        </mesh>
      </group>
    )
  }
  if (type === 'king') {
    return (
      <group>
        <mesh>
          <cylinderGeometry args={[0.18 * scale, 0.22 * scale, 0.3 * scale, 10]} />
          <meshStandardMaterial color={color} metalness={0.85} roughness={0.25} />
        </mesh>
        {/* Three points */}
        {[-0.08, 0, 0.08].map((x, i) => (
          <mesh key={i} position={[x * scale, 0.2 * scale, 0]}>
            <coneGeometry args={[0.04 * scale, 0.12 * scale, 6]} />
            <meshStandardMaterial color={color} metalness={0.9} roughness={0.2} />
          </mesh>
        ))}
      </group>
    )
  }
  if (type === 'prince') {
    return (
      <group>
        <mesh>
          <cylinderGeometry args={[0.17 * scale, 0.2 * scale, 0.22 * scale, 8]} />
          <meshStandardMaterial color={color} metalness={0.7} roughness={0.3} />
        </mesh>
        <mesh position={[0, 0.15 * scale, 0]}>
          <coneGeometry args={[0.06 * scale, 0.15 * scale, 6]} />
          <meshStandardMaterial color={color} metalness={0.8} roughness={0.25} />
        </mesh>
      </group>
    )
  }
  // warrior / default — simple helmet
  return (
    <mesh>
      <cylinderGeometry args={[0.18 * scale, 0.21 * scale, 0.18 * scale, 8]} />
      <meshStandardMaterial color={color} roughness={0.5} metalness={0.3} />
    </mesh>
  )
}

// ─── Weapons ─────────────────────────────────────────────────────
export function Mace({ length = 1.2, headSize = 0.15, color = '#555', scale = 1 }) {
  return (
    <group>
      {/* Shaft */}
      <mesh>
        <cylinderGeometry args={[0.03 * scale, 0.035 * scale, length * scale, 8]} />
        <meshStandardMaterial color="#4a3520" roughness={0.7} />
      </mesh>
      {/* Head */}
      <mesh position={[0, length * 0.5 * scale, 0]}>
        <sphereGeometry args={[headSize * scale, 8, 8]} />
        <meshStandardMaterial color={color} metalness={0.6} roughness={0.4} />
      </mesh>
      {/* Spikes on head */}
      {[0, 1, 2, 3, 4, 5].map(i => {
        const angle = (i / 6) * Math.PI * 2
        return (
          <mesh
            key={i}
            position={[
              Math.cos(angle) * headSize * 0.7 * scale,
              length * 0.5 * scale,
              Math.sin(angle) * headSize * 0.7 * scale,
            ]}
            rotation={[Math.sin(angle) * 0.8, 0, -Math.cos(angle) * 0.8]}
          >
            <coneGeometry args={[0.025 * scale, 0.08 * scale, 4]} />
            <meshStandardMaterial color={color} metalness={0.7} roughness={0.3} />
          </mesh>
        )
      })}
    </group>
  )
}

export function Bow({ radius = 0.55, color = '#8b6914', scale = 1 }) {
  return (
    <group>
      {/* Bow arc */}
      <mesh>
        <torusGeometry args={[radius * scale, 0.025 * scale, 6, 20, Math.PI * 1.4]} />
        <meshStandardMaterial color={color} metalness={0.4} roughness={0.5} />
      </mesh>
      {/* Bowstring */}
      <mesh position={[0, radius * 0.35 * scale, 0]} rotation={[0, 0, Math.PI / 4.5]}>
        <cylinderGeometry args={[0.006 * scale, 0.006 * scale, radius * 1.7 * scale, 4]} />
        <meshStandardMaterial color="#f0e8d0" roughness={0.6} />
      </mesh>
    </group>
  )
}

export function Sword({ length = 0.8, color = '#c0c0c0', scale = 1 }) {
  return (
    <group>
      {/* Blade */}
      <mesh>
        <boxGeometry args={[0.04 * scale, length * scale, 0.01 * scale]} />
        <meshStandardMaterial color={color} metalness={0.8} roughness={0.2} />
      </mesh>
      {/* Guard */}
      <mesh position={[0, -length * 0.5 * scale, 0]}>
        <boxGeometry args={[0.15 * scale, 0.03 * scale, 0.03 * scale]} />
        <meshStandardMaterial color="#c8a84b" metalness={0.7} roughness={0.3} />
      </mesh>
      {/* Hilt */}
      <mesh position={[0, -length * 0.55 * scale - 0.06, 0]}>
        <cylinderGeometry args={[0.025 * scale, 0.025 * scale, 0.12 * scale, 6]} />
        <meshStandardMaterial color="#4a2800" roughness={0.8} />
      </mesh>
    </group>
  )
}

export function Shield({ radius = 0.25, color = '#8b1a1a', scale = 1 }) {
  return (
    <group>
      <mesh>
        <sphereGeometry args={[radius * scale, 12, 8, 0, Math.PI * 2, 0, Math.PI * 0.4]} />
        <meshStandardMaterial color={color} metalness={0.3} roughness={0.5} side={THREE.DoubleSide} />
      </mesh>
      {/* Boss (center bump) */}
      <mesh position={[0, 0, radius * 0.15 * scale]}>
        <sphereGeometry args={[0.06 * scale, 8, 6]} />
        <meshStandardMaterial color="#c8a84b" metalness={0.8} roughness={0.2} />
      </mesh>
      {/* Rim */}
      <mesh rotation={[Math.PI * 0.2, 0, 0]}>
        <torusGeometry args={[radius * 0.92 * scale, 0.015 * scale, 6, 20]} />
        <meshStandardMaterial color="#c8a84b" metalness={0.7} roughness={0.3} />
      </mesh>
    </group>
  )
}

// ─── Conch shell (improved) ──────────────────────────────────────
export function Conch({ scale = 1 }) {
  return (
    <group rotation={[0, 0, Math.PI / 3]}>
      {/* Shell body — tapered spiral suggestion */}
      <mesh>
        <coneGeometry args={[0.1 * scale, 0.3 * scale, 10]} />
        <meshStandardMaterial color="#f5f0dc" roughness={0.35} metalness={0.05} />
      </mesh>
      {/* Opening */}
      <mesh position={[0.04 * scale, -0.08 * scale, 0]}>
        <torusGeometry args={[0.08 * scale, 0.025 * scale, 6, 12]} />
        <meshStandardMaterial color="#f5e8c8" roughness={0.4} />
      </mesh>
      {/* Spiral line detail */}
      <mesh position={[0, 0.05 * scale, 0]} rotation={[0, 0, 0.3]}>
        <torusGeometry args={[0.06 * scale, 0.01 * scale, 4, 12, Math.PI * 1.5]} />
        <meshStandardMaterial color="#d4c4a0" roughness={0.5} />
      </mesh>
    </group>
  )
}
