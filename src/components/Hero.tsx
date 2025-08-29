import React, { useState } from 'react';
import { Search, Shield, Users, Heart } from 'lucide-react';

interface HeroProps {
  onFormOpen: () => void;
}

export default function Hero({ onFormOpen }: HeroProps) {
  const [zipCode, setZipCode] = useState('');

  const handleSearch = () => {
    onFormOpen();
  };

  return (
    <div className="relative bg-gradient-to-br from-warm-gray-600 via-sage-600 to-sage-dark min-h-[600px] flex items-center overflow-hidden">
      {/* Background pattern */}
      <div className="absolute inset-0 bg-black/20"></div>
      <div 
        className="absolute inset-0 opacity-10"
        style={{
          backgroundImage: `url('/IMG_1248.jpg')`,
          backgroundSize: '120%',
          backgroundPosition: 'center top'
        }}
      ></div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center py-16">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 leading-tight">
            Find a trusted nanny for your family
          </h1>
          <p className="text-xl md:text-2xl text-blue-100 mb-8 font-light">
            Quickly, safely, and with confidence
          </p>

          {/* Search Section */}
          <div className="bg-white rounded-2xl p-6 md:p-8 shadow-2xl max-w-2xl mx-auto mb-8">
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="flex-[3]">
                <input
                  type="text"
                  placeholder="Enter your ZIP code"
                  value={zipCode}
                  onChange={(e) => setZipCode(e.target.value)}
                  className="w-full px-4 py-3 text-lg border border-warm-gray-300 rounded-lg focus:ring-2 focus:ring-coral-500 focus:border-transparent"
                />
              </div>
              <button
                onClick={handleSearch}
                className="bg-warm-peach text-white px-8 py-3 rounded-lg hover:bg-coral-pink transition-all duration-200 font-semibold text-lg flex items-center justify-center space-x-2 transform hover:scale-105 flex-1"
              >
                <Search className="h-5 w-5" />
                <span>Search</span>
              </button>
            </div>
            <p className="text-center text-gray-600 mt-4 font-medium">
              Find the best nanny for you from qualified, background-checked professionals!
            </p>
          </div>

          {/* Trust Indicators */}
          <div className="flex flex-wrap justify-center items-center gap-6 text-white/80 mb-8">
            <div className="flex items-center space-x-2">
              <Shield className="h-5 w-5" />
              <span>Background Checked</span>
            </div>
            <div className="flex items-center space-x-2">
              <Users className="h-5 w-5" />
              <span>Pre-Vetted Professionals</span>
            </div>
            <div className="flex items-center space-x-2">
              <Heart className="h-5 w-5" />
              <span>Trusted by 10,000+ Families</span>
            </div>
          </div>

          {/* Press Mentions */}
          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6">
            <p className="text-white/70 text-sm mb-4">As featured in</p>
            <div className="flex flex-wrap justify-center items-center gap-8 opacity-70">
              <span className="text-white font-medium">Parents Magazine</span>
              <span className="text-white font-medium">Family Circle</span>
              <span className="text-white font-medium">Local News 5</span>
              <span className="text-white font-medium">Working Mother</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}