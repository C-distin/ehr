'use client';

import { useEffect, useState } from 'react';
import { Role, User } from '../types/user';

export function useAuth() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Replace with actual authentication logic
    const mockUser: User = {
      id: '1',
      name: 'John Doe',
      email: 'john@example.com',
      role: 'doctor',
      createdAt: new Date(),
      updatedAt: new Date()
    };
    setUser(mockUser);
    setLoading(false);
  }, []);

  return { user, loading };
}

export function useAuthorization(allowedRoles: Role[]) {
  const { user, loading } = useAuth();
  const [authorized, setAuthorized] = useState(false);

  useEffect(() => {
    if (user && allowedRoles.includes(user.role)) {
      setAuthorized(true);
    }
  }, [user, allowedRoles]);

  return { authorized, loading };
}