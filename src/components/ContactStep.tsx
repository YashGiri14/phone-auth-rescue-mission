
import React, { useState } from 'react';
import OTPVerification from './OTPVerification';
import { RecaptchaVerifier, signInWithPhoneNumber } from 'firebase/auth';
import { auth } from '../firebase';

declare global {
  interface Window {
    recaptchaVerifier: any;
    confirmationResult: any;
  }
}

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
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({
    email: '',
    mobile: ''
  });

  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validatePhone = (phone: string) => {
    const phoneRegex = /^[6-9]\d{9}$/; // Indian mobile number format
    return phoneRegex.test(phone);
  };

  const setupRecaptcha = () => {
    if (!window.recaptchaVerifier) {
      window.recaptchaVerifier = new RecaptchaVerifier(auth, 'recaptcha-container', {
        size: 'invisible',
        callback: (response: any) => {
          console.log('Recaptcha verified');
        },
        'expired-callback': () => {
          console.log('Recaptcha expired');
        }
      });
    }
  };

  const sendOTP = async (mobile: string) => {
    try {
      setLoading(true);
      
      // COMMENTED OUT FOR DEMO - UNCOMMENT WHEN BILLING IS ENABLED
      /*
      setupRecaptcha();
      
      const appVerifier = window.recaptchaVerifier;
      const formattedPhone = `+91${mobile}`;
      
      console.log('Sending OTP to:', formattedPhone);
      
      const confirmation = await signInWithPhoneNumber(auth, formattedPhone, appVerifier);
      window.confirmationResult = confirmation;
      
      console.log('OTP sent successfully');
      */
      
      // FOR DEMO: Just show OTP screen without sending actual OTP
      console.log('Demo mode: Showing OTP screen without sending SMS');
      setShowOTP(true);
      
      // Show demo message
      const successMsg = document.createElement('div');
      successMsg.className = 'fixed top-4 right-4 bg-blue-500 text-white px-4 py-2 rounded z-50';
      successMsg.textContent = 'Demo mode: Use 123456 as OTP';
      document.body.appendChild(successMsg);
      setTimeout(() => {
        if (document.body.contains(successMsg)) {
          document.body.removeChild(successMsg);
        }
      }, 5000);
      
    } catch (error) {
      console.error('Error sending OTP:', error);
      
      // Handle specific Firebase errors
      if (error.code === 'auth/billing-not-enabled') {
        alert('Firebase billing not enabled. Please upgrade your Firebase project to use phone authentication.');
      } else if (error.code === 'auth/invalid-phone-number') {
        alert('Invalid phone number format');
      } else {
        alert(`Failed to send OTP: ${error.message}`);
      }
      
      // For demo purposes, show OTP screen anyway
      setShowOTP(true);
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });

    // Clear errors when user starts typing
    if (name === 'email' && errors.email) {
      setErrors({ ...errors, email: '' });
    }
    if (name === 'mobile' && errors.mobile) {
      setErrors({ ...errors, mobile: '' });
    }
  };

  const handleMobileSubmit = async () => {
    // Validate phone number
    if (!validatePhone(formData.mobile)) {
      setErrors({ ...errors, mobile: 'Please enter a valid 10-digit mobile number starting with 6-9' });
      return;
    }
    
    if (formData.mobile.length >= 10) {
      await sendOTP(formData.mobile);
    }
  };

  const handleOTPVerified = async (enteredOtp: string) => {
    try {
      // COMMENTED OUT FOR DEMO - UNCOMMENT WHEN BILLING IS ENABLED
      /*
      if (window.confirmationResult) {
        const result = await window.confirmationResult.confirm(enteredOtp);
        console.log('Phone number verified successfully:', result.user);
        setIsVerified(true);
        setShowOTP(false);
        return true;
      } else {
      */
        // For demo purposes when Firebase billing is not enabled
        if (enteredOtp === '123456') {
          console.log('Demo OTP verified');
          setIsVerified(true);
          setShowOTP(false);
          return true;
        }
        return false;
      /*
      }
      */
    } catch (error) {
      console.error('Error verifying OTP:', error);
      return false;
    }
  };

  const handleResendOTP = async () => {
    await sendOTP(formData.mobile);
  };

  const handleBackFromOTP = () => {
    setShowOTP(false);
  };

  const handleSubmit = () => {
    // Validate email
    if (!validateEmail(formData.email)) {
      setErrors({ ...errors, email: 'Please enter a valid email address' });
      return;
    }

    if (isFormValid) {
      onSubmit(formData);
    }
  };

  const isFormValid = formData.name && 
                     formData.email && 
                     validateEmail(formData.email) &&
                     formData.mobile && 
                     validatePhone(formData.mobile) &&
                     formData.address && 
                     isVerified;

  return showOTP ? (
    <>
      <OTPVerification
        mobile={formData.mobile}
        onVerified={handleOTPVerified}
        onBack={handleBackFromOTP}
        onResend={handleResendOTP}
      />
      <div id="recaptcha-container"></div>
    </>
  ) : (
    <div className="animate-fade-in p-1 sm:p-2 md:p-4 w-full max-w-full overflow-hidden">
      <h2 className="text-base sm:text-lg md:text-xl lg:text-2xl font-semibold text-center mb-1 sm:mb-2 md:mb-2 text-gray-800 px-1 sm:px-2">
  Your estimate is almost ready
</h2>
<p className="text-center text-gray-600 mb-2 sm:mb-3 md:mb-4 lg:mb-5 px-1 sm:px-2 text-xs sm:text-sm">
  Tailor your space with your ideal configuration
</p>

      
      <div className="max-w-sm mx-auto space-y-2 sm:space-y-3 md:space-y-4 mb-3 sm:mb-4 md:mb-6 px-1 sm:px-2">
        <input
          type="text"
          name="name"
          placeholder="Name"
          value={formData.name}
          onChange={handleInputChange}
          className="w-full px-2 sm:px-3 py-2 sm:py-2.5 border border-gray-300 focus:border-yellow-400 focus:outline-none transition-colors rounded text-xs sm:text-sm"
        />
        
        <div>
          <input
            type="email"
            name="email"
            placeholder="Email ID"
            value={formData.email}
            onChange={handleInputChange}
            className={`w-full px-2 sm:px-3 py-2 sm:py-2.5 border ${errors.email ? 'border-red-500' : 'border-gray-300'} focus:border-yellow-400 focus:outline-none transition-colors rounded text-xs sm:text-sm`}
          />
          {errors.email && (
            <p className="text-red-500 text-xs mt-1">{errors.email}</p>
          )}
        </div>
        
        <div className="flex gap-1 sm:gap-2">
          <div className="flex-1 min-w-0">
            <input
              type="tel"
              name="mobile"
              placeholder="Mobile (10 digits)"
              value={formData.mobile}
              onChange={handleInputChange}
              maxLength={10}
              className={`w-full px-2 sm:px-3 py-2 sm:py-2.5 border ${errors.mobile ? 'border-red-500' : 'border-gray-300'} focus:border-yellow-400 focus:outline-none transition-colors rounded text-xs sm:text-sm`}
            />
            {errors.mobile && (
              <p className="text-red-500 text-xs mt-1">{errors.mobile}</p>
            )}
          </div>
          {formData.mobile.length >= 10 && validatePhone(formData.mobile) && !isVerified && (
            <button
  onClick={handleMobileSubmit}
  disabled={loading}
  className="px-2 sm:px-3 py-2 sm:py-2.5 bg-blue-600 text-white text-xs sm:text-sm font-medium hover:bg-blue-700 transition-colors rounded whitespace-nowrap flex-shrink-0 disabled:opacity-50"
>
  {loading ? 'Sending...' : 'Verify'}
</button>
          )}
          {isVerified && (
            <div className="px-2 sm:px-3 py-2 sm:py-2.5 bg-green-100 text-green-700 text-xs sm:text-sm font-medium rounded flex items-center whitespace-nowrap flex-shrink-0">
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
          className="w-full px-2 sm:px-3 py-2 sm:py-2.5 border border-gray-300 focus:border-yellow-400 focus:outline-none transition-colors resize-none rounded text-xs sm:text-sm"
        />
      </div>

      <p className="text-center text-xs text-gray-600 mb-3 sm:mb-4 md:mb-6 px-1 sm:px-2">
        By submitting this form, you agree to our{' '}
        <a href="#" className="text-blue-600 underline">privacy policy</a>
      </p>

      <div className="flex justify-between px-1 sm:px-2 gap-2">
        <button
          onClick={onPrevious}
          className="px-3 sm:px-4 md:px-6 py-2 sm:py-2.5 bg-black text-white font-medium hover:bg-gray-800 transition-colors rounded text-xs sm:text-sm flex-shrink-0"
        >
          Previous
        </button>
        <button
          onClick={handleSubmit}
          disabled={!isFormValid}
          className={`px-3 sm:px-4 md:px-6 py-2 sm:py-2.5 font-medium transition-all duration-200 rounded text-xs sm:text-sm flex-shrink-0 ${
            isFormValid
              ? 'bg-yellow-400 text-black hover:bg-yellow-500'
              : 'bg-gray-300 text-gray-500 cursor-not-allowed'
          }`}
        >
          Get Your Estimate
        </button>
      </div>
      
      <div id="recaptcha-container"></div>
    </div>
  );
};

export default ContactStep;
