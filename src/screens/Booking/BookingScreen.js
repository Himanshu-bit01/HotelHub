import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  Platform,
} from 'react-native';
import Svg, {
  Path,
  Polygon,
  Circle,
  Line,
} from 'react-native-svg';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

// Extra space to clear the bottom tab bar.
const TAB_BAR_CLEARANCE = 90;

// ─── SVG Icon Components ───────────────────────────────────────────────────────

const StarIcon = ({ color = '#F5A623', size = 12 }) => (
  <Svg width={size} height={size} viewBox="0 0 12 12">
    <Polygon points="6,1 7.5,4.5 11,4.8 8.5,7 9.3,10.5 6,8.7 2.7,10.5 3.5,7 1,4.8 4.5,4.5" fill={color} />
  </Svg>
);

const HeartIcon = () => (
  <Svg width={22} height={22} viewBox="0 0 24 24" fill="none">
    <Path
      d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"
      stroke="#333"
      strokeWidth={2}
    />
  </Svg>
);

const ShareIcon = () => (
  <Svg width={22} height={22} viewBox="0 0 24 24" fill="none">
    <Circle cx={18} cy={5} r={3} stroke="#333" strokeWidth={2} />
    <Circle cx={6} cy={12} r={3} stroke="#333" strokeWidth={2} />
    <Circle cx={18} cy={19} r={3} stroke="#333" strokeWidth={2} />
    <Line x1="8.59" y1="13.51" x2="15.42" y2="17.49" stroke="#333" strokeWidth={2} />
    <Line x1="15.41" y1="6.51" x2="8.59" y2="10.49" stroke="#333" strokeWidth={2} />
  </Svg>
);

const LocationIcon = () => (
  <Svg width={12} height={12} viewBox="0 0 24 24">
    <Path
      d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"
      fill="#7B7B7B"
    />
  </Svg>
);

const PeopleIcon = ({ size = 14 }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24">
    <Path
      d="M16 11c1.66 0 2.99-1.34 2.99-3S17.66 5 16 5c-1.66 0-3 1.34-3 3s1.34 3 3 3zm-8 0c1.66 0 2.99-1.34 2.99-3S9.66 5 8 5C6.34 5 5 6.34 5 8s1.34 3 3 3zm0 2c-2.33 0-7 1.17-7 3.5V19h14v-2.5c0-2.33-4.67-3.5-7-3.5zm8 0c-.29 0-.62.02-.97.05 1.16.84 1.97 1.97 1.97 3.45V19h6v-2.5c0-2.33-4.67-3.5-7-3.5z"
      fill="#555"
    />
  </Svg>
);

const BedIcon = () => (
  <Svg width={14} height={14} viewBox="0 0 24 24">
    <Path
      d="M7 13c1.66 0 3-1.34 3-3S8.66 7 7 7s-3 1.34-3 3 1.34 3 3 3zm12-6h-8v7H3V5H1v15h2v-3h18v3h2v-9c0-2.21-1.79-4-4-4z"
      fill="#555"
    />
  </Svg>
);

const BathIcon = () => (
  <Svg width={14} height={14} viewBox="0 0 24 24">
    <Path
      d="M21 10H7V6c0-1.1.9-2 2-2s2 .9 2 2h2c0-2.21-1.79-4-4-4S5 3.79 5 6v4H3c-.55 0-1 .45-1 1v2c0 2.4 1.68 4.42 4 4.9V20H4v2h16v-2h-2v-2.1c2.32-.48 4-2.5 4-4.9v-2c0-.55-.45-1-1-1z"
      fill="#555"
    />
  </Svg>
);

const WifiIcon = ({ size = 28 }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24">
    <Path
      d="M1 9l2 2c4.97-4.97 13.03-4.97 18 0l2-2C16.93 2.93 7.08 2.93 1 9zm8 8l3 3 3-3c-1.65-1.66-4.34-1.66-6 0zm-4-4l2 2c2.76-2.76 7.24-2.76 10 0l2-2C15.14 9.14 8.87 9.14 5 13z"
      fill="#7C3AED"
    />
  </Svg>
);

const PoolIcon = ({ size = 28 }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24">
    <Path
      d="M22 21c-1.11 0-1.73-.37-2.18-.64-.37-.22-.6-.36-1.15-.36-.56 0-.78.13-1.15.36-.46.27-1.07.64-2.18.64s-1.73-.37-2.18-.64c-.37-.22-.6-.36-1.15-.36-.56 0-.78.13-1.15.36-.46.27-1.07.64-2.18.64s-1.73-.37-2.18-.64C6.43 20.13 6.2 20 5.64 20c-.55 0-.78.13-1.15.36C4.04 20.63 3.42 21 2.32 21H2v2h.36c1.11 0 1.73-.37 2.18-.64.37-.22.6-.36 1.15-.36.56 0 .78.13 1.15.36.46.27 1.07.64 2.18.64s1.73-.37 2.18-.64c.37-.22.6-.36 1.15-.36.56 0 .78.13 1.15.36.45.27 1.07.64 2.18.64s1.73-.37 2.18-.64c.37-.22.6-.36 1.15-.36.55 0 .78.13 1.14.36.46.27 1.08.64 2.19.64h.38v-2H22zM7 11.35C7.66 11.76 8.37 12 9.09 12c1.11 0 1.73-.37 2.18-.64.37-.22.6-.36 1.15-.36.56 0 .79.13 1.15.36.46.27 1.08.64 2.19.64.71 0 1.43-.24 2.09-.65L15.17 8H9l-2 3.35zM14 7c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2z"
      fill="#7C3AED"
    />
  </Svg>
);

const ParkingIcon = ({ size = 28 }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24">
    <Path
      d="M13 3H6v18h4v-6h3c3.31 0 6-2.69 6-6s-2.69-6-6-6zm.2 8H10V7h3.2c1.1 0 2 .9 2 2s-.9 2-2 2z"
      fill="#7C3AED"
    />
  </Svg>
);

const RestaurantIcon = ({ size = 28 }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24">
    <Path
      d="M11 9H9V2H7v7H5V2H3v7c0 2.12 1.66 3.84 3.75 3.97V22h2.5v-9.03C11.34 12.84 13 11.12 13 9V2h-2v7zm5-3v8h2.5v8H21V2c-2.76 0-5 2.24-5 4z"
      fill="#7C3AED"
    />
  </Svg>
);

const SupportIcon = ({ size = 28 }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24">
    <Path
      d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 17h-2v-2h2v2zm2.07-7.75l-.9.92C13.45 12.9 13 13.5 13 15h-2v-.5c0-1.1.45-2.1 1.17-2.83l1.24-1.26c.37-.36.59-.86.59-1.41 0-1.1-.9-2-2-2s-2 .9-2 2H8c0-2.21 1.79-4 4-4s4 1.79 4 4c0 .88-.36 1.68-.93 2.25z"
      fill="#7C3AED"
    />
  </Svg>
);

const PetIcon = ({ size = 28 }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24">
    <Path
      d="M4.5 11c1.38 0 2.5-1.34 2.5-3S5.88 5 4.5 5 2 6.34 2 8s1.12 3 2.5 3zm15 0c1.38 0 2.5-1.34 2.5-3S20.88 5 19.5 5 17 6.34 17 8s1.12 3 2.5 3zM9.5 6C10.88 6 12 4.88 12 3.5S10.88 1 9.5 1 7 2.12 7 3.5 8.12 6 9.5 6zm5 0C15.88 6 17 4.88 17 3.5S15.88 1 14.5 1 12 2.12 12 3.5 13.12 6 14.5 6zM12 9c-2.33 0-7 1.17-7 3.5V15h14v-2.5C19 10.17 14.33 9 12 9z"
      fill="#7C3AED"
    />
  </Svg>
);

const FamilyIcon = ({ size = 28 }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24">
    <Path
      d="M16 11c1.66 0 2.99-1.34 2.99-3S17.66 5 16 5c-1.66 0-3 1.34-3 3s1.34 3 3 3zm-8 0c1.66 0 2.99-1.34 2.99-3S9.66 5 8 5C6.34 5 5 6.34 5 8s1.34 3 3 3zm0 2c-2.33 0-7 1.17-7 3.5V19h14v-2.5c0-2.33-4.67-3.5-7-3.5zm8 0c-.29 0-.62.02-.97.05 1.16.84 1.97 1.97 1.97 3.45V19h6v-2.5c0-2.33-4.67-3.5-7-3.5z"
      fill="#7C3AED"
    />
  </Svg>
);

// ─── Data ──────────────────────────────────────────────────────────────────────

const reviews = [
  {
    name: 'Sarah Johnson',
    date: '12 May 2024',
    stars: 5,
    text: 'Amazing stay! The rooms were clean, staff was friendly and the view was just outstanding.',
  },
  {
    name: 'Michael Chen',
    date: '08 May 2024',
    stars: 5,
    text: 'Excellent customer service. Helped me change my booking last minute.',
  },
  {
    name: 'Emma Williams',
    date: '01 May 2024',
    stars: 4,
    text: 'Love the reward program. Saved so much on my family vacations!',
  },
];

const featurePills = [
  { Icon: PetIcon, label: 'Pet Friendly' },
  { Icon: FamilyIcon, label: 'Family Friendly' },
  { Icon: WifiIcon, label: 'Free Wifi' },
  { Icon: PoolIcon, label: 'Swimming Pool' },
];

const amenities = [
  { Icon: WifiIcon, label: 'Free Wifi' },
  { Icon: PoolIcon, label: 'Swimming Pool' },
  { Icon: RestaurantIcon, label: 'Restaurant' },
  { Icon: ParkingIcon, label: 'Free Parking' },
  { Icon: SupportIcon, label: '24/7 Front Desk' },
];

const rooms = [
  { name: 'Deluxe Room', guests: '2 Adults', price: '₹4,500', color: '#C4956A' },
  { name: 'Suite Room', guests: '3 Adults', price: '₹6,500', color: '#6090B0' },
];

// ─── Main Screen ───────────────────────────────────────────────────────────────

const BookingScreen = () => {
  const [expanded, setExpanded] = useState(false);
  const insets = useSafeAreaInsets();

  const aboutText =
    'Grand Palace Hotel is a polished 4-star hotel crafted for relaxed holidays, intimate celebrations, and comfortable longer stays.';

  return (
    
    <View style={styles.container}>
      {/* ── HEADER ── */}
      <View style={styles.header}>
        <View style={styles.logoRow}>
          <Text style={styles.logoBlack}>Hotel</Text>
          <Text style={styles.logoPurple}>Hub</Text>
        </View>
        <View style={styles.headerIcons}>
          <TouchableOpacity style={styles.iconBtn}>
            <HeartIcon />
          </TouchableOpacity>
          <TouchableOpacity style={styles.iconBtn}>
            <ShareIcon />
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView 
       showsVerticalScrollIndicator={false}
        style={styles.scroll}
        contentContainerStyle={{
          paddingBottom: insets.bottom + TAB_BAR_CLEARANCE,
        }}
      >
      
        {/* ── IMAGE GRID ── */}
        <View style={styles.imageGrid}>
          {/* Large left image */}
          <View style={[styles.imageMain, { backgroundColor: '#8B7355' }]}>
            <View style={styles.interiorBadge}>
              <Text style={styles.interiorBadgeText}>Interior</Text>
            </View>
          </View>
          {/* Right column */}
          <View style={styles.imageRight}>
            <View style={[styles.imageSmall, { backgroundColor: '#C4956A' }]} />
            <View style={[styles.imageSmall, { backgroundColor: '#6090B0' }]} />
          </View>
        </View>

        {/* ── HOTEL INFO ── */}
        <View style={styles.section}>
          {/* Name + Rating row */}
          <View style={styles.rowBetween}>
            <Text style={styles.hotelName}>Grand Palace Hotel</Text>
            <View style={styles.ratingRow}>
              <StarIcon />
              <Text style={styles.ratingScore}> 4.8</Text>
              <Text style={styles.ratingCount}> 314 (reviews) ›</Text>
            </View>
          </View>

          {/* Location */}
          <View style={styles.locationRow}>
            <LocationIcon />
            <Text style={styles.locationText}>  New Delhi</Text>
          </View>

          {/* Guests / Beds / Baths */}
          <View style={styles.metaRow}>
            <PeopleIcon />
            <Text style={styles.metaText}> 4 Guests</Text>
            <Text style={styles.metaDot}> · </Text>
            <BedIcon />
            <Text style={styles.metaText}> 1 Bedroom</Text>
            <Text style={styles.metaDot}> · </Text>
            <BathIcon />
            <Text style={styles.metaText}> 1 Bathroom</Text>
          </View>

          {/* Price + CTA */}
          <View style={styles.priceRow}>
            <View>
              <Text style={styles.startingFrom}>Starting from</Text>
              <View style={styles.priceAmountRow}>
                <Text style={styles.price}>₹8,500</Text>
                <Text style={styles.priceNight}>/Night</Text>
              </View>
              <Text style={styles.taxNote}>Taxes &amp; Fees Incl.</Text>
            </View>
            <TouchableOpacity style={styles.bookBtn}>
              <Text style={styles.bookBtnText}>View &amp; Book Now  →</Text>
            </TouchableOpacity>
          </View>

          {/* Feature Pills */}
          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.pillsScroll}>
            {featurePills.map((f) => (
              <View key={f.label} style={styles.pill}>
                <f.Icon size={28} />
                <Text style={styles.pillLabel}>{f.label}</Text>
              </View>
            ))}
          </ScrollView>
        </View>

        {/* ── ABOUT ── */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>About Hotel</Text>
          <Text style={styles.aboutText} numberOfLines={expanded ? undefined : 3}>
            {aboutText}
          </Text>
          <TouchableOpacity onPress={() => setExpanded(!expanded)}>
            <Text style={styles.readMore}>{expanded ? 'Read Less ←' : 'Read More →'}</Text>
          </TouchableOpacity>
        </View>

        {/* ── ROOM CATEGORIES ── */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Room Categories</Text>
          {rooms.map((room) => (
            <View key={room.name} style={styles.roomCard}>
              <View style={[styles.roomThumb, { backgroundColor: room.color }]} />
              <View style={styles.roomInfo}>
                <Text style={styles.roomName}>{room.name}</Text>
                <View style={styles.roomGuestRow}>
                  <PeopleIcon size={12} />
                  <Text style={styles.roomGuests}> {room.guests}</Text>
                </View>
                <Text style={styles.roomPrice}>{room.price}</Text>
              </View>
              <TouchableOpacity style={styles.selectBtn}>
                <Text style={styles.selectBtnText}>Select Room</Text>
              </TouchableOpacity>
            </View>
          ))}
        </View>

        {/* ── AMENITIES ── */}
        <View style={styles.section}>
          <View style={styles.rowBetween}>
            <Text style={styles.sectionTitle}>Amenities</Text>
            <TouchableOpacity>
              <Text style={styles.seeAll}>See All</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.amenitiesRow}>
            {amenities.map((a) => (
              <View key={a.label} style={styles.amenityItem}>
                <View style={styles.amenityIconBox}>
                  <a.Icon size={26} />
                </View>
                <Text style={styles.amenityLabel}>{a.label}</Text>
              </View>
            ))}
          </View>
        </View>

        {/* ── GUEST REVIEWS ── */}
        <View style={[styles.section, { marginBottom: 20 }]}>
          <View style={styles.rowBetween}>
            <Text style={styles.sectionTitle}>Guest Reviews</Text>
            <TouchableOpacity>
              <Text style={styles.seeAll}>See All</Text>
            </TouchableOpacity>
          </View>
          {reviews.map((r, idx) => (
            <View
              key={r.name}
              style={[styles.reviewCard, idx < reviews.length - 1 && styles.reviewBorder]}
            >
              <View style={styles.rowBetween}>
                <View>
                  <Text style={styles.reviewName}>{r.name}</Text>
                  <Text style={styles.reviewDate}>{r.date}</Text>
                </View>
                <View style={styles.starsRow}>
                  {Array.from({ length: 5 }).map((_, i) => (
                    <StarIcon key={i} color={i < r.stars ? '#F5A623' : '#E0E0E0'} />
                  ))}
                </View>
              </View>
              <Text style={styles.reviewText}>{r.text}</Text>
            </View>
          ))}
        </View>

      </ScrollView>
    </View>
  );
};

// ─── Styles ────────────────────────────────────────────────────────────────────

const PURPLE = '#7C3AED';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },

  // Header
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 18,
    paddingTop: Platform.OS === 'ios' ? 54 : 16,
    paddingTop:35,
    paddingBottom: 10,
    backgroundColor: '#fff',
    zIndex: 10,
    borderBottomWidth: 0,
  },
  logoRow: { flexDirection: 'row', alignItems: 'baseline' },
  logoBlack: { fontSize: 22, fontWeight: '800', color: '#111' },
  logoPurple: { fontSize: 22, fontWeight: '800', color: PURPLE },
  headerIcons: { flexDirection: 'row', gap: 14 },
  iconBtn: { padding: 4 },

  // Scroll
  scrollContent: { paddingBottom: 0 },

  // Image Grid
  imageGrid: {
    flexDirection: 'row',
    height: 200,
    gap: 2,
  },
  imageMain: {
    flex: 1.1,
    justifyContent: 'flex-end',
    padding: 8,
  },
  imageRight: {
    flex: 1,
    gap: 2,
  },
  imageSmall: {
    flex: 1,
  },
  interiorBadge: {
    backgroundColor: PURPLE,
    borderRadius: 4,
    paddingHorizontal: 8,
    paddingVertical: 3,
    alignSelf: 'flex-start',
  },
  interiorBadgeText: {
    color: '#fff',
    fontSize: 10,
    fontWeight: '700',
  },

  // Section wrapper
  section: {
    paddingHorizontal: 18,
    paddingTop: 16,
  },
  sectionTitle: {
    fontSize: 15,
    fontWeight: '800',
    color: '#111',
    marginBottom: 12,
  },

  // Hotel Info
  rowBetween: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  hotelName: {
    fontSize: 18,
    fontWeight: '800',
    color: '#111',
    flex: 1,
    flexWrap: 'wrap',
  },
  ratingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop: 2,
  },
  ratingScore: {
    fontSize: 13,
    fontWeight: '700',
    color: '#111',
  },
  ratingCount: {
    fontSize: 12,
    color: PURPLE,
  },
  locationRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 6,
  },
  locationText: {
    fontSize: 12,
    color: '#7B7B7B',
    marginLeft: 2,
  },
  metaRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
    flexWrap: 'wrap',
    gap: 2,
  },
  metaText: {
    fontSize: 12,
    color: '#555',
  },
  metaDot: {
    fontSize: 12,
    color: '#ccc',
    marginHorizontal: 2,
  },

  // Price Row
  priceRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 14,
  },
  startingFrom: {
    fontSize: 11,
    color: '#888',
  },
  priceAmountRow: {
    flexDirection: 'row',
    alignItems: 'baseline',
    marginTop: 2,
  },
  price: {
    fontSize: 22,
    fontWeight: '800',
    color: PURPLE,
  },
  priceNight: {
    fontSize: 12,
    color: '#888',
    marginLeft: 2,
  },
  taxNote: {
    fontSize: 11,
    color: '#888',
    marginTop: 1,
  },
  bookBtn: {
    backgroundColor: PURPLE,
    borderRadius: 10,
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  bookBtnText: {
    color: '#fff',
    fontSize: 13,
    fontWeight: '700',
  },

  // Feature Pills
  pillsScroll: {
    marginTop: 16,
    marginHorizontal: -4,
  },
  pill: {
    alignItems: 'center',
    backgroundColor: '#F5F3FF',
    borderRadius: 14,
    paddingHorizontal: 14,
    paddingVertical: 10,
    marginHorizontal: 4,
    minWidth: 72,
    gap: 6,
  },
  pillLabel: {
    fontSize: 10,
    fontWeight: '600',
    color: '#555',
    textAlign: 'center',
    lineHeight: 13,
  },

  // About
  aboutText: {
    fontSize: 13,
    color: '#666',
    lineHeight: 20,
  },
  readMore: {
    color: PURPLE,
    fontSize: 12,
    fontWeight: '700',
    marginTop: 6,
  },

  // Room Card
  roomCard: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#EEE',
    borderRadius: 14,
    padding: 12,
    marginBottom: 12,
    gap: 12,
  },
  roomThumb: {
    width: 90,
    height: 72,
    borderRadius: 10,
  },
  roomInfo: {
    flex: 1,
    gap: 4,
  },
  roomName: {
    fontSize: 13,
    fontWeight: '700',
    color: '#111',
  },
  roomGuestRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 2,
  },
  roomGuests: {
    fontSize: 12,
    color: '#555',
  },
  roomPrice: {
    fontSize: 16,
    fontWeight: '800',
    color: '#111',
    marginTop: 4,
  },
  selectBtn: {
    backgroundColor: PURPLE,
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 8,
  },
  selectBtnText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: '700',
  },

  // Amenities
  amenitiesRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  amenityItem: {
    alignItems: 'center',
    gap: 6,
    flex: 1,
  },
  amenityIconBox: {
    width: 50,
    height: 50,
    borderRadius: 14,
    backgroundColor: '#F5F3FF',
    alignItems: 'center',
    justifyContent: 'center',
  },
  amenityLabel: {
    fontSize: 9,
    color: '#555',
    textAlign: 'center',
    lineHeight: 12,
  },

  // Reviews
  seeAll: {
    fontSize: 12,
    color: PURPLE,
    fontWeight: '600',
  },
  reviewCard: {
    paddingVertical: 14,
  },
  reviewBorder: {
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },
  reviewName: {
    fontSize: 13,
    fontWeight: '700',
    color: '#111',
  },
  reviewDate: {
    fontSize: 11,
    color: '#aaa',
    marginTop: 2,
  },
  starsRow: {
    flexDirection: 'row',
    gap: 2,
    alignItems: 'center',
  },
  reviewText: {
    fontSize: 12,
    color: '#666',
    lineHeight: 18,
    marginTop: 8,
  },
  scroll: {
    flex: 1,
  },
});

export default BookingScreen;