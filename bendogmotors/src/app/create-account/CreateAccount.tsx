"use client";

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import styles from './CreateAccount.module.css';

interface Account {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
}

const CreateAccount: React.FC = () => {
  const router = useRouter();

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validation
    if (!firstName || !lastName || !email || !password || !confirmPassword) {
      setError('Please fill in all required fields.');
      return;
    }

    if (password !== confirmPassword) {
      setError('Passwords do not match.');
      return;
    }

    const newAccount: Account = {
      firstName,
      lastName,
      email,
      password,
      confirmPassword,
    };

    console.log("Submitting Data:", newAccount);

    try {
      const response = await fetch('/api/accounts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newAccount),
      });

      if (response.ok) {
        const result = await response.json();
        console.log("Response Message:", result.message);
        clearForm();
        router.push('/authenticated');
      } else {
        const errorData = await response.json();
        setError(errorData.message || 'Failed to create account.');
        console.error("Failed to create account:", errorData);
      }
    } catch (error) {
      console.error("Error creating account:", error);
      setError('An unexpected error occurred. Please try again.');
    }
  };

  const clearForm = () => {
    setFirstName('');
    setLastName('');
    setEmail('');
    setPassword('');
    setConfirmPassword('');
    setError('');
  };

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <h1>Create Account</h1>
      </header>

      <form className={styles.form} onSubmit={handleSubmit}>
        {error && <p className={styles.error}>{error}</p>}

        <label>First Name</label>
        <input type="text" value={firstName} onChange={(e) => setFirstName(e.target.value)} placeholder="Enter First Name" />

        <label>Last Name</label>
        <input type="text" value={lastName} onChange={(e) => setLastName(e.target.value)} placeholder="Enter Last Name" />

        <label>Email</label>
        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Enter Email" />

        <label>Password</label>
        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Enter Password" />

        <label>Confirm Password</label>
        <input type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} placeholder="Confirm Password" />

        <div className={styles.buttons}>
          <button type="button" onClick={() => router.push('/authenticated')} className={styles.cancelButton}>
            Cancel
          </button>
          <button type="submit" className={styles.postButton}>
            Create Account
          </button>
        </div>
      </form>

      <footer className={styles.footer}>© 2024 Bendog Motors</footer>
    </div>
  );
};

export default CreateAccount;
