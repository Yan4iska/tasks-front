'use client';
import { DASHBOARD_PAGES } from '@/config/pages-url.config';
import { authService } from '@/services/auth.service';
import { IAuthForm } from '@/types/auth.types';
import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { toast } from 'sonner';
import styles from './Auth.module.scss';
import { Heading } from '@/components/ui/heading/Heading';
import { Field } from '@/components/ui/fields/Field';
import { Button } from '@/components/ui/buttons/Button';
export const Auth = () => {
  const { register, handleSubmit, reset } = useForm<IAuthForm>({
    mode: 'onChange',
  });

  const [isLoginForm, setIsLoginForm] = useState(false);
  const { push } = useRouter();

  const { mutate } = useMutation({
    mutationKey: ['auth'],
    mutationFn: (data: IAuthForm) => authService.main(isLoginForm ? 'login' : 'register', data),
    onSuccess() {
      toast.success('Successfully login!');
      reset();
      push(DASHBOARD_PAGES.HOME);
    },
    onError(err: unknown) {
      const msg =
        err && typeof err === 'object' && 'response' in err
          ? String((err as { response?: { data?: { message?: unknown } } }).response?.data?.message ?? '')
          : '';
      toast.error(msg || 'Auth failed. Check email/password or try again.');
    },
  });

  const onSubmit: SubmitHandler<IAuthForm> = (data) => {
    mutate(data);
  };

  return (
    <div className={styles.container}>
      <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
        <Heading title="Authorization" />
        <Field
          id="email"
          label="Email:"
          placeholder="Enter email:"
          type="email"
          className={styles.Field}
          {...register('email', {
            required: 'Email is required!',
          })}
        />
        <Field
          id="password"
          label="Password:"
          placeholder="Enter password:"
          type="password"
          className={styles.Field}
          {...register('password', {
            required: 'Password is required!',
          })}
        />
        <div className={styles.buttons}>
          <Button type="button" onClick={() => setIsLoginForm(true)}>
            Login
          </Button>
          <Button type="button" onClick={() => setIsLoginForm(false)}>
            Register
          </Button>
        </div>
        <Button type="submit" className={styles.submit}>
          {isLoginForm ? 'Sign in' : 'Create account'}
        </Button>
      </form>
    </div>
  );
};
