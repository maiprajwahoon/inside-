import React from 'react';
import { motion } from 'framer-motion';
import type { AnalysisResult } from '../../lib/types';
import { useProfile } from '../../context/ProfileContext';
import { ShieldAlert, AlertTriangle, CheckCircle, ArrowDown } from 'lucide-react';

interface WhyFlaggedDiagramProps {
  analysis: AnalysisResult;
}

export const WhyFlaggedDiagram: React.FC<WhyFlaggedDiagramProps> = ({ analysis }) => {
  const { userProfile } = useProfile();

  const flaggedItem = analysis.ingredientAnalysis.find(
    (item) => item.status === 'RED' || item.status === 'AMBER'
  );

  const profileFlag = flaggedItem?.flaggedBy?.[0] || userProfile.allergies[0] || 'Lactose Intolerant';
  const ingName = flaggedItem?.ingredient.name || 'Milk Solids / Lactose';

  return (
    <div className="rounded-3xl border border-white/10 bg-[#09090D] p-8 backdrop-blur-xl space-y-6">
      <div className="flex items-center justify-between border-b border-white/10 pb-4">
        <div>
          <span className="text-[10px] font-bold tracking-widest text-white/50 uppercase font-mono">
            CONFLICT LOGIC ENGINE
          </span>
          <h3 className="font-display text-xl font-bold tracking-wide text-white uppercase">
            WHY WAS THIS FLAGGED?
          </h3>
        </div>

        <span
          className={`rounded-full border px-3 py-1 text-xs font-bold ${
            analysis.overallStatus === 'NOT_RECOMMENDED'
              ? 'border-red-500/40 bg-red-500/15 text-red-300'
              : analysis.overallStatus === 'CAUTION'
              ? 'border-amber-500/40 bg-amber-500/15 text-amber-300'
              : 'border-emerald-500/40 bg-emerald-500/15 text-emerald-300'
          }`}
        >
          {analysis.statusLabel}
        </span>
      </div>

      {/* Vertical Animated Flowchart */}
      <div className="relative mx-auto max-w-xl space-y-4 py-2">
        {/* Node 1: YOUR PROFILE */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="flex items-center space-x-4 rounded-2xl border border-white/15 bg-white/5 p-4"
        >
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/10 text-white font-mono text-xs font-bold">
            01
          </div>
          <div>
            <span className="text-[10px] font-mono text-white/40 block">YOUR ACTIVE PROFILE</span>
            <span className="text-sm font-bold text-white uppercase">{profileFlag}</span>
          </div>
        </motion.div>

        {/* Animated Connecting Line 1 */}
        <div className="flex justify-center my-1">
          <motion.div
            initial={{ scaleY: 0 }}
            whileInView={{ scaleY: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: 0.3 }}
            className="flex flex-col items-center"
          >
            <div className="h-6 w-0.5 bg-gradient-to-b from-white/30 to-white/80" />
            <ArrowDown className="h-4 w-4 text-white/80 -mt-1" />
          </motion.div>
        </div>

        {/* Node 2: PRODUCT INGREDIENT */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="flex items-center space-x-4 rounded-2xl border border-white/15 bg-white/5 p-4"
        >
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/10 text-white font-mono text-xs font-bold">
            02
          </div>
          <div>
            <span className="text-[10px] font-mono text-white/40 block">PRODUCT INGREDIENT</span>
            <span className="text-sm font-bold text-white uppercase">{ingName}</span>
          </div>
        </motion.div>

        {/* Animated Connecting Line 2 */}
        <div className="flex justify-center my-1">
          <motion.div
            initial={{ scaleY: 0 }}
            whileInView={{ scaleY: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: 0.5 }}
            className="flex flex-col items-center"
          >
            <div className="h-6 w-0.5 bg-gradient-to-b from-white/30 to-red-400" />
            <ArrowDown className="h-4 w-4 text-red-400 -mt-1" />
          </motion.div>
        </div>

        {/* Node 3: MATCH DETECTED */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="flex items-center space-x-4 rounded-2xl border border-red-500/30 bg-red-500/10 p-4"
        >
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-red-500/20 text-red-300 font-mono text-xs font-bold">
            03
          </div>
          <div>
            <span className="text-[10px] font-mono text-red-300/80 block uppercase">MATCH DETECTED</span>
            <span className="text-sm font-bold text-red-200">
              {flaggedItem?.reason || 'Direct conflict with your profile parameters.'}
            </span>
          </div>
        </motion.div>

        {/* Animated Connecting Line 3 */}
        <div className="flex justify-center my-1">
          <motion.div
            initial={{ scaleY: 0 }}
            whileInView={{ scaleY: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: 0.7 }}
            className="flex flex-col items-center"
          >
            <div className="h-6 w-0.5 bg-red-500" />
            <ArrowDown className="h-4 w-4 text-red-500 -mt-1" />
          </motion.div>
        </div>

        {/* Node 4: PERSONALIZED WARNING */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className={`flex items-center space-x-4 rounded-2xl border p-5 ${
            analysis.overallStatus === 'NOT_RECOMMENDED'
              ? 'border-red-500 bg-red-950/40 text-red-200 shadow-[0_0_30px_rgba(239,68,68,0.2)]'
              : analysis.overallStatus === 'CAUTION'
              ? 'border-amber-500 bg-amber-950/40 text-amber-200 shadow-[0_0_30px_rgba(245,158,11,0.2)]'
              : 'border-emerald-500 bg-emerald-950/40 text-emerald-200'
          }`}
        >
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-white/10">
            {analysis.overallStatus === 'NOT_RECOMMENDED' ? (
              <ShieldAlert className="h-6 w-6 text-red-400" />
            ) : analysis.overallStatus === 'CAUTION' ? (
              <AlertTriangle className="h-6 w-6 text-amber-400" />
            ) : (
              <CheckCircle className="h-6 w-6 text-emerald-400" />
            )}
          </div>
          <div>
            <span className="text-[10px] font-mono tracking-widest uppercase opacity-80 block">
              FINAL EVALUATION RESULT
            </span>
            <span className="font-display text-lg font-black tracking-wide uppercase">
              🔴 {analysis.statusLabel}
            </span>
          </div>
        </motion.div>
      </div>
    </div>
  );
};
