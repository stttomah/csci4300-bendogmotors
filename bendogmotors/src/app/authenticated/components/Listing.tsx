import React from 'react';
import styles from './Listing.module.css';

interface ListingProps {
    listing: {
        id: number;
        title: string;
        price: string;
        mileage: string;
        hp: string;
        engine: string;
        seller: string;
        joined: string;
        imageUrl: string;
        profileImageUrl: string;
    };
}

const Listing: React.FC<ListingProps> = ({ listing }) => {
    return (
        <div className={styles.card}>
            <div className={styles.sellerInfo}>
                <img src={listing.profileImageUrl} alt={`${listing.seller} Profile`} className={styles.profileImage} />
                <div>
                    <p>{listing.seller}</p>
                    <span>Joined {listing.joined}</span>
                </div>
            </div>
            <img src={listing.imageUrl} alt={listing.title} className={styles.carImage} />
            <div className={styles.carDetails}>
                <h3 className={styles.carTitle}>{listing.title}</h3>
                <p>Mileage: {listing.mileage}</p>
                <p>Horsepower: {listing.hp}</p>
                <p>Engine: {listing.engine}</p>
            </div>
            <div className={styles.priceSection}>
                <p className={styles.price}>{listing.price}</p>
                <button className={styles.buyButton}>Buy Now</button>
            </div>
        </div>
    );
};

export default Listing;
