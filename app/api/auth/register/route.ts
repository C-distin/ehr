import { NextResponse } from 'next/server';
import { db } from '@/db';
import { users } from '@/db/schema';
import { userSchema } from '@/app/types/schema';
import bcrypt from 'bcryptjs';
import { z } from 'zod';

const adminSignupSchema = userSchema.extend({
  adminCode: z.string().min(6),
});

const ADMIN_CODE = process.env.ADMIN_CODE || 'admin123'; // In production, use a secure environment variable

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const validatedData = adminSignupSchema.parse(body);

    // Verify admin code
    if (validatedData.role === 'administrator' && validatedData.adminCode !== ADMIN_CODE) {
      return NextResponse.json({ error: 'Invalid admin code' }, { status: 403 });
    }

    // Check if email already exists
    const existingUser = await db.query.users.findFirst({
      where: (users, { eq }) => eq(users.email, validatedData.email)
    });

    if (existingUser) {
      return NextResponse.json({ error: 'Email already exists' }, { status: 400 });
    }

    const hashedPassword = await bcrypt.hash(validatedData.password, 10);

    const [user] = await db.insert(users).values({
      email: validatedData.email,
      name: validatedData.name,
      password: hashedPassword,
      role: validatedData.role,
    }).returning();

    return NextResponse.json({ 
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        role: user.role
      }
    });
  } catch (error) {
    console.error('Registration error:', error);
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: error.errors[0].message }, { status: 400 });
    }
    return NextResponse.json({ error: 'Registration failed' }, { status: 500 });
  }
}