"use client";

import React, { useEffect, useState } from "react";
import ProtectedRoutes from "../../utils/ProtectedRoutes";
import styles from "./AuthenticatedView.module.css";
import Header from "./auth-components/Header";
import Sidebar from "./auth-components/Sidebar";
import Listing from "./auth-components/Listing";
import Footer from "./auth-components/Footer";
import PageNavigation from "./auth-components/PageNavigation";
import EditListing from "./auth-components/EditListing";
import Cookies from "js-cookie";

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

const AuthenticatedPage: React.FC = () => {
  const [listings, setListings] = useState<Listing[]>([]);
  const [filteredListings, setFilteredListings] = useState<Listing[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [filters, setFilters] = useState<Record<string, string>>({});
  const [editingItemId, setEditingItemId] = useState<string | null>(null);

  // Fetch Listings
  useEffect(() => {
    const fetchListings = async () => {
      try {
        const response = await fetch("/api/items");
        const data = await response.json();

        if (!Array.isArray(data.items)) {
          console.error("Unexpected data format or empty response:", data);
          setListings([]);
          return;
        }

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
          features: item.features
            ? item.features.split(",").map((f: string) => f.trim())
            : [],
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

  // filter listings
  useEffect(() => {
    let filtered = listings;

    Object.entries(filters).forEach(([category, value]) => {
      if (value) {
        switch (category) {
          case "Price Range":
            if (value === "Under $50,000") {
              filtered = filtered.filter((listing) => listing.price < 50000);
            } else if (value === "$50,000 - $100,000") {
              filtered = filtered.filter(
                (listing) => listing.price >= 50000 && listing.price <= 100000
              );
            } else if (value === "$100,000 - $200,000") {
              filtered = filtered.filter(
                (listing) => listing.price > 100000 && listing.price <= 200000
              );
            } else if (value === "Over $200,000") {
              filtered = filtered.filter((listing) => listing.price > 200000);
            }
            break;

          case "Interior Color":
            filtered = filtered.filter(
              (listing) =>
                listing.interiorColor?.toLowerCase() === value?.toLowerCase()
            );
            break;

          case "Exterior Color":
            filtered = filtered.filter(
              (listing) =>
                listing.exteriorColor?.toLowerCase() === value?.toLowerCase()
            );
            break;

          case "MPG":
            const mpgRange = value.match(/(\d+)-(\d+)/);
            if (mpgRange) {
              const [_, min, max] = mpgRange.map(Number);
              filtered = filtered.filter(
                (listing) => listing.mpg >= min && listing.mpg <= max
              );
            } else if (value === "30+ MPG") {
              filtered = filtered.filter((listing) => listing.mpg > 30);
            }
            break;

          case "Fuel Type":
            filtered = filtered.filter(
              (listing) =>
                listing.fuel?.toLowerCase() === value?.toLowerCase()
            );
            break;

          case "Features":
            filtered = filtered.filter((listing) =>
              listing.features?.some((feature) =>
                feature.toLowerCase().includes(value.toLowerCase())
              )
            );
            break;

          case "Year":
            filtered = filtered.filter(
              (listing) => listing.year.toString() === value
            );
            break;

          case "Make":
            filtered = filtered.filter(
              (listing) =>
                listing.makeModel?.toLowerCase().includes(value?.toLowerCase())
            );
            break;

          default:
            break;
        }
      }
    });

    if (searchQuery.trim() !== "") {
      filtered = filtered.filter((listing) =>
        listing.title.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    setFilteredListings(filtered);
  }, [filters, searchQuery, listings]);

  // handlers
  const resetFilters = () => {
    setFilters({});
    setFilteredListings(listings);
  };

  const handleFilterChange = (updatedFilters: Record<string, string>) => {
    setFilters(updatedFilters);
  };

  const handleEdit = (id: string) => {
    setEditingItemId(id);
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
    <ProtectedRoutes>
      <div className={styles.container}>
        <Header
          onLogout={() => {
            Cookies.remove("authToken");
            location.reload();
          }}
          onSearch={(query) => setSearchQuery(query)}
        />
        <div className={styles.content}>
          <Sidebar onFilterChange={handleFilterChange} />
          <main className={styles.listingsSection}>
            {editingItemId ? (
              <EditListing itemId={editingItemId} onClose={handleModalClose} />
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
    </ProtectedRoutes>
  );
};

export default AuthenticatedPage;