import React, { useState } from 'react';
import { galleryImages } from '../data';
import GalleryModal from './GalleryModal';

const Gallery = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalImages, setModalImages] = useState([]);
  const [modalTitle, setModalTitle] = useState('');
  const [startingIndex, setStartingIndex] = useState(0);

  const categories = [
    { value: 'all', label: 'All Photos' },
    { value: 'property', label: 'Property' },
    { value: 'rooms', label: 'Rooms' },
    { value: 'views', label: 'Views' }
  ];

  const BASE_URL = import.meta.env.BASE_URL;
  const scrollPositionRef = React.useRef(0);

  const filteredImages =
  selectedCategory === 'all'
    ? galleryImages
    : galleryImages.filter((img) => img.category === selectedCategory);

  const handleImageClick = (image) => {
  scrollPositionRef.current = window.scrollY;
  const startingIndex = filteredImages.findIndex(img => img.id === image.id);
  setModalImages(filteredImages.map(img => `${BASE_URL}${img.fullUrl.slice(1)}`));
  setModalTitle(image.title);
  setIsModalOpen(true);
  setStartingIndex(startingIndex);  // Add this
};

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setTimeout(() => {
    window.scrollTo(0, scrollPositionRef.current);  // ← restore after modal closes
  }, 0);
  };

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
                      ? 'linear-gradient(to bottom right, var(--accent-text), var(--accent-strong))'
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
              onClick={() => handleImageClick(image)}
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
                src={`${BASE_URL}${image.coverUrl.slice(1)}`}  // Use coverUrl for gallery grid
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

      {/* Gallery Modal */}
      <GalleryModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        images={modalImages}
        title={modalTitle}
        startingIndex={startingIndex}
      />
    </section>
  );
};

export default Gallery;