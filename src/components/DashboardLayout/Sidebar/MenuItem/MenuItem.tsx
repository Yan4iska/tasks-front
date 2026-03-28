import Link from 'next/link';

import { IMenuItem } from '../Menu.interface';
import styles from './MenuItem.module.scss';

export function MenuItem({ item }: { item: IMenuItem }) {
  return (
    <div>
      <Link href={item.link} className={styles.menuItem}>
        <item.icon />
        <span>{item.name}</span>
      </Link>
    </div>
  );
}
