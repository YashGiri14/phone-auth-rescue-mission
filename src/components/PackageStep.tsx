
import React from 'react';

interface Package {
  name: string;
  price: string;
  description: string;
  image: string;
}

interface PackageStepProps {
  selectedPackage: string;
  onPackageSelect: (packageName: string) => void;
  onNext: () => void;
  onPrevious: () => void;
}

const PackageStep: React.FC<PackageStepProps> = ({
  selectedPackage,
  onPackageSelect,
  onNext,
  onPrevious
}) => {
  const packages: Package[] = [
    {
      name: 'Basic Blends',
      price: '₹',
      description: 'A variety of standard home interior solutions tailored to meet all your needs.',
      image: '/lovable-uploads/34d3ec1f-5d16-40e4-a4cd-b54eed4a3dab.png'
    },
    {
      name: 'Luxury Lux',
      price: '₹₹',
      description: 'A collection of luxury home interior solutions crafted to fulfill all your needs.',
      image: '/lovable-uploads/cec37b96-b2fa-466c-bce0-12e56097efb2.png'
    }
  ];

  return (
    <div className="animate-fade-in">
      <h2 className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-semibold text-center mb-2 sm:mb-3 text-gray-800">
        Select your package
      </h2>
      <p className="text-center text-gray-600 mb-6 sm:mb-8 text-xs sm:text-sm md:text-base">
        Tailor your space with your ideal configuration
      </p>
      
      <div className="max-w-2xl mx-auto space-y-4 sm:space-y-6 mb-8 sm:mb-12">
        {packages.map((pkg) => (
          <div
            key={pkg.name}
            onClick={() => onPackageSelect(pkg.name)}
            className={`border-2 p-4 sm:p-6 cursor-pointer transition-all duration-200 rounded-lg ${
              selectedPackage === pkg.name
                ? 'border-yellow-400 bg-yellow-50'
                : 'border-gray-300 bg-white hover:border-yellow-300'
            }`}
          >
            <div className="flex flex-col sm:flex-row items-start space-y-3 sm:space-y-0 sm:space-x-4">
              <img
                src={pkg.image}
                alt={pkg.name}
                className="w-32 h-32 sm:w-32 sm:h-32 md:w-40 md:h-40 lg:w-48 lg:h-48 object-cover rounded mx-auto sm:mx-0 flex-shrink-0"
              />
              <div className="flex-1 text-center sm:text-left">
                <div className="flex flex-col sm:flex-row items-center sm:space-x-2 mb-2">
                  <h3 className="text-sm sm:text-lg md:text-xl font-semibold text-gray-800">{pkg.name}</h3>
                  <span className="text-xs sm:text-md md:text-lg text-gray-600">({pkg.price})</span>
                </div>
                <p className="text-xs sm:text-sm md:text-base text-gray-600 leading-relaxed">{pkg.description}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="flex justify-between space-x-2">
        <button
          onClick={onPrevious}
          className="px-4 sm:px-6 md:px-8 py-2.5 sm:py-3 bg-yellow-400 text-black font-medium hover:bg-yellow-500 transition-colors rounded text-sm sm:text-base"
        >
          Previous
        </button>
        <button
          onClick={onNext}
          disabled={!selectedPackage}
          className={`px-4 sm:px-6 md:px-8 py-2.5 sm:py-3 font-medium transition-all duration-200 rounded text-sm sm:text-base ${
            selectedPackage
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

export default PackageStep;
