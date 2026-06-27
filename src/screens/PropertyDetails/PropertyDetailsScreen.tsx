import React from 'react';
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
import {
  ArrowLeft,
  Heart,
  Share2,
  MapPin,
  Star,
  Wifi,
  Car,
  UtensilsCrossed,
  Waves,
  Dumbbell,
  Sparkles,
  Flame,
  Mountain,
  Coffee,
} from 'lucide-react-native';
import { getPropertyById } from './propertyData';

const ICON_MAP: Record<string, any> = {
  Wifi,
  Car,
  UtensilsCrossed,
  Waves,
  Dumbbell,
  Sparkles,
  Flame,
  Mountain,
  Coffee,
};

type PropertyDetailsScreenProps = {
  navigation: any;
  route: any;
};

const PropertyDetailsScreen = ({ navigation, route }: PropertyDetailsScreenProps) => {
  const insets = useSafeAreaInsets();
  const { hotelId } = route.params || { hotelId: 1 };
  const property = getPropertyById(hotelId);

  if (!property) {
    return (
      <SafeAreaView style={styles.safe}>
        <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />
        <View style={styles.centerBox}>
          <Text style={styles.centerTxt}>Property not found</Text>
          <Pressable style={styles.backToHomeBtn} onPress={() => navigation.goBack()}>
            <Text style={styles.backToHomeTxt}>Go Back</Text>
          </Pressable>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.safe} edges={['top']}>
      <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />

      <View style={styles.header}>
        <Pressable style={styles.backBtn} onPress={() => navigation.goBack()}>
          <ArrowLeft size={20} color="#111827" strokeWidth={2} />
        </Pressable>
        <View style={styles.headerRight}>
          <Pressable style={styles.headerIcon}>
            <Heart size={20} color="#111827" strokeWidth={1.8} />
          </Pressable>
          <Pressable style={styles.headerIcon}>
            <Share2 size={20} color="#111827" strokeWidth={1.8} />
          </Pressable>
        </View>
      </View>

      <ScrollView
        style={styles.body}
        contentContainerStyle={[styles.bodyContent, { paddingBottom: insets.bottom + 100 }]}
        showsVerticalScrollIndicator={false}
      >
        <Image source={{ uri: property.image }} style={styles.heroImage} />

        <View style={styles.infoSection}>
          <Text style={styles.hotelName}>{property.name}</Text>

          <View style={styles.locationRow}>
            <MapPin size={14} color="#7C3AED" strokeWidth={2} />
            <Text style={styles.locationTxt}>{property.location}</Text>
          </View>

          <View style={styles.ratingRow}>
            <Star size={16} color="#F59E0B" fill="#F59E0B" strokeWidth={0} />
            <Text style={styles.ratingTxt}>{property.rating.toFixed(1)}</Text>
            <Text style={styles.reviewsTxt}>({property.reviews} reviews)</Text>
            <View style={styles.priceTag}>
              <Text style={styles.priceTxt}>{property.price}</Text>
              <Text style={styles.pricePerNight}>/night</Text>
            </View>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>AMENITIES</Text>
          <View style={styles.amenitiesGrid}>
            {property.amenities.map((a) => {
              const IconComp = ICON_MAP[a.icon] || Sparkles;
              return (
                <View key={a.label} style={styles.amenityPill}>
                  <View style={styles.amenityIconWrap}>
                    <IconComp size={16} color="#7C3AED" strokeWidth={2} />
                  </View>
                  <Text style={styles.amenityLabel}>{a.label}</Text>
                </View>
              );
            })}
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>ABOUT THIS PROPERTY</Text>
          <Text style={styles.descriptionTxt}>{property.description}</Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>REVIEWS</Text>
          <View style={styles.ratingSummary}>
            <Text style={styles.ratingBig}>{property.rating.toFixed(1)}</Text>
            <View>
              <View style={styles.starsRow}>
                {[1, 2, 3, 4, 5].map(s => (
                  <Star
                    key={s}
                    size={14}
                    color="#F59E0B"
                    fill={s <= Math.round(property.rating) ? '#F59E0B' : 'transparent'}
                    strokeWidth={s <= Math.round(property.rating) ? 0 : 1.5}
                  />
                ))}
              </View>
              <Text style={styles.reviewCount}>{property.reviews} reviews</Text>
            </View>
          </View>

          {property.reviewsList.map((r) => (
            <View key={`${r.name}-${r.date}`} style={styles.reviewCard}>
              <View style={styles.reviewTop}>
                <View style={styles.reviewerAvatar}>
                  <Text style={styles.avatarTxt}>{r.name.charAt(0)}</Text>
                </View>
                <View style={{ flex: 1 }}>
                  <Text style={styles.reviewerName}>{r.name}</Text>
                  <Text style={styles.reviewDate}>{r.date}</Text>
                </View>
                <View style={styles.reviewRatingBadge}>
                  <Star size={10} color="#F59E0B" fill="#F59E0B" strokeWidth={0} />
                  <Text style={styles.reviewRatingTxt}>{r.rating}</Text>
                </View>
              </View>
              <Text style={styles.reviewComment}>{r.comment}</Text>
            </View>
          ))}
        </View>
      </ScrollView>

      <View style={[styles.bottomBar, { paddingBottom: insets.bottom + 12 }]}>
        <View>
          <Text style={styles.bottomPriceLabel}>Starting from</Text>
          <Text style={styles.bottomPrice}>{property.price}<Text style={styles.bottomPerNight}> /night</Text></Text>
        </View>
        <Pressable
          style={styles.selectRoomBtn}
          onPress={() => navigation.navigate('RoomSelection', { hotelId: property.id })}
        >
          <Text style={styles.selectRoomTxt}>Select Room</Text>
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
  headerRight: { flexDirection: 'row', gap: 10 },
  headerIcon: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#F3F4F6',
    justifyContent: 'center',
    alignItems: 'center',
  },
  body: { flex: 1 },
  bodyContent: { paddingTop: 4 },
  heroImage: {
    width: '100%',
    height: 220,
    resizeMode: 'cover',
  },
  infoSection: {
    paddingHorizontal: 18,
    paddingTop: 16,
  },
  hotelName: {
    fontSize: 22,
    fontWeight: '800',
    color: '#111827',
    lineHeight: 28,
  },
  locationRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 6,
    gap: 4,
  },
  locationTxt: {
    fontSize: 13,
    color: '#6B7280',
    fontWeight: '500',
  },
  ratingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
    gap: 4,
  },
  ratingTxt: {
    fontSize: 14,
    fontWeight: '700',
    color: '#111827',
  },
  reviewsTxt: {
    fontSize: 12,
    color: '#9CA3AF',
    marginRight: 'auto',
  },
  priceTag: {
    flexDirection: 'row',
    alignItems: 'baseline',
  },
  priceTxt: {
    fontSize: 18,
    fontWeight: '800',
    color: '#7C3AED',
  },
  pricePerNight: {
    fontSize: 12,
    color: '#9CA3AF',
    fontWeight: '500',
  },
  section: {
    paddingHorizontal: 18,
    marginTop: 22,
  },
  sectionTitle: {
    fontSize: 12,
    fontWeight: '800',
    color: '#9CA3AF',
    letterSpacing: 1.2,
    marginBottom: 12,
  },
  amenitiesGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
  },
  amenityPill: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F3E8FF',
    borderRadius: 10,
    paddingHorizontal: 12,
    paddingVertical: 8,
    gap: 8,
  },
  amenityIconWrap: {
    width: 28,
    height: 28,
    borderRadius: 8,
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
  },
  amenityLabel: {
    fontSize: 12,
    fontWeight: '600',
    color: '#7C3AED',
  },
  descriptionTxt: {
    fontSize: 13.5,
    color: '#374151',
    lineHeight: 21,
    fontWeight: '400',
  },
  ratingSummary: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FEF3C7',
    borderRadius: 12,
    padding: 14,
    gap: 12,
    marginBottom: 14,
  },
  ratingBig: {
    fontSize: 28,
    fontWeight: '800',
    color: '#111827',
  },
  starsRow: {
    flexDirection: 'row',
    gap: 2,
  },
  reviewCount: {
    fontSize: 11,
    color: '#9CA3AF',
    marginTop: 2,
  },
  reviewCard: {
    borderWidth: 1,
    borderColor: '#E5E7EB',
    borderRadius: 12,
    padding: 14,
    marginBottom: 10,
  },
  reviewTop: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  reviewerAvatar: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#7C3AED',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
  },
  avatarTxt: {
    fontSize: 14,
    fontWeight: '700',
    color: '#FFFFFF',
  },
  reviewerName: {
    fontSize: 13,
    fontWeight: '700',
    color: '#111827',
  },
  reviewDate: {
    fontSize: 11,
    color: '#9CA3AF',
    marginTop: 1,
  },
  reviewRatingBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FEF3C7',
    borderRadius: 6,
    paddingHorizontal: 6,
    paddingVertical: 3,
    gap: 3,
  },
  reviewRatingTxt: {
    fontSize: 11,
    fontWeight: '700',
    color: '#D97706',
  },
  reviewComment: {
    fontSize: 12.5,
    color: '#374151',
    lineHeight: 18,
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
  bottomPriceLabel: {
    fontSize: 11,
    color: '#9CA3AF',
  },
  bottomPrice: {
    fontSize: 18,
    fontWeight: '800',
    color: '#7C3AED',
  },
  bottomPerNight: {
    fontSize: 12,
    color: '#9CA3AF',
    fontWeight: '500',
  },
  selectRoomBtn: {
    backgroundColor: '#7C3AED',
    borderRadius: 12,
    paddingHorizontal: 28,
    paddingVertical: 14,
    boxShadow: '0 4px 10px rgba(124,58,237,0.35)',
  },
  selectRoomTxt: {
    fontSize: 14,
    fontWeight: '700',
    color: '#FFFFFF',
  },
  centerBox: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    gap: 16,
  },
  centerTxt: {
    fontSize: 16,
    fontWeight: '600',
    color: '#6B7280',
  },
  backToHomeBtn: {
    backgroundColor: '#7C3AED',
    borderRadius: 10,
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  backToHomeTxt: {
    fontSize: 13,
    fontWeight: '700',
    color: '#FFFFFF',
  },
});

export default PropertyDetailsScreen;
