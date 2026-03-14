/**
 * BaseFigure — shared anatomical skeleton for all named warriors.
 *
 * Composes body parts into a complete figure with:
 *   - Torso (upper chest + abdomen + shoulders)
 *   - Two arms with elbows and hands
 *   - Legs hidden by dhoti
 *   - Neck + head with face texture
 *
 * Individual character components wrap this and add:
 *   - Character-specific headgear/crown
 *   - Weapons & accessories
 *   - Custom color palette
 *   - Proportion overrides
 *   - Unique details (earrings, threads, flutes, etc.)
 */
import { useMemo } from 'react'
import { Torso, Arm, Leg, Dhoti, HeadWithFace } from '../../utils/bodyParts'
import { generateFaceTexture } from '../../utils/canvasTextures'

export default function BaseFigure({
  // Body proportions
  bodyScale = 1,
  totalHeight = 2.2,
  muscleIntensity = 0,    // 0-1

  // Colors
  skinColor = '#3d1a00',
  armorColor = null,       // null = show skin, string = armor plate color
  dhotiColor = '#e8d5a0',

  // Face
  faceOptions = {},        // passed to generateFaceTexture
  faceTexture: externalFaceTexture = null, // or pass a pre-made texture

  // Pose
  leftArmPose = 'at_side',
  rightArmPose = 'at_side',
  leftArmArmorColor = null,
  rightArmArmorColor = null,

  // Slots for character-specific additions
  headgear = null,         // React element rendered above head
  weapon = null,           // React element, positioned by character
  accessory = null,        // React element (flute, thread, earrings, etc.)
  backAccessory = null,    // Quiver, cape, etc.

  // Extra children rendered inside the figure group
  children,
}) {
  // Generate face texture (memoized)
  const faceTextureMemo = useMemo(() => {
    if (externalFaceTexture) return externalFaceTexture
    if (Object.keys(faceOptions).length > 0) {
      return generateFaceTexture({
        skinColor,
        ...faceOptions,
        cacheKey: JSON.stringify({ skinColor, ...faceOptions }),
      })
    }
    return null
  }, [skinColor, JSON.stringify(faceOptions), externalFaceTexture])

  // Vertical layout
  const s = bodyScale
  const legY = totalHeight * 0.08 * s
  const dhotiY = totalHeight * 0.22 * s
  const torsoY = totalHeight * 0.42 * s
  const armY = totalHeight * 0.48 * s
  const headY = totalHeight * 0.65 * s
  const headgearY = totalHeight * 0.78 * s

  return (
    <group>
      {/* Legs (mostly hidden by dhoti) */}
      <group position={[0, legY, 0]}>
        <Leg side="left" skinColor={skinColor} scale={s} dhotiBound />
        <Leg side="right" skinColor={skinColor} scale={s} dhotiBound />
      </group>

      {/* Dhoti / lower garment */}
      <group position={[0, dhotiY, 0]}>
        <Dhoti color={dhotiColor} scale={s} />
      </group>

      {/* Torso */}
      <group position={[0, torsoY, 0]}>
        <Torso
          skinColor={skinColor}
          armorColor={armorColor}
          muscleIntensity={muscleIntensity}
          scale={s}
        />
      </group>

      {/* Arms */}
      <group position={[0, armY, 0]}>
        <Arm side="left" skinColor={skinColor} pose={leftArmPose} armorColor={leftArmArmorColor} scale={s} />
        <Arm side="right" skinColor={skinColor} pose={rightArmPose} armorColor={rightArmArmorColor} scale={s} />
      </group>

      {/* Head */}
      <group position={[0, headY, 0]}>
        <HeadWithFace
          skinColor={skinColor}
          faceTexture={faceTextureMemo}
          scale={s}
        />
      </group>

      {/* Headgear slot */}
      {headgear && (
        <group position={[0, headgearY, 0]}>
          {headgear}
        </group>
      )}

      {/* Weapon slot */}
      {weapon}

      {/* Back accessory (quiver, cape) */}
      {backAccessory && (
        <group position={[0, torsoY, -0.15 * s]}>
          {backAccessory}
        </group>
      )}

      {/* General accessory slot */}
      {accessory}

      {/* Additional children */}
      {children}
    </group>
  )
}
