import React, { useState } from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  FlatList,
  Pressable,
  StatusBar,
  useWindowDimensions,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import TopNavBar from '../../components/Home-Screen/Topnavbar';
import { BottomTabBar } from '../BottomTab/BottomTabNavigator';
import { useAppDispatch } from '../../redux/hooks';
import { setSelectedTab } from '../../redux/store/slices/homeSlice';

const DESTINATIONS = [
  { id: 1, name: 'Bali, Indonesia', image: 'https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=600', color: '#3B82F6' },
  { id: 2, name: 'Paris, France', image: 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=600', color: '#EC4899' },
  { id: 3, name: 'New York, USA', image: 'https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?w=600', color: '#F59E0B' },
  { id: 4, name: 'Dubai, UAE', image: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=600', color: '#8B5CF6' },
  { id: 5, name: 'Maldives', image: 'https://images.unsplash.com/photo-1514282401047-d79a71a38347?w=600', color: '#06B6D4' },
  { id: 6, name: 'Goa, India', image: 'https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?w=600', color: '#10B981' },
];

const CATEGORIES = [
  { id: 1, label: 'Beach', icon: '🏖️' },
  { id: 2, label: 'Mountain', icon: '🏔️' },
  { id: 3, label: 'City', icon: '🏙️' },
  { id: 4, label: 'Desert', icon: '🏜️' },
  { id: 5, label: 'Countryside', icon: '🌿' },
];

type DiscoveryScreenProps = { navigation: any };

const DiscoveryScreen = ({ navigation }: DiscoveryScreenProps) => {
  const { width } = useWindowDimensions();
  const dispatch = useAppDispatch();
  const [activeCategory, setActiveCategory] = useState<number | null>(null);

  React.useEffect(() => { dispatch(setSelectedTab('Explore')); }, [dispatch]);

  const cardWidth = (width - 44) / 2;

  const renderDestination = ({ item }: { item: typeof DESTINATIONS[0] }) => (
    <Pressable style={[styles.destCard, { width: cardWidth }]}>
      <Image source={{ uri: item.image }} style={styles.destImage} resizeMode="cover" />
      <View style={styles.destOverlay} />
      <Text style={styles.destName}>{item.name}</Text>
    </Pressable>
  );

  return (
    <SafeAreaView style={styles.safe} edges={['bottom']}>
      <StatusBar barStyle="light-content" backgroundColor="#1A0533" />
      <TopNavBar navigation={navigation} />

      <FlatList
        style={styles.body}
        contentContainerStyle={styles.bodyContent}
        data={DESTINATIONS}
        keyExtractor={item => String(item.id)}
        renderItem={renderDestination}
        numColumns={2}
        columnWrapperStyle={styles.row}
        showsVerticalScrollIndicator={false}
        ListHeaderComponent={
          <>
            <Text style={styles.heading}>EXPLORE LUXURIOUS STAYS</Text>
            <Text style={styles.subheading}>Discover amazing destinations around the world</Text>

            <View style={styles.catRow}>
              {CATEGORIES.map(c => (
                <Pressable
                  key={c.id}
                  style={[styles.catPill, activeCategory === c.id && styles.catPillActive]}
                  onPress={() => setActiveCategory(activeCategory === c.id ? null : c.id)}
                >
                  <Text style={styles.catIcon}>{c.icon}</Text>
                  <Text style={[styles.catLabel, activeCategory === c.id && styles.catLabelActive]}>{c.label}</Text>
                </Pressable>
              ))}
            </View>
          </>
        }
      />

      <BottomTabBar activeTab="Home" navigation={navigation} />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: '#FFFFFF' },
  body: { flex: 1, backgroundColor: '#F9FAFB' },
  bodyContent: { paddingTop: 8, paddingBottom: 100 },
  heading: { fontSize: 13, fontWeight: '800', color: '#111827', letterSpacing: 1, paddingHorizontal: 16, marginBottom: 4 },
  subheading: { fontSize: 12, color: '#9CA3AF', paddingHorizontal: 16, marginBottom: 14 },
  catRow: { flexDirection: 'row', paddingHorizontal: 16, gap: 8, marginBottom: 16 },
  catPill: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#FFFFFF', borderRadius: 20, paddingHorizontal: 12, paddingVertical: 7, gap: 5, borderWidth: 1, borderColor: '#E5E7EB' },
  catPillActive: { backgroundColor: '#F3E8FF', borderColor: '#7C3AED' },
  catIcon: { fontSize: 14 },
  catLabel: { fontSize: 11, fontWeight: '600', color: '#374151' },
  catLabelActive: { color: '#7C3AED' },
  row: { paddingHorizontal: 16, gap: 12, marginBottom: 12 },
  destCard: { height: 160, borderRadius: 14, overflow: 'hidden', position: 'relative' },
  destImage: { width: '100%', height: '100%' },
  destOverlay: { ...StyleSheet.absoluteFill, backgroundColor: 'rgba(0,0,0,0.2)' },
  destName: { position: 'absolute', bottom: 10, left: 10, fontSize: 13, fontWeight: '700', color: '#FFFFFF' },
});

export default DiscoveryScreen;
