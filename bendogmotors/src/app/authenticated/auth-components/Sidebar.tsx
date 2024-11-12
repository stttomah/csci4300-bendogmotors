'use client';

import React from 'react';
import styles from './Sidebar.module.css';

const filterOptions = [
  {
    label: 'Price Range',
    options: ['Under $50,000', '$50,000 - $100,000', '$100,000 - $200,000', 'Over $200,000'],
  },
  {
    label: 'Make & Model',
    options: ['Porsche', 'McLaren', 'Lamborghini', 'Ferrari'],
  },
  {
    label: 'Features',
    options: ['Navigation', 'Sunroof', 'Heated Seats', 'Backup Camera'],
  },
  {
    label: 'Interior Color',
    options: ['Black', 'Tan', 'Red', 'White'],
  },
  {
    label: 'Exterior Color',
    options: ['Black', 'Blue', 'Red', 'White'],
  },
  {
    label: 'MPG',
    options: ['10-15 MPG', '15-20 MPG', '20-25 MPG', '25+ MPG'],
  },
  {
    label: 'Fuel Type',
    options: ['Gas', 'Electric', 'Hybrid', 'Diesel'],
  },
  {
    label: 'Year',
    options: ['2024', '2023', '2022', '2021', '2020'],
  },
];

const Sidebar: React.FC = () => {
  return (
    <aside className={styles.sidebar}>
      <div className={styles.filters}>
        {filterOptions.map((filter) => (
          <select key={filter.label} className={styles.select}>
            <option value="">{filter.label}</option>
            {filter.options.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        ))}
      </div>
    </aside>
  );
};

export default Sidebar;
