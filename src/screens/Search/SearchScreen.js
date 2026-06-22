import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  TextInput,
  StatusBar,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import {
  Heart,
  Search,
  MapPin,
  Users,
  Calendar,
  Star,
  SlidersHorizontal,
  Check,
} from 'lucide-react-native';
import { useHomeContext } from '../../redux/context/HomeContext';
import TopNavBar from '../../components/Home-Screen/Topnavbar';
import { BottomTabBar } from '../BottomTab/BottomTabNavigator';
import SearchTrendingStyles from '../../components/SearchTrending/SearchTrendingStyles';

// ─────────────────────────────────────────────────────────────
//  DATA
// ─────────────────────────────────────────────────────────────
export const HOTELS = [
  {
    id: 1,
    name: 'Manhattan Skyline Suites',
    location: 'Manhattan',
    rooms: '4 Bedrooms',
    rating: 5.0,
    reviews: 87,
    tags: ['City View', 'Pool', 'Free Wifi'],
    badge: '40%',
    badgeColor: '#7C3AED',
    price: '₹5,000',
    imgTop: '#5B8DB8',
    imgBottom: '#8BAFC8',
  },
  {
    id: 2,
    name: 'Grand Palace Hotel',
    location: 'Hotel',
    rooms: '3 Bedrooms',
    rating: 4.8,
    reviews: 0,
    tags: ['Free Wifi', 'Parking', 'Restaurant'],
    badge: '40%',
    badgeColor: '#7C3AED',
    price: '₹3,500',
    imgTop: '#3F3A36',
    imgBottom: '#2B2725',
  },
  {
    id: 3,
    name: 'Grand Palace Hotel',
    location: 'Cityscape',
    rooms: '2 Bedrooms',
    rating: 4.5,
    reviews: 0,
    tags: ['Free Wifi', 'Pool', 'Parking'],
    badge: '40%',
    badgeColor: '#7C3AED',
    price: '₹3,000',
    imgTop: '#C9C2B6',
    imgBottom: '#A9A296',
  },
  {
    id: 4,
    name: 'Grand Palace Hotel',
    location: 'Oceanfront',
    rooms: '2 Bedrooms',
    rating: 4.0,
    reviews: 0,
    tags: ['Free Wifi', 'Pool', 'Parking'],
    badge: '40%',
    badgeColor: '#7C3AED',
    price: '₹9,500',
    imgTop: '#36495A',
    imgBottom: '#26333F',
  },
  {
    id: 5,
    name: 'Eiffel Luxury Star',
    location: 'Central Paris',
    rooms: '2 Bedrooms',
    rating: 4.6,
    reviews: 0,
    tags: ['Free Wifi', 'Pool', 'Parking'],
    badge: '40%',
    badgeColor: '#7C3AED',
    price: '₹4,000',
    imgTop: '#3A3530',
    imgBottom: '#272320',
  },
  {
    id: 6,
    name: 'Fab Hotel',
    location: 'Hotel',
    rooms: '1 Bedroom',
    rating: 5.0,
    reviews: 0,
    tags: ['Free Wifi', 'Pool', 'Parking'],
    badge: '40%',
    badgeColor: '#7C3AED',
    price: '₹2,000',
    imgTop: '#3D4A52',
    imgBottom: '#2A343A',
  },
  {
    id: 7,
    name: 'Green Valley Stay',
    location: 'Aspen Ridge',
    rooms: '2 Bedrooms',
    rating: 4.1,
    reviews: 0,
    tags: ['Free Wifi', 'Pool', 'Parking'],
    badge: '40%',
    badgeColor: '#7C3AED',
    price: '₹3,000',
    imgTop: '#D7CDBE',
    imgBottom: '#B9AE9C',
  },
  {
    id: 8,
    name: 'Searq',
    location: 'In the Alps',
    rooms: '2 Bedrooms',
    rating: 4.0,
    reviews: 0,
    tags: ['Free Wifi', 'Pool', 'Parking'],
    badge: '40%',
    badgeColor: '#7C3AED',
    price: '₹2,500',
    imgTop: '#6E7E8C',
    imgBottom: '#4F5E6B',
  },
];

// ─────────────────────────────────────────────────────────────
//  HOTEL CARD
// ─────────────────────────────────────────────────────────────
export const HotelCard = ({ hotel, navigation }) => {
  const [liked, setLiked] = useState(false);

  return (
    <View style={styles.card}>
      {/* ── Photo panel (left) ── */}
      <View style={[styles.cardPhoto, { backgroundColor: hotel.imgTop }]}>
        <View
          style={[
            StyleSheet.absoluteFillObject,
            {
              top: '55%',
              backgroundColor: hotel.imgBottom,
            },
          ]}
        />

        {/* Discount badge */}
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
        <Text style={styles.cardName} numberOfLines={1}>
          {hotel.name}
        </Text>

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
          <TouchableOpacity
            style={styles.bookBtn}
            activeOpacity={0.85}
            onPress={() => navigation.navigate('Bottom', { screen: 'Bookings' })}
          >
            <Text style={styles.bookTxt}>View & Book</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

// ─────────────────────────────────────────────────────────────
//  SCREEN
// ─────────────────────────────────────────────────────────────
const SearchScreen = ({ navigation }) => {
  const { setSelectedTab } = useHomeContext();

  const [destination, setDestination] = useState('');
  const [dates, setDates] = useState('');

  // Sync the HeroSection tab highlight when this screen mounts
  useEffect(() => {
    setSelectedTab('Search');
  }, []);

  return (
    <SafeAreaView style={styles.safe} edges={['bottom']}>
      <StatusBar barStyle="light-content" backgroundColor="#1A0533" />

      <TopNavBar navigation={navigation} />

      {/* ══ SCROLL BODY ═════════════════════════ */}
      <ScrollView
        style={styles.body}
        contentContainerStyle={styles.bodyContent}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
      >
        {/* ── Search form ── */}
        <View style={styles.formCardWrap}>
          <View style={styles.formCard}>
            <Text style={styles.modifyLabel}>MODIFY SEARCH</Text>
            <View style={styles.divider} />

            {/* Row 1: Destination  |  Guests & Rooms */}
            <View style={styles.formRow}>
              <View style={[styles.fieldWrap, { flex: 1.15, marginRight: 8 }]}>
                <Text style={styles.fieldLbl}>Destination</Text>
                <View style={styles.fieldBox}>
                  <Search size={13} color="#7C3AED" strokeWidth={2.2} />
                  <TextInput
                    style={styles.fieldInp}
                    placeholder="Search destination (min 3 letters)"
                    placeholderTextColor="#9CA3AF"
                    value={destination}
                    onChangeText={setDestination}
                  />
                </View>
              </View>
              <View style={[styles.fieldWrap, { flex: 1 }]}>
                <Text style={styles.fieldLbl}>Guests & Rooms</Text>
                <View style={styles.fieldBox}>
                  <Users size={13} color="#7C3AED" strokeWidth={2.2} />
                  <View>
                    <Text style={styles.fieldMainTxt}>2 Guest(s)</Text>
                    <Text style={styles.fieldSubTxt}>1 Room(s)</Text>
                  </View>
                </View>
              </View>
            </View>

            {/* Row 2: Check-in/out (full width) */}
            <View style={styles.fieldWrap}>
              <Text style={styles.fieldLbl}>Check-in & Check-out</Text>
              <View style={styles.fieldBox}>
                <Calendar size={13} color="#7C3AED" strokeWidth={2.2} />
                <TextInput
                  style={styles.fieldInp}
                  placeholder="Check-in - Check-out dates"
                  placeholderTextColor="#9CA3AF"
                  value={dates}
                  onChangeText={setDates}
                />
              </View>
            </View>

            {/* Update Results button */}
            <TouchableOpacity
              style={styles.updateBtn}
              activeOpacity={0.85}
            >
              <Text style={styles.updateBtnTxt}>Update Results</Text>
            </TouchableOpacity>
          </View>

          {/* ── Floating purple circle (bottom-right, overlaps card) ── */}
          <View style={styles.fab}>
            <SlidersHorizontal size={18} color="#fff" strokeWidth={2.4} />
          </View>
        </View>

        {/* ── Hotel cards ── */}
        <View style={styles.listWrap}>
          {HOTELS.map(h => (
            <HotelCard key={h.id} hotel={h} navigation={navigation} />
          ))}
        </View>

        <View style={{ height: 100 }} />
      </ScrollView>

      <BottomTabBar activeTab="Home" navigation={navigation} />
    </SafeAreaView>
  );
};

const styles = SearchTrendingStyles;

export default SearchScreen;