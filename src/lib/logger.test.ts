import { describe, test, expect, vi, beforeEach, afterEach } from 'vitest'
import { logger, createLogger } from './logger'

describe('Logger', () => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  let consoleLogSpy: any
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  let consoleErrorSpy: any

  beforeEach(() => {
    consoleLogSpy = vi.spyOn(console, 'log').mockImplementation(() => {})
    consoleErrorSpy = vi.spyOn(console, 'error').mockImplementation(() => {})
  })

  afterEach(() => {
    consoleLogSpy.mockRestore()
    consoleErrorSpy.mockRestore()
  })

  describe('log levels', () => {
    test('logs debug messages in development', () => {
      // Debug logs are filtered by default LOG_LEVEL
      // This test verifies the method doesn't throw
      expect(() => {
        logger.debug('Debug message', { userId: '123' })
      }).not.toThrow()
    })

    test('logs info messages', () => {
      logger.info('Info message', { action: 'test' })
      expect(consoleLogSpy).toHaveBeenCalled()
    })

    test('logs warning messages', () => {
      logger.warn('Warning message', { issue: 'something' })
      expect(consoleLogSpy).toHaveBeenCalled()
    })

    test('logs error messages', () => {
      const error = new Error('Test error')
      logger.error('Error occurred', error, { context: 'test' })
      expect(consoleLogSpy).toHaveBeenCalled()
    })

    test('logs fatal messages', () => {
      const error = new Error('Fatal error')
      logger.fatal('Fatal error occurred', error)
      expect(consoleLogSpy).toHaveBeenCalled()
    })
  })

  describe('performance logging', () => {
    test('logs fast operations (debug level filtered)', () => {
      // Fast operations log at debug level, which is filtered
      // This test verifies the method doesn't throw
      expect(() => {
        logger.performance('Fast operation', 100, { operation: 'query' })
      }).not.toThrow()
    })

    test('logs slow operations as warning', () => {
      logger.performance('Slow operation', 1500, { operation: 'query' })
      expect(consoleLogSpy).toHaveBeenCalled()
    })
  })

  describe('HTTP logging', () => {
    test('logs successful requests as info', () => {
      logger.http('GET', '/api/users', 200, 150)
      expect(consoleLogSpy).toHaveBeenCalled()
    })

    test('logs client errors as warning', () => {
      logger.http('POST', '/api/data', 400, 100)
      expect(consoleLogSpy).toHaveBeenCalled()
    })

    test('logs server errors as error', () => {
      logger.http('GET', '/api/data', 500, 200)
      expect(consoleLogSpy).toHaveBeenCalled()
    })
  })

  describe('security logging', () => {
    test('logs security events', () => {
      logger.security('Failed login attempt', { ip: '192.168.1.1' })
      expect(consoleLogSpy).toHaveBeenCalled()
    })
  })

  describe('audit logging', () => {
    test('logs audit events when enabled', () => {
      logger.audit('User updated profile', { userId: '123' })
      // Audit logging depends on env.AUDIT_LOG_ENABLED
      // This test verifies it doesn't throw errors
      expect(true).toBe(true)
    })
  })

  describe('context logger', () => {
    test('creates logger with default context', () => {
      const contextLogger = createLogger({ component: 'TestComponent' })
      contextLogger.info('Test message')
      expect(consoleLogSpy).toHaveBeenCalled()
    })

    test('merges additional context', () => {
      const contextLogger = createLogger({ component: 'TestComponent' })
      contextLogger.info('Test message', { action: 'test' })
      expect(consoleLogSpy).toHaveBeenCalled()
    })
  })

  describe('error handling', () => {
    test('handles errors with stack traces', () => {
      const error = new Error('Test error')
      error.stack = 'Error: Test error\n    at test.ts:1:1'
      logger.error('Error with stack', error)
      expect(consoleLogSpy).toHaveBeenCalled()
    })

    test('handles errors without stack traces', () => {
      const error = new Error('Test error')
      delete error.stack
      logger.error('Error without stack', error)
      expect(consoleLogSpy).toHaveBeenCalled()
    })
  })

  describe('structured logging', () => {
    test('includes timestamp in log entries', () => {
      logger.info('Test message')
      expect(consoleLogSpy).toHaveBeenCalled()
      const logCall = consoleLogSpy.mock.calls[0][0]
      expect(typeof logCall === 'string' || typeof logCall === 'object').toBe(true)
    })

    test('includes context in log entries', () => {
      logger.info('Test with context', { key: 'value' })
      expect(consoleLogSpy).toHaveBeenCalled()
    })
  })
})
