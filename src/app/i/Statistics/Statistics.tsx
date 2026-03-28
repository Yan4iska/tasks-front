'use client';
import styles from './Statistics.module.scss';
import Loader from '@/components/ui/Loader/Loader';
import useProfile from '@/hooks/useProfile';

export default function Statistics() {
  const { data, isLoading } = useProfile();
  console.log(data?.statistics);
  return isLoading ? (
    <Loader />
  ) : (
    <div className={styles.gridContainer}>
      {data?.statistics.length ? (
        data.statistics.map((statistic) => (
          <div className={styles.card} key={statistic.label}>
            <div className={styles.label}>{statistic.label}</div>
            <div className={styles.value}>{statistic.val}</div>
          </div>
        ))
      ) : (
        <div>Statistics not loaded</div>
      )}
    </div>
  );
}
