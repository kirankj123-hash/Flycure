import { z } from 'zod';

export const diagnosisOptions = [
  'Dental',
  'Orthopedic',
  'Cosmetic Surgery',
  'Cardiology',
  'Other'
] as const;

export const enquirySchema = z.object({
  firstName: z.string()
    .min(2, 'First name must be at least 2 characters')
    .max(50, 'First name must be less than 50 characters')
    .regex(/^[a-zA-Z\s]+$/, 'First name should only contain letters'),
  lastName: z.string()
    .min(2, 'Last name must be at least 2 characters')
    .max(50, 'Last name must be less than 50 characters')
    .regex(/^[a-zA-Z\s]+$/, 'Last name should only contain letters'),
  email: z.string()
    .email('Please enter a valid email address')
    .min(1, 'Email is required'),
  phoneNumber: z.string()
    .regex(
      /^[+]?[(]?[\d\s\-()]{10,}$/,
      'Please enter a valid phone number'
    )
    .min(10, 'Phone number must be at least 10 digits'),
  diagnosisType: z.enum(diagnosisOptions, {
    message: 'Please select a valid diagnosis type',
  }),
  notes: z.string()
    .max(500, 'Notes must be less than 500 characters')
    .optional(),
});

export type EnquiryFormData = z.infer<typeof enquirySchema>;