// Calculate per person cost in BDT with GPStar discounts
export function perPersonCostBDT(option) {
  const { nights, breakdownBDT, gpstarOffers } = option;
  let flight = breakdownBDT.flight ?? 0;
  let hotel = (breakdownBDT.hotelPerNight ?? 0) * nights;
  const activities = breakdownBDT.activities ?? 0;
  const transport = breakdownBDT.transport ?? 0;

  if (gpstarOffers) {
    if (gpstarOffers.flightDiscountPct)
      flight *= 1 - gpstarOffers.flightDiscountPct / 100;
    if (gpstarOffers.hotelDiscountPct)
      hotel *= 1 - gpstarOffers.hotelDiscountPct / 100;
  }
  const subtotal = flight + hotel + activities + transport;
  return subtotal + subtotal * 0.05; // 5% contingency
}

// Calculate detailed breakdown in BDT with savings
export function breakdownBDT(option) {
  const { nights, breakdownBDT, gpstarOffers } = option;
  let flight = breakdownBDT.flight ?? 0;
  let hotel = (breakdownBDT.hotelPerNight ?? 0) * nights;
  let savingsFlight = 0,
    savingsHotel = 0;

  if (gpstarOffers) {
    if (gpstarOffers.flightDiscountPct && flight) {
      const after = flight * (1 - gpstarOffers.flightDiscountPct / 100);
      savingsFlight = flight - after;
      flight = after;
    }
    if (gpstarOffers.hotelDiscountPct && hotel) {
      const after = hotel * (1 - gpstarOffers.hotelDiscountPct / 100);
      hotel = after;
    }
  }

  const activities = breakdownBDT.activities ?? 0;
  const transport = breakdownBDT.transport ?? 0;
  const subtotal = flight + hotel + activities + transport;
  const contingency = subtotal * 0.05;

  return {
    flight: flight,
    hotel: hotel,
    activities: activities,
    transport: transport,
    contingency: contingency,
    savingsFlight: savingsFlight,
    savingsHotel: savingsHotel,
    total: subtotal + contingency,
  };
}

// Generate trip suggestions based on budget and people
export function generateTripSuggestions(budgetBDT, people, allOptions) {
  const totalBudget = parseInt(budgetBDT);
  const totalPeople = parseInt(people);

  if (!totalBudget || !totalPeople || totalBudget <= 0 || totalPeople <= 0) {
    return {
      error: "Please enter a valid total budget (BDT) and number of people.",
      suggestions: [],
    };
  }

  const computed = allOptions.map((opt) => {
    const perBDT = perPersonCostBDT(opt);
    const groupBDT = perBDT * totalPeople;
    const parts = breakdownBDT(opt);
    return { ...opt, perBDT, groupBDT, parts };
  });

  // Smart filtering based on budget thresholds
  let filteredOptions = computed;

  // Internatinal, Domestic, Day Tour

  let sortbytriptype = filteredOptions.sort((a, b) => {
    if (a.type === "International") return -1;
    if (a.type === "Domestic") return 0;
    if (a.type === "Day Tour") return 1;
  });

  // // Sort by cost (highest first for better budget utilization)
  // filteredOptions.sort((a, b) => b.groupBDT - a.groupBDT);

  // Ensure we have exactly 3 options
  if (sortbytriptype.length < 3) {
    return {
      error: `Only ${filteredOptions.length} affordable options found. Try increasing budget or reducing people.`,
      suggestions: filteredOptions,
    };
  }

  // Select top 3 options
  const picks = sortbytriptype;

  return { error: "", suggestions: picks };
}
