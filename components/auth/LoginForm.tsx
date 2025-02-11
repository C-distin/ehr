'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import styles from './Auth.module.css';

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
});

type LoginFormData = z.infer<typeof loginSchema>;

export default function LoginForm() {
  const router = useRouter();
  const { register, handleSubmit, formState: { errors } } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data: LoginFormData) => {
    const result = await signIn('credentials', {
      ...data,
      redirect: false,
    });

    if (result?.ok) {
      router.push('/dashboard');
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
      <div className={styles.formGroup}>
        <label htmlFor="email">Email</label>
        <input
          {...register('email')}
          type="email"
          id="email"
          className={styles.input}
        />
        {errors.email && (
          <span className={styles.error}>{errors.email.message}</span>
        )}
      </div>

      <div className={styles.formGroup}>
        <label htmlFor="password">Password</label>
        <input
          {...register('password')}
          type="password"
          id="password"
          className={styles.input}
        />
        {errors.password && (
          <span className={styles.error}>{errors.password.message}</span>
        )}
      </div>

      <button type="submit" className={styles.button}>
        Sign In
      </button>
    </form>
  );
}