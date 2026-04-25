import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X } from 'lucide-react';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  const navLinks = [
    { name: 'Home', href: '#home' },
    { name: 'Rooms', href: '#rooms' },
    { name: 'Directions', href: '#directions' },
    { name: 'Attractions', href: '#attractions' },
    { name: 'Gallery', href: '#gallery' },
    { name: 'Contact', href: '#contact' }
  ];

  const scrollToSection = (e, href) => {
    e.preventDefault();
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setIsOpen(false);
    }
  };

  useEffect(() => {
  let throttleTimeout;
  
  const handleScroll = () => {
    const heroSection = document.querySelector('#home');
    const roomsSection = document.querySelector('#rooms');

    if (!heroSection || !roomsSection) return;

    const heroBottom = heroSection.getBoundingClientRect().bottom;
    setIsScrolled(heroBottom < 100);
  };

  const throttledScroll = () => {
    if (!throttleTimeout) {
      handleScroll();
      throttleTimeout = setTimeout(() => {
        throttleTimeout = null;
      }, 100); // Only run every 100ms
    }
  };

  window.addEventListener('scroll', throttledScroll);
  return () => window.removeEventListener('scroll', throttledScroll);
}, []);

  const navbarStyle = {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    zIndex: 50,
    background: isScrolled ? 'var(--primary)' : 'transparent',
    backdropFilter: isScrolled ? 'blur(16px)' :'none',
    WebkitBackdropFilter: isScrolled ? 'blur(16px)' : 'none',
    borderBottom: isScrolled ? '1px solid var(--border-light)' : 'none',
    minHeight: 'clamp(1.75rem, 7vw, 2.5rem)',
    transition: 'background 0.3s ease'
  };

  const logoStyle = {
    fontSize: 'clamp(1.25rem, 4vw, 1.75rem)',
    fontWeight: 700,
    color: isScrolled ? 'var(--text-primary)' : 'rgb(255, 255, 255)',
    textDecoration: 'none',
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    maxWidth: 'clamp(300px, 50vw, 400px)',
    transition: 'color 0.3s ease'
  };

  const linkStyle = {
    color: isScrolled ? 'var(--text-primary)' : 'rgb(255, 255, 255)',
    textDecoration: 'none',
    fontFamily: 'system-ui, sans-serif',
    fontSize: 'clamp(0.8rem, 1.5vw, 1rem)',
    fontWeight: 700,
    padding: 'clamp(6px, 1vw, 12px) clamp(8px, 1.5vw, 12px)',
    borderRadius: '9999px',
    transition: 'background 0.2s ease, color 0.3s ease',
    whiteSpace: 'nowrap'
  };

  return (
    <nav style={navbarStyle}>
      <div className="container" style={{ padding: 'clamp(0.5rem, 2vw, 0.75rem) clamp(.5rem, 3vw, 1rem)' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: 'auto' }}>
          {/* Logo */}
          <a
            href="#home"
            onClick={(e) => scrollToSection(e, '#home')}
            style={logoStyle}
          >
            Himalayan Horizon Deohari
          </a>

          {/* Desktop Navigation */}
          <div
            style={{
              display: 'none',
              gap: 'clamp(0.25rem, 1vw, 0.5rem)',
              alignItems: 'center'
            }}
            className="desktop-nav"
          >
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={(e) => scrollToSection(e, link.href)}
                style={linkStyle}
                onMouseEnter={(e) => {
                  e.target.style.background = isScrolled ? 'rgba(0, 0, 0, 0.05)' : 'rgba(255, 255, 255, 0.15)';
                  e.target.style.color = isScrolled ? 'var(--text-primary)' : 'rgb(255, 255, 255)';
                }}
                onMouseLeave={(e) => {
                  e.target.style.background = 'transparent';
                  e.target.style.color = isScrolled ? 'var(--text-primary)' : 'rgb(255, 255, 255)';
                }}
              >
                {link.name}
              </a>
            ))}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            style={{
              display: 'flex',
              background: 'transparent',
              border: 'none',
              cursor: 'pointer',
              padding: 'clamp(0.4rem, 1vw, 0.5rem)',
              color: isScrolled ? 'var(--text-primary)' : 'rgb(255, 255, 255)',
              minWidth: 'clamp(32px, 8vw, 40px)',
              minHeight: 'clamp(32px, 8vw, 40px)',
              alignItems: 'center',
              justifyContent: 'center',
              transition: 'color 0.3s ease'
            }}
            className="mobile-menu-btn"
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: 'clamp(0.25rem, 1vw, 0.5rem)',
              marginTop: 'clamp(0.75rem, 2vw, 1rem)',
              paddingTop: 'clamp(0.75rem, 2vw, 1rem)',
              borderTop: '1px solid var(--border-light)'
            }}
            className="mobile-nav"
          >
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={(e) => scrollToSection(e, link.href)}
                style={{
                  color: isScrolled ? 'var(--text-primary)' : 'rgb(255, 255, 255)',
                  textDecoration: 'none',
                  fontFamily: 'system-ui, sans-serif',
                  fontSize: 'clamp(0.9rem, 2.5vw, 1rem)',
                  fontWeight: 500,
                  padding: 'clamp(8px, 2vw, 12px)',
                  borderRadius: '8px',
                  transition: 'background 0.2s ease, color 0.3s ease'
                }}
                onMouseEnter={(e) => {
                  e.target.style.background = isScrolled ? 'rgba(0, 0, 0, 0.05)' : 'rgba(255, 255, 255, 0.15)';
                }}
                onMouseLeave={(e) => {
                  e.target.style.background = 'transparent';
                }}
              >
                {link.name}
              </a>
            ))}
          </div>
        )}
      </div>

      <style>{`
        @media (min-width: 768px) {
          .desktop-nav {
            display: flex !important;
          }
          .mobile-menu-btn {
            display: none !important;
          }
        }
        @media (max-width: 767px) {
          .desktop-nav {
            display: none !important;
          }
          .mobile-menu-btn {
            display: flex !important;
          }
        }
      `}</style>
    </nav>
  );
};

export default Navbar;