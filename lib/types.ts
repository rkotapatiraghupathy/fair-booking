export type TravelType = "carhire" | "hotels" | "flights";

export type TransparencyLevel = "EXCELLENT" | "GOOD" | "FAIR" | "POOR" | "UNKNOWN";

export interface TransparencyFlag {
  severity: "green" | "amber" | "red";
  label: string;
}

export interface CarHireResult {
  id: string;
  type: "carhire";
  provider: string;
  providerLogo?: string;
  vehicle: string;
  category: string;
  pickupLocation: string;
  dropoffLocation: string;
  pickupDate: string;
  dropoffDate: string;
  days: number;
  pricePerDay: number;
  totalPrice: number;
  estimatedTrueCost: number;
  transparencyScore: number;
  transparencyLevel: TransparencyLevel;
  flags: TransparencyFlag[];
  topWarning: string | null;
  affiliateUrl: string;
  features: string[];
}

export interface HotelResult {
  id: string;
  type: "hotels";
  name: string;
  provider: string;
  location: string;
  stars: number;
  rating: number;
  reviewCount: number;
  pricePerNight: number;
  totalPrice: number;
  estimatedTrueCost: number;
  transparencyScore: number;
  transparencyLevel: TransparencyLevel;
  flags: TransparencyFlag[];
  topWarning: string | null;
  affiliateUrl: string;
  amenities: string[];
  imageUrl?: string;
}

export interface FlightResult {
  id: string;
  type: "flights";
  airline: string;
  airlineLogo?: string;
  from: string;
  to: string;
  departureTime: string;
  arrivalTime: string;
  duration: string;
  stops: number;
  price: number;
  estimatedTrueCost: number;
  transparencyScore: number;
  transparencyLevel: TransparencyLevel;
  flags: TransparencyFlag[];
  topWarning: string | null;
  affiliateUrl: string;
  cabinClass: string;
}

export type SearchResult = CarHireResult | HotelResult | FlightResult;

export interface SearchParams {
  type: TravelType;
  from?: string;
  to?: string;
  pickupDate?: string;
  returnDate?: string;
  checkIn?: string;
  checkOut?: string;
  passengers?: number;
  rooms?: number;
  drivers?: number;
}
