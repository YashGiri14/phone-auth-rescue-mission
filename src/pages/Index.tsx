
import React, { useState } from 'react';
import Header from '../components/Header';
import ProgressIndicator from '../components/ProgressIndicator';
import ConfigurationStep from '../components/ConfigurationStep';
import RoomsStep from '../components/RoomsStep';
import PackageStep from '../components/PackageStep';
import ContactStep from '../components/ContactStep';
import ResultsPage from '../components/ResultsPage';

const Index = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [showResults, setShowResults] = useState(false);
  
  // State for form data
  const [selectedConfig, setSelectedConfig] = useState('');
  const [rooms, setRooms] = useState([
    { name: 'Living Room', count: 1 },
    { name: 'Bedroom', count: 1 },
    { name: 'Kitchen', count: 1 }
  ]);
  const [selectedPackage, setSelectedPackage] = useState('');
  const [contactInfo, setContactInfo] = useState({});

  const totalSteps = 4;

  const handleConfigSelect = (config: string) => {
    setSelectedConfig(config);
    
    // Update rooms based on BHK selection
    let newRooms = [
      { name: 'Living Room', count: 1 },
      { name: 'Kitchen', count: 1 }
    ];
    
    if (config === '1 BHK') {
      newRooms.push({ name: 'Bedroom', count: 1 });
    } else if (config === '2 BHK') {
      newRooms.push({ name: 'Bedroom', count: 2 });
    } else if (config === '3 BHK') {
      newRooms.push({ name: 'Bedroom', count: 3 });
    }
    
    setRooms(newRooms);
  };

  const handleRoomCountChange = (roomName: string, count: number) => {
    setRooms(rooms.map(room => 
      room.name === roomName ? { ...room, count } : room
    ));
  };

  const handlePackageSelect = (packageName: string) => {
    setSelectedPackage(packageName);
  };

  const handleContactSubmit = (formData: any) => {
    setContactInfo(formData);
    setShowResults(true);
  };

  const nextStep = () => {
    if (currentStep < totalSteps - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const previousStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  if (showResults) {
    return (
      <ResultsPage
        configuration={selectedConfig}
        rooms={rooms}
        packageType={selectedPackage}
        contactInfo={contactInfo}
      />
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 font-inter">
      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-yellow-100 relative overflow-x-hidden">
        <div className="max-w-4xl mx-auto px-4 py-8">
          <Header />
          <ProgressIndicator currentStep={currentStep} totalSteps={totalSteps} />
          
          <div className="bg-white rounded-lg shadow-lg p-4 md:p-8 lg:p-12 min-h-[500px] relative mx-2 md:mx-0">
            {currentStep === 0 && (
              <ConfigurationStep
                selectedConfig={selectedConfig}
                onConfigSelect={handleConfigSelect}
                onNext={nextStep}
              />
            )}
            
            {currentStep === 1 && (
              <RoomsStep
                rooms={rooms}
                onRoomCountChange={handleRoomCountChange}
                onNext={nextStep}
                onPrevious={previousStep}
              />
            )}
            
            {currentStep === 2 && (
              <PackageStep
                selectedPackage={selectedPackage}
                onPackageSelect={handlePackageSelect}
                onNext={nextStep}
                onPrevious={previousStep}
              />
            )}
            
            {currentStep === 3 && (
              <ContactStep
                onSubmit={handleContactSubmit}
                onPrevious={previousStep}
              />
            )}
          </div>
        </div>
        
        {/* Yellow bottom section */}
        {/* <div className="absolute bottom-0 left-0 right-0 h-20 bg-yellow-400"></div> */}
      </div>
    </div>
  );
};

export default Index;
