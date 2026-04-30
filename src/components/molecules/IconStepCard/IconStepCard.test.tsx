import { render, screen } from '@/test-utils';
import { IconStepCard } from './IconStepCard';

describe('IconStepCard', () => {
  const defaultProps = {
    iconPath: 'M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z',
    stepNumber: 1,
    title: 'Verified Surgical Excellence',
    description: 'Access top-tier surgeons with impeccable track records.',
  };

  it('renders the step number and title correctly', () => {
    render(<IconStepCard {...defaultProps} />);
    const titleElement = screen.getByRole('heading', { name: /Verified Surgical Excellence/i });
    expect(titleElement).toBeInTheDocument();
    expect(screen.getByText('1.')).toBeInTheDocument();
  });

  it('renders the description', () => {
    render(<IconStepCard {...defaultProps} />);
    expect(screen.getByText('Access top-tier surgeons with impeccable track records.')).toBeInTheDocument();
  });

  it('renders the icon with the correct path', () => {
    const { container } = render(<IconStepCard {...defaultProps} />);
    const svgPath = container.querySelector('path');
    expect(svgPath).toBeInTheDocument();
    expect(svgPath).toHaveAttribute('d', defaultProps.iconPath);
  });

  it('applies a custom className to the main container', () => {
    const { container } = render(<IconStepCard {...defaultProps} className="custom-class" />);
    expect(container.firstChild).toHaveClass('custom-class');
  });
});
