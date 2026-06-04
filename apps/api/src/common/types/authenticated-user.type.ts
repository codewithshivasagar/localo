import type { Role } from '@localo/shared-types';

export interface AuthenticatedUser {
  id: string;
  email: string;
  role: Role;
}
