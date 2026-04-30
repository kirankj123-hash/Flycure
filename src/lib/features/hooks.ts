/**
 * React Hooks for Feature Flags
 * Client-side hooks for checking feature availability
 */

'use client';

import { useEffect, useState } from 'react';
import { 
  isFeatureEnabled, 
  getEnabledFeatures, 
  type FeatureFlagKey 
} from '@/lib/features/flags';

/**
 * Hook to check if a feature is enabled
 * @param key - Feature flag key
 * @param userId - Optional user ID for user-specific features
 * @returns Boolean indicating if feature is enabled
 */
export function useFeature(key: FeatureFlagKey, userId?: string): boolean {
  const [enabled, setEnabled] = useState<boolean>(false);

  useEffect(() => {
    // Check feature on client side
    const checkFeature = () => {
      const isEnabled = isFeatureEnabled(key, userId);
      setEnabled(isEnabled);
    };

    checkFeature();
  }, [key, userId]);

  return enabled;
}

/**
 * Hook to get all enabled features for a user
 * @param userId - Optional user ID
 * @returns Array of enabled feature keys
 */
export function useEnabledFeatures(userId?: string): FeatureFlagKey[] {
  const [features, setFeatures] = useState<FeatureFlagKey[]>([]);

  useEffect(() => {
    const enabledFeatures = getEnabledFeatures(userId);
    setFeatures(enabledFeatures);
  }, [userId]);

  return features;
}

/**
 * Hook to check multiple features at once
 * @param keys - Array of feature flag keys
 * @param userId - Optional user ID
 * @returns Object with feature keys and their enabled state
 */
export function useFeatures(
  keys: FeatureFlagKey[],
  userId?: string
): Record<FeatureFlagKey, boolean> {
  const [features, setFeatures] = useState<Record<string, boolean>>({});

  useEffect(() => {
    const featureStates: Record<string, boolean> = {};
    
    keys.forEach(key => {
      featureStates[key] = isFeatureEnabled(key, userId);
    });

    setFeatures(featureStates);
  }, [keys, userId]);

  return features as Record<FeatureFlagKey, boolean>;
}

export default useFeature;
