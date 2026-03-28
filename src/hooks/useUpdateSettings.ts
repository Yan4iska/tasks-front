import { userService } from '@/services/user.service';
import { TypeUserForm } from '@/types/auth.types';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';

export function useUpdateSettings() {
  const queryClient = useQueryClient();
  const { mutate, isPending } = useMutation({
    mutationKey: ['update profile'],
    mutationFn: (data: TypeUserForm) => userService.update(data),
    onSuccess() {
      toast.success('Successfully update profile!');
      queryClient.invalidateQueries({ queryKey: ['profile'] });
    },
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    onError(error: any) {
      const message = error?.response?.data?.message || 'Failed to update profile';
      toast.error(message);
    },
  });

  return { mutate, isPending };
}
