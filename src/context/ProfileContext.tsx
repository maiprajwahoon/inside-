import React, { createContext, useContext, useEffect, useState } from 'react';
import type { UserProfile } from '../lib/types';
import type { BuyerProfile, OrderStatus, PurchaseOrder, UserRole } from '../lib/agri-types';
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
  updateProfile: (newProfile: Partial<UserProfile>) => void;
  resetProfile: () => void;
  clearProfile: () => void;
}

const ProfileContext = createContext<ProfileContextType | undefined>(undefined);

const LOCAL_STORAGE_KEY_PROFILE = 'inside_user_profile_v4';
const LOCAL_STORAGE_KEY_ROLE = 'inside_user_role_v1';
const LOCAL_STORAGE_KEY_BUYER = 'inside_buyer_profile_v1';
const LOCAL_STORAGE_KEY_ORDERS = 'inside_purchase_orders_v1';

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

  const updateProfile = (newProfile: Partial<UserProfile>) => {
    setUserProfile((prev) => ({
      ...prev,
      ...newProfile,
    }));
  };

  const resetProfile = () => {
    const fresh: UserProfile = {
      allergies: ['Lactose', 'Peanut'],
      diets: ['Vegetarian', 'Low Sugar'],
      avoidIngredients: ['Palm Oil', 'Maltodextrin'],
    };
    setUserProfile(fresh);
    try {
      localStorage.setItem(LOCAL_STORAGE_KEY_PROFILE, JSON.stringify(fresh));
    } catch (e) {
      console.error('Failed to reset profile', e);
    }
  };

  const clearProfile = () => {
    const empty: UserProfile = {
      allergies: [],
      diets: [],
      avoidIngredients: [],
    };
    setUserProfile(empty);
    try {
      localStorage.setItem(LOCAL_STORAGE_KEY_PROFILE, JSON.stringify(empty));
    } catch (e) {
      console.error('Failed to clear profile', e);
    }
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
