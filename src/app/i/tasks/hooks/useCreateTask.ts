import { taskService } from '@/services/task.service';
import { TaskUpdatePayload } from '@/types/task.types';
import { useMutation, useQueryClient } from '@tanstack/react-query';

export const useCreateTask = () => {
  const queryClient = useQueryClient();

  const { mutate: createTask } = useMutation({
    mutationKey: ['create task'],
    mutationFn: (data: TaskUpdatePayload) => taskService.createTask(data),
    onSuccess() {
      queryClient.invalidateQueries({ queryKey: ['tasks'] });
    },
  });
  return { createTask };
};
