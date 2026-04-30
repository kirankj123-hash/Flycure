import { describe, test, expect, vi, beforeEach } from 'vitest'
import { EnquiryService } from './enquiry-service'
import type { EnquiryFormData } from '@/lib/validations/enquiry'

// Mock the api-client module
vi.mock('@/services/api-client', () => ({
  default: {
    post: vi.fn(),
    get: vi.fn()
  }
}))

// Import the mocked module
import apiClient from '@/services/api-client'
type MockApiClient = {
  post: ReturnType<typeof vi.fn>
  get: ReturnType<typeof vi.fn>
}
const mockApiClient = apiClient as unknown as MockApiClient

describe('EnquiryService', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  describe('submit method', () => {
    test('successfully submits enquiry data', async () => {
      const mockEnquiryData: EnquiryFormData = {
        firstName: 'John',
        lastName: 'Doe',
        email: 'john.doe@example.com',
        phoneNumber: '1234567890',
        diagnosisType: 'Dental',
        notes: 'Need dental consultation'
      }

      const mockResponse = {
        data: {
          enquiry: {
            id: 'enq_123',
            createdAt: '2023-09-27T10:00:00Z'
          },
          message: 'Enquiry submitted successfully'
        }
      }

      mockApiClient.post.mockResolvedValue(mockResponse)

      const result = await EnquiryService.submit(mockEnquiryData)

      expect(result).toMatchObject({
        id: 'enq_123',
        message: 'Enquiry submitted successfully',
        status: 'success',
        timestamp: '2023-09-27T10:00:00Z'
      })

      expect(mockApiClient.post).toHaveBeenCalledWith('/api/enquiry', {
        firstName: mockEnquiryData.firstName,
        lastName: mockEnquiryData.lastName,
        email: mockEnquiryData.email,
        phone: mockEnquiryData.phoneNumber,
        country: 'Unknown',
        city: 'Unknown',
        treatmentType: 'dental',
        medicalCondition: mockEnquiryData.notes,
        urgencyLevel: 'medium',
        privacyConsent: true,
        marketingConsent: false
      })
    })

    test('handles server validation errors', async () => {
      const mockEnquiryData: EnquiryFormData = {
        firstName: 'John',
        lastName: 'Doe',
        email: 'john.doe@example.com',
        phoneNumber: '1234567890',
        diagnosisType: 'Dental'
      }

      const mockError = {
        response: {
          status: 400,
          data: { message: 'Invalid email format' }
        }
      }

      mockApiClient.post.mockRejectedValue(mockError)

      await expect(EnquiryService.submit(mockEnquiryData)).rejects.toMatchObject({
        status: 'error',
        message: 'Invalid email format',
        id: expect.stringContaining('err_'),
        timestamp: expect.any(String)
      })
    })

    test('handles network errors gracefully', async () => {
      const mockEnquiryData: EnquiryFormData = {
        firstName: 'John',
        lastName: 'Doe',
        email: 'john.doe@example.com',
        phoneNumber: '1234567890',
        diagnosisType: 'Dental'
      }

      mockApiClient.post.mockRejectedValue(new Error('Network error'))

      await expect(EnquiryService.submit(mockEnquiryData)).rejects.toMatchObject({
        status: 'error',
        message: 'Failed to submit enquiry',
        id: expect.stringContaining('err_'),
        timestamp: expect.any(String)
      })
    })
  })

  describe('getStatus method', () => {
    test('successfully retrieves enquiry status', async () => {
      const mockResponse = {
        data: {
          id: 'enq_123',
          status: 'pending',
          timestamp: '2023-09-27T10:00:00Z'
        }
      }

      mockApiClient.get.mockResolvedValue(mockResponse)

      const result = await EnquiryService.getStatus('enq_123')

      expect(result).toEqual({
        id: 'enq_123',
        status: 'pending',
        timestamp: '2023-09-27T10:00:00Z'
      })
    })

    test('handles status retrieval errors', async () => {
      mockApiClient.get.mockRejectedValue(new Error('Not found'))

      await expect(EnquiryService.getStatus('invalid_id')).rejects.toThrow('Failed to get enquiry status')
    })
  })

  describe('error handling patterns', () => {
    test('includes timestamps in all responses', async () => {
      const mockEnquiryData: EnquiryFormData = {
        firstName: 'John',
        lastName: 'Doe',
        email: 'john.doe@example.com',
        phoneNumber: '1234567890',
        diagnosisType: 'Dental'
      }

      // Test successful response includes timestamp
      const mockSuccessResponse = { data: { id: 'test', message: 'success' } }
      mockApiClient.post.mockResolvedValueOnce(mockSuccessResponse)
      
      const successResult = await EnquiryService.submit(mockEnquiryData)
      expect(successResult.timestamp).toBeDefined()

      // Test error response includes timestamp
      mockApiClient.post.mockRejectedValueOnce(new Error('Test error'))
      
      try {
        await EnquiryService.submit(mockEnquiryData)
      } catch (error: unknown) {
        const enquiryError = error as { timestamp?: string }
        expect(enquiryError.timestamp).toBeDefined()
      }
    })
  })
})