import cn from 'clsx';
import type { ButtonHTMLAttributes, PropsWithChildren } from 'react';
import styles from './Button.module.scss';

type TypeButton = ButtonHTMLAttributes<HTMLButtonElement>;

export function Button({ children, className, ...rest }: PropsWithChildren<TypeButton>) {
  return (
    <button className={cn(styles.button, className)} {...rest}>
      {children}
    </button>
  );
}
