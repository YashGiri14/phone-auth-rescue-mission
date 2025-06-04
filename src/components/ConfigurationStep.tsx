
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
      <h2 className="text-2xl md:text-3xl font-semibold text-center mb-4 text-gray-800">
        Choose your configuration
      </h2>
      <p className="text-center text-gray-600 mb-8 md:mb-12 px-4">
        Tailor your space with your ideal configuration
      </p>
      
      <div className="max-w-md mx-auto space-y-4 mb-8 md:mb-16 px-4">
        {configurations.map((config) => (
          <button
            key={config}
            onClick={() => onConfigSelect(config)}
            className={`w-full py-4 px-6 border-2 text-lg font-medium transition-all duration-200 rounded ${
              selectedConfig === config
                ? 'border-yellow-400 bg-yellow-50 text-gray-800'
                : 'border-gray-300 bg-white text-gray-700 hover:border-yellow-300 hover:bg-yellow-25'
            }`}
          >
            {config}
          </button>
        ))}
      </div>

      <div className="flex justify-end px-4">
        <button
          onClick={onNext}
          disabled={!selectedConfig}
          className={`px-6 md:px-8 py-3 font-medium transition-all duration-200 rounded ${
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
