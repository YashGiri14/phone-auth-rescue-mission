
import React, { useState } from 'react';
import Header from '../components/Header';
import ProgressIndicator from '../components/ProgressIndicator';
import ConfigurationStep from '../components/ConfigurationStep';
import RoomsStep from '../components/RoomsStep';
import PackageStep from '../components/PackageStep';
import ContactStep from '../components/ContactStep';
import ResultsPage from '../components/ResultsPage';
import { sendCustomerDataToCompany } from '../utils/emailService';

const Index = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [showResults, setShowResults] = useState(false);
  
  // State for form data
  const [selectedConfig, setSelectedConfig] = useState('');
  const [rooms, setRooms] = useState([
    { name: 'Living Room', count: 1 },
    { name: 'Bedroom', count: 1 },
    { name: 'Kitchen', count: 1 },
    { name: 'Dining', count: 1 }
  ]);
  const [selectedPackage, setSelectedPackage] = useState('');
  const [contactInfo, setContactInfo] = useState({});

  const totalSteps = 4;

  const handleConfigSelect = (config: string) => {
    setSelectedConfig(config);
    
    // Update rooms based on BHK selection with proper validation rules
    let newRooms = [
      { name: 'Living Room', count: 1 },
      { name: 'Kitchen', count: 1 },
      { name: 'Dining', count: 1 }
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

  const getRoomLimits = (roomName: string) => {
    if (!selectedConfig) return { min: 0, max: 3 };
    
    if (roomName === 'Bedroom') {
      if (selectedConfig === '1 BHK') return { min: 0, max: 1 };
      if (selectedConfig === '2 BHK') return { min: 0, max: 2 };
      if (selectedConfig === '3 BHK') return { min: 0, max: 3 };
    }
    
    // For Living Room, Kitchen, and Dining
    if (selectedConfig === '1 BHK') return { min: 0, max: 1 };
    return { min: 0, max: 1 }; // For 2BHK and 3BHK, these rooms have min 0, max 1
  };

  const handleRoomCountChange = (roomName: string, count: number) => {
    const limits = getRoomLimits(roomName);
    const validCount = Math.max(limits.min, Math.min(limits.max, count));
    
    setRooms(rooms.map(room => 
      room.name === roomName ? { ...room, count: validCount } : room
    ));
  };

  const handlePackageSelect = (packageName: string) => {
    setSelectedPackage(packageName);
  };

  const handleContactSubmit = async (formData: any) => {
    setContactInfo(formData);
    
    // Calculate estimate for email
    const totalRooms = rooms.reduce((sum, room) => sum + room.count, 0);
    const basePrice = 48000;
    const estimate = (basePrice * totalRooms * (selectedPackage === 'Luxury Lux' ? 2.5 : 1)).toFixed(0);
    
    // Prepare customer data for email
    const customerData = {
      configuration: selectedConfig,
      rooms: rooms,
      packageType: selectedPackage,
      contactInfo: formData,
      estimate: estimate
    };
    
    // Send customer data to company email silently
    try {
      await sendCustomerDataToCompany(customerData);
      console.log('Customer data sent to company email');
    } catch (error) {
      console.error('Failed to send customer data to company:', error);
      // Don't show error to user, just log it
    }
    
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
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-neutral-50 to-stone-100 font-inter">
      <div className="min-h-screen relative overflow-hidden flex items-center justify-center py-8">
        {/* Subtle background pattern */}
        <div className="absolute inset-0 opacity-[0.02]">
          <div className="absolute inset-0" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23000000' fill-opacity='1'%3E%3Ccircle cx='30' cy='30' r='1'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
            backgroundSize: '60px 60px'
          }} />
        </div>
        
        <div className="max-w-5xl mx-auto px-4 w-full relative z-10">
          <Header />
          <ProgressIndicator currentStep={currentStep} totalSteps={totalSteps} />
          
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-2xl border border-white/20 p-8 mx-0 transition-all duration-500 hover:shadow-3xl">
            <div className="max-w-2xl mx-auto">
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
                  getRoomLimits={getRoomLimits}
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
        </div>
      </div>
    </div>
  );
};

export default Index;
