import React, { createContext, useContext, useEffect, useState } from 'react';
import type { UserProfile } from '../lib/types';
import type { BuyerProfile, MarketListing, OrderStatus, PurchaseOrder, UserRole } from '../lib/agri-types';
import { INITIAL_USER_PROFILE } from '../lib/mock-data';
import { INITIAL_BUYER_PROFILE, INITIAL_PURCHASE_ORDERS } from '../lib/buyers-data';

interface ProfileContextType {
  userProfile: UserProfile;
  setUserProfile: React.Dispatch<React.SetStateAction<UserProfile>>;
  userRole: UserRole;
  setUserRole: (role: UserRole) => void;
  buyerProfile: BuyerProfile;
  setBuyerProfile: React.Dispatch<React.SetStateAction<BuyerProfile>>;
  updateBuyerProfile: (newProfile: Partial<BuyerProfile>) => void;
  purchaseOrders: PurchaseOrder[];
  placePurchaseOrder: (order: Omit<PurchaseOrder, 'id' | 'orderDate' | 'status'>) => void;
  updateOrderStatus: (orderId: string, newStatus: OrderStatus) => void;
  marketListings: MarketListing[];
  addMarketListing: (listing: Omit<MarketListing, 'id' | 'listedDate'>) => void;
  removeMarketListing: (listingId: string) => void;
  updateProfile: (newProfile: Partial<UserProfile>) => void;
  resetProfile: () => void;
  clearProfile: () => void;
}

const ProfileContext = createContext<ProfileContextType | undefined>(undefined);

const LOCAL_STORAGE_KEY_PROFILE = 'inside_user_profile_v4';
const LOCAL_STORAGE_KEY_ROLE = 'inside_user_role_v1';
const LOCAL_STORAGE_KEY_BUYER = 'inside_buyer_profile_v1';
const LOCAL_STORAGE_KEY_ORDERS = 'inside_purchase_orders_v1';
const LOCAL_STORAGE_KEY_LISTINGS = 'inside_market_listings_v1';

const INITIAL_MARKET_LISTINGS: MarketListing[] = [
  {
    id: 'list-01',
    cropId: 'crop-01',
    cropName: 'Ratnagiri Alphonso Mango',
    variety: 'Ratnagiri Hapus (GI Tagged)',
    farmerName: 'Ramesh Patel',
    farmerLocation: 'Pimpalgaon, Nashik',
    quantityKg: 500,
    askingPricePerKg: 85,
    qualityGrade: 'Grade A (Export Quality)',
    freshnessIndicator: '96% Ripeness',
    listedDate: '2026-08-29',
  },
  {
    id: 'list-02',
    cropId: 'crop-02',
    cropName: 'Desi Red Tomato',
    variety: 'Pusa Ruby',
    farmerName: 'Ramesh Patel',
    farmerLocation: 'Pimpalgaon, Nashik',
    quantityKg: 1500,
    askingPricePerKg: 18,
    qualityGrade: 'Grade A Processing',
    freshnessIndicator: '94% Fresh Harvest',
    listedDate: '2026-08-29',
  },
];

export const ProfileProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [userProfile, setUserProfile] = useState<UserProfile>(() => {
    try {
      const saved = localStorage.getItem(LOCAL_STORAGE_KEY_PROFILE);
      if (saved) return JSON.parse(saved);
    } catch {
      // fallback
    }
    return {
      allergies: [...INITIAL_USER_PROFILE.allergies],
      diets: [...INITIAL_USER_PROFILE.diets],
      avoidIngredients: [...INITIAL_USER_PROFILE.avoidIngredients],
    };
  });

  const [userRole, setUserRoleState] = useState<UserRole>(() => {
    try {
      const saved = localStorage.getItem(LOCAL_STORAGE_KEY_ROLE);
      if (saved === 'BUYER' || saved === 'FARMER') return saved;
    } catch {
      // fallback
    }
    return 'FARMER';
  });

  const [buyerProfile, setBuyerProfile] = useState<BuyerProfile>(() => {
    try {
      const saved = localStorage.getItem(LOCAL_STORAGE_KEY_BUYER);
      if (saved) return JSON.parse(saved);
    } catch {
      // fallback
    }
    return INITIAL_BUYER_PROFILE;
  });

  const [purchaseOrders, setPurchaseOrders] = useState<PurchaseOrder[]>(() => {
    try {
      const saved = localStorage.getItem(LOCAL_STORAGE_KEY_ORDERS);
      if (saved) return JSON.parse(saved);
    } catch {
      // fallback
    }
    return INITIAL_PURCHASE_ORDERS;
  });

  const [marketListings, setMarketListings] = useState<MarketListing[]>(() => {
    try {
      const saved = localStorage.getItem(LOCAL_STORAGE_KEY_LISTINGS);
      if (saved) return JSON.parse(saved);
    } catch {
      // fallback
    }
    return INITIAL_MARKET_LISTINGS;
  });

  useEffect(() => {
    try {
      localStorage.setItem(LOCAL_STORAGE_KEY_PROFILE, JSON.stringify(userProfile));
    } catch (e) {
      console.error('Failed to save profile', e);
    }
  }, [userProfile]);

  useEffect(() => {
    try {
      localStorage.setItem(LOCAL_STORAGE_KEY_ROLE, userRole);
    } catch (e) {
      console.error('Failed to save user role', e);
    }
  }, [userRole]);

  useEffect(() => {
    try {
      localStorage.setItem(LOCAL_STORAGE_KEY_BUYER, JSON.stringify(buyerProfile));
    } catch (e) {
      console.error('Failed to save buyer profile', e);
    }
  }, [buyerProfile]);

  useEffect(() => {
    try {
      localStorage.setItem(LOCAL_STORAGE_KEY_ORDERS, JSON.stringify(purchaseOrders));
    } catch (e) {
      console.error('Failed to save purchase orders', e);
    }
  }, [purchaseOrders]);

  useEffect(() => {
    try {
      localStorage.setItem(LOCAL_STORAGE_KEY_LISTINGS, JSON.stringify(marketListings));
    } catch (e) {
      console.error('Failed to save market listings', e);
    }
  }, [marketListings]);

  const setUserRole = (role: UserRole) => {
    setUserRoleState(role);
  };

  const updateBuyerProfile = (newProfile: Partial<BuyerProfile>) => {
    setBuyerProfile((prev) => ({
      ...prev,
      ...newProfile,
    }));
  };

  const placePurchaseOrder = (orderData: Omit<PurchaseOrder, 'id' | 'orderDate' | 'status'>) => {
    const newOrder: PurchaseOrder = {
      ...orderData,
      id: `po-${Date.now().toString().slice(-4)}`,
      orderDate: new Date().toISOString().split('T')[0],
      status: 'PENDING',
    };
    setPurchaseOrders((prev) => [newOrder, ...prev]);
  };

  const updateOrderStatus = (orderId: string, newStatus: OrderStatus) => {
    setPurchaseOrders((prev) =>
      prev.map((o) => (o.id === orderId ? { ...o, status: newStatus } : o))
    );
  };

  const addMarketListing = (listingData: Omit<MarketListing, 'id' | 'listedDate'>) => {
    const newListing: MarketListing = {
      ...listingData,
      id: `list-${Date.now().toString().slice(-4)}`,
      listedDate: new Date().toISOString().split('T')[0],
    };
    setMarketListings((prev) => [newListing, ...prev]);
  };

  const removeMarketListing = (listingId: string) => {
    setMarketListings((prev) => prev.filter((l) => l.id !== listingId));
  };

  const updateProfile = (newProfile: Partial<UserProfile>) => {
    setUserProfile((prev) => ({
      ...prev,
      ...newProfile,
    }));
  };

  const resetProfile = () => {
    const fresh: UserProfile = {
      allergies: [],
      diets: [],
      avoidIngredients: [],
    };
    setUserProfile(fresh);
  };

  const clearProfile = () => {
    const empty: UserProfile = {
      allergies: [],
      diets: [],
      avoidIngredients: [],
    };
    setUserProfile(empty);
  };

  return (
    <ProfileContext.Provider
      value={{
        userProfile,
        setUserProfile,
        userRole,
        setUserRole,
        buyerProfile,
        setBuyerProfile,
        updateBuyerProfile,
        purchaseOrders,
        placePurchaseOrder,
        updateOrderStatus,
        marketListings,
        addMarketListing,
        removeMarketListing,
        updateProfile,
        resetProfile,
        clearProfile,
      }}
    >
      {children}
    </ProfileContext.Provider>
  );
};

export const useProfile = () => {
  const context = useContext(ProfileContext);
  if (!context) {
    throw new Error('useProfile must be used within a ProfileProvider');
  }
  return context;
};
