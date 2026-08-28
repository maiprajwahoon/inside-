import React from 'react';
import type { ActiveTab } from '../../lib/types';
import { Camera, Upload, Search, Columns, User } from 'lucide-react';
import { useProfile } from '../../context/ProfileContext';

interface NavbarProps {
  activeTab: ActiveTab;
  onNavigate: (tab: ActiveTab) => void;
}

export const Navbar: React.FC<NavbarProps> = ({ activeTab, onNavigate }) => {
  const { userProfile } = useProfile();
  const ruleCount = userProfile.allergies.length + userProfile.diets.length + userProfile.avoidIngredients.length;

  const navItems: { id: ActiveTab; label: string; icon: React.ReactNode }[] = [
    { id: 'home', label: 'INSIDE', icon: null },
    { id: 'scan', label: 'SCAN', icon: <Camera className="h-3.5 w-3.5" /> },
    { id: 'upload', label: 'UPLOAD', icon: <Upload className="h-3.5 w-3.5" /> },
    { id: 'search', label: 'SEARCH', icon: <Search className="h-3.5 w-3.5" /> },
    { id: 'compare', label: 'COMPARE', icon: <Columns className="h-3.5 w-3.5" /> },
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b border-white/10 bg-[#030303]/95 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-8 md:px-12">
        {/* Brand Name Title ONLY (No Logo Icon) */}
        <button
          onClick={() => onNavigate('home')}
          className="flex items-center space-x-2 text-left group shrink-0"
        >
          <span className="font-display text-xl font-black tracking-widest text-white uppercase group-hover:text-white/80 transition-colors">
            inside
          </span>
        </button>

        {/* Center Nav Items (Desktop & Tablet) */}
        <nav className="hidden md:flex items-center space-x-1">
          {navItems.map((item) => {
            const isActive = activeTab === item.id;
            if (item.id === 'home') return null;
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

        {/* Right Active Profile Button */}
        <div className="flex items-center space-x-2 sm:space-x-3">
          {/* Mobile Navigation Quick Bar */}
          <div className="flex md:hidden items-center space-x-1 overflow-x-auto no-scrollbar py-1">
            {navItems.map((item) => {
              if (item.id === 'home') return null;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => onNavigate(item.id)}
                  className={`flex items-center space-x-1 rounded-full px-2.5 py-1.5 text-[10px] font-extrabold tracking-wider uppercase transition-all ${
                    isActive ? 'bg-white text-black' : 'text-white/70 bg-white/5'
                  }`}
                >
                  {item.icon}
                  <span>{item.label}</span>
                </button>
              );
            })}
          </div>

          <button
            onClick={() => onNavigate('profile')}
            className={`flex items-center space-x-1.5 rounded-full border px-3 sm:px-4 py-1.5 sm:py-2 text-[10px] sm:text-xs font-black tracking-wider uppercase transition-all shrink-0 ${
              activeTab === 'profile'
                ? 'border-white bg-white text-black font-extrabold'
                : 'border-white/15 bg-white/5 text-white/80 hover:border-white/40 hover:text-white'
            }`}
          >
            <User className="h-3.5 w-3.5" />
            <span>({ruleCount})</span>
          </button>
        </div>
      </div>
    </header>
  );
};
