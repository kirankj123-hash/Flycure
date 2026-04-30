import { z } from 'zod'

const vapidSubjectSchema = z
  .string()
  .refine(
    (value) => {
      if (value.startsWith('mailto:')) {
        return z.string().email().safeParse(value.slice('mailto:'.length)).success
      }

      return z.string().url().safeParse(value).success
    },
    'VAPID_SUBJECT must be a mailto: email or https URL'
  )

/**
 * Environment validation schema with comprehensive security settings
 * All environment variables are validated at startup
 */
const envSchema = z.object({
  // Core application
  NODE_ENV: z.enum(['development', 'test', 'production']).default('development'),
  
  // API Configuration
  NEXT_PUBLIC_API_BASE_URL: z.string().url().optional(),
  NEXT_PUBLIC_APP_BASE_URL: z.string().url().optional(),
  API_TIMEOUT_MS: z.coerce.number().min(1000).max(30000).default(10000),
  
  // Authentication (Auth.js)
  NEXTAUTH_URL: z.string().url().optional(),
  NEXTAUTH_SECRET: z.string().min(32).optional(),
  NEXTAUTH_DEBUG: z.coerce.boolean().default(false),
  
  // OIDC Configuration
  AUTH_OIDC_ISSUER: z.string().url().optional(),
  AUTH_OIDC_CLIENT_ID: z.string().optional(),
  AUTH_OIDC_CLIENT_SECRET: z.string().optional(),
  AUTH_OIDC_SCOPE: z.string().default('openid profile email'),
  
  // Security & Rate Limiting
  RATE_LIMIT_REDIS_URL: z.string().url().optional(),
  RATE_LIMIT_REQUESTS_PER_MINUTE: z.coerce.number().min(1).max(1000).default(60),
  CSRF_SECRET: z.string().min(32).optional(),
  
  // Feature Flags
  NEXT_PUBLIC_FEATURE_NOTIFICATIONS: z.coerce.boolean().default(false),
  NEXT_PUBLIC_FEATURE_WEB_PUSH: z.coerce.boolean().default(false),
  NEXT_PUBLIC_FEATURE_SSE: z.coerce.boolean().default(true),
  NEXT_PUBLIC_FEATURE_PWA: z.coerce.boolean().default(false),
  
  // Observability
  OTEL_SERVICE_NAME: z.string().default('flycure-frontend'),
  OTEL_SERVICE_VERSION: z.string().default('0.1.0'),
  OTEL_EXPORTER_OTLP_ENDPOINT: z.string().url().optional(),
  
  // Web Push (VAPID)
  NEXT_PUBLIC_VAPID_PUBLIC_KEY: z.string().optional(),
  VAPID_PRIVATE_KEY: z.string().optional(),
  VAPID_SUBJECT: vapidSubjectSchema.optional(),
  
  // Database & External Services (for future use)
  DATABASE_URL: z.string().url().optional(),
  REDIS_URL: z.string().url().optional(),
  
  // Monitoring & Logging
  LOG_LEVEL: z.enum(['debug', 'info', 'warn', 'error']).default('info'),
  AUDIT_LOG_ENABLED: z.coerce.boolean().default(true),
})

// Derived environment type
export type Env = z.infer<typeof envSchema>

/**
 * Parse and validate environment variables
 * @throws {Error} If validation fails with detailed error messages
 */
const parseEnv = (): Env => {
  try {
    const env = envSchema.parse({
      NODE_ENV: process.env.NODE_ENV,
      NEXT_PUBLIC_API_BASE_URL: process.env.NEXT_PUBLIC_API_BASE_URL,
      NEXT_PUBLIC_APP_BASE_URL: process.env.NEXT_PUBLIC_APP_BASE_URL,
      API_TIMEOUT_MS: process.env.API_TIMEOUT_MS,
      
      // Auth.js
      NEXTAUTH_URL: process.env.NEXTAUTH_URL,
      NEXTAUTH_SECRET: process.env.NEXTAUTH_SECRET,
      NEXTAUTH_DEBUG: process.env.NEXTAUTH_DEBUG,
      
      // OIDC
      AUTH_OIDC_ISSUER: process.env.AUTH_OIDC_ISSUER,
      AUTH_OIDC_CLIENT_ID: process.env.AUTH_OIDC_CLIENT_ID,
      AUTH_OIDC_CLIENT_SECRET: process.env.AUTH_OIDC_CLIENT_SECRET,
      AUTH_OIDC_SCOPE: process.env.AUTH_OIDC_SCOPE,
      
      // Security
      RATE_LIMIT_REDIS_URL: process.env.RATE_LIMIT_REDIS_URL,
      RATE_LIMIT_REQUESTS_PER_MINUTE: process.env.RATE_LIMIT_REQUESTS_PER_MINUTE,
      CSRF_SECRET: process.env.CSRF_SECRET,
      
      // Feature flags
      NEXT_PUBLIC_FEATURE_NOTIFICATIONS: process.env.NEXT_PUBLIC_FEATURE_NOTIFICATIONS,
      NEXT_PUBLIC_FEATURE_WEB_PUSH: process.env.NEXT_PUBLIC_FEATURE_WEB_PUSH,
      NEXT_PUBLIC_FEATURE_SSE: process.env.NEXT_PUBLIC_FEATURE_SSE,
      NEXT_PUBLIC_FEATURE_PWA: process.env.NEXT_PUBLIC_FEATURE_PWA,
      
      // Observability
      OTEL_SERVICE_NAME: process.env.OTEL_SERVICE_NAME,
      OTEL_SERVICE_VERSION: process.env.OTEL_SERVICE_VERSION,
      OTEL_EXPORTER_OTLP_ENDPOINT: process.env.OTEL_EXPORTER_OTLP_ENDPOINT,
      
      // Web Push
      NEXT_PUBLIC_VAPID_PUBLIC_KEY: process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY,
      VAPID_PRIVATE_KEY: process.env.VAPID_PRIVATE_KEY,
      VAPID_SUBJECT: process.env.VAPID_SUBJECT,
      
      // External services
      DATABASE_URL: process.env.DATABASE_URL,
      REDIS_URL: process.env.REDIS_URL,
      
      // Monitoring
      LOG_LEVEL: process.env.LOG_LEVEL,
      AUDIT_LOG_ENABLED: process.env.AUDIT_LOG_ENABLED,
    })
    
    // Production environment validations
    if (env.NODE_ENV === 'production') {
      if (!env.NEXTAUTH_SECRET) {
        throw new Error('NEXTAUTH_SECRET is required in production')
      }
      if (!env.NEXTAUTH_URL) {
        throw new Error('NEXTAUTH_URL is required in production')
      }
      if (env.NEXT_PUBLIC_FEATURE_WEB_PUSH && !env.NEXT_PUBLIC_VAPID_PUBLIC_KEY) {
        throw new Error('VAPID keys are required when Web Push is enabled')
      }
    }
    
    return env
  } catch (error) {
    console.error('🚨 Environment validation failed:')
    if (error instanceof z.ZodError) {
      error.errors.forEach(err => {
        console.error(`  - ${err.path.join('.')}: ${err.message}`)
      })
    } else {
      console.error('  -', error)
    }
    
    process.exit(1)
  }
}

/**
 * Validated environment variables
 * Available throughout the application
 */
export const env = parseEnv()

/**
 * Client-safe environment variables for browser
 * Only includes NEXT_PUBLIC_ prefixed variables
 */
export const clientEnv = {
  API_BASE_URL: env.NEXT_PUBLIC_API_BASE_URL,
  APP_BASE_URL: env.NEXT_PUBLIC_APP_BASE_URL,
  FEATURE_NOTIFICATIONS: env.NEXT_PUBLIC_FEATURE_NOTIFICATIONS,
  FEATURE_WEB_PUSH: env.NEXT_PUBLIC_FEATURE_WEB_PUSH,
  FEATURE_SSE: env.NEXT_PUBLIC_FEATURE_SSE,
  FEATURE_PWA: env.NEXT_PUBLIC_FEATURE_PWA,
  VAPID_PUBLIC_KEY: env.NEXT_PUBLIC_VAPID_PUBLIC_KEY,
} as const
