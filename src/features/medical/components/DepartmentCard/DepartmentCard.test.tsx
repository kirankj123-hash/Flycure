/**
 * DepartmentCard Component Tests
 */

import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { DepartmentCard } from './DepartmentCard';
import type { Department } from '../../types';

const mockDepartment: Department = {
  id: 1,
  name: 'Cardiology',
  slug: 'cardiology',
  description: 'Comprehensive heart and cardiovascular care',
  iconPath: 'M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364',
};

describe('DepartmentCard', () => {
  it('renders department information', () => {
    render(<DepartmentCard department={mockDepartment} />);
    
    expect(screen.getByText('Cardiology')).toBeInTheDocument();
    expect(screen.getByText(/Comprehensive heart/)).toBeInTheDocument();
  });

  it('calls onClick when clicked', () => {
    const handleClick = vi.fn();
    render(<DepartmentCard department={mockDepartment} onClick={handleClick} />);
    
    const card = screen.getByText('Cardiology').closest('div');
    card?.click();
    
    expect(handleClick).toHaveBeenCalledWith(mockDepartment);
  });

  it('applies custom className', () => {
    const { container } = render(
      <DepartmentCard department={mockDepartment} className="custom-class" />
    );
    
    expect(container.firstChild).toHaveClass('custom-class');
  });
});
