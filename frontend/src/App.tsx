import React, { useState } from 'react';
import { ThemeProvider } from './context/ThemeContext';
import { AuthProvider, useAuth } from './context/AuthContext';
import { CarbonPriceProvider } from './context/CarbonPriceContext';
import { EnvironmentalProvider } from './context/EnvironmentalContext'; // <-- Only this new import
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';
import LandingPage from './components/landing/LandingPage';
import Dashboard from './components/dashboard/Dashboard';
import Marketplace from './components/dashboard/Marketplace';
import CarbonProjects from './components/carbon/CarbonProjects';
import CarbonNews from './components/carbon/CarbonNews';
import CarbonCalculator from './components/calculator/CarbonCalculator';
import ImpactDashboard from './components/impact/ImpactDashboard'; // <-- Only this new component
import Modal from './components/ui/Modal';
import RegisterLogin from './components/auth/RegisterLogin';

type Page = 'dashboard' | 'marketplace' | 'projects' | 'news' | 'calculator' | 'impact'; // <-- Added 'impact'

const AppContent: React.FC = () => {
  const { isLoggedIn } = useAuth();
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [activePage, setActivePage] = useState<Page>('dashboard');

  const handleAuthSuccess = () => {
    setShowAuthModal(false);
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors">
      <Header 
        onOpenAuthModal={() => setShowAuthModal(true)} 
        activePage={activePage} 
        onPageChange={setActivePage}
      />
      
      <main className="flex-grow">
        {isLoggedIn ? (
          {
            'dashboard': <Dashboard />,
            'marketplace': <Marketplace />,
            'projects': <CarbonProjects />,
            'news': <CarbonNews />,
            'calculator': <CarbonCalculator />,
            'impact': <ImpactDashboard /> // <-- Added this route
          }[activePage]
        ) : (
          <LandingPage onOpenAuthModal={() => setShowAuthModal(true)} />
        )}
      </main>
      
      <Footer />
      
      <Modal 
        isOpen={showAuthModal} 
        onClose={() => setShowAuthModal(false)}
        title="Login or Register"
      >
        <RegisterLogin onSuccess={handleAuthSuccess} />
      </Modal>
    </div>
  );
};

function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <CarbonPriceProvider>
          <EnvironmentalProvider> {/* <-- Only this new provider */}
            <AppContent />
          </EnvironmentalProvider>
        </CarbonPriceProvider>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;