import { describe, it, expect, vi, beforeEach } from 'vitest'
import { GET } from './route'
import * as observability from '@/lib/observability'

// Mock the observability module
vi.mock('@/lib/observability', () => ({
  HealthChecks: {
    getHealthStatus: vi.fn(),
  },
}))

// Mock logger
vi.mock('@/lib/logger', () => ({
  logger: {
    error: vi.fn(),
  },
}))

describe('GET /api/health', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('should return 200 when system is healthy', async () => {
    // Mock healthy status
    vi.mocked(observability.HealthChecks.getHealthStatus).mockResolvedValue({
      healthy: true,
      timestamp: new Date().toISOString(),
      services: {
        database: { healthy: true, latency: 50 },
        auth: { healthy: true, latency: 10 },
        payment: { healthy: true, latency: 25 },
        notification: { healthy: true, latency: 15 },
      },
      uptime: 123456,
      memory: {
        rss: 100000000,
        heapTotal: 50000000,
        heapUsed: 30000000,
        external: 1000000,
        arrayBuffers: 500000,
      },
      version: '1.0.0',
      environment: 'test',
    } as any)

    const response = await GET()
    const data = await response.json()

    expect(response.status).toBe(200)
    expect(data.healthy).toBe(true)
    expect(data.services).toBeDefined()
    expect(data.uptime).toBeDefined()
    expect(data.memory).toBeDefined()
  })

  it('should return 503 when system is unhealthy', async () => {
    // Mock unhealthy status
    vi.mocked(observability.HealthChecks.getHealthStatus).mockResolvedValue({
      healthy: false,
      timestamp: new Date().toISOString(),
      services: {
        database: { healthy: false }, // Database down
      },
      uptime: 123456,
      memory: {
        rss: 100000000,
        heapTotal: 50000000,
        heapUsed: 30000000,
        external: 1000000,
        arrayBuffers: 500000,
      },
      version: '1.0.0',
      environment: 'test',
    })

    const response = await GET()
    const data = await response.json()

    expect(response.status).toBe(503)
    expect(data.healthy).toBe(false)
  })

  it('should return health check data structure', async () => {
    // Mock healthy status
    vi.mocked(observability.HealthChecks.getHealthStatus).mockResolvedValue({
      healthy: true,
      timestamp: '2025-10-01T00:00:00.000Z',
      services: {
        database: { healthy: true, latency: 50 },
        auth: { healthy: true, latency: 10 },
        payment: { healthy: true, latency: 25 },
        notification: { healthy: true, latency: 15 },
      },
      uptime: 123456,
      memory: {
        rss: 100000000,
        heapTotal: 50000000,
        heapUsed: 30000000,
        external: 1000000,
        arrayBuffers: 500000,
      },
      version: '1.0.0',
      environment: 'test',
    } as any)

    const response = await GET()
    const data = await response.json()

    expect(data).toHaveProperty('healthy')
    expect(data).toHaveProperty('timestamp')
    expect(data).toHaveProperty('services')
    expect(data).toHaveProperty('uptime')
    expect(data).toHaveProperty('memory')
    expect(data).toHaveProperty('version')
    expect(data).toHaveProperty('environment')
  })

  it('should return 503 when health check throws error', async () => {
    // Mock error
    vi.mocked(observability.HealthChecks.getHealthStatus).mockRejectedValue(
      new Error('Health check failed')
    )

    const response = await GET()
    const data = await response.json()

    expect(response.status).toBe(503)
    expect(data.healthy).toBe(false)
    expect(data.error).toBe('Health check failed')
    expect(data.timestamp).toBeDefined()
  })

  it('should include all service statuses', async () => {
    // Mock healthy status
    vi.mocked(observability.HealthChecks.getHealthStatus).mockResolvedValue({
      healthy: true,
      timestamp: new Date().toISOString(),
      services: {
        database: { healthy: true, latency: 50 },
        auth: { healthy: true, latency: 10 },
        payment: { healthy: true, latency: 25 },
        notification: { healthy: true, latency: 15 },
      },
      uptime: 123456,
      memory: {
        rss: 100000000,
        heapTotal: 50000000,
        heapUsed: 30000000,
        external: 1000000,
        arrayBuffers: 500000,
      },
      version: '1.0.0',
      environment: 'test',
    } as any)

    const response = await GET()
    const data = await response.json()

    expect(data.services).toHaveProperty('database')
    expect(data.services).toHaveProperty('auth')
    expect(data.services).toHaveProperty('payment')
    expect(data.services).toHaveProperty('notification')
  })

  it('should include latency for healthy services', async () => {
    // Mock healthy status
    vi.mocked(observability.HealthChecks.getHealthStatus).mockResolvedValue({
      healthy: true,
      timestamp: new Date().toISOString(),
      services: {
        database: { healthy: true, latency: 50 },
        auth: { healthy: true, latency: 10 },
        payment: { healthy: true, latency: 25 },
        notification: { healthy: true, latency: 15 },
      },
      uptime: 123456,
      memory: {
        rss: 100000000,
        heapTotal: 50000000,
        heapUsed: 30000000,
        external: 1000000,
        arrayBuffers: 500000,
      },
      version: '1.0.0',
      environment: 'test',
    } as any)

    const response = await GET()
    const data = await response.json()

    expect(data.services.database.latency).toBeDefined()
    expect(data.services.auth.latency).toBeDefined()
    expect(data.services.payment.latency).toBeDefined()
    expect(data.services.notification.latency).toBeDefined()
  })

  it('should include memory usage information', async () => {
    // Mock healthy status
    vi.mocked(observability.HealthChecks.getHealthStatus).mockResolvedValue({
      healthy: true,
      timestamp: new Date().toISOString(),
      services: {
        database: { healthy: true, latency: 50 },
        auth: { healthy: true, latency: 10 },
        payment: { healthy: true, latency: 25 },
        notification: { healthy: true, latency: 15 },
      },
      uptime: 123456,
      memory: {
        rss: 100000000,
        heapTotal: 50000000,
        heapUsed: 30000000,
        external: 1000000,
        arrayBuffers: 500000,
      },
      version: '1.0.0',
      environment: 'test',
    } as any)

    const response = await GET()
    const data = await response.json()

    expect(data.memory).toHaveProperty('rss')
    expect(data.memory).toHaveProperty('heapTotal')
    expect(data.memory).toHaveProperty('heapUsed')
    expect(data.memory).toHaveProperty('external')
  })
})
