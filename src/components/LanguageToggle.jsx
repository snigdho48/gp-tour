import React, { useState, useEffect } from 'react';
import 'flag-icons/css/flag-icons.min.css';

const LanguageToggle = () => {
  const [currentLanguage, setCurrentLanguage] = useState('bn');
  const [isChanging, setIsChanging] = useState(false);
  
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

  useEffect(() => {
    // Load saved language preference
    const savedLanguage = localStorage.getItem('preferredLanguage');
    if (savedLanguage) {
      setCurrentLanguage(savedLanguage);
      // Set initial document language
      document.documentElement.lang = savedLanguage;
      if (savedLanguage !== 'en') {
        triggerBrowserTranslation(savedLanguage);
      }
    }
    
    console.log('LanguageToggle mounted, current language:', savedLanguage || 'bn');
  }, []);

  const triggerBrowserTranslation = (targetLang) => {
    console.log('Triggering browser translation to:', targetLang);
    
    try {
      // Method 1: Set document language and translation attributes
      document.documentElement.lang = targetLang;
      document.documentElement.setAttribute('translate', 'yes');
      
      // Method 2: Add translation class to body
      document.body.classList.add('translated');
      document.body.setAttribute('data-translate', 'yes');
      
      // Method 3: Set language on body as well
      document.body.lang = targetLang;
      
      // Method 4: Add translation hints to key elements
      const textElements = document.querySelectorAll('h1, h2, h3, h4, h5, h6, p, span, div, button, label');
      textElements.forEach(el => {
        if (el.textContent && el.textContent.trim().length > 0) {
          el.setAttribute('translate', 'yes');
          el.lang = targetLang;
        }
      });
      
      // Method 5: Trigger browser translation API if available
      if (navigator.language && navigator.languages) {
        // Try to set browser language preference
        try {
          Object.defineProperty(navigator, 'language', {
            get: () => targetLang,
            configurable: true
          });
        } catch {
          console.log('Could not override navigator.language');
        }
      }
      
      // Method 6: Add meta tags for language
      addLanguageMetaTags(targetLang);
      
      // Method 7: Dispatch custom event to notify other components
      window.dispatchEvent(new CustomEvent('languageChanged', { 
        detail: { language: targetLang } 
      }));
      
      console.log('Browser translation triggered successfully');
      
    } catch (error) {
      console.error('Error triggering browser translation:', error);
    }
  };

  const addLanguageMetaTags = (lang) => {
    // Remove existing language meta tags
    const existingMeta = document.querySelector('meta[name="language"]');
    if (existingMeta) {
      existingMeta.remove();
    }
    
    // Add new language meta tag
    const meta = document.createElement('meta');
    meta.name = 'language';
    meta.content = lang;
    document.head.appendChild(meta);
    
    // Also update existing meta tags
    const htmlLangMeta = document.querySelector('meta[http-equiv="content-language"]');
    if (htmlLangMeta) {
      htmlLangMeta.content = lang;
    } else {
      const newHtmlLangMeta = document.createElement('meta');
      newHtmlLangMeta.httpEquiv = 'content-language';
      newHtmlLangMeta.content = lang;
      document.head.appendChild(newHtmlLangMeta);
    }
  };

  const resetToEnglish = () => {
    console.log('Resetting to English');
    
    // Reset document attributes
    document.documentElement.lang = 'en';
    document.documentElement.setAttribute('translate', 'no');
    document.body.classList.remove('translated');
    document.body.removeAttribute('data-translate');
    document.body.lang = 'en';
    
    // Remove translation attributes from text elements
    const textElements = document.querySelectorAll('[translate="yes"]');
    textElements.forEach(el => {
      el.removeAttribute('translate');
      el.lang = 'en';
    });
    
    // Remove language meta tags
    const languageMeta = document.querySelector('meta[name="language"]');
    if (languageMeta) languageMeta.remove();
    
    const contentLangMeta = document.querySelector('meta[http-equiv="content-language"]');
    if (contentLangMeta) contentLangMeta.remove();
    
    // Dispatch event
    window.dispatchEvent(new CustomEvent('languageChanged', { 
      detail: { language: 'en' } 
    }));
    
    console.log('Reset to English completed');
  };

  const handleLanguageChange = (langCode) => {
    console.log('Language change clicked:', langCode);
    
    if (langCode === currentLanguage || isChanging) {
      console.log('Language change blocked - same language or already changing');
      return;
    }
    
    setIsChanging(true);
    console.log('Starting language change to:', langCode);
    
    try {
      // Update state and localStorage
      setCurrentLanguage(langCode);
      localStorage.setItem('preferredLanguage', langCode);
      
      if (langCode === 'en') {
        // Reset to English
        resetToEnglish();
      } else {
        // Trigger browser translation
        triggerBrowserTranslation(langCode);
      }
      
      // Show success message
      
    } catch (error) {
      console.error('Language change error:', error);
      showMessage('Language change failed', 'error');
    } finally {
      setIsChanging(false);
      console.log('Language change completed');
    }
  };

  const showMessage = (text, type = 'info') => {
    // Remove existing message
    const existingMessage = document.getElementById('language-message');
    if (existingMessage) {
      existingMessage.remove();
    }
    
    // Create new message
    const message = document.createElement('div');
    message.id = 'language-message';
    
    const bgColor = type === 'success' ? 'bg-green-500' : 
                   type === 'error' ? 'bg-red-500' : 'bg-blue-500';
    
    message.className = `fixed top-20 left-4 ${bgColor} text-white px-4 py-2 rounded-lg shadow-lg z-50 text-sm`;
    message.textContent = text;
    
    document.body.appendChild(message);
    
    // Auto-remove after 3 seconds
    setTimeout(() => {
      if (message.parentElement) {
        message.remove();
      }
    }, 3000);
  };

  return (
    <div 
    style={{
      transformOrigin: 'top left',
    }}
    className='scale-75 sm:scale-100 flex items-center gap-2 p-2 bg-white/80 dark:bg-gray-800/80 rounded-lg shadow-lg border border-gray-200 dark:border-gray-600'>
      <span className='text-xs sm:text-sm text-gray-600 dark:text-gray-400 hidden sm:block break-words leading-tight'>
        Language:
      </span>

      {/* Language buttons */}
      <div className='flex gap-1 '>
        {languages.map((lang) => (
          <button
            key={lang.code}
            onClick={() => handleLanguageChange(lang.code)}
            disabled={isChanging}
            className={`
              px-3 py-2 flex items-center gap-2 rounded-md text-sm font-medium 
              transition-all duration-200 cursor-pointer
              ${
                currentLanguage === lang.code
                  ? "bg-blue-500 text-white shadow-md"
                  : "bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600"
              }
              ${isChanging ? "opacity-50 cursor-not-allowed" : ""}
            `}
            title={`Switch to ${lang.name}`}
          >
            <span className={`fi fi-${lang.flag} text-base`}></span>
            <span className=' '>{lang.name}</span>
            {isChanging && currentLanguage === lang.code && (
              <div className='w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin'></div>
            )}
          </button>
        ))}
      </div>
    </div>
  );
};

export default LanguageToggle;
