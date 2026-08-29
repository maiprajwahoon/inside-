import React, { useState } from 'react';
import { useProfile } from '../../context/ProfileContext';
import { ALLERGEN_OPTIONS, DIET_OPTIONS, PRESET_PROFILES } from '../../lib/mock-data';
import type { BuyerType } from '../../lib/agri-types';
import { Plus, RotateCcw, ShieldCheck, Check, Sprout, Store, ShoppingCart, UserCheck } from 'lucide-react';

export const ProfileView: React.FC = () => {
  const {
    userProfile,
    updateProfile,
    resetProfile,
    userRole,
    setUserRole,
    buyerProfile,
    updateBuyerProfile,
    purchaseOrders,
    updateOrderStatus,
  } = useProfile();

  const [activeTabSection, setActiveTabSection] = useState<'ROLE_PREFS' | 'BUYER_PROFILE' | 'HEALTH_PROFILE'>('ROLE_PREFS');
  const [notification, setNotification] = useState<string | null>(null);

  const showFeedback = (msg: string) => {
    setNotification(msg);
    setTimeout(() => setNotification(null), 2500);
  };

  const handleReset = () => {
    resetProfile();
    showFeedback('HEALTH PROFILE RESET TO DEFAULTS');
  };

  const toggleItem = (category: 'allergies' | 'diets' | 'avoidIngredients', value: string) => {
    const list = userProfile[category];
    const exists = list.includes(value);
    const updated = exists ? list.filter((item) => item !== value) : [...list, value];
    updateProfile({ [category]: updated });
  };

  return (
    <div className="min-h-screen bg-[#030303] py-16 px-6 md:px-16 text-[#F5F5F7]">
      <div className="mx-auto max-w-4xl space-y-10">
        {/* Top Header & Active Role Indicator */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/15 pb-8">
          <div className="space-y-2">
            <span className="text-xs font-mono font-bold tracking-widest text-emerald-400 uppercase flex items-center gap-2">
              <UserCheck className="h-4 w-4" />
              USER ROLE & ACCOUNT SETTINGS
            </span>
            <h1 className="font-display text-4xl sm:text-5xl font-black tracking-tight uppercase text-white">
              PROFILE CONTROL CENTER
            </h1>
            <p className="text-sm font-bold text-white/60">
              Manage your active role as a Farmer / Seller or Procurement Buyer.
            </p>
          </div>

          {/* Active Role Selector Badge */}
          <div className="flex items-center rounded-2xl border border-white/20 bg-[#0B0B0F] p-1.5 shrink-0 shadow-lg">
            <button
              onClick={() => {
                setUserRole('FARMER');
                showFeedback('SWITCHED TO FARMER / SELLER MODE');
              }}
              className={`flex items-center space-x-2 rounded-xl px-4 py-2 text-xs font-extrabold transition-all uppercase ${
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
                showFeedback('SWITCHED TO BUYER / PROCUREMENT MODE');
              }}
              className={`flex items-center space-x-2 rounded-xl px-4 py-2 text-xs font-extrabold transition-all uppercase ${
                userRole === 'BUYER'
                  ? 'bg-white text-black shadow-md'
                  : 'text-white/60 hover:text-white'
              }`}
            >
              <Store className="h-4 w-4" />
              <span>🏢 BUYER / PROCESSOR</span>
            </button>
          </div>
        </div>

        {/* Feedback Banner */}
        {notification && (
          <div className="rounded-xl border-2 border-emerald-400 bg-emerald-500/10 p-4 text-center font-mono text-xs font-black tracking-widest text-emerald-400 uppercase shadow-lg">
            {notification}
          </div>
        )}

        {/* Profile Section Tabs */}
        <div className="flex flex-wrap gap-2 border-b border-white/10 pb-4">
          <button
            onClick={() => setActiveTabSection('ROLE_PREFS')}
            className={`rounded-full px-5 py-2.5 text-xs font-black uppercase transition-all ${
              activeTabSection === 'ROLE_PREFS'
                ? 'bg-white text-black font-extrabold shadow-sm'
                : 'border border-white/15 bg-white/5 text-white/70 hover:text-white'
            }`}
          >
            👨‍🌾 FARMER & ORDERS PREFERENCES
          </button>

          <button
            onClick={() => setActiveTabSection('BUYER_PROFILE')}
            className={`rounded-full px-5 py-2.5 text-xs font-black uppercase transition-all ${
              activeTabSection === 'BUYER_PROFILE'
                ? 'bg-white text-black font-extrabold shadow-sm'
                : 'border border-white/15 bg-white/5 text-white/70 hover:text-white'
            }`}
          >
            🏢 BUYER COMPANY PROFILE
          </button>

          <button
            onClick={() => setActiveTabSection('HEALTH_PROFILE')}
            className={`rounded-full px-5 py-2.5 text-xs font-black uppercase transition-all ${
              activeTabSection === 'HEALTH_PROFILE'
                ? 'bg-white text-black font-extrabold shadow-sm'
                : 'border border-white/15 bg-white/5 text-white/70 hover:text-white'
            }`}
          >
            🥗 HEALTH & DIET PREFERENCES
          </button>
        </div>

        {/* SECTION A: FARMER PREFERENCES & RECEIVED BUY ORDERS */}
        {activeTabSection === 'ROLE_PREFS' && (
          <div className="space-y-8">
            <div className="rounded-3xl border border-white/15 bg-[#0A0A0F] p-8 space-y-6 shadow-2xl">
              <div className="flex items-center justify-between border-b border-white/10 pb-4">
                <div>
                  <span className="text-[10px] font-mono text-emerald-400 font-bold block uppercase">
                    SELLER / FARMER MODE ACTIVE
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
                        Total Contract Value: <span className="font-extrabold text-emerald-400">₹{order.totalAmountINR}</span> · Expected Delivery: {order.deliveryDate}
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
        {activeTabSection === 'BUYER_PROFILE' && (
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

        {/* SECTION C: HEALTH & DIETARY REQUIREMENTS */}
        {activeTabSection === 'HEALTH_PROFILE' && (
          <div className="space-y-10">
            <div className="flex items-center justify-between border-b border-white/10 pb-4">
              <div>
                <h3 className="font-display text-2xl font-black text-white uppercase">HEALTH & DIET PREFERENCES</h3>
                <p className="text-xs font-mono text-white/50">Personal safety rules for ingredient and product analysis.</p>
              </div>

              <button
                onClick={handleReset}
                className="inline-flex items-center space-x-2 rounded-xl border border-white/20 bg-white/5 px-4 py-2 text-xs font-bold text-white hover:bg-white/15 transition-all uppercase"
              >
                <RotateCcw className="h-3.5 w-3.5" />
                <span>RESET DEFAULTS</span>
              </button>
            </div>

            {/* Presets */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {PRESET_PROFILES.map((preset) => (
                <button
                  key={preset.label}
                  onClick={() => {
                    updateProfile(preset.profile);
                    showFeedback(`LOADED ${preset.label.toUpperCase()}`);
                  }}
                  className="flex items-center justify-between rounded-xl border border-white/15 bg-[#0B0B0F] p-4 font-bold text-white hover:border-white/40 transition-all"
                >
                  <span className="text-sm font-extrabold">{preset.label}</span>
                  <ShieldCheck className="h-5 w-5 text-emerald-400" />
                </button>
              ))}
            </div>

            {/* Allergies */}
            <div className="space-y-4 pt-4 border-t border-white/10">
              <h4 className="font-display text-xl font-black text-white uppercase">ALLERGIES ({userProfile.allergies.length})</h4>
              <div className="flex flex-wrap gap-2.5">
                {ALLERGEN_OPTIONS.map((allergy) => {
                  const selected = userProfile.allergies.includes(allergy);
                  return (
                    <button
                      key={allergy}
                      onClick={() => toggleItem('allergies', allergy)}
                      className={`flex items-center space-x-2 rounded-xl border-2 px-4 py-2 text-xs font-extrabold uppercase transition-all ${
                        selected
                          ? 'border-red-500 bg-red-500/20 text-white shadow-md'
                          : 'border-white/15 bg-white/5 text-white/70 hover:text-white'
                      }`}
                    >
                      <span>{allergy}</span>
                      {selected ? <Check className="h-3.5 w-3.5 text-red-400" /> : <Plus className="h-3.5 w-3.5 text-white/40" />}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Diets */}
            <div className="space-y-4 pt-6 border-t border-white/10">
              <h4 className="font-display text-xl font-black text-white uppercase">DIETS ({userProfile.diets.length})</h4>
              <div className="flex flex-wrap gap-2.5">
                {DIET_OPTIONS.map((diet) => {
                  const selected = userProfile.diets.includes(diet);
                  return (
                    <button
                      key={diet}
                      onClick={() => toggleItem('diets', diet)}
                      className={`flex items-center space-x-2 rounded-xl border-2 px-4 py-2 text-xs font-extrabold uppercase transition-all ${
                        selected
                          ? 'border-emerald-500 bg-emerald-500/20 text-white shadow-md'
                          : 'border-white/15 bg-white/5 text-white/70 hover:text-white'
                      }`}
                    >
                      <span>{diet}</span>
                      {selected ? <Check className="h-3.5 w-3.5 text-emerald-400" /> : <Plus className="h-3.5 w-3.5 text-white/40" />}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
