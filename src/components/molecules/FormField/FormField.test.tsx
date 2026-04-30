import { describe, test, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { FormField } from '@/components/molecules/FormField/FormField'

describe('FormField Component', () => {
  test('renders with label and input', () => {
    render(<FormField label="Email Address" />)
    
    expect(screen.getByLabelText('Email Address')).toBeInTheDocument()
    expect(screen.getByRole('textbox')).toBeInTheDocument()
  })

  test('generates correct field ID from label', () => {
    render(<FormField label="First Name" />)
    
    const input = screen.getByRole('textbox')
    const label = screen.getByText('First Name')
    
    expect(input).toHaveAttribute('id', 'field-first-name')
    expect(label).toHaveAttribute('for', 'field-first-name')
  })

  test('uses provided ID instead of generated one', () => {
    render(<FormField label="Email" id="custom-email-id" />)
    
    const input = screen.getByRole('textbox')
    const label = screen.getByText('Email')
    
    expect(input).toHaveAttribute('id', 'custom-email-id')
    expect(label).toHaveAttribute('for', 'custom-email-id')
  })

  test('displays required indicator when required prop is true', () => {
    render(<FormField label="Password" required />)
    
    const requiredIndicator = screen.getByText('*')
    expect(requiredIndicator).toBeInTheDocument()
    expect(requiredIndicator).toHaveClass('text-destructive')
    
    const input = screen.getByRole('textbox')
    expect(input).toHaveAttribute('aria-required', 'true')
  })

  test('does not show required indicator when required is false', () => {
    render(<FormField label="Optional Field" />)
    
    expect(screen.queryByText('*')).not.toBeInTheDocument()
  })

  test('displays description when provided', () => {
    const description = 'Please enter a valid email address'
    render(<FormField label="Email" description={description} />)
    
    expect(screen.getByText(description)).toBeInTheDocument()
    expect(screen.getByText(description)).toHaveClass('text-muted-foreground')
  })

  test('displays error message and applies error styling', () => {
    const errorMessage = 'This field is required'
    render(<FormField label="Username" error={errorMessage} />)
    
    const errorElement = screen.getByRole('alert')
    const input = screen.getByRole('textbox')
    
    expect(errorElement).toBeInTheDocument()
    expect(errorElement).toHaveTextContent(errorMessage)
    expect(input).toHaveClass('border-destructive')
  })

  test('passes through input props correctly', async () => {
    const handleChange = vi.fn()
    const user = userEvent.setup()
    
    render(
      <FormField 
        label="Test Input" 
        placeholder="Enter text"
        onChange={handleChange}
        type="email"
      />
    )
    
    const input = screen.getByRole('textbox')
    expect(input).toHaveAttribute('placeholder', 'Enter text')
    expect(input).toHaveAttribute('type', 'email')
    
    await user.type(input, 'test@example.com')
    expect(handleChange).toHaveBeenCalled()
  })

  test('applies custom className to container', () => {
    render(<FormField label="Test" className="custom-field-class" />)
    
    const input = screen.getByRole('textbox')
    const container = input.parentElement
    expect(container).toHaveClass('custom-field-class')
  })

  test('handles disabled state correctly', () => {
    render(<FormField label="Disabled Field" disabled />)
    
    const input = screen.getByRole('textbox')
    const label = screen.getByText('Disabled Field')
    
    expect(input).toBeDisabled()
    expect(label).toHaveClass('peer-disabled:cursor-not-allowed', 'peer-disabled:opacity-70')
  })

  test('combines all features correctly', () => {
    render(
      <FormField 
        label="Complex Field"
        description="This is a complex field"
        error="Something went wrong"
        required
        placeholder="Enter value"
        className="custom-class"
        id="complex-field"
      />
    )
    
    expect(screen.getByText('Complex Field')).toBeInTheDocument()
    expect(screen.getByText('*')).toBeInTheDocument()
    expect(screen.getByText('This is a complex field')).toBeInTheDocument()
    expect(screen.getByRole('alert')).toHaveTextContent('Something went wrong')
    expect(screen.getByRole('textbox')).toHaveAttribute('placeholder', 'Enter value')
    expect(screen.getByRole('textbox')).toHaveAttribute('id', 'complex-field')
  })

  test('handles label with special characters', () => {
    render(<FormField label="Email & Phone Number" />)
    
    const input = screen.getByRole('textbox')
    expect(input).toHaveAttribute('id', 'field-email-&-phone-number')
  })

  test('maintains accessibility attributes', () => {
    render(<FormField label="Accessible Field" required error="Error message" />)
    
    const input = screen.getByRole('textbox')
    expect(input).toHaveAttribute('aria-required', 'true')
    expect(input).toHaveAttribute('aria-invalid', 'true')
  })
})