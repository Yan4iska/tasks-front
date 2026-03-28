import React from 'react';
import styles from './Checkbox.module.scss';

const Checkbox = (props: {
  id?: string;
  extra?: string;
  color?:
    | 'red'
    | 'blue'
    | 'green'
    | 'yellow'
    | 'orange'
    | 'teal'
    | 'navy'
    | 'lime'
    | 'cyan'
    | 'pink'
    | 'purple'
    | 'amber'
    | 'indigo'
    | 'gray';
  [x: string]: unknown;
}) => {
  const { extra, color, id, ...rest } = props;

  const colorClass = color ? styles[`checked-${color}`] : styles['checked-brand'];

  return (
    <input
      id={id}
      type="checkbox"
      className={`${styles.defaultCheckbox} ${colorClass} ${extra || ''}`}
      {...rest}
    />
  );
};

export default Checkbox;
