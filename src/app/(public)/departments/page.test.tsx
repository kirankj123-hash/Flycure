import { describe, test, expect, vi } from 'vitest';
import { render, screen } from '@/test-utils';
import DepartmentsPage from './page';

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

describe('DepartmentsPage', () => {
  test('renders the page without crashing', () => {
    render(<DepartmentsPage />);
    expect(screen.getByRole('main')).toBeInTheDocument();
  });

  test('renders page title with correct heading', () => {
    render(<DepartmentsPage />);
    
    const heading = screen.getByRole('heading', { level: 1 });
    expect(heading).toBeInTheDocument();
    expect(heading).toHaveTextContent('Medical Departments');
  });

  test('renders hero section with description', () => {
    render(<DepartmentsPage />);
    
    const description = screen.getByText(
      'Explore our comprehensive range of medical specialties and find the right treatment for your needs.'
    );
    expect(description).toBeInTheDocument();
  });

  test('renders all department feature cards', () => {
    render(<DepartmentsPage />);
    
    // Test for key departments using heading role
    expect(screen.getByRole('heading', { level: 3, name: 'Cardiology' })).toBeInTheDocument();
    expect(screen.getByRole('heading', { level: 3, name: 'Orthopedics' })).toBeInTheDocument();
    expect(screen.getByRole('heading', { level: 3, name: 'Oncology' })).toBeInTheDocument();
    expect(screen.getByRole('heading', { level: 3, name: 'Neurology' })).toBeInTheDocument();
    expect(screen.getByRole('heading', { level: 3, name: 'Gastroenterology' })).toBeInTheDocument();
    expect(screen.getByRole('heading', { level: 3, name: 'Dermatology' })).toBeInTheDocument();
  });

  test('renders department descriptions', () => {
    render(<DepartmentsPage />);
    
    expect(screen.getByText(/Comprehensive heart and cardiovascular care/)).toBeInTheDocument();
    expect(screen.getByText(/Advanced bone, joint, and muscle treatments/)).toBeInTheDocument();
    expect(screen.getByText(/Comprehensive cancer care with cutting-edge treatment/)).toBeInTheDocument();
  });

  test('renders navigation component', () => {
    render(<DepartmentsPage />);
    
    // Navigation should render with FlyCure brand
    expect(screen.getByText('FlyCure')).toBeInTheDocument();
    
    // Should have navigation links (multiple instances due to nav + footer)
    expect(screen.getAllByRole('link', { name: 'Home' }).length).toBeGreaterThanOrEqual(1);
    expect(screen.getAllByRole('link', { name: 'Departments' }).length).toBeGreaterThanOrEqual(1);
    expect(screen.getAllByRole('link', { name: 'Doctors' }).length).toBeGreaterThanOrEqual(1);
    expect(screen.getAllByRole('link', { name: 'Hospitals' }).length).toBeGreaterThanOrEqual(1);
  });

  test('renders footer component', () => {
    render(<DepartmentsPage />);
    
    // Footer should be present (basic test)
    const footers = screen.getAllByRole('contentinfo');
    expect(footers.length).toBeGreaterThan(0);
  });

  test('has correct page structure and layout', () => {
    const { container } = render(<DepartmentsPage />);
    
    // Should have proper semantic structure
    expect(container.querySelector('main')).toBeInTheDocument();
    expect(container.querySelector('nav')).toBeInTheDocument();
    expect(container.querySelector('footer')).toBeInTheDocument();
  });

  test('renders all 6 departments with correct data structure', () => {
    render(<DepartmentsPage />);
    
    const departments = [
      'Cardiology',
      'Orthopedics', 
      'Oncology',
      'Neurology',
      'Gastroenterology',
      'Dermatology'
    ];
    
    departments.forEach(department => {
      expect(screen.getByRole('heading', { level: 3, name: department })).toBeInTheDocument();
    });
  });

  test('uses design system styles correctly', () => {
    const { container } = render(<DepartmentsPage />);
    
    // Check that root container has proper classes
    const rootDiv = container.firstChild;
    expect(rootDiv).toHaveClass('min-h-screen', 'bg-gray-50');
  });

  test('has accessible structure', () => {
    render(<DepartmentsPage />);
    
    // Should have proper heading hierarchy
    const h1 = screen.getByRole('heading', { level: 1 });
    expect(h1).toBeInTheDocument();
    
    // Should have proper landmarks
    expect(screen.getByRole('main')).toBeInTheDocument();
    expect(screen.getByRole('navigation')).toBeInTheDocument();
  });
});