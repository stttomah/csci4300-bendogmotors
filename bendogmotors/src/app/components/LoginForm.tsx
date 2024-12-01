'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import styles from './LoginForm.module.css';
import '@fortawesome/fontawesome-free/css/all.css';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Cookies from 'js-cookie';

const LoginForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const response = await fetch(`/api/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      if (response.ok) {
        const data = await response.json();

        // save token in cookies
        Cookies.set('authToken', data.token, { expires: 7 }); // cookies expire in 7 days

        console.log('Login successful:', data);
        toast.success('Login successful!', { autoClose: 2000 });

        // redirect to authenticated
        setTimeout(() => router.push('/authenticated'), 2000);
      } else {
        const errorData = await response.json();
        toast.error(errorData.message || 'Login failed');
      }
    } catch (error) {
      console.error('Error logging in:', error);
      toast.error('An unexpected error occurred');
    } finally {
      setIsLoading(false);
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

        {/* Login */}
        <form onSubmit={handleSubmit}>
          <label htmlFor="email" className={styles.label}>
            Email
          </label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter Email"
            className={styles.input}
            required
          />

          <label htmlFor="password" className={styles.label}>
            Password
          </label>
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

      {/* Toast Alerts */}
      <ToastContainer
        position="top-right"
        hideProgressBar={false}
        newestOnTop={true}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </div>
  );
};

export default LoginForm;