"use client";

import React, { useEffect, useState } from "react";
import styles from "./AuthenticatedView.module.css";
import Header from "./auth-components/Header";
import Sidebar from "./auth-components/Sidebar";
import Listing from "./auth-components/Listing";
import Footer from "./auth-components/Footer";
import PageNavigation from "./auth-components/PageNavigation";
import EditListing from "./auth-components/EditListing";

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
  interiorColor: string;
  exteriorColor: string;
  mpg: number;
  fuel: string;
  year: number;
  makeModel: string;
  features: string[];
}

const AuthenticatedView: React.FC = () => {
  const [listings, setListings] = useState<Listing[]>([]);
  const [filteredListings, setFilteredListings] = useState<Listing[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [filters, setFilters] = useState<Record<string, string>>({});
  const [editingItemId, setEditingItemId] = useState<string | null>(null); // Track if editing

  // Fetch Listings
  useEffect(() => {
    const fetchListings = async () => {
      try {
        const response = await fetch("/api/items");
        const data = await response.json();

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
          interiorColor: item.interiorColor,
          exteriorColor: item.exteriorColor,
          mpg: item.mpg,
          fuel: item.fuel,
          year: item.year,
          makeModel: item.makeModel,
          features: item.features ? item.features.split(",").map((f: string) => f.trim()) : [],
        }));

        setListings(transformedListings);
        setFilteredListings(transformedListings);
      } catch (error) {
        console.error("Error fetching listings:", error);
        setListings([]);
      }
    };

    fetchListings();
  }, []);

  const handleEdit = (id: string) => {
    setEditingItemId(id); // Set the ID of the listing being edited
  };

  const handleDelete = async (id: string) => {
    try {
      const response = await fetch(`/api/items/${id}`, { method: "DELETE" });
      if (response.ok) {
        setListings((prevItems) => prevItems.filter((item) => item.id !== id));
        setFilteredListings((prevItems) =>
          prevItems.filter((item) => item.id !== id)
        );
        console.log("Item deleted successfully");
      } else {
        console.error("Failed to delete item");
      }
    } catch (error) {
      console.error("Error deleting item:", error);
    }
  };

  const handleModalClose = () => {
    setEditingItemId(null); 
  };

  return (
    <div className={styles.container}>
      <Header
        onLogout={() => console.log("Logged out")}
        onSearch={(query) => setSearchQuery(query)}
      />
      <div className={styles.content}>
        <Sidebar
          onFilterChange={(updatedFilters) => setFilters(updatedFilters)}
        />
        <main className={styles.listingsSection}>
          {editingItemId ? (
            // Show EditListing if editingItemId is set
            <EditListing
              itemId={editingItemId}
              onClose={handleModalClose} 
            />
          ) : (
            filteredListings.map((listing: Listing) => (
              <Listing
                key={listing.id}
                listing={listing}
                onEdit={handleEdit}
                onDelete={handleDelete}
              />
            ))
          )}
        </main>
      </div>
      <PageNavigation />
      <Footer />
    </div>
  );
};

export default AuthenticatedView;
