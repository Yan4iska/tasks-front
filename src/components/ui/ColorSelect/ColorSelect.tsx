'use client';

import * as Select from '@radix-ui/react-select';
import cn from 'clsx';
import { Check, ChevronDown } from 'lucide-react';
import type { ReactNode } from 'react';
import { memo, useMemo } from 'react';

import styles from './ColorSelect.module.scss';

export interface ColorSelectOption {
  label: string;
  value: string;
  color?: string;
}

export interface ColorSelectProps {
  options: readonly ColorSelectOption[];
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  className?: string;
  ariaLabel?: string;
  renderOption?: (option: ColorSelectOption) => ReactNode;
}

function DefaultOptionView({ option }: { option: ColorSelectOption }) {
  return (
    <span className={styles.itemLeft}>
      {option.color ? (
        <span className={styles.swatch} style={{ backgroundColor: option.color }} />
      ) : null}
      <span className={styles.label}>{option.label}</span>
    </span>
  );
}

function ColorSelectComponent({
  options,
  value,
  onChange,
  placeholder = 'Select',
  className,
  ariaLabel = 'Select option',
  renderOption,
}: ColorSelectProps) {
  const selected = useMemo(() => options.find((option) => option.value === value), [options, value]);

  return (
    <Select.Root value={value} onValueChange={onChange}>
      <Select.Trigger className={cn(styles.trigger, className)} aria-label={ariaLabel}>
        <Select.Value
          className={styles.value}
          placeholder={<span className={styles.placeholder}>{placeholder}</span>}
        >
          {selected ? (
            <span className={styles.value}>
              {selected.color ? (
                <span className={styles.swatch} style={{ backgroundColor: selected.color }} />
              ) : null}
              <span className={styles.label}>{selected.label}</span>
            </span>
          ) : null}
        </Select.Value>

        <Select.Icon className={styles.indicatorIcon}>
          <ChevronDown size={16} />
        </Select.Icon>
      </Select.Trigger>

      <Select.Portal>
        <Select.Content position="popper" sideOffset={8} className={styles.content}>
          <Select.Viewport className={styles.viewport}>
            {options.map((option) => (
              <Select.Item key={option.value} value={option.value} className={styles.item}>
                <Select.ItemText className={styles.label}>
                  {renderOption ? renderOption(option) : <DefaultOptionView option={option} />}
                </Select.ItemText>

                <Select.ItemIndicator className={styles.itemIndicator}>
                  <Check size={14} />
                </Select.ItemIndicator>
              </Select.Item>
            ))}
          </Select.Viewport>
        </Select.Content>
      </Select.Portal>
    </Select.Root>
  );
}

// Design-system primitive: stable, memoized, no business logic.
export const ColorSelect = memo(ColorSelectComponent);

