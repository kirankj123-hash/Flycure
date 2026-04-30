import { describe, test, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { Navigation } from '@/components/organisms/Navigation/Navigation'

// Mock Next.js components
vi.mock('next/link', () => ({
  default: ({ children, href, ...props }: { children: React.ReactNode; href: string; [key: string]: unknown }) => (
    <a href={href} {...(props as React.AnchorHTMLAttributes<HTMLAnchorElement>)}>
      {children}
    </a>
  ),
}))

vi.mock('next/image', () => ({
  default: ({ src, alt, priority, ...props }: { src: string; alt: string; priority?: boolean | string; [key: string]: unknown }) => {
    const filteredProps = { ...props }
    // Remove boolean priority prop to avoid React warning
    if (typeof priority === 'boolean') {
      delete (filteredProps as { priority?: unknown }).priority
    } else if (priority) {
      filteredProps.priority = String(priority)
    }
    return (
      <div role="img" aria-label={alt} data-src={src} {...(filteredProps as Record<string, unknown>)} />
    )
  },
}))

describe('Navigation Component', () => {
  test('renders logo and brand name', () => {
    render(<Navigation />)
    
    const logo = screen.getByRole('img', { name: 'FlyCure Health' })
    const brandName = screen.getByText('FlyCure')
    
    expect(logo).toBeInTheDocument()
    expect(logo).toHaveAttribute('data-src', '/flycure_image.png')
    expect(brandName).toBeInTheDocument()
    expect(brandName).toHaveClass('text-blue-900')
  })

  test('renders all navigation links', () => {
    render(<Navigation />)
    
    expect(screen.getByRole('link', { name: 'Home' })).toHaveAttribute('href', '/')
    expect(screen.getByRole('link', { name: 'Departments' })).toHaveAttribute('href', '/departments')
    expect(screen.getByRole('link', { name: 'Doctors' })).toHaveAttribute('href', '/doctors')
    expect(screen.getByRole('link', { name: 'Hospitals' })).toHaveAttribute('href', '/hospitals')
  })

  test('renders call-to-action button', () => {
    render(<Navigation />)
    
    const ctaButton = screen.getByRole('button', { name: 'Get Your Free Treatment' })
    expect(ctaButton).toBeInTheDocument()
    expect(ctaButton).toHaveClass('bg-emerald-500')
  })

  test('renders mobile menu toggle button', () => {
    render(<Navigation />)
    
    const mobileMenuButton = screen.getByRole('button', { name: 'Toggle menu' })
    expect(mobileMenuButton).toBeInTheDocument()
    expect(mobileMenuButton).toHaveAttribute('aria-expanded', 'false')
  })

  test('toggles mobile menu when button is clicked', async () => {
    const user = userEvent.setup()
    render(<Navigation />)
    
    const mobileMenuButton = screen.getByRole('button', { name: 'Toggle menu' })
    expect(mobileMenuButton).toHaveAttribute('aria-expanded', 'false')
    
    await user.click(mobileMenuButton)
    expect(mobileMenuButton).toHaveAttribute('aria-expanded', 'true')
    
    await user.click(mobileMenuButton)
    expect(mobileMenuButton).toHaveAttribute('aria-expanded', 'false')
  })

  test('applies custom className when provided', () => {
    render(<Navigation className="custom-nav-class" />)
    
    const nav = screen.getByRole('navigation')
    expect(nav).toHaveClass('custom-nav-class')
  })

  test('has proper accessibility attributes', () => {
    render(<Navigation />)
    
    const nav = screen.getByRole('navigation')
    expect(nav).toBeInTheDocument()
    
    const mobileMenuButton = screen.getByRole('button', { name: 'Toggle menu' })
    expect(mobileMenuButton).toHaveAttribute('aria-label', 'Toggle menu')
  })

  test('navigation links have proper hover styles', () => {
    render(<Navigation />)
    
    const homeLink = screen.getByRole('link', { name: 'Home' })
    expect(homeLink).toHaveClass('text-gray-700', 'hover:text-blue-600')
  })

  test('logo link points to home page', () => {
    render(<Navigation />)
    
    const logoLinks = screen.getAllByRole('link')
    const logoLink = logoLinks.find(link => 
      link.querySelector('div[role="img"][aria-label="FlyCure Health"]')
    )
    expect(logoLink).toHaveAttribute('href', '/')
  })

  test('navigation has fixed positioning and backdrop blur', () => {
    render(<Navigation />)
    
    const nav = screen.getByRole('navigation')
    expect(nav).toHaveClass('fixed', 'top-0', 'z-50', 'bg-white', 'shadow-md')
  })
})