import { toBDT } from '../constants/tripData.js';

// Calculate per person cost in USD with GPStar discounts
export function perPersonCostUSD(option) {
  const { nights, breakdownUSD, gpstarOffers } = option;
  let flight = breakdownUSD.flight ?? 0;
  let hotel = (breakdownUSD.hotelPerNight ?? 0) * nights;
  const activities = breakdownUSD.activities ?? 0;
  const transport = breakdownUSD.transport ?? 0;

  if (gpstarOffers) {
    if (gpstarOffers.flightDiscountPct) flight *= (1 - gpstarOffers.flightDiscountPct / 100);
    if (gpstarOffers.hotelDiscountPct) hotel *= (1 - gpstarOffers.hotelDiscountPct / 100);
  }
  const subtotal = flight + hotel + activities + transport;
  return subtotal + subtotal * 0.05; // 5% contingency
}

// Calculate detailed breakdown in BDT with savings
export function breakdownBDT(option) {
  const { nights, breakdownUSD, gpstarOffers } = option;
  let flight = breakdownUSD.flight ?? 0;
  let hotel = (breakdownUSD.hotelPerNight ?? 0) * nights;
  let savingsFlight = 0, savingsHotel = 0;

  if (gpstarOffers) {
    if (gpstarOffers.flightDiscountPct && flight) {
      const after = flight * (1 - gpstarOffers.flightDiscountPct / 100);
      savingsFlight = flight - after;
      flight = after;
    }
    if (gpstarOffers.hotelDiscountPct && hotel) {
      const after = hotel * (1 - gpstarOffers.hotelDiscountPct / 100);
      savingsHotel = hotel - after;
      hotel = after;
    }
  }

  const activities = breakdownUSD.activities ?? 0;
  const transport = breakdownUSD.transport ?? 0;
  const subtotal = flight + hotel + activities + transport;
  const contingency = subtotal * 0.05;

  const toB = (v) => toBDT(v);
  return {
    flight: toB(flight),
    hotel: toB(hotel),
    activities: toB(activities),
    transport: toB(transport),
    contingency: toB(contingency),
    savingsFlight: toB(savingsFlight),
    savingsHotel: toB(savingsHotel),
    total: toB(subtotal + contingency),
  };
}

// Generate trip suggestions based on budget and people
export function generateTripSuggestions(budgetBDT, people, allOptions) {
  const totalBudget = parseInt(budgetBDT);
  const totalPeople = parseInt(people);
  
  if (!totalBudget || !totalPeople || totalBudget <= 0 || totalPeople <= 0) {
    return { error: 'Please enter a valid total budget (BDT) and number of people.', suggestions: [] };
  }
  
  const computed = allOptions.map((opt) => {
    const perUSD = perPersonCostUSD(opt);
    const perBDT = toBDT(perUSD);
    const groupBDT = perBDT * totalPeople;
    const parts = breakdownBDT(opt);
    return { ...opt, perBDT, groupBDT, parts };
  });
  
  const affordable = computed.filter((o) => o.groupBDT <= totalBudget);
  if (affordable.length === 0) {
    return { error: 'Budget too low for available options. Try increasing budget or reducing people.', suggestions: [] };
  }
  
  affordable.sort((a, b) => b.groupBDT - a.groupBDT);
  const intl = affordable.find((o) => o.type === 'International');
  let picks = [];
  
  if (intl) picks.push(intl);
  
  for (const o of affordable) {
    if (picks.length >= 3) break;
    if (intl && o.name === intl.name) continue;
    picks.push(o);
  }
  
  if (picks.length < 3) {
    const dayTrips = computed.filter(o => o.type === 'Day Trip' && o.groupBDT <= totalBudget);
    for (const d of dayTrips) {
      if (picks.length >= 3) break;
      if (!picks.some(p => p.name === d.name)) picks.push(d);
    }
  }
  
  return { error: '', suggestions: picks.slice(0, 3) };
}
