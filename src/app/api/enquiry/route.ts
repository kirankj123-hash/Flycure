import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'
import { auth } from '@/lib/auth'
import { RBAC } from '@/lib/auth'

// Enhanced enquiry schema with more medical tourism fields
const enquirySchema = z.object({
  // Personal Information
  firstName: z.string().min(1, 'First name is required').max(100),
  lastName: z.string().min(1, 'Last name is required').max(100),
  email: z.string().email('Valid email is required'),
  phone: z.string().min(10, 'Valid phone number is required').max(20),
  dateOfBirth: z.string().optional(),
  
  // Location
  country: z.string().min(1, 'Country is required'),
  city: z.string().min(1, 'City is required'),
  
  // Medical Information
  treatmentType: z.enum([
    'cardiac-surgery',
    'oncology',
    'orthopedic',
    'cosmetic-surgery',
    'dental',
    'fertility',
    'neurology',
    'gastroenterology',
    'urology',
    'gynecology',
    'other'
  ]),
  medicalCondition: z.string().min(5, 'Please describe your medical condition').max(2000),
  urgencyLevel: z.enum(['low', 'medium', 'high', 'emergency']).default('medium'),
  
  // Preferences
  preferredCountries: z.array(z.string()).optional(),
  budgetRange: z.enum(['under-5k', '5k-10k', '10k-25k', '25k-50k', 'over-50k']).optional(),
  preferredTravelDate: z.string().optional(),
  
  // Additional Information
  insurance: z.boolean().default(false),
  insuranceProvider: z.string().optional(),
  additionalNotes: z.string().max(1000).optional(),
  
  // Consent
  privacyConsent: z.boolean().refine(val => val === true, {
    message: 'Privacy consent is required'
  }),
  marketingConsent: z.boolean().default(false),
})

export type EnquiryFormData = z.infer<typeof enquirySchema>

/**
 * Rate limiting and validation
 */
async function validateAndSanitizeRequest(request: NextRequest) {
  try {
    const body = await request.json()
    const validatedData = enquirySchema.parse(body)
    
    return { success: true, data: validatedData }
    } catch (error: unknown) {
      if (error instanceof z.ZodError) {
        return {
          success: false,
          errors: error.errors.map(err => ({
            field: err.path.join('.'),
            message: err.message,
          }))
        }
      }    return {
      success: false,
      errors: [{ field: 'general', message: 'Invalid request data' }]
    }
  }
}

/**
 * POST /api/enquiry
 * Create a new enquiry (protected route)
 */
export async function POST(request: NextRequest) {
  try {
    // Authentication check
    const session = await auth()
    
    if (!session?.user) {
      return NextResponse.json(
        { error: 'Authentication required' },
        { status: 401 }
      )
    }

    // Authorization check - users can create enquiries
    const userRoles = (session.user as Record<string, unknown>).roles as string[] || ['user']
    if (!RBAC.hasAnyRole(userRoles, RBAC.permissions.USER_ACCESS)) {
      return NextResponse.json(
        { error: 'Insufficient permissions' },
        { status: 403 }
      )
    }

    // Validate request data
    const validation = await validateAndSanitizeRequest(request)
    
    if (!validation.success) {
      return NextResponse.json(
        {
          error: 'Validation failed',
          details: validation.errors
        },
        { status: 400 }
      )
    }

    const enquiryData = validation.data!

    // TODO: Save to database
    // For now, just log and return success
    console.log('📩 New enquiry received:', {
      userId: session.user.id,
      userEmail: session.user.email,
      treatmentType: enquiryData.treatmentType,
      urgencyLevel: enquiryData.urgencyLevel,
      country: enquiryData.country,
    })

    // Simulate database save
    const enquiryId = `enq_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
    
    const savedEnquiry = {
      id: enquiryId,
      userId: session.user.id,
      ...enquiryData,
      status: 'pending',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    }

    // TODO: Trigger notifications
    // - Email confirmation to user
    // - Notify healthcare providers
    // - Add to admin dashboard

    return NextResponse.json({
      success: true,
      enquiry: savedEnquiry,
      message: 'Enquiry submitted successfully. You will receive a confirmation email shortly.'
    }, { status: 201 })

  } catch (error: unknown) {
    console.error('❌ Error processing enquiry:', error)
    
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

/**
 * GET /api/enquiry
 * Get user's enquiries (protected route)
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

    const userRoles = (session.user as Record<string, unknown>).roles as string[] || ['user']
    if (!RBAC.hasAnyRole(userRoles, RBAC.permissions.USER_ACCESS)) {
      return NextResponse.json(
        { error: 'Insufficient permissions' },
        { status: 403 }
      )
    }

    // Database fetch pending - returning mock data for MVP
    // Will integrate with actual database in next phase
    const mockEnquiries = [
      {
        id: 'enq_12345',
        userId: session.user.id,
        firstName: 'John',
        lastName: 'Doe',
        treatmentType: 'cardiac-surgery',
        urgencyLevel: 'high',
        status: 'pending',
        createdAt: '2024-01-15T10:00:00Z',
        updatedAt: '2024-01-15T10:00:00Z',
      }
    ]

    return NextResponse.json({
      success: true,
      enquiries: mockEnquiries,
      total: mockEnquiries.length
    })

  } catch (error: unknown) {
    console.error('❌ Error fetching enquiries:', error)
    
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}