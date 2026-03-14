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
  const vt = character.visualType || 'warrior'
  const s = vt === 'commander' ? 1.1 : vt === 'king' ? 1.05 : 1.0

  // Face expression based on side
  const expression = character.side === 'kaurava' ? 'stern' : 'neutral'

  // Crown type mapping
  const crownType = vt === 'commander' ? 'commander'
    : vt === 'king' ? 'king'
    : vt === 'prince' ? 'prince'
    : 'warrior'

  // Weapon — commanders and warriors get a sword, kings get nothing visible
  const showSword = vt === 'warrior' || vt === 'prince'
  const rightPose = showSword ? 'holding_weapon' : 'at_side'

  return (
    <BaseFigure
      bodyScale={s}
      totalHeight={totalH}
      skinColor={palette.skin}
      armorColor={palette.armor}
      dhotiColor={palette.dhoti}
      rightArmPose={rightPose}
      rightArmArmorColor={palette.armor}
      leftArmPose={character.conch ? 'holding_weapon' : 'at_side'}
      leftArmArmorColor={palette.armor}
      faceOptions={{
        skinColor: palette.skin,
        age: vt === 'commander' ? 'middle' : 'young',
        expression,
        eyeSize: 'normal',
      }}
      headgear={<Crown type={crownType} color={palette.crown} scale={s} />}
      weapon={
        showSword ? (
          <group position={[0.4 * s, totalH * 0.35, 0.05]} rotation={[0.2, 0, 0.3]}>
            <Sword scale={s * 0.8} />
          </group>
        ) : null
      }
      accessory={
        character.conch ? (
          <group position={[-0.4 * s, totalH * 0.32, 0]}>
            <Conch scale={s} />
          </group>
        ) : null
      }
    />
  )
}
