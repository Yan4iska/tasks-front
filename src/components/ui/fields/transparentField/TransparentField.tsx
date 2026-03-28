import cn from 'clsx';
import { type InputHTMLAttributes, forwardRef } from 'react';
import styles from './TransparentField.module.scss'; // Импорт стилей

type TypeTransparentField = InputHTMLAttributes<HTMLInputElement>;

export const TransparentField = forwardRef<HTMLInputElement, TypeTransparentField>(
  ({ className, ...rest }, ref) => {
    return <input className={cn(styles.input, className)} ref={ref} {...rest} />;
  },
);

TransparentField.displayName = 'TransparentField';
