
import React, { useState } from 'react';

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

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = () => {
    onSubmit(formData);
  };

  const isFormValid = formData.name && formData.email && formData.mobile && formData.address;

  return (
    <div className="animate-fade-in relative">
      <h2 className="text-3xl font-semibold text-center mb-4 text-gray-800">
        Your estimate is almost ready
      </h2>
      <p className="text-center text-gray-600 mb-12">
        Tailor your space with your ideal configuration
      </p>
      
      <div className="max-w-md mx-auto space-y-6 mb-8">
        <input
          type="text"
          name="name"
          placeholder="Name"
          value={formData.name}
          onChange={handleInputChange}
          className="w-full px-4 py-3 border border-gray-300 focus:border-yellow-400 focus:outline-none transition-colors"
        />
        <input
          type="email"
          name="email"
          placeholder="Email ID"
          value={formData.email}
          onChange={handleInputChange}
          className="w-full px-4 py-3 border border-gray-300 focus:border-yellow-400 focus:outline-none transition-colors"
        />
        <input
          type="tel"
          name="mobile"
          placeholder="Mobile"
          value={formData.mobile}
          onChange={handleInputChange}
          className="w-full px-4 py-3 border border-gray-300 focus:border-yellow-400 focus:outline-none transition-colors"
        />
        <textarea
          name="address"
          placeholder="Address"
          value={formData.address}
          onChange={handleInputChange}
          rows={3}
          className="w-full px-4 py-3 border border-gray-300 focus:border-yellow-400 focus:outline-none transition-colors resize-none"
        />
      </div>

      <p className="text-center text-sm text-gray-600 mb-20">
        By submitting this form, you agree to our{' '}
        <a href="#" className="text-blue-600 underline">privacy policy</a>
      </p>

      <div className="absolute bottom-6 left-6 right-6 flex justify-between z-10">
        <button
          onClick={onPrevious}
          className="px-8 py-3 bg-black text-white font-medium hover:bg-gray-800 transition-colors"
        >
          Previous
        </button>
        <button
          onClick={handleSubmit}
          disabled={!isFormValid}
          className={`px-8 py-3 font-medium transition-all duration-200 ${
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
