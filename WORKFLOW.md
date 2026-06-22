# HotelHub — Complete Workflow Chart

## 1. Application Startup Flow

```
┌─────────────────────────────────────────────────────────────────┐
│                        index.js                                  │
│              (React Native Entry Point)                          │
│         Registers "HotelHub" with AppRegistry                    │
└──────────────────────────┬──────────────────────────────────────┘
                           │
                           ▼
┌─────────────────────────────────────────────────────────────────┐
│                        App.js                                    │
│                                                                  │
│  ┌──────────────────────────────────────────────────────────┐   │
│  │  <Provider store={store}>     ← Redux Provider (global)  │   │
│  │  └── <AppNavigator />                                   │   │
│  └──────────────────────────────────────────────────────────┘   │
│                                                                  │
│  Imports:                                                        │
│    ├── store        → src/redux/store/store.js                  │
│    └── AppNavigator → src/navigation/AppNavigator.js            │
└──────────────────────────┬──────────────────────────────────────┘
                           │
                           ▼
┌─────────────────────────────────────────────────────────────────┐
│                  AppNavigator.js                                 │
│                                                                  │
│  ┌──────────────────────────────────────────────────────────┐   │
│  │  <HomeProvider>        ← React Context (form/UI state)   │   │
│  │  └── <NavigationContainer>                               │   │
│  │      └── <Stack.Navigator initialRouteName="Splash">     │   │
│  │          ├── "Splash"    → SplashScreen                  │   │
│  │          ├── "Bottom"    → BottomTabNavigator            │   │
│  │          ├── "Search"    → SearchScreen    (slide_from_right) │
│  │          ├── "Trending"  → TrendingScreen  (slide_from_right) │
│  │          └── "Explore"   → ExploreScreen   (slide_from_right) │
│  └──────────────────────────────────────────────────────────┘   │
│                                                                  │
│  State: HomeContext { selectedTab, destination, checkInOut,     │
│                       guests, rooms }                            │
└──────────────────────────┬──────────────────────────────────────┘
                           │
                           ▼
┌─────────────────────────────────────────────────────────────────┐
│                    SplashScreen.js                               │
│                                                                  │
│  ┌──────────────────────────────────────────────────────────┐   │
│  │  Animated Sequence:                                       │   │
│  │  1. Logo fade-in + spring scale                          │   │
│  │  2. Spinning loader ring (loop)                          │   │
│  │  3. Tagline fade-in                                      │   │
│  │  4. Cityscape image fade-in (image 31.png)               │   │
│  │                                                          │   │
│  │  After 3 seconds: navigation.replace('Bottom')           │   │
│  └──────────────────────────────────────────────────────────┘   │
│                                                                  │
│  Assets: image 31.png (cityscape)                               │
│  Cleanup: Animation loops stopped on unmount                    │
└──────────────────────────┬──────────────────────────────────────┘
                           │
                    navigation.replace('Bottom')
                           │
                           ▼
┌─────────────────────────────────────────────────────────────────┐
│              BottomTabNavigator.js                               │
│                                                                  │
│  ┌──────────────────────────────────────────────────────────┐   │
│  │  <Tab.Navigator tabBar={<BottomTabBar />}>               │   │
│  │  ├── "Home"     → HomeScreen                             │   │
│  │  ├── "Bookings" → BookingScreen                          │   │
│  │  ├── "Offers"   → OfferScreen                            │   │
│  │  └── "Profile"  → ProfileScreen                          │   │
│  └──────────────────────────────────────────────────────────┘   │
│                                                                  │
│  Exports:                                                        │
│    default  → BottomTabNavigator (the tab navigator)            │
│    named    → BottomTabBar (reusable custom tab bar)            │
│                                                                  │
│  BottomTabBar renders: Home | Bookings | Offers | Profile tabs  │
│  Style: Purple border, pill-shaped active indicator, absolute   │
└──────────────────────────┬──────────────────────────────────────┘
                           │
         ┌─────────────────┼─────────────────┬────────────────┐
         ▼                 ▼                  ▼                ▼
┌──────────────┐  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐
│  HomeScreen  │  │BookingScreen │  │ OfferScreen  │  │ProfileScreen │
│  (tab: Home) │  │(tab: Bookings│  │(tab: Offers) │  │(tab: Profile)│
└──────┬───────┘  └──────────────┘  └──────┬───────┘  └──────────────┘
       │                                    │
       │                                    │
       ▼                                    ▼
  (see below)                         (see below)
```

---

## 2. HomeScreen Workflow

```
┌─────────────────────────────────────────────────────────────────┐
│                     HomeScreen.js                                │
│                                                                  │
│  On Mount:                                                       │
│    dispatch(fetchHomeData())  → Redux thunk fires                │
│    ├── fetchHomeDataFromApi() (simulated 400ms delay)            │
│    ├── Returns: { recentStays[3], featuredHotels[3],            │
│    │             trendingHotels[], loading, error }              │
│    └── Redux state.hotels is populated                           │
│                                                                  │
│  Renders:                                                        │
│  ┌──────────────────────────────────────────────────────────┐   │
│  │  <TopNavBar navigation={navigation} />                    │   │
│  │     └── HotelHubHeader (dark) + Search/Trending/Explore   │   │
│  │                                                          │   │
│  │  <HeroSection />                                         │   │
│  │     └── background.jpeg + overlay + hero text            │   │
│  │                                                          │   │
│  │  <SearchAndStays />                                      │   │
│  │     ├── Search card (form fields from HomeContext)        │   │
│  │     ├── "Search Hotels" → navigates to 'Search'          │   │
│  │     └── Recent stays (Redux selector: selectRecentStays)  │   │
│  └──────────────────────────────────────────────────────────┘   │
│                                                                  │
│  Parent: BottomTabNavigator (Tab)                               │
│  Padding: insets.bottom + 90px (tab bar clearance)              │
└─────────────────────────────────────────────────────────────────┘
```

---

## 3. BookingScreen Workflow

```
┌─────────────────────────────────────────────────────────────────┐
│                    BookingScreen.js                               │
│                                                                  │
│  Local State: activeTab ("upcoming" | "cancelled")               │
│                                                                  │
│  Data: All hardcoded (not from Redux)                            │
│    upcomingBookings: [3 items]                                   │
│    cancelledBookings: [2 items]                                  │
│                                                                  │
│  Renders:                                                        │
│  ┌──────────────────────────────────────────────────────────┐   │
│  │  <HotelHubHeader theme="dark">                            │   │
│  │     └── Heart + Info icons                                │   │
│  │                                                          │   │
│  │  Tab Switcher: Upcoming | Cancelled                      │   │
│  │                                                          │   │
│  │  Banner (changes based on activeTab)                     │   │
│  │                                                          │   │
│  │  UpcomingCard[] or CancelledCard[]                        │   │
│  │     ├── Booking ID + Status Badge                        │   │
│  │     ├── Hotel Image + Info                               │   │
│  │     ├── Amount / Refund Info                             │   │
│  │     └── "View Details" button (non-functional)           │   │
│  └──────────────────────────────────────────────────────────┘   │
│                                                                  │
│  Parent: BottomTabNavigator (Tab)                               │
│  Padding: SafeArea bottom + 90px                                │
└─────────────────────────────────────────────────────────────────┘
```

---

## 4. OfferScreen Workflow

```
┌─────────────────────────────────────────────────────────────────┐
│                    OfferScreen.js                                │
│                                                                  │
│  Wrapper: <HomeProvider> (redundant, already in AppNavigator)    │
│                                                                  │
│  On Mount:                                                       │
│    dispatch(fetchHomeData()) → loads featuredHotels into Redux   │
│                                                                  │
│  Redux Read:                                                     │
│    featuredHotels, loading, error                                │
│                                                                  │
│  Renders:                                                        │
│  ┌──────────────────────────────────────────────────────────┐   │
│  │  <HotelHubHeader theme="dark">                            │   │
│  │     └── Heart + User (→ Profile) + Menu icons            │   │
│  │                                                          │   │
│  │  Nav Tab Bar (Search | Trending | Explore)               │   │
│  │     └── Navigates to root stack screens                  │   │
│  │                                                          │   │
│  │  Coupon Cards (3 hardcoded gradient cards)               │   │
│  │     SUMMER15 | BEACH20 | LUXURY25                        │   │
│  │                                                          │   │
│  │  "Spring to highlights" section                          │   │
│  │     └── HighlightCard[] (from Redux featuredHotels)       │   │
│  │         ├── Loading spinner                              │   │
│  │         ├── Error message                                │   │
│  │         └── Hotel cards with image, rating, price        │   │
│  └──────────────────────────────────────────────────────────┘   │
│                                                                  │
│  Parent: BottomTabNavigator (Tab)                               │
└─────────────────────────────────────────────────────────────────┘
```

---

## 5. ProfileScreen Workflow

```
┌─────────────────────────────────────────────────────────────────┐
│                   ProfileScreen.js                               │
│                                                                  │
│  Data: All hardcoded (not from Redux)                            │
│    MENU_ITEMS: [8 items]                                         │
│    STATS: [4 cards]                                              │
│    ACTIVITY: [5 items]                                           │
│    NOTIFS: [3 items]                                             │
│    QUICK_ACTIONS: [4 items]                                      │
│                                                                  │
│  Renders:                                                        │
│  ┌──────────────────────────────────────────────────────────┐   │
│  │  <HotelHubHeader theme="dark">                            │   │
│  │     └── Heart + User + Menu icons                        │   │
│  │                                                          │   │
│  │  Profile Hero Card                                       │   │
│  │     ├── Avatar ("U")                                     │   │
│  │     ├── Guest info                                       │   │
│  │     └── "Book a Stay" → Bottom > Home                    │   │
│  │                                                          │   │
│  │  Menu List (8 items)                                     │   │
│  │     ├── Dashboard → Bottom > Home                        │   │
│  │     ├── My bookings → Bookings tab                       │   │
│  │     ├── Payments & Wallet (no nav)                       │   │
│  │     ├── Reviews & Ratings (no nav)                       │   │
│  │     ├── Saved Hotels → Search screen                     │   │
│  │     ├── Support (no nav)                                 │   │
│  │     ├── Account Settings (no nav)                        │   │
│  │     └── Back to Home → Bottom > Home                     │   │
│  │                                                          │   │
│  │  Stats Grid (4 cards)                                    │   │
│  │  Upcoming Stays (empty state)                            │   │
│  │  Recent Activity + Notifications (side by side)          │   │
│  │  Quick Actions (4 icon buttons, non-functional)          │   │
│  └──────────────────────────────────────────────────────────┘   │
│                                                                  │
│  Parent: BottomTabNavigator (Tab)                               │
└─────────────────────────────────────────────────────────────────┘
```

---

## 6. SearchScreen Workflow

```
┌─────────────────────────────────────────────────────────────────┐
│                    SearchScreen.js                               │
│                                                                  │
│  Location: Root Stack (not in BottomTab)                         │
│                                                                  │
│  On Mount: setSelectedTab('Search') via HomeContext              │
│                                                                  │
│  Exports:                                                        │
│    HOTELS (array of 8 hotel data objects)                       │
│    HotelCard (reusable card component)                           │
│                                                                  │
│  Renders:                                                        │
│  ┌──────────────────────────────────────────────────────────┐   │
│  │  <TopNavBar navigation={navigation} />                    │   │
│  │     └── Tabs navigate to root stack screens              │   │
│  │                                                          │   │
│  │  "MODIFY SEARCH" Form Card                               │   │
│  │     ├── Destination (TextInput)                          │   │
│  │     ├── Guests & Rooms (hardcoded: 2/1)                 │   │
│  │     ├── Check-in/out (TextInput)                         │   │
│  │     └── "Update Results" button (no-op)                  │   │
│  │                                                          │   │
│  │  Purple FAB (filter icon)                                │   │
│  │                                                          │   │
│  │  HotelCard[] (8 hardcoded hotels)                        │   │
│  │     ├── Photo panel + badge + heart toggle               │   │
│  │     ├── Info panel (name, location, rating, tags)        │   │
│  │     └── "View & Book" → Bottom > Bookings                │   │
│  │                                                          │   │
│  │  <BottomTabBar activeTab="Home" />                       │   │
│  │     └── Standalone tab bar (not in Tab.Navigator)        │   │
│  └──────────────────────────────────────────────────────────┘   │
│                                                                  │
│  Parent: Root Stack Navigator                                   │
│  Styles: SearchTrendingStyles (shared)                          │
└─────────────────────────────────────────────────────────────────┘
```

---

## 7. TrendingScreen Workflow

```
┌─────────────────────────────────────────────────────────────────┐
│                   TrendingScreen.js                              │
│                                                                  │
│  Location: Root Stack (not in BottomTab)                         │
│                                                                  │
│  On Mount: setSelectedTab('Trending') via HomeContext            │
│                                                                  │
│  Data: Imports HOTELS + HotelCard FROM SearchScreen              │
│       (identical content to SearchScreen)                        │
│                                                                  │
│  Renders:                                                        │
│  ┌──────────────────────────────────────────────────────────┐   │
│  │  <TopNavBar /> → Tabs navigate to root stack             │   │
│  │  "MODIFY SEARCH" Form Card (identical to SearchScreen)  │   │
│  │  HotelCard[] (same 8 hotels as SearchScreen)             │   │
│  │  <BottomTabBar activeTab="Home" />                       │   │
│  └──────────────────────────────────────────────────────────┘   │
│                                                                  │
│  Parent: Root Stack Navigator                                   │
│  Styles: SearchTrendingStyles (shared, same as SearchScreen)    │
└─────────────────────────────────────────────────────────────────┘
```

---

## 8. ExploreScreen Workflow

```
┌─────────────────────────────────────────────────────────────────┐
│                   ExploreScreen.js                               │
│                                                                  │
│  Location: Root Stack (not in BottomTab)                         │
│                                                                  │
│  Data: All hardcoded                                             │
│    DESTINATIONS: [3 city cards: Delhi, Mumbai, Goa]             │
│    OFFERS: [3 offer cards with images, prices, ratings]         │
│                                                                  │
│  Renders:                                                        │
│  ┌──────────────────────────────────────────────────────────┐   │
│  │  <TopNavBar /> → Tabs navigate to root stack             │   │
│  │                                                          │   │
│  │  Hero Text: "EXPLORE LUXURIOUS DESTINATIONS"             │   │
│  │                                                          │   │
│  │  Destination Cards (3 image cards in a row)              │   │
│  │     └── Unsplash images (Delhi, Mumbai, Goa)             │   │
│  │                                                          │   │
│  │  "Offers curated just for you"                           │   │
│  │     └── Offer Cards (3 cards with image + info)          │   │
│  │         ├── Badge + Rating                               │   │
│  │         ├── Title + Subtitle + Location                  │   │
│  │         └── Discount + Price                             │   │
│  │                                                          │   │
│  │  <BottomTabBar activeTab="Home" />                       │   │
│  └──────────────────────────────────────────────────────────┘   │
│                                                                  │
│  Parent: Root Stack Navigator                                   │
│  No Redux, No HomeContext                                       │
└─────────────────────────────────────────────────────────────────┘
```

---

## 9. State Management Flow

```
┌─────────────────────────────────────────────────────────────────┐
│                    REDUX STORE                                   │
│                                                                  │
│  store.js                                                        │
│  └── reducer: { hotels: hotelsReducer }                         │
│                                                                  │
│  HotelSlice.js                                                   │
│  └── State: {                                                   │
│        recentStays: [3 hotels],                                 │
│        featuredHotels: [3 hotels],                               │
│        trendingHotels: [],                                       │
│        loading: false,                                           │
│        error: null                                               │
│      }                                                           │
│                                                                  │
│  Thunk: fetchHomeData()                                          │
│  ├── Called by: HomeScreen (on mount)                            │
│  │              OfferScreen (on mount)                           │
│  └── Simulated API → setTimeout(400ms) → hardcoded data         │
│                                                                  │
│  Selectors:                                                      │
│  ├── selectRecentStays    → used by SearchAndStays              │
│  ├── selectFeaturedHotels → used by OfferScreen                 │
│  ├── selectHotelsLoading  → used by SearchAndStays, OfferScreen │
│  └── selectHotelsError    → used by SearchAndStays, OfferScreen │
│                                                                  │
│  Written by: HomeScreen, OfferScreen                            │
│  Read by: SearchAndStays, OfferScreen                           │
└─────────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────────┐
│                   REACT CONTEXT                                  │
│                                                                  │
│  HomeContext.js                                                  │
│  └── Value: {                                                   │
│        selectedTab, setSelectedTab,                              │
│        destination, setDestination,                              │
│        checkInOut, setCheckInOut,                                │
│        guests, setGuests,                                        │
│        rooms, setRooms                                           │
│      }                                                           │
│                                                                  │
│  Provided by: AppNavigator (wraps entire tree)                   │
│              OfferScreen (redundant inner provider)              │
│                                                                  │
│  Written by:                                                    │
│  ├── TopNavBar         → setSelectedTab                         │
│  ├── SearchScreen      → setSelectedTab (on mount)              │
│  ├── TrendingScreen    → setSelectedTab (on mount)              │
│  └── OfferScreen       → setSelectedTab (on tab press)          │
│                                                                  │
│  Read by:                                                       │
│  ├── TopNavBar         → selectedTab (for highlight)            │
│  ├── SearchAndStays    → destination, checkInOut, guests, rooms │
│  ├── SearchScreen      → setSelectedTab                         │
│  └── TrendingScreen    → setSelectedTab                         │
└─────────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────────┐
│                 LOCAL COMPONENT STATE                            │
│                                                                  │
│  BookingScreen:   activeTab ("upcoming" | "cancelled")          │
│  HotelCard:       liked (boolean per card)                       │
│  SearchScreen:    destination, dates (TextInput)                │
│  TrendingScreen:  destination, dates (TextInput)                │
└─────────────────────────────────────────────────────────────────┘
```

---

## 10. Navigation Flow

```
                              ┌─────────┐
                              │  Splash │
                              └────┬────┘
                                   │ replace('Bottom')
                                   ▼
┌──────────────────────────────────────────────────────────────────┐
│                     Bottom Tab Navigator                          │
│                                                                   │
│  ┌───────────┐ ┌───────────┐ ┌───────────┐ ┌───────────┐       │
│  │    Home   │ │ Bookings  │ │  Offers   │ │  Profile  │       │
│  └─────┬─────┘ └───────────┘ └─────┬─────┘ └───────────┘       │
│        │                            │                             │
└────────┼────────────────────────────┼────────────────────────────┘
         │                            │
         │ navigate('Search')         │ navigate('Bottom',{screen:'Home'})
         │ navigate('Trending')       │
         │ navigate('Explore')        │
         ▼                            ▼
┌─────────────────┐          ┌─────────────────┐
│  Root Stack     │          │  (back to tabs) │
│  ┌───────────┐  │          └─────────────────┘
│  │  Search   │  │
│  ├───────────┤  │
│  │ Trending  │  │
│  ├───────────┤  │
│  │  Explore  │  │
│  └───────────┘  │
│                  │
│  Each renders    │
│  BottomTabBar    │
│  standalone      │
│  at bottom       │
└─────────────────┘
```

---

## 11. Component Dependency Tree

```
App.js
├── Provider (Redux)
│   └── AppNavigator
│       ├── HomeProvider (React Context)
│       │   └── NavigationContainer
│       │       └── Stack.Navigator
│       │           ├── SplashScreen
│       │           │   └── image 31.png
│       │           │
│       │           ├── BottomTabNavigator
│       │           │   ├── BottomTabBar (custom tab bar)
│       │           │   ├── HomeScreen
│       │           │   │   ├── TopNavBar
│       │           │   │   │   ├── HotelHubHeader
│       │           │   │   │   └── HomeContext
│       │           │   │   ├── HeroSection
│       │           │   │   │   └── background.jpeg
│       │           │   │   └── SearchAndStays
│       │           │   │       ├── HomeContext
│       │           │   │       └── HotelSlice (selectors)
│       │           │   │
│       │           │   ├── BookingScreen
│       │           │   │   └── HotelHubHeader
│       │           │   │
│       │           │   ├── OfferScreen
│       │           │   │   ├── HomeProvider (redundant)
│       │           │   │   ├── HotelHubHeader
│       │           │   │   └── HotelSlice (selectors + dispatch)
│       │           │   │
│       │           │   └── ProfileScreen
│       │           │       └── HotelHubHeader
│       │           │
│       │           ├── SearchScreen
│       │           │   ├── TopNavBar
│       │           │   ├── BottomTabBar (standalone)
│       │           │   ├── SearchTrendingStyles
│       │           │   ├── HomeContext
│       │           │   └── HOTELS data + HotelCard
│       │           │
│       │           ├── TrendingScreen
│       │           │   ├── TopNavBar
│       │           │   ├── BottomTabBar (standalone)
│       │           │   ├── SearchTrendingStyles
│       │           │   ├── HomeContext
│       │           │   └── HOTELS + HotelCard (from SearchScreen)
│       │           │
│       │           └── ExploreScreen
│       │               ├── TopNavBar
│       │               └── BottomTabBar (standalone)
```

---

## 12. File Cross-Reference

| File | Imports From | Used By |
|------|-------------|---------|
| `App.js` | store, AppNavigator | index.js |
| `AppNavigator.js` | SplashScreen, BottomTabNavigator, SearchScreen, TrendingScreen, ExploreScreen, HomeProvider | App.js |
| `store.js` | HotelSlice | App.js |
| `HotelSlice.js` | Redux Toolkit | store.js, HomeScreen, SearchAndStays, OfferScreen |
| `HomeContext.js` | React | AppNavigator, TopNavBar, SearchAndStays, SearchScreen, TrendingScreen, OfferScreen |
| `HotelHubHeader.js` | React, RN | TopNavBar, OfferScreen, BookingScreen, ProfileScreen |
| `Topnavbar.jsx` | HotelHubHeader, HomeContext | HomeScreen, SearchScreen, TrendingScreen, ExploreScreen |
| `HeroSection.jsx` | RN, background.jpeg | HomeScreen |
| `SearchAndStays.jsx` | HomeContext, HotelSlice | HomeScreen |
| `SearchTrendingStyles.js` | RN StyleSheet | SearchScreen, TrendingScreen |
| `BottomTabNavigator.js` | 4 tab screens, lucide icons | AppNavigator, SearchScreen, TrendingScreen, ExploreScreen |
| `SplashScreen.js` | image 31.png, Animated | AppNavigator |
| `HomeScreen.js` | TopNavBar, HeroSection, SearchAndStays, HotelSlice | BottomTabNavigator |
| `BookingScreen.js` | HotelHubHeader | BottomTabNavigator |
| `OfferScreen.js` | HotelHubHeader, HomeContext, HotelSlice | BottomTabNavigator |
| `ProfileScreen.js` | HotelHubHeader | BottomTabNavigator |
| `SearchScreen.js` | TopNavBar, BottomTabBar, HomeContext, SearchTrendingStyles | AppNavigator, TrendingScreen |
| `TrendingScreen.js` | TopNavBar, BottomTabBar, SearchTrendingStyles, HOTELS+HotelCard from SearchScreen | AppNavigator |
| `ExploreScreen.js` | TopNavBar, BottomTabBar | AppNavigator |
