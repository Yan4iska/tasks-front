import dayjs from 'dayjs';
import isSameOrAfter from 'dayjs/plugin/isSameOrAfter';
import isSameOrBefore from 'dayjs/plugin/isSameOrBefore';

import type { TaskColumnId } from './columns.data';
import type { TaskItem } from '@/types/task.types';
import { isTaskDraft } from '@/types/task.types';

import { FILTERS } from './columns.data';

dayjs.extend(isSameOrAfter);
dayjs.extend(isSameOrBefore);

const getTaskDate = (task: TaskItem) => (task.createdAt ? dayjs(task.createdAt) : null);

export const filterTasks = (tasks: TaskItem[] | undefined, value: TaskColumnId) => {
  switch (value) {
    case 'today':
      return tasks?.filter(
        (item) => {
          if (isTaskDraft(item) && !item.createdAt) return false;
          const date = getTaskDate(item);
          return Boolean(date?.isSame(FILTERS.today, 'day') && !item.isCompleted);
        },
      );

    case 'tomorrow':
      return tasks?.filter(
        (item) => {
          if (isTaskDraft(item) && !item.createdAt) return false;
          const date = getTaskDate(item);
          return Boolean(date?.isSame(FILTERS.tomorrow, 'day') && !item.isCompleted);
        },
      );

    case 'on-this-week':
      return tasks?.filter(
        (item) =>
          !isTaskDraft(item) &&
          !dayjs(item.createdAt).isSame(FILTERS.today) &&
          !dayjs(item.createdAt).isSame(FILTERS.tomorrow) &&
          dayjs(item.createdAt).isSameOrBefore(FILTERS['on-this-week']) &&
          !item.isCompleted,
      );

    case 'on-next-week':
      return tasks?.filter(
        (item) =>
          !isTaskDraft(item) &&
          dayjs(item.createdAt).isAfter(FILTERS['on-this-week']) &&
          dayjs(item.createdAt).isSameOrBefore(FILTERS['on-next-week']) &&
          !item.isCompleted,
      );

    case 'later':
      return tasks?.filter(
        (item) =>
          (isTaskDraft(item) ||
            dayjs(item.createdAt).isAfter(FILTERS['on-next-week']) ||
            !item.createdAt) &&
          !item.isCompleted,
      );

    case 'completed':
      return tasks?.filter((item) => item.isCompleted);

    default:
      return [];
  }
};
