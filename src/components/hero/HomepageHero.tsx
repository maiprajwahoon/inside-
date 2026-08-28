import React, { useEffect } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';
import { CursorFlashlight } from './CursorFlashlight';
import { CustomCursor } from './CustomCursor';
import { HeroTypography } from './HeroTypography';
import { HiddenFoodWorld } from './HiddenFoodWorld';
import { Camera, Upload, Search, ArrowRight } from 'lucide-react';

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
      className="relative min-h-screen bg-[#030303] text-white custom-cursor-active touch-pan-y"
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
      <section className="relative z-30 border-t border-white/10 bg-gradient-to-b from-[#030303] via-[#0A0A0C] to-[#121215] py-24 sm:py-32 px-4 sm:px-8 md:px-16">
        <div className="mx-auto max-w-6xl space-y-12">
          <div className="flex flex-col items-center text-center space-y-6 sm:space-y-8">
            {/* Apple-Style Line 1: inside. */}
            <motion.div
              initial={{ opacity: 0.2, y: 45, scale: 0.94, filter: 'blur(6px)' }}
              whileInView={{ opacity: 1, y: 0, scale: 1, filter: 'blur(0px)' }}
              whileHover={{ scale: 1.05, y: -4 }}
              viewport={{ margin: '-10% 0px -10% 0px' }}
              transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
              className="cursor-pointer select-none"
            >
              <h2 className="font-display text-5xl font-black tracking-tight text-white sm:text-8xl md:text-9xl uppercase leading-none drop-shadow-[0_10px_35px_rgba(0,0,0,0.9)] hover:drop-shadow-[0_0_50px_rgba(255,255,255,0.6)] transition-all">
                inside.
              </h2>
            </motion.div>

            {/* Apple-Style Line 2: SCAN YOUR FOOD. */}
            <motion.div
              initial={{ opacity: 0.2, y: 45, scale: 0.94, filter: 'blur(6px)' }}
              whileInView={{ opacity: 1, y: 0, scale: 1, filter: 'blur(0px)' }}
              whileHover={{ scale: 1.05, y: -4 }}
              viewport={{ margin: '-10% 0px -10% 0px' }}
              transition={{ duration: 0.7, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="cursor-pointer select-none"
            >
              <h2 className="font-display text-3xl font-extrabold tracking-tight text-white/70 sm:text-6xl md:text-7xl uppercase leading-none transition-all hover:text-white">
                SCAN YOUR FOOD.
              </h2>
            </motion.div>

            {/* Apple-Style Line 3: KNOW IF IT FITS YOU. */}
            <motion.div
              initial={{ opacity: 0.2, y: 45, scale: 0.94, filter: 'blur(6px)' }}
              whileInView={{ opacity: 1, y: 0, scale: 1, filter: 'blur(0px)' }}
              whileHover={{ scale: 1.05, y: -4 }}
              viewport={{ margin: '-10% 0px -10% 0px' }}
              transition={{ duration: 0.7, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
              className="cursor-pointer select-none"
            >
              <h2 className="font-display text-3xl font-extrabold tracking-tight bg-gradient-to-r from-white via-white/90 to-white/50 bg-clip-text text-transparent sm:text-6xl md:text-7xl uppercase leading-none transition-all hover:brightness-125">
                KNOW IF IT FITS YOU.
              </h2>
            </motion.div>

            {/* Apple-Style Paragraph: Understand ingredients... */}
            <motion.div
              initial={{ opacity: 0.2, y: 35, scale: 0.96 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              whileHover={{ scale: 1.03 }}
              viewport={{ margin: '-10% 0px -10% 0px' }}
              transition={{ duration: 0.7, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
              className="cursor-pointer select-none max-w-2xl px-2"
            >
              <p className="text-base font-medium text-white/70 sm:text-xl md:text-2xl leading-relaxed transition-colors hover:text-white">
                Understand ingredients and discover whether a product fits your personal food profile in real-time.
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
                className="group flex w-full sm:w-auto items-center justify-center space-x-3 rounded-full bg-white px-8 py-4 text-sm font-extrabold text-black shadow-lg shadow-white/10 transition-all duration-300 hover:bg-white/90 hover:scale-105 active:scale-95 min-h-[48px]"
              >
                <Camera className="h-4 w-4 text-black" />
                <span className="tracking-wider uppercase">SCAN A PRODUCT</span>
                <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
              </button>

              <button
                onClick={() => onNavigate('upload')}
                className="flex w-full sm:w-auto items-center justify-center space-x-3 rounded-full border border-white/20 bg-white/5 px-8 py-4 text-sm font-extrabold text-white backdrop-blur-md transition-all duration-300 hover:border-white/40 hover:bg-white/10 hover:scale-105 active:scale-95 min-h-[48px]"
              >
                <Upload className="h-4 w-4 text-white/80" />
                <span className="tracking-wider uppercase">UPLOAD IMAGE</span>
              </button>

              <button
                onClick={() => onNavigate('search')}
                className="flex w-full sm:w-auto items-center justify-center space-x-3 rounded-full border border-white/10 bg-transparent px-8 py-4 text-sm font-bold text-white/70 transition-all duration-300 hover:border-white/25 hover:text-white hover:scale-105 min-h-[48px]"
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
