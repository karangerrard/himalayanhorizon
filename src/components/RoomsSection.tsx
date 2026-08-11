import React, { useState, useCallback } from 'react';
import { Users, Check, Camera, Wifi, Utensils, Mountain, Droplets, Flame } from 'lucide-react';
import { roomsData } from '../data';
import GalleryModal from './GalleryModal';

// ─── Icon map ─────────────────────────────────────────────────────────────────
const FEATURE_ICONS: Record<string, React.ReactNode> = {
  'King Size Bed':     <Mountain  size={15} strokeWidth={1.8} />,
  'Mountain View':     <Mountain  size={15} strokeWidth={1.8} />,
  'Garden View':       <Mountain  size={15} strokeWidth={1.8} />,
  'Attached Bathroom': <Droplets  size={15} strokeWidth={1.8} />,
  'Modern Bathroom':   <Droplets  size={15} strokeWidth={1.8} />,
  'Bathroom Shower':   <Droplets  size={15} strokeWidth={1.8} />,
  'Bathroom Geyser':   <Droplets  size={15} strokeWidth={1.8} />,
  'Room Heater':       <Flame     size={15} strokeWidth={1.8} />,
  'Work Desk':         <Wifi      size={15} strokeWidth={1.8} />,
  'Free Wi-Fi':        <Wifi      size={15} strokeWidth={1.8} />,
  'Home-cooked Meals': <Utensils  size={15} strokeWidth={1.8} />,
};
const getIcon = (feature: string) =>
  FEATURE_ICONS[feature] ?? <Check size={15} strokeWidth={2} />;

interface Room {
  name: string;
  capacity: number | string;
  description: string;
  features: string[];
  gallery: string[];
}

const RoomsSection: React.FC = () => {
  const [isModalOpen, setIsModalOpen]   = useState(false);
  const BASE_URL = import.meta.env.BASE_URL;

  const handleViewPhotos = useCallback(() => setIsModalOpen(true),  []);
  const handleCloseModal = useCallback(() => setIsModalOpen(false), []);

  const room: Room     = roomsData[0];
  const coverImage     = `${BASE_URL}${room.gallery[0]?.slice(1) ?? ''}`;
  const galleryImages  = room.gallery.map((img: string) => `${BASE_URL}${img.slice(1)}`);

  return (
    <>
      {/* ── Scoped styles ── injected once, no extra bundle cost ─────────────
          We use a <style> tag so we can write real media queries and
          :hover/:active pseudo-classes without inline-style hacks.
          All class names are namespaced "rms-" to avoid collisions.
      ───────────────────────────────────────────────────────────────────── */}
      <style>{`
        /* ── DESKTOP: full-viewport cinematic split ── */
        .rms-section {
          background: #FAFAF8;
          padding: clamp(4rem, 8vw, 7rem) clamp(1.25rem, 5vw, 3rem);
        }

        .rms-header {
          text-align: center;
          margin-bottom: clamp(2.5rem, 5vw, 4rem);
        }

        /* ── CARD LAYOUT ───────────────────────────────────────────────── */
        /*
          Mobile  → single column stack  (image on top, details below)
          Desktop → viewport-width split (image left 55%, details right 45%)

          We do NOT touch anything below 1024px — mobile stays exactly as it was.
        */
        .rms-card {
          display: flex;
          flex-direction: column;         /* mobile: stacked */
          background: #FFFFFF;
          border-radius: 16px;
          box-shadow: 0 2px 8px rgba(0,54,49,0.06), 0 12px 40px rgba(0,54,49,0.08);
          overflow: hidden;
          max-width: 900px;
          margin: 0 auto;
        }

        @media (min-width: 1024px) {
          .rms-card {
            flex-direction: row;          /* desktop: side by side */
            max-width: 100%;              /* fills section width */
            min-height: 86vh;             /* cinematic — nearly full viewport height */
            border-radius: 20px;
          }
        }

        /* ── IMAGE PANEL ─────────────────────────────────────────────── */
        .rms-img-panel {
          position: relative;
          overflow: hidden;
          /* mobile: natural 3:2 ratio via padding trick */
          padding-top: 66.67%;
          min-height: 260px;
          flex-shrink: 0;
        }

        @media (min-width: 1024px) {
          .rms-img-panel {
            padding-top: 0;               /* desktop: panel fills card height */
            width: 58%;                   /* slightly wider than details */
            min-height: unset;
          }
        }

        .rms-img {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
          object-fit: cover;
          object-position: center;
          will-change: transform;
          transition: transform 700ms cubic-bezier(0.16, 1, 0.3, 1);
        }

        /* subtle Ken Burns on desktop hover — GPU composited, no reflow */
        @media (min-width: 1024px) {
          .rms-img-panel:hover .rms-img {
            transform: scale(1.05);
          }
        }

        /* bottom gradient — readability for the photo pill */
        .rms-img-panel::after {
          content: '';
          position: absolute;
          inset: 0;
          background: linear-gradient(
            to top,
            rgba(0, 30, 26, 0.30) 0%,
            transparent 45%
          );
          pointer-events: none;
        }

        /* photo count pill */
        .rms-photo-pill {
          position: absolute;
          bottom: 16px;
          right: 16px;
          z-index: 2;
          display: flex;
          align-items: center;
          gap: 6px;
          background: rgba(255,255,255,0.90);
          backdrop-filter: blur(8px);
          -webkit-backdrop-filter: blur(8px);
          border: none;
          border-radius: 9999px;
          padding: 8px 15px;
          cursor: pointer;
          font-size: 0.8rem;
          font-weight: 600;
          color: #003631;
          letter-spacing: 0.02em;
          box-shadow: 0 2px 10px rgba(0,0,0,0.14);
          transition: background 180ms ease, transform 180ms ease;
          font-family: inherit;
        }
        .rms-photo-pill:hover {
          background: #FFFFFF;
          transform: translateY(-2px);
        }
        .rms-photo-pill:active { transform: scale(0.97); }

        /* room count badge — top left of image */
        .rms-badge {
          position: absolute;
          top: 16px;
          left: 16px;
          z-index: 2;
          background: rgba(0, 54, 49, 0.82);
          backdrop-filter: blur(6px);
          -webkit-backdrop-filter: blur(6px);
          border-radius: 9999px;
          padding: 6px 14px;
          font-size: 0.72rem;
          font-weight: 600;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          color: #FFEDA8;
          font-family: inherit;
        }

        /* ── DETAILS PANEL ────────────────────────────────────────────── */
        .rms-details {
          display: flex;
          flex-direction: column;
          justify-content: center;
          gap: 1.25rem;
          padding: clamp(1.75rem, 4vw, 2.5rem);
        }

        @media (min-width: 1024px) {
          .rms-details {
            width: 42%;
            padding: clamp(2.5rem, 4vw, 4rem);
            gap: 1.6rem;
            /* subtle vertical scroll if content overflows on short viewports */
            overflow-y: auto;
          }
        }

        /* ── DIVIDER ──────────────────────────────────────────────────── */
        .rms-divider {
          height: 1px;
          background: rgba(0,54,49,0.09);
          border-radius: 1px;
          flex-shrink: 0;
        }

        /* ── AMENITIES GRID ───────────────────────────────────────────── */
        .rms-amenities {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 0.65rem 1.25rem;
        }

        .rms-amenity {
          display: flex;
          align-items: center;
          gap: 9px;
          color: #003631;
          font-weight: 600;
          font-size: clamp(0.92rem, 1.3vw, 0.92rem);
          font-family: 'Cormorant Garamond', Georgia, serif;
        }

        .rms-amenity-bullet {
          width: 7px;
          height: 7px;
          border-radius: 999px;
          background: #5C7A76;
          flex-shrink: 0;
        }

        /* ── BUTTONS ──────────────────────────────────────────────────── */
        .rms-btn-secondary {
          min-height: 48px;
          padding: 0 1.4rem;
          background: transparent;
          border: 1px solid rgba(0,54,49,0.28);
          border-radius: 8px;
          color: #003631;
          font-size: clamp(0.92rem, 1.3vw, 1rem);
          font-weight: 600;
          font-family: 'Cormorant Garamond', Georgia, serif;
          letter-spacing: 0.05em;
          cursor: pointer;
          transition: border-color 200ms ease, background 200ms ease, transform 200ms ease;
          white-space: nowrap;
          -webkit-tap-highlight-color: transparent;
        }
        .rms-btn-secondary:hover {
          border-color: #003631;
          background: rgba(0,54,49,0.05);
          transform: translateY(-1px);
        }
        .rms-btn-secondary:active { transform: scale(0.97); }

        .rms-btn-primary {
          min-height: 48px;
          padding: 0 1.75rem;
          background: #003631;
          border: none;
          border-radius: 8px;
          color: #FFEDA8;
          font-size: clamp(0.82rem, 1.3vw, 1rem);
          font-weight: 600;
          font-family: 'Cormorant Garamond', Georgia, serif;
          letter-spacing: 0.08em;
          cursor: pointer;
          box-shadow: 0 2px 10px rgba(0,54,49,0.22);
          transition: background 200ms ease, transform 200ms ease, box-shadow 200ms ease;
          white-space: nowrap;
          -webkit-tap-highlight-color: transparent;
        }
        .rms-btn-primary:hover {
          background: #004d44;
          transform: translateY(-2px);
          box-shadow: 0 8px 24px rgba(0,54,49,0.32);
        }
        .rms-btn-primary:active { transform: scale(0.97); }

        /* ── TRUST STRIP ──────────────────────────────────────────────── */
        .rms-trust {
          display: flex;
          justify-content: center;
          gap: clamp(1.25rem, 3.5vw, 3rem);
          flex-wrap: wrap;
          margin-top: clamp(1.5rem, 3vw, 2.5rem);
        }

        .rms-trust-item {
          display: flex;
          align-items: center;
          gap: 6px;
          font-size: 1rem;
          color: #6B7B78;
          font-family: 'Cormorant Garamond', Georgia, serif;
          letter-spacing: -0.02em;
          font-weight: 600;
        }

        /* ── TYPOGRAPHY HELPERS ───────────────────────────────────────── */
        .rms-eyebrow {
          font-family: 'Cormorant Garamond', Georgia, serif;
          font-size: clamp(0.68rem, 1.2vw, 0.78rem);
          font-weight: 600;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          color: #5C7A76;
          margin-bottom: 0.75rem;
        }

        .rms-h2 {
          font-family: 'Cormorant Garamond', Georgia, serif;
          font-size: clamp(2rem, 4.5vw, 3.2rem);
          font-weight: 600;
          line-height: 1.1;
          color: #003631;
          margin: 0 0 1rem;
          letter-spacing: -0.01em;
        }

        .rms-subtitle {
          font-family: 'Cormorant Garamond', Georgia, serif;
          font-size: clamp(1.25rem, 2vw, 1.4rem);
          font-style: italic;
          font-weight: 500;
          color: #6B7B78;
          max-width: 46ch;
          margin: 0 auto;
          line-height: 1.6;
          letter-spacing: -0.02em;
        }

        .rms-capacity-label {
          display: flex;
          align-items: center;
          gap: 8px;
          margin-bottom: 0.5rem;
        }

        .rms-capacity-text {
          font-size: 0.78rem;
          color: #5C7A76;
          letter-spacing: 0.06em;
          text-transform: uppercase;
          font-family: 'Cormorant Garamond', Georgia, serif;
          font-weight: 700;
        }

        .rms-room-name {
          font-family: 'Cormorant Garamond', Georgia, serif;
          font-size: clamp(1.6rem, 2.8vw, 2.4rem);
          font-weight: 600;
          color: #003631;
          line-height: 1.15;
          margin: 0;
        }

        .rms-description {
          font-family: 'Cormorant Garamond', Georgia, serif;
          font-size: clamp(1.15rem, 1.6vw, 1.15rem);
          line-height: 1.5;
          color: #4A5E5B;
          margin: 0;
          font-weight: 600;
        }

        .rms-price-value {
          font-family: 'Cormorant Garamond', Georgia, serif;
          font-size: clamp(2rem, 2.5vw, 2.5rem);
          font-weight: 600;
          color: #003631;
          line-height: 1;
        }

        .rms-price-unit {
          font-size: 1rem;
          font-weight: 600;
          color: #6B7B78;
          margin-left: 4px;
        }

        .rms-price-note {
          font-size: .95rem;
          color: #8A9B98;
          margin: 5px 0 0;
          font-family: 'Cormorant Garamond', Georgia, serif;
          font-weight: 600;
        }
      `}</style>

      <section id="rooms" className="rms-section">

        {/* ── Section Header ────────────────────────────────────────────── */}
        <div className="rms-header">
          <p className="rms-eyebrow">Where You'll Stay</p>
          <h2 className="rms-h2">Accommodation</h2>
          <p className="rms-subtitle">
            4 comfortable rooms in Deohari village, each with the same warm character,
            views of the mountains and the peace you came for.
          </p>
        </div>

        {/* ── Full-viewport split card ──────────────────────────────────── */}
        <div className="rms-card">

          {/* Left — Image panel */}
          <div className="rms-img-panel">
            <img
              src={coverImage}
              alt={`${room.name} — Himalayan Horizon Deohari, Sainj Valley`}
              loading="lazy"
              decoding="async"
              width={1200}
              height={900}
              className="rms-img"
            />

            {/* Room count badge */}
            <div className="rms-badge">4 Rooms Available</div>

            {/* Photo count pill */}
            <button
              className="rms-photo-pill"
              onClick={handleViewPhotos}
              aria-label={`View all ${room.gallery.length} photos of ${room.name}`}
            >
              <Camera size={13} strokeWidth={2} />
              {room.gallery.length} Photos
            </button>
          </div>

          {/* Right — Details panel */}
          <div className="rms-details">

            {/* Name + capacity */}
            <div>
              <div className="rms-capacity-label">
                <Users size={15} strokeWidth={1.8} color="#5C7A76" />
                <span className="rms-capacity-text">
                  Maximum 3 Guests per Room
                </span>
              </div>
              <h3 className="rms-room-name">{room.name}</h3>
            </div>

            <div className="rms-divider" />

            {/* Description */}
            <p className="rms-description">{room.description}</p>

            {/* Amenities */}
            <div className="rms-amenities">
              {room.features.map((feature: string) => (
                <div key={feature} className="rms-amenity">
                  <span className="rms-amenity-bullet" />
                  {feature}
                </div>
              ))}
            </div>

            <div className="rms-divider" />

            {/* Price + CTAs */}
            <div style={{
              display:        'flex',
              alignItems:     'center',
              justifyContent: 'space-between',
              flexWrap:       'wrap',
              gap:            '1rem',
            }}>
              <div>
                <div className="rms-price-value">
                  ₹1,200
                  <span className="rms-price-unit">/ night</span>
                </div>
                <p className="rms-price-note">Per room · Best rate direct</p>
              </div>

              <div style={{ display: 'flex', gap: '0.65rem', flexWrap: 'wrap' }}>
                <button
                  className="rms-btn-secondary"
                  onClick={handleViewPhotos}
                  aria-label="View room photos"
                >
                  View Photos
                </button>
                <button
                  className="rms-btn-primary"
                  onClick={() =>
                    document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' })
                  }
                  aria-label="Book this room"
                >
                  Book Now
                </button>
              </div>
            </div>

          </div>{/* end details */}
        </div>{/* end card */}

        {/* ── Trust strip ───────────────────────────────────────────────── */}
        <div className="rms-trust">
          {[
            'Home cooked meals (Chargeable)',
            'Free Wi-Fi in rooms',
            'Book direct for best rates',
          ].map(label => (
            <div key={label} className="rms-trust-item">
              <Check size={13} strokeWidth={2.5} color="#5C7A76" />
              {label}
            </div>
          ))}
        </div>

      </section>

      {/* GalleryModal — always rendered, controlled by isOpen */}
      <GalleryModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        images={galleryImages}
        title={room.name}
        startingIndex={0}
      />
    </>
  );
};

export default RoomsSection;
