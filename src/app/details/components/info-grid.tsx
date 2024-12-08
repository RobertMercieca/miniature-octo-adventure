import Link from 'next/link';

import styles from './info-grid.module.css';

export type GridItem = {
  label: string;
  value: string | number;
  indicator?: string;
  displayIndicatorBeforeValue?: boolean;
  spanWholeColumn?: boolean;
  url?: string;
};

type Props = {
  items: GridItem[];
};

export default function InfoGrid({ items }: Props) {
  function renderCell(item: GridItem) {
    const cell = (
      <>
        <span className={styles['grid-item-label']}>{item.label}</span>
        <div className={styles['grid-item-value-container']}>
          {item.displayIndicatorBeforeValue && (
            <span className={styles['grid-item-indicator']}>
              {item.indicator}
            </span>
          )}
          <span className={styles['grid-item-value']}>{item.value}</span>
          {!item.displayIndicatorBeforeValue && (
            <span className={styles['grid-item-indicator']}>
              {item.indicator}
            </span>
          )}
        </div>
      </>
    );

    return item.url ? (
      <Link
        href={item.url}
        className='transition ease-in-out delay-50 hover:translate-x-1 hover:scale-110 duration-50'
      >
        {cell}
      </Link>
    ) : (
      cell
    );
  }

  return (
    <div className={styles['container']}>
      {items.map((item) => (
        <div
          key={item.label}
          className={`${styles['grid-item']} ${
            item.spanWholeColumn ? `${styles['span-whole-column']}` : ''
          }`}
        >
          {renderCell(item)}
        </div>
      ))}
    </div>
  );
}
