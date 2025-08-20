// Translation utilities using free APIs
const LIBRE_TRANSLATE_URL = 'https://libretranslate.de/translate';
const MY_MEMORY_URL = 'https://api.mymemory.translated.net/get';

// Cache for translations to reduce API calls
const translationCache = new Map();

// Rate limiting for APIs
const rateLimitMap = new Map();
const RATE_LIMIT_DELAY = 1000; // 1 second between calls to same API

/**
 * Rate limiting helper
 */
const checkRateLimit = (apiName) => {
  const now = Date.now();
  const lastCall = rateLimitMap.get(apiName) || 0;
  
  if (now - lastCall < RATE_LIMIT_DELAY) {
    return false;
  }
  
  rateLimitMap.set(apiName, now);
  return true;
};

/**
 * Translate text using LibreTranslate API
 */
export const translateWithLibreTranslate = async (text, sourceLang, targetLang) => {
  if (!checkRateLimit('libretranslate')) {
    console.log('LibreTranslate: Rate limited, skipping request');
    return null;
  }
  
  try {
    const response = await fetch(LIBRE_TRANSLATE_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        q: text,
        source: sourceLang,
        target: targetLang,
      }),
    });

    if (!response.ok) {
      throw new Error(`LibreTranslate API error: ${response.status}`);
    }

    const data = await response.json();
    return data.translatedText;
  } catch (error) {
    console.warn('LibreTranslate failed:', error.message);
    return null;
  }
};

/**
 * Translate text using MyMemory API
 */
export const translateWithMyMemory = async (text, sourceLang, targetLang) => {
  if (!checkRateLimit('mymemory')) {
    console.log('MyMemory: Rate limited, skipping request');
    return null;
  }
  
  try {
    const url = `${MY_MEMORY_URL}?q=${encodeURIComponent(text)}&langpair=${sourceLang}|${targetLang}`;
    const response = await fetch(url);
    
    if (!response.ok) {
      if (response.status === 429) {
        console.warn('MyMemory API: Rate limit exceeded, will retry later');
        return null;
      }
      throw new Error(`MyMemory API error: ${response.status}`);
    }

    const data = await response.json();
    return data.responseData?.translatedText || null;
  } catch (error) {
    console.warn('MyMemory API failed:', error.message);
    return null;
  }
};

// Common translations to avoid API calls
const COMMON_TRANSLATIONS = {
  'en-bn': {
    'GPStar': 'জিপি স্টার',
    'Trip Planner': 'ট্রিপ প্ল্যানার',
    'Plan your perfect trip within your budget': 'আপনার বাজেটের মধ্যে আপনার নিখুঁত ট্রিপ পরিকল্পনা করুন',
    'Total Budget (BDT)': 'মোট বাজেট (টাকা)',
    'Number of People': 'মানুষের সংখ্যা',
    'Enter your budget': 'আপনার বাজেট লিখুন',
    'Enter number of people': 'মানুষের সংখ্যা লিখুন',
    'Generate Trip Suggestions': 'ট্রিপ পরামর্শ তৈরি করুন',
    'Generating Suggestions...': 'পরামর্শ তৈরি হচ্ছে...',
    'Install GPStar Trip Planner': 'জিপি স্টার ট্রিপ প্ল্যানার ইনস্টল করুন',
    'Add to your home screen for quick access and offline use': 'দ্রুত অ্যাক্সেস এবং অফলাইন ব্যবহারের জন্য হোম স্ক্রিনে যোগ করুন',
    'Install App': 'অ্যাপ ইনস্টল করুন',
    'Not Now': 'এখন নয়',
    'Ready to Plan Your Trip?': 'আপনার ট্রিপ পরিকল্পনা করার জন্য প্রস্তুত?',
    'Enter your budget and the number of people traveling to get personalized trip suggestions. We\'ll help you find the perfect destination within your budget!': 'ব্যক্তিগতকৃত ট্রিপ পরামর্শ পেতে আপনার বাজেট এবং ভ্রমণকারী মানুষের সংখ্যা লিখুন। আমরা আপনাকে আপনার বাজেটের মধ্যে নিখুঁত গন্তব্য খুঁজে পেতে সাহায্য করব!'
  }
};

/**
 * Smart translation with fallback
 */
export const translateText = async (text, sourceLang, targetLang) => {
  if (!text || sourceLang === targetLang) {
    return text;
  }

  // Check cache first
  const cacheKey = `${text}:${sourceLang}:${targetLang}`;
  if (translationCache.has(cacheKey)) {
    return translationCache.get(cacheKey);
  }

  // Check common translations first
  const langPair = `${sourceLang}-${targetLang}`;
  if (COMMON_TRANSLATIONS[langPair] && COMMON_TRANSLATIONS[langPair][text]) {
    const commonTranslation = COMMON_TRANSLATIONS[langPair][text];
    translationCache.set(cacheKey, commonTranslation);
    return commonTranslation;
  }

  // Try LibreTranslate first
  let translatedText = await translateWithLibreTranslate(text, sourceLang, targetLang);
  
  // Fallback to MyMemory if LibreTranslate fails
  if (!translatedText) {
    translatedText = await translateWithMyMemory(text, sourceLang, targetLang);
  }

  // If both fail, return original text
  if (!translatedText) {
    return text;
  }

  // Cache the result
  translationCache.set(cacheKey, translatedText);
  return translatedText;
};

/**
 * Translate itinerary content
 */
export const translateItinerary = async (itinerary, targetLang) => {
  if (!Array.isArray(itinerary)) return itinerary;
  
  try {
    const translatedItems = await Promise.all(
      itinerary.map(async (item) => {
        if (typeof item === 'string') {
          return await translateText(item, 'en', targetLang);
        }
        return item;
      })
    );
    return translatedItems;
  } catch {
    return itinerary;
  }
};

/**
 * Translate offers content
 */
export const translateOffers = async (offers, targetLang) => {
  if (!offers || typeof offers !== 'object') return offers;
  
  try {
    const translatedOffers = {};
    for (const [key, value] of Object.entries(offers)) {
      if (Array.isArray(value)) {
        translatedOffers[key] = await Promise.all(
          value.map(async (item) => {
            if (typeof item === 'string') {
              return await translateText(item, 'en', targetLang);
            }
            return item;
          })
        );
      } else if (typeof value === 'string') {
        translatedOffers[key] = await translateText(value, 'en', targetLang);
      } else {
        translatedOffers[key] = value;
      }
    }
    return translatedOffers;
  } catch {
    return offers;
  }
};

/**
 * Smart translation with intelligent fallback
 */
export const smartTranslate = async (text, targetLang) => {
  if (!text || targetLang === 'en') return text;
  
  try {
    const translated = await translateText(text, 'en', targetLang);
    return translated || text;
  } catch {
    return text;
  }
};
