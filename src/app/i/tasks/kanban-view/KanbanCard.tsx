import cn from 'clsx';
import { GripVertical, Loader, Trash } from 'lucide-react';
import type { Dispatch, SetStateAction } from 'react';
import { memo } from 'react';
import { Controller, useForm } from 'react-hook-form';

import Checkbox from '@/components/ui/checkbox/Checkbox';
import { TransparentField } from '@/components/ui/fields/transparentField/TransparentField';
import { DatePicker } from '@/components/ui/task-edit/date-picker/DatePicker';
import { ColorSelect } from '@/components/ui/ColorSelect/ColorSelect';

import { isTaskDraft, type TaskItem, type TypeTaskFormState } from '@/types/task.types';

import { useDeleteTask } from '../hooks/useDeleteTask';
import { useTaskDebounce } from '../hooks/useTaskDebounce';

import styles from './KanbanView.module.scss';

interface IKanbanCard {
  item: TaskItem;
  setItems: Dispatch<SetStateAction<TaskItem[] | undefined>>;
}

function KanbanCardComponent({ item, setItems }: IKanbanCard) {
  const { register, control, watch } = useForm<TypeTaskFormState>({
    defaultValues: {
      name: item.name,
      isCompleted: item.isCompleted,
      createdAt: item.createdAt,
      priority: item.priority,
    },
  });

  useTaskDebounce({ watch, itemId: item.id });

  const { deleteTask, isDeletePending } = useDeleteTask();

  return (
    <div
      className={cn(
        styles.card,
        {
          [styles.completed]: watch('isCompleted'),
        },
        'animation-opacity',
      )}
    >
      <div className={styles.cardHeader}>
        <button aria-describedby="todo-item">
          <GripVertical className={styles.grip} />
        </button>

        <Controller
          control={control}
          name="isCompleted"
          render={({ field: { value, onChange } }) => (
            <Checkbox onChange={onChange} checked={value} />
          )}
        />

        <TransparentField {...register('name')} />
      </div>

      <div className={styles.cardBody}>
        <Controller
          control={control}
          name="createdAt"
          render={({ field: { value, onChange } }) => (
            <DatePicker onChange={onChange} value={value || ''} position="left" />
          )}
        />

        <Controller
          control={control}
          name="priority"
          render={({ field: { value, onChange } }) => (
            <ColorSelect
              options={[
                { value: 'high', label: 'High', color: '#ff4d4f' },
                { value: 'medium', label: 'Medium', color: '#f6c344' },
                { value: 'low', label: 'Low', color: '#2ecc71' },
              ]}
              onChange={onChange}
              value={value || ''}
              placeholder="Priority"
              ariaLabel="Select task priority"
              className={styles.prioritySelect}
            />
          )}
        />
      </div>

      <div className={styles.cardActions}>
        <button
          onClick={() => (isTaskDraft(item) ? setItems((prev) => prev?.slice(0, -1)) : deleteTask(item.id))}
          className="opacity-50 transition-opacity hover:opacity-100"
        >
          {isDeletePending ? <Loader size={15} /> : <Trash size={15} />}
        </button>
      </div>
    </div>
  );
}

export const KanbanCard = memo(KanbanCardComponent);
