// Mock data for Himachal Homestay Website

import { formatDistance } from "date-fns";

export const homestayInfo = {
  name: "Himalayan Horizon Deohari",
  tagline: "Peaceful Homestay in the Mountains of Himachal.",
  description: "Peaceful stay in Deohari, Himachal with authentic culture and warm hosts near the Great Himalayan National Park.",
  location: "Sainj Valley, Himachal Pradesh",
  contact: {
    phone: "+91 8091313599",
    whatsapp: "+91 9999059585",
    address: " Village Deohari P.O. Banogi Tehsil Sainj, Himachal Pradesh 175134"
  }
};

export const cultureData = [
  {
    id: 1,
    title: "Traditional Architecture",
    description: "Our homestay features authentic Himachali architecture with wooden beams, stone walls, and sloping roofs designed to withstand heavy snowfall.",
    image: "https://images.unsplash.com/photo-1583037189850-1921ae7c6c22?w=600&h=400&fit=crop"
  },
  {
    id: 2,
    title: "Local Cuisine",
    description: "Savor traditional dishes like Siddu, Babru, Chana Madra, and Dham prepared with locally sourced ingredients and age-old recipes.",
    image: "https://images.unsplash.com/photo-1585937421612-70a008356fbe?w=600&h=400&fit=crop"
  },
  {
    id: 3,
    title: "Folk Arts & Crafts",
    description: "Experience local handicrafts including wool weaving, Chamba Rumals, and traditional metalwork. Participate in workshops during your stay.",
    image: "https://images.unsplash.com/photo-1610701596007-11502861dcfa?w=600&h=400&fit=crop"
  },
  {
    id: 4,
    title: "Festivals & Traditions",
    description: "Immerse yourself in local festivals like Losar, Fagli, and Kullu Dussehra. Learn about ancient customs and traditional celebrations.",
    image: "https://images.unsplash.com/photo-1609137144813-7d9921338f24?w=600&h=400&fit=crop"
  }
];

export const roomsData = [
  {
    id: 1,
    name: "Mountain View Room",
    capacity: "2 Guests",
    features: ["King Size Bed", "Mountain View", "Attached Bathroom", "Room Heater", "Bathroom Geyser"],
    description: "Spacious room with panoramic mountain views and modern interiors.",
    image: "/images/room_1.avif",
    gallery: [
      "/images/room_1.avif",
      "/images/room_2.avif",
      "/images/room_3.avif",
      "/images/room_4.avif",
      "/images/room_5.avif"
    ]
  },
  {
    id: 2,
    name: "Garden View Room",
    capacity: "2 Guests",
    features: ["King Size Bed", "Garden View", "Modern Bathroom", "Bathroom Shower", "Work Desk"],
    description: "Comfortable room overlooking garden area and mountains in the distance.",
    image: "/images/room_6.avif",
    gallery: [
      "/images/room_6.avif",
      "/images/room_7.avif",
      "/images/room_8.avif",
      "/images/room_9.avif",
      "/images/room_10.avif"
    ]
  }
];

export const travelInfo = {
  byAir: {
    title: "By Air",
    description: "Nearest airport is Bhuntar (Kullu-Manali Airport), 43 km away. Regular flights from Delhi. We can arrange pickup.",
    distance: "43 km from airport"
  },
  byRoad: {
    title: "By Road",
    description: "Well-connected by road from Delhi (453 km), Chandigarh (218 km), and Shimla (188 km). Regular HRTC buses and private taxis available.",
    routes: ["Delhi: 8-9 hours", "Chandigarh: 4-5 hours", "Shimla: 5-6 hours"],
    distance: undefined
  },
  byTrain: {
    title: "By Train",
    description: "Nearest railway station is Joginder Nagar (117 km). Major station at Chandigarh (224 km) with better connectivity.",
    distance: "125 km to nearest station"
  }
};

export const attractionsData = [
  {
    id: 1,
    name: "Pundrik Lake",
    distance: "2 km",
    description: "A short hike from our homestay, this lake is surrounded by Himalayan villages, forests, and serene mountain landscapes.",
    image: "/images/pundrik_cover.avif",
    gallery: [
      "/images/pundrik_1.avif",
      "/images/pundrik_2.avif",
      "/images/pundrik_3.avif",
      "/images/pundrik_4.avif",
      "/images/pundrik_5.avif"
    ]
  },
  {
    id: 2,
    name: "Sari kanda Trek",
    distance: "15-20 km",
    description: "It is a 20km easy one-day hike, offering camping, peaceful untouched trails, Himalayan views, and beautiful experiences.",
    image: "/images/sarikanda_cover.avif",
    gallery: [
      "/images/sarikanda_1.avif",
      "/images/sarikanda_2.avif",
      "/images/sarikanda_3.avif",
      "/images/sarikanda_4.avif",
      "/images/sarikanda_5.avif"
    ]
  },
  {
    id: 3,
    name: "Shangarh Meadow",
    distance: "25 km",
    description: "Shangarh features vast alpine grasslands, a famous Shiva temple, peaceful village charm, and breathtaking Himalayan views",
    image: "/images/shangarh_cover.avif",
    gallery: [
      "/images/shangarh_1.avif",
      "/images/shangarh_2.avif",
      "/images/shangarh_3.avif",
      "/images/shangarh_4.avif",
      "/images/shangarh_5.avif"
    ]
  },
  {
    id: 4,
    name: "Jibhi",
    distance: "50 km",
    description: "Jibhi offers waterfalls, riverside stays, pine forests, offbeat cafés, scenic hikes, and peaceful Himalayan village vibes near Tirthan Valley.",
    image: "/images/jibhi_cover.avif",
    gallery: [
      "/images/jibhi_1.avif",
      "/images/jibhi_2.avif",
      "/images/jibhi_3.avif",
      "/images/jibhi_4.avif",
      "/images/jibhi_5.avif"
    ]
  },
  {
    id: 5,
    name: "Kasol",
    distance: "75 km",
    description: "Beautiful Parvati Valley views, riverside cafés, trekking, backpacker vibes, Israeli food, scenic trails, and vibrant Himalayan culture.",
    image: "/images/kasol_cover.avif",
    gallery: [
      "/images/kasol_1.avif",
      "/images/kasol_2.avif",
      "/images/kasol_3.avif",
      "/images/kasol_4.avif",
      "/images/kasol_5.avif"
    ]
  },
  {
    id: 6,
    name: "Manali",
    distance: "95 km",
    description: "Manali showcases snow-capped mountains, adventure sports in Solang Valley, Rohtang Pass, cafés, temples, and lively tourist experiences.",
    image: "/images/manali_cover.avif",
    gallery: [
      "/images/manali_1.avif",
      "/images/manali_2.avif",
      "/images/manali_3.avif",
      "/images/manali_4.avif",
      "/images/manali_5.avif"
    ]
  }
];

export const galleryImages = [
  {
    id: 1,
    coverUrl: "/images/property_1_cover.avif",  // Small cover for grid
    fullUrl: "/images/property_1.avif",   // Large for modal
    title: "Homestay Exterior",
    category: "property"
  },
  {
    id: 2,
    coverUrl: "/images/room_1_cover.avif",
    fullUrl: "/images/room_1.avif",
    title: "Mountain View Room",
    category: "rooms"
  },
  {
    id: 3,
    coverUrl: "/images/view_1_cover.avif",
    fullUrl: "/images/view_1.avif",
    title: "Valley Views",
    category: "views"
  },
  {
    id: 4,
    coverUrl: "/images/property_2_cover.avif",
    fullUrl: "/images/property_2.avif",
    title: "Homestay Exterior",
    category: "property"
  },
  {
    id: 5,
    coverUrl: "/images/room_2_cover.avif",
    fullUrl: "/images/room_2.avif",
    title: "Cozy Interior",
    category: "rooms"
  },
  {
    id: 6,
    coverUrl: "/images/property_3_cover.avif",
    fullUrl: "/images/property_3.avif",
    title: "Homestay Exterior",
    category: "property"
  },
  {
    id: 7,
    coverUrl: "/images/view_2_cover.avif",
    fullUrl: "/images/view_2.avif",
    title: "Mountain Views",
    category: "views"
  },
  {
    id: 8,
    coverUrl: "/images/room_11_cover.avif",
    fullUrl: "/images/room_11.avif",
    title: "Kitchen",
    category: "rooms"
  }
];

export const testimonials = [
  {
    id: 1,
    name: "Priya Sharma",
    location: "Delhi",
    rating: 5,
    text: "An absolutely wonderful experience! The hospitality was exceptional and the views were breathtaking. Felt like home away from home."
  },
  {
    id: 2,
    name: "Rajesh Kumar",
    location: "Bangalore",
    rating: 5,
    text: "Perfect getaway from city life. The local food was delicious and the hosts were incredibly welcoming. Highly recommended!"
  },
  {
    id: 3,
    name: "Sarah Johnson",
    location: "USA",
    rating: 5,
    text: "Authentic Himachali experience! Loved learning about the local culture and traditions. The homestay was clean, comfortable, and peaceful."
  }
];