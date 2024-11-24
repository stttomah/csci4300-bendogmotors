"use client";

import React, { useEffect, useState } from "react";
import styles from "./AuthenticatedView.module.css";
import Header from "./auth-components/Header";
import Sidebar from "./auth-components/Sidebar";
import Listing from "./auth-components/Listing";
import Footer from "./auth-components/Footer";
import PageNavigation from "./auth-components/PageNavigation";

interface Listing {
  id: string;
  title: string;
  price: number;
  mileage: number;
  hp: number;
  engine: string;
  seller: string;
  joined: string;
  imageUrl: string;
  profileImageUrl?: string;
}

const AuthenticatedView: React.FC = () => {
  const [listings, setListings] = useState<Listing[]>([]);

  useEffect(() => {
    const fetchListings = async () => {
      try {
        const response = await fetch("/api/items");
        const data = await response.json();
  
        console.log("Fetched Data:", data);
  
        // Ensure data.items exists and is an array
        if (!Array.isArray(data.items)) {
          console.error("Unexpected data format or empty response:", data);
          setListings([]);
          return;
        }
  
        // Transform data to match the Listing interface
        const transformedListings = data.items.map((item: any) => ({
          id: item._id,
          title: item.title,
          price: item.price,
          mileage: item.mileage,
          hp: item.horsepower,
          engine: item.engine,
          seller: item.sellerName || "Unknown Seller",
          joined: item.sellerJoinDate || "Unknown Date",
          imageUrl: item.image,
          profileImageUrl: item.profileImageUrl || "/images/dianestephens.png",
        }));
  
        setListings(transformedListings);
      } catch (error) {
        console.error("Error fetching listings:", error);
        setListings([]); 
      }
    };
  
    fetchListings();
  }, []);  

  return (
    <div className={styles.container}>
      <Header onLogout={() => console.log("Logged out")} />
      <div className={styles.content}>
        <Sidebar />
        <main className={styles.listingsSection}>
          {listings.map((listing: Listing) => (
            <Listing key={listing.id} listing={listing} />
          ))}
        </main>
      </div>
      <PageNavigation />
      <Footer />
    </div>
  );
};

export default AuthenticatedView;
