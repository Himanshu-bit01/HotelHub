import { HOTELS } from '../../src/screens/Search/hotelConstants';

describe('hotelConstants', () => {
  it('should export an array of 8 hotels', () => {
    expect(Array.isArray(HOTELS)).toBe(true);
    expect(HOTELS).toHaveLength(8);
  });

  it('each hotel should have required properties', () => {
    HOTELS.forEach((hotel) => {
      expect(hotel).toHaveProperty('id');
      expect(hotel).toHaveProperty('name');
      expect(hotel).toHaveProperty('location');
      expect(hotel).toHaveProperty('rooms');
      expect(hotel).toHaveProperty('rating');
      expect(hotel).toHaveProperty('reviews');
      expect(hotel).toHaveProperty('tags');
      expect(hotel).toHaveProperty('badge');
      expect(hotel).toHaveProperty('badgeColor');
      expect(hotel).toHaveProperty('price');
      expect(hotel).toHaveProperty('imgTop');
      expect(hotel).toHaveProperty('imgBottom');
    });
  });

  it('first hotel should be Manhattan Skyline Suites', () => {
    expect(HOTELS[0].name).toBe('Manhattan Skyline Suites');
  });

  it('all hotels should have rating between 0 and 5', () => {
    HOTELS.forEach((hotel) => {
      expect(hotel.rating).toBeGreaterThanOrEqual(0);
      expect(hotel.rating).toBeLessThanOrEqual(5);
    });
  });

  it('all hotels should have tags array with at least one tag', () => {
    HOTELS.forEach((hotel) => {
      expect(Array.isArray(hotel.tags)).toBe(true);
      expect(hotel.tags.length).toBeGreaterThanOrEqual(1);
    });
  });

  it('all hotels should have a price string starting with ₹', () => {
    HOTELS.forEach((hotel) => {
      expect(hotel.price).toMatch(/^₹/);
    });
  });

  it('all hotel ids should be unique', () => {
    const ids = HOTELS.map((h) => h.id);
    expect(new Set(ids).size).toBe(ids.length);
  });

  it('all hotels should have image property', () => {
    HOTELS.forEach((hotel) => {
      expect(hotel).toHaveProperty('image');
      expect(typeof hotel.image).toBe('string');
      expect(hotel.image.length).toBeGreaterThan(0);
    });
  });
});
