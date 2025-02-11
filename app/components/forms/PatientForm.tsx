'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { patientSchema } from '@/app/types/schema';
import styles from './Form.module.css';

export default function PatientForm() {
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm({
    resolver: zodResolver(patientSchema)
  });

  const onSubmit = async (data: any) => {
    // Handle form submission
    console.log(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
      <div className={styles.formGroup}>
        <label htmlFor="firstName">First Name</label>
        <input {...register('firstName')} id="firstName" />
        {errors.firstName && <span className={styles.error}>{errors.firstName.message}</span>}
      </div>

      <div className={styles.formGroup}>
        <label htmlFor="lastName">Last Name</label>
        <input {...register('lastName')} id="lastName" />
        {errors.lastName && <span className={styles.error}>{errors.lastName.message}</span>}
      </div>

      <div className={styles.formGroup}>
        <label htmlFor="dateOfBirth">Date of Birth</label>
        <input {...register('dateOfBirth')} type="date" id="dateOfBirth" />
        {errors.dateOfBirth && <span className={styles.error}>{errors.dateOfBirth.message}</span>}
      </div>

      <button type="submit" className={styles.submitButton}>
        Save Patient
      </button>
    </form>
  );
}