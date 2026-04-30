'use client';

/**
 * DoctorCard Component
 * Feature-specific card for displaying doctor information
 */

import { FeatureCard } from '@/components/molecules/FeatureCard/FeatureCard';
import type { Doctor } from '../../types';
import { cn } from '@/lib/utils/cn';
import { componentPatterns } from '@/styles/tokens';

export interface DoctorCardProps {
  doctor: Doctor;
  onClick?: (doctor: Doctor) => void;
  className?: string;
  showSpecialty?: boolean;
  showExperience?: boolean;
}

export function DoctorCard({ 
  doctor, 
  onClick,
  className,
  showSpecialty = true,
  showExperience = true,
}: DoctorCardProps) {
  const handleClick = () => {
    // Doctor-specific logic
    if (onClick) {
      onClick(doctor);
    }
    // Future: Add analytics tracking
    // trackEvent('doctor_clicked', { name: doctor.name, specialty: doctor.specialty });
  };

  // Enhanced description with specialty and experience
  const enhancedDescription = [
    doctor.description,
    showSpecialty && doctor.specialty && `Specialty: ${doctor.specialty}`,
    showExperience && doctor.experience && `Experience: ${doctor.experience}`,
  ]
    .filter(Boolean)
    .join(' • ');

  return (
    <div 
      className={cn(componentPatterns.card.clickable, className)}
      onClick={handleClick}
    >
      <FeatureCard
        title={doctor.name}
        description={enhancedDescription}
        iconPath={doctor.iconPath}
      />
      {/* Future enhancements:
        - Show specialty badge
        - Display availability status
        - Add "Book Appointment" button
        - Show patient ratings
        - Display languages spoken
      */}
    </div>
  );
}
