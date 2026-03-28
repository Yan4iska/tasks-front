'use client';

import { SubmitHandler, useForm } from 'react-hook-form';

import { Button } from '@/components/ui/buttons/Button';
import { Field } from '@/components/ui/fields/Field';

import { TypeUserForm } from '@/types/auth.types';

import styles from './Settings.module.scss';
import { useInitialData } from '@/hooks/useInitialData';
import { useUpdateSettings } from '@/hooks/useUpdateSettings';
export function Settings() {
  const { register, handleSubmit, reset } = useForm<TypeUserForm>({
    mode: 'onChange',
  });

  useInitialData(reset);

  const { isPending, mutate } = useUpdateSettings();

  const onSubmit: SubmitHandler<TypeUserForm> = (data) => {
    const { password, ...rest } = data;

    mutate({
      ...rest,
      password: password || undefined,
    });
  };

  return (
    <div>
      <form className="w-2/4" onSubmit={handleSubmit(onSubmit)}>
        <div className="grid grid-cols-2 gap-10">
          <div>
            <Field
              id="email"
              label="Email: "
              placeholder="Enter email: "
              type="email"
              {...register('email', {
                required: 'Email is required!',
              })}
              className={styles.margins}
            />

            <Field
              id="name"
              label="Name: "
              placeholder="Enter name: "
              {...register('name')}
              className={styles.margins}
            />

            <Field
              id="password"
              label="Password: "
              placeholder="Enter password: "
              type="password"
              {...register('password')}
              className={styles.margins}
            />
          </div>

          <div>
            <Field
              id="workInterval"
              label="Work interval (min.): "
              placeholder="Enter work interval (min.): "
              isNumber
              {...register('workInterval', {
                valueAsNumber: true,
              })}
              className={styles.margins}
            />

            <Field
              id="breakInterval"
              label="Break interval (min.): "
              placeholder="Enter break interval (min.): "
              isNumber
              {...register('breakInterval', {
                valueAsNumber: true,
              })}
              className={styles.margins}
            />

            <Field
              id="intervalsCount"
              label="Intervals count (max 10): "
              placeholder="Enter intervals count (max 10): "
              isNumber
              {...register('intervalsCount', {
                valueAsNumber: true,
              })}
              className={styles.margins}
            />
          </div>
        </div>

        <Button type="submit" disabled={isPending}>
          Save
        </Button>
      </form>
    </div>
  );
}
