"use client";

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import styles from './CreateListing.module.css';

interface Listing {
  title: string;
  description: string;
  price: number;
  makeModel: string;
  year: number;
  fuel: string;
  mpg: number;
  interiorColor: string;
  exteriorColor: string;
  features: string;
  linkurl: string;
}

const CreateListing: React.FC = () => {
  const router = useRouter();

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [makeModel, setMakeModel] = useState('');
  const [year, setYear] = useState('');
  const [fuel, setFuel] = useState('');
  const [mpg, setMpg] = useState('');
  const [interiorColor, setInteriorColor] = useState('');
  const [exteriorColor, setExteriorColor] = useState('');
  const [features, setFeatures] = useState('');
  const [linkurl, setLink] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validation
    if (!title || !description || !price || !makeModel || !year || !fuel || !mpg || !linkurl) {
      setError('Please fill in all required fields.');
      return;
    }

    const newListing: Listing = {
      title,
      description,
      price: Number(price),
      makeModel,
      year: Number(year),
      fuel,
      mpg: Number(mpg),
      interiorColor,
      exteriorColor,
      features,
      linkurl,
    };

    console.log("Submitting Data:", newListing);

    try {
      const response = await fetch('/api/items', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newListing),
      });

      if (response.ok) {
        const result = await response.json();
        console.log("Response Message:", result.message);
        clearForm();
        router.push('/authenticated');
      } else {
        const errorData = await response.json();
        setError(errorData.message || 'Failed to create listing.');
        console.error("Failed to create listing:", errorData);
      }
    } catch (error) {
      console.error("Error creating listing:", error);
      setError('An unexpected error occurred. Please try again.');
    }
  };

  const clearForm = () => {
    setTitle('');
    setDescription('');
    setPrice('');
    setMakeModel('');
    setYear('');
    setFuel('');
    setMpg('');
    setInteriorColor('');
    setExteriorColor('');
    setFeatures('');
    setLink('');
    setError('');
  };

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <h1>Create Listing</h1>
      </header>

      <form className={styles.form} onSubmit={handleSubmit}>
        {error && <p className={styles.error}>{error}</p>}

        <label>Listing Title</label>
        <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Enter Title" />

        <label>Listing Description</label>
        <textarea value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Enter Description" />

        <label>Price</label>
        <input type="number" value={price} onChange={(e) => setPrice(e.target.value)} placeholder="Enter Price" />

        <label>Make/Model</label>
        <input type="text" value={makeModel} onChange={(e) => setMakeModel(e.target.value)} placeholder="Enter Make/Model" />

        <label>Year</label>
        <input type="number" value={year} onChange={(e) => setYear(e.target.value)} placeholder="Enter Year" />

        <label>Fuel</label>
        <input type="text" value={fuel} onChange={(e) => setFuel(e.target.value)} placeholder="Enter Fuel Type" />

        <label>MPG</label>
        <input type="number" value={mpg} onChange={(e) => setMpg(e.target.value)} placeholder="Enter MPG" />

        <label>Interior Color</label>
        <input type="text" value={interiorColor} onChange={(e) => setInteriorColor(e.target.value)} placeholder="Enter Interior Color" />

        <label>Exterior Color</label>
        <input type="text" value={exteriorColor} onChange={(e) => setExteriorColor(e.target.value)} placeholder="Enter Exterior Color" />

        <label>Features</label>
        <textarea value={features} onChange={(e) => setFeatures(e.target.value)} placeholder="Enter Features" />

        <label>Image Link</label>
        <input type="text" value={linkurl} onChange={(e) => setLink(e.target.value)} placeholder="Enter Image URL" />

        <div className={styles.buttons}>
          <button type="button" onClick={() => router.push('/authenticated')} className={styles.cancelButton}>
            Cancel
          </button>
          <button type="submit" className={styles.postButton}>
            Post Listing
          </button>
        </div>
      </form>

      <footer className={styles.footer}>© 2024 Bendog Motors</footer>
    </div>
  );
};

export default CreateListing;
