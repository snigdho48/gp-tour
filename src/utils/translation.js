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
  "en-bn": {
    GPStar: "জিপি স্টার",
    "Trip Planner": "ট্রিপ প্ল্যানার",
    "Plan your perfect trip within your budget":
      "আপনার বাজেটের মধ্যে আপনার নিখুঁত ট্রিপ পরিকল্পনা করুন",
    "Total Budget (BDT)": "মোট বাজেট (টাকা)",
    "Number of People": "মানুষের সংখ্যা",
    "Enter your budget": "আপনার বাজেট লিখুন",
    "Enter number of people": "মানুষের সংখ্যা লিখুন",
    "Generate Trip Suggestions": "ট্রিপ পরামর্শ তৈরি করুন",
    "Generating Suggestions...": "পরামর্শ তৈরি হচ্ছে...",
    "Install GPStar Trip Planner": "জিপি স্টার ট্রিপ প্ল্যানার ইনস্টল করুন",
    "Add to your home screen for quick access and offline use":
      "দ্রুত অ্যাক্সেস এবং অফলাইন ব্যবহারের জন্য হোম স্ক্রিনে যোগ করুন",
    "Install App": "অ্যাপ ইনস্টল করুন",
    "Not Now": "এখন নয়",
    "Ready to Plan Your Trip?": "আপনার ট্রিপ পরিকল্পনা করার জন্য প্রস্তুত?",
    "Enter your budget and the number of people traveling to get personalized trip suggestions. We'll help you find the perfect destination within your budget!":
      "ব্যক্তিগতকৃত ট্রিপ পরামর্শ পেতে আপনার বাজেট এবং ভ্রমণকারী মানুষের সংখ্যা লিখুন। আমরা আপনাকে আপনার বাজেটের মধ্যে নিখুঁত গন্তব্য খুঁজে পেতে সাহায্য করব!",
    "Budget Summary": "বাজেট সারসংক্ষেপ",
    "Budget Allocation (BDT)": "বাজেট বরাদ্দ (টাকা)",
    Flight: "ফ্লাইট",
    Hotel: "হোটেল",
    Activities: "কার্যক্রম",
    "Local Transport": "স্থানীয় পরিবহন",
    "Contingency (5%)": "অনাকাঙ্ক্ষিত (৫%)",
    "Total Budget:": "মোট বাজেট:",
    "Per person:": "প্রতি ব্যক্তি:",
    "Per person": "প্রতি ব্যক্তি",
    "Show Detailed Breakdown": "বিস্তারিত বিভাজন দেখুন",
    "Hide Detailed Breakdown": "বিস্তারিত বিভাজন লুকান",
    "International flights typically cost 40-60% of total budget. Domestic flights are 15-25%.":
      "আন্তর্জাতিক ফ্লাইট সাধারণত মোট বাজেটের ৪০-৬০% খরচ করে। অভ্যন্তরীণ ফ্লাইট ১৫-২৫%।",
    "Hotel costs vary by destination type. Premium hotels are 30-40%, budget hotels are 20-25% of total.":
      "হোটেলের খরচ গন্তব্যের ধরন অনুযায়ী পরিবর্তিত হয়। প্রিমিয়াম হোটেল ৩০-৪০%, বাজেট হোটেল মোটের ২০-২৫%।",
    "Sightseeing, tours, and experiences. Usually 15-20% for cultural trips, 10-15% for beach trips.":
      "দর্শনীয় স্থান, ট্যুর এবং অভিজ্ঞতা। সাধারণত সাংস্কৃতিক ভ্রমণের জন্য ১৫-২০%, সৈকত ভ্রমণের জন্য ১০-১৫%।",
    "Local transportation, taxis, and transfers. Typically 8-12% of total budget for convenience.":
      "স্থানীয় পরিবহন, ট্যাক্সি এবং স্থানান্তর। সুবিধার জন্য সাধারণত মোট বাজেটের ৮-১২%।",
    "5% buffer for unexpected expenses, currency fluctuations, or last-minute changes. Essential for stress-free travel.":
      "অপ্রত্যাশিত খরচ, মুদ্রার ওঠানামা বা শেষ মুহূর্তের পরিবর্তনের জন্য ৫% বাফার। চাপমুক্ত ভ্রমণের জন্য অত্যাবশ্যক।",
    "Total Cost": "মোট খরচ",
    "Per Person": "প্রতি ব্যক্তি",
    Highlights: "মূল বৈশিষ্ট্য",
    "GPStar Perks": "জিপি স্টার সুবিধা",
    "Sample Itinerary": "নমুনা ভ্রমণ পরিকল্পনা",
    "Show Cost Breakdown": "খরচের বিস্তারিত দেখুন",
    "Hide Cost Breakdown": "খরচের বিস্তারিত লুকান",
    "Flight Cost:": "ফ্লাইট খরচ:",
    "Hotel Cost:": "হোটেল খরচ:",
    "Activities:": "কার্যক্রম:",
    "Transport Cost:": "পরিবহন খরচ:",
    "Contingency (5%):": "অনাকাঙ্ক্ষিত (৫%):",
    "Total:": "মোট:",
    "GPStar Savings!": "জিপি স্টার সঞ্চয়!",
    "View Details": "বিস্তারিত দেখুন",
    "Terms & Conditions": "শর্তাবলী ও শর্তাদি",
    "How to be a GPStar": "কিভাবে জিপি স্টার হবেন",
    // Terms and Conditions content
    "Welcome to GPStar Trip Planner. By using our service, you agree to the following terms and conditions:": "জিপি স্টার ট্রিপ প্ল্যানারে স্বাগতম। আমাদের পরিষেবা ব্যবহার করে, আপনি নিম্নলিখিত শর্তাবলী এবং শর্তাদিতে সম্মত হন:",
    "1. Service Usage": "১. পরিষেবার ব্যবহার",
    "GPStar Trip Planner provides travel planning and budget calculation services. All information provided is for planning purposes only.": "জিপি স্টার ট্রিপ প্ল্যানার ভ্রমণ পরিকল্পনা এবং বাজেট গণনা পরিষেবা প্রদান করে। প্রদত্ত সমস্ত তথ্য শুধুমাত্র পরিকল্পনার উদ্দেশ্যে।",
    "2. Accuracy of Information": "২. তথ্যের সঠিকতা",
    "While we strive for accuracy, travel costs and information may vary. Please verify all details before making travel arrangements.": "যদিও আমরা সঠিকতার জন্য প্রচেষ্টা করি, ভ্রমণের খরচ এবং তথ্য পরিবর্তিত হতে পারে। ভ্রমণের ব্যবস্থা করার আগে দয়া করে সমস্ত বিবরণ যাচাই করুন।",
    "3. User Responsibility": "৩. ব্যবহারকারীর দায়িত্ব",
    "Users are responsible for their own travel decisions and arrangements. GPStar is not liable for any travel-related issues.": "ব্যবহারকারীরা তাদের নিজস্ব ভ্রমণ সিদ্ধান্ত এবং ব্যবস্থার জন্য দায়ী। জিপি স্টার কোন ভ্রমণ-সম্পর্কিত সমস্যার জন্য দায়ী নয়।",
    "4. Privacy": "৪. গোপনীয়তা",
    "Your personal information and travel preferences are kept confidential and used only for trip planning purposes.": "আপনার ব্যক্তিগত তথ্য এবং ভ্রমণের পছন্দগুলি গোপন রাখা হয় এবং শুধুমাত্র ট্রিপ পরিকল্পনার উদ্দেশ্যে ব্যবহার করা হয়।",
    "5. Service Modifications": "৫. পরিষেবার পরিবর্তন",
    "GPStar reserves the right to modify or discontinue services at any time without prior notice.": "জিপি স্টার পূর্বাভাস ছাড়াই যে কোন সময় পরিষেবা পরিবর্তন বা বন্ধ করার অধিকার সংরক্ষণ করে।",
    "Last updated:": "সর্বশেষ আপডেট:",
    // How to be a GPStar content
    "Become a GPStar and unlock exclusive travel benefits and opportunities!": "জিপি স্টার হয়ে উঠুন এবং একচেটিয়া ভ্রমণ সুবিধা এবং সুযোগ আনলক করুন!",
    "🌟 What is GPStar?": "🌟 জিপি স্টার কী?",
    "GPStar is our premium membership program that gives you access to exclusive travel deals, personalized planning, and VIP services.": "জিপি স্টার আমাদের প্রিমিয়াম সদস্যপদ প্রোগ্রাম যা আপনাকে একচেটিয়া ভ্রমণ ডিল, ব্যক্তিগতকৃত পরিকল্পনা এবং ভিআইপি পরিষেবার অ্যাক্সেস দেয়।",
    "🎯 Benefits of Being a GPStar": "🎯 জিপি স্টার হওয়ার সুবিধা",
    "Exclusive travel deals and discounts": "একচেটিয়া ভ্রমণ ডিল এবং ছাড়",
    "Priority customer support": "অগ্রাধিকার গ্রাহক সহায়তা",
    "Personalized trip recommendations": "ব্যক্তিগতকৃত ট্রিপ সুপারিশ",
    "Early access to new features": "নতুন বৈশিষ্ট্যের প্রাথমিক অ্যাক্সেস",
    "Special roaming packages": "বিশেষ রোমিং প্যাকেজ",
    "Travel insurance benefits": "ভ্রমণ বীমা সুবিধা",
    "📱 How to Join": "📱 কীভাবে যোগদান করবেন",
    "To become a GPStar member, contact our customer service team or visit any GPStar store. Membership is free with qualifying services.": "জিপি স্টার সদস্য হওয়ার জন্য, আমাদের গ্রাহক পরিষেবা দলের সাথে যোগাযোগ করুন বা কোন জিপি স্টার স্টোরে যান। যোগ্য পরিষেবার সাথে সদস্যপদ বিনামূল্যে।",
    "📞 Contact Information": "📞 যোগাযোগের তথ্য",
    "Call: 121 (GPStar Customer Care)": "কল করুন: ১২১ (জিপি স্টার গ্রাহক যত্ন)",
    "Email: gpstar@gpstar.com": "ইমেইল: gpstar@gpstar.com",
    "Visit: Any GPStar store nationwide": "যান: দেশব্যাপী যেকোনো জিপি স্টার স্টোরে",
    "🚀 Ready to become a GPStar? Contact us today and start your premium travel journey!": "🚀 জিপি স্টার হওয়ার জন্য প্রস্তুত? আজই আমাদের সাথে যোগাযোগ করুন এবং আপনার প্রিমিয়াম ভ্রমণ যাত্রা শুরু করুন!",
    "Show Itinerary": "ইতিনারি দেখুন",
    "Hide Itinerary": "ইতিনারি লুকান",
    night: "রাত",
    nights: "রাত",
    "Hide Cost Details": "খরচের বিস্তারিত লুকান",
    "Show Cost Details": "খরচের বিস্তারিত দেখুন",
    "Cost Details": "খরচের বিস্তারিত",
    "Budget Allocation": "বাজেট বরাদ্দ",
    "Planning Your Trip": "আপনার ট্রিপ পরিকল্পনা করার জন্য",
    "We're finding the perfect destinations for you...":
      "আমরা আপনার জন্য নিখুঁত গন্তব্য খুঁজছি...",
    // Trip types
    International: "আন্তর্জাতিক",
    Domestic: "অভ্যন্তরীণ",
    "Day Trip": "দিনের ট্রিপ",
    // Trip descriptions
    "No stay — day trip": "থাকার জায়গা নেই—দিনের ট্রিপ",
    "3★ beachside hotel": "৩★ সৈকতের পাশের হোটেল",
    "Eco resort": "ইকো রিসোর্ট",
    "4★ city hotel": "৪★ শহরের হোটেল",
    "4★ resort": "৪★ রিসোর্ট",
    // Highlights
    "Beach sunset": "সৈকতের সূর্যাস্ত",
    "Marine Drive": "মেরিন ড্রাইভ",
    "Seafood dinner": "সামুদ্রিক খাবারের রাতের খাবার",
    "Tea gardens": "চা বাগান",
    "Lawachara forest": "লাওয়াছড়া বন",
    "Street food": "রাস্তার খাবার",
    "Grand Palace": "গ্র্যান্ড প্যালেস",
    "Temple tours": "মন্দিরের ট্যুর",
    Beaches: "সৈকত",
    "Heritage sites": "ঐতিহ্যবাহী স্থান",
    Museum: "জাদুঘর",
    // Itinerary parts
    "Morning:": "সকাল:",
    "Noon:": "দুপুর:",
    "Evening:": "সন্ধ্যা:",
    "Day 1:": "দিন ১:",
    "Day 2:": "দিন ২:",
    "Day 3:": "দিন ৩:",
    "Day 4:": "দিন ৪:",
    "Day 5:": "দিন ৫:",
    "Arrive, Laboni Beach & sunset": "আগমন, লাবণী সৈকত এবং সূর্যাস্ত",
    "Inani–Himchari, Marine Drive": "ইনানী–হিমছড়ি, মেরিন ড্রাইভ",
    "Local markets & depart": "স্থানীয় বাজার এবং প্রস্থান",
    "Travel & tea garden walk": "ভ্রমণ এবং চা বাগানের হাঁটা",
    "Lawachara safari & seven-layer tea": "লাওয়াছড়া সাফারি এবং সাত স্তরের চা",
    "Chinatown food tour": "চাইনাটাউন খাবার ট্যুর",
    "Floating market": "ভাসমান বাজার",
    "Shopping & depart": "কেনাকাটা এবং প্রস্থান",
    "Tanah Lot sunset": "তানাহ লট সূর্যাস্ত",
    "Ubud temples": "উবুদ মন্দির",
    "Nusa Dua beach": "নুসা দুয়া সৈকত",
    "Waterfalls & market": "জলপ্রপাত এবং বাজার",
    "Spa & depart": "স্পা এবং প্রস্থান",
    "Travel to Sonargaon": "সোনারগাঁও ভ্রমণ",
    "Museum & Panam City walk": "জাদুঘর এবং পানাম সিটি হাঁটা",
    "Return to Dhaka": "ঢাকায় ফিরে আসা",

    // ===== COMPREHENSIVE TRIP DATA TRANSLATIONS =====

    // Trip Names
    "Cox's Bazar": "কক্সবাজার",
    Sreemangal: "শ্রীমঙ্গল",
    "Bangkok, Thailand": "ব্যাংকক, থাইল্যান্ড",
    "Bali, Indonesia": "বালি, ইন্দোনেশিয়া",
    "Sonargaon & Panam City": "সোনারগাঁও এবং পানাম সিটি",

    // Itinerary - Cox's Bazar
    "Day 1: Arrive, Laboni Beach & sunset":
      "দিন ১: আগমন, লাবণী সৈকত এবং সূর্যাস্ত",
    "Day 2: Inani–Himchari, Marine Drive": "দিন ২: ইনানী–হিমছড়ি, মেরিন ড্রাইভ",
    "Day 3: Local markets & depart": "দিন ৩: স্থানীয় বাজার এবং প্রস্থান",

    // Itinerary - Sreemangal
    "Day 1: Travel & tea garden walk": "দিন ১: ভ্রমণ এবং চা বাগানের হাঁটা",
    "Day 2: Lawachara safari & seven-layer tea":
      "দিন ২: লাওয়াছড়া সাফারি এবং সাত স্তরের চা",

    // Itinerary - Bangkok
    "Day 1: Chinatown food tour": "দিন ১: চাইনাটাউন খাবার ট্যুর",
    "Day 2: Grand Palace": "দিন ২: গ্র্যান্ড প্যালেস",
    "Day 3: Floating market": "দিন ৩: ভাসমান বাজার",
    "Day 4: Shopping & depart": "দিন ৪: কেনাকাটা এবং প্রস্থান",

    // Itinerary - Bali
    "Day 1: Tanah Lot sunset": "দিন ১: তানাহ লট সূর্যাস্ত",
    "Day 2: Ubud temples": "দিন ২: উবুদ মন্দির",
    "Day 3: Nusa Dua beach": "দিন ৩: নুসা দুয়া সৈকত",
    "Day 4: Waterfalls & market": "দিন ৪: জলপ্রপাত এবং বাজার",
    "Day 5: Spa & depart": "দিন ৫: স্পা এবং প্রস্থান",

    // Additional missing itinerary translations
    "Morning: Travel to Sonargaon": "সকাল: সোনারগাঁও ভ্রমণ",
    "Noon: Museum & Panam City walk": "দুপুর: জাদুঘর এবং পানাম সিটি হাঁটা",
    "Evening: Return to Dhaka": "সন্ধ্যা: ঢাকায় ফিরে আসা",

    // ===== END COMPLETE TRIP DATA TRANSLATIONS =====

    // ===== GPSTAR OFFER CATEGORIES TRANSLATIONS =====

    // GPStar Offer Categories Section
    "GPStar Offer": "জিপি স্টার অফার",

    // Category Names
    "Travel Aggregators": "ভ্রমণ সমষ্টিকারী",
    Transportation: "পরিবহন",
    "Hotels & Resorts (Domestic)": "হোটেল এবং রিসোর্ট (অভ্যন্তরীণ)",
    "Travel Insurance": "ভ্রমণ বীমা",
    "Travel Luggage & Bags": "ভ্রমণ লগেজ এবং ব্যাগ",
    "Holiday Outfits": "ছুটির পোশাক",
    "Travel Groups/Agencies": "ভ্রমণ গ্রুপ/এজেন্সি",
    "International Roaming": "আন্তর্জাতিক রোমিং",

    // Examples
    "GoZayaan, ShareTrip, Flight Expert":
      "গোজায়ান, শেয়ারট্রিপ, ফ্লাইট এক্সপার্ট",
    "US-Bangla, NovoAir, Shohoz, Garibook, Soudia":
      "ইউএস-বাংলা, নভোএয়ার, শোহোজ, গারিবুক, সৌদিয়া",
    "Seagull, Sayeman, Grand Sylhet": "সিগাল, সায়েমান, গ্র্যান্ড সিলেট",
    "Green Delta, MTB": "গ্রিন ডেল্টা, এমটিবি",
    "Sara Lifestyle, President Bags": "সারা লাইফস্টাইল, প্রেসিডেন্ট ব্যাগ",
    "Lotto, Apex, Ecstasy, Sailor": "লটো, এপেক্স, এক্সট্যাসি, সেইলর",
    "Wander Woman, FirstTrip": "ওয়ান্ডার ওম্যান, ফার্স্টট্রিপ",
    "GPStar Roaming Packages": "জিপি স্টার রোমিং প্যাকেজ",

    // ===== ROAMING SUGGESTION TRANSLATIONS =====

    // Roaming Suggestion Section
    "Stay Connected with GPStar Roaming":
      "সংযুক্ত থাকুন জিপি স্টার রোমিংয়ের সাথে",
    "Get GPStar roaming packages for your trip to stay connected with family and share your travel moments instantly!":
      "আপনার ভ্রমণের জন্য জিপি স্টার রোমিং প্যাকেজ পান এবং আপনার ভ্রমণের সময় সম্প্রতি পরিবারের সাথে সংযুক্ত থাকুন এবং আপনার ভ্রমণের মুহূর্ত শেয়ার করুন!",
    "Save Upto 50% on your trip": "আপনার ট্রিপে ৫০% পর্যন্ত সাশ্রয় করুন",
    "Save 20% on flight tickets with GPStar": "জিপি স্টারের সাথে ফ্লাইট টিকিটে ২০% সাশ্রয় করুন",
    "Save 50% on hotels": "হোটেলে ৫০% সাশ্রয় করুন",
    "Save 15% on car booking": "কার বুকিংয়ে ১৫% সাশ্রয় করুন",
    // ===== END ROAMING SUGGESTION TRANSLATIONS =====

    // ===== END GPSTAR OFFER CATEGORIES TRANSLATIONS =====
  },
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
  console.log('translateText: Checking langPair:', langPair, 'text:', text);
  console.log('translateText: COMMON_TRANSLATIONS keys:', Object.keys(COMMON_TRANSLATIONS));
  console.log('translateText: COMMON_TRANSLATIONS[langPair] keys:', COMMON_TRANSLATIONS[langPair] ? Object.keys(COMMON_TRANSLATIONS[langPair]) : 'undefined');
  
  if (COMMON_TRANSLATIONS[langPair] && COMMON_TRANSLATIONS[langPair][text]) {
    const commonTranslation = COMMON_TRANSLATIONS[langPair][text];
    console.log('translateText: Found common translation:', commonTranslation);
    translationCache.set(cacheKey, commonTranslation);
    return commonTranslation;
  }
  
  console.log('translateText: No common translation found, will try API');

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
