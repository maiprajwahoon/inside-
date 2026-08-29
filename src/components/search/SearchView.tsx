import React, { useMemo, useState } from 'react';
import { useProfile } from '../../context/ProfileContext';
import { MOCK_PRODUCTS } from '../../lib/mock-data';
import type { Product } from '../../lib/types';
import { analyzeProduct } from '../../lib/analyzer';
import { Search, X, ArrowUpRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface SearchViewProps {
  onSelectProduct: (product: Product) => void;
}

export const SearchView: React.FC<SearchViewProps> = ({ onSelectProduct }) => {
  const { userProfile } = useProfile();
  const [query, setQuery] = useState('');
  const [isFocused, setIsFocused] = useState(false);

  const popularSuggestions = [
    'Alphonso Mango',
    'Desi Tomato',
    'Sona Masoori Rice',
    'Sharbati Wheat',
    'Nashik Red Onion',
    "Haldiram's Aloo Bhujia",
    'Amul Taaza Milk',
    'Paper Boat Raw Mango',
  ];

  const filteredProducts = useMemo(() => {
    const q = query.toLowerCase().trim();
    if (!q) return [];

    const tokens = q.split(/\s+/).filter(Boolean);

    return MOCK_PRODUCTS.filter((product) => {
      const fullProductText = `${product.brand} ${product.name} ${product.category} ${product.subtitle} ${product.agriData?.originRegion || ''} ${product.agriData?.estimatedGrade || ''} ${product.agriData?.processingSuitability || ''} ${product.ingredients
        .map((i) => `${i.name} ${i.description} ${i.purpose}`)
        .join(' ')}`.toLowerCase();

      return tokens.every((token) => fullProductText.includes(token));
    });
  }, [query]);

  return (
    <div className="min-h-screen bg-[#030303] py-20 px-6 md:px-16 text-[#F5F5F7]">
      <div className="mx-auto max-w-4xl space-y-12">
        {/* Header */}
        <div className="text-center space-y-3">
          <h1 className="font-display text-4xl font-black tracking-tight sm:text-6xl uppercase text-white">
            WHAT ARE YOU ANALYZING?
          </h1>
          <p className="text-sm font-bold text-white/60 max-w-md mx-auto">
            Search any agricultural produce, crop sample, ingredient or food product to evaluate quality grade, processing suitability, and profile compatibility.
          </p>
        </div>

        {/* Tactile & Premium Search Input */}
        <div className="relative mx-auto max-w-2xl space-y-6">
          <motion.div
            animate={{
              borderColor: isFocused ? 'rgba(255, 255, 255, 0.4)' : 'rgba(255, 255, 255, 0.15)',
            }}
            transition={{ duration: 0.2 }}
            className="flex items-center rounded-xl border-2 bg-[#0B0B0F] px-6 py-4 transition-all shadow-xl"
          >
            <Search className="h-5 w-5 text-white/50 mr-4 shrink-0" />
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onFocus={() => setIsFocused(true)}
              onBlur={() => setTimeout(() => setIsFocused(false), 200)}
              placeholder="Analyze a mango, check tomato quality, search rice..."
              className="w-full bg-transparent font-sans text-base font-bold text-white placeholder-white/40 focus:outline-none"
            />
            {query && (
              <button onClick={() => setQuery('')} className="text-white/50 hover:text-white transition-colors shrink-0">
                <X className="h-5 w-5" />
              </button>
            )}
          </motion.div>

          {/* Suggestions Dropdown (POPULAR / RECENT / TRENDING text list) */}
          <AnimatePresence>
            {!query && isFocused && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
                className="rounded-xl border-2 border-white/15 bg-[#0A0A0E] p-6 space-y-4 shadow-2xl"
              >
                {/* BOLDER PRETITLE HEADER */}
                <div className="border-b border-white/15 pb-3">
                  <h3 className="font-display text-sm font-black tracking-widest text-white uppercase">
                    POPULAR & RECENT SEARCHES
                  </h3>
                </div>

                <div className="divide-y divide-white/10">
                  {popularSuggestions.map((item) => (
                    <button
                      key={item}
                      onClick={() => setQuery(item)}
                      className="flex w-full items-center justify-between py-3.5 text-left text-base font-black text-white/90 hover:text-white hover:pl-2 transition-all duration-200"
                    >
                      <span className="font-sans">{item}</span>
                      <ArrowUpRight className="h-4 w-4 text-white/50" />
                    </button>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Intelligent Vertical Results List */}
        {query && (
          <div className="space-y-4 pt-4">
            <div className="flex items-center justify-between border-b border-white/15 pb-3 text-xs font-mono font-black text-white/60 uppercase tracking-widest">
              <span>{filteredProducts.length} SEARCH RESULTS FOR "{query}"</span>
              <span>PERSONAL STATUS</span>
            </div>

            {filteredProducts.length > 0 ? (
              <div className="divide-y divide-white/10">
                {filteredProducts.map((product) => {
                  const analysis = analyzeProduct(userProfile, product);
                  return (
                    <motion.div
                      key={product.id}
                      onClick={() => onSelectProduct(product)}
                      whileHover={{ x: 6 }}
                      transition={{ duration: 0.2 }}
                      className="group flex flex-col sm:flex-row sm:items-center justify-between py-6 px-4 -mx-4 rounded-xl hover:bg-white/[0.04] transition-all cursor-pointer gap-4"
                    >
                      {/* Left Details */}
                      <div className="space-y-1">
                        <div className="flex items-center space-x-3">
                          <span className="font-mono text-xs font-black text-white/60 uppercase tracking-widest">
                            {product.brand}
                          </span>
                          <span className="text-white/30">•</span>
                          <span className="text-xs font-bold text-white/50">{product.category}</span>
                        </div>

                        <h3 className="font-display text-xl font-black text-white group-hover:text-white">
                          {product.name}
                        </h3>

                        <p className="text-xs font-bold text-white/60 font-mono">
                          {product.ingredients.map((i) => i.name).join(' · ')}
                        </p>
                      </div>

                      {/* Right Verdict Status */}
                      <div className="flex items-center space-x-4 self-start sm:self-center">
                        <span
                          className={`text-xs font-mono font-black tracking-wider uppercase ${
                            analysis.overallStatus === 'NOT_RECOMMENDED'
                              ? 'text-red-400'
                              : analysis.overallStatus === 'CAUTION'
                              ? 'text-amber-400'
                              : 'text-emerald-400'
                          }`}
                        >
                          {analysis.overallStatus === 'NOT_RECOMMENDED'
                            ? '🔴 PERSONAL CONFLICT'
                            : analysis.overallStatus === 'CAUTION'
                            ? '🟡 POTENTIAL CONCERN'
                            : '🟢 NO PERSONAL CONFLICT'}
                        </span>

                        <ArrowUpRight className="h-4 w-4 text-white/40 group-hover:text-white transition-colors" />
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            ) : (
              <div className="py-16 text-center space-y-2">
                <p className="text-base font-bold text-white/70">No food items found matching "{query}"</p>
                <p className="text-xs text-white/40 font-mono">Try searching "Haldiram", "Lay's", "Peanut", "Milk", or "Bhujia".</p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
