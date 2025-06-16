
import React from 'react';

interface ProgressIndicatorProps {
  currentStep: number;
  totalSteps: number;
}

const ProgressIndicator: React.FC<ProgressIndicatorProps> = ({ currentStep, totalSteps }) => {
  const steps = ['Configuration', 'Rooms', 'Package', 'Contact'];
  
  return (
    <div className="flex justify-center mb-8">
      <div className="flex items-center space-x-4 bg-white/60 backdrop-blur-sm rounded-full px-6 py-4 shadow-lg border border-white/20">
        {Array.from({ length: totalSteps }, (_, index) => (
          <React.Fragment key={index}>
            <div className="flex flex-col items-center space-y-2">
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold text-sm transition-all duration-500 ${
                  index < currentStep 
                    ? 'bg-gradient-to-r from-green-400 to-emerald-400 text-white shadow-lg' 
                    : index === currentStep 
                    ? 'bg-gradient-to-r from-amber-400 to-orange-400 text-white shadow-lg ring-4 ring-amber-200' 
                    : 'bg-gray-200 text-gray-500'
                }`}
              >
                {index < currentStep ? '✓' : index + 1}
              </div>
              <span className={`text-xs font-medium transition-colors hidden sm:block ${
                index <= currentStep ? 'text-gray-700' : 'text-gray-400'
              }`}>
                {steps[index]}
              </span>
            </div>
            {index < totalSteps - 1 && (
              <div className={`w-8 h-0.5 transition-colors duration-500 ${
                index < currentStep ? 'bg-green-400' : 'bg-gray-300'
              }`} />
            )}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
};

export default ProgressIndicator;
