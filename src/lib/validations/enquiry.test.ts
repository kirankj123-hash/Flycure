import { describe, test, expect } from 'vitest'
import { enquirySchema, diagnosisOptions } from './enquiry'

describe('Enquiry Validation Schema', () => {
  describe('firstName validation', () => {
    test('accepts valid first names', () => {
      const validNames = ['John', 'Jane Doe', 'Mary Jane']
      
      validNames.forEach(name => {
        const result = enquirySchema.safeParse({
          firstName: name,
          lastName: 'Doe',
          email: 'test@example.com',
          phoneNumber: '1234567890',
          diagnosisType: 'Dental'
        })
        expect(result.success).toBe(true)
      })
    })

    test('rejects first names that are too short', () => {
      const result = enquirySchema.safeParse({
        firstName: 'J',
        lastName: 'Doe',
        email: 'test@example.com',
        phoneNumber: '1234567890',
        diagnosisType: 'Dental'
      })
      
      expect(result.success).toBe(false)
      if (!result.success) {
        expect(result.error.errors[0].message).toContain('First name must be at least 2 characters')
      }
    })

    test('rejects first names that are too long', () => {
      const result = enquirySchema.safeParse({
        firstName: 'a'.repeat(51),
        lastName: 'Doe',
        email: 'test@example.com',
        phoneNumber: '1234567890',
        diagnosisType: 'Dental'
      })
      
      expect(result.success).toBe(false)
      if (!result.success) {
        expect(result.error.errors[0].message).toContain('First name must be less than 50 characters')
      }
    })

    test('rejects first names with numbers', () => {
      const result = enquirySchema.safeParse({
        firstName: 'John123',
        lastName: 'Doe',
        email: 'test@example.com',
        phoneNumber: '1234567890',
        diagnosisType: 'Dental'
      })
      
      expect(result.success).toBe(false)
      if (!result.success) {
        expect(result.error.errors[0].message).toContain('First name should only contain letters')
      }
    })
  })

  describe('lastName validation', () => {
    test('accepts valid last names', () => {
      const validNames = ['Doe', 'Van Der Berg', 'O Connor']
      
      validNames.forEach(name => {
        const result = enquirySchema.safeParse({
          firstName: 'John',
          lastName: name,
          email: 'test@example.com',
          phoneNumber: '1234567890',
          diagnosisType: 'Dental'
        })
        expect(result.success).toBe(true)
      })
    })

    test('rejects last names that are too short', () => {
      const result = enquirySchema.safeParse({
        firstName: 'John',
        lastName: 'D',
        email: 'test@example.com',
        phoneNumber: '1234567890',
        diagnosisType: 'Dental'
      })
      
      expect(result.success).toBe(false)
      if (!result.success) {
        expect(result.error.errors[0].message).toContain('Last name must be at least 2 characters')
      }
    })
  })

  describe('email validation', () => {
    test('accepts valid email addresses', () => {
      const validEmails = [
        'test@example.com',
        'user+label@domain.co.uk',
        'john.doe@company-name.org'
      ]
      
      validEmails.forEach(email => {
        const result = enquirySchema.safeParse({
          firstName: 'John',
          lastName: 'Doe',
          email: email,
          phoneNumber: '1234567890',
          diagnosisType: 'Dental'
        })
        expect(result.success).toBe(true)
      })
    })

    test('rejects invalid email addresses', () => {
      const invalidEmails = ['invalid-email', '@example.com', 'test@', 'test.com']
      
      invalidEmails.forEach(email => {
        const result = enquirySchema.safeParse({
          firstName: 'John',
          lastName: 'Doe',
          email: email,
          phoneNumber: '1234567890',
          diagnosisType: 'Dental'
        })
        
        expect(result.success).toBe(false)
        if (!result.success) {
          expect(result.error.errors[0].message).toContain('Please enter a valid email address')
        }
      })
    })

    test('requires email field', () => {
      const result = enquirySchema.safeParse({
        firstName: 'John',
        lastName: 'Doe',
        email: '',
        phoneNumber: '1234567890',
        diagnosisType: 'Dental'
      })
      
      expect(result.success).toBe(false)
      if (!result.success) {
        expect(result.error.errors[0].message).toContain('Please enter a valid email address')
      }
    })
  })

  describe('phoneNumber validation', () => {
    test('accepts valid phone numbers', () => {
      const validPhones = [
        '1234567890',
        '+1234567890',
        '(123) 456-7890',
        '+1 (555) 123-4567',
        '123-456-7890'
      ]
      
      validPhones.forEach(phone => {
        const result = enquirySchema.safeParse({
          firstName: 'John',
          lastName: 'Doe',
          email: 'test@example.com',
          phoneNumber: phone,
          diagnosisType: 'Dental'
        })
        expect(result.success).toBe(true)
      })
    })

    test('rejects phone numbers that are too short', () => {
      const result = enquirySchema.safeParse({
        firstName: 'John',
        lastName: 'Doe',
        email: 'test@example.com',
        phoneNumber: '123456',
        diagnosisType: 'Dental'
      })
      
      expect(result.success).toBe(false)
      if (!result.success) {
        expect(result.error.errors[0].message).toContain('Please enter a valid phone number')
      }
    })

    test('rejects invalid phone number formats', () => {
      const invalidPhones = ['abc123', '123abc456']
      
      invalidPhones.forEach(phone => {
        const result = enquirySchema.safeParse({
          firstName: 'John',
          lastName: 'Doe',
          email: 'test@example.com',
          phoneNumber: phone,
          diagnosisType: 'Dental'
        })
        
        expect(result.success).toBe(false)
        if (!result.success) {
          expect(result.error.errors[0].message).toContain('Please enter a valid phone number')
        }
      })
    })
  })

  describe('diagnosisType validation', () => {
    test('accepts valid diagnosis types', () => {
      diagnosisOptions.forEach(diagnosis => {
        const result = enquirySchema.safeParse({
          firstName: 'John',
          lastName: 'Doe',
          email: 'test@example.com',
          phoneNumber: '1234567890',
          diagnosisType: diagnosis
        })
        expect(result.success).toBe(true)
      })
    })

    test('rejects invalid diagnosis types', () => {
      const result = enquirySchema.safeParse({
        firstName: 'John',
        lastName: 'Doe',
        email: 'test@example.com',
        phoneNumber: '1234567890',
        diagnosisType: 'Invalid Type'
      })
      
      expect(result.success).toBe(false)
      if (!result.success) {
        expect(result.error.errors[0].message).toContain('Please select a valid diagnosis type')
      }
    })
  })

  describe('notes validation', () => {
    test('accepts valid notes', () => {
      const validNotes = [
        'I need help with dental care',
        'Looking for cosmetic surgery options',
        ''  // Empty notes should be allowed
      ]
      
      validNotes.forEach(notes => {
        const result = enquirySchema.safeParse({
          firstName: 'John',
          lastName: 'Doe',
          email: 'test@example.com',
          phoneNumber: '1234567890',
          diagnosisType: 'Dental',
          notes: notes
        })
        expect(result.success).toBe(true)
      })
    })

    test('rejects notes that are too long', () => {
      const result = enquirySchema.safeParse({
        firstName: 'John',
        lastName: 'Doe',
        email: 'test@example.com',
        phoneNumber: '1234567890',
        diagnosisType: 'Dental',
        notes: 'a'.repeat(501)
      })
      
      expect(result.success).toBe(false)
      if (!result.success) {
        expect(result.error.errors[0].message).toContain('Notes must be less than 500 characters')
      }
    })

    test('notes field is optional', () => {
      const result = enquirySchema.safeParse({
        firstName: 'John',
        lastName: 'Doe',
        email: 'test@example.com',
        phoneNumber: '1234567890',
        diagnosisType: 'Dental'
        // notes field omitted
      })
      
      expect(result.success).toBe(true)
    })
  })

  describe('complete form validation', () => {
    test('validates complete valid form', () => {
      const validForm = {
        firstName: 'John',
        lastName: 'Doe',
        email: 'john.doe@example.com',
        phoneNumber: '+1 (555) 123-4567',
        diagnosisType: 'Cosmetic Surgery' as const,
        notes: 'I am interested in cosmetic surgery options available.'
      }
      
      const result = enquirySchema.safeParse(validForm)
      expect(result.success).toBe(true)
      
      if (result.success) {
        expect(result.data).toEqual(validForm)
      }
    })

    test('collects all validation errors', () => {
      const invalidForm = {
        firstName: 'J',  // Too short
        lastName: '',    // Too short
        email: 'invalid-email',  // Invalid format
        phoneNumber: '123',      // Too short
        diagnosisType: 'Invalid' // Invalid option
      }
      
      const result = enquirySchema.safeParse(invalidForm)
      expect(result.success).toBe(false)
      
      if (!result.success) {
        expect(result.error.errors.length).toBeGreaterThan(1)
      }
    })
  })

  describe('diagnosisOptions constant', () => {
    test('contains all expected diagnosis types', () => {
      const expectedOptions = ['Dental', 'Orthopedic', 'Cosmetic Surgery', 'Cardiology', 'Other']
      
      expect(diagnosisOptions).toEqual(expectedOptions)
      expect(diagnosisOptions.length).toBe(5)
    })

    test('is readonly', () => {
      // This test ensures the 'as const' assertion is working
      const firstOption: 'Dental' = diagnosisOptions[0]
      expect(firstOption).toBe('Dental')
    })
  })
})