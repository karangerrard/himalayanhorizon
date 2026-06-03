import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Menu, X } from 'lucide-react';

// ─── Types ────────────────────────────────────────────────────────────────────
interface NavLink {
  name: string;
  href: string;
}

// ─── Constants ────────────────────────────────────────────────────────────────
const NAV_LINKS: NavLink[] = [
  { name: 'Home',        href: '#home'        },
  { name: 'Rooms',       href: '#rooms'       },
  { name: 'Directions',  href: '#directions'  },
  { name: 'Attractions', href: '#attractions' },
  { name: 'Gallery',     href: '#gallery'     },
  { name: 'Contact',     href: '#contact'     },
];

const BRAND = {
  forest:      '#003631',
  gold:        '#FFEDA8',
  white:       '#FFFFFF',
} as const;

// ─── Navbar ───────────────────────────────────────────────────────────────────
const Navbar: React.FC = () => {
  const [isOpen,        setIsOpen]        = useState(false);
  const [isScrolled,    setIsScrolled]    = useState(false);
  const [activeSection, setActiveSection] = useState<string>('#home');
  const menuRef     = useRef<HTMLDivElement>(null);
  const throttleRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // ── Scroll detection ──────────────────────────────────────────────────────
  const handleScroll = useCallback(() => {
    // 10px threshold — feels instant but ignores micro-bounces on iOS
    setIsScrolled(window.scrollY > 10);

    // Active section tracking (keep this unchanged)
    const offsets = NAV_LINKS.map(({ href }) => {
      const el = document.querySelector(href);
      if (!el) return { href, top: Infinity };
      return { href, top: Math.abs(el.getBoundingClientRect().top - 80) };
    });
    const closest = offsets.reduce((a, b) => (a.top < b.top ? a : b));
    setActiveSection(closest.href);
  }, []);

  useEffect(() => {
  handleScroll(); // check on mount

  const onScroll = () => {
    // Always fire immediately when near the top — no throttle for reset
    if (window.scrollY <= 10) {
      handleScroll();
      return;
    }
    // Throttle only when scrolling DOWN (performance on long pages)
    if (throttleRef.current) return;
    handleScroll();
    throttleRef.current = setTimeout(() => {
      throttleRef.current = null;
    }, 80);
  };

  window.addEventListener('scroll', onScroll, { passive: true });
  return () => {
    window.removeEventListener('scroll', onScroll);
    if (throttleRef.current) clearTimeout(throttleRef.current);
  };
}, [handleScroll]);

  // ── Close mobile menu on outside click ───────────────────────────────────
  useEffect(() => {
    if (!isOpen) return;
    const handler = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, [isOpen]);

  // ── Prevent body scroll when mobile menu is open ─────────────────────────
  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [isOpen]);

  // ── Scroll to section ─────────────────────────────────────────────────────
  const scrollToSection = useCallback((
    e: React.MouseEvent<HTMLElement>,
    href: string,
  ) => {
    e.preventDefault();
    const el = document.querySelector(href);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
      setActiveSection(href);
    }
    setIsOpen(false);
  }, []);

  const ease = '280ms cubic-bezier(0.16, 1, 0.3, 1)';

  // ─────────────────────────────────────────────────────────────────────────
  // BACKGROUND STRATEGY — PREMIUM "FADE-IN" PATTERN
  // ─────────────────────────────────────────────────────────────────────────
  //
  // At hero top  → fully transparent, white text reads over dark hero image
  // Scrolling    → a soft bottom-to-top gradient shadow fades IN on the
  //                navbar itself (not the hero) so text stays readable even
  //                on light hero images without an abrupt color change
  // Past hero    → warm white frosted-glass background fades in smoothly
  //
  // This is the exact pattern used by Airbnb, Booking.com luxury tiers,
  // and Aman Resorts — the navbar "reveals" gracefully rather than popping.
  // ─────────────────────────────────────────────────────────────────────────

  const navbarStyle: React.CSSProperties = {
    position:             'fixed',
    top:                  0,
    left:                 0,
    right:                0,
    zIndex:               50,
    // BACKGROUND:
    // • At top of hero  → transparent (hero image shows through fully)
    // • After hero      → warm white with light blur — premium frosted look
    background: isScrolled
      ? 'rgba(255, 253, 245, 0.97)'
      : 'transparent',
    backdropFilter:       isScrolled ? 'blur(12px) saturate(1.5)' : 'none',
    WebkitBackdropFilter: isScrolled ? 'blur(12px) saturate(1.5)' : 'none',
    // Hairline border only when scrolled
    borderBottom: isScrolled
      ? '1px solid rgba(0, 54, 49, 0.10)'
      : 'none',
    boxShadow: isScrolled
      ? '0 2px 24px rgba(0, 54, 49, 0.08)'
      : 'none',
    // HERO TOP GRADIENT VEIL:
    // When NOT scrolled, paint a gentle top-to-down dark gradient ONLY on
    // the navbar band so text is readable even over a white/light hero photo.
    // This is far more premium than a flat dark overlay — the sky stays clean.
    // We layer it as a pseudo-element via the `--nav-veil` custom property
    // trick: use a second background layer (gradient over transparent).
    // Since CSS background is a stack, the gradient sits above transparent.
    ...(isScrolled ? {} : {
      background: 'linear-gradient(to bottom, rgba(0,20,16,0.72) 0%, rgba(0,20,16,0.18) 70%, rgba(0,20,16,0.0) 100%)',
    }),
    transition: `background ${ease}, backdrop-filter ${ease}, border-color ${ease}, box-shadow ${ease}`,
  };

  const containerStyle: React.CSSProperties = {
    maxWidth:       '1280px',
    margin:         '0 auto',
    padding:        '0 clamp(1.25rem, 4vw, 3rem)',
    height:         'clamp(3.75rem, 8vw, 4.5rem)',
    display:        'flex',
    alignItems:     'center',
    justifyContent: 'space-between',
  };

  // ─ Logo ─
  const logoStyle: React.CSSProperties = {
    textDecoration: 'none',
    display:        'flex',
    flexDirection:  'column',
    gap:            '2px',
    cursor:         'pointer',
    flexShrink:     0,
    maxWidth:       'clamp(180px, 40vw, 360px)',
  };

  const logoPrimaryStyle: React.CSSProperties = {
    fontFamily:    "'Cormorant Garamond', Georgia, serif",
    fontSize:      'clamp(1.2rem, 2.4vw, 1.6rem)',
    fontWeight:    700,
    lineHeight:    1.1,
    // On hero (not scrolled) → always white so it reads over the veil gradient
    // When scrolled          → deep forest green
    color:         isScrolled ? BRAND.forest : BRAND.white,
    letterSpacing: '0.015em',
    whiteSpace:    'nowrap',
    overflow:      'hidden',
    textShadow: isScrolled ? 'none' : '0 1px 12px rgba(0,0,0,0.45)',
    textOverflow:  'ellipsis',
    transition:    `color ${ease}`,
  };

  const logoSubStyle: React.CSSProperties = {
    fontFamily:    "'Cormorant Garamond', Georgia, serif",
    fontSize:      'clamp(0.58rem, 0.9vw, 0.68rem)',
    fontWeight:    600,
    letterSpacing: '0.18em',
    textTransform: 'uppercase' as const,
    color: isScrolled ? 'rgba(0,54,49,0.55)' : 'rgba(255,255,255,0.85)',
    textShadow: isScrolled ? 'none' : '0 1px 8px rgba(0,0,0,0.4)',
    whiteSpace:    'nowrap',
    transition:    `color ${ease}`,
  };

  // ─ Desktop link style ─
  const linkStyle = (href: string): React.CSSProperties => {
    const active = activeSection === href;
    return {
      position:       'relative',
      textDecoration: 'none',
      fontFamily:     "'Cormorant Garamond', Georgia, serif",
      fontSize:       'clamp(1rem, 1.15vw, 1.5rem)',
      letterSpacing:  '0.04em',
      // On hero → white/gold. Scrolled → forest.
      color: isScrolled
        ? (active ? BRAND.forest : 'rgba(0,54,49,0.75)')
        : (active ? BRAND.gold   : '#FFFFFF'),
      padding:        '6px 2px',
      borderBottom:   active
        ? `1.5px solid ${isScrolled ? BRAND.forest : BRAND.gold}`
        : '1.5px solid transparent',
      transition:     `color ${ease}, border-color ${ease}`,
      whiteSpace:     'nowrap',
      cursor:         'pointer',
      textShadow: isScrolled ? 'none' : '0 1px 10px rgba(0,0,0,0.40)',
      fontWeight: active ? 600 : 600,
    };
  };

  // ─ Book Now CTA ─
  const ctaStyle: React.CSSProperties = {
    display:        'inline-flex',
    alignItems:     'center',
    justifyContent: 'center',
    minHeight:      '38px',
    padding:        '0 clamp(1rem, 2vw, 1.5rem)',
    borderRadius:   '4px',
    fontFamily:     "'Cormorant Garamond', Georgia, serif",
    fontSize:       'clamp(1rem, 1vw, 1rem)',
    fontWeight:     600,
    letterSpacing:  '0.08em',
    cursor:         'pointer',
    whiteSpace:     'nowrap',
    textDecoration: 'none',
    border:         'none',
    background: isScrolled ? BRAND.forest : BRAND.gold, 
    color:      isScrolled ? BRAND.gold : BRAND.forest, 
    boxShadow: isScrolled
      ? '0 2px 8px rgba(0,54,49,0.16)'  
      : '0 2px 8px rgba(255,237,168,0.20)',
    transition:     `background ${ease}, color ${ease}, box-shadow ${ease}, transform ${ease}`,
    WebkitTapHighlightColor: 'transparent',
  };

  // ─ Hamburger ─
  // display:none on ≥768px via the CSS block at the bottom of this file
  const hamburgerStyle: React.CSSProperties = {
    display:        'flex',
    alignItems:     'center',
    justifyContent: 'center',
    background:     'transparent',
    border:         'none',
    cursor:         'pointer',
    minWidth:       '44px',
    minHeight:      '44px',
    borderRadius:   '8px',
    color:          isScrolled ? BRAND.forest : BRAND.white,
    transition:     `color ${ease}, background ${ease}`,
    WebkitTapHighlightColor: 'transparent',
  };

  // ─ Mobile drawer ─
  const mobileMenuStyle: React.CSSProperties = {
    background: isScrolled
      ? 'rgba(255, 253, 245, 0.98)'
      : 'rgba(0, 28, 22, 0.97)',
    backdropFilter:       'blur(14px)',
    WebkitBackdropFilter: 'blur(14px)',
    // borderTop only when open — zero trace when collapsed on desktop
    borderTop: isOpen
      ? (isScrolled ? '1px solid rgba(0,54,49,0.08)' : '1px solid rgba(255,237,168,0.12)')
      : 'none',
    // padding collapses to 0 when closed — no ghost spacing
    padding:   isOpen ? 'clamp(0.75rem, 3vw, 1.25rem) clamp(1.25rem, 5vw, 2rem)' : '0',
    display:       'flex',
    flexDirection: 'column',
    gap:           '2px',
    maxHeight:     isOpen ? '520px' : '0px',
    opacity:       isOpen ? 1 : 0,
    overflow:      'hidden',
    // visibility:hidden removes element from paint tree when closed
    visibility:    (isOpen ? 'visible' : 'hidden') as 'visible' | 'hidden',
    transition:    `max-height 380ms cubic-bezier(0.16,1,0.3,1), opacity 240ms cubic-bezier(0.16,1,0.3,1)`,
    pointerEvents: isOpen ? 'auto' : 'none',
  };

  const mobileLinkStyle = (href: string): React.CSSProperties => {
    const active = activeSection === href;
    return {
      textDecoration: 'none',
      fontFamily:     "'Cormorant Garamond', Georgia, serif",
      fontSize:       'clamp(1rem, 4vw, 1.15rem)',
      fontWeight:     active ? 600 : 400,
      letterSpacing:  '0.03em',
      color: isScrolled
        ? (active ? BRAND.forest : 'rgba(0,54,49,0.78)')
        : (active ? BRAND.gold   : 'rgba(255,255,255,0.90)'),
      padding:        'clamp(10px, 2.5vw, 14px) clamp(10px, 3vw, 16px)',
      borderRadius:   '6px',
      display:        'block',
      background: active
        ? (isScrolled ? 'rgba(0,54,49,0.06)' : 'rgba(255,237,168,0.08)')
        : 'transparent',
      borderLeft: active
        ? `2px solid ${isScrolled ? BRAND.forest : BRAND.gold}`
        : '2px solid transparent',
      transition:     `background ${ease}, color ${ease}`,
      WebkitTapHighlightColor: 'transparent',
      cursor:         'pointer',
    };
  };

  const mobileCtaStyle: React.CSSProperties = {
    display:        'flex',
    alignItems:     'center',
    justifyContent: 'center',
    minHeight:      '48px',
    marginTop:      'clamp(0.5rem, 2vw, 0.75rem)',
    borderRadius:   '4px',
    fontFamily:     "'Cormorant Garamond', Georgia, serif",
    fontSize:       'clamp(0.9rem, 3.5vw, 1rem)',
    fontWeight:     600,
    letterSpacing:  '0.08em',
    textDecoration: 'none',
    cursor:         'pointer',
    background: isScrolled ? BRAND.forest : BRAND.gold,  // was 'transparent'
    boxShadow: isScrolled
      ? '0 2px 8px rgba(0,54,49,0.16)'  // was '0 0 0 1.5px ${BRAND.forest}'
      : '0 2px 8px rgba(255,237,168,0.20)',
    color: isScrolled ? BRAND.gold : BRAND.forest,  // reversed
    transition:     `background ${ease}, color ${ease}`,
    WebkitTapHighlightColor: 'transparent',
    border:         'none',
  };

  // ─────────────────────────────────────────────────────────────────────────
  return (
    <>
      {/*
        ── REQUIRED GLOBAL CSS ────────────────────────────────────────────────
        Paste this into your index.css / App.css ONE TIME.
        This is the only reliable, flicker-free way to show/hide desktop
        vs mobile elements — inline display:none gets overridden by React
        re-renders, CSS media queries do not.

        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,600;1,400&display=swap');

        .nav-desktop {
          display: flex !important;
          align-items: center;
          gap: clamp(1rem, 2.2vw, 1.75rem);
        }
        .nav-hamburger { display: none !important; }
         Mobile drawer hidden on desktop — only shown on mobile via media query 
        .nav-mobile-drawer { display: none !important; }

        @media (max-width: 767px) {
          .nav-desktop       { display: none !important; }
          .nav-hamburger     { display: flex !important; }
          .nav-mobile-drawer { display: flex !important; flex-direction: column; }
        }

        .nav-hamburger:active,
        .nav-mobile-drawer a:active,
        .nav-mobile-drawer button:active {
          transform: scale(0.96) !important;
          opacity: 0.8 !important;
        }
        ───────────────────────────────────────────────────────────────────── */}

      <header style={navbarStyle} ref={menuRef} role="banner">

        {/* ── Top bar (logo + desktop nav + hamburger) ─────────────────── */}
        <div style={containerStyle}>

          {/* Logo */}
          <a
            href="#home"
            onClick={(e) => scrollToSection(e, '#home')}
            style={logoStyle}
            aria-label="Himalayan Horizon Deohari — go to home"
          >
            <span style={logoPrimaryStyle}>Himalayan Horizon</span>
            <span style={logoSubStyle}>Deohari · Sainj Valley</span>
          </a>

          {/* ── Desktop nav (hidden on mobile via .nav-desktop CSS) ──── */}
          <nav
            className="nav-desktop"
            aria-label="Primary navigation"
          >
            {NAV_LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={(e) => scrollToSection(e, link.href)}
                style={linkStyle(link.href)}
                aria-current={activeSection === link.href ? 'page' : undefined}
                onMouseEnter={(e) => {
                  const el = e.currentTarget;
                  const active = activeSection === link.href;
                  if (!active) {
                    el.style.color = isScrolled ? BRAND.forest : BRAND.gold;
                    el.style.borderBottomColor = isScrolled
                      ? 'rgba(0,54,49,0.28)'
                      : 'rgba(255,237,168,0.40)';
                  }
                }}
                onMouseLeave={(e) => {
                  const el = e.currentTarget;
                  const active = activeSection === link.href;
                  el.style.color = isScrolled
                    ? (active ? BRAND.forest : 'rgba(0,54,49,0.72)')
                    : (active ? BRAND.gold   : 'rgba(255,255,255,0.92)');
                  el.style.borderBottomColor = active
                    ? (isScrolled ? BRAND.forest : BRAND.gold)
                    : 'transparent';
                }}
              >
                {link.name}
              </a>
            ))}

            {/* Book Now CTA */}
            <a
              href="#contact"
              onClick={(e) => scrollToSection(e, '#contact')}
              style={ctaStyle}
              aria-label="Book your stay"
              onMouseEnter={(e) => {
                const el = e.currentTarget;
                el.style.background = isScrolled ? BRAND.forest : BRAND.gold;
                el.style.color      = isScrolled ? BRAND.gold   : BRAND.forest;
                el.style.transform  = 'translateY(-1px)';
                el.style.boxShadow  = isScrolled
                  ? '0 4px 16px rgba(0,54,49,0.22)'
                  : '0 4px 16px rgba(255,237,168,0.28)';
              }}
              onMouseLeave={(e) => {
                const el = e.currentTarget;
                el.style.background = isScrolled ? BRAND.forest : BRAND.gold;
                el.style.color      = isScrolled ? BRAND.gold : BRAND.forest;
                el.style.transform  = 'translateY(0)';
                el.style.boxShadow  = isScrolled
                  ? '0 2px 8px rgba(0,54,49,0.16)'
                  : '0 2px 8px rgba(255,237,168,0.20)';
              }}
            >
              Book Now
            </a>
          </nav>

          {/* ── Hamburger (hidden on desktop via .nav-hamburger CSS) ─── */}
          <button
            className="nav-hamburger"
            onClick={() => setIsOpen((prev) => !prev)}
            style={hamburgerStyle}
            aria-label={isOpen ? 'Close navigation menu' : 'Open navigation menu'}
            aria-expanded={isOpen}
            aria-controls="mobile-nav"
            onMouseEnter={(e) => {
              (e.currentTarget).style.background = isScrolled
                ? 'rgba(0,54,49,0.06)'
                : 'rgba(255,255,255,0.12)';
            }}
            onMouseLeave={(e) => {
              (e.currentTarget).style.background = 'transparent';
            }}
          >
            {/* Cross-fade icon swap — GPU only (opacity + transform) */}
            <span style={{ display:'grid', placeItems:'center', position:'relative', width:'22px', height:'22px' }}>
              <Menu
                size={22}
                strokeWidth={1.75}
                aria-hidden="true"
                style={{
                  position:  'absolute',
                  opacity:    isOpen ? 0 : 1,
                  transform:  isOpen ? 'rotate(90deg) scale(0.7)' : 'rotate(0deg) scale(1)',
                  transition: '220ms cubic-bezier(0.16,1,0.3,1)',
                }}
              />
              <X
                size={22}
                strokeWidth={1.75}
                aria-hidden="true"
                style={{
                  position:  'absolute',
                  opacity:    isOpen ? 1 : 0,
                  transform:  isOpen ? 'rotate(0deg) scale(1)' : 'rotate(-90deg) scale(0.7)',
                  transition: '220ms cubic-bezier(0.16,1,0.3,1)',
                }}
              />
            </span>
          </button>
        </div>

        {/* ── Mobile drawer (always in DOM, animated via max-height) ───── */}
        <nav
          id="mobile-nav"
          className="nav-mobile-drawer"
          style={mobileMenuStyle}
          aria-label="Mobile navigation"
          aria-hidden={!isOpen}
        >
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={(e) => scrollToSection(e, link.href)}
              style={mobileLinkStyle(link.href)}
              aria-current={activeSection === link.href ? 'page' : undefined}
              tabIndex={isOpen ? 0 : -1}
            >
              {link.name}
            </a>
          ))}

          <button
            onClick={(e) => {
              scrollToSection(e as unknown as React.MouseEvent<HTMLElement>, '#contact');
            }}
            style={mobileCtaStyle}
            aria-label="Book your stay"
            tabIndex={isOpen ? 0 : -1}
            onMouseEnter={(e) => {
              const el = e.currentTarget;
              el.style.background = isScrolled ? BRAND.forest : BRAND.gold;
              el.style.color      = isScrolled ? BRAND.gold   : BRAND.forest;
            }}
            onMouseLeave={(e) => {
              const el = e.currentTarget;
              el.style.background = isScrolled ? BRAND.forest : BRAND.gold;
              el.style.color      = isScrolled ? BRAND.gold : BRAND.forest;
            }}
          >
            Book Your Stay
          </button>
        </nav>

      </header>
    </>
  );
};

export default Navbar;
