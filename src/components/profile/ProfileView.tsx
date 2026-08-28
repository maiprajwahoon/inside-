import React, { useState } from 'react';
import { useProfile } from '../../context/ProfileContext';
import { ALLERGEN_OPTIONS, DIET_OPTIONS, PRESET_PROFILES } from '../../lib/mock-data';
import { Plus, X, RotateCcw, ShieldCheck, Check } from 'lucide-react';

export const ProfileView: React.FC = () => {
  const { userProfile, updateProfile, resetProfile } = useProfile();

  const [customAllergyInput, setCustomAllergyInput] = useState('');
  const [customDietInput, setCustomDietInput] = useState('');
  const [customAvoidInput, setCustomAvoidInput] = useState('');
  const [notification, setNotification] = useState<string | null>(null);

  const showFeedback = (msg: string) => {
    setNotification(msg);
    setTimeout(() => setNotification(null), 2500);
  };

  const handleReset = () => {
    resetProfile();
    setCustomAllergyInput('');
    setCustomDietInput('');
    setCustomAvoidInput('');
    showFeedback('PROFILE RESET TO DEFAULT PRESETS');
  };

  const toggleItem = (category: 'allergies' | 'diets' | 'avoidIngredients', value: string) => {
    const list = userProfile[category];
    const exists = list.includes(value);
    const updated = exists ? list.filter((item) => item !== value) : [...list, value];
    updateProfile({ [category]: updated });
  };

  const handleAddCustom = (category: 'allergies' | 'diets' | 'avoidIngredients', value: string) => {
    const trimmed = value.trim();
    if (!trimmed) return;
    if (!userProfile[category].includes(trimmed)) {
      updateProfile({ [category]: [...userProfile[category], trimmed] });
    }
    if (category === 'allergies') setCustomAllergyInput('');
    if (category === 'diets') setCustomDietInput('');
    if (category === 'avoidIngredients') setCustomAvoidInput('');
  };

  return (
    <div className="min-h-screen bg-[#030303] py-16 px-6 md:px-16 text-[#F5F5F7]">
      <div className="mx-auto max-w-4xl space-y-12">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/15 pb-8">
          <div className="space-y-2">
            <h1 className="font-display text-5xl font-black tracking-tight text-white uppercase sm:text-6xl">
              YOUR PROFILE
            </h1>
            <p className="text-base font-bold text-white/70">
              Configure your allergies, dietary requirements, and custom avoided ingredients.
            </p>
          </div>

          <button
            onClick={handleReset}
            className="inline-flex items-center space-x-2 rounded-xl border-2 border-white/20 bg-white/5 px-5 py-3 text-xs font-black text-white hover:bg-white/15 hover:border-white/40 transition-all uppercase tracking-wider self-start sm:self-center"
          >
            <RotateCcw className="h-4 w-4" />
            <span>RESET DEFAULTS</span>
          </button>
        </div>

        {/* Feedback Notification Banner */}
        {notification && (
          <div className="rounded-xl border-2 border-emerald-400 bg-emerald-500/10 p-4 text-center font-mono text-xs font-black tracking-widest text-emerald-400 uppercase shadow-lg animate-fade-in">
            {notification}
          </div>
        )}

        {/* Preset Loaders */}
        <div className="space-y-3">
          <span className="font-mono text-xs font-black tracking-widest text-white/60 uppercase block">
            QUICK PRESET PROFILES
          </span>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {PRESET_PROFILES.map((preset) => (
              <button
                key={preset.label}
                onClick={() => {
                  updateProfile(preset.profile);
                  showFeedback(`LOADED ${preset.label.toUpperCase()}`);
                }}
                className="flex items-center justify-between rounded-xl border-2 border-white/15 bg-[#0B0B0F] p-4 text-left font-bold text-white hover:border-white/40 hover:bg-[#121218] transition-all shadow-md"
              >
                <span className="text-sm font-extrabold">{preset.label}</span>
                <ShieldCheck className="h-5 w-5 text-emerald-400" />
              </button>
            ))}
          </div>
        </div>

        {/* SECTION 1: ALLERGIES & INTOLERANCES */}
        <div className="space-y-4 pt-4 border-t border-white/10">
          <div className="flex items-center justify-between">
            <h2 className="font-display text-2xl font-black text-white uppercase tracking-wide">
              ALLERGIES & INTOLERANCES ({userProfile.allergies.length})
            </h2>
          </div>

          {/* Grid of Toggle Tags */}
          <div className="flex flex-wrap gap-2.5">
            {ALLERGEN_OPTIONS.map((allergy) => {
              const selected = userProfile.allergies.includes(allergy);
              return (
                <button
                  key={allergy}
                  onClick={() => toggleItem('allergies', allergy)}
                  className={`flex items-center space-x-2 rounded-xl border-2 px-4 py-2.5 text-sm font-extrabold tracking-wide uppercase transition-all ${
                    selected
                      ? 'border-red-500 bg-red-500/20 text-white shadow-[0_0_15px_rgba(239,68,68,0.3)]'
                      : 'border-white/15 bg-white/5 text-white/70 hover:border-white/30 hover:text-white'
                  }`}
                >
                  <span>{allergy}</span>
                  {selected ? <Check className="h-4 w-4 text-red-400" /> : <Plus className="h-4 w-4 text-white/40" />}
                </button>
              );
            })}
          </div>

          {/* Add Custom Allergy Input */}
          <div className="flex items-center space-x-3 pt-2 max-w-md">
            <input
              type="text"
              value={customAllergyInput}
              onChange={(e) => setCustomAllergyInput(e.target.value)}
              placeholder="Add custom allergy e.g. Sulfites..."
              onKeyDown={(e) => e.key === 'Enter' && handleAddCustom('allergies', customAllergyInput)}
              className="w-full rounded-xl border-2 border-white/15 bg-[#0B0B0F] px-4 py-2.5 text-sm font-extrabold text-white placeholder-white/40 focus:border-white focus:outline-none"
            />
            <button
              onClick={() => handleAddCustom('allergies', customAllergyInput)}
              className="rounded-xl border-2 border-white/20 bg-white px-5 py-2.5 text-xs font-black text-black uppercase tracking-wider hover:bg-white/90 transition-all shrink-0"
            >
              ADD
            </button>
          </div>
        </div>

        {/* SECTION 2: DIETARY REQUIREMENTS */}
        <div className="space-y-4 pt-6 border-t border-white/10">
          <div className="flex items-center justify-between">
            <h2 className="font-display text-2xl font-black text-white uppercase tracking-wide">
              DIETARY REQUIREMENTS ({userProfile.diets.length})
            </h2>
          </div>

          {/* Grid of Toggle Tags */}
          <div className="flex flex-wrap gap-2.5">
            {DIET_OPTIONS.map((diet) => {
              const selected = userProfile.diets.includes(diet);
              return (
                <button
                  key={diet}
                  onClick={() => toggleItem('diets', diet)}
                  className={`flex items-center space-x-2 rounded-xl border-2 px-4 py-2.5 text-sm font-extrabold tracking-wide uppercase transition-all ${
                    selected
                      ? 'border-emerald-500 bg-emerald-500/20 text-white shadow-[0_0_15px_rgba(16,185,129,0.3)]'
                      : 'border-white/15 bg-white/5 text-white/70 hover:border-white/30 hover:text-white'
                  }`}
                >
                  <span>{diet}</span>
                  {selected ? <Check className="h-4 w-4 text-emerald-400" /> : <Plus className="h-4 w-4 text-white/40" />}
                </button>
              );
            })}
          </div>

          {/* Add Custom Diet Input */}
          <div className="flex items-center space-x-3 pt-2 max-w-md">
            <input
              type="text"
              value={customDietInput}
              onChange={(e) => setCustomDietInput(e.target.value)}
              placeholder="Add custom diet e.g. Keto..."
              onKeyDown={(e) => e.key === 'Enter' && handleAddCustom('diets', customDietInput)}
              className="w-full rounded-xl border-2 border-white/15 bg-[#0B0B0F] px-4 py-2.5 text-sm font-extrabold text-white placeholder-white/40 focus:border-white focus:outline-none"
            />
            <button
              onClick={() => handleAddCustom('diets', customDietInput)}
              className="rounded-xl border-2 border-white/20 bg-white px-5 py-2.5 text-xs font-black text-black uppercase tracking-wider hover:bg-white/90 transition-all shrink-0"
            >
              ADD
            </button>
          </div>
        </div>

        {/* SECTION 3: CUSTOM AVOIDED INGREDIENTS */}
        <div className="space-y-4 pt-6 border-t border-white/10">
          <div className="flex items-center justify-between">
            <h2 className="font-display text-2xl font-black text-white uppercase tracking-wide">
              CUSTOM AVOIDED INGREDIENTS ({userProfile.avoidIngredients.length})
            </h2>
          </div>

          <div className="flex flex-wrap gap-2.5">
            {userProfile.avoidIngredients.map((ing) => (
              <span
                key={ing}
                className="flex items-center space-x-2 rounded-xl border-2 border-amber-500/50 bg-amber-500/10 px-4 py-2.5 text-sm font-extrabold text-amber-300 uppercase tracking-wide shadow-sm"
              >
                <span>{ing}</span>
                <button
                  onClick={() => toggleItem('avoidIngredients', ing)}
                  className="text-amber-400 hover:text-white transition-colors"
                >
                  <X className="h-4 w-4" />
                </button>
              </span>
            ))}
          </div>

          {/* Add Custom Ingredient Input */}
          <div className="flex items-center space-x-3 pt-2 max-w-md">
            <input
              type="text"
              value={customAvoidInput}
              onChange={(e) => setCustomAvoidInput(e.target.value)}
              placeholder="Add ingredient e.g. High Fructose Corn Syrup..."
              onKeyDown={(e) => e.key === 'Enter' && handleAddCustom('avoidIngredients', customAvoidInput)}
              className="w-full rounded-xl border-2 border-white/15 bg-[#0B0B0F] px-4 py-2.5 text-sm font-extrabold text-white placeholder-white/40 focus:border-white focus:outline-none"
            />
            <button
              onClick={() => handleAddCustom('avoidIngredients', customAvoidInput)}
              className="rounded-xl border-2 border-white/20 bg-white px-5 py-2.5 text-xs font-black text-black uppercase tracking-wider hover:bg-white/90 transition-all shrink-0"
            >
              ADD
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
