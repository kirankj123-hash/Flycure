import { describe, it, expect, vi, beforeEach } from 'vitest'
import { NextRequest } from 'next/server'

// Mock modules before importing the route
vi.mock('@/lib/auth', () => ({
  auth: vi.fn(),
  RBAC: {
    permissions: {
      USER_ACCESS: ['user', 'premium', 'admin'],
      ADMIN_ACCESS: ['admin'],
      USER_MANAGEMENT: ['admin'],
      HEALTHCARE_PROVIDER: ['healthcare_provider', 'admin'],
      PATIENT_DATA_ACCESS: ['healthcare_provider', 'admin'],
      PROFILE_EDIT: ['user', 'premium', 'admin'],
    },
    hasAnyRole: (userRoles: string[], allowedRoles: string[]) => {
      return userRoles.some(role => allowedRoles.includes(role))
    },
  },
}))

vi.mock('@/lib/logger', () => ({
  logger: {
    info: vi.fn(),
    error: vi.fn(),
    audit: vi.fn(),
    security: vi.fn(),
  },
}))

// Import after mocks are defined
import { POST, GET } from './route'
import { auth } from '@/lib/auth'

describe('POST /api/enquiry', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('should return 401 when not authenticated', async () => {
    // Mock no session
    vi.mocked(auth).mockResolvedValue(null as any)

    const request = new NextRequest('http://localhost:3000/api/enquiry', {
      method: 'POST',
      body: JSON.stringify({
        firstName: 'John',
        lastName: 'Doe',
        email: 'john@example.com',
        phone: '+1234567890',
        country: 'US',
        city: 'New York',
        treatmentType: 'cardiac-surgery',
        medicalCondition: 'Heart condition requiring surgery',
        urgencyLevel: 'high',
        privacyConsent: true,
      }),
    })

    const response = await POST(request)
    const data = await response.json()

    expect(response.status).toBe(401)
    expect(data.error).toBe('Authentication required')
  })

  it('should return 403 when user lacks permissions', async () => {
    // Mock session with no roles
    vi.mocked(auth).mockResolvedValue({
      user: {
        id: 'user_123',
        email: 'john@example.com',
        roles: [], // No roles
      },
      expires: new Date(Date.now() + 86400000).toISOString(),
    } as any)

    const request = new NextRequest('http://localhost:3000/api/enquiry', {
      method: 'POST',
      body: JSON.stringify({
        firstName: 'John',
        lastName: 'Doe',
        email: 'john@example.com',
        phone: '+1234567890',
        country: 'US',
        city: 'New York',
        treatmentType: 'cardiac-surgery',
        medicalCondition: 'Heart condition requiring surgery',
        urgencyLevel: 'high',
        privacyConsent: true,
      }),
    })

    const response = await POST(request)
    const data = await response.json()

    expect(response.status).toBe(403)
    expect(data.error).toBe('Insufficient permissions')
  })

  it('should return 400 for invalid data', async () => {
    // Mock authenticated session
    vi.mocked(auth).mockResolvedValue({
      user: {
        id: 'user_123',
        email: 'john@example.com',
        roles: ['user'],
      },
      expires: new Date(Date.now() + 86400000).toISOString(),
    } as any)

    const request = new NextRequest('http://localhost:3000/api/enquiry', {
      method: 'POST',
      body: JSON.stringify({
        firstName: 'J', // Too short
        // Missing required fields
      }),
    })

    const response = await POST(request)
    const data = await response.json()

    expect(response.status).toBe(400)
    expect(data.error).toBe('Validation failed')
    expect(data.details).toBeDefined()
    expect(Array.isArray(data.details)).toBe(true)
  })

  it('should return 400 when privacy consent is false', async () => {
    // Mock authenticated session
    vi.mocked(auth).mockResolvedValue({
      user: {
        id: 'user_123',
        email: 'john@example.com',
        roles: ['user'],
      },
      expires: new Date(Date.now() + 86400000).toISOString(),
    } as any)

    const request = new NextRequest('http://localhost:3000/api/enquiry', {
      method: 'POST',
      body: JSON.stringify({
        firstName: 'John',
        lastName: 'Doe',
        email: 'john@example.com',
        phone: '+1234567890',
        country: 'US',
        city: 'New York',
        treatmentType: 'cardiac-surgery',
        medicalCondition: 'Heart condition requiring surgery',
        urgencyLevel: 'high',
        privacyConsent: false, // Invalid
      }),
    })

    const response = await POST(request)
    const data = await response.json()

    expect(response.status).toBe(400)
    expect(data.error).toBe('Validation failed')
    expect(data.details).toBeDefined()
    expect(data.details.some((e: any) => e.message.includes('Privacy consent'))).toBe(true)
  })

  it('should create enquiry successfully with valid data', async () => {
    // Mock authenticated session
    vi.mocked(auth).mockResolvedValue({
      user: {
        id: 'user_123',
        email: 'john@example.com',
        roles: ['user'],
      },
      expires: new Date(Date.now() + 86400000).toISOString(),
    } as any)

    const validEnquiry = {
      firstName: 'John',
      lastName: 'Doe',
      email: 'john@example.com',
      phone: '+1234567890',
      country: 'US',
      city: 'New York',
      treatmentType: 'cardiac-surgery',
      medicalCondition: 'Heart condition requiring surgery',
      urgencyLevel: 'high',
      privacyConsent: true,
      marketingConsent: false,
    }

    const request = new NextRequest('http://localhost:3000/api/enquiry', {
      method: 'POST',
      body: JSON.stringify(validEnquiry),
    })

    const response = await POST(request)
    const data = await response.json()

    expect(response.status).toBe(201)
    expect(data.success).toBe(true)
    expect(data.enquiry).toBeDefined()
    expect(data.enquiry.id).toBeDefined()
    expect(data.message).toContain('submitted')
  })

  it('should accept all valid treatment types', async () => {
    // Mock authenticated session
    vi.mocked(auth).mockResolvedValue({
      user: {
        id: 'user_123',
        email: 'john@example.com',
        roles: ['user'],
      },
      expires: new Date(Date.now() + 86400000).toISOString(),
    } as any)

    const treatmentTypes = [
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
      'other',
    ]

    for (const treatmentType of treatmentTypes) {
      const request = new NextRequest('http://localhost:3000/api/enquiry', {
        method: 'POST',
        body: JSON.stringify({
          firstName: 'John',
          lastName: 'Doe',
          email: 'john@example.com',
          phone: '+1234567890',
          country: 'US',
          city: 'New York',
          treatmentType,
          medicalCondition: 'Medical condition description',
          urgencyLevel: 'medium',
          privacyConsent: true,
        }),
      })

      const response = await POST(request)
      expect(response.status).toBe(201)
    }
  })

  it('should accept all valid urgency levels', async () => {
    // Mock authenticated session
    vi.mocked(auth).mockResolvedValue({
      user: {
        id: 'user_123',
        email: 'john@example.com',
        roles: ['user'],
      },
      expires: new Date(Date.now() + 86400000).toISOString(),
    } as any)

    const urgencyLevels = ['low', 'medium', 'high', 'emergency']

    for (const urgencyLevel of urgencyLevels) {
      const request = new NextRequest('http://localhost:3000/api/enquiry', {
        method: 'POST',
        body: JSON.stringify({
          firstName: 'John',
          lastName: 'Doe',
          email: 'john@example.com',
          phone: '+1234567890',
          country: 'US',
          city: 'New York',
          treatmentType: 'cardiac-surgery',
          medicalCondition: 'Medical condition description',
          urgencyLevel,
          privacyConsent: true,
        }),
      })

      const response = await POST(request)
      expect(response.status).toBe(201)
    }
  })

  it('should handle optional fields correctly', async () => {
    // Mock authenticated session
    vi.mocked(auth).mockResolvedValue({
      user: {
        id: 'user_123',
        email: 'john@example.com',
        roles: ['user'],
      },
      expires: new Date(Date.now() + 86400000).toISOString(),
    } as any)

    const request = new NextRequest('http://localhost:3000/api/enquiry', {
      method: 'POST',
      body: JSON.stringify({
        firstName: 'John',
        lastName: 'Doe',
        email: 'john@example.com',
        phone: '+1234567890',
        country: 'US',
        city: 'New York',
        treatmentType: 'cardiac-surgery',
        medicalCondition: 'Medical condition description',
        urgencyLevel: 'medium',
        privacyConsent: true,
        // Optional fields
        dateOfBirth: '1980-01-01',
        preferredCountries: ['India', 'Thailand'],
        budgetRange: '10k-25k',
        preferredTravelDate: '2025-12-01',
        insurance: true,
        insuranceProvider: 'Blue Cross',
        additionalNotes: 'Some additional notes',
        marketingConsent: true,
      }),
    })

    const response = await POST(request)
    const data = await response.json()

    expect(response.status).toBe(201)
    expect(data.success).toBe(true)
  })

  it('should validate email format', async () => {
    // Mock authenticated session
    vi.mocked(auth).mockResolvedValue({
      user: {
        id: 'user_123',
        email: 'john@example.com',
        roles: ['user'],
      },
      expires: new Date(Date.now() + 86400000).toISOString(),
    } as any)

    const request = new NextRequest('http://localhost:3000/api/enquiry', {
      method: 'POST',
      body: JSON.stringify({
        firstName: 'John',
        lastName: 'Doe',
        email: 'invalid-email', // Invalid email
        phone: '+1234567890',
        country: 'US',
        city: 'New York',
        treatmentType: 'cardiac-surgery',
        medicalCondition: 'Medical condition description',
        urgencyLevel: 'medium',
        privacyConsent: true,
      }),
    })

    const response = await POST(request)
    const data = await response.json()

    expect(response.status).toBe(400)
    expect(data.error).toBe('Validation failed')
    expect(data.details).toBeDefined()
    expect(data.details.some((e: any) => e.field === 'email')).toBe(true)
  })

  it('should validate phone number length', async () => {
    // Mock authenticated session
    vi.mocked(auth).mockResolvedValue({
      user: {
        id: 'user_123',
        email: 'john@example.com',
        roles: ['user'],
      },
      expires: new Date(Date.now() + 86400000).toISOString(),
    } as any)

    const request = new NextRequest('http://localhost:3000/api/enquiry', {
      method: 'POST',
      body: JSON.stringify({
        firstName: 'John',
        lastName: 'Doe',
        email: 'john@example.com',
        phone: '123', // Too short
        country: 'US',
        city: 'New York',
        treatmentType: 'cardiac-surgery',
        medicalCondition: 'Medical condition description',
        urgencyLevel: 'medium',
        privacyConsent: true,
      }),
    })

    const response = await POST(request)
    const data = await response.json()

    expect(response.status).toBe(400)
    expect(data.error).toBe('Validation failed')
    expect(data.details).toBeDefined()
    expect(data.details.some((e: any) => e.field === 'phone')).toBe(true)
  })

  it('should validate medical condition minimum length', async () => {
    // Mock authenticated session
    vi.mocked(auth).mockResolvedValue({
      user: {
        id: 'user_123',
        email: 'john@example.com',
        roles: ['user'],
      },
      expires: new Date(Date.now() + 86400000).toISOString(),
    } as any)

    const request = new NextRequest('http://localhost:3000/api/enquiry', {
      method: 'POST',
      body: JSON.stringify({
        firstName: 'John',
        lastName: 'Doe',
        email: 'john@example.com',
        phone: '+1234567890',
        country: 'US',
        city: 'New York',
        treatmentType: 'cardiac-surgery',
        medicalCondition: 'ABC', // Too short (min 5)
        urgencyLevel: 'medium',
        privacyConsent: true,
      }),
    })

    const response = await POST(request)
    const data = await response.json()

    expect(response.status).toBe(400)
    expect(data.error).toBe('Validation failed')
    expect(data.details).toBeDefined()
    expect(data.details.some((e: any) => e.field === 'medicalCondition')).toBe(true)
  })
})

describe('GET /api/enquiry', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('should return 401 when not authenticated', async () => {
    // Mock no session
    vi.mocked(auth).mockResolvedValue(null as any)

    const response = await GET()
    const data = await response.json()

    expect(response.status).toBe(401)
    expect(data.error).toBe('Authentication required')
  })

  it('should return 403 when user lacks permissions', async () => {
    // Mock session with no roles
    vi.mocked(auth).mockResolvedValue({
      user: {
        id: 'user_123',
        email: 'john@example.com',
        roles: [],
      },
      expires: new Date(Date.now() + 86400000).toISOString(),
    } as any)

    const response = await GET()
    const data = await response.json()

    expect(response.status).toBe(403)
    expect(data.error).toBe('Insufficient permissions')
  })

  it('should return enquiries for authenticated user', async () => {
    // Mock authenticated session
    vi.mocked(auth).mockResolvedValue({
      user: {
        id: 'user_123',
        email: 'john@example.com',
        roles: ['user'],
      },
      expires: new Date(Date.now() + 86400000).toISOString(),
    } as any)

    const response = await GET()
    const data = await response.json()

    expect(response.status).toBe(200)
    expect(data.success).toBe(true)
    expect(data.enquiries).toBeDefined()
    expect(Array.isArray(data.enquiries)).toBe(true)
    expect(data.total).toBeDefined()
  })

  it('should return enquiries array with correct structure', async () => {
    // Mock authenticated session
    vi.mocked(auth).mockResolvedValue({
      user: {
        id: 'user_123',
        email: 'john@example.com',
        roles: ['user'],
      },
      expires: new Date(Date.now() + 86400000).toISOString(),
    } as any)

    const response = await GET()
    const data = await response.json()

    expect(response.status).toBe(200)
    expect(data.enquiries.length).toBeGreaterThan(0)

    // Check first enquiry structure
    const enquiry = data.enquiries[0]
    expect(enquiry).toHaveProperty('id')
    expect(enquiry).toHaveProperty('userId')
    expect(enquiry).toHaveProperty('firstName')
    expect(enquiry).toHaveProperty('lastName')
    expect(enquiry).toHaveProperty('treatmentType')
    expect(enquiry).toHaveProperty('urgencyLevel')
    expect(enquiry).toHaveProperty('status')
    expect(enquiry).toHaveProperty('createdAt')
    expect(enquiry).toHaveProperty('updatedAt')
  })
})
