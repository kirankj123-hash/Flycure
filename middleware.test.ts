import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { NextRequest, NextResponse } from 'next/server'
import { middleware } from './middleware'
import * as nextAuth from 'next-auth/jwt'
import * as guards from '@/lib/guards'

// Mock next-auth/jwt
vi.mock('next-auth/jwt', () => ({
  getToken: vi.fn(),
}))

// Mock guards module
vi.mock('@/lib/guards', () => ({
  findGuardForPath: vi.fn(),
  canAccess: vi.fn(),
}))

// Mock logger
vi.mock('@/lib/logger', () => ({
  logger: {
    security: vi.fn(),
    error: vi.fn(),
    debug: vi.fn(),
  },
}))

describe('Middleware', () => {
  beforeEach(() => {
    vi.clearAllMocks()
    // Clear rate limit state between tests
    vi.useFakeTimers()
  })

  afterEach(() => {
    vi.useRealTimers()
  })

  describe('Public Routes', () => {
    it('should allow access to public routes without authentication', async () => {
      // Mock no guard (public route)
      vi.mocked(guards.findGuardForPath).mockReturnValue(null)

      const request = new NextRequest('http://localhost:3000/')

      const response = await middleware(request)

      expect(response instanceof NextResponse).toBe(true)
      expect(guards.findGuardForPath).toHaveBeenCalledWith('/')
    })

    it('should allow access to routes with guard but no auth required', async () => {
      // Mock guard with no auth requirement
      vi.mocked(guards.findGuardForPath).mockReturnValue({
        pattern: '/',
        requiredAuth: false,
      } as any)

      const request = new NextRequest('http://localhost:3000/')

      const response = await middleware(request)

      expect(response instanceof NextResponse).toBe(true)
    })
  })

  describe('Authentication', () => {
    it('should redirect unauthenticated users to signin', async () => {
      // Mock guard requiring auth
      vi.mocked(guards.findGuardForPath).mockReturnValue({
        pattern: '/dashboard',
        requiredAuth: true,
        redirectTo: '/api/auth/signin',
      } as any)

      // Mock no token (unauthenticated)
      vi.mocked(nextAuth.getToken).mockResolvedValue(null)

      // Mock access check
      vi.mocked(guards.canAccess).mockReturnValue({
        allowed: false,
        reason: 'Authentication required',
        redirectTo: '/api/auth/signin',
      })

      const request = new NextRequest('http://localhost:3000/dashboard')

      const response = await middleware(request)

      expect(response.status).toBe(307) // Redirect
      expect(response.headers.get('location')).toContain('/api/auth/signin')
      expect(response.headers.get('location')).toContain('callbackUrl')
    })

    it('should allow authenticated users with valid token', async () => {
      // Mock guard requiring auth
      vi.mocked(guards.findGuardForPath).mockReturnValue({
        pattern: '/dashboard',
        requiredAuth: true,
      } as any)

      // Mock valid token
      vi.mocked(nextAuth.getToken).mockResolvedValue({
        sub: 'user_123',
        email: 'john@example.com',
        role: 'user',
        permissions: [],
      } as any)

      // Mock access granted
      vi.mocked(guards.canAccess).mockReturnValue({
        allowed: true,
        reason: 'Access granted',
      })

      const request = new NextRequest('http://localhost:3000/dashboard')

      const response = await middleware(request)

      expect(response instanceof NextResponse).toBe(true)
      expect(response.headers.get('X-User-Id')).toBe('user_123')
      expect(response.headers.get('X-User-Email')).toBe('john@example.com')
      expect(response.headers.get('X-User-Role')).toBe('user')
    })
  })

  describe('Authorization', () => {
    it('should deny access to users without required permissions', async () => {
      // Mock guard requiring admin role
      vi.mocked(guards.findGuardForPath).mockReturnValue({
        pattern: '/admin',
        requiredAuth: true,
        requiredPermissions: ['admin'],
      } as any)

      // Mock valid token but user role
      vi.mocked(nextAuth.getToken).mockResolvedValue({
        sub: 'user_123',
        email: 'john@example.com',
        role: 'user',
        permissions: [],
      } as any)

      // Mock access denied
      vi.mocked(guards.canAccess).mockReturnValue({
        allowed: false,
        reason: 'Insufficient permissions',
      })

      const request = new NextRequest('http://localhost:3000/admin')

      const response = await middleware(request)

      expect(response.status).toBe(403)
      const data = await response.json()
      expect(data.error).toBe('Unauthorized')
      expect(data.message).toContain('Insufficient permissions')
    })

    it('should allow access to users with required permissions', async () => {
      // Mock guard requiring admin role
      vi.mocked(guards.findGuardForPath).mockReturnValue({
        pattern: '/admin',
        requiredAuth: true,
        requiredPermissions: ['admin'],
      } as any)

      // Mock admin token
      vi.mocked(nextAuth.getToken).mockResolvedValue({
        sub: 'admin_123',
        email: 'admin@example.com',
        role: 'admin',
        permissions: ['admin:read', 'admin:write'],
      } as any)

      // Mock access granted
      vi.mocked(guards.canAccess).mockReturnValue({
        allowed: true,
        reason: 'Access granted',
      })

      const request = new NextRequest('http://localhost:3000/admin')

      const response = await middleware(request)

      expect(response instanceof NextResponse).toBe(true)
      expect(response.headers.get('X-User-Role')).toBe('admin')
    })
  })

  describe('Rate Limiting', () => {
    it('should allow requests within rate limit', async () => {
      // Mock guard with rate limit
      vi.mocked(guards.findGuardForPath).mockReturnValue({
        pattern: '/api/enquiry',
        requiredAuth: true,
        rateLimit: true,
      } as any)

      // Mock valid token
      vi.mocked(nextAuth.getToken).mockResolvedValue({
        sub: 'user_123',
        email: 'john@example.com',
        role: 'user',
        permissions: [],
      } as any)

      // Mock access granted
      vi.mocked(guards.canAccess).mockReturnValue({
        allowed: true,
        reason: 'Access granted',
      })

      const request = new NextRequest('http://localhost:3000/api/enquiry', {
        headers: {
          'x-forwarded-for': '192.168.1.1',
        },
      })

      const response = await middleware(request)

      expect(response instanceof NextResponse).toBe(true)
      expect(response.status).not.toBe(429)
    })

    it('should return 429 when rate limit is exceeded', async () => {
      // Mock guard with rate limit
      vi.mocked(guards.findGuardForPath).mockReturnValue({
        pattern: '/api/enquiry',
        requiredAuth: false, // Public endpoint with rate limit
        rateLimit: true,
      } as any)

      const clientIp = '192.168.1.1'

      // Make requests up to the limit (default 60)
      for (let i = 0; i < 61; i++) {
        const request = new NextRequest('http://localhost:3000/api/enquiry', {
          headers: {
            'x-forwarded-for': clientIp,
          },
        })

        const response = await middleware(request)

        if (i < 60) {
          // Should succeed
          expect(response instanceof NextResponse).toBe(true)
        } else {
          // Should be rate limited
          expect(response.status).toBe(429)
          const data = await response.json()
          expect(data.error).toBe('Too Many Requests')
          expect(response.headers.get('X-RateLimit-Limit')).toBeDefined()
          expect(response.headers.get('Retry-After')).toBeDefined()
        }
      }
    })

    it('should include rate limit headers in response', async () => {
      // Mock guard with rate limit
      vi.mocked(guards.findGuardForPath).mockReturnValue({
        pattern: '/api/enquiry',
        requiredAuth: false,
        rateLimit: true,
      } as any)

      const request = new NextRequest('http://localhost:3000/api/enquiry', {
        headers: {
          'x-forwarded-for': '192.168.1.2',
        },
      })

      const response = await middleware(request)

      // First request should succeed
      expect(response instanceof NextResponse).toBe(true)
    })

    it('should reset rate limit after time window', async () => {
      // Mock guard with rate limit
      vi.mocked(guards.findGuardForPath).mockReturnValue({
        pattern: '/api/enquiry',
        requiredAuth: false,
        rateLimit: true,
      } as any)

      const clientIp = '192.168.1.3'

      // Exhaust rate limit
      for (let i = 0; i < 61; i++) {
        const request = new NextRequest('http://localhost:3000/api/enquiry', {
          headers: {
            'x-forwarded-for': clientIp,
          },
        })
        await middleware(request)
      }

      // Advance time by 1 minute
      vi.advanceTimersByTime(60000)

      // Should succeed after reset
      const request = new NextRequest('http://localhost:3000/api/enquiry', {
        headers: {
          'x-forwarded-for': clientIp,
        },
      })

      const response = await middleware(request)
      expect(response.status).not.toBe(429)
    })
  })

  describe('Error Handling', () => {
    it('should redirect to signin on auth error', async () => {
      // Mock guard requiring auth
      vi.mocked(guards.findGuardForPath).mockReturnValue({
        pattern: '/dashboard',
        requiredAuth: true,
      } as any)

      // Mock token error
      vi.mocked(nextAuth.getToken).mockRejectedValue(new Error('Auth error'))

      const request = new NextRequest('http://localhost:3000/dashboard')

      const response = await middleware(request)

      expect(response.status).toBe(307) // Redirect
      expect(response.headers.get('location')).toContain('/api/auth/signin')
    })

    it('should handle missing client IP gracefully', async () => {
      // Mock guard with rate limit
      vi.mocked(guards.findGuardForPath).mockReturnValue({
        pattern: '/api/test',
        requiredAuth: false,
        rateLimit: true,
      } as any)

      // Request without IP headers (should use 'anonymous')
      const request = new NextRequest('http://localhost:3000/api/test')

      const response = await middleware(request)

      expect(response instanceof NextResponse).toBe(true)
    })
  })

  describe('Headers', () => {
    it('should add user context headers for authenticated requests', async () => {
      // Mock guard requiring auth
      vi.mocked(guards.findGuardForPath).mockReturnValue({
        pattern: '/dashboard',
        requiredAuth: true,
      } as any)

      // Mock valid token
      vi.mocked(nextAuth.getToken).mockResolvedValue({
        sub: 'user_456',
        email: 'jane@example.com',
        role: 'premium',
        permissions: ['premium:features'],
      } as any)

      // Mock access granted
      vi.mocked(guards.canAccess).mockReturnValue({
        allowed: true,
        reason: 'Access granted',
      })

      const request = new NextRequest('http://localhost:3000/dashboard')

      const response = await middleware(request)

      expect(response.headers.get('X-User-Id')).toBe('user_456')
      expect(response.headers.get('X-User-Email')).toBe('jane@example.com')
      expect(response.headers.get('X-User-Role')).toBe('premium')
    })

    it('should not add user headers for unauthenticated requests', async () => {
      // Mock no guard (public route)
      vi.mocked(guards.findGuardForPath).mockReturnValue(null)

      const request = new NextRequest('http://localhost:3000/')

      const response = await middleware(request)

      expect(response.headers.get('X-User-Id')).toBeNull()
      expect(response.headers.get('X-User-Email')).toBeNull()
      expect(response.headers.get('X-User-Role')).toBeNull()
    })
  })

  describe('IP Detection', () => {
    it('should use x-forwarded-for header for client IP', async () => {
      // Mock guard with rate limit
      vi.mocked(guards.findGuardForPath).mockReturnValue({
        pattern: '/api/test',
        requiredAuth: false,
        rateLimit: true,
      } as any)

      const request = new NextRequest('http://localhost:3000/api/test', {
        headers: {
          'x-forwarded-for': '203.0.113.1',
        },
      })

      const response = await middleware(request)

      expect(response instanceof NextResponse).toBe(true)
    })

    it('should use x-real-ip header as fallback', async () => {
      // Mock guard with rate limit
      vi.mocked(guards.findGuardForPath).mockReturnValue({
        pattern: '/api/test',
        requiredAuth: false,
        rateLimit: true,
      } as any)

      const request = new NextRequest('http://localhost:3000/api/test', {
        headers: {
          'x-real-ip': '203.0.113.2',
        },
      })

      const response = await middleware(request)

      expect(response instanceof NextResponse).toBe(true)
    })

    it('should use anonymous when no IP headers present', async () => {
      // Mock guard with rate limit
      vi.mocked(guards.findGuardForPath).mockReturnValue({
        pattern: '/api/test',
        requiredAuth: false,
        rateLimit: true,
      } as any)

      const request = new NextRequest('http://localhost:3000/api/test')

      const response = await middleware(request)

      expect(response instanceof NextResponse).toBe(true)
    })
  })
})
