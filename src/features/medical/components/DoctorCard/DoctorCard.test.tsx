/**
 * DoctorCard Component Tests
 */

import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { DoctorCard } from './DoctorCard';
import type { Doctor } from '../../types';

const mockDoctor: Doctor = {
  id: 1,
  name: 'Dr. Sarah Johnson',
  specialty: 'Cardiac Surgery',
  experience: '15+ years',
  description: 'Leading Cardiac Surgeon',
  iconPath: 'M16 7a4 4 0 11-8 0',
};

describe('DoctorCard', () => {
  it('renders doctor information', () => {
    render(<DoctorCard doctor={mockDoctor} />);
    
    expect(screen.getByText('Dr. Sarah Johnson')).toBeInTheDocument();
    expect(screen.getByText(/Leading Cardiac Surgeon/)).toBeInTheDocument();
  });

  it('shows specialty when enabled', () => {
    render(<DoctorCard doctor={mockDoctor} showSpecialty={true} />);
    
    expect(screen.getByText(/Cardiac Surgery/)).toBeInTheDocument();
  });

  it('shows experience when enabled', () => {
    render(<DoctorCard doctor={mockDoctor} showExperience={true} />);
    
    expect(screen.getByText(/15\+ years/)).toBeInTheDocument();
  });

  it('hides specialty when disabled', () => {
    render(<DoctorCard doctor={mockDoctor} showSpecialty={false} />);
    
    const text = screen.getByText(/Leading Cardiac Surgeon/);
    expect(text.textContent).not.toContain('Cardiac Surgery');
  });

  it('calls onClick when clicked', () => {
    const handleClick = vi.fn();
    render(<DoctorCard doctor={mockDoctor} onClick={handleClick} />);
    
    const card = screen.getByText('Dr. Sarah Johnson').closest('div');
    card?.click();
    
    expect(handleClick).toHaveBeenCalledWith(mockDoctor);
  });
});
