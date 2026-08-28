import React, { useState } from 'react';
import { useProfile } from '../../context/ProfileContext';
import { ALLERGEN_OPTIONS, DIET_OPTIONS } from '../../lib/mock-data';
import type { ActiveTab } from '../../lib/types';
import { Plus, Check, ArrowRight, ShieldCheck, X } from 'lucide-react';

interface OnboardingViewProps {
  onComplete: (tab: ActiveTab) => void;
}

export const OnboardingView: React.FC<OnboardingViewProps> = ({ onComplete }) => {
  const { userProfile, updateProfile } = useProfile();
  const [step, setStep] = useState<1 | 2 | 3>(1);

  const [customAllergyInput, setCustomAllergyInput] = useState('');
  const [customDietInput, setCustomDietInput] = useState('');
  const [customAvoidInput, setCustomAvoidInput] = useState('');

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
    <div className="min-h-screen bg-[#030303] py-20 px-6 md:px-16 text-[#F5F5F7]">
      <div className="mx-auto max-w-3xl space-y-10">
        {/* Progress Bar */}
        <div className="flex items-center justify-between border-b border-white/10 pb-6">
          <div className="flex items-center space-x-3">
            <ShieldCheck className="h-6 w-6 text-emerald-400" />
            <span className="font-display text-xl font-black text-white uppercase tracking-wider">
              PROFILE INITIALIZATION — STEP {step} OF 3
            </span>
          </div>

          <div className="flex space-x-2">
            {[1, 2, 3].map((s) => (
              <div
                key={s}
                className={`h-2 w-12 rounded-full transition-all ${
                  step === s ? 'bg-white' : s < step ? 'bg-emerald-400' : 'bg-white/15'
                }`}
              />
            ))}
          </div>
        </div>

        {/* STEP 1: ALLERGIES */}
        {step === 1 && (
          <div className="space-y-6">
            <div>
              <h2 className="font-display text-4xl font-black uppercase text-white">
                SELECT YOUR ALLERGIES & INTOLERANCES
              </h2>
              <p className="text-base font-bold text-white/60 mt-1">
                Products containing these ingredients will trigger immediate RED warning alerts.
              </p>
            </div>

            <div className="flex flex-wrap gap-3">
              {ALLERGEN_OPTIONS.map((allergy) => {
                const selected = userProfile.allergies.includes(allergy);
                return (
                  <button
                    key={allergy}
                    onClick={() => toggleItem('allergies', allergy)}
                    className={`flex items-center space-x-2 rounded-xl border-2 px-5 py-3 text-sm font-extrabold tracking-wide uppercase transition-all ${
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

            {/* Custom Input */}
            <div className="flex items-center space-x-3 pt-2 max-w-md">
              <input
                type="text"
                value={customAllergyInput}
                onChange={(e) => setCustomAllergyInput(e.target.value)}
                placeholder="Add custom allergy e.g. Sulfites..."
                onKeyDown={(e) => e.key === 'Enter' && handleAddCustom('allergies', customAllergyInput)}
                className="w-full rounded-xl border-2 border-white/15 bg-[#0B0B0F] px-4 py-3 text-sm font-extrabold text-white placeholder-white/40 focus:border-white focus:outline-none"
              />
              <button
                onClick={() => handleAddCustom('allergies', customAllergyInput)}
                className="rounded-xl border-2 border-white/20 bg-white px-5 py-3 text-xs font-black text-black uppercase tracking-wider hover:bg-white/90 transition-all shrink-0"
              >
                ADD
              </button>
            </div>

            <div className="pt-6 flex justify-end">
              <button
                onClick={() => setStep(2)}
                className="flex items-center space-x-3 rounded-xl bg-white px-8 py-4 text-sm font-black text-black uppercase hover:bg-white/90 transition-all"
              >
                <span>NEXT: DIETARY PREFERENCES</span>
                <ArrowRight className="h-4 w-4" />
              </button>
            </div>
          </div>
        )}

        {/* STEP 2: DIETS */}
        {step === 2 && (
          <div className="space-y-6">
            <div>
              <h2 className="font-display text-4xl font-black uppercase text-white">
                SELECT YOUR DIETARY REQUIREMENTS
              </h2>
              <p className="text-base font-bold text-white/60 mt-1">
                Help us flag non-compliant items for your dietary choice.
              </p>
            </div>

            <div className="flex flex-wrap gap-3">
              {DIET_OPTIONS.map((diet) => {
                const selected = userProfile.diets.includes(diet);
                return (
                  <button
                    key={diet}
                    onClick={() => toggleItem('diets', diet)}
                    className={`flex items-center space-x-2 rounded-xl border-2 px-5 py-3 text-sm font-extrabold tracking-wide uppercase transition-all ${
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

            {/* Custom Input */}
            <div className="flex items-center space-x-3 pt-2 max-w-md">
              <input
                type="text"
                value={customDietInput}
                onChange={(e) => setCustomDietInput(e.target.value)}
                placeholder="Add custom diet e.g. Keto..."
                onKeyDown={(e) => e.key === 'Enter' && handleAddCustom('diets', customDietInput)}
                className="w-full rounded-xl border-2 border-white/15 bg-[#0B0B0F] px-4 py-3 text-sm font-extrabold text-white placeholder-white/40 focus:border-white focus:outline-none"
              />
              <button
                onClick={() => handleAddCustom('diets', customDietInput)}
                className="rounded-xl border-2 border-white/20 bg-white px-5 py-3 text-xs font-black text-black uppercase tracking-wider hover:bg-white/90 transition-all shrink-0"
              >
                ADD
              </button>
            </div>

            <div className="pt-6 flex justify-between">
              <button
                onClick={() => setStep(1)}
                className="rounded-xl border border-white/20 bg-white/5 px-6 py-4 text-xs font-bold text-white uppercase hover:bg-white/10"
              >
                BACK
              </button>
              <button
                onClick={() => setStep(3)}
                className="flex items-center space-x-3 rounded-xl bg-white px-8 py-4 text-sm font-black text-black uppercase hover:bg-white/90 transition-all"
              >
                <span>NEXT: AVOIDED INGREDIENTS</span>
                <ArrowRight className="h-4 w-4" />
              </button>
            </div>
          </div>
        )}

        {/* STEP 3: CUSTOM AVOID */}
        {step === 3 && (
          <div className="space-y-6">
            <div>
              <h2 className="font-display text-4xl font-black uppercase text-white">
                SPECIFY AVOIDED INGREDIENTS
              </h2>
              <p className="text-base font-bold text-white/60 mt-1">
                Add specific additives or preservatives you prefer to avoid (e.g. Palm Oil, Artificial Colors).
              </p>
            </div>

            <div className="flex flex-wrap gap-3">
              {userProfile.avoidIngredients.map((ing) => (
                <span
                  key={ing}
                  className="flex items-center space-x-2 rounded-xl border-2 border-amber-500/50 bg-amber-500/10 px-4 py-2.5 text-sm font-extrabold text-amber-300 uppercase tracking-wide"
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

            {/* Custom Input */}
            <div className="flex items-center space-x-3 pt-2 max-w-md">
              <input
                type="text"
                value={customAvoidInput}
                onChange={(e) => setCustomAvoidInput(e.target.value)}
                placeholder="Add ingredient e.g. High Fructose Corn Syrup..."
                onKeyDown={(e) => e.key === 'Enter' && handleAddCustom('avoidIngredients', customAvoidInput)}
                className="w-full rounded-xl border-2 border-white/15 bg-[#0B0B0F] px-4 py-3 text-sm font-extrabold text-white placeholder-white/40 focus:border-white focus:outline-none"
              />
              <button
                onClick={() => handleAddCustom('avoidIngredients', customAvoidInput)}
                className="rounded-xl border-2 border-white/20 bg-white px-5 py-3 text-xs font-black text-black uppercase tracking-wider hover:bg-white/90 transition-all shrink-0"
              >
                ADD
              </button>
            </div>

            <div className="pt-6 flex justify-between">
              <button
                onClick={() => setStep(2)}
                className="rounded-xl border border-white/20 bg-white/5 px-6 py-4 text-xs font-bold text-white uppercase hover:bg-white/10"
              >
                BACK
              </button>
              <button
                onClick={() => onComplete('home')}
                className="flex items-center space-x-3 rounded-xl bg-emerald-400 px-8 py-4 text-sm font-black text-black uppercase hover:bg-emerald-300 transition-all shadow-lg shadow-emerald-400/20"
              >
                <span>COMPLETE SETUP & EXPLORE</span>
                <Check className="h-4 w-4" />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
