
import React from 'react';

interface ConfigurationStepProps {
  selectedConfig: string;
  onConfigSelect: (config: string) => void;
  onNext: () => void;
}

const ConfigurationStep: React.FC<ConfigurationStepProps> = ({
  selectedConfig,
  onConfigSelect,
  onNext
}) => {
  const configurations = ['1 BHK', '2 BHK', '3 BHK'];

  return (
    <div className="animate-fade-in">
      <h2 className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-semibold text-center mb-3 sm:mb-4 text-gray-800">
        Choose your configuration
      </h2>
      <p className="text-center text-gray-600 mb-6 sm:mb-8 text-xs sm:text-sm md:text-base">
        Tailor your space with your ideal configuration
      </p>
      
      <div className="max-w-md mx-auto space-y-3 sm:space-y-4 mb-8 sm:mb-12">
        {configurations.map((config) => (
          <button
            key={config}
            onClick={() => onConfigSelect(config)}
            className={`w-full py-3 sm:py-4 px-4 sm:px-6 border-2 text-sm sm:text-base md:text-lg font-medium transition-all duration-200 rounded ${
              selectedConfig === config
                ? 'border-yellow-400 bg-yellow-50 text-gray-800'
                : 'border-gray-300 bg-white text-gray-700 hover:border-yellow-300 hover:bg-yellow-25'
            }`}
          >
            {config}
          </button>
        ))}
      </div>

      <div className="flex justify-end">
        <button
          onClick={onNext}
          disabled={!selectedConfig}
          className={`px-4 sm:px-6 md:px-8 py-2.5 sm:py-3 font-medium transition-all duration-200 rounded text-sm sm:text-base ${
            selectedConfig
              ? 'bg-yellow-400 text-black hover:bg-yellow-500'
              : 'bg-gray-300 text-gray-500 cursor-not-allowed'
          }`}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default ConfigurationStep;
