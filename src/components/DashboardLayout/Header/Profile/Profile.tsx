'use client';

import Loader from '@/components/ui/Loader/Loader';
import useProfile from '@/hooks/useProfile';

import styles from './Profile.module.scss';

export function Profile() {
  const { data, isLoading } = useProfile();
  console.log(data?.user);
  const anonimus = 'ANONIMUS[LOL]';
  return (
    <div className={styles.profileContainer}>
      {isLoading ? (
        <Loader />
      ) : (
        <div className={styles.profileContent}>
          <div className={styles.textContainer}>
            <p>{data?.user.name || anonimus}</p>
            <p>{data?.user.email}</p>
          </div>

          <div className={styles.avatar}>{data?.user.name?.charAt(0) || 'A'}</div>
        </div>
      )}
    </div>
  );
}
