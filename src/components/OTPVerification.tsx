
import React, { useState } from 'react';
import { InputOTP, InputOTPGroup, InputOTPSlot } from './ui/input-otp';

interface OTPVerificationProps {
  mobile: string;
  onVerified: () => void;
  onBack: () => void;
}

const OTPVerification: React.FC<OTPVerificationProps> = ({
  mobile,
  onVerified,
  onBack
}) => {
  const [otp, setOtp] = useState('');
  const [isVerifying, setIsVerifying] = useState(false);

  const handleVerify = async () => {
    if (otp.length === 6) {
      setIsVerifying(true);
      // Simulate OTP verification
      setTimeout(() => {
        setIsVerifying(false);
        onVerified();
      }, 1500);
    }
  };

  const handleResend = () => {
    setOtp('');
    // Simulate resend OTP
    console.log('OTP resent to', mobile);
  };

  return (
    <div className="animate-fade-in">
      <h2 className="text-2xl md:text-3xl font-semibold text-center mb-4 text-gray-800">
        Verify your mobile number
      </h2>
      <p className="text-center text-gray-600 mb-8 px-4">
        We've sent a 6-digit code to <span className="font-medium">{mobile}</span>
      </p>
      
      <div className="max-w-md mx-auto space-y-6 mb-8 px-4">
        <div className="flex justify-center">
          <InputOTP
            maxLength={6}
            value={otp}
            onChange={(value) => setOtp(value)}
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
        
        <div className="text-center">
          <p className="text-sm text-gray-600 mb-2">
            Didn't receive the code?
          </p>
          <button
            onClick={handleResend}
            className="text-blue-600 text-sm underline hover:text-blue-800"
          >
            Resend OTP
          </button>
        </div>
      </div>

      <div className="flex justify-between px-4">
        <button
          onClick={onBack}
          className="px-6 md:px-8 py-3 bg-gray-200 text-gray-700 font-medium hover:bg-gray-300 transition-colors rounded"
        >
          Back
        </button>
        <button
          onClick={handleVerify}
          disabled={otp.length !== 6 || isVerifying}
          className={`px-6 md:px-8 py-3 font-medium transition-all duration-200 rounded ${
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
