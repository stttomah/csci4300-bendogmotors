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
  const [imageURL, setImageURL] = useState('');
  const [previewURL, setPreviewURL] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const isValidURL = (url: string) => {
    return /^(https?:\/\/.*\.(?:png|jpg|jpeg|gif|svg|webp)(\?.*)?)$/i.test(url);
  };

  const handleShowPreview = () => {
    if (imageURL && isValidURL(imageURL)) {
      setPreviewURL(imageURL);
    } else {
      toast.error('Invalid image URL. Please provide a valid URL.');
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isSubmitting) return;

    // Validation
    if (!firstName || !lastName || !email || !password || !confirmPassword) {
      toast.error('Please fill in all required fields.');
      return;
    }

    if (password !== confirmPassword) {
      toast.error('Passwords do not match.');
      return;
    }

    if (password.length < 8 || !/[A-Z]/.test(password) || !/[a-z]/.test(password) || !/[0-9]/.test(password)) {
      toast.error('Password must be at least 8 characters long and include uppercase, lowercase, and a number.');
      return;
    }

    if (imageURL && !isValidURL(imageURL)) {
      toast.error('Invalid image URL. Please provide a valid URL.');
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch('/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: `${firstName} ${lastName}`,
          email,
          password,
          image: imageURL || undefined,
        }),
      });

      if (response.ok) {
        const result = await response.json();
        console.log('Account creation successful:', result.message);
        toast.success('Account created successfully!', { autoClose: false });
        clearForm();
        router.prefetch('/authenticated');
        setTimeout(() => router.push('/authenticated'), 2000);
      } else {
        const errorData = await response.json();
        toast.error(errorData.message || 'Failed to create account.');
        console.error('Failed to create account:', errorData);
      }
    } catch (error) {
      console.error('Error creating account:', error);
      toast.error('An unexpected error occurred. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const clearForm = () => {
    setFirstName('');
    setLastName('');
    setEmail('');
    setPassword('');
    setConfirmPassword('');
    setImageURL('');
    setPreviewURL('');
  };

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <h1>Create Account</h1>
      </header>

      <form className={styles.form} onSubmit={handleSubmit}>
        <label htmlFor="firstName">First Name</label>
        <input
          id="firstName"
          type="text"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
          placeholder="Enter First Name"
          autoComplete="given-name"
        />

        <label htmlFor="lastName">Last Name</label>
        <input
          id="lastName"
          type="text"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
          placeholder="Enter Last Name"
          autoComplete="family-name"
        />

        <label htmlFor="email">Email</label>
        <input
          id="email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter Email"
          autoComplete="email"
        />

        <label htmlFor="password">Password</label>
        <input
          id="password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Enter Password"
          autoComplete="new-password"
        />

        <label htmlFor="confirmPassword">Confirm Password</label>
        <input
          id="confirmPassword"
          type="password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          placeholder="Confirm Password"
          autoComplete="new-password"
        />

        <label htmlFor="imageURL">Profile Picture</label>
        <input
          id="imageURL"
          type="text"
          value={imageURL}
          onChange={(e) => setImageURL(e.target.value)}
          placeholder="Enter Image URL"
        />
        <button
          type="button"
          onClick={handleShowPreview}
          className={styles.previewButton}
        >
          Preview Picture
        </button>

        {previewURL && (
          <div className={styles.imagePreview}>
            <img
              src={previewURL}
              alt="User preview"
              className={styles.previewImage}
              onError={() => {
                setPreviewURL('');
                toast.error('Invalid image URL. Preview not available.');
              }}
            />
          </div>
        )}

        <div className={styles.buttons}>
          <button
            type="button"
            onClick={() => router.push('/')}
            className={styles.cancelButton}
          >
            Cancel
          </button>
          <button type="submit" className={styles.postButton} disabled={isSubmitting}>
            {isSubmitting ? 'Creating...' : 'Create Account'}
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