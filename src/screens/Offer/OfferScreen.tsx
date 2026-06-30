import React, { useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  StatusBar,
  ActivityIndicator,
  Image,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MapPin, Star, Tag } from 'lucide-react-native';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';


import TopNavBar from '../../components/Home-Screen/Topnavbar';
import {
  fetchHomeData,
  selectFeaturedHotels,
  selectHotelsLoading,
  selectHotelsError,
} from '../../redux/store/slices/HotelSlice';
import { FeaturedHotel, CouponItem, RootStackParamList } from '../../types';

// ─── Coupon data (unchanged) ─────────────────────────────────────────────────
const COUPONS: CouponItem[] = [
  {
    id: 1,
    save: 'Save',
    percent: '15%',
    label: 'Code:',
    code: 'SUMMER15',
    bg: '#FFB8D0',
    accent: '#F472A8',
    decorColor: '#F9A8D4',
  },
  {
    id: 2,
    save: 'Save',
    percent: '20%',
    label: 'Code:',
    code: 'BEACH20',
    bg: '#F9A8D4',
    accent: '#EC4899',
    decorColor: '#F472B6',
  },
  {
    id: 3,
    save: 'Save',
    percent: '25%',
    label: 'Code:',
    code: 'LUXURY25',
    bg: '#F472B6',
    accent: '#DB2777',
    decorColor: '#BE185D',
  },
];

// ─── Coupon Card ─────────────────────────────────────────────────────────────
const CouponCard = ({ item }: { item: CouponItem }) => (
  <View style={[styles.couponCard, { backgroundColor: item.bg }]}>
    {/* Top-right large semi-circle decoration */}
    <View style={[styles.couponDecoCircleLg, { backgroundColor: item.decorColor }]} />
    {/* Bottom-right small circle */}
    <View style={[styles.couponDecoCircleSm, { backgroundColor: item.accent }]} />

    {/* Discount tag icon — centered-right decorative element */}
    <View style={styles.couponTagIconWrap}>
      <Tag size={28} color="rgba(255,255,255,0.30)" strokeWidth={1.5} />
    </View>

    {/* Content */}
    <Text style={styles.couponSave}>{item.save}</Text>
    <Text style={styles.couponPercent}>{item.percent}</Text>

    {/* White hairline divider */}
    <View style={styles.couponDivider} />

    <Text style={styles.couponLabel}>{item.label}</Text>
    <Text style={styles.couponCode}>{item.code}</Text>
  </View>
);

// ─── Highlight Card ───────────────────────────────────────────────────────────
const HighlightCard = ({ item }: { item: FeaturedHotel }) => (
  <View style={styles.hlCard}>
    {/* Left: image */}
    <View style={styles.hlImgWrap}>
      {item.image ? (
        <Image source={item.image} style={StyleSheet.absoluteFill} resizeMode="cover" />
      ) : (
        <View style={[StyleSheet.absoluteFill, { backgroundColor: item.imgColor ?? '#C4B5FD' }]}>
          <View
            style={[
              StyleSheet.absoluteFill,
              {
                top: '50%',
                backgroundColor: item.imgColor2 ?? item.imgColor,
                borderBottomLeftRadius: 12,
              },
            ]}
          />
        </View>
      )}
      {/* Badge — top-left over image */}
      <View style={[styles.hlBadge, { backgroundColor: item.badgeColor ?? '#7C3AED' }]}>
        <Text style={styles.hlBadgeText}>{item.badge}</Text>
      </View>
    </View>

    {/* Right: info */}
    <View style={styles.hlInfo}>
      {/* Rating pill — absolute top-right */}
      <View style={styles.hlRatingPill}>
        <Star size={9} color="#F59E0B" fill="#F59E0B" strokeWidth={0} />
        <Text style={styles.hlRatingNum}> {item.rating}</Text>
      </View>

      {/* Hotel name */}
      <Text style={styles.hlName} numberOfLines={2}>
        {item.name}
      </Text>
      {/* Sub label (e.g. "Beach Resort & Spa") */}
      <Text style={styles.hlSub} numberOfLines={1}>
        {item.sub}
      </Text>

      {/* Location */}
      <View style={styles.hlLocationRow}>
        <MapPin size={9} color="#7C3AED" strokeWidth={2} />
        <Text style={styles.hlLocationTxt}> {item.location}</Text>
      </View>

      {/* Discount + Price — pinned bottom */}
      <View style={styles.hlBottom}>
        <Text style={styles.hlOff}>{item.off}</Text>
        <Text style={styles.hlPrice}>{item.price}</Text>
      </View>
    </View>
  </View>
);

// ─── Screen ──────────────────────────────────────────────────────────────────
const OffersScreenContent = () => {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const dispatch = useAppDispatch();

  const featuredHotels = useAppSelector(selectFeaturedHotels);
  const loading = useAppSelector(selectHotelsLoading);
  const error = useAppSelector(selectHotelsError);

  useEffect(() => {
    dispatch(fetchHomeData());
  }, [dispatch]);

  return (
    <SafeAreaView style={styles.safe} edges={['left', 'right', 'bottom']}>
      <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />

      {/* ── TopNavBar: light theme for white background ── */}
      <TopNavBar
        navigation={navigation}
        theme="light"
        containerStyle={styles.navBarOverride}
      />

      {/* ── Scrollable content ── */}
      <ScrollView
        style={styles.body}
        contentContainerStyle={styles.bodyContent}
        showsVerticalScrollIndicator={false}
      >
        {/* OFFERS heading block */}
        <View style={styles.offersTitleWrap}>
          <Text style={styles.offersTitle}>OFFERS</Text>
          <Text style={styles.offersSub}>Offers curated just for you</Text>
          <Text style={styles.offersSubSmall}>Unbeatable deals on your favorite destinations</Text>
        </View>

        {/* Coupon cards */}
        <View style={styles.couponsRow}>
          {COUPONS.map(c => (
            <CouponCard key={c.id} item={c} />
          ))}
        </View>

        {/* Spring to highlights section */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Spring to highlights</Text>
          <Text style={styles.sectionSub}>Discover properties guests love</Text>
        </View>

        {loading && (
          <View style={styles.stateBox}>
            <ActivityIndicator size="small" color="#7C3AED" />
          </View>
        )}

        {!loading && error && (
          <View style={styles.stateBox}>
            <Text style={styles.errorText}>{error}</Text>
          </View>
        )}

        {!loading && !error && (
          <View style={styles.hlList}>
            {featuredHotels.map(h => (
              <HighlightCard key={h.id} item={h} />
            ))}
          </View>
        )}

        <View style={{ height: 24 }} />
      </ScrollView>
    </SafeAreaView>
  );
};

const OffersScreen = () => (
  <OffersScreenContent />
);

// ─── Styles ──────────────────────────────────────────────────────────────────
const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },

  // Matches TopNavBar reference exactly: paddingTop 48, paddingBottom 12, paddingHorizontal 16
  // paddingHorizontal is already 16 in TopNavBar base style so only top/bottom are overridden here
  navBarOverride: {
    paddingTop: 48,
    paddingBottom: 12,
    boxShadow: '0 1px 4px rgba(0,0,0,0.06)',
  },

  body: {
    flex: 1,
    backgroundColor: '#F9FAFB',
  },
  bodyContent: {
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 16,
  },

  // ── OFFERS heading ──────────────────────────────────────────────────────────
  offersTitleWrap: {
    marginBottom: 16,
  },
  offersTitle: {
    fontSize: 34,
    fontWeight: '800',
    color: '#7C3AED',
    letterSpacing: 0.5,
    lineHeight: 40,
  },
  offersSub: {
    fontSize: 15,
    fontWeight: '700',
    color: '#111827',
    marginTop: 2,
    lineHeight: 20,
  },
  offersSubSmall: {
    fontSize: 12,
    color: '#6B7280',
    marginTop: 2,
    lineHeight: 17,
  },

  // ── Coupon cards ────────────────────────────────────────────────────────────
  couponsRow: {
    flexDirection: 'row',
    gap: 8,
    marginBottom: 20,
  },
  couponCard: {
    flex: 1,
    borderRadius: 14,
    paddingTop: 12,
    paddingBottom: 12,
    paddingLeft: 12,
    paddingRight: 12,
    overflow: 'hidden',
    minHeight: 118,
    position: 'relative',
  },
  // Large semi-circle bleeds off top-right corner
  couponDecoCircleLg: {
    position: 'absolute',
    width: 64,
    height: 64,
    borderRadius: 32,
    top: -22,
    right: -22,
    opacity: 0.55,
  },
  // Smaller circle sits in bottom-right area
  couponDecoCircleSm: {
    position: 'absolute',
    width: 40,
    height: 40,
    borderRadius: 20,
    bottom: -12,
    right: -12,
    opacity: 0.45,
  },
  // Decorative tag icon — centered-right
  couponTagIconWrap: {
    position: 'absolute',
    bottom: 10,
    right: 8,
    opacity: 0.6,
    transform: [{ rotate: '-20deg' }],
  },
  couponSave: {
    fontSize: 10,
    fontWeight: '600',
    color: '#FFFFFF',
    opacity: 0.9,
    lineHeight: 14,
  },
  couponPercent: {
    fontSize: 26,
    fontWeight: '800',
    color: '#FFFFFF',
    lineHeight: 32,
    marginTop: 2,
  },
  couponDivider: {
    height: 1,
    backgroundColor: 'rgba(255,255,255,0.40)',
    marginTop: 8,
    marginBottom: 8,
  },
  couponLabel: {
    fontSize: 9,
    fontWeight: '500',
    color: '#FFFFFF',
    opacity: 0.85,
    lineHeight: 13,
  },
  couponCode: {
    fontSize: 10,
    fontWeight: '800',
    color: '#FFFFFF',
    letterSpacing: 0.5,
    lineHeight: 15,
    marginTop: 1,
  },

  // ── Section header ──────────────────────────────────────────────────────────
  sectionHeader: {
    marginBottom: 12,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#111827',
    lineHeight: 22,
  },
  sectionSub: {
    fontSize: 12,
    color: '#6B7280',
    marginTop: 2,
    lineHeight: 17,
  },

  // ── State boxes ─────────────────────────────────────────────────────────────
  stateBox: {
    paddingVertical: 24,
    alignItems: 'center',
    justifyContent: 'center',
  },
  errorText: {
    fontSize: 13,
    color: '#DC2626',
    textAlign: 'center',
  },

  // ── Highlight list ───────────────────────────────────────────────────────────
  hlList: {
    gap: 10,
  },

  // Card: horizontal row, white, subtle shadow, rounded corners
  hlCard: {
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    borderRadius: 14,
    overflow: 'hidden',
    boxShadow: '0 2px 6px rgba(124,58,237,0.08)',
    height: 108,
  },

  // Image pane: ~38% of card width
  hlImgWrap: {
    width: '38%',
    position: 'relative',
    overflow: 'hidden',
  },

  // Badge: top-left over image
  hlBadge: {
    position: 'absolute',
    top: 8,
    left: 8,
    borderRadius: 4,
    paddingHorizontal: 6,
    paddingVertical: 3,
    zIndex: 5,
  },
  hlBadgeText: {
    fontSize: 8,
    color: '#FFFFFF',
    fontWeight: '700',
    letterSpacing: 0.2,
  },

  // Info pane: flex, relative for absolute children
  hlInfo: {
    flex: 1,
    paddingHorizontal: 10,
    paddingTop: 9,
    paddingBottom: 9,
    position: 'relative',
  },

  // Rating pill: absolute top-right
  hlRatingPill: {
    position: 'absolute',
    top: 9,
    right: 9,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FEF3C7',
    borderRadius: 10,
    paddingHorizontal: 5,
    paddingVertical: 2,
  },
  hlRatingNum: {
    fontSize: 9,
    color: '#92400E',
    fontWeight: '700',
  },

  // Hotel name — bold, dark, 2 lines max
  hlName: {
    fontSize: 13,
    fontWeight: '700',
    color: '#111827',
    lineHeight: 17,
    marginRight: 44,
    marginBottom: 1,
  },

  // Sub label — grey, small
  hlSub: {
    fontSize: 10,
    color: '#9CA3AF',
    lineHeight: 14,
    marginBottom: 3,
  },

  // Location row
  hlLocationRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  hlLocationTxt: {
    fontSize: 10,
    color: '#6B7280',
    lineHeight: 14,
  },

  // Discount % + price — absolute bottom of info pane
  hlBottom: {
    position: 'absolute',
    bottom: 9,
    left: 10,
    right: 9,
  },
  hlOff: {
    fontSize: 9.5,
    fontWeight: '700',
    color: '#DC2626',
    lineHeight: 13,
    marginBottom: 1,
  },
  hlPrice: {
    fontSize: 15,
    fontWeight: '800',
    color: '#7C3AED',
    lineHeight: 19,
  },
});

export default OffersScreen;