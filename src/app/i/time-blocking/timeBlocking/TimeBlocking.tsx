'use client';

import { FormProvider, useForm } from 'react-hook-form';

import type { TypeTimeBlockFormState } from '@/types/time-block.types';

import styles from './TimeBlocking.module.scss';
import { TimeBlockingForm } from '../form/TimeBlocking';
import { TimeBlockingList } from './TimeBlockingList';

export function TimeBlocking() {
  const methods = useForm<TypeTimeBlockFormState>();

  return (
    <FormProvider {...methods}>
      <div className={styles.container}>
        <TimeBlockingList />
        <TimeBlockingForm />
      </div>
    </FormProvider>
  );
}
