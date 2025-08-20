import { useState, useEffect, useCallback } from 'react';
import { useLanguage } from '../contexts/LanguageContext.jsx';
import { translateText, translateItinerary, translateOffers } from '../utils/translation.js';

export const useTranslation = () => {
  const { currentLanguage } = useLanguage();
  const [translatedTexts, setTranslatedTexts] = useState(new Map());
  const [isTranslating, setIsTranslating] = useState(false);

  // Translate single text
  const translate = useCallback(async (text) => {
    if (!text || currentLanguage === 'en') {
      return text;
    }

    // Check if already translated
    if (translatedTexts.has(text)) {
      return translatedTexts.get(text);
    }

    try {
      // Add a small delay to avoid overwhelming the APIs
      await new Promise(resolve => setTimeout(resolve, 100));
      
      const translated = await translateText(text, 'en', currentLanguage);
      if (translated && translated !== text) {
        setTranslatedTexts(prev => new Map(prev).set(text, translated));
        return translated;
      }
      return text;
    } catch {
      return text;
    }
  }, [currentLanguage, translatedTexts]);

  // Batch translate multiple texts
  const translateBatchTexts = useCallback(async (texts) => {
    if (currentLanguage === 'en') {
      return texts;
    }

    setIsTranslating(true);
    try {
      const results = {};
      for (const [key, text] of Object.entries(texts)) {
        results[key] = await translate(text);
      }
      return results;
    } finally {
      setIsTranslating(false);
    }
  }, [currentLanguage, translate]);

  // Translate itinerary content
  const translateItineraryContent = useCallback(async (itinerary) => {
    if (currentLanguage === 'en') {
      return itinerary;
    }

    try {
      return await translateItinerary(itinerary, currentLanguage);
    } catch {
      return itinerary;
    }
  }, [currentLanguage]);

  // Translate offers content
  const translateOffersContent = useCallback(async (offers) => {
    if (currentLanguage === 'en') {
      return offers;
    }

    try {
      return await translateOffers(offers, currentLanguage);
    } catch {
      return offers;
    }
  }, [currentLanguage]);

  // Clear cache when language changes
  useEffect(() => {
    setTranslatedTexts(new Map());
  }, [currentLanguage]);

  return {
    currentLanguage,
    translate,
    translateBatchTexts,
    translateItineraryContent,
    translateOffersContent,
    isTranslating,
    clearCache: () => setTranslatedTexts(new Map())
  };
};
