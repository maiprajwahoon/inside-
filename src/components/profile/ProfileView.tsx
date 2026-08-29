import React, { useState } from 'react';
import { useProfile } from '../../context/ProfileContext';
import type { BuyerType } from '../../lib/agri-types';
import { INITIAL_FARMER_PROFILE } from '../../lib/buyers-data';
import { Sprout, Store, ShoppingCart, UserCheck, ShieldCheck, Tag, Plus, X } from 'lucide-react';

export const ProfileView: React.FC = () => {
  const {
    userRole,
    setUserRole,
    buyerProfile,
    updateBuyerProfile,
    purchaseOrders,
    updateOrderStatus,
    marketListings,
    addMarketListing,
    removeMarketListing,
  } = useProfile();

  const [activeTabSection, setActiveTabSection] = useState<'FARMER' | 'BUYER'>('FARMER');
  const [notification, setNotification] = useState<string | null>(null);

  // Listing Modal State
  const [showListCropModal, setShowListCropModal] = useState(false);
  const [cropNameToList, setCropNameToList] = useState('Ratnagiri Alphonso Mango');
  const [varietyToList, setVarietyToList] = useState('Ratnagiri Hapus (GI Tagged)');
  const [qtyToList, setQtyToList] = useState('500');
  const [priceToList, setPriceToList] = useState('85');

  const showFeedback = (msg: string) => {
    setNotification(msg);
    setTimeout(() => setNotification(null), 3000);
  };

  const handleCreateListing = () => {
    if (!cropNameToList) return;
    addMarketListing({
      cropId: `crop-${Date.now()}`,
      cropName: cropNameToList,
      variety: varietyToList || 'Grade A Variety',
      farmerName: INITIAL_FARMER_PROFILE.name,
      farmerLocation: `${INITIAL_FARMER_PROFILE.village}, ${INITIAL_FARMER_PROFILE.district}`,
      quantityKg: parseInt(qtyToList) || 200,
      askingPricePerKg: parseInt(priceToList) || 40,
      qualityGrade: 'Grade A Export',
      freshnessIndicator: '96% Peak Ripeness',
    });

    showFeedback(`CROP "${cropNameToList.toUpperCase()}" LISTED ON MARKETPLACE FOR SALE!`);
    setShowListCropModal(false);
  };

  return (
    <div className="min-h-screen bg-[#030303] py-16 px-6 md:px-16 text-[#F5F5F7]">
      <div className="mx-auto max-w-4xl space-y-10">
        {/* Top Header & Role Switcher */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/15 pb-8">
          <div className="space-y-2">
            <span className="text-xs font-mono font-bold tracking-widest text-emerald-400 uppercase flex items-center gap-2">
              <UserCheck className="h-4 w-4" />
              AGRICULTURAL PROFILE & ACCOUNT CENTER
            </span>
            <h1 className="font-display text-4xl sm:text-5xl font-black tracking-tight uppercase text-white">
              ACCOUNT & ROLE PROFILE
            </h1>
            <p className="text-sm font-bold text-white/60">
              Switch between Farmer / Seller Mode and Buyer Procurement Mode.
            </p>
          </div>

          {/* Active Role Switcher Toggle */}
          <div className="flex items-center rounded-2xl border border-white/20 bg-[#0B0B0F] p-1.5 shrink-0 shadow-lg">
            <button
              onClick={() => {
                setUserRole('FARMER');
                setActiveTabSection('FARMER');
                showFeedback('SWITCHED TO FARMER / SELLER MODE');
              }}
              className={`flex items-center space-x-2 rounded-xl px-4 py-2.5 text-xs font-extrabold transition-all uppercase ${
                userRole === 'FARMER'
                  ? 'bg-emerald-500 text-black shadow-md'
                  : 'text-white/60 hover:text-white'
              }`}
            >
              <Sprout className="h-4 w-4" />
              <span>👨‍🌾 FARMER / SELLER</span>
            </button>

            <button
              onClick={() => {
                setUserRole('BUYER');
                setActiveTabSection('BUYER');
                showFeedback('SWITCHED TO BUYER / PROCUREMENT MODE');
              }}
              className={`flex items-center space-x-2 rounded-xl px-4 py-2.5 text-xs font-extrabold transition-all uppercase ${
                userRole === 'BUYER'
                  ? 'bg-white text-black shadow-md'
                  : 'text-white/60 hover:text-white'
              }`}
            >
              <Store className="h-4 w-4" />
              <span>🏢 BUYER MODE</span>
            </button>
          </div>
        </div>

        {/* Feedback Banner */}
        {notification && (
          <div className="rounded-2xl border-2 border-emerald-400 bg-emerald-500/10 p-4 text-center font-mono text-xs font-black tracking-widest text-emerald-400 uppercase shadow-lg">
            ✅ {notification}
          </div>
        )}

        {/* Profile Section Tabs */}
        <div className="flex flex-wrap gap-2 border-b border-white/10 pb-4">
          <button
            onClick={() => setActiveTabSection('FARMER')}
            className={`rounded-full px-5 py-2.5 text-xs font-black uppercase transition-all ${
              activeTabSection === 'FARMER'
                ? 'bg-emerald-500 text-black font-extrabold shadow-sm'
                : 'border border-white/15 bg-white/5 text-white/70 hover:text-white'
            }`}
          >
            👨‍🌾 FARMER PROFILE & LISTINGS
          </button>

          <button
            onClick={() => setActiveTabSection('BUYER')}
            className={`rounded-full px-5 py-2.5 text-xs font-black uppercase transition-all ${
              activeTabSection === 'BUYER'
                ? 'bg-white text-black font-extrabold shadow-sm'
                : 'border border-white/15 bg-white/5 text-white/70 hover:text-white'
            }`}
          >
            🏢 BUYER COMPANY PROFILE
          </button>
        </div>

        {/* SECTION A: FARMER PROFILE, LISTINGS FOR SALE, & BUY ORDERS */}
        {activeTabSection === 'FARMER' && (
          <div className="space-y-8">
            {/* Farmer Card */}
            <div className="rounded-3xl border border-white/15 bg-[#0A0A0F] p-8 space-y-6 shadow-2xl">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/10 pb-6">
                <div>
                  <span className="text-[10px] font-mono text-emerald-400 font-bold block uppercase">
                    SELLER / FARMER PROFILE
                  </span>
                  <h2 className="font-display text-3xl font-black text-white uppercase mt-1">
                    {INITIAL_FARMER_PROFILE.name}
                  </h2>
                  <p className="text-xs font-mono text-white/60">
                    Location: {INITIAL_FARMER_PROFILE.village}, {INITIAL_FARMER_PROFILE.district}, {INITIAL_FARMER_PROFILE.state}
                  </p>
                </div>

                <button
                  onClick={() => setShowListCropModal(true)}
                  className="inline-flex items-center space-x-2 rounded-2xl bg-white px-6 py-3.5 text-xs font-extrabold text-black shadow-lg hover:bg-white/90 transition-all uppercase shrink-0 active:scale-95"
                >
                  <Plus className="h-4 w-4" />
                  <span>PUT CROP UP FOR SALE IN MARKETPLACE</span>
                </button>
              </div>

              {/* Active Marketplace Listings */}
              <div className="space-y-4 pt-2">
                <h3 className="font-display text-xl font-black text-white uppercase flex items-center gap-2">
                  <Tag className="h-5 w-5 text-emerald-400" />
                  MY CROPS LISTED FOR SALE IN MARKETPLACE ({marketListings.length})
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {marketListings.map((item) => (
                    <div
                      key={item.id}
                      className="rounded-2xl border border-white/15 bg-black/60 p-5 space-y-3 shadow-md"
                    >
                      <div className="flex items-center justify-between">
                        <span className="text-base font-black text-white font-display uppercase">{item.cropName}</span>
                        <button
                          onClick={() => {
                            removeMarketListing(item.id);
                            showFeedback(`REMOVED LISTING FOR ${item.cropName.toUpperCase()}`);
                          }}
                          className="text-white/40 hover:text-red-400 text-xs font-mono uppercase"
                        >
                          REMOVE
                        </button>
                      </div>

                      <div className="space-y-1 font-mono text-xs text-white/70 border-t border-white/10 pt-2">
                        <div className="flex justify-between">
                          <span>QUANTITY FOR SALE:</span>
                          <span className="font-bold text-emerald-400">{item.quantityKg} kg</span>
                        </div>
                        <div className="flex justify-between">
                          <span>ASKING PRICE:</span>
                          <span className="font-bold text-white">₹{item.askingPricePerKg} / kg</span>
                        </div>
                        <div className="flex justify-between text-[10px] text-white/50 pt-1">
                          <span>GRADE: {item.qualityGrade}</span>
                          <span>LISTED: {item.listedDate}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Received Buy Orders */}
            <div className="rounded-3xl border border-white/15 bg-[#0A0A0F] p-8 space-y-6 shadow-2xl">
              <div className="flex items-center justify-between border-b border-white/10 pb-4">
                <div>
                  <span className="text-[10px] font-mono text-emerald-400 font-bold block uppercase">
                    INCOMING CONTRACT OFFERS
                  </span>
                  <h3 className="font-display text-2xl font-black text-white uppercase mt-1">
                    RECEIVED PURCHASE ORDERS ({purchaseOrders.length})
                  </h3>
                </div>
                <ShoppingCart className="h-6 w-6 text-emerald-400" />
              </div>

              <div className="space-y-4">
                {purchaseOrders.map((order) => (
                  <div
                    key={order.id}
                    className="rounded-2xl border border-white/15 bg-black/60 p-5 space-y-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4"
                  >
                    <div className="space-y-1 font-mono">
                      <div className="flex items-center space-x-2 text-xs">
                        <span className="font-bold text-white/40">ORDER #{order.id}</span>
                        <span className="text-emerald-400 font-extrabold">{order.buyerName} ({order.buyerType})</span>
                      </div>
                      <div className="text-base font-bold text-white font-display uppercase">
                        {order.quantityKg} kg of {order.cropName} @ ₹{order.offeredPricePerKg}/kg
                      </div>
                      <div className="text-xs text-white/60">
                        Total Value: <span className="font-extrabold text-emerald-400">₹{order.totalAmountINR}</span> · Expected Delivery: {order.deliveryDate}
                      </div>
                    </div>

                    <div className="flex items-center space-x-3 shrink-0">
                      {order.status === 'PENDING' ? (
                        <>
                          <button
                            onClick={() => {
                              updateOrderStatus(order.id, 'ACCEPTED');
                              showFeedback(`ACCEPTED ORDER #${order.id}`);
                            }}
                            className="rounded-xl bg-emerald-500 px-4 py-2 text-xs font-extrabold text-black hover:bg-emerald-400 transition-all uppercase"
                          >
                            ACCEPT OFFER
                          </button>
                          <button
                            onClick={() => {
                              updateOrderStatus(order.id, 'REJECTED');
                              showFeedback(`REJECTED ORDER #${order.id}`);
                            }}
                            className="rounded-xl border border-red-500/40 bg-red-500/10 px-4 py-2 text-xs font-mono text-red-400 hover:bg-red-500/20 transition-all uppercase"
                          >
                            DECLINE
                          </button>
                        </>
                      ) : (
                        <span
                          className={`rounded-full px-4 py-1.5 text-xs font-mono font-bold uppercase ${
                            order.status === 'ACCEPTED'
                              ? 'bg-emerald-500/10 border border-emerald-500/30 text-emerald-400'
                              : 'bg-red-500/10 border border-red-500/30 text-red-400'
                          }`}
                        >
                          {order.status}
                        </span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* SECTION B: BUYER COMPANY PROFILE */}
        {activeTabSection === 'BUYER' && (
          <div className="rounded-3xl border border-white/15 bg-[#0A0A0F] p-8 space-y-6 shadow-2xl">
            <div className="flex items-center justify-between border-b border-white/10 pb-4">
              <div>
                <span className="text-[10px] font-mono text-white/40 block uppercase">
                  PROCUREMENT OFFICER & BUYER CREDENTIALS
                </span>
                <h3 className="font-display text-2xl font-black text-white uppercase mt-1">
                  BUYER COMPANY PROFILE
                </h3>
              </div>
              <ShieldCheck className="h-6 w-6 text-emerald-400" />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-xs font-mono">
              <div className="space-y-1">
                <label className="text-white/60 block">COMPANY / BUYER NAME</label>
                <input
                  type="text"
                  value={buyerProfile.companyName}
                  onChange={(e) => updateBuyerProfile({ companyName: e.target.value })}
                  className="w-full rounded-xl border border-white/20 bg-black/60 px-4 py-3 text-sm font-bold text-white focus:outline-none"
                />
              </div>

              <div className="space-y-1">
                <label className="text-white/60 block">CONTACT PERSON</label>
                <input
                  type="text"
                  value={buyerProfile.contactPerson}
                  onChange={(e) => updateBuyerProfile({ contactPerson: e.target.value })}
                  className="w-full rounded-xl border border-white/20 bg-black/60 px-4 py-3 text-sm font-bold text-white focus:outline-none"
                />
              </div>

              <div className="space-y-1">
                <label className="text-white/60 block">BUYER CATEGORY</label>
                <select
                  value={buyerProfile.buyerType}
                  onChange={(e) => updateBuyerProfile({ buyerType: e.target.value as BuyerType })}
                  className="w-full rounded-xl border border-white/20 bg-black/60 px-3 py-3 text-xs font-bold text-white focus:outline-none"
                >
                  <option value="Food Processor">Food Processor</option>
                  <option value="Wholesaler">Wholesaler</option>
                  <option value="Retailer">Retailer</option>
                  <option value="Restaurant">Restaurant</option>
                  <option value="Hotel">Hotel</option>
                  <option value="Institutional">Institutional Buyer</option>
                  <option value="Aggregator">Aggregator / FPO</option>
                </select>
              </div>

              <div className="space-y-1">
                <label className="text-white/60 block">DEFAULT OFFER PRICE (₹/KG)</label>
                <input
                  type="number"
                  value={buyerProfile.buyingPricePerKgINR}
                  onChange={(e) => updateBuyerProfile({ buyingPricePerKgINR: parseInt(e.target.value) || 20 })}
                  className="w-full rounded-xl border border-white/20 bg-black/60 px-4 py-3 text-sm font-bold text-white focus:outline-none"
                />
              </div>

              <div className="sm:col-span-2 space-y-1">
                <label className="text-white/60 block">QUALITY SPECIFICATIONS REQUIRED</label>
                <input
                  type="text"
                  value={buyerProfile.qualitySpecification}
                  onChange={(e) => updateBuyerProfile({ qualitySpecification: e.target.value })}
                  className="w-full rounded-xl border border-white/20 bg-black/60 px-4 py-3 text-sm font-bold text-white focus:outline-none"
                />
              </div>
            </div>

            <div className="pt-4 border-t border-white/10 flex justify-end">
              <button
                onClick={() => showFeedback('BUYER PROFILE UPDATED')}
                className="rounded-xl bg-white px-6 py-3 text-xs font-extrabold text-black hover:bg-white/90 transition-all uppercase"
              >
                SAVE BUYER PROFILE
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Put Up For Sale Modal */}
      {showListCropModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
          <div className="w-full max-w-md rounded-3xl border border-white/20 bg-[#0F0F14] p-8 space-y-6 shadow-2xl">
            <div className="flex items-center justify-between border-b border-white/10 pb-4">
              <div>
                <span className="text-[10px] font-mono text-emerald-400 block uppercase font-bold">AGRICULTURAL MARKETPLACE</span>
                <h3 className="font-display text-2xl font-black text-white uppercase mt-0.5">
                  LIST CROP FOR SALE
                </h3>
              </div>
              <button
                onClick={() => setShowListCropModal(false)}
                className="rounded-lg border border-white/10 p-2 text-white/60 hover:text-white"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="space-y-4 text-xs font-mono">
              <div className="space-y-1">
                <label className="text-white/60 block">CROP / PRODUCE NAME</label>
                <input
                  type="text"
                  value={cropNameToList}
                  onChange={(e) => setCropNameToList(e.target.value)}
                  placeholder="e.g. Ratnagiri Alphonso Mango"
                  className="w-full rounded-xl border border-white/20 bg-black/60 px-4 py-3 text-sm font-bold text-white focus:outline-none"
                />
              </div>

              <div className="space-y-1">
                <label className="text-white/60 block">VARIETY / GRADE</label>
                <input
                  type="text"
                  value={varietyToList}
                  onChange={(e) => setVarietyToList(e.target.value)}
                  placeholder="e.g. Ratnagiri Hapus (Grade A Export)"
                  className="w-full rounded-xl border border-white/20 bg-black/60 px-4 py-3 text-sm font-bold text-white focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-white/60 block">QUANTITY FOR SALE (KG)</label>
                  <input
                    type="number"
                    value={qtyToList}
                    onChange={(e) => setQtyToList(e.target.value)}
                    className="w-full rounded-xl border border-white/20 bg-black/60 px-4 py-3 text-sm font-bold text-white focus:outline-none"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-white/60 block">ASKING PRICE PER KG (₹)</label>
                  <input
                    type="number"
                    value={priceToList}
                    onChange={(e) => setPriceToList(e.target.value)}
                    className="w-full rounded-xl border border-white/20 bg-black/60 px-4 py-3 text-sm font-bold text-white focus:outline-none"
                  />
                </div>
              </div>
            </div>

            <div className="flex items-center justify-end space-x-3 pt-2">
              <button
                onClick={() => setShowListCropModal(false)}
                className="rounded-xl border border-white/10 px-5 py-2.5 text-xs font-mono text-white/60 hover:text-white"
              >
                CANCEL
              </button>
              <button
                onClick={handleCreateListing}
                className="rounded-xl bg-emerald-500 px-6 py-2.5 text-xs font-extrabold text-black hover:bg-emerald-400 transition-all uppercase"
              >
                POST LISTING NOW
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
