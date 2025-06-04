
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
      image: '/lovable-uploads/478c798c-2966-40dd-80f8-134c8111232f.png'
    },
    {
      name: 'Luxury Lux',
      price: '₹₹₹₹',
      description: 'A collection of luxury home interior solutions crafted to fulfill all your needs.',
      image: '/lovable-uploads/326ccedc-0bd8-4cbf-96c3-701df5addd43.png'
    }
  ];

  return (
    <div className="animate-fade-in">
      <h2 className="text-2xl md:text-3xl font-semibold text-center mb-4 text-gray-800">
        Select your package
      </h2>
      <p className="text-center text-gray-600 mb-8 md:mb-12 px-4">
        Tailor your space with your ideal configuration
      </p>
      
      <div className="max-w-2xl mx-auto space-y-4 md:space-y-6 mb-8 md:mb-16 px-4">
        {packages.map((pkg) => (
          <div
            key={pkg.name}
            onClick={() => onPackageSelect(pkg.name)}
            className={`border-2 p-4 md:p-6 cursor-pointer transition-all duration-200 rounded-lg ${
              selectedPackage === pkg.name
                ? 'border-yellow-400 bg-yellow-50'
                : 'border-gray-300 bg-white hover:border-yellow-300'
            }`}
          >
            <div className="flex flex-col sm:flex-row items-start space-y-4 sm:space-y-0 sm:space-x-4">
              <img
                src={pkg.image}
                alt={pkg.name}
                className="w-20 h-20 md:w-24 md:h-24 object-cover rounded mx-auto sm:mx-0"
              />
              <div className="flex-1 text-center sm:text-left">
                <div className="flex flex-col sm:flex-row items-center sm:space-x-2 mb-2">
                  <h3 className="text-lg md:text-xl font-semibold text-gray-800">{pkg.name}</h3>
                  <span className="text-md md:text-lg text-gray-600">({pkg.price})</span>
                </div>
                <p className="text-sm md:text-base text-gray-600">{pkg.description}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="flex justify-between px-4">
        <button
          onClick={onPrevious}
          className="px-6 md:px-8 py-3 bg-black text-white font-medium hover:bg-gray-800 transition-colors rounded"
        >
          Previous
        </button>
        <button
          onClick={onNext}
          disabled={!selectedPackage}
          className={`px-6 md:px-8 py-3 font-medium transition-all duration-200 rounded ${
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
