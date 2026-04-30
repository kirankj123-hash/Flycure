'use client';

import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from '@tanstack/react-query';
import { toast } from 'sonner';
import { enquirySchema, type EnquiryFormData, diagnosisOptions } from '@/lib/validations/enquiry';
import { EnquiryService, EnquiryResponse } from '@/features/enquiries/services/enquiry-service';
import { Button } from '@/components/atoms';
import { FormField } from '@/components/molecules';
import { cn } from '@/lib/utils/cn';
import { styles, tokens } from '@/styles';
import { logger } from '@/lib/logger';

export interface EnquiryFormProps {
  className?: string;
  onSuccess?: (data: EnquiryResponse) => void;
}

export function EnquiryForm({ className, onSuccess }: EnquiryFormProps) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting }
  } = useForm<EnquiryFormData>({
    resolver: zodResolver(enquirySchema),
    defaultValues: {
      firstName: '',
      lastName: '',
      email: '',
      phoneNumber: '',
      diagnosisType: 'Other',
      notes: '',
    }
  });

  const mutation = useMutation({
    mutationFn: EnquiryService.submit,
    onSuccess: (data) => {
      reset();
      toast.success('Enquiry submitted successfully! We will contact you soon.');
      onSuccess?.(data);
    },
    onError: (error: Error) => {
      logger.error('Enquiry form submission failed', error, {
        component: 'EnquiryForm'
      });
      toast.error('Failed to submit enquiry. Please try again.');
    }
  });

  const onSubmit = (data: EnquiryFormData) => {
    mutation.mutate(data);
  };

  return (
    <form 
      onSubmit={handleSubmit(onSubmit)} 
      className={cn(styles.enquiryForm.container, className)}
      noValidate
    >
      <div className={styles.layout.twoColumn}>
        <FormField
          label="First Name"
          {...register('firstName')}
          error={errors.firstName?.message}
          required
          autoComplete="given-name"
        />

        <FormField
          label="Last Name"
          {...register('lastName')}
          error={errors.lastName?.message}
          required
          autoComplete="family-name"
        />
      </div>

      <FormField
        label="Email Address"
        {...register('email')}
        type="email"
        error={errors.email?.message}
        required
        autoComplete="email"
      />

      <FormField
        label="Phone Number"
        {...register('phoneNumber')}
        type="tel"
        error={errors.phoneNumber?.message}
        required
        autoComplete="tel"
        placeholder="+1 (555) 123-4567"
      />

      <div className={styles.enquiryForm.fieldContainer}>
        <label 
          htmlFor="diagnosisType"
          className={styles.enquiryForm.label}
        >
          Diagnosis Type
          <span className={styles.enquiryForm.requiredIndicator}>*</span>
        </label>
        <select
          id="diagnosisType"
          {...register('diagnosisType')}
          className={cn(
            styles.enquiryForm.select,
            errors.diagnosisType && "border-destructive focus-visible:ring-destructive"
          )}
          aria-invalid={!!errors.diagnosisType}
          required
        >
          <option value="">Select a diagnosis type</option>
          {diagnosisOptions.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
        {errors.diagnosisType && (
          <p className={styles.enquiryForm.errorText} role="alert">
            {errors.diagnosisType.message}
          </p>
        )}
      </div>

      <div className={styles.enquiryForm.fieldContainer}>
        <label 
          htmlFor="notes"
          className={styles.enquiryForm.label}
        >
          Additional Notes
          <span className={styles.enquiryForm.optionalIndicator}>(Optional)</span>
        </label>
        <textarea
          id="notes"
          {...register('notes')}
          rows={4}
          className={cn(
            styles.form.textarea,
            errors.notes && "border-destructive focus-visible:ring-destructive"
          )}
          placeholder="Tell us more about your medical needs..."
          maxLength={500}
        />
        {errors.notes && (
          <p className={styles.form.error} role="alert">
            {errors.notes.message}
          </p>
        )}
      </div>

      <Button
        type="submit"
        disabled={isSubmitting || mutation.isPending}
        className={tokens.spacing.container.full}
        size="lg"
      >
        {isSubmitting || mutation.isPending ? 'Submitting...' : 'Submit Enquiry'}
      </Button>

      <p className={cn(styles.form.optional, 'text-center')}>
        By submitting this form, you agree to our terms of service and privacy policy.
      </p>
    </form>
  );
}
