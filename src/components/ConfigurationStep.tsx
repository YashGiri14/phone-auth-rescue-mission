
import React from 'react';
import { Home } from 'lucide-react';

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
  const configurations = [
    { name: '1 BHK', description: 'Perfect for couples or individuals', rooms: '1 Bedroom + Living + Kitchen' },
    { name: '2 BHK', description: 'Ideal for small families', rooms: '2 Bedrooms + Living + Kitchen' },
    { name: '3 BHK', description: 'Spacious for growing families', rooms: '3 Bedrooms + Living + Kitchen' }
  ];

  return (
    <div className="animate-fade-in space-y-8">
      <div className="text-center space-y-4">
        <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-amber-400 to-orange-400 rounded-full mb-4">
          <Home className="w-8 h-8 text-white" />
        </div>
        <h2 className="text-3xl md:text-4xl font-playfair font-bold text-gray-900 leading-tight">
          Choose Your Perfect
          <span className="block text-transparent bg-clip-text bg-gradient-to-r from-amber-600 to-orange-600">
            Configuration
          </span>
        </h2>
        <p className="text-lg text-gray-600 max-w-md mx-auto leading-relaxed">
          Select the layout that matches your lifestyle and space needs
        </p>
      </div>
      
      <div className="space-y-4">
        {configurations.map((config) => (
          <button
            key={config.name}
            onClick={() => onConfigSelect(config.name)}
            className={`group w-full p-6 border-2 text-left transition-all duration-300 rounded-xl hover:scale-[1.02] hover:shadow-lg ${
              selectedConfig === config.name
                ? 'border-amber-400 bg-gradient-to-r from-amber-50 to-orange-50 shadow-lg'
                : 'border-gray-200 bg-white hover:border-amber-300 hover:bg-amber-50/50'
            }`}
          >
            <div className="flex items-center justify-between">
              <div className="flex-1">
                <div className="flex items-center space-x-3 mb-2">
                  <h3 className={`text-xl font-semibold transition-colors ${
                    selectedConfig === config.name ? 'text-amber-700' : 'text-gray-800 group-hover:text-amber-700'
                  }`}>
                    {config.name}
                  </h3>
                  <span className={`px-3 py-1 text-sm rounded-full transition-colors ${
                    selectedConfig === config.name 
                      ? 'bg-amber-200 text-amber-800' 
                      : 'bg-gray-100 text-gray-600 group-hover:bg-amber-100 group-hover:text-amber-700'
                  }`}>
                    {config.rooms}
                  </span>
                </div>
                <p className="text-gray-600 text-sm">{config.description}</p>
              </div>
              <div className={`w-6 h-6 rounded-full border-2 transition-all ${
                selectedConfig === config.name
                  ? 'border-amber-400 bg-amber-400'
                  : 'border-gray-300 group-hover:border-amber-300'
              }`}>
                {selectedConfig === config.name && (
                  <div className="w-2 h-2 bg-white rounded-full m-1"></div>
                )}
              </div>
            </div>
          </button>
        ))}
      </div>
      
      <div className="flex justify-end pt-4">
        <button
          onClick={onNext}
          disabled={!selectedConfig}
          className={`px-8 py-3 font-semibold transition-all duration-300 rounded-xl text-base ${
            selectedConfig
              ? 'bg-gradient-to-r from-amber-400 to-orange-400 text-white hover:from-amber-500 hover:to-orange-500 shadow-lg hover:shadow-xl transform hover:scale-105'
              : 'bg-gray-200 text-gray-500 cursor-not-allowed'
          }`}
        >
          Continue →
        </button>
      </div>
    </div>
  );
};

export default ConfigurationStep;
