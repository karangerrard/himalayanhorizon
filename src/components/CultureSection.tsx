import React from 'react';
import { cultureData } from '../data';

const CultureSection = () => {
  return (
    <section
      id="culture"
      style={{
        padding: '4rem 1.5rem',
        background: 'var(--bg-page)'
      }}
    >
      <div className="container">
        <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
          <h2 className="heading-2" style={{ marginBottom: '1rem' }}>
            Experience Himachali Culture
          </h2>
          <p className="body-large" style={{ color: 'var(--text-secondary)', maxWidth: '600px', margin: '0 auto' }}>
            Immerse yourself in the rich traditions and heritage of Himachal Pradesh
          </p>
        </div>

        <div className="ai-grid">
          {cultureData.map((item) => (
            <div key={item.id} className="product-card" style={{ padding: 0, overflow: 'hidden' }}>
              <div
                style={{
                  width: '100%',
                  height: '200px',
                  overflow: 'hidden'
                }}
              >
                <img
                  src={item.image}
                  alt={item.title}
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
              </div>
              <div style={{ padding: '1.5rem' }}>
                <h3 className="heading-3" style={{ marginBottom: '1rem' }}>
                  {item.title}
                </h3>
                <p className="body-medium" style={{ color: 'var(--text-secondary)', margin: 0 }}>
                  {item.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CultureSection;