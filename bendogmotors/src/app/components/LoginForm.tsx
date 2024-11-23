'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import styles from './LoginForm.module.css';
import { signIn } from 'next-auth/react';
import '@fortawesome/fontawesome-free/css/all.css';

const LoginForm = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoggedIn(true);
    router.push('/authenticated');
    console.log('User is logged in');
  };

  const handleGoogleSignIn = async () => {
    try {
      await signIn('google', { callbackUrl: '/authenticated' });
    } catch (error) {
      console.error('Google Sign-In failed:', error);
    }
  };

  return (
    <div className={styles.loginContainer}>
      <div className={styles.loginBox}>
        <h2 className={styles.heading}>LOGIN</h2>
        <hr className={styles.separator} />

        {/* Google Login */}
        <button
          type="button"
          onClick={handleGoogleSignIn}
          className={`${styles.googleButton}`}
        >
          <div className={styles.googleLogo}>
            <img src="/images/google-icon.svg" alt="Google Logo" className={styles.logoImage} />
          </div>
          <span>Sign in with Google</span>
        </button>

        {/* Regular Login */}
        <form onSubmit={handleSubmit}>
          <label htmlFor="username" className={styles.label}>Username</label>
          <input
            type="text"
            id="username"
            placeholder="Enter Username"
            className={styles.input}
          />

          <label htmlFor="password" className={styles.label}>Password</label>
          <input
            type="password"
            id="password"
            placeholder="Enter Password"
            className={styles.input}
          />

          <button type="submit" className={styles.button}>Sign In</button>
        </form>

        <p className={styles.signupLink}>Don’t have an account?</p>
      </div>
    </div>
  );
};

export default LoginForm;