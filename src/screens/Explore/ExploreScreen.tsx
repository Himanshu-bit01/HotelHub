import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, StatusBar, ScrollView, ImageBackground } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MapPin, Star } from 'lucide-react-native';
import TopNavBar from '../../components/Home-Screen/Topnavbar';
import { BottomTabBar } from '../BottomTab/BottomTabNavigator';
import { Destination, ExploreOffer } from '../../types';

const DESTINATIONS: Destination[] = [
  { id: 1, name: 'New Delhi', image: 'https://images.unsplash.com/photo-1587474260584-136574528ed5?w=400' },
  { id: 2, name: 'Mumbai', image: 'https://images.unsplash.com/photo-1570168007204-dfb528c6958f?w=400' },
  { id: 3, name: 'Goa', image: 'https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?w=400' },
];

const OFFERS: ExploreOffer[] = [
  { id: 1, badge: 'Limited time', badgeColor: '#0D9488', rating: 4.6, title: 'Beachside Bliss in Goa', subtitle: 'Beach Resort & Spa', location: 'Goa, India', discount: '20% OFF', price: '₹9,600', image: 'https://images.unsplash.com/photo-1582719508461-905c673771fd?w=400' },
  { id: 2, badge: 'Exclusive', badgeColor: '#A855F7', rating: 4.7, title: 'Luxury Stay in Mumbai', subtitle: 'The Ocean View Hotel', location: 'Mumbai, India', discount: '15% OFF', price: '₹7,200', image: 'https://images.unsplash.com/photo-1455587734955-081b22074882?w=400' },
  { id: 3, badge: 'Best Seller', badgeColor: '#D97706', rating: 4.5, title: 'Heritage Comfort in Delhi', subtitle: 'Imperial Grand Hotel', location: 'New Delhi, India', discount: '10% OFF', price: '₹7,200', image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=400' },
];

type ExploreScreenProps = {
  navigation: any;
};

const ExploreScreen = ({ navigation }: ExploreScreenProps) => {
  return (
    <SafeAreaView style={styles.safe} edges={['bottom']}>
      <StatusBar barStyle="light-content" backgroundColor="#1A0533" />

      <TopNavBar navigation={navigation} />

      <ScrollView style={styles.body} contentContainerStyle={styles.bodyContent} showsVerticalScrollIndicator={false}>
        <Text style={styles.heroTitle}>EXPLORE LUXURIOUS</Text>
        <Text style={styles.heroTitlePurple}>DESTINATIONS</Text>
        <Text style={styles.heroSubtitle}>Handpicked destinations for unforgettable experiences</Text>

        <View style={styles.destinationRow}>
          {DESTINATIONS.map(dest => (
            <TouchableOpacity key={dest.id} style={styles.destCard} activeOpacity={0.85}>
              <ImageBackground source={{ uri: dest.image }} style={styles.destImage} imageStyle={styles.destImageRadius}>
                <View style={styles.destOverlay} />
                <Text style={styles.destName}>{dest.name.toUpperCase()}</Text>
              </ImageBackground>
            </TouchableOpacity>
          ))}
        </View>

        <Text style={styles.sectionTitle}>Offers curated just for you</Text>
        <Text style={styles.sectionSubtitle}>Unbeatable deals on your favorite destinations</Text>

        {OFFERS.map(offer => (
          <TouchableOpacity key={offer.id} style={styles.offerCard} activeOpacity={0.85}>
            <ImageBackground source={{ uri: offer.image }} style={styles.offerImage} imageStyle={styles.offerImageRadius} />
            <View style={styles.offerInfo}>
              <View style={styles.offerTopRow}>
                <View style={[styles.offerBadge, { backgroundColor: offer.badgeColor }]}>
                  <Text style={styles.offerBadgeText}>{offer.badge}</Text>
                </View>
                <View style={styles.ratingRow}>
                  <Star size={11} color="#F59E0B" fill="#F59E0B" strokeWidth={0} />
                  <Text style={styles.ratingText}>{offer.rating}</Text>
                </View>
              </View>

              <Text style={styles.offerTitle}>{offer.title}</Text>
              <Text style={styles.offerSubtitle}>{offer.subtitle}</Text>

              <View style={styles.locationRow}>
                <MapPin size={11} color="#6B7280" strokeWidth={2} />
                <Text style={styles.locationText}>{offer.location}</Text>
              </View>

              <View style={styles.offerBottomRow}>
                <Text style={styles.discountText}>{offer.discount}</Text>
                <Text style={styles.priceText}>{offer.price}</Text>
              </View>
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>

      <BottomTabBar activeTab="Home" navigation={navigation} />
    </SafeAreaView>
  );
};

const COLORS = {
  primaryPurple: '#A855F7',
  lightPurple: '#E9D5FF',
  darkText: '#111827',
  grayText: '#6B7280',
  background: '#FFFFFF',
  cardBackground: '#FFFFFF',
};

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: COLORS.background },
  body: { flex: 1, backgroundColor: COLORS.background },
  bodyContent: { paddingHorizontal: 16, paddingTop: 20, paddingBottom: 110 },
  heroTitle: { fontSize: 27, fontWeight: '800', color: COLORS.darkText, lineHeight: 32 },
  heroTitlePurple: { fontSize: 27, fontWeight: '800', color: COLORS.primaryPurple, lineHeight: 32, marginBottom: 8 },
  heroSubtitle: { fontSize: 13.5, color: COLORS.grayText, marginBottom: 18 },
  destinationRow: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 26 },
  destCard: { width: '31%', height: 120, borderRadius: 14, overflow: 'hidden' },
  destImage: { flex: 1, justifyContent: 'flex-end' },
  destImageRadius: { borderRadius: 14 },
  destOverlay: { ...StyleSheet.absoluteFill, backgroundColor: 'rgba(0,0,0,0.25)' },
  destName: { fontSize: 10.5, fontWeight: '700', color: '#FFFFFF', padding: 8, zIndex: 1 },
  sectionTitle: { fontSize: 17, fontWeight: '800', color: COLORS.darkText, marginBottom: 3 },
  sectionSubtitle: { fontSize: 12.5, color: COLORS.grayText, marginBottom: 16 },
  offerCard: { flexDirection: 'row', backgroundColor: COLORS.cardBackground, borderRadius: 16, marginBottom: 14, padding: 8, shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.08, shadowRadius: 8, elevation: 3 },
  offerImage: { width: 96, height: 110, borderRadius: 12, overflow: 'hidden' },
  offerImageRadius: { borderRadius: 12 },
  offerInfo: { flex: 1, marginLeft: 12, justifyContent: 'center' },
  offerTopRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 6 },
  offerBadge: { paddingHorizontal: 8, paddingVertical: 3, borderRadius: 8 },
  offerBadgeText: { fontSize: 10, fontWeight: '700', color: '#FFFFFF' },
  ratingRow: { flexDirection: 'row', alignItems: 'center', gap: 3 },
  ratingText: { fontSize: 11.5, fontWeight: '700', color: COLORS.darkText },
  offerTitle: { fontSize: 14.5, fontWeight: '700', color: COLORS.darkText, marginBottom: 2 },
  offerSubtitle: { fontSize: 12, color: COLORS.grayText, marginBottom: 6 },
  locationRow: { flexDirection: 'row', alignItems: 'center', gap: 4, marginBottom: 8 },
  locationText: { fontSize: 11.5, color: COLORS.grayText },
  offerBottomRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  discountText: { fontSize: 12, fontWeight: '700', color: COLORS.primaryPurple },
  priceText: { fontSize: 14.5, fontWeight: '800', color: COLORS.darkText },
});

export default ExploreScreen;
