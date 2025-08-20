import React, { useState, useEffect } from 'react';
import { useTranslation } from '../hooks/useTranslation.js';

/**
 * A component that automatically translates its text content
 */
const TranslatedText = ({ 
  text, 
  as = 'span', 
  className = '', 
  children,
  ...props 
}) => {
  const { translate } = useTranslation();
  const [translatedText, setTranslatedText] = useState(text);

  useEffect(() => {
    const translateText = async () => {
      if (!text) return;
      
      try {
        const result = await translate(text);
        setTranslatedText(result);
      } catch {
        setTranslatedText(text);
      }
    };

    translateText();
  }, [text, translate]);

  // Use React.createElement for dynamic element type
  return React.createElement(
    as,

    { className, ...props, style: { fontFamily: "TelenorEvolution" } },
    translatedText || children
  );
};

export default TranslatedText;
