
import React from 'react';
import { Minus, Plus } from 'lucide-react';

interface Room {
  name: string;
  count: number;
}

interface RoomsStepProps {
  rooms: Room[];
  onRoomCountChange: (roomName: string, count: number) => void;
  onNext: () => void;
  onPrevious: () => void;
}

const RoomsStep: React.FC<RoomsStepProps> = ({
  rooms,
  onRoomCountChange,
  onNext,
  onPrevious
}) => {
  return (
    <div className="min-h-screen bg-white relative">
      <div className="animate-fade-in px-6 pt-8 pb-24">
        <h2 className="text-3xl font-semibold text-center mb-4 text-gray-800">
          Choose the rooms
        </h2>
        <p className="text-center text-gray-600 mb-12">
          We'll bring your vision to life
        </p>
        
        <div className="max-w-md mx-auto space-y-6">
          {rooms.map((room) => (
            <div key={room.name} className="flex items-center justify-between">
              <span className="text-lg text-gray-800">{room.name}</span>
              <div className="flex items-center space-x-4">
                <button
                  onClick={() => onRoomCountChange(room.name, Math.max(0, room.count - 1))}
                  className="w-8 h-8 bg-black text-white rounded-full flex items-center justify-center hover:bg-gray-800 transition-colors"
                >
                  <Minus size={16} />
                </button>
                <span className="text-lg font-medium w-8 text-center">{room.count}</span>
                <button
                  onClick={() => onRoomCountChange(room.name, room.count + 1)}
                  className="w-8 h-8 bg-black text-white rounded-full flex items-center justify-center hover:bg-gray-800 transition-colors"
                >
                  <Plus size={16} />
                </button>
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
          className="px-8 py-3 bg-black text-white font-medium hover:bg-gray-800 transition-colors"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default RoomsStep;
