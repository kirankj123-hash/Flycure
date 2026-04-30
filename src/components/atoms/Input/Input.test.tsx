import { describe, test, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { Input } from '@/components/atoms/Input/Input'

describe('Input Component', () => {
  test('renders with default props', () => {
    render(<Input placeholder="Enter text" />)
    const input = screen.getByRole('textbox')
    expect(input).toBeInTheDocument()
    expect(input).toHaveClass('flex', 'h-9', 'w-full')
  })

  test('forwards ref correctly', () => {
    const ref = vi.fn()
    render(<Input ref={ref} />)
    expect(ref).toHaveBeenCalledWith(expect.any(HTMLInputElement))
  })

  test('handles different input types', () => {
    const { rerender } = render(<Input type="email" />)
    expect(screen.getByRole('textbox')).toHaveAttribute('type', 'email')
    
    rerender(<Input type="password" />)
    // Password inputs don't have accessible roles, so we use querySelector
    const passwordInput = document.querySelector('input[type="password"]')
    expect(passwordInput).toHaveAttribute('type', 'password')
  })

  test('displays error message when error prop is provided', () => {
    const errorMessage = 'This field is required'
    render(<Input error={errorMessage} id="test-input" />)
    
    const input = screen.getByRole('textbox')
    const errorElement = screen.getByRole('alert')
    
    expect(errorElement).toBeInTheDocument()
    expect(errorElement).toHaveTextContent(errorMessage)
    expect(input).toHaveClass('border-destructive')
    expect(input).toHaveAttribute('aria-invalid', 'true')
    expect(input).toHaveAttribute('aria-describedby', 'test-input-error')
  })

  test('applies error styling when error is present', () => {
    render(<Input error="Error message" />)
    const input = screen.getByRole('textbox')
    expect(input).toHaveClass('border-destructive', 'focus-visible:ring-destructive')
  })

  test('handles user input correctly', async () => {
    const handleChange = vi.fn()
    const user = userEvent.setup()
    
    render(<Input onChange={handleChange} />)
    const input = screen.getByRole('textbox')
    
    await user.type(input, 'Hello World')
    expect(handleChange).toHaveBeenCalled()
    expect(input).toHaveValue('Hello World')
  })

  test('respects disabled state', () => {
    render(<Input disabled />)
    const input = screen.getByRole('textbox')
    expect(input).toBeDisabled()
    expect(input).toHaveClass('disabled:cursor-not-allowed', 'disabled:opacity-50')
  })

  test('applies custom className', () => {
    render(<Input className="custom-class" />)
    const input = screen.getByRole('textbox')
    expect(input).toHaveClass('custom-class')
  })

  test('handles placeholder text', () => {
    const placeholderText = 'Enter your email'
    render(<Input placeholder={placeholderText} />)
    const input = screen.getByRole('textbox')
    expect(input).toHaveAttribute('placeholder', placeholderText)
  })

  test('does not show error when no error prop', () => {
    render(<Input />)
    expect(screen.queryByRole('alert')).not.toBeInTheDocument()
  })

  test('handles file input type', () => {
    render(<Input type="file" />)
    // File inputs don't have accessible roles, so we use querySelector
    const input = document.querySelector('input[type="file"]')
    expect(input).toHaveAttribute('type', 'file')
  })

  test('applies focus-visible classes correctly', () => {
    render(<Input />)
    const input = screen.getByRole('textbox')
    expect(input).toHaveClass('focus-visible:outline-none', 'focus:ring-2')
  })
})