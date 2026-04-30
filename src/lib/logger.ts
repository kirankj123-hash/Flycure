/**
 * Centralized Logging System
 * 
 * Structured logging with context, levels, and environment-aware output.
 * Replaces scattered console.* calls with production-ready logging.
 * 
 * Features:
 * - Environment-aware (dev: verbose, prod: structured)
 * - Log levels with filtering
 * - Structured context data
 * - Performance metrics
 * - Error tracking integration ready
 * 
 * @example
 * ```ts
 * logger.info('User logged in', { userId: '123' })
 * logger.error('API call failed', { error, endpoint: '/api/user' })
 * logger.performance('Database query', 250, { query: 'SELECT *' })
 * ```
 */

import { env } from './env'

export enum LogLevel {
  DEBUG = 0,
  INFO = 1,
  WARN = 2,
  ERROR = 3,
  FATAL = 4,
}

export interface LogContext {
  [key: string]: unknown
}

export interface LogEntry {
  timestamp: string
  level: string
  message: string
  context?: LogContext
  error?: {
    name: string
    message: string
    stack?: string
  }
}

class Logger {
  private readonly serviceName: string
  private readonly environment: string
  private readonly minLevel: LogLevel

  constructor() {
    this.serviceName = env.OTEL_SERVICE_NAME || 'flycure-frontend'
    this.environment = env.NODE_ENV
    this.minLevel = this.getMinLogLevel()
  }

  private getMinLogLevel(): LogLevel {
    const level = env.LOG_LEVEL || 'info'
    const levelMap: Record<string, LogLevel> = {
      debug: LogLevel.DEBUG,
      info: LogLevel.INFO,
      warn: LogLevel.WARN,
      error: LogLevel.ERROR,
    }
    return levelMap[level] || LogLevel.INFO
  }

  private shouldLog(level: LogLevel): boolean {
    return level >= this.minLevel
  }

  private formatMessage(
    level: LogLevel,
    message: string,
    context?: LogContext,
    error?: Error
  ): LogEntry {
    const entry: LogEntry = {
      timestamp: new Date().toISOString(),
      level: LogLevel[level],
      message,
    }

    if (context) {
      entry.context = {
        ...context,
        service: this.serviceName,
        environment: this.environment,
      }
    }

    if (error) {
      entry.error = {
        name: error.name,
        message: error.message,
        stack: error.stack,
      }
    }

    return entry
  }

  private output(entry: LogEntry, level: LogLevel): void {
    if (this.environment === 'development') {
      // Development: Colorful console output
      const colors = {
        [LogLevel.DEBUG]: '\x1b[36m', // Cyan
        [LogLevel.INFO]: '\x1b[32m', // Green
        [LogLevel.WARN]: '\x1b[33m', // Yellow
        [LogLevel.ERROR]: '\x1b[31m', // Red
        [LogLevel.FATAL]: '\x1b[35m', // Magenta
      }
      const reset = '\x1b[0m'
      const color = colors[level] || reset

      console.log(`${color}[${entry.level}]${reset} ${entry.message}`)
      if (entry.context) {
        console.log('  Context:', entry.context)
      }
      if (entry.error) {
        console.error('  Error:', entry.error)
      }
    } else {
      // Production: Structured JSON logs
      console.log(JSON.stringify(entry))
    }
  }

  /**
   * Debug level logging - verbose information for development
   */
  debug(message: string, context?: LogContext): void {
    if (!this.shouldLog(LogLevel.DEBUG)) return
    const entry = this.formatMessage(LogLevel.DEBUG, message, context)
    this.output(entry, LogLevel.DEBUG)
  }

  /**
   * Info level logging - general information about system operation
   */
  info(message: string, context?: LogContext): void {
    if (!this.shouldLog(LogLevel.INFO)) return
    const entry = this.formatMessage(LogLevel.INFO, message, context)
    this.output(entry, LogLevel.INFO)
  }

  /**
   * Warning level logging - potentially harmful situations
   */
  warn(message: string, context?: LogContext): void {
    if (!this.shouldLog(LogLevel.WARN)) return
    const entry = this.formatMessage(LogLevel.WARN, message, context)
    this.output(entry, LogLevel.WARN)
  }

  /**
   * Error level logging - error events that might still allow operation
   */
  error(message: string, error?: Error, context?: LogContext): void {
    if (!this.shouldLog(LogLevel.ERROR)) return
    const entry = this.formatMessage(LogLevel.ERROR, message, context, error)
    this.output(entry, LogLevel.ERROR)
  }

  /**
   * Fatal level logging - severe errors that cause termination
   */
  fatal(message: string, error?: Error, context?: LogContext): void {
    if (!this.shouldLog(LogLevel.FATAL)) return
    const entry = this.formatMessage(LogLevel.FATAL, message, context, error)
    this.output(entry, LogLevel.FATAL)
  }

  /**
   * Performance logging - track operation duration
   */
  performance(operation: string, durationMs: number, context?: LogContext): void {
    const perfContext = {
      ...context,
      duration_ms: durationMs,
      operation,
    }

    if (durationMs > 1000) {
      this.warn(`Slow operation: ${operation}`, perfContext)
    } else {
      this.debug(`Operation completed: ${operation}`, perfContext)
    }
  }

  /**
   * HTTP request logging
   */
  http(
    method: string,
    url: string,
    status: number,
    durationMs: number,
    context?: LogContext
  ): void {
    const httpContext = {
      ...context,
      method,
      url,
      status,
      duration_ms: durationMs,
    }

    const message = `${method} ${url} ${status} - ${durationMs}ms`

    if (status >= 500) {
      this.error(message, undefined, httpContext)
    } else if (status >= 400) {
      this.warn(message, httpContext)
    } else {
      this.info(message, httpContext)
    }
  }

  /**
   * Security event logging
   */
  security(event: string, context?: LogContext): void {
    this.warn(`🔒 Security Event: ${event}`, {
      ...context,
      security_event: true,
    })
  }

  /**
   * Audit logging for compliance
   */
  audit(action: string, context?: LogContext): void {
    if (!env.AUDIT_LOG_ENABLED) return

    this.info(`📋 Audit: ${action}`, {
      ...context,
      audit: true,
    })
  }
}

/**
 * Singleton logger instance
 */
export const logger = new Logger()

/**
 * Create a logger with specific context
 */
export function createLogger(context: LogContext): Logger {
  const contextLogger = new Logger()
  const originalMethods = {
    debug: contextLogger.debug.bind(contextLogger),
    info: contextLogger.info.bind(contextLogger),
    warn: contextLogger.warn.bind(contextLogger),
    error: contextLogger.error.bind(contextLogger),
    fatal: contextLogger.fatal.bind(contextLogger),
  }

  // Override methods to include context
  contextLogger.debug = (message: string, additionalContext?: LogContext) =>
    originalMethods.debug(message, { ...context, ...additionalContext })
  contextLogger.info = (message: string, additionalContext?: LogContext) =>
    originalMethods.info(message, { ...context, ...additionalContext })
  contextLogger.warn = (message: string, additionalContext?: LogContext) =>
    originalMethods.warn(message, { ...context, ...additionalContext })
  contextLogger.error = (message: string, error?: Error, additionalContext?: LogContext) =>
    originalMethods.error(message, error, { ...context, ...additionalContext })
  contextLogger.fatal = (message: string, error?: Error, additionalContext?: LogContext) =>
    originalMethods.fatal(message, error, { ...context, ...additionalContext })

  return contextLogger
}
