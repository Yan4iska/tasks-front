import { CSSProperties, PropsWithChildren } from 'react';
import clsx from 'clsx';
import styles from './Badge.module.scss';

interface IBadge {
  className?: string;
  variant?: 'gray' | 'high' | 'medium' | 'low';
  style?: CSSProperties;
}

export function Badge({ children, className, variant = 'gray', style }: PropsWithChildren<IBadge>) {
  return (
    <span
      className={clsx(
        styles.badge,
        {
          [styles['badge-gray']]: variant === 'gray',
          [styles['badge-high']]: variant === 'high',
          [styles['badge-medium']]: variant === 'medium',
          [styles['badge-low']]: variant === 'low',
        },
        className,
      )}
      style={style}
    >
      {children}
    </span>
  );
}
