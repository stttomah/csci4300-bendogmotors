"use client";

import React, { useState, useEffect } from "react";
import styles from "./EditListing.module.css"; 

type ItemType = {
  _id: string;
  title: string;
  description?: string;
  price: number;
  makeModel: string;
  year: number;
  fuel: string;
  mpg: number;
  mileage: number;
  horsepower: number;
  engine: string;
  interiorColor: string;
  exteriorColor: string;
  features: string;
  image: string;
};

interface EditListingProps {
  itemId: string;
  onClose: () => void; 
}

const EditListing: React.FC<EditListingProps> = ({ itemId, onClose }) => {
  const [formData, setFormData] = useState<Partial<ItemType>>({});

  useEffect(() => {
    const fetchItem = async () => {
      try {
        const response = await fetch(`/api/items/${itemId}`);
        const data = await response.json();
        if (response.ok) {
          setFormData(data.item);
        } else {
          console.error("Failed to fetch item:", data.message);
        }
      } catch (error) {
        console.error("Error fetching item:", error);
      }
    };

    fetchItem();
  }, [itemId]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await fetch(`/api/items/${itemId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();
      if (response.ok) {
        console.log("Item updated successfully:", data.updatedItem);
        onClose(); 
      } else {
        console.error("Failed to update item:", data.message);
      }
    } catch (error) {
      console.error("Error updating item:", error);
    }
  };

  return (
    <div className={styles.editListingContainer}>
      <h2 className={styles.title}>Edit Listing</h2>
      <form onSubmit={handleSubmit} className={styles.form}>
        <div className={styles.fieldContainer}>
            <label htmlFor="title">Listing Title:</label>
            <input
            id="title"
            type="text"
            name="title"
            value={formData.title || ""}
            onChange={handleChange}
            placeholder="Enter Title"
            required
            />
        </div>

        <div className={styles.fieldContainer}>
            <label htmlFor="description">Listing Description:</label>
            <textarea
            id="description"
            name="description"
            value={formData.description || ""}
            onChange={handleChange}
            placeholder="Enter Description"
            />
        </div>

        <div className={styles.fieldContainer}>
            <label htmlFor="price">Price:</label>
            <input
            id="price"
            type="number"
            name="price"
            value={formData.price || ""}
            onChange={handleChange}
            placeholder="Enter Price"
            required
            />
        </div>

        <div className={styles.fieldContainer}>
            <label htmlFor="makeModel">Make/Model:</label>
            <input
            id="makeModel"
            type="text"
            name="makeModel"
            value={formData.makeModel || ""}
            onChange={handleChange}
            placeholder="Enter Make/Model"
            required
            />
        </div>

        <div className={styles.fieldContainer}>
            <label htmlFor="year">Year:</label>
            <input
            id="year"
            type="number"
            name="year"
            value={formData.year || ""}
            onChange={handleChange}
            placeholder="Enter Year"
            required
            />
        </div>

        <div className={styles.fieldContainer}>
            <label htmlFor="mileage">Mileage:</label>
            <input
            id="mileage"
            type="number"
            name="mileage"
            value={formData.mileage || ""}
            onChange={handleChange}
            placeholder="Enter Mileage"
            required
            />
        </div>

        <div className={styles.fieldContainer}>
            <label htmlFor="horsepower">Horsepower:</label>
            <input
            id="horsepower"
            type="number"
            name="horsepower"
            value={formData.horsepower || ""}
            onChange={handleChange}
            placeholder="Enter Horsepower"
            required
            />
        </div>

        <div className={styles.fieldContainer}>
            <label htmlFor="engine">Engine:</label>
            <input
            id="engine"
            type="text"
            name="engine"
            value={formData.engine || ""}
            onChange={handleChange}
            placeholder="Enter Engine Details"
            required
            />
        </div>

        <div className={styles.fieldContainer}>
            <label htmlFor="features">Features:</label>
            <textarea
            id="features"
            name="features"
            value={formData.features || ""}
            onChange={handleChange}
            placeholder="Enter Features"
            />
        </div>

        <div className={styles.formActions}>
            <button type="submit" className={styles.saveButton}>
            Save Changes
            </button>
            <button type="button" className={styles.cancelButton} onClick={onClose}>
            Cancel
            </button>
        </div>
        </form>
    </div>
  );
};

export default EditListing;