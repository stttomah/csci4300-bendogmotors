'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import styles from './LoginForm.module.css';

const LoginForm = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoggedIn(true);
    router.push('/authenticated'); 
    console.log('User is logged in');
  };

  return (
    <div className={styles.loginContainer}>
      <div className={styles.loginBox}>
        <h2 className={styles.heading}>LOGIN</h2>
        <hr className={styles.separator}/>
        <form onSubmit={handleSubmit}>
          <label htmlFor="username" className={styles.label}>Username</label>
          <input type="text" id="username" placeholder="Enter Username" className={styles.input} />

          <label htmlFor="password" className={styles.label}>Password</label>
          <input type="password" id="password" placeholder="Enter Password" className={styles.input} />

          <button type="submit" className={styles.button}>Sign In</button>

          <p className={styles.signupLink}>Don’t have an account?</p>
        </form>
      </div>
    </div>
  );
};

export default LoginForm;
