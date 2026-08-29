import React, { useState } from 'react';
import { useProfile } from '../../context/ProfileContext';
import { analyzeProduct } from '../../lib/analyzer';
import type { IngredientAnalysisItem, Product } from '../../lib/types';
import { WhyFlaggedDiagram } from './WhyFlaggedDiagram';
import { NutritionAnalysis } from './NutritionAnalysis';
import { ArrowLeft, X, ArrowUpRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface AnalysisResultViewProps {
  product: Product;
  onBack: () => void;
}

export const AnalysisResultView: React.FC<AnalysisResultViewProps> = ({ product, onBack }) => {
  const { userProfile } = useProfile();
  const analysis = analyzeProduct(userProfile, product);
  const [selectedIngredient, setSelectedIngredient] = useState<IngredientAnalysisItem | null>(null);

  const flaggedItem = analysis.ingredientAnalysis.find((i) => i.status === 'RED' || i.status === 'AMBER');

  return (
    <div className="min-h-screen bg-[#030303] py-16 px-6 md:px-16 text-[#F5F5F7]">
      <div className="mx-auto max-w-4xl space-y-12">
        {/* Navigation Back Link */}
        <div>
          <button
            onClick={onBack}
            className="inline-flex items-center space-x-2 text-xs font-mono text-white/50 hover:text-white transition-colors"
          >
            <ArrowLeft className="h-3.5 w-3.5" />
            <span>BACK TO SEARCH</span>
          </button>
        </div>

        {/* Top Product Editorial Header */}
        <div className="border-b border-white/10 pb-8 space-y-4">
          <span className="font-mono text-xs text-white/40 uppercase tracking-widest block">
            {product.brand} · {product.category}
          </span>

          <h1 className="font-display text-4xl font-extrabold tracking-tight text-white sm:text-6xl uppercase">
            {product.name}
          </h1>

          <p className="text-sm text-white/60">{product.subtitle}</p>

          {/* Concise Verdict Block */}
          <div className="mt-6 pt-6 border-t border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <span className="text-[11px] font-mono text-white/40 uppercase block">
                PERSONALIZED SAFETY VERDICT
              </span>
              <span
                className={`font-display text-2xl font-black uppercase tracking-wide block mt-1 ${
                  analysis.overallStatus === 'NOT_RECOMMENDED'
                    ? 'text-red-400'
                    : analysis.overallStatus === 'CAUTION'
                    ? 'text-amber-400'
                    : 'text-emerald-400'
                }`}
              >
                {analysis.overallStatus === 'NOT_RECOMMENDED'
                  ? '🔴 PERSONAL CONFLICT — NOT RECOMMENDED'
                  : analysis.overallStatus === 'CAUTION'
                  ? '🟡 POTENTIAL CONCERN'
                  : '🟢 GOOD MATCH FOR YOU'}
              </span>
            </div>

            {flaggedItem && (
              <div className="text-xs text-white/70 bg-white/5 border border-white/10 rounded-lg p-3 max-w-md">
                <span className="font-bold text-white block">Flagged Reason:</span>
                <span>{flaggedItem.reason}</span>
              </div>
            )}
          </div>

          {/* Agricultural Quality Intelligence Block (If Agri Produce) */}
          {product.agriData && (
            <div className="mt-6 pt-6 border-t border-white/10 space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-mono font-bold tracking-widest text-emerald-400 uppercase">
                  🌾 AGRICULTURAL PRODUCE QUALITY INTELLIGENCE
                </span>
                <span className="rounded-full bg-emerald-500/10 border border-emerald-500/30 px-3 py-1 text-[10px] font-mono font-extrabold text-emerald-400 uppercase">
                  AI-ASSISTED ESTIMATE ({product.agriData.confidenceScore || 96}% CONFIDENCE)
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 rounded-xl border border-white/15 bg-[#0A0A0F] p-5">
                <div className="space-y-1">
                  <span className="text-[10px] font-mono text-white/40 block uppercase">ORIGIN REGION</span>
                  <p className="text-sm font-extrabold text-white">{product.agriData.originRegion || 'Indian Agricultural Belt'}</p>
                </div>

                <div className="space-y-1">
                  <span className="text-[10px] font-mono text-white/40 block uppercase">ESTIMATED GRADE</span>
                  <p className="text-sm font-extrabold text-amber-300">{product.agriData.estimatedGrade}</p>
                </div>

                <div className="space-y-1">
                  <span className="text-[10px] font-mono text-white/40 block uppercase">FRESHNESS INDICATOR</span>
                  <p className="text-sm font-extrabold text-emerald-400">{product.agriData.freshnessIndicator}</p>
                </div>

                <div className="space-y-1">
                  <span className="text-[10px] font-mono text-white/40 block uppercase">VISIBLE DEFECTS</span>
                  <p className="text-sm font-extrabold text-white/80">{product.agriData.visibleDefects}</p>
                </div>

                <div className="sm:col-span-2 space-y-1 pt-2 border-t border-white/10">
                  <span className="text-[10px] font-mono text-white/40 block uppercase">PROCESSING SUITABILITY</span>
                  <p className="text-xs font-bold text-white/90 leading-relaxed">{product.agriData.processingSuitability}</p>
                </div>
              </div>

              <p className="text-[11px] font-mono text-white/40 italic">
                * Note: Quality metrics are AI-assisted estimates based on visible surface features. Certified lab testing is recommended for exact chemical or internal composition.
              </p>
            </div>
          )}
        </div>

        {/* Why Flagged Diagram */}
        <WhyFlaggedDiagram analysis={analysis} />

        {/* Clean Vertical Numbered Ingredient List */}
        <div className="space-y-6">
          <div className="flex items-center justify-between border-b border-white/10 pb-3">
            <h3 className="font-mono text-xs font-bold tracking-widest text-white/50 uppercase">
              INGREDIENT BREAKDOWN ({product.ingredients.length})
            </h3>
            <span className="text-xs text-white/30">CLICK ANY INGREDIENT FOR DETAILS</span>
          </div>

          <div className="divide-y divide-white/5">
            {analysis.ingredientAnalysis.map((item, index) => {
              const numStr = (index + 1).toString().padStart(2, '0');
              return (
                <div
                  key={item.ingredient.id}
                  onClick={() => setSelectedIngredient(item)}
                  className="group flex items-center justify-between py-4 px-3 -mx-3 rounded-lg hover:bg-white/[0.03] transition-all cursor-pointer"
                >
                  <div className="flex items-center space-x-4">
                    <span className="font-mono text-xs text-white/30">{numStr}</span>
                    <span className="text-sm font-semibold text-white group-hover:text-white/90">
                      {item.ingredient.name}
                    </span>
                  </div>

                  <div className="flex items-center space-x-3">
                    <span
                      className={`font-mono text-xs font-bold tracking-wider ${
                        item.status === 'RED'
                          ? 'text-red-400'
                          : item.status === 'AMBER'
                          ? 'text-amber-400'
                          : item.status === 'GREEN'
                          ? 'text-emerald-400'
                          : 'text-white/40'
                      }`}
                    >
                      {item.status === 'RED'
                        ? 'CONFLICT'
                        : item.status === 'AMBER'
                        ? 'CONCERN'
                        : item.status === 'GREEN'
                        ? 'COMPATIBLE'
                        : 'NEUTRAL'}
                    </span>
                    <ArrowUpRight className="h-4 w-4 text-white/20 group-hover:text-white transition-colors" />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Nutrition Analysis */}
        <NutritionAnalysis nutrition={product.nutrition} />
      </div>

      {/* Ingredient Detail Slide Panel */}
      <AnimatePresence>
        {selectedIngredient && (
          <div className="fixed inset-0 z-50 flex justify-end bg-black/80 backdrop-blur-sm">
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ duration: 0.3, ease: 'easeOut' }}
              className="h-full w-full max-w-lg border-l border-white/10 bg-[#0B0B0F] p-8 text-white overflow-y-auto space-y-6 shadow-2xl"
            >
              <div className="flex items-center justify-between border-b border-white/10 pb-4">
                <div>
                  <span className="text-xs font-mono text-white/40 block">INGREDIENT DETAIL</span>
                  <h3 className="font-display text-xl font-extrabold uppercase mt-1">
                    {selectedIngredient.ingredient.name}
                  </h3>
                </div>

                <button
                  onClick={() => setSelectedIngredient(null)}
                  className="rounded-lg border border-white/10 bg-white/5 p-2 text-white/60 hover:text-white transition-colors"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              <div className="space-y-4 divide-y divide-white/10">
                <div className="pt-2 space-y-1">
                  <span className="text-[11px] font-mono text-white/40 uppercase block">WHAT IS IT?</span>
                  <p className="text-sm text-white/80 leading-relaxed">
                    {selectedIngredient.ingredient.description}
                  </p>
                </div>

                <div className="pt-4 space-y-1">
                  <span className="text-[11px] font-mono text-white/40 uppercase block">WHY IS IT USED IN FOOD?</span>
                  <p className="text-sm text-white/80 leading-relaxed">
                    {selectedIngredient.ingredient.purpose}
                  </p>
                </div>

                <div className="pt-4 space-y-1">
                  <span className="text-[11px] font-mono text-white/40 uppercase block">WHY WAS IT FLAGGED?</span>
                  <p className="text-sm text-white/90 leading-relaxed">
                    {selectedIngredient.reason || 'This ingredient passed basic profile safety checks.'}
                  </p>
                </div>

                <div className="pt-4 space-y-1">
                  <span className="text-[11px] font-mono text-white/40 uppercase block">RELATION TO YOUR PROFILE</span>
                  <p className="text-xs text-white/70 leading-relaxed">
                    Evaluated against your active profile ({userProfile.allergies.join(', ') || 'None'}).
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};
