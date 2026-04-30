import type { Permission, Role } from './types';

/**
 * Role-Permission Mapping
 * Defines what permissions each role has
 */
export const rolePermissions: Record<Role, Permission[]> = {
  guest: [
    'view:public',
    'view:departments',
    'view:doctors',
    'view:hospitals',
  ],
  
  user: [
    'view:public',
    'view:departments',
    'view:doctors',
    'view:hospitals',
    'view:dashboard',
    'book:appointment',
    'view:appointments',
    'cancel:appointment',
    'view:medical-records',
    'update:profile',
    'view:enquiries',
    'create:enquiry',
  ],
  
  healthcare_provider: [
    'view:public',
    'view:departments',
    'view:doctors',
    'view:hospitals',
    'view:dashboard',
    'view:appointments',
    'manage:appointments',
    'view:patient-records',
    'update:availability',
    'update:profile',
  ],
  
  admin: [
    'view:public',
    'view:departments',
    'view:doctors',
    'view:hospitals',
    'view:dashboard',
    'manage:users',
    'manage:enquiries',
    'view:metrics',
    'manage:departments',
    'manage:doctors',
    'manage:hospitals',
    'manage:content',
    'view:appointments',
    'manage:appointments',
  ],
  
  super_admin: [
    'view:public',
    'view:departments',
    'view:doctors',
    'view:hospitals',
    'view:dashboard',
    'manage:users',
    'manage:enquiries',
    'view:metrics',
    'manage:departments',
    'manage:doctors',
    'manage:hospitals',
    'manage:content',
    'view:appointments',
    'manage:appointments',
    'system:admin',
    'manage:permissions',
    'manage:roles',
    'view:patient-records',
  ],
};

/**
 * Get all permissions for a given role
 */
export function getPermissionsForRole(role: Role): Permission[] {
  return rolePermissions[role] || [];
}

/**
 * Check if a role has a specific permission
 */
export function hasPermission(role: Role, permission: Permission): boolean {
  return rolePermissions[role]?.includes(permission) || false;
}

/**
 * Check if a role has all required permissions
 */
export function hasAllPermissions(role: Role, permissions: Permission[]): boolean {
  const rolePerms = rolePermissions[role] || [];
  return permissions.every(perm => rolePerms.includes(perm));
}

/**
 * Check if a role has any of the required permissions
 */
export function hasAnyPermission(role: Role, permissions: Permission[]): boolean {
  const rolePerms = rolePermissions[role] || [];
  return permissions.some(perm => rolePerms.includes(perm));
}
