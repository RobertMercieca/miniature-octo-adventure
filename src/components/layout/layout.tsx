import Navbar from './navbar';
import { Inter } from 'next/font/google';

import Alert from '../common/alert';

import styles from './layout.module.css';

const inter = Inter({ subsets: ['latin'] });

type Props = {
  children: React.ReactNode;
};

export default function Layout({ children }: Props) {
  return (
    <main className={`${inter.className} ${styles.container}`}>
      <Alert />
      <Navbar />
      {children}
    </main>
  );
}
