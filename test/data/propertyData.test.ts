import { getPropertyById } from '../../src/screens/PropertyDetails/propertyData';

describe('propertyData', () => {
  it('should return property for valid id 1 (Manhattan Skyline Suites)', () => {
    const property = getPropertyById(1);
    expect(property).toBeDefined();
    expect(property!.name).toBe('Manhattan Skyline Suites');
  });

  it('should return property for valid id 2 (Grand Palace Hotel)', () => {
    const property = getPropertyById(2);
    expect(property).toBeDefined();
    expect(property!.name).toBe('Grand Palace Hotel');
  });

  it('should return property for valid id 3 (Eiffel Luxury Star)', () => {
    const property = getPropertyById(3);
    expect(property).toBeDefined();
    expect(property!.name).toBe('Eiffel Luxury Star');
  });

  it('should return property for valid id 4 (Green Valley Stay)', () => {
    const property = getPropertyById(4);
    expect(property).toBeDefined();
    expect(property!.name).toBe('Green Valley Stay');
  });

  it('should return undefined for non-existent id 999', () => {
    expect(getPropertyById(999)).toBeUndefined();
  });

  it('should return undefined for id 0', () => {
    expect(getPropertyById(0)).toBeUndefined();
  });

  it('should have correct structure for returned properties', () => {
    const property = getPropertyById(1)!;
    expect(property).toHaveProperty('id');
    expect(property).toHaveProperty('name');
    expect(property).toHaveProperty('location');
    expect(property).toHaveProperty('rating');
    expect(property).toHaveProperty('reviews');
    expect(property).toHaveProperty('price');
    expect(property).toHaveProperty('image');
    expect(property).toHaveProperty('description');
    expect(property).toHaveProperty('amenities');
    expect(property).toHaveProperty('reviewsList');
  });

  it('should have amenities array with icon and label', () => {
    const property = getPropertyById(1)!;
    expect(Array.isArray(property.amenities)).toBe(true);
    expect(property.amenities.length).toBeGreaterThan(0);
    property.amenities.forEach((amenity) => {
      expect(amenity).toHaveProperty('icon');
      expect(amenity).toHaveProperty('label');
    });
  });

  it('should have reviewsList array with name, rating, comment, date', () => {
    const property = getPropertyById(1)!;
    expect(Array.isArray(property.reviewsList)).toBe(true);
    expect(property.reviewsList.length).toBeGreaterThan(0);
    property.reviewsList.forEach((review) => {
      expect(review).toHaveProperty('name');
      expect(review).toHaveProperty('rating');
      expect(review).toHaveProperty('comment');
      expect(review).toHaveProperty('date');
    });
  });
});
