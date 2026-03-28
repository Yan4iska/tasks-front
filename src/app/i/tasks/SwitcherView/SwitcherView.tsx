'use client';

import cn from 'clsx';
import { Kanban, ListTodo } from 'lucide-react';
import { memo } from 'react';
import styles from './SwitcherView.module.scss';
import type { TypeView } from '../TasksView/TasksView';

interface ISwitcherView {
  type: TypeView;
  setType: (value: TypeView) => void;
}

function SwitcherViewComponent({ setType, type }: ISwitcherView) {
  return (
    <div className={styles.container}>
      <button
        type="button"
        className={cn(styles.button, {
          [styles.inactive]: type === 'kanban',
        })}
        onClick={() => setType('list')}
      >
        <ListTodo className={styles.icon} />
        List
      </button>
      <button
        type="button"
        className={cn(styles.button, {
          [styles.inactive]: type === 'list',
        })}
        onClick={() => setType('kanban')}
      >
        <Kanban className={styles.icon} />
        Board
      </button>
    </div>
  );
}

export const SwitcherView = memo(SwitcherViewComponent);
