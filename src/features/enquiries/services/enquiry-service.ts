import { EnquiryFormData } from '@/lib/validations/enquiry'
import apiClient from '@/services/api-client'
import { logger } from '@/lib/logger'

// Type for API enquiry data (matches API schema)
interface ApiEnquiryData {
  firstName: string
  lastName: string
  email: string
  phone: string
  country: string
  city: string
  treatmentType: 'cardiac-surgery' | 'oncology' | 'orthopedic' | 'cosmetic-surgery' | 'dental' | 'fertility' | 'neurology' | 'gastroenterology' | 'urology' | 'gynecology' | 'other'
  medicalCondition: string
  urgencyLevel: 'low' | 'medium' | 'high' | 'emergency'
  privacyConsent: boolean
  marketingConsent?: boolean
}

// Helper function to map diagnosis types to treatment types
function mapDiagnosisToTreatment(diagnosis: string): ApiEnquiryData['treatmentType'] {
  const mapping: Record<string, ApiEnquiryData['treatmentType']> = {
    'Dental': 'dental',
    'Orthopedic': 'orthopedic',
    'Cosmetic Surgery': 'cosmetic-surgery',
    'Cardiology': 'cardiac-surgery',
    'Other': 'other',
  }
  
  return mapping[diagnosis] || 'other'
}

export interface EnquiryResponse {
  id: string
  message: string
  status: 'success' | 'pending' | 'error'
  timestamp: string
}

export interface EnquiryListResponse {
  success: boolean
  enquiries: Array<{
    id: string
    userId: string
    firstName: string
    lastName: string
    treatmentType: string
    urgencyLevel: string
    status: string
    createdAt: string
    updatedAt: string
  }>
  total: number
}

export const EnquiryService = {
  /**
   * Submit a new enquiry (requires authentication)
   */
  submit: async (data: EnquiryFormData): Promise<EnquiryResponse> => {
    try {
      // Transform legacy form data to new API schema
      const apiData: Partial<ApiEnquiryData> = {
        firstName: data.firstName,
        lastName: data.lastName,
        email: data.email,
        phone: data.phoneNumber,
        country: 'Unknown', // Not available in current form
        city: 'Unknown', // Not available in current form
        treatmentType: mapDiagnosisToTreatment(data.diagnosisType),
        medicalCondition: data.notes || 'No additional notes provided',
        urgencyLevel: 'medium',
        privacyConsent: true, // Assuming consent was given in original form
        marketingConsent: false,
      }

      const response = await apiClient.post('/api/enquiry', apiData)
      
      return {
        id: response.data.enquiry?.id || `enq_${Date.now()}`,
        message: response.data.message || 'Enquiry submitted successfully',
        status: 'success',
        timestamp: response.data.enquiry?.createdAt || new Date().toISOString(),
      }
    } catch (error: unknown) {
      logger.error('Enquiry submission failed', error as Error, {
        firstName: data.firstName,
        email: data.email,
        diagnosisType: data.diagnosisType
      });
      
      const errorObj = error as { response?: { data?: { message?: string; error?: string } } }
      const errorMessage = errorObj.response?.data?.message || 
                          errorObj.response?.data?.error || 
                          'Failed to submit enquiry'
      
      const errorResponse: EnquiryResponse = {
        id: `err_${Date.now()}`,
        message: errorMessage,
        status: 'error',
        timestamp: new Date().toISOString(),
      }
      
      throw errorResponse
    }
  },

  /**
   * Get user's enquiries (requires authentication)
   */
  getUserEnquiries: async (): Promise<EnquiryListResponse> => {
    try {
      const response = await apiClient.get<EnquiryListResponse>('/api/enquiry')
      return response.data
    } catch (error: unknown) {
      logger.error('Failed to fetch user enquiries', error as Error);
      throw new Error((error as { response?: { data?: { error?: string } } }).response?.data?.error || 'Failed to fetch enquiries')
    }
  },

  /**
   * Get enquiry status by ID (requires authentication)
   */
  getStatus: async (enquiryId: string): Promise<EnquiryResponse> => {
    try {
      const response = await apiClient.get<EnquiryResponse>(`/api/enquiry/${enquiryId}`)
      return response.data
    } catch (error: unknown) {
      logger.error('Failed to fetch enquiry status', error as Error, { enquiryId });
      throw new Error((error as { response?: { data?: { error?: string } } }).response?.data?.error || 'Failed to get enquiry status')
    }
  },
}

/**
 * Admin-only enquiry service
 */
export const AdminEnquiryService = {
  /**
   * Get all enquiries for admin dashboard
   */
  getAll: async (params?: {
    page?: number
    limit?: number
    status?: string
    treatmentType?: string
  }) => {
    try {
      const searchParams = new URLSearchParams()
      
      if (params?.page) searchParams.set('page', params.page.toString())
      if (params?.limit) searchParams.set('limit', params.limit.toString())
      if (params?.status) searchParams.set('status', params.status)
      if (params?.treatmentType) searchParams.set('treatmentType', params.treatmentType)
      
      const url = `/api/admin/enquiries${searchParams.toString() ? `?${searchParams.toString()}` : ''}`
      const response = await apiClient.get(url)
      
      return response.data
    } catch (error: unknown) {
      logger.error('Failed to fetch admin enquiries', error as Error, { params });
      throw new Error((error as { response?: { data?: { error?: string } } }).response?.data?.error || 'Failed to fetch enquiries')
    }
  },

  /**
   * Update enquiry status
   */
  updateEnquiry: async (params: {
    enquiryId: string
    action: 'approve' | 'reject' | 'assign' | 'update_status'
    reason?: string
    assignedTo?: string
    newStatus?: 'pending' | 'reviewing' | 'approved' | 'rejected' | 'completed'
  }) => {
    try {
      const response = await apiClient.patch('/api/admin/enquiries', params)
      return response.data
    } catch (error: unknown) {
      logger.error('Failed to update enquiry', error as Error, {
        enquiryId: params.enquiryId,
        action: params.action
      });
      throw new Error((error as { response?: { data?: { error?: string } } }).response?.data?.error || 'Failed to update enquiry')
    }
  },
}