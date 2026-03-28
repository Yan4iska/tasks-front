import { Controller, SubmitHandler, useFormContext } from 'react-hook-form';
import { Button } from '@/components/ui/buttons/Button';
import { Field } from '@/components/ui/fields/Field';
import { ColorSelect } from '@/components/ui/ColorSelect/ColorSelect';
import { useCallback } from 'react';

import type { TypeTimeBlockFormState } from '@/types/time-block.types';
import { DEFAULT_TIME_BLOCK_COLOR, TIME_BLOCK_COLOR_OPTIONS } from './colors.data';
import { useCreateTimeBlock } from '../hooks/useCreateTimeBlock';
import { useUpdateTimeBlock } from '../hooks/useUpdateTimBlock';
import styles from './TimeBlockingForm.module.scss';

export function TimeBlockingForm() {
  const { register, control, watch, reset, handleSubmit } =
    useFormContext<TypeTimeBlockFormState>();

  const existsId = watch('id');

  const { updateTimeBlock } = useUpdateTimeBlock(existsId);
  const { createTimeBlock, isPending } = useCreateTimeBlock();

  const onSubmit: SubmitHandler<TypeTimeBlockFormState> = useCallback((data) => {
    const { color, id, ...rest } = data;
    const dto = { ...rest, color: color || undefined };

    if (id) {
      updateTimeBlock({
        id,
        data: dto,
      });
    } else {
      createTimeBlock(dto);
    }

    reset({
      color: DEFAULT_TIME_BLOCK_COLOR,
      duration: 0,
      name: '',
      id: undefined,
      order: 1,
    });
  }, [createTimeBlock, reset, updateTimeBlock]);

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
      <Field
        {...register('name', {
          required: true,
        })}
        id="name"
        label="Enter name:"
        placeholder="Enter name:"
        className={styles.field}
      />

      <Field
        {...register('duration', {
          required: true,
          valueAsNumber: true,
        })}
        id="duration"
        label="Enter duration (min.):"
        placeholder="Enter duration (min.):"
        isNumber
        className={styles.field}
      />

      <div className={styles.selectWrapper}>
        <span className={styles.colorLabel}>Color:</span>
        <Controller
          control={control}
          name="color"
          render={({ field: { value, onChange } }) => (
            <ColorSelect
              options={TIME_BLOCK_COLOR_OPTIONS}
              onChange={onChange}
              value={value || DEFAULT_TIME_BLOCK_COLOR}
              className={styles.colorSelect}
              placeholder="Pick color"
              ariaLabel="Select time block color"
            />
          )}
        />
      </div>

      <Button type="submit" disabled={isPending} className={styles.submitButton}>
        {existsId ? 'Update' : 'Create'}
      </Button>
    </form>
  );
}
