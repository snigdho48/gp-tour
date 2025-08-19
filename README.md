# GPStar Budget Planner

A modern React application for planning travel budgets with GPStar offers and discounts.

## 🚀 Features

- **Budget Planning**: Enter your total budget in BDT and number of travelers
- **Smart Suggestions**: Get up to 3 trip suggestions based on your budget
- **GPStar Integration**: Includes all GPStar discounts and perks
- **Responsive Design**: Beautiful UI that works on all devices
- **Component Architecture**: Well-organized, maintainable code structure

## 🏗️ Project Structure

```
src/
├── components/           # Reusable UI components
│   ├── BudgetForm.jsx   # Budget input form
│   ├── TripCard.jsx     # Individual trip display card
│   ├── ErrorMessage.jsx # Error display component
│   ├── EmptyState.jsx   # Empty state component
│   └── index.js         # Component exports
├── constants/            # App constants and data
│   └── tripData.js      # Trip options, exchange rates, colors
├── utils/                # Utility functions
│   └── calculations.js   # Budget calculations and logic
├── App.jsx              # Main application component
├── App.css              # Component-specific styles
└── index.css            # Global styles and Tailwind imports
```

## 🧩 Components

### BudgetForm
- Handles budget and people input
- Triggers trip suggestions generation
- Shows loading states

### TripCard
- Displays individual trip information
- Shows cost breakdown with GPStar savings
- Includes highlights, perks, and itinerary

### ErrorMessage
- Displays validation and error messages
- Styled error notifications

### EmptyState
- Welcome message when no suggestions are shown
- Guides users to enter budget information

## 📊 Data Organization

### Constants (`tripData.js`)
- **Exchange Rates**: USD to BDT conversion
- **Trip Catalog**: All available destinations with pricing
- **GPStar Offers**: Discounts and perks for each trip
- **UI Colors**: Trip type color schemes

### Utilities (`calculations.js`)
- **Cost Calculations**: Per-person pricing with discounts
- **Budget Analysis**: Trip affordability filtering
- **Suggestion Logic**: Smart trip selection algorithm

## 🎨 Styling

- **Tailwind CSS**: Utility-first CSS framework
- **Responsive Design**: Mobile-first approach
- **Modern UI**: Smooth animations and hover effects
- **Color Coding**: Different colors for trip types

## 🚀 Getting Started

1. **Install Dependencies**
   ```bash
   yarn install
   ```

2. **Start Development Server**
   ```bash
   yarn dev
   ```

3. **Build for Production**
   ```bash
   yarn build
   ```

## 🔧 Customization

### Adding New Trips
Edit `src/constants/tripData.js` to add new destinations:
```javascript
{
  type: 'Domestic',
  name: 'New Destination',
  nights: 2,
  breakdownUSD: { flight: 0, transport: 20, hotelPerNight: 30, activities: 25 },
  stay: 'Hotel description',
  highlights: ['Highlight 1', 'Highlight 2'],
  itinerary: ['Day 1: Activity', 'Day 2: Activity'],
  gpstarOffers: { flightDiscountPct: 0, hotelDiscountPct: 10, extras: ['GPStar-PERK'] },
}
```

### Modifying Calculations
Edit `src/utils/calculations.js` to change pricing logic or add new features.

### Updating UI
Edit individual component files in `src/components/` to modify the interface.

## 📱 Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## 🛠️ Tech Stack

- **React 19**: Modern React with hooks
- **Vite**: Fast build tool and dev server
- **Tailwind CSS**: Utility-first CSS framework
- **PostCSS**: CSS processing
- **Yarn**: Package manager
