import React, { useMemo, useState } from 'react';
import type { BuyerType } from '../../lib/agri-types';
import { MOCK_BUYERS } from '../../lib/buyers-data';
import { Search, ShieldCheck, MapPin, Store, Building2, Factory, Utensils, CheckCircle2, Send } from 'lucide-react';

export const MarketplaceView: React.FC = () => {
  const [query, setQuery] = useState('');
  const [selectedType, setSelectedType] = useState<BuyerType | 'All'>('All');
  const [inquirySentBuyerId, setInquirySentBuyerId] = useState<string | null>(null);

  const categoryTypes: (BuyerType | 'All')[] = [
    'All',
    'Food Processor',
    'Wholesaler',
    'Retailer',
    'Restaurant',
    'Aggregator',
  ];

  const filteredBuyers = useMemo(() => {
    return MOCK_BUYERS.filter((b) => {
      const matchesType = selectedType === 'All' || b.type === selectedType;
      const q = query.toLowerCase().trim();
      const matchesQuery =
        !q ||
        b.name.toLowerCase().includes(q) ||
        b.location.toLowerCase().includes(q) ||
        b.cropsAccepted.some((c) => c.toLowerCase().includes(q));
      return matchesType && matchesQuery;
    });
  }, [query, selectedType]);

  const handleSendInquiry = (buyerId: string) => {
    setInquirySentBuyerId(buyerId);
    setTimeout(() => setInquirySentBuyerId(null), 3000);
  };

  const getBuyerIcon = (type: BuyerType) => {
    switch (type) {
      case 'Food Processor':
        return <Factory className="h-4 w-4 text-purple-400" />;
      case 'Wholesaler':
        return <Building2 className="h-4 w-4 text-blue-400" />;
      case 'Restaurant':
        return <Utensils className="h-4 w-4 text-amber-400" />;
      default:
        return <Store className="h-4 w-4 text-emerald-400" />;
    }
  };

  return (
    <div className="min-h-screen bg-[#030303] py-16 px-6 md:px-16 text-[#F5F5F7]">
      <div className="mx-auto max-w-6xl space-y-10">
        {/* Header */}
        <div className="border-b border-white/10 pb-6 space-y-2">
          <span className="text-xs font-mono font-bold tracking-widest text-emerald-400 uppercase flex items-center gap-2">
            <Store className="h-4 w-4" />
            VERIFIED BUYER & PROCESSOR DIRECTORY
          </span>
          <h1 className="font-display text-4xl sm:text-5xl font-black tracking-tight uppercase text-white">
            AGRICULTURAL MARKETPLACE
          </h1>
          <p className="text-sm font-bold text-white/60">
            Connect directly with verified food processors, wholesalers, retailers, and commercial buyers.
          </p>
        </div>

        {/* Filter Bar & Search */}
        <div className="space-y-4">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center rounded-xl border border-white/15 bg-[#0B0B0F] px-4 py-3 w-full sm:w-96 shadow-lg">
              <Search className="h-4 w-4 text-white/40 mr-3 shrink-0" />
              <input
                type="text"
                placeholder="Search by crop, buyer name or city..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="w-full bg-transparent font-sans text-xs font-bold text-white placeholder-white/40 focus:outline-none"
              />
            </div>

            <div className="flex flex-wrap gap-2 w-full sm:w-auto">
              {categoryTypes.map((type) => (
                <button
                  key={type}
                  onClick={() => setSelectedType(type)}
                  className={`rounded-full px-4 py-2 text-xs font-bold transition-all uppercase ${
                    selectedType === type
                      ? 'bg-white text-black font-extrabold shadow-sm'
                      : 'border border-white/15 bg-white/5 text-white/60 hover:text-white'
                  }`}
                >
                  {type}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Buyer Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredBuyers.map((buyer) => {
            const isInquirySent = inquirySentBuyerId === buyer.id;
            return (
              <div
                key={buyer.id}
                className="rounded-3xl border border-white/15 bg-[#0A0A0F] p-6 flex flex-col justify-between space-y-6 shadow-xl hover:border-white/30 transition-all group"
              >
                <div className="space-y-4">
                  {/* Top Badge & Distance */}
                  <div className="flex items-center justify-between border-b border-white/10 pb-3">
                    <div className="flex items-center space-x-2">
                      {getBuyerIcon(buyer.type)}
                      <span className="text-xs font-mono font-extrabold text-white/80 uppercase">
                        {buyer.type}
                      </span>
                    </div>

                    <div className="flex items-center space-x-2">
                      {buyer.verified && (
                        <span className="inline-flex items-center space-x-1 text-[10px] font-mono text-emerald-400">
                          <ShieldCheck className="h-3 w-3" />
                          <span>VERIFIED</span>
                        </span>
                      )}
                      <span className="rounded-full bg-white/10 px-2 py-0.5 text-[9px] font-mono text-white/70">
                        {buyer.distanceKm} km
                      </span>
                    </div>
                  </div>

                  {/* Buyer Name & Location */}
                  <div>
                    <h3 className="font-display text-xl font-black text-white group-hover:text-emerald-300 transition-colors uppercase leading-snug">
                      {buyer.name}
                    </h3>
                    <p className="text-xs font-mono text-white/50 flex items-center gap-1 mt-1">
                      <MapPin className="h-3 w-3 text-white/40" />
                      {buyer.location}
                    </p>
                  </div>

                  {/* Crops Accepted */}
                  <div className="space-y-1.5 pt-2">
                    <span className="text-[10px] font-mono text-white/40 uppercase block">ACCEPTED CROPS</span>
                    <div className="flex flex-wrap gap-1">
                      {buyer.cropsAccepted.map((c) => (
                        <span
                          key={c}
                          className="rounded-md bg-white/10 border border-white/10 px-2 py-0.5 text-[10px] font-bold text-white/90"
                        >
                          {c}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Requirements & Quantity */}
                  <div className="rounded-xl border border-white/10 bg-black/60 p-3 space-y-2 text-xs font-mono">
                    <div className="flex justify-between text-[10px]">
                      <span className="text-white/40">PROCUREMENT QTY:</span>
                      <span className="font-bold text-white">
                        {buyer.minQuantityKg} - {buyer.maxQuantityKg} kg
                      </span>
                    </div>
                    {buyer.buyingPricePerKg && (
                      <div className="flex justify-between text-[10px]">
                        <span className="text-white/40">OFFER PRICE:</span>
                        <span className="font-bold text-emerald-400">₹{buyer.buyingPricePerKg} / kg</span>
                      </div>
                    )}
                    <div className="pt-1 border-t border-white/10 text-[10px] text-white/70 line-clamp-2">
                      <span className="text-white/40">QUALITY SPEC: </span>
                      {buyer.qualityRequirements}
                    </div>
                  </div>
                </div>

                {/* Send Inquiry Button */}
                <button
                  onClick={() => handleSendInquiry(buyer.id)}
                  className={`w-full flex items-center justify-center space-x-2 rounded-xl py-3 text-xs font-extrabold transition-all shadow-md active:scale-95 ${
                    isInquirySent
                      ? 'bg-emerald-500 text-black'
                      : 'bg-white text-black hover:bg-white/90'
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
                      <span className="uppercase tracking-wider">SEND INQUIRY / CONNECT</span>
                    </>
                  )}
                </button>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
