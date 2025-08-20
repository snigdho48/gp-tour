import React from 'react';
import Lottie from 'lottie-react';
import TranslatedText from './TranslatedText';
import lottieFile from '../assets/aCydnqiZYh.json';

const LoadingOverlay = () => {
  console.log('LoadingOverlay component rendered');
  const [lottieError, setLottieError] = React.useState(false);
  
  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center">
      <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-2xl text-center">
        {/* Lottie Animation */}
        <div className="mb-6">
          <div className="w-48 h-48 mx-auto">
                         {!lottieError ? (
               <Lottie
                 animationData={lottieFile}
                 loop
                 autoplay
                 onError={(error) => {
                   console.error('Lottie error:', error);
                   setLottieError(true);
                 }}
                 onLoad={() => console.log('Lottie loaded successfully')}
               />
             ) : (
              // Fallback to a simple loading spinner
              <div className="w-full h-full flex items-center justify-center">
                <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-500"></div>
              </div>
            )}
          </div>
        </div>
        
        {/* Loading Text */}
        <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-2 break-words leading-tight">
          <TranslatedText text="Planning Your Trip" />
        </h3>
        <p className="text-gray-600 dark:text-gray-300 break-words leading-tight">
          <TranslatedText text="We're finding the perfect destinations for you..." />
        </p>
      </div>
    </div>
  );
};

export default LoadingOverlay;
