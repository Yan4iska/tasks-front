'use client';

import clsx from 'clsx';
import { GanttChartSquare } from 'lucide-react';
import Link from 'next/link';

import { COLORS } from '@/constants/color.constants';

import { LogoutButton } from './LogoutButton/LogoutButton';
import { MenuItem } from './MenuItem/MenuItem';
import { MENU } from './Menu.data';

import styles from './Sidebar.module.scss';

type SidebarProps = {
  isOpen?: boolean;
  onNavigate?: () => void;
};

export function Sidebar({ isOpen = false, onNavigate }: SidebarProps) {
  return (
    <aside className={clsx(styles.sidebar, isOpen && styles.open)}>
      <div className={styles.inner}>
        <Link href="/boards" className={styles.header} onClick={onNavigate}>
          <GanttChartSquare color={COLORS.primary} className={styles.logo} aria-hidden />
          <span className={styles.title}>TRELLO 2</span>
        </Link>
        <div className={styles.menu}>
          <LogoutButton />
          {MENU.map((item) => (
            <MenuItem item={item} key={item.link} onNavigate={onNavigate} />
          ))}
        </div>
      </div>
      <footer className={styles.footer}>
        2024 &copy; With love from{' '}
        <a
          href="https://www.youtube.com/c/redgroup/?sub_confirmation=1"
          target="_blank"
          rel="noreferrer"
        >
          RED Group
        </a>
        . <br /> All rights reserved.
      </footer>
    </aside>
  );
}
