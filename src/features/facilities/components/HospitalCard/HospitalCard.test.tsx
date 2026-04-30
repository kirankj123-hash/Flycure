/**
 * HospitalCard Component Tests
 */

import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { HospitalCard } from './HospitalCard';
import type { Hospital } from '../../types';

const mockHospital: Hospital = {
  id: 1,
  name: 'Bangkok International Hospital',
  slug: 'bangkok-international',
  description: 'Leading medical facility in Thailand',
  iconPath: 'M19 21V5a2 2 0 00-2-2H7',
  location: { city: 'Bangkok', country: 'Thailand' },
  accreditation: ['JCI', 'ISO'],
  specialties: ['Cardiology', 'Oncology'],
};

describe('HospitalCard', () => {
  it('renders hospital information', () => {
    render(<HospitalCard hospital={mockHospital} />);
    
    expect(screen.getByText('Bangkok International Hospital')).toBeInTheDocument();
    expect(screen.getByText(/Leading medical facility/)).toBeInTheDocument();
  });

  it('shows location when enabled', () => {
    render(<HospitalCard hospital={mockHospital} showLocation={true} />);
    
    expect(screen.getByText(/Bangkok, Thailand/)).toBeInTheDocument();
  });

  it('shows accreditation when enabled', () => {
    render(<HospitalCard hospital={mockHospital} showAccreditation={true} />);
    
    expect(screen.getByText(/JCI, ISO/)).toBeInTheDocument();
  });

  it('hides location when disabled', () => {
    render(<HospitalCard hospital={mockHospital} showLocation={false} />);
    
    const text = screen.getByText(/Leading medical facility/);
    expect(text.textContent).not.toContain('Bangkok');
  });

  it('hides accreditation when disabled', () => {
    render(<HospitalCard hospital={mockHospital} showAccreditation={false} />);
    
    const text = screen.getByText(/Leading medical facility/);
    expect(text.textContent).not.toContain('JCI');
  });

  it('calls onClick when clicked', () => {
    const handleClick = vi.fn();
    render(<HospitalCard hospital={mockHospital} onClick={handleClick} />);
    
    const card = screen.getByText('Bangkok International Hospital').closest('div');
    card?.click();
    
    expect(handleClick).toHaveBeenCalledWith(mockHospital);
  });

  it('handles hospital without location', () => {
    const hospitalNoLocation = { ...mockHospital, location: undefined };
    render(<HospitalCard hospital={hospitalNoLocation} />);
    
    expect(screen.getByText('Bangkok International Hospital')).toBeInTheDocument();
  });
});
