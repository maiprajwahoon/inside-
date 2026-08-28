import React from 'react';
import type { ActiveTab } from '../../lib/types';
import { Camera, Upload, Search, Columns, User } from 'lucide-react';
import { useProfile } from '../../context/ProfileContext';
import { BrandLogo } from '../common/BrandLogo';

interface NavbarProps {
  activeTab: ActiveTab;
  onNavigate: (tab: ActiveTab) => void;
}

export const Navbar: React.FC<NavbarProps> = ({ activeTab, onNavigate }) => {
  const { userProfile } = useProfile();
  const ruleCount = userProfile.allergies.length + userProfile.diets.length + userProfile.avoidIngredients.length;

  const navItems: { id: ActiveTab; label: string; icon: React.ReactNode }[] = [
    { id: 'scan', label: 'SCAN', icon: <Camera className="h-3.5 w-3.5" /> },
    { id: 'upload', label: 'UPLOAD', icon: <Upload className="h-3.5 w-3.5" /> },
    { id: 'search', label: 'SEARCH', icon: <Search className="h-3.5 w-3.5" /> },
    { id: 'compare', label: 'COMPARE', icon: <Columns className="h-3.5 w-3.5" /> },
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b border-white/10 bg-[#030303]/95 backdrop-blur-md">
      {/* Top Header Bar (Desktop & Mobile) */}
      <div className="mx-auto flex h-14 sm:h-16 max-w-7xl items-center justify-between px-4 sm:px-8 md:px-12">
        {/* Brand Name Title (Left) */}
        <BrandLogo
          onClick={() => onNavigate('home')}
          size="md"
        />

        {/* Center Desktop Navigation Links */}
        <nav className="hidden md:flex items-center space-x-1">
          {navItems.map((item) => {
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => onNavigate(item.id)}
                className={`flex items-center space-x-2 rounded-full px-4 py-2 text-xs font-bold tracking-wider uppercase transition-all ${
                  isActive
                    ? 'bg-white text-black font-extrabold shadow-sm'
                    : 'text-white/60 hover:text-white hover:bg-white/5'
                }`}
              >
                {item.icon}
                <span>{item.label}</span>
              </button>
            );
          })}
        </nav>

        {/* Right Pinned Profile Button (ALWAYS Visible on Mobile & PC) */}
        <button
          onClick={() => onNavigate('profile')}
          className={`flex items-center space-x-1.5 sm:space-x-2 rounded-full border px-3 sm:px-4 py-1.5 sm:py-2 text-xs font-black tracking-wider uppercase transition-all shrink-0 ${
            activeTab === 'profile'
              ? 'border-white bg-white text-black font-extrabold'
              : 'border-white/20 bg-white/10 text-white hover:border-white/40 hover:bg-white/20'
          }`}
        >
          <User className="h-3.5 w-3.5" />
          <span>PROFILE ({ruleCount})</span>
        </button>
      </div>

      {/* Dedicated Mobile Quick Nav Bar (Only visible on mobile screens < 768px) */}
      <div className="flex md:hidden border-t border-white/10 bg-[#0A0A0E] px-2 py-1.5 justify-around items-center">
        {navItems.map((item) => {
          const isActive = activeTab === item.id;
          return (
            <button
              key={item.id}
              onClick={() => onNavigate(item.id)}
              className={`flex items-center space-x-1 rounded-full px-3 py-1 text-[11px] font-extrabold tracking-wider uppercase transition-all ${
                isActive ? 'bg-white text-black shadow-sm' : 'text-white/70 hover:text-white'
              }`}
            >
              {item.icon}
              <span>{item.label}</span>
            </button>
          );
        })}
      </div>
    </header>
  );
};
