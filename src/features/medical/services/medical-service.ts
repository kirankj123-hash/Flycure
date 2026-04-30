/**
 * Medical Data Service
 * Provides data for departments, doctors, and treatments
 * In production, this would fetch from an API
 */

import type { Department, Doctor } from '../types';

export class MedicalService {
  /**
   * Get all departments
   */
  static getDepartments(): Department[] {
    return [
      {
        id: 1,
        name: 'Cardiology',
        slug: 'cardiology',
        description: 'Comprehensive heart and cardiovascular care with state-of-the-art facilities and expert cardiologists.',
        iconPath: 'M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z'
      },
      {
        id: 2,
        name: 'Orthopedics',
        slug: 'orthopedics',
        description: 'Advanced bone, joint, and muscle treatments including minimally invasive procedures.',
        iconPath: 'M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z'
      },
      {
        id: 3,
        name: 'Oncology',
        slug: 'oncology',
        description: 'Comprehensive cancer care with cutting-edge treatment options and personalized therapy.',
        iconPath: 'M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z'
      },
      {
        id: 4,
        name: 'Neurology',
        slug: 'neurology',
        description: 'Expert care for neurological conditions with advanced diagnostic and treatment capabilities.',
        iconPath: 'M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z'
      },
      {
        id: 5,
        name: 'Gastroenterology',
        slug: 'gastroenterology',
        description: 'Specialized digestive system care with minimally invasive procedures and treatments.',
        iconPath: 'M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z'
      },
      {
        id: 6,
        name: 'Dermatology',
        slug: 'dermatology',
        description: 'Complete skin care solutions including cosmetic and medical dermatology services.',
        iconPath: 'M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z'
      }
    ];
  }

  /**
   * Get department by slug
   */
  static getDepartmentBySlug(slug: string): Department | undefined {
    return this.getDepartments().find(dept => dept.slug === slug);
  }

  /**
   * Get all doctors
   */
  static getDoctors(): Doctor[] {
    return [
      {
        id: 1,
        name: 'Dr. Sarah Johnson',
        specialty: 'Cardiac Surgery',
        experience: '15+ years',
        description: 'Leading Cardiac Surgeon with 15+ years experience in minimally invasive heart procedures.',
        iconPath: 'M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z'
      },
      {
        id: 2,
        name: 'Dr. Michael Chen',
        specialty: 'Orthopedics',
        experience: '12+ years',
        description: 'Renowned Orthopedic Specialist focusing on joint replacement and sports medicine.',
        iconPath: 'M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z'
      },
      {
        id: 3,
        name: 'Dr. Emily Rodriguez',
        specialty: 'Oncology',
        experience: '18+ years',
        description: 'Expert Oncologist specializing in personalized cancer treatment and immunotherapy.',
        iconPath: 'M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z'
      },
      {
        id: 4,
        name: 'Dr. Ahmed Hassan',
        specialty: 'Neurology',
        experience: '20+ years',
        description: 'Leading Neurologist with expertise in brain surgery and neurological disorders.',
        iconPath: 'M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z'
      },
      {
        id: 5,
        name: 'Dr. Lisa Thompson',
        specialty: 'Gastroenterology',
        experience: '14+ years',
        description: 'Gastroenterology expert specializing in digestive disorders and endoscopic procedures.',
        iconPath: 'M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z'
      },
      {
        id: 6,
        name: 'Dr. Robert Kim',
        specialty: 'Dermatology',
        experience: '10+ years',
        description: 'Board-certified Dermatologist offering advanced skin treatments and cosmetic procedures.',
        iconPath: 'M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z'
      }
    ];
  }

  /**
   * Get doctors by specialty
   */
  static getDoctorsBySpecialty(specialty: string): Doctor[] {
    return this.getDoctors().filter(doctor => 
      doctor.specialty?.toLowerCase().includes(specialty.toLowerCase())
    );
  }
}
