import { Draggable, Droppable } from '@hello-pangea/dnd';
import type { Dispatch, SetStateAction } from 'react';
import { memo } from 'react';

import { isTaskDraft, type TaskItem } from '@/types/task.types';

import { FILTERS } from '../../columns.data';
import type { TaskColumnId } from '../../columns.data';
import { filterTasks } from '../../filter-tasks';

import { ListAddRowInput } from '../ListAddRowInput/ListAddRowInput';
import { ListRow } from '../ListRow/ListRow';
import styles from '../ListView/ListView.module.scss';

interface IListRowParent {
  value: TaskColumnId;
  label: string;
  items: TaskItem[] | undefined;
  setItems: Dispatch<SetStateAction<TaskItem[] | undefined>>;
}

function ListRowParentComponent({ value, items, label, setItems }: IListRowParent) {
  return (
    <Droppable droppableId={value}>
      {(provided) => (
        <div ref={provided.innerRef} {...provided.droppableProps}>
          <div className={styles.colHeading}>
            <div className="w-full">{label}</div>
          </div>

          {filterTasks(items, value)?.map((item, index) =>
            isTaskDraft(item) ? (
              <ListRow key={`draft-${value}`} item={item} setItems={setItems} />
            ) : (
              <Draggable key={item.id} draggableId={item.id} index={index}>
                {(provided) => (
                  <div
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                  >
                    <ListRow key={item.id} item={item} setItems={setItems} />
                  </div>
                )}
              </Draggable>
            ),
          )}

          {provided.placeholder}

          {value !== 'completed' && !items?.some((item) => item.id === '') && (
            <ListAddRowInput
              setItems={setItems}
              filterDate={FILTERS[value].format()}
            />
          )}
        </div>
      )}
    </Droppable>
  );
}

export const ListRowParent = memo(ListRowParentComponent);
