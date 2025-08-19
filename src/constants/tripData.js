// Exchange rate constant
export const USD_TO_BDT = 125;

// Utility functions
export const toBDT = (usd) => Math.round(usd * USD_TO_BDT);
export const fmtBDT = (bdt) => `৳${bdt.toLocaleString('en-BD')}`;

// Trip catalog data with GPStar SKUs/perks embedded
export const ALL_TRIP_OPTIONS = [
  {
    type: 'Domestic',
    name: "Cox's Bazar",
    nights: 3,
    breakdownUSD: { flight: 0, transport: 25, hotelPerNight: 35, activities: 30 },
    stay: '3★ beachside hotel',
    highlights: ['Beach sunset', 'Marine Drive', 'Seafood dinner'],
    itinerary: [ 'Day 1: Arrive, Laboni Beach & sunset', 'Day 2: Inani–Himchari, Marine Drive', 'Day 3: Local markets & depart' ],
    gpstarOffers: { flightDiscountPct: 0, hotelDiscountPct: 10, extras: ['GPStar-HOTEL10', 'GPStar-RESTAURANT1+1'] },
  },
  {
    type: 'Domestic',
    name: 'Sreemangal',
    nights: 2,
    breakdownUSD: { flight: 0, transport: 20, hotelPerNight: 30, activities: 25 },
    stay: 'Eco resort',
    highlights: ['Tea gardens', 'Lawachara forest'],
    itinerary: [ 'Day 1: Travel & tea garden walk', 'Day 2: Lawachara safari & seven-layer tea' ],
    gpstarOffers: { flightDiscountPct: 0, hotelDiscountPct: 12, extras: ['GPStar-SPA15'] },
  },
  {
    type: 'International',
    name: 'Bangkok, Thailand',
    nights: 4,
    breakdownUSD: { flight: 250, transport: 40, hotelPerNight: 45, activities: 70 },
    stay: '4★ city hotel',
    highlights: ['Street food', 'Grand Palace'],
    itinerary: [ 'Day 1: Chinatown food tour', 'Day 2: Grand Palace', 'Day 3: Floating market', 'Day 4: Shopping & depart' ],
    gpstarOffers: { flightDiscountPct: 8, hotelDiscountPct: 12, extras: ['GPStar-LOUNGE', 'GPStar-FLIGHT8'] },
  },
  {
    type: 'International',
    name: 'Bali, Indonesia',
    nights: 5,
    breakdownUSD: { flight: 450, transport: 60, hotelPerNight: 55, activities: 100 },
    stay: '4★ resort',
    highlights: ['Temple tours', 'Beaches'],
    itinerary: [ 'Day 1: Tanah Lot sunset', 'Day 2: Ubud temples', 'Day 3: Nusa Dua beach', 'Day 4: Waterfalls & market', 'Day 5: Spa & depart' ],
    gpstarOffers: { flightDiscountPct: 10, hotelDiscountPct: 12, extras: ['GPStar-AIRPORTPICK', 'GPStar-FLIGHT10'] },
  },
  {
    type: 'Day Trip',
    name: 'Sonargaon & Panam City',
    nights: 0,
    breakdownUSD: { flight: 0, transport: 15, hotelPerNight: 0, activities: 20 },
    stay: 'No stay — day trip',
    highlights: ['Heritage sites', 'Museum'],
    itinerary: [ 'Morning: Travel to Sonargaon', 'Noon: Museum & Panam City walk', 'Evening: Return to Dhaka' ],
    gpstarOffers: { flightDiscountPct: 0, hotelDiscountPct: 0, extras: ['GPStar-CAFE20'] },
  },
];

// Trip type colors for UI
export const TRIP_TYPE_COLORS = {
  'International': 'bg-gradient-to-r from-purple-500 to-pink-500 text-white',
  'Day Trip': 'bg-gradient-to-r from-yellow-500 to-orange-500 text-white',
  'Domestic': 'bg-gradient-to-r from-emerald-500 to-teal-500 text-white',
};
