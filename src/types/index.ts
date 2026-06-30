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
  PropertyDetails: { hotelId: number };
  RoomSelection: { hotelId: number };
  GuestDetails: { hotelId: number; roomId: number };
  CheckoutPayment: { hotelId: number; roomId: number; fullName: string; email: string; phone: string; guests: string };
  BookingConfirmation: { hotelId: number; roomId: number; fullName: string; email: string; paymentMethod: string };
  Wishlist: undefined;
  Notifications: undefined;
  Discovery: undefined;
  Dashboard: undefined;
  InfoPage: { type: 'meals' | 'rules' | 'deposit' | 'checkin' };
  FAQs: undefined;
};

// ── Navigation prop types for screens ───────────────────────────────
export type RootStackNavigationProp = NativeStackNavigationProp<RootStackParamList>;

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
  image?: any;
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
  image?: string;
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

export interface PropertyDetail {
  id: number;
  name: string;
  location: string;
  rating: number;
  reviews: number;
  price: string;
  image: string;
  description: string;
  amenities: { icon: string; label: string }[];
  reviewsList: { name: string; rating: number; comment: string; date: string }[];
}

export interface RoomType {
  id: number;
  hotelId: number;
  name: string;
  description: string;
  capacity: string;
  price: string;
  amenities: string[];
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
  home: HomeState;
  booking: BookingState;
}

// ── Home State Types ──────────────────────────────────────────────
export interface HomeState {
  selectedTab: string;
  destination: string;
  checkInOut: string;
  guests: number;
  rooms: number;
}

// ── Booking State Types ──────────────────────────────────────────
export interface BookingState {
  hotelId: number | null;
  selectedRoomId: number | null;
  guestForm: {
    fullName: string;
    email: string;
    phone: string;
    adults: number;
    children: number;
    specialRequests: string;
  };
  paymentMethod: string;
}
