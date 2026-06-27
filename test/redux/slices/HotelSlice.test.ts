import reducer, {
  setRecentStays,
  setFeaturedHotels,
  setTrendingHotels,
  clearHotelsError,
  fetchHomeData,
  selectRecentStays,
  selectFeaturedHotels,
  selectHotelsLoading,
  selectHotelsError,
} from '../../../src/redux/store/slices/HotelSlice';
import {
  mockRecentStays,
  mockFeaturedHotels,
  mockTrendingHotels,
} from '../../../mock/testData';
import { HotelsState } from '../../../src/types';

const initialState: HotelsState = {
  recentStays: [],
  featuredHotels: [],
  trendingHotels: [],
  loading: false,
  error: null,
};

describe('HotelSlice', () => {
  describe('reducer', () => {
    it('should return the initial state when called with undefined action', () => {
      const state = reducer(undefined, { type: '@@INIT' } as any);
      expect(state).toEqual(initialState);
    });

    it('should handle setRecentStays with payload', () => {
      const state = reducer(initialState, setRecentStays(mockRecentStays));
      expect(state.recentStays).toEqual(mockRecentStays);
      expect(state.recentStays).toHaveLength(3);
    });

    it('should handle setFeaturedHotels with payload', () => {
      const state = reducer(initialState, setFeaturedHotels(mockFeaturedHotels));
      expect(state.featuredHotels).toEqual(mockFeaturedHotels);
      expect(state.featuredHotels).toHaveLength(2);
    });

    it('should handle setTrendingHotels with payload', () => {
      const state = reducer(initialState, setTrendingHotels(mockTrendingHotels));
      expect(state.trendingHotels).toEqual(mockTrendingHotels);
      expect(state.trendingHotels).toHaveLength(1);
    });

    it('should handle clearHotelsError and set error to null', () => {
      const stateWithError: HotelsState = {
        ...initialState,
        error: 'Some error occurred',
      };
      const state = reducer(stateWithError, clearHotelsError());
      expect(state.error).toBeNull();
    });

    it('should handle fetchHomeData.pending and set loading true, error null', () => {
      const stateWithError: HotelsState = {
        ...initialState,
        error: 'Previous error',
      };
      const action = { type: fetchHomeData.pending.type };
      const state = reducer(stateWithError, action);
      expect(state.loading).toBe(true);
      expect(state.error).toBeNull();
    });

    it('should handle fetchHomeData.fulfilled and populate data', () => {
      const pendingState: HotelsState = {
        ...initialState,
        loading: true,
      };
      const action = {
        type: fetchHomeData.fulfilled.type,
        payload: {
          recentStays: mockRecentStays,
          featuredHotels: mockFeaturedHotels,
          trendingHotels: mockTrendingHotels,
        },
      };
      const state = reducer(pendingState, action);
      expect(state.loading).toBe(false);
      expect(state.recentStays).toEqual(mockRecentStays);
      expect(state.featuredHotels).toEqual(mockFeaturedHotels);
      expect(state.trendingHotels).toEqual(mockTrendingHotels);
    });

    it('should handle fetchHomeData.rejected with error message', () => {
      const pendingState: HotelsState = {
        ...initialState,
        loading: true,
      };
      const action = {
        type: fetchHomeData.rejected.type,
        payload: 'Network error',
      };
      const state = reducer(pendingState, action);
      expect(state.loading).toBe(false);
      expect(state.error).toBe('Network error');
    });

    it('should handle fetchHomeData.rejected with default error message when no payload', () => {
      const pendingState: HotelsState = {
        ...initialState,
        loading: true,
      };
      const action = {
        type: fetchHomeData.rejected.type,
        payload: undefined,
      };
      const state = reducer(pendingState, action);
      expect(state.loading).toBe(false);
      expect(state.error).toBe('Something went wrong');
    });
  });

  describe('selectors', () => {
    const state = { hotels: { ...initialState, ...{ recentStays: mockRecentStays, featuredHotels: mockFeaturedHotels, loading: true, error: 'test error' } } };

    it('should select recentStays from state', () => {
      expect(selectRecentStays(state)).toEqual(mockRecentStays);
    });

    it('should select featuredHotels from state', () => {
      expect(selectFeaturedHotels(state)).toEqual(mockFeaturedHotels);
    });

    it('should select loading from state', () => {
      expect(selectHotelsLoading(state)).toBe(true);
    });

    it('should select error from state', () => {
      expect(selectHotelsError(state)).toBe('test error');
    });
  });
});
