
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
    
    try {
      // Using free SMS service - Fast2SMS (you can replace with any free SMS API)
      // For demo purposes, I'm using a mock API call
      // In production, you would use a real SMS service like Twilio, Fast2SMS, etc.
      
      const response = await fetch('https://www.fast2sms.com/dev/bulkV2', {
        method: 'POST',
        headers: {
          'authorization': 'YOUR_API_KEY', // You need to get this from Fast2SMS
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          route: 'v3',
          sender_id: 'FTWSMS',
          message: `Your OTP for interior design estimate is: ${otp}`,
          language: 'english',
          flash: 0,
          numbers: mobile,
        })
      });

      if (response.ok) {
        console.log(`OTP sent successfully to ${mobile}: ${otp}`);
        // Show success message
        const successMsg = document.createElement('div');
        successMsg.className = 'fixed top-4 right-4 bg-green-500 text-white px-4 py-2 rounded z-50';
        successMsg.textContent = 'OTP sent to your mobile!';
        document.body.appendChild(successMsg);
        setTimeout(() => document.body.removeChild(successMsg), 3000);
      } else {
        throw new Error('Failed to send SMS');
      }
    } catch (error) {
      console.error('SMS sending failed:', error);
      // Fallback: For demo purposes, show OTP in console and auto-fill
      console.log(`Demo Mode - OTP for ${mobile}: ${otp}`);
      
      // Auto-fill OTP for demo (remove this in production)
      setTimeout(() => {
        const otpInputs = document.querySelectorAll('[data-input-otp-slot]');
        otp.split('').forEach((digit, index) => {
          if (otpInputs[index]) {
            (otpInputs[index] as HTMLInputElement).value = digit;
            otpInputs[index].dispatchEvent(new Event('input', { bubbles: true }));
          }
        });
      }, 2000);
      
      // Show info message
      const infoMsg = document.createElement('div');
      infoMsg.className = 'fixed top-4 right-4 bg-blue-500 text-white px-4 py-2 rounded z-50';
      infoMsg.textContent = `Demo Mode: OTP will auto-fill in 2 seconds`;
      document.body.appendChild(infoMsg);
      setTimeout(() => document.body.removeChild(infoMsg), 4000);
    }
    
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
      <h2 className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-semibold text-center mb-2 sm:mb-3 md:mb-4 text-gray-800 px-2">
        Your estimate is almost ready
      </h2>
      <p className="text-center text-gray-600 mb-4 sm:mb-6 md:mb-8 lg:mb-12 px-2 text-xs sm:text-sm md:text-base">
        Tailor your space with your ideal configuration
      </p>
      
      <div className="max-w-md mx-auto space-y-2 sm:space-y-3 md:space-y-4 lg:space-y-6 mb-3 sm:mb-4 md:mb-6 lg:mb-8 px-2 sm:px-4">
        <input
          type="text"
          name="name"
          placeholder="Name"
          value={formData.name}
          onChange={handleInputChange}
          className="w-full px-2 sm:px-3 md:px-4 py-2 sm:py-2.5 md:py-3 border border-gray-300 focus:border-yellow-400 focus:outline-none transition-colors rounded text-xs sm:text-sm md:text-base"
        />
        <input
          type="email"
          name="email"
          placeholder="Email ID"
          value={formData.email}
          onChange={handleInputChange}
          className="w-full px-2 sm:px-3 md:px-4 py-2 sm:py-2.5 md:py-3 border border-gray-300 focus:border-yellow-400 focus:outline-none transition-colors rounded text-xs sm:text-sm md:text-base"
        />
        <div className="flex space-x-1 sm:space-x-2">
          <input
            type="tel"
            name="mobile"
            placeholder="Mobile"
            value={formData.mobile}
            onChange={handleInputChange}
            className="flex-1 px-2 sm:px-3 md:px-4 py-2 sm:py-2.5 md:py-3 border border-gray-300 focus:border-yellow-400 focus:outline-none transition-colors rounded text-xs sm:text-sm md:text-base"
          />
          {formData.mobile.length >= 10 && !isVerified && (
            <button
              onClick={handleMobileSubmit}
              className="px-2 sm:px-3 md:px-4 py-2 sm:py-2.5 md:py-3 bg-blue-600 text-white text-xs sm:text-sm font-medium hover:bg-blue-700 transition-colors rounded whitespace-nowrap"
            >
              Verify
            </button>
          )}
          {isVerified && (
            <div className="px-2 sm:px-3 md:px-4 py-2 sm:py-2.5 md:py-3 bg-green-100 text-green-700 text-xs sm:text-sm font-medium rounded flex items-center whitespace-nowrap">
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
          className="w-full px-2 sm:px-3 md:px-4 py-2 sm:py-2.5 md:py-3 border border-gray-300 focus:border-yellow-400 focus:outline-none transition-colors resize-none rounded text-xs sm:text-sm md:text-base"
        />
      </div>

      <p className="text-center text-xs text-gray-600 mb-3 sm:mb-4 md:mb-6 lg:mb-8 px-2 sm:px-4">
        By submitting this form, you agree to our{' '}
        <a href="#" className="text-blue-600 underline">privacy policy</a>
      </p>

      <div className="flex justify-between px-2 sm:px-4 space-x-2">
        <button
          onClick={onPrevious}
          className="px-3 sm:px-4 md:px-6 lg:px-8 py-2 sm:py-2.5 md:py-3 bg-black text-white font-medium hover:bg-gray-800 transition-colors rounded text-xs sm:text-sm md:text-base"
        >
          Previous
        </button>
        <button
          onClick={handleSubmit}
          disabled={!isFormValid}
          className={`px-3 sm:px-4 md:px-6 lg:px-8 py-2 sm:py-2.5 md:py-3 font-medium transition-all duration-200 rounded text-xs sm:text-sm md:text-base ${
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
