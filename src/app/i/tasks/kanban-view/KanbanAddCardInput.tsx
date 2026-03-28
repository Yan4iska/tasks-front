import { type Dispatch, type SetStateAction } from 'react';

import type { TaskItem } from '@/types/task.types';
import { createTaskDraft } from '@/types/task.types';
import styles from './KanbanAddCardInput.module.scss';

interface IKanbanAddCardInput {
  filterDate?: string;
  setItems: Dispatch<SetStateAction<TaskItem[] | undefined>>;
}

export function KanbanAddCardInput({ setItems, filterDate }: IKanbanAddCardInput) {
  const addCard = () => {
    setItems((prev) => {
      if (!prev) return;

      return [
        ...prev,
        createTaskDraft(filterDate),
      ];
    });
  };

  return (
    <div className={styles.addCard}>
      <button onClick={addCard} className={styles.button}>
        Add task...
      </button>
    </div>
  );
}
