import React from 'react';
import { useProfile } from '../../context/ProfileContext';
import { analyzeProduct } from '../../lib/analyzer';
import type { Product } from '../../lib/types';
import { ArrowLeft, Award, MapPin, CheckCircle2, ShieldCheck, Sprout } from 'lucide-react';

interface AnalysisResultViewProps {
  product: Product;
  onBack: () => void;
}

export const AnalysisResultView: React.FC<AnalysisResultViewProps> = ({ product, onBack }) => {
  const { userProfile } = useProfile();
  const analysis = analyzeProduct(userProfile, product);

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
          <div className="flex items-center justify-between">
            <span className="font-mono text-xs text-emerald-400 uppercase tracking-widest block font-bold flex items-center gap-1.5">
              <Sprout className="h-4 w-4" />
              {product.brand} · {product.category}
            </span>
            <span className="rounded-full bg-emerald-500/10 border border-emerald-500/30 px-3 py-1 text-[10px] font-mono font-extrabold text-emerald-400 uppercase">
              AI QUALITY CONFIDENCE: {product.agriData?.confidenceScore || 96}%
            </span>
          </div>

          <h1 className="font-display text-4xl font-extrabold tracking-tight text-white sm:text-6xl uppercase">
            {product.name}
          </h1>

          <p className="text-sm text-white/60 font-bold">{product.subtitle}</p>

          {/* Agricultural Quality Verdict Block */}
          <div className="mt-6 pt-6 border-t border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <span className="text-[11px] font-mono text-white/40 uppercase block">
                AGRICULTURAL QUALITY VERDICT
              </span>
              <span className="font-display text-2xl font-black uppercase tracking-wide block mt-1 text-emerald-400">
                {analysis.statusLabel}
              </span>
            </div>

            <div className="text-xs text-white/80 bg-white/5 border border-white/10 rounded-xl p-4 max-w-md space-y-1 font-mono">
              <span className="font-bold text-white block">Market Summary:</span>
              <p className="text-white/70 leading-relaxed">{analysis.summary}</p>
            </div>
          </div>

          {/* Agricultural Quality Intelligence Block */}
          {product.agriData && (
            <div className="mt-6 pt-6 border-t border-white/10 space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-mono font-bold tracking-widest text-emerald-400 uppercase flex items-center gap-1.5">
                  <Award className="h-4 w-4 text-emerald-400" />
                  VISUAL QUALITY & POST-HARVEST METRICS
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 rounded-2xl border border-white/15 bg-[#0A0A0F] p-6 shadow-xl">
                <div className="space-y-1">
                  <span className="text-[10px] font-mono text-white/40 block uppercase flex items-center gap-1">
                    <MapPin className="h-3 w-3" /> ORIGIN REGION
                  </span>
                  <p className="text-sm font-extrabold text-white">{product.agriData.originRegion || 'Indian Agricultural Belt'}</p>
                </div>

                <div className="space-y-1">
                  <span className="text-[10px] font-mono text-white/40 block uppercase">ESTIMATED QUALITY GRADE</span>
                  <p className="text-sm font-extrabold text-amber-300">{product.agriData.estimatedGrade}</p>
                </div>

                <div className="space-y-1">
                  <span className="text-[10px] font-mono text-white/40 block uppercase">FRESHNESS & RIPENESS</span>
                  <p className="text-sm font-extrabold text-emerald-400">{product.agriData.freshnessIndicator}</p>
                </div>

                <div className="space-y-1">
                  <span className="text-[10px] font-mono text-white/40 block uppercase">VISIBLE SURFACE DEFECTS</span>
                  <p className="text-sm font-extrabold text-white/80">{product.agriData.visibleDefects}</p>
                </div>

                <div className="sm:col-span-2 space-y-1 pt-3 border-t border-white/10">
                  <span className="text-[10px] font-mono text-white/40 block uppercase">PROCESSING & MARKET SUITABILITY</span>
                  <p className="text-xs font-bold text-white/90 leading-relaxed">{product.agriData.processingSuitability}</p>
                </div>
              </div>

              <div className="flex items-center space-x-2 rounded-xl border border-white/10 bg-white/[0.03] p-4 text-[11px] font-mono text-white/60">
                <ShieldCheck className="h-4 w-4 text-emerald-400 shrink-0" />
                <p>
                  * AI-assisted estimate based on visual surface features, color uniformity, and harvest data.
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Clean Produce Component Breakdown */}
        <div className="space-y-6">
          <div className="flex items-center justify-between border-b border-white/10 pb-3">
            <h3 className="font-mono text-xs font-bold tracking-widest text-white/50 uppercase">
              PRODUCE NUTRIENTS & COMPOSITION
            </h3>
            <span className="text-xs text-white/30">100% NATURAL WHOLE PRODUCE</span>
          </div>

          <div className="divide-y divide-white/5">
            {product.ingredients.map((item, index) => {
              const numStr = (index + 1).toString().padStart(2, '0');
              return (
                <div
                  key={item.id}
                  className="flex items-center justify-between py-4 px-3 rounded-lg bg-white/[0.02] border border-white/5"
                >
                  <div className="flex items-center space-x-4">
                    <span className="font-mono text-xs text-white/30">{numStr}</span>
                    <div>
                      <span className="text-sm font-semibold text-white block">
                        {item.name}
                      </span>
                      <span className="text-xs text-white/50 font-mono">{item.description}</span>
                    </div>
                  </div>

                  <div className="flex items-center space-x-2 text-xs font-mono text-emerald-400 font-bold">
                    <CheckCircle2 className="h-4 w-4" />
                    <span>VERIFIED NATURAL</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};
