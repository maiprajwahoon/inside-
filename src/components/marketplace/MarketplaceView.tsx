import React, { useMemo, useState } from 'react';
import type { BuyerType } from '../../lib/agri-types';
import { MOCK_BUYERS, INITIAL_FARMER_PROFILE } from '../../lib/buyers-data';
import { useProfile } from '../../context/ProfileContext';
import { Search, ShieldCheck, MapPin, Store, Building2, Factory, Utensils, CheckCircle2, Send, ShoppingCart, Sprout, X } from 'lucide-react';

export const MarketplaceView: React.FC = () => {
  const { userRole, buyerProfile, placePurchaseOrder, marketListings } = useProfile();
  const [activeMarketTab, setActiveMarketTab] = useState<'BUYERS' | 'FARMS'>('FARMS');
  const [query, setQuery] = useState('');
  const [selectedType, setSelectedType] = useState<BuyerType | 'All'>('All');
  const [inquirySentBuyerId, setInquirySentBuyerId] = useState<string | null>(null);

  // Purchase Order Modal State
  const [selectedListingToBuy, setSelectedListingToBuy] = useState<{
    cropName: string;
    farmerName: string;
    farmerLocation: string;
    qtyKg: number;
    pricePerKg: number;
  } | null>(null);

  const [orderQty, setOrderQty] = useState('200');
  const [orderOfferPrice, setOrderOfferPrice] = useState('24');
  const [orderSuccessMsg, setOrderSuccessMsg] = useState<string | null>(null);

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

  const handlePlaceOrderSubmit = () => {
    if (!selectedListingToBuy) return;
    const qty = parseInt(orderQty) || 100;
    const price = parseInt(orderOfferPrice) || 20;

    placePurchaseOrder({
      cropId: `crop-${Date.now()}`,
      cropName: selectedListingToBuy.cropName,
      farmerName: selectedListingToBuy.farmerName,
      farmerLocation: selectedListingToBuy.farmerLocation,
      buyerName: buyerProfile.companyName || 'Sahyadri Farmers Co.',
      buyerType: buyerProfile.buyerType || 'Food Processor',
      quantityKg: qty,
      offeredPricePerKg: price,
      totalAmountINR: qty * price,
      deliveryDate: '2026-08-31',
    });

    setOrderSuccessMsg(`PURCHASE ORDER PLACED FOR ${qty} KG OF ${selectedListingToBuy.cropName.toUpperCase()} FROM ${selectedListingToBuy.farmerName.toUpperCase()}!`);
    setSelectedListingToBuy(null);
    setTimeout(() => setOrderSuccessMsg(null), 4000);
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
        <div className="border-b border-white/10 pb-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="space-y-2">
            <span className="text-xs font-mono font-bold tracking-widest text-emerald-400 uppercase flex items-center gap-2">
              <Store className="h-4 w-4" />
              AGRICULTURAL PRODUCE MARKETPLACE
            </span>
            <h1 className="font-display text-4xl sm:text-5xl font-black tracking-tight uppercase text-white">
              FARM PRODUCE MARKETPLACE
            </h1>
            <p className="text-sm font-bold text-white/60">
              Browse harvested crop batches listed directly by farmers for immediate procurement.
            </p>
          </div>

          {/* Tab Toggle for Buy From Farmers vs Buyer Directory */}
          <div className="flex items-center rounded-2xl border border-white/20 bg-[#0B0B0F] p-1.5 shrink-0 shadow-lg">
            <button
              onClick={() => setActiveMarketTab('FARMS')}
              className={`flex items-center space-x-2 rounded-xl px-4 py-2 text-xs font-extrabold transition-all uppercase ${
                activeMarketTab === 'FARMS'
                  ? 'bg-emerald-500 text-black shadow-md'
                  : 'text-white/60 hover:text-white'
              }`}
            >
              <Sprout className="h-4 w-4" />
              <span>BUY FROM FARMERS</span>
            </button>

            <button
              onClick={() => setActiveMarketTab('BUYERS')}
              className={`flex items-center space-x-2 rounded-xl px-4 py-2 text-xs font-extrabold transition-all uppercase ${
                activeMarketTab === 'BUYERS'
                  ? 'bg-white text-black shadow-md'
                  : 'text-white/60 hover:text-white'
              }`}
            >
              <Building2 className="h-4 w-4" />
              <span>BUYER DIRECTORY</span>
            </button>
          </div>
        </div>

        {orderSuccessMsg && (
          <div className="rounded-2xl border-2 border-emerald-400 bg-emerald-500/10 p-4 text-center font-mono text-xs font-black tracking-widest text-emerald-400 uppercase shadow-lg">
            ✅ {orderSuccessMsg}
          </div>
        )}

        {/* VIEW 1: BUY FROM FARMERS (Product & Farmer Name Focus) */}
        {activeMarketTab === 'FARMS' && (
          <div className="space-y-8">
            <div className="rounded-3xl border border-white/15 bg-[#0B0B10] p-8 space-y-4 shadow-2xl">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/10 pb-4">
                <div>
                  <span className="text-[10px] font-mono text-emerald-400 font-bold block uppercase">
                    ACTIVE FARMER CROP LISTINGS ({userRole === 'BUYER' ? 'BUYER MODE ACTIVE' : 'FARMER LISTINGS'})
                  </span>
                  <h2 className="font-display text-2xl sm:text-3xl font-black text-white uppercase mt-1">
                    AVAILABLE PRODUCE FOR SALE
                  </h2>
                </div>
                <div className="text-right font-mono text-xs text-white/60">
                  TOTAL LISTED BATCHES: <span className="font-bold text-emerald-400">{marketListings.length + INITIAL_FARMER_PROFILE.crops.length}</span>
                </div>
              </div>

              <p className="text-xs font-mono text-white/70">
                Buyers can inspect crop parameters, farmer credentials, harvest freshness, and submit purchase orders.
              </p>
            </div>

            {/* Combined Farmer Crops + Dynamic Market Listings */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Dynamic Market Listings */}
              {marketListings.map((listing) => (
                <div
                  key={listing.id}
                  className="rounded-3xl border border-emerald-500/30 bg-[#0A0A0F] p-6 flex flex-col justify-between space-y-6 shadow-xl hover:border-emerald-500/60 transition-all"
                >
                  <div className="space-y-4">
                    <div className="flex items-center justify-between border-b border-white/10 pb-3">
                      <span className="text-[10px] font-mono font-bold text-emerald-400 uppercase">
                        FARMER LISTED CROP
                      </span>
                      <span className="rounded-full bg-emerald-500/10 border border-emerald-500/30 px-2.5 py-0.5 text-[9px] font-mono font-extrabold text-emerald-400 uppercase">
                        {listing.qualityGrade}
                      </span>
                    </div>

                    {/* PRODUCT NAME & FARMER NAME FOCUS */}
                    <div className="space-y-1">
                      <h3 className="font-display text-2xl font-black text-white uppercase leading-tight">
                        {listing.cropName}
                      </h3>
                      <div className="flex items-center space-x-1.5 text-xs font-mono text-emerald-300 font-bold">
                        <span>FARMER: {listing.farmerName}</span>
                      </div>
                      <p className="text-[11px] font-mono text-white/50 flex items-center gap-1">
                        <MapPin className="h-3 w-3 text-white/40" />
                        {listing.farmerLocation}
                      </p>
                    </div>

                    <div className="rounded-2xl border border-white/10 bg-black/60 p-4 space-y-2 text-xs font-mono">
                      <div className="flex justify-between">
                        <span className="text-white/40">QUANTITY FOR SALE:</span>
                        <span className="font-extrabold text-emerald-400">{listing.quantityKg} kg</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-white/40">ASKING PRICE:</span>
                        <span className="font-extrabold text-white">₹{listing.askingPricePerKg} / kg</span>
                      </div>
                      <div className="flex justify-between pt-1 border-t border-white/10 text-[10px]">
                        <span className="text-white/40">FRESHNESS:</span>
                        <span className="font-bold text-emerald-300">{listing.freshnessIndicator}</span>
                      </div>
                    </div>
                  </div>

                  <button
                    onClick={() => {
                      setSelectedListingToBuy({
                        cropName: listing.cropName,
                        farmerName: listing.farmerName,
                        farmerLocation: listing.farmerLocation,
                        qtyKg: listing.quantityKg,
                        pricePerKg: listing.askingPricePerKg,
                      });
                      setOrderQty(listing.quantityKg.toString());
                      setOrderOfferPrice(listing.askingPricePerKg.toString());
                    }}
                    className="w-full inline-flex items-center justify-center space-x-2 rounded-xl bg-emerald-500 py-3 text-xs font-extrabold text-black shadow-lg hover:bg-emerald-400 transition-all active:scale-95 uppercase"
                  >
                    <ShoppingCart className="h-4 w-4" />
                    <span>BUY / PLACE PURCHASE ORDER</span>
                  </button>
                </div>
              ))}

              {/* Initial Farmer Crops */}
              {INITIAL_FARMER_PROFILE.crops.map((crop) => (
                <div
                  key={crop.id}
                  className="rounded-3xl border border-white/15 bg-[#0A0A0F] p-6 flex flex-col justify-between space-y-6 shadow-xl hover:border-white/30 transition-all"
                >
                  <div className="space-y-4">
                    <div className="flex items-center justify-between border-b border-white/10 pb-3">
                      <span className="text-[10px] font-mono font-bold text-white/50 uppercase">
                        {crop.category}
                      </span>
                      <span className="rounded-full bg-emerald-500/10 border border-emerald-500/30 px-2.5 py-0.5 text-[9px] font-mono font-extrabold text-emerald-400 uppercase">
                        {crop.qualityGrade || 'Grade A'}
                      </span>
                    </div>

                    {/* PRODUCT NAME & FARMER NAME FOCUS */}
                    <div className="space-y-1">
                      <h3 className="font-display text-2xl font-black text-white uppercase leading-tight">
                        {crop.name}
                      </h3>
                      <div className="flex items-center space-x-1.5 text-xs font-mono text-emerald-300 font-bold">
                        <span>FARMER: {INITIAL_FARMER_PROFILE.name}</span>
                      </div>
                      <p className="text-[11px] font-mono text-white/50 flex items-center gap-1">
                        <MapPin className="h-3 w-3 text-white/40" />
                        {INITIAL_FARMER_PROFILE.village}, {INITIAL_FARMER_PROFILE.district}
                      </p>
                    </div>

                    <div className="rounded-2xl border border-white/10 bg-black/60 p-4 space-y-2 text-xs font-mono">
                      <div className="flex justify-between">
                        <span className="text-white/40">AVAILABLE YIELD:</span>
                        <span className="font-extrabold text-emerald-400">{crop.estimatedQtyKg} kg</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-white/40">HARVEST TIMING:</span>
                        <span className="font-bold text-white">{crop.expectedHarvestDate}</span>
                      </div>
                      <div className="flex justify-between pt-1 border-t border-white/10">
                        <span className="text-white/40">FRESHNESS SCORE:</span>
                        <span className="font-bold text-emerald-300">{crop.freshnessScore || 96}%</span>
                      </div>
                    </div>
                  </div>

                  <button
                    onClick={() => {
                      setSelectedListingToBuy({
                        cropName: crop.name,
                        farmerName: INITIAL_FARMER_PROFILE.name,
                        farmerLocation: `${INITIAL_FARMER_PROFILE.village}, ${INITIAL_FARMER_PROFILE.district}`,
                        qtyKg: crop.estimatedQtyKg,
                        pricePerKg: 24,
                      });
                      setOrderQty(crop.estimatedQtyKg.toString());
                      setOrderOfferPrice('24');
                    }}
                    className="w-full inline-flex items-center justify-center space-x-2 rounded-xl bg-white py-3 text-xs font-extrabold text-black shadow-lg hover:bg-white/90 transition-all active:scale-95 uppercase"
                  >
                    <ShoppingCart className="h-4 w-4" />
                    <span>BUY / PLACE PURCHASE ORDER</span>
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* VIEW 2: BUYER DIRECTORY */}
        {activeMarketTab === 'BUYERS' && (
          <div className="space-y-8">
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

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredBuyers.map((buyer) => {
                const isInquirySent = inquirySentBuyerId === buyer.id;
                return (
                  <div
                    key={buyer.id}
                    className="rounded-3xl border border-white/15 bg-[#0A0A0F] p-6 flex flex-col justify-between space-y-6 shadow-xl hover:border-white/30 transition-all group"
                  >
                    <div className="space-y-4">
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

                      <div>
                        <h3 className="font-display text-xl font-black text-white group-hover:text-emerald-300 transition-colors uppercase leading-snug">
                          {buyer.name}
                        </h3>
                        <p className="text-xs font-mono text-white/50 flex items-center gap-1 mt-1">
                          <MapPin className="h-3 w-3 text-white/40" />
                          {buyer.location}
                        </p>
                      </div>

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
                    </div>

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
        )}
      </div>

      {/* Place Purchase Order Modal */}
      {selectedListingToBuy && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
          <div className="w-full max-w-md rounded-3xl border border-white/20 bg-[#0F0F14] p-8 space-y-6 shadow-2xl">
            <div className="flex items-center justify-between border-b border-white/10 pb-4">
              <div>
                <span className="text-[10px] font-mono text-emerald-400 block uppercase font-bold">DIRECT FARM PROCUREMENT</span>
                <h3 className="font-display text-2xl font-black text-white uppercase mt-0.5">
                  BUY {selectedListingToBuy.cropName.toUpperCase()}
                </h3>
              </div>
              <button
                onClick={() => setSelectedListingToBuy(null)}
                className="rounded-lg border border-white/10 p-2 text-white/60 hover:text-white"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="space-y-4 text-xs font-mono">
              <div className="rounded-xl border border-white/10 bg-black/60 p-3 space-y-1">
                <div className="text-white/60">FARMER: <strong className="text-emerald-400">{selectedListingToBuy.farmerName}</strong></div>
                <div className="text-white/60">LOCATION: <strong className="text-white">{selectedListingToBuy.farmerLocation}</strong></div>
              </div>

              <div className="space-y-1">
                <label className="text-white/60 block">PURCHASE QUANTITY (KG)</label>
                <input
                  type="number"
                  value={orderQty}
                  onChange={(e) => setOrderQty(e.target.value)}
                  className="w-full rounded-xl border border-white/20 bg-black/60 px-4 py-3 text-sm font-bold text-white focus:outline-none"
                />
              </div>

              <div className="space-y-1">
                <label className="text-white/60 block">OFFERED PRICE PER KG (₹)</label>
                <input
                  type="number"
                  value={orderOfferPrice}
                  onChange={(e) => setOrderOfferPrice(e.target.value)}
                  className="w-full rounded-xl border border-white/20 bg-black/60 px-4 py-3 text-sm font-bold text-white focus:outline-none"
                />
              </div>

              <div className="rounded-xl border border-emerald-500/30 bg-emerald-500/10 p-3 flex justify-between items-center text-emerald-300 font-extrabold text-sm font-display">
                <span>TOTAL CONTRACT AMOUNT:</span>
                <span>₹{(parseInt(orderQty) || 0) * (parseInt(orderOfferPrice) || 0)}</span>
              </div>
            </div>

            <div className="flex items-center justify-end space-x-3 pt-2">
              <button
                onClick={() => setSelectedListingToBuy(null)}
                className="rounded-xl border border-white/10 px-5 py-2.5 text-xs font-mono text-white/60 hover:text-white"
              >
                CANCEL
              </button>
              <button
                onClick={handlePlaceOrderSubmit}
                className="rounded-xl bg-emerald-500 px-6 py-2.5 text-xs font-extrabold text-black hover:bg-emerald-400 transition-all uppercase"
              >
                CONFIRM PURCHASE ORDER
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
