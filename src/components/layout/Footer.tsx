import React from 'react';
import type { ActiveTab } from '../../lib/types';
import { BrandLogo } from '../common/BrandLogo';

interface FooterProps {
  onNavigate: (tab: ActiveTab) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  return (
    <footer className="border-t border-white/10 bg-[#030303] py-16 px-6 md:px-12 text-white/60">
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-8 md:flex-row">
        {/* Brand & Bold About Us Section */}
        <div className="flex flex-col items-center md:items-start space-y-2 max-w-md text-center md:text-left">
          <BrandLogo size="md" onClick={() => onNavigate('home')} />
          <p className="text-sm font-bold leading-relaxed text-white/90">
            We just think you deserve to know exactly what’s in your food, without any of the confusing jargon or fear-mongering. We're here to make sense of the science so you can eat with confidence.
          </p>
        </div>

        {/* Quick Links */}
        <div className="flex flex-wrap justify-center gap-6 text-xs font-black tracking-wider uppercase text-white/80">
          <button onClick={() => onNavigate('scan')} className="hover:text-white transition-colors">
            SCAN
          </button>
          <button onClick={() => onNavigate('upload')} className="hover:text-white transition-colors">
            UPLOAD
          </button>
          <button onClick={() => onNavigate('search')} className="hover:text-white transition-colors">
            SEARCH
          </button>
          <button onClick={() => onNavigate('compare')} className="hover:text-white transition-colors">
            COMPARE
          </button>
          <button onClick={() => onNavigate('profile')} className="hover:text-white transition-colors">
            PROFILE
          </button>
        </div>

        {/* Copyright */}
        <div className="text-xs font-mono font-black text-white/50">
          © {new Date().getFullYear()} inside. ALL RIGHTS RESERVED.
        </div>
      </div>
    </footer>
  );
};
