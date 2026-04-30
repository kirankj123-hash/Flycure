/**
 * Feature Flags System
 * Centralized feature toggle management
 * 
 * Features:
 * - Environment-based feature toggles
 * - Gradual rollout support
 * - A/B testing capabilities
 * - Type-safe feature checks
 */

export type FeatureFlagKey =
  | 'booking'
  | 'chat'
  | 'reviews'
  | 'recommendations'
  | 'multilingual'
  | 'advanced_search'
  | 'virtual_consultations'
  | 'medical_records'
  | 'price_comparison'
  | 'insurance_integration'
  | 'payment_gateway'
  | 'loyalty_program'
  | 'referral_system'
  | 'telemedicine'
  | 'ai_assistant';

export interface FeatureFlag {
  key: FeatureFlagKey;
  enabled: boolean;
  description: string;
  rolloutPercentage?: number;
  enabledForUsers?: string[];
  enabledInEnvironments?: ('development' | 'staging' | 'production')[];
  dependencies?: FeatureFlagKey[];
  since?: string; // Version when feature was added
  deprecatedSince?: string; // Version when feature was marked for removal
}

/**
 * Feature flags configuration
 * Add new features here with their toggle state
 */
export const featureFlags: Record<FeatureFlagKey, FeatureFlag> = {
  // ============================================
  // CORE FEATURES
  // ============================================
  booking: {
    key: 'booking',
    enabled: process.env.NEXT_PUBLIC_FEATURE_BOOKING === 'true',
    description: 'Enable appointment booking functionality',
    rolloutPercentage: 100,
    enabledInEnvironments: ['development', 'staging', 'production'],
    since: '1.0.0',
  },

  chat: {
    key: 'chat',
    enabled: process.env.NEXT_PUBLIC_FEATURE_CHAT === 'true',
    description: 'Enable real-time chat with medical coordinators',
    rolloutPercentage: 50,
    enabledInEnvironments: ['development', 'staging'],
    since: '1.1.0',
  },

  reviews: {
    key: 'reviews',
    enabled: process.env.NEXT_PUBLIC_FEATURE_REVIEWS === 'true',
    description: 'Enable patient reviews and ratings',
    rolloutPercentage: 100,
    enabledInEnvironments: ['development', 'staging', 'production'],
    since: '1.0.0',
  },

  // ============================================
  // ADVANCED FEATURES
  // ============================================
  recommendations: {
    key: 'recommendations',
    enabled: process.env.NEXT_PUBLIC_FEATURE_RECOMMENDATIONS === 'true',
    description: 'Enable AI-powered treatment recommendations',
    rolloutPercentage: 30,
    enabledInEnvironments: ['development', 'staging'],
    dependencies: ['ai_assistant'],
    since: '1.2.0',
  },

  multilingual: {
    key: 'multilingual',
    enabled: process.env.NEXT_PUBLIC_FEATURE_MULTILINGUAL === 'true',
    description: 'Enable multi-language support',
    rolloutPercentage: 80,
    enabledInEnvironments: ['development', 'staging', 'production'],
    since: '1.1.0',
  },

  advanced_search: {
    key: 'advanced_search',
    enabled: process.env.NEXT_PUBLIC_FEATURE_ADVANCED_SEARCH === 'true',
    description: 'Enable advanced filtering and search capabilities',
    rolloutPercentage: 100,
    enabledInEnvironments: ['development', 'staging', 'production'],
    since: '1.0.0',
  },

  // ============================================
  // MEDICAL FEATURES
  // ============================================
  virtual_consultations: {
    key: 'virtual_consultations',
    enabled: process.env.NEXT_PUBLIC_FEATURE_VIRTUAL_CONSULTATIONS === 'true',
    description: 'Enable video consultations with doctors',
    rolloutPercentage: 60,
    enabledInEnvironments: ['development', 'staging'],
    dependencies: ['booking'],
    since: '1.2.0',
  },

  medical_records: {
    key: 'medical_records',
    enabled: process.env.NEXT_PUBLIC_FEATURE_MEDICAL_RECORDS === 'true',
    description: 'Enable secure medical records storage',
    rolloutPercentage: 40,
    enabledInEnvironments: ['development'],
    since: '1.3.0',
  },

  telemedicine: {
    key: 'telemedicine',
    enabled: process.env.NEXT_PUBLIC_FEATURE_TELEMEDICINE === 'true',
    description: 'Enable telemedicine services',
    rolloutPercentage: 50,
    enabledInEnvironments: ['development', 'staging'],
    dependencies: ['virtual_consultations', 'chat'],
    since: '1.3.0',
  },

  // ============================================
  // FINANCIAL FEATURES
  // ============================================
  price_comparison: {
    key: 'price_comparison',
    enabled: process.env.NEXT_PUBLIC_FEATURE_PRICE_COMPARISON === 'true',
    description: 'Enable treatment price comparison across hospitals',
    rolloutPercentage: 100,
    enabledInEnvironments: ['development', 'staging', 'production'],
    since: '1.1.0',
  },

  insurance_integration: {
    key: 'insurance_integration',
    enabled: process.env.NEXT_PUBLIC_FEATURE_INSURANCE === 'true',
    description: 'Enable insurance provider integration',
    rolloutPercentage: 20,
    enabledInEnvironments: ['development'],
    since: '1.4.0',
  },

  payment_gateway: {
    key: 'payment_gateway',
    enabled: process.env.NEXT_PUBLIC_FEATURE_PAYMENT_GATEWAY === 'true',
    description: 'Enable online payment processing',
    rolloutPercentage: 70,
    enabledInEnvironments: ['development', 'staging'],
    dependencies: ['booking'],
    since: '1.2.0',
  },

  // ============================================
  // ENGAGEMENT FEATURES
  // ============================================
  loyalty_program: {
    key: 'loyalty_program',
    enabled: process.env.NEXT_PUBLIC_FEATURE_LOYALTY === 'true',
    description: 'Enable patient loyalty rewards program',
    rolloutPercentage: 30,
    enabledInEnvironments: ['development', 'staging'],
    since: '1.3.0',
  },

  referral_system: {
    key: 'referral_system',
    enabled: process.env.NEXT_PUBLIC_FEATURE_REFERRAL === 'true',
    description: 'Enable patient referral program',
    rolloutPercentage: 50,
    enabledInEnvironments: ['development', 'staging', 'production'],
    since: '1.2.0',
  },

  // ============================================
  // AI FEATURES
  // ============================================
  ai_assistant: {
    key: 'ai_assistant',
    enabled: process.env.NEXT_PUBLIC_FEATURE_AI_ASSISTANT === 'true',
    description: 'Enable AI-powered medical assistant',
    rolloutPercentage: 25,
    enabledInEnvironments: ['development'],
    since: '1.4.0',
  },
};

/**
 * Check if a feature is enabled
 * Considers environment, rollout percentage, and dependencies
 */
export function isFeatureEnabled(
  key: FeatureFlagKey,
  userId?: string,
  options?: {
    ignoreRollout?: boolean;
    ignoreEnvironment?: boolean;
  }
): boolean {
  const flag = featureFlags[key];
  
  if (!flag) {
    console.warn(`Feature flag "${key}" not found`);
    return false;
  }

  // Check base enabled state
  if (!flag.enabled) {
    return false;
  }

  // Check environment
  if (!options?.ignoreEnvironment && flag.enabledInEnvironments) {
    const currentEnv = process.env.NODE_ENV as 'development' | 'staging' | 'production';
    if (!flag.enabledInEnvironments.includes(currentEnv)) {
      return false;
    }
  }

  // Check user-specific enablement
  if (userId && flag.enabledForUsers) {
    return flag.enabledForUsers.includes(userId);
  }

  // Check rollout percentage
  if (!options?.ignoreRollout && flag.rolloutPercentage !== undefined) {
    if (flag.rolloutPercentage < 100) {
      // Use consistent hashing for gradual rollout
      if (userId) {
        const hash = hashString(userId);
        const userPercentage = (hash % 100) + 1;
        if (userPercentage > flag.rolloutPercentage) {
          return false;
        }
      } else {
        // Random rollout for anonymous users
        if (Math.random() * 100 > flag.rolloutPercentage) {
          return false;
        }
      }
    }
  }

  // Check dependencies
  if (flag.dependencies) {
    return flag.dependencies.every(dep => isFeatureEnabled(dep, userId, options));
  }

  return true;
}

/**
 * Get all enabled features for a user
 */
export function getEnabledFeatures(userId?: string): FeatureFlagKey[] {
  return Object.keys(featureFlags).filter(key => 
    isFeatureEnabled(key as FeatureFlagKey, userId)
  ) as FeatureFlagKey[];
}

/**
 * Get feature flag details
 */
export function getFeatureFlag(key: FeatureFlagKey): FeatureFlag | undefined {
  return featureFlags[key];
}

/**
 * Check if feature is deprecated
 */
export function isFeatureDeprecated(key: FeatureFlagKey): boolean {
  const flag = featureFlags[key];
  return !!flag?.deprecatedSince;
}

/**
 * Simple string hash function for consistent rollout
 */
function hashString(str: string): number {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i);
    hash = ((hash << 5) - hash) + char;
    hash = hash & hash; // Convert to 32-bit integer
  }
  return Math.abs(hash);
}

/**
 * React hook for feature flags
 */
export function useFeature(key: FeatureFlagKey, userId?: string): boolean {
  return isFeatureEnabled(key, userId);
}

/**
 * Feature flag provider for client components
 */
export function getFeatureFlagsForClient(): Record<FeatureFlagKey, boolean> {
  const flags: Record<string, boolean> = {};
  
  Object.keys(featureFlags).forEach(key => {
    flags[key] = isFeatureEnabled(key as FeatureFlagKey, undefined, {
      ignoreRollout: true, // Client gets base state only
    });
  });
  
  return flags as Record<FeatureFlagKey, boolean>;
}

export default featureFlags;
