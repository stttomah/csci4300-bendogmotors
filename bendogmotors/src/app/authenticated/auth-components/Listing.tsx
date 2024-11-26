import React from "react";
import Image from "next/image"; // Import Next.js Image component
import styles from "./Listing.module.css";

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
}

const Listing: React.FC<ListingProps> = ({ listing }) => {
  return (
    <div className={styles.card}>
      <div className={styles.sellerInfo}>
        <Image
          src={listing.profileImageUrl || "/images/dianestephens.png"} 
          alt={`${listing.seller} Profile`}
          width={50} // Example size
          height={50} // Example size
          className={styles.profileImage}
        />
        <div>
          <p>{listing.seller}</p>
          <span>Joined {listing.joined}</span>
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
