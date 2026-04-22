import React from 'react';
import { Mail, Phone, MapPin, Facebook, Instagram, Twitter } from 'lucide-react';
import { homestayInfo } from '../mock';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const scrollToSection = (e, href) => {
    e.preventDefault();
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

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
            <p className="body-medium" style={{ color: 'var(--text-secondary)', marginBottom: '1rem' }}>
              {homestayInfo.tagline}
            </p>
            <div style={{ display: 'flex', gap: '1rem' }}>
              <a
                href="#"
                style={{
                  width: '40px',
                  height: '40px',
                  borderRadius: '50%',
                  border: '1px solid var(--border-light)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'var(--text-secondary)',
                  transition: 'all 0.2s ease'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = 'var(--accent-primary)';
                  e.currentTarget.style.background = 'var(--accent-wash)';
                  e.currentTarget.style.color = 'var(--accent-text)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = 'var(--border-light)';
                  e.currentTarget.style.background = 'transparent';
                  e.currentTarget.style.color = 'var(--text-secondary)';
                }}
              >
                <Facebook size={20} />
              </a>
              <a
                href="#"
                style={{
                  width: '40px',
                  height: '40px',
                  borderRadius: '50%',
                  border: '1px solid var(--border-light)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'var(--text-secondary)',
                  transition: 'all 0.2s ease'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = 'var(--accent-primary)';
                  e.currentTarget.style.background = 'var(--accent-wash)';
                  e.currentTarget.style.color = 'var(--accent-text)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = 'var(--border-light)';
                  e.currentTarget.style.background = 'transparent';
                  e.currentTarget.style.color = 'var(--text-secondary)';
                }}
              >
                <Instagram size={20} />
              </a>
              <a
                href="#"
                style={{
                  width: '40px',
                  height: '40px',
                  borderRadius: '50%',
                  border: '1px solid var(--border-light)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'var(--text-secondary)',
                  transition: 'all 0.2s ease'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = 'var(--accent-primary)';
                  e.currentTarget.style.background = 'var(--accent-wash)';
                  e.currentTarget.style.color = 'var(--accent-text)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = 'var(--border-light)';
                  e.currentTarget.style.background = 'transparent';
                  e.currentTarget.style.color = 'var(--text-secondary)';
                }}
              >
                <Twitter size={20} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4
              style={{
                fontSize: '1rem',
                fontWeight: 600,
                color: 'var(--text-primary)',
                marginBottom: '1rem'
              }}
            >
              Quick Links
            </h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              {['Home', 'Culture', 'Rooms', 'Travel', 'Attractions', 'Gallery', 'Contact'].map(
                (link) => (
                  <a
                    key={link}
                    href={`#${link.toLowerCase()}`}
                    onClick={(e) => scrollToSection(e, `#${link.toLowerCase()}`)}
                    className="body-medium"
                    style={{
                      color: 'var(--text-secondary)',
                      textDecoration: 'none',
                      transition: 'color 0.2s ease'
                    }}
                    onMouseEnter={(e) => (e.target.style.color = 'var(--accent-text)')}
                    onMouseLeave={(e) => (e.target.style.color = 'var(--text-secondary)')}
                  >
                    {link}
                  </a>
                )
              )}
            </div>
          </div>

          {/* Contact Info */}
          <div>
            <h4
              style={{
                fontSize: '1rem',
                fontWeight: 600,
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
                <Mail size={18} style={{ color: 'var(--accent-text)', flexShrink: 0 }} />
                <span className="body-medium" style={{ color: 'var(--text-secondary)' }}>
                  {homestayInfo.contact.email}
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
            textAlign: 'center'
          }}
        >
          <p className="body-small" style={{ color: 'var(--text-muted)' }}>
            © {currentYear} {homestayInfo.name}. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;