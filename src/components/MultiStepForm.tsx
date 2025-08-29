import React, { useState } from 'react';
import { X, ChevronLeft, ChevronRight, Check } from 'lucide-react';
import { FormData } from '../types/form';

interface MultiStepFormProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function MultiStepForm({ isOpen, onClose }: MultiStepFormProps) {
  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [formData, setFormData] = useState<FormData>({
    careType: '',
    hourlyRate: '',
    schedule: '',
    budgetRange: '',
    urgency: '',
    fullName: '',
    email: '',
    phone: '',
    zipCode: '',
    textOptIn: false
  });

  const totalSteps = 6;

  const handleNext = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrev = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSubmit = async () => {
    // Validate required fields
    if (!formData.fullName || !formData.email || !formData.phone || !formData.zipCode) {
      alert('Please fill in all required fields including zip code.');
      return;
    }

    // Validate email format
    if (!validateEmail(formData.email)) {
      alert('Please enter a valid email address.');
      return;
    }

    // Validate phone number
    if (!validatePhone(formData.phone)) {
      alert('Please enter a valid phone number (at least 10 digits).');
      return;
    }

    console.log('=== FORM SUBMISSION START ===');
    console.log('Form Data for CRM:', formData);
    console.log('Current step:', currentStep);
    console.log('Total steps:', totalSteps);
    
    // Send email using Resend
    try {
      console.log('Attempting to send email...');
      console.log('API Key available:', !!import.meta.env.VITE_RESEND_API_KEY);
      console.log('API Key length:', import.meta.env.VITE_RESEND_API_KEY?.length || 0);
      
      const emailHtml = `
        <h2>New Nanny Request Form Submission</h2>
        
        <h3>Service Details:</h3>
        <ul>
          <li><strong>Care Type:</strong> ${formData.careType}</li>
          <li><strong>Hourly Rate:</strong> ${formData.hourlyRate}</li>
          <li><strong>Schedule:</strong> ${formData.schedule}</li>
          <li><strong>Urgency:</strong> ${formData.urgency}</li>
        </ul>
        
        <h3>Contact Information:</h3>
        <ul>
          <li><strong>Name:</strong> ${formData.fullName}</li>
          <li><strong>Email:</strong> ${formData.email}</li>
          <li><strong>Phone:</strong> ${formData.phone}</li>
          <li><strong>Zip Code:</strong> ${formData.zipCode}</li>
          <li><strong>Text Opt-in:</strong> ${formData.textOptIn ? 'Yes' : 'No'}</li>
        </ul>
      `;

      const emailData = {
        from: 'Household Harmony <noreply@mg.householdharmonyagency.com>',
        to: 'taylor@wisegrowthmarketing.com',
        subject: `New Nanny Request - ${formData.fullName}`,
        html: emailHtml
      };
      
      console.log('Email data:', emailData);
      console.log('About to call Resend API directly...');
      
      // Use fetch directly to avoid CORS issues
      const response = await fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${import.meta.env.VITE_RESEND_API_KEY}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(emailData)
      });
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(`Resend API error: ${response.status} - ${errorData.message || 'Unknown error'}`);
      }
      
      const result = await response.json();
      console.log('Email sent successfully!', result);
      console.log('=== FORM SUBMISSION SUCCESS ===');
      
      setIsSubmitted(true);
    } catch (error) {
      console.error('=== FORM SUBMISSION ERROR ===');
      console.error('Error submitting form:', error);
      console.error('Error type:', typeof error);
      if (error instanceof Error) {
        console.error('Error message:', error.message);
        console.error('Error stack:', error.stack);
      }
      console.error('Full error details:', JSON.stringify(error, null, 2));
      alert('There was an error submitting your form. Please try again or contact us directly.');
    }
  };

  const updateFormData = (field: keyof FormData, value: string | boolean) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  // Validation functions
  const validateEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validatePhone = (phone: string): boolean => {
    // Remove all non-digit characters and check length
    const cleanPhone = phone.replace(/\D/g, '');
    return cleanPhone.length >= 10 && cleanPhone.length <= 15;
  };

  if (!isOpen) return null;

  // Show success message after submission
  if (isSubmitted) {
    return (
      <div className="fixed inset-0 z-50 overflow-y-auto">
        <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
          <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" onClick={onClose}></div>

          <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-2xl sm:w-full">
            <div className="bg-white px-6 py-12 text-center">
              <div className="bg-sage-100 rounded-full p-3 w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                <Check className="h-8 w-8 text-sage-600" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Thank You!</h3>
              <p className="text-gray-600 mb-6">Your nanny request has been submitted successfully. We'll be in touch with you soon to discuss your needs and match you with the perfect nanny.</p>
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <button
                  onClick={() => {
                    setIsSubmitted(false);
                    setCurrentStep(1);
                    setFormData({
                      careType: '',
                      hourlyRate: '',
                      schedule: '',
                      budgetRange: '',
                      urgency: '',
                      fullName: '',
                      email: '',
                      phone: '',
                      zipCode: '',
                      textOptIn: false
                    });
                  }}
                  className="bg-coral-500 text-white px-8 py-3 rounded-lg hover:bg-coral-600 transition-colors font-medium"
                >
                  Submit Another Request
                </button>
                <button
                  onClick={onClose}
                  className="bg-sage-600 text-white px-8 py-3 rounded-lg hover:bg-sage-700 transition-colors font-medium"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-4">
            <h3 className="text-xl font-semibold text-gray-900 mb-6">What type of care do you need?</h3>
            <div className="space-y-3">
              {[
                'Full-time',
                'Part-time'
              ].map((option) => (
                <label key={option} className="flex items-center p-4 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer transition-colors">
                  <input
                    type="radio"
                    name="careType"
                    value={option}
                    checked={formData.careType === option}
                    onChange={(e) => updateFormData('careType', e.target.value)}
                    className="h-4 w-4 text-warm-peach focus:ring-warm-peach"
                  />
                  <span className="ml-3 text-gray-700">{option}</span>
                </label>
              ))}
            </div>
          </div>
        );

      case 2:
        return (
          <div className="space-y-4">
            <h3 className="text-xl font-semibold text-gray-900 mb-6">What hourly rate are you expecting?</h3>
            <div className="space-y-3">
              {[
                '$15-$20/hour',
                '$20-$25/hour',
                '$25-$30/hour',
                '$30+/hour'
              ].map((option) => (
                <label key={option} className="flex items-center p-4 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer transition-colors">
                  <input
                    type="radio"
                    name="hourlyRate"
                    value={option}
                    checked={formData.hourlyRate === option}
                    onChange={(e) => updateFormData('hourlyRate', e.target.value)}
                    className="h-4 w-4 text-coral-600 focus:ring-coral-500"
                  />
                  <span className="ml-3 text-gray-700">{option}</span>
                </label>
              ))}
            </div>
          </div>
        );

      case 3:
        return (
          <div className="space-y-4">
            <h3 className="text-xl font-semibold text-gray-900 mb-6">What schedule do you need?</h3>
            <div className="space-y-3">
              {[
                'Weekdays only',
                'Weekends included',
                'Evenings/nights',
                'Flexible schedule'
              ].map((option) => (
                <label key={option} className="flex items-center p-4 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer transition-colors">
                  <input
                    type="radio"
                    name="schedule"
                    value={option}
                    checked={formData.schedule === option}
                    onChange={(e) => updateFormData('schedule', e.target.value)}
                    className="h-4 w-4 text-coral-600 focus:ring-coral-500"
                  />
                  <span className="ml-3 text-gray-700">{option}</span>
                </label>
              ))}
            </div>
          </div>
        );

      case 4:
        return (
          <div className="space-y-4">
            <h3 className="text-xl font-semibold text-gray-900 mb-6">How likely are you to hire a nanny?</h3>
            <div className="space-y-3">
              {[
                "I'm ready to hire now",
                "I'm definitely going to hire",
                "I'm likely to hire",
                "I'm just exploring options"
              ].map((option) => (
                <label key={option} className="flex items-center p-4 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer transition-colors">
                  <input
                    type="radio"
                    name="urgency"
                    value={option}
                    checked={formData.urgency === option}
                    onChange={(e) => updateFormData('urgency', e.target.value)}
                    className="h-4 w-4 text-coral-600 focus:ring-coral-500"
                  />
                  <span className="ml-3 text-gray-700">{option}</span>
                </label>
              ))}
            </div>
          </div>
        );

      case 5:
        return (
          <div className="space-y-6">
            <div className="text-center mb-8">
              <h3 className="text-2xl font-bold text-gray-900 mb-2">Where are you located?</h3>
              <p className="text-gray-600">Please provide your zip code so we can match you with nannies in your area.</p>
            </div>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Zip Code *</label>
                <input
                  type="text"
                  value={formData.zipCode}
                  onChange={(e) => updateFormData('zipCode', e.target.value)}
                  className="w-full px-4 py-3 border border-warm-gray-300 rounded-lg focus:ring-2 focus:ring-coral-500 focus:border-transparent"
                  placeholder="Enter your zip code"
                  required
                />
              </div>
            </div>
          </div>
        );

      case 6:
        return (
          <div className="space-y-6">
            <div className="text-center mb-8">
              <div className="bg-sage-100 rounded-full p-3 w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                <Check className="h-8 w-8 text-sage-600" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-2">Great! We've found you trusted nanny matches.</h3>
              <p className="text-gray-600">Lastly, please share your details so we can connect you with available nannies.</p>
            </div>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Full Name *</label>
                <input
                  type="text"
                  value={formData.fullName}
                  onChange={(e) => updateFormData('fullName', e.target.value)}
                  className="w-full px-4 py-3 border border-warm-gray-300 rounded-lg focus:ring-2 focus:ring-coral-500 focus:border-transparent"
                  placeholder="Enter your full name"
                  required
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Email Address *</label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => updateFormData('email', e.target.value)}
                  className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-coral-500 focus:border-transparent ${
                    formData.email && !validateEmail(formData.email) 
                      ? 'border-red-500' 
                      : 'border-warm-gray-300'
                  }`}
                  placeholder="Enter your email"
                  required
                />
                {formData.email && !validateEmail(formData.email) && (
                  <p className="text-red-500 text-sm mt-1">Please enter a valid email address</p>
                )}
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Phone Number *</label>
                <input
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => updateFormData('phone', e.target.value)}
                  className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-coral-500 focus:border-transparent ${
                    formData.phone && !validatePhone(formData.phone) 
                      ? 'border-red-500' 
                      : 'border-warm-gray-300'
                  }`}
                  placeholder="Enter your phone number"
                  required
                />
                {formData.phone && !validatePhone(formData.phone) && (
                  <p className="text-red-500 text-sm mt-1">Please enter a valid phone number (at least 10 digits)</p>
                )}
              </div>
              
              <div className="flex items-start space-x-3 pt-4">
                <input
                  type="checkbox"
                  checked={formData.textOptIn}
                  onChange={(e) => updateFormData('textOptIn', e.target.checked)}
                  className="h-4 w-4 text-coral-600 focus:ring-coral-500 rounded mt-1"
                />
                <label className="text-sm text-gray-600">I consent to receive text messages from Household Harmony Agency. Message and data rates may apply. Reply STOP to opt out.</label>
              </div>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" onClick={onClose}></div>

        <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-2xl sm:w-full">
          {/* Header */}
          <div className="bg-white px-6 py-4 border-b border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-lg font-medium text-gray-900">Find Your Perfect Nanny</h2>
                <p className="text-sm text-gray-500">Step {currentStep} of {totalSteps}</p>
              </div>
              <button
                onClick={onClose}
                className="text-gray-400 hover:text-gray-600 transition-colors"
              >
                <X className="h-6 w-6" />
              </button>
            </div>
            
            {/* Progress Bar */}
            <div className="mt-4">
              <div className="bg-gray-200 rounded-full h-2">
                <div 
                  className="bg-coral-500 h-2 rounded-full transition-all duration-300"
                  style={{ width: `${(currentStep / totalSteps) * 100}%` }}
                ></div>
              </div>
            </div>
          </div>

          {/* Form Content */}
          <div className="bg-white px-6 py-6">
            {renderStep()}
          </div>

          {/* Footer */}
          <div className="bg-gray-50 px-6 py-4 flex justify-between items-center">
            <button
              onClick={handlePrev}
              disabled={currentStep === 1}
              className="flex items-center space-x-2 px-4 py-2 text-warm-gray-600 hover:text-warm-gray-800 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              <ChevronLeft className="h-4 w-4" />
              <span>Previous</span>
            </button>

            {currentStep === totalSteps ? (
              <button
                onClick={handleSubmit}
                className="bg-sage-600 text-white px-8 py-2 rounded-lg hover:bg-sage-700 transition-colors font-medium"
              >
                Find My Perfect Nanny
              </button>
            ) : (
              <button
                onClick={handleNext}
                className="flex items-center space-x-2 bg-coral-500 text-white px-6 py-2 rounded-lg hover:bg-coral-600 transition-colors font-medium"
              >
                <span>Continue</span>
                <ChevronRight className="h-4 w-4" />
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}