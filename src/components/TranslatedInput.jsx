import React, { useState, useEffect } from 'react';
import { useLanguage } from '../hooks/useLanguage.js';
import { translateText } from '../utils/translation.js';

/**
 * An input component that translates its placeholder text using LibreTranslate API
 */
const TranslatedInput = ({ 
  placeholder, 
  className = '', 
  ...props 
}) => {
  const { currentLanguage } = useLanguage();
  const [translatedPlaceholder, setTranslatedPlaceholder] = useState(placeholder);

  useEffect(() => {
    const translatePlaceholder = async () => {
      if (!placeholder || currentLanguage === 'en') {
        setTranslatedPlaceholder(placeholder);
        return;
      }

      try {
        const result = await translateText(placeholder, 'en', currentLanguage);
        setTranslatedPlaceholder(result || placeholder);
      } catch {
        setTranslatedPlaceholder(placeholder);
      }
    };

    translatePlaceholder();
  }, [placeholder, currentLanguage]);

  return (
    <input 
      {...props}
      placeholder={translatedPlaceholder}
      className={className}
    />
  );
};

export default TranslatedInput;
