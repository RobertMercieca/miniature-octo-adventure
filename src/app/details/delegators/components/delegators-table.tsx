import { useMemo } from 'react';

import Heading from '@/components/common/heading';
import styles from './delegators-table.module.css';
import Dots from '@/components/common/dots';
import utilService from '@/app/utils/utilService';

type DelegatorTableColumnKey = 'address' | 'tokenAmount' | 'priceAmount';

export type DelegatorTableColumn = {
  key: DelegatorTableColumnKey;
  name: string;
};

export type DelegatorTableRow = Record<
  DelegatorTableColumnKey,
  string | number
>;

export type Props = {
  columns: DelegatorTableColumn[];
  rows: DelegatorTableRow[];
  page: number;
  setPage: React.Dispatch<React.SetStateAction<number>>;
};

const MAX_ROWS_TO_SHOW = 10;

export default function DelegatorsTable({
  columns,
  rows,
  page,
  setPage,
}: Props) {
  const maxPages = Math.ceil(rows.length / MAX_ROWS_TO_SHOW);

  const rowsToShow: DelegatorTableRow[] = useMemo(() => {
    const from = (page - 1) * MAX_ROWS_TO_SHOW;
    const to = from + MAX_ROWS_TO_SHOW;
    return rows.slice(from, to);
  }, [page]);

  function renderRowData(
    columnKey: DelegatorTableColumn,
    row: DelegatorTableRow
  ) {
    const value = row[columnKey.key];
    if (columnKey.key === 'priceAmount') {
      return (
        <span className={styles['styled-table-data']}>
          <span className={styles['indicator']}>&#36;</span>
          {Number(value).toFixed(2)}
        </span>
      );
    } else if (columnKey.key === 'tokenAmount') {
      const symbol = columnKey.name.substring(
        columnKey.name.indexOf('(') + 1,
        columnKey.name.indexOf(')')
      );
      return (
        <span className={styles['styled-table-data']}>
          {utilService.prettifyNumber(Number(value))}
          <span className={styles['indicator']}>{symbol}</span>
        </span>
      );
    }
    return value;
  }
  return (
    <div className={styles['container']}>
      <Dots />
      <div className={styles['table-action-bar']}>
        <Heading text='Delegators' />

        <div className={styles['pagination']}>
          <button
            className={styles['pagination-button']}
            onClick={() => setPage(page - 1)}
            disabled={page === 1}
          >
            <svg
              xmlns='http://www.w3.org/2000/svg'
              fill='none'
              viewBox='0 0 24 24'
              strokeWidth='1.5'
              stroke='currentColor'
              className='size-6'
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                d='M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18'
              />
            </svg>
          </button>
          <button
            className={styles['pagination-button']}
            onClick={() => setPage(page + 1)}
            disabled={page === maxPages}
          >
            <svg
              xmlns='http://www.w3.org/2000/svg'
              fill='none'
              viewBox='0 0 24 24'
              strokeWidth='1.5'
              stroke='currentColor'
              className='size-6'
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                d='M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3'
              />
            </svg>
          </button>
        </div>
      </div>
      <table className={styles['table-container']}>
        <thead>
          <tr className={styles['table-column']}>
            {columns.map((column) => (
              <th key={column.key} className={styles['table-header']}>
                {column.name}
              </th>
            ))}
          </tr>
        </thead>

        <tbody>
          {rowsToShow.map((row, idx) => (
            <tr key={idx} className={styles['table-row']}>
              {columns.map((column) => (
                <td key={column.key} className={styles['table-data']}>
                  {renderRowData(column, row)}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>

      <div className={styles['table-footer']}>
        Page {page} of {maxPages}
      </div>
    </div>
  );
}
