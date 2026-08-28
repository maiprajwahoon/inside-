import React from 'react';
import { motion } from 'framer-motion';
import type { ProductNutrition } from '../../lib/types';

interface NutritionAnalysisProps {
  nutrition: ProductNutrition;
}

export const NutritionAnalysis: React.FC<NutritionAnalysisProps> = ({ nutrition }) => {
  const metrics = [
    { label: 'CALORIES', value: nutrition.calories, unit: 'kcal', max: 500, color: 'bg-white' },
    { label: 'SUGAR', value: nutrition.sugar, unit: 'g', max: 40, color: nutrition.sugar > 12 ? 'bg-amber-400' : 'bg-emerald-400' },
    { label: 'PROTEIN', value: nutrition.protein, unit: 'g', max: 30, color: 'bg-emerald-400' },
    { label: 'FAT', value: nutrition.fat, unit: 'g', max: 30, color: 'bg-white/80' },
    { label: 'SATURATED FAT', value: nutrition.saturatedFat, unit: 'g', max: 15, color: 'bg-amber-400' },
    { label: 'SODIUM', value: nutrition.sodium, unit: 'mg', max: 1500, color: nutrition.sodium > 400 ? 'bg-amber-400' : 'bg-white/80' },
    { label: 'CARBOHYDRATES', value: nutrition.carbs, unit: 'g', max: 60, color: 'bg-white/80' },
  ];

  return (
    <div className="rounded-3xl border border-white/10 bg-[#09090D] p-8 backdrop-blur-xl space-y-6">
      <div className="flex items-center justify-between border-b border-white/10 pb-4">
        <div>
          <span className="text-[10px] font-bold tracking-widest text-white/50 uppercase font-mono">
            MACRONUTRIENT BREAKDOWN
          </span>
          <h3 className="font-display text-xl font-bold tracking-wide text-white uppercase">
            NUTRITION ANALYSIS
          </h3>
        </div>
        <span className="text-xs font-mono text-white/40">PER SERVING</span>
      </div>

      <div className="space-y-4">
        {metrics.map((item, index) => {
          const pct = Math.min(100, Math.max(8, (item.value / item.max) * 100));
          return (
            <div key={item.label} className="space-y-1.5">
              <div className="flex items-center justify-between text-xs">
                <span className="font-mono font-bold tracking-wider text-white/70">{item.label}</span>
                <span className="font-mono font-bold text-white">
                  {item.value} {item.unit}
                </span>
              </div>

              <div className="h-2 w-full overflow-hidden rounded-full bg-white/5">
                <motion.div
                  initial={{ width: 0 }}
                  whileInView={{ width: `${pct}%` }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, delay: index * 0.08, ease: 'easeOut' }}
                  className={`h-full rounded-full ${item.color}`}
                />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
