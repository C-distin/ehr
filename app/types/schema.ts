import { z } from 'zod';

export const userSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
  name: z.string().min(2),
  role: z.enum(['reception', 'doctor', 'nurse', 'lab_technician', 'pharmacist', 'administrator', 'cashier'])
});

export const patientSchema = z.object({
  firstName: z.string().min(2),
  lastName: z.string().min(2),
  dateOfBirth: z.string(),
  gender: z.enum(['male', 'female', 'other']),
  email: z.string().email().optional(),
  phone: z.string().min(10),
  address: z.string().min(5)
});

export const appointmentSchema = z.object({
  patientId: z.string(),
  doctorId: z.string(),
  date: z.string(),
  time: z.string(),
  type: z.enum(['consultation', 'follow_up', 'emergency']),
  status: z.enum(['scheduled', 'completed', 'cancelled']),
  notes: z.string().optional()
});