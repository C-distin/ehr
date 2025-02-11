import NextAuth from 'next-auth';
import { authConfig } from './lib/auth/config';

export const middleware = NextAuth(authConfig).auth;

export const config = {
  matcher: [
    '/dashboard/:path*',
    '/api/patients/:path*',
    '/api/appointments/:path*',
    '/api/medical-records/:path*',
    '/api/lab-tests/:path*',
    '/api/prescriptions/:path*',
    '/api/payments/:path*'
  ]
};