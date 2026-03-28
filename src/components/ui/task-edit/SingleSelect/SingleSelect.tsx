import cn from 'clsx';
import { X } from 'lucide-react';
import styles from './SingleSelect.module.scss'; // Добавляем импорт стилей

import { Badge } from '@/components/ui/Badge/Badge';
import { useOutside } from '@/hooks/useOutside';

export interface IOption {
  label: string;
  value: string;
}

interface ISingleSelect {
  data: IOption[];
  onChange: (value: string) => void;
  value: string;
  isColorSelect?: boolean;
}

const isValidVariant = (value: string): value is 'gray' | 'high' | 'medium' | 'low' => {
  return ['gray', 'high', 'medium', 'low'].includes(value);
};

export function SingleSelect({ data, onChange, value, isColorSelect }: ISingleSelect) {
  const { isShow, setIsShow, ref } = useOutside<HTMLDivElement>(false);
  const getValue = () => data.find((item) => item.value === value)?.value;

  return (
    <div
      className={cn(styles.container, {
        [styles.colorSelect]: isColorSelect,
      })}
      ref={ref}
    >
      <button
        onClick={(e) => {
          e.preventDefault();
          setIsShow(!isShow);
        }}
      >
        {getValue() ? (
          <Badge
            variant={isValidVariant(value) ? value : undefined}
            className="capitalize"
            style={isColorSelect ? { backgroundColor: value } : {}}
          >
            {getValue()}
          </Badge>
        ) : (
          <Badge>Click for select</Badge>
        )}
      </button>

      {value && (
        <button
          className={styles.clearButton}
          onClick={(e) => {
            e.preventDefault();
            onChange('');
          }}
        >
          <X size={14} />
        </button>
      )}

      {isShow && (
        <div className={cn(styles.dropdown, 'bg-sidebar')}>
          {data.map((item) => (
            <button
              key={item.value}
              onClick={(e) => {
                e.preventDefault();
                onChange(item.value);
                setIsShow(false);
              }}
              className={styles.optionButton}
              style={isColorSelect ? { backgroundColor: item.value } : {}}
            >
              <Badge variant={isValidVariant(item.value) ? item.value : undefined}>
                {item.label}
              </Badge>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
