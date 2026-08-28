import React, { useState } from 'react';
import { motion } from 'framer-motion';

export const HeroTypography: React.FC = () => {
  const [hoveredText, setHoveredText] = useState<string | null>(null);

  return (
    <div className="pointer-events-none absolute inset-0 z-40 flex flex-col justify-between p-6 sm:p-12 md:p-16">
      {/* Level-by-level stacked vertical display typography */}
      <div className="mt-8 flex flex-col items-start space-y-1 sm:space-y-3 md:space-y-4 text-left">
        {/* LEVEL 1: FOOD. */}
        <motion.div
          onMouseEnter={() => setHoveredText('food')}
          onMouseLeave={() => setHoveredText(null)}
          animate={{
            scale: hoveredText === 'food' ? 1.06 : 1,
            x: hoveredText === 'food' ? 16 : 0,
          }}
          transition={{ duration: 0.25, ease: 'easeOut' }}
          className="pointer-events-auto cursor-pointer select-none"
        >
          <h1
            className={`font-display text-6xl font-black tracking-tight sm:text-8xl md:text-9xl uppercase leading-none transition-all duration-300 ${
              hoveredText === 'food'
                ? 'text-white drop-shadow-[0_0_45px_rgba(255,255,255,0.9)]'
                : 'text-white/90 drop-shadow-[0_10px_30px_rgba(0,0,0,0.9)]'
            }`}
          >
            FOOD.
          </h1>
        </motion.div>

        {/* LEVEL 2: INGREDIENTS. */}
        <motion.div
          onMouseEnter={() => setHoveredText('ingredients')}
          onMouseLeave={() => setHoveredText(null)}
          animate={{
            scale: hoveredText === 'ingredients' ? 1.06 : 1,
            x: hoveredText === 'ingredients' ? 16 : 0,
          }}
          transition={{ duration: 0.25, ease: 'easeOut' }}
          className="pointer-events-auto cursor-pointer select-none"
        >
          <h1
            className={`font-display text-5xl font-black tracking-tight sm:text-7xl md:text-8xl lg:text-9xl uppercase leading-none transition-all duration-300 ${
              hoveredText === 'ingredients'
                ? 'text-white drop-shadow-[0_0_45px_rgba(255,255,255,0.9)]'
                : 'text-white/90 drop-shadow-[0_10px_30px_rgba(0,0,0,0.9)]'
            }`}
          >
            INGREDIENTS.
          </h1>
        </motion.div>

        {/* LEVEL 3: YOU. */}
        <motion.div
          onMouseEnter={() => setHoveredText('you')}
          onMouseLeave={() => setHoveredText(null)}
          animate={{
            scale: hoveredText === 'you' ? 1.06 : 1,
            x: hoveredText === 'you' ? 16 : 0,
          }}
          transition={{ duration: 0.25, ease: 'easeOut' }}
          className="pointer-events-auto cursor-pointer select-none"
        >
          <h1
            className={`font-display text-6xl font-black tracking-tight sm:text-8xl md:text-9xl uppercase leading-none transition-all duration-300 ${
              hoveredText === 'you'
                ? 'text-white drop-shadow-[0_0_45px_rgba(255,255,255,0.9)]'
                : 'text-white/90 drop-shadow-[0_10px_30px_rgba(0,0,0,0.9)]'
            }`}
          >
            YOU.
          </h1>
        </motion.div>
      </div>

      {/* Bottom Editorial Taglines */}
      <div className="mb-6 flex flex-col items-center justify-center text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 0.95, y: 0 }}
          transition={{ duration: 1, delay: 0.3 }}
          className="space-y-1.5"
        >
          <motion.p
            onMouseEnter={() => setHoveredText('tag1')}
            onMouseLeave={() => setHoveredText(null)}
            animate={{
              scale: hoveredText === 'tag1' ? 1.05 : 1,
            }}
            transition={{ duration: 0.25 }}
            className={`font-display text-lg font-bold tracking-[0.2em] uppercase sm:text-2xl md:text-3xl pointer-events-auto cursor-pointer transition-all duration-300 ${
              hoveredText === 'tag1'
                ? 'text-white drop-shadow-[0_0_30px_rgba(255,255,255,0.9)]'
                : 'text-white/90 drop-shadow-md'
            }`}
          >
            KNOW INSIDE.
          </motion.p>
          <motion.p
            onMouseEnter={() => setHoveredText('tag2')}
            onMouseLeave={() => setHoveredText(null)}
            animate={{
              scale: hoveredText === 'tag2' ? 1.05 : 1,
            }}
            transition={{ duration: 0.25 }}
            className={`font-display text-base font-light tracking-[0.25em] uppercase sm:text-xl md:text-2xl pointer-events-auto cursor-pointer transition-all duration-300 ${
              hoveredText === 'tag2'
                ? 'text-white drop-shadow-[0_0_30px_rgba(255,255,255,0.9)]'
                : 'text-white/70 drop-shadow-md'
            }`}
          >
            KNOW WHAT GOES INSIDE YOU.
          </motion.p>
        </motion.div>

        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="mt-6 flex flex-col items-center space-y-2 text-white/40"
        >
          <span className="text-[10px] tracking-widest uppercase font-mono">SCROLL TO EXPLORE</span>
          <div className="h-6 w-3.5 rounded-full border border-white/30 p-0.5">
            <div className="h-1.5 w-1.5 rounded-full bg-white/70 mx-auto" />
          </div>
        </motion.div>
      </div>
    </div>
  );
};
