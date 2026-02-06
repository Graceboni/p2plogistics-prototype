
import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Features from './components/Features';
import HowItWorks from './components/HowItWorks';
import TariffSection from './components/TariffSection';
import ContactSection from './components/ContactSection';
import Footer from './components/Footer';
import AIShippingAssistant from './components/AIShippingAssistant';
import { ServicesPage, TariffsPage, HowItWorksPage, ContactPage } from './components/InnerPages';

export type View = 'home' | 'services' | 'tariffs' | 'how-it-works' | 'contact';

const App: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [currentView, setCurrentView] = useState<View>('home');

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Handle back to top on view change
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [currentView]);

  const renderView = () => {
    switch (currentView) {
      case 'services':
        return <ServicesPage />;
      case 'tariffs':
        return <TariffsPage />;
      case 'how-it-works':
        return <HowItWorksPage />;
      case 'contact':
        return <ContactPage />;
      default:
        return (
          <>
            <Hero />
            <Features />
            <HowItWorks />
            <TariffSection />
            <ContactSection />
          </>
        );
    }
  };

  return (
    <div className="min-h-screen font-montserrat flex flex-col">
      <Navbar 
        isScrolled={isScrolled} 
        currentView={currentView} 
        setView={setCurrentView} 
      />
      
      <main className="flex-grow">
        {renderView()}
      </main>

      <Footer />
      
      <AIShippingAssistant />
    </div>
  );
};

export default App;
