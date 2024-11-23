"use client";

import React from 'react';
import Header from '../authenticated/auth-components/Header';
import Footer from '../authenticated/auth-components/Footer';
import CreateAccount from './CreateAccount';
import styles from './CreateAccount.module.css';

const CreateAccountPage: React.FC = () => {
  return (
    <div className={styles.pageContainer}>
      <Header onLogout={() => console.log('Logged out')} />
      <div className={styles.formWrapper}>
        <CreateAccount />
      </div>
      <Footer />
    </div>
  );
};

export default CreateAccountPage;
