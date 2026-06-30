import React, { useCallback } from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  FlatList,
  Pressable,
  StatusBar,
} from 'react-native';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import {
  ArrowLeft,
  Check,
  Users,
  Wifi,
  Tv,
  Wind,
  Coffee,
  Bath,
  ConciergeBell,
  Waves,
  UtensilsCrossed,
  Flame,
  Mountain,
  Utensils,
} from 'lucide-react-native';
import { getRoomsByHotelId, getRoomById } from './roomData';
import { getPropertyById } from '../PropertyDetails/propertyData';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { setSelectedRoom, selectSelectedRoomId } from '../../redux/store/slices/bookingSlice';

const ROOM_ICON_MAP: Record<string, any> = {
  'Free Wifi': Wifi,
  'TV': Tv,
  'AC': Wind,
  'Coffee Machine': Coffee,
  'Bathtub': Bath,
  'Room Service': ConciergeBell,
  'Pool': Waves,
  'Restaurant': UtensilsCrossed,
  'Private Pool': Waves,
  'Butler Service': ConciergeBell,
  'Fireplace': Flame,
  'Mountain View': Mountain,
  'Hot Tub': Bath,
  'Jacuzzi': Bath,
  'Terrace': Mountain,
  'Balcony': Mountain,
  'Mini Bar': Utensils,
  'Dining Area': UtensilsCrossed,
  'Private Deck': Mountain,
  'Kitchen': Utensils,
};

type RoomSelectionScreenProps = {
  navigation: any;
  route: any;
};

const RoomSelectionScreen = ({ navigation, route }: RoomSelectionScreenProps) => {
  const insets = useSafeAreaInsets();
  const { hotelId } = route.params || { hotelId: 1 };
  const dispatch = useAppDispatch();
  const selectedRoomId = useAppSelector(selectSelectedRoomId);

  const rooms = getRoomsByHotelId(hotelId);
  const property = getPropertyById(hotelId);

  const handleContinue = useCallback(() => {
    if (selectedRoomId) {
      navigation.navigate('GuestDetails', { hotelId, roomId: selectedRoomId });
    }
  }, [selectedRoomId, hotelId, navigation]);

  const handleSelectRoom = useCallback((roomId: number) => {
    dispatch(setSelectedRoom(roomId));
  }, [dispatch]);

  const renderRoom = useCallback(({ item: room }: { item: typeof rooms[number] }) => {
    const isSelected = selectedRoomId === room.id;
    return (
      <Pressable
        style={[styles.roomCard, isSelected && styles.roomCardSelected]}
        onPress={() => handleSelectRoom(room.id)}
      >
        <Image source={{ uri: room.image }} style={styles.roomImage} />

        <View style={styles.roomBody}>
          <View style={styles.roomTopRow}>
            <View style={styles.roomTopLeft}>
              <Text style={styles.roomName}>{room.name}</Text>
              <Text style={styles.roomCapacity}>
                <Users size={11} color="#9CA3AF" strokeWidth={2} /> {room.capacity}
              </Text>
            </View>
            <View style={styles.priceBlock}>
              <Text style={styles.roomPrice}>{room.price}</Text>
              <Text style={styles.pricePerNight}>/night</Text>
            </View>
          </View>

          <Text style={styles.roomDesc} numberOfLines={2}>{room.description}</Text>

          <View style={styles.roomAmenities}>
            {room.amenities.slice(0, 4).map((a) => {
              const IconComp = ROOM_ICON_MAP[a] || Check;
              return (
                <View key={a} style={styles.amenityTag}>
                  <IconComp size={10} color="#7C3AED" strokeWidth={2} />
                  <Text style={styles.amenityTagTxt}>{a}</Text>
                </View>
              );
            })}
            {room.amenities.length > 4 && (
              <View style={styles.amenityTag}>
                <Text style={styles.amenityTagTxt}>+{room.amenities.length - 4} more</Text>
              </View>
            )}
          </View>

          <View style={styles.selectRow}>
            <Pressable
              style={[styles.selectBtn, isSelected && styles.selectBtnActive]}
              onPress={() => handleSelectRoom(room.id)}
            >
              {isSelected ? (
                <Check size={14} color="#FFFFFF" strokeWidth={3} />
              ) : (
                <Text style={styles.selectBtnTxt}>Select</Text>
              )}
            </Pressable>
          </View>
        </View>
      </Pressable>
    );
  }, [selectedRoomId, handleSelectRoom]);

  return (
    <SafeAreaView style={styles.safe} edges={['top']}>
      <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />

      <View style={styles.header}>
        <Pressable style={styles.backBtn} onPress={() => navigation.goBack()}>
          <ArrowLeft size={20} color="#111827" strokeWidth={2} />
        </Pressable>
        <Text style={styles.headerTitle}>Select Room</Text>
        <View style={{ width: 36 }} />
      </View>

      {property && (
        <View style={styles.hotelSummary}>
          <Image source={{ uri: property.image }} style={styles.hotelImage} />
          <View style={styles.hotelInfo}>
            <Text style={styles.hotelName} numberOfLines={1}>{property.name}</Text>
            <Text style={styles.hotelLocation}>{property.location}</Text>
            <View style={styles.hotelRatingRow}>
              <Text style={styles.hotelRating}>⭐ {property.rating.toFixed(1)}</Text>
              <Text style={styles.hotelReviews}>({property.reviews} reviews)</Text>
            </View>
          </View>
        </View>
      )}

      <FlatList
        data={rooms}
        keyExtractor={(room) => room.id.toString()}
        renderItem={renderRoom}
        ListHeaderComponent={<Text style={styles.sectionTitle}>AVAILABLE ROOMS</Text>}
        style={styles.body}
        contentContainerStyle={[styles.bodyContent, { paddingBottom: insets.bottom + 100 }]}
        showsVerticalScrollIndicator={false}
      />

      <View style={[styles.bottomBar, { paddingBottom: insets.bottom + 12 }]}>
        <View>
          <Text style={styles.bottomLabel}>Selected</Text>
          <Text style={styles.bottomRoom}>
            {selectedRoomId ? getRoomById(selectedRoomId)?.name ?? '—' : 'No room selected'}
          </Text>
        </View>
        <Pressable
          style={[styles.continueBtn, !selectedRoomId && styles.continueBtnDisabled]}
          onPress={handleContinue}
          disabled={!selectedRoomId}
        >
          <Text style={styles.continueTxt}>Continue</Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: '#FFFFFF' },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    height: 48,
  },
  backBtn: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#F3F4F6',
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#111827',
  },
  hotelSummary: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 16,
    marginTop: 8,
    marginBottom: 12,
    backgroundColor: '#F9FAFB',
    borderRadius: 12,
    padding: 10,
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  hotelImage: {
    width: 52,
    height: 52,
    borderRadius: 10,
    marginRight: 12,
  },
  hotelInfo: { flex: 1 },
  hotelName: {
    fontSize: 14,
    fontWeight: '700',
    color: '#111827',
  },
  hotelLocation: {
    fontSize: 11,
    color: '#6B7280',
    marginTop: 2,
  },
  hotelRatingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    marginTop: 3,
  },
  hotelRating: {
    fontSize: 11,
    fontWeight: '600',
    color: '#111827',
  },
  hotelReviews: {
    fontSize: 10,
    color: '#9CA3AF',
  },
  body: { flex: 1 },
  bodyContent: { paddingHorizontal: 16, paddingTop: 4 },
  sectionTitle: {
    fontSize: 11,
    fontWeight: '800',
    color: '#9CA3AF',
    letterSpacing: 1.2,
    marginBottom: 12,
  },
  roomCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 14,
    borderWidth: 1.5,
    borderColor: '#E5E7EB',
    overflow: 'hidden',
    marginBottom: 14,
  },
  roomCardSelected: {
    borderColor: '#7C3AED',
    boxShadow: '0 0 0 1px #7C3AED',
  },
  roomImage: {
    width: '100%',
    height: 140,
    resizeMode: 'cover',
  },
  roomBody: {
    padding: 14,
  },
  roomTopRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  roomTopLeft: {
    flex: 1,
  },
  roomName: {
    fontSize: 15,
    fontWeight: '700',
    color: '#111827',
  },
  roomCapacity: {
    fontSize: 11,
    color: '#6B7280',
    marginTop: 3,
  },
  priceBlock: {
    alignItems: 'flex-end',
  },
  roomPrice: {
    fontSize: 16,
    fontWeight: '800',
    color: '#7C3AED',
  },
  pricePerNight: {
    fontSize: 10,
    color: '#9CA3AF',
  },
  roomDesc: {
    fontSize: 12,
    color: '#6B7280',
    lineHeight: 17,
    marginTop: 8,
  },
  roomAmenities: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 6,
    marginTop: 10,
  },
  amenityTag: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F3E8FF',
    borderRadius: 6,
    paddingHorizontal: 7,
    paddingVertical: 4,
    gap: 4,
  },
  amenityTagTxt: {
    fontSize: 10,
    fontWeight: '600',
    color: '#7C3AED',
  },
  selectRow: {
    alignItems: 'flex-end',
    marginTop: 12,
  },
  selectBtn: {
    borderWidth: 1.5,
    borderColor: '#7C3AED',
    borderRadius: 20,
    paddingHorizontal: 20,
    paddingVertical: 7,
    minWidth: 80,
    alignItems: 'center',
  },
  selectBtnActive: {
    backgroundColor: '#7C3AED',
    borderColor: '#7C3AED',
  },
  selectBtnTxt: {
    fontSize: 12,
    fontWeight: '700',
    color: '#7C3AED',
  },
  bottomBar: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 18,
    paddingTop: 14,
    borderTopWidth: 1,
    borderTopColor: '#F3F4F6',
    boxShadow: '0 -2px 10px rgba(0,0,0,0.06)',
  },
  bottomLabel: {
    fontSize: 11,
    color: '#9CA3AF',
  },
  bottomRoom: {
    fontSize: 14,
    fontWeight: '700',
    color: '#111827',
  },
  continueBtn: {
    backgroundColor: '#7C3AED',
    borderRadius: 12,
    paddingHorizontal: 28,
    paddingVertical: 14,
    boxShadow: '0 4px 10px rgba(124,58,237,0.35)',
  },
  continueBtnDisabled: {
    backgroundColor: '#C4B5D4',
    boxShadow: 'none',
  },
  continueTxt: {
    fontSize: 14,
    fontWeight: '700',
    color: '#FFFFFF',
  },
});

export default RoomSelectionScreen;
