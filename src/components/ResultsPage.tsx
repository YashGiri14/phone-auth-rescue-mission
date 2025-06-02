
import React from 'react';

interface ResultsPageProps {
  configuration: string;
  rooms: Array<{ name: string; count: number }>;
  packageType: string;
  contactInfo: any;
}

const ResultsPage: React.FC<ResultsPageProps> = ({
  configuration,
  rooms,
  packageType,
  contactInfo
}) => {
  const totalRooms = rooms.reduce((sum, room) => sum + room.count, 0);
  const basePrice = 48000; // Base price from the screenshot
  const estimate = (basePrice * totalRooms * (packageType === 'Premium' ? 1.5 : packageType === 'Luxury' ? 2.5 : 1)).toFixed(0);

  const roomsList = rooms
    .filter(room => room.count > 0)
    .map(room => `${room.count} ${room.name}${room.count > 1 ? 's' : ''}`)
    .join(', ');

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4">
        <div className="bg-white rounded-lg shadow-lg p-8">
          <div className="text-center mb-8">
            <div className="inline-block border-2 border-gray-400 px-8 py-4 mb-6">
              <h1 className="font-playfair text-2xl md:text-3xl font-medium text-gray-800">
                Artisan Studio
              </h1>
              <p className="text-sm text-gray-600 tracking-wider uppercase mt-1">
                Interior Design & Decor
              </p>
            </div>
            
            <h2 className="text-3xl font-semibold mb-4 text-gray-800">
              Your estimate is ready now
            </h2>
            <p className="text-gray-600 mb-8">
              We ensure that your new home is going to be amazing.
            </p>
          </div>

          <div className="flex flex-col lg:flex-row gap-8">
            <div className="lg:w-1/2">
              <img
                src="/lovable-uploads/79486e86-7aab-40e2-b96e-b30cddd791da.png"
                alt="Interior Design Sample"
                className="w-full rounded-lg shadow-md"
              />
            </div>
            
            <div className="lg:w-1/2">
              <div className="bg-gray-50 p-6 rounded-lg">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-xl font-semibold text-gray-800">{packageType} (₹)</h3>
                  <span className="text-2xl font-bold text-green-600">₹ {estimate} L*</span>
                </div>
                
                <p className="text-gray-600 mb-6">
                  A variety of standard home interior solutions tailored to meet all your needs.
                </p>
                
                <div className="space-y-4">
                  <div>
                    <span className="font-medium text-gray-800">Configuration:</span>
                    <span className="ml-2 text-gray-600">{configuration}</span>
                  </div>
                  
                  <div>
                    <span className="font-medium text-gray-800">Rooms:</span>
                    <span className="ml-2 text-gray-600">{roomsList}</span>
                  </div>
                  
                  <div>
                    <span className="font-medium text-gray-800">Furniture:</span>
                    <div className="text-sm text-gray-600 mt-1">
                      1 Sofa (3+2 Seater, Standard Fabric Material), 1 TV Unit (Maximum 6x4 feet Panel and 4x1 Box with 3 drawers, BWP Material, Laminate finish, Basic Accessories), 1 Queen Size Bed (Maximum 6x5 feet, BWP Material, Laminate finish), 1 Modular Wardrobe (Maximum 7X4 feet, 2-Door Swing, BWP Material, Laminate finish, Basic Accessories), Basic Vanity Unit, Modular Kitchen (BWP Material, Matt Finish, Basic Accessories), 1 Dining Table (4x3 laminate table, 4 basic chairs)
                    </div>
                  </div>
                  
                  <div>
                    <span className="font-medium text-gray-800">Services:</span>
                    <div className="text-sm text-gray-600 mt-1">
                      False Ceiling (only living room, maximum 120 square feet), painting (maximum 830 square feet)
                    </div>
                  </div>
                </div>
                
                <div className="mt-6 p-4 bg-yellow-50 border border-yellow-200 rounded">
                  <p className="text-xs text-gray-600">
                    *This is just an estimated price based on what our clients usually spend. The final cost may be higher or lower depending on things like the materials you choose, the amount of furniture, any necessary construction work (painting, flooring, plumbing, etc.), design features, and the type of wood used. Don't worry, our designers will help you understand everything.
                  </p>
                </div>
                
                <button className="w-full mt-6 bg-black text-white py-3 font-medium hover:bg-gray-800 transition-colors">
                  Visit our website
                </button>
              </div>
            </div>
          </div>
          
          <div className="mt-8 text-center">
            <p className="text-gray-600">
              Thank you for choosing Artisan Studio, {contactInfo.name}! We'll contact you at {contactInfo.mobile} to discuss your project further.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResultsPage;
