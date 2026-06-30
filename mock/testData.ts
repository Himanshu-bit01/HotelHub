import { RecentStay, FeaturedHotel } from '../../src/types';

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
