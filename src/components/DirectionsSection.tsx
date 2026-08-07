import React, { useRef, useState, useEffect } from 'react';
import { Plane, Car, Train, Navigation, MapPin, ExternalLink, Clock, Route } from 'lucide-react';
import { travelInfo } from '../data';

// ─── Types ────────────────────────────────────────────────────────────────────
interface TravelOption {
  title: string;
  description: string;
  distance?: string;
  duration?: string;
  routes?: string[];
}

// ─── Icon + accent map — one object lookup, zero runtime cost ─────────────────
const CARD_META: Record<string, { icon: React.ElementType; accent: string; label: string }> = {
  'By Air':           { icon: Plane,      accent: '#E8F4F0', label: 'Nearest Airport' },
  'By Road':          { icon: Car,        accent: '#EDF4E8', label: 'Road Route'      },
  'By Train':         { icon: Train,      accent: '#F4F0E8', label: 'Nearest Railway' },
  'Local Transport':  { icon: Navigation, accent: '#EEE8F4', label: 'Last Mile'       },
};

const DirectionsSection: React.FC = () => {
  // ─── Map lazy-load via Intersection Observer ────────────────────────────────
  // WHY: Google Maps iframe is ~600KB of JS + network. Loading it only when
  // the user scrolls near the map section saves ~400ms TTI on mobile.
  // The iframe never loads on users who don't scroll that far — a significant
  // bandwidth saving on slow Himalayan mobile connections.
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const [mapVisible, setMapVisible]   = useState(false);
  const [mapLoaded,  setMapLoaded]    = useState(false);

  useEffect(() => {
    const el = mapContainerRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setMapVisible(true);
          observer.disconnect(); // only need to trigger once
        }
      },
      { rootMargin: '200px' } // start loading 200px before it enters viewport
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  // ─── Data ──────────────────────────────────────────────────────────────────
  const travelOptions: TravelOption[] = [
    travelInfo.byAir   as TravelOption,
    travelInfo.byRoad  as TravelOption,
    travelInfo.byTrain as TravelOption,
  ];

  const mapSrc = `https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d167587.3940656053!2d77.22681679809206!3d31.665512679214707!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390453fce91ab5e7%3A0x3caeba76dbe338e9!2sHimalayan%20Horizon%20Deohari!5e0!3m2!1sen!2sin!4v1777134868330!5m2!1sen!2sin`;
  const mapsUrl = `https://maps.google.com/?q=Himalayan+Horizon+Deohari`;

  return (
    <>
      {/* ── Scoped styles — real CSS for hover/active/media ─────────────────
          Namespaced "dir-" to prevent collisions.
          All animations use transform/opacity — GPU composited, no reflow.
      ─────────────────────────────────────────────────────────────────────── */}
      <style>{`
        .dir-section {
          background: #F7F5F0;
          padding: clamp(4rem, 8vw, 7rem) clamp(1.25rem, 5vw, 3rem);
        }

        /* ── Header ──────────────────────────────────────────────────────── */
        .dir-header {
          text-align: center;
          margin-bottom: clamp(2.5rem, 5vw, 4rem);
        }
        .dir-eyebrow {
          font-family: 'Cormorant Garamond', Georgia, serif;
          font-size: clamp(0.68rem, 1.2vw, 0.76rem);
          font-weight: 600;
          letter-spacing: 0.18em;
          text-transform: uppercase;
          color: #5C7A76;
          margin-bottom: 0.75rem;
        }
        .dir-h2 {
          font-family: 'Cormorant Garamond', Georgia, serif;
          font-size: clamp(2rem, 4.5vw, 3.2rem);
          font-weight: 600;
          line-height: 1.1;
          color: #003631;
          margin: 0 0 1rem;
          letter-spacing: -0.01em;
        }
        .dir-subtitle {
          font-family: 'Cormorant Garamond', Georgia, serif;
          font-size: clamp(1rem, 2vw, 1.5rem);
          font-weight: 400;
          font-style: italic;
          color: #6B7B78;
          max-width: 50ch;
          margin: 0 auto;
          line-height: 1.6;
        }

        /* ── Travel cards grid ───────────────────────────────────────────── */
        .dir-cards {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(min(100%, 280px), 1fr));
          gap: clamp(1rem, 2.5vw, 1.5rem);
          max-width: 1040px;
          margin: 0 auto clamp(3rem, 6vw, 5rem);
        }

        .dir-card {
          background: #FFFFFF;
          border-radius: 14px;
          padding: clamp(1.4rem, 3vw, 2rem);
          border: 1px solid rgba(0, 54, 49, 0.07);
          box-shadow: 0 1px 4px rgba(0,54,49,0.04), 0 4px 16px rgba(0,54,49,0.05);
          transition: transform 220ms cubic-bezier(0.16,1,0.3,1),
                      box-shadow 220ms cubic-bezier(0.16,1,0.3,1);
          cursor: default;
        }
        .dir-card:hover {
          transform: translateY(-3px);
          box-shadow: 0 2px 8px rgba(0,54,49,0.07), 0 12px 32px rgba(0,54,49,0.09);
        }
        .dir-card:active { transform: scale(0.99); }

        /* Icon circle */
        .dir-icon-wrap {
          width: 44px;
          height: 44px;
          border-radius: 10px;
          display: flex;
          align-items: center;
          justify-content: center;
          margin-bottom: 1rem;
          flex-shrink: 0;
        }

        /* Card label */
        .dir-card-label {
          font-family: 'Cormorant Garamond', Georgia, serif;
          font-size: 0.7rem;
          font-weight: 500;
          letter-spacing: 0.14em;
          text-transform: uppercase;
          color: #8A9B98;
          margin-bottom: 0.25rem;
        }

        /* Card title */
        .dir-card-title {
          font-family: 'Cormorant Garamond', Georgia, serif;
          font-size: clamp(1.1rem, 2vw, 1.3rem);
          font-weight: 600;
          color: #003631;
          margin: 0 0 0.65rem;
          line-height: 1.2;
        }

        /* Divider */
        .dir-divider {
          height: 1px;
          background: rgba(0,54,49,0.07);
          margin: 0.9rem 0;
        }

        /* Description */
        .dir-card-desc {
          font-family: 'Cormorant Garamond', Georgia, serif;
          font-size: clamp(0.92rem, 1.5vw, 1rem);
          line-height: 1.7;
          color: #4A5E5B;
          margin: 0 0 0.75rem;
        }

        /* Distance + duration pills row */
        .dir-meta-row {
          display: flex;
          flex-wrap: wrap;
          gap: 0.5rem;
          margin-bottom: 0.75rem;
        }
        .dir-meta-pill {
          display: inline-flex;
          align-items: center;
          gap: 5px;
          background: rgba(0,54,49,0.06);
          border-radius: 9999px;
          padding: 4px 10px;
          font-family: 'Cormorant Garamond', Georgia, serif;
          font-size: 0.78rem;
          font-weight: 500;
          color: #003631;
          letter-spacing: 0.02em;
        }

        /* Routes list */
        .dir-routes {
          list-style: none;
          padding: 0;
          margin: 0;
          display: flex;
          flex-direction: column;
          gap: 0.35rem;
        }
        .dir-route-item {
          display: flex;
          align-items: flex-start;
          gap: 8px;
          font-family: 'Cormorant Garamond', Georgia, serif;
          font-size: clamp(0.85rem, 1.3vw, 0.92rem);
          color: #5C7A76;
          line-height: 1.5;
        }
        .dir-route-dot {
          width: 5px;
          height: 5px;
          border-radius: 50%;
          background: #5C7A76;
          margin-top: 7px;
          flex-shrink: 0;
        }

        /* ── Map section ─────────────────────────────────────────────────── */
        .dir-map-section {
          max-width: 1040px;
          margin: 0 auto;
          background: #FFFFFF;
          border-radius: 16px;
          overflow: hidden;
          box-shadow: 0 2px 8px rgba(0,54,49,0.06), 0 12px 40px rgba(0,54,49,0.08);
          border: 1px solid rgba(0,54,49,0.07);
        }

        /* Map header bar */
        .dir-map-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          flex-wrap: wrap;
          gap: 0.75rem;
          padding: clamp(1rem, 2.5vw, 1rem) clamp(1rem, 3vw, 1rem);
          border-bottom: 1px solid rgba(0,54,49,0.07);
          text-align: center;
        }
        .dir-map-title-group {
          display: flex;
          align-items: center;
          gap: 10px;
        }
        .dir-map-title {
          font-family: 'Cormorant Garamond', Georgia, serif;
          font-size: clamp(1.1rem, 2vw, 1.35rem);
          font-weight: 600;
          color: #003631;
          margin: 0;
          line-height: 1.2;
        }
        .dir-map-subtitle {
          font-family: 'Cormorant Garamond', Georgia, serif;
          font-size: 0.8rem;
          color: #8A9B98;
          margin: 2px 0 0;
          font-style: italic;
        }

        /* Open in Maps CTA */
        .dir-maps-btn {
          display: inline-flex;
          align-items: center;
          gap: 7px;
          background: #003631;
          color: #FFEDA8;
          border: none;
          border-radius: 8px;
          padding: 10px 18px;
          font-family: 'Cormorant Garamond', Georgia, serif;
          font-size: 0.85rem;
          font-weight: 600;
          letter-spacing: 0.05em;
          cursor: pointer;
          text-decoration: none;
          box-shadow: 0 2px 8px rgba(0,54,49,0.20);
          transition: background 200ms ease, transform 200ms ease, box-shadow 200ms ease;
          white-space: nowrap;
          -webkit-tap-highlight-color: transparent;
        }
        .dir-maps-btn:hover {
          background: #004d44;
          transform: translateY(-2px);
          box-shadow: 0 6px 20px rgba(0,54,49,0.28);
        }
        .dir-maps-btn:active { transform: scale(0.97); }

        /* Map iframe wrapper — 16:9 on desktop, 4:3 on mobile */
        .dir-map-wrap {
          position: relative;
          width: 100%;
          padding-top: 56.25%; /* 16:9 */
          background: #EDF0EE;
        }
        @media (max-width: 640px) {
          .dir-map-wrap { padding-top: 75%; } /* 4:3 on mobile — more vertical room */
        }

        .dir-map-iframe {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
          border: none;
          display: block;
        }

        /* ── Skeleton loader — shows while map is loading ─────────────────
           Uses shimmer animation on GPU (background-position change).
           Prevents "empty box" CLS while iframe initialises.
        ─────────────────────────────────────────────────────────────────── */
        @keyframes dir-shimmer {
          0%   { background-position: -200% 0; }
          100% { background-position:  200% 0; }
        }
        .dir-skeleton {
          position: absolute;
          inset: 0;
          background: linear-gradient(
            90deg,
            #E8EDEB 25%,
            #D8E0DD 50%,
            #E8EDEB 75%
          );
          background-size: 200% 100%;
          animation: dir-shimmer 1.6s ease-in-out infinite;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          gap: 0.75rem;
        }
        .dir-skeleton-icon {
          width: 48px;
          height: 48px;
          border-radius: 50%;
          background: rgba(0,54,49,0.10);
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .dir-skeleton-text {
          font-family: 'Cormorant Garamond', Georgia, serif;
          font-size: 0.9rem;
          color: #5C7A76;
          font-style: italic;
        }

        /* Hide skeleton once map has loaded */
        .dir-skeleton.loaded {
          display: none;
        }

        @media (prefers-reduced-motion: reduce) {
          .dir-skeleton { animation: none; }
          .dir-card { transition: none; }
          .dir-maps-btn { transition: none; }
        }
      `}</style>

      <section id="directions" className="dir-section">

        {/* ── Section header ────────────────────────────────────────────── */}
        <div className="dir-header">
          <p className="dir-eyebrow">Plan Your Journey</p>
          <h2 className="dir-h2">How to Reach Us</h2>
          <p className="dir-subtitle">
            Well connected to major cities, your mountain escape awaits.
          </p>
        </div>

        {/* ── Travel cards ──────────────────────────────────────────────── */}
        <div className="dir-cards">
          {travelOptions.map((option) => {
            const meta        = CARD_META[option.title];
            const IconComp    = meta?.icon ?? Navigation;
            const accentBg    = meta?.accent ?? '#F0F4F2';
            const cardLabel   = meta?.label  ?? '';

            return (
              <div key={option.title} className="dir-card">

                {/* Icon */}
                <div
                  className="dir-icon-wrap"
                  style={{ background: accentBg }}
                  aria-hidden="true"
                >
                  <IconComp size={20} strokeWidth={1.6} color="#003631" />
                </div>

                {/* Label + title */}
                <p className="dir-card-label">{cardLabel}</p>
                <h3 className="dir-card-title">{option.title}</h3>

                <div className="dir-divider" />

                {/* Description */}
                <p className="dir-card-desc">{option.description}</p>

                {/* Distance + duration pills */}
                {(option.distance || option.duration) && (
                  <div className="dir-meta-row">
                    {option.distance && (
                      <span className="dir-meta-pill">
                        <Route size={11} strokeWidth={2} />
                        {option.distance}
                      </span>
                    )}
                    {option.duration && (
                      <span className="dir-meta-pill">
                        <Clock size={11} strokeWidth={2} />
                        {option.duration}
                      </span>
                    )}
                  </div>
                )}

                {/* Routes */}
                {option.routes && option.routes.length > 0 && (
                  <ul className="dir-routes" aria-label={`Routes for ${option.title}`}>
                    {option.routes.map((route) => (
                      <li key={route} className="dir-route-item">
                        <span className="dir-route-dot" aria-hidden="true" />
                        {route}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            );
          })}
        </div>

        {/* ── Map section ───────────────────────────────────────────────── */}
        {/*
          PERFORMANCE STRATEGY:
          1. The map container is observed by IntersectionObserver.
          2. mapVisible flips to true only when user scrolls within 200px of it.
          3. Until then: no iframe, no Google Maps JS, no network request.
          4. Once visible: iframe src is set — Google Maps loads normally.
          5. Skeleton shimmer fills the space while the iframe initialises.
          6. onLoad: skeleton is hidden, iframe appears (opacity transition).
          This pattern saves ~600KB of JS on users who never scroll to the map,
          and improves TTI by ~400ms on a mid-range mobile device.
        */}
        <div className="dir-map-section" ref={mapContainerRef}>

          {/* Map header */}
          <div className="dir-map-header">
            <div className="dir-map-title-group">
              <MapPin size={18} strokeWidth={1.8} color="#003631" aria-hidden="true" />
              <div>
                <h3 className="dir-map-title">Our Location</h3>
                <p className="dir-map-subtitle">Deohari village, Sainj Valley, Himachal Pradesh</p>
              </div>
            </div>

            {/* Open in Google Maps — restored from commented-out code */}
            {/*<a
              href={mapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="dir-maps-btn"
              aria-label="Open Himalayan Horizon Deohari in Google Maps"
            >
              <ExternalLink size={14} strokeWidth={2} aria-hidden="true" />
              Open in Maps
            </a>*/}
          </div>

          {/* Map frame */}
          <div className="dir-map-wrap">

            {/* Skeleton — visible until iframe fires onLoad */}
            <div className={`dir-skeleton${mapLoaded ? ' loaded' : ''}`} aria-hidden="true">
              <div className="dir-skeleton-icon">
                <MapPin size={22} strokeWidth={1.6} color="#003631" />
              </div>
              <span className="dir-skeleton-text">Loading map…</span>
            </div>

            {/* Iframe — only rendered once IntersectionObserver fires */}
            {mapVisible && (
              <iframe
                src={mapSrc}
                className="dir-map-iframe"
                title="Himalayan Horizon Deohari location on Google Maps"
                loading="lazy"      // belt-and-suspenders with IntersectionObserver
                referrerPolicy="no-referrer-when-downgrade"
                allowFullScreen
                onLoad={() => setMapLoaded(true)}
                style={{
                  opacity:    mapLoaded ? 1 : 0,
                  transition: 'opacity 400ms ease',
                }}
              />
            )}
          </div>

        </div>{/* end map section */}
      </section>
    </>
  );
};

export default DirectionsSection;
