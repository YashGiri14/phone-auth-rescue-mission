
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
      name: 'Standard',
      price: '₹',
      description: 'A variety of standard home interior solutions tailored to meet all your needs.',
      image: '/lovable-uploads/478c798c-2966-40dd-80f8-134c8111232f.png'
    },
    {
      name: 'Premium',
      price: '₹₹',
      description: 'A selection of premium home interior solutions designed to meet all your needs.',
      image: '/lovable-uploads/449fdc10-3db3-4016-a48b-9c4c1c7f72ba.png'
    },
    {
      name: 'Luxury',
      price: '₹₹₹₹',
      description: 'A collection of luxury home interior solutions crafted to fulfill all your needs.',
      image: '/lovable-uploads/326ccedc-0bd8-4cbf-96c3-701df5addd43.png'
    }
  ];

  return (
    <div className="min-h-screen bg-white relative">
      <div className="animate-fade-in px-6 pt-8 pb-24">
        <h2 className="text-3xl font-semibold text-center mb-4 text-gray-800">
          Select your package
        </h2>
        <p className="text-center text-gray-600 mb-12">
          Tailor your space with your ideal configuration
        </p>
        
        <div className="max-w-2xl mx-auto space-y-6">
          {packages.map((pkg) => (
            <div
              key={pkg.name}
              onClick={() => onPackageSelect(pkg.name)}
              className={`border-2 p-6 cursor-pointer transition-all duration-200 ${
                selectedPackage === pkg.name
                  ? 'border-yellow-400 bg-yellow-50'
                  : 'border-gray-300 bg-white hover:border-yellow-300'
              }`}
            >
              <div className="flex items-start space-x-4">
                <img
                  src={pkg.image}
                  alt={pkg.name}
                  className="w-24 h-24 object-cover rounded"
                />
                <div className="flex-1">
                  <div className="flex items-center space-x-2 mb-2">
                    <h3 className="text-xl font-semibold text-gray-800">{pkg.name}</h3>
                    <span className="text-lg text-gray-600">({pkg.price})</span>
                  </div>
                  <p className="text-gray-600">{pkg.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Yellow border at bottom */}
      <div className="absolute bottom-0 left-0 right-0 h-16 bg-yellow-400"></div>

      {/* Buttons positioned over yellow border */}
      <div className="absolute bottom-4 left-6 right-6 flex justify-between">
        <button
          onClick={onPrevious}
          className="px-8 py-3 bg-black text-white font-medium hover:bg-gray-800 transition-colors"
        >
          Previous
        </button>
        <button
          onClick={onNext}
          disabled={!selectedPackage}
          className={`px-8 py-3 font-medium transition-all duration-200 ${
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
