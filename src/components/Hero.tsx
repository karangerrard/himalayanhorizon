import React from 'react';
import { MapPin } from 'lucide-react';
import { homestayInfo } from '../data';

const Hero = () => {
  
  const desktop_hero_Path = `${import.meta.env.BASE_URL}images/desktop_hero.avif`

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
        padding: 'clamp(4rem, 10vw, 7rem) clamp(1rem, 5vw, 1.5rem) clamp(2rem, 5vw, 3rem)',
        backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.2)), url(${desktop_hero_Path})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      <div style={{ maxWidth: 'clamp(280px, 90vw, 800px)', margin: '0 auto' }}>
        <div
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.5rem',
            background: 'var(--accent-wash)',
            padding: 'clamp(0.4rem, 1vw, 0.5rem) clamp(0.75rem, 2vw, 1rem)',
            borderRadius: '9999px',
            marginBottom: 'clamp(1.5rem, 4vw, 2rem)'
          }}
        >
          <MapPin size={16} style={{ color: 'rgb(255, 255, 255)' }} />
          <span
            style={{
              color: 'rgb(255, 255, 255)',
              fontSize: 'clamp(0.75rem, 2vw, 0.875rem)',
              fontWeight: 700
            }}
          >
            {homestayInfo.location}
          </span>
        </div>

        <h1 
          className="heading-1" 
          style={{ 
            marginBottom: 'clamp(1rem, 3vw, 1.5rem)',
            fontSize: 'clamp(1.75rem, 8vw, 3.5rem)',
            lineHeight: 1.2
          }}
        >
          {homestayInfo.name}
        </h1>

        <p 
          className="body-large" 
          style={{ 
            color: 'rgb(255,255,255)', 
            marginBottom: 'clamp(1.5rem, 4vw, 2rem)',
            fontSize: 'clamp(0.95rem, 2.5vw, 1.125rem)',
            fontWeight: 700,
            lineHeight: 1.6
          }}
        >
          {homestayInfo.description}
        </p>

        <div
          style={{
            display: 'flex',
            gap: 'clamp(0.5rem, 2vw, 1rem)',
            justifyContent: 'center',
            flexWrap: 'wrap'
          }}
          className="hero-buttons"
        >
          <button className="btn-secondary" onClick={scrollToContact}>
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