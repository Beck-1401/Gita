import * as THREE from 'three'

/**
 * Generate a procedural face texture using the Canvas 2D API.
 * Returns a THREE.CanvasTexture mapped to the front hemisphere of the head.
 *
 * Inspired by Indian miniature painting traditions — warm skin tones,
 * strong eyes, decorative marks.
 */

const FACE_CACHE = new Map()

export function generateFaceTexture({
  skinColor = '#8B6914',
  age = 'young',         // 'young' | 'middle' | 'elderly'
  beard = null,           // null | 'short' | 'long' | 'white_long' | 'white_short'
  mustache = null,        // null | 'thin' | 'full' | 'white'
  eyeColor = '#1a0a00',
  eyeSize = 'normal',     // 'normal' | 'large' | 'narrow'
  tilaka = false,         // forehead mark
  expression = 'neutral', // 'neutral' | 'stern' | 'serene' | 'anguished' | 'fierce'
  skinTint = null,        // override skin color (e.g. '#3366aa' for Krishna's blue)
  cacheKey = null,
} = {}) {
  // Cache check
  const key = cacheKey || JSON.stringify(arguments[0])
  if (FACE_CACHE.has(key)) return FACE_CACHE.get(key)

  const size = 256
  const canvas = document.createElement('canvas')
  canvas.width = size
  canvas.height = size
  const ctx = canvas.getContext('2d')

  const baseColor = skinTint || skinColor

  // Fill base skin
  ctx.fillStyle = baseColor
  ctx.fillRect(0, 0, size, size)

  // Subtle skin shading — darker at edges for roundness
  const gradient = ctx.createRadialGradient(
    size * 0.5, size * 0.45, size * 0.1,
    size * 0.5, size * 0.45, size * 0.5
  )
  gradient.addColorStop(0, 'rgba(255,255,255,0.08)')
  gradient.addColorStop(0.6, 'rgba(0,0,0,0)')
  gradient.addColorStop(1, 'rgba(0,0,0,0.2)')
  ctx.fillStyle = gradient
  ctx.fillRect(0, 0, size, size)

  // Age wrinkles
  if (age === 'elderly') {
    ctx.strokeStyle = 'rgba(0,0,0,0.15)'
    ctx.lineWidth = 1.5
    // Forehead lines
    for (let i = 0; i < 3; i++) {
      const y = size * (0.15 + i * 0.05)
      ctx.beginPath()
      ctx.moveTo(size * 0.25, y)
      ctx.quadraticCurveTo(size * 0.5, y - 4 + i * 2, size * 0.75, y)
      ctx.stroke()
    }
    // Crow's feet
    for (let side = 0; side < 2; side++) {
      const cx = side === 0 ? size * 0.22 : size * 0.78
      for (let j = 0; j < 3; j++) {
        ctx.beginPath()
        const angle = -0.4 + j * 0.3
        ctx.moveTo(cx, size * 0.4)
        ctx.lineTo(cx + Math.cos(angle) * 15 * (side === 0 ? -1 : 1), size * 0.4 + Math.sin(angle) * 15)
        ctx.stroke()
      }
    }
    // Nasolabial folds
    ctx.strokeStyle = 'rgba(0,0,0,0.12)'
    ctx.lineWidth = 1.8
    for (let side = 0; side < 2; side++) {
      const sx = side === 0 ? size * 0.35 : size * 0.65
      ctx.beginPath()
      ctx.moveTo(sx, size * 0.48)
      ctx.quadraticCurveTo(sx + (side === 0 ? -8 : 8), size * 0.6, sx + (side === 0 ? -4 : 4), size * 0.7)
      ctx.stroke()
    }
  } else if (age === 'middle') {
    ctx.strokeStyle = 'rgba(0,0,0,0.08)'
    ctx.lineWidth = 1
    for (let i = 0; i < 2; i++) {
      const y = size * (0.17 + i * 0.05)
      ctx.beginPath()
      ctx.moveTo(size * 0.3, y)
      ctx.quadraticCurveTo(size * 0.5, y - 2, size * 0.7, y)
      ctx.stroke()
    }
  }

  // Eyebrows
  const browColor = (age === 'elderly' && beard?.startsWith('white')) ? 'rgba(200,200,200,0.7)' : 'rgba(20,10,0,0.6)'
  ctx.strokeStyle = browColor
  ctx.lineWidth = age === 'elderly' ? 3.5 : 2.5
  const browY = size * 0.32
  // Left brow
  ctx.beginPath()
  if (expression === 'stern' || expression === 'fierce') {
    ctx.moveTo(size * 0.22, browY + 2)
    ctx.quadraticCurveTo(size * 0.32, browY - 6, size * 0.43, browY - 2)
  } else if (expression === 'anguished') {
    ctx.moveTo(size * 0.22, browY - 3)
    ctx.quadraticCurveTo(size * 0.32, browY + 4, size * 0.43, browY - 5)
  } else {
    ctx.moveTo(size * 0.22, browY)
    ctx.quadraticCurveTo(size * 0.32, browY - 5, size * 0.43, browY)
  }
  ctx.stroke()
  // Right brow (mirror)
  ctx.beginPath()
  if (expression === 'stern' || expression === 'fierce') {
    ctx.moveTo(size * 0.78, browY + 2)
    ctx.quadraticCurveTo(size * 0.68, browY - 6, size * 0.57, browY - 2)
  } else if (expression === 'anguished') {
    ctx.moveTo(size * 0.78, browY - 3)
    ctx.quadraticCurveTo(size * 0.68, browY + 4, size * 0.57, browY - 5)
  } else {
    ctx.moveTo(size * 0.78, browY)
    ctx.quadraticCurveTo(size * 0.68, browY - 5, size * 0.57, browY)
  }
  ctx.stroke()

  // Eyes
  const eyeY = size * 0.4
  const eyeW = eyeSize === 'large' ? 20 : eyeSize === 'narrow' ? 12 : 16
  const eyeH = eyeSize === 'large' ? 10 : eyeSize === 'narrow' ? 5 : 7
  for (let side = 0; side < 2; side++) {
    const ex = side === 0 ? size * 0.33 : size * 0.67
    // Eye white
    ctx.fillStyle = '#f5f0e8'
    ctx.beginPath()
    ctx.ellipse(ex, eyeY, eyeW, eyeH, 0, 0, Math.PI * 2)
    ctx.fill()
    // Iris
    ctx.fillStyle = eyeColor
    ctx.beginPath()
    ctx.ellipse(ex, eyeY, eyeH * 0.7, eyeH * 0.7, 0, 0, Math.PI * 2)
    ctx.fill()
    // Pupil
    ctx.fillStyle = '#000'
    ctx.beginPath()
    ctx.ellipse(ex, eyeY, eyeH * 0.35, eyeH * 0.35, 0, 0, Math.PI * 2)
    ctx.fill()
    // Eye highlight
    ctx.fillStyle = 'rgba(255,255,255,0.6)'
    ctx.beginPath()
    ctx.ellipse(ex + 2, eyeY - 2, 2, 2, 0, 0, Math.PI * 2)
    ctx.fill()
    // Eyeliner (kohl) — heavier for Indian aesthetic
    ctx.strokeStyle = 'rgba(0,0,0,0.7)'
    ctx.lineWidth = 1.5
    ctx.beginPath()
    ctx.ellipse(ex, eyeY, eyeW + 1, eyeH + 1, 0, 0, Math.PI * 2)
    ctx.stroke()
    // Extended corner line (kajal style)
    ctx.beginPath()
    ctx.moveTo(ex + (side === 0 ? -eyeW : eyeW), eyeY)
    ctx.lineTo(ex + (side === 0 ? -eyeW - 4 : eyeW + 4), eyeY + 2)
    ctx.stroke()
  }

  // Nose — subtle shadow
  ctx.strokeStyle = 'rgba(0,0,0,0.15)'
  ctx.lineWidth = 1.5
  ctx.beginPath()
  ctx.moveTo(size * 0.5, size * 0.42)
  ctx.lineTo(size * 0.48, size * 0.55)
  ctx.quadraticCurveTo(size * 0.5, size * 0.57, size * 0.52, size * 0.55)
  ctx.stroke()

  // Mouth
  const mouthY = size * 0.65
  ctx.lineWidth = 2
  if (expression === 'serene') {
    // Gentle smile
    ctx.strokeStyle = 'rgba(120,40,30,0.5)'
    ctx.beginPath()
    ctx.moveTo(size * 0.4, mouthY)
    ctx.quadraticCurveTo(size * 0.5, mouthY + 6, size * 0.6, mouthY)
    ctx.stroke()
    // Lips tint
    ctx.fillStyle = 'rgba(150,60,50,0.15)'
    ctx.beginPath()
    ctx.ellipse(size * 0.5, mouthY, 15, 5, 0, 0, Math.PI * 2)
    ctx.fill()
  } else if (expression === 'anguished') {
    // Slight downturn
    ctx.strokeStyle = 'rgba(100,30,20,0.5)'
    ctx.beginPath()
    ctx.moveTo(size * 0.38, mouthY - 2)
    ctx.quadraticCurveTo(size * 0.5, mouthY + 8, size * 0.62, mouthY - 2)
    ctx.stroke()
    // Slightly parted
    ctx.fillStyle = 'rgba(60,20,15,0.3)'
    ctx.beginPath()
    ctx.ellipse(size * 0.5, mouthY + 2, 8, 3, 0, 0, Math.PI * 2)
    ctx.fill()
  } else if (expression === 'fierce') {
    // Tight-lipped, wider
    ctx.strokeStyle = 'rgba(80,20,10,0.6)'
    ctx.beginPath()
    ctx.moveTo(size * 0.35, mouthY)
    ctx.lineTo(size * 0.65, mouthY)
    ctx.stroke()
    ctx.lineWidth = 1
    ctx.beginPath()
    ctx.moveTo(size * 0.35, mouthY)
    ctx.quadraticCurveTo(size * 0.5, mouthY - 2, size * 0.65, mouthY)
    ctx.stroke()
  } else {
    // Neutral / stern
    ctx.strokeStyle = 'rgba(100,40,30,0.4)'
    ctx.beginPath()
    ctx.moveTo(size * 0.4, mouthY)
    ctx.quadraticCurveTo(size * 0.5, mouthY + 2, size * 0.6, mouthY)
    ctx.stroke()
  }

  // Tilaka (forehead mark)
  if (tilaka) {
    // Vertical sandalwood mark
    ctx.fillStyle = '#e8c868'
    ctx.beginPath()
    ctx.ellipse(size * 0.5, size * 0.2, 4, 14, 0, 0, Math.PI * 2)
    ctx.fill()
    // Red center dot
    ctx.fillStyle = '#cc3333'
    ctx.beginPath()
    ctx.arc(size * 0.5, size * 0.2, 3, 0, Math.PI * 2)
    ctx.fill()
  }

  // Mustache
  if (mustache) {
    const mColor = mustache === 'white' ? 'rgba(210,210,210,0.8)' : 'rgba(20,10,0,0.5)'
    ctx.fillStyle = mColor
    ctx.beginPath()
    ctx.moveTo(size * 0.42, size * 0.58)
    ctx.quadraticCurveTo(size * 0.5, size * 0.61, size * 0.58, size * 0.58)
    ctx.quadraticCurveTo(size * 0.55, size * 0.63, size * 0.5, size * 0.635)
    ctx.quadraticCurveTo(size * 0.45, size * 0.63, size * 0.42, size * 0.58)
    ctx.fill()
    // Curl ends
    if (mustache === 'full' || mustache === 'white') {
      ctx.strokeStyle = mColor
      ctx.lineWidth = 2.5
      ctx.beginPath()
      ctx.moveTo(size * 0.42, size * 0.59)
      ctx.quadraticCurveTo(size * 0.36, size * 0.6, size * 0.33, size * 0.57)
      ctx.stroke()
      ctx.beginPath()
      ctx.moveTo(size * 0.58, size * 0.59)
      ctx.quadraticCurveTo(size * 0.64, size * 0.6, size * 0.67, size * 0.57)
      ctx.stroke()
    }
  }

  // Beard
  if (beard) {
    const bColor = beard.startsWith('white') ? 'rgba(220,220,220,0.7)' : 'rgba(20,10,0,0.4)'
    ctx.fillStyle = bColor
    if (beard === 'long' || beard === 'white_long') {
      // Full long beard
      ctx.beginPath()
      ctx.moveTo(size * 0.28, size * 0.55)
      ctx.quadraticCurveTo(size * 0.25, size * 0.7, size * 0.35, size * 0.88)
      ctx.quadraticCurveTo(size * 0.5, size * 0.95, size * 0.65, size * 0.88)
      ctx.quadraticCurveTo(size * 0.75, size * 0.7, size * 0.72, size * 0.55)
      ctx.quadraticCurveTo(size * 0.6, size * 0.68, size * 0.5, size * 0.69)
      ctx.quadraticCurveTo(size * 0.4, size * 0.68, size * 0.28, size * 0.55)
      ctx.fill()
      // Beard texture lines
      ctx.strokeStyle = beard.startsWith('white') ? 'rgba(255,255,255,0.3)' : 'rgba(0,0,0,0.1)'
      ctx.lineWidth = 0.8
      for (let i = 0; i < 8; i++) {
        const x = size * (0.35 + i * 0.04)
        ctx.beginPath()
        ctx.moveTo(x, size * 0.68)
        ctx.lineTo(x + (Math.random() - 0.5) * 4, size * 0.88)
        ctx.stroke()
      }
    } else {
      // Short beard
      ctx.beginPath()
      ctx.moveTo(size * 0.3, size * 0.58)
      ctx.quadraticCurveTo(size * 0.3, size * 0.72, size * 0.4, size * 0.76)
      ctx.quadraticCurveTo(size * 0.5, size * 0.8, size * 0.6, size * 0.76)
      ctx.quadraticCurveTo(size * 0.7, size * 0.72, size * 0.7, size * 0.58)
      ctx.quadraticCurveTo(size * 0.6, size * 0.66, size * 0.5, size * 0.67)
      ctx.quadraticCurveTo(size * 0.4, size * 0.66, size * 0.3, size * 0.58)
      ctx.fill()
    }
  }

  // Final vignette for depth
  const vignette = ctx.createRadialGradient(
    size * 0.5, size * 0.45, size * 0.25,
    size * 0.5, size * 0.45, size * 0.55
  )
  vignette.addColorStop(0, 'rgba(0,0,0,0)')
  vignette.addColorStop(1, 'rgba(0,0,0,0.15)')
  ctx.fillStyle = vignette
  ctx.fillRect(0, 0, size, size)

  const texture = new THREE.CanvasTexture(canvas)
  texture.needsUpdate = true
  FACE_CACHE.set(key, texture)
  return texture
}

/**
 * Generate a simple armor/cloth pattern texture
 */
export function generateArmorTexture({
  baseColor = '#8b1a1a',
  pattern = 'none',   // 'none' | 'diamonds' | 'chevrons' | 'lotus' | 'scales'
  metallic = false,
  cacheKey = null,
} = {}) {
  const key = cacheKey || `armor_${JSON.stringify(arguments[0])}`
  if (FACE_CACHE.has(key)) return FACE_CACHE.get(key)

  const size = 128
  const canvas = document.createElement('canvas')
  canvas.width = size
  canvas.height = size
  const ctx = canvas.getContext('2d')

  ctx.fillStyle = baseColor
  ctx.fillRect(0, 0, size, size)

  const patternColor = metallic ? 'rgba(255,215,100,0.3)' : 'rgba(255,255,255,0.15)'
  ctx.strokeStyle = patternColor
  ctx.lineWidth = 1

  if (pattern === 'diamonds') {
    const step = 16
    for (let y = 0; y < size; y += step) {
      for (let x = 0; x < size; x += step) {
        ctx.beginPath()
        ctx.moveTo(x + step / 2, y)
        ctx.lineTo(x + step, y + step / 2)
        ctx.lineTo(x + step / 2, y + step)
        ctx.lineTo(x, y + step / 2)
        ctx.closePath()
        ctx.stroke()
      }
    }
  } else if (pattern === 'scales') {
    const step = 12
    for (let row = 0; row < size / step; row++) {
      for (let col = 0; col < size / step; col++) {
        const ox = col * step + (row % 2) * step / 2
        const oy = row * step
        ctx.beginPath()
        ctx.arc(ox, oy + step, step * 0.6, Math.PI * 1.2, Math.PI * 1.8)
        ctx.stroke()
      }
    }
  } else if (pattern === 'chevrons') {
    const step = 16
    for (let y = 0; y < size; y += step) {
      ctx.beginPath()
      for (let x = 0; x < size; x += step) {
        ctx.moveTo(x, y + step / 2)
        ctx.lineTo(x + step / 2, y)
        ctx.lineTo(x + step, y + step / 2)
      }
      ctx.stroke()
    }
  }

  const texture = new THREE.CanvasTexture(canvas)
  texture.wrapS = THREE.RepeatWrapping
  texture.wrapT = THREE.RepeatWrapping
  texture.needsUpdate = true
  FACE_CACHE.set(key, texture)
  return texture
}
