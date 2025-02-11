import { pgTable, serial, text, timestamp, uuid, varchar, boolean, jsonb, integer } from 'drizzle-orm/pg-core';
import { relations } from 'drizzle-orm';

export const users = pgTable('users', {
  id: uuid('id').defaultRandom().primaryKey(),
  email: text('email').notNull().unique(),
  name: text('name').notNull(),
  password: text('password').notNull(),
  role: text('role', { enum: ['reception', 'doctor', 'nurse', 'lab_technician', 'pharmacist', 'administrator', 'cashier'] }).notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
});

export const patients = pgTable('patients', {
  id: uuid('id').defaultRandom().primaryKey(),
  firstName: text('first_name').notNull(),
  lastName: text('last_name').notNull(),
  dateOfBirth: timestamp('date_of_birth').notNull(),
  gender: text('gender', { enum: ['male', 'female', 'other'] }).notNull(),
  email: text('email'),
  phone: varchar('phone', { length: 20 }).notNull(),
  address: text('address').notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
});

export const appointments = pgTable('appointments', {
  id: uuid('id').defaultRandom().primaryKey(),
  patientId: uuid('patient_id').notNull().references(() => patients.id),
  doctorId: uuid('doctor_id').notNull().references(() => users.id),
  date: timestamp('date').notNull(),
  type: text('type', { enum: ['consultation', 'follow_up', 'emergency'] }).notNull(),
  status: text('status', { enum: ['scheduled', 'completed', 'cancelled'] }).notNull(),
  notes: text('notes'),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
});

export const medicalRecords = pgTable('medical_records', {
  id: uuid('id').defaultRandom().primaryKey(),
  patientId: uuid('patient_id').notNull().references(() => patients.id),
  doctorId: uuid('doctor_id').notNull().references(() => users.id),
  diagnosis: text('diagnosis').notNull(),
  treatment: text('treatment').notNull(),
  notes: text('notes'),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
});

export const labTests = pgTable('lab_tests', {
  id: uuid('id').defaultRandom().primaryKey(),
  patientId: uuid('patient_id').notNull().references(() => patients.id),
  doctorId: uuid('doctor_id').notNull().references(() => users.id),
  technicianId: uuid('technician_id').references(() => users.id),
  type: text('type').notNull(),
  status: text('status', { enum: ['pending', 'in_progress', 'completed'] }).notNull(),
  results: jsonb('results'),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
});

export const prescriptions = pgTable('prescriptions', {
  id: uuid('id').defaultRandom().primaryKey(),
  patientId: uuid('patient_id').notNull().references(() => patients.id),
  doctorId: uuid('doctor_id').notNull().references(() => users.id),
  medications: jsonb('medications').notNull(),
  status: text('status', { enum: ['pending', 'preparing', 'ready', 'dispensed'] }).notNull(),
  notes: text('notes'),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
});

export const payments = pgTable('payments', {
  id: uuid('id').defaultRandom().primaryKey(),
  patientId: uuid('patient_id').notNull().references(() => patients.id),
  amount: integer('amount').notNull(),
  type: text('type', { enum: ['consultation', 'lab_test', 'prescription'] }).notNull(),
  status: text('status', { enum: ['pending', 'completed', 'cancelled'] }).notNull(),
  referenceId: uuid('reference_id').notNull(), // Links to appointment, lab test, or prescription
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
});

// Relations
export const patientsRelations = relations(patients, ({ many }) => ({
  appointments: many(appointments),
  medicalRecords: many(medicalRecords),
  labTests: many(labTests),
  prescriptions: many(prescriptions),
  payments: many(payments),
}));

export const appointmentsRelations = relations(appointments, ({ one }) => ({
  patient: one(patients, {
    fields: [appointments.patientId],
    references: [patients.id],
  }),
  doctor: one(users, {
    fields: [appointments.doctorId],
    references: [users.id],
  }),
}));

export const medicalRecordsRelations = relations(medicalRecords, ({ one }) => ({
  patient: one(patients, {
    fields: [medicalRecords.patientId],
    references: [patients.id],
  }),
  doctor: one(users, {
    fields: [medicalRecords.doctorId],
    references: [users.id],
  }),
}));