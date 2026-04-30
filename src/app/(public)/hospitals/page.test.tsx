import { describe, test, expect, vi } from 'vitest';
import { render, screen } from '@/test-utils';
import HospitalsPage from './page';

// Mock Next.js components
vi.mock('next/link', () => ({
  default: ({ children, href, ...props }: { children: React.ReactNode; href: string; [key: string]: unknown }) => (
    <a href={href} {...(props as React.AnchorHTMLAttributes<HTMLAnchorElement>)}>
      {children}
    </a>
  ),
}));

vi.mock('next/image', () => ({
  default: ({ src, alt, priority, ...props }: { src: string; alt: string; priority?: boolean | string; [key: string]: unknown }) => {
    const filteredProps = { ...props };
    // Remove boolean priority prop to avoid React warning
    if (typeof priority === 'boolean') {
      delete (filteredProps as { priority?: unknown }).priority;
    } else if (priority) {
      filteredProps.priority = String(priority);
    }
    return (
      <div role="img" aria-label={alt} data-src={src} {...(filteredProps as Record<string, unknown>)} />
    );
  },
}));

// Mock the design system styles
vi.mock('@/styles/design-system', () => ({
  styles: {
    page: {
      root: 'min-h-screen bg-gray-50',
      main: 'flex-1',
      section: 'max-w-7xl mx-auto px-4 py-8',
      grid: 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4',
    },
    hero: {
      container: 'relative py-16 px-4 bg-gradient-to-br from-emerald-50 to-blue-50',
      card: 'max-w-7xl mx-auto',
      content: 'space-y-8',
      title: 'text-4xl md:text-5xl font-bold text-gray-900 leading-tight',
      highlight: 'text-emerald-600',
      subtitle: 'text-xl text-gray-600',
    },
    button: {
      base: 'inline-flex items-center justify-center',
      primary: 'bg-blue-600 text-white',
      default: 'h-9 px-4 py-2',
    },
    nav: {
      header: 'fixed top-0 w-full z-50 bg-white shadow-md',
      container: 'max-w-7xl mx-auto px-4',
      content: 'flex items-center justify-between h-16',
      logo: 'flex items-center space-x-2',
      brand: 'text-2xl font-bold text-blue-900',
      links: 'hidden md:flex items-center space-x-8',
      link: 'text-gray-700 hover:text-blue-600',
      cta: 'bg-emerald-500 text-white px-6 py-2 rounded-md',
      mobile: {
        button: 'md:hidden p-2 rounded-md',
        menu: 'md:hidden absolute top-16 bg-white',
        link: 'text-gray-600 hover:text-gray-900',
        cta: 'w-full bg-emerald-500',
      },
    },
    card: {
      base: 'bg-white p-6 rounded-md shadow-sm',
      title: 'text-lg font-semibold mb-2',
      description: 'text-gray-600',
    },
    form: {
      input: 'flex h-9 w-full rounded-md border border-gray-300 bg-white px-3 py-1 text-sm',
      label: 'text-sm font-medium text-gray-700',
      field: 'space-y-2',
      error: 'text-sm text-red-600',
    },
    footer: {
      container: 'bg-gray-900 text-white',
      inner: 'max-w-7xl mx-auto px-4 py-12',
      grid: 'grid grid-cols-1 md:grid-cols-4 gap-8',
      section: 'space-y-4',
      heading: 'text-lg font-semibold text-white mb-4',
      link: 'text-gray-300 hover:text-white transition-colors',
      bottomBar: 'border-t border-gray-800 mt-12 pt-8',
      copyright: 'text-gray-400',
      address: 'text-gray-300 space-y-1',
      linksList: 'space-y-2',
      newsletterForm: 'flex space-x-2',
      newsletterInput: 'flex-1 px-3 py-2 bg-gray-800 border border-gray-700 rounded-md',
      socialLinks: 'flex space-x-4',
      socialIcon: 'w-5 h-5',
    },
  },
  tokens: {
    colors: {
      primary: 'bg-emerald-500 text-white',
      primaryText: 'text-emerald-600',
    },
    font: {
      semibold: 'font-semibold',
      medium: 'font-medium',
      bold: 'font-bold',
    },
    text: {
      sm: 'text-sm',
      base: 'text-base',
      lg: 'text-lg',
    },
    visibility: {
      mdHidden: 'md:hidden',
      srOnly: 'sr-only',
    },
    transitions: {
      base: 'transition-colors duration-200',
    },
    borders: {
      rounded: 'rounded-md',
      base: 'border border-gray-200',
      focus: 'focus:ring-2 focus:ring-emerald-500',
    },
    spacing: {
      md: 'p-4',
      lg: 'p-6',
    },
  },
}));

describe('HospitalsPage', () => {
  test('renders the page without crashing', () => {
    render(<HospitalsPage />);
    expect(screen.getByRole('main')).toBeInTheDocument();
  });

  test('renders page title with correct heading', () => {
    render(<HospitalsPage />);
    
    const heading = screen.getByRole('heading', { level: 1 });
    expect(heading).toBeInTheDocument();
    expect(heading).toHaveTextContent('Partner Hospitals');
  });

  test('renders hero section with description', () => {
    render(<HospitalsPage />);
    
    const description = screen.getByText(
      'Top-rated hospitals worldwide providing exceptional medical care and state-of-the-art facilities.'
    );
    expect(description).toBeInTheDocument();
  });

  test('renders all hospital feature cards', () => {
    render(<HospitalsPage />);
    
    // Test for key hospitals using heading role
    expect(screen.getByRole('heading', { level: 3, name: 'Bangkok International Hospital' })).toBeInTheDocument();
    expect(screen.getByRole('heading', { level: 3, name: 'Apollo Hospitals, Chennai' })).toBeInTheDocument();
    expect(screen.getByRole('heading', { level: 3, name: 'Acıbadem Healthcare Group' })).toBeInTheDocument();
    expect(screen.getByRole('heading', { level: 3, name: 'Fortis Healthcare' })).toBeInTheDocument();
    expect(screen.getByRole('heading', { level: 3, name: 'Bumrungrad International Hospital' })).toBeInTheDocument();
    expect(screen.getByRole('heading', { level: 3, name: 'Medanta - The Medicity' })).toBeInTheDocument();
  });

  test('renders hospital descriptions with key features', () => {
    render(<HospitalsPage />);
    
    expect(screen.getByText(/Leading medical facility in Thailand with JCI accreditation/)).toBeInTheDocument();
    expect(screen.getByText(/Premier healthcare institution in India known for advanced oncology/)).toBeInTheDocument();
    expect(screen.getByText(/Turkey's largest private healthcare network/)).toBeInTheDocument();
    expect(screen.getByText(/World-renowned hospital in Bangkok serving international patients/)).toBeInTheDocument();
  });

  test('highlights international medical tourism destinations', () => {
    render(<HospitalsPage />);
    
    // Should mention key medical tourism countries (use getAllByText since enhanced descriptions show multiple instances)
    expect(screen.getAllByText(/Thailand/).length).toBeGreaterThan(0);
    expect(screen.getAllByText(/India/).length).toBeGreaterThan(0);
    expect(screen.getAllByText(/Turkey/).length).toBeGreaterThan(0);
    expect(screen.getAllByText(/Bangkok/).length).toBeGreaterThan(0);
    expect(screen.getAllByText(/Chennai/).length).toBeGreaterThan(0);
  });

  test('renders navigation component', () => {
    render(<HospitalsPage />);
    
    // Navigation should render with FlyCure brand
    expect(screen.getByText('FlyCure')).toBeInTheDocument();
    
    // Should have navigation links (multiple instances due to nav + footer)
    expect(screen.getAllByRole('link', { name: 'Home' }).length).toBeGreaterThanOrEqual(1);
    expect(screen.getAllByRole('link', { name: 'Departments' }).length).toBeGreaterThanOrEqual(1);
    expect(screen.getAllByRole('link', { name: 'Doctors' }).length).toBeGreaterThanOrEqual(1);
    expect(screen.getAllByRole('link', { name: 'Hospitals' }).length).toBeGreaterThanOrEqual(1);
  });

  test('renders footer component', () => {
    render(<HospitalsPage />);
    
    // Footer should be present (basic test)
    const footers = screen.getAllByRole('contentinfo');
    expect(footers.length).toBeGreaterThan(0);
  });

  test('has correct page structure and layout', () => {
    const { container } = render(<HospitalsPage />);
    
    // Should have proper semantic structure
    expect(container.querySelector('main')).toBeInTheDocument();
    expect(container.querySelector('nav')).toBeInTheDocument();
    expect(container.querySelector('footer')).toBeInTheDocument();
  });

  test('renders all 6 hospitals with correct data structure', () => {
    render(<HospitalsPage />);
    
    const hospitals = [
      'Bangkok International Hospital',
      'Apollo Hospitals, Chennai',
      'Acıbadem Healthcare Group',
      'Fortis Healthcare',
      'Bumrungrad International Hospital',
      'Medanta - The Medicity'
    ];
    
    hospitals.forEach(hospital => {
      expect(screen.getByRole('heading', { level: 3, name: hospital })).toBeInTheDocument();
    });
  });

  test('emphasizes quality and accreditation', () => {
    render(<HospitalsPage />);
    
    // Should highlight quality indicators
    expect(screen.getByText(/JCI accreditation/)).toBeInTheDocument();
    expect(screen.getByText(/world-class/)).toBeInTheDocument();
    expect(screen.getByText(/Premier/)).toBeInTheDocument();
    expect(screen.getByText(/World-renowned/)).toBeInTheDocument();
    expect(screen.getByText(/cutting-edge technology/)).toBeInTheDocument();
  });

  test('mentions advanced medical capabilities', () => {
    render(<HospitalsPage />);
    
    // Should mention advanced medical procedures and technologies
    expect(screen.getByText(/organ transplants/)).toBeInTheDocument();
    expect(screen.getByText(/robotic surgery/)).toBeInTheDocument();
    expect(screen.getByText(/state-of-the-art/)).toBeInTheDocument();
    expect(screen.getAllByText(/advanced/).length).toBeGreaterThan(0);
  });

  test('uses design system styles correctly', () => {
    const { container } = render(<HospitalsPage />);
    
    // Check that root container has proper classes
    const rootDiv = container.firstChild;
    expect(rootDiv).toHaveClass('min-h-screen', 'bg-gray-50');
  });

  test('has accessible structure', () => {
    render(<HospitalsPage />);
    
    // Should have proper heading hierarchy
    const h1 = screen.getByRole('heading', { level: 1 });
    expect(h1).toBeInTheDocument();
    
    // Should have proper landmarks
    expect(screen.getByRole('main')).toBeInTheDocument();
    expect(screen.getByRole('navigation')).toBeInTheDocument();
  });

  test('targets international patients', () => {
    render(<HospitalsPage />);
    
    // Should emphasize international healthcare services
    expect(screen.getByText(/international patients/)).toBeInTheDocument();
    expect(screen.getByText(/worldwide/)).toBeInTheDocument();
    expect(screen.getByText(/premium healthcare/)).toBeInTheDocument();
  });

  test('covers diverse medical specialties across hospitals', () => {
    render(<HospitalsPage />);
    
    // Should mention various medical specialties
    expect(screen.getByText(/cardiac care/)).toBeInTheDocument();
    expect(screen.getByText(/oncology/)).toBeInTheDocument();
    expect(screen.getByText(/Multi-specialty/)).toBeInTheDocument();
    expect(screen.getByText(/Super-specialty/)).toBeInTheDocument();
  });
});