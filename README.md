# HotelHub

A React Native hotel booking app with Redux state management, React Navigation, and animated UI.

## Tech Stack

- React Native 0.85.3
- React 19.2.3
- Redux Toolkit + React Redux
- React Navigation (Bottom Tabs + Native Stack)
- React Native Reanimated
- Lucide React Native icons

## Getting Started

> **Note**: Complete the [React Native Environment Setup](https://reactnative.dev/docs/set-up-your-environment) first.

### Start Metro

```sh
npm start
```

### Run the app

```sh
# Android
npm run android

# iOS
npm run ios
```

### Lint & Test

```sh
npm run lint
npm test
```

## Project Structure

```
src/
├── navigation/       # AppNavigator, BottomTabNavigator
├── screens/          # HomeScreen, BookingScreen, OfferScreen, ProfileScreen,
│                     # SearchScreen, TrendingScreen, ExploreScreen
├── components/       # TopNavBar, HeroSection, SearchAndStays, HotelHubHeader, etc.
├── redux/            # store, HotelSlice
└── context/          # HomeContext (form/UI state)
```

## Architecture

- **Splash** → **Bottom Tabs** (Home | Bookings | Offers | Profile)
- Root stack screens: Search, Trending, Explore (accessible from TopNavBar)
- **Redux** manages hotel data (recent stays, featured hotels)
- **HomeContext** manages form state (destination, dates, guests, rooms)

See [WORKFLOW.md](./WORKFLOW.md) for detailed navigation and data flow diagrams.
