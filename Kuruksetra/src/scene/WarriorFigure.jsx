/**
 * WarriorFigure — dispatcher component.
 *
 * Handles all interaction logic (hover, click, glow, floating label, hit zone)
 * and delegates body rendering to the appropriate warrior component
 * from the registry.
 */
import { useRef, useState, Suspense } from 'react'
import { useFrame } from '@react-three/fiber'
import { Html, Billboard, useTexture } from '@react-three/drei'
import { getWarriorComponent } from './warriors'

const SIDE_COLORS = {
  kaurava: { glow: '#ff4444' },
  pandava: { glow: '#4488ff' },
  center: { glow: '#44aaff' },
}

function SpriteBody({ url, height }) {
  const texture = useTexture(url)
  const aspect = texture.image ? texture.image.width / texture.image.height : 1
  return (
    <Billboard follow={true} position={[0, height * 0.45, 0]}>
      <mesh>
        <planeGeometry args={[height * 0.9 * aspect, height * 0.9]} />
        <meshBasicMaterial map={texture} transparent={true} side={2} />
      </mesh>
    </Billboard>
  )
}

export default function WarriorFigure({ character, onClick, isSelected }) {
  const ref = useRef()
  const glowRef = useRef()
  const [hovered, setHovered] = useState(false)

  const colors = SIDE_COLORS[character.side] || SIDE_COLORS.center
  const totalH = character.height || 2.2

  useFrame((state) => {
    if (ref.current) {
      // Gentle idle sway only if not a sprite to prevent billboard judder
      if (!character.sprite) {
        ref.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.4 + character.position.x) * 0.04
      }
      // Float when hovered or selected
      const targetY = hovered || isSelected ? 0.15 : 0
      ref.current.position.y += (targetY - ref.current.position.y) * 0.1
    }
    if (glowRef.current) {
      glowRef.current.intensity = (hovered || isSelected)
        ? 1.5 + Math.sin(state.clock.elapsedTime * 3) * 0.5
        : 0
    }
  })

  // Get the appropriate body component for this character if it has no sprite
  const WarriorBody = character.sprite ? null : getWarriorComponent(character.id)

  return (
    <group
      position={[character.position.x, 0, character.position.z]}
      onPointerDown={(e) => { e.stopPropagation(); onClick(character) }}
      onPointerOver={(e) => { e.stopPropagation(); setHovered(true); document.body.style.cursor = 'pointer' }}
      onPointerOut={() => { setHovered(false); document.body.style.cursor = 'auto' }}
    >
      <group ref={ref}>
        {/* Commander platform */}
        {character.visualType === 'commander' && (
          <mesh position={[0, 0.25, 0]}>
            <boxGeometry args={[0.9, 0.5, 1.2]} />
            <meshStandardMaterial color="#5a3800" roughness={0.8} />
          </mesh>
        )}

        {/* ── Character body ── */}
        {character.sprite ? (
          <Suspense fallback={null}>
            <SpriteBody url={character.sprite} height={totalH * 1.5} />
          </Suspense>
        ) : (
          <WarriorBody character={character} isSelected={isSelected} hovered={hovered} />
        )}

        {/* Selection / hover glow */}
        <pointLight
          ref={glowRef}
          position={[0, totalH * 0.4, 0]}
          intensity={0}
          color={colors.glow}
          distance={5}
        />

        {/* Ground shadow indicator */}
        {(hovered || isSelected) && (
          <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.02, 0]}>
            <circleGeometry args={[0.7, 16]} />
            <meshStandardMaterial color={colors.glow} transparent opacity={0.3} depthWrite={false} />
          </mesh>
        )}

        {/* Invisible large hit zone for easier clicking */}
        <mesh position={[0, totalH * 0.4, 0]}>
          <cylinderGeometry args={[1.0, 1.0, totalH * 0.85, 8]} />
          <meshBasicMaterial transparent opacity={0} depthWrite={false} />
        </mesh>
      </group>

      {/* Floating name label — always visible */}
      <Html
        position={[0, totalH + 1.2, 0]}
        center
        distanceFactor={18}
        occlude={false}
        zIndexRange={[10, 0]}
        style={{ pointerEvents: 'none' }}
      >
        <div
          className={`px-2 py-0.5 rounded text-xs font-garamond whitespace-nowrap transition-all duration-200 ${
            hovered || isSelected
              ? 'bg-black/80 text-yellow-300 scale-110'
              : 'bg-black/50 text-yellow-100/80'
          }`}
          style={{ fontFamily: '"EB Garamond", Georgia, serif' }}
        >
          {character.name}
          {character.conch && (
            <span style={{ color: '#aaddff', marginLeft: 4, fontSize: '0.75em' }}>
              ♦ {character.conch}
            </span>
          )}
        </div>
      </Html>
    </group>
  )
}
