import { describe, test, expect, vi } from 'vitest'
import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { EnquiryForm } from '@/components/organisms/EnquiryForm/EnquiryForm'

// Mock the enquiry service
vi.mock('@/services/enquiry-service', () => ({
  EnquiryService: {
    submit: vi.fn()
  }
}))

// Mock toast notifications
vi.mock('sonner', () => ({
  toast: {
    success: vi.fn(),
    error: vi.fn()
  }
}))

const renderWithQueryClient = (component: React.ReactElement) => {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: { retry: false },
      mutations: { retry: false }
    }
  })
  
  return render(
    <QueryClientProvider client={queryClient}>
      {component}
    </QueryClientProvider>
  )
}

describe('EnquiryForm Component', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  test('renders all form fields correctly', () => {
    renderWithQueryClient(<EnquiryForm />)
    
    expect(screen.getByLabelText(/first name/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/last name/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/email address/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/phone number/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/diagnosis type/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/additional notes/i)).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /submit enquiry/i })).toBeInTheDocument()
  })

  test('displays required field indicators', () => {
    renderWithQueryClient(<EnquiryForm />)
    
    const requiredFields = ['First Name', 'Last Name', 'Email Address', 'Phone Number', 'Diagnosis Type']
    
    requiredFields.forEach(fieldName => {
      const label = screen.getByText(fieldName)
      expect(label.parentElement).toHaveTextContent('*')
    })
  })

  test('shows validation errors for required fields', async () => {
    const user = userEvent.setup()
    renderWithQueryClient(<EnquiryForm />)
    
    const submitButton = screen.getByRole('button', { name: /submit enquiry/i })
    await user.click(submitButton)
    
    await waitFor(() => {
      expect(screen.getByText(/first name must be at least 2 characters/i)).toBeInTheDocument()
    })
  })

  test('validates email format correctly', async () => {
    const user = userEvent.setup()
    renderWithQueryClient(<EnquiryForm />)
    
    const emailInput = screen.getByLabelText(/email address/i)
    await user.type(emailInput, 'invalid-email')
    
    const submitButton = screen.getByRole('button', { name: /submit enquiry/i })
    await user.click(submitButton)
    
    await waitFor(() => {
      expect(screen.getByText(/please enter a valid email address/i)).toBeInTheDocument()
    })
  })

  test('validates phone number format', async () => {
    const user = userEvent.setup()
    renderWithQueryClient(<EnquiryForm />)
    
    const phoneInput = screen.getByLabelText(/phone number/i)
    await user.type(phoneInput, '123')
    
    const submitButton = screen.getByRole('button', { name: /submit enquiry/i })
    await user.click(submitButton)
    
    await waitFor(() => {
      expect(screen.getByText(/please enter a valid phone number/i)).toBeInTheDocument()
    })
  })

  test('provides diagnosis type options', () => {
    renderWithQueryClient(<EnquiryForm />)
    
    const diagnosisSelect = screen.getByLabelText(/diagnosis type/i)
    expect(diagnosisSelect).toBeInTheDocument()
    
    const options = screen.getAllByRole('option')
    const optionTexts = options.map(option => option.textContent)
    
    expect(optionTexts).toContain('Dental')
    expect(optionTexts).toContain('Orthopedic')
    expect(optionTexts).toContain('Cosmetic Surgery')
    expect(optionTexts).toContain('Cardiology')
    expect(optionTexts).toContain('Other')
  })

  test('handles form submission with valid data', async () => {
    const mockSubmit = vi.fn().mockResolvedValue({ 
      id: '123', 
      message: 'Success', 
      status: 'success',
      timestamp: new Date().toISOString()
    })
    
    const { EnquiryService } = await import('@/services/enquiry-service')
    EnquiryService.submit = mockSubmit
    
    const user = userEvent.setup()
    renderWithQueryClient(<EnquiryForm />)
    
    // Fill out the form
    await user.type(screen.getByLabelText(/first name/i), 'John')
    await user.type(screen.getByLabelText(/last name/i), 'Doe')
    await user.type(screen.getByLabelText(/email address/i), 'john.doe@example.com')
    await user.type(screen.getByLabelText(/phone number/i), '1234567890')
    await user.selectOptions(screen.getByLabelText(/diagnosis type/i), 'Dental')
    await user.type(screen.getByLabelText(/additional notes/i), 'Need dental consultation')
    
    const submitButton = screen.getByRole('button', { name: /submit enquiry/i })
    await user.click(submitButton)
    
    await waitFor(() => {
      expect(mockSubmit).toHaveBeenCalledWith({
        firstName: 'John',
        lastName: 'Doe',
        email: 'john.doe@example.com',
        phoneNumber: '1234567890',
        diagnosisType: 'Dental',
        notes: 'Need dental consultation'
      })
    })
  })

  test('calls onSuccess callback when form submission succeeds', async () => {
    const mockOnSuccess = vi.fn()
    const mockSubmit = vi.fn().mockResolvedValue({ 
      id: '123', 
      message: 'Success', 
      status: 'success',
      timestamp: new Date().toISOString()
    })
    
    const { EnquiryService } = await import('@/services/enquiry-service')
    EnquiryService.submit = mockSubmit
    
    const user = userEvent.setup()
    renderWithQueryClient(<EnquiryForm onSuccess={mockOnSuccess} />)
    
    // Fill out the form with valid data
    await user.type(screen.getByLabelText(/first name/i), 'John')
    await user.type(screen.getByLabelText(/last name/i), 'Doe')
    await user.type(screen.getByLabelText(/email address/i), 'john.doe@example.com')
    await user.type(screen.getByLabelText(/phone number/i), '1234567890')
    await user.selectOptions(screen.getByLabelText(/diagnosis type/i), 'Dental')
    
    const submitButton = screen.getByRole('button', { name: /submit enquiry/i })
    await user.click(submitButton)
    
    await waitFor(() => {
      expect(mockOnSuccess).toHaveBeenCalled()
    })
  })

  test('applies custom className', () => {
    renderWithQueryClient(<EnquiryForm className="custom-form-class" />)
    
    const form = document.querySelector('form')
    expect(form).toHaveClass('custom-form-class')
  })

  test('handles submission errors gracefully', async () => {
    const mockSubmit = vi.fn().mockRejectedValue(new Error('Network error'))
    
    const { EnquiryService } = await import('@/services/enquiry-service')
    EnquiryService.submit = mockSubmit
    
    const { toast } = await import('sonner')
    
    const user = userEvent.setup()
    renderWithQueryClient(<EnquiryForm />)
    
    // Fill out the form with valid data
    await user.type(screen.getByLabelText(/first name/i), 'John')
    await user.type(screen.getByLabelText(/last name/i), 'Doe')
    await user.type(screen.getByLabelText(/email address/i), 'john.doe@example.com')
    await user.type(screen.getByLabelText(/phone number/i), '1234567890')
    await user.selectOptions(screen.getByLabelText(/diagnosis type/i), 'Dental')
    
    const submitButton = screen.getByRole('button', { name: /submit enquiry/i })
    await user.click(submitButton)
    
    await waitFor(() => {
      expect(toast.error).toHaveBeenCalledWith('Failed to submit enquiry. Please try again.')
    })
  })

  test('disables submit button during submission', async () => {
    const mockSubmit = vi.fn().mockImplementation(() => new Promise(resolve => setTimeout(resolve, 1000)))
    
    const { EnquiryService } = await import('@/services/enquiry-service')
    EnquiryService.submit = mockSubmit
    
    const user = userEvent.setup()
    renderWithQueryClient(<EnquiryForm />)
    
    // Fill out the form with valid data
    await user.type(screen.getByLabelText(/first name/i), 'John')
    await user.type(screen.getByLabelText(/last name/i), 'Doe')
    await user.type(screen.getByLabelText(/email address/i), 'john.doe@example.com')
    await user.type(screen.getByLabelText(/phone number/i), '1234567890')
    await user.selectOptions(screen.getByLabelText(/diagnosis type/i), 'Dental')
    
    const submitButton = screen.getByRole('button', { name: /submit enquiry/i })
    await user.click(submitButton)
    
    // Button should be disabled during submission
    expect(submitButton).toBeDisabled()
  })

  test('resets form after successful submission', async () => {
    const mockSubmit = vi.fn().mockResolvedValue({ 
      id: '123', 
      message: 'Success', 
      status: 'success',
      timestamp: new Date().toISOString()
    })
    
    const { EnquiryService } = await import('@/services/enquiry-service')
    EnquiryService.submit = mockSubmit
    
    const user = userEvent.setup()
    renderWithQueryClient(<EnquiryForm />)
    
    const firstNameInput = screen.getByLabelText(/first name/i) as HTMLInputElement
    
    // Fill out and submit form
    await user.type(firstNameInput, 'John')
    await user.type(screen.getByLabelText(/last name/i), 'Doe')
    await user.type(screen.getByLabelText(/email address/i), 'john.doe@example.com')
    await user.type(screen.getByLabelText(/phone number/i), '1234567890')
    await user.selectOptions(screen.getByLabelText(/diagnosis type/i), 'Dental')
    
    const submitButton = screen.getByRole('button', { name: /submit enquiry/i })
    await user.click(submitButton)
    
    await waitFor(() => {
      expect(firstNameInput.value).toBe('')
    })
  })
})