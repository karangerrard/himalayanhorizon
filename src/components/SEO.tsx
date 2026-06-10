import { useEffect } from 'react';

// ─── SEO Component ─────────────────────────────────────────────────────────────
// Injects all meta tags, Open Graph, Twitter Cards, and JSON-LD structured data
// directly into document.head at runtime.
// Usage: <SEO /> once in your App.tsx or index.tsx — renders nothing visible.
// ───────────────────────────────────────────────────────────────────────────────

const SITE_URL = 'https://himalayanhorizondeohari.in'; // ← replace with your actual domain
const SITE_NAME = 'Himalayan Horizon Deohari';
const PHONE = '+91-8091313599'; // ← replace with your actual WhatsApp/phone number
const WHATSAPP = '919999059585'; // ← replace (country code + number, no +)

const SEO = () => {
  useEffect(() => {
    // ── 1. Page Title ──────────────────────────────────────────────────────
    document.title =
      'Himalayan Horizon Deohari | Best Homestay in Sainj Valley, Himachal Pradesh';

    // ── Helper: set or create a <meta> tag ─────────────────────────────────
    const setMeta = (attrs: Record<string, string>) => {
      const key = Object.keys(attrs).find((k) => k !== 'content') || 'name';
      const val = attrs[key];
      let el = document.querySelector(`meta[${key}="${val}"]`) as HTMLMetaElement;
      if (!el) {
        el = document.createElement('meta');
        document.head.appendChild(el);
      }
      Object.entries(attrs).forEach(([k, v]) => el.setAttribute(k, v));
    };

    // ── Helper: set or create a <link> tag ────────────────────────────────
    const setLink = (attrs: Record<string, string>) => {
      const key = 'rel';
      const val = attrs[key];
      let el = document.querySelector(`link[rel="${val}"]`) as HTMLLinkElement;
      if (!el) {
        el = document.createElement('link');
        document.head.appendChild(el);
      }
      Object.entries(attrs).forEach(([k, v]) => el.setAttribute(k, v));
    };

    // ── Helper: inject JSON-LD script ──────────────────────────────────────
    const setJsonLd = (id: string, data: object) => {
      let el = document.getElementById(id) as HTMLScriptElement;
      if (!el) {
        el = document.createElement('script');
        el.id = id;
        el.type = 'application/ld+json';
        document.head.appendChild(el);
      }
      el.textContent = JSON.stringify(data, null, 2);
    };

    // ── 2. Core Meta Tags ──────────────────────────────────────────────────
    setMeta({
      name: 'description',
      content:
        'Book the best homestay in Sainj Valley, Himachal Pradesh. Himalayan Horizon Deohari offers private rooms, home-cooked Himachali meals, trekking guides & peaceful mountain views near Great Himalayan National Park.',
    });
    setMeta({ name: 'keywords', content: 'Sainj Valley homestay, Deohari homestay, homestay in Sainj, best homestay Sainj Valley, Himachal Pradesh homestay, Great Himalayan National Park stay, village homestay Himachal, workation Sainj Valley, Deohari village stay, Shangarh homestay' });
    setMeta({ name: 'author', content: SITE_NAME });
    setMeta({ name: 'robots', content: 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1' });
    setMeta({ name: 'googlebot', content: 'index, follow' });
    setMeta({ name: 'theme-color', content: '#003631' });
    setMeta({ name: 'geo.region', content: 'IN-HP' });
    setMeta({ name: 'geo.placename', content: 'Deohari, Sainj Valley, Kullu, Himachal Pradesh' });
    setMeta({ name: 'geo.position', content: '31.763302160574742, 77.32807894700265' }); // ← replace with exact GPS coords
    setMeta({ name: 'ICBM', content: '31.763302160574742, 77.32807894700265' }); // ← replace with exact GPS coords

    // ── 3. Canonical URL ───────────────────────────────────────────────────
    setLink({ rel: 'canonical', href: SITE_URL });

    // ── 4. Open Graph (Facebook, WhatsApp previews) ───────────────────────
    setMeta({ property: 'og:type', content: 'website' });
    setMeta({ property: 'og:site_name', content: SITE_NAME });
    setMeta({ property: 'og:title', content: 'Himalayan Horizon Deohari | Homestay in Sainj Valley, Himachal Pradesh' });
    setMeta({ property: 'og:description', content: 'Experience authentic mountain living at Himalayan Horizon — a family-run homestay in Deohari village, Sainj Valley. Private rooms, home-cooked meals & expert trekking guides near Great Himalayan National Park.' });
    setMeta({ property: 'og:url', content: SITE_URL });
    setMeta({ property: 'og:image', content: `${SITE_URL}/images/desktop_hero.avif` });
    setMeta({ property: 'og:image:width', content: '1200' });
    setMeta({ property: 'og:image:height', content: '630' });
    setMeta({ property: 'og:image:alt', content: 'Himalayan Horizon Deohari — Peaceful homestay with mountain views in Sainj Valley, Himachal Pradesh' });
    setMeta({ property: 'og:locale', content: 'en_IN' });

    // ── 5. Twitter / X Cards ───────────────────────────────────────────────
    setMeta({ name: 'twitter:card', content: 'summary_large_image' });
    setMeta({ name: 'twitter:title', content: 'Himalayan Horizon Deohari | Homestay in Sainj Valley' });
    setMeta({ name: 'twitter:description', content: 'Peaceful mountain homestay in Deohari village, Sainj Valley. Home-cooked meals, trekking guides, private rooms near GHNP.' });
    setMeta({ name: 'twitter:image', content: `${SITE_URL}/images/desktop_hero.avif` });
    setMeta({ name: 'twitter:image:alt', content: 'Mountain view from Himalayan Horizon Deohari homestay, Sainj Valley' });

    // ── 6. Preconnect / Resource Hints ────────────────────────────────────
    // These go in index.html ideally but setting here as fallback
    const preconnects = [
      'https://fonts.googleapis.com',
      'https://fonts.gstatic.com',
    ];
    preconnects.forEach((href) => {
      if (!document.querySelector(`link[href="${href}"]`)) {
        const el = document.createElement('link');
        el.rel = 'preconnect';
        el.href = href;
        if (href.includes('gstatic')) el.crossOrigin = 'anonymous';
        document.head.appendChild(el);
      }
    });

    // ═══════════════════════════════════════════════════════════════════════
    // 7. STRUCTURED DATA — JSON-LD
    // ═══════════════════════════════════════════════════════════════════════

    // ── 7a. LodgingBusiness + LocalBusiness (PRIMARY — most important) ────
    setJsonLd('ld-lodging', {
      '@context': 'https://schema.org',
      '@type': ['LodgingBusiness', 'LocalBusiness', 'TouristAccommodation'],
      '@id': `${SITE_URL}/#lodging`,
      name: 'Himalayan Horizon Deohari',
      alternateName: [
        'Himalayan Horizon',
        'Deohari Homestay',
        'Sainj Valley Homestay',
      ],
      description:
        'Family-run mountain homestay in Deohari village, Sainj Valley, Kullu District, Himachal Pradesh. Offering private rooms, home-cooked Himachali meals, trekking guides, and camping gear. Ideal base for Great Himalayan National Park treks and offbeat Himachal travel.',
      url: SITE_URL,
      telephone: PHONE,
      address: {
        '@type': 'PostalAddress',
        streetAddress: 'Deohari Village',
        addressLocality: 'Sainj Valley',
        addressRegion: 'Himachal Pradesh',
        addressCountry: 'IN',
        postalCode: '175045', // ← verify and replace with exact pincode
      },
      geo: {
        '@type': 'GeoCoordinates',
        latitude: '31.763302160574742',  // ← replace with exact GPS lat
        longitude: '77.32807894700265', // ← replace with exact GPS lng
      },
      hasMap: `https://maps.google.com/?q=Deohari+Village+Sainj+Valley+Himachal+Pradesh`,
      image: [
        `${SITE_URL}/images/desktop_hero.avif`,
      ],
      logo: `${SITE_URL}/images/logo.png`, // ← add if you have a logo image
      priceRange: '₹',
      currenciesAccepted: 'INR',
      paymentAccepted: 'Cash, UPI, Bank Transfer',
      openingHours: 'Mo-Su 00:00-23:59',
      checkinTime: '12:00',
      checkoutTime: '11:00',
      numberOfRooms: 4,
      amenityFeature: [
        { '@type': 'LocationFeatureSpecification', name: 'Free Wi-Fi', value: true },
        { '@type': 'LocationFeatureSpecification', name: 'Home-cooked meals', value: true },
        { '@type': 'LocationFeatureSpecification', name: 'Trekking guide', value: true },
        { '@type': 'LocationFeatureSpecification', name: 'Camping tents', value: true },
        { '@type': 'LocationFeatureSpecification', name: 'Heated water', value: true },
        { '@type': 'LocationFeatureSpecification', name: 'Attached bathrooms', value: true },
        { '@type': 'LocationFeatureSpecification', name: 'Fully equipped kitchen', value: true },
        { '@type': 'LocationFeatureSpecification', name: 'Front lawn', value: true },
        { '@type': 'LocationFeatureSpecification', name: 'Mountain view', value: true },
        { '@type': 'LocationFeatureSpecification', name: 'Heating', value: true },
      ],
      containsPlace: [
        {
          '@type': 'HotelRoom',
          name: 'Private Room',
          description: 'Cozy private room with attached bathroom, mountain views, and heating',
          numberOfRooms: 4,
          occupancy: { '@type': 'QuantitativeValue', maxValue: 8 },
        },
      ],
      nearbyAttractions: [
        { '@type': 'TouristAttraction', name: 'Great Himalayan National Park' },
        { '@type': 'TouristAttraction', name: 'Shangarh Meadow' },
        { '@type': 'TouristAttraction', name: 'Sainj Valley' },
        { '@type': 'TouristAttraction', name: 'Tirthan Valley' },
      ],
      keywords:
        'Sainj Valley homestay, Deohari homestay, homestay near GHNP, village stay Himachal, budget trek homestay Sainj',
      sameAs: [
        `https://wa.me/${WHATSAPP}`,
        // Add your social/listing URLs here:
        // 'https://www.airbnb.co.in/rooms/XXXXXXX',
        // 'https://www.instagram.com/himalayanhorizondeohari',
        // 'https://g.page/himalayan-horizon-deohari',
      ],
    });

    // ── 7b. WebSite Schema ────────────────────────────────────────────────
    setJsonLd('ld-website', {
      '@context': 'https://schema.org',
      '@type': 'WebSite',
      '@id': `${SITE_URL}/#website`,
      name: 'Himalayan Horizon Deohari',
      url: SITE_URL,
      description: 'Official website of Himalayan Horizon Deohari — a premium homestay in Sainj Valley, Himachal Pradesh.',
      inLanguage: 'en-IN',
      potentialAction: {
        '@type': 'SearchAction',
        target: { '@type': 'EntryPoint', urlTemplate: `${SITE_URL}/?q={search_term_string}` },
        'query-input': 'required name=search_term_string',
      },
    });

    // ── 7c. Organization Schema ───────────────────────────────────────────
    setJsonLd('ld-org', {
      '@context': 'https://schema.org',
      '@type': 'Organization',
      '@id': `${SITE_URL}/#organization`,
      name: 'Himalayan Horizon Deohari',
      url: SITE_URL,
      logo: `${SITE_URL}/images/logo.png`,
      telephone: PHONE,
      address: {
        '@type': 'PostalAddress',
        addressLocality: 'Deohari, Sainj Valley',
        addressRegion: 'Himachal Pradesh',
        addressCountry: 'IN',
      },
      contactPoint: [
        {
            '@type': 'ContactPoint',
            telephone: PHONE,
            contactType: 'reservations',
            availableLanguage: ['English', 'Hindi'],
        },
        {
            '@type': 'ContactPoint',
            // WhatsApp deep link — Google indexes this as a contact channel
            url: `https://wa.me/${WHATSAPP}?text=Hi%2C%20I%20want%20to%20book%20a%20stay%20at%20Himalayan%20Horizon%20Deohari`,
            contactType: 'reservations',
            name: 'WhatsApp Booking',
            availableLanguage: ['English', 'Hindi'],
        },
    ],
      
    });

    // ── 7d. FAQPage Schema ────────────────────────────────────────────────
    // These FAQs target exact user search queries — Google shows them as
    // rich results directly in search, improving CTR significantly.
    setJsonLd('ld-faq', {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: [
        {
          '@type': 'Question',
          name: 'Where is Himalayan Horizon Deohari located?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Himalayan Horizon Deohari is located in Deohari village, Sainj Valley, Kullu District, Himachal Pradesh, India very close to the Great Himalayan National Park (UNESCO World Heritage Site).',
          },
        },
        {
          '@type': 'Question',
          name: 'What types of rooms are available at Himalayan Horizon Deohari?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'We offer 4 private rooms with attached bathrooms. Private rooms are ideal for couples, solo travelers and families.',
          },
        },
        {
          '@type': 'Question',
          name: 'Is food available at the homestay?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Yes, we serve fresh home cooked Himachali meals using local ingredients. A fully equipped shared kitchen is also available for guests who prefer to cook.',
          },
        },
        {
          '@type': 'Question',
          name: 'How do I reach Deohari village in Sainj Valley?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'The nearest town is Aut (on NH 3). From Aut, take the Sainj Valley road towards Larji, then from Deohari bypass proceed to Deohari village. The journey from Aut to Deohari takes approximately 1.5–2 hours by road.',
          },
        },
        {
          '@type': 'Question',
          name: 'Are trekking guides available at Himalayan Horizon Deohari?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Yes, we provide experienced local trekking guides and camping tents for treks in Sainj Valley and the Great Himalayan National Park region.',
          },
        },
        {
          '@type': 'Question',
          name: 'Is Wi-Fi available at the homestay?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Yes, free Wi-Fi is available. Himalayan Horizon Deohari is also suitable for remote workers and workationers looking for a peaceful mountain workspace in Himachal Pradesh.',
          },
        },
        {
          '@type': 'Question',
          name: 'How to book a stay at Himalayan Horizon Deohari?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: `You can book directly through our website contact form, or reach us on WhatsApp at https://wa.me/${WHATSAPP} for instant confirmation.`,
          },
        },
      ],
    });

    // ── 7e. BreadcrumbList Schema ─────────────────────────────────────────
    setJsonLd('ld-breadcrumb', {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: SITE_URL },
        { '@type': 'ListItem', position: 2, name: 'Rooms', item: `${SITE_URL}/#rooms` },
        { '@type': 'ListItem', position: 3, name: 'Gallery', item: `${SITE_URL}/#gallery` },
        { '@type': 'ListItem', position: 4, name: 'Contact', item: `${SITE_URL}/#contact` },
      ],
    });

  }, []); // runs once on mount

  return null; // renders nothing
};

export default SEO;
