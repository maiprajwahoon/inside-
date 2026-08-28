import React, { useState } from 'react';
import { ProfileProvider } from './context/ProfileContext';
import { HomepageHero } from './components/hero/HomepageHero';
import { Navbar } from './components/layout/Navbar';
import { Footer } from './components/layout/Footer';
import { OnboardingView } from './components/onboarding/OnboardingView';
import { ProfileView } from './components/profile/ProfileView';
import { SearchView } from './components/search/SearchView';
import { ScannerView } from './components/scanner/ScannerView';
import { UploadView } from './components/upload/UploadView';
import { AnalysisResultView } from './components/analysis/AnalysisResultView';
import { CompareView } from './components/compare/CompareView';
import type { ActiveTab, Product } from './lib/types';

const MainApp: React.FC = () => {
  const [activeTab, setActiveTab] = useState<ActiveTab>('home');
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  const handleNavigate = (tab: ActiveTab) => {
    setActiveTab(tab);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSelectProduct = (product: Product) => {
    setSelectedProduct(product);
    setActiveTab('product-detail');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-[#030303] text-[#F5F5F7] flex flex-col justify-between selection:bg-white/20 selection:text-white">
      {/* Show Navbar on all views */}
      <Navbar activeTab={activeTab} onNavigate={handleNavigate} />

      <main className="flex-grow">
        {activeTab === 'home' && (
          <HomepageHero onNavigate={handleNavigate} />
        )}

        {activeTab === 'onboarding' && <OnboardingView onComplete={handleNavigate} />}

        {activeTab === 'profile' && <ProfileView />}

        {activeTab === 'search' && <SearchView onSelectProduct={handleSelectProduct} />}

        {activeTab === 'scan' && <ScannerView onSelectProduct={handleSelectProduct} />}

        {activeTab === 'upload' && <UploadView onSelectProduct={handleSelectProduct} />}

        {activeTab === 'compare' && <CompareView onSelectProduct={handleSelectProduct} />}

        {activeTab === 'product-detail' && selectedProduct && (
          <AnalysisResultView
            product={selectedProduct}
            onBack={() => handleNavigate('search')}
          />
        )}
      </main>

      <Footer onNavigate={handleNavigate} />
    </div>
  );
};

export function App() {
  return (
    <ProfileProvider>
      <MainApp />
    </ProfileProvider>
  );
}

export default App;
