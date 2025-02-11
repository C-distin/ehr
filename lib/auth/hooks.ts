'use client';

import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { Role } from '@/app/types/user';

export function useAuth() {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/');
    }
  }, [status, router]);

  return { session, status };
}

export function useRoleProtected(allowedRoles: Role[]) {
  const { session, status } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (status === 'authenticated' && session?.user?.role) {
      if (!allowedRoles.includes(session.user.role as Role)) {
        router.push('/dashboard');
      }
    }
  }, [status, session, router, allowedRoles]);

  return { session, status };
}