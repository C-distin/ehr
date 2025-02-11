import { NextResponse } from 'next/server';
import { db } from '@/db';
import { medicalRecords } from '@/db/schema';
import { auth } from '@/lib/auth/config';

export async function POST(request: Request) {
  try {
    const session = await auth();
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await request.json();
    const [record] = await db.insert(medicalRecords).values({
      patientId: body.patientId,
      doctorId: session.user.id,
      diagnosis: body.diagnosis,
      treatment: body.treatment,
      notes: body.notes,
    }).returning();

    return NextResponse.json({ record });
  } catch (error) {
    console.error('Medical record creation error:', error);
    return NextResponse.json({ error: 'Failed to create medical record' }, { status: 500 });
  }
}

export async function GET(request: Request) {
  try {
    const session = await auth();
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const records = await db.query.medicalRecords.findMany({
      with: {
        patient: true,
        doctor: true,
      },
    });

    return NextResponse.json({ records });
  } catch (error) {
    console.error('Medical records fetch error:', error);
    return NextResponse.json({ error: 'Failed to fetch medical records' }, { status: 500 });
  }
}