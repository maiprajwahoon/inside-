import React, { useState } from 'react';
import type { CropItem, FarmerProfile } from '../../lib/agri-types';
import { INITIAL_FARMER_PROFILE } from '../../lib/buyers-data';
import { runAgriDecisionEngine } from '../../lib/matching-engine';
import { Zap, ShieldCheck, MapPin, CheckCircle2, ArrowRight, AlertTriangle, Send } from 'lucide-react';

export const NetworkView: React.FC = () => {
  const [farmer] = useState<FarmerProfile>(INITIAL_FARMER_PROFILE);
  const [selectedCropIndex, setSelectedCropIndex] = useState(0);
  const [inquirySentId, setInquirySentId] = useState<string | null>(null);

  const selectedCrop: CropItem = farmer.crops[selectedCropIndex] || farmer.crops[0];
  const engineResult = runAgriDecisionEngine(farmer, selectedCrop);

  const handleSendInquiry = (buyerId: string) => {
    setInquirySentId(buyerId);
    setTimeout(() => setInquirySentId(null), 3500);
  };

  return (
    <div className="min-h-screen bg-[#030303] py-16 px-6 md:px-16 text-[#F5F5F7]">
      <div className="mx-auto max-w-6xl space-y-12">
        {/* Header */}
        <div className="border-b border-white/10 pb-6 space-y-2">
          <span className="text-xs font-mono font-bold tracking-widest text-emerald-400 uppercase flex items-center gap-2">
            <Zap className="h-4 w-4 fill-emerald-400" />
            INTELLIGENT FARMER-TO-BUYER MATCHING ENGINE
          </span>
          <h1 className="font-display text-4xl sm:text-5xl font-black tracking-tight uppercase text-white">
            PROCUREMENT NETWORK
          </h1>
          <p className="text-sm font-bold text-white/60">
            Real-time decision engine matching your harvested crops with verified nearby buyers and food processors.
          </p>
        </div>

        {/* Crop Selector Tabs */}
        <div className="space-y-3">
          <span className="text-xs font-mono font-bold text-white/50 uppercase block tracking-widest">
            SELECT CROP TO MATCH:
          </span>
          <div className="flex flex-wrap gap-3">
            {farmer.crops.map((crop, idx) => {
              const isSelected = selectedCropIndex === idx;
              return (
                <button
                  key={crop.id}
                  onClick={() => setSelectedCropIndex(idx)}
                  className={`rounded-2xl border px-5 py-3.5 text-left transition-all ${
                    isSelected
                      ? 'border-white bg-white text-black font-extrabold shadow-lg'
                      : 'border-white/15 bg-white/5 text-white/70 hover:border-white/30 hover:text-white'
                  }`}
                >
                  <div className="text-[10px] font-mono uppercase opacity-70">{crop.category}</div>
                  <div className="font-display text-sm font-black uppercase">{crop.name}</div>
                  <div className="text-[10px] font-mono mt-0.5">{crop.estimatedQtyKg} kg · {crop.expectedHarvestDate}</div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Decision Rationale Banner */}
        <div className="rounded-3xl border border-white/15 bg-[#0B0B10] p-8 shadow-2xl space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/10 pb-4">
            <div className="space-y-1">
              <span className="text-[10px] font-mono text-white/40 uppercase block">RECOMMENDED POST-HARVEST PATHWAY</span>
              <div className="flex items-center space-x-3">
                <span
                  className={`font-display text-2xl font-black uppercase tracking-wide ${
                    engineResult.recommendationBadgeColor === 'emerald'
                      ? 'text-emerald-400'
                      : engineResult.recommendationBadgeColor === 'amber'
                      ? 'text-amber-400'
                      : engineResult.recommendationBadgeColor === 'purple'
                      ? 'text-purple-400'
                      : 'text-blue-400'
                  }`}
                >
                  🟢 {engineResult.recommendation}
                </span>
                <span className="rounded-full bg-white/10 border border-white/15 px-3 py-1 text-[10px] font-mono font-bold text-white uppercase">
                  URGENCY SCORE: {engineResult.urgencyScore}/100
                </span>
              </div>
            </div>

            <div className="text-right font-mono text-xs text-white/50">
              <span>LOCATION: </span>
              <span className="font-bold text-white">{farmer.village}, {farmer.district}</span>
            </div>
          </div>

          <div className="flex items-start space-x-3 rounded-2xl border border-white/10 bg-white/[0.03] p-4 text-xs font-mono text-white/80 leading-relaxed">
            <AlertTriangle className="h-4 w-4 text-amber-400 shrink-0 mt-0.5" />
            <p>
              <strong className="text-white">Decision Engine Rationale:</strong> {engineResult.rationale}
            </p>
          </div>
        </div>

        {/* Matched Buyers List */}
        <div className="space-y-6">
          <div className="flex items-center justify-between border-b border-white/10 pb-3">
            <h3 className="font-display text-2xl font-black text-white uppercase">
              RANKED BUYER MATCHES ({engineResult.matchedBuyers.length})
            </h3>
            <span className="text-xs font-mono text-white/40">RANKED BY SUITABILITY & PROXIMITY</span>
          </div>

          <div className="space-y-4">
            {engineResult.matchedBuyers.map((match, idx) => {
              const { buyer, matchScore, distanceKm, urgencyReason } = match;
              const isInquirySent = inquirySentId === buyer.id;

              return (
                <div
                  key={buyer.id}
                  className="rounded-3xl border border-white/15 bg-[#0A0A0F] p-6 flex flex-col md:flex-row md:items-center justify-between gap-6 shadow-xl hover:border-white/30 transition-all"
                >
                  <div className="space-y-3 max-w-2xl">
                    <div className="flex flex-wrap items-center gap-3">
                      <span className="font-mono text-xs font-bold text-white/30">#0{idx + 1}</span>
                      <span className="rounded-full bg-emerald-500/10 border border-emerald-500/30 px-3 py-0.5 text-[10px] font-mono font-extrabold text-emerald-400 uppercase">
                        {matchScore}% MATCH SUITABILITY
                      </span>
                      {buyer.verified && (
                        <span className="inline-flex items-center space-x-1 text-[10px] font-mono text-white/60">
                          <ShieldCheck className="h-3.5 w-3.5 text-emerald-400" />
                          <span>VERIFIED BUYER</span>
                        </span>
                      )}
                    </div>

                    <div>
                      <h4 className="font-display text-2xl font-black text-white uppercase">{buyer.name}</h4>
                      <p className="text-xs font-mono text-white/50 flex items-center gap-1.5 mt-0.5">
                        <MapPin className="h-3.5 w-3.5 text-white/40" />
                        <span>{buyer.location} · {distanceKm} km away</span>
                      </p>
                    </div>

                    <p className="text-xs font-mono text-white/70 bg-white/5 border border-white/10 rounded-xl p-3">
                      <span className="text-white/40 block text-[10px]">WHY THIS MATCH:</span>
                      {urgencyReason}
                    </p>
                  </div>

                  <div className="flex flex-col items-start md:items-end justify-between space-y-4 shrink-0 border-t md:border-t-0 border-white/10 pt-4 md:pt-0">
                    {buyer.buyingPricePerKg && (
                      <div className="text-left md:text-right font-mono">
                        <span className="text-[10px] text-white/40 block">BUYING OFFER</span>
                        <span className="text-xl font-black text-emerald-400">₹{buyer.buyingPricePerKg} / kg</span>
                      </div>
                    )}

                    <button
                      onClick={() => handleSendInquiry(buyer.id)}
                      className={`inline-flex items-center space-x-2 rounded-2xl px-6 py-3.5 text-xs font-extrabold transition-all active:scale-95 ${
                        isInquirySent
                          ? 'bg-emerald-500 text-black'
                          : 'bg-white text-black hover:bg-white/90 shadow-lg'
                      }`}
                    >
                      {isInquirySent ? (
                        <>
                          <CheckCircle2 className="h-4 w-4 text-black" />
                          <span className="uppercase tracking-wider">INQUIRY SENT!</span>
                        </>
                      ) : (
                        <>
                          <Send className="h-3.5 w-3.5 text-black" />
                          <span className="uppercase tracking-wider">SEND INQUIRY</span>
                          <ArrowRight className="h-3.5 w-3.5 text-black" />
                        </>
                      )}
                    </button>
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
