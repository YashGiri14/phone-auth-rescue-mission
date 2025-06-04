
import React, { useState } from 'react';
import { InputOTP, InputOTPGroup, InputOTPSlot } from './ui/input-otp';

interface OTPVerificationProps {
  mobile: string;
  onVerified: (otp: string) => boolean;
  onBack: () => void;
  onResend: () => void;
}

const OTPVerification: React.FC<OTPVerificationProps> = ({
  mobile,
  onVerified,
  onBack,
  onResend
}) => {
  const [otp, setOtp] = useState('');
  const [isVerifying, setIsVerifying] = useState(false);
  const [error, setError] = useState('');

  const handleVerify = async () => {
    if (otp.length === 6) {
      setIsVerifying(true);
      setError('');
      
      // Simulate verification delay
      setTimeout(() => {
        const isValid = onVerified(otp);
        setIsVerifying(false);
        
        if (!isValid) {
          setError('Invalid OTP. Please try again.');
          setOtp('');
        }
      }, 1000);
    }
  };

  const handleResend = () => {
    setOtp('');
    setError('');
    onResend();
    // Show success message
    const successMsg = document.createElement('div');
    successMsg.className = 'fixed top-4 right-4 bg-green-500 text-white px-4 py-2 rounded z-50';
    successMsg.textContent = 'OTP sent successfully!';
    document.body.appendChild(successMsg);
    setTimeout(() => document.body.removeChild(successMsg), 3000);
  };

  return (
    <div className="animate-fade-in p-2 sm:p-4">
      <h2 className="text-xl sm:text-2xl md:text-3xl font-semibold text-center mb-3 sm:mb-4 text-gray-800 px-2">
        Verify your mobile number
      </h2>
      <p className="text-center text-gray-600 mb-6 sm:mb-8 px-2 text-sm sm:text-base">
        We've sent a 6-digit code to <span className="font-medium">{mobile}</span>
      </p>
      
      <div className="max-w-md mx-auto space-y-4 sm:space-y-6 mb-6 sm:mb-8 px-2 sm:px-4">
        <div className="flex justify-center">
          <InputOTP
            maxLength={6}
            value={otp}
            onChange={(value) => {
              setOtp(value);
              setError('');
            }}
          >
            <InputOTPGroup>
              <InputOTPSlot index={0} />
              <InputOTPSlot index={1} />
              <InputOTPSlot index={2} />
              <InputOTPSlot index={3} />
              <InputOTPSlot index={4} />
              <InputOTPSlot index={5} />
            </InputOTPGroup>
          </InputOTP>
        </div>
        
        {error && (
          <p className="text-center text-red-600 text-sm">{error}</p>
        )}
        
        <div className="text-center">
          <p className="text-xs sm:text-sm text-gray-600 mb-2">
            Didn't receive the code?
          </p>
          <button
            onClick={handleResend}
            className="text-blue-600 text-xs sm:text-sm underline hover:text-blue-800"
          >
            Resend OTP
          </button>
        </div>
      </div>

      <div className="flex justify-between px-2 sm:px-4 space-x-2">
        <button
          onClick={onBack}
          className="px-4 sm:px-6 md:px-8 py-2 sm:py-3 bg-gray-200 text-gray-700 font-medium hover:bg-gray-300 transition-colors rounded text-sm sm:text-base"
        >
          Back
        </button>
        <button
          onClick={handleVerify}
          disabled={otp.length !== 6 || isVerifying}
          className={`px-4 sm:px-6 md:px-8 py-2 sm:py-3 font-medium transition-all duration-200 rounded text-sm sm:text-base ${
            otp.length === 6 && !isVerifying
              ? 'bg-black text-white hover:bg-gray-800'
              : 'bg-gray-300 text-gray-500 cursor-not-allowed'
          }`}
        >
          {isVerifying ? 'Verifying...' : 'Verify & Continue'}
        </button>
      </div>
    </div>
  );
};

export default OTPVerification;
