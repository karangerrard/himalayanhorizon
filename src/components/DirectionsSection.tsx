import React from 'react';
import { Plane, Car, Train, Navigation } from 'lucide-react';
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

  return (
    <section
      id="directions"
      style={{
        padding: '4rem 1.5rem',
        background: 'var(--bg-page)'
      }}
    >
      <div className="container">
        <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
          <h2 className="heading-2" style={{ marginBottom: '1rem' }}>
            How to Reach Us
          </h2>
          <p className="body-large" style={{ color: 'var(--text-secondary)', maxWidth: '600px', margin: '0 auto' }}>
            Well-connected location with multiple travel options for your convenience
          </p>
        </div>

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
      </div>
    </section>
  );
};

export default DirectionsSection;