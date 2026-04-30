import { env } from './env'
import React from 'react'

// Feature flag definitions
interface FeatureFlags {
  // UI Features
  newDashboard: boolean
  enhancedEnquiryForm: boolean
  realTimeNotifications: boolean
  darkMode: boolean
  
  // Business Features
  multiLanguageSupport: boolean
  advancedSearch: boolean
  videoConsultations: boolean
  paymentIntegration: boolean
  
  // Admin Features
  auditLogs: boolean
  advancedAnalytics: boolean
  bulkOperations: boolean
  
  // Technical Features
  observability: boolean
  pwa: boolean
  sse: boolean
  webPush: boolean
  
  // Experimental Features
  aiPoweredRecommendations: boolean
  blockchainIntegration: boolean
  vr3dTours: boolean
}

// Default feature flag values using existing environment variables
const defaultFlags: FeatureFlags = {
  // UI Features (using available env vars or defaults)
  newDashboard: false, // Not configured yet
  enhancedEnquiryForm: false, // Not configured yet
  realTimeNotifications: env.NEXT_PUBLIC_FEATURE_NOTIFICATIONS,
  darkMode: false, // Not configured yet
  
  // Business Features
  multiLanguageSupport: false, // Not configured yet
  advancedSearch: false, // Not configured yet
  videoConsultations: false, // Not configured yet
  paymentIntegration: false, // Not configured yet
  
  // Admin Features
  auditLogs: false, // Not configured yet
  advancedAnalytics: false, // Not configured yet
  bulkOperations: false, // Not configured yet
  
  // Technical Features
  observability: false, // Manual override for dev/prod
  pwa: env.NEXT_PUBLIC_FEATURE_PWA,
  sse: env.NEXT_PUBLIC_FEATURE_SSE,
  webPush: env.NEXT_PUBLIC_FEATURE_WEB_PUSH,
  
  // Experimental Features
  aiPoweredRecommendations: false, // Not configured yet
  blockchainIntegration: false, // Not configured yet
  vr3dTours: false, // Not configured yet
}

/**
 * Feature Flag Service
 * Provides centralized feature flag management with user/role-based overrides
 */
export class FeatureFlagService {
  private static instance: FeatureFlagService
  private flags: FeatureFlags
  private userOverrides: Map<string, Partial<FeatureFlags>> = new Map()
  private roleOverrides: Map<string, Partial<FeatureFlags>> = new Map()

  constructor() {
    this.flags = { ...defaultFlags }
    this.initializeRoleOverrides()
  }

  static getInstance(): FeatureFlagService {
    if (!FeatureFlagService.instance) {
      FeatureFlagService.instance = new FeatureFlagService()
    }
    return FeatureFlagService.instance
  }

  private initializeRoleOverrides() {
    // Admin users get access to all features
    this.roleOverrides.set('admin', {
      auditLogs: true,
      advancedAnalytics: true,
      bulkOperations: true,
      newDashboard: true,
    })

    // Super admin gets experimental features
    this.roleOverrides.set('super_admin', {
      auditLogs: true,
      advancedAnalytics: true,
      bulkOperations: true,
      newDashboard: true,
      aiPoweredRecommendations: true,
      blockchainIntegration: true,
    })

    // Healthcare providers get specific features
    this.roleOverrides.set('healthcare_provider', {
      videoConsultations: true,
      advancedSearch: true,
      realTimeNotifications: true,
    })

    // Beta users get early access to features
    this.roleOverrides.set('beta', {
      newDashboard: true,
      enhancedEnquiryForm: true,
      darkMode: true,
    })
  }

  /**
   * Get feature flag value for a specific user and their roles
   */
  isEnabled(
    feature: keyof FeatureFlags,
    context?: {
      userId?: string
      roles?: string[]
      country?: string
      experimentGroup?: string
    }
  ): boolean {
    // Start with default value
    let enabled = this.flags[feature]

    // Apply role-based overrides
    if (context?.roles) {
      for (const role of context.roles) {
        const roleOverride = this.roleOverrides.get(role)
        if (roleOverride && roleOverride[feature] !== undefined) {
          enabled = roleOverride[feature]!
        }
      }
    }

    // Apply user-specific overrides
    if (context?.userId) {
      const userOverride = this.userOverrides.get(context.userId)
      if (userOverride && userOverride[feature] !== undefined) {
        enabled = userOverride[feature]!
      }
    }

    // Geographic-based feature flags
    if (context?.country) {
      enabled = this.applyGeographicOverrides(feature, context.country, enabled)
    }

    // A/B testing support
    if (context?.experimentGroup) {
      enabled = this.applyExperimentOverrides(feature, context.experimentGroup, enabled)
    }

    return enabled
  }

  private applyGeographicOverrides(
    feature: keyof FeatureFlags,
    country: string,
    currentValue: boolean
  ): boolean {
    // Example: Disable payment integration in certain countries due to regulations
    if (feature === 'paymentIntegration') {
      const restrictedCountries = ['IN', 'CN'] // ISO country codes
      if (restrictedCountries.includes(country.toUpperCase())) {
        return false
      }
    }

    // Example: Enable multi-language support in non-English countries
    if (feature === 'multiLanguageSupport') {
      const nonEnglishCountries = ['ES', 'FR', 'DE', 'IT', 'PT']
      if (nonEnglishCountries.includes(country.toUpperCase())) {
        return true
      }
    }

    return currentValue
  }

  private applyExperimentOverrides(
    feature: keyof FeatureFlags,
    experimentGroup: string,
    currentValue: boolean
  ): boolean {
    // A/B testing for new dashboard
    if (feature === 'newDashboard') {
      if (experimentGroup === 'new_dashboard_test_group_a') {
        return true
      }
      if (experimentGroup === 'new_dashboard_control_group') {
        return false
      }
    }

    // A/B testing for enhanced enquiry form
    if (feature === 'enhancedEnquiryForm') {
      if (experimentGroup === 'enhanced_form_variant_b') {
        return true
      }
    }

    return currentValue
  }

  /**
   * Get all feature flags for a user
   */
  getAllFlags(context?: {
    userId?: string
    roles?: string[]
    country?: string
    experimentGroup?: string
  }): FeatureFlags {
    const result: FeatureFlags = {} as FeatureFlags
    
    for (const feature of Object.keys(this.flags) as Array<keyof FeatureFlags>) {
      result[feature] = this.isEnabled(feature, context)
    }
    
    return result
  }

  /**
   * Set user-specific override
   */
  setUserOverride(userId: string, overrides: Partial<FeatureFlags>) {
    this.userOverrides.set(userId, overrides)
  }

  /**
   * Remove user-specific override
   */
  removeUserOverride(userId: string) {
    this.userOverrides.delete(userId)
  }

  /**
   * Update global feature flag (admin only)
   */
  updateGlobalFlag(feature: keyof FeatureFlags, enabled: boolean) {
    this.flags[feature] = enabled
  }

  /**
   * Get feature flag usage analytics
   */
  getAnalytics(): Record<keyof FeatureFlags, { enabled: number; disabled: number }> {
    // This would integrate with your analytics system
    // For now, return mock data
    const mockAnalytics = {} as Record<keyof FeatureFlags, { enabled: number; disabled: number }>
    
    for (const feature of Object.keys(this.flags) as Array<keyof FeatureFlags>) {
      mockAnalytics[feature] = {
        enabled: Math.floor(Math.random() * 1000),
        disabled: Math.floor(Math.random() * 200),
      }
    }
    
    return mockAnalytics
  }
}

// Convenience hooks and utilities for React components
export const featureFlags = FeatureFlagService.getInstance()

/**
 * Hook for using feature flags in React components
 */
export function useFeatureFlag(
  feature: keyof FeatureFlags,
  context?: {
    userId?: string
    roles?: string[]
    country?: string
    experimentGroup?: string
  }
): boolean {
  return featureFlags.isEnabled(feature, context)
}

/**
 * Component wrapper for conditional feature rendering
 */
export function FeatureGate({
  feature,
  context,
  children,
  fallback = null,
}: {
  feature: keyof FeatureFlags
  context?: {
    userId?: string
    roles?: string[]
    country?: string
    experimentGroup?: string
  }
  children: React.ReactNode
  fallback?: React.ReactNode
}): React.ReactElement | null {
  const isEnabled = useFeatureFlag(feature, context)
  
  return isEnabled ? React.createElement(React.Fragment, {}, children) : React.createElement(React.Fragment, {}, fallback)
}

// Export types
export type { FeatureFlags }