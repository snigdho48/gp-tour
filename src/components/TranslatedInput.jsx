import React from 'react';

/**
 * An input component that displays placeholder text (translation functionality removed)
 */
const TranslatedInput = ({ 
  placeholder, 
  className = '', 
  ...props 
}) => {
  // Simply return the placeholder as-is without translation
  return (
    <input 
      {...props}
      placeholder={placeholder}
      className={className}
    />
  );
};

export default TranslatedInput;
