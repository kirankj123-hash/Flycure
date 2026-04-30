// Guard Types for Scalable Route Protection

export type Permission = 
  // Public permissions
  | 'view:public'
  | 'view:departments'
  | 'view:doctors'
  | 'view:hospitals'
  // User permissions
  | 'view:dashboard'
  | 'book:appointment'
  | 'view:appointments'
  | 'cancel:appointment'
  | 'view:medical-records'
  | 'update:profile'
  | 'view:enquiries'
  | 'create:enquiry'
  // Healthcare provider permissions
  | 'manage:appointments'
  | 'view:patient-records'
  | 'update:availability'
  // Admin permissions
  | 'manage:users'
  | 'manage:enquiries'
  | 'view:metrics'
  | 'manage:departments'
  | 'manage:doctors'
  | 'manage:hospitals'
  | 'manage:content'
  // Super admin permissions
  | 'system:admin'
  | 'manage:permissions'
  | 'manage:roles';

export type Role = 
  | 'guest' 
  | 'user' 
  | 'healthcare_provider' 
  | 'admin' 
  | 'super_admin';

export interface RateLimitConfig {
  requests: number;
  windowMs: number;
}

export interface RouteGuard {
  path: string;
  requiredAuth: boolean;
  requiredPermissions?: Permission[];
  requiredRoles?: Role[];
  rateLimit?: RateLimitConfig;
  description?: string;
}

export interface GuardCheckResult {
  allowed: boolean;
  reason?: string;
  redirectTo?: string;
}

export interface UserSession {
  user: {
    id: string;
    email: string;
    role: Role;
    permissions?: Permission[];
  };
}
