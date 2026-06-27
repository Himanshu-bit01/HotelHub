import { getRoomsByHotelId, getRoomById } from '../../src/screens/RoomSelection/roomData';

describe('roomData', () => {
  describe('getRoomsByHotelId', () => {
    it('should return 3 rooms for hotelId 1', () => {
      expect(getRoomsByHotelId(1)).toHaveLength(3);
    });

    it('should return 3 rooms for hotelId 2', () => {
      expect(getRoomsByHotelId(2)).toHaveLength(3);
    });

    it('should return 2 rooms for hotelId 3', () => {
      expect(getRoomsByHotelId(3)).toHaveLength(2);
    });

    it('should return 2 rooms for hotelId 4', () => {
      expect(getRoomsByHotelId(4)).toHaveLength(2);
    });

    it('should return empty array for non-existent hotelId 999', () => {
      expect(getRoomsByHotelId(999)).toEqual([]);
    });

    it('should return rooms ordered by id within each hotel', () => {
      const hotel1Rooms = getRoomsByHotelId(1);
      const ids = hotel1Rooms.map((r) => r.id);
      expect(ids).toEqual([...ids].sort((a, b) => a - b));
    });
  });

  describe('getRoomById', () => {
    it('should return room by id 101 (Standard Room)', () => {
      const room = getRoomById(101);
      expect(room).toBeDefined();
      expect(room!.name).toBe('Standard Room');
    });

    it('should return room by id 202 (Royal Suite)', () => {
      const room = getRoomById(202);
      expect(room).toBeDefined();
      expect(room!.name).toBe('Royal Suite');
    });

    it('should return undefined for non-existent room id 999', () => {
      expect(getRoomById(999)).toBeUndefined();
    });

    it('should have correct structure', () => {
      const room = getRoomById(101)!;
      expect(room).toHaveProperty('id');
      expect(room).toHaveProperty('hotelId');
      expect(room).toHaveProperty('name');
      expect(room).toHaveProperty('description');
      expect(room).toHaveProperty('capacity');
      expect(room).toHaveProperty('price');
      expect(room).toHaveProperty('amenities');
      expect(room).toHaveProperty('image');
    });
  });
});
