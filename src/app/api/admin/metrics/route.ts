import { NextResponse } from 'next/server'
import { auth } from '@/lib/auth'
import { RBAC } from '@/lib/auth'
import { HealthChecks } from '@/lib/observability'
import os from 'os'

/**
 * GET /api/admin/metrics
 * System metrics for admin dashboard (requires admin access)
 */
export async function GET() {
  try {
    const session = await auth()
    
    if (!session?.user) {
      return NextResponse.json(
        { error: 'Authentication required' },
        { status: 401 }
      )
    }

    // Check admin permissions
    const userRoles = (session.user as Record<string, unknown>).roles as string[] || []
    if (!RBAC.hasAnyRole(userRoles, RBAC.permissions.ADMIN_ACCESS)) {
      return NextResponse.json(
        { error: 'Admin access required' },
        { status: 403 }
      )
    }

    // Get system metrics
    const healthStatus = await HealthChecks.getHealthStatus()
    
    // Add application-specific metrics
    const metrics = {
      ...healthStatus,
      application: {
        totalEnquiries: 150, // Mock data - would come from database
        activeUsers: 45,
        pendingReviews: 12,
        dailySignups: 8,
        conversionRate: 0.15,
      },
      performance: {
        avgResponseTime: 245, // ms
        errorRate: 0.002, // 0.2%
        throughput: 1250, // requests per hour
        uptime: '99.8%',
      },
      resources: {
        memory: process.memoryUsage(),
        cpu: {
          usage: '25%', // Mock - would use actual CPU monitoring
          cores: os.cpus().length,
        },
        disk: {
          usage: '45%', // Mock
          available: '2.1TB',
        },
      },
      alerts: [
        // Mock alerts - would come from monitoring system
        {
          id: 'alert-1',
          level: 'warning',
          message: 'API response time above 200ms',
          timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
        }
      ],
    }

    return NextResponse.json(metrics)

  } catch (error) {
    console.error('❌ Error fetching metrics:', error)
    
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}