import { NextResponse } from 'next/server';
import { db } from '@/db';
import { appointments } from '@/db/schema';
import { eq } from 'drizzle-orm';
import { auth } from '@/lib/auth/config';
import { appointmentSchema } from '@/app/types/schema';

export async function POST(request: Request) {
  try {
    const session = await auth();
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await request.json();
    const validatedData = appointmentSchema.parse(body);

    const [appointment] = await db.insert(appointments).values({
      ...validatedData,
      doctorId: validatedData.doctorId,
      patientId: validatedData.patientId,
    }).returning();

    return NextResponse.json({ appointment });
  } catch (error) {
    console.error('Appointment creation error:', error);
    return NextResponse.json({ error: 'Failed to create appointment' }, { status: 500 });
  }
}

export async function GET(request: Request) {
  try {
    const session = await auth();
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { searchParams } = new URL(request.url);
    const doctorId = searchParams.get('doctorId');
    const patientId = searchParams.get('patientId');
    const date = searchParams.get('date');

    let query = db.select().from(appointments);

    if (doctorId) {
      query = query.where(eq(appointments.doctorId, doctorId));
    }
    if (patientId) {
      query = query.where(eq(appointments.patientId, patientId));
    }
    if (date) {
      query = query.where(eq(appointments.date, new Date(date)));
    }

    const appointmentsList = await query;
    return NextResponse.json({ appointments: appointmentsList });
  } catch (error) {
    console.error('Appointment fetch error:', error);
    return NextResponse.json({ error: 'Failed to fetch appointments' }, { status: 500 });
  }
}