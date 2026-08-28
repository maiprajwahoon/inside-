import React from 'react';

export const HeroTypography: React.FC = () => {
  return (
    <div className="pointer-events-none absolute inset-0 z-40 flex flex-col justify-between p-4 sm:p-10 md:p-16">
      {/* Level-by-level stacked vertical display typography */}
      <div className="mt-6 sm:mt-10 flex flex-col items-start space-y-1 sm:space-y-3 md:space-y-4 text-left">
        {/* LEVEL 1: FOOD. */}
        <div className="pointer-events-auto cursor-pointer select-none transition-all duration-300 hover:scale-105 hover:translate-x-3 origin-left">
          <h1 className="font-display text-4xl sm:text-7xl md:text-8xl lg:text-9xl font-black tracking-tight text-white uppercase leading-none drop-shadow-[0_10px_35px_rgba(0,0,0,0.9)] hover:drop-shadow-[0_0_45px_rgba(255,255,255,0.9)] whitespace-nowrap">
            FOOD.
          </h1>
        </div>

        {/* LEVEL 2: INGREDIENTS. */}
        <div className="pointer-events-auto cursor-pointer select-none transition-all duration-300 hover:scale-105 hover:translate-x-3 origin-left">
          <h1 className="font-display text-3xl sm:text-6xl md:text-7xl lg:text-8xl font-black tracking-tight text-white/95 uppercase leading-none drop-shadow-[0_10px_35px_rgba(0,0,0,0.9)] hover:drop-shadow-[0_0_45px_rgba(255,255,255,0.9)] whitespace-nowrap">
            INGREDIENTS.
          </h1>
        </div>

        {/* LEVEL 3: YOU. */}
        <div className="pointer-events-auto cursor-pointer select-none transition-all duration-300 hover:scale-105 hover:translate-x-3 origin-left">
          <h1 className="font-display text-4xl sm:text-7xl md:text-8xl lg:text-9xl font-black tracking-tight text-white uppercase leading-none drop-shadow-[0_10px_35px_rgba(0,0,0,0.9)] hover:drop-shadow-[0_0_45px_rgba(255,255,255,0.9)] whitespace-nowrap">
            YOU.
          </h1>
        </div>
      </div>

      {/* Bottom Editorial Taglines */}
      <div className="mb-4 sm:mb-6 flex flex-col items-center justify-center text-center">
        <div className="space-y-1 sm:space-y-1.5">
          <p className="font-display text-sm sm:text-2xl md:text-3xl font-bold tracking-[0.2em] text-white uppercase pointer-events-auto cursor-pointer transition-all duration-300 hover:scale-105 hover:text-white drop-shadow-md">
            KNOW INSIDE.
          </p>
          <p className="font-display text-xs sm:text-xl md:text-2xl font-light tracking-[0.25em] text-white/70 uppercase pointer-events-auto cursor-pointer transition-all duration-300 hover:scale-105 hover:text-white drop-shadow-md">
            KNOW WHAT GOES INSIDE YOU.
          </p>
        </div>

        <div className="mt-4 sm:mt-6 flex flex-col items-center space-y-2 text-white/40">
          <span className="text-[9px] sm:text-[10px] tracking-widest uppercase font-mono">SCROLL TO EXPLORE</span>
          <div className="h-5 sm:h-6 w-3 sm:w-3.5 rounded-full border border-white/30 p-0.5">
            <div className="h-1.5 w-1.5 rounded-full bg-white/70 mx-auto animate-bounce" />
          </div>
        </div>
      </div>
    </div>
  );
};
