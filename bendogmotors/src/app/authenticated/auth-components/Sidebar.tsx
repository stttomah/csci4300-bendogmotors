'use client';

import React from 'react';
import styles from './Sidebar.module.css';

const filterOptions = [
  {
    label: 'Price Range',
    options: ['Under $50,000', '$50,000 - $100,000', '$100,000 - $200,000', 'Over $200,000'],
  },
  {
    label: 'Make',
    options: ['Porsche', 'McLaren', 'Lamborghini', 'Ferrari', 'Tesla', 'Toyota', 'Ford', 'Chevrolet'],
  },
  {
    label: 'Features',
    options: [
      'Navigation',
      'Sunroof',
      'Heated Seats',
      'Backup Camera',
      'Bluetooth',
      'Lane Assist',
      'Apple CarPlay',
      'Android Auto',
    ],
  },
  {
    label: 'Interior Color',
    options: ['Black', 'Tan', 'Red', 'White', 'Gray', 'Blue', 'Brown', 'Beige', 'Yellow'],
  },
  {
    label: 'Exterior Color',
    options: ['Black', 'Blue', 'Red', 'White', 'Gray', 'Silver', 'Green', 'Yellow', 'Orange'],
  },
  {
    label: 'MPG',
    options: ['10-15 MPG', '15-20 MPG', '20-25 MPG', '25-30 MPG', '30+ MPG'],
  },
  {
    label: 'Fuel Type',
    options: ['Gas', 'Electric', 'Hybrid', 'Diesel', 'Hydrogen'],
  },
  {
    label: 'Year',
    options: ['2024', '2023', '2022', '2021', '2020', '2019', '2018', '2017', '2016'],
  },
];

const Sidebar: React.FC<{ onFilterChange: (filters: Record<string, string>) => void }> = ({ onFilterChange }) => {
  const [selectedFilters, setSelectedFilters] = React.useState<Record<string, string>>({});

  const handleChange = (category: string, value: string) => {
    const updatedFilters = { ...selectedFilters, [category]: value };
    setSelectedFilters(updatedFilters);
    onFilterChange(updatedFilters); // Notify the parent about the changes
  };

  return (
    <aside className={styles.sidebar}>
      <div className={styles.filters}>
        {filterOptions.map((filter) => (
          <select
            key={filter.label}
            className={styles.select}
            value={selectedFilters[filter.label] || ''}
            onChange={(e) => handleChange(filter.label, e.target.value)}
          >
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
