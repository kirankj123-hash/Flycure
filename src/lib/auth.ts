import NextAuth from 'next-auth'
import type { NextAuthConfig } from 'next-auth'
import { env } from './env'

// OIDC Provider Configurations
const oidcProviders = []

// Add Generic OIDC if configured (can be Google, Azure, etc.)
if (env.AUTH_OIDC_CLIENT_ID && env.AUTH_OIDC_CLIENT_SECRET && env.AUTH_OIDC_ISSUER) {
  oidcProviders.push({
    id: 'oidc',
    name: 'OIDC Provider',
    type: 'oidc' as const,
    issuer: env.AUTH_OIDC_ISSUER,
    clientId: env.AUTH_OIDC_CLIENT_ID,
    clientSecret: env.AUTH_OIDC_CLIENT_SECRET,
    authorization: {
      params: {
        scope: env.AUTH_OIDC_SCOPE,
      },
    },
    profile(profile: Record<string, unknown>) {
      return {
        id: profile.sub as string,
        email: (profile.email || profile.preferred_username) as string,
        name: (profile.name || profile.preferred_username) as string,
        image: profile.picture as string,
        roles: (profile.roles || profile.groups || ['user']) as string[],
      }
    },
  })
}

/**
 * Custom user role and permission management
 * This would typically integrate with your user database
 */
async function getUserRoles(userId: string, email: string): Promise<string[]> {
  // TODO: Implement role fetching from your database
  // For now, return default roles based on email patterns
  
  if (email.includes('@flycure') || email.includes('@admin')) {
    return ['admin', 'user']
  }
  
  if (email.includes('@doctor') || email.includes('@clinic')) {
    return ['healthcare_provider', 'user']
  }
  
  return ['user']
}

/**
 * Next-Auth configuration with OIDC and RBAC support
 */
export const authConfig: NextAuthConfig = {
  providers: oidcProviders,
  
  pages: {
    signIn: '/auth/signin',
    signOut: '/auth/signout',
    error: '/auth/error',
  },
  
  callbacks: {
    /**
     * Runs on successful signin
     * Use this to restrict who can sign in
     */
    async signIn() {
      // Allow all OIDC sign-ins by default
      // Add custom logic here to restrict access
      return true
    },
    
    /**
     * Runs whenever a JWT token is accessed
     * Add custom claims to the token
     */
    async jwt({ token, user, account }) {
      // Initial sign in
      if (user && account) {
        const roles = await getUserRoles(user.id ?? '', user.email ?? user.id ?? '')
        
        return {
          ...token,
          roles,
          provider: account.provider,
          accessToken: account.access_token,
          refreshToken: account.refresh_token,
        }
      }
      
      // Return previous token if no updates needed
      return token
    },
    
    /**
     * Runs whenever a session is accessed
     * Shape the session object that's returned to the client
     */
    async session({ session, token }) {
      // Send properties to the client
      if (token && session.user) {
        session.user.id = token.sub!
        ;(session.user as unknown as Record<string, unknown>).roles = token.roles as string[]
        ;(session as unknown as Record<string, unknown>).accessToken = token.accessToken as string
      }
      
      return session
    },
    
    /**
     * Runs on redirect
     * Control where users get redirected after auth actions
     */
    async redirect({ url, baseUrl }) {
      // Allows relative callback URLs
      if (url.startsWith('/')) return `${baseUrl}${url}`
      
      // Allows callback URLs on the same origin
      if (new URL(url).origin === baseUrl) return url
      
      return baseUrl
    },
  },
  
  session: {
    strategy: 'jwt',
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },
  
  secret: env.NEXTAUTH_SECRET,
  
  debug: env.NEXTAUTH_DEBUG,
}

export const { handlers, auth, signIn, signOut } = NextAuth(authConfig)

/**
 * Role-based access control utilities
 */
export const RBAC = {
  /**
   * Check if user has required role
   */
  hasRole(userRoles: string[], requiredRole: string): boolean {
    return userRoles.includes(requiredRole)
  },
  
  /**
   * Check if user has any of the required roles
   */
  hasAnyRole(userRoles: string[], requiredRoles: string[]): boolean {
    return requiredRoles.some(role => userRoles.includes(role))
  },
  
  /**
   * Check if user has all required roles
   */
  hasAllRoles(userRoles: string[], requiredRoles: string[]): boolean {
    return requiredRoles.every(role => userRoles.includes(role))
  },
  
  /**
   * Predefined permission sets
   */
  permissions: {
    // Admin permissions
    ADMIN_ACCESS: ['admin', 'super_admin'],
    USER_MANAGEMENT: ['admin', 'super_admin'],
    
    // Healthcare provider permissions
    HEALTHCARE_PROVIDER: ['healthcare_provider', 'doctor', 'clinic', 'admin'],
    PATIENT_DATA_ACCESS: ['healthcare_provider', 'doctor', 'admin'],
    
    // General user permissions
    USER_ACCESS: ['user', 'healthcare_provider', 'admin'],
    PROFILE_EDIT: ['user', 'healthcare_provider', 'admin'],
  },
}

/**
 * Attribute-based access control utilities
 * For more complex authorization scenarios
 */
export const ABAC = {
  /**
   * Evaluate access based on user, resource, and context
   */
  async evaluateAccess(params: {
    user: { id: string; roles: string[]; email: string }
    resource: { type: string; id?: string; ownerId?: string }
    action: string
    context: { ip?: string; time?: Date; location?: string }
  }): Promise<boolean> {
    const { user, resource, action } = params
    
    // Super admin has access to everything
    if (user.roles.includes('super_admin')) {
      return true
    }
    
    // Resource owner can always access their own resources
    if (resource.ownerId === user.id && action !== 'delete') {
      return true
    }
    
    // Healthcare providers can access patient data
    if (
      resource.type === 'patient_data' &&
      RBAC.hasAnyRole(user.roles, RBAC.permissions.PATIENT_DATA_ACCESS) &&
      action === 'read'
    ) {
      return true
    }
    
    // Admin users can access most resources
    if (user.roles.includes('admin') && resource.type !== 'sensitive_data') {
      return true
    }
    
    // Default deny
    return false
  },
}