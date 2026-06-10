import React, { useState, useEffect, useCallback } from 'react';

const WHATSAPP_NUMBER = '919999059585';
const PREFILLED_MESSAGE =
  'Hello! I would like to know more about staying at Himalayan Horizon Deohari. Please share availability and rates.';

const buildEncodedMessage = () => encodeURIComponent(PREFILLED_MESSAGE);

const getIsMobile = (): boolean => {
  if (typeof window === 'undefined') return false;
  return (
    /Android|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ||
    window.matchMedia('(pointer: coarse)').matches
  );
};

const WhatsAppIcon: React.FC<{ size?: number }> = ({ size = 28 }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="currentColor"
    aria-hidden="true"
    style={{ flexShrink: 0, display: 'block' }}
  >
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
  </svg>
);

const WhatsAppButton: React.FC = () => {
  const [mounted,        setMounted]        = useState(false);
  const [visible,        setVisible]        = useState(false);
  const [isHovered,      setIsHovered]      = useState(false);
  const [isPressed,      setIsPressed]      = useState(false);
  const [isMobile,       setIsMobile]       = useState(false);
  const [prefersReduced, setPrefersReduced] = useState(false);

  useEffect(() => {
    setIsMobile(getIsMobile());
    setPrefersReduced(window.matchMedia('(prefers-reduced-motion: reduce)').matches);
    setMounted(true);
    const t = setTimeout(() => setVisible(true), 1200);
    return () => clearTimeout(t);
  }, []);

  // Hide when user focuses a form input so it never covers the contact form
  useEffect(() => {
    if (!mounted) return;
    const inputs = document.querySelectorAll('input, textarea');
    const hide = () => setVisible(false);
    const show = () => setVisible(true);
    inputs.forEach(el => { el.addEventListener('focus', hide); el.addEventListener('blur', show); });
    return () => {
      inputs.forEach(el => { el.removeEventListener('focus', hide); el.removeEventListener('blur', show); });
    };
  }, [mounted]);

  const handleClick = useCallback((e: React.MouseEvent<HTMLAnchorElement>) => {
    if (isMobile) {
      // Attempt native app first via hidden iframe — no page navigation
      const iframe = document.createElement('iframe');
      iframe.style.display = 'none';
      iframe.src = `whatsapp://send?phone=${WHATSAPP_NUMBER}&text=${buildEncodedMessage()}`;
      document.body.appendChild(iframe);
      setTimeout(() => { try { document.body.removeChild(iframe); } catch (_) {} }, 1500);
      // href fallback (wa.me) fires regardless — covers "app not installed" case
    }
  }, [isMobile]);

  const ease = 'cubic-bezier(0.16, 1, 0.3, 1)';

  const transform = (() => {
    if (prefersReduced) return 'none';
    if (!visible)    return 'translateY(80px) scale(1)';
    if (isPressed)   return 'translateY(0px) scale(0.90)';
    if (isHovered)   return 'translateY(-4px) scale(1.08)';
    return 'translateY(0px) scale(1)';
  })();

  if (!mounted) return null;

  return (
    <a
      href={`https://wa.me/${WHATSAPP_NUMBER}?text=${buildEncodedMessage()}`}
      target="_blank"
      rel="noopener noreferrer"
      onClick={handleClick}
      aria-label="Chat with us on WhatsApp to book your stay at Himalayan Horizon Deohari"
      role="link"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => { setIsHovered(false); setIsPressed(false); }}
      onMouseDown={() => setIsPressed(true)}
      onMouseUp={() => setIsPressed(false)}
      onFocus={() => setIsHovered(true)}
      onBlur={() => { setIsHovered(false); setIsPressed(false); }}
      onTouchStart={() => setIsPressed(true)}
      onTouchEnd={() => setTimeout(() => setIsPressed(false), 150)}
      style={{
        // Position — safe-area-inset-bottom handles iPhone home indicator
        position:   'fixed',
        bottom:     'calc(clamp(1.25rem, 4vw, 2rem) + env(safe-area-inset-bottom, 0px))',
        right:      'clamp(1rem, 4vw, 1.75rem)',
        zIndex:     9999,

        // Shape — perfect circle, 60px for comfortable thumb tap (WCAG 44px min)
        width:      '60px',
        height:     '60px',
        borderRadius: '50%',
        display:    'flex',
        alignItems: 'center',
        justifyContent: 'center',

        // Official WhatsApp brand colors
        background: '#25D366',
        color:      '#FFFFFF',
        border:     'none',
        textDecoration: 'none',
        cursor:     'pointer',

        // Layered shadow — tight contact shadow + wide ambient glow
        boxShadow: isHovered
          ? '0 2px 8px rgba(0,0,0,0.18), 0 8px 32px rgba(37,211,102,0.55)'
          : '0 2px 6px rgba(0,0,0,0.14), 0 4px 20px rgba(37,211,102,0.40)',

        // GPU-only animation (transform + opacity)
        transform,
        opacity:    visible ? 1 : 0,
        transition: prefersReduced ? 'none' : [
          `transform 400ms ${ease}`,
          `opacity 350ms ${ease}`,
          `box-shadow 250ms ${ease}`,
        ].join(', '),

        WebkitTapHighlightColor: 'transparent',
        outline: 'none',
      }}
    >
      <WhatsAppIcon size={28} />
    </a>
  );
};

export default WhatsAppButton;
