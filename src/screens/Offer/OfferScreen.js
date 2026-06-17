import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Dimensions,
  StatusBar,
  SafeAreaView,
} from 'react-native';
import {
  Heart,
  User,
  Menu,
  Search,
  TrendingUp,
  Compass,
  MapPin,
  Star,
} from 'lucide-react-native';

const { width } = Dimensions.get('window');

// ─────────────────────────────────────────────────────
//  COUPON CARDS  (3 pink/gradient cards)
// ─────────────────────────────────────────────────────
const COUPONS = [
  {
    id: 1,
    save: 'Save',
    percent: '15%',
    label: 'Code:',
    code: 'SUMMER15',
    bg: '#FFBFD6',
    accent: '#F87BAC',
    decorColor: '#F472A8',
  },
  {
    id: 2,
    save: 'Save',
    percent: '20%',
    label: 'Code:',
    code: 'BEACH20',
    bg: '#F9A8D4',
    accent: '#EC4899',
    decorColor: '#DB2777',
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

// ─────────────────────────────────────────────────────
//  SPRING HIGHLIGHTS
// ─────────────────────────────────────────────────────
const HIGHLIGHTS = [
  {
    id: 1,
    badge: 'Limited Time',
    badgeColor: '#6D28D9',
    name: 'Beachside Bliss in Goa',
    sub: 'Beach Resort & Spa',
    location: 'Goa, India',
    rating: 4.6,
    price: '₹9,800',
    off: '10% OFF',
    imgColor: '#3B6EA5',
    imgColor2: '#5B8EC5',
  },
  {
    id: 2,
    badge: 'Exclusive',
    badgeColor: '#7C3AED',
    name: 'Luxury Stay in Mumbai',
    sub: 'The Ocean View Hotel',
    location: 'Mumbai, India',
    rating: 4.7,
    price: '₹7,200',
    off: '15% OFF',
    imgColor: '#6D28A0',
    imgColor2: '#8B5CF6',
  },
  {
    id: 3,
    badge: 'Best Seller',
    badgeColor: '#B45309',
    name: 'Heritage Comfort in Delhi',
    sub: 'Imperial Grand Hotel',
    location: 'New Delhi, India',
    rating: 4.5,
    price: '₹7,200',
    off: '15% OFF',
    imgColor: '#78572A',
    imgColor2: '#A0743C',
  },
];

// ─────────────────────────────────────────────────────
//  COUPON CARD COMPONENT
// ─────────────────────────────────────────────────────
const CouponCard = ({ item }) => (
  <View style={[styles.couponCard, { backgroundColor: item.bg }]}>
    {/* decorative circle top-right */}
    <View style={[styles.couponCircle1, { backgroundColor: item.decorColor }]} />
    <View style={[styles.couponCircle2, { backgroundColor: item.accent }]} />

    <Text style={styles.couponSave}>{item.save}</Text>
    <Text style={styles.couponPercent}>{item.percent}</Text>
    <Text style={styles.couponLabel}>{item.label}</Text>
    <Text style={styles.couponCode}>{item.code}</Text>
  </View>
);

// ─────────────────────────────────────────────────────
//  HIGHLIGHT CARD COMPONENT
// ─────────────────────────────────────────────────────
const HighlightCard = ({ item }) => (
  <View style={styles.hlCard}>
    {/* Image (left) */}
    <View style={[styles.hlImg, { backgroundColor: item.imgColor }]}>
      {/* sky/ground layer */}
      <View
        style={[
          StyleSheet.absoluteFillObject,
          { top: '50%', backgroundColor: item.imgColor2, borderBottomLeftRadius: 10 },
        ]}
      />
      {/* Badge */}
      <View style={[styles.hlBadge, { backgroundColor: item.badgeColor }]}>
        <Text style={styles.hlBadgeText}>{item.badge}</Text>
      </View>
    </View>

    {/* Info (right) */}
    <View style={styles.hlInfo}>
      {/* Rating pill top-right */}
      <View style={styles.hlRatingPill}>
        <Star size={9} color="#F59E0B" fill="#F59E0B" strokeWidth={1.5} />
        <Text style={styles.hlRatingNum}> {item.rating}</Text>
      </View>

      <Text style={styles.hlName} numberOfLines={1}>{item.name}</Text>
      <Text style={styles.hlSub} numberOfLines={1}>{item.sub}</Text>

      <View style={styles.hlLocationRow}>
        <MapPin size={9} color="#7C3AED" strokeWidth={2.5} />
        <Text style={styles.hlLocationTxt}> {item.location}</Text>
      </View>

      <View style={styles.hlOffRow}>
        <Text style={styles.hlOff}>{item.off}</Text>
      </View>

      <View style={styles.hlPriceRow}>
        <Text style={styles.hlPrice}>{item.price}</Text>
      </View>
    </View>
  </View>
);

// ─────────────────────────────────────────────────────
//  MAIN SCREEN
// ─────────────────────────────────────────────────────
const OffersScreen = () => {
  const [activeNavTab, setActiveNavTab] = useState('Search');

  const NAV_TABS = [
    { id: 'Search', Icon: Search },
    { id: 'Trending', Icon: TrendingUp },
    { id: 'Explore', Icon: Compass },
  ];

  return (
    <SafeAreaView style={styles.safe}>
      <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />

      {/* ══ HEADER ══════════════════════════════ */}
      <View style={styles.header}>
        {/* Brand */}
        <Text style={styles.brand}>
          <Text style={styles.brandHotel}>Hotel</Text>
          <Text style={styles.brandHub}>Hub</Text>
        </Text>

        {/* Right icons */}
        <View style={styles.headerRight}>
          <TouchableOpacity style={styles.hBtn}>
            <Heart size={18} color="#374151" strokeWidth={1.8} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.hBtn}>
            {/* notification bell dot */}
            <View>
              <User size={18} color="#374151" strokeWidth={1.8} />
              <View style={styles.redDot} />
            </View>
          </TouchableOpacity>
          <TouchableOpacity style={styles.menuSquare}>
            <Menu size={15} color="#fff" strokeWidth={2.2} />
          </TouchableOpacity>
        </View>
      </View>

      {/* ══ NAV TAB BAR ═════════════════════════ */}
      <View style={styles.navTabOuter}>
        <View style={styles.navTabBar}>
          {NAV_TABS.map(({ id, Icon }) => {
            const active = activeNavTab === id;
            return (
              <TouchableOpacity
                key={id}
                style={[styles.navTab, active && styles.navTabActive]}
                onPress={() => setActiveNavTab(id)}
                activeOpacity={0.8}
              >
                <Icon size={11} color={active ? '#fff' : 'rgba(255,255,255,0.55)'} strokeWidth={active ? 2 : 1.8} />
                <Text style={[styles.navTabTxt, active && styles.navTabTxtActive]}>{'  '}{id}</Text>
              </TouchableOpacity>
            );
          })}
        </View>
      </View>

      {/* ══ SCROLL BODY ═════════════════════════ */}
      <ScrollView
        style={styles.body}
        contentContainerStyle={styles.bodyContent}
        showsVerticalScrollIndicator={false}
      >
        {/* ── OFFERS heading ── */}
        <View style={styles.offersTitleWrap}>
          <Text style={styles.offersTitle}>OFFERS</Text>
          <Text style={styles.offersSub}>Offers curated just for you</Text>
          <Text style={styles.offersSubSmall}>Unbeatable deals on your favorite destinations</Text>
        </View>

        {/* ── Coupon Cards Row ── */}
        <View style={styles.couponsRow}>
          {COUPONS.map(c => <CouponCard key={c.id} item={c} />)}
        </View>

        {/* ── Spring to highlights ── */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Spring to highlights</Text>
          <Text style={styles.sectionSub}>Discover properties guests love</Text>
        </View>

        {/* ── Highlight cards ── */}
        <View style={styles.hlList}>
          {HIGHLIGHTS.map(h => <HighlightCard key={h.id} item={h} />)}
        </View>

        <View style={{ height: 20 }} />
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },

  // ── Header ─────────────────────────────────
  header: {
    backgroundColor: '#FFFFFF',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingTop: 35,
    paddingBottom: 10,
    borderBottomWidth: 0,
  },
  brand: { fontSize: 20, fontWeight: '800' },
  brandHotel: { color: '#111827' },
  brandHub: { color: '#7C3AED' },
  headerRight: { flexDirection: 'row', alignItems: 'center', gap: 4 },
  hBtn: { width: 32, height: 32, justifyContent: 'center', alignItems: 'center' },
  redDot: {
    position: 'absolute',
    top: -1,
    right: -1,
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#EF4444',
  },
  menuSquare: {
    width: 28,
    height: 28,
    backgroundColor: '#7C3AED',
    borderRadius: 6,
    justifyContent: 'center',
    alignItems: 'center',
  },

  // ── Nav tab bar ─────────────────────────────
  navTabOuter: {
    backgroundColor: '#1A0533',
    paddingHorizontal: 14,
    paddingVertical: 8,
  },
  navTabBar: {
    flexDirection: 'row',
    backgroundColor: 'rgba(255,255,255,0.1)',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.15)',
    padding: 3,
    gap: 2,
  },
  navTab: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 6,
    borderRadius: 6,
  },
  navTabActive: { backgroundColor: '#6D28D9' },
  navTabTxt: { fontSize: 11, color: 'rgba(255,255,255,0.55)', fontWeight: '500' },
  navTabTxtActive: { color: '#fff', fontWeight: '700' },

  // ── Body ────────────────────────────────────
  body: { flex: 1, backgroundColor: '#FFFFFF' },
  bodyContent: { paddingHorizontal: 14, paddingTop: 16 },

  // ── Offers Title ────────────────────────────
  offersTitleWrap: { marginBottom: 16 },
  offersTitle: {
    fontSize: 30,
    fontWeight: '800',
    color: '#7C3AED',
    letterSpacing: 0.5,
    lineHeight: 36,
  },
  offersSub: {
    fontSize: 14,
    fontWeight: '700',
    color: '#111827',
    marginTop: 2,
  },
  offersSubSmall: {
    fontSize: 11.5,
    color: '#6B7280',
    marginTop: 2,
  },

  // ── Coupon Cards ────────────────────────────
  couponsRow: {
    flexDirection: 'row',
    gap: 8,
    marginBottom: 22,
  },
  couponCard: {
    flex: 1,
    borderRadius: 12,
    padding: 11,
    paddingTop: 10,
    overflow: 'hidden',
    minHeight: 90,
    position: 'relative',
  },
  couponCircle1: {
    position: 'absolute',
    width: 44,
    height: 44,
    borderRadius: 22,
    top: -12,
    right: -12,
    opacity: 0.45,
  },
  couponCircle2: {
    position: 'absolute',
    width: 30,
    height: 30,
    borderRadius: 15,
    bottom: 8,
    right: 8,
    opacity: 0.35,
  },
  couponSave: {
    fontSize: 9,
    color: '#fff',
    fontWeight: '600',
    opacity: 0.9,
  },
  couponPercent: {
    fontSize: 22,
    fontWeight: '800',
    color: '#fff',
    lineHeight: 28,
  },
  couponLabel: {
    fontSize: 8.5,
    color: '#fff',
    fontWeight: '500',
    marginTop: 4,
    opacity: 0.85,
  },
  couponCode: {
    fontSize: 9,
    fontWeight: '800',
    color: '#fff',
    letterSpacing: 0.3,
  },

  // ── Section header ──────────────────────────
  sectionHeader: { marginBottom: 12 },
  sectionTitle: {
    fontSize: 15,
    fontWeight: '700',
    color: '#111827',
  },
  sectionSub: {
    fontSize: 11.5,
    color: '#6B7280',
    marginTop: 1,
  },

  // ── Highlight list ──────────────────────────
  hlList: { gap: 10 },
  hlCard: {
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: '#F3F4F6',
    shadowColor: '#000',
    shadowOpacity: 0.07,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 2 },
    elevation: 2,
    height: 100,
  },
  hlImg: {
    width: 110,
    position: 'relative',
    overflow: 'hidden',
  },
  hlBadge: {
    position: 'absolute',
    top: 7,
    left: 7,
    borderRadius: 4,
    paddingHorizontal: 5,
    paddingVertical: 2,
    zIndex: 5,
  },
  hlBadgeText: {
    fontSize: 7,
    color: '#fff',
    fontWeight: '700',
    letterSpacing: 0.2,
  },
  hlInfo: {
    flex: 1,
    paddingHorizontal: 10,
    paddingVertical: 8,
    position: 'relative',
  },
  hlRatingPill: {
    position: 'absolute',
    top: 8,
    right: 10,
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
  hlName: {
    fontSize: 12,
    fontWeight: '700',
    color: '#111827',
    marginRight: 40,
    lineHeight: 16,
  },
  hlSub: {
    fontSize: 10,
    color: '#6B7280',
    marginTop: 1,
    lineHeight: 14,
  },
  hlLocationRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 3,
  },
  hlLocationTxt: {
    fontSize: 10,
    color: '#6B7280',
  },
  hlOffRow: {
    marginTop: 4,
  },
  hlOff: {
    fontSize: 9.5,
    color: '#DC2626',
    fontWeight: '700',
  },
  hlPriceRow: {
    marginTop: 1,
  },
  hlPrice: {
    fontSize: 13,
    fontWeight: '800',
    color: '#7C3AED',
  },
});

export default OffersScreen;