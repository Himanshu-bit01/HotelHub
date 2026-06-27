import React, { useCallback } from 'react';
import { View, Text, StyleSheet, Pressable, StatusBar, ImageBackground, FlatList } from 'react-native';
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

const OfferCard = React.memo(({ offer }: { offer: ExploreOffer }) => (
  <Pressable style={styles.offerCard}>
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
  </Pressable>
));

function ExploreScreen({ navigation }: ExploreScreenProps) {
  const renderOffer = useCallback(({ item }: { item: ExploreOffer }) => (
    <OfferCard offer={item} />
  ), []);

  const ListHeader = (
    <>
      <Text style={styles.heroTitle}>EXPLORE LUXURIOUS</Text>
      <Text style={styles.heroTitlePurple}>DESTINATIONS</Text>
      <Text style={styles.heroSubtitle}>Handpicked destinations for unforgettable experiences</Text>

      <View style={styles.destinationRow}>
        {DESTINATIONS.map(dest => (
          <Pressable key={dest.id} style={styles.destCard}>
            <ImageBackground source={{ uri: dest.image }} style={styles.destImage} imageStyle={styles.destImageRadius}>
              <View style={styles.destOverlay} />
              <Text style={styles.destName}>{dest.name.toUpperCase()}</Text>
            </ImageBackground>
          </Pressable>
        ))}
      </View>

      <Text style={styles.sectionTitle}>Offers curated just for you</Text>
      <Text style={styles.sectionSubtitle}>Unbeatable deals on your favorite destinations</Text>
    </>
  );

  return (
    <SafeAreaView style={styles.safe} edges={['bottom']}>
      <StatusBar barStyle="light-content" backgroundColor="#1A0533" />

      <TopNavBar navigation={navigation} />

      <FlatList
        style={styles.body}
        contentContainerStyle={styles.bodyContent}
        showsVerticalScrollIndicator={false}
        data={OFFERS}
        keyExtractor={(item) => item.id.toString()}
        ListHeaderComponent={ListHeader}
        renderItem={renderOffer}
      />

      <BottomTabBar activeTab="Home" navigation={navigation} />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: '#1A0533' },
  body: { flex: 1, backgroundColor: '#F5F3F8' },
  bodyContent: { paddingBottom: 80 },
  heroTitle: { fontSize: 22, fontWeight: '800', color: '#FFFFFF', paddingHorizontal: 16, paddingTop: 12 },
  heroTitlePurple: { fontSize: 22, fontWeight: '800', color: '#9B6DD4', paddingHorizontal: 16, marginBottom: 4 },
  heroSubtitle: { fontSize: 12, color: '#C4B5D4', paddingHorizontal: 16, marginBottom: 16 },
  destinationRow: { flexDirection: 'row', paddingHorizontal: 16, gap: 10, marginBottom: 24 },
  destCard: { flex: 1, borderRadius: 14, overflow: 'hidden', height: 110 },
  destImage: { flex: 1, justifyContent: 'flex-end', padding: 8 },
  destImageRadius: { borderRadius: 14 },
  destOverlay: { ...StyleSheet.absoluteFill, backgroundColor: 'rgba(26,5,51,0.45)', borderRadius: 14 },
  destName: { fontSize: 11, fontWeight: '700', color: '#FFFFFF', letterSpacing: 1 },
  sectionTitle: { fontSize: 18, fontWeight: '800', color: '#1A0533', paddingHorizontal: 16, marginBottom: 4 },
  sectionSubtitle: { fontSize: 12, color: '#999', paddingHorizontal: 16, marginBottom: 14 },
  offerCard: { flexDirection: 'row', marginHorizontal: 16, marginBottom: 12, borderRadius: 14, overflow: 'hidden', backgroundColor: '#FFFFFF', boxShadow: '0 2px 8px rgba(0,0,0,0.1)' },
  offerImage: { width: 110, height: 130 },
  offerImageRadius: { borderBottomLeftRadius: 14, borderTopLeftRadius: 14 },
  offerInfo: { flex: 1, padding: 10, justifyContent: 'space-between' },
  offerTopRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  offerBadge: { paddingHorizontal: 7, paddingVertical: 3, borderRadius: 8 },
  offerBadgeText: { fontSize: 9, fontWeight: '700', color: '#FFFFFF' },
  ratingRow: { flexDirection: 'row', alignItems: 'center', gap: 3 },
  ratingText: { fontSize: 11, fontWeight: '700', color: '#1A0533' },
  offerTitle: { fontSize: 13, fontWeight: '700', color: '#1A0533' },
  offerSubtitle: { fontSize: 11, color: '#888' },
  locationRow: { flexDirection: 'row', alignItems: 'center', gap: 3 },
  locationText: { fontSize: 10, color: '#6B7280' },
  offerBottomRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  discountText: { fontSize: 11, fontWeight: '700', color: '#D97706' },
  priceText: { fontSize: 14, fontWeight: '800', color: '#1A0533' },
});

export default ExploreScreen;