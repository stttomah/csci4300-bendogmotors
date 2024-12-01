'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import styles from './CreateAccount.module.css';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const CreateAccount: React.FC = () => {
  const router = useRouter();

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // account validation
    if (!firstName || !lastName || !email || !password || !confirmPassword) {
      toast.error('Please fill in all required fields.');
      return;
    }

    if (password !== confirmPassword) {
      toast.error('Passwords do not match.');
      return;
    }

    try {
      const response = await fetch('/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: `${firstName} ${lastName}`, // combine first and last
          email,
          password,
        }),
      });

      if (response.ok) {
        const result = await response.json();
        console.log('Account creation successful:', result.message);
        toast.success('Account created successfully!', { autoClose: false });
        clearForm();
        setTimeout(() => router.push('/authenticated'), 2000); // redirect to authenticated page
      } else {
        const errorData = await response.json();
        toast.error(errorData.message || 'Failed to create account.');
        console.error('Failed to create account:', errorData);
      }
    } catch (error) {
      console.error('Error creating account:', error);
      toast.error('An unexpected error occurred. Please try again.');
    }
  };

  const clearForm = () => {
    setFirstName('');
    setLastName('');
    setEmail('');
    setPassword('');
    setConfirmPassword('');
  };

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <h1>Create Account</h1>
      </header>

      <form className={styles.form} onSubmit={handleSubmit}>
        <label>First Name</label>
        <input
          type="text"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
          placeholder="Enter First Name"
        />

        <label>Last Name</label>
        <input
          type="text"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
          placeholder="Enter Last Name"
        />

        <label>Email</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter Email"
        />

        <label>Password</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Enter Password"
        />

        <label>Confirm Password</label>
        <input
          type="password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          placeholder="Confirm Password"
        />

        <div className={styles.buttons}>
          <button
            type="button"
            onClick={() => router.push('/')}
            className={styles.cancelButton}
          >
            Cancel
          </button>
          <button type="submit" className={styles.postButton}>
            Create Account
          </button>
        </div>
      </form>

      <footer className={styles.footer}>© 2024 Bendog Motors</footer>

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

export default CreateAccount;