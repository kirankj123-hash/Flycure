/**
 * Medical Feature Types
 * Types for departments, doctors, and medical services
 */

export interface Department {
  id: number;
  name: string;
  description: string;
  iconPath: string;
  slug?: string;
}

export interface Doctor {
  id: number;
  name: string;
  description: string;
  iconPath: string;
  specialty?: string;
  experience?: string;
  slug?: string;
}

export interface Treatment {
  id: number;
  name: string;
  description: string;
  departmentId: number;
  estimatedCost?: {
    min: number;
    max: number;
    currency: string;
  };
}
