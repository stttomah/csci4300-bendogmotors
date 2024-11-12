'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import styles from './Header.module.css';

interface HeaderProps {
  onLogout: () => void;
}

const Header: React.FC<HeaderProps> = ({ onLogout }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(true); 
  const router = useRouter();

  const handleLogout = () => {
    setIsLoggedIn(false); 
    onLogout(); 
    console.log('User logged out');
  };

  return (
    <header className={styles.header}>
      <div className={styles.logoContainer}>
        <img src="images/bendoglogo.png" alt="Logo" className={styles.logo} />
        <input type="text" placeholder="Search Cars" className={styles.searchBar} />
      </div>
      <nav>
        <Link href="/create-listing">Create Listing</Link>
        <Link href="#">Buy</Link>
        <Link href="/authenticated">View Listings</Link>
        
        <Link href="/" onClick={handleLogout} className={styles.logoutButton}>
          Logout
        </Link>
      </nav>
    </header>
  );
};

export default Header;
