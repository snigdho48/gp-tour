import React from 'react';
import TranslatedText from './TranslatedText';

function TermsAndConditions({ isOpen, onClose }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[70] flex items-center justify-center p-4">
      <div className="bg-white/95 drop-shadow-xl shadow-amber-50/10  dark:bg-gray-800/95 backdrop-blur-md rounded-2xl shadow-xl max-w-2xl w-full max-h-[80vh] overflow-y-auto border border-white/20 dark:border-gray-700/20">
        <div className="p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white font-telenor">
              <TranslatedText text="Terms & Conditions" />
            </h2>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors duration-200"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
          
          <div className="text-gray-700 dark:text-gray-300 text-sm leading-relaxed space-y-4">
            <p>
              <TranslatedText text="Welcome to GPStar Trip Planner. By using our service, you agree to the following terms and conditions:" />
            </p>
            
            <div>
              <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
                <TranslatedText text="1. Service Usage" />
              </h3>
              <p><TranslatedText text="GPStar Trip Planner provides travel planning and budget calculation services. All information provided is for planning purposes only." /></p>
            </div>
            
            <div>
              <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
                <TranslatedText text="2. Accuracy of Information" />
              </h3>
              <p><TranslatedText text="While we strive for accuracy, travel costs and information may vary. Please verify all details before making travel arrangements." /></p>
            </div>
            
            <div>
              <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
                <TranslatedText text="3. User Responsibility" />
              </h3>
              <p><TranslatedText text="Users are responsible for their own travel decisions and arrangements. GPStar is not liable for any travel-related issues." /></p>
            </div>
            
            <div>
              <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
                <TranslatedText text="4. Privacy" />
              </h3>
              <p><TranslatedText text="Your personal information and travel preferences are kept confidential and used only for trip planning purposes." /></p>
            </div>
            
            <div>
              <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
                <TranslatedText text="5. Service Modifications" />
              </h3>
              <p><TranslatedText text="GPStar reserves the right to modify or discontinue services at any time without prior notice." /></p>
            </div>
            
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-6">
              <TranslatedText text="Last updated:" /> {new Date().toLocaleDateString()}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default TermsAndConditions;
