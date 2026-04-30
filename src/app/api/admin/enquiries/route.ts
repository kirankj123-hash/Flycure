import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'
import { auth } from '@/lib/auth'
import { RBAC } from '@/lib/auth'

// Admin actions schema
const adminActionSchema = z.object({
  action: z.enum(['approve', 'reject', 'assign', 'update_status']),
  enquiryId: z.string().min(1),
  reason: z.string().optional(),
  assignedTo: z.string().optional(),
  newStatus: z.enum(['pending', 'reviewing', 'approved', 'rejected', 'completed']).optional(),
})

/**
 * GET /api/admin/enquiries
 * Get all enquiries for admin dashboard
 */
export async function GET(request: NextRequest) {
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

    const { searchParams } = new URL(request.url)
    const page = parseInt(searchParams.get('page') || '1')
    const limit = parseInt(searchParams.get('limit') || '20')
    const status = searchParams.get('status')
    const treatmentType = searchParams.get('treatmentType')

        // Database integration pending - using mock data for MVP
    // Will implement proper filtering and pagination in next phase
    const mockEnquiries = [
      {
        id: 'enq_12345',
        userId: 'user_123',
        firstName: 'John',
        lastName: 'Doe',
        email: 'john.doe@example.com',
        phone: '+1234567890',
        treatmentType: 'cardiac-surgery',
        medicalCondition: 'Heart valve replacement needed',
        urgencyLevel: 'high',
        country: 'USA',
        city: 'New York',
        budgetRange: '25k-50k',
        status: 'pending',
        createdAt: '2024-01-15T10:00:00Z',
        updatedAt: '2024-01-15T10:00:00Z',
      },
      {
        id: 'enq_12346',
        userId: 'user_124',
        firstName: 'Jane',
        lastName: 'Smith',
        email: 'jane.smith@example.com',
        phone: '+1234567891',
        treatmentType: 'orthopedic',
        medicalCondition: 'Knee replacement surgery required',
        urgencyLevel: 'medium',
        country: 'Canada',
        city: 'Toronto',
        budgetRange: '10k-25k',
        status: 'reviewing',
        createdAt: '2024-01-14T15:30:00Z',
        updatedAt: '2024-01-15T09:00:00Z',
      }
    ]

    // Apply filters
    let filteredEnquiries = mockEnquiries
    if (status) {
      filteredEnquiries = filteredEnquiries.filter(e => e.status === status)
    }
    if (treatmentType) {
      filteredEnquiries = filteredEnquiries.filter(e => e.treatmentType === treatmentType)
    }

    // Apply pagination
    const total = filteredEnquiries.length
    const startIndex = (page - 1) * limit
    const paginatedEnquiries = filteredEnquiries.slice(startIndex, startIndex + limit)

    return NextResponse.json({
      success: true,
      enquiries: paginatedEnquiries,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
        hasNext: startIndex + limit < total,
        hasPrev: page > 1,
      },
      filters: {
        status,
        treatmentType,
      }
    })

  } catch (error) {
    console.error('❌ Error fetching admin enquiries:', error)
    
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

/**
 * PATCH /api/admin/enquiries
 * Update enquiry status or assign to healthcare provider
 */
export async function PATCH(request: NextRequest) {
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

    // Validate request data
    const body = await request.json()
    const validation = adminActionSchema.safeParse(body)
    
    if (!validation.success) {
      return NextResponse.json(
        {
          error: 'Validation failed',
          details: validation.error.errors.map(err => ({
            field: err.path.join('.'),
            message: err.message,
          }))
        },
        { status: 400 }
      )
    }

    const actionData = validation.data

    // TODO: Update database
    console.log('👤 Admin action performed:', {
      adminId: session.user.id,
      adminEmail: session.user.email,
      action: actionData.action,
      enquiryId: actionData.enquiryId,
      newStatus: actionData.newStatus,
      assignedTo: actionData.assignedTo,
      reason: actionData.reason,
    })

    // Mock response
    const updatedEnquiry = {
      id: actionData.enquiryId,
      status: actionData.newStatus || 'pending',
      assignedTo: actionData.assignedTo,
      updatedAt: new Date().toISOString(),
      updatedBy: session.user.id,
      updateReason: actionData.reason,
    }

    // TODO: Trigger notifications
    // - Notify patient of status change
    // - Notify assigned healthcare provider
    // - Log audit trail

    return NextResponse.json({
      success: true,
      enquiry: updatedEnquiry,
      message: `Enquiry ${actionData.action} successfully`
    })

  } catch (error: unknown) {
    console.error('❌ Error processing admin action:', error)
    
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}