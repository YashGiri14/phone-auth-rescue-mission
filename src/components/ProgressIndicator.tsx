
import React from 'react';

interface ProgressIndicatorProps {
  currentStep: number;
  totalSteps: number;
}

const ProgressIndicator: React.FC<ProgressIndicatorProps> = ({ currentStep, totalSteps }) => {
  return (
    <div className="flex justify-center mb-8 space-x-3">
      {Array.from({ length: totalSteps }, (_, index) => (
        <div
          key={index}
          className={`w-3 h-3 rounded-full transition-colors duration-300 ${
            index < currentStep 
              ? 'bg-yellow-400' 
              : index === currentStep 
              ? 'bg-yellow-400' 
              : 'bg-gray-300'
          }`}
        />
      ))}
    </div>
  );
};

export default ProgressIndicator;
