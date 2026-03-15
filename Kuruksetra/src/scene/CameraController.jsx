
import { useEffect, useRef } from 'react'
import { useFrame, useThree } from '@react-three/fiber'
import { OrbitControls } from '@react-three/drei'
import * as THREE from 'three'

export default function CameraController({ selectedCharacter }) {
  const { camera, gl } = useThree()
  const controlsRef = useRef()
  const keys = useRef({})

  // Keyboard listeners
  useEffect(() => {
    const handleKeyDown = (e) => keys.current[e.code] = true
    const handleKeyUp = (e) => keys.current[e.code] = false
    window.addEventListener('keydown', handleKeyDown)
    window.addEventListener('keyup', handleKeyUp)
    return () => {
      window.removeEventListener('keydown', handleKeyDown)
      window.removeEventListener('keyup', handleKeyUp)
    }
  }, [])

  useFrame((state, delta) => {
    if (!controlsRef.current) return

    // ─── 1. Keyboard Navigation (WASD / Arrows) ───
    // Disable keyboard movement when locked onto a character
    if (!selectedCharacter) {
      const moveSpeed = 15 * delta
      const forward = new THREE.Vector3()
      const side = new THREE.Vector3()

      camera.getWorldDirection(forward)
      forward.y = 0
      forward.normalize()
      
      side.crossVectors(forward, camera.up).normalize()

      // Move Target (the point we orbit around)
      if (keys.current['KeyW'] || keys.current['ArrowUp']) {
        controlsRef.current.target.addScaledVector(forward, moveSpeed)
        camera.position.addScaledVector(forward, moveSpeed)
      }
      if (keys.current['KeyS'] || keys.current['ArrowDown']) {
        controlsRef.current.target.addScaledVector(forward, -moveSpeed)
        camera.position.addScaledVector(forward, -moveSpeed)
      }
      if (keys.current['KeyA'] || keys.current['ArrowLeft']) {
        controlsRef.current.target.addScaledVector(side, -moveSpeed)
        camera.position.addScaledVector(side, -moveSpeed)
      }
      if (keys.current['KeyD'] || keys.current['ArrowRight']) {
        controlsRef.current.target.addScaledVector(side, moveSpeed)
        camera.position.addScaledVector(side, moveSpeed)
      }
    }

    // ─── 2. Smooth Transition to Selected Character ───
    if (selectedCharacter) {
      const targetPos = new THREE.Vector3(
        selectedCharacter.position.x,
        (selectedCharacter.position.y || 0) + (selectedCharacter.id === 'krishna' ? 1.6 : 1.3),
        selectedCharacter.position.z
      )
      // Gently lerp the orbit target to the character
      controlsRef.current.target.lerp(targetPos, 0.1)

      // Zoom in more closely for the "featured" view
      const targetDistance = 5.5
      const currentDistance = camera.position.distanceTo(controlsRef.current.target)
      
      if (currentDistance > targetDistance + 0.1) {
        // Create a vector from target to camera
        const dir = new THREE.Vector3().subVectors(camera.position, controlsRef.current.target).normalize()
        // Determine the ideal position at targetDistance
        const idealPos = new THREE.Vector3().addVectors(controlsRef.current.target, dir.multiplyScalar(targetDistance))
        // Lerp camera to that ideal position
        camera.position.lerp(idealPos, 0.05)
      }
    }

    controlsRef.current.update()
  })

  return (
    <OrbitControls
      ref={controlsRef}
      args={[camera, gl.domElement]}
      enableDamping
      dampingFactor={0.08}
      rotateSpeed={0.8}
      zoomSpeed={1.2}
      minDistance={2}
      maxDistance={120}
      maxPolarAngle={Math.PI / 2.05}
      // Disable autoRotate based on user request
      autoRotate={false} 
    />
  )
}
