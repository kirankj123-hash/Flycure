'use client';

/**
 * HospitalCard Component
 * Feature-specific card for displaying hospitals
 */

import { FeatureCard } from '@/components/molecules/FeatureCard/FeatureCard';
import type { Hospital } from '../../types';
import { cn } from '@/lib/utils/cn';
import { componentPatterns } from '@/styles/tokens';

export interface HospitalCardProps {
  hospital: Hospital;
  onClick?: (hospital: Hospital) => void;
  className?: string;
  showLocation?: boolean;
  showAccreditation?: boolean;
}

export function HospitalCard({ 
  hospital, 
  onClick,
  className,
  showLocation = true,
  showAccreditation = true,
}: HospitalCardProps) {
  const handleClick = () => {
    // Hospital-specific logic
    if (onClick) {
      onClick(hospital);
    }
    // Future: Add analytics tracking
    // trackEvent('hospital_clicked', { name: hospital.name, country: hospital.location?.country });
  };

  // Enhanced description with location and accreditation
  const locationInfo = hospital.location 
    ? `${hospital.location.city}, ${hospital.location.country}` 
    : '';
  
  const accreditationInfo = hospital.accreditation?.length 
    ? `Accreditation: ${hospital.accreditation.join(', ')}` 
    : '';

  const enhancedDescription = [
    hospital.description,
    showLocation && locationInfo,
    showAccreditation && accreditationInfo,
  ]
    .filter(Boolean)
    .join(' • ');

  return (
    <div 
      className={cn(componentPatterns.card.clickable, className)}
      onClick={handleClick}
    >
      <FeatureCard
        title={hospital.name}
        description={enhancedDescription}
        iconPath={hospital.iconPath}
      />
      {/* Future enhancements:
        - Show location badge with flag
        - Display accreditation badges (JCI, NABH)
        - Add "View Hospital" button
        - Show available specialties
        - Display patient reviews count
        - Show average cost comparison
      */}
    </div>
  );
}
