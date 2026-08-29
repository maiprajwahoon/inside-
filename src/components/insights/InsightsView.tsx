import { BarChart3, TrendingUp, AlertTriangle, Sprout, CheckCircle2 } from 'lucide-react';

export const InsightsView: React.FC = () => {
  return (
    <div className="min-h-screen bg-[#030303] py-16 px-6 md:px-16 text-[#F5F5F7]">
      <div className="mx-auto max-w-6xl space-y-12">
        {/* Header */}
        <div className="border-b border-white/10 pb-6 space-y-2">
          <span className="text-xs font-mono font-bold tracking-widest text-emerald-400 uppercase flex items-center gap-2">
            <BarChart3 className="h-4 w-4" />
            AGRICULTURAL PRODUCE & POST-HARVEST ANALYTICS
          </span>
          <h1 className="font-display text-4xl sm:text-5xl font-black tracking-tight uppercase text-white">
            PRODUCE INSIGHTS
          </h1>
          <p className="text-sm font-bold text-white/60">
            Real-time quality trends, post-harvest recommendations, and wastage risk indicators.
          </p>
        </div>

        {/* Top Summary KPI Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-4 gap-6">
          <div className="rounded-3xl border border-white/15 bg-[#0A0A0F] p-6 space-y-2 shadow-xl">
            <span className="text-[10px] font-mono text-white/40 uppercase block">TOTAL PRODUCE ANALYZED</span>
            <div className="font-display text-3xl font-black text-white">4,700 kg</div>
            <span className="text-[10px] font-mono text-emerald-400 flex items-center gap-1">
              <TrendingUp className="h-3 w-3" />
              <span>+18% harvest yield this month</span>
            </span>
          </div>

          <div className="rounded-3xl border border-white/15 bg-[#0A0A0F] p-6 space-y-2 shadow-xl">
            <span className="text-[10px] font-mono text-white/40 uppercase block">GRADE A EXPORT QUALITY</span>
            <div className="font-display text-3xl font-black text-emerald-400">84.2%</div>
            <span className="text-[10px] font-mono text-white/50">Based on AI visual assessment</span>
          </div>

          <div className="rounded-3xl border border-white/15 bg-[#0A0A0F] p-6 space-y-2 shadow-xl">
            <span className="text-[10px] font-mono text-white/40 uppercase block">POTENTIAL WASTAGE REDUCTION</span>
            <div className="font-display text-3xl font-black text-amber-300">-76%</div>
            <span className="text-[10px] font-mono text-amber-300/80">Via immediate local matching</span>
          </div>

          <div className="rounded-3xl border border-white/15 bg-[#0A0A0F] p-6 space-y-2 shadow-xl">
            <span className="text-[10px] font-mono text-white/40 uppercase block">SUCCESSFUL BUYER INQUIRIES</span>
            <div className="font-display text-3xl font-black text-white">28 Matches</div>
            <span className="text-[10px] font-mono text-emerald-400">100% verified procurement</span>
          </div>
        </div>

        {/* Post-Harvest Breakdown Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Post-Harvest Pathway Allocation */}
          <div className="rounded-3xl border border-white/15 bg-[#0B0B10] p-8 space-y-6 shadow-2xl">
            <div className="flex items-center justify-between border-b border-white/10 pb-4">
              <div>
                <h3 className="font-display text-xl font-black text-white uppercase">RECOMMENDED PATHWAYS</h3>
                <p className="text-xs font-mono text-white/50">Crop distribution recommended by AI Decision Engine.</p>
              </div>
              <Sprout className="h-5 w-5 text-emerald-400" />
            </div>

            <div className="space-y-4 font-mono text-xs">
              <div className="space-y-1.5">
                <div className="flex justify-between font-bold">
                  <span className="text-white">FRESH RETAIL / LOCAL SALE (SELL NOW)</span>
                  <span className="text-emerald-400">55% (2,585 kg)</span>
                </div>
                <div className="h-2 rounded-full bg-white/10 overflow-hidden">
                  <div className="h-full bg-emerald-400 w-[55%]" />
                </div>
              </div>

              <div className="space-y-1.5">
                <div className="flex justify-between font-bold">
                  <span className="text-white">FOOD PROCESSING & PULPING</span>
                  <span className="text-purple-400">30% (1,410 kg)</span>
                </div>
                <div className="h-2 rounded-full bg-white/10 overflow-hidden">
                  <div className="h-full bg-purple-400 w-[30%]" />
                </div>
              </div>

              <div className="space-y-1.5">
                <div className="flex justify-between font-bold">
                  <span className="text-white">COLD STORAGE HOLDING</span>
                  <span className="text-blue-400">15% (705 kg)</span>
                </div>
                <div className="h-2 rounded-full bg-white/10 overflow-hidden">
                  <div className="h-full bg-blue-400 w-[15%]" />
                </div>
              </div>
            </div>
          </div>

          {/* Leafy Vegetable Wastage Risk Indicator */}
          <div className="rounded-3xl border border-white/15 bg-[#0B0B10] p-8 space-y-6 shadow-2xl">
            <div className="flex items-center justify-between border-b border-white/10 pb-4">
              <div>
                <h3 className="font-display text-xl font-black text-white uppercase">LEAFY VEG PERISHABLE LOGIC</h3>
                <p className="text-xs font-mono text-white/50">Urgency analysis for Spinach, Coriander, & Methi.</p>
              </div>
              <AlertTriangle className="h-5 w-5 text-amber-400" />
            </div>

            <div className="rounded-2xl border border-amber-500/30 bg-amber-500/10 p-5 space-y-3">
              <div className="flex items-center justify-between font-mono text-xs font-bold text-amber-300">
                <span>HIGH PERISHABLE RISK DETECTED</span>
                <span>SPINACH (200 KG)</span>
              </div>
              <p className="text-xs font-mono text-amber-200/80 leading-relaxed">
                Leafy vegetables possess high respiration rates and rapid moisture loss. Without on-farm cold storage, distance-weighted matching prioritizes local buyers within 15 km to ensure zero post-harvest wastage.
              </p>
            </div>

            <div className="pt-2 flex items-center justify-between text-xs font-mono text-white/70">
              <div className="flex items-center space-x-2">
                <CheckCircle2 className="h-4 w-4 text-emerald-400" />
                <span>3 Local Buyers Available (&lt;15 km)</span>
              </div>
              <span className="font-bold text-emerald-400">STATUS: MATCHED</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
