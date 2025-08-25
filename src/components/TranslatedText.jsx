import React from 'react';

/**
 * A component that displays text (translation functionality removed)
 */
const TranslatedText = ({ 
  text, 
  as = 'span', 
  className = '', 
  children,
  ...props 
}) => {
  // Simply return the text as-is without translation
  const displayText = text || children;

  // Use React.createElement for dynamic element type
  return React.createElement(
    as,
    { className, ...props, style: { fontFamily: "TelenorEvolution" } },
    displayText
  );
};

export default TranslatedText;
