import React from 'react';
import styles from './Logo.module.css';

const Logo = () => (
  <div className={styles.logoContainer}>
    <img src="/images/bendoglogo.png" alt="Bendog Motors Logo" className={styles.logoImage} />
    <h1 className={styles.logoText}>Bendog Motors</h1>
  </div>
);

export default Logo;
