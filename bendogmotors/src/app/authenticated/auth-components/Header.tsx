'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter, usePathname } from 'next/navigation';
import styles from './Header.module.css';

interface HeaderProps {
  onLogout: () => void;
  onSearch?: (query: string) => void; // Pass search query to parent
}

const Header: React.FC<HeaderProps> = ({ onLogout, onSearch }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const router = useRouter();
  const pathname = usePathname();

  const handleLogout = () => {
    setIsLoggedIn(false);
    onLogout();
    console.log("User logged out");
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value;
    setSearchQuery(query);
    if (onSearch) {
    onSearch(query); // Update search query in the parent component
  }
  };

  const handleBackToHomepage = () => {
    router.push("/");
  };

  const isCreateAccountPage = pathname === "/create-account";
  const isAuthenticatedPage = pathname === "/authenticated";

  return (
    <header className={styles.header}>
      <div className={styles.leftContainer}>
        <div className={styles.logoContainer} onClick={() => router.push("/")}>
          <img src="images/bendoglogo.png" alt="Logo" className={styles.logo} />
        </div>

        {/* Conditional Search Bar */}
        {isAuthenticatedPage && (
          <form className={styles.searchForm}>
            <input
              type="text"
              value={searchQuery}
              onChange={handleSearchChange}
              placeholder="Search Listings"
              className={styles.searchInput}
            />
            <button type="submit" className={styles.searchButton}>
              <i className="fas fa-search"></i>
            </button>
          </form>
        )}
      </div>

      {/* Conditional Navigation */}
      {isCreateAccountPage ? (
        <div className={styles.backToHomepage} onClick={handleBackToHomepage}>
          Back to Homepage
        </div>
      ) : (
        <nav className={styles.nav}>
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
