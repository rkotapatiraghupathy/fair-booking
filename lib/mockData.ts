import type { CarHireResult, HotelResult, FlightResult, SearchParams } from "./types";

// Transparency scoring logic — this is RentalTruth's IP applied to search results
function scoreCarHire(provider: string, pricePerDay: number): {
  score: number;
  flags: Array<{ severity: "green" | "amber" | "red"; label: string }>;
  topWarning: string | null;
  estimatedExtra: number;
} {
  const profiles: Record<string, {
    score: number;
    flags: Array<{ severity: "green" | "amber" | "red"; label: string }>;
    topWarning: string | null;
    estimatedExtra: number;
  }> = {
    "Alamo": {
      score: 31,
      flags: [
        { severity: "red", label: "✈️ Flight arrival required" },
        { severity: "red", label: "💳 Credit card only" },
        { severity: "red", label: "💰 £1,200 deposit hold" },
        { severity: "amber", label: "🚗 150 mile/day limit" },
      ],
      topWarning: "Airport-only rate — must show boarding pass at desk",
      estimatedExtra: 45,
    },
    "Hertz": {
      score: 55,
      flags: [
        { severity: "red", label: "💳 Credit card only" },
        { severity: "amber", label: "💰 £800 deposit hold" },
        { severity: "amber", label: "🧑 Young driver surcharge" },
        { severity: "green", label: "🌍 Cross-border allowed" },
      ],
      topWarning: "Credit card required — debit cards not accepted",
      estimatedExtra: 25,
    },
    "Enterprise": {
      score: 68,
      flags: [
        { severity: "amber", label: "💰 £500 deposit hold" },
        { severity: "amber", label: "🚗 200 mile/day limit" },
        { severity: "green", label: "💳 Debit card accepted" },
        { severity: "green", label: "🌍 Cross-border allowed" },
      ],
      topWarning: "Mileage limit applies — check your daily needs",
      estimatedExtra: 15,
    },
    "Europcar": {
      score: 72,
      flags: [
        { severity: "amber", label: "💰 £600 deposit hold" },
        { severity: "green", label: "💳 Debit card accepted" },
        { severity: "green", label: "⛽ Full-to-full fuel policy" },
        { severity: "green", label: "🌍 Cross-border allowed" },
      ],
      topWarning: null,
      estimatedExtra: 10,
    },
    "Avis": {
      score: 61,
      flags: [
        { severity: "red", label: "💳 Credit card only" },
        { severity: "amber", label: "💰 £750 deposit hold" },
        { severity: "green", label: "🌍 Cross-border allowed" },
        { severity: "green", label: "⛽ Full-to-full fuel policy" },
      ],
      topWarning: "Credit card required with sufficient available credit",
      estimatedExtra: 20,
    },
    "Budget": {
      score: 48,
      flags: [
        { severity: "red", label: "💳 Credit card only" },
        { severity: "red", label: "💰 £1,000 deposit hold" },
        { severity: "amber", label: "🚗 150 mile/day limit" },
        { severity: "amber", label: "🧑 Young driver surcharge" },
      ],
      topWarning: "Large deposit hold may affect card limit",
      estimatedExtra: 35,
    },
    "Sixt": {
      score: 82,
      flags: [
        { severity: "green", label: "💳 Debit card accepted" },
        { severity: "green", label: "🌍 Cross-border allowed" },
        { severity: "amber", label: "💰 £400 deposit hold" },
        { severity: "green", label: "⛽ Full-to-full fuel policy" },
      ],
      topWarning: null,
      estimatedExtra: 8,
    },
    "National": {
      score: 75,
      flags: [
        { severity: "green", label: "💳 Debit card accepted" },
        { severity: "amber", label: "💰 £500 deposit hold" },
        { severity: "green", label: "🌍 Cross-border allowed" },
        { severity: "green", label: "🚗 Unlimited mileage" },
      ],
      topWarning: null,
      estimatedExtra: 5,
    },
  };
  return profiles[provider] || {
    score: 60,
    flags: [{ severity: "amber", label: "⚠️ Terms not fully analysed" }],
    topWarning: "Please review terms carefully before booking",
    estimatedExtra: 20,
  };
}

function getTransparencyLevel(score: number) {
  if (score >= 80) return "EXCELLENT";
  if (score >= 65) return "GOOD";
  if (score >= 50) return "FAIR";
  return "POOR";
}

export function generateCarHireResults(params: SearchParams): CarHireResult[] {
  const providers = ["Sixt", "National", "Europcar", "Enterprise", "Avis", "Hertz", "Budget", "Alamo"];
  const vehicles = [
    { name: "Ford Fiesta or similar", category: "Economy" },
    { name: "Volkswagen Golf or similar", category: "Compact" },
    { name: "Toyota Corolla or similar", category: "Intermediate" },
    { name: "Ford Focus or similar", category: "Compact" },
    { name: "Vauxhall Astra or similar", category: "Compact" },
    { name: "BMW 1 Series or similar", category: "Premium" },
    { name: "Nissan Juke or similar", category: "SUV" },
    { name: "Mercedes A-Class or similar", category: "Luxury" },
  ];

  const pickupDate = params.pickupDate || "2026-07-01";
  const returnDate = params.returnDate || "2026-07-08";
  const days = Math.max(1, Math.round((new Date(returnDate).getTime() - new Date(pickupDate).getTime()) / (1000 * 60 * 60 * 24)));

  return providers.map((provider, i) => {
    const vehicle = vehicles[i];
    const basePricePerDay = 15 + Math.floor(Math.random() * 45) + (i * 3);
    const scoring = scoreCarHire(provider, basePricePerDay);
    const totalPrice = basePricePerDay * days;
    const estimatedTrueCost = totalPrice + scoring.estimatedExtra;

    return {
      id: `car-${provider.toLowerCase()}-${i}`,
      type: "carhire" as const,
      provider,
      vehicle: vehicle.name,
      category: vehicle.category,
      pickupLocation: params.from || "Liverpool Airport",
      dropoffLocation: params.to || params.from || "Liverpool Airport",
      pickupDate,
      dropoffDate: returnDate,
      days,
      pricePerDay: basePricePerDay,
      totalPrice,
      estimatedTrueCost,
      transparencyScore: scoring.score,
      transparencyLevel: getTransparencyLevel(scoring.score) as import("./types").TransparencyLevel,
      flags: scoring.flags,
      topWarning: scoring.topWarning,
      affiliateUrl: `https://www.rentalcars.com/?affiliateCode=rentaltruth&provider=${provider}`,
      features: ["Free cancellation", "Unlimited mileage", "Collision damage waiver"].slice(0, 2 + (scoring.score > 70 ? 1 : 0)),
    };
  }).sort((a, b) => b.transparencyScore - a.transparencyScore);
}

export function generateHotelResults(params: SearchParams): HotelResult[] {
  const hotels = [
    { name: "Radisson Blu", provider: "Booking.com", stars: 4, score: 88, pricePerNight: 89 },
    { name: "Premier Inn City Centre", provider: "Premier Inn", stars: 3, score: 92, pricePerNight: 65 },
    { name: "Travelodge Central", provider: "Travelodge", stars: 2, score: 95, pricePerNight: 45 },
    { name: "Hilton Garden Inn", provider: "Expedia", stars: 4, score: 71, pricePerNight: 110 },
    { name: "Holiday Inn Express", provider: "IHG", stars: 3, score: 84, pricePerNight: 72 },
    { name: "Marriott City Hotel", provider: "Marriott", stars: 5, score: 76, pricePerNight: 185 },
    { name: "ibis Budget", provider: "Booking.com", stars: 2, score: 90, pricePerNight: 38 },
    { name: "DoubleTree by Hilton", provider: "Expedia", stars: 4, score: 68, pricePerNight: 125 },
  ];

  const checkIn = params.checkIn || "2026-07-01";
  const checkOut = params.checkOut || "2026-07-08";
  const nights = Math.max(1, Math.round((new Date(checkOut).getTime() - new Date(checkIn).getTime()) / (1000 * 60 * 60 * 24)));

  const hotelFlags: Record<number, Array<{ severity: "green" | "amber" | "red"; label: string }>> = {
    88: [{ severity: "amber", label: "🚫 Non-refundable rate" }, { severity: "green", label: "🅿️ Free parking" }],
    92: [{ severity: "green", label: "✅ Free cancellation" }, { severity: "green", label: "💳 Debit card accepted" }],
    95: [{ severity: "green", label: "✅ Free cancellation" }, { severity: "green", label: "💳 No deposit required" }],
    71: [{ severity: "red", label: "🚫 Non-refundable" }, { severity: "amber", label: "💰 £200 deposit hold" }],
    84: [{ severity: "green", label: "✅ Free cancellation 24h" }, { severity: "amber", label: "⏰ Late checkout fee" }],
    76: [{ severity: "amber", label: "🚫 72h cancellation" }, { severity: "amber", label: "💰 £300 deposit hold" }],
    90: [{ severity: "green", label: "✅ Free cancellation" }, { severity: "green", label: "💳 No deposit" }],
    68: [{ severity: "red", label: "🚫 Non-refundable" }, { severity: "red", label: "💰 £500 deposit hold" }],
  };

  return hotels.map((hotel, i) => {
    const totalPrice = hotel.pricePerNight * nights;
    const extraCost = hotel.score < 75 ? 30 : hotel.score < 85 ? 10 : 0;
    return {
      id: `hotel-${i}`,
      type: "hotels" as const,
      name: hotel.name,
      provider: hotel.provider,
      location: params.to || params.from || "City Centre",
      stars: hotel.stars,
      rating: 3.5 + (hotel.score / 100) * 1.5,
      reviewCount: 100 + Math.floor(Math.random() * 2000),
      pricePerNight: hotel.pricePerNight,
      totalPrice,
      estimatedTrueCost: totalPrice + extraCost,
      transparencyScore: hotel.score,
      transparencyLevel: getTransparencyLevel(hotel.score) as import('./types').TransparencyLevel,
      flags: hotelFlags[hotel.score] || [],
      topWarning: hotel.score < 75 ? "Non-refundable — no refund if you cancel" : null,
      affiliateUrl: `https://www.booking.com/searchresults.html?aid=rentaltruth&hotel=${hotel.name}`,
      amenities: ["WiFi", "Breakfast", "Parking"].slice(0, hotel.stars - 1),
    };
  }).sort((a, b) => b.transparencyScore - a.transparencyScore);
}

export function generateFlightResults(params: SearchParams): FlightResult[] {
  const flights = [
    { airline: "easyJet", price: 45, score: 72, stops: 0, duration: "1h 20m", dep: "06:30", arr: "07:50" },
    { airline: "British Airways", price: 120, score: 85, stops: 0, duration: "1h 25m", dep: "08:15", arr: "09:40" },
    { airline: "Ryanair", price: 29, score: 48, stops: 0, duration: "1h 15m", dep: "05:45", arr: "07:00" },
    { airline: "Jet2", price: 78, score: 80, stops: 0, duration: "1h 30m", dep: "10:00", arr: "11:30" },
    { airline: "Wizz Air", price: 35, score: 55, stops: 0, duration: "1h 20m", dep: "14:20", arr: "15:40" },
    { airline: "TUI Airways", price: 95, score: 76, stops: 0, duration: "1h 35m", dep: "07:00", arr: "08:35" },
    { airline: "Lufthansa", price: 185, score: 91, stops: 1, duration: "3h 45m", dep: "09:00", arr: "12:45" },
    { airline: "KLM", price: 155, score: 88, stops: 1, duration: "3h 20m", dep: "11:30", arr: "14:50" },
  ];

  const flightFlags: Record<string, Array<{ severity: "green" | "amber" | "red"; label: string }>> = {
    "easyJet": [{ severity: "amber", label: "💼 Cabin bag only — hold bag extra" }, { severity: "amber", label: "🪑 Seat selection fee" }],
    "British Airways": [{ severity: "green", label: "✅ Hand luggage included" }, { severity: "green", label: "🔄 Free rebooking" }],
    "Ryanair": [{ severity: "red", label: "💼 Small bag only free" }, { severity: "red", label: "🪑 Seat fee mandatory" }, { severity: "amber", label: "🚫 Priority boarding extra" }],
    "Jet2": [{ severity: "green", label: "✅ 22kg hold bag included" }, { severity: "green", label: "🪑 Seat included" }],
    "Wizz Air": [{ severity: "red", label: "💼 Tiny bag only free" }, { severity: "amber", label: "🪑 Seat selection fee" }],
    "TUI Airways": [{ severity: "green", label: "✅ Hold bag included" }, { severity: "green", label: "🍽️ Meal included" }],
    "Lufthansa": [{ severity: "green", label: "✅ Hand luggage included" }, { severity: "green", label: "🔄 Flexible rebooking" }],
    "KLM": [{ severity: "green", label: "✅ Hand luggage included" }, { severity: "green", label: "🍽️ Meal on board" }],
  };

  return flights.map((flight, i) => {
    const extraCost = flight.score < 60 ? 35 : flight.score < 80 ? 15 : 0;
    return {
      id: `flight-${i}`,
      type: "flights" as const,
      airline: flight.airline,
      from: params.from || "Liverpool (LPL)",
      to: params.to || "London Gatwick (LGW)",
      departureTime: flight.dep,
      arrivalTime: flight.arr,
      duration: flight.duration,
      stops: flight.stops,
      price: flight.price,
      estimatedTrueCost: flight.price + extraCost,
      transparencyScore: flight.score,
      transparencyLevel: getTransparencyLevel(flight.score) as import('./types').TransparencyLevel,
      flags: flightFlags[flight.airline] || [],
      topWarning: flight.score < 60 ? "Low-cost carrier — many extras charged separately" : null,
      affiliateUrl: `https://www.skyscanner.net/transport/flights/?associateid=rentaltruth&airline=${flight.airline}`,
      cabinClass: "Economy",
    };
  }).sort((a, b) => b.transparencyScore - a.transparencyScore);
}
