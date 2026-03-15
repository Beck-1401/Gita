/**
 * GenericWarrior — enhanced default figure for warriors without a custom component.
 *
 * Uses BaseFigure with side-appropriate colors, a generated face, and
 * crown/weapon based on the character's visualType and data.
 * Much richer than the original geometric primitives — arms, face, dhoti —
 * but still generic enough to serve as a fallback.
 */
import BaseFigure from './BaseFigure'
import { Crown, Conch, Sword, Shield } from '../../utils/bodyParts'

const SIDE_PALETTES = {
  kaurava: {
    skin: '#6b4423',
    armor: '#8b1a1a',
    dhoti: '#c8a060',
    crown: '#c8a84b',
    accent: '#c0392b',
  },
  pandava: {
    skin: '#6b4423',
    armor: '#1a3a6b',
    dhoti: '#d4c8a0',
    crown: '#c8a84b',
    accent: '#1a5276',
  },
  center: {
    skin: '#6b4423',
    armor: '#1a3a5c',
    dhoti: '#e8d5a0',
    crown: '#c8a84b',
    accent: '#2244aa',
  },
}

export default function GenericWarrior({ character }) {
  const palette = SIDE_PALETTES[character.side] || SIDE_PALETTES.center
  const totalH = character.height || 2.2
  const s = character.visualType === 'commander' ? 1.2 : 1.0

  // ── Voxel "Ghost" Fallback ──
  // While we wait for sprites, we show a block-based figure
  return (
    <group scale={s}>
      {/* Head */}
      <mesh position={[0, totalH * 0.75, 0]}>
        <boxGeometry args={[0.4, 0.4, 0.4]} />
        <meshStandardMaterial 
          color={palette.skin} 
          transparent 
          opacity={0.8} 
        />
      </mesh>
      
      {/* Body */}
      <mesh position={[0, totalH * 0.45, 0]}>
        <boxGeometry args={[0.5, 0.6, 0.3]} />
        <meshStandardMaterial 
          color={palette.armor} 
          transparent 
          opacity={0.7} 
        />
      </mesh>

      {/* Dhoti / Base */}
      <mesh position={[0, totalH * 0.15, 0]}>
        <boxGeometry args={[0.55, 0.35, 0.4]} />
        <meshStandardMaterial 
          color={palette.dhoti} 
          transparent 
          opacity={0.6} 
        />
      </mesh>

      {/* Arm placeholders */}
      {[-1, 1].map(side => (
        <mesh key={side} position={[side * 0.35, totalH * 0.45, 0]}>
          <boxGeometry args={[0.15, 0.5, 0.15]} />
          <meshStandardMaterial color={palette.skin} transparent opacity={0.6} />
        </mesh>
      ))}

      {/* Decorative Crown Block */}
      <mesh position={[0, totalH * 0.95, 0]}>
        <boxGeometry args={[0.3, 0.15, 0.3]} />
        <meshStandardMaterial color={palette.crown} />
      </mesh>
    </group>
  )
}
