import React, { createContext, useContext, useEffect, useState } from 'react';
import type { UserProfile } from '../lib/types';
import { INITIAL_USER_PROFILE } from '../lib/mock-data';

interface ProfileContextType {
  userProfile: UserProfile;
  setUserProfile: React.Dispatch<React.SetStateAction<UserProfile>>;
  updateProfile: (newProfile: Partial<UserProfile>) => void;
  resetProfile: () => void;
  clearProfile: () => void;
}

const ProfileContext = createContext<ProfileContextType | undefined>(undefined);

const LOCAL_STORAGE_KEY_PROFILE = 'inside_user_profile_v4';

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

  useEffect(() => {
    try {
      localStorage.setItem(LOCAL_STORAGE_KEY_PROFILE, JSON.stringify(userProfile));
    } catch (e) {
      console.error('Failed to save profile', e);
    }
  }, [userProfile]);

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
