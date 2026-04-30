/**
 * Error Boundary Component
 * 
 * Global error boundary for catching React rendering errors.
 * Provides graceful error recovery and detailed error logging.
 * 
 * Features:
 * - Catches React component errors
 * - Logs errors with context
 * - Shows user-friendly error UI
 * - Allows error recovery
 * - Development vs production modes
 */

'use client'

import React, { Component, type ReactNode, type ErrorInfo } from 'react'
import { logger } from '@/lib/logger'

export interface ErrorBoundaryProps {
  children: ReactNode
  fallback?: (error: Error, errorInfo: ErrorInfo, reset: () => void) => ReactNode
  onError?: (error: Error, errorInfo: ErrorInfo) => void
}

interface ErrorBoundaryState {
  hasError: boolean
  error: Error | null
  errorInfo: ErrorInfo | null
}

export class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props)
    this.state = {
      hasError: false,
      error: null,
      errorInfo: null,
    }
  }

  static getDerivedStateFromError(error: Error): Partial<ErrorBoundaryState> {
    return {
      hasError: true,
      error,
    }
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo): void {
    // Log error with context
    logger.error('React Error Boundary caught error', error, {
      componentStack: errorInfo.componentStack,
      errorBoundary: true,
    })

    // Call custom error handler if provided
    this.props.onError?.(error, errorInfo)

    // Update state with error info
    this.setState({
      errorInfo,
    })
  }

  handleReset = (): void => {
    this.setState({
      hasError: false,
      error: null,
      errorInfo: null,
    })
  }

  render(): ReactNode {
    if (this.state.hasError && this.state.error) {
      // Use custom fallback if provided
      if (this.props.fallback) {
        return this.props.fallback(
          this.state.error,
          this.state.errorInfo!,
          this.handleReset
        )
      }

      // Default error UI
      return <DefaultErrorFallback error={this.state.error} reset={this.handleReset} />
    }

    return this.props.children
  }
}

interface DefaultErrorFallbackProps {
  error: Error
  reset: () => void
}

function DefaultErrorFallback({ error, reset }: DefaultErrorFallbackProps): React.ReactElement {
  const isDevelopment = process.env.NODE_ENV === 'development'

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="max-w-2xl w-full bg-white rounded-lg shadow-lg p-8">
        <div className="flex items-center gap-4 mb-6">
          <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center">
            <svg
              className="w-6 h-6 text-red-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
              />
            </svg>
          </div>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Something went wrong</h1>
            <p className="text-gray-600 mt-1">
              We apologize for the inconvenience. An error has occurred.
            </p>
          </div>
        </div>

        {isDevelopment && (
          <div className="mb-6 p-4 bg-red-50 rounded-lg border border-red-200">
            <h2 className="text-sm font-semibold text-red-800 mb-2">Error Details (Development Mode)</h2>
            <div className="space-y-2">
              <div>
                <span className="text-xs font-medium text-red-700">Message:</span>
                <p className="text-sm text-red-900 mt-1 font-mono">{error.message}</p>
              </div>
              {error.stack && (
                <div>
                  <span className="text-xs font-medium text-red-700">Stack Trace:</span>
                  <pre className="text-xs text-red-900 mt-1 overflow-auto max-h-40 bg-red-100 p-2 rounded">
                    {error.stack}
                  </pre>
                </div>
              )}
            </div>
          </div>
        )}

        <div className="flex gap-4">
          <button
            onClick={reset}
            className="flex-1 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
          >
            Try Again
          </button>
          <button
            onClick={() => (window.location.href = '/')}
            className="flex-1 px-6 py-3 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors font-medium"
          >
            Go Home
          </button>
        </div>

        <p className="text-sm text-gray-500 mt-6 text-center">
          If this problem persists, please contact support.
        </p>
      </div>
    </div>
  )
}

/**
 * Hook for error boundaries in functional components
 * Use with React's error boundary API
 */
export function useErrorHandler(): (error: Error) => void {
  return React.useCallback((error: Error) => {
    logger.error('Error handler triggered', error)
    throw error
  }, [])
}
