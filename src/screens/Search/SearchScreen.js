import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  TextInput,
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
  BedDouble,
  Calendar,
  Star,
  ChevronRight,
} from 'lucide-react-native';

const { width } = Dimensions.get('window');

// ─────────────────────────────────────────────────────────────
//  DATA
// ─────────────────────────────────────────────────────────────
const HOTELS = [
  {
    id: 1,
    name: 'Manhattan Skyline Suites',
    location: 'New York, USA',
    price: '$240',
    rating: 4.8,
    reviews: 1240,
    tags: ['LUXURY', 'POOL', 'SPA'],
    badge: 'FEATURED',
    badgeColor: '#7C3AED',
    // Photo simulation colours (sky / building tones)
    imgTop: '#5B8DB8',
    imgBottom: '#8BAFC8',
  },
  {
    id: 2,
    name: 'Grand Palace Hotel',
    location: 'Paris, France',
    price: '$320',
    rating: 4.9,
    reviews: 987,
    tags: ['BREAKFAST', 'WIFI', 'GYM'],
    badge: null,
    imgTop: '#C4A882',
    imgBottom: '#9B7F5E',
  },
  {
    id: 3,
    name: 'Grand Palace Hotel',
    location: 'Rome, Italy',
    price: '$195',
    rating: 4.7,
    reviews: 654,
    tags: ['RESTAURANT', 'POOL', 'BAR'],
    badge: null,
    imgTop: '#8BA888',
    imgBottom: '#6A8A67',
  },
  {
    id: 4,
    name: 'Grand Palace Hotel',
    location: 'Barcelona, Spain',
    price: '$175',
    rating: 4.6,
    reviews: 432,
    tags: ['WIFI', 'PARKING', 'SPA'],
    badge: 'DEAL',
    badgeColor: '#DC2626',
    imgTop: '#B07B5E',
    imgBottom: '#8A5C42',
  },
  {
    id: 5,
    name: "D'Effinc Luxury Stay",
    location: 'Dubai, UAE',
    price: '$450',
    rating: 5.0,
    reviews: 2100,
    tags: ['LUXURY', 'POOL', 'BEACH'],
    badge: 'TOP RATED',
    badgeColor: '#059669',
    imgTop: '#4A7FA5',
    imgBottom: '#2E5F80',
  },
  {
    id: 6,
    name: 'Palm Hotel',
    location: 'Maldives',
    price: '$680',
    rating: 4.9,
    reviews: 876,
    tags: ['OVERWATER', 'SPA', 'DIVING'],
    badge: null,
    imgTop: '#6BAED6',
    imgBottom: '#4292C6',
  },
  {
    id: 7,
    name: 'Green Valley Stay',
    location: 'Bali, Indonesia',
    price: '$120',
    rating: 4.5,
    reviews: 321,
    tags: ['NATURE', 'POOL', 'YOGA'],
    badge: 'ECO',
    badgeColor: '#16A34A',
    imgTop: '#74B49B',
    imgBottom: '#5C9E83',
  },
  {
    id: 8,
    name: 'Dessy',
    location: 'Santorini, Greece',
    price: '$290',
    rating: 4.8,
    reviews: 543,
    tags: ['VIEW', 'POOL', 'ROMANTIC'],
    badge: null,
    imgTop: '#A8C4D4',
    imgBottom: '#7BA3B8',
  },
];

// ─────────────────────────────────────────────────────────────
//  HOTEL CARD
// ─────────────────────────────────────────────────────────────
const HotelCard = ({ hotel }) => {
  const [liked, setLiked] = useState(false);
  const fullStars = Math.floor(hotel.rating);

  return (
    <View style={styles.card}>
      {/* ── Photo panel (left) ── */}
      <View style={[styles.cardPhoto, { backgroundColor: hotel.imgTop }]}>
        {/* simulated horizon */}
        <View
          style={[
            StyleSheet.absoluteFillObject,
            {
              top: '55%',
              backgroundColor: hotel.imgBottom,
              borderBottomLeftRadius: 12,
            },
          ]}
        />
        {/* tiny building silhouette lines */}
        <View style={styles.silhouetteWrap}>
          <View style={[styles.silBlock, { height: 28, width: 7 }]} />
          <View style={[styles.silBlock, { height: 20, width: 5 }]} />
          <View style={[styles.silBlock, { height: 34, width: 8 }]} />
          <View style={[styles.silBlock, { height: 18, width: 6 }]} />
          <View style={[styles.silBlock, { height: 24, width: 7 }]} />
        </View>

        {/* Badge */}
        {hotel.badge && (
          <View style={[styles.photoBadge, { backgroundColor: hotel.badgeColor }]}>
            <Text style={styles.photoBadgeText}>{hotel.badge}</Text>
          </View>
        )}

        {/* Heart */}
        <TouchableOpacity
          style={styles.photoHeart}
          onPress={() => setLiked(p => !p)}
          activeOpacity={0.8}
        >
          <Heart
            size={12}
            color={liked ? '#EF4444' : '#fff'}
            fill={liked ? '#EF4444' : 'transparent'}
            strokeWidth={2}
          />
        </TouchableOpacity>
      </View>

      {/* ── Info panel (right) ── */}
      <View style={styles.cardInfo}>
        {/* Name row */}
        <View style={styles.nameRow}>
          <Text style={styles.cardName} numberOfLines={1}>
            {hotel.name}
          </Text>
          <View style={styles.priceWrap}>
            <Text style={styles.priceVal}>{hotel.price}</Text>
            <Text style={styles.priceNight}>/night</Text>
          </View>
        </View>

        {/* Location */}
        <View style={styles.locationRow}>
          <MapPin size={10} color="#7C3AED" strokeWidth={2.5} />
          <Text style={styles.locationTxt}> {hotel.location}</Text>
        </View>

        {/* Stars + reviews */}
        <View style={styles.starsRow}>
          {Array.from({ length: 5 }).map((_, i) => (
            <Star
              key={i}
              size={9}
              color={i < fullStars ? '#F59E0B' : '#D1D5DB'}
              fill={i < fullStars ? '#F59E0B' : 'transparent'}
              strokeWidth={1.5}
            />
          ))}
          <Text style={styles.ratingTxt}> {hotel.rating}</Text>
          <Text style={styles.reviewsTxt}>  ({hotel.reviews} reviews)</Text>
        </View>

        {/* Tags */}
        <View style={styles.tagsRow}>
          {hotel.tags.map(t => (
            <View key={t} style={styles.tag}>
              <Text style={styles.tagTxt}>{t}</Text>
            </View>
          ))}
        </View>

        {/* Book Now */}
        <TouchableOpacity style={styles.bookBtn} activeOpacity={0.85}>
          <Text style={styles.bookTxt}>Book Now</Text>
          <ChevronRight size={11} color="#fff" strokeWidth={2.5} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

// ─────────────────────────────────────────────────────────────
//  SCREEN
// ─────────────────────────────────────────────────────────────
const SearchScreen = ({ navigation }) => {
  const [activeTab, setActiveTab] = useState('Search');
  const [destination, setDestination] = useState('');
  const [guests, setGuests] = useState('');
  const [dates, setDates] = useState('');

  const TABS = [
    { id: 'Search', Icon: Search },
    { id: 'Trending', Icon: TrendingUp },
    { id: 'Explore', Icon: Compass },
  ];

  return (
    <SafeAreaView style={styles.safe}>
      <StatusBar barStyle="light-content" backgroundColor="#1A0533" />

      {/* ══ HEADER ══════════════════════════════ */}
      <View style={styles.header}>
        <Text style={styles.brand}>
          <Text style={styles.brandHotel}>Hotel</Text>
          <Text style={styles.brandHub}>Hub</Text>
        </Text>
        <View style={styles.headerRight}>
          <TouchableOpacity style={styles.hBtn}>
            <Heart size={19} color="#fff" strokeWidth={1.8} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.hBtn}>
            <User size={19} color="#fff" strokeWidth={1.8} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.menuSquare}>
            <Menu size={16} color="#fff" strokeWidth={2.2} />
          </TouchableOpacity>
        </View>
      </View>

      {/* ══ TAB BAR ═════════════════════════════ */}
      <View style={styles.tabBarOuter}>
        <View style={styles.tabBar}>
          {TABS.map(({ id, Icon }) => {
            const active = activeTab === id;
            return (
              <TouchableOpacity
                key={id}
                style={[styles.tabItem, active && styles.tabItemActive]}
                onPress={() => setActiveTab(id)}
                activeOpacity={0.8}
              >
                <Icon
                  size={12}
                  color={active ? '#fff' : 'rgba(255,255,255,0.5)'}
                  strokeWidth={active ? 2.2 : 1.8}
                />
                <Text style={[styles.tabTxt, active && styles.tabTxtActive]}>
                  {'  '}{id}
                </Text>
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
        keyboardShouldPersistTaps="handled"
      >
        {/* ── Search form ── */}
        <View style={styles.formCard}>
          {/* MODEY SEARCH label */}
          <Text style={styles.modeyLabel}>MODEY SEARCH</Text>

          {/* Row 1: Destination  |  Guests & Rooms */}
          <View style={styles.formRow}>
            <View style={[styles.fieldWrap, { flex: 1.1, marginRight: 8 }]}>
              <Text style={styles.fieldLbl}>Destination</Text>
              <View style={styles.fieldBox}>
                <MapPin size={12} color="#6B7280" strokeWidth={2} />
                <TextInput
                  style={styles.fieldInp}
                  placeholder="Where do you want..."
                  placeholderTextColor="#9CA3AF"
                  value={destination}
                  onChangeText={setDestination}
                />
              </View>
            </View>
            <View style={[styles.fieldWrap, { flex: 1 }]}>
              <Text style={styles.fieldLbl}>Guests & Rooms</Text>
              <View style={styles.fieldBox}>
                <BedDouble size={12} color="#6B7280" strokeWidth={2} />
                <TextInput
                  style={styles.fieldInp}
                  placeholder="1 room, 1"
                  placeholderTextColor="#9CA3AF"
                  value={guests}
                  onChangeText={setGuests}
                />
              </View>
            </View>
          </View>

          {/* Row 2: Check-in/out  |  SEARCH NOW */}
          <View style={styles.formRow}>
            <View style={[styles.fieldWrap, { flex: 1, marginRight: 8 }]}>
              <Text style={styles.fieldLbl}>Check-in & Check-out</Text>
              <View style={styles.fieldBox}>
                <Calendar size={12} color="#6B7280" strokeWidth={2} />
                <TextInput
                  style={styles.fieldInp}
                  placeholder="Add dates"
                  placeholderTextColor="#9CA3AF"
                  value={dates}
                  onChangeText={setDates}
                />
              </View>
            </View>
            <TouchableOpacity style={styles.searchNowBtn} activeOpacity={0.85}>
              <Text style={styles.searchNowTxt}>SEARCH NOW</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* ── Hotel cards ── */}
        <View style={styles.listWrap}>
          {HOTELS.map(h => (
            <HotelCard key={h.id} hotel={h} />
          ))}
        </View>

        <View style={{ height: 30 }} />
      </ScrollView>

      {/* ── Floating purple circle (bottom-right, from Figma) ── */}
      <View style={styles.fab}>
        <ChevronRight size={18} color="#fff" strokeWidth={2.5} />
      </View>
    </SafeAreaView>
  );
};

// ─────────────────────────────────────────────────────────────
//  STYLES  — White / light theme
// ─────────────────────────────────────────────────────────────
const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: '#1A0533', // header bg bleeds into status bar
  },

  // ── HEADER ─────────────────────────────────
  header: {
    backgroundColor: '#1A0533',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingTop:40,
    paddingBottom: 12,
  },
  brand: { fontSize: 20, fontWeight: '800' },
  brandHotel: { color: '#FFFFFF' },
  brandHub: { color: '#A855F7' },
  headerRight: { flexDirection: 'row', alignItems: 'center', gap: 6 },
  hBtn: { width: 32, height: 32, justifyContent: 'center', alignItems: 'center' },
  menuSquare: {
    width: 30,
    height: 30,
    backgroundColor: '#7C3AED',
    borderRadius: 7,
    justifyContent: 'center',
    alignItems: 'center',
  },

  // ── TAB BAR ────────────────────────────────
  tabBarOuter: {
    backgroundColor: '#1A0533',
    paddingHorizontal: 14,
    paddingBottom: 10,
  },
  tabBar: {
    flexDirection: 'row',
    backgroundColor: 'rgba(255,255,255,0.09)',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.15)',
    padding: 3,
    gap: 2,
  },
  tabItem: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 7,
    borderRadius: 6,
  },
  tabItemActive: { backgroundColor: '#6D28D9' },
  tabTxt: { fontSize: 11.5, color: 'rgba(255,255,255,0.5)', fontWeight: '500' },
  tabTxtActive: { color: '#fff', fontWeight: '700' },

  // ── BODY ───────────────────────────────────
  body: { flex: 1, backgroundColor: '#F3F4F6' },
  bodyContent: { paddingTop: 12, paddingBottom: 0 },

  // ── FORM CARD ──────────────────────────────
  formCard: {
    backgroundColor: '#FFFFFF',
    marginHorizontal: 12,
    marginBottom: 12,
    borderRadius: 14,
    paddingHorizontal: 13,
    paddingTop: 12,
    paddingBottom: 13,
    // subtle shadow
    shadowColor: '#000',
    shadowOpacity: 0.07,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 2 },
    elevation: 3,
  },
  modeyLabel: {
    fontSize: 9,
    color: '#7C3AED',
    fontWeight: '700',
    letterSpacing: 2,
    marginBottom: 10,
  },
  formRow: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    marginBottom: 8,
  },
  fieldWrap: {},
  fieldLbl: {
    fontSize: 10,
    color: '#374151',
    fontWeight: '600',
    marginBottom: 4,
    letterSpacing: 0.1,
  },
  fieldBox: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F9FAFB',
    borderWidth: 1,
    borderColor: '#E5E7EB',
    borderRadius: 8,
    paddingHorizontal: 9,
    paddingVertical: 8,
    gap: 6,
  },
  fieldInp: {
    flex: 1,
    fontSize: 11.5,
    color: '#111827',
    padding: 0,
    margin: 0,
  },
  searchNowBtn: {
    backgroundColor: '#7C3AED',
    borderRadius: 8,
    paddingHorizontal: 11,
    paddingVertical: 9,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'flex-end',
  },
  searchNowTxt: {
    fontSize: 9.5,
    color: '#fff',
    fontWeight: '700',
    letterSpacing: 0.8,
  },

  // ── CARDS LIST ─────────────────────────────
  listWrap: {
    paddingHorizontal: 12,
    gap: 10,
  },

  // ── CARD ───────────────────────────────────
  card: {
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    overflow: 'hidden',
    height: 140,
    shadowColor: '#000',
    shadowOpacity: 0.06,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 2 },
    elevation: 2,
  },

  // Photo (left)
  cardPhoto: {
    width: 115,
    position: 'relative',
    overflow: 'hidden',
  },
  silhouetteWrap: {
    position: 'absolute',
    bottom: '38%',
    left: 8,
    flexDirection: 'row',
    alignItems: 'flex-end',
    gap: 3,
  },
  silBlock: {
    backgroundColor: 'rgba(0,0,0,0.28)',
    borderTopLeftRadius: 2,
    borderTopRightRadius: 2,
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
    fontSize: 7,
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

  // Info (right)
  cardInfo: {
    flex: 1,
    paddingHorizontal: 11,
    paddingVertical: 10,
    justifyContent: 'space-between',
  },
  nameRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  cardName: {
    fontSize: 12.5,
    fontWeight: '700',
    color: '#111827',
    flex: 1,
    marginRight: 6,
    lineHeight: 17,
  },
  priceWrap: {
    flexDirection: 'row',
    alignItems: 'baseline',
  },
  priceVal: {
    fontSize: 13.5,
    fontWeight: '800',
    color: '#7C3AED',
  },
  priceNight: {
    fontSize: 9,
    color: '#9CA3AF',
    marginLeft: 1,
  },
  locationRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 1,
  },
  locationTxt: {
    fontSize: 10.5,
    color: '#6B7280',
    fontWeight: '400',
  },
  starsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 2,
  },
  ratingTxt: {
    fontSize: 10,
    color: '#F59E0B',
    fontWeight: '700',
  },
  reviewsTxt: {
    fontSize: 9.5,
    color: '#9CA3AF',
  },
  tagsRow: {
    flexDirection: 'row',
    gap: 4,
    marginTop: 3,
  },
  tag: {
    backgroundColor: '#F3E8FF',
    borderRadius: 4,
    paddingHorizontal: 5,
    paddingVertical: 2,
  },
  tagTxt: {
    fontSize: 7.5,
    color: '#7C3AED',
    fontWeight: '600',
    letterSpacing: 0.2,
  },
  bookBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#7C3AED',
    borderRadius: 7,
    paddingVertical: 5,
    marginTop: 3,
  },
  bookTxt: {
    fontSize: 10.5,
    color: '#fff',
    fontWeight: '700',
    letterSpacing: 0.3,
    marginRight: 2,
  },

  // ── FAB (bottom-right purple circle from Figma) ──
  fab: {
    position: 'absolute',
    bottom: 20,
    right: 16,
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: '#7C3AED',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#7C3AED',
    shadowOpacity: 0.45,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 4 },
    elevation: 8,
  },
});

export default SearchScreen;