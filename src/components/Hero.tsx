import React from 'react';
import { MapPin } from 'lucide-react';
import { homestayInfo } from '../mock';

const Hero = () => {
  const scrollToContact = () => {
    const element = document.querySelector('#contact');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const scrollToGallery = () => {
    const element = document.querySelector('#gallery');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section
      id="home"
      className="gradient-hero"
      style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
        textAlign: 'center',
        padding: '7rem 1.5rem 3rem'
      }}
    >
      <div style={{ maxWidth: '800px', margin: '0 auto' }}>
        <div
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.5rem',
            background: 'var(--accent-wash)',
            padding: '0.5rem 1rem',
            borderRadius: '9999px',
            marginBottom: '2rem'
          }}
        >
          <MapPin size={16} style={{ color: 'var(--accent-text)' }} />
          <span
            style={{
              color: 'var(--accent-text)',
              fontSize: '0.875rem',
              fontWeight: 500
            }}
          >
            {homestayInfo.location}
          </span>
        </div>

        <h1 className="heading-1" style={{ marginBottom: '1.5rem' }}>
          {homestayInfo.name}
        </h1>

        <p className="body-large" style={{ color: 'var(--text-secondary)', marginBottom: '2rem' }}>
          {homestayInfo.description}
        </p>

        <div
          style={{
            display: 'flex',
            gap: '1rem',
            justifyContent: 'center',
            flexWrap: 'wrap'
          }}
        >
          <button className="btn-primary" onClick={scrollToContact}>
            Book Your Stay
          </button>
          <button className="btn-secondary" onClick={scrollToGallery}>
            View Gallery
          </button>
        </div>
      </div>
    </section>
  );
};

export default Hero;