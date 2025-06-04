
import React, { useState } from 'react';
import OTPVerification from './OTPVerification';

interface ContactStepProps {
  onSubmit: (formData: any) => void;
  onPrevious: () => void;
}

const ContactStep: React.FC<ContactStepProps> = ({ onSubmit, onPrevious }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    mobile: '',
    address: ''
  });
  const [showOTP, setShowOTP] = useState(false);
  const [isVerified, setIsVerified] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleMobileSubmit = () => {
    if (formData.mobile.length >= 10) {
      setShowOTP(true);
    }
  };

  const handleOTPVerified = () => {
    setIsVerified(true);
    setShowOTP(false);
  };

  const handleBackFromOTP = () => {
    setShowOTP(false);
  };

  const handleSubmit = () => {
    if (isVerified) {
      onSubmit(formData);
    }
  };

  const isFormValid = formData.name && formData.email && formData.mobile && formData.address && isVerified;

  if (showOTP) {
    return (
      <OTPVerification
        mobile={formData.mobile}
        onVerified={handleOTPVerified}
        onBack={handleBackFromOTP}
      />
    );
  }

  return (
    <div className="animate-fade-in">
      <h2 className="text-2xl md:text-3xl font-semibold text-center mb-4 text-gray-800">
        Your estimate is almost ready
      </h2>
      <p className="text-center text-gray-600 mb-8 md:mb-12 px-4">
        Tailor your space with your ideal configuration
      </p>
      
      <div className="max-w-md mx-auto space-y-4 md:space-y-6 mb-6 md:mb-8 px-4">
        <input
          type="text"
          name="name"
          placeholder="Name"
          value={formData.name}
          onChange={handleInputChange}
          className="w-full px-4 py-3 border border-gray-300 focus:border-yellow-400 focus:outline-none transition-colors rounded"
        />
        <input
          type="email"
          name="email"
          placeholder="Email ID"
          value={formData.email}
          onChange={handleInputChange}
          className="w-full px-4 py-3 border border-gray-300 focus:border-yellow-400 focus:outline-none transition-colors rounded"
        />
        <div className="flex space-x-2">
          <input
            type="tel"
            name="mobile"
            placeholder="Mobile"
            value={formData.mobile}
            onChange={handleInputChange}
            className="flex-1 px-4 py-3 border border-gray-300 focus:border-yellow-400 focus:outline-none transition-colors rounded"
          />
          {formData.mobile.length >= 10 && !isVerified && (
            <button
              onClick={handleMobileSubmit}
              className="px-4 py-3 bg-blue-600 text-white text-sm font-medium hover:bg-blue-700 transition-colors rounded whitespace-nowrap"
            >
              Verify
            </button>
          )}
          {isVerified && (
            <div className="px-4 py-3 bg-green-100 text-green-700 text-sm font-medium rounded flex items-center">
              ✓ Verified
            </div>
          )}
        </div>
        <textarea
          name="address"
          placeholder="Address"
          value={formData.address}
          onChange={handleInputChange}
          rows={3}
          className="w-full px-4 py-3 border border-gray-300 focus:border-yellow-400 focus:outline-none transition-colors resize-none rounded"
        />
      </div>

      <p className="text-center text-xs md:text-sm text-gray-600 mb-6 md:mb-8 px-4">
        By submitting this form, you agree to our{' '}
        <a href="#" className="text-blue-600 underline">privacy policy</a>
      </p>

      <div className="flex justify-between px-4">
        <button
          onClick={onPrevious}
          className="px-6 md:px-8 py-3 bg-black text-white font-medium hover:bg-gray-800 transition-colors rounded"
        >
          Previous
        </button>
        <button
          onClick={handleSubmit}
          disabled={!isFormValid}
          className={`px-6 md:px-8 py-3 font-medium transition-all duration-200 rounded ${
            isFormValid
              ? 'bg-black text-white hover:bg-gray-800'
              : 'bg-gray-300 text-gray-500 cursor-not-allowed'
          }`}
        >
          Get Your Estimate
        </button>
      </div>
    </div>
  );
};

export default ContactStep;
