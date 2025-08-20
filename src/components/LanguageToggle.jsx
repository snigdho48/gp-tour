import React, { useState } from 'react';
import { useLanguage } from '../hooks/useLanguage.js';

const LanguageToggle = () => {
  const { currentLanguage, changeLanguage } = useLanguage();
  const [isChanging, setIsChanging] = useState(false);
  
  const languages = [
    { code: 'en', name: 'English', flag: '🇺🇸' },
    { code: 'bn', name: 'বাংলা', flag: '🇧🇩' }
  ];

  const handleLanguageChange = (langCode) => {
    if (langCode === currentLanguage || isChanging) {
      return;
    }
    
    setIsChanging(true);
    try {
      changeLanguage(langCode);
    } finally {
      setIsChanging(false);
    }
  };

  return (
    <div className="flex items-center gap-1">
      <span className="text-xs sm:text-sm text-gray-600 dark:text-gray-400 hidden sm:block break-words leading-tight">Language:</span>
      <div className="flex bg-gray-100 dark:bg-gray-800 rounded-lg p-0.5 sm:p-1 shadow-lg border border-gray-200 dark:border-gray-600">
        {languages.map((lang) => (
          <button
            key={lang.code}
            onClick={() => handleLanguageChange(lang.code)}
            disabled={isChanging}
            className={`px-1.5 py-1.5 sm:px-2 sm:py-1 rounded-md text-xs sm:text-sm font-medium transition-all duration-200 min-w-[36px] sm:min-w-0 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed ${
              currentLanguage === lang.code
                ? 'bg-blue-500 text-white shadow-md'
                : 'text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-700'
            }`}
          >
            <span className="mr-0.5 sm:mr-1">{lang.flag}</span>
            <span className="hidden sm:inline break-words leading-tight">{lang.name}</span>
            {isChanging && currentLanguage === lang.code && (
              <div className="inline-block w-2.5 h-2.5 sm:w-3 sm:h-3 border-2 border-white border-t-transparent rounded-full animate-spin ml-0.5 sm:ml-1"></div>
            )}
          </button>
        ))}
      </div>
    </div>
  );
};

export default LanguageToggle;
