'use client';

import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import Cookies from 'js-cookie';
import styles from './Header.module.css';

const Header: React.FC = () => {
  const router = useRouter();

  const handleLogout = () => {
    // remove token from cookies
    Cookies.remove('authToken');

    // redirect to login
    router.push('/');
  };

  return (
    <header className={styles.header}>
      <div className={styles.logoContainer}>
        <img src="/images/bendoglogo.png" alt="Logo" className={styles.logo} />
        <input type="text" placeholder="Search Cars" className={styles.searchBar} />
      </div>
      <nav>
        <Link href="#">Sell</Link>
        <Link href="#">Buy</Link>
        <Link href="#">View Listings</Link>
        <button
          onClick={handleLogout}
          className={styles.logoutButton}
          type="button"
        >
          Logout
        </button>
      </nav>
    </header>
  );
};

export default Header;