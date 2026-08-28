import React from 'react';
import { motion, MotionValue, useTransform } from 'framer-motion';

interface CursorFlashlightProps {
  mouseX: MotionValue<number>;
  mouseY: MotionValue<number>;
}

export const CursorFlashlight: React.FC<CursorFlashlightProps> = ({ mouseX, mouseY }) => {
  const gradientBg = useTransform(
    [mouseX, mouseY],
    ([x, y]: number[]) =>
      `radial-gradient(460px circle at ${x}px ${y}px, rgba(255, 255, 255, 0.07) 0%, rgba(255, 255, 255, 0.02) 45%, transparent 80%)`
  );

  const softSpotlight = useTransform(
    [mouseX, mouseY],
    ([x, y]: number[]) =>
      `radial-gradient(320px circle at ${x}px ${y}px, rgba(255, 255, 255, 0.12) 0%, rgba(255, 255, 255, 0.04) 50%, transparent 85%)`
  );

  return (
    <div className="pointer-events-none absolute inset-0 z-10 overflow-hidden">
      <motion.div
        className="absolute inset-0 transition-opacity duration-700"
        style={{ background: gradientBg }}
      />
      <motion.div
        className="absolute inset-0 mix-blend-screen transition-opacity duration-700"
        style={{ background: softSpotlight }}
      />
    </div>
  );
};
