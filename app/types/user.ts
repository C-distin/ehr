export type Role = 'reception' | 'doctor' | 'nurse' | 'lab_technician' | 'pharmacist' | 'administrator' | 'cashier';

export interface User {
  id: string;
  name: string;
  email: string;
  role: Role;
  createdAt: Date;
  updatedAt: Date;
}