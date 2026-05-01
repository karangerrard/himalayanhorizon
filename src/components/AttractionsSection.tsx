import React, { useState } from 'react';
import { Image } from 'lucide-react';
import { attractionsData } from '../data';
import GalleryModal from './GalleryModal';
import { AspectRatio } from '@radix-ui/react-aspect-ratio';

const AttractionsSection = () => {
  const [selectedAttraction, setSelectedAttraction] = useState(null);
  const BASE_URL = import.meta.env.BASE_URL;

  return (
    <section
      id="attractions"
      style={{
        padding: '4rem 1.5rem',
        background: 'var(--bg-section)'
      }}
    >
      <div className="container">
        <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
          <h2 className="heading-2" style={{ marginBottom: '1rem' }}>
            Nearby Attractions
          </h2>
          <p className="body-large" style={{ color: 'var(--text-secondary)', maxWidth: '600px', margin: '0 auto' }}>
            Explore the breathtaking beauty and adventure destinations around our homestay
          </p>
        </div>

        <div className="ai-grid">
          {attractionsData.map((attraction) => (
            <div
              key={attraction.id}
              className="product-card"
              style={{ padding: 0, overflow: 'hidden' }}
            >
              <div
                style={{
                  width: '100%',
                  AspectRatio: '4 / 3',
                  overflow: 'hidden',
                  position: 'relative'
                }}
              >
                <img
                  src={`${BASE_URL}${attraction.image.slice(1)}`}
                  alt={attraction.name}
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    transition: 'transform 0.3s ease'
                  }}
                />
                <span
                  style={{
                    position: 'absolute',
                    top: '1rem',
                    right: '1rem',
                    background: 'rgba(255, 255, 255, 0.95)',
                    backdropFilter: 'blur(8px)',
                    color: 'var(--accent-text)',
                    padding: '0.5rem 1rem',
                    borderRadius: '9999px',
                    fontSize: '0.875rem',
                    fontWeight: 600,
                    boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)'
                  }}
                >
                  {attraction.distance}
                </span>
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
                  {attraction.gallery.length}
                </div>
              </div>
              <div style={{ padding: '1.5rem' }}>
                <h3 className="heading-3" style={{ marginBottom: '0.75rem' }}>
                  {attraction.name}
                </h3>
                <p className="body-medium" style={{ color: 'var(--text-secondary)', marginBottom: '1rem' }}>
                  {attraction.description}
                </p>
                <div
                  onClick={() => setSelectedAttraction(attraction)}
                  style={{
                    padding: '0.75rem',
                    background: 'var(--accent-text)',
                    borderRadius: '8px',
                    textAlign: 'center',
                    cursor: 'pointer',
                    fontSize: '0.875rem',
                    fontWeight: 500,
                    color: 'rgb(255, 255, 255)',
                  }}
                  onMouseEnter={(e) => e.target.style.transform = 'translateY(-3px)'}
                  onMouseLeave={(e) => e.target.style.transform = 'translateY(0)'}
                >
                  Click to view gallery
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {selectedAttraction && (
        <GalleryModal
          isOpen={!!selectedAttraction}
          onClose={() => setSelectedAttraction(null)}
          images={selectedAttraction.gallery.map(img => `${BASE_URL}${img.slice(1)}`)}
          title={selectedAttraction.name}
          startingIndex={0}
        />
      )}
    </section>
  );
};

export default AttractionsSection;