'use client';

import React from 'react';
import Link from 'next/link';
import styles from './Header.module.css';

interface HeaderProps {
  onLogout: () => void;
}

const Header: React.FC<HeaderProps> = ({ onLogout }) => {
  return (
    <header className={styles.header}>
      <div className={styles.logoContainer}>
        <img src="images/bendoglogo.png" alt="Logo" className={styles.logo} />
        <input type="text" placeholder="Search Cars" className={styles.searchBar} />
      </div>
      <nav>
        <Link href="#">Sell</Link>
        <Link href="#">Buy</Link>
        <Link href="#">View Listings</Link>
        <button onClick={onLogout} className={styles.logoutButton}>Logout</button>
      </nav>
    </header>
  );
};

export default Header;
