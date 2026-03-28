import type { PropsWithChildren } from 'react';
import styles from './DashboardLayout.module.scss';

import { Header } from './Header/Header';
import { Sidebar } from './Sidebar/Sidebar';

export default function DashboardLayout({ children }: PropsWithChildren<unknown>) {
  return (
    <div className={styles.dashboardLayout}>
      <Sidebar />

      <main className={styles.main}>
        <Header />
        {children}
      </main>
    </div>
  );
}
