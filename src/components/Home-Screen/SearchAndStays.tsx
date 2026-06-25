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
  Search,
  CalendarDays,
  Users,
  Heart,
} from 'lucide-react-native';
import { useSelector } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useHomeContext } from '../../redux/context/HomeContext';
import {
  selectRecentStays,
  selectHotelsLoading,
  selectHotelsError,
} from '../../redux/store/slices/HotelSlice';
import { RootStackParamList } from '../../types';

const { width } = Dimensions.get('window');

type SearchAndStaysProps = {
  navigation?: any;
};

const SearchAndStays = (_props?: SearchAndStaysProps) => {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
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
    <View style={styles.wrapper}>
      <View style={styles.searchCard}>
        <View style={styles.searchCardHeader}>
          <Text style={styles.searchCardTitle}>Find your next stay </Text>
          <Text style={styles.searchCardStar}>✦</Text>
        </View>

        <Text style={styles.fieldLabel}>Destination</Text>
        <View style={styles.inputBox}>
          <Search size={15} color="#AAA" strokeWidth={2} style={styles.inputIcon} />
          <TextInput
            style={styles.inputText}
            placeholder="Search Destination"
            placeholderTextColor="#BBBBBB"
            value={destination}
            onChangeText={setDestination}
          />
        </View>

        <Text style={styles.fieldLabel}>Check-in & Check-out</Text>
        <View style={styles.inputBox}>
          <CalendarDays size={15} color="#AAA" strokeWidth={2} style={styles.inputIcon} />
          <TextInput
            style={styles.inputText}
            placeholder="Select check-in & check-out dates"
            placeholderTextColor="#BBBBBB"
            value={checkInOut}
            onChangeText={setCheckInOut}
          />
        </View>

        <Text style={styles.fieldLabel}>Guests & Rooms</Text>
        <View style={styles.inputBox}>
          <Users size={15} color="#AAA" strokeWidth={2} style={styles.inputIcon} />
          <View>
            <Text style={styles.guestMain}>{guests} Guest(s)</Text>
            <Text style={styles.guestSub}>{rooms} Room(s)</Text>
          </View>
        </View>

        <TouchableOpacity
          style={styles.searchBtn}
          activeOpacity={0.85}
          onPress={() => navigation.navigate('Search')}
        >
          <Text style={styles.searchBtnText}>Search Hotels</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.recentSection}>
        <View style={styles.recentHeader}>
          <View style={styles.recentTitleRow}>
            <Text style={styles.recentDot}>✦</Text>
            <Text style={styles.recentLabel}> RECENT SEARCHES</Text>
          </View>
          <TouchableOpacity
            style={styles.seeAllRow}
            onPress={() => navigation.navigate('Search')}
          >
            <Text style={styles.seeAll}>See all stays</Text>
            <Text style={styles.seeAllArrow}> →</Text>
          </TouchableOpacity>
        </View>

        <Text style={styles.recentTitle}>Pick up where you left off</Text>
        <Text style={styles.recentSub}>
          Swipe through the stays travelers are checking back on right now.
        </Text>

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
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.cardsRow}
          >
            {recentStays.map((stay) => (
              <TouchableOpacity
                key={stay.id}
                style={styles.stayCard}
                activeOpacity={0.85}
                onPress={() => navigation.navigate('Bottom', { screen: 'Bookings' })}
              >
                <View style={styles.cardImageWrapper}>
                  <Image
                    source={stay.image}
                    style={styles.cardImage}
                    resizeMode="cover"
                  />
                  <View style={styles.cardImageOverlay} />
                  <TouchableOpacity style={styles.cardHeartBtn}>
                    <Heart size={13} color="#FFFFFF" strokeWidth={2} />
                  </TouchableOpacity>
                  {stay.trending && (
                    <View style={styles.trendingBadge}>
                      <Text style={styles.trendingText}>Trending</Text>
                    </View>
                  )}
                </View>

                <View style={styles.cardBody}>
                  <Text style={styles.cardName} numberOfLines={1}>{stay.name}</Text>

                  <View style={styles.cardLocationRow}>
                    <MapPin size={10} color="#888" strokeWidth={2} />
                    <Text style={styles.cardLocation} numberOfLines={1}> {stay.location}</Text>
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
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    backgroundColor: '#F5F3F8',
  },
  searchCard: {
    backgroundColor: '#FFFFFF',
    marginHorizontal: 14,
    marginTop: -100,
    borderRadius: 18,
    padding: 18,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.18,
    shadowRadius: 20,
    elevation: 16,
    zIndex: 20,
  },
  searchCardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  searchCardTitle: {
    fontSize: 15,
    fontWeight: '700',
    color: '#1A0533',
  },
  searchCardStar: {
    fontSize: 14,
    color: '#7C3AED',
  },
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
    borderColor: '#E8E8E8',
    borderRadius: 10,
    paddingHorizontal: 12,
    paddingVertical: 11,
    backgroundColor: '#FAFAFA',
    gap: 8,
  },
  inputIcon: {
    marginRight: 2,
  },
  inputText: {
    flex: 1,
    fontSize: 13,
    color: '#333',
    padding: 0,
  },
  guestMain: {
    fontSize: 13,
    color: '#333',
    fontWeight: '500',
  },
  guestSub: {
    fontSize: 12,
    color: '#999',
    marginTop: 1,
  },
  searchBtn: {
    backgroundColor: '#7C3AED',
    borderRadius: 12,
    paddingVertical: 15,
    alignItems: 'center',
    marginTop: 16,
    shadowColor: '#7C3AED',
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.40,
    shadowRadius: 10,
    elevation: 8,
  },
  searchBtnText: {
    fontSize: 15,
    fontWeight: '700',
    color: '#FFFFFF',
    letterSpacing: 0.4,
  },
  recentSection: {
    paddingTop: 26,
    paddingHorizontal: 18,
    paddingBottom: 8,
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
  recentDot: {
    fontSize: 10,
    color: '#7C3AED',
  },
  recentLabel: {
    fontSize: 11,
    fontWeight: '700',
    color: '#7C3AED',
    letterSpacing: 1.8,
  },
  seeAllRow: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(124,58,237,0.08)',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 14,
  },
  seeAll: {
    fontSize: 12,
    color: '#7C3AED',
    fontWeight: '600',
  },
  seeAllArrow: {
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
    color: '#999',
    marginBottom: 16,
    lineHeight: 18,
  },
  cardsRow: {
    paddingRight: 4,
    gap: 12,
    paddingBottom: 4,
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
  stayCard: {
    width: width * 0.42,
    borderRadius: 14,
    overflow: 'hidden',
    backgroundColor: '#FFFFFF',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.12,
    shadowRadius: 8,
    elevation: 5,
  },
  cardImageWrapper: {
    width: '100%',
    height: 110,
    position: 'relative',
  },
  cardImage: {
    width: '100%',
    height: 110,
  },
  cardImageOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: 110,
    backgroundColor: 'rgba(26,5,51,0.18)',
  },
  cardHeartBtn: {
    position: 'absolute',
    top: 7,
    right: 7,
    backgroundColor: 'rgba(0,0,0,0.35)',
    borderRadius: 12,
    width: 24,
    height: 24,
    alignItems: 'center',
    justifyContent: 'center',
  },
  trendingBadge: {
    position: 'absolute',
    top: 7,
    left: 7,
    backgroundColor: '#7C3AED',
    borderRadius: 8,
    paddingHorizontal: 7,
    paddingVertical: 3,
  },
  trendingText: {
    fontSize: 9,
    color: '#FFFFFF',
    fontWeight: '700',
    letterSpacing: 0.3,
  },
  cardBody: {
    padding: 9,
    backgroundColor: '#FFFFFF',
  },
  cardName: {
    fontSize: 12,
    fontWeight: '700',
    color: '#1A0533',
    lineHeight: 17,
    marginBottom: 2,
  },
  cardLocationRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  cardLocation: {
    fontSize: 11,
    color: '#888',
  },
  cardRatingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  cardRating: {
    fontSize: 11,
    fontWeight: '700',
    color: '#1A0533',
  },
  cardReviews: {
    fontSize: 10,
    color: '#AAA',
  },
  cardPriceRow: {
    flexDirection: 'row',
    alignItems: 'baseline',
    gap: 1,
  },
  cardCurrency: {
    fontSize: 12,
    color: '#1A0533',
    fontWeight: '700',
  },
  cardPrice: {
    fontSize: 17,
    fontWeight: '800',
    color: '#1A0533',
  },
  cardNight: {
    fontSize: 10,
    color: '#AAA',
    marginLeft: 2,
  },
});

export default SearchAndStays;
