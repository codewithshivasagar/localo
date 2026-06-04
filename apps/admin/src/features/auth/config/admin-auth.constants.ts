import { Role } from '@localo/shared-types';

export const ADMIN_AUTH_COPY = {
  title: 'Welcome back',
  subtitle: 'Sign in to continue to Localo Admin.',
  emailLabel: 'Email address',
  passwordLabel: 'Password',
  submitLabel: 'Sign in',
  loadingLabel: 'Signing in...',
  securityNote: 'Admin access only. Unauthorized access is restricted.',
  invalidLogin: 'Invalid email or password.',
  nonAdmin: 'You do not have permission to access the Admin Panel.',
  networkError: 'We could not sign you in right now. Please try again.'
} as const;

export const ADMIN_ALLOWED_ROLES = [Role.ADMIN, Role.SUPER_ADMIN] as const;

export type AdminAllowedRole = (typeof ADMIN_ALLOWED_ROLES)[number];

export function isAdminRole(role: unknown): role is AdminAllowedRole {
  return ADMIN_ALLOWED_ROLES.includes(role as AdminAllowedRole);
}
