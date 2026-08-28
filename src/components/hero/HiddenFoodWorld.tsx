import React, { useEffect, useRef } from 'react';
import type { MotionValue } from 'framer-motion';
import { MOCK_PRODUCTS } from '../../lib/mock-data';
import { Sparkles } from 'lucide-react';

interface HiddenFoodWorldProps {
  mouseX: MotionValue<number>;
  mouseY: MotionValue<number>;
}

export const HiddenFoodWorld: React.FC<HiddenFoodWorldProps> = ({ mouseX, mouseY }) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let animFrameId: number;
    const cards = containerRef.current?.querySelectorAll<HTMLDivElement>('.food-card-item');

    if (!cards || cards.length === 0) return;

    const cardPositions = Array.from(cards).map((card) => {
      const rect = card.getBoundingClientRect();
      return {
        element: card,
        inner: card.querySelector<HTMLDivElement>('.food-card-inner'),
        centerX: rect.left + rect.width / 2,
        centerY: rect.top + rect.height / 2,
        baseScale: parseFloat(card.dataset.scale || '1'),
      };
    });

    const updateProximity = () => {
      const curX = mouseX.get();
      const curY = mouseY.get();

      const revealRadius = 350;

      cardPositions.forEach((card) => {
        const dx = curX - card.centerX;
        const dy = curY - card.centerY;
        const dist = Math.sqrt(dx * dx + dy * dy);

        const rawProximity = Math.max(0, 1 - dist / revealRadius);
        const proximity = Math.pow(rawProximity, 1.4);

        const opacity = Math.min(1, Math.max(0.45, 0.45 + proximity * 0.55));
        const blur = Math.max(0, (1 - proximity) * 3);
        const scale = card.baseScale * (0.98 + proximity * 0.08);

        if (card.inner) {
          card.inner.style.opacity = opacity.toString();
          card.inner.style.filter = `blur(${blur}px)`;
        }
        card.element.style.transform = `translate3d(-50%, -50%, 0) rotate(${card.element.dataset.rotation}deg) scale(${scale})`;
      });

      animFrameId = requestAnimationFrame(updateProximity);
    };

    animFrameId = requestAnimationFrame(updateProximity);

    return () => {
      cancelAnimationFrame(animFrameId);
    };
  }, [mouseX, mouseY]);

  const isMobile = typeof window !== 'undefined' && window.innerWidth < 640;

  return (
    <div ref={containerRef} className="relative h-screen w-full overflow-hidden bg-[#030303] pointer-events-none max-w-full">
      {MOCK_PRODUCTS.slice(0, 18).map((product) => {
        // Clamp mobile X position between 18% and 82% to prevent screen overflow
        const posX = isMobile
          ? Math.max(18, Math.min(82, product.position.x))
          : product.position.x;
        const cardScale = isMobile ? product.position.scale * 0.65 : product.position.scale;

        return (
          <div
            key={product.id}
            data-scale={cardScale}
            data-rotation={product.position.rotation}
            className="food-card-item absolute select-none pointer-events-none transition-transform duration-75 ease-out will-change-transform"
            style={{
              left: `${posX}%`,
              top: `${product.position.y}%`,
              transform: `translate3d(-50%, -50%, 0) rotate(${product.position.rotation}deg) scale(${cardScale})`,
              zIndex: product.position.depth * 3,
            }}
          >
            <div
              className="food-card-inner relative transition-opacity duration-75 ease-out will-change-[opacity,filter]"
              style={{
                opacity: 0.45,
                filter: 'blur(3px)',
              }}
            >
              <div
                className="relative flex flex-col justify-between overflow-hidden rounded-2xl border border-white/15 bg-[#0C0C10] p-4 shadow-2xl"
                style={{
                  width: product.packageStyle.shape === 'bar' ? '210px' : product.packageStyle.shape === 'can' ? '160px' : '190px',
                  minHeight: product.packageStyle.shape === 'bar' ? '110px' : product.packageStyle.shape === 'bottle' ? '220px' : '190px',
                }}
              >
                <div
                  className="pointer-events-none absolute -top-12 -right-12 h-32 w-32 rounded-full opacity-30 blur-2xl"
                  style={{ backgroundColor: product.packageStyle.accentColor }}
                />

                <div className="flex items-center justify-between border-b border-white/15 pb-2">
                  <span className="font-display text-[11px] font-extrabold tracking-[0.2em] text-white uppercase">
                    {product.brand}
                  </span>
                  <span className="rounded-full bg-white/10 px-2 py-0.5 text-[9px] font-bold tracking-wider text-white/80 uppercase">
                    {product.category}
                  </span>
                </div>

                <div className="my-2 flex flex-col space-y-1">
                  <h4 className="font-display text-sm font-extrabold leading-snug text-white tracking-wide">
                    {product.name}
                  </h4>
                  <p className="text-[10px] text-white/70 line-clamp-1">{product.subtitle}</p>
                </div>

                <div className="my-1 flex items-center justify-between">
                  <div
                    className="h-1.5 rounded-full"
                    style={{
                      width: '65%',
                      backgroundColor: product.packageStyle.accentColor,
                    }}
                  />
                  <span className="text-[9px] font-mono text-white/60 font-semibold">{product.packageStyle.tagline}</span>
                </div>

                <div className="mt-2 rounded-xl border border-white/15 bg-black/80 p-2.5 backdrop-blur-md">
                  <div className="mb-1 flex items-center justify-between text-[9px] font-bold tracking-widest text-white/90 uppercase">
                    <span>INGREDIENTS</span>
                    <Sparkles className="h-2.5 w-2.5 text-emerald-400" />
                  </div>
                  <div className="flex flex-wrap gap-1">
                    {product.ingredients.slice(0, 4).map((ing) => (
                      <span
                        key={ing.id}
                        className="rounded bg-white/15 px-1.5 py-0.5 text-[9px] font-medium text-white/90"
                      >
                        {ing.name}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};
