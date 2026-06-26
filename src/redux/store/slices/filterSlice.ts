import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface FilterState {
  minPrice: number;
  maxPrice: number;
  bedrooms: number[];
  propertyTypes: string[];
  starRatings: number[];
  guestRatings: number[];
  amenities: string[];
  suitability: string[];
}

const initialState: FilterState = {
  minPrice: 0,
  maxPrice: 100000,
  bedrooms: [],
  propertyTypes: [],
  starRatings: [],
  guestRatings: [],
  amenities: [],
  suitability: [],
};

const filterSlice = createSlice({
  name: 'filters',
  initialState,
  reducers: {
    setFilters: (_, action: PayloadAction<FilterState>) => {
      return action.payload;
    },

    resetFilters: () => initialState,
  },
});

export const { setFilters, resetFilters } = filterSlice.actions;
export default filterSlice.reducer;