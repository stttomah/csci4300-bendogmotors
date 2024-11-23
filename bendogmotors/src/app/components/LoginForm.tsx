'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import styles from './LoginForm.module.css';
import { signIn } from 'next-auth/react';
import '@fortawesome/fontawesome-free/css/all.css';

const LoginForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setErrorMessage('');
    setIsLoading(true);

    try {
      const response = await fetch(`/api/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'same-origin', // Adjust if your cookies are configured differently
        body: JSON.stringify({ email, password }),
      });

      if (response.ok) {
        const data = await response.json();
        console.log('Login successful:', data);
        router.push('/authenticated'); // Redirect after successful login
      } else {
        const errorData = await response.json();
        setErrorMessage(errorData.message || 'Login failed');
      }
    } catch (error) {
      console.error('Error logging in:', error);
      setErrorMessage('An unexpected error occurred');
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleSignIn = async () => {
    try {
      await signIn('google', { callbackUrl: '/authenticated' });
    } catch (error) {
      console.error('Google Sign-In failed:', error);
    }
  };

  const handleSignUpRedirect = () => {
    router.push('/create-account');
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
          {errorMessage && <p className={styles.error}>{errorMessage}</p>}

          <label htmlFor="email" className={styles.label}>Email</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter Email"
            className={styles.input}
            required
          />

          <label htmlFor="password" className={styles.label}>Password</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter Password"
            className={styles.input}
            required
          />

          <button type="submit" className={styles.button} disabled={isLoading}>
            {isLoading ? 'Signing In...' : 'Sign In'}
          </button>
        </form>
        <p className={styles.signupLink} onClick={handleSignUpRedirect}>
          Don't have an account?
        </p>
      </div>
    </div>
  );
};

export default LoginForm;