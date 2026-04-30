/**
 * Facilities Data Service
 * Provides data for hospitals and destinations
 * In production, this would fetch from an API
 */

import type { Hospital } from '../types';

export class FacilitiesService {
  /**
   * Get all hospitals
   */
  static getHospitals(): Hospital[] {
    return [
      {
        id: 1,
        name: 'Bangkok International Hospital',
        slug: 'bangkok-international',
        location: { city: 'Bangkok', country: 'Thailand' },
        accreditation: ['JCI'],
        specialties: ['Cardiology', 'Oncology', 'Orthopedics'],
        description: 'Leading medical facility in Thailand with JCI accreditation and world-class cardiac care.',
        iconPath: 'M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16l3.5-2 3.5 2 3.5-2 3.5 2zM10 8h4M10 12h4m-4 4h4'
      },
      {
        id: 2,
        name: 'Apollo Hospitals, Chennai',
        slug: 'apollo-chennai',
        location: { city: 'Chennai', country: 'India' },
        accreditation: ['JCI', 'NABH'],
        specialties: ['Oncology', 'Organ Transplant', 'Cardiology'],
        description: 'Premier healthcare institution in India known for advanced oncology and organ transplants.',
        iconPath: 'M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z'
      },
      {
        id: 3,
        name: 'Acıbadem Healthcare Group',
        slug: 'acibadem-istanbul',
        location: { city: 'Istanbul', country: 'Turkey' },
        accreditation: ['JCI'],
        specialties: ['Cardiology', 'Neurology', 'Cosmetic Surgery'],
        description: 'Turkey\'s largest private healthcare network with cutting-edge technology and expert staff.',
        iconPath: 'M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z'
      },
      {
        id: 4,
        name: 'Fortis Healthcare',
        slug: 'fortis-delhi',
        location: { city: 'New Delhi', country: 'India' },
        accreditation: ['NABH', 'NABL'],
        specialties: ['Cardiology', 'Orthopedics', 'Neurology'],
        description: 'Multi-specialty hospital chain across Asia with expertise in complex medical procedures.',
        iconPath: 'M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z'
      },
      {
        id: 5,
        name: 'Bumrungrad International Hospital',
        slug: 'bumrungrad-bangkok',
        location: { city: 'Bangkok', country: 'Thailand' },
        accreditation: ['JCI'],
        specialties: ['All Specialties'],
        description: 'World-renowned hospital in Bangkok serving international patients with premium healthcare.',
        iconPath: 'M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z'
      },
      {
        id: 6,
        name: 'Medanta - The Medicity',
        slug: 'medanta-gurgaon',
        location: { city: 'Gurgaon', country: 'India' },
        accreditation: ['NABH', 'JCI'],
        specialties: ['Robotic Surgery', 'Cardiology', 'Oncology'],
        description: 'Super-specialty hospital in India with advanced robotic surgery and comprehensive care.',
        iconPath: 'M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z'
      }
    ];
  }

  /**
   * Get hospital by slug
   */
  static getHospitalBySlug(slug: string): Hospital | undefined {
    return this.getHospitals().find(hospital => hospital.slug === slug);
  }

  /**
   * Get hospitals by location
   */
  static getHospitalsByCountry(country: string): Hospital[] {
    return this.getHospitals().filter(hospital => 
      hospital.location?.country.toLowerCase() === country.toLowerCase()
    );
  }
}
