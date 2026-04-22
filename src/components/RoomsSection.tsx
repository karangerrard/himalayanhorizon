import React, { useState } from 'react';
import { Users, Check, Image } from 'lucide-react';
import { roomsData } from '../mock';
import GalleryModal from './GalleryModal';

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
            Comfortable Accommodations
          </h2>
          <p className="body-large" style={{ color: 'var(--text-secondary)', maxWidth: '600px', margin: '0 auto' }}>
            Choose from our thoughtfully designed rooms with stunning mountain views
          </p>
        </div>

        <div className="ai-grid">
          {roomsData.map((room) => (
            <div
              key={room.id}
              className="product-card"
              style={{ padding: 0, overflow: 'hidden', cursor: 'pointer' }}
              onClick={() => setSelectedRoom(room)}
            >
              <div
                style={{
                  width: '100%',
                  height: '220px',
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
                  onMouseEnter={(e) => {
                    e.target.style.transform = 'scale(1.05)';
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.transform = 'scale(1)';
                  }}
                />
                <div
                  style={{
                    position: 'absolute',
                    bottom: '1rem',
                    right: '1rem',
                    background: 'rgba(255, 255, 255, 0.95)',
                    backdropFilter: 'blur(8px)',
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
                <div
                  style={{
                    marginTop: '1rem',
                    padding: '0.75rem',
                    background: 'var(--accent-wash)',
                    borderRadius: '8px',
                    textAlign: 'center',
                    fontSize: '0.875rem',
                    fontWeight: 500,
                    color: 'var(--accent-text)'
                  }}
                >
                  Click to view gallery
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