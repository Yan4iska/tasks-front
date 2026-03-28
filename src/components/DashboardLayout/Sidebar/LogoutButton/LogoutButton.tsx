'use client';

import { useMutation } from '@tanstack/react-query';
import { LogOut } from 'lucide-react';
import { useRouter } from 'next/navigation';

import { authService } from '@/services/auth.service';

import styles from './LogoutButton.module.scss';

export function LogoutButton() {
  const router = useRouter();

  const { mutate } = useMutation({
    mutationKey: ['logout'],
    mutationFn: () => authService.logout(),
    onSuccess: () => router.push('/auth'),
  });

  return (
    <div className={styles.logoutButton}>
      <button onClick={() => mutate()}>
        <LogOut size={20} />
      </button>
    </div>
  );
}
