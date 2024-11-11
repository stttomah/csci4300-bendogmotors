import React from 'react';
import styles from './Advertisement.module.css';

const Advertisement = () => (
  <div className={styles.adContainer}>
    <img src="/images/bencar.png" alt="Advertisement" className={styles.adImage} />
  </div>
);

export default Advertisement;
