import React, { useState } from 'react';
import type { CropItem, FarmerProfile } from '../../lib/agri-types';
import { INITIAL_FARMER_PROFILE } from '../../lib/buyers-data';
import { Sprout, ShieldCheck, MapPin, Layers, Truck, Check, Plus, Zap } from 'lucide-react';

interface FarmViewProps {
  onNavigateToNetwork?: () => void;
}

export const FarmView: React.FC<FarmViewProps> = ({ onNavigateToNetwork }) => {
  const [profile, setProfile] = useState<FarmerProfile>(INITIAL_FARMER_PROFILE);
  const [showAddCropModal, setShowAddCropModal] = useState(false);
  const [newCropName, setNewCropName] = useState('');
  const [newCropVariety, setNewCropVariety] = useState('');
  const [newCropQty, setNewCropQty] = useState('300');
  const [newCropCategory, setNewCropCategory] = useState<CropItem['category']>('Leafy Vegetable');

  const toggleFacility = (facility: string) => {
    setProfile((prev) => {
      const exists = prev.postHarvestFacilities.includes(facility);
      const updated = exists
        ? prev.postHarvestFacilities.filter((f) => f !== facility)
        : [...prev.postHarvestFacilities, facility];
      return { ...prev, postHarvestFacilities: updated };
    });
  };

  const handleAddCrop = () => {
    if (!newCropName) return;
    const newCrop: CropItem = {
      id: `crop-${Date.now()}`,
      name: newCropName,
      variety: newCropVariety || 'Local Variety',
      acreage: 0.5,
      growthStage: 'Maturing Harvest',
      expectedHarvestDate: 'Harvest in 2 Days',
      estimatedQtyKg: parseInt(newCropQty) || 200,
      category: newCropCategory,
      perishableLevel: newCropCategory === 'Leafy Vegetable' ? 'HIGH' : 'MEDIUM',
      qualityGrade: 'Grade A Standard',
      freshnessScore: 95,
      status: 'Ready Soon',
    };

    setProfile((prev) => ({
      ...prev,
      crops: [newCrop, ...prev.crops],
    }));

    setNewCropName('');
    setNewCropVariety('');
    setShowAddCropModal(false);
  };

  return (
    <div className="min-h-screen bg-[#030303] py-16 px-6 md:px-16 text-[#F5F5F7]">
      <div className="mx-auto max-w-5xl space-y-12">
        {/* Header */}
        <div className="border-b border-white/10 pb-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="space-y-2">
            <span className="text-xs font-mono font-bold tracking-widest text-emerald-400 uppercase flex items-center gap-2">
              <Sprout className="h-4 w-4" />
              FARMER DASHBOARD & CROP PORTFOLIO
            </span>
            <h1 className="font-display text-4xl sm:text-5xl font-black tracking-tight uppercase text-white">
              MY FARM INTELLIGENCE
            </h1>
            <p className="text-sm font-bold text-white/60">
              Manage your farmland, active crops, post-harvest infrastructure, and selling preferences.
            </p>
          </div>

          {onNavigateToNetwork && (
            <button
              onClick={onNavigateToNetwork}
              className="inline-flex items-center space-x-2 rounded-full bg-white px-6 py-3 text-xs font-extrabold text-black shadow-lg transition-all hover:scale-105 active:scale-95 shrink-0"
            >
              <Zap className="h-4 w-4 fill-black" />
              <span className="tracking-wider uppercase">MATCH BUYERS NOW</span>
            </button>
          )}
        </div>

        {/* Farmer Profile Card */}
        <div className="rounded-3xl border border-white/15 bg-[#0B0B0F] p-8 shadow-2xl space-y-6">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-white/10 pb-6">
            <div className="flex items-center space-x-4">
              <div className="flex h-16 w-16 items-center justify-center rounded-2xl border border-emerald-500/30 bg-emerald-500/10 text-emerald-400 font-display text-2xl font-black uppercase shadow-inner">
                {profile.name.charAt(0)}
              </div>
              <div className="space-y-1">
                <div className="flex items-center space-x-2">
                  <h2 className="font-display text-2xl font-black text-white uppercase">{profile.name}</h2>
                  <span className="inline-flex items-center space-x-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 px-2.5 py-0.5 text-[10px] font-mono font-bold text-emerald-400 uppercase">
                    <ShieldCheck className="h-3 w-3" />
                    <span>VERIFIED FARMER</span>
                  </span>
                </div>
                <div className="flex items-center space-x-2 text-xs font-mono text-white/60">
                  <MapPin className="h-3.5 w-3.5 text-white/40" />
                  <span>
                    {profile.village}, {profile.taluka}, {profile.district}, {profile.state}
                  </span>
                </div>
              </div>
            </div>

            <div className="text-right font-mono text-xs text-white/50">
              <span>PREFERRED LANG: </span>
              <span className="font-bold text-white">{profile.preferredLanguage}</span>
            </div>
          </div>

          {/* Farm Information Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-2">
            <div className="rounded-xl border border-white/10 bg-white/[0.03] p-4 space-y-1">
              <span className="text-[10px] font-mono text-white/40 uppercase block">TOTAL FARMLAND</span>
              <span className="text-lg font-black font-display text-white">{profile.totalFarmlandAcres} Acres</span>
            </div>
            <div className="rounded-xl border border-white/10 bg-white/[0.03] p-4 space-y-1">
              <span className="text-[10px] font-mono text-white/40 uppercase block">CULTIVATED AREA</span>
              <span className="text-lg font-black font-display text-emerald-400">{profile.cultivatedAreaAcres} Acres</span>
            </div>
            <div className="rounded-xl border border-white/10 bg-white/[0.03] p-4 space-y-1">
              <span className="text-[10px] font-mono text-white/40 uppercase block">SOIL TYPE</span>
              <span className="text-xs font-extrabold text-white/90 line-clamp-1">{profile.soilType}</span>
            </div>
            <div className="rounded-xl border border-white/10 bg-white/[0.03] p-4 space-y-1">
              <span className="text-[10px] font-mono text-white/40 uppercase block">FARMING METHOD</span>
              <span className="text-xs font-extrabold text-emerald-300">{profile.farmingMethod}</span>
            </div>
          </div>
        </div>

        {/* My Crops Section */}
        <div className="space-y-6">
          <div className="flex items-center justify-between border-b border-white/10 pb-3">
            <div>
              <h3 className="font-display text-2xl font-black text-white uppercase">MY ACTIVE CROPS</h3>
              <p className="text-xs font-mono text-white/50">Crops currently under cultivation or ready for harvest.</p>
            </div>
            <button
              onClick={() => setShowAddCropModal(true)}
              className="inline-flex items-center space-x-2 rounded-xl border border-white/20 bg-white/10 px-4 py-2.5 text-xs font-bold text-white hover:bg-white/20 transition-all active:scale-95"
            >
              <Plus className="h-4 w-4" />
              <span>ADD CROP</span>
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {profile.crops.map((crop) => {
              const isHighPerishable = crop.perishableLevel === 'HIGH';
              return (
                <div
                  key={crop.id}
                  className="rounded-2xl border border-white/15 bg-[#0C0C11] p-6 space-y-4 shadow-xl hover:border-white/30 transition-all flex flex-col justify-between"
                >
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-mono font-bold text-white/50 uppercase tracking-widest">
                        {crop.category}
                      </span>
                      <span
                        className={`rounded-full px-2.5 py-0.5 text-[9px] font-mono font-extrabold uppercase ${
                          isHighPerishable
                            ? 'bg-amber-500/10 border border-amber-500/30 text-amber-300'
                            : 'bg-emerald-500/10 border border-emerald-500/30 text-emerald-400'
                        }`}
                      >
                        {isHighPerishable ? '🔥 HIGH PERISHABLE' : 'STABLE'}
                      </span>
                    </div>

                    <h4 className="font-display text-xl font-black text-white uppercase">{crop.name}</h4>
                    <p className="text-xs font-mono text-white/60">Variety: {crop.variety}</p>

                    <div className="pt-2 grid grid-cols-2 gap-2 text-xs font-mono border-t border-white/10">
                      <div>
                        <span className="text-white/40 text-[10px] block">ACREAGE</span>
                        <span className="font-bold text-white">{crop.acreage} Acre</span>
                      </div>
                      <div>
                        <span className="text-white/40 text-[10px] block">ESTIMATED YIELD</span>
                        <span className="font-bold text-emerald-400">{crop.estimatedQtyKg} kg</span>
                      </div>
                    </div>
                  </div>

                  <div className="pt-3 border-t border-white/10 flex items-center justify-between text-xs font-mono">
                    <span className="text-white/60">{crop.expectedHarvestDate}</span>
                    <span className="rounded bg-white/10 px-2 py-1 text-[10px] font-bold text-white uppercase">
                      {crop.status}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Post-Harvest Facilities & Selling Preferences */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-4">
          {/* Post-Harvest Facilities */}
          <div className="rounded-3xl border border-white/15 bg-[#0A0A0F] p-8 space-y-6 shadow-xl">
            <div>
              <h3 className="font-display text-xl font-black text-white uppercase flex items-center gap-2">
                <Layers className="h-5 w-5 text-emerald-400" />
                POST-HARVEST FACILITIES
              </h3>
              <p className="text-xs font-mono text-white/50 mt-1">
                Select available infrastructure to refine buyer suitability.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {[
                'Cold Storage',
                'Normal Storage',
                'Sorting/Grading',
                'Packaging',
                'Refrigerated Transport',
                'Shade Drying',
              ].map((facility) => {
                const isSelected = profile.postHarvestFacilities.includes(facility);
                return (
                  <button
                    key={facility}
                    onClick={() => toggleFacility(facility)}
                    className={`flex items-center justify-between rounded-xl border p-3.5 text-xs font-extrabold transition-all text-left ${
                      isSelected
                        ? 'border-emerald-500/50 bg-emerald-500/10 text-emerald-300'
                        : 'border-white/10 bg-white/5 text-white/60 hover:bg-white/10'
                    }`}
                  >
                    <span>{facility}</span>
                    {isSelected && <Check className="h-4 w-4 text-emerald-400 shrink-0" />}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Selling Preferences */}
          <div className="rounded-3xl border border-white/15 bg-[#0A0A0F] p-8 space-y-6 shadow-xl">
            <div>
              <h3 className="font-display text-xl font-black text-white uppercase flex items-center gap-2">
                <Truck className="h-5 w-5 text-emerald-400" />
                SELLING PREFERENCES
              </h3>
              <p className="text-xs font-mono text-white/50 mt-1">
                Configure procurement target rules and priority matching.
              </p>
            </div>

            <div className="space-y-4 font-mono text-xs">
              <div className="space-y-1">
                <label className="text-white/50 block">PREFERRED SELLING PRIORITY</label>
                <select
                  value={profile.sellingPreferences.priority}
                  onChange={(e) =>
                    setProfile((prev) => ({
                      ...prev,
                      sellingPreferences: {
                        ...prev.sellingPreferences,
                        priority: e.target.value as any,
                      },
                    }))
                  }
                  className="w-full rounded-xl border border-white/20 bg-[#0F0F14] px-4 py-3 text-sm font-extrabold text-white focus:outline-none"
                >
                  <option value="Fastest Sale">⚡ Fastest Sale (Minimize Perishing)</option>
                  <option value="Highest Price">💰 Highest Price Opportunity</option>
                  <option value="Lowest Transportation">📍 Lowest Transportation Radius</option>
                  <option value="Minimum Wastage">🌱 Minimum Post-Harvest Wastage</option>
                </select>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-white/50 block">MAX RADIUS (KM)</label>
                  <input
                    type="number"
                    value={profile.sellingPreferences.sellingRadiusKm}
                    onChange={(e) =>
                      setProfile((prev) => ({
                        ...prev,
                        sellingPreferences: {
                          ...prev.sellingPreferences,
                          sellingRadiusKm: parseInt(e.target.value) || 50,
                        },
                      }))
                    }
                    className="w-full rounded-xl border border-white/20 bg-[#0F0F14] px-4 py-3 text-sm font-extrabold text-white focus:outline-none"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-white/50 block">MIN QUANTITY (KG)</label>
                  <input
                    type="number"
                    value={profile.sellingPreferences.minQuantityKg}
                    onChange={(e) =>
                      setProfile((prev) => ({
                        ...prev,
                        sellingPreferences: {
                          ...prev.sellingPreferences,
                          minQuantityKg: parseInt(e.target.value) || 50,
                        },
                      }))
                    }
                    className="w-full rounded-xl border border-white/20 bg-[#0F0F14] px-4 py-3 text-sm font-extrabold text-white focus:outline-none"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Add Crop Modal */}
      {showAddCropModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
          <div className="w-full max-w-md rounded-3xl border border-white/20 bg-[#0F0F14] p-8 space-y-6 shadow-2xl">
            <h3 className="font-display text-2xl font-black text-white uppercase">ADD NEW CROP</h3>

            <div className="space-y-4 text-xs font-mono">
              <div className="space-y-1">
                <label className="text-white/60 block">CROP NAME</label>
                <input
                  type="text"
                  placeholder="e.g. Spinach, Coriander, Tomato"
                  value={newCropName}
                  onChange={(e) => setNewCropName(e.target.value)}
                  className="w-full rounded-xl border border-white/20 bg-black/60 px-4 py-3 text-sm font-bold text-white focus:outline-none"
                />
              </div>

              <div className="space-y-1">
                <label className="text-white/60 block">VARIETY</label>
                <input
                  type="text"
                  placeholder="e.g. Hybrid All Green"
                  value={newCropVariety}
                  onChange={(e) => setNewCropVariety(e.target.value)}
                  className="w-full rounded-xl border border-white/20 bg-black/60 px-4 py-3 text-sm font-bold text-white focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-white/60 block">CATEGORY</label>
                  <select
                    value={newCropCategory}
                    onChange={(e) => setNewCropCategory(e.target.value as any)}
                    className="w-full rounded-xl border border-white/20 bg-black/60 px-3 py-3 text-xs font-bold text-white focus:outline-none"
                  >
                    <option value="Leafy Vegetable">Leafy Vegetable</option>
                    <option value="Fruit">Fruit</option>
                    <option value="Grain">Grain</option>
                    <option value="Root Crop">Root Crop</option>
                    <option value="Spice">Spice</option>
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="text-white/60 block">EXPECTED YIELD (KG)</label>
                  <input
                    type="number"
                    value={newCropQty}
                    onChange={(e) => setNewCropQty(e.target.value)}
                    className="w-full rounded-xl border border-white/20 bg-black/60 px-4 py-3 text-sm font-bold text-white focus:outline-none"
                  />
                </div>
              </div>
            </div>

            <div className="flex items-center justify-end space-x-3 pt-2">
              <button
                onClick={() => setShowAddCropModal(false)}
                className="rounded-xl border border-white/10 px-5 py-2.5 text-xs font-mono text-white/60 hover:text-white"
              >
                CANCEL
              </button>
              <button
                onClick={handleAddCrop}
                className="rounded-xl bg-white px-6 py-2.5 text-xs font-extrabold text-black hover:bg-white/90"
              >
                SAVE CROP
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
