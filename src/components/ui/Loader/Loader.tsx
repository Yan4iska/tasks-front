import { Loader as LoaderIcon } from 'lucide-react';
import styles from './Loader.module.scss';

const Loader = () => {
  return (
    <div className={styles.loader} data-testid="loader">
      <LoaderIcon className={styles['loader-icon']} data-testid="loader-icon" />
    </div>
  );
};

export default Loader;
