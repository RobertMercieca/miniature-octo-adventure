import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';

import Dots from '../../common/dots';
import LineChartTooltip from './line-chart-tooltip';

import styles from './line-chart-wrapper.module.css';

export type LineChartData = {
  hour: number;
  date: Date;
  value: number;
  symbol?: string;
  price?: number;
};

type Props = {
  data: LineChartData[];
};

export default function LineChartWrapper({ data }: Props) {
  return (
    <div className={styles['container']}>
      <Dots />
      <ResponsiveContainer width='100%' height='100%'>
        <LineChart
          data={data}
          className={styles['line-chart']}
          margin={{ top: 40, right: 40, left: 40, bottom: 40 }}
        >
          <XAxis
            dataKey='hour'
            label={{
              value: 'Hour',
              position: 'insideBottom',
              offset: -5,
              stroke: '#9199B0',
              fill: '#9199B0',
            }}
            tickLine={{ stroke: '#9199B0' }}
            stroke='#9199B0'
          />
          <YAxis
            label={{
              value: 'Value',
              angle: -90,
              position: 'insideLeft',
              offset: -25,
              stroke: '#9199B0',
              fill: '#9199B0',
            }}
            stroke='#9199B0'
            tickLine={{ stroke: '#9199B0' }}
          />
          <Tooltip
            content={<LineChartTooltip />}
            cursor={{ fill: 'transparent', stroke: '#606980', strokeWidth: 1 }}
          />
          <Line
            type='monotone'
            dataKey='value'
            stroke='#4EB5FF'
            strokeWidth={2}
            dot={{
              stroke: '#4EB5FF',
              strokeWidth: 1,
              fill: '#4EB5FF',
              r: 4,
              strokeDasharray: '',
            }}
            activeDot={{
              r: 6,
              fill: '#4EB5FF',
              stroke: '#606980',
              strokeWidth: 2,
            }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
