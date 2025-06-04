
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
      price: '₹₹₹₹',
      description: 'A collection of luxury home interior solutions crafted to fulfill all your needs.',
      image: '/lovable-uploads/cec37b96-b2fa-466c-bce0-12e56097efb2.png'
    }
  ];

  return (
    <div className="animate-fade-in p-2 sm:p-4 max-w-full overflow-hidden">
      <h2 className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-semibold text-center mb-2 sm:mb-3 md:mb-4 text-gray-800 px-2">
        Select your package
      </h2>
      <p className="text-center text-gray-600 mb-4 sm:mb-6 md:mb-8 lg:mb-12 px-2 text-xs sm:text-sm md:text-base">
        Tailor your space with your ideal configuration
      </p>
      
      <div className="max-w-2xl mx-auto space-y-3 sm:space-y-4 md:space-y-6 mb-4 sm:mb-6 md:mb-8 lg:mb-16 px-2 sm:px-4">
        {packages.map((pkg) => (
          <div
            key={pkg.name}
            onClick={() => onPackageSelect(pkg.name)}
            className={`border-2 p-3 sm:p-4 md:p-6 cursor-pointer transition-all duration-200 rounded-lg ${
              selectedPackage === pkg.name
                ? 'border-yellow-400 bg-yellow-50'
                : 'border-gray-300 bg-white hover:border-yellow-300'
            }`}
          >
            <div className="flex flex-col sm:flex-row items-start space-y-3 sm:space-y-0 sm:space-x-3 md:space-x-4">
              <img
                src={pkg.image}
                alt={pkg.name}
                className="w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 object-cover rounded mx-auto sm:mx-0 flex-shrink-0"
              />
              <div className="flex-1 text-center sm:text-left min-w-0">
                <div className="flex flex-col sm:flex-row items-center sm:space-x-2 mb-1 sm:mb-2">
                  <h3 className="text-sm sm:text-lg md:text-xl font-semibold text-gray-800 truncate">{pkg.name}</h3>
                  <span className="text-xs sm:text-md md:text-lg text-gray-600">({pkg.price})</span>
                </div>
                <p className="text-xs sm:text-sm md:text-base text-gray-600 leading-relaxed">{pkg.description}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="flex justify-between px-2 sm:px-4 space-x-2">
        <button
          onClick={onPrevious}
          className="px-3 sm:px-4 md:px-6 lg:px-8 py-2 sm:py-2.5 md:py-3 bg-black text-white font-medium hover:bg-gray-800 transition-colors rounded text-xs sm:text-sm md:text-base"
        >
          Previous
        </button>
        <button
          onClick={onNext}
          disabled={!selectedPackage}
          className={`px-3 sm:px-4 md:px-6 lg:px-8 py-2 sm:py-2.5 md:py-3 font-medium transition-all duration-200 rounded text-xs sm:text-sm md:text-base ${
            selectedPackage
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

export default PackageStep;
