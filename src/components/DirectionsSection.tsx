import React from 'react';
import { Plane, Car, Train, Navigation, Heading3 } from 'lucide-react';
import { travelInfo } from '../data';

const DirectionsSection = () => {
  const iconMap = {
    'By Air': Plane,
    'By Road': Car,
    'By Train': Train,
    'Local Transport': Navigation
  };

  const travelOptions = [
    travelInfo.byAir as { title: string; description: string; distance?: string; routes?: string[] },
    travelInfo.byRoad as { title: string; description: string; distance?: string; routes?: string[] },
    travelInfo.byTrain as { title: string; description: string; distance?: string; routes?: string[] },
  ];

  // Dummy coordinates — replace with your actual homestay lat/long
  const HOMESTAY_LAT = 32.2190;
  const HOMESTAY_LNG = 77.2023;
  const ZOOM = 14;

  const mapSrc = `https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d167587.3940656053!2d77.22681679809206!3d31.665512679214707!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390453fce91ab5e7%3A0x3caeba76dbe338e9!2sHimalayan%20Horizon%20Deohari!5e0!3m2!1sen!2sin!4v1777134868330!5m2!1sen!2sin`;

  return (
    <section
      id="directions"
      style={{
        padding: '4rem 1.5rem',
        background: 'var(--bg-page)'
      }}
    >
      <div className="container">

        {/* Heading */}
        <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
          <h2 className="heading-2" style={{ marginBottom: '1rem' }}>
            How to Reach Us
          </h2>
          <p className="body-large" style={{ color: 'var(--text-secondary)', maxWidth: '600px', margin: '0 auto' }}>
            Well-connected location with multiple travel options for your convenience
          </p>
        </div>

        {/* Travel Cards */}
        <div className="ai-grid">
          {travelOptions.map((option, index) => {
            const IconComponent = iconMap[option.title];
            return (
              <div key={index} className="product-card">
                <div
                  style={{
                    width: '48px',
                    height: '48px',
                    borderRadius: '12px',
                    background: 'var(--accent-wash)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginBottom: '1rem'
                  }}
                >
                  <IconComponent size={24} style={{ color: 'var(--accent-text)' }} />
                </div>
                <h3 className="heading-3" style={{ marginBottom: '1rem' }}>
                  {option.title}
                </h3>
                <p className="body-medium" style={{ color: 'var(--text-secondary)', marginBottom: '1rem' }}>
                  {option.description}
                </p>
                {option.distance && (
                  <span
                    className="body-small"
                    style={{
                      color: 'var(--accent-text)',
                      fontWeight: 500
                    }}
                  >
                    {option.distance}
                  </span>
                )}
                {option.routes?.length > 0 && (
                  <div style={{ marginTop: '1rem' }}>
                    {option.routes.map((route, idx) => (
                      <div key={idx} className="body-small" style={{ marginBottom: '0.5rem' }}>
                        • {route}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Google Maps Section */}
        <div style={{ marginTop: '4rem', textAlign: 'center' }}>
          <h2 className="heading-2" style={{ marginBottom: '0.75rem' }}>
            Our Location
          </h2>
          <p className="body-large" style={{ color: 'var(--text-secondary)', marginBottom: '2rem' }}>
            Find us on the map
          </p>

          <div
            style={{
              maxWidth: '1200px',
              margin: '0 auto',
              borderRadius: '16px',
              overflow: 'hidden',
              border: '2px solid var(--accent-wash)',
              boxShadow: '0 4px 24px rgba(0,0,0,0.08)'
            }}
          >
            <iframe
              title="Homestay Location"
              src={mapSrc}
              width="100%"
              height="500"
              style={{ border: 0, display: 'block' }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>

          {/* Open in Google Maps link 
          <a
            href={`https://www.google.com/maps?q=${HOMESTAY_LAT},${HOMESTAY_LNG}`}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: 'inline-block',
              marginTop: '1.25rem',
              padding: '0.6rem 1.5rem',
              background: 'var(--accent-text)',
              color: '#fff',
              borderRadius: '8px',
              fontSize: '0.9rem',
              fontWeight: 500,
              textDecoration: 'none',
              transition: 'all 0.2s ease'
            }}
            onMouseEnter={e => (e.currentTarget.style.transform = 'translateY(-2px)')}
            onMouseLeave={e => (e.currentTarget.style.transform = 'translateY(0)')}
          >
            Open in Google Maps
          </a>
          */}
        </div>

      </div>
    </section>
  );
};

export default DirectionsSection;