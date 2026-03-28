import { type Dispatch, type SetStateAction } from 'react';
import { TaskItem, createTaskDraft } from '@/types/task.types';
import styles from './ListAddRowInput.module.scss';

interface IListAddRowInput {
  filterDate?: string;
  setItems: Dispatch<SetStateAction<TaskItem[] | undefined>>;
}

export function ListAddRowInput({ setItems, filterDate }: IListAddRowInput) {
  const addRow = () => {
    setItems((prev) => {
      if (!prev) return;

      return [
        ...prev,
        createTaskDraft(filterDate),
      ];
    });
  };

  return (
    <div className={styles.addRow}>
      <button onClick={addRow}>Add task...</button>
    </div>
  );
}
