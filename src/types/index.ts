import { ImageSourcePropType } from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { NavigatorScreenParams } from '@react-navigation/native';

// ── Navigation Param Lists ──────────────────────────────────────────
export type BottomTabParamList = {
  Home: undefined;
  Bookings: undefined;
  Offers: undefined;
  Profile: undefined;
};

export type RootStackParamList = {
  Splash: undefined;
  Bottom: NavigatorScreenParams<BottomTabParamList>;
  Search: undefined;
  Trending: undefined;
  Explore: undefined;
  Payments: undefined;
  Reviews: undefined;
  Support: undefined;
  AccountSettings: undefined;
  FilterScreen: undefined;
};

// ── Navigation prop types for screens ───────────────────────────────
export type RootStackNavigationProp = NativeStackNavigationProp<RootStackParamList>;

export type AppDispatch = any;

// ── Hotel Data Types ────────────────────────────────────────────────
export interface RecentStay {
  id: string;
  name: string;
  location: string;
  rating: number;
  reviews: number;
  price: string;
  image: ImageSourcePropType;
  trending?: boolean;
}

export interface FeaturedHotel {
  id: number;
  badge: string;
  badgeColor: string;
  name: string;
  sub: string;
  location: string;
  rating: number;
  price: string;
  off: string;
  imgColor: string;
  imgColor2: string;
}

export interface HotelCardData {
  id: number;
  name: string;
  location: string;
  rooms: string;
  rating: number;
  reviews: number;
  tags: string[];
  badge?: string;
  badgeColor?: string;
  price: string;
  imgTop: string;
  imgBottom: string;
}

export interface BookingItem {
  id: string;
  status: string;
  statusColor?: string;
  statusBg?: string;
  name: string;
  location: string;
  roomType: string;
  dates: string;
  guests: string;
  image: ImageSourcePropType;
  amountLabel?: string;
  amount?: string;
  cancelledOn?: string;
  cancellationReason?: string;
  refundStatus?: string;
  refundStatusColor?: string;
  refundAmount?: string;
}

export interface CouponItem {
  id: number;
  save: string;
  percent: string;
  label: string;
  code: string;
  bg: string;
  accent: string;
  decorColor: string;
}

export interface Destination {
  id: number;
  name: string;
  image: string;
}

export interface ExploreOffer {
  id: number;
  badge: string;
  badgeColor: string;
  rating: number;
  title: string;
  subtitle: string;
  location: string;
  discount: string;
  price: string;
  image: string;
}

// ── Redux State Types ───────────────────────────────────────────────
export interface HotelsState {
  recentStays: RecentStay[];
  featuredHotels: FeaturedHotel[];
  trendingHotels: FeaturedHotel[];
  loading: boolean;
  error: string | null;
}

export interface AccountState {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  emailVerified: boolean;
  phoneVerified: boolean;
  twoFactorEnabled: boolean;
}

export interface RootState {
  hotels: HotelsState;
  account: AccountState;
}

// ── Home Context Types ──────────────────────────────────────────────
export interface HomeContextValue {
  selectedTab: string;
  setSelectedTab: (tab: string) => void;
  destination: string;
  setDestination: (dest: string) => void;
  checkInOut: string;
  setCheckInOut: (dates: string) => void;
  guests: number;
  setGuests: (guests: number) => void;
  rooms: number;
  setRooms: (rooms: number) => void;
}
