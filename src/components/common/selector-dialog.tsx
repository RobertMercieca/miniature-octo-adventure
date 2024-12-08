import Dots from './dots';

import styles from './selector-dialog.module.css';

export default function SelectorDialog({
  children,
  size = 'regular',
}: {
  children: React.ReactNode;
  size?: 'regular' | 'small';
}) {
  return (
    <div className={styles['container']}>
      <div className={`${styles['inner-container']} ${styles[`${size}`]}`}>
        <div className='flex flex-col w-full'>
          <Dots />
        </div>
        {children}
      </div>
    </div>
  );
}
