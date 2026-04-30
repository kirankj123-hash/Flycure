import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { HeroSection } from './HeroSection';

const defaultProps = {
  title: 'Safe, Transparent Medical Care in India.',
  subtitle: 'Pay hospitals directly. Legal agreements included. No hidden charges.',
  actions: {
    primary: 'Get Free Estimate',
    primaryHref: '#inquiry',
    secondary: 'See how it works',
    secondaryHref: '#how-it-works',
  },
};

describe('HeroSection', () => {
  it('renders title, subtitle, and actions', () => {
    render(<HeroSection {...defaultProps} />);

    screen.getByRole('heading', {
      level: 1,
      name: defaultProps.title,
    });
    screen.getByText(defaultProps.subtitle);

    const primaryLink = screen.getByRole('link', { name: defaultProps.actions.primary });
    expect(primaryLink.getAttribute('href')).toBe(defaultProps.actions.primaryHref);

    const secondaryLink = screen.getByRole('link', {
      name: `${defaultProps.actions.secondary} →`,
    });
    expect(secondaryLink.getAttribute('href')).toBe(defaultProps.actions.secondaryHref);
  });
});