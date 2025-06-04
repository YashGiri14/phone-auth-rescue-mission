
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
    <div className="animate-fade-in p-2 sm:p-4 max-w-full overflow-hidden">
      <h2 className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-semibold text-center mb-2 sm:mb-3 md:mb-4 text-gray-800 px-2">
        Choose the rooms
      </h2>
      <p className="text-center text-gray-600 mb-4 sm:mb-6 md:mb-8 lg:mb-12 px-2 text-xs sm:text-sm md:text-base">
        We'll bring your vision to life
      </p>
      
      <div className="max-w-md mx-auto space-y-2 sm:space-y-3 md:space-y-4 lg:space-y-6 mb-4 sm:mb-6 md:mb-8 lg:mb-16 px-2 sm:px-4">
        {rooms.map((room) => {
          const limits = getRoomLimits(room.name);
          return (
            <div key={room.name} className="flex items-center justify-between min-w-0">
              <span className="text-xs sm:text-sm md:text-lg text-gray-800 flex-1 truncate pr-2">{room.name}</span>
              <div className="flex items-center space-x-1 sm:space-x-2 md:space-x-4 flex-shrink-0">
                <button
                  onClick={() => onRoomCountChange(room.name, room.count - 1)}
                  disabled={room.count <= limits.min}
                  className={`w-5 h-5 sm:w-6 sm:h-6 md:w-8 md:h-8 rounded-full flex items-center justify-center transition-colors ${
                    room.count <= limits.min
                      ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                      : 'bg-black text-white hover:bg-gray-800'
                  }`}
                >
                  <Minus size={10} className="sm:w-3 sm:h-3 md:w-4 md:h-4" />
                </button>
                <span className="text-xs sm:text-sm md:text-lg font-medium w-4 sm:w-6 md:w-8 text-center flex-shrink-0">{room.count}</span>
                <button
                  onClick={() => onRoomCountChange(room.name, room.count + 1)}
                  disabled={room.count >= limits.max}
                  className={`w-5 h-5 sm:w-6 sm:h-6 md:w-8 md:h-8 rounded-full flex items-center justify-center transition-colors ${
                    room.count >= limits.max
                      ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                      : 'bg-black text-white hover:bg-gray-800'
                  }`}
                >
                  <Plus size={10} className="sm:w-3 sm:h-3 md:w-4 md:h-4" />
                </button>
              </div>
            </div>
          );
        })}
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
          className="px-3 sm:px-4 md:px-6 lg:px-8 py-2 sm:py-2.5 md:py-3 bg-black text-white font-medium hover:bg-gray-800 transition-colors rounded text-xs sm:text-sm md:text-base"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default RoomsStep;
