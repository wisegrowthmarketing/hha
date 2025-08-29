import React from 'react';
import { Facebook, Instagram, Linkedin, Shield, Heart, Award } from 'lucide-react';

export default function Footer() {
  return (
    <footer id="about" className="bg-sage-dark text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Trust Badges */}
        <div className="border-b border-warm-gray-700 pb-8 mb-8">
          <div className="flex flex-wrap justify-center items-center gap-8">
            <div className="flex items-center space-x-2 text-sage-400">
              <Shield className="h-6 w-6" />
              <span className="font-medium">Background Checks</span>
            </div>
            <div className="flex items-center space-x-2 text-coral-400">
              <Heart className="h-6 w-6" />
              <span className="font-medium">CPR/First Aid Verified</span>
            </div>
            <div className="flex items-center space-x-2 text-blue-400">
              <Award className="h-6 w-6" />
              <span className="font-medium">Insurance Support</span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Logo and Description */}
          <div className="md:col-span-1">
            <div className="flex items-center space-x-2 mb-4">
              <img src="/image.png" alt="Household Harmony Agency" className="h-8 w-auto" />
              <span className="text-xl font-bold">Household Harmony</span>
            </div>
            <p className="text-gray-400 text-sm leading-relaxed">
              Connecting families with trusted, background-checked nannies across the country.
            </p>
            <div className="flex space-x-4 mt-6">
              <Facebook className="h-5 w-5 text-warm-gray-400 hover:text-white cursor-pointer transition-colors" />
              <Instagram className="h-5 w-5 text-warm-gray-400 hover:text-white cursor-pointer transition-colors" />
              <Linkedin className="h-5 w-5 text-warm-gray-400 hover:text-white cursor-pointer transition-colors" />
            </div>
          </div>

          {/* For Families */}
          <div>
            <h3 className="font-semibold mb-4">For Families</h3>
            <ul className="space-y-2 text-sm text-warm-gray-400">
              <li><a href="#" className="hover:text-white transition-colors">Find a Nanny</a></li>
              <li><a href="#" className="hover:text-white transition-colors">How It Works</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Parent FAQs</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Login / Dashboard</a></li>
            </ul>
          </div>

          {/* For Nannies */}
          <div>
            <h3 className="font-semibold mb-4">For Nannies</h3>
            <ul className="space-y-2 text-sm text-warm-gray-400">
              <li><a href="#" className="hover:text-white transition-colors">Join as a Professional</a></li>
              <li><a href="#" className="hover:text-white transition-colors">How It Works</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Apply Now</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Nanny FAQs</a></li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="font-semibold mb-4">Company</h3>
            <ul className="space-y-2 text-sm text-warm-gray-400">
              <li><a href="#" className="hover:text-white transition-colors">About Household Harmony</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Our Screening Process</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Safety Standards</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Testimonials</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Blog</a></li>
            </ul>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-warm-gray-700 pt-8 mt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-warm-gray-400 text-sm">
            © 2025 Household Harmony Agency. All rights reserved.
          </p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <a href="#" className="text-warm-gray-400 hover:text-white text-sm transition-colors">Terms & Conditions</a>
            <a href="#" className="text-warm-gray-400 hover:text-white text-sm transition-colors">Privacy Policy</a>
          </div>
        </div>
      </div>
    </footer>
  );
}