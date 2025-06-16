
import React from 'react';

const Header = () => {
  return (
    <div className="text-center mb-8">
      <div className="inline-block mb-6 group">
        <div className="relative">
          <div className="absolute inset-0 bg-gradient-to-r from-amber-400 to-orange-400 rounded-2xl blur-lg opacity-20 group-hover:opacity-30 transition-opacity"></div>
          <img
            src="/lovable-uploads/0e7764bc-df65-4205-841f-740f7b35349b.png"
            alt="Artisan Studio"
            className="relative h-20 md:h-24 lg:h-28 w-auto mx-auto transition-transform duration-300 group-hover:scale-105"
          />
        </div>
      </div>
      <div className="space-y-2">
        <p className="text-lg text-gray-600 font-medium tracking-wide">
          INTERIOR DESIGN CONFIGURATOR
        </p>
        <div className="w-24 h-1 bg-gradient-to-r from-amber-400 to-orange-400 mx-auto rounded-full"></div>
      </div>
    </div>
  );
};

export default Header;
