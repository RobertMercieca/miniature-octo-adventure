import Link from 'next/link';

import ConnectWalletButton from '../common/connect-wallet-button';

import styles from './navbar.module.css';

export default function Navbar() {
  return (
    <nav className={styles['navbar']}>
      <Link
        href='/'
        className='font-bold sm:text-lg text-sm hover:text-white z-10'
      >
        Delegation Analysis
      </Link>
      <ConnectWalletButton />
    </nav>
  );
}
