import React, { useState } from 'react';
import { galleryImages } from '../data';

const Gallery = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');

  const categories = [
    { value: 'all', label: 'All Photos' },
    { value: 'property', label: 'Property' },
    { value: 'rooms', label: 'Rooms' },
    { value: 'views', label: 'Views' }
  ];

  const filteredImages =
    selectedCategory === 'all'
      ? galleryImages
      : galleryImages.filter((img) => img.category === selectedCategory);

  return (
    <section
      id="gallery"
      style={{
        padding: '4rem 1.5rem',
        background: 'var(--bg-page)'
      }}
    >
      <div className="container">
        <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
          <h2 className="heading-2" style={{ marginBottom: '1rem' }}>
            Photo Gallery
          </h2>
          <p className="body-large" style={{ color: 'var(--text-secondary)', maxWidth: '600px', margin: '0 auto 2rem' }}>
            A glimpse of our beautiful homestay and the stunning surroundings
          </p>

          {/* Category Filter */}
          <div
            style={{
              display: 'flex',
              gap: '0.5rem',
              justifyContent: 'center',
              flexWrap: 'wrap'
            }}
          >
            {categories.map((category) => (
              <button
                key={category.value}
                onClick={() => setSelectedCategory(category.value)}
                style={{
                  background:
                    selectedCategory === category.value
                      ? 'linear-gradient(to bottom right, var(--accent-primary), var(--accent-strong))'
                      : 'transparent',
                  color:
                    selectedCategory === category.value ? 'white' : 'var(--text-primary)',
                  border:
                    selectedCategory === category.value
                      ? 'none'
                      : '1px solid var(--border-light)',
                  borderRadius: '9999px',
                  padding: '0.5rem 1.5rem',
                  fontFamily: 'system-ui, sans-serif',
                  fontWeight: 500,
                  fontSize: '0.875rem',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease'
                }}
                onMouseEnter={(e) => {
                  if (selectedCategory !== category.value) {
                    e.target.style.background = 'rgba(0, 0, 0, 0.05)';
                  }
                }}
                onMouseLeave={(e) => {
                  if (selectedCategory !== category.value) {
                    e.target.style.background = 'transparent';
                  }
                }}
              >
                {category.label}
              </button>
            ))}
          </div>
        </div>

        {/* Gallery Grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
            gap: '1.5rem'
          }}
        >
          {filteredImages.map((image) => (
            <div
              key={image.id}
              style={{
                borderRadius: '12px',
                overflow: 'hidden',
                border: '1px solid var(--border-light)',
                cursor: 'pointer',
                transition: 'transform 0.2s ease, box-shadow 0.2s ease',
                aspectRatio: '4/3'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-4px)';
                e.currentTarget.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.1)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = 'none';
              }}
            >
              <img
                src={image.url}
                alt={image.title}
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover'
                }}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Gallery;