
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
  const [sentOtp, setSentOtp] = useState('');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const sendOTP = async (mobile: string) => {
    // Generate a 6-digit OTP
    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    setSentOtp(otp);
    
    // In a real app, you would send this via SMS service
    // For now, we'll show it in console for testing
    console.log(`OTP sent to ${mobile}: ${otp}`);
    
    // You can integrate with SMS services like Twilio, AWS SNS, etc.
    // Example: await sendSMS(mobile, `Your OTP is: ${otp}`);
    
    return otp;
  };

  const handleMobileSubmit = async () => {
    if (formData.mobile.length >= 10) {
      const otp = await sendOTP(formData.mobile);
      setShowOTP(true);
    }
  };

  const handleOTPVerified = (enteredOtp: string) => {
    if (enteredOtp === sentOtp) {
      setIsVerified(true);
      setShowOTP(false);
      return true;
    }
    return false;
  };

  const handleBackFromOTP = () => {
    setShowOTP(false);
  };

  const handleResendOTP = async () => {
    const otp = await sendOTP(formData.mobile);
    setSentOtp(otp);
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
        onResend={handleResendOTP}
      />
    );
  }

  return (
    <div className="animate-fade-in p-2 sm:p-4">
      <h2 className="text-xl sm:text-2xl md:text-3xl font-semibold text-center mb-3 sm:mb-4 text-gray-800 px-2">
        Your estimate is almost ready
      </h2>
      <p className="text-center text-gray-600 mb-6 sm:mb-8 md:mb-12 px-2 text-sm sm:text-base">
        Tailor your space with your ideal configuration
      </p>
      
      <div className="max-w-md mx-auto space-y-3 sm:space-y-4 md:space-y-6 mb-4 sm:mb-6 md:mb-8 px-2 sm:px-4">
        <input
          type="text"
          name="name"
          placeholder="Name"
          value={formData.name}
          onChange={handleInputChange}
          className="w-full px-3 sm:px-4 py-2 sm:py-3 border border-gray-300 focus:border-yellow-400 focus:outline-none transition-colors rounded text-sm sm:text-base"
        />
        <input
          type="email"
          name="email"
          placeholder="Email ID"
          value={formData.email}
          onChange={handleInputChange}
          className="w-full px-3 sm:px-4 py-2 sm:py-3 border border-gray-300 focus:border-yellow-400 focus:outline-none transition-colors rounded text-sm sm:text-base"
        />
        <div className="flex space-x-2">
          <input
            type="tel"
            name="mobile"
            placeholder="Mobile"
            value={formData.mobile}
            onChange={handleInputChange}
            className="flex-1 px-3 sm:px-4 py-2 sm:py-3 border border-gray-300 focus:border-yellow-400 focus:outline-none transition-colors rounded text-sm sm:text-base"
          />
          {formData.mobile.length >= 10 && !isVerified && (
            <button
              onClick={handleMobileSubmit}
              className="px-2 sm:px-4 py-2 sm:py-3 bg-blue-600 text-white text-xs sm:text-sm font-medium hover:bg-blue-700 transition-colors rounded whitespace-nowrap"
            >
              Verify
            </button>
          )}
          {isVerified && (
            <div className="px-2 sm:px-4 py-2 sm:py-3 bg-green-100 text-green-700 text-xs sm:text-sm font-medium rounded flex items-center whitespace-nowrap">
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
          className="w-full px-3 sm:px-4 py-2 sm:py-3 border border-gray-300 focus:border-yellow-400 focus:outline-none transition-colors resize-none rounded text-sm sm:text-base"
        />
      </div>

      <p className="text-center text-xs text-gray-600 mb-4 sm:mb-6 md:mb-8 px-2 sm:px-4">
        By submitting this form, you agree to our{' '}
        <a href="#" className="text-blue-600 underline">privacy policy</a>
      </p>

      <div className="flex justify-between px-2 sm:px-4 space-x-2">
        <button
          onClick={onPrevious}
          className="px-4 sm:px-6 md:px-8 py-2 sm:py-3 bg-black text-white font-medium hover:bg-gray-800 transition-colors rounded text-sm sm:text-base"
        >
          Previous
        </button>
        <button
          onClick={handleSubmit}
          disabled={!isFormValid}
          className={`px-4 sm:px-6 md:px-8 py-2 sm:py-3 font-medium transition-all duration-200 rounded text-sm sm:text-base ${
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
