'use client';

import { GanttChartSquare } from 'lucide-react';
import Link from 'next/link';

import { COLORS } from '@/constants/color.constants';

import { LogoutButton } from './LogoutButton/LogoutButton';
import { MenuItem } from './MenuItem/MenuItem';
import { MENU } from './Menu.data';

import styles from './Sidebar.module.scss';

export function Sidebar() {
  return (
    <aside className={styles.sidebar}>
      <div>
        <Link href="/boards" className={styles.header}>
          <GanttChartSquare color={COLORS.primary} size={38} />
          <span className={styles.title}>
            TRELLO 2{/* <span className={styles.beta}>beta</span> */}
          </span>
        </Link>
        <div className={styles.menu}>
          <LogoutButton />
          {MENU.map((item) => (
            <MenuItem item={item} key={item.link} />
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
