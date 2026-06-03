import React, { useEffect, useRef } from 'react';
import { MapPin } from 'lucide-react';
import { homestayInfo } from '../data';

// ─── Hero Section ──────────────────────────────────────────────────────────────
// Premium Himalayan travel aesthetic — inspired by Aman Resorts, Airbnb Luxe,
// Apple Marketing pages. Colors: #003631 (deep forest) + #FFEDA8 (warm gold).
// ───────────────────────────────────────────────────────────────────────────────

const Hero: React.FC = () => {
  const heroRef = useRef<HTMLElement>(null);

  // Resolves correct base path for the hero image (Vite env compatible)
  const desktopHeroPath = `${import.meta.env.BASE_URL}images/desktop_hero.avif`;
  // Mobile-specific crop — uses the same image but with different object-position
  // You can swap this for a dedicated mobile image (e.g. hero_mobile.avif) for even
  // better LCP on mobile: const mobileHeroPath = `${import.meta.env.BASE_URL}images/hero_mobile.avif`;

  // Scroll helpers
  const scrollTo = (selector: string) => {
    const el = document.querySelector(selector);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  // Respect prefers-reduced-motion for fade-in animation
  useEffect(() => {
    const hero = heroRef.current;
    if (!hero) return;
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (!prefersReduced) {
      hero.style.opacity = '0';
      // Defer so the browser paints the layout before animating (prevents CLS)
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          hero.style.transition = 'opacity 0.8s cubic-bezier(0.16, 1, 0.3, 1)';
          hero.style.opacity = '1';
        });
      });
    }
  }, []);

  return (
    <section
      id="home"
      ref={heroRef}
      aria-label="Hero — Welcome to the homestay"
      style={styles.section}
    >
      {/* ── Hero Image ────────────────────────────────────────────────────── */}
      {/*
        PERFORMANCE NOTES:
        • fetchpriority="high" — signals LCP candidate to browser, starts
          fetching before full DOM parse (critical for LCP score).
        • decoding="async" — off-loads image decode off the main thread so
          it doesn't block first paint.
        • No loading="lazy" on LCP image — lazy-loading the hero image is a
          common LCP mistake. Only lazy-load below-the-fold images.
        • width + height prevent layout shift (CLS = 0).
        • We use <img> instead of CSS background-image so the browser
          resource hint / preload pipeline can pick it up earlier.
        • AVIF format already excellent — optionally add a <picture> with a
          webp fallback for Safari < 16 if needed.
      */}
      <img
        src={desktopHeroPath}
        alt="Scenic Himalayan mountain view from the homestay"
        fetchPriority="high"
        decoding="async"
        width={1920}
        height={1080}
        style={styles.heroImage}
        aria-hidden="true"
      />

      {/* ── Gradient Overlay ────────────────────────────────────────────── */}
      {/*
        Soft, directional overlay instead of a flat dark layer.
        Bottom-biased so the mountain sky stays luminous and text at the
        bottom-left reads crisply. Opacity kept light — premium sites let
        the photograph breathe.
      */}
      <div style={styles.overlay} aria-hidden="true" />

      {/* ── Content ─────────────────────────────────────────────────────── */}
      <div style={styles.content}>

        {/* Location pill */}
        <div style={styles.locationPill} aria-label={`Location: ${homestayInfo.location}`}>
          <MapPin size={13} strokeWidth={2.5} aria-hidden="true" />
          <span>{homestayInfo.location}</span>
        </div>

        {/* Main heading */}
        <h1 style={styles.heading}>
          {homestayInfo.name}
        </h1>

        {/* Description / subtitle */}
        <p style={styles.subtitle}>
          {homestayInfo.description}
        </p>

        {/* CTA buttons */}
        <div style={styles.buttonGroup}>
          {/* Primary CTA */}
          <button
            onClick={() => scrollTo('#contact')}
            style={styles.primaryButton}
            aria-label="Book your stay — navigate to contact section"
            onMouseEnter={e => {
              const btn = e.currentTarget;
              btn.style.background = '#FFEDA8';
              btn.style.color = '#003631';
              btn.style.transform = 'translateY(-2px)';
              btn.style.boxShadow = '0 8px 32px rgba(0,54,49,0.35)';
            }}
            onMouseLeave={e => {
              const btn = e.currentTarget;
              btn.style.background = '#FFEDA8';
              btn.style.color = '#003631';
              btn.style.transform = 'translateY(0)';
              btn.style.boxShadow = '0 2px 8px rgba(0,54,49,0.16)';
            }}
            onFocus={e => {
              e.currentTarget.style.outline = '2px solid #FFEDA8';
              e.currentTarget.style.outlineOffset = '3px';
            }}
            onBlur={e => {
              e.currentTarget.style.outline = 'none';
            }}
          >
            Book Your Stay
          </button>

          {/* Secondary CTA */}
          <button
            onClick={() => scrollTo('#gallery')}
            style={styles.secondaryButton}
            aria-label="View gallery — navigate to gallery section"
            onMouseEnter={e => {
              const btn = e.currentTarget;
              btn.style.background = '#FFEDA8';
              btn.style.color = '#003631';
              btn.style.transform = 'translateY(-2px)';
              btn.style.boxShadow = '0 8px 32px rgba(0,54,49,0.35)';
            }}
            onMouseLeave={e => {
              const btn = e.currentTarget;
              btn.style.background = 'transparent';
              btn.style.color = '#FFEDA8';
              btn.style.transform = 'translateY(0)';
              btn.style.boxShadow = '0 0 0 1.5px #FFEDA8';
            }}
            onFocus={e => {
              e.currentTarget.style.outline = '2px solid #FFEDA8';
              e.currentTarget.style.outlineOffset = '3px';
            }}
            onBlur={e => {
              e.currentTarget.style.outline = 'none';
            }}
          >
            View Gallery
          </button>
        </div>
      </div>
    </section>
  );
};

// ─── Inline style objects ──────────────────────────────────────────────────────
// Using inline styles here keeps the component self-contained and avoids any
// class-name conflicts with other Tailwind classes on the page. For a Tailwind
// project, these map 1-to-1 to utility classes — see comments per property.

const styles: Record<string, React.CSSProperties> = {

  // SECTION — full-viewport hero, relative positioning context
  // Tailwind: "relative w-full overflow-hidden" + custom min-height
  section: {
    position: 'relative',
    width: '100%',
    overflow: 'hidden',
    // dvh (dynamic viewport height) prevents iOS address-bar jump on mobile.
    // 100svh as fallback for browsers without dvh support.
    minHeight: '100svh',
    // Content sits at bottom-left — premium editorial / resort aesthetic
    display: 'flex',
    alignItems: 'flex-end',
    // Elegant large-screen cap so the hero doesn't become comically tall
    maxHeight: '960px',
  },

  // HERO IMAGE — fills the section, cover-cropped
  // • position:absolute fills behind content
  // • object-position focuses on the upper-center Himalayan scene on mobile;
  //   adjust this value to suit your specific photo's focal point.
  heroImage: {
    position: 'absolute',
    inset: 0,
    width: '100%',
    height: '100%',
    objectFit: 'cover',
    objectPosition: 'center 30%', // ← tune to your photo's focal point
    // Prevent layout shift: explicit width/height on the <img> element itself handles this
  },

  // OVERLAY — soft directional gradient for text legibility
  // Keeps the sky/mountain bright while ensuring bottom content is readable.
  // Much lighter than a flat rgba overlay → premium, airy feel.
  overlay: {
    position: 'absolute',
    inset: 0,
    // Layered gradient: strong at bottom for text, very light vignette at top
    background: `
      linear-gradient(
        to top,
        rgba(0, 20, 18, 0.78) 0%,
        rgba(0, 20, 18, 0.40) 40%,
        rgba(0, 20, 18, 0.08) 75%,
        transparent 100%
      )
    `,
  },

  // CONTENT — positioned above the overlay via z-index
  content: {
    position: 'relative',
    zIndex: 10,
    width: '100%',
    maxWidth: '1200px',
    margin: '0 auto',
    // Fluid padding: tight on mobile, generous on desktop
    padding: 'clamp(1.5rem, 5vw, 4rem) clamp(1.25rem, 5vw, 3.5rem) clamp(2.5rem, 5vw, 4.5rem)',
    display: 'flex',
    flexDirection: 'column',
    gap: 'clamp(1rem, 2.5vw, 1.5rem)',
  },

  // LOCATION PILL — subtle frosted chip
  locationPill: {
    display: 'inline-flex',
    alignItems: 'center',
    gap: '6px',
    // Soft blur pill — lightweight glassmorphism, works on any hero image
    background: 'rgba(255, 237, 168, 0.12)',
    backdropFilter: 'blur(8px)',
    WebkitBackdropFilter: 'blur(8px)',
    border: '1px solid rgba(255, 237, 168, 0.25)',
    borderRadius: '9999px',
    padding: '6px 14px 6px 10px',
    color: '#FFEDA8',
    fontSize: 'clamp(0.7rem, 1.5vw, 0.8rem)',
    fontFamily: "'Cormorant Garamond', Georgia, serif",
    letterSpacing: '0.08em',
    textTransform: 'uppercase' as const,
    // Self-size to content, not full-width
    alignSelf: 'flex-start',
  },

  // HEADING — the star of the hero
  // Fluid size: ~36px on mobile → 72px on large desktop
  // Cormorant Garamond: editorial serif used by luxury travel brands
  heading: {
    fontFamily: "'Cormorant Garamond', Georgia, serif",
    fontSize: 'clamp(3rem, 6.5vw, 5rem)',
    fontWeight: 600,
    lineHeight: 1.08,
    color: '#FFFFFF',
    letterSpacing: '-0.01em',
    textShadow: '0 2px 24px rgba(0,0,0,0.25)',
    // Cap width so very long names don't span full viewport on desktop
    maxWidth: '18ch',
    // text-wrap: balance keeps multi-line headings visually balanced
    textWrap: 'balance' as unknown as undefined,
    margin: 0,
  },

  // SUBTITLE — readable, light, airy
  subtitle: {
    fontFamily: "'Cormorant Garamond', Georgia, serif",
    fontSize: 'clamp(1.25rem, 2vw, 1.5rem)',
    fontWeight: 575,
    fontStyle: 'italic',
    lineHeight: 1.2,
    color: 'rgba(255, 255,255, 1)',
    maxWidth: '52ch',
    textShadow: '0 4px 28px rgba(0,0,0,0.65)',
    margin: 0,
  },

  // BUTTON GROUP — stacks on mobile, row on tablet+
  buttonGroup: {
    display: 'flex',
    flexWrap: 'wrap' as const,
    gap: 'clamp(0.75rem, 2vw, 1rem)',
    marginTop: 'clamp(0.25rem, 1vw, 0.5rem)',
  },

  // PRIMARY BUTTON — outlined warm-gold, fills on hover
  // "Book Your Stay" is the conversion action → distinct, high contrast
  primaryButton: {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    // Touch-safe: minimum 48px height
    minHeight: '48px',
    padding: '0 clamp(1.5rem, 3vw, 2.25rem)',
    background: '#FFEDA8',
    color: '#003631',
    border: 'none',
    // 1.5px outline mimics border without affecting box model
    boxShadow: '0 2px 8px rgba(255,237,168,0.20)',
    borderRadius: '4px',
    fontFamily: "'Cormorant Garamond', Georgia, serif",
    fontSize: 'clamp(0.9rem, 1.8vw, 1.05rem)',
    fontWeight: 600,
    letterSpacing: '0.06em',
    cursor: 'pointer',
    whiteSpace: 'nowrap' as const,
    transition: 'background 220ms cubic-bezier(0.16,1,0.3,1), color 220ms cubic-bezier(0.16,1,0.3,1), transform 220ms cubic-bezier(0.16,1,0.3,1), box-shadow 220ms cubic-bezier(0.16,1,0.3,1)',
    WebkitTapHighlightColor: 'transparent',
    // Active state (mobile tap feedback)
    // Note: can't set :active via inline styles; add global CSS rule below
  },

  // SECONDARY BUTTON — ghost / outline, lower visual weight
  // "View Gallery" is discovery-oriented → subordinate to primary
  secondaryButton: {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: '48px',
    padding: '0 clamp(1.25rem, 3vw, 2rem)',
    background: 'transparent',
    color: 'rgba(255,237,168,1)',
    border: 'none',
    boxShadow: '0 0 0 1.5px #FFEDA8',
    borderRadius: '4px',
    fontFamily: "'Cormorant Garamond', Georgia, serif",
    fontSize: 'clamp(0.9rem, 1.8vw, 1.05rem)',
    fontWeight: 800,
    letterSpacing: '0.06em',
    cursor: 'pointer',
    whiteSpace: 'nowrap' as const,
    transition: 'background 220ms cubic-bezier(0.16,1,0.3,1), transform 220ms cubic-bezier(0.16,1,0.3,1)',
    WebkitTapHighlightColor: 'transparent',
  },
};

export default Hero;
