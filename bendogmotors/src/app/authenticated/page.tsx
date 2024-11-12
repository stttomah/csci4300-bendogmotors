'use client';

import React from 'react';
import styles from './AuthenticatedView.module.css';
import Header from './auth-components/Header';
import Sidebar from './auth-components/Sidebar';
import Listing from './auth-components/Listing';
import Footer from './auth-components/Footer';
import PageNavigation from './auth-components/PageNavigation';

const listings = [
  {
    id: 1,
    title: '2024 Porsche 911 GT3 RS Coupe RWD',
    price: '$385,900',
    mileage: '4,660 mi',
    hp: '518 hp',
    engine: '4L H6',
    seller: 'Diane Stephens',
    joined: '2019',
    imageUrl: 'images/porsche.png',
    profileImageUrl: 'images/dianestephens.png',
  },
  {
    id: 2,
    title: '2020 McLaren 720s Performance Spider RWD',
    price: '$289,999',
    mileage: '8,054 mi',
    hp: '720 hp',
    engine: '4L V8',
    seller: 'Diane Stephens',
    joined: '2019',
    imageUrl: 'images/mclaren.png',
    profileImageUrl: 'images/dianestephens.png',
  },
  {
    id: 3,
    title: '2020 Lamborghini Huracan',
    price: '$249,899',
    mileage: '31,544 mi',
    hp: '630 hp',
    engine: '5.2L V10',
    seller: 'Diane Stephens',
    joined: '2019',
    imageUrl: 'images/lambo.png',
    profileImageUrl: 'images/dianestephens.png',
  },
];

const AuthenticatedView: React.FC = () => {
  const handleLogout = () => {
    console.log('User logged out');
  };

  return (
    <div className={styles.container}>
      <Header onLogout={handleLogout} />
      <div className={styles.content}>
        <Sidebar />
        <main className={styles.listingsSection}>
          <div className={styles.logoContainer}>
            <img src="images/bendogmain.png" alt="Main Logo" className={styles.mainLogo} />
          </div>
          {listings.map((listing) => (
            <Listing key={listing.id} listing={listing} />
          ))}
        </main>
      </div>
      <PageNavigation/>
      <Footer />
    </div>
  );
};

export default AuthenticatedView;
