import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Pressable,
} from 'react-native';
import {
  Heart,
  MapPin,
  Calendar,
  Star,
  Check,
} from 'lucide-react-native';
import { HotelCardData } from '../../types';
import { HOTELS } from './hotelConstants';

type HotelCardProps = {
  hotel: HotelCardData;
  navigation: any;
};

export const HotelCard = ({ hotel, navigation }: HotelCardProps) => {
  const [liked, setLiked] = useState(false);

  return (
    <View style={styles.card}>
      <View style={[styles.cardPhoto, { backgroundColor: hotel.imgTop }]}>
        <View
          style={[
            StyleSheet.absoluteFill,
            { top: '55%', backgroundColor: hotel.imgBottom },
          ]}
        />
        {hotel.badge && (
          <View style={[styles.photoBadge, { backgroundColor: hotel.badgeColor }]}>
            <Text style={styles.photoBadgeText}>{hotel.badge}</Text>
          </View>
        )}
        <Pressable
          style={styles.photoHeart}
          onPress={() => setLiked(p => !p)}
        >
          <Heart
            size={12}
            color={liked ? '#EF4444' : '#fff'}
            fill={liked ? '#EF4444' : 'transparent'}
            strokeWidth={2}
          />
        </Pressable>
      </View>

      <View style={styles.cardInfo}>
        <Text style={styles.cardName} numberOfLines={1}>{hotel.name}</Text>
        <View style={styles.locationRow}>
          <MapPin size={10} color="#9CA3AF" strokeWidth={2.2} />
          <Text style={styles.locationTxt}> {hotel.location}</Text>
          <Text style={styles.roomsTxt}>  •  {hotel.rooms}</Text>
        </View>
        <View style={styles.starsRow}>
          <Star size={10} color="#F59E0B" fill="#F59E0B" strokeWidth={0} />
          <Text style={styles.ratingTxt}> {hotel.rating.toFixed(1)}</Text>
          <View style={styles.tinyTag}>
            <MapPin size={7} color="#7C3AED" strokeWidth={2.5} />
          </View>
          <View style={styles.tinyTag}>
            <Calendar size={7} color="#7C3AED" strokeWidth={2.5} />
          </View>
        </View>
        <View style={styles.tagsRow}>
          {hotel.tags.map(t => (
            <View key={t} style={styles.tag}>
              <Check size={7} color="#7C3AED" strokeWidth={3} />
              <Text style={styles.tagTxt}> {t}</Text>
            </View>
          ))}
        </View>
        <View style={styles.bottomRow}>
          <View>
            <Text style={styles.priceLbl}>Price per night</Text>
            <Text style={styles.priceVal}>{hotel.price}</Text>
          </View>
          <Pressable
            style={styles.bookBtn}
            onPress={() => navigation.navigate('Bottom', { screen: 'Bookings' })}
          >
            <Text style={styles.bookTxt}>View & Book</Text>
          </Pressable>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    borderRadius: 14,
    overflow: 'hidden',
    height: 132,
    boxShadow: '0 2px 6px rgba(0,0,0,0.05)',
    marginBottom: 10,
  },
  cardPhoto: {
    width: 110,
    position: 'relative',
    overflow: 'hidden',
  },
  photoBadge: {
    position: 'absolute',
    top: 7,
    left: 7,
    borderRadius: 4,
    paddingHorizontal: 5,
    paddingVertical: 2,
    zIndex: 5,
  },
  photoBadgeText: {
    fontSize: 8,
    color: '#fff',
    fontWeight: '700',
    letterSpacing: 0.3,
  },
  photoHeart: {
    position: 'absolute',
    top: 7,
    right: 7,
    width: 22,
    height: 22,
    backgroundColor: 'rgba(0,0,0,0.3)',
    borderRadius: 11,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 5,
  },
  cardInfo: {
    flex: 1,
    paddingHorizontal: 11,
    paddingVertical: 10,
    justifyContent: 'space-between',
  },
  cardName: {
    fontSize: 13,
    fontWeight: '700',
    color: '#111827',
    lineHeight: 17,
  },
  locationRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 2,
  },
  locationTxt: {
    fontSize: 10.5,
    color: '#6B7280',
    fontWeight: '500',
  },
  roomsTxt: {
    fontSize: 10,
    color: '#9CA3AF',
  },
  starsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 3,
    gap: 4,
  },
  ratingTxt: {
    fontSize: 10.5,
    color: '#111827',
    fontWeight: '700',
  },
  tinyTag: {
    width: 14,
    height: 14,
    borderRadius: 4,
    backgroundColor: '#F3E8FF',
    justifyContent: 'center',
    alignItems: 'center',
  },
  tagsRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 4,
    marginTop: 4,
  },
  tag: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F3E8FF',
    borderRadius: 4,
    paddingHorizontal: 5,
    paddingVertical: 2,
  },
  tagTxt: {
    fontSize: 7.5,
    color: '#7C3AED',
    fontWeight: '600',
    letterSpacing: 0.1,
  },
  bottomRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    marginTop: 4,
  },
  priceLbl: { fontSize: 8.5, color: '#9CA3AF' },
  priceVal: { fontSize: 13.5, fontWeight: '800', color: '#7C3AED', marginTop: 1 },
  bookBtn: {
    backgroundColor: '#7C3AED',
    borderRadius: 7,
    paddingHorizontal: 10,
    paddingVertical: 6,
  },
  bookTxt: {
    fontSize: 9.5,
    color: '#fff',
    fontWeight: '700',
  },
});
