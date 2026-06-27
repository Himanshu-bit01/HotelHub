import { RecentStay, FeaturedHotel, HotelCardData, BookingItem, CouponItem, Destination, ExploreOffer, PropertyDetail, RoomType } from '../../src/types';

export const mockRecentStays: RecentStay[] = [
  {
    id: '1',
    name: 'Grand Ocean\nResort & Spa',
    location: 'Bali, Indonesia',
    rating: 4.8,
    reviews: 120,
    price: '320',
    image: { uri: 'https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=400' },
  },
  {
    id: '2',
    name: 'The Royal\nPalace Hotel',
    location: 'Dubai, UAE',
    rating: 4.8,
    reviews: 98,
    price: '450',
    image: { uri: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=400' },
  },
  {
    id: '3',
    name: 'Maldives\nParadise Stay',
    location: 'Maldives',
    rating: 4.8,
    reviews: 76,
    price: '680',
    image: { uri: 'https://images.unsplash.com/photo-1573843981267-be1999ff37cd?w=400' },
  },
];

export const mockFeaturedHotels: FeaturedHotel[] = [
  {
    id: 1,
    badge: 'Limited Time',
    badgeColor: '#6D28D9',
    name: 'Beachside Bliss in Goa',
    sub: 'Beach Resort & Spa',
    location: 'Goa, India',
    rating: 4.6,
    price: '₹9,800',
    off: '10% OFF',
    imgColor: '#3B6EA5',
    imgColor2: '#5B8EC5',
  },
  {
    id: 2,
    badge: 'Exclusive',
    badgeColor: '#7C3AED',
    name: 'Luxury Stay in Mumbai',
    sub: 'The Ocean View Hotel',
    location: 'Mumbai, India',
    rating: 4.7,
    price: '₹7,200',
    off: '15% OFF',
    imgColor: '#6D28A0',
    imgColor2: '#8B5CF6',
  },
];

export const mockTrendingHotels: FeaturedHotel[] = [
  {
    id: 3,
    badge: 'Best Seller',
    badgeColor: '#B45309',
    name: 'Heritage Comfort in Delhi',
    sub: 'Imperial Grand Hotel',
    location: 'New Delhi, India',
    rating: 4.5,
    price: '₹7,200',
    off: '15% OFF',
    imgColor: '#78572A',
    imgColor2: '#A0743C',
  },
];

export const mockHotelCardData: HotelCardData = {
  id: 1,
  name: 'Manhattan Skyline Suites',
  location: 'Manhattan',
  rooms: '4 Bedrooms',
  rating: 5.0,
  reviews: 87,
  tags: ['City View', 'Pool', 'Free Wifi'],
  badge: '40%',
  badgeColor: '#7C3AED',
  price: '₹5,000',
  imgTop: '#5B8DB8',
  imgBottom: '#8BAFC8',
  image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=400',
};

export const mockBookingItem: BookingItem = {
  id: 'BK-2026-001',
  status: 'Confirmed',
  statusColor: '#059669',
  statusBg: '#D1FAE5',
  name: 'Manhattan Skyline Suites',
  location: 'Manhattan, New York',
  roomType: 'Deluxe Suite',
  dates: 'May 20 – May 24, 2026',
  guests: '2 Adults',
  image: { uri: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=400' },
  amountLabel: 'Total Paid',
  amount: '₹34,000',
};

export const mockCancelledBooking: BookingItem = {
  id: 'BK-2026-002',
  status: 'Cancelled',
  statusColor: '#DC2626',
  statusBg: '#FEE2E2',
  name: 'Grand Palace Hotel',
  location: 'New Delhi, India',
  roomType: 'Royal Suite',
  dates: 'May 10 – May 12, 2026',
  guests: '2 Adults, 1 Child',
  image: { uri: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=400' },
  amountLabel: 'Refund',
  amount: '₹13,000',
  cancelledOn: 'May 8, 2026',
  cancellationReason: 'Change of plans',
  refundStatus: 'Refunded',
  refundStatusColor: '#059669',
  refundAmount: '₹13,000',
};

export const mockCouponItem: CouponItem = {
  id: 1,
  save: 'Save 15%',
  percent: '15%',
  label: 'Summer Sale',
  code: 'SUMMER15',
  bg: '#FEF3C7',
  accent: '#D97706',
  decorColor: '#F59E0B',
};

export const mockDestination: Destination = {
  id: 1,
  name: 'New Delhi',
  image: 'https://images.unsplash.com/photo-1587474260584-136574528ed5?w=400',
};

export const mockExploreOffer: ExploreOffer = {
  id: 1,
  badge: 'Limited time',
  badgeColor: '#0D9488',
  rating: 4.6,
  title: 'Beachside Bliss in Goa',
  subtitle: 'Beach Resort & Spa',
  location: 'Goa, India',
  discount: '20% OFF',
  price: '₹9,600',
  image: 'https://images.unsplash.com/photo-1582719508461-905c673771fd?w=400',
};

export const mockPropertyDetail: PropertyDetail = {
  id: 1,
  name: 'Manhattan Skyline Suites',
  location: 'Manhattan, New York',
  rating: 5.0,
  reviews: 87,
  price: '₹5,000',
  image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800',
  description: 'Experience luxury living in the heart of Manhattan.',
  amenities: [
    { icon: 'Wifi', label: 'Free Wifi' },
    { icon: 'Car', label: 'Parking' },
    { icon: 'UtensilsCrossed', label: 'Restaurant' },
    { icon: 'Waves', label: 'Pool' },
    { icon: 'Dumbbell', label: 'Gym' },
    { icon: 'Sparkles', label: 'Spa' },
  ],
  reviewsList: [
    {
      name: 'Arjun Mehta',
      rating: 5,
      comment: 'Absolutely stunning views and impeccable service.',
      date: '15 May 2026',
    },
  ],
};

export const mockRoomType: RoomType = {
  id: 101,
  hotelId: 1,
  name: 'Standard Room',
  description: 'Comfortable room with city views.',
  capacity: '2 Guests',
  price: '₹5,000',
  amenities: ['Free Wifi', 'TV', 'AC', 'Mini Bar'],
  image: 'https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=600',
};

export const mockHotelsState = {
  recentStays: mockRecentStays,
  featuredHotels: mockFeaturedHotels,
  trendingHotels: mockTrendingHotels,
  loading: false,
  error: null,
};

export const mockAccountState = {
  firstName: 'Arjun',
  lastName: 'Sharma',
  email: 'arjun.sharma@example.com',
  phone: '+91 9876543210',
  emailVerified: true,
  phoneVerified: false,
  twoFactorEnabled: false,
};

export const mockRootState = {
  hotels: mockHotelsState,
  account: mockAccountState,
};

export const mockNavigation = {
  navigate: jest.fn(),
  goBack: jest.fn(),
  replace: jest.fn(),
  getParent: jest.fn(() => null),
  getState: jest.fn(() => ({
    routes: [{ name: 'Home' }],
    index: 0,
  })),
};

export const mockRoute = {
  params: {},
  name: 'Home',
};
