'use client';

import type { PropsWithChildren } from 'react';
import { useCallback, useEffect, useState } from 'react';

import { Header } from './Header/Header';
import { Sidebar } from './Sidebar/Sidebar';

import styles from './DashboardLayout.module.scss';

export default function DashboardLayout({ children }: PropsWithChildren<unknown>) {
  const [navOpen, setNavOpen] = useState(false);

  const closeNav = useCallback(() => setNavOpen(false), []);
  const openNav = useCallback(() => setNavOpen(true), []);

  useEffect(() => {
    if (!navOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') closeNav();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [navOpen, closeNav]);

  return (
    <div className={styles.dashboardLayout}>
      <button
        type="button"
        className={styles.scrim}
        aria-label="Close menu"
        tabIndex={navOpen ? 0 : -1}
        data-open={navOpen ? 'true' : 'false'}
        onClick={closeNav}
      />
      <Sidebar isOpen={navOpen} onNavigate={closeNav} />
      <main className={styles.main}>
        <Header onMenuOpen={openNav} />
        <div className={styles.mainInner}>{children}</div>
      </main>
    </div>
  );
}
