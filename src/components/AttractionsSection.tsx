import React, { useState } from 'react';
import { Image as ImageIcon, MapPin, ArrowUpRight } from 'lucide-react';
import { attractionsData } from '../data';
import GalleryModal from './GalleryModal';

// ─── Nearby Attractions Section ────────────────────────────────────────────────
// Refinement pass only — architecture, props, and data flow are unchanged.
// Colors/typography reuse existing CSS variables (--accent-text, --primary, etc.)
// defined elsewhere in the project. No new palette, no new font introduced.
// ────────────────────────────────────────────────────────────────────────────────

interface Attraction {
  name: string;
  description: string;
  distance: string;
  gallery: string[];
  cover?: string; // optional dedicated small cover image, falls back to gallery[0]
}

const AttractionsSection: React.FC = () => {
  const [selectedAttraction, setSelectedAttraction] = useState<Attraction | null>(null);

  // ── Mobile "show more" state ──────────────────────────────────────────────
  // WHY: On mobile, 3 full-height cards force a lot of scrolling before a
  // guest even reaches the map/booking sections below. Instead of hiding
  // content or adding a carousel library, we show the first 2 cards expanded
  // and collapse the rest behind a lightweight "View more attractions" toggle.
  // This is pure CSS/state — no new dependency, no layout library.
  const [showAllMobile, setShowAllMobile] = useState(false);

  const BASE_URL = import.meta.env.BASE_URL;

  const resolvePath = (path: string) => `${BASE_URL}${path.slice(1)}`;

  return (
    <>
      {/* ── Scoped styles ────────────────────────────────────────────────────
          Kept as a <style> block (matching the project's existing pattern of
          inline/scoped styles seen in Hero.tsx and DirectionsSection.tsx) so
          no build-tool/Tailwind config changes are required.
          All colors reference existing CSS variables already used across the
          site (--primary, --accent-text, --text-primary, --text-muted,
          --border-light, --surface, --bg-page) — replace any that don't exist
          in your variable set with your actual token names; no new hex values
          are introduced here.
      ──────────────────────────────────────────────────────────────────────── */}
      <style>{`
        .attr-section {
          background: var(--bg-page, #F7F5F0);
          padding: clamp(3.5rem, 7vw, 6.5rem) clamp(1.25rem, 5vw, 3rem);
        }

        .attr-header {
          max-width: 640px;
          margin: 0 auto clamp(2.25rem, 5vw, 3.5rem);
          text-align: center;
        }
        .attr-eyebrow {
          font-family: var(--font-heading, 'Cormorant Garamond', Georgia, serif);
          font-size: 0.72rem;
          font-weight: 500;
          letter-spacing: 0.18em;
          text-transform: uppercase;
          color: var(--primary, #5C7A76);
          margin: 0 0 0.75rem;
        }
        .attr-h2 {
          font-family: var(--font-heading, 'Cormorant Garamond', Georgia, serif);
          font-size: clamp(1.9rem, 4vw, 2.75rem);
          font-weight: 600;
          line-height: 1.15;
          color: var(--text-primary, #003631);
          letter-spacing: -0.01em;
          margin: 0 0 0.85rem;
        }
        .attr-subtitle {
          font-family: var(--font-heading, 'Cormorant Garamond', Georgia, serif);
          font-size: clamp(0.95rem, 1.6vw, 1.1rem);
          font-style: italic;
          color: var(--text-muted, #6B7B78);
          line-height: 1.6;
          margin: 0;
        }

        /* ── Cards grid ───────────────────────────────────────────────────── */
        .attr-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: clamp(1.25rem, 2.5vw, 1.75rem);
          max-width: 1140px;
          margin: 0 auto;
        }

        @media (max-width: 900px) {
          .attr-grid { grid-template-columns: 1fr; gap: 1.25rem; }
        }

        /* ── Card ─────────────────────────────────────────────────────────── */
        .attr-card {
          background: var(--surface, #FFFFFF);
          border-radius: 16px;
          overflow: hidden;
          border: 1px solid rgba(0, 54, 49, 0.07);
          box-shadow: 0 1px 3px rgba(0,54,49,0.04), 0 6px 20px rgba(0,54,49,0.05);
          transition: transform 240ms cubic-bezier(0.16,1,0.3,1),
                      box-shadow 240ms cubic-bezier(0.16,1,0.3,1);
          display: flex;
          flex-direction: column;
        }

        /* ── Image ─────────────────────────────────────────────────────────
           Fixed aspect-ratio box — reserves space before image loads,
           eliminating CLS. object-fit: cover keeps consistent cropping
           across differently-sized source photos.
        ──────────────────────────────────────────────────────────────────── */
        .attr-image-wrap {
          position: relative;
          width: 100%;
          aspect-ratio: 4 / 3;
          overflow: hidden;
          background: var(--border-light, #EDEAE3); /* placeholder tone while loading */
        }
          .attr-image-wrap:focus-visible {
          outline: 2px solid var(--primary, #5C7A76);
          outline-offset: 2px;
        }
        .attr-image {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 500ms cubic-bezier(0.16,1,0.3,1);
        }

        /* ── Badges — small, quiet, legible ──────────────────────────────── */
        .attr-badge-row {
          position: absolute;
          top: 0.6rem;
          left: 0.6rem;
          right: 0.6rem;
          display: flex;
          justify-content: space-between;
          gap: 0.5rem;
          pointer-events: none;
        }
        .attr-badge {
          display: inline-flex;
          align-items: center;
          gap: 4px;
          background: rgba(0, 20, 18, 0.55);
          -webkit-backdrop-filter: blur(3px);
          backdrop-filter: blur(3px);
          color: #FFFFFF;
          border-radius: 999px;
          padding: 4px 9px;
          font-size: 0.7rem;
          font-weight: 500;
          font-family: var(--font-body, 'Inter', sans-serif);
          letter-spacing: 0.01em;
          line-height: 1.4;
        }

        /* ── Card body ────────────────────────────────────────────────────── */
        .attr-body {
          padding: clamp(1.1rem, 2.5vw, 1.5rem);
          display: flex;
          flex-direction: column;
          gap: 0.55rem;
          flex: 1;
        }
        .attr-name {
          font-family: var(--font-heading, 'Cormorant Garamond', Georgia, serif);
          font-size: clamp(1.15rem, 2vw, 1.35rem);
          font-weight: 600;
          color: var(--text-primary, #003631);
          margin: 0;
          line-height: 1.25;
        }
        .attr-desc {
          font-family: var(--font-body, 'Inter', sans-serif);
          font-size: 0.9rem;
          line-height: 1.6;
          color: var(--text-muted, #55655F);
          margin: 0;
          flex: 1;
        }

        /* ── CTA — quiet, premium, consistent with site button language ──── */
        .attr-cta {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 6px;
          margin-top: 0.5rem;
          padding: 0.65rem 1rem;
          min-height: 44px; /* touch target */
          background: transparent;
          border: 1.4px solid var(--text-primary, #003631);
          border-radius: 9px;
          color: var(--text-primary, #003631);
          font-family: var(--font-body, 'Inter', sans-serif);
          font-size: 0.85rem;
          font-weight: 600;
          letter-spacing: 0.02em;
          cursor: pointer;
          transition: background 200ms ease, color 200ms ease, transform 200ms ease;
          -webkit-tap-highlight-color: transparent;
        }
        .attr-cta:hover {
          background: var(--text-primary, #003631);
          color: #FFFFFF;
        }
        .attr-cta:active { transform: scale(0.98); }
        .attr-cta svg { transition: transform 200ms ease; }
        .attr-cta:hover svg { transform: translate(2px, -2px); }

        /* ── Mobile: show 2, collapse rest behind toggle ─────────────────── */

        @media (max-width: 900px) {
          .attr-card--collapsible.attr-hidden-mobile {
            display: none;
          }
          .attr-card--collapsible.attr-show-mobile {
            display: flex;
          }
        }

        .attr-more-btn-wrap {
          display: none;
        }
        @media (max-width: 900px) {
          .attr-more-btn-wrap {
            display: flex;
            justify-content: center;
            margin-top: 1.25rem;
          }
        }
        .attr-more-btn {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          background: transparent;
          border: none;
          color: var(--primary, #5C7A76);
          font-family: var(--font-heading, 'Cormorant Garamond', Georgia, serif);
          font-style: italic;
          font-size: 0.95rem;
          padding: 0.6rem 1rem;
          min-height: 44px;
          cursor: pointer;
          text-decoration: underline;
          text-decoration-color: rgba(92,122,118,0.35);
          text-underline-offset: 3px;
        }

        @media (prefers-reduced-motion: reduce) {
          .attr-card, .attr-image, .attr-cta, .attr-cta svg {
            transition: none !important;
          }
        }
      `}</style>

      <section id="attractions" className="attr-section" aria-labelledby="attractions-heading">

        {/* ── Header ─────────────────────────────────────────────────────── */}
        <div className="attr-header">
          <p className="attr-eyebrow">Explore The Valley</p>
          <h2 id="attractions-heading" className="attr-h2">Nearby Attractions</h2>
          <p className="attr-subtitle">
            Peaceful lakes, meadows, and trails around Deohari — each within easy reach.
          </p>
        </div>

        {/* ── Cards grid ─────────────────────────────────────────────────── */}
        <div className="attr-grid">
          {attractionsData.map((attraction: Attraction, index: number) => {
            const isCollapsible = index >= 2; // keep first 2 always visible on mobile
            const coverSrc = resolvePath(attraction.cover ?? attraction.gallery[0]);

            return (
              <article
                key={attraction.name}
                className={
                  isCollapsible
                    ? `attr-card attr-card--collapsible ${showAllMobile ? 'attr-show-mobile' : 'attr-hidden-mobile'}`
                    : 'attr-card'
                }
              >
                {/* Image — only the single cover image is requested.
                    Gallery images are never fetched until the modal opens. */}
                <div className="attr-image-wrap"
                onClick={() => setSelectedAttraction(attraction)}
                role="button"
                tabIndex={0}
                aria-label={`View photo gallery of ${attraction.name}`}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    setSelectedAttraction(attraction);
                  }
                }}
                style={{ cursor: 'pointer' }}
                >
                  <img
                    src={coverSrc}
                    alt={`${attraction.name} — near Himalayan Horizon Deohari, Sainj Valley, Himachal Pradesh`}
                    className="attr-image"
                    loading="lazy"
                    decoding="async"
                    width={480}
                    height={360}
                    sizes="(max-width: 900px) 100vw, 33vw"
                  />
                  <div className="attr-badge-row">
                    <span className="attr-badge">
                      <MapPin size={11} strokeWidth={2} aria-hidden="true" />
                      {attraction.distance}
                    </span>
                    <span className="attr-badge">
                      <ImageIcon size={11} strokeWidth={2} aria-hidden="true" />
                      {attraction.gallery.length}
                    </span>
                  </div>
                </div>

                {/* Body */}
                <div className="attr-body">
                  <h3 className="attr-name">{attraction.name}</h3>
                  <p className="attr-desc">{attraction.description}</p>

                  <button
                    type="button"
                    className="attr-cta"
                    onClick={() => setSelectedAttraction(attraction)}
                    aria-haspopup="dialog"
                    aria-label={`View photo gallery of ${attraction.name}`}
                  >
                    View gallery
                    <ArrowUpRight size={14} strokeWidth={2.2} aria-hidden="true" />
                  </button>
                </div>
              </article>
            );
          })}
        </div>

        {/* ── Mobile "view more" toggle ──────────────────────────────────── */}
        {attractionsData.length > 2 && (
          <div className="attr-more-btn-wrap">
            <button
              type="button"
              className="attr-more-btn"
              onClick={() => setShowAllMobile((prev) => !prev)}
              aria-expanded={showAllMobile}
            >
              {showAllMobile ? 'Show fewer attractions' : `View ${attractionsData.length - 2} more attractions`}
            </button>
          </div>
        )}

        {/* ── Gallery modal — mounted/unmounted based on selection ────────
            Images inside the modal are only requested once the user clicks
            "View gallery" and this component (and its <img> tags) mounts.
            No gallery images for any attraction are fetched on page load. */}
        {selectedAttraction && (
          <GalleryModal
            isOpen={!!selectedAttraction}
            onClose={() => setSelectedAttraction(null)}
            images={selectedAttraction.gallery.map(resolvePath)}
            title={selectedAttraction.name}
            startingIndex={0}
          />
        )}
      </section>
    </>
  );
};

export default AttractionsSection;
