import React, { useState } from "react";
import Image from "next/image";
import styles from "./Listing.module.css";
import router from "next/router";

interface ListingProps {
  listing: {
    id: string;
    title: string;
    price: number;
    mileage: number;
    hp: number;
    engine: string;
    seller: string;
    joined: string;
    imageUrl?: string;
    profileImageUrl?: string;
  };
  onEdit: (id: string) => void; // Callback for editing
  onDelete: (id: string) => void; // Callback for deleting
}

const Listing: React.FC<ListingProps> = ({ listing, onEdit, onDelete }) => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div className={styles.card}>
      <div className={styles.sellerInfo}>
        <Image
          src={listing.profileImageUrl || "/images/dianestephens.png"}
          alt={`${listing.seller} Profile`}
          width={50}
          height={50}
          className={styles.profileImage}
        />
        <div>
          <p>{listing.seller}</p>
          <span>Joined {listing.joined}</span>
        </div>
        <div className={styles.dropdown}>
          <button onClick={() => setMenuOpen(!menuOpen)}>⋮</button>
          {menuOpen && (
            <div className={styles.dropdownMenu}>
              <button onClick={() => onEdit(listing.id)}>Edit</button>
              <button onClick={() => onDelete(listing.id)}>Delete</button>
            </div>
          )}
        </div>
      </div>
      <Image
        src={listing.imageUrl || "/images/bendoglogo.png"}
        alt={listing.title}
        width={400}
        height={250}
        className={styles.carImage}
      />
      <div className={styles.carDetails}>
        <h3 className={styles.carTitle}>{listing.title}</h3>
        <p>Mileage: {listing.mileage} mi</p>
        <p>Horsepower: {listing.hp} hp</p>
        <p>Engine: {listing.engine}</p>
      </div>
      <div className={styles.priceSection}>
        <p className={styles.price}>${listing.price}</p>
        <button className={styles.buyButton}>Buy Now</button>
      </div>
    </div>
  );
};

export default Listing;
