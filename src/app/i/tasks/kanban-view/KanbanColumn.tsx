import { Draggable, Droppable } from '@hello-pangea/dnd';
import type { Dispatch, SetStateAction } from 'react';
import { memo } from 'react';

import { isTaskDraft, type TaskItem } from '@/types/task.types';

import { FILTERS } from '../columns.data';
import type { TaskColumnId } from '../columns.data';
import { filterTasks } from '../filter-tasks';

import { KanbanAddCardInput } from './KanbanAddCardInput';
import { KanbanCard } from './KanbanCard';
import styles from './KanbanView.module.scss';

interface IKanbanColumn {
  value: TaskColumnId;
  label: string;
  items: TaskItem[] | undefined;
  setItems: Dispatch<SetStateAction<TaskItem[] | undefined>>;
}

function KanbanColumnComponent({ value, items, label, setItems }: IKanbanColumn) {
  return (
    <Droppable droppableId={value}>
      {(provided) => (
        <div ref={provided.innerRef} {...provided.droppableProps}>
          <div className={styles.column}>
            <div className={styles.columnHeading}>{label}</div>

            {filterTasks(items, value)?.map((item, index) =>
              isTaskDraft(item) ? (
                <KanbanCard key={`draft-${value}`} item={item} setItems={setItems} />
              ) : (
                <Draggable key={item.id} draggableId={item.id} index={index}>
                  {(provided) => (
                    <div
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                    >
                      <KanbanCard key={item.id} item={item} setItems={setItems} />
                    </div>
                  )}
                </Draggable>
              ),
            )}

            {provided.placeholder}

            {value !== 'completed' && !items?.some((item) => item.id === '') && (
              <KanbanAddCardInput
                setItems={setItems}
                filterDate={value === 'completed' ? undefined : FILTERS[value].format()}
              />
            )}
          </div>
        </div>
      )}
    </Droppable>
  );
}

export const KanbanColumn = memo(KanbanColumnComponent);
