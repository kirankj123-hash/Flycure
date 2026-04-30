/**
 * Facilities Feature Types
 * Types for hospitals, destinations, and facility information
 */

export interface Hospital {
  id: number;
  name: string;
  description: string;
  iconPath: string;
  location?: {
    city: string;
    country: string;
  };
  accreditation?: string[];
  specialties?: string[];
  slug?: string;
}

export interface Destination {
  id: number;
  name: string;
  country: string;
  description: string;
  popularTreatments?: string[];
  estimatedSavings?: string;
}
