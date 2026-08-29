import React, { useEffect } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';
import { CursorFlashlight } from './CursorFlashlight';
import { CustomCursor } from './CustomCursor';
import { HeroTypography } from './HeroTypography';
import { HiddenFoodWorld } from './HiddenFoodWorld';
import { Camera, Upload, Search, ArrowRight } from 'lucide-react';
import { BrandLogo } from '../common/BrandLogo';

interface HomepageHeroProps {
  onNavigate: (tab: any) => void;
}

export const HomepageHero: React.FC<HomepageHeroProps> = ({ onNavigate }) => {
  const rawMouseX = useMotionValue(-500);
  const rawMouseY = useMotionValue(-500);

  // 120 FPS Ultra-responsive spring physics
  const springConfig = { damping: 40, stiffness: 600, mass: 0.1 };
  const springX = useSpring(rawMouseX, springConfig);
  const springY = useSpring(rawMouseY, springConfig);

  useEffect(() => {
    let ticking = false;

    const handleTouch = (e: TouchEvent) => {
      if (e.touches && e.touches[0] && !ticking) {
        const t = e.touches[0];
        requestAnimationFrame(() => {
          rawMouseX.set(t.clientX);
          rawMouseY.set(t.clientY);
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('touchmove', handleTouch, { passive: true });
    window.addEventListener('touchstart', handleTouch, { passive: true });

    return () => {
      window.removeEventListener('touchmove', handleTouch);
      window.removeEventListener('touchstart', handleTouch);
    };
  }, [rawMouseX, rawMouseY]);

  const handleMouseMove = (e: React.MouseEvent) => {
    rawMouseX.set(e.clientX);
    rawMouseY.set(e.clientY);
  };

  return (
    <div
      className="relative min-h-screen bg-[#030303] text-white custom-cursor-active touch-pan-y select-none"
      onMouseMove={handleMouseMove}
    >
      <CustomCursor />

      {/* SECTION 1: MATTE BLACK FLASHLIGHT HERO */}
      <div className="relative h-screen w-full overflow-hidden bg-[#030303] bg-grain touch-pan-y">
        <CursorFlashlight mouseX={springX} mouseY={springY} />
        <HiddenFoodWorld
          mouseX={springX}
          mouseY={springY}
        />
        <HeroTypography />
      </div>

      {/* SECTION 2: APPLE-STYLE SCROLL & POP-OUT DASHBOARD */}
      <section className="relative z-30 border-t border-white/10 bg-gradient-to-b from-[#030303] via-[#0A0A0C] to-[#121215] py-20 sm:py-32 px-4 sm:px-8 md:px-16">
        <div className="mx-auto max-w-6xl space-y-10 sm:space-y-12">
          <div className="flex flex-col items-center text-center space-y-5 sm:space-y-8">
            {/* Apple-Style Line 1: inside. */}
            <motion.div
              initial={{ opacity: 0.2, y: 35, scale: 0.95 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ margin: '-10% 0px -10% 0px' }}
              transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
              className="select-none flex justify-center"
            >
              <BrandLogo size="hero" showDot />
            </motion.div>

            {/* Apple-Style Line 2: FROM FARM TO CONSUMER. */}
            <motion.div
              initial={{ opacity: 0.2, y: 35, scale: 0.95 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ margin: '-10% 0px -10% 0px' }}
              transition={{ duration: 0.7, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="select-none"
            >
              <h2 className="font-display text-2xl font-extrabold tracking-tight text-white/70 sm:text-5xl md:text-6xl uppercase leading-none">
                FROM FARM TO CONSUMER.
              </h2>
            </motion.div>

            {/* Apple-Style Line 3: KNOW WHAT'S INSIDE. */}
            <motion.div
              initial={{ opacity: 0.2, y: 35, scale: 0.95 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ margin: '-10% 0px -10% 0px' }}
              transition={{ duration: 0.7, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
              className="select-none"
            >
              <h2 className="font-display text-2xl font-extrabold tracking-tight bg-gradient-to-r from-white via-white/90 to-white/50 bg-clip-text text-transparent sm:text-5xl md:text-6xl uppercase leading-none">
                KNOW WHAT'S INSIDE.
              </h2>
            </motion.div>

            {/* Apple-Style Paragraph: AI-powered intelligence... */}
            <motion.div
              initial={{ opacity: 0.2, y: 25, scale: 0.97 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ margin: '-10% 0px -10% 0px' }}
              transition={{ duration: 0.7, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
              className="select-none max-w-2xl px-2"
            >
              <p className="text-sm font-bold text-white/70 sm:text-lg md:text-xl leading-relaxed">
                AI-powered intelligence connecting agricultural produce, food processing, quality assessment, and nutritional transparency in real-time.
              </p>
            </motion.div>

            {/* Action Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="mt-6 sm:mt-8 flex flex-col sm:flex-row items-center justify-center gap-3.5 w-full sm:w-auto"
            >
              <button
                onClick={() => onNavigate('scan')}
                className="group flex w-full sm:w-auto items-center justify-center space-x-3 rounded-full bg-white px-8 py-4 text-sm font-extrabold text-black shadow-lg shadow-white/10 transition-all duration-300 hover:bg-white/90 active:scale-95 min-h-[48px]"
              >
                <Camera className="h-4 w-4 text-black" />
                <span className="tracking-wider uppercase">SCAN A PRODUCT</span>
                <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
              </button>

              <button
                onClick={() => onNavigate('upload')}
                className="flex w-full sm:w-auto items-center justify-center space-x-3 rounded-full border border-white/20 bg-white/5 px-8 py-4 text-sm font-extrabold text-white backdrop-blur-md transition-all duration-300 hover:border-white/40 hover:bg-white/10 active:scale-95 min-h-[48px]"
              >
                <Upload className="h-4 w-4 text-white/80" />
                <span className="tracking-wider uppercase">UPLOAD IMAGE</span>
              </button>

              <button
                onClick={() => onNavigate('search')}
                className="flex w-full sm:w-auto items-center justify-center space-x-3 rounded-full border border-white/10 bg-transparent px-8 py-4 text-sm font-bold text-white/70 transition-all duration-300 hover:border-white/25 hover:text-white active:scale-95 min-h-[48px]"
              >
                <Search className="h-4 w-4" />
                <span className="tracking-wider uppercase">SEARCH DATABASE</span>
              </button>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
};
