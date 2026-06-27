import React, { useState } from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  ScrollView,
  Pressable,
  StatusBar,
} from 'react-native';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import { Heart, MapPin, Star, Check } from 'lucide-react-native';
import HotelHubHeader from '../../components/HotelHubHeader/HotelHubHeader';
import { HOTELS } from '../Search/hotelConstants';
import { BottomTabBar } from '../BottomTab/BottomTabNavigator';

type WishlistScreenProps = { navigation: any };

const WishlistScreen = ({ navigation }: WishlistScreenProps) => {
  const insets = useSafeAreaInsets();
  const [likedIds, setLikedIds] = useState<Set<number>>(new Set(HOTELS.map(h => h.id)));

  const toggleLike = (id: number) => {
    setLikedIds(prev => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const wishlistHotels = HOTELS.filter(h => likedIds.has(h.id));

  return (
    <SafeAreaView style={styles.safe}>
      <StatusBar barStyle="light-content" backgroundColor="#1A0533" />
      <HotelHubHeader
        theme="dark"
        rightIcons={
          <Heart size={20} color="#000" strokeWidth={1.8} />
        }
      />
      <Text style={styles.screenTitle}>My Wishlist</Text>

      <ScrollView
        style={styles.body}
        contentContainerStyle={[styles.bodyContent, { paddingBottom: insets.bottom + 90 }]}
        showsVerticalScrollIndicator={false}
      >
        {wishlistHotels.length === 0 ? (
          <View style={styles.emptyBox}>
            <Heart size={40} color="#D1D5DB" strokeWidth={1.5} />
            <Text style={styles.emptyTitle}>No saved stays yet</Text>
            <Text style={styles.emptySub}>Tap the heart icon on any hotel to save it here.</Text>
          </View>
        ) : (
          wishlistHotels.map(hotel => (
            <View key={hotel.id} style={styles.card}>
              <View style={styles.cardImageWrap}>
                {hotel.image ? (
                  <Image source={{ uri: hotel.image }} style={styles.cardImage} resizeMode="cover" />
                ) : (
                  <View style={[StyleSheet.absoluteFill, { backgroundColor: hotel.imgTop }]} />
                )}
                <Pressable style={styles.heartBtn} onPress={() => toggleLike(hotel.id)}>
                  <Heart size={14} color="#EF4444" fill="#EF4444" strokeWidth={2} />
                </Pressable>
                {hotel.badge && (
                  <View style={[styles.badge, { backgroundColor: hotel.badgeColor }]}>
                    <Text style={styles.badgeTxt}>{hotel.badge}</Text>
                  </View>
                )}
              </View>
              <View style={styles.cardBody}>
                <Text style={styles.cardName} numberOfLines={1}>{hotel.name}</Text>
                <View style={styles.locationRow}>
                  <MapPin size={10} color="#9CA3AF" strokeWidth={2} />
                  <Text style={styles.locationTxt}>{hotel.location} • {hotel.rooms}</Text>
                </View>
                <View style={styles.starsRow}>
                  <Star size={10} color="#F59E0B" fill="#F59E0B" strokeWidth={0} />
                  <Text style={styles.ratingTxt}>{hotel.rating.toFixed(1)}</Text>
                  <View style={styles.tag}>
                    <Check size={7} color="#7C3AED" strokeWidth={3} />
                    <Text style={styles.tagTxt}>{hotel.tags[0]}</Text>
                  </View>
                </View>
                <View style={styles.bottomRow}>
                  <Text style={styles.priceVal}>{hotel.price}<Text style={styles.pricePer}>/night</Text></Text>
                  <Pressable
                    style={styles.viewBtn}
                    onPress={() => navigation.navigate('PropertyDetails', { hotelId: hotel.id })}
                  >
                    <Text style={styles.viewBtnTxt}>View</Text>
                  </Pressable>
                </View>
              </View>
            </View>
          ))
        )}
      </ScrollView>

      <BottomTabBar activeTab="Home" navigation={navigation} />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: '#FFFFFF' },
  screenTitle: { fontSize: 16, fontWeight: '700', color: '#1A1A1A', paddingHorizontal: 16, marginTop: 4, marginBottom: 10 },
  body: { flex: 1, backgroundColor: '#F9FAFB' },
  bodyContent: { paddingHorizontal: 16, paddingTop: 4 },
  emptyBox: { alignItems: 'center', paddingTop: 60, gap: 10 },
  emptyTitle: { fontSize: 16, fontWeight: '700', color: '#111827' },
  emptySub: { fontSize: 13, color: '#9CA3AF', textAlign: 'center' },
  card: { flexDirection: 'row', backgroundColor: '#FFF', borderRadius: 14, overflow: 'hidden', height: 120, marginBottom: 12, boxShadow: '0 2px 6px rgba(0,0,0,0.05)' },
  cardImageWrap: { width: 110, position: 'relative', overflow: 'hidden' },
  cardImage: { width: '100%', height: '100%' },
  heartBtn: { position: 'absolute', top: 7, right: 7, width: 24, height: 24, borderRadius: 12, backgroundColor: 'rgba(255,255,255,0.9)', justifyContent: 'center', alignItems: 'center', zIndex: 5 },
  badge: { position: 'absolute', top: 7, left: 7, borderRadius: 4, paddingHorizontal: 5, paddingVertical: 2, zIndex: 5 },
  badgeTxt: { fontSize: 8, color: '#fff', fontWeight: '700' },
  cardBody: { flex: 1, padding: 10, justifyContent: 'space-between' },
  cardName: { fontSize: 13, fontWeight: '700', color: '#111827' },
  locationRow: { flexDirection: 'row', alignItems: 'center', gap: 3, marginTop: 2 },
  locationTxt: { fontSize: 10, color: '#6B7280' },
  starsRow: { flexDirection: 'row', alignItems: 'center', gap: 4, marginTop: 3 },
  ratingTxt: { fontSize: 10, fontWeight: '700', color: '#111827' },
  tag: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#F3E8FF', borderRadius: 4, paddingHorizontal: 5, paddingVertical: 1, gap: 2 },
  tagTxt: { fontSize: 8, color: '#7C3AED', fontWeight: '600' },
  bottomRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  priceVal: { fontSize: 14, fontWeight: '800', color: '#7C3AED' },
  pricePer: { fontSize: 10, color: '#9CA3AF', fontWeight: '500' },
  viewBtn: { borderWidth: 1, borderColor: '#7C3AED', borderRadius: 8, paddingHorizontal: 12, paddingVertical: 5 },
  viewBtnTxt: { fontSize: 10, color: '#7C3AED', fontWeight: '700' },
});

export default WishlistScreen;
