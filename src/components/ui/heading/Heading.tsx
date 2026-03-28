import styles from './Heading.module.scss';

interface IHeading {
  title: string;
}

export function Heading({ title }: IHeading) {
  return (
    <div className={styles.heading}>
      <h1>{title}</h1>
      <div className={styles.divider} />
    </div>
  );
}
