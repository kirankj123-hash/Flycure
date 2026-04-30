'use client';

/**
 * DepartmentCard Component
 * Feature-specific card for displaying medical department information
 */

import { FeatureCard } from '@/components/molecules/FeatureCard/FeatureCard';
import type { Department } from '../../types';
import { cn } from '@/lib/utils/cn';
import { componentPatterns } from '@/styles/tokens';

export interface DepartmentCardProps {
  department: Department;
  onClick?: (department: Department) => void;
  className?: string;
}

export function DepartmentCard({ 
  department, 
  onClick,
  className 
}: DepartmentCardProps) {
  const handleClick = () => {
    // Department-specific logic
    if (onClick) {
      onClick(department);
    }
    // Future: Add analytics tracking
    // trackEvent('department_clicked', { name: department.name });
  };

  return (
    <div 
      className={cn(componentPatterns.card.clickable, className)}
      onClick={handleClick}
    >
      <FeatureCard
        title={department.name}
        description={department.description}
        iconPath={department.iconPath}
      />
      {/* Future enhancements:
        - Show treatment count badge
        - Display popular treatments
        - Add "Learn More" button
        - Show average cost range
      */}
    </div>
  );
}
