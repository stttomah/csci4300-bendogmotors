import React from 'react';
import styles from './PageNavigation.module.css';

const PageNavigation: React.FC = () => {
  return (
    <div className={styles.pageNavigation}>
      <button>Previous</button>
      <button className={styles.active}>1</button>
      <button>2</button>
      <button>3</button>
      <button>Next</button>
    </div>
  );
};

export default PageNavigation;
