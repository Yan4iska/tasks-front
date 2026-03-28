import { FILTERS } from '../columns.data';
import type { TaskColumnId } from '../columns.data';
import { useUpdateTask } from './useUpdateTask';
import { DropResult } from '@hello-pangea/dnd';

export function useTaskDnd() {
  const { updateTask } = useUpdateTask();

  const onDragEnd = (res: DropResult) => {
    if (!res.destination) return;

    const destinationColumnId = res.destination.droppableId as TaskColumnId;

    // Проверка для колонки 'completed'
    if (destinationColumnId === 'completed') {
      updateTask({
        id: res.draggableId,
        data: {
          isCompleted: true,
        },
      });
      return;
    }

    // После ветки 'completed' тип уже без 'completed' — проверяем только FILTERS (невалидный droppableId с рантайма).
    if (!FILTERS[destinationColumnId]) {
      console.error('Invalid destination:', destinationColumnId);
      return;
    }

    const newCreatedAt = FILTERS[destinationColumnId].toISOString();

    updateTask({
      id: res.draggableId,
      data: {
        createdAt: newCreatedAt,
        isCompleted: false,
      },
    });
  };

  return { onDragEnd };
}
