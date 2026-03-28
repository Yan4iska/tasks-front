import { IBase } from './root.types';

export const TASK_PRIORITIES = ['low', 'medium', 'high'] as const;
export type TaskPriority = (typeof TASK_PRIORITIES)[number];

export interface TaskEntity extends IBase {
  name: string;
  priority: TaskPriority;
  isCompleted: boolean;
  // The backend currently uses createdAt as date bucket source.
  createdAt: string;
  labels?: string[];
  assigneeIds?: string[];
}

export interface TaskDraft {
  id: '';
  name: string;
  priority: TaskPriority;
  isCompleted: boolean;
  createdAt?: string;
}

export type TaskItem = TaskEntity | TaskDraft;
export type TaskUpdatePayload = Partial<
  Pick<TaskEntity, 'name' | 'priority' | 'isCompleted' | 'createdAt'>
>;
export type TypeTaskFormState = TaskUpdatePayload;

export const isTaskDraft = (task: TaskItem): task is TaskDraft => task.id === '';

export const createTaskDraft = (createdAt?: string): TaskDraft => ({
  id: '',
  name: '',
  priority: 'low',
  isCompleted: false,
  createdAt,
});
