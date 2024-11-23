'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter,usePathname } from 'next/navigation';
import styles from './Header.module.css';

interface HeaderProps {
  onLogout: () => void;
}

const Header: React.FC<HeaderProps> = ({ onLogout }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(true); 
  const router = useRouter();
  const pathname = usePathname();

  const handleLogout = () => {
    setIsLoggedIn(false); 
    onLogout(); 
    console.log('User logged out');
  };

  const handleBackToHomepage = () => {
    router.push('/'); 
  };

  const isCreateAccountPage = pathname === '/create-account'; 

  return (
    <header className={styles.header}>
      <div className={styles.logoContainer} onClick={() => router.push('/')}>
        <img src="images/bendoglogo.png" alt="Logo" className={styles.logo} />
      </div>
      {/* Conditional Navigation */}
      {isCreateAccountPage ? (
        <div className={styles.backToHomepage} onClick={handleBackToHomepage}>
          Back to Homepage
        </div>
      ) : (
        <nav>
          <Link href="/create-listing">Create Listing</Link>
          <Link href="#">Buy</Link>
          <Link href="/authenticated">View Listings</Link>
          <Link href="/" onClick={handleLogout} className={styles.logoutButton}>
            Logout
          </Link>
        </nav>
      )}
    </header>
  );
};

export default Header;
