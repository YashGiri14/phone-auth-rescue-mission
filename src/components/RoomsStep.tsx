
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
  getRoomLimits: (roomName: string) => { min: number; max: number };
}

const RoomsStep: React.FC<RoomsStepProps> = ({
  rooms,
  onRoomCountChange,
  onNext,
  onPrevious,
  getRoomLimits
}) => {
  return (
    <div className="animate-fade-in p-2 sm:p-4">
      <h2 className="text-xl sm:text-2xl md:text-3xl font-semibold text-center mb-3 sm:mb-4 text-gray-800 px-2">
        Choose the rooms
      </h2>
      <p className="text-center text-gray-600 mb-6 sm:mb-8 md:mb-12 px-2 text-sm sm:text-base">
        We'll bring your vision to life
      </p>
      
      <div className="max-w-md mx-auto space-y-3 sm:space-y-4 md:space-y-6 mb-6 sm:mb-8 md:mb-16 px-2 sm:px-4">
        {rooms.map((room) => {
          const limits = getRoomLimits(room.name);
          return (
            <div key={room.name} className="flex items-center justify-between">
              <span className="text-sm sm:text-lg text-gray-800 flex-1">{room.name}</span>
              <div className="flex items-center space-x-2 sm:space-x-4">
                <button
                  onClick={() => onRoomCountChange(room.name, room.count - 1)}
                  disabled={room.count <= limits.min}
                  className={`w-6 h-6 sm:w-8 sm:h-8 rounded-full flex items-center justify-center transition-colors ${
                    room.count <= limits.min
                      ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                      : 'bg-black text-white hover:bg-gray-800'
                  }`}
                >
                  <Minus size={12} className="sm:w-4 sm:h-4" />
                </button>
                <span className="text-sm sm:text-lg font-medium w-6 sm:w-8 text-center">{room.count}</span>
                <button
                  onClick={() => onRoomCountChange(room.name, room.count + 1)}
                  disabled={room.count >= limits.max}
                  className={`w-6 h-6 sm:w-8 sm:h-8 rounded-full flex items-center justify-center transition-colors ${
                    room.count >= limits.max
                      ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                      : 'bg-black text-white hover:bg-gray-800'
                  }`}
                >
                  <Plus size={12} className="sm:w-4 sm:h-4" />
                </button>
              </div>
            </div>
          );
        })}
      </div>

      <div className="flex justify-between px-2 sm:px-4 space-x-2">
        <button
          onClick={onPrevious}
          className="px-4 sm:px-6 md:px-8 py-2 sm:py-3 bg-black text-white font-medium hover:bg-gray-800 transition-colors rounded text-sm sm:text-base"
        >
          Previous
        </button>
        <button
          onClick={onNext}
          className="px-4 sm:px-6 md:px-8 py-2 sm:py-3 bg-black text-white font-medium hover:bg-gray-800 transition-colors rounded text-sm sm:text-base"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default RoomsStep;
