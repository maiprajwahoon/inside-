import React from 'react';

export interface BrandLogoProps {
  size?: 'sm' | 'md' | 'lg' | 'hero';
  showDot?: boolean;
  className?: string;
  iconClassName?: string;
  textClassName?: string;
  interactive?: boolean;
  onClick?: () => void;
}

export const BrandLogo: React.FC<BrandLogoProps> = ({
  size = 'md',
  showDot = false,
  className = '',
  iconClassName = '',
  textClassName = '',
  interactive = true,
  onClick,
}) => {
  const sizeMap = {
    sm: {
      gap: 'space-x-2',
      icon: 'h-5 w-auto',
      text: 'text-lg font-black tracking-widest',
    },
    md: {
      gap: 'space-x-2.5',
      icon: 'h-6 w-auto sm:h-7',
      text: 'text-xl sm:text-2xl font-black tracking-widest',
    },
    lg: {
      gap: 'space-x-3',
      icon: 'h-8 w-auto sm:h-9',
      text: 'text-2xl sm:text-3xl font-black tracking-widest',
    },
    hero: {
      gap: 'space-x-4 sm:space-x-6',
      icon: 'h-10 w-auto sm:h-20 md:h-24 drop-shadow-[0_10px_35px_rgba(0,0,0,0.9)]',
      text: 'text-4xl sm:text-7xl md:text-8xl font-black tracking-tight leading-none drop-shadow-[0_10px_35px_rgba(0,0,0,0.9)]',
    },
  };

  const currentSize = sizeMap[size];

  const hoverEffect = interactive
    ? 'transition-transform duration-300 transform group-hover:scale-105 hover:scale-105 active:scale-95 origin-left'
    : '';

  const content = (
    <div className={`inline-flex items-center ${currentSize.gap} ${hoverEffect} ${className}`}>
      <img
        src="/logo.svg"
        alt="inside logo"
        className={`${currentSize.icon} object-contain shrink-0 ${iconClassName}`}
      />
      <span className={`font-display text-white uppercase shrink-0 ${currentSize.text} ${textClassName}`}>
        inside{showDot ? '.' : ''}
      </span>
    </div>
  );

  if (onClick) {
    return (
      <button
        onClick={onClick}
        className="text-left group shrink-0 focus:outline-none"
        type="button"
      >
        {content}
      </button>
    );
  }

  return content;
};
