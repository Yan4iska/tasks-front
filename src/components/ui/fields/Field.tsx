import { InputHTMLAttributes, forwardRef } from 'react';
import styles from './Field.module.scss';
import clsx from 'clsx';

type InputFieldProps = {
  id: string;
  label: string;
  placeholder: string;
  variant?: string;
  state?: 'error' | 'success';
  disabled?: boolean;
  type?: string;
  isNumber?: boolean;
} & InputHTMLAttributes<HTMLInputElement>;

export const Field = forwardRef<HTMLInputElement, InputFieldProps>(
  ({ label, id, type, placeholder, state, disabled, isNumber, className, ...rest }, ref) => {
    return (
      <div className={clsx(styles.root, className)}>
        <label htmlFor={id} className={styles.label}>
          {label}
        </label>
        <input
          ref={ref}
          disabled={disabled}
          type={type}
          id={id}
          placeholder={placeholder}
          className={clsx(
            styles.input,
            disabled ? styles.disabled : '',
            state ? styles[state] : '',
          )}
          onKeyDown={(event) => {
            if (
              isNumber &&
              !/[0-9]/.test(event.key) &&
              !['Backspace', 'Tab', 'Enter', 'ArrowLeft', 'ArrowRight'].includes(event.key)
            ) {
              event.preventDefault();
            }
          }}
          {...rest}
        />
      </div>
    );
  },
);

Field.displayName = 'field';
