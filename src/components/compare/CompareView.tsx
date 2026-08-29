import React, { useState } from 'react';
import { MOCK_PRODUCTS } from '../../lib/mock-data';
import type { Product } from '../../lib/types';
import { Award, Sprout, Sparkles, Scale } from 'lucide-react';

interface CompareViewProps {
  onSelectProduct?: (product: Product) => void;
}

export const CompareView: React.FC<CompareViewProps> = () => {
  // Produce Batch Form State for Farmer Inspection Input
  const [produceName, setProduceName] = useState('Ratnagiri Alphonso Mango');
  const [approxSize, setApproxSize] = useState('Approx size of human hand / palm (8-10 cm diameter)');
  const [mangoColor, setMangoColor] = useState('Golden yellow with subtle green blush');
  const [harvestTiming, setHarvestTiming] = useState('Harvested 2 days ago (Morning pick)');
  const [fertilizersUsed, setFertilizersUsed] = useState('Organic Vermicompost, Neem Cake, Bio-pesticides');
  const [batchWeightKg, setBatchWeightKg] = useState('500');
  const [orchardLocation, setOrchardLocation] = useState('Ratnagiri, Maharashtra');

  // Assessment Result State
  const [assessmentResult, setAssessmentResult] = useState<{
    grade: string;
    freshnessScore: number;
    pathway: string;
    estimatedPriceINR: number;
    confidence: number;
  } | null>(null);

  // Produce Batch Comparison Selection
  const [selectedProductIds, setSelectedProductIds] = useState<string[]>([
    MOCK_PRODUCTS[0]?.id || '',
    MOCK_PRODUCTS[1]?.id || '',
  ]);

  const handleGenerateAssessment = () => {
    // Generate AI Produce Quality Grade based on input parameters
    const isOrganic = fertilizersUsed.toLowerCase().includes('organic') || fertilizersUsed.toLowerCase().includes('neem');
    const isFresh = harvestTiming.toLowerCase().includes('1') || harvestTiming.toLowerCase().includes('2') || harvestTiming.toLowerCase().includes('today');

    const grade = isOrganic && isFresh ? 'GRADE A (EXPORT QUALITY)' : 'GRADE A (COMMERCIAL RETAIL)';
    const freshnessScore = isFresh ? 97 : 91;
    const pathway = isOrganic ? 'Export Buyers & High-End Retail' : 'Regional Wholesalers & Processing';
    const price = produceName.toLowerCase().includes('mango') ? (isOrganic ? 90 : 75) : 30;

    setAssessmentResult({
      grade,
      freshnessScore,
      pathway,
      estimatedPriceINR: price,
      confidence: 96,
    });
  };

  const handleToggleProduct = (productId: string, slotIndex: number) => {
    const updated = [...selectedProductIds];
    updated[slotIndex] = productId;
    setSelectedProductIds(updated);
  };

  const analyzedProducts = selectedProductIds
    .map((id) => MOCK_PRODUCTS.find((p) => p.id === id))
    .filter(Boolean) as Product[];

  return (
    <div className="min-h-screen bg-[#030303] py-16 px-6 md:px-16 text-[#F5F5F7]">
      <div className="mx-auto max-w-6xl space-y-12">
        {/* Header */}
        <div className="space-y-3 border-b border-white/10 pb-6">
          <span className="text-xs font-mono font-bold tracking-widest text-emerald-400 uppercase flex items-center gap-2">
            <Sprout className="h-4 w-4" />
            PRODUCE BATCH INSPECTION & QUALITY COMPARISON
          </span>
          <h1 className="font-display text-4xl sm:text-5xl font-black tracking-tight uppercase text-white">
            PRODUCE QUALITY ASSESSMENT
          </h1>
          <p className="text-base font-bold text-white/70">
            Type in your crop harvest parameters (size, color, harvest date, fertilizers) to evaluate quality grade and compare produce batches.
          </p>
        </div>

        {/* SECTION 1: FARMER PRODUCE INSPECTION FORM */}
        <div className="rounded-3xl border border-white/15 bg-[#0A0A0F] p-8 space-y-6 shadow-2xl">
          <div className="flex items-center justify-between border-b border-white/10 pb-4">
            <div>
              <span className="text-[10px] font-mono text-emerald-400 font-bold uppercase block">
                FARMER BATCH DATA INPUT
              </span>
              <h2 className="font-display text-2xl font-black text-white uppercase mt-0.5">
                INSPECT & GRADE CROP HARVEST
              </h2>
            </div>
            <Sparkles className="h-6 w-6 text-emerald-400" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 font-mono text-xs">
            <div className="space-y-1.5">
              <label className="text-white/60 block">CROP / PRODUCE NAME & VARIETY</label>
              <input
                type="text"
                value={produceName}
                onChange={(e) => setProduceName(e.target.value)}
                placeholder="e.g. Ratnagiri Alphonso Mango"
                className="w-full rounded-xl border border-white/20 bg-black/60 px-4 py-3 text-sm font-bold text-white focus:outline-none"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-white/60 block">APPROX SIZE OF PRODUCE</label>
              <input
                type="text"
                value={approxSize}
                onChange={(e) => setApproxSize(e.target.value)}
                placeholder="e.g. Approx size of human hand / palm (8-10 cm)"
                className="w-full rounded-xl border border-white/20 bg-black/60 px-4 py-3 text-sm font-bold text-white focus:outline-none"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-white/60 block">COLOR OF MANGO / PRODUCE</label>
              <input
                type="text"
                value={mangoColor}
                onChange={(e) => setMangoColor(e.target.value)}
                placeholder="e.g. Golden yellow with subtle green blush"
                className="w-full rounded-xl border border-white/20 bg-black/60 px-4 py-3 text-sm font-bold text-white focus:outline-none"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-white/60 block">WHEN WAS IT HARVESTED?</label>
              <input
                type="text"
                value={harvestTiming}
                onChange={(e) => setHarvestTiming(e.target.value)}
                placeholder="e.g. Harvested 2 days ago (Morning pick)"
                className="w-full rounded-xl border border-white/20 bg-black/60 px-4 py-3 text-sm font-bold text-white focus:outline-none"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-white/60 block">FERTILIZERS & CROP INPUTS USED</label>
              <input
                type="text"
                value={fertilizersUsed}
                onChange={(e) => setFertilizersUsed(e.target.value)}
                placeholder="e.g. Organic Vermicompost, Neem Cake, Bio-pesticides"
                className="w-full rounded-xl border border-white/20 bg-black/60 px-4 py-3 text-sm font-bold text-white focus:outline-none"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-white/60 block">BATCH WEIGHT / QUANTITY (KG)</label>
              <input
                type="number"
                value={batchWeightKg}
                onChange={(e) => setBatchWeightKg(e.target.value)}
                placeholder="e.g. 500"
                className="w-full rounded-xl border border-white/20 bg-black/60 px-4 py-3 text-sm font-bold text-white focus:outline-none"
              />
            </div>

            <div className="space-y-1.5 md:col-span-2">
              <label className="text-white/60 block">ORCHARD / LOCATION</label>
              <input
                type="text"
                value={orchardLocation}
                onChange={(e) => setOrchardLocation(e.target.value)}
                placeholder="e.g. Ratnagiri, Maharashtra"
                className="w-full rounded-xl border border-white/20 bg-black/60 px-4 py-3 text-sm font-bold text-white focus:outline-none"
              />
            </div>
          </div>

          <div className="flex items-center justify-between border-t border-white/10 pt-4">
            <div className="flex items-center space-x-2 text-xs font-mono text-white/50">
              <Scale className="h-4 w-4 text-emerald-400" />
              <span>Evaluates visual size, color, harvest freshness, & inputs.</span>
            </div>

            <button
              onClick={handleGenerateAssessment}
              className="inline-flex items-center space-x-2 rounded-2xl bg-white px-8 py-3.5 text-xs font-extrabold text-black shadow-lg hover:bg-white/90 transition-all uppercase active:scale-95"
            >
              <Sparkles className="h-4 w-4" />
              <span>GENERATE QUALITY GRADE & MARKET MATCH</span>
            </button>
          </div>

          {/* Generated Result Display */}
          {assessmentResult && (
            <div className="mt-6 pt-6 border-t border-white/10 rounded-2xl border border-emerald-500/40 bg-emerald-500/10 p-6 space-y-4 font-mono animate-fade-in">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-emerald-400 uppercase flex items-center gap-1.5">
                  <Award className="h-4 w-4" />
                  EVALUATED QUALITY GRADE & PRICE ESTIMATE
                </span>
                <span className="rounded-full bg-emerald-500/20 px-3 py-1 text-[10px] font-extrabold text-emerald-300">
                  {assessmentResult.confidence}% AI CONFIDENCE
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 text-xs">
                <div className="space-y-1">
                  <span className="text-white/50 text-[10px] block">GRADE VERDICT</span>
                  <span className="font-bold text-lg text-emerald-300 font-display">{assessmentResult.grade}</span>
                </div>
                <div className="space-y-1">
                  <span className="text-white/50 text-[10px] block">FRESHNESS RATING</span>
                  <span className="font-bold text-lg text-white font-display">{assessmentResult.freshnessScore}% Peak Ripeness</span>
                </div>
                <div className="space-y-1">
                  <span className="text-white/50 text-[10px] block">ESTIMATED MARKET PRICE</span>
                  <span className="font-bold text-lg text-emerald-400 font-display">₹{assessmentResult.estimatedPriceINR} / kg</span>
                </div>
                <div className="space-y-1">
                  <span className="text-white/50 text-[10px] block">RECOMMENDED BUYERS</span>
                  <span className="font-bold text-xs text-white leading-tight block">{assessmentResult.pathway}</span>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* SECTION 2: PRODUCE BATCH COMPARISON TABLE */}
        <div className="space-y-6">
          <div className="flex items-center justify-between border-b border-white/10 pb-3">
            <h3 className="font-display text-2xl font-black text-white uppercase">
              COMPARE PRODUCE CROPS SIDE-BY-SIDE
            </h3>
            <span className="text-xs font-mono text-white/40">SELECT UP TO 3 PRODUCE BATCHES</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {[0, 1].map((slotIdx) => (
              <div key={slotIdx} className="space-y-2">
                <span className="text-xs font-mono font-extrabold text-white/60 block tracking-widest uppercase">
                  PRODUCE CROP 0{slotIdx + 1}
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

          <div className="overflow-x-auto border-t-2 border-white/20 pt-6">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b-2 border-white/20">
                  <th className="py-5 pr-6 text-sm font-mono font-black text-white uppercase tracking-widest">
                    PRODUCE PARAMETER
                  </th>
                  {analyzedProducts.map((p) => (
                    <th key={p.id} className="py-5 px-6 min-w-[220px] align-top">
                      <div className="space-y-1">
                        <span className="text-xs font-mono text-white/50 block">{p.brand}</span>
                        <h4 className="font-display text-xl font-black uppercase text-white">{p.name}</h4>
                      </div>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-white/10 font-mono">
                <tr>
                  <td className="py-5 pr-6 text-sm font-black text-white/80 uppercase">ORIGIN REGION</td>
                  {analyzedProducts.map((p) => (
                    <td key={p.id} className="py-5 px-6 text-sm font-bold text-white">
                      {p.agriData?.originRegion || 'Indian Ag Belt'}
                    </td>
                  ))}
                </tr>
                <tr>
                  <td className="py-5 pr-6 text-sm font-black text-white/80 uppercase">QUALITY GRADE</td>
                  {analyzedProducts.map((p) => (
                    <td key={p.id} className="py-5 px-6 text-sm font-bold text-amber-300">
                      {p.agriData?.estimatedGrade || 'Grade A'}
                    </td>
                  ))}
                </tr>
                <tr>
                  <td className="py-5 pr-6 text-sm font-black text-white/80 uppercase">FRESHNESS INDICATOR</td>
                  {analyzedProducts.map((p) => (
                    <td key={p.id} className="py-5 px-6 text-sm font-bold text-emerald-400">
                      {p.agriData?.freshnessIndicator || 'Fresh Harvest'}
                    </td>
                  ))}
                </tr>
                <tr>
                  <td className="py-5 pr-6 text-sm font-black text-white/80 uppercase">PROCESSING SUITABILITY</td>
                  {analyzedProducts.map((p) => (
                    <td key={p.id} className="py-5 px-6 text-xs font-bold text-white/90 leading-relaxed">
                      {p.agriData?.processingSuitability}
                    </td>
                  ))}
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};
