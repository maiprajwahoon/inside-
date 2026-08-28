import React, { useState } from 'react';
import { MOCK_PRODUCTS } from '../../lib/mock-data';
import type { Product } from '../../lib/types';
import { Sparkles, Image, RefreshCw, FileText, ArrowRight } from 'lucide-react';

interface UploadViewProps {
  onSelectProduct: (product: Product) => void;
}

export const UploadView: React.FC<UploadViewProps> = ({ onSelectProduct }) => {
  const [selectedProduct, setSelectedProduct] = useState<Product>(MOCK_PRODUCTS[0]);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [isDragOver, setIsDragOver] = useState(false);

  const handleAnalyze = () => {
    setIsAnalyzing(true);
    setTimeout(() => {
      setIsAnalyzing(false);
      onSelectProduct(selectedProduct);
    }, 2200);
  };

  return (
    <div className="min-h-screen bg-[#060608] py-16 px-6 md:px-16 text-white">
      <div className="mx-auto max-w-4xl space-y-10">
        {/* Clean Header without pill badge */}
        <div className="flex flex-col items-center text-center space-y-3">
          <h1 className="font-display text-4xl font-extrabold tracking-tight sm:text-5xl uppercase">
            UPLOAD FOOD LABEL IMAGE
          </h1>
          <p className="max-w-md text-sm font-bold text-white/60">
            Upload a photo of an ingredient panel or nutrition facts label for automated profile matching.
          </p>
        </div>

        <div
          onDragOver={(e) => {
            e.preventDefault();
            setIsDragOver(true);
          }}
          onDragLeave={() => setIsDragOver(false)}
          onDrop={(e) => {
            e.preventDefault();
            setIsDragOver(false);
          }}
          className={`relative overflow-hidden rounded-3xl border-2 border-dashed p-10 text-center transition-all duration-300 ${
            isDragOver
              ? 'border-white bg-white/10 shadow-[0_0_50px_rgba(255,255,255,0.1)]'
              : 'border-white/20 bg-[#0A0A0F] hover:border-white/40'
          }`}
        >
          <div className="space-y-6">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl border border-white/15 bg-white/5 text-white">
              <Image className="h-8 w-8" />
            </div>

            <div className="space-y-1">
              <p className="text-base font-bold text-white">Drag and drop ingredient label image here</p>
              <p className="text-xs text-white/40">PNG, JPG, WEBP up to 10MB</p>
            </div>

            <div className="pt-4 border-t border-white/10">
              <span className="text-[10px] font-bold text-white/50 uppercase tracking-widest block mb-3">
                OR CHOOSE A SAMPLE LABEL IMAGE
              </span>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {MOCK_PRODUCTS.slice(0, 4).map((p) => (
                  <button
                    key={p.id}
                    onClick={() => setSelectedProduct(p)}
                    className={`rounded-xl border p-3 text-left transition-all ${
                      selectedProduct.id === p.id
                        ? 'border-white bg-white/15 text-white shadow-md'
                        : 'border-white/10 bg-white/5 text-white/60 hover:bg-white/10 hover:text-white'
                    }`}
                  >
                    <span className="text-[9px] font-mono text-white/40 block">{p.brand}</span>
                    <span className="text-xs font-bold line-clamp-1">{p.name}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="rounded-2xl border border-white/10 bg-[#0D0D12] p-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center space-x-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-white/10 text-white">
              <FileText className="h-6 w-6" />
            </div>
            <div>
              <span className="text-[10px] font-mono text-white/40">SELECTED FILE PREVIEW</span>
              <h4 className="text-sm font-bold text-white">{selectedProduct.name} (Label_Scan.jpg)</h4>
              <p className="text-xs text-white/50">{selectedProduct.ingredients.length} ingredients detected</p>
            </div>
          </div>

          <button
            onClick={handleAnalyze}
            disabled={isAnalyzing}
            className="flex items-center space-x-3 rounded-full bg-white px-8 py-4 text-xs font-extrabold text-black shadow-lg transition-all hover:scale-105 active:scale-95 disabled:opacity-50"
          >
            {isAnalyzing ? (
              <>
                <RefreshCw className="h-4 w-4 animate-spin text-black" />
                <span className="tracking-wider uppercase">ANALYZING LABEL...</span>
              </>
            ) : (
              <>
                <Sparkles className="h-4 w-4 text-black" />
                <span className="tracking-wider uppercase">RUN PERSONALIZED ANALYSIS</span>
                <ArrowRight className="h-4 w-4 text-black" />
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};
