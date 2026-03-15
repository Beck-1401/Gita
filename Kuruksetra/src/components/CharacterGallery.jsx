
import React from 'react';

export default function CharacterGallery({ character }) {
  if (!character) return null;

  return (
    <div style={{
      height: '100%',
      width: '100%',
      backgroundColor: 'rgba(12, 12, 15, 0.9)',
      backdropFilter: 'blur(15px)',
      borderRight: '1px solid rgba(200, 168, 75, 0.4)',
      padding: '50px 25px',
      display: 'flex',
      flexDirection: 'column',
      gap: '24px',
      color: '#d4c8a0',
      overflowY: 'auto',
      boxShadow: '10px 0 30px rgba(0,0,0,0.5)'
    }}>
      <div style={{ marginBottom: '10px' }}>
        <h2 style={{ 
          fontFamily: '"EB Garamond", serif', 
          fontSize: '2rem',
          color: '#c8a84b',
          margin: 0,
          textTransform: 'uppercase',
          letterSpacing: '2px'
        }}>
          Visual Archive
        </h2>
        <div style={{ width: '40px', height: '2px', backgroundColor: '#c8a84b', marginTop: '8px' }}></div>
      </div>

      <div style={{ 
        fontFamily: '"EB Garamond", serif',
        fontSize: '1.2rem',
        fontStyle: 'italic',
        opacity: 0.9,
        marginBottom: '10px'
      }}>
        Representations of {character.name}
      </div>
      
      <div style={{
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        gap: '12px'
      }}>
        {/* Gallery placeholders representing future content */}
        {[
          'AI Portrait', 
          'Museum Sculpture', 
          'Classical Painting', 
          'Temple Relic',
          'Modern Art',
          'Manuscript Illumination'
        ].map((label, i) => (
          <div key={i} style={{
            aspectRatio: '1/1.2',
            backgroundColor: 'rgba(255, 255, 255, 0.03)',
            border: '1px solid rgba(200, 168, 75, 0.15)',
            borderRadius: '2px',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '10px',
            transition: 'all 0.3s ease',
            cursor: 'default'
          }}>
            <div style={{ 
              width: '60%', 
              height: '1px', 
              backgroundColor: 'rgba(200, 168, 75, 0.2)',
              marginBottom: '10px'
            }}></div>
            <span style={{ 
              fontSize: '0.7rem', 
              textAlign: 'center',
              textTransform: 'uppercase',
              letterSpacing: '1px',
              opacity: 0.5
            }}>
              {label}
            </span>
            <span style={{ fontSize: '0.6rem', opacity: 0.3, marginTop: '4px' }}>[PENDING]</span>
          </div>
        ))}
      </div>
      
      <div style={{ 
        marginTop: 'auto', 
        paddingTop: '20px',
        borderTop: '1px solid rgba(200, 168, 75, 0.1)',
        fontSize: '0.85rem',
        lineHeight: '1.5',
        opacity: 0.6,
        fontStyle: 'italic'
      }}>
        "The infinite forms of the Divine are reflected in the mirrors of human devotion and artistic tradition."
      </div>
    </div>
  );
}
