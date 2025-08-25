import React from 'react';
import 'flag-icons/css/flag-icons.min.css';

const LanguageToggle = () => {
  const languages = [
    { 
      code: 'en', 
      name: 'English',
      flag: 'us'
    },
    { 
      code: 'bn', 
      name: 'বাংলা',
      flag: 'bd'
    }
  ];

  return (
    <div className="flex items-center gap-1">
      <span className="text-xs sm:text-sm text-gray-600 dark:text-gray-400 hidden sm:block break-words leading-tight">Language:</span>
      <div className="flex bg-gray-100 dark:bg-gray-800 rounded-lg p-0.5 sm:p-1 shadow-lg border border-gray-200 dark:border-gray-600">
        {languages.map((lang) => (
          <div
            key={lang.code}
            className={`px-1.5 py-1.5 sm:px-2 sm:py-1 flex flex-row rounded-md text-xs sm:text-sm font-medium min-w-[36px] sm:min-w-0 ${
              lang.code === 'en'
                ? 'bg-blue-500 text-white shadow-md'
                : 'text-gray-600 dark:text-gray-400'
            }`}
          >
            <span className={`mr-1 fi fi-${lang.flag} text-base`} title={lang.name}></span>
            <span className="break-words leading-tight">{lang.name}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default LanguageToggle;
