import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { HotelsState, RecentStay, FeaturedHotel } from '../../../types';

const fetchHomeDataFromApi = (): Promise<{
  recentStays: RecentStay[];
  featuredHotels: FeaturedHotel[];
  trendingHotels: FeaturedHotel[];
}> =>
  new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        recentStays: [
          {
            id: '1',
            name: 'Grand Ocean\nResort & Spa',
            location: 'Bali, Indonesia',
            rating: 4.8,
            reviews: 120,
            price: '320',
            image: {
              uri: 'https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=400',
            },
          },
          {
            id: '2',
            name: 'The Royal\nPalace Hotel',
            location: 'Dubai, UAE',
            rating: 4.8,
            reviews: 98,
            price: '450',
            image: {
              uri: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=400',
            },
          },
          {
            id: '3',
            name: 'Maldives\nParadise Stay',
            location: 'Maldives',
            rating: 4.8,
            reviews: 76,
            price: '680',
            image: {
              uri: 'https://images.unsplash.com/photo-1573843981267-be1999ff37cd?w=400',
            },
          },
        ],
        featuredHotels: [
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
        ],
        trendingHotels: [],
      });
    }, 400);
  });

export const fetchHomeData = createAsyncThunk<
  { recentStays: RecentStay[]; featuredHotels: FeaturedHotel[]; trendingHotels: FeaturedHotel[] },
  void,
  { rejectValue: string }
>(
  'hotels/fetchHomeData',
  async (_, { rejectWithValue }) => {
    try {
      const data = await fetchHomeDataFromApi();
      return data;
    } catch (err: any) {
      return rejectWithValue(err?.message || 'Failed to load hotel data');
    }
  }
);

const initialState: HotelsState = {
  recentStays: [],
  featuredHotels: [],
  trendingHotels: [],
  loading: false,
  error: null,
};

const hotelsSlice = createSlice({
  name: 'hotels',
  initialState,
  reducers: {
    setRecentStays(state, action: PayloadAction<RecentStay[]>) {
      state.recentStays = action.payload;
    },
    setFeaturedHotels(state, action: PayloadAction<FeaturedHotel[]>) {
      state.featuredHotels = action.payload;
    },
    setTrendingHotels(state, action: PayloadAction<FeaturedHotel[]>) {
      state.trendingHotels = action.payload;
    },
    clearHotelsError(state) {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchHomeData.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchHomeData.fulfilled, (state, action) => {
        state.loading = false;
        state.recentStays = action.payload.recentStays;
        state.featuredHotels = action.payload.featuredHotels;
        state.trendingHotels = action.payload.trendingHotels;
      })
      .addCase(fetchHomeData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload ?? 'Something went wrong';
      });
  },
});

export const {
  setRecentStays,
  setFeaturedHotels,
  setTrendingHotels,
  clearHotelsError,
} = hotelsSlice.actions;

export const selectRecentStays = (state: { hotels: HotelsState }) => state.hotels.recentStays;
export const selectFeaturedHotels = (state: { hotels: HotelsState }) => state.hotels.featuredHotels;
export const selectTrendingHotels = (state: { hotels: HotelsState }) => state.hotels.trendingHotels;
export const selectHotelsLoading = (state: { hotels: HotelsState }) => state.hotels.loading;
export const selectHotelsError = (state: { hotels: HotelsState }) => state.hotels.error;

export default hotelsSlice.reducer;
