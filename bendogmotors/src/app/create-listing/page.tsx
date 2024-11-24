"use client";

import React, { useState } from "react";
import Header from "../authenticated/auth-components/Header";
import Footer from "../authenticated/auth-components/Footer";
import CreateListing from "./CreateListing";
import CarInfoForm from "./CarInfoForm";
import CarInfoDisplay from "./CarInfoDisplay";
import styles from "./ListingPage.module.css";

const CreateListingPage: React.FC = () => {
  const [carInfo, setCarInfo] = useState<any[]>([]);

  const handleSearch = async (makeModel: string, year?: string) => {
    try {
      const apiKey = "XDBEQ+m/GlVesvgSbfED8g==3MjIu1hWxUddaQWq"; 
      const [make, model] = makeModel.split("/");

      const url = `https://api.api-ninjas.com/v1/cars?${make ? `make=${make}` : ""}${
        model ? `&model=${model}` : ""
      }${year ? `&year=${year}` : ""}`;

      const response = await fetch(url, {
        headers: { "X-Api-Key": apiKey },
      });

      if (!response.ok) {
        throw new Error("Failed to fetch car information");
      }

      const data = await response.json();
      setCarInfo(data);
    } catch (error) {
      console.error("Error fetching car information:", error);
      setCarInfo([]);
    }
  };

  return (
    <div className={styles.pageContainer}>
      <Header onLogout={() => console.log("Logged out")} />
      <div className={styles.content}>
        <div className={styles.leftSection}>
          <CarInfoForm onSearch={handleSearch} />
          <CarInfoDisplay carInfo={carInfo} />
        </div>
        <div className={styles.rightSection}>
          <CreateListing />
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default CreateListingPage;
