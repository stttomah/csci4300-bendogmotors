"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import styles from "./CreateListing.module.css";

const CreateListing: React.FC = () => {
  const router = useRouter();

  // State for form inputs
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [makeModel, setMakeModel] = useState("");
  const [year, setYear] = useState("");
  const [fuel, setFuel] = useState("");
  const [mpg, setMpg] = useState("");
  const [mileage, setMileage] = useState(""); 
  const [horsepower, setHorsepower] = useState(""); 
  const [engine, setEngine] = useState(""); 
  const [interiorColor, setInteriorColor] = useState("");
  const [exteriorColor, setExteriorColor] = useState("");
  const [features, setFeatures] = useState("");
  const [linkurl, setLink] = useState("");
  const [error, setError] = useState("");

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validation
    if (
      !title ||
      !description ||
      !price ||
      !makeModel ||
      !year ||
      !fuel ||
      !mpg ||
      !mileage ||
      !horsepower ||
      !engine ||
      !linkurl
    ) {
      setError("Please fill in all required fields.");
      return;
    }

    // Prepare listing data
    const newListing = {
      title,
      description,
      price: Number(price),
      makeModel,
      year: Number(year),
      fuel,
      mpg: Number(mpg),
      mileage: Number(mileage), 
      horsepower: Number(horsepower), 
      engine, 
      interiorColor,
      exteriorColor,
      features,
      linkurl,
      sellerName: "Diane Stephens", // Temp Placeholder
      sellerJoinDate: "2020-01-15", // Temp Placeholder
    };

    console.log("Submitting Data:", newListing);

    try {
      const response = await fetch("/api/items", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newListing),
      });

      if (response.ok) {
        console.log("Listing created successfully.");
        router.push("/authenticated");
      } else {
        const errorData = await response.json();
        setError(errorData.message || "Failed to create listing.");
      }
    } catch (error) {
      console.error("Error creating listing:", error);
      setError("An unexpected error occurred. Please try again.");
    }
  };

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <h1>Create Listing</h1>
      </header>

      <form className={styles.form} onSubmit={handleSubmit}>
        {error && <p className={styles.error}>{error}</p>}

        <label>Listing Title</label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Enter Title"
        />

        <label>Listing Description</label>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Enter Description"
        />

        <label>Price</label>
        <input
          type="number"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          placeholder="Enter Price"
        />

        <label>Make/Model</label>
        <input
          type="text"
          value={makeModel}
          onChange={(e) => setMakeModel(e.target.value)}
          placeholder="Enter Make/Model"
        />

        <label>Year</label>
        <input
          type="number"
          value={year}
          onChange={(e) => setYear(e.target.value)}
          placeholder="Enter Year"
        />

        <label>Fuel</label>
        <input
          type="text"
          value={fuel}
          onChange={(e) => setFuel(e.target.value)}
          placeholder="Enter Fuel Type"
        />

        <label>MPG</label>
        <input
          type="number"
          value={mpg}
          onChange={(e) => setMpg(e.target.value)}
          placeholder="Enter MPG"
        />

        {/* New fields */}
        <label>Mileage</label>
        <input
          type="number"
          value={mileage}
          onChange={(e) => setMileage(e.target.value)}
          placeholder="Enter Mileage"
        />

        <label>Horsepower</label>
        <input
          type="number"
          value={horsepower}
          onChange={(e) => setHorsepower(e.target.value)}
          placeholder="Enter Horsepower"
        />

        <label>Engine</label>
        <input
          type="text"
          value={engine}
          onChange={(e) => setEngine(e.target.value)}
          placeholder="Enter Engine"
        />

        <label>Interior Color</label>
        <input
          type="text"
          value={interiorColor}
          onChange={(e) => setInteriorColor(e.target.value)}
          placeholder="Enter Interior Color"
        />

        <label>Exterior Color</label>
        <input
          type="text"
          value={exteriorColor}
          onChange={(e) => setExteriorColor(e.target.value)}
          placeholder="Enter Exterior Color"
        />

        <label>Features</label>
        <textarea
          value={features}
          onChange={(e) => setFeatures(e.target.value)}
          placeholder="Enter Features"
        />

        <label>Image Link</label>
        <input
          type="text"
          value={linkurl}
          onChange={(e) => setLink(e.target.value)}
          placeholder="Enter Image URL"
        />

        <div className={styles.buttons}>
          <button
            type="button"
            onClick={() => router.push("/authenticated")}
            className={styles.cancelButton}
          >
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
