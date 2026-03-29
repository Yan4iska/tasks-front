import Link from 'next/link';

import { IMenuItem } from '../Menu.interface';
import styles from './MenuItem.module.scss';

export function MenuItem({ item, onNavigate }: { item: IMenuItem; onNavigate?: () => void }) {
  return (
    <div>
      <Link href={item.link} className={styles.menuItem} onClick={() => onNavigate?.()}>
        <item.icon aria-hidden />
        <span>{item.name}</span>
      </Link>
    </div>
  );
}
