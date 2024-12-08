'use client';

import { useAlertStore } from '@/stores/alerts/alertStore';

import styles from './alert.module.css';

export default function Alert() {
  const latestAlert = useAlertStore((state) => state.mostRecentAlert());

  if (!latestAlert) return null;

  return (
    <div className={styles['container']}>
      <div
        className={`${styles['alert']} ${styles[`alert-${latestAlert.type}`]}`}
      >
        {latestAlert.message}
      </div>
    </div>
  );
}
