"use client";

import React from "react";
import styles from "./CarInfoDisplay.module.css";

interface CarInfo {
    make: string;
    model: string;
    year: number;
    cylinders?: number;
    fuel_type?: string;
    city_mpg?: number;
    highway_mpg?: number;
  }  

interface CarInfoDisplayProps {
  carInfo: CarInfo[];
}

const CarInfoDisplay: React.FC<CarInfoDisplayProps> = ({ carInfo }) => {
  if (carInfo.length === 0) {
    return <div className={styles.noResults}>No car information available</div>;
  }

  return (
    <div className={styles.container}>
      <h3>Car Information</h3>
      <ul>
        {carInfo.slice(0,7).map((car, index) => (
          <li key={index} className={styles.carItem}>
            <strong>
              {car.make} {car.model} ({car.year})
            </strong>
            <p>Engine: {car.cylinders ? `${car.cylinders} Cylinders` : "N/A"}</p>
            <p>Fuel Type: {car.fuel_type}</p>
            <p>City MPG: {car.city_mpg}</p>
            <p>Highway MPG: {car.highway_mpg}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CarInfoDisplay;
