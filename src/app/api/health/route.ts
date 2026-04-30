import { NextResponse } from 'next/server'
import { HealthChecks } from '@/lib/observability'

/**
 * GET /api/health
 * Health check endpoint for load balancers and monitoring
 */
export async function GET() {
  try {
    const healthStatus = await HealthChecks.getHealthStatus()
    
    const status = healthStatus.healthy ? 200 : 503
    
    return NextResponse.json(healthStatus, { status })
  } catch (error) {
    console.error('❌ Health check failed:', error)
    
    return NextResponse.json(
      {
        healthy: false,
        error: 'Health check failed',
        timestamp: new Date().toISOString(),
      },
      { status: 503 }
    )
  }
}