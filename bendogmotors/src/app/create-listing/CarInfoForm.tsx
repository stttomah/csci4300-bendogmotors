"use client";

import React, { useState } from "react";
import styles from "./CarInfoForm.module.css";

interface CarInfoFormProps {
  onSearch: (makeModel: string, year?: string) => void;
}

const CarInfoForm: React.FC<CarInfoFormProps> = ({ onSearch }) => {
  const [makeModel, setMakeModel] = useState("");
  const [year, setYear] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (makeModel.trim()) {
      onSearch(makeModel.trim(), year.trim() || undefined);
    }
  };

  return (
    <div className={styles.container}>
      <h2 className={styles.heading}>Search Car Information</h2>
      <form className={styles.form} onSubmit={handleSubmit}>
        <label className={styles.label}>Make/Model</label>
        <input
          type="text"
          value={makeModel}
          onChange={(e) => setMakeModel(e.target.value)}
          placeholder="e.g., Toyota/Camry"
          className={styles.input}
        />
        <label className={styles.label}>Year (Optional)</label>
        <input
          type="number"
          value={year}
          onChange={(e) => setYear(e.target.value)}
          placeholder="e.g., 2021"
          className={styles.input}
        />
        <button type="submit" className={styles.searchButton}>
          Search
        </button>
      </form>
    </div>
  );
};

export default CarInfoForm;
