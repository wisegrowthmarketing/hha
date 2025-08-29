import React, { useState } from 'react';
import Navigation from './components/Navigation';
import Hero from './components/Hero';
import HowItWorks from './components/HowItWorks';
import Testimonials from './components/Testimonials';
import Footer from './components/Footer';
import MultiStepForm from './components/MultiStepForm';

function App() {
  const [isFormOpen, setIsFormOpen] = useState(false);

  return (
    <div className="min-h-screen bg-white">
      <Navigation onFormOpen={() => setIsFormOpen(true)} />
      <Hero onFormOpen={() => setIsFormOpen(true)} />
      <HowItWorks />
      <Testimonials />
      <Footer />
      
      <MultiStepForm 
        isOpen={isFormOpen} 
        onClose={() => setIsFormOpen(false)} 
      />
    </div>
  );
}

export default App;