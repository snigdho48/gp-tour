import React, {  useState } from "react";
import axios from "axios";

// Import components
import {
  BudgetForm,
  TripCard,
  ErrorMessage,
  EmptyState,
  ThemeToggle,
  GPStarOfferCategories,
  TermsAndConditions,
  HowToBeGPStar,
  PWAInstallPrompt,
  LanguageToggle,
  LoadingOverlay,
  TranslatedText
} from "./index.js";

// Import constants and utilities
import { generateTripSuggestions } from "../utils/calculations.js";

// Main App Component
function Home() {
  const [budgetBDT, setBudgetBDT] = useState("");
  const [people, setPeople] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [exitingSuggestions, setExitingSuggestions] = useState([]);
  const [transitionKey, setTransitionKey] = useState(0);


  const handleGenerateSuggestions = async () => {
    if (!budgetBDT || !people) {
      setError('Please enter budget and number of people');
      return;
    }

    setError('');
    setIsLoading(true);

    try {
    // If there are existing suggestions, fade them out one by one
    if (suggestions.length > 0) {
        
      // Copy current suggestions to exiting state
      setExitingSuggestions([...suggestions]);
      setSuggestions([]); // Clear current suggestions immediately

      // Start fading out cards one by one
      const exitDelay = 100; // 100ms between each card exit

      // After all cards have started exiting, wait for animation to complete
        setTimeout(async () => {
        setExitingSuggestions([]); // Remove exiting cards
          setTransitionKey(prev => prev + 1);
          
          // Call API to get data, then use calculations
          await generateSuggestionsFromAPI();
        }, (suggestions.length * exitDelay) + 800); // Wait for all exits + animation duration
        
      } else {
        await generateSuggestionsFromAPI();
      }
    } catch (error) {
      console.error('Error in handleGenerateSuggestions:', error);
      setError('Failed to generate suggestions');
      setIsLoading(false);
    }
  };

  // Helper function to generate suggestions from API
  const generateSuggestionsFromAPI = async () => {
    try {
          let peopleCount = parseInt(people) || 1;
      if (people === '' || peopleCount <= 0) {
            peopleCount = 1;
            setPeople(1);
          }
      
      // Call API to get trip suggestions
      const response = await axios.post(
        "https://play.reachableads.com/receive_message",
        {
          content: `You are a travel planning expert. Generate EXACTLY 3 trip suggestions for budget ${budgetBDT} BDT and ${peopleCount} people.

THINKING PROCESS:
1. Total trip cost for ${peopleCount} people should be 85-95% of ${budgetBDT} BDT (maximize budget usage)
2. Smart filtering based on budget:
   - If budget ≥ 300,000 BDT: Suggest ONLY International trips and 1 Domestic trip (ignore Day Tour)
   - If budget < 50,000 BDT per person: Suggest ONLY Domestic/Day Tour (ignore International)
   - Otherwise: Mix of International (60%), Domestic (30%), Day Tour (10%)
3. Ensure realistic cost distribution based on destination type
4. ALWAYS return exactly 3 plans - never 2, never 4

COST STRUCTURE GUIDELINES:
- International: Flight (40-50%), Hotel (25-30%), Transport (10-15%), Activities (15-20%)
- Domestic: Flight (0-20%), Hotel (30-40%), Transport (20-30%), Activities (30-40%)
- Day Tour: Transport (40-50%), Activities (40-50%), Food (10-20%)

BUDGET TARGETS:
- Target total cost: ${Math.round(budgetBDT * 0.95)} BDT (95% of budget)
- Allow 5-10% buffer for unexpected expenses

RESPONSE FORMAT - Use EXACTLY these keys and structure in JSON format:
{
  "trips": [
    {
      "type": "International|Domestic|Day Tour",
      "name": "Destination Name",
      "nights": number,
      "breakdownBDT": {
        "flight": number,
        "transport": number,
        "hotelPerNight": number,
        "activities": number
      },
      "stay": "Accommodation description",
      "highlights": ["Highlight 1", "Highlight 2"],
      "itinerary": ["Day 1: Activity", "Day 2: Activity"],
      "gpstarOffers": {
        "flightDiscountPct": number,
        "hotelDiscountPct": number,
        "extras": ["GPStar-OFFER1", "GPStar-OFFER2"]
      }
    }
  ]
}

CRITICAL REQUIREMENTS:
1. ALWAYS return exactly 3 trip plans - this is mandatory
2. If budget ≥ 300,000 BDT: All 3 must be International destinations
3. If budget < 50,000 BDT per person: All 3 must be Domestic/Day Tour
4. Total cost per trip × ${peopleCount} must be 85-95% of ${budgetBDT} BDT
5. breakdownBDT values must be realistic for destination type
6. Always return under "trips" key
7. Use breakdownBDT (not breakdownUSD)
8. Ensure all required fields are present
9. Return response in valid JSON format
10. Return 3 trip options each generation.

Generate exactly 3 diverse options that maximize budget usage while staying within constraints. If you cannot generate 3 valid options, create alternative destinations or adjust costs to meet the requirement. Return the response as a valid JSON object.`,
        }
      );
      
      // Process the response
      if (response.data && response.data.result) {
        try {
          // Clean the response string and parse as JSON
          const cleanResult = response.data.result.trim();
          
          console.log('Raw result:', response.data.result);
          console.log('Cleaned result:', cleanResult);
          
          // Parse the JSON string
          try {
            const parsedResult = JSON.parse(cleanResult);
            console.log('Parsed result:', parsedResult);
            
            // Extract trips array from the response - handle dynamic keys
            let tripOptions = null;
            
            // Look for any key that contains trip data (case-insensitive)
            for (const key in parsedResult) {
              if (typeof parsedResult[key] === 'object' && Array.isArray(parsedResult[key])) {
                // Check if this array contains valid trip objects
                if (parsedResult[key].length > 0 && 
                    parsedResult[key][0] && 
                    typeof parsedResult[key][0] === 'object' && 
                    parsedResult[key][0].type && 
                    parsedResult[key][0].name) {
                  tripOptions = parsedResult[key];
                  console.log(`Found trip data in key: "${key}"`);
                  break;
                }
              }
            }
            
            // If no trips found in nested keys, check if the root is an array
            if (!tripOptions && Array.isArray(parsedResult)) {
              if (parsedResult.length > 0 && 
                  parsedResult[0] && 
                  typeof parsedResult[0] === 'object' && 
                  parsedResult[0].type && 
                  parsedResult[0].name) {
                tripOptions = parsedResult;
                console.log('Found trip data in root array');
              }
            }
            
            if (!tripOptions) {
              console.error('No valid trip data found in response:', parsedResult);
              setError('No valid trip data found in API response');
              setSuggestions([]);
              return;
            }
            
            console.log('Trip options from API:', tripOptions);
            
            // Ensure we have exactly 3 plans
            if (tripOptions.length < 3) {
              console.warn(`API returned only ${tripOptions.length} plans, expected 3`);
              setError(`API returned only ${tripOptions.length} plans. Please try again to get exactly 3 options.`);
              setSuggestions([]);
              return;
            }
            
            if (tripOptions.length > 3) {
              console.warn(`API returned ${tripOptions.length} plans, taking first 3`);
              tripOptions = tripOptions.slice(0, 3);
            }
            
            // Use the calculation function to process the API data
            const result = generateTripSuggestions(budgetBDT, peopleCount, tripOptions);
          setError(result.error);
          setSuggestions(result.suggestions);
          } catch (parseError) {
            console.error('JSON Parse Error:', parseError);
            console.error('Raw result:', response.data.result);
            setError('Failed to parse API response');
            setSuggestions([]);
          }
        } catch (parseError) {
          console.error('JSON Parse Error:', parseError);
          console.error('Raw result:', response.data.result);
          setError('Failed to parse API response');
          setSuggestions([]);
        }
    } else {
        // No API data available
        console.error('No API response data');
        setError('No trip data received from API');
        setSuggestions([]);
      }
    } catch (apiError) {
      console.error('API Error:', apiError);
      setError('Failed to fetch trip suggestions from API');
      setSuggestions([]);
    } finally {
        setIsLoading(false);
    }
  };

  const handleViewDetails = (option) => {
    // You can implement detailed view functionality here
    console.log("View details for:", option.name);
  };

  const clearSuggestions = () => {
    setSuggestions([]);
    setExitingSuggestions([]);
    setError("");
  };

  const [showTerms, setShowTerms] = useState(false);
  const [showHowToBeGPStar, setShowHowToBeGPStar] = useState(false);

  return (
    <div className='min-h-screen w-full bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 transition-all duration-500 flex flex-col'>
      {/* Theme Toggle Button */}
      <div className='fixed top-4 right-4 z-10 sm:top-8'>
        <ThemeToggle />
      </div>

      {/* Language Toggle Button */}
      <div className='fixed top-4 left-4 z-10 sm:top-8'>
        <LanguageToggle />
      </div>

      <div className='flex-1 container mx-auto px-3 sm:px-6 md:px-8 lg:px-12 xl:px-16 py-6 sm:py-8 max-w-6xl w-full'>
        <BudgetForm
          budgetBDT={budgetBDT}
          setBudgetBDT={setBudgetBDT}
          people={people}
          setPeople={setPeople}
          onGenerate={handleGenerateSuggestions}
          isLoading={isLoading}
          suggestions={suggestions}
          clearSuggestions={clearSuggestions}
        />

        {error && (
          <div className='bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-xl p-3 sm:p-4 mb-4 sm:mb-6 text-red-700 dark:text-red-300 font-inter text-sm'>
            <TranslatedText text={error} />
          </div>
        )}

        {/* Results Container - maintains consistent height */}
        <div className='relative h-auto w-full'>
          {/* Exiting Cards - fade out one by one with absolute positioning */}
          {exitingSuggestions.length > 0 && (
            <div className='absolute inset-0 w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2 sm:gap-3 md:gap-4 lg:gap-6 xl:gap-8 max-w-full'>
              {exitingSuggestions.map((opt, idx) => (
                <div
                  key={`exiting-${opt.name}-${idx}`}
                  className='animate-fade-out'
                  style={{
                    animationDelay: `${idx * 100}ms`,
                    animationFillMode: "both",
                  }}
                >
                  <TripCard
                    trip={opt}
                    people={people}
                    onViewDetails={handleViewDetails}
          
                  />
                </div>
              ))}
            </div>
          )}

          {/* New Cards - fade in one by one */}
          {suggestions.length > 0 && (
            <div
              key={`grid-${transitionKey}`}
              className='w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2 sm:gap-3 md:gap-3 lg:gap-4 xl:gap-6 max-w-full'
            >
              {suggestions.map((opt, idx) => (
                <div
                  key={`${opt.name}-${idx}-${transitionKey}`}
                  className='animate-fade-in-up'
                  style={{
                    animationDelay: `${idx * 150}ms`,
                    animationFillMode: "both",
                  }}
                >
                  <TripCard
                    trip={opt}
                    people={people}
                    onViewDetails={handleViewDetails}
                  />
                </div>
              ))}
            </div>
          )}

          {/* Empty State with fade in */}
          {suggestions.length === 0 &&
            exitingSuggestions.length === 0 &&
            !error &&
            !isLoading && (
              <div className='animate-fade-in w-full'>
                <EmptyState />
              </div>
            )}
        </div>

        {/* GPStar Offer Categories Section - Displayed after trip suggestions */}
        {suggestions.length > 0 && <GPStarOfferCategories />}
      </div>

      {/* Footer Links - Fixed at bottom */}
      <div className='mt-auto container mx-auto px-3 sm:px-6 md:px-8 lg:px-12 xl:px-16 py-6 max-w-6xl w-full'>
        <div className='flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-8 text-center'>
          <button
            onClick={() => setShowTerms(true)}
            className='text-sm text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200 transition-colors duration-200 font-inter underline'
          >
            <TranslatedText text="Terms & Conditions" />
          </button>
          <button
            onClick={() => setShowHowToBeGPStar(true)}
            className='text-sm text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200 transition-colors duration-200 font-inter underline'
          >
            <TranslatedText text="How to be a GPStar" />
          </button>
        </div>
      </div>

      {/* PWA Install Prompt */}
      <PWAInstallPrompt />

      {/* Loading Overlay */}
      {isLoading && <LoadingOverlay />}

      {/* Terms & Conditions Popup */}
      <TermsAndConditions
        isOpen={showTerms}
        onClose={() => setShowTerms(false)}
      />

      {/* How to be a GPStar Popup */}
      <HowToBeGPStar
        isOpen={showHowToBeGPStar}
        onClose={() => setShowHowToBeGPStar(false)}
      />
    </div>
  );
}

export default Home;
