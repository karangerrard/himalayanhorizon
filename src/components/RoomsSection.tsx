import React, { useState } from 'react';
import { Users, Check, Image, AlignCenter } from 'lucide-react';
import { roomsData } from '../data';
import GalleryModal from './GalleryModal';
import { AspectRatio } from '@radix-ui/react-aspect-ratio';

const RoomsSection = () => {
  const [selectedRoom, setSelectedRoom] = useState(null);

  return (
    <section
      id="rooms"
      style={{
        padding: '4rem 1.5rem',
        background: 'var(--bg-section)'
      }}
    >
      <div className="container">
        <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
          <h2 className="heading-2" style={{ marginBottom: '1rem' }}>
             Accomodation
          </h2>
          <p className="body-large" style={{ color: 'var(--text-secondary)', maxWidth: '600px', margin: '0 auto' }}>
            Choose from our modern designed rooms with in serene Deohari Village
          </p>
        </div>

        <div className="ai-grid">
          {roomsData.map((room) => (
            <div
              key={room.id}
              className="product-card"
              style={{ padding: 0, overflow: 'hidden' }}
            >
              <div
                style={{
                  width: '100%',
                  AspectRatio: '16 / 9',
                  overflow: 'hidden',
                  position: 'relative'
                }}
              >
                <img
                  src={room.image}
                  alt={room.name}
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    transition: 'transform 0.3s ease'
                  }}
                />
                <div
                  style={{
                    position: 'absolute',
                    bottom: '1rem',
                    right: '1rem',
                    background: 'rgba(255, 255, 255, 0.95)',
                    padding: '0.5rem 0.75rem',
                    borderRadius: '9999px',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.5rem',
                    fontSize: '0.875rem',
                    fontWeight: 600,
                    color: 'var(--text-primary)',
                    boxShadow: '0 2px 8px rgba(0, 0, 0, 0.15)'
                  }}
                >
                  <Image size={16} style={{ color: 'var(--accent-text)' }} />
                  {room.gallery.length}
                </div>
              </div>
              <div style={{ padding: '1.5rem' }}>
                <h3 className="heading-3" style={{ marginBottom: '0.5rem' }}>
                  {room.name}
                </h3>
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.5rem',
                    marginBottom: '1rem'
                  }}
                >
                  <Users size={16} style={{ color: 'var(--text-secondary)' }} />
                  <span className="body-small">{room.capacity}</span>
                </div>
                <p className="body-medium" style={{ color: 'var(--text-secondary)', marginBottom: '1rem' }}>
                  {room.description}
                </p>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                  {room.features.map((feature, index) => (
                    <div
                      key={index}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.5rem'
                      }}
                    >
                      <Check size={16} style={{ color: 'var(--accent-text)' }} />
                      <span className="body-small">{feature}</span>
                    </div>
                  ))}
                </div>
                
                  {/* Price and Button Container */}
                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    marginTop: '1rem',
                    marginBottom: '1rem',
                    gap: '1rem',
                    flexWrap: 'wrap'
                  }}
                >
                  <h4 className="heading-4" style={{ marginBottom: 0 }}>
                    Price : 1100Rs<span className="per-night" >/night</span>
                  </h4>
                  <button
                    onClick={() => setSelectedRoom(room)}
                    className="view-photos-btn"
                    style={{
                      padding: 'clamp(0.5rem, 2vw, 0.75rem)',
                      background: 'var(--accent-text)',
                      borderRadius: '8px',
                      fontSize: 'clamp(0.75rem, 2vw, 0.875rem)',
                      fontWeight: 500,
                      color: 'rgb(255, 255, 255)',
                      cursor: 'pointer',
                      border: 'none',
                      width: 'auto',
                      transition: 'all 0.2s ease',
                      fontFamily: 'inherit',
                      whiteSpace: 'nowrap'
                    }}
                    onMouseEnter={(e) => e.target.style.transform = 'translateY(-3px)'}
                    onMouseLeave={(e) => e.target.style.transform = 'translateY(0)'}
                  >
                    View Photos
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {selectedRoom && (
        <GalleryModal
          isOpen={!!selectedRoom}
          onClose={() => setSelectedRoom(null)}
          images={selectedRoom.gallery}
          title={selectedRoom.name}
        />
      )}
    </section>
  );
};

export default RoomsSection;