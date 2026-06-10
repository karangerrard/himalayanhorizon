import React from 'react';
import { Mail, Phone, MapPin, Facebook, Instagram, Heading1, Heading2 } from 'lucide-react';
import { homestayInfo } from '../data';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const scrollToSection = (e, href) => {
    e.preventDefault();
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const WhatsAppIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="var(--accent-text)"
  >
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
  </svg>
);

  return (
    <footer
      style={{
        background: 'var(--bg-page)',
        borderTop: '1px solid var(--border-light)',
        padding: '3rem 1.5rem 1.5rem'
      }}
    >
      <div className="container">
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
            gap: '2rem',
            marginBottom: '2rem'
          }}
        >
          {/* About */}
          <div>
            <h3
              style={{
                fontSize: '1.25rem',
                fontWeight: 700,
                color: 'var(--text-primary)',
                marginBottom: '1rem'
              }}
            >
              {homestayInfo.name}
            </h3>
            <p className="body-large" style={{ color: 'var(--text-secondary)', marginBottom: '1rem' }}>
              {homestayInfo.tagline}
            </p>
            <div style={{ display: 'flex', gap: '1rem' }}>
              <a
                href="https://www.instagram.com/himalayanhorizondeohari/"
                style={{
                  width: '50px',
                  height: '50px',
                  borderRadius: '50%',
                  border: 'none',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  background: 'linear-gradient(135deg, #f09433 0%, #e6683c 25%, #dc2743 50%, #cc2366 75%, #bc1888 100%)',
                  color: 'white',
                  transition: 'all 0.2s ease',
                  cursor: 'pointer'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'scale(1.1)';
                  e.currentTarget.style.boxShadow = '0 4px 12px rgba(224, 108, 131, 0.4)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'scale(1)';
                  e.currentTarget.style.boxShadow = 'none';
                }}
              >
                <Instagram size={30} />
              </a>
            </div>
          </div>
          
          {/* An empty div for alignment */}
          <div >
          </div>

          {/* Contact Info */}
          <div>
            <h4
              style={{
                fontSize: '1.25rem',
                fontWeight: 700,
                color: 'var(--text-primary)',
                marginBottom: '1rem'
              }}
            >
              Contact Info
            </h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <div style={{ display: 'flex', gap: '0.75rem' }}>
                <Phone size={18} style={{ color: 'var(--accent-text)', flexShrink: 0 }} />
                <span className="body-medium" style={{ color: 'var(--text-secondary)' }}>
                  {homestayInfo.contact.phone}
                </span>
              </div>
              <div style={{ display: 'flex', gap: '0.75rem' }}>
                <WhatsAppIcon size={18} style={{ color: 'var(--accent-text)', flexShrink: 0 }} />
                <span className="body-medium" style={{ color: 'var(--text-secondary)' }}>
                  {homestayInfo.contact.whatsapp}
                </span>
              </div>
              <div style={{ display: 'flex', gap: '0.75rem' }}>
                <MapPin size={18} style={{ color: 'var(--accent-text)', flexShrink: 0 }} />
                <span className="body-medium" style={{ color: 'var(--text-secondary)' }}>
                  {homestayInfo.contact.address}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div
          style={{
            paddingTop: '2rem',
            borderTop: '1px solid var(--border-light)',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            flexWrap: 'wrap',
            gap: '0.5rem'
          }}
        >
          <p className="body-medium" style={{ color: 'var(--text-muted)', margin: 0 }}>
            © {currentYear} {homestayInfo.name}. All rights reserved.
          </p>
          <p className="body-medium" style={{ color: 'var(--text-muted)', margin: 0 }}>
            Website by Karan
          </p>
        </div>
        
      </div>
    </footer>
  );
};

export default Footer;