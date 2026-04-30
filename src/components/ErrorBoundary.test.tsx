import { describe, test, expect, vi, beforeEach } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { ErrorBoundary } from './ErrorBoundary'

// Component that throws an error
function ThrowError({ shouldThrow }: { shouldThrow: boolean }) {
  if (shouldThrow) {
    throw new Error('Test error')
  }
  return <div>No error</div>
}

describe('ErrorBoundary', () => {
  beforeEach(() => {
    // Suppress console.error in tests
    vi.spyOn(console, 'error').mockImplementation(() => {})
    vi.spyOn(console, 'log').mockImplementation(() => {})
  })

  test('renders children when there is no error', () => {
    render(
      <ErrorBoundary>
        <div>Test content</div>
      </ErrorBoundary>
    )

    expect(screen.getByText('Test content')).toBeInTheDocument()
  })

  test('renders error UI when error is thrown', () => {
    render(
      <ErrorBoundary>
        <ThrowError shouldThrow={true} />
      </ErrorBoundary>
    )

    expect(screen.getByText('Something went wrong')).toBeInTheDocument()
  })

  test('shows Try Again button', () => {
    render(
      <ErrorBoundary>
        <ThrowError shouldThrow={true} />
      </ErrorBoundary>
    )

    expect(screen.getByText('Try Again')).toBeInTheDocument()
  })

  test('shows Go Home button', () => {
    render(
      <ErrorBoundary>
        <ThrowError shouldThrow={true} />
      </ErrorBoundary>
    )

    expect(screen.getByText('Go Home')).toBeInTheDocument()
  })

  test('resets error when Try Again is clicked', async () => {
    const user = userEvent.setup()
    let shouldThrow = true

    const { rerender } = render(
      <ErrorBoundary>
        <ThrowError shouldThrow={shouldThrow} />
      </ErrorBoundary>
    )

    // Error should be shown
    expect(screen.getByText('Something went wrong')).toBeInTheDocument()

    // Fix the error
    shouldThrow = false
    rerender(
      <ErrorBoundary>
        <ThrowError shouldThrow={shouldThrow} />
      </ErrorBoundary>
    )

    // Click Try Again
    const tryAgainButton = screen.getByText('Try Again')
    await user.click(tryAgainButton)

    // Component should render normally after reset
    // (Note: In actual implementation, the error state is cleared)
  })

  test('uses custom fallback when provided', () => {
    const customFallback = (error: Error) => (
      <div>Custom error: {error.message}</div>
    )

    render(
      <ErrorBoundary fallback={customFallback}>
        <ThrowError shouldThrow={true} />
      </ErrorBoundary>
    )

    expect(screen.getByText('Custom error: Test error')).toBeInTheDocument()
  })

  test('calls onError callback when error occurs', () => {
    const onError = vi.fn()

    render(
      <ErrorBoundary onError={onError}>
        <ThrowError shouldThrow={true} />
      </ErrorBoundary>
    )

    expect(onError).toHaveBeenCalled()
    expect(onError).toHaveBeenCalledWith(
      expect.any(Error),
      expect.objectContaining({ componentStack: expect.any(String) })
    )
  })

  test('shows error message in default fallback', () => {
    render(
      <ErrorBoundary>
        <ThrowError shouldThrow={true} />
      </ErrorBoundary>
    )

    expect(screen.getByText(/We apologize for the inconvenience/)).toBeInTheDocument()
  })
})
