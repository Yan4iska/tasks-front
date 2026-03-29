'use client';

import { Menu } from 'lucide-react';
import type { FC } from 'react';

import GlobalLoader from './GlobalLoader/GlobalLoader';
import { Profile } from './Profile/Profile';

import styles from './Header.module.scss';

type HeaderProps = {
  onMenuOpen: () => void;
};

export const Header: FC<HeaderProps> = ({ onMenuOpen }) => {
  return (
    <header className={styles.header}>
      <button
        type="button"
        className={styles.menuButton}
        onClick={onMenuOpen}
        aria-label="Open navigation menu"
      >
        <Menu className={styles.menuIcon} strokeWidth={2} aria-hidden />
      </button>
      <div className={styles.headerRight}>
        <GlobalLoader />
        <Profile />
      </div>
    </header>
  );
};
