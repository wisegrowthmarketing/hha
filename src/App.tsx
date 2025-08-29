import React, { useState, useEffect } from 'react';
import Navigation from './components/Navigation';
import Hero from './components/Hero';
import HowItWorks from './components/HowItWorks';
import Testimonials from './components/Testimonials';
import Footer from './components/Footer';
import MultiStepForm from './components/MultiStepForm';

function App() {
  const [isFormOpen, setIsFormOpen] = useState(false);

  // Check URL parameters on component mount
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const shouldOpenForm = urlParams.get('form') === 'open' || 
                          urlParams.get('modal') === 'open' ||
                          urlParams.get('start') === 'true';
    
    if (shouldOpenForm) {
      setIsFormOpen(true);
    }
  }, []);

  // Pass URL parameters to form for step navigation
  const getInitialStep = () => {
    const urlParams = new URLSearchParams(window.location.search);
    const step = urlParams.get('step');
    return step ? parseInt(step) : 1;
  };

  const openForm = () => {
    setIsFormOpen(true);
    // Update URL to include form parameter (without adding to history)
    const url = new URL(window.location.href);
    url.searchParams.set('form', 'open');
    window.history.replaceState({}, '', url);
  };

  const closeForm = () => {
    setIsFormOpen(false);
    // Remove form parameter from URL (without adding to history)
    const url = new URL(window.location.href);
    url.searchParams.delete('form');
    window.history.replaceState({}, '', url);
  };

  return (
    <div className="min-h-screen bg-white">
      <Navigation onFormOpen={openForm} />
      <Hero onFormOpen={openForm} />
      <HowItWorks />
      <Testimonials />
      <Footer />
      
      <MultiStepForm 
        isOpen={isFormOpen} 
        onClose={closeForm}
        initialStep={getInitialStep()}
      />
    </div>
  );
}

export default App;