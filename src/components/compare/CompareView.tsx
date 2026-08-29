import React, { useState } from 'react';
import { useProfile } from '../../context/ProfileContext';
import { MOCK_PRODUCTS } from '../../lib/mock-data';
import type { Product } from '../../lib/types';
import { analyzeProduct } from '../../lib/analyzer';
import { ArrowUpRight } from 'lucide-react';

interface CompareViewProps {
  onSelectProduct: (product: Product) => void;
}

export const CompareView: React.FC<CompareViewProps> = ({ onSelectProduct }) => {
  const { userProfile } = useProfile();
  const [selectedProductIds, setSelectedProductIds] = useState<string[]>([
    MOCK_PRODUCTS[0].id,
    MOCK_PRODUCTS[1].id,
    MOCK_PRODUCTS[2].id,
  ]);

  const selectedProducts = selectedProductIds
    .map((id) => MOCK_PRODUCTS.find((p) => p.id === id))
    .filter(Boolean) as Product[];

  const analyzedProducts = selectedProducts.map((p) => ({
    product: p,
    analysis: analyzeProduct(userProfile, p),
  }));

  // Identify Best Match
  let bestMatchIndex = 0;
  let bestScore = -999;

  analyzedProducts.forEach((item, idx) => {
    let score = 100;
    score -= item.analysis.conflictsCount * 50;
    score -= item.analysis.concernsCount * 15;
    score += item.product.nutrition.protein * 2;
    score -= item.product.nutrition.sugar * 1;
    if (score > bestScore) {
      bestScore = score;
      bestMatchIndex = idx;
    }
  });

  const handleToggleProduct = (id: string, slotIndex: number) => {
    setSelectedProductIds((prev) => {
      const copy = [...prev];
      copy[slotIndex] = id;
      return copy;
    });
  };

  return (
    <div className="min-h-screen bg-[#030303] py-16 px-6 md:px-16 text-[#F5F5F7]">
      <div className="mx-auto max-w-6xl space-y-12">
        {/* Header */}
        <div className="space-y-3 border-b border-white/10 pb-6">
          <h1 className="font-display text-5xl font-black tracking-tight sm:text-6xl uppercase text-white">
            COMPARE
          </h1>
          <p className="text-base font-bold text-white/70">
            Choose up to three agricultural produce items or food products to compare quality grade, processing suitability, and profile fit.
          </p>
        </div>

        {/* Tactile Dropdown Selectors with Large Bold Labels */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          {[0, 1, 2].map((slotIdx) => (
            <div key={slotIdx} className="space-y-2">
              <span className="text-xs font-mono font-extrabold text-white/60 block tracking-widest uppercase">
                PRODUCT 0{slotIdx + 1}
              </span>
              <select
                value={selectedProductIds[slotIdx] || ''}
                onChange={(e) => handleToggleProduct(e.target.value, slotIdx)}
                className="w-full rounded-xl border-2 border-white/20 bg-[#0B0B0F] px-4 py-3.5 text-sm font-extrabold text-white focus:border-white focus:outline-none transition-colors shadow-lg"
              >
                {MOCK_PRODUCTS.map((p) => (
                  <option key={p.id} value={p.id} className="bg-[#0B0B0F] font-bold">
                    {p.brand} — {p.name}
                  </option>
                ))}
              </select>
            </div>
          ))}
        </div>

        {/* Refined Editorial Comparison Table with Large & Bold Text */}
        <div className="overflow-x-auto border-t-2 border-white/20 pt-6">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b-2 border-white/20">
                <th className="py-5 pr-6 text-sm font-mono font-black text-white uppercase tracking-widest">
                  FEATURE
                </th>
                {analyzedProducts.map((item, idx) => {
                  const isBest = idx === bestMatchIndex;
                  return (
                    <th key={item.product.id} className="py-5 px-6 min-w-[220px] align-top">
                      <div className="space-y-1.5">
                        {isBest ? (
                          <span className="text-xs font-mono font-black tracking-widest text-emerald-400 uppercase block">
                            ★ BEST MATCH
                          </span>
                        ) : (
                          <span className="text-xs font-mono text-transparent block">.</span>
                        )}
                        <span className="text-xs font-mono font-extrabold text-white/50 uppercase block tracking-wider">
                          {item.product.brand}
                        </span>
                        <h4 className={`font-display text-xl font-black ${isBest ? 'text-white scale-105 origin-left' : 'text-white/90'}`}>
                          {item.product.name}
                        </h4>
                        <button
                          onClick={() => onSelectProduct(item.product)}
                          className="inline-flex items-center space-x-1.5 text-xs font-mono font-black text-white/60 hover:text-white transition-colors pt-2 uppercase tracking-wider"
                        >
                          <span>VIEW DETAILS</span>
                          <ArrowUpRight className="h-4 w-4" />
                        </button>
                      </div>
                    </th>
                  );
                })}
              </tr>
            </thead>
            <tbody className="divide-y divide-white/10 text-sm font-sans">
              {/* Row 1: Personal Compatibility */}
              <tr>
                <td className="py-5 pr-6 text-sm font-mono font-black text-white/80 uppercase tracking-wider">
                  PERSONAL COMPATIBILITY
                </td>
                {analyzedProducts.map((item, idx) => {
                  const isBest = idx === bestMatchIndex;
                  return (
                    <td key={item.product.id} className="py-5 px-6">
                      <span
                        className={`font-black tracking-wider uppercase ${
                          item.analysis.overallStatus === 'NOT_RECOMMENDED'
                            ? 'text-red-400 text-base md:text-lg'
                            : item.analysis.overallStatus === 'CAUTION'
                            ? 'text-amber-400 text-base md:text-lg'
                            : 'text-emerald-400 text-base md:text-lg'
                        } ${isBest ? 'font-black scale-105 origin-left block' : ''}`}
                      >
                        {item.analysis.overallStatus === 'NOT_RECOMMENDED'
                          ? '🔴 CONFLICT'
                          : item.analysis.overallStatus === 'CAUTION'
                          ? '🟡 CAUTION'
                          : '🟢 GOOD MATCH'}
                      </span>
                    </td>
                  );
                })}
              </tr>

              {/* Row 1b: Quality Grade */}
              <tr>
                <td className="py-5 pr-6 text-sm font-mono font-black text-white/80 uppercase tracking-wider">
                  QUALITY GRADE
                </td>
                {analyzedProducts.map((item) => (
                  <td key={item.product.id} className="py-5 px-6 font-mono text-sm font-extrabold text-amber-300">
                    {item.product.agriData?.estimatedGrade || 'Commercial Standard'}
                  </td>
                ))}
              </tr>

              {/* Row 1c: Processing Suitability */}
              <tr>
                <td className="py-5 pr-6 text-sm font-mono font-black text-white/80 uppercase tracking-wider">
                  PROCESSING SUITABILITY
                </td>
                {analyzedProducts.map((item) => (
                  <td key={item.product.id} className="py-5 px-6 text-xs font-bold text-white/90 leading-relaxed">
                    {item.product.agriData?.processingSuitability || 'Ready to Consume / Direct Retail'}
                  </td>
                ))}
              </tr>

              {/* Row 2: Allergens */}
              <tr>
                <td className="py-5 pr-6 text-sm font-mono font-black text-white/80 uppercase tracking-wider">
                  ALLERGENS
                </td>
                {analyzedProducts.map((item) => (
                  <td key={item.product.id} className="py-5 px-6 text-base font-extrabold text-white">
                    {item.product.ingredients
                      .filter((i) => i.category === 'Allergen')
                      .map((i) => i.name)
                      .join(', ') || 'None'}
                  </td>
                ))}
              </tr>

              {/* Row 3: Conflicts */}
              <tr>
                <td className="py-5 pr-6 text-sm font-mono font-black text-white/80 uppercase tracking-wider">
                  CONFLICTS
                </td>
                {analyzedProducts.map((item) => (
                  <td key={item.product.id} className="py-5 px-6">
                    {item.analysis.conflictsCount > 0 ? (
                      <span className="text-red-400 text-base font-black tracking-wider">
                        {item.analysis.conflictsCount} Flagged
                      </span>
                    ) : (
                      <span className="text-white/50 text-base font-extrabold">0</span>
                    )}
                  </td>
                ))}
              </tr>

              {/* Row 4: Sugar */}
              <tr>
                <td className="py-5 pr-6 text-sm font-mono font-black text-white/80 uppercase tracking-wider">
                  SUGAR
                </td>
                {analyzedProducts.map((item) => (
                  <td key={item.product.id} className="py-5 px-6 text-lg font-black text-white">
                    {item.product.nutrition.sugar} g
                  </td>
                ))}
              </tr>

              {/* Row 5: Calories */}
              <tr>
                <td className="py-5 pr-6 text-sm font-mono font-black text-white/80 uppercase tracking-wider">
                  CALORIES
                </td>
                {analyzedProducts.map((item) => (
                  <td key={item.product.id} className="py-5 px-6 text-lg font-black text-white">
                    {item.product.nutrition.calories} kcal
                  </td>
                ))}
              </tr>

              {/* Row 6: Protein */}
              <tr>
                <td className="py-5 pr-6 text-sm font-mono font-black text-white/80 uppercase tracking-wider">
                  PROTEIN
                </td>
                {analyzedProducts.map((item) => (
                  <td key={item.product.id} className="py-5 px-6 text-lg font-black text-emerald-400">
                    {item.product.nutrition.protein} g
                  </td>
                ))}
              </tr>

              {/* Row 7: Sodium */}
              <tr>
                <td className="py-5 pr-6 text-sm font-mono font-black text-white/80 uppercase tracking-wider">
                  SODIUM
                </td>
                {analyzedProducts.map((item) => (
                  <td key={item.product.id} className="py-5 px-6 text-lg font-black text-white">
                    {item.product.nutrition.sodium} mg
                  </td>
                ))}
              </tr>

              {/* Row 8: Key Ingredients */}
              <tr>
                <td className="py-5 pr-6 text-sm font-mono font-black text-white/80 uppercase tracking-wider">
                  KEY INGREDIENTS
                </td>
                {analyzedProducts.map((item) => (
                  <td key={item.product.id} className="py-5 px-6 text-sm font-extrabold text-white/90 leading-relaxed">
                    {item.product.ingredients.slice(0, 4).map((i) => i.name).join(' · ')}
                  </td>
                ))}
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
