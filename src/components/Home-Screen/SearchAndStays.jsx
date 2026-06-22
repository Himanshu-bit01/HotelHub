import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Image,
  Dimensions,
  ActivityIndicator,
} from 'react-native';
import {
  MapPin,
  Star,
  ArrowRight,
  Search,
  CalendarDays,
  Users,
} from 'lucide-react-native';
import { useSelector } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import { useHomeContext } from '../../redux/context/HomeContext';
import {
  selectRecentStays,
  selectHotelsLoading,
  selectHotelsError,
} from '../../redux/store/slices/HotelSlice';

const { width } = Dimensions.get('window');

const SearchAndStays = () => {
  const navigation = useNavigation();
  const {
    destination,
    setDestination,
    checkInOut,
    setCheckInOut,
    guests,
    rooms,
  } = useHomeContext();

  const recentStays = useSelector(selectRecentStays);
  const loading = useSelector(selectHotelsLoading);
  const error = useSelector(selectHotelsError);

  return (
    <>
      {/* ══════════════ SEARCH CARD ══════════════ */}
      <View style={styles.searchCard}>
        <View style={styles.searchCardHeader}>
          <Text style={styles.searchCardTitle}>Find your next stay </Text>
          <Text style={styles.searchCardStar}>✦</Text>
        </View>

        {/* Destination */}
        <Text style={styles.fieldLabel}>Destination</Text>
        <View style={styles.inputBox}>
          <Search size={15} color="#AAA" strokeWidth={2} style={styles.inputIcon} />
          <TextInput
            style={styles.inputText}
            placeholder="Search Destination"
            placeholderTextColor="#AAA"
            value={destination}
            onChangeText={setDestination}
          />
        </View>

        {/* Check-in & Check-out */}
        <Text style={styles.fieldLabel}>Check-in & Check-out</Text>
        <View style={styles.inputBox}>
          <CalendarDays size={15} color="#AAA" strokeWidth={2} style={styles.inputIcon} />
          <TextInput
            style={styles.inputText}
            placeholder="Select check-in & check-out dates"
            placeholderTextColor="#AAA"
            value={checkInOut}
            onChangeText={setCheckInOut}
          />
        </View>

        {/* Guests & Rooms */}
        <Text style={styles.fieldLabel}>Guests & Rooms</Text>
        <View style={styles.inputBox}>
          <Users size={15} color="#AAA" strokeWidth={2} style={styles.inputIcon} />
          <View>
            <Text style={styles.guestMain}>{guests} Guest(s)</Text>
            <Text style={styles.guestSub}>{rooms} Room(s)</Text>
          </View>
        </View>

        {/* Search Button */}
        <TouchableOpacity style={styles.searchBtn} activeOpacity={0.85} onPress={() => navigation.navigate('Search')}>
          <Text style={styles.searchBtnText}>Search Hotels</Text>
        </TouchableOpacity>
      </View>

      {/* ══════════════ RECENT SEARCHES ══════════════ */}
      <View style={styles.recentSection}>
        <View style={styles.recentHeader}>
          <View style={styles.recentTitleRow}>
            <Text style={styles.recentDot}>✦</Text>
            <Text style={styles.recentLabel}> RECENT SEARCHES</Text>
          </View>
          <TouchableOpacity style={styles.seeAllRow} onPress={() => navigation.navigate('Search')}>
            <Text style={styles.seeAll}>See all stays</Text>
            <ArrowRight size={13} color="#7C3AED" strokeWidth={2.5} />
          </TouchableOpacity>
        </View>

        <Text style={styles.recentTitle}>Pick up where you left off</Text>
        <Text style={styles.recentSub}>
          Swipe through the stays travelers are checking back on right now.
        </Text>

        {/* Loading state */}
        {loading && (
          <View style={styles.stateBox}>
            <ActivityIndicator size="small" color="#7C3AED" />
          </View>
        )}

        {/* Error state */}
        {!loading && error && (
          <View style={styles.stateBox}>
            <Text style={styles.errorText}>{error}</Text>
          </View>
        )}

        {/* Horizontal Hotel Cards */}
        {!loading && !error && (
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.cardsRow}>
            {recentStays.map((stay) => (
              <TouchableOpacity key={stay.id} style={styles.stayCard} activeOpacity={0.85} onPress={() => navigation.navigate('Bookings')}>
                {/* Card image */}
                <Image
                  source={stay.image}
                  style={styles.cardImage}
                  resizeMode="cover"
                />
                {/* Gradient overlay on image */}
                <View style={styles.cardImageOverlay} />

                {/* Card body */}
                <View style={styles.cardBody}>
                  <Text style={styles.cardName}>{stay.name}</Text>

                  <View style={styles.cardLocationRow}>
                    <MapPin size={11} color="rgba(255,255,255,0.7)" strokeWidth={2} />
                    <Text style={styles.cardLocation}> {stay.location}</Text>
                  </View>

                  <View style={styles.cardRatingRow}>
                    <Star size={11} color="#FACC15" fill="#FACC15" strokeWidth={0} />
                    <Text style={styles.cardRating}> {stay.rating}</Text>
                    <Text style={styles.cardReviews}> ({stay.reviews})</Text>
                  </View>

                  <View style={styles.cardPriceRow}>
                    <Text style={styles.cardCurrency}>₹</Text>
                    <Text style={styles.cardPrice}>{stay.price}</Text>
                    <Text style={styles.cardNight}>/night</Text>
                  </View>
                </View>
              </TouchableOpacity>
            ))}
          </ScrollView>
        )}
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  // ── Search Card ──
  searchCard: {
    backgroundColor: '#FFFFFF',
    marginHorizontal: 16,
    marginTop: -40,
    borderRadius: 20,
    padding: 20 ,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.15,
    shadowRadius: 20,
    elevation: 12,
    zIndex: 20,
  },
  searchCardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 14,
  },
  searchCardTitle: {
    fontSize: 15,
    fontWeight: '700',
    color: '#1A0533',
  },
  searchCardStar: { fontSize: 14, color: '#7C3AED' },
  fieldLabel: {
    fontSize: 13,
    fontWeight: '600',
    color: '#333',
    marginBottom: 6,
    marginTop: 10,
  },
  inputBox: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#E5E5E5',
    borderRadius: 10,
    paddingHorizontal: 14,
    paddingVertical: 12,
    backgroundColor: '#FAFAFA',
    gap: 8,
  },
  inputIcon: {
    marginRight: 2,
  },
  inputText: {
    flex: 1,
    fontSize: 14,
    color: '#333',
    padding: 0,
  },
  guestMain: {
    fontSize: 14,
    color: '#333',
    fontWeight: '500',
  },
  guestSub: {
    fontSize: 12,
    color: '#888',
    marginTop: 2,
  },
  searchBtn: {
    backgroundColor: '#7C3AED',
    borderRadius: 12,
    paddingVertical: 16,
    alignItems: 'center',
    marginTop: 18,
    shadowColor: '#7C3AED',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.45,
    shadowRadius: 12,
    elevation: 8,
  },
  searchBtnText: {
    fontSize: 16,
    fontWeight: '700',
    color: '#FFFFFF',
    letterSpacing: 0.5,
  },

  // ── Recent Searches ──
  recentSection: {
    paddingTop: 28,
    paddingHorizontal: 20,
  },
  recentHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  recentTitleRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  recentDot: { fontSize: 10, color: '#7C3AED' },
  recentLabel: {
    fontSize: 11,
    fontWeight: '700',
    color: '#7C3AED',
    letterSpacing: 2,
  },
  seeAllRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 2,
  },
  seeAll: {
    fontSize: 12,
    color: '#7C3AED',
    fontWeight: '600',
  },
  recentTitle: {
    fontSize: 20,
    fontWeight: '800',
    color: '#1A0533',
    marginBottom: 4,
  },
  recentSub: {
    fontSize: 13,
    color: '#888',
    marginBottom: 16,
    lineHeight: 18,
  },
  cardsRow: {
    paddingRight: 4,
    gap: 14,
  },
  stateBox: {
    paddingVertical: 24,
    alignItems: 'center',
    justifyContent: 'center',
  },
  errorText: {
    fontSize: 13,
    color: '#D14343',
    textAlign: 'center',
  },

  // ── Stay Cards ──
  stayCard: {
    width: width * 0.44,
    borderRadius: 12,
    overflow: 'hidden',
    backgroundColor: '#1A0533',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.18,
    shadowRadius: 8,
    elevation: 5,
  },
  cardImage: {
    width: '100%',
    height: 120,
  },
  cardImageOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: 120,
    backgroundColor: 'rgba(26,5,51,0.25)',
  },
  cardBody: {
    padding: 10,
    backgroundColor: '#fbfafd',
  },
  cardName: {
    fontSize: 13,
    fontWeight: '700',
    color: '#0c0c0c',
    lineHeight: 18,
    marginBottom: 2,
  },
  cardLocationRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 6,
  },
  cardLocation: {
    fontSize: 11,
    color: 'rgba(34, 33, 33, 0.7)',
  },
  cardRatingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  cardRating: { fontSize: 12, fontWeight: '700', color: '#1d1c1c' },
  cardReviews: { fontSize: 11, color: 'rgba(24, 23, 23, 0.55)' },
  cardPriceRow: {
    flexDirection: 'row',
    alignItems: 'baseline',
    gap: 1,
  },
  cardCurrency: { fontSize: 12, color: '#1a1919', fontWeight: '700' },
  cardPrice: { fontSize: 18, fontWeight: '800', color: '#0a0a0a' },
  cardNight: { fontSize: 11, color: 'rgba(22, 21, 21, 0.55)', marginLeft: 2 },
});

export default SearchAndStays;