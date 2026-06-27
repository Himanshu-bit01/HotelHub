import { RoomType } from '../../types';

const ROOMS: RoomType[] = [
  // Hotel 1 — Manhattan Skyline Suites
  {
    id: 101,
    hotelId: 1,
    name: 'Standard Room',
    description: 'Comfortable room with city views, ideal for solo travelers and couples.',
    capacity: '2 Guests',
    price: '₹5,000',
    amenities: ['Free Wifi', 'TV', 'AC', 'Mini Bar'],
    image: 'https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=600',
  },
  {
    id: 102,
    hotelId: 1,
    name: 'Deluxe Suite',
    description: 'Spacious suite with separate living area and panoramic skyline views.',
    capacity: '3 Guests',
    price: '₹8,500',
    amenities: ['Free Wifi', 'TV', 'AC', 'Mini Bar', 'Bathtub', 'Room Service'],
    image: 'https://images.unsplash.com/photo-1590490360182-c33d57733427?w=600',
  },
  {
    id: 103,
    hotelId: 1,
    name: 'Premium Penthouse',
    description: 'Luxurious penthouse with private terrace, jacuzzi, and 360° city views.',
    capacity: '4 Guests',
    price: '₹15,000',
    amenities: ['Free Wifi', 'TV', 'AC', 'Mini Bar', 'Bathtub', 'Room Service', 'Jacuzzi', 'Terrace'],
    image: 'https://images.unsplash.com/photo-1578683010236-d716f9a3f461?w=600',
  },

  // Hotel 2 — Grand Palace Hotel
  {
    id: 201,
    hotelId: 2,
    name: 'Classic Room',
    description: 'Elegantly designed room reflecting traditional Indian royal aesthetics.',
    capacity: '2 Guests',
    price: '₹3,500',
    amenities: ['Free Wifi', 'TV', 'AC', 'Room Service'],
    image: 'https://images.unsplash.com/photo-1611892440504-42a792e24d32?w=600',
  },
  {
    id: 202,
    hotelId: 2,
    name: 'Royal Suite',
    description: 'Grand suite with heritage decor, private dining area, and palace courtyard view.',
    capacity: '3 Guests',
    price: '₹6,500',
    amenities: ['Free Wifi', 'TV', 'AC', 'Mini Bar', 'Bathtub', 'Room Service', 'Dining Area'],
    image: 'https://images.unsplash.com/photo-1584132967334-10e028bd69f7?w=600',
  },
  {
    id: 203,
    hotelId: 2,
    name: 'Maharaja Suite',
    description: 'The ultimate royal experience with private pool, butler service, and luxury amenities.',
    capacity: '4 Guests',
    price: '₹12,000',
    amenities: ['Free Wifi', 'TV', 'AC', 'Mini Bar', 'Bathtub', 'Room Service', 'Private Pool', 'Butler Service'],
    image: 'https://images.unsplash.com/photo-1618773928121-c32242e63f39?w=600',
  },

  // Hotel 3 — Eiffel Luxury Star
  {
    id: 301,
    hotelId: 3,
    name: 'Parisian Room',
    description: 'Charming room with French decor and views of the Parisian streetscape.',
    capacity: '2 Guests',
    price: '₹4,000',
    amenities: ['Free Wifi', 'TV', 'AC', 'Coffee Machine'],
    image: 'https://images.unsplash.com/photo-1595576508898-0ad5c879a061?w=600',
  },
  {
    id: 302,
    hotelId: 3,
    name: 'Eiffel View Suite',
    description: 'Stunning suite with direct Eiffel Tower view and private balcony.',
    capacity: '2 Guests',
    price: '₹7,500',
    amenities: ['Free Wifi', 'TV', 'AC', 'Coffee Machine', 'Balcony', 'Room Service'],
    image: 'https://images.unsplash.com/photo-1566665797739-1674de7a421a?w=600',
  },

  // Hotel 4 — Green Valley Stay
  {
    id: 401,
    hotelId: 4,
    name: 'Mountain View Room',
    description: 'Cozy room with floor-to-ceiling windows overlooking the Colorado mountains.',
    capacity: '2 Guests',
    price: '₹3,000',
    amenities: ['Free Wifi', 'TV', 'Fireplace', 'Mountain View'],
    image: 'https://images.unsplash.com/photo-1590490359854-dfba19688e68?w=600',
  },
  {
    id: 402,
    hotelId: 4,
    name: 'Alpine Cabin',
    description: 'Rustic luxury cabin with private deck, hot tub, and forest views.',
    capacity: '4 Guests',
    price: '₹5,500',
    amenities: ['Free Wifi', 'TV', 'Fireplace', 'Hot Tub', 'Private Deck', 'Kitchen'],
    image: 'https://images.unsplash.com/photo-1510798831971-661eb04b3739?w=600',
  },
];

export const getRoomsByHotelId = (hotelId: number): RoomType[] =>
  ROOMS.filter(r => r.hotelId === hotelId);

export const getRoomById = (roomId: number): RoomType | undefined =>
  ROOMS.find(r => r.id === roomId);
