import React, { useState } from 'react';
import { MOCK_PRODUCTS } from '../../lib/mock-data';
import type { Product } from '../../lib/types';
import { RefreshCw, Zap } from 'lucide-react';

interface ScannerViewProps {
  onSelectProduct: (product: Product) => void;
}

export const ScannerView: React.FC<ScannerViewProps> = ({ onSelectProduct }) => {
  const [selectedProductIndex, setSelectedProductIndex] = useState(0);
  const [isScanning, setIsScanning] = useState(false);
  const [scanPhase, setScanPhase] = useState<number>(0);

  const sampleProducts = MOCK_PRODUCTS.slice(0, 6);
  const activeSample = sampleProducts[selectedProductIndex];

  const handleCapture = () => {
    setIsScanning(true);
    setScanPhase(1);

    setTimeout(() => setScanPhase(2), 700);
    setTimeout(() => setScanPhase(3), 1400);
    setTimeout(() => setScanPhase(4), 2100);

    setTimeout(() => {
      setIsScanning(false);
      onSelectProduct(activeSample);
    }, 2800);
  };

  return (
    <div className="min-h-screen bg-[#060608] py-16 px-6 md:px-16 text-white">
      <div className="mx-auto max-w-4xl space-y-10">
        {/* Clean Header without pill badge */}
        <div className="flex flex-col items-center text-center space-y-3">
          <h1 className="font-display text-4xl font-extrabold tracking-tight sm:text-5xl uppercase">
            SCAN INGREDIENT LABEL
          </h1>
          <p className="max-w-md text-sm font-bold text-white/60">
            Position any food package ingredient panel within the camera frame below to initiate instant profile analysis.
          </p>
        </div>

        <div className="relative mx-auto max-w-2xl overflow-hidden rounded-3xl border border-white/20 bg-[#0A0A0F] shadow-2xl">
          <div className="relative aspect-[4/3] w-full overflow-hidden bg-gradient-to-b from-[#121218] to-[#08080C]">
            <div className="pointer-events-none absolute inset-8 z-10 rounded-2xl border-2 border-dashed border-white/30 p-6 flex flex-col justify-between">
              <div className="flex justify-between">
                <div className="h-6 w-6 border-t-2 border-l-2 border-white" />
                <div className="h-6 w-6 border-t-2 border-r-2 border-white" />
              </div>
              <div className="flex justify-between">
                <div className="h-6 w-6 border-b-2 border-l-2 border-white" />
                <div className="h-6 w-6 border-b-2 border-r-2 border-white" />
              </div>
            </div>

            <div className="absolute inset-0 flex flex-col items-center justify-center p-12 text-center">
              <div className="w-64 rounded-xl border border-white/15 bg-white/[0.04] p-5 backdrop-blur-md space-y-3 shadow-2xl">
                <div className="flex items-center justify-between border-b border-white/10 pb-2">
                  <span className="text-[10px] font-bold text-white/60 uppercase">
                    {activeSample.brand} — INGREDIENTS
                  </span>
                  <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
                </div>
                <div className="text-left space-y-1">
                  <p className="text-xs font-bold text-white">{activeSample.name}</p>
                  <p className="text-[10px] text-white/50 line-clamp-3">
                    INGREDIENTS: {activeSample.ingredients.map((i) => i.name).join(', ')}
                  </p>
                </div>
              </div>
            </div>

            <div className="pointer-events-none absolute inset-0 z-20 overflow-hidden">
              <div className="h-1 w-full bg-gradient-to-r from-transparent via-emerald-400 to-transparent shadow-[0_0_20px_#10B981] animate-scan" />
            </div>

            <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:40px_40px]" />

            {isScanning && (
              <div className="absolute inset-0 z-30 flex flex-col items-center justify-center bg-black/85 backdrop-blur-md space-y-6">
                <div className="flex h-16 w-16 items-center justify-center rounded-full border border-emerald-500/40 bg-emerald-500/10 text-emerald-400 animate-spin">
                  <RefreshCw className="h-8 w-8" />
                </div>

                <div className="space-y-2 text-center">
                  <div className="text-xs font-mono font-bold tracking-widest text-emerald-400 uppercase">
                    {scanPhase === 1 && 'READING LABEL...'}
                    {scanPhase === 2 && 'IDENTIFYING INGREDIENTS...'}
                    {scanPhase === 3 && 'CHECKING YOUR PROFILE...'}
                    {scanPhase === 4 && 'ANALYZING PRODUCT...'}
                  </div>

                  <div className="flex items-center justify-center space-x-2 text-[10px] text-white/50">
                    <span className={scanPhase >= 1 ? 'text-emerald-400 font-bold' : ''}>1. OCR</span>
                    <span>➔</span>
                    <span className={scanPhase >= 2 ? 'text-emerald-400 font-bold' : ''}>2. EXTRACT</span>
                    <span>➔</span>
                    <span className={scanPhase >= 3 ? 'text-emerald-400 font-bold' : ''}>3. MATCH</span>
                    <span>➔</span>
                    <span className={scanPhase >= 4 ? 'text-emerald-400 font-bold' : ''}>4. EVAL</span>
                  </div>
                </div>
              </div>
            )}
          </div>

          <div className="flex items-center justify-between border-t border-white/10 bg-[#0E0E14] p-6">
            <div>
              <span className="text-[10px] font-mono text-white/40 block">SELECT SAMPLE TARGET</span>
              <div className="flex items-center space-x-2 mt-1">
                {sampleProducts.map((p, idx) => (
                  <button
                    key={p.id}
                    onClick={() => setSelectedProductIndex(idx)}
                    className={`h-7 w-7 rounded-lg border text-[10px] font-bold transition-all ${
                      selectedProductIndex === idx
                        ? 'border-white bg-white text-black'
                        : 'border-white/15 bg-white/5 text-white/60 hover:border-white/30'
                    }`}
                  >
                    {idx + 1}
                  </button>
                ))}
              </div>
            </div>

            <button
              onClick={handleCapture}
              disabled={isScanning}
              className="flex items-center space-x-3 rounded-full bg-white px-8 py-4 text-xs font-extrabold text-black shadow-lg transition-all hover:scale-105 active:scale-95 disabled:opacity-50"
            >
              <Zap className="h-4 w-4 fill-black" />
              <span className="tracking-wider uppercase">CAPTURE & ANALYZE</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
