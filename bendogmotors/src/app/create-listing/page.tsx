"use client";

import React from 'react';
import Header from '../authenticated/auth-components/Header';
import Footer from '../authenticated/auth-components/Footer';
import CreateListing from './CreateListing';
import styles from './CreateListing.module.css';

const CreateListingPage: React.FC = () => {
  return (
    <div className={styles.pageContainer}>
      <Header onLogout={() => console.log('Logged out')} />
      <div className={styles.formWrapper}>
        <CreateListing />
      </div>
      <Footer />
    </div>
  );
};

export default CreateListingPage;
