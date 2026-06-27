import { PropertyDetail } from '../../types';

const PROPERTIES: PropertyDetail[] = [
  {
    id: 1,
    name: 'Manhattan Skyline Suites',
    location: 'Manhattan, New York',
    rating: 5.0,
    reviews: 87,
    price: '₹5,000',
    image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800',
    description:
      'Experience luxury living in the heart of Manhattan with breathtaking skyline views. Our suites offer premium amenities, world-class dining, and easy access to iconic landmarks. Perfect for both business and leisure travelers seeking an unforgettable stay.',
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
        comment: 'Absolutely stunning views and impeccable service. The suite was spotless and the staff went above and beyond.',
        date: '15 May 2026',
      },
      {
        name: 'Priya Sharma',
        rating: 4,
        comment: 'Great location, amazing amenities. The pool area is beautiful. Only minor issue was slow check-in.',
        date: '10 May 2026',
      },
      {
        name: 'Rahul Verma',
        rating: 5,
        comment: 'Best hotel experience in Manhattan. The restaurant food was exceptional and the room had a perfect city view.',
        date: '2 May 2026',
      },
    ],
  },
  {
    id: 2,
    name: 'Grand Palace Hotel',
    location: 'New Delhi, India',
    rating: 4.8,
    reviews: 124,
    price: '₹3,500',
    image: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=800',
    description:
      'A majestic heritage hotel blending traditional Indian hospitality with modern luxury. Located in the heart of New Delhi, offering easy access to historical monuments and vibrant markets.',
    amenities: [
      { icon: 'Wifi', label: 'Free Wifi' },
      { icon: 'Car', label: 'Parking' },
      { icon: 'UtensilsCrossed', label: 'Restaurant' },
      { icon: 'Waves', label: 'Pool' },
      { icon: 'Sparkles', label: 'Spa' },
    ],
    reviewsList: [
      {
        name: 'Sneha Kapoor',
        rating: 5,
        comment: 'Beautiful property with amazing hospitality. The food was authentic and delicious. Highly recommended!',
        date: '18 May 2026',
      },
      {
        name: 'Vikram Singh',
        rating: 4,
        comment: 'Excellent stay overall. The rooms are spacious and well-maintained. Great value for money.',
        date: '12 May 2026',
      },
    ],
  },
  {
    id: 3,
    name: 'Eiffel Luxury Star',
    location: 'Central Paris, France',
    rating: 4.6,
    reviews: 63,
    price: '₹4,000',
    image: 'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?w=800',
    description:
      'A boutique hotel steps away from the Eiffel Tower with elegant Parisian decor, rooftop dining, and personalized concierge service for an unforgettable French experience.',
    amenities: [
      { icon: 'Wifi', label: 'Free Wifi' },
      { icon: 'UtensilsCrossed', label: 'Restaurant' },
      { icon: 'Sparkles', label: 'Spa' },
      { icon: 'Coffee', label: 'Breakfast' },
    ],
    reviewsList: [
      {
        name: 'Emily Johnson',
        rating: 5,
        comment: 'The view of the Eiffel Tower from our room was magical. Staff were incredibly helpful and friendly.',
        date: '20 May 2026',
      },
      {
        name: 'Amit Patel',
        rating: 4,
        comment: 'Perfect location for exploring Paris. The rooftop restaurant is a must-visit. Loved every moment.',
        date: '14 May 2026',
      },
    ],
  },
  {
    id: 4,
    name: 'Green Valley Stay',
    location: 'Aspen Ridge, Colorado',
    rating: 4.1,
    reviews: 45,
    price: '₹3,000',
    image: 'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=800',
    description:
      'A serene mountain retreat surrounded by pristine nature. Perfect for adventure seekers and those looking to unwind in the beauty of the Colorado mountains.',
    amenities: [
      { icon: 'Wifi', label: 'Free Wifi' },
      { icon: 'Car', label: 'Parking' },
      { icon: 'Flame', label: 'Fireplace' },
      { icon: 'Mountain', label: 'Mountain View' },
    ],
    reviewsList: [
      {
        name: 'Sarah Williams',
        rating: 4,
        comment: 'Beautiful mountain views and cozy rooms. Great hiking trails nearby. The fireplace was a lovely touch.',
        date: '22 May 2026',
      },
      {
        name: 'Rohit Gupta',
        rating: 4,
        comment: 'Perfect getaway from the city. Peaceful and refreshing. The staff was warm and welcoming.',
        date: '16 May 2026',
      },
    ],
  },
];

export const getPropertyById = (id: number): PropertyDetail | undefined =>
  PROPERTIES.find(p => p.id === id);
