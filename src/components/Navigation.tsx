import React from 'react';
import { Menu, X } from 'lucide-react';

interface NavigationProps {
  onFormOpen: () => void;
}

export default function Navigation({ onFormOpen }: NavigationProps) {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);

  return (
    <nav className="bg-white shadow-sm border-b border-gray-100 sticky top-0 z-40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          <div className="flex items-center space-x-2">
            <img src="/image.png" alt="Household Harmony Agency" className="h-10 w-auto" />
            <span className="text-xl font-bold text-gray-900">Household Harmony Agency</span>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <div className="flex items-center space-x-6">
              <a href="#how-it-works" className="text-warm-gray-700 hover:text-coral-600 font-medium transition-colors">
                How It Works
              </a>
              <a href="#testimonials" className="text-warm-gray-700 hover:text-coral-600 font-medium transition-colors">
                Testimonials
              </a>
              <a href="#about" className="text-warm-gray-700 hover:text-coral-600 font-medium transition-colors">
                About
              </a>
            </div>

            <button
              onClick={onFormOpen}
              className="bg-coral-500 text-white px-6 py-2 rounded-lg hover:bg-coral-600 transition-colors font-medium"
            >
              Get Started
            </button>
          </div>

          {/* Mobile menu button */}
          <button
            className="md:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? (
              <X className="h-6 w-6 text-gray-600" />
            ) : (
              <Menu className="h-6 w-6 text-gray-600" />
            )}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden border-t border-gray-100 py-4">
            <div className="space-y-4">
              <a href="#how-it-works" className="block text-warm-gray-700 hover:text-coral-600">How It Works</a>
              <a href="#testimonials" className="block text-warm-gray-700 hover:text-coral-600">Testimonials</a>
              <a href="#about" className="block text-warm-gray-700 hover:text-coral-600">About</a>
              <button
                onClick={onFormOpen}
                className="w-full bg-warm-peach text-white px-6 py-2 rounded-lg hover:bg-coral-pink transition-colors font-medium"
              >
                Get Started
              </button>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}