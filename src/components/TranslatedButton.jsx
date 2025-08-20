import React from 'react';
import TranslatedText from './TranslatedText';

/**
 * A button component that translates its text content
 */
const TranslatedButton = ({ 
  loadingText, 
  normalText, 
  isLoading, 
  className = '', 
  children,
  ...props 
}) => {
  return (
    <button className={className} {...props}>
      {isLoading ? (
        <div className='flex items-center justify-center'>
          <div className="animate-spin rounded-full h-4 w-4 sm:h-5 sm:w-5 border-b-2 border-white mr-2"></div>
          <TranslatedText text={loadingText} />
        </div>
      ) : (
        <TranslatedText text={normalText} />
      )}
      {children}
    </button>
  );
};

export default TranslatedButton;
