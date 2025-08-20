import React from 'react';

const LoadingOverlay = () => {
  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center">
      <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-2xl text-center">
        {/* Plane Animation */}
        <div className="mb-6">
          <div className="relative">
            {/* Plane */}
            <div className="text-6xl animate-bounce">
              ✈️
            </div>
            {/* Flight Path */}
            <div className="absolute top-1/2 left-0 w-full h-0.5 bg-gradient-to-r from-transparent via-blue-400 to-transparent transform -translate-y-1/2"></div>
          </div>
        </div>
        
        {/* Loading Text */}
        <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-2">
          Planning Your Trip
        </h3>
        <p className="text-gray-600 dark:text-gray-300">
          We're finding the perfect destinations for you...
        </p>
        
        {/* Loading Spinner */}
        <div className="mt-6 flex justify-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
        </div>
      </div>
    </div>
  );
};

export default LoadingOverlay;
