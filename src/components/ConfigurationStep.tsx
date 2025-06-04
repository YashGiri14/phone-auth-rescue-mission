
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
    <div className="animate-fade-in p-2 sm:p-4 max-w-full overflow-hidden">
      <h2 className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-semibold text-center mb-2 sm:mb-3 md:mb-4 text-gray-800 px-2">
        Choose your configuration
      </h2>
      <p className="text-center text-gray-600 mb-4 sm:mb-6 md:mb-8 lg:mb-12 px-2 text-xs sm:text-sm md:text-base">
        Tailor your space with your ideal configuration
      </p>
      
      <div className="max-w-md mx-auto space-y-2 sm:space-y-3 md:space-y-4 mb-4 sm:mb-6 md:mb-8 lg:mb-16 px-2 sm:px-4">
        {configurations.map((config) => (
          <button
            key={config}
            onClick={() => onConfigSelect(config)}
            className={`w-full py-2 sm:py-3 md:py-4 px-3 sm:px-4 md:px-6 border-2 text-sm sm:text-base md:text-lg font-medium transition-all duration-200 rounded ${
              selectedConfig === config
                ? 'border-yellow-400 bg-yellow-50 text-gray-800'
                : 'border-gray-300 bg-white text-gray-700 hover:border-yellow-300 hover:bg-yellow-25'
            }`}
          >
            {config}
          </button>
        ))}
      </div>

      <div className="flex justify-end px-2 sm:px-4">
        <button
          onClick={onNext}
          disabled={!selectedConfig}
          className={`px-3 sm:px-4 md:px-6 lg:px-8 py-2 sm:py-2.5 md:py-3 font-medium transition-all duration-200 rounded text-xs sm:text-sm md:text-base ${
            selectedConfig
              ? 'bg-black text-white hover:bg-gray-800'
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
