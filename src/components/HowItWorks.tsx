import React from 'react';
import { MessageSquare, Users, CheckCircle, UserCheck, Shield } from 'lucide-react';

const steps = [
  {
    icon: MessageSquare,
    title: "Share Your Family's Needs",
    description: "Tell us what you're looking for—full-time, part-time, live-in, or after-school help. Share your child's age, schedule, and any special requirements."
  },
  {
    icon: Users,
    title: "We Find the Right Matches",
    description: "We connect you with pre-vetted, background-checked nannies in your area who meet your criteria."
  },
  {
    icon: CheckCircle,
    title: "Compare & Interview",
    description: "Review detailed profiles, set up interviews, and get references. Every nanny we recommend has passed safety screenings."
  },
  {
    icon: UserCheck,
    title: "Choose with Confidence",
    description: "Select the nanny who feels like the right fit for your family. We support you through contracts, payroll guidance, and onboarding."
  },
  {
    icon: Shield,
    title: "Ongoing Support",
    description: "We're here even after placement, offering replacement guarantees and ongoing check-ins for peace of mind."
  }
];

export default function HowItWorks() {
  return (
    <section id="how-it-works" className="py-16 bg-warm-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            How It Works
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Our proven 5-step process ensures you find the perfect nanny for your family
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          {steps.map((step, index) => (
            <div key={index} className="relative">
              <div className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow duration-300 h-full">
                <div className="flex flex-col items-center text-center">
                  <div className="bg-sage-light rounded-full p-4 mb-4">
                    <step.icon className="h-8 w-8 text-lime-green" />
                  </div>
                  <div className="bg-warm-peach text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold mb-4">
                    {index + 1}
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">
                    {step.title}
                  </h3>
                  <p className="text-gray-600 text-sm leading-relaxed">
                    {step.description}
                  </p>
                </div>
              </div>
              
              {/* Connection line */}
              {index < steps.length - 1 && (
                <div className="hidden lg:block absolute top-1/2 -right-4 w-8 h-px bg-gray-300 transform -translate-y-1/2"></div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}