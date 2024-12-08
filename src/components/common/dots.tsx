import styles from './dots.module.css';

export default function Dots() {
  return (
    <div className={styles['dots-container']}>
      <div className={styles['dot']} />
      <div className={styles['dot']} />
      <div className={styles['dot']} />
    </div>
  );
}
