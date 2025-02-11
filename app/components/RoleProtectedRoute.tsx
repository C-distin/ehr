'use client';

import { useAuthorization } from '../lib/auth';
import { Role } from '../types/user';

interface RoleProtectedRouteProps {
  children: React.ReactNode;
  allowedRoles: Role[];
}

export default function RoleProtectedRoute({ children, allowedRoles }: RoleProtectedRouteProps) {
  const { authorized, loading } = useAuthorization(allowedRoles);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!authorized) {
    return <div>Not authorized</div>;
  }

  return <>{children}</>;
}