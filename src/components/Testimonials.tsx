import React from 'react';
import { Star, Quote } from 'lucide-react';

const testimonials = [
  {
    name: "Homero R.",
    location: "",
    text: "We had a fantastic experience finding a nanny for our toddler. The team truly listened to our needs and concerns about our child’s care, making the process smooth and reassuring. I felt understood every step of the way and will definitely be recommending this agency to friends and family!",
    rating: 5
  },
  {
    name: "Rayna B.",
    location: "", 
    text: "My wife and I recently had a baby, and a friend recommended this service to us. As first-time parents, we were understandably nervous about trusting someone to watch our child. However, from the start, we were met with warmth and professionalism. The team truly took the time to understand our needs and made sure to match us with the perfect caregiver for both us and our son. We couldn’t be happier with the experience and would definitely use this service again!",
    rating: 5
  },
  {
    name: "Kellie I",
    location: "",
    text: "We’re so happy with our nanny. She has been wonderful with our son Ben. We used another agency before, but we’ll definitely be reaching out to this one again as communication was easy.",
    rating: 5
  }
];

export default function Testimonials() {
  return (
    <section id="testimonials" className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Trusted by Thousands of Families
          </h2>
          <p className="text-xl text-gray-600">
            See what parents are saying about their Household Harmony experience
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div key={index} className="bg-warm-gray-50 rounded-xl p-6 relative">
              <Quote className="h-8 w-8 text-coral-200 mb-4" />
              <p className="text-warm-gray-700 mb-4 leading-relaxed">"{testimonial.text}"</p>
              
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-semibold text-gray-900">{testimonial.name}</p>
                  {testimonial.location && (
                    <p className="text-sm text-gray-600">{testimonial.location}</p>
                  )}
                </div>
                
                <div className="flex space-x-1">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 text-yellow-400 fill-current" />
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}