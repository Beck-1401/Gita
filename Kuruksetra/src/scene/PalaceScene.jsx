import { Suspense } from 'react'
import { Html } from '@react-three/drei'
export default function PalaceScene({ position = [0, 0, 0] }) {
  return (
    <group position={position}>
      {/* ── Floor / Rug ── */}
      <mesh rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[10, 10]} />
        <meshStandardMaterial color="#800000" metalness={0.1} roughness={0.9} />
      </mesh>
      
      {/* ── Low Walls / Columns ── */}
      <mesh position={[0, 2.5, -5]}>
        <boxGeometry args={[10, 5, 0.5]} />
        <meshStandardMaterial color="#d4c8a0" />
      </mesh>
      <mesh position={[-5, 2.5, 0]}>
        <boxGeometry args={[0.5, 5, 10]} />
        <meshStandardMaterial color="#d4c8a0" />
      </mesh>

      {/* ── Throne / Seat for Dhṛtarāṣṭra ── */}
      <group position={[0, 0, -3.5]}>
        <mesh position={[0, 0.5, 0]}>
          <boxGeometry args={[1.5, 1.0, 1.5]} />
          <meshStandardMaterial color="#c8a84b" metalness={0.8} />
        </mesh>
      </group>

      {/* ── Sanjaya's Rug / Area ── */}
      <mesh position={[2.5, 0.05, -2]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[2, 2]} />
        <meshStandardMaterial color="#b03a2e" />
      </mesh>

      {/* ── Label for the scene ── */}
      <Html position={[0, 4, 0]} center>
        <div style={{ 
          fontFamily: '"EB Garamond", serif', 
          color: '#d4c8a0', 
          backgroundColor: 'rgba(0,0,0,0.6)',
          padding: '5px 15px',
          borderRadius: '20px',
          border: '1px solid #c8a84b'
        }}>
          Hastināpura Palace
        </div>
      </Html>
    </group>
  )
}
