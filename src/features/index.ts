/**
 * Features Module - Barrel Export
 * 
 * Central export point for all feature modules.
 * Each feature is self-contained with its own components, services, and types.
 * 
 * Usage:
 * ```typescript
 * import { EnquiryForm } from '@/features/enquiries';
 * import { MedicalService } from '@/features/medical';
 * import { FacilitiesService } from '@/features/facilities';
 * ```
 */

export * as Enquiries from './enquiries';
export * as Medical from './medical';
export * as Facilities from './facilities';
