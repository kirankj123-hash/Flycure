import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { getToken } from 'next-auth/jwt'

// Environment variables (validated in lib/env.ts)
const NEXTAUTH_SECRET = process.env.NEXTAUTH_SECRET
const RATE_LIMIT_PER_MINUTE = Number(process.env.RATE_LIMIT_REQUESTS_PER_MINUTE) || 60

// In-memory rate limiting (for development/simple deployments)
const rateLimit = new Map<string, { count: number; resetTime: number }>()

/**
 * Simple in-memory rate limiting
 * In production, consider using Redis or external rate limiting service
 */
function checkRateLimit(identifier: string): {
  success: boolean
  limit: number
  remaining: number
  reset: number
} {
  const now = Date.now()
  const windowStart = Math.floor(now / 60000) * 60000 // 1 minute window
  const resetTime = windowStart + 60000

  const key = `${identifier}:${windowStart}`
  const current = rateLimit.get(key) || { count: 0, resetTime }

  // Clean old entries
  if (current.resetTime <= now) {
    rateLimit.delete(key)
    current.count = 0
    current.resetTime = resetTime
  }

  current.count += 1
  rateLimit.set(key, current)

  const remaining = Math.max(0, RATE_LIMIT_PER_MINUTE - current.count)
  const success = current.count <= RATE_LIMIT_PER_MINUTE

  return {
    success,
    limit: RATE_LIMIT_PER_MINUTE,
    remaining,
    reset: resetTime,
  }
}

// Protected routes that require authentication
const protectedPaths = [
  '/dashboard',
  '/settings',
  '/profile',
  '/admin',
  '/api/protected',
]

// Admin-only routes
const adminPaths = [
  '/admin',
  '/api/admin',
]

// Public API routes that need rate limiting
const publicApiPaths = [
  '/api/enquiry',
  '/api/contact',
  '/api/subscribe',
]

/**
 * Middleware for authentication, authorization, and rate limiting
 * Runs on every request to protected routes and API endpoints
 */
export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl
  const clientIp = request.headers.get('x-forwarded-for') ?? 
                   request.headers.get('x-real-ip') ?? 
                   'anonymous'

  // Apply rate limiting to API routes and sensitive endpoints
  if (pathname.startsWith('/api') || publicApiPaths.some(path => pathname.startsWith(path))) {
    try {
      const { success, limit, reset, remaining } = checkRateLimit(
        `${clientIp}_${pathname}`
      )

      if (!success) {
        console.warn(`🚫 Rate limit exceeded for ${clientIp} on ${pathname}`)
        
        return new NextResponse(
          JSON.stringify({
            error: 'Too Many Requests',
            message: 'Rate limit exceeded. Please try again later.',
            retryAfter: Math.round((reset - Date.now()) / 1000),
          }),
          {
            status: 429,
            headers: {
              'Content-Type': 'application/json',
              'X-RateLimit-Limit': limit.toString(),
              'X-RateLimit-Remaining': remaining.toString(),
              'X-RateLimit-Reset': reset.toString(),
              'Retry-After': Math.round((reset - Date.now()) / 1000).toString(),
            },
          }
        )
      }

      // Add rate limit headers to successful responses
      const response = NextResponse.next()
      response.headers.set('X-RateLimit-Limit', limit.toString())
      response.headers.set('X-RateLimit-Remaining', remaining.toString())
      response.headers.set('X-RateLimit-Reset', reset.toString())
    } catch (error) {
      console.error('❌ Rate limiting error:', error)
      // Continue without rate limiting on error (fail open)
    }
  }

  // Check authentication for protected routes
  const isProtectedPath = protectedPaths.some(path => pathname.startsWith(path))
  const isAdminPath = adminPaths.some(path => pathname.startsWith(path))

  if (isProtectedPath) {
    try {
      const token = await getToken({
        req: request,
        secret: NEXTAUTH_SECRET,
      })

      // Not authenticated - redirect to login
      if (!token) {
        console.log(`🔐 Unauthenticated access attempt to ${pathname} from ${clientIp}`)
        
        const loginUrl = new URL('/auth/signin', request.url)
        loginUrl.searchParams.set('callbackUrl', request.url)
        
        return NextResponse.redirect(loginUrl)
      }

      // Admin path requires admin role
      if (isAdminPath) {
        const userRoles = token.roles as string[] || []
        const isAdmin = userRoles.includes('admin') || userRoles.includes('super_admin')

        if (!isAdmin) {
          console.warn(`🚫 Unauthorized admin access attempt by ${token.email} to ${pathname}`)
          
          return new NextResponse(
            JSON.stringify({
              error: 'Forbidden',
              message: 'Insufficient permissions to access this resource.',
            }),
            {
              status: 403,
              headers: {
                'Content-Type': 'application/json',
              },
            }
          )
        }
      }

      // Add user context to headers for downstream processing
      const response = NextResponse.next()
      if (token.sub) {
        response.headers.set('X-User-Id', token.sub)
      }
      if (token.email) {
        response.headers.set('X-User-Email', token.email)
      }
      if (token.roles) {
        response.headers.set('X-User-Roles', JSON.stringify(token.roles))
      }

      return response
      
    } catch (error) {
      console.error('❌ Authentication middleware error:', error)
      
      // Redirect to login on auth error
      const loginUrl = new URL('/auth/signin', request.url)
      loginUrl.searchParams.set('error', 'AuthenticationError')
      
      return NextResponse.redirect(loginUrl)
    }
  }

  // Add security headers to all responses
  const response = NextResponse.next()
  
  // Security headers
  response.headers.set('X-Content-Type-Options', 'nosniff')
  response.headers.set('X-Frame-Options', 'DENY')
  response.headers.set('X-XSS-Protection', '1; mode=block')
  response.headers.set('Referrer-Policy', 'strict-origin-when-cross-origin')
  response.headers.set(
    'Permissions-Policy',
    'camera=(), microphone=(), geolocation=()'
  )

  return response
}

/**
 * Middleware configuration
 * Specify which paths should be processed by middleware
 */
export const config = {
  matcher: [
    // API routes
    '/api/:path*',
    
    // Protected application routes
    '/dashboard/:path*',
    '/settings/:path*',
    '/profile/:path*',
    '/admin/:path*',
    
    // Public routes that need rate limiting
    '/contact/:path*',
    
    // Exclude static files and internal Next.js routes
    '/((?!_next/static|_next/image|favicon.ico|public|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
}