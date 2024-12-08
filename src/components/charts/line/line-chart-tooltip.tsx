import utilService from '@/app/utils/utilService';
import { type LineChartData } from './line-chart-wrapper';

import styles from './line-chart-tooltip.module.css';

type Props = {
  active?: boolean;
  payload?: Array<{
    payload: LineChartData;
  }>;
};

export default function LineChartTooltip({ active, payload }: Props) {
  if (active && payload && payload.length) {
    const symbol = payload[0].payload?.symbol;
    const price = payload[0].payload?.price;
    const value = payload[0].payload.value;
    const date = payload[0].payload.date;
    return (
      <div className={styles['tooltip-container']}>
        <span className={styles['date']}>
          {new Intl.DateTimeFormat('en-us', {
            weekday: 'short',
            month: 'short',
            day: '2-digit',
            year: 'numeric',
          }).format(date)}
        </span>

        <div className={styles['inner-container']}>
          <span className={styles['tokens']}>
            {utilService.prettifyNumber(value, price ? 2 : 0, price ? 2 : 0)}
            <span className={styles['indicator']}>{symbol}</span>
          </span>

          {price && (
            <span className={styles['price']}>
              <span className={styles['indicator']}>&#36;</span>
              {utilService.prettifyNumber(price)}
            </span>
          )}
        </div>
      </div>
    );
  }

  return null;
}
